
# openvidu-toggle-hand
<a href="#" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

openvidu-toggle-hand is an Angular app developed using the openvidu-angular library and its powerful components for customization. In this app we have added a toggle hand feature for requesting the attention to others.

<p align="center">
  <img class="img-responsive" style="max-width: 80%" src="img/components/toggle-hand.gif">
</p>

## Understanding the code

<div class="warningBoxContent">
  <div style="display: table-cell; vertical-align: middle;">
      <i class="icon ion-android-alert warningIcon"></i>
  </div>
  <div class="warningBoxText">
	openvidu-toggle-hand is not production ready videconference app because it's using an insecure communication for requesting the token to OpenVidu Server. We highly recommend do this in the backend side.
  </div>
</div>

As said before, this application is a simple Angular frontend using [openvidu-angular](reference-docs/openvidu-angular/) library allowing us to develop a powerful videconference frontend.

The files we're going to focus on are the following:

- `app/app.module.ts`: app file where the openvidu-angular is initialized.
- `app/app.component.ts`: component file which handle the toggle hand and request the token (insecurely).
- `app/app.component.html`: component template view where customizing the openvidu-angular components.

#### Configure openvidu-angular

First, we need to install the openvidu-angular library. You can check how to do that [here](/api/openvidu-angular/).

Now, we can use all components that the openvidu-angular provides to us.

#### Adding toggle-hand feature

Focusing on the `app.component.html`, we discover how to customize the [VideoconferenceComponent](api/openvidu-angular/components/VideoconferenceComponent.html) for developing an application with toggle hand feature.


The first step is include a custom **hand button** in the [ToolbarComponent](api/openvidu-angular/components/ToolbarComponent.html) adding an element tagged with the [ToolbarAdditionalButtonsDirective](api/openvidu-angular/directives/ToolbarAdditionalButtonsDirective.html)   (`*ovToolbarAdditionalButtons`).

```html
<ov-videoconference
	(onJoinButtonClicked)="onJoinButtonClicked()"
	(onSessionCreated)="onSessionCreated($event)"
	[tokens]="tokens"
	[prejoin]="false"
>

	<div *ovToolbarAdditionalButtons>
		<button toolbar-btn mat-icon-button (click)="handleLocalHand()" [class.active-btn]="hasHandRaised">
			<mat-icon matTooltip="Toggle hand">front_hand</mat-icon>
		</button>
	</div>
	...

</ov-videoconference>
```

The `onSessionCreated` method is invoked when the session is created. We are going to use this event for subscribing to the `handToggle` signal and be able to know when a remote participant has raised the hand. For doing this, we are using the [signal](https://docs.openvidu.io/en/stable/api/openvidu-browser/classes/Session.html#signal) method which **openvidu-browser** provides to us.


```typescript
handleRemoteHand() {
	// Subscribe to hand toggling events from others
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

As you also can see in the toggle hand button, we have added a new additional button to the default toolbar and we have assigned the `handleLocalHand` callback when this button is clicked.


```typescript
handleLocalHand() {
	this.hasHandRaised = !this.hasHandRaised;

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


After that we must customize the [StreamComponent](api/openvidu-angular/components/StreamComponent.html) injecting a new element when a participant is raising the hand. Let's see how can we do that:

```html
<ov-videoconference
	(onJoinButtonClicked)="onJoinButtonClicked()"
	(onSessionCreated)="onSessionCreated($event)"
	[tokens]="tokens"
	[prejoin]="false"
>

	<div *ovToolbarAdditionalButtons>
		<button toolbar-btn mat-icon-button (click)="handleLocalHand()" [class.active-btn]="hasHandRaised">
			<mat-icon matTooltip="Toggle hand">front_hand</mat-icon>
		</button>
	</div>

	<div *ovStream="let stream" style="height: 100%">
		<ov-stream [stream]="stream"></ov-stream>

		<button mat-icon-button @inOutHandAnimation id="hand-notification" *ngIf="stream.participant.hasHandRaised">
			<mat-icon>front_hand</mat-icon>
		</button>
	</div>

	...

</ov-videoconference>
```

Now, using the [StreamDirective](api/openvidu-angular/directives/StreamDirective.html) (`*ovStream`) we can customize the StreamComponent and we can add whatever we want. As we just want to add a new html element to realise that a participant is raising the hand, we can use the entire default StreamComponent that the openvidu-angular provide to us.

We also have added the hand notification to participants panel. We can handle this using the [ParticipantPanelItemElementsDirective](/api/openvidu-angular/directives/ParticipantPanelItemElementsDirective.html) (`*ovParticipantPanelItemElements`) on a very simple way:

```html
<ov-videoconference
	(onJoinButtonClicked)="onJoinButtonClicked()"
	(onSessionCreated)="onSessionCreated($event)"
	[tokens]="tokens"
	[prejoin]="false"
>

	<div *ovToolbarAdditionalButtons>
		<button toolbar-btn mat-icon-button (click)="handleLocalHand()" [class.active-btn]="hasHandRaised">
			<mat-icon matTooltip="Toggle hand">front_hand</mat-icon>
		</button>
	</div>

	<div *ovStream="let stream" style="height: 100%">
		<ov-stream [stream]="stream"></ov-stream>

		<button mat-icon-button @inOutHandAnimation id="hand-notification" *ngIf="stream.participant.hasHandRaised">
			<mat-icon>front_hand</mat-icon>
		</button>
	</div>

	<div *ovParticipantPanelItemElements="let participant">
		<button mat-icon-button *ngIf="participant.hasHandRaised">
			<mat-icon>front_hand</mat-icon>
		</button>
	</div>
</ov-videoconference>
```

We have to take account that we can assign a participant variable to the `*ovParticipantPanelItemElements` directive for getting the participant object value from its context and be able to access to the participant properties.

So, as we want to add a new feature and as a consequence add a new property (`hasHandRaised`) to the [ParticipantAbstractModel](api/openvidu-angular/classes/ParticipantAbstractModel.html) we have to extend the ParticipantAbstractModel from the library.

To handle this, we've created a simple `ParticipantAppModel` class under `app/models/` with the `hasHandRaised` property and `toggleHandRaised` method:


```typescript
import { StreamModel, ParticipantAbstractModel } from 'openvidu-angular';

export class ParticipantAppModel extends ParticipantAbstractModel {

	hasHandRaised: boolean;

	toggleHandRaised() {
		this.hasHandRaised = !this.hasHandRaised;
	}
}
```

Once we have extended the ParticipantAbstractModel, we have to configure the library for using this new class. For doing this, we've add a participantFactory in out `app.module.ts` and assign to the `OpenViduAngularConfig`:


```typescript
const config: OpenViduAngularConfig = {
	production: environment.production,
	participantFactory: (props: ParticipantProperties, streamModel: StreamModel) => new ParticipantAppModel(props, streamModel)
};
```
Now we will be able to get the `hasHandRaised` participant property in the **ParticipantsPanelComponent** and **StreamComponent**.



## Running this tutorial


1) You will need angular-cli (and of course NPM) to serve the Angular frontend. You can check it with the following command:

```bash
npm -v
ng v
```

2) Clone the repo:

```bash
git clone https://github.com/OpenVidu/openvidu-tutorials.git -b v2.21.0
```

3) Run the tutorial:

```bash
cd openvidu-tutorials/openvidu-components/openvidu-toggle-hand
npm install
ng serve
```

4) OpenVidu Platform service must be up and running in your development machine. The easiest way is running this Docker container which wraps both of them (you will need [Docker CE](https://store.docker.com/search?type=edition&offering=community){:target="_blank"}):

```bash
# WARNING: this container is not suitable for production deployments of OpenVidu Platform
# Visit https://docs.openvidu.io/en/stable/deployment

docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-server-kms:2.21.0
```

5) Go to _[`http://localhost:4200`](http://localhost:4200){:target="_blank"}_ to test the app once the server is running. The first time you use the docker container, an alert message will suggest you accept the self-signed certificate of _openvidu-server_ when you first try to join a video-call.

> If you are using **Windows**, read this **[FAQ](troubleshooting/#3-i-am-using-windows-to-run-the-tutorials-develop-my-app-anything-i-should-know)** to properly run the tutorial

> To learn **some tips** to develop with OpenVidu, check this **[FAQ](troubleshooting/#2-any-tips-to-make-easier-the-development-of-my-app-with-openvidu)**

