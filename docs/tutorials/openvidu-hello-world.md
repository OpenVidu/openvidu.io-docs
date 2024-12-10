# openvidu-hello-world
<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-hello-world" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

This is the simplest demo you can try to get started with OpenVidu API. It has the minimum set of features to make a group video-call. You will only need a few minutes to get your first application working!

<div class="row">
    <div class="pro-gallery" style="margin: 20px 0 15px 0">
        <a data-fancybox="gallery-pro1" data-type="image" class="fancybox-img" href="img/tutorials/openvidu-hello-world.png">
          <img class="img-responsive" style="margin: auto; max-height: 500px" src="img/tutorials/openvidu-hello-world.png"/>
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
http-server openvidu-tutorials/openvidu-hello-world/web
```

Go to [`http://localhost:8080`](http://localhost:8080){:target="_blank"} to test the app once the server is running.

> To test the application with other devices in your network, visit this **[FAQ](troubleshooting/#3-test-applications-in-my-network-with-multiple-devices)**

## Understanding the code

This application is very simple. It has only 4 files:

- `openvidu-browser-VERSION.js`: openvidu-browser library. You don't have to manipulate this file.
- `app.js`: sample application main JavaScript file, which makes use of _openvidu-browser-VERSION.js_.
- `style.css`: some CSS classes to style _index.html_.
- `index.html`: HTML code for the form to connect to a video-call and for the video-call itself. It has two links to both JavaScript files:

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

`OV` will be our OpenVidu object (entrypoint to the library). `session` will be the video-call we will connect to. As first sentence in the `joinSession()` method, we initialize the variable that will identify our video-call retrieving the value from the HTML input.

```javascript
var mySessionId = document.getElementById("sessionId").value;
```

---

#### Initialize a new session and its events

```javascript
OV = new OpenVidu();
session = OV.initSession();

session.on("streamCreated", function (event) {
	session.subscribe(event.stream, "subscriber");
});
```

As you can see in the code, the process is very simple: get an OpenVidu object and initialize a Session object with it.

Then you can subscribe to all the events you want for your session. In this case we just want to subscribe to every stream that is being created in the session: on `streamCreated` we subscribe to the specific stream, available at `event.stream` property.

> You can take a look at all the events in the [Reference Documentation](api/openvidu-browser/classes/Event.html)

---

#### Get an OpenVidu token

We are ready to join the session. But we still need a token to get access to it, so we ask for it to the [server application](application-server/). The server application will in turn request a token to the OpenVidu deployment. If you have any doubts about this process, review the [Basic Concepts](developing-your-video-app/#basic-concepts).

Variable `mySessionId` is the OpenVidu Session we want a token from.

```javascript
getToken(mySessionId).then(token => {
	// See next point to see how to connect to the session using 'token'
}
```

This is the piece of code in charge of finally retrieving a token from the server application. The tutorial uses `jQuery.ajax()` method to perform the necessary [HTTP requests](application-server/#rest-endpoints).

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

#### Connect to the session using the token

```javascript
getToken(mySessionId).then(token => {

	session.connect(token)
		.then(() => {
			document.getElementById("session-header").innerText = mySessionId;
			document.getElementById("join").style.display = "none";
			document.getElementById("session").style.display = "block";

			var publisher = OV.initPublisher("publisher");
			session.publish(publisher);
		})
		.catch(error => {
			console.log("There was an error connecting to the session:", error.code, error.message);
		});
});
```

We simply need to call `session.connect` passing the recently retrieved token from OpenVidu Server. This method returns a Promise to which you can subscribe to.

In case of success we first set the view to the active video session. Then we proceed to publish our webcam. To do so we just get a `publisher` using `OpenVidu.initPublisher` method, and a new HTML video showing our webcam will be appended to the page inside element with id _"publisher"_.

Last but not least, we publish this `publisher` object thanks to `session.publish`. At this point the rest of users connected to this session will trigger their own `streamCreated` event and can start watching our webcam.

---

#### Leaving the session

```javascript
function leaveSession() {
	session.disconnect();
	document.getElementById("join").style.display = "block";
	document.getElementById("session").style.display = "none";
}

window.onbeforeunload = function () {
	if (session) session.disconnect();
};
```

Whenever we want a user to leave the session, we just need to call `session.disconnect` method. Here it will be called inside _leaveSession_ function, triggered when the user clicks on "LEAVE" button. This function also returns the page to the "Join session" view. And we also make sure that the method is called before the page is unloaded using event `window.onbeforeunload`.

## Deploying openvidu-hello-world

#### 1) Build the docker image

Under the root project folder, you can see the `openvidu-hello-world/docker/` directory. Here it is included all the required files yo make it possible the deployment with OpenVidu.

First of all, you will need to create the **openvidu-hello-world** docker image. Under `openvidu-hello-world/docker/` directory you will find the `create_image.sh` script. This script will create the docker image with the [openvidu-basic-node](application-server/openvidu-basic-node/) as application server and the static files.

```bash
./create_image.sh openvidu/openvidu-hello-world-demo:X.Y.Z
```

This script will create an image named `openvidu/openvidu-hello-world-demo:X.Y.Z`. This name will be used in the next step.

#### 2) Deploy the docker image

Time to deploy the docker image. You can follow the [Deploy OpenVidu based application with Docker](deployment/deploying-openvidu-apps/#with-docker) guide for doing this.


<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js"></script>
<script type='text/javascript' src='js/fancybox-setup.js'></script>