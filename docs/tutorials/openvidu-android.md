# openvidu-android

<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-android" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

A client-side only **Android native** application built with **Java** and using official **Google WebRTC library**.

If it is the first time you use OpenVidu, it is highly recommended to start first with **[openvidu-hello-world](tutorials/openvidu-hello-world/){:target="\_blank"}** tutorial due to this being a native Android app and being a little more complex for OpenVidu starters.

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
	 OpenVidu does not provide an Android client SDK yet, so this application directly implements <a href="developing/rpc/" target="_blank">OpenVidu Server RPC protocol</a>. In other words, it internally implements what <a target="_blank" href="reference-docs/openvidu-browser">openvidu-browser</a> library does. Everything about this implementation is explained in section <a href="#using-openvidu-server-rpc-protocol">Using OpenVidu Server RPC protocol</a>
</div>
</div>

## Understanding this tutorial

<p align="center">
  <img class="img-responsive" src="img/tutorials/openvidu-android.png">
</p>

OpenVidu is composed by the three modules displayed on the image above in its insecure version.

-   **openvidu-android**: Android application built with Java connected to OpenVidu through websocket
-   **openvidu-server**: Java application that controls Kurento Media Server
-   **Kurento Media Server**: server that handles low level operations of media flow transmissions

## Running this tutorial

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
	This tutorial is compatible for Android >= 5.0 (API level >= 21)
</div>
</div>

To deploy the Android APK you need to have **Android Studio**, an **Android device** (recommended) or an **Android emulator** and **Android SDK** installed.
You can download Android Studio [here](https://developer.android.com/studio/index.html){:target="_blank"}. You also can check the [official Android Studio guide](https://developer.android.com/studio/intro){:target="_blank"}

After we have set up Android Studio we must continue with the following commands:

**1)** Clone the repo

```bash
git clone https://github.com/OpenVidu/openvidu-tutorials.git
```

**2)** Open **Android Studio** and import the project _(openvidu-tutorials/openvidu-android)_

**3)** Now you need the IP of your PC in your LAN network, which we will use in points 4) and 5) to configure OpenVidu Server and your app. In Linux/OSX you can simply get it by running the following command on your shell (will probably output something like `192.168.1.111`)


```console
awk '/inet / && $2 != "127.0.0.1"{print $2}' <(ifconfig)
```

**4)** OpenVidu Platform service must be up and running in your development machine. The easiest way is running this Docker container which wraps both of them (you will need [Docker CE](https://store.docker.com/search?type=edition&offering=community){:target="\_blank"}). Set property `DOMAIN_OR_PUBLIC_IP` to the IP we just got in point 3). In the example below that would be replacing `-e DOMAIN_OR_PUBLIC_IP=YOUR_OPENVIDU_IP` to `-e DOMAIN_OR_PUBLIC_IP=192.168.1.111`

```bash
# WARNING: this container is not suitable for production deployments of OpenVidu Platform
# Visit https://docs.openvidu.io/en/stable/deployment

docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET -e DOMAIN_OR_PUBLIC_IP=YOUR_OPENVIDU_IP openvidu/openvidu-server-kms:2.14.0
```

**5)** In Android Studio, you must also indicate the OpenVidu Server URL to the app. To do that, go to `app > res > values > strings.xml`. The value of `default_openvidu_url` (that's [**here**](https://github.com/OpenVidu/openvidu-tutorials/blob/1439f20bce6cee1f3d4b6495c9f2c05d672d4b65/openvidu-android/app/src/main/res/values/strings.xml#L10){:target="\_blank"}) must be the URL of your OpenVidu Server. Complete URL is `https://DOMAIN_OR_PUBLIC_IP:4443/`, being DOMAIN_OR_PUBLIC_IP the IP address configured in your OpenVidu Platform service. In this example that would be: `https://192.168.1.111:4443/`

**6)** Connect the device to the same network as your PC

**7)** Connect the device to the PC. You must enable USB debugging and give permissions (check out [official Android docs](https://developer.android.com/training/basics/firstapp/running-app){:target="_blank"})

**8)** Run the tutorial. In Android Studio, click the **app** module in the **Project** window and then select **Run** > **Run** .
   In the **Select Deployment Target** window, select your device, and click **OK**.

<p align="center">
  <img class="img-responsive" style="padding: 25px 0" src="img/demos/openvidu-android-devices.png">
</p>

<br>

<div class="row no-margin ">
	<div class="col-md-6 col-sm-6">
		<a data-fancybox="gallery2" href="img/demos/ov-android.png">
		<img class="img-responsive" src="img/demos/ov-android.png">
	</a>
	</div>
	<div class="col-md-6 col-sm-6">
		<a data-fancybox="gallery2" href="img/demos/ov-android2.png">
		<img class="img-responsive" src="img/demos/ov-android2.png">
	</a>
	</div>
</div>

---

## Understanding the code

This is an Android project generated with Android Studio, and therefore you will see lots of configuration files and other stuff that doesn't really matter to us. We will focus on the following files under `app/java` folder:

- `SessionActivity.java`: this class defines the only Android activity of the app.
- `Participant.java`: it is related to the participants info, such as connection information and their UI elements. This is the parent class of `RemoteParticipant` and `LocalParticipant`.
- `Session.java`: this manages the collection of Participant objects, the behavior of SessionActivity layout and takes care of the creation of PeerConnection objects.
- `CustomWebSocket.java`: the negotiation with **openvidu-server** takes place in this class. Its responsibility is to send RPC methods and listen to openvidu-server events through a websocket connection. To sum up, it implements [OpenVidu Server RPC protocol](developing/rpc/).

<br>

---

#### WebSocket address, session name and participant name

As stated above in [Running this tutorial](#running-this-tutorial), you have to modify the value of `default_openvidu_url` with the IP of your PC in file `res > values > strings.xml`. For example:

```xml
<string name="default_openvidu_url">https://192.168.1.111:4443/</string>
```

Besides, you can change the default values for the local participant name (`default_participant_name`) and session name (`default_session_name`). These will appear as default values in the form to connect to a session.

```xml
<string name="default_session_name">SessionA</string>
<string name="default_participant_name">Participant</string>
```

<br>

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

<p style="text-align: center; font-weight: bold; margin-bottom: -9px; margin-top: 13px; font-size: 12px; word-break: break-word"><a href="https://github.com/OpenVidu/openvidu-tutorials/blob/master/openvidu-android/app/src/main/java/io/openvidu/openvidu_android/activities/SessionActivity.java" target="_blank">src/main/java/io/openvidu/openvidu_android/activities/SessionActivity.java</a></p>

```java
private void getToken(String sessionId) {
    // See next point to see how to connect to the session using 'token'
    ...
}
```

Now we need a token from OpenVidu Server. In a production environment we would perform this operations in our application backend, by making use of the _[REST API](reference-docs/REST-API/){:target="\_blank"}_, _[OpenVidu Java Client](reference-docs/openvidu-java-client/){:target="\_blank"}_ or _[OpenVidu Node Client](reference-docs/openvidu-node-client/){:target="\_blank"}_. Here we have implemented the POST requests to OpenVidu Server in a method `getToken()`. Without going into too much detail, this method performs two _POST_ requests to OpenVidu Server, passing OpenVidu Server secret to authenticate them. We use an http-client we have wrapped in class [`CustomHttpClient`](https://github.com/OpenVidu/openvidu-tutorials/blob/master/openvidu-android/app/src/main/java/io/openvidu/openvidu_android/utils/CustomHttpClient.java){:target="_blank"}.

- First request performs a POST to `/api/sessions` (we send a `customSessionId` field to force the id of the session to be the value retrieved from the view's form. This way we don't need a server side to connect multiple users to the same session)
- Second request performs a POST to `/api/tokens` (we send a `session` field to assign the token to this same session)

You can inspect this method in detail in the [GitHub repo](https://github.com/OpenVidu/openvidu-tutorials/blob/master/openvidu-android/app/src/main/java/io/openvidu/openvidu_android/activities/SessionActivity.java#L136){:target="\_blank"}.

<br>

---

#### When token available start the process to connect to openvidu-server

Once we have gotten the token, we can set up our session object, our camera and the websocket.
We create our **session**, our **localParticipant** and **capture the camera**:

<p style="text-align: center; font-weight: bold; margin-bottom: -9px; margin-top: 13px; font-size: 12px; word-break: break-word"><a href="https://github.com/OpenVidu/openvidu-tutorials/blob/master/openvidu-android/app/src/main/java/io/openvidu/openvidu_android/activities/SessionActivity.java" target="_blank">src/main/java/io/openvidu/openvidu_android/activities/SessionActivity.java</a></p>

```java
private void getTokenSuccess(String token, String sessionId) {
    // Initialize our session object
    session = new Session(sessionId, token, views_container, this);

    // Initialize our local participant and start local camera
    String participantName = participant_name.getText().toString();
    LocalParticipant localParticipant = new LocalParticipant(participantName, session, this.getApplicationContext(), localVideoView);
    localParticipant.startCamera();
    runOnUiThread(() -> {
        // Update local participant view
        main_participant.setText(participant_name.getText().toString());
        main_participant.setPadding(20, 3, 20, 3);
    });

    // Initialize and connect the websocket to OpenVidu Server
    startWebSocket();
}
```

To configure the **session**, we are going to initialize and build the `PeerConnectionFactory`. This is the way to initialize WebRTC peer connections with the official Google WebRTC library for Android.

<p style="text-align: center; font-weight: bold; margin-bottom: -9px; margin-top: 13px; font-size: 12px; word-break: break-word"><a href="https://github.com/OpenVidu/openvidu-tutorials/blob/master/openvidu-android/app/src/main/java/io/openvidu/openvidu_android/openvidu/Session.java" target="_blank">src/main/java/io/openvidu/openvidu_android/openvidu/Session.java</a></p>

```Java
//Creating a new PeerConnectionFactory instance
PeerConnectionFactory.InitializationOptions.Builder optionsBuilder = PeerConnectionFactory.InitializationOptions.builder(activity.getApplicationContext());
optionsBuilder.setEnableInternalTracer(true);
PeerConnectionFactory.InitializationOptions opt = optionsBuilder.createInitializationOptions();
PeerConnectionFactory.initialize(opt);
PeerConnectionFactory.Options options = new PeerConnectionFactory.Options();

// Using sofware encoder and decoder.
final VideoEncoderFactory encoderFactory;
final VideoDecoderFactory decoderFactory;
encoderFactory = new SoftwareVideoEncoderFactory();
decoderFactory = new SoftwareVideoDecoderFactory();

peerConnectionFactory = PeerConnectionFactory.builder()
        .setVideoEncoderFactory(encoderFactory)
        .setVideoDecoderFactory(decoderFactory)
        .setOptions(options)
        .createPeerConnectionFactory();
```

<br>

---

#### Capture the camera

Android provides us a very easy way to use **Camera** API. This API includes support for various cameras and camera features available on devices, allowing you to capture pictures and videos in your application. In the end, we need to store the video track.

<p style="text-align: center; font-weight: bold; margin-bottom: -9px; margin-top: 13px; font-size: 12px; word-break: break-word"><a href="https://github.com/OpenVidu/openvidu-tutorials/blob/master/openvidu-android/app/src/main/java/io/openvidu/openvidu_android/openvidu/LocalParticipant.java" target="_blank">src/main/java/io/openvidu/openvidu_android/openvidu/LocalParticipant.java</a></p>

```java
public void startCamera() {

    final EglBase.Context eglBaseContext = EglBase.create().getEglBaseContext();
    PeerConnectionFactory peerConnectionFactory = this.session.getPeerConnectionFactory();

    // Create AudioSource
    AudioSource audioSource = peerConnectionFactory.createAudioSource(new MediaConstraints());
    this.audioTrack = peerConnectionFactory.createAudioTrack("101", audioSource);

    surfaceTextureHelper = SurfaceTextureHelper.create("CaptureThread", eglBaseContext);
    
    // Create VideoCapturer
    VideoCapturer videoCapturer = createCameraCapturer();
    VideoSource videoSource = peerConnectionFactory.createVideoSource(videoCapturer.isScreencast());
    videoCapturer.initialize(surfaceTextureHelper, context, videoSource.getCapturerObserver());
    videoCapturer.startCapture(480, 640, 30);

    // Create VideoTrack
    this.videoTrack = peerConnectionFactory.createVideoTrack("100", videoSource);
    
    // Display in localView
    this.videoTrack.addSink(localVideoView);
}
```

Since API level 21, `Camera` class was deprecated. Android introduced `Camera2` with Android 5.0 (API level 21) and above. As the [Android official documentation](https://developer.android.com/guide/topics/media/camera){:target="_blank"} recommends, we should use Camera2 on supported devices.

<p style="text-align: center; font-weight: bold; margin-bottom: -9px; margin-top: 13px; font-size: 12px; word-break: break-word"><a href="https://github.com/OpenVidu/openvidu-tutorials/blob/master/openvidu-android/app/src/main/java/io/openvidu/openvidu_android/openvidu/LocalParticipant.java" target="_blank">src/main/java/io/openvidu/openvidu_android/openvidu/LocalParticipant.java</a></p>

```java
private VideoCapturer createCameraCapturer() {
    CameraEnumerator enumerator;
    if (Build.VERSION.SDK_INT > Build.VERSION_CODES.LOLLIPOP) {
        enumerator = new Camera2Enumerator(this.context);
    } else {
        enumerator = new Camera1Enumerator(false);
    }
    final String[] deviceNames = enumerator.getDeviceNames();

    // Try to find front facing camera
    for (String deviceName : deviceNames) {
        if (enumerator.isFrontFacing(deviceName)) {
            videoCapturer = enumerator.createCapturer(deviceName, null);
            if (videoCapturer != null) {
                return videoCapturer;
            }
        }
    }
    // Front facing camera not found, try something else
    for (String deviceName : deviceNames) {
        if (!enumerator.isFrontFacing(deviceName)) {
            videoCapturer = enumerator.createCapturer(deviceName, null);
            if (videoCapturer != null) {
                return videoCapturer;
            }
        }
    }
    return null;
}
```

We also have to think about the media permissions. You can take a look to the Android permissions under section [Android specific requirements](#android-specific-requirements).

<br>

---

#### Connect the websocket to OpenVidu Server

Ath this point, we will establish a connection between **openvidu-server** and our Android app through the websocket. This way will be able to consume [OpenVidu Server RPC protocol](developing/rpc/){:target="_blank"} to interact with the session (in the future, when OpenVidu Android SDK is available, this won't be necessary). We do so in background as an async task so the main execution thread is not blocked.

<p style="text-align: center; font-weight: bold; margin-bottom: -9px; margin-top: 13px; font-size: 12px; word-break: break-word"><a href="https://github.com/OpenVidu/openvidu-tutorials/blob/master/openvidu-android/app/src/main/java/io/openvidu/openvidu_android/websocket/CustomWebSocket.java" target="_blank">src/main/java/io/openvidu/openvidu_android/openvidu/CustomWebSocket.java</a></p>

```java
@Override
protected Void doInBackground(SessionActivity... sessionActivities) {
    try {
        WebSocketFactory factory = new WebSocketFactory();

        //Returns a SSLContext object that implements the specified secure socket protocol
        SSLContext sslContext = SSLContext.getInstance("TLS");
        sslContext.init(null, trustManagers, new java.security.SecureRandom());
        factory.setSSLContext(sslContext);

        // Set the flag which indicates whether the hostname in the server's certificate should be verified or not.
        factory.setVerifyHostname(false);

        // Connecting the websocket to OpenVidu URL 
        websocket = factory.createSocket(getWebSocketAddress(openviduUrl));
        websocket.addListener(this);
        websocket.connect();
    } catch ( ... )
```

<br>

---

### Using OpenVidu Server RPC protocol

Taking the references from [OpenVidu Server RPC protocol](developing/rpc/){:target="_blank"}, we will be able call to the **OpenVidu Server methods** and **receive events** from OpenVidu Server.

#### Listening to OpenVidu Server events

The app implements a method to handle event messages received from openvidu server. This will be essential in order to know when **ice candidates** arrive, when a **new user joined** the session, when a **user published a video to the session** or when some **participant left** the session.

<p style="text-align: center; font-weight: bold; margin-bottom: -9px; margin-top: 13px; font-size: 12px; word-break: break-word"><a href="https://github.com/OpenVidu/openvidu-tutorials/blob/master/openvidu-android/app/src/main/java/io/openvidu/openvidu_android/websocket/CustomWebSocket.java" target="_blank">src/main/java/io/openvidu/openvidu_android/openvidu/CustomWebSocket.java</a></p>

```java
private void handleServerEvent(JSONObject json) throws JSONException {
    if (!json.has(JsonConstants.PARAMS)) {
        Log.e(TAG, "No params " + json.toString());
    } else {
        final JSONObject params = new JSONObject(json.getString(JsonConstants.PARAMS));
        String method = json.getString(JsonConstants.METHOD);
        switch (method) {
            case JsonConstants.ICE_CANDIDATE:
                iceCandidateEvent(params);
                break;
            case JsonConstants.PARTICIPANT_JOINED:
                participantJoinedEvent(params);
                break;
            case JsonConstants.PARTICIPANT_PUBLISHED:
                participantPublishedEvent(params);
                break;
            case JsonConstants.PARTICIPANT_LEFT:
                participantLeftEvent(params);
                break;
            default:
                throw new JSONException("Unknown method: " + method);
        }
    }
}
```

- `iceCandidate`: this event brings a new ICE candidate generated in openvidu-server. We must include it in the proper PeerConnection object (we receive ICE candidates for our local PeerConnection and for each remote PeerConnection). To avoid timing problems, the application stores the received ICE candidates until that PeerConnection state is `STABLE`. Whenever it is reached, it processes all of them at once.
- `participantJoined`: this event tells us a new participant has joined our session. We initialize a new PeerConnection object (so we may receive the new user's camera stream) and a new video element in the UI.
- `participantPublished`: this event tells us a user has started sending a video to the session. We must start the ICE negotiation for receiving the new video stream over the proper and already initialized PeerConnection object. We do so by simply following WebRTC protocol: creating and setting a local SDP offer, sending it to openvidu-server with RPC method `receiveVideoFrom` and setting the answer received as remote SDP description of this PeerConnection.
- `participantLeftEvent`: dispatched when some user has left the session. We simply dispose the proper PeerConnection and update our view.<br><br>

---

#### Sending methods to OpenVidu Server

Below we list all the RPC methods that this Android app sends to OpenVidu Server. Each one of them will be answered by OpenVidu Server with a specific response. They must be properly processed and usually a new flow of method calls will follow the reception of these answers. We will not explain in detail every one of them to keep the length of this tutorial under control, but you can easily follow the flow of method calls in the source code.<br><br>

##### Joining a session with `joinRoom` method

Once the websocket connection is established, we need to join to the session. By sending a JSON-RPC method `joinRoom` with the followings parameters we'll be able to connect to the session:

<p style="text-align: center; font-weight: bold; margin-bottom: -9px; margin-top: 13px; font-size: 12px; word-break: break-word"><a href="https://github.com/OpenVidu/openvidu-tutorials/blob/master/openvidu-android/app/src/main/java/io/openvidu/openvidu_android/websocket/CustomWebSocket.java" target="_blank">src/main/java/io/openvidu/openvidu_android/openvidu/CustomWebSocket.java</a></p>

```java
public void joinRoom() {
    Map<String, String> joinRoomParams = new HashMap<>();

    // Setting the joinRoom parameters
    joinRoomParams.put(JsonConstants.METADATA, "{\"clientData\": \"" + this.session.getLocalParticipant().getParticipantName() + "\"}");
    joinRoomParams.put("secret", "");
    joinRoomParams.put("session", this.session.getId());
    joinRoomParams.put("platform", "Android " + android.os.Build.VERSION.SDK_INT);
    joinRoomParams.put("token", this.session.getToken());

    //Sending JSON through websocket specifying 'joinRoom' method.
    this.ID_JOINROOM.set(this.sendJson(JsonConstants.JOINROOM_METHOD, joinRoomParams));
}
```

As response we will receive an object with all the existing participants in the session and all the published streams. We first process them as explained in events `participantJoined` and `participantPublished` in previous section [Listening to OpenVidu Server events](#listening-to-openvidu-server-events). And we must publish our own camera by initializing our local PeerConnection and MediaStream and calling `publishVideo` RPC method (see next point).<br><br>

##### Publishing the camera with `publishVideo` method

We need to send a JSO-RPC message through the websocket with the required params as shown below:

<p style="text-align: center; font-weight: bold; margin-bottom: -9px; margin-top: 13px; font-size: 12px; word-break: break-word"><a href="https://github.com/OpenVidu/openvidu-tutorials/blob/master/openvidu-android/app/src/main/java/io/openvidu/openvidu_android/websocket/CustomWebSocket.java" target="_blank">src/main/java/io/openvidu/openvidu_android/openvidu/CustomWebSocket.java</a></p>

```Java
public void publishVideo(SessionDescription sessionDescription) {
    Map<String, String> publishVideoParams = new HashMap<>();

    // Setting the publishVideo parameters
    publishVideoParams.put("audioActive", "true");
    publishVideoParams.put("videoActive", "true");
    publishVideoParams.put("doLoopback", "false");
    publishVideoParams.put("frameRate", "30");
    publishVideoParams.put("hasAudio", "true");
    publishVideoParams.put("hasVideo", "true");
    publishVideoParams.put("typeOfVideo", "CAMERA");
    publishVideoParams.put("videoDimensions", "{\"width\":320, \"height\":240}");
    publishVideoParams.put("sdpOffer", sessionDescription.description);

    //Sending JSON through websocket specifying 'publishVideo' method.
    this.ID_PUBLISHVIDEO.set(this.sendJson(JsonConstants.PUBLISHVIDEO_METHOD, publishVideoParams));
}
```

<br>

##### Subscribing to a remote video with `receiveVideo` method

We need to send a JSON-RPC through the websocket with the required params as shown below:

<p style="text-align: center; font-weight: bold; margin-bottom: -9px; margin-top: 13px; font-size: 12px; word-break: break-word"><a href="https://github.com/OpenVidu/openvidu-tutorials/blob/master/openvidu-android/app/src/main/java/io/openvidu/openvidu_android/websocket/CustomWebSocket.java" target="_blank">src/main/java/io/openvidu/openvidu_android/openvidu/CustomWebSocket.java</a></p>

```Java
public void receiveVideoFrom(SessionDescription sessionDescription, RemoteParticipant remoteParticipant, String streamId) {
    Map<String, String> receiveVideoFromParams = new HashMap<>();
    receiveVideoFromParams.put("sdpOffer", sessionDescription.description);
    receiveVideoFromParams.put("sender", streamId);
    this.IDS_RECEIVEVIDEO.put(
        this.sendJson(JsonConstants.RECEIVEVIDEO_METHOD, receiveVideoFromParams),
            remoteParticipant.getConnectionId());
}
```

<br>

##### Leaving the session with `leaveRoom` method

We need to send a JSON-RPC through the websocket (empty parameters in this case):

<p style="text-align: center; font-weight: bold; margin-bottom: -9px; margin-top: 13px; font-size: 12px; word-break: break-word"><a href="https://github.com/OpenVidu/openvidu-tutorials/blob/master/openvidu-android/app/src/main/java/io/openvidu/openvidu_android/websocket/CustomWebSocket.java" target="_blank">src/main/java/io/openvidu/openvidu_android/openvidu/CustomWebSocket.java</a></p>

```java
public void leaveRoom() {
    this.ID_LEAVEROOM.set(this.sendJson(JsonConstants.LEAVEROOM_METHOD));
}
```

<br>

---

## Android specific requirements

Android apps need to actively ask for permissions in the code to access camera and microphone. By following steps below we have been able to properly set up the permissions your app will need to work along OpenVidu.
You have a great complete guide [here](https://developer.android.com/training/permissions/requesting#java){:target="_blank"}.

These configurations are already included in this **openvidu-android** project, so if you start from here no further configurations are needed. Otherwise, if you want to **start a new Android project**, you should follow these simple steps:

**1)** Add required permissions to your manifest file

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="io.openvidu.openvidu_android">

    <application>
        ...
    </application>

    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.RECORD_AUDIO" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
    <uses-permission android:name="android.permission.INTERNET" />

</manifest>
```

**2)** Check if your application has already the necessary permissions. To do so, call the `ContextCompat.checkSelfPermission()` method. For example:

```java
if (ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA)
        != PackageManager.PERMISSION_GRANTED) {
    // Permission for camera is not granted
}
```

If the app already has the permission, the method returns `PackageManager.PERMISSION_GRANTED` and the app can proceed with the operation. If the app does not have the permission, the method returns `PackageManager.PERMISSION_DENIED`, and the app has to explicitly ask the user for permission.

**3)** Android provides several methods to request for a permission, such as `requestPermissions()`, as shown in the code snippet below. Calling these methods brings up a standard Android dialog so the user may accept or decline the permissions.

```java
// Here, "this" object is the current activity
if (ContextCompat.checkSelfPermission(this,
        Manifest.permission.READ_CONTACTS)
        != PackageManager.PERMISSION_GRANTED) {

    // Permission is not granted
    // Should we show an explanation?
    if (ActivityCompat.shouldShowRequestPermissionRationale(this,
            Manifest.permission.READ_CONTACTS)) {
        // Show an explanation to the user *asynchronously* -- don't block
        // this thread waiting for the user's response! After the user
        // sees the explanation, try again to request the permission.
    } else {
        // No explanation needed. Request the permission
        ActivityCompat.requestPermissions(this,
                new String[]{Manifest.permission.READ_CONTACTS},
                MY_PERMISSIONS_REQUEST_READ_CONTACTS);

        // MY_PERMISSIONS_REQUEST_READ_CONTACTS is an
        // app-defined int constant. The callback method gets the
        // result of the request.
    }
} else {
    // Permission has already been granted
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
