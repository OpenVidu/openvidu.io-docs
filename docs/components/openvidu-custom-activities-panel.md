# openvidu-custom-activities-panel

<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-components/openvidu-custom-activities-panel" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

The openvidu-custom-activities-panel tutorial shows how to replace the default **activities panel** with a custom one.

This customization is possible thanks to the [**ActivitiesPanelDirective**](api/openvidu-angular/directives/ActivitiesPanelDirective.html), which provides us a simple way to customize the [**ActivitiesPanelComponent**](api/openvidu-angular/components/ActivitiesPanelComponent.html).

<p align="center" style="margin-top: 30px">
  <img class="img-responsive" style="max-width: 80%" src="img/components/activities-panel.png">
</p>

## Running this tutorial

To run the tutorial you need the three components stated in [OpenVidu application architecture](developing-your-video-app/#openvidu-application-architecture): an OpenVidu deployment, your server application and your client application. In this order:

#### 1. Run OpenVidu deployment

Using [Docker Engine](https://docs.docker.com/engine/){:target="_blank"}:

```bash
# WARNING: this container is not suitable for production deployments of OpenVidu
# Visit https://docs.openvidu.io/en/stable/deployment

docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-dev:2.24.0
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

cd openvidu-tutorials/openvidu-components/openvidu-custom-activities-panel
npm install
ng serve
```

Go to [`http://localhost:4200`](http://localhost:4200){:target="_blank"} to test the app once the server is running.

> To test the application with other devices in your network, visit this **[FAQ](troubleshooting/#3-test-applications-in-my-network-with-multiple-devices)**

---

## Understanding the code

This is an Angular project generated with angular-cli tool, and therefore you will see lots of configuration files and other stuff that doesn't really matter to us. We will focus on the following files under `src/app/` folder:

- `app.module.ts`: defines the AppComponent module where we import and configure the [openvidu-angular](api/openvidu-angular/) library.
- `app.component.ts`: defines *AppComponent*, main component of the app. It handles the request of OpenVidu tokens to pass them to the videoconference component, so it is able to connect to the OpenVidu session.

---

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

Inside of the `ov-videoconference` component we add the custom template tagged with the `*ovActivitiesPanel` directive. You can see how the `ActivitiesPanelDirective` works [here](api/openvidu-angular/directives/ActivitiesPanelDirective.html).
