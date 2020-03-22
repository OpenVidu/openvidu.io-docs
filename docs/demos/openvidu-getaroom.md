# openvidu-getaroom
<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-getaroom" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

OpenVidu-Getaroom demo, <strong>built with Vanilla JS, </strong> allows users to connect to a room and share the link with others, so they can connect to it straight away just by visiting that link. It is a frontend-only application and it makes use of OpenVidu the same way [openvidu-insecure-js](tutorials/openvidu-insecure-js/){:target="_blank"} does.

<p align="center">
  <img  class="img-responsive" src="img/tutorials/openvidu-getaroom.png">
</p>

OpenVidu is composed by the three modules displayed on the image above in its insecure version.

- **openvidu-browser**: JavaScript library for the browser. It allows you to manage your video-calls straight away from your clients
- **openvidu-server**: Java application that controls Kurento Media Server
- **Kurento Media Server**: server that handles low level operations of media flows transmission

## Running this demo

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
http-server openvidu-tutorials/openvidu-getaroom/web
```

4) _openvidu-server_ and _Kurento Media Server_ must be up and running in your development machine. The easiest way is running this Docker container which wraps both of them (you will need [Docker CE](https://store.docker.com/search?type=edition&offering=community){:target="_blank"}):

```bash
docker run -p 4443:4443 --rm -e openvidu.secret=MY_SECRET openvidu/openvidu-server-kms:2.12.0
```

5) Go to [`localhost:8080`](http://localhost:8080){:target="_blank"} to test the app once the server is running. The first time you use the docker container, an alert message will suggest you accept the self-signed certificate of _openvidu-server_ when you first try to join a video-call.

> If you are using **Windows**, read this **[FAQ](troubleshooting/#3-i-am-using-windows-to-run-the-tutorials-develop-my-app-anything-i-should-know){:target="_blank"}** to properly run the tutorial

> To learn **some tips** to develop with OpenVidu, check this **[FAQ](troubleshooting/#2-any-tips-to-make-easier-the-development-of-my-app-with-openvidu){:target="_blank"}**

<div class="row no-margin row-gallery">
	<div class="col-md-6">
		<a data-fancybox="gallery" href="img/demos/getaroom-index.png">
			<img class="img-responsive" src="img/demos/getaroom-index.png">
		</a>
	</div>
	<div class="col-md-6">
		<a data-fancybox="gallery" href="img/demos/getaroom-session-1.png">
			<img class="img-responsive" src="img/demos/getaroom-session-1.png">
		</a>
	</div>
</div>
<div class="row no-margin row-gallery">
	<div class="col-md-6">
		<a data-fancybox="gallery" href="img/demos/getaroom-session-6.png">
			<img class="img-responsive" src="img/demos/getaroom-session-6.png">
		</a>
	</div>
	<div class="col-md-6">
		<a data-fancybox="gallery" href="img/demos/getaroom-session-6-mob.png">
			<img id="img-mob" class="img-responsive" src="img/demos/getaroom-session-6-mob.png">
		</a>
	</div>
</div>


## Understanding the code

This application is very simple. It has only 4 files:

  - `openvidu-browser-VERSION.js`: openvidu-browser library. You don't have to manipulate this file. 
  - `app.js`: sample application main JavaScript file, which makes use of _openvidu-browser-VERSION.js_. You can manipulate this file to suit your needs.
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
	sessionId = window.location.hash.slice(1); // For 'https://myurl/#roomId', sessionId would be 'roomId'
	if (sessionId) {
		// The URL has a session id. Join the room right away
		console.log("Joining to room " + sessionId);
		showSessionHideJoin();
		joinRoom();
	} else {
		// The URL has not a session id. Show welcome page
		showJoinHideSession();
	}
});

// Disconnect participant on browser's window closed
window.addEventListener('beforeunload', function () {
	if (session) session.disconnect();
});
```

---

#### _joinRoom_ method
Here we initialize our session and set the events we need for the desired behaviuor. Then we connect to it and finally publish our own webcam to the session.

```javascript
function joinRoom() {

	if (!sessionId) {
		// If the user is joining to a new room
		sessionId = randomString();
	}

	// --- 1) Get an OpenVidu object ---

	OV = new OpenVidu();

	// --- 2) Init a session ---

	session = OV.initSession();


	// --- 3) Specify the actions when events take place in the session ---

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


	// --- 4) Connect to the session with a valid user token ---

	// 'getToken' method is simulating what your server-side should do.
	// 'token' parameter should be retrieved and returned by your own backend
	getToken(sessionId).then(token => {

		// Connect with the token
		session.connect(token)
			.then(() => {

				// --- 5) Set page layout for active call ---

				// Update the URL shown in the browser's navigation bar to show the session id
				var path = (location.pathname.slice(-1) == "/" ? location.pathname : location.pathname + "/");
				window.history.pushState("", "", path + '#' + sessionId);

				// Auxiliary methods to show the session's view
				showSessionHideJoin();
				initializeSessionView();

				// --- 6) Get your own camera stream with the desired properties ---

				publisher = OV.initPublisher('publisher', {
					audioSource: undefined, // The source of audio. If undefined default audio input
					videoSource: undefined, // The source of video. If undefined default video input
					publishAudio: true,  	// Whether to start publishing with your audio unmuted or not
					publishVideo: true,  	// Whether to start publishing with your video enabled or not
					resolution: '640x480',  // The resolution of your video
					frameRate: 30,			// The frame rate of your video
					insertMode: 'APPEND',	// How the video is inserted in target element 'video-container'
					mirror: true       		// Whether to mirror your local video or not
				});

				// --- 7) Specify the actions when events take place in our publisher ---

				// When our HTML video has been added to DOM...
				publisher.on('videoElementCreated', function (event) {
					// When your own video is added to DOM, update the page layout to fit it
					numOfVideos++;
					updateLayout();
					$(event.element).prop('muted', true); // Mute local video to avoid feedback
				});

				// --- 8) Publish your stream ---

				session.publish(publisher);
			})
			.catch(error => {
				console.log('There was an error connecting to the session:', error.code, error.message);
			});
	});
}
```

---

#### _leaveRoom_ method

```javascript
function leaveRoom() {

	// --- 9) Leave the session by calling 'disconnect' method over the Session object ---
	
	session.disconnect();

	// Back to welcome page
	window.location.href = window.location.origin + window.location.pathname;
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