# openvidu-custom-participant-panel-item

<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-components/openvidu-custom-participant-panel-item" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

The openvidu-custom-participant-panel-item tutorial demonstrates how to replace the default **participants panel item** with a custom one.

This customization is possible thanks to the [**ParticipantsPanelItemDirective**](api/openvidu-angular/directives/ParticipantPanelItemDirective.html), which provides us a simple way to customize the [**ParticipantsPanelItemComponent**](api/openvidu-angular/components/ParticipantPanelItemComponent.html).

<p align="center" style="margin-top: 30px">
  <video class="img-responsive" style="max-width: 80%" src="video/components/participant-panel-item.mp4" muted async loop autoplay playsinline></video>
</p>

<br>

## Running this tutorial

To run the tutorial you need the three components stated in [OpenVidu application architecture](developing-your-video-app/#openvidu-application-architecture): an OpenVidu deployment, your server application and your client application. In this order:

#### 1. Run OpenVidu deployment

Using [Docker Engine](https://docs.docker.com/engine/){:target="\_blank"}:

```bash
# WARNING: this container is not suitable for production deployments of OpenVidu
# Visit https://docs.openvidu.io/en/stable/deployment

docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-dev:2.29.0
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

cd openvidu-tutorials/openvidu-components/openvidu-custom-participant-panel-item
npm install
ng serve
```

Go to [`http://localhost:4200`](http://localhost:4200){:target="\_blank"} to test the app once the server is running.

> To test the application with other devices in your network, visit this **[FAQ](troubleshooting/#3-test-applications-in-my-network-with-multiple-devices)**

---

## Understanding the code

This is an Angular project generated with Angular CLI tool, and therefore you will see lots of configuration files and other stuff that doesn't really matter to us. We will focus on the following files under `src/app/` folder:

- `app.module.ts`: defines the AppComponent module where we import and configure the [openvidu-angular](api/openvidu-angular/) library.
- `app.component.ts`: defines _AppComponent_, main component of the app. It handles the request of OpenVidu tokens to pass them to the videoconference component, so it is able to connect to the OpenVidu session.

---

First, we need to install the openvidu-angular library. You can check how to do that [here](api/openvidu-angular/).

The [VideoconferenceComponent](api/openvidu-angular/components/VideoconferenceComponent.html) needs the OpenVidu tokens to connect to the session. We request them on `ngOnInit` method. The VideoconferenceComponent will automatically use them to connect to the session when available.

```html
<ov-videoconference [tokens]="tokens" [toolbarDisplaySessionName]="false">
	<div *ovParticipantPanelItem="let participant" style="display: flex">
		<p>{{ participant.nickname }}</p>
		<button mat-icon-button [matMenuTriggerFor]="menu">
			<mat-icon>more_vert</mat-icon>
		</button>
		<mat-menu #menu="matMenu">
			<button mat-menu-item>Button 1</button>
			<button mat-menu-item>Button 2</button>
		</mat-menu>
	</div>
</ov-videoconference>
```

Inside of the `ov-videoconference` component we add the custom template tagged with the `*ovParticipantPanelItem` directive. You can see how the `ParticipantPanelItemDirective` works [here](api/openvidu-angular/directives/ParticipantPanelItemDirective.html).

In this case, we simply add to each participant a button that will show a dropdown menu with two dummy buttons.

`app.component.ts` declares the following properties and methods:

```javascript
APPLICATION_SERVER_URL = 'http://localhost:5000/';

sessionId = 'participants-panel-directive-example';
tokens!: TokenModel;

constructor(private httpClient: HttpClient) { }

async ngOnInit() {
  this.tokens = {
    webcam: await this.getToken(),
    screen: await this.getToken()
  };
}

getToken() {
  // Requesting tokens to the server application
}
```

Where:

- `APPLICATION_SERVER_URL`: URL to communicate the client application with the server application to request OpenVidu tokens.
- `sessionId`: OpenVidu Session identifier. This is the session where the VideoconferenceComponent will connect to.
- `tokens`: object where OpenVidu Tokens are stored. The VideoconferenceComponent uses this object to connect to the session.
- `constructor` method with dependency injection.
- `ngOnInit` method where OpenVidu Tokens are requested.

## Deploying openvidu-custom-participant-panel-item

#### 1) Build the docker image

Under the root project folder, you can see the `openvidu-components/docker/` directory. Here it is included all the required files yo make it possible the deployment with OpenVidu.

First of all, you will need to create the **openvidu-custom-participant-panel-item** docker image. Under `openvidu-components/docker/` directory you will find the `create_image.sh` script. This script will create the docker image with the [openvidu-basic-node](application-server/openvidu-basic-node/) as application server and the static files.

```bash
./create_image.sh openvidu/openvidu-custom-participant-panel-item-demo:X.Y.Z openvidu-custom-participant-panel-item
```

The script needs two parameters:

1. The name of the docker image to create.
2. The name of the tutorial folder.

This script will create an image named `openvidu/openvidu-custom-participant-panel-item-demo:X.Y.Z`. This name will be used in the next step.

#### 2) Deploy the docker image

Time to deploy the docker image. You can follow the [Deploy OpenVidu based application with Docker](/deployment/deploying-openvidu-apps/#with-docker) guide for doing this.
