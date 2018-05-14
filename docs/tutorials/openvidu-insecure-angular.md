# openvidu-insecure-angular
<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-insecure-angular" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

A client-side only application built with **Angular 6** framework.

If it is the first time you use OpenVidu, it is higly recommended to start with **[openvidu-hello-world](/tutorials/openvidu-hello-world/)** tutorial, as this app is no more than an extension of it with some new features and sytles.

This is the Angular version of [openvidu-insecure-js](/tutorials/openvidu-insecure-js/). Try it if you plan to use Angular framework for your frontend.

## Understanding this tutorial

<p align="center">
  <img class="img-responsive" src="https://docs.google.com/uc?id=0B61cQ4sbhmWSbmtwcXNnXy1ZSkU">
</p>

OpenVidu is composed by the three modules displayed on the image above in its insecure version.

- **openvidu-browser**: NPM package for your Angular app. It allows you to manage your video-calls straight away from your clients
- **openvidu-server**: Java application that controls Kurento Media Server
- **Kurento Media Server**: server that handles low level operations of media flow transmissions

<div style="
    display: table;
    border: 1px solid #0088aa;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 25px;"><div style="display: table-cell">
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
	Tutorial's name includes "insecure" word because this application has no backend and therefore it has no control over the users. Typically you don't want such application in production environments. When you feel comfortable with the client-side of OpenVidu, add your own server or follow one of our super simple secure tutorials.
</div>
</div>

## Running this tutorial

1) Clone the repo:

```bash
git clone https://github.com/OpenVidu/openvidu-tutorials.git
```

2) You will need angular-cli to serve the Angular frontend. You can install it with the following command:

```bash
npm install -g @angular/cli@1.7.4
```

3) Run the tutorial:

```bash
cd openvidu-tutorials/openvidu-insecure-angular
npm install
ng serve
```

4) _openvidu-server_ and _Kurento Media Server_ must be up and running in your development machine. The easiest way is running this Docker container which wraps both of them (you will need [Docker CE](https://store.docker.com/search?type=edition&offering=community)):

```bash
docker run -p 4443:4443 --rm -e openvidu.secret=MY_SECRET openvidu/openvidu-server-kms
```

5) Go to [`localhost:4200`](http://localhost:4200) to test the app once the server is running. The first time you use the docker container, an alert message will suggest you accept the self-signed certificate of _openvidu-server_ when you first try to join a video-call.

<br>

> If you are using **Windows**, read this **[FAQ](/troubleshooting/#3-i-am-using-windows-to-run-the-tutorials-develop-my-app-anything-i-should-know)** to properly run the tutorial

> To learn **some tips** to develop with OpenVidu, check this **[FAQ](/troubleshooting#2-any-tips-to-make-easier-the-development-of-my-app-with-openvidu)**

<div class="row no-margin row-gallery">
	<div class="col-md-6">
		<a data-fancybox="gallery" href="/img/demos/insecure-join.png">
		<img class="img-responsive" src="/img/demos/insecure-join.png">
	</a>
	</div>
	<div class="col-md-6">
		<a data-fancybox="gallery" href="/img/demos/insecure-session.png">
		<img class="img-responsive" src="/img/demos/insecure-session.png">
	</a>
	</div>
</div>

## Understanding the code

This is an Angular project generated with angular-cli, and therefore you will see lots of configuration files and other stuff that doesn't really matter to us. We will focus on the following files under `src/app/` folder:

- `app.component.ts`: main component of the app. It contains the functionalities for joining a video-call and for handling the video-calls themselves.
- `app.component.html`: HTML for AppComponent.
- `app.component.css`: CSS for AppComponent.
- `stream.component.css`: auxiliary component to manage Stream objects ourselves. It wraps the final HTML `<video>` which will display the video of its Stream property, as well as the user's nickname in a `<p>` element.

Let's see how `app.component.ts` uses NPM package `openvidu-browser`:

---

#### We import the necessary objects from `openvidu-browser`:

```typescript
import { OpenVidu, Session, Stream, StreamEvent } from 'openvidu-browser';
```

We are also using package `openvidu-node-client` in this example. This is a node library intended to be used in the server-side of a Node app, but since this is a serverless tutorial, we will use it directly from the browser.

```typescript
import { OpenVidu as OpenViduAPI } from 'openvidu-node-client';
```

---

####`app.component.ts` declares the following properties:

```typescript
// OpenVidu objects
OV: OpenVidu;
session: Session;

// Streams to feed StreamComponent's
remoteStreams: Stream[] = [];
localStream: Stream;

// Join form
mySessionId: string;
myUserName: string;

// Main video of the page, will be 'localStream' or one of the 'remoteStreams',
// updated by an Output event of StreamComponent children
@Input() mainVideoStream: Stream;
```

`OpenVidu` object will allow us to get a `Session` object, which is declared just after it. `remoteStreams` array will store the active streams of other users in the video-call and `localStream` will be your own local webcam stream. Finally, `mySessionId` and `myUserName` params simply represent the video-call and your participant's nickname, as you will see in a moment.

---

#### Whenever a user clicks on the submit input defined in `app.component.html`, `joinSession()` method is called:

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

    // Add the new stream to 'remoteStreams' array
    this.remoteStreams.push(event.stream);

    // Subscribe to the Stream to receive it. Second parameter is undefined
    // so OpenVidu doesn't create an HTML video by its own
    this.session.subscribe(event.stream, undefined);
});

// On every Stream destroyed...
this.session.on('streamDestroyed', (event: StreamEvent) => {

    // Remove the stream from 'remoteStreams' array
    this.deleteRemoteStream(event.stream);
});
```

As we are using Angular framework, a good approach will be treating each Stream as a component, contained in a StreamComponent. Thus, we need to store each new stream we received in an array (`remoteStreams`), and we must remove from it every deleted stream whenever it is necessary. To achieve this, we use the following events:

- `streamCreated`: for each new Stream received by the Session object, we store it in our `remoteStreams` array and immediately subscribe to it so we can receive its video (empty string as second parameter, so OpenVidu doesn't create an HTML video on its own). HTML template of AppComponent will show the new video, as it contains an `ngFor` directive which will create a new StreamComponent for each Stream object stored in the array:

        <div *ngFor="let s of this.remoteStreams" class="stream-container col-md-6 col-xs-6">
	      <stream-component [stream]="s" (mainVideoStream)="getMainVideoStream($event)"></stream-component>
        </div>
	
- `streamDestroyed`: for each Stream that has been destroyed from the Session object (which means a user has left the video-call), we remove it from `remoteStreams` array, so Angular will automatically delete the required StreamComponent from HTML.

---

#### Get a _token_ from OpenVidu Server

<div style="
    display: table;
    border: 1px solid #0088aa;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 25px;"><div style="display: table-cell">
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
this.getToken().then(token => {
	// See next point to see how to connect to the session using 'token'
});
```

Now we need a token from OpenVidu Server. In a production environment we would perform this operation in our application backend, by making use of the [API REST](/reference-docs/REST-API/), [OpenVidu Java Client](/reference-docs/openvidu-java-client/) or [OpenVidu Node Client](/reference-docs/openvidu-node-client/). Here we are actually using OpenVidu Node Client, taking advantage of the fact that we have a _package.json_ in which we can include this library very easily. But remember: do not retrieve tokens from OpenVidu Server directly from your clients. Do it from your application's backend.

You can inspect method `getToken()` in detail in the [GitHub repo](https://github.com/OpenVidu/openvidu-tutorials/blob/ff2c3b74658baf70b18ed03e3d3998ebeb011894/openvidu-insecure-angular/src/app/app.component.ts#L162).

---

#### Finally connect to the session and publish your webcam:

```typescript
// --- 4) Connect to the session with a valid user token ---

// 'getToken' method is simulating what your server-side should do.
// 'token' parameter should be retrieved and returned by your own backend
this.getToken().then(token => {

    // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
    // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
    this.session.connect(token, { clientData: this.myUserName })
        .then(() => {

            // --- 5) Get your own camera stream ---

            // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
            // element: we will manage it ourselves) and with the desired properties
            let publisher = this.OV.initPublisher(undefined, {
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: undefined, // The source of video. If undefined default webcam
                publishAudio: true,     // Whether you want to start publishing with your audio unmuted or not
                publishVideo: true,     // Whether you want to start publishing with your video enabled or not
                resolution: '640x480',  // The resolution of your video
                frameRate: 30,          // The frame rate of your video
                insertMode: 'APPEND',   // How the video is inserted in the target element 'video-container'
                mirror: false           // Whether to mirror your local video or not
            });

            // Store your webcam stream in 'localStream' object
            this.localStream = publisher.stream;
            // Set the main video in the page to display our webcam
            this.mainVideoStream = this.localStream;

            // --- 6) Publish your stream ---

            this.session.publish(publisher);
        })
        .catch(error => {
            console.log('There was an error connecting to the session:', error.code, error.message);
        });
});
```

In `session.connect` method first param is the recently retrieved user token. Second param is the value every user will receive in `event.stream.connection.data` property on `streamCreated` event (this value will be used by StreamComponent to append the user's nickname to the his video). So in this case it is an object with a property "clientData" with value "myUserName", which is binded from HTML input `<input class="form-control" type="text" id="userName" name="userName" [(ngModel)]="myUserName" required>` (filled by the user).

If the method succeeds, we proceed to publish our webcam to the session. To do so we get a `Publisher` object with the desired properties. We then store our local Stream (contained in `Publisher.stream` object) in `localStream`, make our main video display our own stream and publish the Publisher object through `Session.publish()` method. The rest of users will receive our Stream object and will execute their `streamCreated` event.

With regard to our local Stream, AppComponent's HTML template has also one StreamComponent declaration ready to show our own webcam as we did with remote streams:

```html
<div *ngIf="this.localStream" class="stream-container col-md-6 col-xs-6">
	<stream-component [stream]="this.localStream" (mainVideoStream)="getMainVideoStream($event)"></stream-component>
</div>
```
Last point worth considering is the implementation of StreamComponent. As we are handling Stream objects by ourselves (task which usually is taken care by OpenVidu), and because the URL of Stream objects takes some time to get its final value as the WebRTC negotiation takes place, we must listen to any change in `stream` @Input property. We do so getting the `HTMLVideoElement` from our view on `ngAfterViewInit()` hook method (attribute `videoElement`), and then listening to `ngDoCheck()`. This allows us to update `videoElement.srcObject` value, which is the ultimate property that indicates our`<video>` element where to receive the media stream. If we didn't do this, the Stream object will update its _srcObject_ property, but our StreamComponent would keep the same initial `videoElement.srcObject` value. This ensures that all our StreamComponent's will properly display all the videos in the video-call using the correct _srcOjbect_ value.

`getNickNameTag()` method feeds the view of StreamComponent with the nickName of the user. Remember `session.connect` method and its second param? It can be now found at `stream.connection.data`, so every user will receive the nickName of others.

`videoClicked()` tells our AppComponent parent that the user has clicked on certain video, and that the main video display should update the its Stream object.

```typescript
ngAfterViewInit() { // Get HTMLVideoElement from the view
    this.videoElement = this.elementRef.nativeElement;
}

ngDoCheck() { // Detect any change in 'stream' property (specifically in its 'srcObject' property)
    if (this.videoElement && (this.videoElement.srcObject !== this.stream.getVideoSrcObject())) {
        this.videoElement.srcObject = this.stream.getVideoSrcObject();
    }
}

getNicknameTag() { // Gets the nickName of the user
    return JSON.parse(this.stream.connection.data).clientData;
}

videoClicked() { // Triggers event for the parent component to update its main video display
    this.mainVideoStream.next(this.stream);
}
```

---

#### Leaving the session:

Whenever we want a user to leave the session, we just need to call `session.disconnect` method:

```typescript
leaveSession() {

    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

    if (this.session) { this.session.disconnect(); };

    // Empty all properties...
    this.remoteStreams = [];
    this.localStream = null;
    this.session = null;
    this.OV = null;
    this.generateParticipantInfo();
}
```

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js"></script>
<script>
  $().fancybox({
    selector : '[data-fancybox="gallery"]',
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