# openvidu-additional-panels

<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-components/openvidu-additional-panels" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

The openvidu-additional-panels tutorial demonstrates how to add a new additional panel to the default panel group.

This customization is possible thanks to the [**AdditionalPanelsDirective**](api/openvidu-angular/directives/AdditionalPanelsDirective.html), which provides us a simple way of customizing the [**PanelComponent**](api/openvidu-angular/components/PanelComponent.html).


<p align="center" style="margin-top: 30px">
  <video class="img-responsive" style="max-width: 80%" src="video/components/additional-panels.mp4" muted async loop autoplay playsinline>
  </video>
</p>

## Understanding the code

<div class="warningBoxContent">
  <div style="display: table-cell; vertical-align: middle;">
      <i class="icon ion-android-alert warningIcon"></i>
  </div>
  <div class="warningBoxText">
    openvidu-additional-panels is not a production ready application, as it is requesting participant tokens to OpenVidu Server directly from the client side. This is an insecure process, and it should be done from your application's backend.
  </div>
</div>

This is an Angular project generated with Angular CLI tool, and therefore you will see lots of configuration files and other stuff that doesn't really matter to us. We will focus on the following files under `src/app/` folder:

- `app.module.ts`: defines the AppComponent module where we import and configure the [openvidu-angular](api/openvidu-angular/) library.
- `app.component.ts`: defines *AppComponent*, main component of the app. It handles the request of OpenVidu tokens to pass them to the videoconference component, so it is able to connect to the OpenVidu session.
- `app.component.html`: HTML for AppComponent.

---

#### Configure openvidu-angular

First, we need to install the openvidu-angular library. You can check how to do that [here](api/openvidu-angular/).

---

The [VideoconferenceComponent](/api/openvidu-angular/components/VideoconferenceComponent.html) needs the tokens to connect to the session. We will request them when the users clicks on the _joinButton_, so we call to `onJoinButtonClicked` method when this happens. After requesting the token, the VideoconferenceComponent will use them for connecting to the session.


```html
<ov-videoconference (onJoinButtonClicked)="onJoinButtonClicked()" [tokens]="tokens">
  ...
</ov-videoconference>
```


Inside of the __ov-videoconference__ component, we will add the custom template tagged with the __`*ovAdditionalPanels`__. You can see how the __`AdditionalPanelsDirective`__ works [here](/api/openvidu-angular/directives/AdditionalPanelsDirective.html).

<br><hr>

## Running this tutorial

To run the tutorial you need the three components stated in [OpenVidu application architecture](developing-your-video-app/#openvidu-application-architecture): an OpenVidu deployment, your server application and your client application. In this order:

#### 1. Run OpenVidu deployment

Using [Docker Engine](https://docs.docker.com/engine/){:target="_blank"}:

```bash
# WARNING: this container is not suitable for production deployments of OpenVidu
# Visit https://docs.openvidu.io/en/stable/deployment

docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-server-kms:2.22.0
```

#### 2. Run your preferred server application sample

For more information visit [Application server](application-server/).

<div id="application-server-wrapper"></div>
<script src="js/load-common-template.js" data-pathToFile="server-application-samples.html" data-elementId="application-server-wrapper" data-runAnchorScript="false" data-useCurrentVersion="true"></script>

#### 3. Run the client application tutorial

You need [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm){:target="_blank"} and [Angular CLI](https://angular.io/cli){:target="_blank"} to serve the application. Check them with the following command:

```bash
npm -v
ng v
```

To serve the tutorial:

```bash
# Using the same repository openvidu-tutorials from step 2

cd openvidu-tutorials/openvidu-components/openvidu-additional-panels
npm install
ng serve
```

Go to [`http://localhost:4200`](http://localhost:4200){:target="_blank"} to test the app once the server is running. The first time you use the OpenVidu deployment docker container, an alert message will suggest you accept the self-signed certificate when joining an OpenVidu session for the first time.

> If you are using **Windows**, read this **[FAQ](troubleshooting/#3-i-am-using-windows-to-run-the-tutorials-develop-my-app-anything-i-should-know)** to properly run the tutorial

> To learn **some tips** to develop with OpenVidu, check this **[FAQ](troubleshooting/#2-any-tips-to-make-easier-the-development-of-my-app-with-openvidu)**