# openvidu-insecure-js
<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-insecure-js" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

A client-side only application built with JavaScript, HTML and CSS.

If it is the first time you use OpenVidu, it is highly recommended to start with **[openvidu-hello-world](tutorials/openvidu-hello-world/){:target="_blank"}** tutorial, as this app is no more than an extension of it with some new features and styles.

## Understanding this tutorial

<p align="center">
  <img class="img-responsive" src="https://docs.google.com/uc?id=0B61cQ4sbhmWSeVBWdkFwWEtqNjA">
</p>

OpenVidu is composed by the three modules displayed on the image above in its insecure version.

- **openvidu-browser**: JavaScript library for the browser. It allows you to manage your video-calls straight away from your clients
- **openvidu-server**: Java application that controls Kurento Media Server
- **Kurento Media Server**: server that handles low level operations of media flows transmission

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
	Tutorial's name includes "insecure" word because this application has no backend and therefore it has no control over the users. Typically you don't want such application in production environments. When you feel comfortable with the client-side of OpenVidu, add your own server or follow one of our super simple secure tutorials.
</div>
</div>

## Running this tutorial

1) Clone the repo:

```bash
git clone https://github.com/OpenVidu/openvidu-tutorials.git
```

2) You will need an http web server installed in your development computer to execute the sample application. If you have _node.js_ installed, you can use [http-server](https://github.com/indexzero/http-server){:target="_blank"} to serve application files. It can be installed with:

```bash
npm install -g http-server
```

3) Run the tutorial:

```bash
http-server openvidu-tutorials/openvidu-insecure-js/web
```

4) _openvidu-server_ and _Kurento Media Server_ must be up and running in your development machine. The easiest way is running this Docker container which wraps both of them (you will need [Docker CE](https://store.docker.com/search?type=edition&offering=community){:target="_blank"}):

```bash
docker run -p 4443:4443 --rm -e openvidu.secret=MY_SECRET openvidu/openvidu-server-kms:2.12.0
```

5) Go to _[`localhost:8080`](http://localhost:8080){:target="_blank"}_ to test the app once the server is running. The first time you use the docker container, an alert message will suggest you accept the self-signed certificate of _openvidu-server_ when you first try to join a video-call.

> If you are using **Windows**, read this **[FAQ](troubleshooting/#3-i-am-using-windows-to-run-the-tutorials-develop-my-app-anything-i-should-know){:target="_blank"}** to properly run the tutorial

> To learn **some tips** to develop with OpenVidu, check this **[FAQ](troubleshooting/#2-any-tips-to-make-easier-the-development-of-my-app-with-openvidu){:target="_blank"}**

<div class="row no-margin row-gallery">
	<div class="col-md-6">
		<a data-fancybox="gallery" href="img/demos/insecure-join.png">
		<img class="img-responsive" src="img/demos/insecure-join.png">
	</a>
	</div>
	<div class="col-md-6">
		<a data-fancybox="gallery" href="img/demos/insecure-session.png">
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

`OV` will be our OpenVidu object (entrypoint to the library). `session` will be the video-call we will connect to. As first sentences in the join method, we initialize the two parameters whose value is retrieved from the HTML inputs.

```javascript
var mySessionId = document.getElementById("sessionId").value; 	// Session the user will join
var myUserName = document.getElementById("userName").value;		// Nickname of the user in the session
```

---

#### Let's initialize a new session and configure our events:

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
```

Here we subscribe to the events that interest us. In this case, we want to receive all videos published to the session, as well as displaying every user's nickname next to its video. To achieve this:

- `streamCreated`: for each new Stream received by OpenVidu, we immediately subscribe to it so we can see its video. A new HTML video element will be appended to element with id 'video-container'.

- `videoElementCreated`: event triggered by Subscriber object (returned by the previous `Session.subscribe` method). This allows us to add the participant nickname to the new video previously added in `streamCreated` event. Auxiliary method `appendUserData` is responsible for appending a new paragraph element just below the `event.element` video, containing `subscriber.stream.connection.data` field. In this case, this field contains the user's nickName. You can see how to feed this property from the client in a later step.

- `streamDestroyed`: for each Stream that has been destroyed (which means a user has left the video-call), we remove the element with the user's nickname that we added in the previous event with the auxiliary method `removeUserData` (`appendUserData` method created the element with an _id_ containing `event.stream.connection.connectionId` unique value, so we can now identify the right element to be removed). OpenVidu automatically deletes the proper video element by default, so we don't need to do anything else.

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
// --- 4) Connect to the session with a valid user token ---

// 'getToken' method is simulating what your server-side should do.
// 'token' parameter should be retrieved and returned by your own backend
getToken(mySessionId).then(token => {
	// See next point to see how to connect to the session using 'token'
});
```

Now we need a token from OpenVidu Server. In a production environment we would perform this operations in our application backend, by making use of the _[REST API](reference-docs/REST-API/){:target="_blank"}_, _[OpenVidu Java Client](reference-docs/openvidu-java-client/){:target="_blank"}_ or _[OpenVidu Node Client](reference-docs/openvidu-node-client/){:target="_blank"}_. Here we have implemented the POST requests to OpenVidu Server in a method `getToken()` that returns a Promise with the token. Without going into too much detail, this method performs two _ajax_ requests to OpenVidu Server, passing OpenVidu Server secret to authenticate them:

  - First ajax request performs a POST to `/api/sessions` (we send a `customSessionId` field to name the session with our `mySessionId` value retrieved from HTML input)
  - Second ajax request performs a POST to `/api/tokens` (we send a `session` field to assign the token to this same session)

You can inspect this method in detail in the [GitHub repo](https://github.com/OpenVidu/openvidu-tutorials/blob/master/openvidu-insecure-js/web/app.js#L192){:target="_blank"}.

---

#### Finally connect to the session using the token and publish your webcam:

```javascript
// --- 4) Connect to the session with a valid user token ---

// 'getToken' method is simulating what your server-side should do.
// 'token' parameter should be retrieved and returned by your own backend
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

Whenever we want a user to leave the session, we just need to call `session.disconnect` method:

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
	if (session) session.disconnect();
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