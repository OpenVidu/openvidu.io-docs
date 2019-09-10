# openvidu-react-native
<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-react-native" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

A client-side only application built with **React Native** framework using React and JavaScript. It can be compiled into a **native Android app**, a **native iOS app** .

If it is the first time you use OpenVidu, it is highly recommended to start first with **[openvidu-hello-world](/tutorials/openvidu-hello-world/){:target="_blank"}** tutorial due to this being a native app and being a little more complex for OpenVidu starters.

<div style="
    display: table;
    border: 2px solid #ffb600;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    background-color: #FFFBF1;
    margin-bottom: 25px;
    padding: 5px 0 5px 0;
    background-color: rgba(0, 136, 170, 0.04);"><div style="display: table-cell; vertical-align: middle;">
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
    React Native support is a paid feature. <strong>A special version of openvidu-browser library is needed for openvidu-react-native tutorial to work</strong>. Contact us through <a href="/commercial">Commercial page support</a> to get it
</div>
</div>


## Understanding this tutorial

<p align="center">
  <img class="img-responsive" src="/img/tutorials/openvidu-insecure-react.png">
</p>

OpenVidu is composed by the three modules displayed on the image above in its insecure version.

- **openvidu-browser**: NPM package for your Ionic app. It allows you to manage your video-calls straight away from your clients
- **openvidu-server**: Java application that controls Kurento Media Server
- **Kurento Media Server**: server that handles low level operations of media flow transmissions

## Running this tutorial

<div style="
    display: table;
    border: 2px solid #ffb600;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    background-color: #FFFBF1;
    margin-bottom: 25px;
    padding: 5px 0 5px 0;
    background-color: rgba(0, 136, 170, 0.04);"><div style="display: table-cell; vertical-align: middle;">
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
    <div>
    <strong>openvidu-react-native</strong> tutorial uses the latest version of React Native (above version 0.60.0) . React Native, from version 0.60.0 onwards, include some <strong>breaking changes for Andorid and iOS</strong> like migration to <strong>AndroidX</strong> and <strong>split React.podspec</strong> into separate podspecs for each Xcode project.</div> 
    <div>  If you prefer to use the previous version that does not include these breaking changes you can use <a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-react-native-59.9" target="blank"><i>openvidu-react-native-59.9 </i></a> tutorial.</div>
</div>

</div>

1) You will need **Node 8.3 ** or newer, **NPM**, **React Native CLI** to serve the app. Install them with the following command

```bash
sudo curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -
sudo apt-get install -y nodejs
sudo npm install -g react-native-cli
```

2) Clone the repo

```bash
git clone https://github.com/OpenVidu/openvidu-tutorials.git
```

3) Install dependencies

*Remember! If you want to use the previous version withoud AndroidX and separate podspecs for each Xcode project you need to use openvidu-react-native-59.9:* ```openvidu-tutorials/openvidu-react-native-59.9```

```bash
cd openvidu-tutorials/openvidu-react-native
npm install
```

4) Install openvidu-browser **with React Native support**:
Add the artifact in the root project 

```bash
npm install openvidu-browser-Y.Y.Z.tgz
```

4) Start Metro Bundler :

```bash
npm start
```
<div style="
    display: table;
    border: 2px solid #ffb600;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    background-color: #FFFBF1;
    margin-bottom: 25px;
    padding: 5px 0 5px 0;
    background-color: rgba(0, 136, 170, 0.04);"><div style="display: table-cell; vertical-align: middle;">
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
    React Native will require OpenVidu Server to be deployed in a valid domain well-protected with a certificate. To facilitate first steps with OpenVidu our demos OpenVidu Server will be used. <strong>Note: this is a publicly accessible OpenVidu Server. Anyone could access your sessions. Use it only for an initial test and under your own responsibility</strong>
</div>
</div>

<div style="
    display: table;
    border: 2px solid #ffb600;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    background-color: #FFFBF1;
    margin-bottom: 25px;
    padding: 5px 0 5px 0;
    background-color: rgba(0, 136, 170, 0.04);"><div style="display: table-cell; vertical-align: middle;">
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
    Some problems have been encountered while streaming with iOS devices in some networks with complex restrictions. With mobile networks (4G) these problems have not taken place. Make sure there is no problem with the network you are using in your development environment before posting issues about it
</div>
</div>

<div style="
    display: table;
    border: 2px solid #ffb600;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    background-color: #FFFBF1;
    margin-bottom: 25px;
    padding: 5px 0 5px 0;
    background-color: rgba(0, 136, 170, 0.04);"><div style="display: table-cell; vertical-align: middle;">
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
	This tutorial has been tested from Android 5.1 (Lollipop) to Android 9 (Pie)
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
	This tutorial has been tested with Xcode (10.2.1) and iPhone 7 (iOS 12.2), iPhone 7 Plus (iOS 12.1) and iPad Air (iOS 12.1.1)
</div>
</div>


After we have completed all the steps of the performed steps 1), 2) and 3) stated above, we must continue with the following commands:

5) Plug in your device via USB

6) Configure code signing

7) Build and Run your app

To deploy the iOS app React has [this guide](https://facebook.github.io/react-native/docs/running-on-device) to properly configure your development environment.

## Understanding the code

This is a React Native project generated with React Native CLI tool, and therefore you will see lots of configuration files and other stuff that doesn't really matter to us. We will focus on the following files under `App.js` file:

- `App.js`: defines *App* component, main component of the app. It contains the functionalities for joining a video-call and for handling the video-calls themselves.

Let's see first how `App.js` uses NPM package `openvidu-browser`:

---

#### We import the necessary objects from `openvidu-browser`:

```javascript
import { OpenVidu } from 'openvidu-browser';
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


var mySession = this.state.session;

    // On every new Stream received...
mySession.on('streamCreated', (event) => {
    // Subscribe to the Stream to receive it. Second parameter is undefined
    // so OpenVidu doesn't create an HTML video by its own
    var subscriber = mySession.subscribe(event.stream, undefined);

    //We use an auxiliary array to push the new stream
    var subscribers = this.state.subscribers;

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
    this.deleteSubscriber(event.stream.streamManager);
});

// See next step
```
Here we subscribe to the Session events that interest us. As we are using React Native framework, a good approach for managing the remote media streams is to loop across an array of them, feeding a common component with each `Subscriber` object and let it manage its video. This component will be *RTCView* and is provided from ***react-native-webrtc*** library. To do this, we need to store each new Subscriber we received in array `subscribers`, and we must remove from it every deleted subscriber whenever it is necessary. To achieve this, we use the following events:

- `streamCreated`: for each new Stream received by the Session object, we subscribe to it and store the returned Subscriber object in our `subscribers` array. Method `session.subscribe` has *undefined* as second parameter so OpenVidu doesn't insert and HTML video element in the DOM due to,  as it is a native application, the DOM does not exist.  The render method of *App.js* will show the new video, as it contains a .map js function, declaring a *RTCView* for each subscriber. We get the reference to RTCView and we will run openvidu-browser method *addVideoElement*, passing the reference of the RTCView when it is defined.

        {this.state.subscribers.map((item, index) => {
            if(!!item){
                return (
                    <View key={index}>
                        <Text>{this.getNicknameTag(item.stream)}</Text>
                        <RTCView zOrder={0}  objectFit="cover" style={styles.remoteView}  ref={(rtcVideo) => {
                            if (!!rtcVideo){
                                item.addVideoElement(rtcVideo);
                            }
                        }} />
                    </View>
                )
        }
	
- `streamDestroyed`: for each Stream that has been destroyed from the Session object (which means a user has left the video-call), we remove the associated Subscriber from `subscribers` array, so React will automatically delete the required *RTCView* component. 

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

Now we need a token from OpenVidu Server. In a production environment we would perform this operations in our application backend, by making use of the _[REST API](/reference-docs/REST-API/){:target="_blank"}_, _[OpenVidu Java Client](/reference-docs/openvidu-java-client/){:target="_blank"}_ or _[OpenVidu Node Client](/reference-docs/openvidu-node-client/){:target="_blank"}_. Here we have implemented the POST requests to OpenVidu Server in a method `getToken()` that returns a Promise with the token, using `fetch` library. Without going into too much detail, this method performs two POST requests to OpenVidu Server, passing OpenVidu Server secret to authenticate them:

  - First request performs a POST to `/api/sessions` (we send a `customSessionId` field to name the session with our `mySessionId` value retrieved from HTML input)
  - Second request performs a POST to `/api/tokens` (we send a `session` field to assign the token to this same session)

You can inspect this method in detail in the [GitHub repo](https://github.com/OpenVidu/openvidu-tutorials/blob/master/openvidu-react-native/App.js#L268){:target="_blank"}.

---

#### Connect to the session:

```javascript
// --- 4) Connect to the session with a valid user token ---

// 'getToken' method is simulating what your server-side should do.
// 'token' parameter should be retrieved and returned by your own backend
this.getToken().then((token) => {
    // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
    // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
    mySession.connect(token, { clientData: this.state.myUserName })
        .then(() => {
            if (Platform.OS == 'android') {
                this.checkAndroidPermissions();
            }
            
            // --- 5) Get your own camera stream ---
            if (this.state.role !== 'SUBSCRIBER') {
                // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
                // element: we will manage it on our own) and with the desired properties
                let publisher = this.OV.initPublisher(undefined, {
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
                    mainStreamManager: publisher
                });
                mySession.publish(publisher);
            }
            
        })
        .catch((error) => {
            console.log('There was an error connecting to the session:', error.code, error.message);
        });
    })
    .catch((error) => console.log('Error', error));
```

In `session.connect` method first param is the recently retrieved user token. Second param is the value every user will receive in `event.stream.connection.data` property on `streamCreated` event. (this value will be used to show the user's nickname to the his video).

If the method succeeds we will call to `checkAndroidPermissions()` method. This method requests and checks the device permissions that our app currently has in the device. Once the permissions have been resolved, the `OV.initPublisher()` method will be called. For iOS  and web platforms, permissions will be handled automatically when camera and microphone access are requested. No need for extra steps in these cases, so we directly initialize our Publisher object.

We do further talk about Android permissions under section [Android specific requirements](#android-specific-requirements).

#### Finally publish your webcam calling `OV.initPublisher()` method: 

```javascript
let publisher = this.OV.initPublisher(undefined, {
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
    mainStreamManager: publisher
});
mySession.publish(publisher);
```

We now proceed to publish our webcam to the session. To do so we get a `Publisher` object with the desired properties and publish it to the Session through `Session.publish()` method. The rest of users will receive our Stream object and will execute their `streamCreated` event.

Also we store the Publisher object under `this.state.mainStreamManager` variable. This way our webcam will be appended along all remote subscribers, in exactly the same way they are shown.

```
<View style={styles.container}>
    <Text>Session: {this.state.mySessionId}</Text>
    <Text>{this.getNicknameTag(this.state.mainStreamManager.stream)}</Text>
    <RTCView zOrder={0}  objectFit="cover"
        ref={(rtcVideo) => {
            if (!!rtcVideo) {
                this.state.mainStreamManager.addVideoElement(rtcVideo);
            }
        }}
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
    this.OV = null;
    this.setState({
        session: undefined,
        subscribers: [],
        mySessionId: 'SessionReactNative',
        myUserName: 'Participant' + Math.floor(Math.random() * 100),
        mainStreamManager: undefined,
        publisher: undefined,
    });
}
```

<br>

## Android specific requirements

Android apps need to actively ask for permissions in the code to access camera and microphone using *[react-native-webrtc](https://github.com/react-native-webrtc/react-native-webrtc){:target="_blank"}* plugin. By following steps below we have been able to properly set up the optimal configuration your React Native app will need to work along OpenVidu.

These configurations are already included in this **openvidu-react-native** project, so if you start from here no further configurations are needed. Otherwise, if you want to **start a new project with React Native and OpenVidu**, you should follow these simple steps:

 1) In `android/app/src/main/AndroidManifest.xml` add these permissions

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-feature android:name="android.hardware.camera" />
<uses-feature android:name="android.hardware.camera.autofocus"/>

<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.WAKE_LOCK" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
```

2) In `android/settings.gradle`, include WebRTCModule

```javascript
include ':WebRTCModule', ':app'
project(':WebRTCModule').projectDir = new File(rootProject.projectDir, '../node_modules/openvidu-browser/node_modules/react-native-webrtc/android')
```

3) In `android/app/build.gradle`, add WebRTCModule to dependencies

```javascript
dependencies {
    implementation project(':WebRTCModule')
    ...
}
```


4) In `android/app/src/main/java/com/xxx/MainApplication.java` import and add **WebRTCModulePackage**:

If you are using a version prior to 0.60.0:

```java
import com.oney.WebRTCModule.WebRTCModulePackage;

...

@Override
protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
        new WebRTCModulePackage() // <-- Add this line
    );
}
```

If you are using a version above to 0.60.0:

```java
import com.oney.WebRTCModule.WebRTCModulePackage;

....

@Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for example:
      // packages.add(new MyReactNativePackage());
      packages.add(new WebRTCModulePackage()); // <-- Add this line
      return packages;
    }
```


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
<strong>INFO: </strong>react-native-webrtc provide us more information about these requeriments <a target="blank" href="https://github.com/react-native-webrtc/react-native-webrtc/blob/master/Documentation/AndroidInstallation.md">here</a>
</div>
</div>
<br>

## iOS specific requirements

iOS apps need to include the WebRTC modules from react-native-webrtc plugin. We will do it by following the steps bellow.

These configurations are already included in this **openvidu-react-native project**, so if you start from here no further configurations are needed. Otherwise, if you want to **start a new project with React Native and OpenVidu**, you should follow these simple steps:

1) Add these files into your project

* in Xcode: Right click on `Libraries` and  `Add Files to {project}`
* Go to `node_modules/openvidu-browser/node_modules/react-native-webrtc/ios/RCTWebRTC.xcodeproj` and click on `Add`
* Also add `node_modules/react-native-webrtc/ios/WebRTC.framework` to `Frameworks` folder

<div class="row no-margin row-gallery">
	<div class="col-md-12">
		<a data-fancybox="gallery" href="/img/tutorials/xcode1.png">
		<img class="img-responsive" src="/img/tutorials/xcode1.png">
	</a>
	</div>
</div>


2) iOS Podfile

You can use the included podspec in your podfile to take care of all dependencies instead of manually adding files to the project. If you prefer to add it manually, you should check the [official tutorial](https://github.com/react-native-webrtc/react-native-webrtc/blob/master/Documentation/iOSInstallation.md){:target="_blank"}. 

Include in the Podfile in your react-native iOS directory:

```js
pod 'react-native-webrtc', :path => '../node_modules/openvidu-browser/node_modules/react-native-webrtc'
```

You may have to change the ```platform``` field in your Podfile, as **react-native-webrtc** doesn't support iOS 9 - set it to '10.0' or above (otherwise you get an error when doing ```pod install```):

```js
platform :ios, '10.0'
```

3) Set up parameters

Under **Build setting** set **Dead Code Stripping** to `No` also under **Build Options** set **Enable Bitcode** to `No` as well

4) Add Permissions
* Navigate to `<ProjectFolder>/ios/<ProjectName>/`
* Edit **Info.plist** and add the following lines

```xml
<key>NSCameraUsageDescription</key>
<string>Camera Permission</string>
<key>NSMicrophoneUsageDescription</key>
<string>Microphone Permission</string>
```

5) Install pod

You will install the Podfile that we have set up in step 2:

```bash
cd ios
pod install 
```

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
<strong>INFO: </strong>react-native-webrtc provide us more information about these requeriments <a target="blank" href="https://github.com/react-native-webrtc/react-native-webrtc/blob/master/Documentation/iOSInstallation.md">here</a>
</div>
</div>
<br>



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