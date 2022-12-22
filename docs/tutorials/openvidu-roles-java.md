# openvidu-roles-java
<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-roles-java" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

An OpenVidu application with a Java backend and a SPA frontend built with plain JS, HTML and CSS. It makes use of [openvidu-java-client SDK](reference-docs/openvidu-java-client/) to communicate with the OpenVidu deployment. It grants different permissions to different users depending on their role.

<div class="row">
    <div class="pro-gallery" style="margin: 20px 0 15px 0">
        <a data-fancybox="gallery-pro1" data-type="image" class="fancybox-img" href="img/tutorials/openvidu-roles-java.png">
          <img class="img-responsive" style="margin: auto; max-height: 500px" src="img/tutorials/openvidu-roles-java.png"/>
        </a>
    </div>
</div>

## Running this tutorial

To run the tutorial you need the three components stated in [OpenVidu application architecture](developing-your-video-app/#openvidu-application-architecture): an OpenVidu deployment, your server application and your client application. In this order:

#### 1. Run OpenVidu deployment

Using [Docker Engine](https://docs.docker.com/engine/){:target="_blank"}:

```bash
# WARNING: this container is not suitable for production deployments of OpenVidu
# Visit https://docs.openvidu.io/en/stable/deployment

docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-dev:2.25.0
```

#### 2. Run the server application and the client application

You need [Java](https://www.java.com/en/download/){:target="_blank"} and [Maven](https://maven.apache.org/install.html){:target="_blank"}. Check them with:

```
java --version
mvn --version
```

Clone the repo:

```bash
git clone https://github.com/OpenVidu/openvidu-tutorials.git -b v2.25.0
```

Run the application:

```bash
cd openvidu-tutorials/openvidu-roles-java
mvn package exec:java
```

Go to [`https://localhost:5000`](https://localhost:5000){:target="_blank"} to test the app once the server is running. To test two different users in the same computer, use a standard window and an incognito window.

> To test the application with other devices in your network, visit this **[FAQ](troubleshooting/#3-test-applications-in-my-network-with-multiple-devices)**. Ignore [step 2](troubleshooting/#2-run-your-preferred-server-application-sample) and [step 3](#3-run-the-client-application-tutorial-changing-the-application_server_url), as the application already includes a backend and the frontend doesn't need to communicate with a different application server.

<div class="row no-margin row-gallery">
	<div class="col-md-6">
		<a data-fancybox="gallery" data-type="image" class="fancybox-img" href="img/demos/secure-login.png">
			<img class="img-responsive" src="img/demos/secure-login.png">
		</a>
	</div>
	<div class="col-md-6">
		<a data-fancybox="gallery" data-type="image" class="fancybox-img" href="img/demos/secure-join.png">
			<img class="img-responsive" src="img/demos/secure-join.png">
		</a>
	</div>
</div>
<div class="row no-margin row-gallery">
	<div class="col-md-6">
		<a data-fancybox="gallery" data-type="image" class="fancybox-img" href="img/demos/secure-session-2.png">
			<img class="img-responsive" src="img/demos/secure-session-2.png">
		</a>
	</div>
	<div class="col-md-6">
		<a data-fancybox="gallery" data-type="image" class="fancybox-img" href="img/demos/secure-session-1.png">
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

We have implemented a method for making HTTP POST requests to the backend, as we will need to make at least three of them: one for logging in, one for getting a token from openvidu-server, and one for letting our backend know when any user leaves the video-call. The header of the method looks like this:

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

Now the user has logged in, the HTML will display a different form, asking for the video-call to connect and the nickname the user wants to have in it. So our 'publisher1' user would write TUTORIAL in "Session" field and press "Join!" button:

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

Rest controller method begins retrieving the param send by the client, which in this case is the video-call name ("TUTORIAL"), as well as preparing a param we will need a little further on: `connectionProperties`.

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

	// Build connectionProperties object with the serverData and the role
	ConnectionProperties connectionProperties = new ConnectionProperties.Builder().type(ConnectionType.WEBRTC).data(serverData).role(role).build();

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
	// Generate a new Connection with the recently created connectionProperties
	String token = this.mapSessions.get(sessionName).createConnection(connectionProperties).getToken();

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

// On every asynchronous exception...
session.on('exception', (exception) => {
	console.warn(exception);
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

		// Generate a new Connection with the recently created connectionProperties
		String token = this.mapSessions.get(sessionName).createConnection(connectionProperties).getToken();

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

> At this point we have covered all the important code from the tutorial. With this scenario we have seen the most common use-case, but you can modify whatever you want to suit your needs. And remember that this is just one of the many possible approaches: **you can implement your client application and your server application as you want**.
>
> The only actual requirements are getting a valid **Token** from the **OpenVidu deployment** (by using [openvidu-java-client](reference-docs/openvidu-java-client/), [openvidu-node-client](reference-docs/openvidu-node-client/) or the [REST API](reference-docs/REST-API/) in your **server application**) and use it in your **client application** to connect participants to session by calling method `Session.connect(token)` of [openvidu-browser.js](reference-docs/openvidu-browser/) library.


## Deploy openvidu-roles-java

#### Using the OpenVidu Dockerhub image

**1) Redefine the `/opt/openvidu/docker-compose.override.yml`**

As the [deployment docs says](deployment/deploying-openvidu-apps/#with-docker), to make it works with OpenVidu stack, you will need redefine the `/opt/openvidu/docker-compose.override.yml` by the OpenVidu js-java `docker-compose-override.yml`.

Your `docker-compose.override.yml` should look like this:
```
version: '3.1'

services:
    app:
        image: openvidu/openvidu-basic-webinar:2.25.0
        restart: on-failure
        network_mode: host
        environment:
            - SERVER_PORT=5442
            - OPENVIDU_URL=http://localhost:5443
            - OPENVIDU_SECRET=${OPENVIDU_SECRET}
```

#### Creating my own docker image

Under the root project folder, you can see the `openvidu-roles-java/docker/` directory. Here it is included all the required files yo make it possible the deployment with OpenVidu.

First of all, you will need to create the **openvidu-roles-java** docker image.

**1) Run `create_image.sh` script:**

```bash
./create_image.sh
```

This script will create an image named `openvidu/openvidu-basic-webinar-demo:X.Y.Z`. If you want to create an image with a different name, you can change its name [here](https://github.com/OpenVidu/openvidu-tutorials/blob/0ac894d4daf2d501b0196da0fbc596d8e333f1b9/openvidu-roles-java/docker/create_image.sh#L5-L6). Once the openvidu-roles-java image has been created, you will be able to deploy it.

**2) Redefine the `/opt/openvidu/docker-compose.override.yml`**

The steps are exactly the same as those described above but you have to take account change the image name by your custom name (`openvidu/openvidu-basic-webinar-demo` on this sample).

Your `docker-compose.override.yml` should look like this:
```
version: '3.1'

services:
    app:
        image: openvidu/openvidu-basic-webinar-demo:2.25.0
        restart: on-failure
        network_mode: host
        environment:
            - SERVER_PORT=5442
            - OPENVIDU_URL=http://localhost:5443
            - OPENVIDU_SECRET=${OPENVIDU_SECRET}
```

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js"></script>
<script type='text/javascript' src='js/fancybox-setup.js'></script>