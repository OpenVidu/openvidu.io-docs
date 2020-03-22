# openvidu-hello-world
<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-hello-world" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

This is the simplest demo you can try to get started with OpenVidu API. It has the minimum set of features to make a group video-call. You will only need a few minutes to get your first application working!

## Running this tutorial

1) Clone the repo:

```bash
git clone https://github.com/OpenVidu/openvidu-tutorials.git
```

2) You will need an http web server installed in your development computer to execute the tutorial. If you have _node.js_ installed, you can use [http-server](https://github.com/indexzero/http-server){:target="_blank"} to serve application files. It can be installed with:

```bash
npm install -g http-server
```

3) Run the tutorial:

```bash
http-server openvidu-tutorials/openvidu-hello-world/web
```

4) _openvidu-server_ and _Kurento Media Server_ must be up and running in your development machine. The easiest way is running this Docker container which wraps both of them (you will need [Docker CE](https://store.docker.com/search?type=edition&offering=community){:target="_blank"}):

```bash
docker run -p 4443:4443 --rm -e openvidu.secret=MY_SECRET openvidu/openvidu-server-kms:2.12.0
```

5) Go to _[`localhost:8080`](http://localhost:8080){:target="_blank"}_ to test the app once the server is running. The first time you use the docker container, an alert message will suggest you accept the self-signed certificate of _openvidu-server_ when you first try to join a video-call.

> If you are using **Windows**, read this **[FAQ](troubleshooting/#3-i-am-using-windows-to-run-the-tutorials-develop-my-app-anything-i-should-know){:target="_blank"}** to properly run the tutorial

> To learn **some tips** to develop with OpenVidu, check this **[FAQ](troubleshooting/#2-any-tips-to-make-easier-the-development-of-my-app-with-openvidu){:target="_blank"}**

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

session.on('streamCreated', function (event) {
  session.subscribe(event.stream, 'subscriber');
});
```

As you can see in the code, the process is very simple: get an OpenVidu object and initialize a Session object with it.

Then you can subscribe to all the events you want for your session. In this case we just want to subscribe to every stream that is being created in the session: on `streamCreated` we subscribe to the specific stream, available at `event.stream` property.

> You can take a look at all the events in the [Reference Documentation](api/openvidu-browser/classes/event.html){:target="_blank"}

---

#### Get a _token_ from OpenVidu Server

<div style="
    display: table;
    border: 2px solid #0088aa9e;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 25px;
    padding: 5px 0 5px 0;
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
getToken(mySessionId).then(token => {
	// See next point to see how to connect to the session using 'token'
});
```

Now we need a token from OpenVidu Server. In a production environment we would perform this operations in our application backend, by making use of the _[REST API](reference-docs/REST-API/){:target="_blank"}_, _[OpenVidu Java Client](reference-docs/openvidu-java-client/){:target="_blank"}_ or _[OpenVidu Node Client](reference-docs/openvidu-node-client/){:target="_blank"}_. Here we have implemented the POST requests to OpenVidu Server in a method `getToken()` that returns a Promise with the token. Without going into too much detail, this method performs two _ajax_ requests to OpenVidu Server, passing OpenVidu Server secret to authenticate them:

  - First ajax request performs a POST to `/api/sessions` (we send a `customSessionId` field to name the session with our `mySessionId` value retrieved from HTML input)
  - Second ajax request performs a POST to `/api/tokens` (we send a `session` field to assign the token to this same session)

You can inspect this method in detail in the [GitHub repo](https://github.com/OpenVidu/openvidu-tutorials/blob/master/openvidu-hello-world/web/app.js#L59){:target="_blank"}.

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
session.disconnect();
```

Whenever we want a user to leave the session, we just need to call `session.disconnect` method. Here it will be called inside _leaveSession_ function, triggered when the user clicks on "LEAVE" button. This function also returns the page to the "Join session" view.