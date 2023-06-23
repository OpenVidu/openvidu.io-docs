# openvidu-additional-panels

<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-components/openvidu-additional-panels" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

The openvidu-additional-panels tutorial demonstrates how to add a new additional panel to the default panel group.

This customization is possible thanks to the [**AdditionalPanelsDirective**](api/openvidu-angular/directives/AdditionalPanelsDirective.html), which provides us a simple way of customizing the [**PanelComponent**](api/openvidu-angular/components/PanelComponent.html).

<p align="center" style="margin-top: 30px">
  <video class="img-responsive" style="max-width: 80%" src="video/components/additional-panels.mp4" muted async loop autoplay playsinline>
  </video>
</p>

## Running this tutorial


To run the tutorial you need the three components stated in [OpenVidu application architecture](developing-your-video-app/#openvidu-application-architecture): an OpenVidu deployment, your server application and your client application. In this order:

#### 1. Run OpenVidu deployment

Using [Docker Engine](https://docs.docker.com/engine/){:target="_blank"}:

```bash
# WARNING: this container is not suitable for production deployments of OpenVidu
# Visit https://docs.openvidu.io/en/stable/deployment

docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-dev:2.28.0
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

Go to [`http://localhost:4200`](http://localhost:4200){:target="_blank"} to test the app once the server is running.

> To test the application with other devices in your network, visit this **[FAQ](troubleshooting/#3-test-applications-in-my-network-with-multiple-devices)**

---

## Understanding the code

This is an Angular project generated with Angular CLI tool, and therefore you will see lots of configuration files and other stuff that doesn't really matter to us. We will focus on the following files under `src/app/` folder:

- `app.module.ts`: defines the AppComponent module where we import and configure the [openvidu-angular](api/openvidu-angular/) library.
- `app.component.ts`: defines *AppComponent*, main component of the app. It handles the request of OpenVidu tokens to pass them to the videoconference component, so it is able to connect to the OpenVidu session.

---

#### Configure openvidu-angular

First, we need to install the openvidu-angular library. You can check how to do that [here](api/openvidu-angular/).

The [VideoconferenceComponent](api/openvidu-angular/components/VideoconferenceComponent.html) needs the OpenVidu tokens to connect to the session. We request them on `ngOnInit` method. The VideoconferenceComponent will automatically use them to connect to the session when available.

```html
<ov-videoconference [tokens]="tokens" [toolbarDisplaySessionName]="false">
  <div *ovToolbarAdditionalPanelButtons style="text-align: center;">
    <button mat-icon-button (click)="toggleMyPanel('my-panel')">
      <mat-icon>360</mat-icon>
    </button>
    <button mat-icon-button (click)="toggleMyPanel('my-panel2')">
      <mat-icon>star</mat-icon>
    </button>
  </div>
  <div *ovAdditionalPanels id="my-panels">
    <div id="my-panel1" *ngIf="showExternalPanel">
      <h2>NEW PANEL</h2>
      <p>This is my new additional panel</p>
    </div>
    <div id="my-panel2" *ngIf="showExternalPanel2">
      <h2>NEW PANEL 2</h2>
      <p>This is other new panel</p>
    </div>
  </div>
</ov-videoconference>
```

Inside of the `ov-videoconference` component we add the custom template tagged with the `*ovToolbarAdditionalPanelButtons` directive and the `*ovAdditionalPanels` directive. First one define the new toolbar buttons to show and hide the new custom panels. Second one are the new custom panels. You can see how the `ToolbarAdditionalPanelButtonsDirective` works [here](api/openvidu-angular/directives/ToolbarAdditionalPanelButtonsDirective.html) and the `AdditionalPanelsDirective` [here](api/openvidu-angular/directives/AdditionalPanelsDirective.html).

In this case, we simply add two new dummy panels that are toggled from two new toolbar buttons.

`app.component.ts` declares the following properties and methods:

```javascript
APPLICATION_SERVER_URL = 'http://localhost:5000/';

sessionId = "toolbar-additionalbtn-directive-example";
tokens!: TokenModel;

showExternalPanel: boolean = false;
showExternalPanel2: boolean = false;

constructor(
  private httpClient: HttpClient,
  private panelService: PanelService
) { }

async ngOnInit() {
  this.subscribeToPanelToggling();
  this.tokens = {
    webcam: await this.getToken(),
    screen: await this.getToken(),
  };
}

subscribeToPanelToggling() {
  this.panelService.panelOpenedObs.subscribe(
    (ev: { opened: boolean; type?: PanelType | string }) => {
      this.showExternalPanel = ev.opened && ev.type === "my-panel";
      this.showExternalPanel2 = ev.opened && ev.type === "my-panel2";
    }
  );
}

toggleMyPanel(type: string) {
  this.panelService.togglePanel(type);
}

getToken() {
  // Requesting tokens to the server application
}
```

Where:

- `APPLICATION_SERVER_URL`: URL to communicate the client application with the server application to request OpenVidu tokens.
- `sessionId`: OpenVidu Session identifier. This is the session where the VideoconferenceComponent will connect to.
- `tokens`: object where OpenVidu Tokens are stored. The VideoconferenceComponent uses this object to connect to the session.
- `showExternalPanel`, `showExternalPanel2`: boolean properties to control the visibility of the new custom panels.
- `constructor` method with dependency injection.
- `ngOnInit` method where listeners to openvidu-angular Observables are set up and OpenVidu Tokens are requested.
- `subscribeToPanelToggling` method where we subscribe to openvidu-angular Observable to know when the panels are opened or closed.
- `toggleMyPanel` method to open and close our custom panels. It is triggered from our custom HTML buttons.

## Deploying openvidu-additional-panels

#### 1) Build the docker image

Under the root project folder, you can see the `openvidu-components/docker/` directory. Here it is included all the required files yo make it possible the deployment with OpenVidu.

First of all, you will need to create the **openvidu-additional-panels** docker image. Under `openvidu-components/docker/` directory you will find the `create_image.sh` script. This script will create the docker image with the [openvidu-basic-node](application-server/openvidu-basic-node/) as application server and the static files.

```bash
./create_image.sh openvidu/openvidu-additional-panels-demo:X.Y.Z openvidu-additional-panels
```

The script needs two parameters:

1. The name of the docker image to create.
2. The name of the tutorial folder.

This script will create an image named `openvidu/openvidu-additional-panels-demo:X.Y.Z`. This name will be used in the next step.

#### 2) Deploy the docker image

Time to deploy the docker image. You can follow the [Deploy OpenVidu based application with Docker](/deployment/deploying-openvidu-apps/#with-docker) guide for doing this.
