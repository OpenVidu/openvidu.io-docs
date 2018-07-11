# openvidu-webcomponent

<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-webcomponent" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

OpenVidu webcomponent is the fullest, lightest and simplest element which you will can try to get started with OpenVidu and add videoconferences system into your website or app.
You will only need a few minutes to get your first application working!

## Running this tutorial

1.  Clone the repo:

```bash
git clone https://github.com/OpenVidu/openvidu-tutorials.git
```

2.  You will need an http web server installed in your development computer to execute the tutorial. If you have _node.js_ installed, you can use [http-server](https://github.com/indexzero/http-server) to serve application files. It can be installed with:

```bash
npm install -g http-server
```

3.  Run the tutorial:

```bash
http-server openvidu-tutorials/openvidu-webcomponent/web
```

4.  _openvidu-server_ and _Kurento Media Server_ must be up and running in your development machine. The easiest way is running this Docker container which wraps both of them (you will need [Docker CE](https://store.docker.com/search?type=edition&offering=community)):

```bash
docker run -p 4443:4443 --rm -e openvidu.secret=MY_SECRET openvidu/openvidu-server-kms
```

5.  Go to [`localhost:8080`](http://localhost:8080) to test the app once the server is running. The first time you use the docker container, an alert message will suggest you accept the self-signed certificate of _openvidu-server_ when you first try to join a video-call.

<br>

> If you are using **Windows**, read this **[FAQ](/troubleshooting/#3-i-am-using-windows-to-run-the-tutorials-develop-my-app-anything-i-should-know)** to properly run the tutorial

> To learn **some tips** to develop with OpenVidu, check this **[FAQ](/troubleshooting#2-any-tips-to-make-easier-the-development-of-my-app-with-openvidu)**

## Understanding the code

This application is very simple. It has only 4 files:

-   `openvidu-webcomponent.js`: openvidu-webcomponent script. You don't have to manipulate this file.
-   `openvidu-webcomponent.css`: openvidu-webcomponent styles. You don't have to manipulate this file.
-   `app.js`: sample application main JavaScritp file.
-   `index.html`: HTML code for the form to connect to a video-session and for the video-session itself.
    Let's see it:

Inside of the `head` section, you must add `app.js`, `openvidu-webcomponent.js` and `openvidu-webcomponent.css` files:

```
<head>
    <title>openvidu-webcomponent</title>
    <link rel="shortcut icon" href="assets/images/favicon.ico" type="image/x-icon">
    <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>

    <!-- OpenVidu WebComponent -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="openvidu-webcomponent.css">
    <script type='application/javascript' src='openvidu-webcomponent.js'></script>
    <!-- OpenVidu WebComponent -->

    <script src="app.js"></script>

</head>
```

As you can see, the `index.html` body has the form to connect to a video-session and the **OpenVidu webcomponent**

<pre class="html-scripts">
  <code>&lt;openvidu-webcomponent&gt;&lt;/openvidu-webcomponent&gt;</code>
</pre>

```html
<body>
    <!-- Form to connect to a video-session -->
    <div id="main" style="text-align: center;">
        <h1>Join a video session</h1>
        <form onsubmit="joinSession(); return false" style="padding: 80px; margin: auto">
            <p>
                <label>Session:</label>
                <input type="text" id="sessionId" value="SessionA" required>
            </p>
            <p>
                <label>User:</label>
                <input type="text" id="user" value="User1" required>
            </p>
            <p>
                <input type="submit" value="JOIN">
            </p>
        </form>
    </div>
    <!-- Form to connect to a video-session -->

    <openvidu-webcomponent id="session" style="display: none;"></openvidu-webcomponent>

</body>
```

---

#### OpenVidu webcomponent events emitted

OpenVidu webcomponent emits events like _`joinSession`_, _`leaveSession`_ or _`error`_, you will be able to handle it and manage the behavior for each event inthe main JS file, `app.js`:

```javascript
var ov = document.querySelector('openvidu-webcomponent');

ov.addEventListener('joinSession', (event) => {
    // Do something
});

ov.addEventListener('leaveSession', (event) => {
    // Do something
});

ov.addEventListener('error', (event) => {
    // Do something
});
```

#### Method called when the form has been submitted

The `joinSession()` method get the form input values and get the `token` from OpenVidu Server.

```javascript
function joinSession() {
    var ov = document.querySelector('openvidu-webcomponent');
    var sessionId = document.getElementById('sessionId').value;
    var user = document.getElementById('user').value;

    getToken(sessionId).then((token) => {
        // See next step to see how to use the token gotten.
    });
}
```

When the token has been gotten, you must assign, the **session configuration**, to OpenVidu web component, an object named `sessionConfig` with three parameters: `sessionId` , `user` and `token`.

```javascript
getToken(sessionId).then((token) => {
    ov.sessionConfig = { sessionId, user, token };
});
```

On this way, you will join to the video session with your session id, your user nickname and your token gotten previously.

---

#### Get a _token_ from OpenVidu Server

<div style="
    display: table;
    border: 1px solid #0088aa;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 25px;"><div style="display: table-cell">
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
getToken(sessionId).then((token) => {
    // Send the 'token' to OpenVidu web component
});
```

In a production environment we would perform this operations in our application backend, by making use of the [API REST](/reference-docs/REST-API/), [OpenVidu Java Client](/reference-docs/openvidu-java-client/) or [OpenVidu Node Client](/reference-docs/openvidu-node-client/). Here we have implemented the POST requests to OpenVidu Server in a mehtod `getToken()` that returns a Promise with the token. Without going into too much detail, this method performs two _ajax_ requests to OpenVidu Server, passing OpenVidu Server secret to authenticate them:

-   First ajax request performs a POST to `/api/sessions` (we send a `customSessionId` field to name the session with our `sessionId` value retrieved from HTML input)
-   Second ajax request performas a POST to `/api/tokens` (we send a `sessionId` field to assign the token to this same session)

You can inspect this method in detail in the [GitHub repo](https://github.com/OpenVidu/openvidu-tutorials/blob/master/openvidu-hello-world/web/app.js#L58).

<hr>

## Extra features of OpenVidu webcomponent


#### Alternatives to connect to OpenVidu session

On the example above, **OpenVidu webcomponent** receives the `sessionConfig` parameter dynamically: 

```javascript
 ov.sessionConfig = { sessionId, user, token };
```


You also can send others parameters, in a static way, like `openviduServerUrl` and `openviduSecret` when you do not want to get the token yourself. The OpenVidu web component will get it by you.

```html
<openvidu-webcomponent session-config='{"sessionId":"SessionA", "user":"User1"}'
openvidu-server-url="https://localhost:4443" openvidu-secret="MY_SECRET"></openvidu-webcomponent>
```

<div style="
    display: table;
    border: 1px solid #0088aa;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 25px;"><div style="display: table-cell">
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
	<strong>WARNING</strong>: As you can see, when you add parameters to OpenVidu web component statically, you have to replace the <strong>camelCase</strong> with a <strong>hyphen between words</strong>.
</div>
</div>

#### Close the session dynamically

You also can disconnect the session assigning dynamically `"null"` to the **sessionId**:

```javascript
ov.sessionConfig = {sessionId: "null"}
```

#### Choose a theme

Nowadays, OpenVidu webcomponent allows you to choose between two themes. By default, the theme selected is _**dark theme**_ but if you prefer change it for a _**light them**_, you can add `theme="light"`.

```html
<openvidu-webcomponent theme="light"></openvidu-webcomponent>
```
