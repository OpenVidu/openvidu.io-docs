# openvidu-ionic
<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-ionic" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

A client-side only application built with **Ionic 5** and **Angular 9** frameworks. It can be compiled into a **native Android app**, a **native iOS app** and into a standard **web app**.

If it is the first time you use OpenVidu, it is highly recommended to start first with **[openvidu-hello-world](tutorials/openvidu-hello-world/){:target="_blank"}** tutorial due to this being a cordova ionic app and being a little more complex for OpenVidu starters.

## Understanding this tutorial

<p align="center">
  <img class="img-responsive" src="img/tutorials/openvidu-ionic.png">
</p>

OpenVidu is composed by the three modules displayed on the image above in its insecure version.

- **openvidu-browser**: NPM package for your Ionic app. It allows you to manage your video-calls straight away from your clients
- **openvidu-server**: Java application that controls Kurento Media Server
- **Kurento Media Server**: server that handles low level operations of media flow transmissions

## Running this tutorial

1) You will need **Node**, **NPM**, **Ionic** and **Cordova** to serve the app. Install them with the following commands

```bash
sudo curl -sL https://deb.nodesource.com/setup_12.x | sudo bash -
sudo apt-get install -y nodejs
sudo npm install -g ionic@latest
sudo npm install -g cordova@latest
```

2) Clone the repo

```bash
git clone https://github.com/OpenVidu/openvidu-tutorials.git
```

3) Install dependencies

```bash
cd openvidu-tutorials/openvidu-ionic
npm install
```

Now depending on the platform you want to run your app...

#### In the browser

4) Run the tutorial

```bash
# In openvidu-tutorials/openvidu-ionic
ionic serve
```

5) _openvidu-server_ and _Kurento Media Server_ must be up and running in your development machine. The easiest way is running this Docker container which wraps both of them (you will need [Docker CE](https://store.docker.com/search?type=edition&offering=community){:target="_blank"})

```bash
docker run -p 4443:4443 --rm -e openvidu.secret=MY_SECRET openvidu/openvidu-server-kms:2.12.0
```

6) Go to _[`localhost:8100`](http://localhost:8100){:target="_blank"}_ to test the app once the server is running. The first time you use the docker container, an alert message will suggest you accept the self-signed certificate of _openvidu-server_ when you first try to join a video-call.

7) To show the app with the device appearance, press `F12` button in your keyboard and the browser DevTools will be opened. You can find a button with a device icon at the top of the DevTools. By pressing this button the view will adapt to a mobile device aspect ratio. You can also choose predefined types of devices to see the behavior of your app in different resolutions.

<div class="row no-margin row-gallery">
	<div class="col-md-6">
		<a data-fancybox="gallery" href="img/demos/ionic-chrome1.png">
		<img class="img-responsive" src="img/demos/ionic-chrome1.png">
	</a>
	</div>
	<div class="col-md-6">
		<a data-fancybox="gallery" href="img/demos/ionic-chrome2.png">
		<img class="img-responsive" src="img/demos/ionic-chrome2.png">
	</a>
	</div>
</div>

> If you are using **Windows**, read this **[FAQ](troubleshooting/#3-i-am-using-windows-to-run-the-tutorials-develop-my-app-anything-i-should-know){:target="_blank"}** to properly run the tutorial

> To learn **some tips** to develop with OpenVidu, check this **[FAQ](troubleshooting/#2-any-tips-to-make-easier-the-development-of-my-app-with-openvidu){:target="_blank"}**

<br>

#### In an Android device with native app
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
	This tutorial has been tested on Android 9 (Pie)
</div>
</div>

To deploy the Android APK not only you need to have **Java JDK8**, **Android Studio** and **Android SDK** installed but also you have to set up the specific **environment variables**. Fortunately, Ionic provide us a [great guide](https://beta.ionicframework.com/docs/installation/android){:target="_blank"} to allows us to configure step by step all the requirements.

After we have completed all the steps of the Ionic guide and performed steps 1) , 2) and 3) stated above, we must continue with the following commands:

<br>

4) Connect the device to the same network as your PC

5) Now you need the IP of your PC in the network. In Linux/OSX you can simply get it by running this command on your shell

```console
awk '/inet / && $2 != "127.0.0.1"{print $2}' <(ifconfig)
```

> It will probably output something like `192.168.0.105`. Your **complete OpenVidu public url** would then be `https://192.168.0.105:4443/`

When you have your OpenVidu public url, you must set it in `OPENVIDU_SERVER_URL` variable [**in the app**](https://github.com/OpenVidu/openvidu-tutorials/blob/master/openvidu-ionic/src/app/app.component.ts#L19){:target="_blank"} and in the `openvidu.publicurl` parameter used to run *openvidu-server* (see next point)


6) _openvidu-server_ and _Kurento Media Server_ must be up and running in your development machine. The easiest way is running this Docker container which wraps both of them (you will need [Docker CE](https://store.docker.com/search?type=edition&offering=community){:target="_blank"})

```bash
docker run -p 4443:4443 --rm -e openvidu.secret=MY_SECRET -e openvidu.publicurl=YOUR_OPENVIDU_PUBLIC_URL openvidu/openvidu-server-kms:2.12.0
```

> Remember changing `openvidu.publicurl` parameter to the actual value. In this example that would be:<br>`-e openvidu.publicurl=https://192.168.0.105:4443/`

7) Connect the device to the PC. You must enable USB debugging and give permissions (check out [last section here in Ionic docs](https://beta.ionicframework.com/docs/installation/android/#set-up-an-android-device){:target="_blank"})

8) Run the tutorial. The app will be automatically launched in your Android device

```bash
# In openvidu-tutorials/openvidu-ionic
ionic cordova run android
```


#### In an iOS device with native app

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

To deploy the iOS app you will need first to follow [this guide](https://beta.ionicframework.com/docs/installation/ios){:target="_blank"} to properly configure your development environment. Then, it is crucial to have an OpenVidu Server properly deployed with a **valid certificate**.

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
    iOS devices will require OpenVidu Server to be deployed in a valid domain well-protected with a certificate.<br>No iPhone or iPad will allow connections to a non-secure OpenVidu Server from within a native application. To facilitate first steps with OpenVidu and Ionic on iOS devices, if no custom url is defined <a href="https://github.com/OpenVidu/openvidu-tutorials/blob/master/openvidu-ionic/src/app/app.component.ts#L19" target="_blank">here in the app</a> then our demos OpenVidu Server will be used. <strong>Note: this is a publicly accessible OpenVidu Server. Anyone could access your sessions. Use it only for an initial test and under your own responsibility</strong>
</div>
</div>

After we have completed all the steps of the Ionic guide and performed steps 1), 2) and 3) stated above, we must continue with the following commands:

<br>

4) Add ios platform

```bash
# In openvidu-tutorials/openvidu-ionic
ionic cordova platform add ios
```

5) Run the tutorial. The app will be automatically launched in your iOS device. First execution you'll need to trust your developer account in your device under `Settings -> General -> Device management -> your_apple_developer_account`

```bash
# In openvidu-tutorials/openvidu-ionic
ionic cordova run ios
```

You will need to sign your application in Xcode (opening folder _openvidu-ionic/platforms/ios_) with your developer team to avoid any errors. From Apple [official documentation](https://help.apple.com/xcode/mac/current/#/dev5a825a1ca){:target="_blank"}:

<p align="center">
  <img class="img-responsive xcode-img" style="padding: 25px 0; max-width: 750px" src="img/tutorials/xcode_sign.png">
</p>

<br>

<div class="row no-margin ">
	<div class="col-md-4 col-sm-4">
		<a data-fancybox="gallery2" href="img/demos/ov-ionic1.png">
		<img class="img-responsive" src="img/demos/ov-ionic1.png">
	</a>
	</div>
	<div class="col-md-4 col-sm-4">
		<a data-fancybox="gallery2" href="img/demos/ov-ionic2.png">
		<img class="img-responsive" src="img/demos/ov-ionic2.png">
	</a>
	</div>
    <div class="col-md-4 col-sm-4">
		<a data-fancybox="gallery2" href="img/demos/ov-ionic3.png">
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

```typescript
import { OpenVidu, Publisher, Session, StreamEvent, StreamManager, Subscriber } from 'openvidu-browser';
```

---

####`app.component.ts` declares the following properties:

```typescript
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

```typescript
// --- 1) Get an OpenVidu object ---

this.OV = new OpenVidu();

// --- 2) Init a session ---

this.session = this.OV.initSession();
```

Then we subscribe to the Session events that interest us.

```typescript
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
```

As we are using Ionic and Angular framework, a good approach for managing the remote media streams is to loop across an array of them, feeding a common component with each `Subscriber` object and let it manage its video. This component will be our *UserVideoComponent*. To do this, we need to store each new Subscriber we received in array `subscribers` (of its parent class `StreamManager`), and we must remove from it every deleted subscriber whenever it is necessary. To achieve this, we use the following events:

- `streamCreated`: for each new Stream received by the Session object, we subscribe to it and store the returned Subscriber object in our `subscribers` array. Method `session.subscribe` has *undefined* as second parameter so OpenVidu doesn't insert an HTML video element in the DOM on its own (we will use the video element contained in one of our child components). HTML template of *AppComponent* loops through `subscribers` array with an `ngFor` directive, declaring a *UserVideoComponent* for each subscriber. We feed them not really as `Subscriber` objects, but rather as their parent class `StreamManager`. This way we can reuse *UserVideoComponent* to also display our `Publisher` object (that also inherits from class StreamManager).

        <ion-col size="6" *ngFor="let sub of subscribers">
          <div class="stream-container">
            <user-video [streamManager]="sub"></user-video>
          </div>
        </ion-col>
	
- `streamDestroyed`: for each Stream that has been destroyed from the Session object (which means a user has left the video-call), we remove the associated Subscriber from `subscribers` array, so Angular will automatically delete the required UserVideoComponent from HTML. Each Stream object has a property `streamManager` that indicates which Subscriber or Publisher owns it (in the same way, each StreamManager object also has a reference to its Stream).

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

```typescript
// --- 4) Connect to the session with a valid user token ---

// 'getToken' method is simulating what your server-side should do.
// 'token' parameter should be retrieved and returned by your own backend
this.getToken().then((token) => {
	// See next point to see how to connect to the session using 'token'
});
```

Now we need a token from OpenVidu Server. In a production environment we would perform this operations in our application backend, by making use of the _[REST API](reference-docs/REST-API/){:target="_blank"}_, _[OpenVidu Java Client](reference-docs/openvidu-java-client/){:target="_blank"}_ or _[OpenVidu Node Client](reference-docs/openvidu-node-client/){:target="_blank"}_. Here we have implemented the POST requests to OpenVidu Server in a method `getToken()` that returns a Promise with the token, using `@angular/http` library. Without going into too much detail, this method performs two POST requests to OpenVidu Server, passing OpenVidu Server secret to authenticate them:

  - First request performs a POST to `/api/sessions` (we send a `customSessionId` field to name the session with our `mySessionId` value retrieved from HTML input)
  - Second request performs a POST to `/api/tokens` (we send a `session` field to assign the token to this same session)

You can inspect this method in detail in the [GitHub repo](https://github.com/OpenVidu/openvidu-tutorials/blob/master/openvidu-ionic/src/app/app.component.ts#L302){:target="_blank"}.

---

#### Connect to the session:

```typescript
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

```typescript
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

```typescript
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

```typescript
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

```typescript
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

Android apps need to actively ask for permissions in the code to access camera and microphone. By following steps below we have been able to properly set up the permissions your Ionic app will need to work along OpenVidu.

These configurations are already included in this **openvidu-ionic** project, so if you start from here no further configurations are needed. Otherwise, if you want to **start a new project with Ionic and OpenVidu**, you should follow these simple steps:

 1) Install Cordova AndroidPermissions plugin

```bash
ionic cordova plugin add cordova-plugin-android-permissions
npm install --save @ionic-native/android-permissions@latest
```

2) Add this plugin to your app's module ([example](https://github.com/OpenVidu/openvidu-tutorials/blob/master/openvidu-ionic/src/app/app.module.ts){:target="_blank"})

```typescript
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
@NgModule({
    providers: [
        // others providers
        AndroidPermissions,
    ],
)}
```

3) Add this plugin to your component and use it ([example](https://github.com/OpenVidu/openvidu-tutorials/blob/master/openvidu-ionic/src/app/app.component.ts){:target="_blank"})

```typescript
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

export class AppComponent  {
    constructor(private androidPermissions: AndroidPermissions)
}
```

We are finally ready to request permissions to our device. To do so, we need to use `requestPermissions()` and `checkPermission()` methods offered by the plugin. 

It is important to call these methods under `platform.ready()`, just because it will tell us whenever the platform is ready and the native functionality can be actually called.
You can inspect this method in detail in the [GitHub repo](https://github.com/OpenVidu/openvidu-tutorials/blob/master/openvidu-ionic/src/app/app.component.ts#L50){:target="_blank"}.

You should also declare an array of permissions to use as parameter of `requestPermissions()`

```typescript
ANDROID_PERMISSIONS = [
    this.androidPermissions.PERMISSION.CAMERA,
    this.androidPermissions.PERMISSION.RECORD_AUDIO,
    this.androidPermissions.PERMISSION.MODIFY_AUDIO_SETTINGS
];
```

4) Last but not least, in `root` directory you can find file `config.xml`. These permissions must be included inside of `<platform name="android">` ([example](https://github.com/OpenVidu/openvidu-tutorials/blob/master/openvidu-ionic/config.xml){:target="_blank"})

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

Unfortunately, Ionic's WebView layer on iOS devices ([WKWebview](https://ionicframework.com/docs/wkwebview/){:target="_blank"}) does not support WebRTC (blame Apple and its politics). So the only way to make WebRTC work on iOS Ionic platform is by using a plugin. The result works just fine, but a little work is needed to make your Ionic app compatible with iOS. OpenVidu makes use of [cordova-plugin-iosrtc](https://github.com/BasqueVoIPMafia/cordova-plugin-iosrtc){:target="_blank"} to achieve this.

This **openvidu-ionic** project is ready to work on iOS devices, but we will go through every aspect related to iOS compatibility in case your already have an Ionic application in which you want to integrate OpenVidu.

### Configuration requirements

1) Install cordova-plugin-iosrtc and xcode

```bash
ionic cordova plugin add cordova-plugin-iosrtc
npm install xcode --save
```

2) Add the following files to your Ionic app. Consider relative paths under root folder, the one containing your `package.json` file

- `hooks/iosrtc-swift-support.js` ([download file](https://github.com/OpenVidu/openvidu-tutorials/blob/master/openvidu-ionic/hooks/iosrtc-swift-support.js){:target="_blank"})
- `src/assets/libs/adapter-4.0.1.js` ([download file](https://github.com/OpenVidu/openvidu-tutorials/blob/master/openvidu-ionic/src/assets/libs/adapter-4.0.1.js){:target="_blank"})
   
3) Add the following lines to `config.xml` file under ios platform:

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

4) Add this optional dependency to your `package.json`. Don't forget to run `npm install` after that to actually install it

```json
"optionalDependencies": {
    "ios-deploy": "1.9.4"
}
```

5) Finally remove and reinstall ios platform

``` bash
ionic cordova platform remove ios
ionic cordova platform add ios
```

### Code requirements

**1)** Add to global styles the following rule. For example, in openvidu-ionic app it is done [right here](https://github.com/OpenVidu/openvidu-tutorials/blob/master/openvidu-ionic/src/global.scss#L13-L15){:target="_blank"}. This will allow us to put other HTML elements above the video elements.

One limitation for iOS is the background color of your app: we need it to be transparent to allow plugin videos to be visible behind the Ionic app. So you have 2 choices: you can have one video or many videos to fill all available space in the device's screen (which is in fact the most common layout in video conferencing apps for mobile phones) or you'll have to go with a white background if videos leave visible space in your app's layout.

```scss
:root {
    --ion-background-color: transparent;
}
```

**2)** Initialize _cordova-plugin-iosrtc_. The easiest way is doing so in `app.component.ts` constructor, using Platform library to identify iOS Ionic context. It is very important to initialize the plugin only for **iOS** devices running a **cordova** app.

```typescript
// Import declarations...
declare var cordova;

...

    constructor(private platform: Platform) {
        if (this.platform.is('ios') && this.platform.is('cordova')) {
            cordova.plugins.iosrtc.registerGlobals();
            // load adapter.js (version 4.0.1)
            const script2 = document.createElement('script');
            script2.type = 'text/javascript';
            script2.src = 'assets/libs/adapter-4.0.1.js';
            script2.async = false;
            document.head.appendChild(script2);
        }
    }
```

**3)** Every `<video>` element should be managed carefully on cordova iOS. The plugin inserts iOS native video elements whenever it finds an HTMLVideoElement, respecting certain CSS rules. In general, we recommend that at the moment you have video metadata, you apply programmatically the following styles: `object-fit`, `z-index`, `width` and `height`.
In openvidu-ionic app this is done as follows in file [`ov-video.component.ts`](https://github.com/OpenVidu/openvidu-tutorials/blob/master/openvidu-ionic/src/app/ov-video.component.ts){:target="_blank"}

We check if the platform is iOS with the following method: 

```typescript
private isIos(): boolean {
    return this.platform.is('ios') && this.platform.is('cordova');
}
```

We call the following `updateVideoView` method inside `ngAfterViewInit`, so our video elementRef is properly defined:

```typescript
private updateVideoView() {
    this._streamManager.addVideoElement(this.elementRef.nativeElement);
    if (this.isIos()) {
        (<HTMLVideoElement>this.elementRef.nativeElement).onloadedmetadata = () => {
            this.applyIosIonicVideoAttributes();
        };
    }
}
```

We call `applyIosIonicVideoAttributes` method only after the video element has triggered 'loadedmetadata' event. This way we know that the video has certain computed width and we can calculate the exact height it must have according to its aspect ratio, got from `Stream.videoDimensions`. This is necessary because the plugin needs an exact width and height in order to paint the native iOS video. In this case, every video will have the full width of its container and the height will be obtained from the final computed width and the aspect ratio got from metadata  `Stream.videoDimensions`.

```typescript
private applyIosIonicVideoAttributes() {
    const ratio = this._streamManager.stream.videoDimensions.height / this._streamManager.stream.videoDimensions.width;
    this.elementRef.nativeElement.style.width = '100% !important';
    this.elementRef.nativeElement.style.objectFit = 'fill';
    this.elementRef.nativeElement.style.zIndex = '-1';
    const computedWidth = this.elementRef.nativeElement.offsetWidth;
    this.elementRef.nativeElement.style.height = computedWidth * ratio + 'px';
    if (!this._streamManager.remote) {
        // It is a Publisher video. Custom iosrtc plugin mirror video
        this.elementRef.nativeElement.style.transform = 'scaleX(-1)';
    }
    cordova.plugins.iosrtc.refreshVideos();
}
```

Finally we also need to listen to dynamic changes on the videos to refresh the plugin view. This includes 3 things:

- Listen to `streamPropertyChanged` event of StreamManager, and if `videoDimensions` changes update the video element accordingly. In openvidu-ionic app we do so when setting StreamManager property in [`ov-video.component.ts`](https://github.com/OpenVidu/openvidu-tutorials/blob/master/openvidu-ionic/src/app/ov-video.component.ts){:target="_blank"}

```typescript
@Input()
set streamManager(streamManager: StreamManager) {
    this._streamManager = streamManager;
    if (this.isIos()) {
        this._streamManager.on('streamPropertyChanged', event => {
            if ((<StreamPropertyChangedEvent>event).changedProperty === 'videoDimensions') {
                this.applyIosIonicVideoAttributes();
            }
        });
    }
}
```

- **Only if your app supports orientation changes**: you will have to listen to `orientationchange` window event for remote streams to update their video dimensions and adjust them to the new window ratio. openvidu-ionic app does this in method `ngAfterViewInit` in [`ov-video.component.ts`](https://github.com/OpenVidu/openvidu-tutorials/blob/master/openvidu-ionic/src/app/ov-video.component.ts){:target="_blank"}. The timeout gives the video some time to refresh its properties before updating its view.

```typescript
ngAfterViewInit() {
    if (this.isIos() && this._streamManager.remote) {
        this.rotationFunction = () => {
            // Give the remote video some time to update its dimensions when rotating the device
            setTimeout(() => {
                this.applyIosIonicVideoAttributes();
            }, 250);
        };
        (<any>window).addEventListener('orientationchange', this.rotationFunction);
    }
    this.updateVideoView();
}
```

- **Only if your app supports scrolling**: if the view where your videos are gonna be displayed supports scrolling, then you will have to do the following: listen to scroll events in the required `<ion-content>` element and call `cordova.plugin.iosrtc.refreshVideos()` method when triggered. If you don't do this, videos will stay fixed in their position, ignoring the scroll behavior.

```html
<ion-content [scrollEvents]="true" (ionScroll)="refreshVideos()">
```

```typescript
refreshVideos() {
    if (this.platform.is('ios') && this.platform.is('cordova')) {
        cordova.plugins.iosrtc.refreshVideos();
    }
}
```


<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js"></script>
<script>
  $().fancybox({
    selector : '[data-fancybox]',
    infobar : true,
    arrows : false,
    loop: true,
    protect: true,
    transitionEffect: 'slide',
    buttons : [
        'close'
    ],
    clickOutside : 'close',
    clickSlide   : 'close',
  });
</script>