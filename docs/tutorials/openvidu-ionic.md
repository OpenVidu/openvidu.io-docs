# openvidu-ionic
<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-ionic" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

An OpenVidu application built with **Ionic**. It uses **Capacitor** as hybrid runtime and **Angular** as frontend framework. It can be compiled into:

- A **native Android app**
- A **native iOS app**
- A **native desktop app** (using **Electron**)
- A standard **web app**
- A **Progressive Web App** (check out [Ionic docs](https://ionicframework.com/docs/deployment/progressive-web-app){:target="_blank"}))

<div class="row">
    <div class="pro-gallery" style="margin: 20px 0 15px 0">
        <a data-fancybox="gallery-pro1" data-type="image" class="fancybox-img" href="img/tutorials/openvidu-ionic.png">
          <img class="img-responsive" style="margin: auto; max-height: 500px" src="img/tutorials/openvidu-ionic.png"/>
        </a>
    </div>
</div>

> If it is the first time you use OpenVidu, it is highly recommended to start with [openvidu-hello-world](tutorials/openvidu-hello-world/) tutorial, as this app is no more than an extension of it with some new features and styles.

## Running this tutorial

To run the tutorial you need the three components stated in [OpenVidu application architecture](developing-your-video-app/#openvidu-application-architecture): an OpenVidu deployment, your server application and your client application. In this order:

#### 1. Run OpenVidu deployment

Using [Docker Engine](https://docs.docker.com/engine/){:target="_blank"}:

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

You need [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm){:target="_blank"} and [Ionic](https://ionicframework.com/docs/intro/cli){:target="_blank"} to run the application. Check them with the following command:

```bash
npm -v
ionic -v
```

You can install Ionic CLI with NPM like this:

```
npm install --location=global @ionic/cli
```

Install application dependencies:

```bash
# Using the same repository openvidu-tutorials from step 2

cd openvidu-tutorials/openvidu-ionic
npm install
```

Now depending on the platform you want to run your app...

<br>

##### In the browser as a web application

```bash
# Path openvidu-tutorials/openvidu-ionic
ionic serve
```

Go to [`http://localhost:8100`](http://localhost:8100){:target="_blank"} to test the app once the server is running.

To show the app with a mobile device appearance, open the dev tools in your browser. Find the button to adapt the viewport to a mobile device aspect ratio. You may also choose predefined types of devices to see the behavior of your app in different resolutions.

> To test the application with other devices in your network, visit this **[FAQ](troubleshooting/#3-test-applications-in-my-network-with-multiple-devices)**

<div class="row no-margin row-gallery">
	<div class="col-md-6">
		<a data-fancybox="gallery" data-type="image" class="fancybox-img" href="img/demos/ionic-chrome1.png">
            <img class="img-responsive" src="img/demos/ionic-chrome1.png">
        </a>
	</div>
	<div class="col-md-6">
		<a data-fancybox="gallery" data-type="image" class="fancybox-img" href="img/demos/ionic-chrome2.png">
            <img class="img-responsive" src="img/demos/ionic-chrome2.png">
        </a>
	</div>
</div>

<br>

##### In a mobile device as a native application

Real Android and iOS devices will require a valid SSL certificate in your OpenVidu deployment to work. By default openvidu-ionic tutorial uses the official demos OpenVidu deployment ([demos.openvidu.io](https://demos.openvidu.io)), so you can quickly test the app without having to worry about this.

But this OpenVidu deployment is not secure and anyone could access your video sessions. At some point you will need one of two things to securely develop your application:

1. A real OpenVidu deployment with a valid domin name and SSL certificate.
2. A local OpenVidu deployment available in your LAN network with a valid self-signed SSL certificate.

Option 1 just requires to follow the official [deployment instructions](deployment/). For option 2, after running the [steps described above](#running-this-tutorial), we must follow the instructions explained in this **[FAQ](troubleshooting/#3-test-applications-in-my-network-with-multiple-devices)**. In that way we will have the OpenVidu deployment and our server application accessible through our LAN network using a single IP, port and SSL certificate.

Whatever option you choose, once you have your development OpenVidu setup available through a valid SSL certificate, you can proceed to run the app on Android or iOS:<br><br>

###### Android

Follow the [Ionic official instructions](https://ionicframework.com/docs/developing/android){:target="_blank"} to run the app in your Android device with **Capacitor**. You will have to install Android Studio and run some commands. Capacitor offers a simple command to directly open the Anroid project in Android Studio:

```bash
# In openvidu-tutorials/openvidu-ionic
npx cap open android
```

###### iOS

Follow the [Ionic official instructions](https://ionicframework.com/docs/developing/ios){:target="_blank"} to run the app in your iOS device with **Capacitor**. You will have to install Xcode, sign the application and run some commands. Capacitor offers a simple command to directly open the iOS project in Xcode:

```bash
# In openvidu-tutorials/openvidu-ionic
npx cap open ios
```

<br>

<div class="row no-margin ">
	<div class="col-md-4 col-sm-4">
		<a data-fancybox="gallery2" data-type="image" class="fancybox-img" href="img/demos/ov-ionic1.png">
      <img class="img-responsive" src="img/demos/ov-ionic1.png">
    </a>
	</div>
	<div class="col-md-4 col-sm-4">
		<a data-fancybox="gallery2" data-type="image" class="fancybox-img" href="img/demos/ov-ionic2.png">
      <img class="img-responsive" src="img/demos/ov-ionic2.png">
    </a>
	</div>
    <div class="col-md-4 col-sm-4">
		<a data-fancybox="gallery2" data-type="image" class="fancybox-img" href="img/demos/ov-ionic3.png">
      <img class="img-responsive" src="img/demos/ov-ionic3.png">
    </a>
	</div>
</div>

<br>

##### In a desktop device as a native application

Electron allows us to compile the Ionic project into a native Windows, macOS or Linux application. To open the application as a native desktop app, simply run:

```bash
# In openvidu-tutorials/openvidu-ionic
cd electron
npm i
cd ..
npx cap open electron
```

> If you get a `Content Security Policy directive` error when connecting to an OpenVidu Session, you might need to modify the `setup.ts` file at [these lines](https://github.com/OpenVidu/openvidu-tutorials/blob/f801088409bf6c463edd256c0a67ccb2a9c5f8e5/openvidu-ionic/electron/src/setup.ts#L227-L228){:target="_blank"}. Add whatever policies you need.

<br>

The `electron` folder of the openvidu-ionic tutorial contains a regular Electron project that you can modify to your needs. Its `package.json` file contains npm scripts to serve the app or compile it with `electron-builder`. To reflect any change made to the Angular source code on the Electron app, you may run this command:

```bash
# In openvidu-tutorials/openvidu-ionic
npx cap sync electron
```

To regenerate the `electron` folder, simply run this command:

```bash
# In openvidu-tutorials/openvidu-ionic
npx cap add @capacitor-community/electron
```

<br>

## Understanding the code

This is an Ionic project generated with ionic-cli tool, and therefore you will see lots of configuration files and other stuff that doesn't really matter to us. We will focus on the following files under `src/app/` folder:

- `app.component.ts`: defines *AppComponent*, main component of the app. It contains the functionalities for joining a video-call and for handling the video-calls themselves.
- `app.component.html`: HTML for AppComponent.
- `app.component.css`: CSS for AppComponent.
- `user-video.component.ts`: defines *UserVideoComponent*, used to display every user video. It contains one *OpenViduVideoComponent*, the name of the user and also handles a click event to update the view of *AppComponent*.
- `ov-video.component.ts`: defines *OpenViduVideoComponent*, which wraps the final HTML `<video>` that finally displays the media stream.

Let's see first how `app.component.ts` uses NPM package `openvidu-browser`:

---

#### We import the necessary objects from `openvidu-browser`:

```javascript
import {
	Device,
	OpenVidu,
	Publisher,
	PublisherProperties,
	Session,
	StreamEvent,
	StreamManager,
	Subscriber
} from 'openvidu-browser';
```

---

####`app.component.ts` declares the following openvidu-browser SDK related properties:

```javascript
// OpenVidu objects
OV: OpenVidu;
session: Session;
publisher: StreamManager; // Local
subscribers: StreamManager[] = []; // Remotes

// Join form
mySessionId: string;
myUserName: string;
```

`OpenVidu` object will allow us to get a `Session` object, which is declared just after it. `publisher` StreamManager object will be our own local webcam stream and `subscribers` StreamManager array will store the active streams of other users in the video-call. Finally, `mySessionId` and `myUserName` params simply represent the video-call and your participant's nickname.

---

#### Whenever a user clicks on the join button defined in `app.component.html`, method `joinSession()` is called:

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
    // so OpenVidu doesn't create an HTML video on its own
    const subscriber: Subscriber = this.session.subscribe(event.stream, undefined);
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

As we are using Ionic and Angular framework, a good approach for managing the remote media streams is to loop across an array of them, feeding a common component with each `Subscriber` object and let it manage its video element. This component will be our *UserVideoComponent*. To do this, we need to store each new Subscriber we receive in the array `subscribers` (of its parent class `StreamManager`), and we must remove from it every deleted subscriber whenever it is necessary. To achieve this, we use the following events:

- `streamCreated`: for each new Stream received by the Session object, we subscribe to it and store the returned Subscriber object in our `subscribers` array. Method `session.subscribe` has *undefined* as second parameter so OpenVidu doesn't insert an HTML video element in the DOM on its own (we will use the video element contained in one of our child components). HTML template of *AppComponent* loops through `subscribers` array with an `ngFor` directive, declaring a *UserVideoComponent* for each subscriber. We feed them not really as `Subscriber` objects, but rather as their parent class `StreamManager`. This way we can reuse *UserVideoComponent* to also display our `Publisher` object (that also inherits from class StreamManager).

        <ion-col size="6" *ngFor="let sub of subscribers">
            <div class="stream-container">
                <user-video [streamManager]="sub"></user-video>
            </div>
        </ion-col>

- `streamDestroyed`: for each Stream that has been destroyed from the Session object (which means a user has left the video-call), we remove the associated Subscriber from `subscribers` array, so Angular will automatically delete the required UserVideoComponent from HTML. Each Stream object has a property `streamManager` that indicates which Subscriber or Publisher owns it (in the same way, each StreamManager object also has a reference to its Stream).

- `exception`: event triggered by Session object when an asynchronous unexpected error takes place on the server-side

> You can take a look at all the events in the [Reference Documentation](api/openvidu-browser/classes/Event.html)

---

#### Get an OpenVidu token

We are ready to join the session. But we still need a token to get access to it, so we ask for it to the [server application](application-server/). The server application will in turn request a token to the OpenVidu deployment. If you have any doubts about this process, review the [Basic Concepts](developing-your-video-app/#basic-concepts).

```javascript
// --- 4) Connect to the session with a valid user token ---

try {
    // Get a token from the OpenVidu deployment
    const token = await this.getToken();
```

This is the piece of code in charge of finally retrieving a token from the server application. The tutorial uses Angular [HttpClient](https://angular.io/api/common/http/HttpClient){:target="_blank"} to perform the necessary [HTTP requests](application-server/#rest-endpoints).

```javascript
async getToken(): Promise<string> {
    const sessionId = await this.createSession(this.mySessionId);
    return await this.createToken(sessionId);
}

async createSession(sessionId) {
    const response = this.httpClient.post(
        this.APPLICATION_SERVER_URL + 'api/sessions',
        { customSessionId: sessionId },
        { headers: { 'Content-Type': 'application/json' }, responseType: 'text' }
    );
    return lastValueFrom(response);
}

async createToken(sessionId) {
    const response = this.httpClient.post(
        this.APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections',
        {},
        { headers: { 'Content-Type': 'application/json' }, responseType: 'text' }
    );
    return lastValueFrom(response);
}
```

---

#### Connect to the session:

```javascript
try {
    // Get a token from the OpenVidu deployment
    const token = await this.getToken();
    // First param is the token got from OpenVidu deployment. Second param will be used by every user on event
    // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
    await this.session.connect(token, { clientData: this.myUserName });

    // --- 5) Requesting and Checking Android Permissions
    if (this.platform.is('hybrid') && this.platform.is('android')) {
        console.log('Ionic Android platform');
        await this.checkAndroidPermissions();
    }

    this.initPublisher();
} catch (error) {
    console.log('There was an error connecting to the session:', error.code, error.message);
}
```

In `session.connect` method first param is the recently retrieved user token. Second param is the value every user will receive in `event.stream.connection.data` property on `streamCreated` event (this value will be used by *UserVideoComponent* to append the user's nickname to their video). So in this case it is an object with a property "clientData" with value "myUserName", which is binded from HTML input `<ion-input [(ngModel)]="myUserName"></ion-input>` (filled by the user).

If the method succeeds and is running under a hybrid Android platform, we will call and receive a promise from `checkAndroidPermissions()` method. This method requests and checks the Android permissions that our app currently has in the device. Once the promise has been resolved, the `initPublisher()` method will be called. For iOS and web platforms, permissions will be handled automatically when camera and microphone access are requested. No need for extra steps in these cases, so we directly initialize our Publisher object.

We do further talk about Android permissions under section [Android specific requirements](#android-specific-requirements).

#### Finally publish your webcam calling `initPublisher()` method:

```javascript
async initPublisher() {
    // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
    // element: we will manage it on our own) and with the desired properties
    const publisher: Publisher = await this.OV.initPublisherAsync(undefined, {
        audioSource: undefined, // The source of audio. If undefined default microphone
        videoSource: undefined, // The source of video. If undefined default webcam
        publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
        publishVideo: true, // Whether you want to start publishing with your video enabled or not
        resolution: '640x480', // The resolution of your video
        frameRate: 30, // The frame rate of your video
        insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
        mirror: this.isFrontCamera // Whether to mirror your local video or not
    });

    publisher.on('accessAllowed', () => this.initDevices());

    // --- 6) Publish your stream ---

    await this.session.publish(publisher);
    // Store our Publisher
    this.publisher = publisher;
}
```

We now proceed to publish our webcam to the session. To do so we get a `Publisher` object with the desired properties and publish it to the Session through `Session.publish()` method. The rest of users will receive our Stream object and will execute their `streamCreated` event.

After a successfull call to `session.publish`, we store the Publisher object under `this.publisher` variable, which is also of parent class `StreamManager`. This way our webcam will be appended along all remote subscribers, in exactly the same way they are shown (remember all of them are displayed by *UserVideoComponent*):

```html
<ion-col size="6">
    <div *ngIf="publisher" class="stream-container">
        <user-video [streamManager]="publisher"></user-video>
    </div>
</ion-col>
```

Last point worth considering is the implementation of *UserVideoComponent* and *OpenViduVideoComponent*. Each *UserVideoComponent* manages one StreamManager object (a Subscriber or a Publisher) that will be fed to its child component *OpenViduVideoComponent* . Its main task is not managing the final video player (that is *OpenViduVideoComponent* responsibility), but displaying custom information for each one of them (the user's nickname in this case):

```html
<div>
    <ov-video [streamManager]="streamManager"></ov-video>
    <div>
        <p>{{ nickname }}</p>
    </div>
</div>
```

```javascript
export class UserVideoComponent implements OnInit {

	nickname = '';

	@Input()
	streamManager: StreamManager;

	ngOnInit() {
		this.getNicknameTag();
	}

	getNicknameTag() {
		try {
			this.nickname = JSON.parse(this.streamManager.stream.connection.data).clientData;
		} catch (err) {
			console.error('ClientData is not JSON formatted');
			this.nickname = 'unknown';
		}
	}
}
```

*OpenViduVideoComponent* html template is just the video element:

```html
<video #videoElement style="width: 100%"></video>
```

And the responsibility of the component's logic is letting OpenVidu know the exact HTML DOM video player associated to its StreamManger. To do so we use method `StreamManager.addVideoElement`, which receives a native HTML video element. The way we implement this is Angular dependant: we get the video element with *@ViewChild* tag and we call the method once after the view has initialized (*ngAfterViewInit*) and once every time the StreamManager input changes (*set* method with *@Input* tag)

```javascript
export class OpenViduVideoComponent implements AfterViewInit {

	@ViewChild('videoElement') elementRef: ElementRef;

	_streamManager: StreamManager;

	constructor() { }

	ngAfterViewInit() {
		this.updateVideoView();
	}

	@Input()
	set streamManager(streamManager: StreamManager) {
		this._streamManager = streamManager;
		if (!!this.elementRef) {
			this.updateVideoView();
		}
	}

	private updateVideoView() {
		this._streamManager.addVideoElement(this.elementRef.nativeElement);
	}
}
```

---

#### Leaving the session

Whenever we want a user to leave the session, we just need to call `session.disconnect` method in `app.component.ts`:

```javascript
leaveSession() {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

    if (this.session) {
        this.session.disconnect();
    }

    // Empty all properties...
    this.subscribers = [];
    delete this.publisher;
    delete this.session;
    delete this.OV;
    this.generateParticipantInfo();
}
```

We also configure the component to call `leaveSession` method before unloading the page:

```javascript
@HostListener('window:beforeunload')
beforeunloadHandler() {
    // On window closed leave session
    this.leaveSession();
}
```

## Android specific requirements

> The following configurations are already included in this **openvidu-ionic** project. You don't need to follow below instructions if you are using this tutorial as a starting point.

To handle camera and microphone permissions, we need to use the [Android Permissions](https://ionicframework.com/docs/native/android-permissions){:target="_blank"} plugin. Install it and use it just as indicated by the Ionic documentation.

We also need to request for media permissions adding these few lines in `/android/app/src/main/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
<uses-permission android:name="android.permission.INTERNET" />
```

For the application to trust custom SSL certificates installed in the Android device, it is also necessary to include property `android:networkSecurityConfig="@xml/network_security_config"` to the `manifest/application/activity` element of the `/android/app/src/main/AndroidManifest.xml` file. And to add a `network_security_config.xml` file to folder `android/app/src/main/res/xml` with the following content:

```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
  <base-config>
    <trust-anchors>
      <certificates src="system"/>
      <certificates src="user"/>
    </trust-anchors>
  </base-config>
</network-security-config>
```

This network security cofiguration is only necessary if you are using a self-signed SSL certificate in a LAN development setup, as explained [here](#in-a-mobile-device-as-a-native-application). If you are using a real OpenVidu deployment with a valid domain name, then this configuration is not necessary.

openvidu-ionic tutorial uses [**trapeze**](https://trapeze.dev/){:target="_blank"} to automatically include these two modifications to the Android project. You can actually delete the `android` folder and regenerate this configuration with:

```bash
ionic capacitor add android # Add the android project
npm run trapeze             # Run trapeze to include the necessary Android modifications
```

## iOS specific requirements

> The following configurations are already included in this **openvidu-ionic** project. You don't need to follow below instructions if you are using this tutorial as a starting point.

We must to add the following lines to `ios/App/App/Info.plist` file for media permissions.

```xml
<key>NSCameraUsageDescription</key>
<string>This Application uses your camera to make video calls.</string>
<key>NSMicrophoneUsageDescription</key>
<string>This Application uses your microphone to make calls.</string>
```

<br>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js"></script>
<script type='text/javascript' src='js/fancybox-setup.js'></script>