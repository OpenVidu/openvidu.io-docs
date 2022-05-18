# openvidu-insecure-js-screen-share
<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-insecure-js-screen-share" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

This tutorial is a modification of **[openvidu-insecure-js](tutorials/openvidu-insecure-js/)** which includes the posibility to share the screen with other users in the same session. For more information about OpenVidu screen share capabilities, check: **[Scren Share section](advanced-features/screen-share)**.

If it is the first time you use OpenVidu, it is highly recommended starting with **[openvidu-hello-world](tutorials/openvidu-hello-world/)** tutorial, as this app is no more than an extension of it with some new features and styles.

## Understanding this tutorial

The tutorial we are going to see is a simple client-side application built with **JavaScript**, **HTML** and **CSS**, using OpenVidu. Take a look at the diagram
below:

<p align="center">
  <img class="img-responsive" src="https://docs.google.com/uc?id=0B61cQ4sbhmWSeVBWdkFwWEtqNjA">
</p>

OpenVidu is composed by the three modules displayed on the image above in its insecure version.

- **openvidu-browser**: JavaScript library for the browser. It allows you to manage your video-calls straight away from your clients
- **openvidu-server**: Java application that controls Kurento Media Server
- **Kurento Media Server**: server that handles low level operations of media flows transmission

We will be working in the _**"You will be here"**_ box, by building a simple client-side application using **openvidu-browser** to communicate with **openvidu-server** and
create step by step a videoconference web application with screensharing capabilities.

<div style="
    display: table;
    border: 2px solid #0088aa9e;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 25px;
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
	Tutorial's name includes "insecure" word because this application has no backend, and therefore it has no control over the users. Typically, you don't want such application in production environments. When you feel comfortable with the client-side of OpenVidu, add your own server or follow one of our super simple secure tutorials.
</div>
</div>

## Running this tutorial

1) Clone the repo:

```bash
git clone https://github.com/OpenVidu/openvidu-tutorials.git -b v2.22.0
```

2) You will need a http web server installed in your development computer to execute the sample application. If you have _node.js_ installed, you can use [http-server](https://github.com/indexzero/http-server){:target="_blank"} to serve application files. It can be installed with:

```bash
npm install -g http-server
```

3) Run the tutorial:

```bash
http-server openvidu-tutorials/openvidu-insecure-js-screen-share/web
```

4) OpenVidu Server must be up and running in your development machine. The easiest way is running this Docker container, which wraps both of them (you will need [Docker CE](https://store.docker.com/search?type=edition&offering=community){:target="_blank"}):

```bash
# WARNING: this container is not suitable for production deployments of OpenVidu Platform
# Visit https://docs.openvidu.io/en/stable/deployment

docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-server-kms:2.22.0
```

5) Go to _[`http://localhost:8080`](http://localhost:8080){:target="_blank"}_ to test the app once the server is running. The first time you use the docker container, an alert message will suggest you accept the self-signed certificate of _openvidu-server_ when you first try to join a video-call.

> If you are using **Windows**, read this **[FAQ](troubleshooting/#3-i-am-using-windows-to-run-the-tutorials-develop-my-app-anything-i-should-know)** to properly run the tutorial

> To learn **some tips** to develop with OpenVidu, check this **[FAQ](troubleshooting/#2-any-tips-to-make-easier-the-development-of-my-app-with-openvidu)**

<div class="row no-margin row-gallery">
	<div class="col-md-6">
		<a data-fancybox="gallery" href="img/demos/insecure-join.png">
		<img class="img-responsive" src="img/demos/insecure-join.png">
	</a>
	</div>
	<div class="col-md-6">
		<a data-fancybox="gallery" href="img/demos/insecure-session-screenshare.png">
		<img class="img-responsive" src="img/demos/insecure-session-screenshare.png">
	</a>
	</div>
</div>

## Understanding the code

This application is very simple. It has only 4 files:

- `openvidu-browser-VERSION.js`: openvidu-browser library. You don't have to manipulate this file.
- `app.js`: sample application main JavaScript file, which makes use of _openvidu-browser-VERSION.js_. You can manipulate this file to suit your needs.
- `style.css`: some CSS classes to style _index.html_. You can manipulate this file to suit your needs.
- `index.html`: HTML code for the form to connect to a video-call and for the video-call itself. You can manipulate this file to suit your needs. It has two links to both JavaScript files:

<pre class="html-scripts">
    <code>&lt;script src="openvidu-browser-VERSION.js"&gt;&lt;/script&gt;
&lt;script src="app.js"&gt;&lt;/script&gt;</code>
</pre>

Let's see how `app.js` uses `openvidu-browser-VERSION.js`:

---

#### First lines declare the variables that will be needed in different points along the code

```javascript
// OpenVidu global variables
var OVCamera;
var OVScreen
var sessionCamera;
var sessionScreen

// User name and session name global variables
var myUserName;
var mySessionId;
var screensharing = false;
```

To handle in a better way **Camera videos** and **Screen Videos**, we declare two variabes for each type of video.

**OpenVidu variables**:

- `OVCamera` and `OVScreen`: These two variables will be our OpenVidu object (entrypoint to the library). We will use `OVCamera` to init `sessionCamera` object, and `OVScreen` to init `sessionScreen` object.
- `sessionCamera` and `sessionScreen`: These two objects will represent the video-call we will connect. Both **will be associated to the same session id**, but with `sessionCamera` we will handle webcam events and with `sessionScreen` we will handle screen events.

**Global State variables**

- `mySessionId`: This represents the session id which the session have, entered in the initial form.
- `myUserName`: This represents the username entered in the initial form.
- `screensharing`: Boolean state which represents if the user is screensharing or not to display a button.

When the **join** button is clicked, `mySessionId` and `myUserName` will be loaded from the initial form:

```javascript
mySessionId = document.getElementById("sessionId").value;
myUserName = document.getElementById("userName").value;
```

---

#### Let's initialize a new session and configure our events:

```javascript
// --- 1) Create two OpenVidu objects.

// 'OVCamera' will handle Camera operations.
// 'OVScreen' will handle screen sharing operations
OVCamera = new OpenVidu();
OVScreen = new OpenVidu();

// --- 2) Init two OpenVidu Session Objects ---

// 'sessionCamera' will handle camera operations
// 'sessionScreen' will handle screen sharing operations
sessionCamera = OVCamera.initSession();
sessionScreen = OVScreen.initSession();
```

As you can see in the code, the process is very simple: get an OpenVidu object and initialize a Session object with it. But, as we said in the previous section above, we will create two Openvidu objects and two session objects.

```javascript
// --- 3) Specify the actions when events of type 'streamCreated' take
// --- place in the session. The reason why we're using two different objects
// --- is to handle subscribers differently when it is of 'CAMERA' type, or 'SCREEN' type ---
// ------- 3.1) Handle subscribers of 'CAMERA' type
sessionCamera.on('streamCreated', event => {
    if (event.stream.typeOfVideo == "CAMERA") {
        // Subscribe to the Stream to receive it. HTML video will be appended to element with 'container-cameras' id
        var subscriber = sessionCamera.subscribe(event.stream, 'container-cameras');
        // When the HTML video has been appended to DOM...
        subscriber.on('videoElementCreated', event => {
            // Add a new <p> element for the user's nickname just below its video
            appendUserData(event.element, subscriber.stream.connection);
        });
    }
});

// ------- 3.2) Handle subscribers of 'Screen' type
sessionScreen.on('streamCreated', event => {
    if (event.stream.typeOfVideo == "SCREEN") {
        // Subscribe to the Stream to receive it. HTML video will be appended to element with 'container-screens' id
        var subscriberScreen = sessionScreen.subscribe(event.stream, 'container-screens');
        // When the HTML video has been appended to DOM...
        subscriberScreen.on('videoElementCreated', event => {
            // Add a new <p> element for the user's nickname just below its video
            appendUserData(event.element, subscriberScreen.stream.connection);
        });
    }
});

// On every Stream destroyed...
sessionCamera.on('streamDestroyed', event => {
    // Delete the HTML element with the user's nickname. HTML videos are automatically removed from DOM
    removeUserData(event.stream.connection);
});

// On every asynchronous exception...
sessionCamera.on('exception', (exception) => {
    console.warn(exception);
});
```

Here we subscribe to the events that interest us. In this case, we want to receive all videos published to the session, as well as displaying every user's nickname next to its video, including of course, screen share published videos.

- `sessionCamera.on('streamCreated')`: for each new Stream received by OpenVidu of `CAMERA` type, we immediately subscribe to it, so we can see its video. A new HTML video element will be appended to the element with id :`'container-cameras'`. The important thing is the if statement: `if (event.stream.typeOfVideo == "CAMERA")`. This will only add camera videos into the `'container-cameras'` HTML element.

- `sessionScreen.on('streamCreated')`: for each new Stream received by OpenVidu of `SCREEN` type, we immediately subscribe to it, so we can see its video. A new HTML video element will be appended to the element with id :`'container-screens'`. The important thing is the if statement: `if (event.stream.typeOfVideo == "SCREEN")`. This will only add screen share videos into the `'container-screens'` HTML element.

- `videoElementCreated`: event triggered by Subscriber object (returned by the previous `sessionCamera.subscribe` and `sessionScreen.subscribe` method). This allows us to add the participant nickname to the new video previously added in `streamCreated` event. Auxiliary method `appendUserData` is responsible for appending a new paragraph element just below the `event.element` video, containing `subscriber.stream.connection.data` field. In this case, this field contains the user's nickName. You can see how to feed this property from the client in a later step.

- `streamDestroyed`: for each Stream that has been destroyed (which means a user has left the video-call), we remove the element with the user's nickname that we added in the previous event with the auxiliary method `removeUserData` (`appendUserData` method created the element with an _id_ containing `event.stream.connection.connectionId` unique value, so we can now identify the right element to be removed). OpenVidu automatically deletes the proper video element by default, so we don't need to do anything else.

- `exception`: event triggered by Session object when an asynchronous unexpected error takes place on the server-side

> Check [Application specific methods](#application-specific-methods) section to see all the auxiliary methods used in this app

---

#### Get a _token_ from OpenVidu Server

<div style="
    display: table;
    border: 2px solid #0088aa9e;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 25px;
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
	<strong>WARNING</strong>: This is why this tutorial is an insecure application. We need to ask OpenVidu Server for a user token in order to connect to our session. <strong>This process should entirely take place in our server-side</strong>, not in our client-side. But due to the lack of an application backend in this tutorial, the JavaScript code itself will perform the POST operations to OpenVidu Server
</div>
</div>

```javascript
// --- 4) Connect to the session with a valid user token. ---
// 'getToken' method is simulating what your server-side should do.
// 'token' parameter should be retrieved and returned by your own backend

// -------4.1 Get the token for the 'sessionCamera' object
getToken(mySessionId).then(token => {
    sessionCamera.connect(token, { clientData: myUserName }).then(() => {
        // ...
        // See next point to see how to connect to the session using 'token'
    });
});

// -------4.2 Get the token for the 'sessionScreen' object
getToken(mySessionId).then((tokenScreen) => {
    sessionScreen.connect(tokenScreen, { clientData: myUserName }).then(() => {
        // ...
        // See next point to see how to connect to the session using 'token'
    });
});
```

Now we need a token from OpenVidu Server. In a production environment we would perform these operations in our application backend, by making use of the _[REST API](reference-docs/REST-API/)_, _[OpenVidu Java Client](reference-docs/openvidu-java-client/)_ or _[OpenVidu Node Client](reference-docs/openvidu-node-client/)_. Here we have implemented the POST requests to OpenVidu Server in a method `getToken()` that returns a Promise with the token. Without going into too much detail, this method performs two _ajax_ requests to OpenVidu Server, passing OpenVidu Server secret to authenticate them:

  - First ajax request performs a POST to `/openvidu/api/sessions` (we send a `customSessionId` field to name the session with our `mySessionId` value retrieved from HTML input)
  - Second ajax request performs a POST to `/openvidu/api/sessions/<sessionId>/connection` (the path requires the `sessionId` to assign the token to this same session)

You can inspect this method in detail in the [GitHub repo](https://github.com/OpenVidu/openvidu-tutorials/blob/1ddfa8e4b967e297acf4827c81010a209ba9a549/openvidu-insecure-js-screen-share/web/app.js#L249){:target="_blank"}.

On the other hand, you can see in the code above that we are creating two tokens to the same id (`mySessionId`). You will see why in the next section...

---

#### Finally, connect to the session using the token and publish your webcam:

```javascript
// --- 4) Connect to the session with a valid user token. ---
// 'getToken' method is simulating what your server-side should do.
// 'token' parameter should be retrieved and returned by your own backend

// -------4.1 Get the token for the 'sessionCamera' object
getToken(mySessionId).then(token => {

    // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
    // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
    sessionCamera.connect(token, { clientData: myUserName })
        .then(() => {

            // --- 5) Set page layout for active call ---

            document.getElementById('session-title').innerText = mySessionId;
            document.getElementById('join').style.display = 'none';
            document.getElementById('session').style.display = 'block';

            // --- 6) Get your own camera stream with the desired properties ---

            var publisher = OVCamera.initPublisher('container-cameras', {
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: undefined, // The source of video. If undefined default webcam
                publishAudio: true,  	// Whether you want to start publishing with your audio unmuted or not
                publishVideo: true,  	// Whether you want to start publishing with your video enabled or not
                resolution: '640x480',  // The resolution of your video
                frameRate: 30,			// The frame rate of your video
                insertMode: 'APPEND',	// How the video is inserted in the target element 'container-cameras'
                mirror: false       	// Whether to mirror your local video or not
            });

            // --- 7) Specify the actions when events take place in our publisher ---

            // When our HTML video has been added to DOM...
            publisher.on('videoElementCreated', function (event) {
                initMainVideo(event.element, myUserName);
                appendUserData(event.element, myUserName);
                event.element['muted'] = true;
            });

            // --- 8) Publish your stream ---
            sessionCamera.publish(publisher);

        })
        .catch(error => {
            console.log('There was an error connecting to the session:', error.code, error.message);
        });
});

// -------4.2 Get the token for the 'sessionScreen' object
getToken(mySessionId).then((tokenScreen) => {
    // Create a token for screen share
    sessionScreen.connect(tokenScreen, { clientData: myUserName }).then(() => {
        document.getElementById('buttonScreenShare').style.visibility = 'visible';
        console.log("Session screen connected");
    }).catch((error => {
        console.warn('There was an error connecting to the session for screen share:', error.code, error.message);
    }));;
});
```

In `sessionCamera.connect` method first param is the recently retrieved user token. Remember `videoElementCreated` event for the Subscriber object, when we added the user's nickname to the HTML? Well, second parameter is the actual value every user will receive in `Stream.connection.data` property in that event. So in this case it is an object with a property "clientData" with value "myUserName", which has been set in the first step to the value retrieved from HTML input `<input class="form-control" type="text" id="userName" required>` (this is filled by the user).

If the method succeeds, we first change our view to the active call (5) and then proceed to publish our webcam to the session. To do so we get a `Publisher` object with the desired properties (6). This process will end with the addition of a new HTML video element showing your camera, as a child of element with _id_ `'container-cameras'`. Event `videoElementCreated` will be fired by the Publisher object just after this video is added to DOM, so we can subscribe to it and do whatever we want with it. In this case, we init another bigger video element with our video and append our nickname to it, by using auxiliary methods `initMainVideo` and `appendUserData` (7).

Finally we just have to publish `publisher` object through `Session.publish` method (8), and the rest of users will begin receiving our webcam (`'streamCreated'` event will be fired for them).

But, you will notice that we're not doing the same with `sessionScreen.connect` (4.2). Well, that is because until the user don't click the _**"Screen Share"**_ button, we will not publish anything from the screen. So, for the `sessionScreen`, we only initialize the connection with the `tokenScreen`. When the `sessionScreen` connection is established, the button to share the screen is enabled.

So, what happens when the user clicks the _**"Screen Share"**_ button? This function is executed:

```javascript
// --- 9). Create a function to be called when the 'Screen share' button is clicked.
function publishScreenShare() {
	// --- 9.1) To create a publisherScreen it is very important that the property 'videoSource' is set to 'screen'
	var publisherScreen = OVScreen.initPublisher("container-screens", { videoSource: "screen" });

	// --- 9.2) If the user grants access to the screen share function, publish the screen stream
	publisherScreen.once('accessAllowed', (event) => {
		document.getElementById('buttonScreenShare').style.visibility = 'hidden';
		screensharing = true;
		// It is very important to define what to do when the stream ends.
		publisherScreen.stream.getMediaStream().getVideoTracks()[0].addEventListener('ended', () => {
			console.log('User pressed the "Stop sharing" button');
			sessionScreen.unpublish(publisherScreen);
			document.getElementById('buttonScreenShare').style.visibility = 'visible';
			screensharing = false;
		});
		sessionScreen.publish(publisherScreen);
	});

	publisherScreen.on('videoElementCreated', function (event) {
		appendUserData(event.element, sessionScreen.connection);
		event.element['muted'] = true;
	});

	publisherScreen.once('accessDenied', (event) => {
		console.error('Screen Share: Access Denied');
	});
}
```

When the user clicks the _**"Screen Share"**_ button, a new publisher is created, and initialized to render all of its videos in `'container-screens'` HTML Element (9.1). The important parameter of the `publisherScreen` is: `videoSource: "screen"`. You need to use this property to create a publisher to share the screen.
After the user allows sharing its own screen (9.2), the _**"Screen Share"**_ button is disabled and the screen is published into the session by calling `sessionScreen.publish(publisherScreen)`. When the user stop screensharing, the element will be deleted automatically from the div and the button will appear again for the user to share the screen again.

We also define some events as `videoElementCreated` to append the username information into the video element. If the user denied the access to the screen share, the event `accessDenied` will be received. We just handle it to output an error though the console.

---

#### Leaving the session

Whenever we want a user to leave the session, we just need to call `sessionCamera.disconnect` and `sessionScreen.disconnect` method:

```javascript
function leaveSession() {

	// --- 10) Leave the session by calling 'disconnect' method over the Session object ---
	sessionScreen.disconnect();
	sessionCamera.disconnect();

	// Removing all HTML elements with user's nicknames.
	// HTML videos are automatically removed when leaving a Session
	removeAllUserData();

	// Back to 'Join session' page
	document.getElementById('join').style.display = 'block';
	document.getElementById('session').style.display = 'none';
	// Restore default screensharing value to false
	screensharing = false;
}
```

---

#### Application specific methods

Here you have all the auxiliary methods used in this app, which are not directly related to OpenVidu:

```javascript
/* APPLICATION SPECIFIC METHODS */

window.addEventListener('load', function () {
	generateParticipantInfo();
});

window.onbeforeunload = function () {
	if (sessionCamera) sessionCamera.disconnect();
	if (sessionScreen) sessionScreen.disconnect();
};

function generateParticipantInfo() {
	document.getElementById("sessionId").value = "SessionA";
	document.getElementById("userName").value = "Participant" + Math.floor(Math.random() * 100);
}

function appendUserData(videoElement, connection) {
	var userData;
	var nodeId;
	if (typeof connection === "string") {
		userData = connection;
		nodeId = connection;
	} else {
		userData = JSON.parse(connection.data).clientData;
		nodeId = connection.connectionId;
	}
	var dataNode = document.createElement('div');
	dataNode.className = "data-node";
	dataNode.id = "data-" + nodeId;
	dataNode.innerHTML = "<p>" + userData + "</p>";
	videoElement.parentNode.insertBefore(dataNode, videoElement.nextSibling);
	addClickListener(videoElement, userData);
}

function removeUserData(connection) {
	var dataNodeToRemove = document.getElementById("data-" + connection.connectionId);
	if (dataNodeToRemove) {
		dataNodeToRemove.parentNode.removeChild(dataNodeToRemove);
	}
}

function removeAllUserData() {
	var nicknameElements = document.getElementsByClassName('data-node');
	while (nicknameElements[0]) {
		nicknameElements[0].parentNode.removeChild(nicknameElements[0]);
	}
}

function addClickListener(videoElement, userData) {
	videoElement.addEventListener('click', function () {
		var mainVideo = $('#main-video video').get(0);
		if (mainVideo.srcObject !== videoElement.srcObject) {
			$('#main-video').fadeOut("fast", () => {
				$('#main-video p').html(userData);
				mainVideo.srcObject = videoElement.srcObject;
				$('#main-video').fadeIn("fast");
			});
		}
	});
}

function initMainVideo(videoElement, userData) {
	document.querySelector('#main-video video').srcObject = videoElement.srcObject;
	document.querySelector('#main-video p').innerHTML = userData;
	document.querySelector('#main-video video')['muted'] = true;
}
```

## Deploy openvidu-insecure-js

<div class="warningBoxContent">
  <div style="display: table-cell; vertical-align: middle;">
      <i class="icon ion-android-alert warningIcon"></i>
  </div>
  <div class="warningBoxText">
    This application <strong>must not be deployed in a production environment</strong> as it is insecure (it has not backend).
  </div>
</div>

Under the root project folder, you can see the `openvidu-insecure-js-screen-share/docker/` directory. Here it is included all the required files to make it possible the deployment with OpenVidu.

First, you will need to create the **openvidu-insecure-js-screen-share** docker image.

**1) Run `create_image.sh` script:**

```bash
./create_image.sh
```

This script will create an image named `openvidu/openvidu-insecure-js-screen-share-demo:X.Y.Z`. If you want to create an image with a different name, you can change its name [here](https://github.com/OpenVidu/openvidu-tutorials/blob/c1b9fc1/openvidu-insecure-js/docker/create_image.sh#L5-L6). Once the openvidu-insecure-js-screen-share image has been created, you will be able to deploy it.

**2) Redefine the `/opt/openvidu/docker-compose.override.yml`**

Now you will have to redefine the `/opt/openvidu/docker-compose.override.yml` in your OpenVidu deployment, and you have to take account to change the image name by your custom name (`openvidu/openvidu-insecure-js-screen-share-demo` on this sample).

Your `docker-compose.override.yml` should look like this:

```
version: '3.1'

services:
    app:
        image: openvidu/openvidu-insecure-js-screen-share-demo:2.22.0
        restart: on-failure
        network_mode: host
        environment:
            - OPENVIDU_URL=https://${DOMAIN_OR_PUBLIC_IP:-}:${HTTPS_PORT:-443}
            - OPENVIDU_SECRET=${OPENVIDU_SECRET}
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
