# openvidu-js-java
<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-js-java" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

A secure OpenVidu sample app with a Java backend and a SPA frontend. It makes use of _openvidu-java-client_ to connect to OpenVidu Server. With regard to the use of OpenVidu, it is identical to [openvidu-mvc-java](tutorials/openvidu-mvc-java){:target="_blank"}. This tutorial is intended for developers who feel more comfortable with a SPA (Single Page Application) architecture for their frontends.

## Understanding this tutorial

<p align="center">
  <img class="img-responsive" src="https://docs.google.com/uc?id=0B61cQ4sbhmWScllLNlZTLVBTaUU">
</p>

OpenVidu is composed by the modules displayed on the image above.

- **openvidu-browser**: JavaScript library for the browser. It allows you to manage your video-calls straight away from your clients
- **openvidu-java-client**: server SDK for Java. Quick alternative to REST API
- **openvidu-server**: application to control Kurento Media Server
- **Kurento Media Server**: handles low level operations of media flow transmissions

## Running this tutorial

1) Clone the repo:

```bash
git clone https://github.com/OpenVidu/openvidu-tutorials.git
```

2) You will need _maven_ to build the project. You can install it with:

```bash
sudo apt-get install maven
```

3) Run the tutorial:

```bash
cd openvidu-tutorials/openvidu-js-java
mvn package exec:java
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
		<a data-fancybox="gallery" href="img/demos/secure-session-2.png">
			<img class="img-responsive" src="img/demos/secure-session-2.png">
		</a>
	</div>
	<div class="col-md-6">
		<a data-fancybox="gallery" href="img/demos/secure-session-1.png">
			<img class="img-responsive" src="img/demos/secure-session-1.png">
		</a>
	</div>
</div>

## Understanding the code

This is a very basic web application with a pretty simple JS/HTML/CSS frontend and a straightforward Java backend. OpenVidu assumes you can identify your users so you can tell which users can connect to which video-calls, and what role (and therefore what permissions) each one of them will have in the calls. You can do this as you prefer. Here our backend will manage the users and their sessions with the easy-to-use and non-intrusive _HttpSession_ API. In these posts multiple options for user session management in Java are explained, inlcuding the one used in this tutorial: [journaldev.com](http://www.journaldev.com/1907/java-session-management-servlet-httpsession-url-rewriting){:target="_blank"}, [studytonight.com](http://www.studytonight.com/servlet/session-management.php){:target="_blank"}.

  - **Backend**: SpringBoot app with the following classes (`src/main/java` path, `io.openvidu.js.java` package)
    - `App.java` : entrypoint for the app
    - `LoginController.java` : rest controller for handling login and logout operations
    - `SessionController.java` : rest controller for getting OpenVidu tokens. It also stores our active video-calls and the users connected to them<br><br>

  - **Frontend**: Plain JS/HTML/CSS files (`src/main/resources/static`)
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

`LoginController.java` checks the params are correct and if so sets an _HttpSession_ for the newly logged user (adding a "loggedUser" attribute with its username in the HttpSession object):

```java
@RequestMapping(value = "/login", method = RequestMethod.POST)
public ResponseEntity<Object> login(@RequestBody String userPass, HttpSession httpSession) 
	throws ParseException {

	System.out.println("Logging in | {user, pass}=" + userPass);
	// Retrieve params from POST body
	JSONObject userPassJson = (JSONObject) new JSONParser().parse(userPass);
	String user = (String) userPassJson.get("user");
	String pass = (String) userPassJson.get("pass");

	if (login(user, pass)) { // Correct user-pass
		// Validate session and return OK 
		// Value stored in HttpSession allows us to identify the user in future requests
		httpSession.setAttribute("loggedUser", user);
		return new ResponseEntity<>(HttpStatus.OK);
	} else { // Wrong user-pass
		// Invalidate session and return error
		httpSession.invalidate();
		return new ResponseEntity<>("User/Pass incorrect", HttpStatus.UNAUTHORIZED);
	}
}
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

Here is the second time we must call our `httpPostRequest()` method, sending the session we want to connect (`sessionName` parameter) and waiting to get a _token_ as response. The interesting part here is in `SessionController.java` at `/api-sessions/get-token`. First of all there are some important attributes in this class we must mention:

```java
// OpenVidu object as entrypoint of the SDK
private OpenVidu openVidu;

// Collection to pair session names and OpenVidu Session objects
private Map<String, Session> mapSessions = new ConcurrentHashMap<>();
// Collection to pair session names and tokens (the inner Map pairs tokens and role associated)
private Map<String, Map<String, OpenViduRole>> mapSessionNamesTokens = new ConcurrentHashMap<>();

// URL where our OpenVidu server is listening
private String OPENVIDU_URL;
// Secret shared with our OpenVidu server
private String SECRET;
```

Rest controller method begins retrieving the param send by the client, which in this case is the video-call name ("TUTORIAL"), as well as preparing a param we will need a little further on: `tokenOptions`.

```java
@RequestMapping(value = "/get-token", method = RequestMethod.POST)
	public ResponseEntity<JSONObject> getToken(@RequestBody String sessionNameParam,
		HttpSession httpSession) throws ParseException {

	// ... check the user is logged with HttpSession and continue ...

	JSONObject sessionJSON = (JSONObject) new JSONParser().parse(sessionNameParam);

	// The video-call to connect ("TUTORIAL")
	String sessionName = (String) sessionJSON.get("sessionName");
	
	// Role associated to this user
	OpenViduRole role = LoginController.users.get(httpSession.getAttribute("loggedUser")).role;
	
	// Optional data to be passed to other users when this user connects to the video-call
	// In this case, a JSON with the value we stored in the HttpSession object on login
	String serverData = "{\"serverData\": \"" + httpSession.getAttribute("loggedUser") + "\"}";

	// Build tokenOptions object with the serverData and the role
	TokenOptions tokenOptions = new TokenOptions.Builder().data(serverData).role(role).build();

	JSONObject responseJson = new JSONObject();
```

Just after that we check if the session "TUTORIAL" already exists

```java
if (this.mapSessions.get(sessionName) != null) { ...
```

In this case it doesn't because 'publisher1' is the first user connecting to it. So we directly create a new session:

```java
// New session
System.out.println("New session " + sessionName);
try {

	// Create a new OpenVidu Session
	Session session = this.openVidu.createSession();
	// Generate a new token with the recently created tokenOptions
	String token = session.generateToken(tokenOptions);

	// Store the session and the token in our collections
	this.mapSessions.put(sessionName, session);
	this.mapSessionNamesTokens.put(sessionName, new ConcurrentHashMap<>());
	this.mapSessionNamesTokens.get(sessionName).put(token, role);

	// Prepare the response with the token
	responseJson.put(0, token);

	// Return the response to the client
	return new ResponseEntity<>(responseJson, HttpStatus.OK);
	
} catch (Exception e) {
	// If error generate an error message and return it to client
	return getErrorResponse(e);
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

The process would be exactly the same as before until `SessionController.java` executes `getToken()` method. Now session 'TUTORIAL' already exists, so now we do enter the _if_ branch that we ignored in the previous step:

```java
if (this.mapSessions.get(sessionName) != null) {
	// Session already exists
	System.out.println("Existing session " + sessionName);
	try {

		// Generate a new token with the recently created tokenOptions
		String token = this.mapSessions.get(sessionName).generateToken(tokenOptions);

		// Update our collection storing the new token
		this.mapSessionNamesTokens.get(sessionName).put(token, role);

		// Prepare the response with the token
		responseJson.put(0, token);

		// Return the response to the client
		return new ResponseEntity<>(responseJson, HttpStatus.OK);
	} catch (OpenViduJavaClientException e1) {
		// If internal error generate an error message and return it to client
		return getErrorResponse(e1);
	} catch (OpenViduHttpException e2) {
		if (404 == e2.getStatus()) {
			// Invalid sessionId (user left unexpectedly). Session object is not valid
			// anymore. Clean collections and continue as new session
			this.mapSessions.remove(sessionName);
			this.mapSessionNamesTokens.remove(sessionName);
		}
	}
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

And in `SessionController.java` we update the collections:

```java
@RequestMapping(value = "/remove-user", method = RequestMethod.POST)
public ResponseEntity<JSONObject> removeUser(@RequestBody String sessionNameToken,
	HttpSession httpSession) throws Exception {

	// ... check the user is logged with HttpSession and continue ...

	// Retrieve the params from BODY
	JSONObject sessionNameTokenJSON = (JSONObject) new JSONParser().parse(sessionNameToken);
	String sessionName = (String) sessionNameTokenJSON.get("sessionName");
	String token = (String) sessionNameTokenJSON.get("token");

	// If the session exists ("TUTORIAL" in this case)
	if (this.mapSessions.get(sessionName) != null && this.mapSessionNamesTokens.get(sessionName) != null) {
		
		// If the token exists and is succesfully removed
		if (this.mapSessionNamesTokens.get(sessionName).remove(token) != null) {
			// User left the session
			if (this.mapSessionNamesTokens.get(sessionName).isEmpty()) {
				// Last user left: session must be removed
				this.mapSessions.remove(sessionName);
			}
			return new ResponseEntity<>(HttpStatus.OK);
		} else {
			// The TOKEN wasn't valid
			System.out.println("Problems in the app server: the TOKEN wasn't valid");
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	} else {
		// The SESSION does not exist
		System.out.println("Problems in the app server: the SESSION does not exist");
		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
```

When the last user leaves the session `this.mapSessions.remove(sessionName);` will be executed: this means the session is empty and that it has been closed in OpenVidu Server. All our Session objects and tokens associated to them will be invalidated.

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