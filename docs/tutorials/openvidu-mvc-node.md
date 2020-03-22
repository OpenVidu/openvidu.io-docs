# openvidu-mvc-node
<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-mvc-node" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

A secure OpenVidu sample app with a Node backend and a traditional MVC frontend. It makes use of _openvidu-node-client_ to connect to OpenVidu Server. With regard to the use of OpenVidu, it is identical to [openvidu-js-node](tutorials/openvidu-js-node){:target="_blank"}. This tutorial is intended for developers who feel more comfortable with MVC web architectures for their frontends. [Embedded JavaScript](https://ejs.co/){:target="_blank"} is the template engine of choice for this tutorial.

## Understanding this tutorial

<p align="center">
  <img class="img-responsive" src="https://docs.google.com/uc?id=0B61cQ4sbhmWSSGxqS2hYOVQzLW8">
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

1) You will need _node_ to execute the app. You can install them with:

```bash
sudo curl -sL https://deb.nodesource.com/setup_12.x | sudo bash -
sudo apt-get install -y nodejs
```

3) Run the tutorial with the following commands. They will install the NPM dependencies and will execute `server.js` server passing two arguments: "localhost:4443" as the URL where _openvidu-server_ will be listening and "MY_SECRET" as the secret share with it:

```bash
cd openvidu-tutorials/openvidu-mvc-node
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

This is a very basic web application with a pretty simple JS/HTML/CSS frontend and a straightforward Node backend built with [_express_](http://expressjs.com){:target="_blank"} that serves HTML files with a MVC approach, building the templates with the help of [Embedded JavaScript](https://ejs.co/){:target="_blank"}. OpenVidu assumes you can identify your users so you can tell which users can connect to which video-calls, and what role (and therefore what permissions) each one of them will have in the calls. You can do this as you prefer. Here our backend will manage the users and their sessions with the easy-to-use and non-intrusive [_express-session_](https://github.com/expressjs/session){:target="_blank"} API.

  - **Backend**: node server
    - `server.js` : single file which handles all operations of server. It returns HTML templates as response to HTTP requests.

  - **Frontend templates**: Plain JS/HTML/CSS files served by the backend, with `.ejs` extension to support Embedded JavaScript (`/views` folder)
    - `index.ejs` : template with the login form
    - `dashboard.ejs` : template with the form to join a video-call
    - `session.ejs` : template of the video-call itself

  - **Frontend static files** (`/public` folder)
    - `openvidu-browser-VERSION.js` : openvidu-browser library. You don't have to manipulate this file
    - `style.css` : some CSS classes to style the templates

Let's describe the code following this scenario: a user logs in to the app and connects to the video-call "TUTORIAL", where he publishes his webcam. A second user will connect to the same video-call just after that and publish its own webcam. Both of them will leave the call after a while.

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

`server.js` at `/dashboard` first checks if the user is already logged (maybe he has just refreshed `/dashboard` page), and if so it just redirects to the dashboard itself. If the user is actually logging in, the method checks that the params are correct and if so sets a new _express-session_ for the newly logged user (adding a _loggedUser_ property with its username in the _req.session_ object). Finally it returns `dashboard.ejs` template:

```javascript
app.post('/dashboard', dashboardController);
app.get('/dashboard', dashboardController);

function dashboardController(req, res) {

    // Check if the user is already logged in
    if (isLogged(req.session)) {
        // User is already logged. Immediately return dashboard
        user = req.session.loggedUser;
        res.render('dashboard.ejs', {
            user: user
        });
    } else {
        // User wasn't logged and wants to

        // Retrieve params from POST body
        var user = req.body.user;
        var pass = req.body.pass;

        if (login(user, pass)) { // Correct user-pass
            // Validate session and return OK 
            // Value stored in req.session allows us to identify the user in future requests
            req.session.loggedUser = user;
            res.render('dashboard.ejs', {
                user: user
            });
        } else { // Wrong user-pass
            // Invalidate session and return index template
            req.session.destroy();
            res.redirect('/');
        }
    }
}
```

---

### 2) User connects to "TUTORIAL" video-call

`dashboard.ejs` template will display a form asking for the video-call to connect and the nickname the user wants to have in it. So our 'publisher1' user would write TUTORIAL in "Session" field:

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
        <input class="form-control" type="text" name="sessionname" required="true"></input>
    </p>
    <p class="text-center">
        <button class="btn btn-lg btn-success" type="submit">Join!</button>
    </p>
</form>
```

When `server.js` receives a request at `/session` path is when things get interesting.
First of all there are some important attributes in this class we must mention:

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

Rest controller method receives both params sent by the client (whatever nickname the user has chosen and "TUTORIAL" as the sessionName). First it prepares a param we will need a little further on: `tokenOptions`.

```javascript
app.post('/session', (req, res) => {
    // Check the user is logged ...

    // The nickname sent by the client
    var clientData = req.body.data;
    // The video-call to connect
    var sessionName = req.body.sessionname;

    // Role associated to this user
    var role = users.find(u => (u.user === req.session.loggedUser)).role;

    // Optional data to be passed to other users when this user connects to the video-call
    // In this case, a JSON with the value we stored in the req.session object on login
    var serverData = JSON.stringify({ serverData: req.session.loggedUser });

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

                // Return session template with all the needed attributes
                res.render('session.ejs', {
                    sessionName: sessionName,
                    token: token,
                    nickName: clientData,
                    userName: req.session.loggedUser,
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

We are almost there! Now in `session.ejs` JavaScript code (preceded by a tag `<script>`) we can init a new Session with _sessionId_ and connect to it with _token_:

```javascript
// Get all the attributes from the template in EJS style
var sessionName = <%- JSON.stringify(sessionName) %>;
var token = <%- JSON.stringify(token) %>;
var nickName = <%- JSON.stringify(nickName) %>;
var userName = <%- JSON.stringify(userName) %>;
```

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
});
```

The user will now see its own video on the page. The connection to the session has completed!

---

### 3) Another user connects to the video-call

The process would be exactly the same as before until `server.js` executes controller at `/session`. Now session 'TUTORIAL' already exists, so in the _if-else_ statement the _if_ branch would be the one executed:

```javascript
if (mapSessions[sessionName]) {
    // Session already exists: return existing sessionId and a new token

    // Get the existing Session from the collection
    var mySession = mapSessions[sessionName];

    // Generate a new token asynchronously with the recently created tokenOptions
    mySession.generateToken(tokenOptions)
        .then(token => {

            // Store the new token in the collection of tokens
            mapSessionNamesTokens[sessionName].push(token);

            // Return session template with all the needed attributes
            res.render('session.ejs', {
                sessionId: mySession.getSessionId(),
                token: token,
                nickName: clientData,
                userName: req.session.loggedUser,
                sessionName: sessionName
            });
        })
        .catch(error => {
            console.error(error);
        });
}
```

The code executed in `session.ejs` _< script >_ tag would also be the same. After the `Session.publish()` method has been successful, both users will be seeing each other's video, as well as the username and the nickname below it.

---

### 4) Users leave the video-call

After a while both users decide to leave the session. Apart from calling `session.disconnect()` (triggered in `leaveSession()` _onclick_ method) to destroy the connection on openvidu-server, we need another POST operation to let the backend know that certain user has left the session so it can update the collections with the active sessions and tokens.

In `session.ejs` template the "Leave session" button actually performs a POST operation to path `/leave-session` with a hidden form. Notice that when the user clicks the submit button, a POST operation will be triggered but also the `leaveSession()` method. First updates our backend. Second updates our openvidu-server.

```html
<form action="/leave-session" method="post">
    <input type="hidden" name="sessionname" value="<%= sessionName %>"></input>
    <input type="hidden" name="token" value="<%= token %>"></input>
    <button id="buttonLeaveSession" class="btn btn-large btn-danger" type="submit" onclick="leaveSession()">Leave session</button>
</form>
```

In `server.js` we update the collections at `/leave-session`:

```javascript
app.post('/leave-session', (req, res) => {
    // Check the user is logged ...

    // Retrieve params from POST body
    var sessionName = req.body.sessionname;
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
            console.log('Problems in the app server: the TOKEN wasn\'t valid');
            res.redirect('/dashboard');
        }
        if (tokens.length == 0) {
            // Last user left: session must be removed
            delete mapSessions[sessionName];
        }
        res.redirect('/dashboard');
    } else {
        var msg = 'Problems in the app server: the SESSION does not exist';
        res.status(500).send(msg);
    }
```

When the last user leaves the session `delete mapSessions[sessionName]` will be executed: this means the session is empty and that it is going to be closed. The _sessionId_ and all _token_ params associated to it will be invalidated.

---

> At this point we have covered all the important code from the tutorial. With this scenario we have seen the most common use-case, but you can modify whatever you want to suit your needs. And remember that this is just one of the many possible approaches: **you can implement your frontend and your backend as you want**. 
> 
> The only actual requirements are getting ***sessionId*** and ***token*** params from  ***openvidu-server*** (by using one of the available clients or with the REST API) and using them along with ***openvidu-browser*** to connect your clients to the sessions.


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