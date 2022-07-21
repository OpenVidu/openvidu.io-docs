# openvidu-ionic-cordova
<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-ionic-cordova" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

An OpenVidu application built with **Ionic**. It uses **Cordova** as hybrid app runtime and **Angular** as frontend framework. It can be compiled into a **native Android app**, a **native iOS app** and into a standard **web app**.

<div class="row">
    <div class="pro-gallery" style="margin: 20px 0 15px 0">
        <a data-fancybox="gallery-pro1" data-type="image" class="fancybox-img" href="img/tutorials/openvidu-ionic.png">
          <img class="img-responsive" style="margin: auto; max-height: 500px" src="img/tutorials/openvidu-ionic.png"/>
        </a>
    </div>
</div>

> If it is the first time you use OpenVidu, it is highly recommended to start with [openvidu-hello-world](tutorials/openvidu-hello-world/) tutorial, as this app is no more than an extension of it with some new features and styles.

<div class="warningBoxContent">
  <div style="display: table-cell; vertical-align: middle;">
      <i class="icon ion-android-alert warningIcon"></i>
  </div>
  <div class="warningBoxText">
    This Ionic tutorial is exactly the same than <a href="tutorials/openvidu-ionic/">openvidu-ionic</a> tutorial but using <a href="https://cordova.apache.org/">Cordova</a> instead of Capacitor as hybrid app runtime.
  </div>
</div>

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

You need [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm){:target="_blank"}, [Ionic](https://ionicframework.com/docs/intro/cli){:target="_blank"} and [Cordova](https://cordova.apache.org/docs/en/latest/guide/cli/){:target="_blank"} to run the application. Check them with the following command:

```bash
npm -v
ionic -v
cordova -v
```

You can install Ionic and Cordova CLIs with NPM like this:

```
npm install -g @ionic/cli
npm install -g cordova
```

Install application dependencies:

```bash
# Using the same repository openvidu-tutorials from step 2

cd openvidu-tutorials/openvidu-ionic-cordova
npm install
```

Now depending on the platform you want to run your app...

<br>

##### In the browser

See [how to run in the browser](tutorials/openvidu-ionic/#in-the-browser) section of **openvidu-ionic**.

##### In an Android device with native app

First follow the same steps as described in openvidu-ionic tutorial, section [How to run in Android device](tutorials/openvidu-ionic/#in-an-android-device-with-native-app).

Then run the tutorial with cordova. The app will be automatically launched in your Android device

        # In openvidu-tutorials/openvidu-ionic-cordova
        ionic cordova run android

<br>

##### In an iOS device with native app

<div style="
    display: table;
    border: 2px solid #0088aa9e;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 25px;
    padding: 5px 0 5px 0;
    background-color: rgba(0, 136, 170, 0.04);"><div style="display: table-cell; vertical-align: middle;">
    <i class="icon ion-android-alert" style="
    font-size: 50px;
    color: #0088aa;
    display: inline-block;
    padding-left: 25%;
"></i></div>
<div style="
    vertical-align: middle;
    display: table-cell;
    padding-left: 20px;
    padding-right: 20px;
    ">
	This tutorial has been tested with Xcode (10.2.1) and iPhone 7 (iOS 12.2), iPhone 7 Plus (iOS 12.1) and iPad Air (iOS 12.1.1)
</div>
</div>

To deploy the iOS app you will need first to follow Ionic's [iOS Development guide](https://ionicframework.com/docs/developing/ios){:target="_blank"} to properly configure your development environment. Then, it is crucial to have an OpenVidu deployment properly running with a **valid SSL certificate**.

<div style="
    display: table;
    border: 2px solid #ffb600;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    background-color: #FFFBF1;
    margin-bottom: 25px;
    padding: 5px 0 5px 0;"><div style="display: table-cell; vertical-align: middle;">
    <i class="icon ion-android-alert" style="
    font-size: 50px;
    color: #ffb600;
    display: inline-block;
    padding-left: 25%;
"></i></div>
<div style="
    vertical-align: middle;
    display: table-cell;
    padding: 10px 20px;">
    iOS devices will require OpenVidu to be deployed in a valid domain well-protected with an SSL certificate.<br>No iPhone or iPad will allow connections to a non-secure OpenVidu deployment from within a native application. To facilitate first steps with OpenVidu and Ionic on iOS devices, if no custom url is defined <a href="https://github.com/OpenVidu/openvidu-tutorials/blob/master/openvidu-ionic-cordova/src/app/app.component.ts#L18" target="_blank">here in the app</a> then our demos OpenVidu deployment will be used. <strong>Note: this is a publicly accessible OpenVidu deployment. Anyone could access your sessions. Use it only for an initial test and under your own responsibility</strong>
</div>
</div>

After we have completed all the steps of the Ionic guide:

1. Add ios platform

        # In openvidu-tutorials/openvidu-ionic-cordova
        ionic cordova platform add ios

2. Run the tutorial. The app will be automatically launched in your iOS device. First execution you'll need to trust your developer account in your device under `Settings -> General -> Device management -> your_apple_developer_account`

        # In openvidu-tutorials/openvidu-ionic-cordova
        ionic cordova run ios

You will need to sign your application in Xcode (opening folder _openvidu-ionic/platforms/ios_) with your developer team to avoid any errors. From Apple [official documentation](https://help.apple.com/xcode/mac/current/#/dev5a825a1ca){:target="_blank"}:

<p align="center">
  <img class="img-responsive xcode-img" style="padding: 25px 0; max-width: 750px" src="img/tutorials/xcode_sign.png">
</p>

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
```

`OpenVidu` object will allow us to get a `Session` object, which is declared just after it. `publisher` StreamManager object will be our own local webcam stream and `subscribers` StreamManager array will store the active streams of other users in the video-call. Finally, `mySessionId` and `myUserName` params simply represent the video-call and your participant's nickname, as you will see in a moment.

---

#### Whenever a user clicks on the join button defined in `app.component.html`, `joinSession()` method is called:

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

As we are using Ionic and Angular framework, a good approach for managing the remote media streams is to loop across an array of them, feeding a common component with each `Subscriber` object and let it manage its video. This component will be our *UserVideoComponent*. To do this, we need to store each new Subscriber we received in array `subscribers` (of its parent class `StreamManager`), and we must remove from it every deleted subscriber whenever it is necessary. To achieve this, we use the following events:

- `streamCreated`: for each new Stream received by the Session object, we subscribe to it and store the returned Subscriber object in our `subscribers` array. Method `session.subscribe` has *undefined* as second parameter so OpenVidu doesn't insert an HTML video element in the DOM on its own (we will use the video element contained in one of our child components). HTML template of *AppComponent* loops through `subscribers` array with an `ngFor` directive, declaring a *UserVideoComponent* for each subscriber. We feed them not really as `Subscriber` objects, but rather as their parent class `StreamManager`. This way we can reuse *UserVideoComponent* to also display our `Publisher` object (that also inherits from class StreamManager).

        <ion-col size="6" *ngFor="let sub of subscribers">
          <div class="stream-container">
            <user-video [streamManager]="sub"></user-video>
          </div>
        </ion-col>

- `streamDestroyed`: for each Stream that has been destroyed from the Session object (which means a user has left the video-call), we remove the associated Subscriber from `subscribers` array, so Angular will automatically delete the required UserVideoComponent from HTML. Each Stream object has a property `streamManager` that indicates which Subscriber or Publisher owns it (in the same way, each StreamManager object also has a reference to its Stream).

- `exception`: event triggered by Session object when an asynchronous unexpected error takes place on the server-side

---

#### Get a _token_ from OpenVidu Server

<div style="
    display: table;
    border: 2px solid #0088aa9e;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 25px;
    padding: 5px 0 5px 0;
    background-color: rgba(0, 136, 170, 0.04);"><div style="display: table-cell; vertical-align: middle;">
    <i class="icon ion-android-alert" style="
    font-size: 50px;
    color: #0088aa;
    display: inline-block;
    padding-left: 25%;
"></i></div>
<div style="
    vertical-align: middle;
    display: table-cell;
    padding-left: 20px;
    padding-right: 20px;
    ">
	<strong>WARNING</strong>: This is why this tutorial is an insecure application. We need to ask OpenVidu Server for a user token in order to connect to our session. <strong>This process should entirely take place in our server-side</strong>, not in our client-side. But due to the lack of an application backend in this tutorial, the Angular front itself will perform the POST operations to OpenVidu Server
</div>
</div>

```javascript
// --- 4) Connect to the session with a valid user token ---

// 'getToken' method is simulating what your server-side should do.
// 'token' parameter should be retrieved and returned by your own backend
this.getToken().then((token) => {
	// See next point to see how to connect to the session using 'token'
});
```

Now we need a token from OpenVidu Server. In a production environment we would perform this operations in our application backend, by making use of the _[REST API](reference-docs/REST-API/)_, _[OpenVidu Java Client](reference-docs/openvidu-java-client/)_ or _[OpenVidu Node Client](reference-docs/openvidu-node-client/)_. Here we have implemented the POST requests to OpenVidu Server in a method `getToken()` that returns a Promise with the token, using `@angular/http` library. Without going into too much detail, this method performs two POST requests to OpenVidu Server, passing OpenVidu Server secret to authenticate them:

  - First request performs a POST to `/openvidu/api/sessions` (we send a `customSessionId` field to name the session with our `mySessionId` value retrieved from HTML input)
  - Second request performs a POST to `/openvidu/api/sessions/<sessionId>/connection` (the path requires the `sessionId` to assign the token to this same session)

You can inspect this method in detail in the [GitHub repo](https://github.com/OpenVidu/openvidu-tutorials/blob/master/openvidu-ionic-cordova/src/app/app.component.ts#L302){:target="_blank"}.

---

#### Connect to the session:

```javascript
// --- 4) Connect to the session with a valid user token ---

// 'getToken' method is simulating what your server-side should do.
// 'token' parameter should be retrieved and returned by your own backend
this.getToken().then((token) => {
    // First param is the token got from OpenVidu Server. Second param will be used by every user on event
    // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
    this.session
        .connect(token, { clientData: this.myUserName })
        .then(() => {
            // --- 5) Requesting and Checking Android Permissions
            if (this.platform.is('cordova')) {
                // Ionic platform
                if (this.platform.is('android')) {
                    console.log('Android platform');
                    this.checkAndroidPermissions()
                        .then(() => this.initPublisher())
                        .catch(err => console.error(err));
                } else if (this.platform.is('ios')) {
                    console.log('iOS platform');
                    this.initPublisher();
                }
            } else {
                this.initPublisher();
            }
        })
        .catch(error => {
            console.log('There was an error connecting to the session:', error.code, error.message);
        });
});
```

In `session.connect` method first param is the recently retrieved user token. Second param is the value every user will receive in `event.stream.connection.data` property on `streamCreated` event (this value will be used by *UserVideoComponent* to append the user's nickname to the his video). So in this case it is an object with a property "clientData" with value "myUserName", which is binded from HTML input `<ion-input [(ngModel)]="myUserName"></ion-input>` (filled by the user).

If the method succeeds and is running under a Cordova and Android platform, we will call and receive a promise from `checkAndroidPermissions()` method. This method requests and checks the Android permissions that our app currently has in the device. Once the promise has been resolved, the `initPublisher()` method will be called. For iOS  and web platforms, permissions will be handled automatically when camera and microphone access are requested. No need for extra steps in these cases, so we directly initialize our Publisher object.

We do further talk about Android permissions under section [Android specific requirements](#android-specific-requirements).

#### Finally publish your webcam calling `initPublisher()` method:

```javascript
initPublisher() {
    // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
    // element: we will manage it on our own) and with the desired properties
    const publisher: Publisher = this.OV.initPublisher(undefined, {
        audioSource: undefined, // The source of audio. If undefined default microphone
        videoSource: undefined, // The source of video. If undefined default webcam
        publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
        publishVideo: true, // Whether you want to start publishing with your video enabled or not
        resolution: '640x480', // The resolution of your video
        frameRate: 30, // The frame rate of your video
        insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
        mirror: true // Whether to mirror your local video or not
    });

    // --- 6) Publish your stream ---

    this.session.publish(publisher).then(() => {
        // Store our Publisher
        this.publisher = publisher;
    });
}
```

We now proceed to publish our webcam to the session. To do so we get a `Publisher` object with the desired properties and publish it to the Session through `Session.publish()` method. The rest of users will receive our Stream object and will execute their `streamCreated` event.

In the callback of `session.publish` we store the Publisher object under `this.publisher` variable, which is also of parent class `StreamManager`. This way our webcam will be appended along all remote subscribers, in exactly the same way they are shown (remember all of them are displayed by *UserVideoComponent*):

```html
<div *ngIf="publisher" class="stream-container">
    <user-video [streamManager]="publisher"></user-video>
</div>
```

Last point worth considering is the implementation of *UserVideoComponent* and *OpenViduVideoComponent*. Each *UserVideoComponent* manages one StreamManager object (a Subscriber or a Publisher) that will be fed to its child component *OpenViduVideoComponent* . Its main task is not managing the final video player (that is *OpenViduVideoComponent* responsibility), but displaying custom information for each one of them (the user's nickname in this case):

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

    getNicknameTag() {
        try {
            return JSON.parse(this.streamManager.stream.connection.data).clientData;
        } catch (err) {
            console.error('ClientData is not JSON formatted');
        }
    }
}
```

*OpenViduVideoComponent* html template is just the video element:

```html
<video #videoElement></video>
```

And the responsibility of the component's logic is letting OpenVidu know the exact HTML DOM video player associated to its StreamManger. To do so we use method `StreamManager.addVideoElement`, which receives a native HTML video element. The way we implement this is Angular dependant: we get the video element with *@ViewChild* tag and we call the method once after the view has initialized (*ngAfterViewInit*) and once every time the StreamManager input changes (*set* method with *@Input* tag)

```javascript
export class OpenViduVideoComponent implements AfterViewInit, OnDestroy {

    @ViewChild('videoElement') elementRef: ElementRef;
    _streamManager: StreamManager;

    ngAfterViewInit() {
        this._streamManager.addVideoElement(this.elementRef.nativeElement);
    }

    @Input()
    set streamManager(streamManager: StreamManager) {
        this._streamManager = streamManager;
    }
}
```

To actually see the real implementation of this class, check out [iOS specific requirements](#ios-specific-requirements) section, as most of its code is just adjustments to make it work on iOS devices.

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

<br>

## Android specific requirements

> The following configurations are already included in this **openvidu-ionic-cordova** project. You don't need to follow below instructions if you are using this tutorial as a starting point.

To handle camera and microphone permissions, we need to use the [Android Permissions](https://ionicframework.com/docs/native/android-permissions){:target="_blank"} plugin. Install it and use it just as indicated by the Ionic documentation.

We also need to request for media permissions in `config.xml`, found in `root` directory. These permissions must be included inside of `<platform name="android">` ([example](https://github.com/OpenVidu/openvidu-tutorials/blob/master/openvidu-ionic-cordova/config.xml){:target="_blank"})

```xml
<config-file mode="merge" parent="/*" target="AndroidManifest.xml">
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.RECORD_AUDIO" />
    <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
</config-file>
```

Moreover, you must add `xmlns:android="http://schemas.android.com/apk/res/android"` to the end of the opening `widget` node.

```xml
<widget id="io.openvidu.sampleios" version="2.6.0" xmlns="http://www.w3.org/ns/widgets" xmlns:android="http://schemas.android.com/apk/res/android" xmlns:cdv="http://cordova.apache.org/ns/1.0">
    ...
</widget>
```

Once these changes are added to our code, the app will be ready to run on our Android phone.

<br>

## iOS specific requirements

After 14.3 release, iOS brings WebRTC support on the [WKWebview](https://ionicframework.com/docs/wkwebview/){:target="_blank"}, which means we can develop our Ionic applications without using any third-party library (in the past it was necessary to use [cordova-plugin-iosrtc](https://github.com/BasqueVoIPMafia/cordova-plugin-iosrtc){:target="_blank"}).

Knowing this, we still have to configure a number of elements such as media permissions:

### Configuration requirements

1) Add the following lines to `config.xml` file under ios platform:

```xml
<platform name="ios">
    ...
    <hook src="hooks/iosrtc-swift-support.js" type="after_platform_add" />
    <config-file parent="NSCameraUsageDescription" target="*-Info.plist">
        <string>OpenVidu needs access to your camera</string>
    </config-file>
    <config-file parent="NSContactsUsageDescription" target="*-Info.plist">
        <string>OpenVidu needs access to contacts</string>
    </config-file>
    <config-file parent="NSMicrophoneUsageDescription" target="*-Info.plist">
        <string>OpenVidu needs access to your microphone</string>
    </config-file>
    ...
</platform>
```

2) Add the following preference to the `config.xml` to allow inline media playback of video elements:

```xml
<preference name="AllowInlineMediaPlayback" value="true" />
```

3) Add this optional dependency to your `package.json`. Don't forget to run `npm install` after that to actually install it:

```json
"optionalDependencies": {
    "ios-deploy": "1.9.4"
}
```

4) Finally remove and reinstall ios platform:

```bash
ionic cordova platform remove ios
ionic cordova platform add ios
```

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js"></script>
<script type='text/javascript' src='js/fancybox-setup.js'></script>