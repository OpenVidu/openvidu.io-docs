# openvidu-react-native
<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-react-native" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

An OpenVidu application built with **React Native**. It can be compiled into a **native Android app** and a **native iOS app**.

<div class="warningBoxContent">
  <div style="display: table-cell; vertical-align: middle;">
      <i class="icon ion-android-alert warningIcon"></i>
  </div>
  <div class="warningBoxText">
    React Native support is a paid feature. <strong>A special version of openvidu-browser library is needed for openvidu-react-native tutorial to work</strong>. Contact us through <a href="https://openvidu.io/support#commercial">Commercial support</a> to get it.
  </div>
</div>

<div class="row">
    <div class="pro-gallery" style="margin: 20px 0 15px 0">
        <a data-fancybox="gallery-pro1" data-type="image" class="fancybox-img" href="img/tutorials/openvidu-react-native.png">
          <img class="img-responsive" style="margin: auto; max-height: 500px" src="img/tutorials/openvidu-react-native.png"/>
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

You need [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm){:target="_blank"} and [React Native CLI](https://reactnative.dev/docs/environment-setup){:target="_blank"} to run the application. Check the official documentation for setting up the React Native environment.

Install application dependencies:

> A said below, React Native support is a paid feature. <strong>A special version of openvidu-browser library is needed for openvidu-react-native tutorial to work</strong>. Contact us through <a href="https://openvidu.io/support#commercial">Commercial support</a> to get it.

```bash
# Using the same repository openvidu-tutorials from step 2

cd openvidu-tutorials/openvidu-react-native
npm install
```

Start Metro Bundler:

```bash
npm start
```


> To test the application with real devices in your network, visit this **[FAQ](troubleshooting/#3-test-applications-in-my-network-with-multiple-devices)**



<div class="warningBoxContent">
  <div style="display: table-cell; vertical-align: middle;">
      <i class="icon ion-android-alert warningIcon"></i>
  </div>
  <div class="warningBoxText">
    React Native will require OpenVidu Server to be deployed in a valid domain well-protected with a certificate. To facilitate first steps with OpenVidu our demos OpenVidu Server will be used. <strong>Note: this is a publicly accessible OpenVidu Server. Anyone could access your sessions. Use it only for an initial test and under your own responsibility</strong>
  </div>
</div>

<div class="warningBoxContent">
  <div style="display: table-cell; vertical-align: middle;">
      <i class="icon ion-android-alert warningIcon"></i>
  </div>
  <div class="warningBoxText">
    Some problems have been encountered while streaming with iOS devices in some networks with complex restrictions. With mobile networks (4G) these problems have not taken place. Make sure there is no problem with the network you are using in your development environment before posting issues about it
  </div>
</div>

<div class="warningBoxContent">
  <div style="display: table-cell; vertical-align: middle;">
      <i class="icon ion-android-alert warningIcon"></i>
  </div>
  <div class="warningBoxText">
    After deploying on your device and trying to join the session, you may get an error saying "OpenVidu Server (X.Y.Z) and OpenVidu Browser versions do NOT match". This error is not significant so just click on the dismiss button.
  </div>
</div>

Now depending on the platform you want to run your app...


#### In an Android device

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
	This tutorial has been tested from Android 5.1 to Android 10
</div>
</div>


To deploy the Android APK not only you need to have **Java JDK8**, **Android Studio** and **Android SDK** installed but also you have to set up the specific **environment variables**. Fortunately, React Native provide us a [great guide](https://facebook.github.io/react-native/docs/getting-started){:target="_blank"} to allows us to configure step by step all the requirements. This tutorial is made with **React Native CLI Quickstart** so you should select and check the **React Native CLI** requirements inside of React guide website.

After we have completed all the steps of the React Native CLI guide and performed steps 1) , 2), 3) and 4) stated above, we must continue with the following commands:

5) Connect the device to the PC. You must enable USB debugging and give permissions (check out [first section here in React Native docs](https://facebook.github.io/react-native/docs/running-on-device){:target="_blank"})

6) Run the tutorial. The app will be automatically launched in your Android device

```bash
# In openvidu-tutorials/openvidu-react-native
react-native run-android
```

#### In an iOS device


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
	This tutorial has been tested from Xcode 10.2.1 and iOS 12.1
</div>
</div>


After we have completed all the steps of the performed steps 1), 2) and 3) stated above, we must continue with the following commands:

5) Install pod dependencies

```bash
cd ios
pod update
```

6) Plug in your device via USB

7) Configure code signing

8) Build and Run your app

To deploy the iOS app React has [this guide](https://facebook.github.io/react-native/docs/running-on-device){:target="_blank"} to properly configure your development environment.

## Understanding the code

This is a React Native project generated with React Native CLI tool, and therefore you will see lots of configuration files and other stuff that doesn't really matter to us. We will focus on the following files under `App.js` file:

- `App.js`: defines *App* component, main component of the app. It contains the functionalities for joining a video-call and for handling the video-calls themselves.

Let's see first how `App.js` uses NPM package `openvidu-react-native-adapter`:

---

#### We import the necessary objects from `openvidu-react-native-adapter`:

```javascript
import { OpenViduReactNativeAdapter, OpenVidu, RTCView } from 'openvidu-react-native-adapter';
```
`openvidu-react-native-adapter` exports the entire **openvidu-browser** and **react-native-webrtc** modules.

#### We must initialize `openvidu-react-native-adapter` in the App constructor:

```
constructor(props) {
    super(props);

    const ovReact = new OpenViduReactNativeAdapter();
    ovReact.initialize();

    ...
}
```
---

####`App.js` declares the following properties in the state:

```javascript
this.state = {
    mySessionId: 'SessionReactNative',
    myUserName: 'Participant' + Math.floor(Math.random() * 100),
    session: undefined,
    mainStreamManager: undefined,
    publisher: undefined,
    subscribers: [],
    role: 'PUBLISHER',
};
```

`OpenVidu` object will allow us to get a `Session` object, which is declared just after it. `publisher` will be our own local webcam stream and `subscribers` array will store the active streams of other users in the video-call. Finally, `mySessionId` and `myUserName` params simply represent the video-call and your participant's nickname, as you will see in a moment.

---

#### Whenever a user clicks on the join button defined in `App.js`, `joinSession()` method is called:

<br>

We first get an OpenVidu object and initialize a session property inside the state.

```javascript
// --- 1) Get an OpenVidu object ---

this.OV = new OpenVidu();

// --- 2) Init a session ---

this.setState({
    session: this.OV.initSession(),
    }, () => {
        // See next step
    }
);
```

Then we subscribe to the Session events that interest us.

```javascript
// --- 3) Specify the actions when events take place in the session ---

const mySession = this.state.session;

// On every new Stream received...
mySession.on('streamCreated', async (event) => {
    // Subscribe to the Stream to receive it. Second parameter is undefined
    // so OpenVidu doesn't create an HTML video by its own
    const subscriber = await mySession.subscribeAsync(event.stream, undefined);
    var subscribers = Array.from(this.state.subscribers);
    subscribers.push(subscriber);
    // Update the state with the new subscribers
    this.setState({
        subscribers: subscribers,
    });
});

// On every Stream destroyed...
mySession.on('streamDestroyed', (event) => {
    event.preventDefault();
    // Remove the stream from 'subscribers' array
    this.deleteSubscriber(event.stream);
});

// On every asynchronous exception...
mySession.on('exception', (exception) => {
    console.warn(exception);
});

// On reconnection events
mySession.on('reconnecting', () => {
    console.warn('Oops! Trying to reconnect to the session');
    this.setState({ isReconnecting: true });
});

mySession.on('reconnected', () => {
    console.log('Hurray! You successfully reconnected to the session');
    setTimeout(() => {
        // Force re-render view updating state avoiding frozen streams
        this.setState({ isReconnecting: false });
    }, 2000);
});

mySession.on('sessionDisconnected', (event) => {
    if (event.reason === 'networkDisconnect') {
        console.warn('Dang-it... You lost your connection to the session');
        this.leaveSession();
    } else {
        // Disconnected from the session for other reason than a network drop
    }
});
```
Here we subscribe to the Session events that interest us. As we are using React Native framework, a good approach for managing the remote media streams is to loop across an array of them, feeding a common component with each `Subscriber` object and let it manage its video. This component will be *RTCView* and is provided from ***react-native-webrtc*** library. To do this, we need to store each new Subscriber we received in array `subscribers`, and we must remove from it every deleted subscriber whenever it is necessary. To achieve this, we use the following events:

- `streamCreated`: for each new Stream received by the Session object, we subscribe to it and store the returned Subscriber object in our `subscribers` array. Method `session.subscribe` has *undefined* as second parameter so OpenVidu doesn't insert and HTML video element in the DOM due to,  as it is a native application, the DOM does not exist.  The render method of *App.js* will show the new video, as it contains a .map js function, declaring a *RTCView* for each subscriber. We assign the *MediaStream* URL to the *streamURL* RTCView property.

- `streamDestroyed`: for each Stream that has been destroyed from the Session object (which means a user has left the video-call), we remove the associated Subscriber from `subscribers` array, so React will automatically delete the required *RTCView* component.

- `exception`: event triggered by Session object when an asynchronous unexpected error takes place on the server-side.

- `reconnecting`: event triggered by Session object when the client has lost its connection to the Session.

- `reconnected`: event triggered by Session object when the client successfully reconnected to the Session after a disconnection.

- `sessionDisconnected`: event triggered by Session object when the user has left the Session.

> You can take a look at all the events in the [Reference Documentation](api/openvidu-browser/classes/Event.html)

---

#### Get an OpenVidu token

We are ready to join the session. But we still need a token to get access to it, so we ask for it to the [server application](application-server/). The server application will in turn request a token to the OpenVidu deployment. If you have any doubts about this process, review the [Basic Concepts](developing-your-video-app/#basic-concepts).

```javascript
// --- 4) Connect to the session with a valid user token ---
// Get a token from the OpenVidu deployment
const token = await this.getToken();
```

This is the piece of code in charge of finally retrieving a token from the application server. The tutorial uses `axios` library to perform the necessary [HTTP requests](application-server/#rest-endpoints).

```javascript
async getToken() {
    const sessionId = await this.createSession(this.state.mySessionId);
    return await this.createToken(sessionId);
}

async createSession(sessionId) {
    const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions', { customSessionId: sessionId }, {
        headers: { 'Content-Type': 'application/json', },
    });
    return response.data; // The sessionId
}

async createToken(sessionId) {
    const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections', {}, {
        headers: { 'Content-Type': 'application/json', },
    });
    return response.data; // The token
}
```

---

#### Connect to the session:

```javascript
// --- 4) Connect to the session with a valid user token ---
// Get a token from the OpenVidu deployment
const token = await this.getToken();
// First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
// 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
await mySession.connect(token, { clientData: this.state.myUserName });

if (Platform.OS === 'android') {
    await this.checkAndroidPermissions();
}
```

In `session.connect` method first param is the recently retrieved user token. Second param is the value every user will receive in `event.stream.connection.data` property on `streamCreated` event. (this value will be used to show the user's nickname to the his video).

If the method succeeds and this is an Android app, we will call to `checkAndroidPermissions()` method. This method requests and checks the device permissions that our app currently has in the device. Once the permissions have been resolved, the `OV.initPublisherAsync()` method will be called. For iOS  and web platforms, permissions will be handled automatically when camera and microphone access are requested. No need for extra steps in these cases, so we directly initialize our Publisher object.

We do further talk about Android permissions under section [Android specific requirements](#android-specific-requirements).

#### Finally publish your webcam calling `OV.initPublisherAsync()` method:

```javascript
// --- 5) Get your own camera stream ---
if (this.state.role !== 'SUBSCRIBER') {

    // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
    // element: we will manage it on our own) and with the desired properties

    const publisher = await this.OV.initPublisherAsync(undefined, {
        audioSource: undefined, // The source of audio. If undefined default microphone
        videoSource: undefined, // The source of video. If undefined default webcam
        publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
        publishVideo: true, // Whether you want to start publishing with your video enabled or not
        resolution: '640x480', // The resolution of your video
        frameRate: 30, // The frame rate of your video
        insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
    });

    // --- 6) Publish your stream ---

    // Set the main video in the page to display our webcam and store our Publisher
    this.setState({
        mainStreamManager: publisher,
        videoSource: !properties.videoSource ? '1' : properties.videoSource, // 0: back camera | 1: user camera |
    }, () => {
        mySession.publish(publisher);
    });
}
this.setState({ connected: true });
```

If the user does not have role `SUBSCRIBER`, we proceed to publish the camera to the session. To do so we get a `Publisher` object with the desired properties and publish it to the Session through `Session.publish()` method. The rest of users will receive our Stream object and will execute their `streamCreated` event.

Also we store the Publisher object under `this.state.mainStreamManager` variable. This way our webcam will be appended along all remote subscribers, in exactly the same way they are shown. We also store in `this.state.videoSource` property the current camera in use, so we can switch between front and back cameras on the fly.

```
<View style={styles.container}>
    <Text>Session: {this.state.mySessionId}</Text>
    <Text>{this.getNicknameTag(this.state.mainStreamManager.stream)}</Text>
    <RTCView
        zOrder={0}
        objectFit="cover"
        streamURL={this.state.mainStreamManager.stream.getMediaStream().toURL()}
        style={styles.selfView}
    />
</View>
```

---

#### Leaving the session

Whenever we want a user to leave the session, we just need to call `session.disconnect` method in `app.component.ts`:

```javascript
leaveSession() {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

    const mySession = this.state.session;

    if (mySession) {
        mySession.disconnect();
    }

    // Empty all properties...
    setTimeout(() => {
        this.OV = null;
        this.setState({
            session: undefined,
            subscribers: [],
            mySessionId: 'testReact',
            myUserName: 'Participant' + Math.floor(Math.random() * 100),
            mainStreamManager: undefined,
            publisher: undefined,
            joinBtnEnabled: true,
            connected: false,
        });
    });
}
```

<br>

## Android specific requirements

> The following configurations are already included in this **openvidu-react-native** project. You don't need to follow below instructions if you are using this tutorial as a starting point.

Android apps need to actively ask for permissions in the code to access camera and microphone using *[react-native-webrtc](https://github.com/react-native-webrtc/react-native-webrtc){:target="_blank"}* plugin. By following the official guide we have been able to properly set up the optimal configuration your React Native app will need to work along OpenVidu. You can check it [here](https://github.com/react-native-webrtc/react-native-webrtc/blob/master/Documentation/AndroidInstallation.md){:target="_blank"}.


## iOS specific requirements

> The following configurations are already included in this **openvidu-react-native** project. You don't need to follow below instructions if you are using this tutorial as a starting point.

iOS apps need to include the WebRTC modules from react-native-webrtc plugin. We will do it by following the official *react-native-webrtc* guide. You can check it [here](https://github.com/react-native-webrtc/react-native-webrtc/blob/master/Documentation/AndroidInstallation.md){:target="_blank"}.



<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js"></script>
<script type='text/javascript' src='js/fancybox-setup.js'></script>
