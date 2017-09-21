# openvidu-insecure-js
<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-insecure-js" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

A client-side only application built with JavaScript, HTML and CSS.

If it is the first time you use OpenVidu, it is higly recommended to start with **[openvidu-hello-world](/tutorials/openvidu-hello-world/)** tutorial, as this app is no more than an extension of it with some new features and sytles.

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

2) You will need an http web server installed in your development computer to execute the sample application. If you have _node.js_ installed, you can use [http-server](https://github.com/indexzero/http-server) to serve application files. It can be installed with:

```bash
npm install -g http-server
```

3) To run the sample application, execute the following command in the project:

```bash
http-server openvidu-insecure-js/web
```

4) _openvidu-server_ and _Kurento Media Server_ must be up and running in your development machine. The easiest way is running this Docker container which wraps both of them (you will need [Docker CE](https://store.docker.com/search?type=edition&offering=community)):

```bash
docker run -p 8443:8443 --rm -e KMS_STUN_IP=stun.l.google.com -e KMS_STUN_PORT=19302  -e openvidu.secret=MY_SECRET openvidu/openvidu-server-kms
```

5) Go to [`localhost:8080`](http://localhost:8080) to test the app once the server is running. The first time you use the docker container, an alert message will suggest you accept the self-signed certificate of _openvidu-server_ when you first try to join a video-call.

<br>

> To learn **some tips** to develop with OpenVidu, check this **[FAQ](/troubleshooting#2-any-tips-to-make-easier-the-development-of-my-app-with-openvidu)**

> If you are using **Windows**, read this **[FAQ](/troubleshooting/#3-i-am-using-windows-to-run-the-tutorials-develop-my-app-anything-i-should-know)** to properly run the tutorial

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

This application is very simple. It has only 4 files:

- `openvidu-browser-VERSION.js`: openvidu-browser library. You don't have to manipulate this file. 
- `app.js`: sample application main JavaScritp file, which makes use of _openvidu-browser-VERSION.js_. You can manipulate this file to suit your needs.
- `style.css`: some CSS classes to style _index.html_. You can manipulate this file to suit your needs.
- `index.html`: HTML code for the form to connect to a video-call and for the video-call itself. You can manipulate this file to suit your needs. It has two links to both JavaScript files: 

<pre class="html-scripts">
    <code>&lt;script src="openvidu-browser-VERSION.js"&gt;&lt;/script&gt;
&lt;script src="app.js"&gt;&lt;/script&gt;</code>
</pre>

Let's see how `app.js` uses `openvidu-browser-VERSION.js`:

---

#### First lines declare the two variables that will be needed in different points along the code. `OV` will be our OpenVidu object and `session` the video-call we will connect to:

```javascript
var OV;
var session;
```

---

#### Let's initialize a new session and configure our events:

```javascript
// --- 1) Get an OpenVidu object and init a session with a sessionId ---

// Init OpenVidu object
OV = new OpenVidu();

// We will join the video-call "sessionId". As there's no server, this parameter must start with the URL of
// OpenVidu Server (with secure websocket protocol: "wss://") and must include the OpenVidu secret at the end
session = OV.initSession("wss://" + location.hostname + ":8443/" + sessionId + '?secret=MY_SECRET');
```
Session's identifiers must begin with the URL where _openvidu-server_ listens, so they can connect through WebSocket to it. It is necessary to explicitly set this URL in the param when using a pure frontend web. Since we are in a local sample app, `OV.initSession` will finally receive `wss://localhost:8443/` as its _openvidu-server_ URL. `sessionId` is the distinctive portion of the session identifier and allows OpenVidu to differentiate sessions from each other. In this case, this parameter is retrieved from HTML input `<input class="form-control" type="text" id="sessionId" required>`, which may be filled by the user. Finally, `'?secret=MY_SECRET'` string allows us to connect to OpenVidu directly from the browser, without a server side. 

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
	<strong>WARNING</strong>: this is only for demos and developing environments. Do NOT include your secret in production. Check this <a href="/docs/troubleshooting#5-what-are-the-differences-related-to-openvidu-between-an-app-without-a-server-side-and-an-app-with-a-server-side">FAQ</a> to learn more.
</div>
</div>


```javascript
// --- 2) Specify the actions when events take place ---

// On every new Stream received...
session.on('streamCreated', function (event) {

	// Subscribe to the Stream to receive it. HTML video will be appended to element with 'video-container' id
	var subscriber = session.subscribe(event.stream, 'video-container');

	// When the HTML video has been appended to DOM...
	subscriber.on('videoElementCreated', function (event) {

		// Add a new <p> element for the user's nickname just below its video
		appendUserData(event.element, subscriber.stream.connection);
	});
});

// On every Stream destroyed...
session.on('streamDestroyed', function (event) {

	// Delete the HTML element with the user's nickname. HTML videos are automatically removed from DOM
	removeUserData(event.stream.connection);
});
```
Here we subscribe to the events that interest us. In this case, we want to receive all videos published to the video-call, as well as displaying every user's nickname next to its video. To achieve this:

- `streamCreated`: for each new Stream received by OpenVidu, we immediately subscribe to it so we can see its video. A new HTML video element will be appended to element with id 'video-container'. 

- `videoElementCreated`: event triggered by Subscriber object (returned by the previous `Session.subscribe` method). This allows us to add the participant nickname to the new video previously added in `streamCreated` event. Auxiliary method `appendUserData` is responsible for appending a new paragraph element just below the `event.element` video, containing `subscriber.stream.connection.data` field. In this case, this field contains the user's nickName. You can see how to feed this property from the client in the next step.

- `streamDestroyed`: for each Stream that has been destroyed (which means a user has left the video-call), we remove the element with the user's nickname that we added in the previous event with the auxiliary method `removeUserData` (`appendUserData` method created the element with an _id_ containing `event.stream.connection.connectionId` unique value, so we can now identify the right element to be removed). OpenVidu automatically deletes the proper video element by default, so we don't need to do anything else.

> Check [Application specific methods](#application-specific-methods) section to see all the auxiliary methods used in this app

---

#### Finally connect to the session and publish your webcam:

```javascript
// --- 3) Connect to the session ---

	// First param irrelevant if your app has no server-side. Second param will be received by every user
	// in Stream.connection.data property, which will be appended to DOM as the user's nickname
	session.connect(null, '{"clientData": "' + userName + '"}', function (error) {

		// If the connection is successful, initialize a publisher and publish to the session
		if (!error) {

			// --- 4) Get your own camera stream with the desired resolution ---

			var publisher = OV.initPublisher('video-container', {
				audio: true,
				video: true,
				quality: 'MEDIUM'
			});

			// When our HTML video has been added to DOM...
			publisher.on('videoElementCreated', function (event) {
				initMainVideo(event.element, userName);
				appendUserData(event.element, userName);
				event.element['muted']  = true;
			});

			// --- 5) Publish your stream ---

			session.publish(publisher);

		} else {
			console.log('There was an error connecting to the session:', error.code, error.message);
		}
	});
```
	
In `session.connect` method: first param is irrelevant when you don't have a backend (it is the user's token). Remember `videoElementCreated` event, when we added the user's nickname to the HTML? Well, second parameter is the actual value you will receive in `Stream.connection.data` property. So in this case it is a JSON formatted string with a "clientData" tag with "token" value, which is retrieved from HTML input `<input type="text" id="participantId" required>` (filled by the user and also reused for the first `token` param).

In the callback of `Session.connect` method, we check the connection has been succesful (`error` value must be _null_) and right after that we get a `Publisher` object with both audio and video activated and MEDIUM quality. This process will end with the addition of a new HTML video element showing your camera, as a child of element with _id_ 'video-container'. Event `videoElementCreated` will be fired by the Publisher object just after this video is added to DOM, so we can subscribe to it and do whatever we want with it. In this case, we init a big video element with our video and append our nickname to it, by using auxiliary methods `initMainVideo` and `appendUserData`.

Finally we just have to publish `publisher` object through `Session.publish` method, and the rest of users will begin receiving our webcam.

---

#### Leaving the session:

Whenever we want a user to leave the session, we just need to call `session.disconnect` method:

```javascript
function leaveSession() {

	// --- 6) Leave the session by calling 'disconnect' method over the Session object ---

	session.disconnect();

	// Removing all HTML elements with the user's nicknames. 
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

/* APPLICATION SPECIFIC METHODS */
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