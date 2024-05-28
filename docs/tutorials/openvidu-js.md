# openvidu-js
<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-js" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

An OpenVidu application built with plain JavaScript, HTML and CSS.

<div class="row">
    <div class="pro-gallery" style="margin: 20px 0 15px 0">
        <a data-fancybox="gallery-pro1" data-type="image" class="fancybox-img" href="img/tutorials/openvidu-js.png">
          <img class="img-responsive" style="margin: auto; max-height: 500px" src="img/tutorials/openvidu-js.png"/>
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

docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-dev:2.30.0
```

#### 2. Run your preferred server application sample

For more information visit [Application server](application-server/).

<div id="application-server-wrapper"></div>
<script src="js/load-common-template.js" data-pathToFile="server-application-samples.html" data-elementId="application-server-wrapper" data-runAnchorScript="false" data-useCurrentVersion="true"></script>

#### 3. Run the client application tutorial

You will need some kind of http web server installed in your development computer to serve the tutorial. If you have Node.js installed, you can use [http-server](https://github.com/indexzero/http-server){:target="_blank"}. It can be installed with:

```bash
npm install --location=global http-server
```

To serve the tutorial:

```bash
# Using the same repository openvidu-tutorials from step 2
http-server openvidu-tutorials/openvidu-js/web
```

Go to [`http://localhost:8080`](http://localhost:8080){:target="_blank"} to test the app once the server is running.

> To test the application with other devices in your network, visit this **[FAQ](troubleshooting/#3-test-applications-in-my-network-with-multiple-devices)**

<div class="row no-margin row-gallery">
	<div class="col-md-6">
		<a data-fancybox="gallery" data-type="image" class="fancybox-img" href="img/demos/insecure-join.png">
			<img class="img-responsive" src="img/demos/insecure-join.png">
		</a>
	</div>
	<div class="col-md-6">
		<a data-fancybox="gallery" data-type="image" class="fancybox-img" href="img/demos/insecure-session.png">
			<img class="img-responsive" src="img/demos/insecure-session.png">
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
var OV;
var session;
```

`OV` will be our OpenVidu object (entrypoint to the library). `session` will be the video-call we will connect to. As first sentences in the `joinSession` method, we initialize the two parameters whose value is retrieved from the HTML inputs.

```javascript
var mySessionId = document.getElementById("sessionId").value; 	// Session the user will join
var myUserName = document.getElementById("userName").value;		// Nickname of the user in the session
```

---

#### Initialize a new session and configure our events

```javascript
// --- 1) Get an OpenVidu object ---

OV = new OpenVidu();

// --- 2) Init a session ---

session = OV.initSession();
```

As you can see in the code, the process is very simple: get an OpenVidu object and initialize a Session object with it.

```javascript
// --- 3) Specify the actions when events take place in the session ---

// On every new Stream received...
session.on('streamCreated', event => {

	// Subscribe to the Stream to receive it. HTML video will be appended to element with 'video-container' id
	var subscriber = session.subscribe(event.stream, 'video-container');

	// When the HTML video has been appended to DOM...
	subscriber.on('videoElementCreated', event => {

		// Add a new <p> element for the user's nickname just below its video
		appendUserData(event.element, subscriber.stream.connection);
	});
});

// On every Stream destroyed...
session.on('streamDestroyed', event => {

	// Delete the HTML element with the user's nickname. HTML videos are automatically removed from DOM
	removeUserData(event.stream.connection);
});

// On every asynchronous exception...
session.on('exception', (exception) => {
	console.warn(exception);
});
```

Here we subscribe to the events that interest us. In this case, we want to receive all videos published to the session, as well as displaying every user's nickname next to its video. To achieve this:

- `streamCreated`: for each new Stream received by OpenVidu, we immediately subscribe to it so we can see its video. A new HTML video element will be appended to element with id 'video-container'.

- `videoElementCreated`: event triggered by Subscriber object (returned by the previous `Session.subscribe` method). This allows us to add the participant nickname to the new video previously added in `streamCreated` event. Auxiliary method `appendUserData` is responsible for appending a new paragraph element just below the `event.element` video, containing `subscriber.stream.connection.data` field. In this case, this field contains the user's nickName. You can see how to feed this property from the client in a later step.

- `streamDestroyed`: for each Stream that has been destroyed (which means a user has left the video-call), we remove the element with the user's nickname that we added in the previous event with the auxiliary method `removeUserData` (`appendUserData` method created the element with an _id_ containing `event.stream.connection.connectionId` unique value, so we can now identify the right element to be removed). OpenVidu automatically deletes the proper video element by default, so we don't need to do anything else.

- `exception`: event triggered by Session object when an asynchronous unexpected error takes place on the server-side

> You can take a look at all the events in the [Reference Documentation](api/openvidu-browser/classes/Event.html)

> Check [Application specific methods](#application-specific-methods) section to see all the auxiliary methods used in this app

---

#### Get an OpenVidu token

We are ready to join the session. But we still need a token to get access to it, so we ask for it to the [server application](application-server/). The server application will in turn request a token to the OpenVidu deployment. If you have any doubts about this process, review the [Basic Concepts](developing-your-video-app/#basic-concepts).

Variable `mySessionId` is the OpenVidu Session we want a token from.

```javascript
// --- 4) Connect to the session with a valid user token ---

// Get a token from the OpenVidu deployment
getToken(mySessionId).then(token => {
	// See next point to see how to connect to the session using 'token'
}
```

This is the piece of code in charge of finally retrieving a token from the application server. The tutorial uses `jQuery.ajax()` method to perform the necessary [HTTP requests](application-server/#rest-endpoints).

```javascript
var APPLICATION_SERVER_URL = "http://localhost:5000/";

function getToken(mySessionId) {
	return createSession(mySessionId).then(sessionId => createToken(sessionId));
}

function createSession(sessionId) {
	return new Promise((resolve, reject) => {
		$.ajax({
			type: "POST",
			url: APPLICATION_SERVER_URL + "api/sessions",
			data: JSON.stringify({ customSessionId: sessionId }),
			headers: { "Content-Type": "application/json" },
			success: response => resolve(response), // The sessionId
			error: (error) => reject(error)
		});
	});
}

function createToken(sessionId) {
	return new Promise((resolve, reject) => {
		$.ajax({
			type: 'POST',
			url: APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections',
			data: JSON.stringify({}),
			headers: { "Content-Type": "application/json" },
			success: (response) => resolve(response), // The token
			error: (error) => reject(error)
		});
	});
}
```

---

#### Finally connect to the session using the token and publish your webcam:

```javascript
// --- 4) Connect to the session with a valid user token ---

// Get a token from the OpenVidu deployment
getToken(mySessionId).then(token => {

	// First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
	// 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
	session.connect(token, { clientData: myUserName })
		.then(() => {

			// --- 5) Set page layout for active call ---

			document.getElementById('session-title').innerText = mySessionId;
			document.getElementById('join').style.display = 'none';
			document.getElementById('session').style.display = 'block';

			// --- 6) Get your own camera stream with the desired properties ---

			var publisher = OV.initPublisher('video-container', {
				audioSource: undefined, // The source of audio. If undefined default microphone
				videoSource: undefined, // The source of video. If undefined default webcam
				publishAudio: true,  	// Whether you want to start publishing with your audio unmuted or not
				publishVideo: true,  	// Whether you want to start publishing with your video enabled or not
				resolution: '640x480',  // The resolution of your video
				frameRate: 30,			// The frame rate of your video
				insertMode: 'APPEND',	// How the video is inserted in the target element 'video-container'
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

			session.publish(publisher);

		})
		.catch(error => {
			console.log('There was an error connecting to the session:', error.code, error.message);
		});
});
```

In `session.connect` method first param is the recently retrieved user token. Remember `videoElementCreated` event for the Subscriber object, when we added the user's nickname to the HTML? Well, second parameter is the actual value every user will receive in `Stream.connection.data` property in that event. So in this case it is an object with a property "clientData" with value "myUserName", which has been set in the first step to the value retrieved from HTML input `<input class="form-control" type="text" id="userName" required>` (this is filled by the user).

If the method succeeds, we first change our view to the active call (5) and then proceed to publish our webcam to the session. To do so we get a `Publisher` object with the desired properties (6). This process will end with the addition of a new HTML video element showing your camera, as a child of element with _id_ 'video-container'. Event `videoElementCreated` will be fired by the Publisher object just after this video is added to DOM, so we can subscribe to it and do whatever we want with it. In this case, we init another bigger video element with our video and append our nickname to it, by using auxiliary methods `initMainVideo` and `appendUserData` (7).

Finally we just have to publish `publisher` object through `Session.publish` method (8), and the rest of users will begin receiving our webcam ('streamCreated' event will be fired for them).

---

#### Leaving the session

Whenever we want a user to leave the session, we just need to call `session.disconnect` method. We also make sure to call the method before the page is unloaded using event `window.onbeforeunload`.

```javascript
function leaveSession() {

	// --- 9) Leave the session by calling 'disconnect' method over the Session object ---

	session.disconnect();

	// Removing all HTML elements with user's nicknames.
	// HTML videos are automatically removed when leaving a Session
	removeAllUserData();

	// Back to 'Join session' page
	document.getElementById('join').style.display = 'block';
	document.getElementById('session').style.display = 'none';
}

window.onbeforeunload = function () {
	if (session) session.disconnect();
};
```

---

#### Application specific methods

Here you have all the auxiliary methods used in this app, which are not directly related to OpenVidu:

```javascript
/* APPLICATION SPECIFIC METHODS */

window.addEventListener('load', function () {
	generateParticipantInfo();
});

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
	var dataNode = document.getElementById("data-" + connection.connectionId);
	dataNode.parentNode.removeChild(dataNode);
}

function removeAllUserData() {
	var nicknameElements = document.getElementsByClassName('data-node');
	while (nicknameElements[0]) {
		nicknameElements[0].parentNode.removeChild(nicknameElements[0]);
	}
}

function addClickListener(videoElement, userData) {
	videoElement.addEventListener('click', function () {
		var mainVideo = document.querySelector('#main-video video');
		var mainUserData = document.querySelector('#main-video p');
		if (mainVideo.srcObject !== videoElement.srcObject) {
			mainUserData.innerHTML = userData;
			mainVideo.srcObject = videoElement.srcObject;
		}
	});
}

function initMainVideo(videoElement, userData) {
	document.querySelector('#main-video video').srcObject = videoElement.srcObject;
	document.querySelector('#main-video p').innerHTML = userData;
	document.querySelector('#main-video video')['muted'] = true;
}
```

## Deploying openvidu-js

> This tutorial image is **officially released for OpenVidu** under the name `openvidu/openvidu-js-demo:X.Y.Z` so you do not need to build it by yourself. However, if you want to deploy a custom version of openvidu-js, you will need to build a new one. You can keep reading for more information.

#### 1) Build the docker image


Under the root project folder, you can see the `openvidu-js/docker/` directory. Here it is included all the required files yo make it possible the deployment with OpenVidu.

First of all, you will need to create the **openvidu-js** docker image. Under `openvidu-js/docker/` directory you will find the `create_image.sh` script. This script will create the docker image with the [openvidu-basic-node](application-server/openvidu-basic-node/) as application server and the static files.

```bash
./create_image.sh openvidu/openvidu-js-demo:X.Y.Z
```

This script will create an image named `openvidu/openvidu-js-demo:X.Y.Z`. This name will be used in the next step.

#### 2) Deploy the docker image

Time to deploy the docker image. You can follow the [Deploy OpenVidu based application with Docker](/deployment/deploying-openvidu-apps/#with-docker) guide for doing this.

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js"></script>
<script type='text/javascript' src='js/fancybox-setup.js'></script>
