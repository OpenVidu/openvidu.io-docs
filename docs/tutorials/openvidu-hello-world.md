# openvidu-hello-world
<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-hello-world" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

This is the simplest demo you can try to get started with OpenVidu: HTML code is only about 30 lines and the JavaScript code not even 50, but it has the minimum set of features to make a group video-call. You will only need a few minutes to get your first application working!

## Running this tutorial

1) Clone the repo:

```bash
git clone https://github.com/OpenVidu/openvidu-tutorials.git
```

2) You will need an http web server installed in your development computer to execute the tutorial. If you have _node.js_ installed, you can use [http-server](https://github.com/indexzero/http-server) to serve application files. It can be installed with:

```bash
npm install -g http-server
```

3) Run the tutorial:

```bash
http-server openvidu-tutorials/openvidu-hello-world/web
```

4) _openvidu-server_ and _Kurento Media Server_ must be up and running in your development machine. The easiest way is running this Docker container which wraps both of them (you will need [Docker CE](https://store.docker.com/search?type=edition&offering=community)):

```bash
docker run -p 8443:8443 --rm -e KMS_STUN_IP=stun.l.google.com -e KMS_STUN_PORT=19302 -e openvidu.secret=MY_SECRET openvidu/openvidu-server-kms
```

5) Go to [`localhost:8080`](http://localhost:8080) to test the app once the server is running. The first time you use the docker container, an alert message will suggest you accept the self-signed certificate of _openvidu-server_ when you first try to join a video-call.

<br>

> To learn **some tips** to develop with OpenVidu, check this **[FAQ](/troubleshooting#2-any-tips-to-make-easier-the-development-of-my-app-with-openvidu)**

> If you are using **Windows**, read this **[FAQ](/troubleshooting/#3-i-am-using-windows-to-run-the-tutorials-develop-my-app-anything-i-should-know)** to properly run the tutorial

## Understanding the code

This application is very simple. It has only 4 files:

- `openvidu-browser-VERSION.js`: openvidu-browser library. You don't have to manipulate this file. 
- `app.js`: sample application main JavaScritp file, which makes use of _openvidu-browser-VERSION.js_.
- `style.css`: some CSS classes to style _index.html_.
- `index.html`: HTML code for the form to connect to a video-call and for the video-call itself. It has two links to both JavaScript files: 

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

#### Initialize a new session and its events:

```javascript
OV = new OpenVidu();
session = OV.initSession("wss://" + location.hostname + ":8443/" + sessionId + '?secret=MY_SECRET');

session.on('streamCreated', function (event) {
  session.subscribe(event.stream, 'subscriber');
});
```
As you can see in the code, the process is very simple: get an OpenVidu object for initializing a Session object with it. `initSession` method must recieve a string with the following format: 

<p style="text-align: center"><strong>"wss://"</strong> + <code>OPENVIDU_IP</code> + <strong>":8443/"</strong> + <code>SESSION_ID</code> + <strong>"?secret="</strong> + <code>OPENVIDU_SECRET</code></p>

  - `OPENVIDU_IP`  is the IP where your OpenVidu Server is running. In this case, it will be _localhost_.
  - `SESSION_ID` is the unique identifier of your session. This parameter will determine which session you are connecting to: in this case, we get this from the HTML text input, where the user can type whatever he wants.
  - `OPENVIDU_SECRET` is the same secret as used to initialize you OpenVidu Server (check param `openvidu.secret` in step 4 of [Running this tutorial](#running-this-tutorial)).

> This parameter building process for _initrSession_ method is only necessary when your app has no server-side. Obviously in a production environment appending your secret is not recommended. Check [this FAQ](/troubleshooting#5-what-are-the-differences-related-to-openvidu-between-an-app-without-a-server-side-and-an-app-with-a-server-side) to learn more.

Then you can subscribe to all the events you want for your session. In this case we just want to subscribe to every stream that is being created in the session: on `streamCreated` we subscribe to the specific stream, available at `event.stream` property.

> You can take a look at all the events in the [Reference Documentation](/reference-docs/openvidu-browser/)

---

#### Connect to the session and publish your webcam:

```javascript
session.connect(null, function (error) {

  if (!error) {
    var publisher = OV.initPublisher('publisher');
    session.publish(publisher);
  } else {
    console.log('There was an error connecting to the session:', error.code, error.message);
  }
  
});
```

We simply need to call `session.connect` method providing a callback to execute when the operation is completed. First parameter `null` is now irrelevant because we have no server-side (check the [FAQ](/troubleshooting#5-what-are-the-differences-related-to-openvidu-between-an-app-without-a-server-side-and-an-app-with-a-server-side)).

The only parameter received by our callback is `error` object, which will be undefined if everything has gone well. To publish our webcam to the session we just get a `publisher` (thanks to `OpenVidu.initPublisher` method), and a new HTML video showing our webcam will be appended to the page inside element with id _publisher_.

Last but not least, we publish this `publisher` object thanks to `session.publish`. At this point the rest of users connected to this session will trigger their own `streamCreated` event and can start watching our webcam.

---

#### Leaving the session:

```javascript
session.disconnect();
```

Whenever we want a user to leave the session, we just need to call `session.disconnect` method. Here it will be called inside _leaveSession_ function, triggered when the user clicks on "LEAVE" button.