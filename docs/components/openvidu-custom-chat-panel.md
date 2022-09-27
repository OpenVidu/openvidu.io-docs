# openvidu-custom-chat-panel

<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-components/openvidu-custom-chat-panel" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

The openvidu-custom-chat-panel tutorial demonstrates how to replace the default **chat panel** with a custom one.

This customization is possible thanks to the [**ChatPanelDirective**](api/openvidu-angular/directives/ChatPanelDirective.html), which provides us a simple way to customize the [**ChatPanelComponent**](api/openvidu-angular/components/ChatPanelComponent.html).

<p align="center" style="margin-top: 30px">
  <img class="img-responsive" style="max-width: 80%" src="img/components/chat-panel.png">
</p>

<br>

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

cd openvidu-tutorials/openvidu-components/openvidu-custom-chat-panel
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

First, we need to install the openvidu-angular library. You can check how to do that [here](api/openvidu-angular/).

The [VideoconferenceComponent](api/openvidu-angular/components/VideoconferenceComponent.html) needs the OpenVidu tokens to connect to the session. We request them on `ngOnInit` method. The VideoconferenceComponent will automatically use them to connect to the session when available.

```html
<ov-videoconference
  (onSessionCreated)="onSessionCreated($event)"
  [tokens]="tokens"
  [toolbarDisplaySessionName]="false">
  <div *ovChatPanel id="my-panel">
    <h3>Chat</h3>
    <div>
      <ul>
        <li *ngFor="let msg of messages">{{ msg }}</li>
      </ul>
    </div>
    <input value="Hello" #input />
    <button (click)="send(input.value)">Send</button>
  </div>
</ov-videoconference>
```

Inside of the `ov-videoconference` component we add the custom template tagged with the `*ovChatPanel` directive. You can see how the `ChatPanelDirective` works [here](api/openvidu-angular/directives/ChatPanelDirective.html).

In this case we replace the default chat panel with a very simple custom one. Messages are displayed in a `ul` list, and the user can send the content of an `input` element as a new message by pressing the `Send` button.

`app.component.ts` declares the following properties and methods:

```javascript
APPLICATION_SERVER_URL = 'http://localhost:5000/';

sessionId = "chat-panel-directive-example";
tokens!: TokenModel;

session!: Session;
messages: string[] = [];

constructor(private httpClient: HttpClient) { }

async ngOnInit() {
  this.tokens = {
    webcam: await this.getToken(),
    screen: await this.getToken(),
  };
}

onSessionCreated(session: Session) {
  this.session = session;
  this.session.on(`signal:${Signal.CHAT}`, (event: any) => {
    const msg = JSON.parse(event.data).message;
    this.messages.push(msg);
  });
}

send(message: string): void {
  const signalOptions: SignalOptions = {
    data: JSON.stringify({ message }),
    type: Signal.CHAT,
    to: undefined,
  };
  this.session.signal(signalOptions);
}

getToken() {
  // Requesting tokens to the server application
}
```

Where:

- `APPLICATION_SERVER_URL`: URL to communicate the client application with the server application to request OpenVidu tokens.
- `sessionId`: OpenVidu Session identifier. This is the session where the VideoconferenceComponent will connect to.
- `tokens`: object where OpenVidu Tokens are stored. The VideoconferenceComponent uses this object to connect to the session.
- `session`: OpenVidu Session object. We need this object to subscribe to `signal` event and send signals, so we are able to receive and send chat messages.
- `messages`: collection of chat messages that will be displayed in our custom chat panel.
- `constructor` method with dependency injection.
- `ngOnInit` method where OpenVidu Tokens are requested.
- `onSessionCreated` method to get the Session object from `ov-videoconference` component and subscribe to `signal` event.
- `send` method to call [`Session.signal`](api/openvidu-browser/classes/Session.html#signal) method to send a chat message to the OpenVidu Session.

