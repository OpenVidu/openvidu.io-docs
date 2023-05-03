# openvidu-angular
<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-angular" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

An OpenVidu application built with **Angular**.

<div class="row">
    <div class="pro-gallery" style="margin: 20px 0 15px 0">
        <a data-fancybox="gallery-pro1" data-type="image" class="fancybox-img" href="img/tutorials/openvidu-angular.png">
          <img class="img-responsive" style="margin: auto; max-height: 500px" src="img/tutorials/openvidu-angular.png"/>
        </a>
    </div>
</div>

> If it is the first time you use OpenVidu, it is highly recommended to start with [openvidu-hello-world](tutorials/openvidu-hello-world/) tutorial, as this app is no more than an extension of it with some new features and styles.

> openvidu-angular app is to all intents and purposes the same as [openvidu-js](tutorials/openvidu-js/) app, but using Angular framework instead of plain web technologies. Try openvidu-angular if you plan to use Angular framework in your frontend.

## Running this tutorial

To run the tutorial you need the three components stated in [OpenVidu application architecture](developing-your-video-app/#openvidu-application-architecture): an OpenVidu deployment, your server application and your client application. In this order:

#### 1. Run OpenVidu deployment

Using [Docker Engine](https://docs.docker.com/engine/){:target="_blank"}:

```bash
# WARNING: this container is not suitable for production deployments of OpenVidu
# Visit https://docs.openvidu.io/en/stable/deployment

docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-dev:2.27.0
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

cd openvidu-tutorials/openvidu-angular
npm install
ng serve
```

Go to [`http://localhost:4200`](http://localhost:4200){:target="_blank"} to test the app once the server is running.

> To test the application with other devices in your network, visit this **[FAQ](troubleshooting/#3-test-applications-in-my-network-with-multiple-devices)**

<div class="row no-margin row-gallery">
	<div class="col-md-6">
		<a data-fancybox="gallery" data-type="image" class="fancybox-img" href="img/demos/insecure-join.png">
            <img class="img-responsive" src="img/demos/insecure-join.png">
        </a>
	</div>
	<div class="col-md-6">
		<a data-fancybox="gallery" data-type="image" class="fancybox-img" href="img/demos/insecure-session.png">
            <img class="img-responsive" src="img/demos/insecure-session.png">
        </a>
	</div>
</div>

## Understanding the code

This is an Angular project generated with Angular CLI tool, and therefore you will see lots of configuration files and other stuff that doesn't really matter to us. We will focus on the following files under `src/app/` folder:

- `app.component.ts`: defines *AppComponent*, main component of the app. It contains the functionalities for joining a video-call and for handling the video-calls themselves.
- `app.component.html`: HTML for AppComponent.
- `app.component.css`: CSS for AppComponent.
- `user-video.component.ts`: defines *UserVideoComponent*, used to display every user video. It contains one *OpenViduVideoComponent*, the name of the user and also handles a click event to update the view of *AppComponent*.
- `ov-video.component.ts`: defines *OpenViduVideoComponent*, which wraps the final HTML `<video>` that finally displays the media stream.

Let's see first how `app.component.ts` uses NPM package `openvidu-browser`:

---

#### We import the necessary objects from `openvidu-browser`:

```javascript
import { OpenVidu, Publisher, Session, StreamEvent, StreamManager, Subscriber } from 'openvidu-browser';
```

---

####`app.component.ts` declares the following properties:

```javascript
// OpenVidu objects
OV: OpenVidu;
session: Session;
publisher: StreamManager; // Local
subscribers: StreamManager[] = []; // Remotes

// Join form
mySessionId: string;
myUserName: string;

// Main video of the page, will be 'publisher' or one of the 'subscribers',
// updated by click event in UserVideoComponent children
mainStreamManager: StreamManager;
```

`OpenVidu` object will allow us to get a `Session` object, which is declared just after it. `publisher` StreamManager object will be our own local webcam stream and `subscribers` StreamManager array will store the active streams of other users in the video-call. Finally, `mySessionId` and `myUserName` params simply represent the video-call and your participant's nickname, as you will see in a moment.

---

#### Whenever a user clicks on the submit input defined in `app.component.html`, `joinSession()` method is called:

<br>

We first get an OpenVidu object and initialize a Session object with it.

```javascript
// --- 1) Get an OpenVidu object ---

this.OV = new OpenVidu();

// --- 2) Init a session ---

this.session = this.OV.initSession();
```

Then we subscribe to the Session events that interest us.

```javascript
// --- 3) Specify the actions when events take place in the session ---

// On every new Stream received...
this.session.on('streamCreated', (event: StreamEvent) => {

    // Subscribe to the Stream to receive it. Second parameter is undefined
    // so OpenVidu doesn't create an HTML video by its own
    let subscriber: Subscriber = this.session.subscribe(event.stream, undefined);
    this.subscribers.push(subscriber);
});

// On every Stream destroyed...
this.session.on('streamDestroyed', (event: StreamEvent) => {

    // Remove the stream from 'subscribers' array
    this.deleteSubscriber(event.stream.streamManager);
});

// On every asynchronous exception...
this.session.on('exception', (exception) => {
    console.warn(exception);
});
```

As we are using Angular framework, a good approach for managing the remote media streams is to loop across an array of them, feeding a common component with each `Subscriber` object and let it manage its video. This component will be our *UserVideoComponent*. To do this, we need to store each new Subscriber we received in array `subscribers` (of the parent class `StreamManager`), and we must remove from it every deleted subscriber whenever it is necessary. To achieve this, we use the following events:

- `streamCreated`: for each new Stream received by the Session object, we subscribe to it and store the returned Subscriber object in our `subscribers` array. Method `session.subscribe` has *undefined* as second parameter so OpenVidu doesn't insert and HTML video element in the DOM on its own (we will use the video element contained in one of our child components). HTML template of *AppComponent* loops through `subscribers` array with an `ngFor` directive, declaring a *UserVideoComponent* for each subscriber. We feed them not really as `Subscriber` objects, but rather as their parent class `StreamManager`. This way we can reuse *UserVideoComponent* to also display our `Publisher` object (that also inhertis from class StreamManager). `user-video` also declares the `click` event so we can update the main video player view when the user clicks on its Publisher or any Subscriber videos.

        <div *ngFor="let sub of subscribers" class="stream-container col-md-6 col-xs-6">
            <user-video [streamManager]="sub" (click)="updateMainStreamManager(sub)"></user-video>
        </div>

- `streamDestroyed`: for each Stream that has been destroyed from the Session object (which means a user has left the video-call), we remove the associated Subscriber from `subscribers` array, so Angular will automatically delete the required UserVideoComponent from HTML. Each Stream object has a property `streamManager` that indicates which Subscriber or Publisher owns it (in the same way, each StreamManager object also has a reference to its Stream).

- `exception`: event triggered by Session object when an asynchronous unexpected error takes place on the server-side

> You can take a look at all the events in the [Reference Documentation](api/openvidu-browser/classes/Event.html)

---

#### Get an OpenVidu token

We are ready to join the session. But we still need a token to get access to it, so we ask for it to the [server application](application-server/). The server application will in turn request a token to the OpenVidu deployment. If you have any doubts about this process, review the [Basic Concepts](developing-your-video-app/#basic-concepts).

```javascript
// --- 4) Connect to the session with a valid user token ---

// Get a token from the OpenVidu deployment
this.getToken().then(token => {
    // See next point to see how to connect to the session using 'token'
});
```

This is the piece of code in charge of finally retrieving a token from the server application. The tutorial uses Angular [HttpClient](https://angular.io/api/common/http/HttpClient){:target="_blank"} to perform the necessary [HTTP requests](application-server/#rest-endpoints).

```javascript
async getToken(): Promise<string> {
    const sessionId = await this.createSession(this.mySessionId);
    return await this.createToken(sessionId);
}

createSession(sessionId) {
    return this.httpClient.post(
        this.APPLICATION_SERVER_URL + 'api/sessions',
        { customSessionId: sessionId },
        { headers: { 'Content-Type': 'application/json' }, responseType: 'text' }
    ).toPromise();
}

createToken(sessionId) {
    return this.httpClient.post(
        this.APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections',
        {},
        { headers: { 'Content-Type': 'application/json' }, responseType: 'text' }
    ).toPromise();
}
```

---

#### Finally connect to the session and publish your webcam:

```javascript
// --- 4) Connect to the session with a valid user token ---

// Get a token from the OpenVidu deployment
this.getToken().then(token => {

    // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
    // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
    this.session.connect(token, { clientData: this.myUserName })
        .then(() => {

            // --- 5) Get your own camera stream ---

            // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
            // element: we will manage it on our own) and with the desired properties
            let publisher: Publisher = this.OV.initPublisher(undefined, {
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: undefined, // The source of video. If undefined default webcam
                publishAudio: true,     // Whether you want to start publishing with your audio unmuted or not
                publishVideo: true,     // Whether you want to start publishing with your video enabled or not
                resolution: '640x480',  // The resolution of your video
                frameRate: 30,          // The frame rate of your video
                insertMode: 'APPEND',   // How the video is inserted in the target element 'video-container'
                mirror: false           // Whether to mirror your local video or not
            });

            // --- 6) Publish your stream ---

            this.session.publish(publisher);

            // Set the main video in the page to display our webcam and store our Publisher
            this.mainStreamManager = publisher;
            this.publisher = publisher;
        })
        .catch(error => {
            console.log('There was an error connecting to the session:', error.code, error.message);
        });
});
```

In `session.connect` method first param is the recently retrieved user token. Second param is the value every user will receive in `event.stream.connection.data` property on `streamCreated` event (this value will be used by *UserVideoComponent* to append the user's nickname to the his video). So in this case it is an object with a property "clientData" with value "myUserName", which is binded from HTML input `<input class="form-control" type="text" id="userName" name="userName" [(ngModel)]="myUserName" required>` (filled by the user).

If the method succeeds, we proceed to publish our webcam to the session. To do so we get a `Publisher` object with the desired properties and publish it to the Session through `Session.publish()` method. The rest of users will receive our Stream object and will execute their `streamCreated` event. Finally we make the main video player (which is just another *UserVideoComponent*) display the Publisher object by default. This is the HTML code that will display the main stream manager:

```html
<div *ngIf="mainStreamManager" id="main-video" class="col-md-6">
    <user-video [streamManager]="mainStreamManager"></user-video>
</div>
```

And we store the Publisher under `this.publisher`, which is also of parent class `StreamManager`. This way our webcam will be appended along all remote subscribers, in exactly the same way they are shown (remember all of them are displayed by *UserVideoComponent*):

```html
<div *ngIf="publisher" class="stream-container col-md-6 col-xs-6">
    <user-video [streamManager]="publisher" (click)="updateMainStreamManager(publisher)"></user-video>
</div>
```

You can see that every `<user-video>` component for our Publisher and every Subscriber also updates the main video player when clicking on it.

Last point worth considering is the implementation of *UserVideoComponent* and *OpenViduVideoComponent*. Each *UserVideoComponent* manages one StreamManager object (a Subscriber or a Publisher) that will be fed to its child component *OpenViduVideoComponent*. Its main task is not managing the final video player (that is *OpenViduVideoComponent* responsibility), but displaying custom information for each one of them (the user's nickname in this case):

```html
<div>
    <ov-video [streamManager]="streamManager"></ov-video>
    <div><p>{% raw %}{{getNicknameTag()}}{% endraw %}</p></div>
</div>
```

```javascript
export class UserVideoComponent {

    @Input()
    streamManager: StreamManager;

    getNicknameTag() { // Gets the nickName of the user
        return JSON.parse(this.streamManager.stream.connection.data).clientData;
    }
}
```

*OpenViduVideoComponent* html template is just the video element:

```html
<video #videoElement></video>
```

And the unique responsibility of the component's logic is letting OpenVidu know the exact HTML DOM video player associated to its StreamManger. To do so we use method `StreamManager.addVideoElement`, which receives a native HTML video element. The way we implement this is Angular dependant: we get the video element with *@ViewChild* tag and we call the method once after the view has initialized (*ngAfterViewInit*) and once every time the StreamManager input changes (*set* method with *@Input* tag)

```javascript
export class OpenViduVideoComponent implements AfterViewInit {

    @ViewChild('videoElement') elementRef: ElementRef;

    _streamManager: StreamManager;

    ngAfterViewInit() {
        this._streamManager.addVideoElement(this.elementRef.nativeElement);
    }

    @Input()
    set streamManager(streamManager: StreamManager) {
        this._streamManager = streamManager;
        if (!!this.elementRef) {
            this._streamManager.addVideoElement(this.elementRef.nativeElement);
        }
    }
}
```

---

#### Leaving the session

Whenever we want a user to leave the session, we just need to call `session.disconnect` method in `app.component.ts`:

```javascript
  leaveSession() {

    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

    if (this.session) { this.session.disconnect(); };

    // Empty all properties...
    this.subscribers = [];
    delete this.publisher;
    delete this.session;
    delete this.OV;
    this.generateParticipantInfo();
  }
```

We also configure the component to call `session.disconnect` method before unloading the page or destroying the component:

```javascript
@HostListener('window:beforeunload')
beforeunloadHandler() {
  // On window closed leave session
  this.leaveSession();
}

ngOnDestroy() {
  // On component destroyed leave session
  this.leaveSession();
}
```

## Deploying openvidu-angular

#### 1) Build the docker image

Under the root project folder, you can see the `openvidu-angular/docker/` directory. Here it is included all the required files yo make it possible the deployment with OpenVidu.

First of all, you will need to create the **openvidu-angular** docker image. Under `openvidu-angular/docker/` directory you will find the `create_image.sh` script. This script will create the docker image with the [openvidu-basic-node](application-server/openvidu-basic-node/) as application server and the static files.

```bash
./create_image.sh openvidu/openvidu-angular-demo:X.Y.Z
```

This script will create an image named `openvidu/openvidu-angular-demo:X.Y.Z`. This name will be used in the next step.

#### 2) Deploy the docker image

Time to deploy the docker image. You can follow the [Deploy OpenVidu based application with Docker](/deployment/deploying-openvidu-apps/#with-docker) guide for doing this.


<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js"></script>
<script type='text/javascript' src='js/fancybox-setup.js'></script>