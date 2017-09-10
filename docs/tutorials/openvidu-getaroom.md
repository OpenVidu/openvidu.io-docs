# openvidu-getaroom

This demo allows users to connect to a room and share the link with others, so they can connect to it straight away just by visiting that link. It is a pure frontend application and it makes use of OpenVidu the same way [openvidu-insecure-js](/tutorials/openvidu-insecure-js/) does.

<p align="center">
  <img src="/img/tutorials/openvidu-getaroom.png">
</p>

OpenVidu is composed by the three modules displayed on the image above in its insecure version.

- **openvidu-browser**: JavaScript library for the browser. It allows you to manage your video-calls straight away from your clients
- **openvidu-server**: Java application that controls Kurento Media Server
- **Kurento Media Server**: server that handles low level operations of media flows transmission

> You will only have to make use of **openvidu-browser** to get this sample app working.

## Executing this example

#### Docker

```bash
docker run -p 8443:8443 -p 4040:4040 -e KMS_STUN_IP=stun.l.google.com -e KMS_STUN_PORT=19302 openvidu/getaroom-demo
```
> This container will give you a public IP thanks to _ngrok_ so you can test the app over the Internet

#### From the repo

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
http-server openvidu-getaroom/web
```

4) _openvidu-server_ and _Kurento Media Server_ must be up and running in your development machine. The easiest way is running this Docker container which wraps both of them (you will need [Docker CE](https://store.docker.com/search?type=edition&offering=community)):

```bash
docker run -p 8443:8443 --rm -e KMS_STUN_IP=stun.l.google.com -e KMS_STUN_PORT=19302 openvidu/openvidu-server-kms
```

5) Go to [`localhost:8080`](http://localhost:8080) to test the app once the server is running. The first time you use the docker container, an alert message will suggest you accept the self-signed certificate of _openvidu-server_ when you first try to join a video-call.


<div class="row no-margin row-gallery">
	<div class="col-md-6">
		<a data-fancybox="gallery2" href="/img/demos/getaroom-index.png">
			<img class="img-responsive" src="/img/demos/getaroom-index.png">
		</a>
	</div>
	<div class="col-md-6">
		<a data-fancybox="gallery2" href="/img/demos/getaroom-session-1.png">
			<img class="img-responsive" src="/img/demos/getaroom-session-1.png">
		</a>
	</div>
</div>
<div class="row no-margin row-gallery">
	<div class="col-md-6">
		<a data-fancybox="gallery2" href="/img/demos/getaroom-session-6.png">
			<img class="img-responsive" src="/img/demos/getaroom-session-6.png">
		</a>
	</div>
	<div class="col-md-6">
		<a data-fancybox="gallery2" href="/img/demos/getaroom-session-6-mob.png">
			<img id="img-mob" class="img-responsive" src="/img/demos/getaroom-session-6-mob.png">
		</a>
	</div>
</div>


## Understanding the code

This application is very simple. It has only 4 files:

  - `openvidu-browser-VERSION.js`: openvidu-browser library. You don't have to manipulate this file. 
  - `app.js`: sample application main JavaScritp file, which makes use of _openvidu-browser-VERSION.js_. You can manipulate this file to suit your needs.
  - `index.html`: HTML code for the welcome page to join a new room and for the room itself. You can manipulate this file to suit your needs. It has two links to both JavaScript files: 

        <script src="openvidu-browser-VERSION.js.js"></script>
        <script src="app.js"></script>

  - `style.css`: some CSS classes to style _index.html_. You can manipulate this file to suit your needs. _index.html_ uses also Bootstrap as its main style framework.

Down below we will describe the most important code snippets in `app.js`:

---


#### Declaration of variables
We will need some variables accesible from differents methods

```javascript
var OV;						// OpenVidu object to initialize a session
var session;				// Session object where the user will connect
var publisher;				// Publisher object which the user will publish
var sessionId;				// Unique identifier of the session
var audioEnabled = true;	// True if the audio track of publisher is active
var videoEnabled = true;	// True if the video track of publisher is active
var numOfVideos = 0;		// Keeps track of the number of videos that are being shown
```

---

#### Window callbacks
On _load_ we will check if the user is connecting to an existing room or to a new one depending on the browser's location, on _beforeunload_ we will disconnect the user from the room

```javascript
// Check if the URL already has a room
window.addEventListener('load', function () {
	sessionId = window.location.hash; // For 'https://myurl/#roomId', sessionId would be '#roomId'
	if (sessionId) {
		// The URL has a session id. Join the room right away
		showSessionHideJoin();
		joinRoom(sessionId);
	} else {
		// The URL has not a session id. Show welcome page
		showJoinHideSession();
	}
});

// Disconnect participant on browser's window closed
window.addEventListener('beforeunload', function () {
	session.disconnect();
});
```

---

#### _joinRoom_ method
Here we initialize our session and set the events we need for the desired behaviuor. Then we connect to it and finally publish our own webcam to the session.

```javascript
function joinRoom(sessionId) {

	if (!sessionId) {
		// If the user is joining to a new room
		sessionId = '#' + randomString();
	}

	// As insecure OpenVidu, the user's token can be a random string
	var userId = randomString();

	// --- 1) Get an OpenVidu object and init a session with a sessionId ---

	OV = new OpenVidu();

	// We will join the video-call "sessionId". As there's no server, this parameter must start with the URL of 
	// OpenVidu Server (with secure websocket protocol: "wss://") and must include the OpenVidu secret at the end
	session = OV.initSession("wss://" + location.hostname + ":8443/" + sessionId + "?secret=MY_SECRET");


	// --- 2) Specify the actions when events take place ---

	// On every new Stream received...
	session.on('streamCreated', function (event) {
		// Subscribe to the Stream to receive it. HTML video will be appended to element with 'subscriber' id
		var subscriber = session.subscribe(event.stream, 'videos');
		// When the new video is added to DOM, update the page layout to fit one more participant
		subscriber.on('videoElementCreated', function (event) {
			numOfVideos++;
			updateLayout();
		});
	});

	// On every new Stream destroyed...
	session.on('streamDestroyed', function (event) {
		// Update the page layout
		numOfVideos--;
		updateLayout();
	});


	// --- 3) Connect to the session ---

	// Remember 'userId' param (usually called 'token') is irrelevant when using the insecure version of OpenVidu
	session.connect(userId, function (error) {

		// If the connection is successful, initialize a publisher and publish to the session
		if (!error) {

			// --- 4) Get your own camera stream with the desired resolution ---

			publisher = OV.initPublisher('publisher', {
				audio: true,
				video: true,
				quality: 'MEDIUM'
			});

			publisher.on('videoElementCreated', function (event) {
				// When your own video is added to DOM, update the page layout to fit it
				numOfVideos++;
				updateLayout();
				$(event.element).prop('muted', true); // Mute local video
			});

			// --- 5) Publish your stream ---

			session.publish(publisher);

		} else {
			console.log('There was an error connecting to the session:', error.code, error.message);
		}
	});

	// Update the URL shown in the browser's navigation bar to show the session id
	var pathname = (location.pathname.slice(-1) === "/" ? location.pathname : location.pathname+"/");
	window.history.pushState("", "", pathname + sessionId);

	// Auxiliary methods to show the session's view
	showSessionHideJoin();
	initializeSessionView();

	return false;
}
```
---

#### _leaveRoom_ method

```javascript
function leaveRoom() {

	// --- 6) Leave the session by calling 'disconnect' method over the Session object ---
	session.disconnect();
	
	// Back to welcome page
	window.location.href = window.location.origin + window.location.pathname;
}
```