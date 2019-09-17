# openvidu-android

<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-android" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

A client-side only **Android native** application built with **Java**.

If it is the first time you use OpenVidu, it is highly recommended to start first with **[openvidu-hello-world](/tutorials/openvidu-hello-world/){:target="\_blank"}** tutorial due to this being a native Android app and being a little more complex for OpenVidu starters.

## Understanding this tutorial

<p align="center">
  <img class="img-responsive" src="/img/tutorials/openvidu-android.png">
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
	This tutorial has been tested on Android 8.1.0 (Oreo)
</div>
</div>

To deploy the Android APK you need to have **Android Studio**, an **Android device** (recommended) or an **Android emulator** and **Android SDK** installed.
You can download Android Studio [here](https://developer.android.com/studio/index.html). You also can chek the [official Android Studio guide](https://developer.android.com/studio/intro){:target="_blank"}

After we have setted up Android Studio we must continue with the following commands:

1. Clone the repo

```bash
git clone https://github.com/OpenVidu/openvidu-tutorials.git
```

2. Open **Android Studio** and import the project _(openvidu-tutorials/openvidu-android)_.

3. Now you need the IP of your PC in the network. In Linux you can simply get it by running this command on your shell

```console
hostname -I | awk '{print $1}'
```

> It will probably output something like `192.168.0.105`. Your **complete OpenVidu public url** would then be `https://192.168.0.105:4443/`

When you have your OpenVidu public url, you must set it in `default_openvidu_url` variable [**in the app**](https://github.com/OpenVidu/openvidu-tutorials/blob/1439f20bce6cee1f3d4b6495c9f2c05d672d4b65/openvidu-android/app/src/main/res/values/strings.xml#L10){:target="\_blank"} and in the `openvidu.publicurl` parameter used to run _openvidu-server_ (see next point)

4. _openvidu-server_ and _Kurento Media Server_ must be up and running in your development machine. The easiest way is running this Docker container which wraps both of them (you will need [Docker CE](https://store.docker.com/search?type=edition&offering=community){:target="\_blank"})

```bash
docker run -p 4443:4443 --rm -e openvidu.secret=MY_SECRET -e openvidu.publicurl=YOUR_OPENVIDU_PUBLIC_URL openvidu/openvidu-server-kms:2.11.0
```

> Remember changing `openvidu.publicurl` parameter to the actual value. In this example that would be:<br>`-e openvidu.publicurl=https://192.168.0.105:4443/`

5. Connect the device to the same network as your PC

6. In Android Studio, you must modify the websocket address inside of **strings.xml** file.

To do that, in Android Studio, go to `app > res > values > strings.xml`. The value of `default_openvidu_url` will must be the IP of your PC.

In this example that would be: `https://192.168.0.105:4443/`

7. Connect the device to the PC. You must enable USB debugging and give permissions (check out [how run your first app](https://developer.android.com/training/basics/firstapp/running-app){:target="_blank"})

8. Run the tutorial. In Android Studio, click the **app** module in the **Project** window and then select **Run** > **Run** .
   In the **Select Deployment Target** window, select your device, and click **OK**.

<p align="center">
  <img class="img-responsive xcode-img" style="padding: 25px 0; max-width: 750px" src="/img/demos/openvidu-android-devices.png">
</p>

<br>

<div class="row no-margin ">
	<div class="col-md-6 col-sm-6">
		<a data-fancybox="gallery2" href="/img/demos/ov-android.png">
		<img class="img-responsive" src="/img/demos/ov-android.png">
	</a>
	</div>
	<div class="col-md-6 col-sm-6">
		<a data-fancybox="gallery2" href="/img/demos/ov-android2.png">
		<img class="img-responsive" src="/img/demos/ov-android2.png">
	</a>
	</div>
</div>

<br>

## Understanding the code

This is an Android project generated with Android Studio, and therefore you will see lots of configuration files and other stuff that doesn't really matter to us. We will focus on the following files under `app/java` folder:

-   `SessionActivity.java`: This class defines the only Android activity that the app contains.
-   `Participant.java`: It is related to the participants info. This is the parent class of `RemoteParticipant` and `LocalParticipant`.
-   `Session.java`: The aim of this class is to manage the differents peers that make a conversation and set up the session.
-   `CustomWebSocket.java`: The negotiation with the **openvidu-server** takes place in this class. Its responsibility is to listen what comes to the socket we have, to handler the messages from and to **openvidu-server**. This class is based on [OpenVidu Server RPC protocol](http://localhost:4000/docs/developing/rpc/).

---

#### WebSocket address, session name and participant name:

As we have said above, you have to modify the value of `default_openvidu_url` with the IP of your PC. For example:

```xml
<string name="default_openvidu_url">https://192.168.0.105:4443/</string>
```

Besides, the name you give to the participant (`default_participant_name`) and the session name (`default_session_name`) allows to complete the address used to connect to the WebScoket. The initial value can be found in `res > values > strings.xml`.

```xml
<string name="default_session_name">SessionA</string>
<string name="default_participant_name">Participant</string>
```

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

```java
private void getToken(String sessionId) {
    // See next point to see how to connect to the session using 'token'
    ...
}
```

Now we need a token from OpenVidu Server. In a production environment we would perform this operations in our application backend, by making use of the _[REST API](/reference-docs/REST-API/){:target="\_blank"}_, _[OpenVidu Java Client](/reference-docs/openvidu-java-client/){:target="\_blank"}_ or _[OpenVidu Node Client](/reference-docs/openvidu-node-client/){:target="\_blank"}_. Here we have implemented the POST requests to OpenVidu Server in a method `getToken()` that returns a Promise with the token. Without going into too much detail, this method performs two _ajax_ requests to OpenVidu Server, passing OpenVidu Server secret to authenticate them:

-   First ajax request performs a POST to `/api/sessions` (we send a `customSessionId` field to name the session with our `mySessionId` value retrieved from HTML input)
-   Second ajax request performs a POST to `/api/tokens` (we send a `session` field to assign the token to this same session)

You can inspect this method in detail in the [GitHub repo](https://github.com/OpenVidu/openvidu-tutorials/blob/7e685c38fbefe5d1a2ff95fe975cad1e6448c33d/openvidu-android/app/src/main/java/com/example/openviduandroid/activities/SessionActivity.java#L137){:target="\_blank"}.


#### Initialize the session

Once we have gotten the token, we can set up the session and the websocket.
We create our **localParticipant** and **capture the camera**:

```java
...
String participantName = participant_name.getText().toString();

// Creating a session instance and setting up the PeerConnectionFactory
session = new Session(sessionId, token, views_container, thisActivity);

// Creating the local participant instance
LocalParticipant localParticipant = new LocalParticipant(participantName, session, thisActivity.getApplicationContext(), localVideoView);

// Capturing the camera device. See next point to see the camera methods
localParticipant.startCamera();

runOnUiThread(() -> {
    main_participant.setText(participant_name.getText().toString());
    main_participant.setPadding(20, 3, 20, 3);
});

// Creating a webSocket instance
CustomWebSocket webSocket = new CustomWebSocket(session, OPENVIDU_URL, thisActivity);

//Setting up the webSocket
webSocket.execute();
session.setWebSocket(webSocket);

```

To configure the **session**, we are going to initialize and build the `PeerConnectionFactory`.

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

#### Capture the camera

Android provides us a very easy way to use **Camera** API. This API includes support for various cameras and camera features available on devices, allowing you to capture pictures and videos in your application.

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

Since from API level 21, the `Camera` class was **deprecated**. Android introduced `Camera2` with **Android 5.0 (Lollipop)** (API level 21) and above.

As the [Android official documentation](https://developer.android.com/guide/topics/media/camera){:target="_blank"} recommends, we should use Camera2 on supported devices.

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


#### Connect to the session:

In this point, we are trying to establish a connection between **openvidu-server** and our android application through the websocket:

```java
...

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
```

#### We listen the server events

We need an extra method to handle de messages from openvidu server. This will be essential in order to know when the **ice candidates** arrives, when a **new user has been joined** to the room or when the **participant has left** the session.

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

#### Add remotes users connected:

**OpenVidu Server** will notify us if someone is connected in our room. We need to hanlde this type of events and do the right thing. In this case we have to add a new participant in our app.

```java
private RemoteParticipant newRemoteParticipantAux(JSONObject participantJson) throws JSONException {
    final String connectionId = participantJson.getString(JsonConstants.ID);
    final String participantName = new JSONObject(participantJson.getString(JsonConstants.METADATA)).getString("clientData");

    // Creating a remote participant and saving it in a remoteParticipants Map
    final RemoteParticipant remoteParticipant = new RemoteParticipant(connectionId, participantName, this.session);

    //Creating a remote participant video view 
    this.activity.createRemoteParticipantVideo(remoteParticipant);
    this.session.createRemotePeerConnection(remoteParticipant.getConnectionId());
    return remoteParticipant;
}
```


---

### Using OpenVidu Server RPC protocol

Taking the references from [OpenVidu Server RPC protocol](https://openvidu.io/docs/developing/rpc/){:target="_blank"}, we will be able call to the **OpenVidu Server methods** and **receive the events** from OpenVidu Server 



#### Whenever a the websocket is connected successfully, `joinSession()` method is called:

Once the connection is established, we need to join to the room. Using a JSON using RPC 2.0 with `joinRoom` method and the followings parameteres we'll be able to connect to the room:

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

#### Finally publish your webcam calling `publishVideo()` method:

JSON RPC 2.0 helps us again. We need to send a JSON through the websocket with the required params that it's shown below:

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

#### Leaving the session

Whenever we want that an user leaves the session, we just need to call `leaveSession`::

```java
public void leaveRoom() {
    this.ID_LEAVEROOM.set(this.sendJson(JsonConstants.LEAVEROOM_METHOD));
}
```

To leaving the session, we will use the same concept, to send a JSON RPC 2.0 through the websocket with an empty params.

---

## Android specific requirements

Android apps need to actively ask for permissions in the code to access camera and microphone. By following steps below we have been able to properly set up the permissions your app will need to work along OpenVidu.
You have a great complete guide [here](https://developer.android.com/training/permissions/requesting#java){:target="_blank"}

These configurations are already included in this **openvidu-android** project, so if you start from here no further configurations are needed. Otherwise, if you want to **start a new Android project**, you should follow these simple steps:

1.  Add the permissions you need to rquest to the manifest:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
        package="com.example.openviduapp">

    <uses-permission android:name="android.permission.INTERNET"/>
    <!-- other permissions go here -->

    <application ...>
        ...
    </application>
</manifest>
```

2. Check for permissions. To check if you have a permission, call the `ContextCompat.checkSelfPermission()` method. For example:

```java
if (ContextCompat.checkSelfPermission(thisActivity, Manifest.permission.WRITE_CALENDAR)
        != PackageManager.PERMISSION_GRANTED) {
    // Permission is not granted
}
```

If the app has the permission, the method returns **PERMISSION_GRANTED**, and the app can proceed with the operation. If the app does not have the permission, the method returns **PERMISSION_DENIED**, and the app has to explicitly ask the user for permission.

3. We are finally ready to request permissions to our device. Android provides several methods you can use to request a permission, such as `requestPermissions()`, as shown in the code snippet below. Calling these methods brings up a standard Android dialog, which you cannot customize.

```java
// Here, thisActivity is the current activity
if (ContextCompat.checkSelfPermission(thisActivity,
        Manifest.permission.READ_CONTACTS)
        != PackageManager.PERMISSION_GRANTED) {

    // Permission is not granted
    // Should we show an explanation?
    if (ActivityCompat.shouldShowRequestPermissionRationale(thisActivity,
            Manifest.permission.READ_CONTACTS)) {
        // Show an explanation to the user *asynchronously* -- don't block
        // this thread waiting for the user's response! After the user
        // sees the explanation, try again to request the permission.
    } else {
        // No explanation needed; request the permission
        ActivityCompat.requestPermissions(thisActivity,
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
