# openvidu-js-node
<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-js-node" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

A secure OpenVidu sample app with a Node backend and a SPA frontend. It makes use of _openvidu-node-client_ to connect to OpenVidu Server. With regard to the use of OpenVidu, it is identical to [openvidu-mvc-node](tutorials/openvidu-mvc-node){:target="_blank"}. This tutorial is intended for developers who feel more comfortable with a SPA (Single Page Application) architecture for their frontends.

## Understanding this tutorial

<p align="center">
  <img class="img-responsive" src="https://docs.google.com/uc?id=0B61cQ4sbhmWSVkNVZ2s3cmk2aHM">
</p>

OpenVidu is composed by the modules displayed on the image above.

- **openvidu-browser**: JavaScript library for the browser. It allows you to manage your video-calls straight away from your clients
- **openvidu-node-client**: server SDK for Node. Quick alternative to REST API
- **openvidu-server**: application to control Kurento Media Server
- **Kurento Media Server**: handles low level operations of media flow transmissions

## Running this tutorial

1) Clone the repo:

```bash
git clone https://github.com/OpenVidu/openvidu-tutorials.git
```

2) You will need _node_ to execute the app. You can install them with:

```bash
sudo curl -sL https://deb.nodesource.com/setup_12.x | sudo bash -
sudo apt-get install -y nodejs
```

3) Run the tutorial with the following commands. They will install the NPM dependencies and will execute `server.js` server passing two arguments: "localhost:4443" as the URL where _openvidu-server_ will be listening and "MY_SECRET" as the secret share with it:

```bash
cd openvidu-tutorials/openvidu-js-node
npm install
node server.js https://localhost:4443 MY_SECRET
```

4) _openvidu-server_ and _Kurento Media Server_ must be up and running in your development machine. The easiest way is running this Docker container which wraps both of them (you will need [Docker CE](https://store.docker.com/search?type=edition&offering=community){:target="_blank"}):

```bash
docker run -p 4443:4443 --rm -e openvidu.secret=MY_SECRET openvidu/openvidu-server-kms:2.12.0
```

5) Go to _[`https://localhost:5000`](https://localhost:5000){:target="_blank"}_ to test the app once the server is running. The first time you use the docker container, an alert message will suggest you accept the self-signed certificate of _openvidu-server_ when you first try to join a video-call. To test two users in the same computer, use a standard window and an incognito window.

> If you are using **Windows**, read this **[FAQ](troubleshooting/#3-i-am-using-windows-to-run-the-tutorials-develop-my-app-anything-i-should-know){:target="_blank"}** to properly run the tutorial

> To learn **some tips** to develop with OpenVidu, check this **[FAQ](troubleshooting/#2-any-tips-to-make-easier-the-development-of-my-app-with-openvidu){:target="_blank"}**

<div class="row no-margin row-gallery">
	<div class="col-md-6">
		<a data-fancybox="gallery" href="img/demos/secure-login.png">
			<img class="img-responsive" src="img/demos/secure-login.png">
		</a>
	</div>
	<div class="col-md-6">
		<a data-fancybox="gallery" href="img/demos/secure-join.png">
			<img class="img-responsive" src="img/demos/secure-join.png">
		</a>
	</div>
</div>
<div class="row no-margin row-gallery">
	<div class="col-md-6">
		<a data-fancybox="gallery" href="img/demos/secure-session-1.png">
			<img class="img-responsive" src="img/demos/secure-session-1.png">
		</a>
	</div>
	<div class="col-md-6">
		<a data-fancybox="gallery" href="img/demos/secure-session-2.png">
			<img class="img-responsive" src="img/demos/secure-session-2.png">
		</a>
	</div>
</div>

## Understanding the code

This is a very basic web application with a pretty simple JS/HTML/CSS frontend and a straightforward Node backend built with [_express_](http://expressjs.com){:target="_blank"}. OpenVidu assumes you can identify your users so you can tell which users can connect to which video-calls, and what role (and therefore what permissions) each one of them will have in the calls. You can do this as you prefer. Here our backend will manage the users and their sessions with the easy-to-use and non-intrusive [_express-session_](https://github.com/expressjs/session){:target="_blank"} API.

  - **Backend**: node server
    - `server.js` : single file which handles all operations of server<br><br>

  - **Frontend**: Plain JS/HTML/CSS files (`/public` folder)
    - `openvidu-browser-VERSION.js` : openvidu-browser library. You don't have to manipulate this file.
    - `app.js` : sample application main JavaScript file, which makes use of _openvidu-browser-VERSION.js_.
    - `index.html` : HTML code for the form to login, the form to connect to a video-call and for the video-call itself. It has two links to both JavaScript files:

	        <script src="openvidu-browser-VERSION.js"></script>
	        <script src="app.js"></script>

    - `style.css`: some CSS classes to style _index.html_.

Let's describe the code following this scenario: a user logs into the app and connects to the video-call "TUTORIAL", where he publishes his webcam. A second user will connect to the same video-call just after that and publish its own webcam. Both of them will leave the call after a while.

---

### 1) User logs in

We have implemented a method for making HTTP POST requests to the backend, as we will need to make at least three of them: one for logging in, one for getting a token from openvidu-server and one for letting know our backend when any user leaves the video-call. The header of the method looks like this:

```javascript
function httpPostRequest(url, body, errorMsg, callback)
```

Where `url` is the path of the POST operation, `body` the object to send as data, `errorMsg` the output error message if something goes wrong and `callback` the function to execute in case of success. As mentioned above, we need to call this method three times for each user that LOGS IN 🡒 CONNECTS TO A VIDEO-CALL 🡒 LEAVES THE VIDEO-CALL.

`index.html` will first show a form to log in:

<p align="center">
  <img class="img-responsive login-form-img" style="padding: 25px 0;" src="img/docs/tutorials/login-form.png">
</p>

`app.js` sends a POST request to "/api-login/login" passing the username and the password retrieved from the HTML form whenever "Log in" button is clicked:

```javascript
function logIn() {
	var user = $("#user").val(); // Username
	var pass = $("#pass").val(); // Password

	httpPostRequest(
		'api-login/login',
		{user: user, pass: pass},
		'Login WRONG',
		(response) => {
			// HTML shows logged-in page ...
		}
	);
}
```

`server.js` at `/api-login/login` checks the params are correct and if so sets an active session for the newly logged user (adding a _loggedUser_ property with its username in the _req.session_ object):

```javascript
app.post('/api-login/login', function (req, res) {

    // Retrieve params from POST body
    var user = req.body.user;
    var pass = req.body.pass;

    if (login(user, pass)) { // Correct user-pass
        // Validate session and return OK
        // Value stored in req.session allows us to identify the user in future requests
        req.session.loggedUser = user;
        res.status(200).send();
    } else { // Wrong user-pass
        // Invalidate session and return error
        req.session.destroy();
        res.status(401).send('User/Pass incorrect');
    }
});
```

---

### 2) User connects to "TUTORIAL" video-call

HTML will display now the user has logged a different form, asking for the video-call to connect and the nickname the user wants to have in it. So our 'publisher1' user would write TUTORIAL in "Session" field and press "Join!" button:

<p align="center">
  <img class="img-responsive join-form-img" style="padding: 25px 0;" src="img/docs/tutorials/join-form.png">
</p>

`app.js` will execute `joinSession()` method, which starts like this:

```javascript
function joinSession() {
	getToken((token) => { ...
```

So the first thing to do here is to retrieve an OpenVidu _token_ from our backend. Only when we have it available in the browser we will continue with the _join_ operation. Let's see what `getToken()` looks like:

```javascript
function getToken(callback) {
	sessionName = $("#sessionName").val(); // Video-call chosen by the user

	httpPostRequest(
		'api-sessions/get-token',
		{sessionName: sessionName},
		'Request of TOKEN gone WRONG:',
		(response) => {
			token = response[0]; // Get token from response
			console.warn('Request of TOKEN gone WELL (TOKEN:' + token + ')');
			callback(token); // Continue the join operation
		}
	);
}
```

Here is the second time we must call our `httpPostRequest()` method, sending the session we want to connect (`sessionName` parameter) and waiting to get a _token_ as response. The interesting part here is in `server.js` controller at `/api-sessions/get-token`. First of all there are some important attributes in this class we must mention:

```javascript
// Environment variable: URL where our OpenVidu server is listening
var OPENVIDU_URL = process.argv[2];
// Environment variable: secret shared with our OpenVidu server
var OPENVIDU_SECRET = process.argv[3];

// Entrypoint to OpenVidu Node Client SDK
var OV = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);

// Collection to pair session names with OpenVidu Session objects
var mapSessions = {};
// Collection to pair session names with tokens
var mapSessionNamesTokens = {};
```

Rest controller method begins retrieving the param send by the client, which in this case is the video-call name ("TUTORIAL"), as well as preparing a param we will need a little further on: `tokenOptions`.

```javascript
app.post('/api-sessions/get-token', function (req, res) {

   // ... check the user is logged with req.session and continue ...

	// The video-call to connect ("TUTORIAL")
	var sessionName = req.body.sessionName;

	// Role associated to this user
	var role = users.find(u => (u.user === req.session.loggedUser)).role;

	// Optional data to be passed to other users when this user connects to the video-call
	// In this case, a JSON with the value we stored in the req.session object on login
	var serverData = JSON.stringify({serverData: req.session.loggedUser});

	// Build tokenOptions object with the serverData and the role
	var tokenOptions = {
		data: serverData,
		role: role
	};
```

Just after that an _if-else_ statement comes into play: does the session "TUTORIAL" already exist?

```javascript
if (mapSessions[sessionName]) { ...
```

In this case it doesn't because 'publisher1' is the first user connecting to it. So we focus on the _else_ branch:

```javascript
else {
	// New session
	console.log('New session ' + sessionName);

	// Create a new OpenVidu Session asynchronously
	OV.createSession()
		.then(session => {
			// Store the new Session in the collection of Sessions
			mapSessions[sessionName] = session;
			// Store a new empty array in the collection of tokens
			mapSessionNamesTokens[sessionName] = [];

			// Generate a new token asynchronously with the recently created tokenOptions
			session.generateToken(tokenOptions)
				.then(token => {

					// Store the new token in the collection of tokens
					mapSessionNamesTokens[sessionName].push(token);

					// Return the Token to the client
					res.status(200).send({
						0: token
					});
				})
				.catch(error => {
					console.error(error);
				});
		})
		.catch(error => {
			console.error(error);
		});
}
```

We are almost there! Now in `app.js` we can init a new Session and connect to it with _token_:

```javascript
// --- 1) Get an OpenVidu object ---

OV = new OpenVidu();

// --- 2) Init a session ---

session = OV.initSession();

// --- 3) Specify the actions when events take place in the session ---

// On every new Stream received...
session.on('streamCreated', (event) => {

	// Subscribe to the Stream to receive it
	// HTML video will be appended to element with 'video-container' id
	var subscriber = session.subscribe(event.stream, 'video-container');

	// When the HTML video has been appended to DOM...
	subscriber.on('videoElementCreated', (event) => {

		// Add a new HTML element for the user's name and nickname over its video
		appendUserData(event.element, subscriber.stream.connection);
	});
});

// On every Stream destroyed...
session.on('streamDestroyed', (event) => {
	// Delete the HTML element with the user's name and nickname
	removeUserData(event.stream.connection);
});

// --- 4) Connect to the session passing the retrieved token and some more data from
//        the client (in this case a JSON with the nickname chosen by the user) ---

var nickName = $("#nickName").val();
session.connect(token, { clientData: nickName })
	.then(() => {

		// --- 5) Set page layout for active call ---

		var userName = $("#user").val();
		$('#session-title').text(sessionName);
		$('#join').hide();
		$('#session').show();


		// Here we check somehow if the user has 'PUBLISHER' role before
		// trying to publish its stream. Even if someone modified the client's code and
		// published the stream, it wouldn't work if the token sent in Session.connect
		// method is not recognized as 'PUBLIHSER' role by OpenVidu Server
		if (isPublisher(userName)) {

			// --- 6) Get your own camera stream ---

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
			publisher.on('videoElementCreated', (event) => {
				// Init the main video with ours and append our data
				var userData = {
					nickName: nickName,
					userName: userName
				};
				initMainVideo(event.element, userData);
				appendUserData(event.element, userData);
				$(event.element).prop('muted', true); // Mute local video
			});


			// --- 8) Publish your stream ---

			session.publish(publisher);

		} else {
			console.warn('You don\'t have permissions to publish');
			initMainVideoThumbnail(); // Show SUBSCRIBER message in main video
		}
	})
	.catch(error => {
		console.warn('There was an error connecting to the session:', error.code, error.message);
	});
```

The user will now see its own video on the page. The connection to the session has completed!

---

### 3) Another user connects to the video-call

The process would be exactly the same as before until `server.js` executes controller at `/api-sessions/get-token`. Now session 'TUTORIAL' already exists, so in the _if-else_ statement the _if_ branch would be the one executed:

```javascript
if (mapSessions[sessionName]) {
	// Session already exists
	console.log('Existing session ' + sessionName);

	// Get the existing Session from the collection
	var mySession = mapSessions[sessionName];

	// Generate a new token asynchronously with the recently created tokenOptions
	mySession.generateToken(tokenOptions)
		.then(token => {

			// Store the new token in the collection of tokens
			mapSessionNamesTokens[sessionName].push(token);

			// Return the token to the client
			res.status(200).send({
				0: token
			});
		})
		.catch(error => {
			console.error(error);
		});
}
```

The code executed in `app.js` would also be the same. After the `Session.publish()` method has been successful, both users will be seeing each other's video, as well as the username and nickname uppon it.

---

### 4) Users leave the video-call

After a while both users decide to leave the session. Apart from calling `leaveSession()` (and therefore `session.disconnect()`) to destroy the connection on OpenVidu Server, we need to run the last POST operation: we must let the backend know that certain user has left the session so it can update the collections with the active sessions and tokens. To sum up, `session.disconnect()` updates our OpenVidu Server and the POST operation updates our application's backend.
For the POST operation, in `app.js` we run:

```javascript
function removeUser() {
	httpPostRequest(
		'api-sessions/remove-user',
		{sessionName: sessionName, token: token},
		'User couldn\'t be removed from session', 
		(response) => {
			console.warn("You have been removed from session " + sessionName);
		}
	);
}
``` 

And in `server.js` we update the collections in `/api-sessions/remove-user`:

```javascript

app.post('/api-sessions/remove-user', function (req, res) {

    // ... check the user is logged with req.session and continue ...

	// Retrieve params from POST body
	var sessionName = req.body.sessionName;
	var token = req.body.token;

	// If the session exists
	if (mapSessions[sessionName] && mapSessionNamesTokens[sessionName]) {
		var tokens = mapSessionNamesTokens[sessionName];
		var index = tokens.indexOf(token);

		// If the token exists
		if (index !== -1) {
			// Token removed
			tokens.splice(index, 1);
		} else {
			res.status(500).send('Problems in the app server: the TOKEN wasn\'t valid');
		}
		if (tokens.length == 0) {
			// Last user left: session must be removed
			delete mapSessions[sessionName];
		}
		res.status(200).send();
	} else {
		res.status(500).send('Problems in the app server: the SESSION does not exist');
	}
});
```

When the last user leaves the session `delete mapSessions[sessionName]` will be executed: this means the session is empty and that it has been closed in OpenVidu Server. All our Session objects and tokens associated to them will be invalidated.

---

> At this point we have covered all the important code from the tutorial. With this scenario we have seen the most common use-case, but you can modify whatever you want to suit your needs. And remember that this is just one of the many possible approaches: **you can implement your frontend and your backend as you want**.
>
> The only actual requirements are getting a valid ***token*** from  ***openvidu-server*** (by using [openvidu-java-client](reference-docs/openvidu-java-client/){:target="_blank"}, [openvidu-node-client](reference-docs/openvidu-node-client/){:target="_blank"} or the [REST API](reference-docs/REST-API/){:target="_blank"}) and use it in ***openvidu-browser*** to connect your clients to the sessions with `Session.connect(token)`


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