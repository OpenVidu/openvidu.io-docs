# openvidu-mvc-java
<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-mvc-java" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

A secure OpenVidu sample app with a Java backend and a traditional MVC frontend. It makes use of _openvidu-java-client_ to connect to OpenVidu Server. With regard to the use of OpenVidu, it is identical to [openvidu-js-java](tutorials/openvidu-js-java){:target="_blank"}. This tutorial is intended for developers who feel more comfortable with MVC web architectures for their frontends. [Thymeleaf](http://www.thymeleaf.org/){:target="_blank"} is the template engine of choice for this tutorial.

## Understanding this tutorial

<p align="center">
  <img class="img-responsive" src="https://docs.google.com/uc?id=0B61cQ4sbhmWSQzJGRDhzS1dNZFk">
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
cd openvidu-tutorials/openvidu-mvc-java
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

This is a very basic web application with a pretty simple JS/HTML/CSS frontend and a straightforward Java backend that serves HTML files with a MVC approach, building the templates with the help of [Thymeleaf](http://www.thymeleaf.org/){:target="_blank"}.

OpenVidu assumes you can identify your users so you can tell which users can connect to which video-calls, and what role (and therefore what permissions) each one of them will have in the calls. You can do this as you prefer. Here our backend will manage the users and their sessions with the easy-to-use and non-intrusive _HttpSession_ API. In these posts multiple options for user session management in Java are explained, inlcuding the one used in this tutorial: [journaldev.com](http://www.journaldev.com/1907/java-session-management-servlet-httpsession-url-rewriting){:target="_blank"}, [studytonight.com](http://www.studytonight.com/servlet/session-management.php){:target="_blank"}.

- **Backend**: SpringBoot app with the following classes (`src/main/java` path, `io.openvidu.js.java` package)
	- `App.java` : entrypoint for the app
	- `LoginController.java` : controller for handling login and logout operations
	- `SessionController.java` : controller for getting OpenVidu tokens. It also stores our active video-calls and the users connected to them<br><br>

- **Frontend templates**: Plain JS/HTML/CSS files served by the backend (`src/main/resources/templates`)
	- `index.html` : template with the login form
	- `dashboard.html` : template with the form to join a video-call
	- `session.html` : template of the video-call itself<br><br>

- **Frontend static files** (`src/main/resources/static`)
 	- `openvidu-browser-VERSION.js` : openvidu-browser library. You don't have to manipulate this file
	- `style.css` : some CSS classes to style the templates

Let's describe the code following this scenario: a user logs into the app and connects to the video-call "TUTORIAL", where he publishes his webcam. A second user will connect to the same video-call just after that and publish its own webcam. Both of them will leave the call after a while.

---

### 1) User logs in

At path `/` a login form will be displayed:

<p align="center">
  <img class="img-responsive login-form-img" style="padding: 25px 0;" src="img/docs/tutorials/login-form.png">
</p>

The form will execute a POST operation to path `/dashboard` whenever "Log in" button is clicked, passing the username and the password:

```html
<form class="form-group jumbotron" action="/dashboard" method="post">
	<p>
		<label>User</label>
		<input class="form-control" type="text" name="user" required="true"></input>
	</p>
	<p>
		<label>Pass</label>
		<input class="form-control" type="password" name="pass" required="true"></input>
	</p>
	<p class="text-center">
		<button class="btn btn-lg btn-info" type="submit">Log in</button>
	</p>
</form>
```

`LoginController.java` first checks if the user is already logged (maybe he has just refreshed `/dashboard` page), and if so it just redirects to the dashboard itself. If the user is actually logging in, the method checks that the params are correct and if so sets an _HttpSession_ for the newly logged user (adding a "loggedUser" attribute with its username in the HttpSession object). Finally it returns `dashboard.html` template:

```java
@RequestMapping(value = "/dashboard", method = { RequestMethod.GET, RequestMethod.POST })
public String login(@RequestParam(name = "user", required = false) String user,
			@RequestParam(name = "pass", required = false) String pass,
			Model model, HttpSession httpSession) {

	// Check if the user is already logged in
	String userName = (String) httpSession.getAttribute("loggedUser");
	if (userName != null) { 
		// User is already logged. Immediately return dashboard
		model.addAttribute("username", userName);
		return "dashboard";
	}
	
	// User wasn't logged and wants to
	if (login(user, pass)) { // Correct user-pass
		
		// Validate session and return OK 
		// Value stored in HttpSession allows us to identify the user in future requests
		httpSession.setAttribute("loggedUser", user);
		model.addAttribute("username", user);
		
		// Return dashboard.html template
		return "dashboard";
		
	} else { // Wrong user-pass
		// Invalidate session and redirect to index.html
		httpSession.invalidate();
		return "redirect:/";
	}
}
```

---

### 2) User connects to "TUTORIAL" video-call

`dashboard.html` template will display a form asking for the video-call to connect and the nickname the user wants to have in it. So our 'publisher1' user would write TUTORIAL in "Session" field:

<p align="center">
  <img class="img-responsive join-form-img" style="padding: 25px 0;" src="img/docs/tutorials/join-form.png">
</p>

The form will execute a POST operation to path `/session` whenever "Join!" button is clicked, passing the nickname and the session name:

```html
<form class="form-group" action="/session" method="post">
	<p>
		<label>Participant</label>
		<input class="form-control" type="text" name="data" required="true"></input>
	</p>
	<p>
		<label>Session</label>
		<input class="form-control" type="text" name="session-name" required="true"></input>
	</p>
	<p class="text-center">
		<button class="btn btn-lg btn-success" type="submit">Join!</button>
	</p>
</form>
```

When `SessionController.java` receives a request at `/session` path is when things get interesting.
First of all there are some important attributes in this class we must mention:

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

Rest controller method receives both params sent by the client (whatever nickname the user has chosen and "TUTORIAL" as the sessionName). First it prepares a param we will need a little further on: `tokenOptions`.

```java
@RequestMapping(value = "/session", method = RequestMethod.POST)
public String joinSession(@RequestParam(name = "data") String clientData,
			@RequestParam(name = "session-name") String sessionName,
			Model model, HttpSession httpSession) {
	
	// ... check the user is logged with HttpSession and continue ...
	
	// Role associated to this user
	OpenViduRole role = LoginController.users.get(httpSession.getAttribute("loggedUser")).role;
	
	// Optional data to be passed to other users when this user connects to the video-call
	// In this case, a JSON with the value we stored in the HttpSession object on login
	String serverData = "{\"serverData\": \"" + httpSession.getAttribute("loggedUser") + "\"}";

	// Build tokenOptions object with the serverData and the role
	TokenOptions tokenOptions = new TokenOptions.Builder().data(serverData).role(role).build();
```

Just after that an _if-else_ statement comes into play: does the session "TUTORIAL" already exist?

```java
if (this.mapSessions.get(sessionName) != null) { ...
```

In this case it doesn't because 'publisher1' is the first user connecting to it. So we focus on the _else_ branch:

```java
else {
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

		// Add all the needed attributes to the template
		model.addAttribute("sessionName", sessionName);
		model.addAttribute("token", token);
		model.addAttribute("nickName", clientData);
		model.addAttribute("userName", httpSession.getAttribute("loggedUser"));

		// Return session.html template
		return "session";
		
	} catch (Exception e) {
		// If error just return dashboard.html template
		model.addAttribute("username", httpSession.getAttribute("loggedUser"));
		return "dashboard";
	}
}
```

We are almost there! Now in `session.html` JavaScript code (preceded by a tag `<script th:inline="javascript">`) we can init a new Session and connect to it with _token_:

```javascript
// Get all the attributes from the template in Thymeleaf style
var sessionName = [[${ sessionName }]];
var token = [[${ token }]];
var nickName = [[${ nickName }]];
var userName = [[${ userName }]];

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

session.connect(token, { clientData: nickName })
	.then(() => {

		// --- 5) Set page layout for active call ---

		$('#session-title').text(sessionName);
		$('#join').hide();
		$('#session').show();


		// Here we check somehow if the user has 'PUBLISHER' role before
		// trying to publish its stream. Even if someone modified the client's code and
		// published the stream, it wouldn't work if the token sent in Session.connect
		// method is not recognized as 'PUBLIHSER' role by OpenVidu Server
		if (isPublisher()) {

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

The process would be exactly the same as before until `SessionController.java` executes `joinSession()` method. Now session 'TUTORIAL' already exists, so in the _if-else_ statement the _if_ branch would be the one executed:

```java
if (this.mapSessions.get(sessionName) != null) {
	// Session already exists
	System.out.println("Existing session " + sessionName);
	try {
	
		// Generate a new token with the recently created tokenOptions
		String token = this.mapSessions.get(sessionName).generateToken(tokenOptions);
		
		// Update our collection storing the new token
		this.mapSessionNamesTokens.get(sessionName).put(token, role);

		// Add all the needed attributes to the template
		model.addAttribute("sessionName", sessionName);
		model.addAttribute("token", token);
		model.addAttribute("nickName", clientData);
		model.addAttribute("userName", httpSession.getAttribute("loggedUser"));

		// Return session.html template
		return "session";
		
	} catch (Exception e) {
		// If error just return dashboard.html template
		model.addAttribute("username", httpSession.getAttribute("loggedUser"));
		return "dashboard";
	}
}
```

The code executed in `session.html` _< script >_ tag would also be the same. After the `Session.publish()` method has been successful, both users will be seeing each other's video, as well as the username and nickname uppon it.

---

### 4) Users leave the video-call

After a while both users decide to leave the session. Apart from calling `session.disconnect()` (triggered in `leaveSession()` _onclick_ method) to destroy the connection on OpenVidu Server, we need another POST operation to let the backend know that certain user has left the session so it can update the collections with the active sessions and tokens.

In `session.html` template the "Leave session" button actually performs a POST operation to path `/leave-session` with a hidden form. Notice that when the user clicks the submit button, a POST operation will be triggered but also the `leaveSession()` method. First updates our application's backend. Second updates our OpenVidu Server.

```html
<form action="/leave-session" method="post">
	<input type="hidden" name="session-name" th:value="${sessionName}"></input>
	<input type="hidden" name="token" th:value="${token}"></input>
	<button id="buttonLeaveSession" class="btn btn-large btn-danger" type="submit" onclick="leaveSession()">
		Leave session</button>
</form>
```

In `SessionController.java` we update the collections:

```java
@RequestMapping(value = "/leave-session", method = RequestMethod.POST)
public String removeUser(@RequestParam(name = "session-name") String sessionName,
			@RequestParam(name = "token") String token,
			Model model, HttpSession httpSession) throws Exception {
	
	// ... check the user is logged with HttpSession and continue ...
	
	// If the session exists ("TUTORIAL" in this case)
	if (this.mapSessions.get(sessionName) != null && this.mapSessionNamesTokens.get(sessionName) != null) {
		
		// If the token exists
		if (this.mapSessionNamesTokens.get(sessionName).remove(token) != null) {
			// User left the session
			if (this.mapSessionNamesTokens.get(sessionName).isEmpty()) {
				// Last user left: session must be removed
				this.mapSessions.remove(sessionName);
			}
			return "redirect:/dashboard";
			
		} else {
			// The TOKEN wasn't valid
			System.out.println("Problems in the app server: the TOKEN wasn't valid");
			return "redirect:/dashboard";
		}
		
	} else {
		// The SESSION does not exist
		System.out.println("Problems in the app server: the SESSION does not exist");
		return "redirect:/dashboard";
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