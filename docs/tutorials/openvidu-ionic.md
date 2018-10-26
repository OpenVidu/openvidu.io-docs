# openvidu-ionic
<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-ionic" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

A client-side only application built with **Ionic v4** and **Angular 7** frameworks.

If it is the first time you use OpenVidu, it is highly recommended to start first with **[openvidu-hello-world](/tutorials/openvidu-hello-world/)** tutorial due to this being a cordova ionic app and being a little more complex for OpenVidu starters.

<div style="
    display: table;
    border: 2px solid #ffb600;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    background-color: #FFFBF1;
    margin-bottom: 25px;"><div style="display: table-cell; vertical-align: middle;">
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
    This Ionic application is implemented with <strong>Ionic v4-beta</strong>. This means that it is a preview version of Ionic 4 and that could cause sporadic problems. The moment final stable version of Ionic 4 is released, this project will be updated to use it.
    <br><br>
    <strong>Bugs reported:</strong><br>
    <ul>
        <li>Android 5 (Lollipop) and 6 (Marshmallow) will not work with Ionic v4-beta until <a href="https://github.com/ionic-team/ionic/issues/15438#issuecomment-426686443" target="_blank">this issue</a> is solved</li>
        <li>This app will not work in iOS because of <a href="https://stackoverflow.com/questions/45055329/does-webkit-in-ios-11-beta-support-webrtc/49467964#49467964" target="_blank">problems between WebRTC and iOS</a>. We are currently working to overcome this problems</li>
    </ul>
</div>
</div>


## Understanding this tutorial

<p align="center">
  <img class="img-responsive" src="/img/tutorials/openvidu-ionic.png">
</p>

OpenVidu is composed by the three modules displayed on the image above in its insecure version.

- **openvidu-browser**: NPM package for your Angular app. It allows you to manage your video-calls straight away from your clients
- **openvidu-server**: Java application that controls Kurento Media Server
- **Kurento Media Server**: server that handles low level operations of media flow transmissions

## Running this tutorial:

#### Using the browser

1) Clone the repo:

```bash
git clone https://github.com/OpenVidu/openvidu-tutorials.git
```

2) You will need **Node**, **NPM** and **Ionic** to serve the app. Install them with the following command:

```bash
sudo curl -sL https://deb.nodesource.com/setup_8.x | sudo bash -
sudo apt-get install -y nodejs
sudo npm install -g ionic@latest
```

3) Run the tutorial:

```bash
cd openvidu-tutorials/openvidu-ionic
npm install
ionic serve
```

4) _openvidu-server_ and _Kurento Media Server_ must be up and running in your development machine. The easiest way is running this Docker container which wraps both of them (you will need [Docker CE](https://store.docker.com/search?type=edition&offering=community)):

```bash
docker run -p 4443:4443 --rm -e openvidu.secret=MY_SECRET openvidu/openvidu-server-kms:2.6.0
```

5) Go to [`localhost:8100`](http://localhost:8100) to test the app once the server is running. The first time you use the docker container, an alert message will suggest you accept the self-signed certificate of _openvidu-server_ when you first try to join a video-call.

6) To show the app with the device appearance, press `F12` button in your keyboard and the browser DevTools will be opened. You can find a button with a device icon at the top of the DevTools. By pressing this button the view will adapt to a mobile device aspect ratio. You can also choose predefined types of devices to see the behavior of your app in different resolutions.

<div class="row no-margin row-gallery">
	<div class="col-md-6">
		<a data-fancybox="gallery" href="/img/demos/ionic-chrome1.png">
		<img class="img-responsive" src="/img/demos/ionic-chrome1.png">
	</a>
	</div>
	<div class="col-md-6">
		<a data-fancybox="gallery" href="/img/demos/ionic-chrome2.png">
		<img class="img-responsive" src="/img/demos/ionic-chrome2.png">
	</a>
	</div>
</div>


<br>

> If you are using **Windows**, read this **[FAQ](/troubleshooting/#3-i-am-using-windows-to-run-the-tutorials-develop-my-app-anything-i-should-know)** to properly run the tutorial

> To learn **some tips** to develop with OpenVidu, check this **[FAQ](/troubleshooting#2-any-tips-to-make-easier-the-development-of-my-app-with-openvidu)**

<br>

#### Using the Android APK in an Android device

To deploy the Android APK not only you need to have **Java JDK8**, **Android Studio** and **Android SDK** installed but also you have to set up the specific **environment variables**. Fortunately, Ionic provide us a [great guide](https://beta.ionicframework.com/docs/installation/android) to allows us to configure step by step all the requirements.

After we have completed all the steps the Ionic guide, we must continue with the followinf commands:

1) Clone the repo:

```bash
git clone https://github.com/OpenVidu/openvidu-tutorials.git
```

2) You will need **Node**, **NPM** and **Ionic** to serve the app. Install them with the following command:

```bash
sudo curl -sL https://deb.nodesource.com/setup_8.x | sudo bash -
sudo apt-get install -y nodejs
sudo npm install -g ionic@latest
```

3) Connect the device to the same network as your PC.

4) Now you need the IP of your PC in the network. In Linux/OSX you can simply get it by running this command on your shell:

```console
awk '/inet / && $2 != "127.0.0.1"{print $2}' <(ifconfig)
```

> It will probably output something like `192.168.0.105`. Your **complete OpenVidu public url** would then be `https://192.168.0.105:4443/`

When you have your OpenVidu public url, you must set it in `OPENVIDU_SERVER_URL` variable [in the app](https://github.com/OpenVidu/openvidu-tutorials/blob/0d72ecc16b878619be482a90a7ff704b7a6fab13/openvidu-ionic/src/app/app.component.ts#L19) and in the `openvidu.publicurl` parameter used to run *openvidu-server* (see next point)


5) _openvidu-server_ and _Kurento Media Server_ must be up and running in your development machine. The easiest way is running this Docker container which wraps both of them (you will need [Docker CE](https://store.docker.com/search?type=edition&offering=community))

```bash
docker run -p 4443:4443 --rm -e openvidu.secret=MY_SECRET -e openvidu.publicurl=YOUR_OPENVIDU_PUBLIC_URL openvidu/openvidu-server-kms:2.6.0
```

> Remember changing `openvidu.publicurl` parameter to the actual value. In this example that would be:<br>`-e openvidu.publicurl=https://192.168.0.105:4443/`

6) Connect the device to the PC. You must enable USB debugging and give permissions (check out [last section here in Ionic docs](https://beta.ionicframework.com/docs/installation/android/#set-up-an-android-device))

7) Run the tutorial. The app will be automatically launched in your Android device:

```bash
cd openvidu-tutorials/openvidu-ionic
npm install
ionic cordova run android
```

<div class="row no-margin ">
	<div class="col-md-4 col-sm-4">
		<a data-fancybox="gallery2" href="/img/demos/ov-ionic1.png">
		<img class="img-responsive" src="/img/demos/ov-ionic1.png">
	</a>
	</div>
	<div class="col-md-4 col-sm-4">
		<a data-fancybox="gallery2" href="/img/demos/ov-ionic2.png">
		<img class="img-responsive" src="/img/demos/ov-ionic2.png">
	</a>
	</div>
    <div class="col-md-4 col-sm-4">
		<a data-fancybox="gallery2" href="/img/demos/ov-ionic3.png">
		<img class="img-responsive" src="/img/demos/ov-ionic3.png">
	</a>
	</div>
</div>


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

// Main video of the page, will be 'publisher' or one of the 'subscribers'
// Updated by click event
mainStreamManager: StreamManager;
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

- `streamCreated`: for each new Stream received by the Session object, we subscribe to it and store the returned Subscriber object in our `subscribers` array. Method `session.subscribe` has *undefined* as second parameter so OpenVidu doesn't insert an HTML video element in the DOM on its own (we will use the video element contained in one of our child components). HTML template of *AppComponent* loops through `subscribers` array with an `ngFor` directive, declaring a *UserVideoComponent* for each subscriber. We feed them not really as `Subscriber` objects, but rather as their parent class `StreamManager`. This way we can reuse *UserVideoComponent* to also display our `Publisher` object (that also inhertis from class StreamManager). `user-video` also declares an output event to let *AppComponent* know when the user has clicked on it.

        <ion-col size="6" *ngFor="let sub of subscribers">
          <div class="stream-container">
            <user-video [streamManager]="sub" (click)="updateMainStreamManager(sub)"></user-video>
          </div>
        </ion-col>
	
- `streamDestroyed`: for each Stream that has been destroyed from the Session object (which means a user has left the video-call), we remove the associated Subscriber from `subscribers` array, so Angular will automatically delete the required UserVideoComponent from HTML. Each Stream object has a property `streamManager` that indicates which Subscriber or Publisher owns it (in the same way, each StreamManager object also has a reference to its Stream).

---

#### Get a _token_ from OpenVidu Server

<div style="
    display: table;
    border: 1px solid #0088aa;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 25px;"><div style="display: table-cell; vertical-align: middle;">
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

Now we need a token from OpenVidu Server. In a production environment we would perform this operations in our application backend, by making use of the [API REST](/reference-docs/REST-API/), [OpenVidu Java Client](/reference-docs/openvidu-java-client/) or [OpenVidu Node Client](/reference-docs/openvidu-node-client/). Here we have implemented the POST requests to OpenVidu Server in a method `getToken()` that returns a Promise with the token, using `@angular/http` library. Without going into too much detail, this method performs two POST requests to OpenVidu Server, passing OpenVidu Server secret to authenticate them:

  - First request performs a POST to `/api/sessions` (we send a `customSessionId` field to name the session with our `mySessionId` value retrieved from HTML input)
  - Second request performs a POST to `/api/tokens` (we send a `session` field to assign the token to this same session)

You can inspect this method in detail in the [GitHub repo](https://github.com/OpenVidu/openvidu-tutorials/blob/0d72ecc16b878619be482a90a7ff704b7a6fab13/openvidu-ionic/src/app/app.component.ts#L248).

---

#### Connect to the session:

```typescript
// --- 4) Connect to the session with a valid user token ---

// 'getToken' method is simulating what your server-side should do.
// 'token' parameter should be retrieved and returned by your own backend
this.getToken().then((token) => {
    // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
    // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
    this.session
        .connect(token, { clientData: this.myUserName })
            .then(() => {
                // --- 5) Requesting and Checking Android Permissions
                if (this.platform.is('cordova')) {
                    this.checkAndroidPermissions()
                        .then(() => this.initPublisher())
                        .catch((err) => console.error(err));
                } else {
                    this.initPublisher();
                }
            })
            .catch((error) => {
                console.log('There was an error connecting to the session:', error.code, error.message);
            });
});
```

In `session.connect` method first param is the recently retrieved user token. Second param is the value every user will receive in `event.stream.connection.data` property on `streamCreated` event (this value will be used by *UserVideoComponent* to append the user's nickname to the his video). So in this case it is an object with a property "clientData" with value "myUserName", which is binded from HTML input `<ion-input [(ngModel)]="myUserName"></ion-input>` (filled by the user).

If the method succeeds and is running under a cordova platform, we will call and receive a promise from `checkAndroidPermissions()` method. This method requests and checks the Android permissions that our app currently has in the device. Once the promise has been resolved, the `initPublisher()` method will be called. 

We will talk about the Android permissions in the last section.

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
        mirror: true, // Whether to mirror your local video or not
    });

    // --- 6) Publish your stream ---

    this.session.publish(publisher);

    // Set the main video in the page to display our webcam and store our Publisher
    this.mainStreamManager = publisher;
    this.publisher = publisher;
}
```

After receiving the promise resolved from `checkAndroidPermissions()` (or if we are not running the Ionic app in a mobile device) we proceed to publish our webcam to the session. To do so we get a `Publisher` object with the desired properties and publish it to the Session through `Session.publish()` method. The rest of users will receive our Stream object and will execute their `streamCreated` event. Finally we make the main video player (which is just another *UserVideoComponent*) display the Publisher object by default. This is the HTML code that will display the main stream manager:

```html
<div *ngIf="mainStreamManager" id="main-video">
    <user-video [streamManager]="mainStreamManager"></user-video>
</div>
```

And we store the Publisher object under `this.publisher` variable, which is also of parent class `StreamManager`. This way our webcam will be appended along all remote subscribers, in exactly the same way they are shown (remember all of them are displayed by *UserVideoComponent*):

```html
<div *ngIf="publisher" class="stream-container">
    <user-video [streamManager]="publisher" (click)="updateMainStreamManager(publisher)"></user-video>
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

And the unique responsibility of the component's logic is letting OpenVidu know the exact HTML DOM video player associated to its StreamManger. To do so we use method `StreamManager.addVideoElement`, which receives a native HTML video element. The way we implement this is Angular dependant: we get the video element with *@ViewChild* tag and we call the method once after the view has initialized (*ngAfterViewInit*) and once every time the StreamManager input changes (*set* method with *@Input* tag)

```typescript
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

#### Leaving the session:

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

## Android Permisions

In the previous section, we have seen how we can connect to the session and publish our webcam. Before publishing it, we have to take into account that our app will need permissions for accessing the microphone and camera.

Following next steps, we have been able to properly set up the Android permissions your Ionic app will need to work along OpenVidu.

These configurations are already included in this **openvidu-ionic** project, so if you start from here no further configurations are needed. Otherwise, if you want to **start a new project with Ionic and OpenVidu**, you should follow these simple steps:

 1) Install [android-permissions](https://beta.ionicframework.com/docs/native/android-permissions) Cordova and Ionic Native Plugin:

```bash
ionic cordova plugin add cordova-plugin-android-permissions
npm install --save @ionic-native/android-permissions@5.0.0-beta.21
```

2) Add this plugin to your app's module ([example](https://github.com/OpenVidu/openvidu-tutorials/blob/master/openvidu-ionic/src/app/app.module.ts)):

```typescript
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
@NgModule({
    providers: [
        // others providers
        AndroidPermissions,
    ],
)}
```

3) Add this plugin to your component and use it ([example](https://github.com/OpenVidu/openvidu-tutorials/blob/master/openvidu-ionic/src/app/app.component.ts)):

```typescript
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

export class AppComponent  {
    constructor(private androidPermissions: AndroidPermissions)
}
```

We are finally ready to request permissions to our device. To do so, we need to use `requestPermissions()` and `checkPermission()` methods offered by the plugin. 

It is important to call these methods under `platform.ready()`, just because it will tell us whenever the platform is ready and the native functionality can be actually called.
You can inspect this method in detail in the [GitHub repo](https://github.com/OpenVidu/openvidu-tutorials/blob/0d72ecc16b878619be482a90a7ff704b7a6fab13/openvidu-ionic/src/app/app.component.ts#L165).

You should also declare an array of permissions to use as parameter of `requestPermissions()`: 

```typescript
ANDROID_PERMISSIONS = [
    this.androidPermissions.PERMISSION.CAMERA,
    this.androidPermissions.PERMISSION.RECORD_AUDIO,
    this.androidPermissions.PERMISSION.MODIFY_AUDIO_SETTINGS,
];
```

4) Last but not least, in `root` directory you can find file `config.xml`. These permissions must be included inside of `<platform name="android">` ([example](https://github.com/OpenVidu/openvidu-tutorials/blob/master/openvidu-ionic/config.xml)):

```xml
<config-file mode="merge" parent="/*" target="AndroidManifest.xml">
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.RECORD_AUDIO" />
    <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
</config-file>
```
Moreover, you must add `xmlns:android="http://schemas.android.com/apk/res/android"` to the end of the opening `widget` node.
```xml
<widget id="io.openvidu.sample" version="2.5.0" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0" xmlns:android="http://schemas.android.com/apk/res/android">
    ...
</widget>
```

Once these changes are added to our code, the app will be ready to run on our mobile phone.


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