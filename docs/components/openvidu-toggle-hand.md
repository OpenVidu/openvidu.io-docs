
# openvidu-toggle-hand

<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-components/openvidu-toggle-hand" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

openvidu-toggle-hand is an Angular app developed with openvidu-angular library and its powerful components for customization. It features a toggle hand button that allows participants to ask for a turn to speak. This tutorial uses the addition of a very simple feature to demonstrate the power of openvidu-angular library and how to customize and extend its pre-built components.

<p align="center" style="margin-top: 30px">
  <video class="img-responsive" style="max-width: 80%" src="video/components/toggle-hand.mp4" muted async loop autoplay playsinline></video>
</p>

## Understanding the code

This application is a simple Angular app using [openvidu-angular](api/openvidu-angular/) library. It uses prebuilt components to 

The files we are going to focus on are the following ones:

- `app/app.module.ts`: app file where openvidu-angular library is initialized.
- `app/app.component.ts`: component file with all the logic. It requests OpenVidu tokens and handles the toggle hand feature.
- `app/app.component.html`: component template view where openvidu-angular components can be placed and customized.

---

First, we need to install the openvidu-angular library. You can check how to do that [here](api/openvidu-angular/).
After that we are ready to include openvidu-angular components into our app.

Let's focus on the `app.component.html` template to see how to customize the [VideoconferenceComponent](api/openvidu-angular/components/VideoconferenceComponent.html) to achieve the toggle hand feature.

For remote participants, we need to know when someone has requested the turn to speak and show an icon on top of their video stream, so everybody knows they want to take the floor. To achieve this we subscribe to the `onSessionCreated` output event of `ov-videoconference` element.

```html
<ov-videoconference (onSessionCreated)="onSessionCreated($event)" [tokens]="tokens" [prejoin]="true">
	...
</ov-videoconference>
```

The `onSessionCreated` method is invoked when the OpenVidu Session has been initialized. We use this event to subscribe to the `handToggle` signal so we know when a remote participant has raised their hand. To do this, we use the [signal](api/openvidu-browser/classes/Session.html#signal) method provided by **openvidu-browser** SDK.

```javascript
onSessionCreated(session: Session) {
	this.session = session;
	this.handleRemoteHand();
}

handleRemoteHand() {
	// Subscribe to hand toggling events from other participants
	this.session.on(`signal:${SignalApp.HAND_TOGGLE}`, (event: any) => {
		const connectionId = event.from.connectionId;
		const participant = <ParticipantAppModel>this.participantService.getRemoteParticipantByConnectionId(connectionId);
		if (participant) {
			participant.toggleHandRaised();
			this.participantService.updateRemoteParticipants();
		}
	});
}
```

For the local participant, we need to include a custom button in the [ToolbarComponent](api/openvidu-angular/components/ToolbarComponent.html). We do so by adding an element tagged with the [ToolbarAdditionalButtonsDirective](api/openvidu-angular/directives/ToolbarAdditionalButtonsDirective.html) (`*ovToolbarAdditionalButtons`).

```html
<ov-videoconference (onSessionCreated)="onSessionCreated($event)" [tokens]="tokens" [prejoin]="true">

	<div *ovToolbarAdditionalButtons>
		<button toolbar-btn mat-icon-button (click)="handleLocalHand()" [class.active-btn]="hasHandRaised">
			<mat-icon matTooltip="Toggle hand">front_hand</mat-icon>
		</button>
	</div>

	...

</ov-videoconference>
```

This button allows the local user to raise their hand. Whenever it is clicked, method `handleLocalHand` is called.

```javascript
handleLocalHand() {
	// Get local participant with ParticipantService
	const participant = <ParticipantAppModel>this.participantService.getLocalParticipant();

	// Toggle the participant hand with the method we wil add in our ParticipantAppModel
	participant.toggleHandRaised();

	// Refresh the local participant object for others component and services
	this.participantService.updateLocalParticipant();

	// Send a signal with the new value to others participant using the openvidu-browser signal
	const remoteConnections = this.openviduService.getRemoteConnections();
	if (remoteConnections.length > 0) {
		//Sending hand toggle signal to others
		const signalOptions: SignalOptions = {
			type: SignalApp.HAND_TOGGLE,
			to: remoteConnections
		};
		this.session.signal(signalOptions);
	}
}
```

This method shows an icon on the local video to let the user know they have requested the turn to speak, and send a `handToggle` signal to the rest of users. This signal will trigger the `handleRemoteHand` method as explained above.

We also need to customize the [StreamComponent](api/openvidu-angular/components/StreamComponent.html) injecting a new element when a participant raises their hand:

```html
<ov-videoconference (onSessionCreated)="onSessionCreated($event)" [tokens]="tokens" [prejoin]="true">

	...

	<div *ovStream="let stream" style="height: 100%">
		<ov-stream [stream]="stream"></ov-stream>
		<button mat-icon-button @inOutHandAnimation id="hand-notification" *ngIf="stream.participant.hasHandRaised">
			<mat-icon>front_hand</mat-icon>
		</button>
	</div>

	...

</ov-videoconference>
```

Now, using the [StreamDirective](api/openvidu-angular/directives/StreamDirective.html) (`*ovStream`) we can customize the StreamComponent and we can add whatever we want to it. In this case we simply add an icon button indicating the participant has raised their hand.

We also add the hand notification to the participants panel. We handle this using the [ParticipantPanelItemElementsDirective](api/openvidu-angular/directives/ParticipantPanelItemElementsDirective.html) (`*ovParticipantPanelItemElements`). In this case we simply add an icon button indicating the participant has raised their hand.

```html
<ov-videoconference (onSessionCreated)="onSessionCreated($event)" [tokens]="tokens" [prejoin]="true">

	...

	<div *ovParticipantPanelItemElements="let participant">
		<button mat-icon-button *ngIf="participant.hasHandRaised">
			<mat-icon>front_hand</mat-icon>
		</button>
	</div>

</ov-videoconference>
```

As you can see we assign a participant variable to the `*ovParticipantPanelItemElements` directive (`let participant`). In this way we are able access the participant's properties in our custom HTML template. In this case, the `hasHandRaised` property.

Following this line of reasoning, we need a new property (`hasHandRaised`) in the [ParticipantAbstractModel](api/openvidu-angular/classes/ParticipantAbstractModel.html). We have to extend the ParticipantAbstractModel from openvidu-angular library. See `ParticipantAppModel` class under `app/models/` folder:

```javascript
import { ParticipantAbstractModel } from 'openvidu-angular';

export class ParticipantAppModel extends ParticipantAbstractModel {

	hasHandRaised: boolean;

	toggleHandRaised() {
		this.hasHandRaised = !this.hasHandRaised;
	}

}
```

Once we have extended the ParticipantAbstractModel, we need to configure openvidu-angular library to use this new class. To achieve this we add a `participantFactory` in `app.module.ts` and assign it to the `OpenViduAngularConfig`:

```javascript
const config: OpenViduAngularConfig = {
	production: environment.production,
	participantFactory: (props: ParticipantProperties, streamModel: StreamModel) => new ParticipantAppModel(props, streamModel)
};
```

Now we can get our custom `hasHandRaised` participant property in the **ParticipantsPanelComponent** and in the **StreamComponent**.

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

cd openvidu-tutorials/openvidu-components/openvidu-toggle-hand
npm install
ng serve
```

Go to [`http://localhost:4200`](http://localhost:4200){:target="_blank"} to test the app once the server is running.

> To test the application with other devices in your network, visit this **[FAQ](troubleshooting/#3-test-applications-in-my-network-with-multiple-devices)**