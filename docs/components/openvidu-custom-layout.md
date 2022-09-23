# openvidu-custom-layout

<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-components/openvidu-custom-layout" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

The openvidu-custom-layout tutorial demonstrates how to replace the default layout with a custom one.

This customization is possible thanks to the [**LayoutDirective**](api/openvidu-angular/directives/LayoutDirective.html), which provides us a simple way to customize the [**LayoutComponent**](api/openvidu-angular/components/LayoutComponent.html).

<p align="center" style="margin-top: 30px">
  <img class="img-responsive" style="max-width: 80%" src="img/components/custom-layout.png">
</p>

## Understanding the code

This is an Angular project generated with Angular CLI tool, and therefore you will see lots of configuration files and other stuff that doesn't really matter to us. We will focus on the following files under `src/app/` folder:

- `app.module.ts`: defines the AppComponent module where we import and configure the [openvidu-angular](api/openvidu-angular/) library.
- `app.component.ts`: defines *AppComponent*, main component of the app. It handles the request of OpenVidu tokens to pass them to the videoconference component, so it is able to connect to the OpenVidu session.

---

#### Configure openvidu-angular

First, we need to install the openvidu-angular library. You can check how to do that [here](api/openvidu-angular/).

The [VideoconferenceComponent](api/openvidu-angular/components/VideoconferenceComponent.html) needs the OpenVidu tokens to connect to the session. We request them on `ngOnInit` method. The VideoconferenceComponent will automatically use them to connect to the session when available.

```html
<ov-videoconference	[tokens]="tokens" (onSessionCreated)="subscribeToParticipants()">
  <div *ovLayout>
    <div class="container">
      <div class="item" *ngFor="let stream of localParticipant | streams">
        <ov-stream [stream]="stream"></ov-stream>
      </div>
      <div class="item" *ngFor="let stream of remoteParticipants | streams">
        <ov-stream [stream]="stream"></ov-stream>
      </div>
    </div>
  </div>
</ov-videoconference>
```

Inside of the `ov-videoconference` component we add the custom template tagged with the `*ovLayout` directive. You can see how the `LayoutDirective` works [here](api/openvidu-angular/directives/LayoutDirective.html).

In this case we customize the layout in two different `div` elements, one for displaying the local participant and other for displaying remote participants.

`app.component.ts` declares the following properties and methods:

```javascript
APPLICATION_SERVER_URL = window.location.protocol + '//' + window.location.hostname + ':5000/';

sessionId = 'layout-directive-example';
tokens!: TokenModel;

localParticipant!: ParticipantAbstractModel;
remoteParticipants!: ParticipantAbstractModel[];
localParticipantSubs!: Subscription;
remoteParticipantsSubs!: Subscription;

constructor(private httpClient: HttpClient, private participantService: ParticipantService) { }

async ngOnInit() {
  this.tokens = {
    webcam: await this.getToken(),
    screen: await this.getToken()
  };
}

ngOnDestroy() {
  this.localParticipantSubs.unsubscribe();
  this.remoteParticipantsSubs.unsubscribe();
}

subscribeToParticipants() {
  this.localParticipantSubs = this.participantService.localParticipantObs.subscribe((p) => {
    this.localParticipant = p;
  });

  this.remoteParticipantsSubs = this.participantService.remoteParticipantsObs.subscribe((participants) => {
    this.remoteParticipants = participants;
  });
}

getToken() {
  // Requesting tokens to the server application
}
```

Where:

- `APPLICATION_SERVER_URL`: URL to commicate the client application with the server application to request OpenVidu tokens.
- `sessionId`: OpenVidu Session identifier. This is the session where the VideoconferenceComponent will connect to.
- `tokens`: object where OpenVidu Tokens are stored. The VideoconferenceComponent uses this object to connect to the session.
- `localParticipant`, `remoteParticipants`: objects of type [ParticipantAbstractModel](api/openvidu-angular/classes/ParticipantAbstractModel.html) that store the local and remote participants.
- `localParticipantSubs`, `remoteParticipantsSubs`: subscriptions to retrieve session participants from the Observables of openvidu-angular. This allows us to manage the participants in our own terms and display them in our custom layout.
- `constructor` method with dependency injection.
- `ngOnInit` method where OpenVidu Tokens are requested.
- `ngOnDestroyed` method to unsubscribe from openvidu-angular Observables.
- `subscribeToParticipants` method to retrieve session participants from openvidu-angular by subscribing to the required Observables.

<br>

---

## Running this tutorial

To run the tutorial you need the three components stated in [OpenVidu application architecture](developing-your-video-app/#openvidu-application-architecture): an OpenVidu deployment, your server application and your client application. In this order:

#### 1. Run OpenVidu deployment

Using [Docker Engine](https://docs.docker.com/engine/){:target="_blank"}:

```bash
# WARNING: this container is not suitable for production deployments of OpenVidu
# Visit https://docs.openvidu.io/en/stable/deployment

docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-dev:2.23.0
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

cd openvidu-tutorials/openvidu-components/openvidu-custom-layout
npm install
ng serve
```

Go to [`http://localhost:4200`](http://localhost:4200){:target="_blank"} to test the app once the server is running.

> To test the application with other devices in your network, visit this **[FAQ](troubleshooting/#3-test-applications-in-my-network-with-multiple-devices)**