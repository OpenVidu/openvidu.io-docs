# openvidu-admin-dashboard

<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-components/openvidu-admin-dashboard" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

The openvidu-admin-dashboard tutorial demonstrates how to integrate an administration dashboard to your **OpenVidu Components** based application. In this case, our custom component will display a list to manage the recordings of your OpenVidu deployment: search, order by, play, download, delete.

<p align="center" style="margin-top: 30px">
  <video class="img-responsive" style="max-width: 80%" src="video/components/admin-dashboard.mp4" muted async loop autoplay playsinline></video>
</p>

<br>

## Running this tutorial

To run the tutorial you need the three components stated in [OpenVidu application architecture](developing-your-video-app/#openvidu-application-architecture): an OpenVidu deployment, your server application and your client application. In this order:

#### 1. Run OpenVidu deployment

Using [Docker Engine](https://docs.docker.com/engine/){:target="\_blank"}:

```bash
# WARNING: this container is not suitable for production deployments of OpenVidu
# Visit https://docs.openvidu.io/en/stable/deployment

docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-dev:2.22.0
```

#### 2. Run your preferred server application sample

For more information visit [Application server](application-server/).

<div id="application-server-wrapper"></div>
<script src="js/load-common-template.js" data-pathToFile="server-application-samples.html" data-elementId="application-server-wrapper" data-runAnchorScript="false" data-useCurrentVersion="true"></script>

#### 3. Run the client application tutorial

You need [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm){:target="\_blank"} and [Angular CLI](https://angular.io/cli){:target="\_blank"} to serve the application. Check them with the following command:

```bash
npm -v
ng v
```

To serve the tutorial:

```bash
# Using the same repository openvidu-tutorials from step 2

cd openvidu-tutorials/openvidu-components/openvidu-admin-dashboard
npm install
ng serve
```

Go to [`http://localhost:4200`](http://localhost:4200){:target="\_blank"} to test the app once the server is running.

> To test the application with other devices in your network, visit this **[FAQ](troubleshooting/#3-test-applications-in-my-network-with-multiple-devices)**

---

## Understanding the code

This is an Angular project generated with Angular CLI tool, and therefore you will see lots of configuration files and other stuff that doesn't really matter to us. We will focus on the following files under `src/app/` folder:

- `app.module.ts`: defines the AppComponent module where we import and configure the [openvidu-angular](api/openvidu-angular/) library.
- `app.component.ts`: defines _AppComponent_, main component of the app. It uses the [AdminLoginComponent](api/openvidu-angular/components/AdminLoginComponent.html) and [AdminDashboardComponent](api/openvidu-angular/components/AdminDashboardComponent.html).

<div class="warningBoxContent">
  <div style="display: table-cell; vertical-align: middle;">
      <i class="icon ion-android-alert warningIcon"></i>
  </div>
  <div class="warningBoxText">
    We are using a very basic server application which does not include any recording and authentication logic.
	<br>
	As <i>AdminLoginComponent</i> and <i>AdminDashboardComponent</i> need an application server with user control and recording support respectively, we have simulated the admin authentication for educational purposes. <strong>You must include authentication logic in your server application to have a properly secured admin dashboard.</strong>
  </div>
</div>

---

First, we need to install the **openvidu-angular** library. You can check how to do that [here](api/openvidu-angular/).

The [AdminLoginComponent](api/openvidu-angular/components/AdminLoginComponent.html) emits an event when the login button is clicked. Listening to `onLoginButtonClicked` event we will be able to authenticate to gain access to the admin dashboard. As said above, we have simulated this authentication for educational purposes.

```html
<ov-admin-login
	*ngIf="!logged"
	(onLoginButtonClicked)="onLoginClicked($event)"
></ov-admin-login>
```

Once you are logged as an admin user, we can show the [AdminDashboardComponent](api/openvidu-angular/components/AdminDashboardComponent.html). This component needs a recording list so the administrator can review all the recordings, preview them, download them or delete them. Just with a couple of clicks.

In this tutorial, the `recordingsList` will be empty because there is not recording support in the basic server application. Also, the _AdminDashboardComponent_ provides multiple events for the recording management as `onRefreshRecordingsClicked` or `onDeleteRecordingClicked` and it also provides a way to listen when you click the logout button with the `onLogoutClicked` event.

```html
<ov-admin-dashboard
	*ngIf="logged"
	[recordingsList]="recordings"
	(onLogoutClicked)="onLogoutClicked()"
	(onRefreshRecordingsClicked)="onRefreshRecordingsClicked()"
	(onDeleteRecordingClicked)="onDeleteRecordingClicked($event)"
></ov-admin-dashboard>
```

`app.component.ts` declares the following properties and methods:

```javascript
logged: boolean = false;
recordings: RecordingInfo[] = [];

constructor() {}

onLoginClicked(password: string) {
	console.log(`Loggin button clicked ${password}`);
	/**
	 * WARNING! This code is developed for didactic purposes only.
	 * The authentication process should be done in the server side.
	 **/
	this.logged = true;
}

onLogoutClicked() {
	console.log("Logout button clicked");
	/**
	 * WARNING! This code is developed for didactic purposes only.
	 * The authentication process should be done in the server side.
	 **/
	this.logged = false;
}

onRefreshRecordingsClicked() {
	console.log("Refresh recording clicked");
}

onDeleteRecordingClicked(recordingId: string) {
	console.log(`Delete recording clicked ${recordingId}`);
}
```

Where:

- `logged`: boolean variable where auth state is stored.
- `constructor`: method with dependency injection.
- `onLoginClicked`: method invoked when _AdminLoginComponent_ fires the `onLoginClicked` event.
- `onLogoutClicked`: method invoked when _AdminDashboardComponent_ fires the `onLogoutClicked` event.
- `onRefreshRecordingsClicked`: method invoked when _AdminDashboardComponent_ fires the `onRefreshRecordingsClicked` event.
- `onDeleteRecordingClicked`: method invoked when _AdminDashboardComponent_ fires the `onDeleteRecordingClicked` event.
