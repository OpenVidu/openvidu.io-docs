# openvidu-webcomponent
<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-webcomponent" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

OpenVidu Web Component is the simplest and quickest way to add videoconference capabilities to your existing web application. It brings many of the features of OpenVidu platform, making it very powerful.
With just a few lines of code you will have your first video call working!

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
http-server openvidu-tutorials/openvidu-webcomponent/web
```

4) _openvidu-server_ and _Kurento Media Server_ must be up and running in your development machine. The easiest way is running this Docker container which wraps both of them (you will need [Docker CE](https://store.docker.com/search?type=edition&offering=community){:target="_blank"}):

```bash
docker run -p 4443:4443 --rm -e openvidu.secret=MY_SECRET openvidu/openvidu-server-kms:2.12.0
```

5) Go to _[`localhost:8080`](http://localhost:8080){:target="_blank"}_ to test the app once the server is running. The first time you use the docker container, an alert message will suggest you accept the self-signed certificate of _openvidu-server_ when you first try to join a video-call.


<div class="row no-margin row-gallery">
	<div class="col-md-6">
		<a data-fancybox="gallery" href="img/demos/ov-webcomponent2.png">
		<img class="img-responsive" src="img/demos/ov-webcomponent2.png">
	</a>
	</div>
	<div class="col-md-6">
		<a data-fancybox="gallery" href="img/demos/ov-webcomponent1.png">
		<img class="img-responsive" src="img/demos/ov-webcomponent1.png">
	</a>
	</div>
</div>

> If you are using **Windows**, read this **[FAQ](troubleshooting/#3-i-am-using-windows-to-run-the-tutorials-develop-my-app-anything-i-should-know){:target="_blank"}** to properly run the tutorial

> To learn **some tips** to develop with OpenVidu, check this **[FAQ](troubleshooting/#2-any-tips-to-make-easier-the-development-of-my-app-with-openvidu){:target="_blank"}**

## Understanding the code

This application is very simple. It has only 4 files:

-   `openvidu-webcomponent-{VERSION}.js`: JavaScript file of OpenVidu Web Component. You don't have to manipulate this file.
-   `openvidu-webcomponent-{VERSION}.css`: styles for OpenVidu Web Component. You don't have to manipulate this file.
-   `app.js`: sample application main JavaScript file.
-   `index.html`: HTML code of the application.

Let's see how OpenVidu Web Component works:

---

#### index.html

Inside of the `head` section of `index.html`, we reference our `app.js` script and `openvidu-webcomponent` files:

```html
<head>

    <!--... other imports ...-->

    <script src="app.js"></script>
    <script src='openvidu-webcomponent-{VERSION}.js'></script>
    <link rel="stylesheet" href="openvidu-webcomponent-{VERSION}.css">
</head>
```

As you can see, the `index.html` body has the form to connect to a video-session and the **OpenVidu Web Component**, which starts hidden:

```html
<body>

    <!-- Form to connect to a video-session -->
    <div id="main" style="text-align: center;">
        <h1>Join a video session</h1>
        <form onsubmit="joinSession(); return false" style="padding: 80px; margin: auto">
            <p>
                <label>Session:</label>
                <input type="text" id="sessionName" value="SessionA" required>
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

    <!-- OpenVidu Web Component -->
    <openvidu-webcomponent style="display: none;"></openvidu-webcomponent>

</body>
```

---

#### app.js (I): OpenVidu Web Component events

OpenVidu Web Component emits events _`joinSession`_, _`leaveSession`_ or _`error`_, so we can handle them in our JavaScript code.
We just need to get the element once the document is ready and add all the listeners we want:

```javascript
$(document).ready(() => {
    var webComponent = document.querySelector('openvidu-webcomponent');

    webComponent.addEventListener('joinSession', (event) => {
        // Do something
    });
    webComponent.addEventListener('leaveSession', (event) => {
        // Do something
    });
    webComponent.addEventListener('error', (event) => {
        // Do something
    });
});
```

In this tutorial, we just alternate the view between the form and the web component, hiding or showing them when receiving `joinSession` or `leaveSession` events.

---

#### app.js (II): Configuring OpenVidu Web Component

##### Session Configuration

Method `joinSession()` gets:

 - The form input values, with the video-call to connect and the nickname the user will have in it.
 - The `tokens` from OpenVidu Server. Check out [next point](#get-a-token-from-openvidu-server) to see how this is done.

When we have our tokens available, the only thing left to do is to give the desired configuration to openvidu-webcomponent. To do so we use an object with three parameters: `sessionName`, `user` and  `tokens`.

- `sessionName`: the session name that will be displayed inside the component
- `user`: the nickname that the user will have in the session
- `tokens`: the retrieved tokens from OpenVidu Server

However, if we give the *openvidu-url* and *openvidu-secret*, the webcomponent will build the token for us.

```javascript
function joinSession() {
    var sessionName = document.getElementById('sessionName').value;
    var user = document.getElementById('user').value;
    var tokens = [];
    var form = document.getElementById('main');
    var webComponent = document.querySelector('openvidu-webcomponent');
   
    form.style.display = 'none';
    webComponent.style.display = 'block';

    if(webComponent.getAttribute("openvidu-secret") != undefined && webComponent.getAttribute("openvidu-server-url") != undefined ){
        location.reload();
    }else {
        getToken(sessionName).then((token1) => {
            tokens.push(token1);
            getToken(sessionName).then((token2) => {
                tokens.push(token2);
                webComponent.sessionConfig = { sessionName, user, tokens };
            });    
        });
    }
}
```

That's it. Once you configure the token into the webcomponent, it will automatically join the proper session (`joinSession` event will be dispatched so you can update your web). The user will see in the webcomponent all other users joined to the same session and will publish the webcam. You have a video-call working!

##### Interface Configuration

Optionally, you can add an extra JSON param inside of **webcomponent.sessionConfig** object named `ovSettings`. This parameter allows you to set up an extra custom interface. We have the choice to enabling or disabling the chat and each of the toolbar buttons. Besides, openvidu-webcomponent allows you configure your **camera** and **audio device**, your **avatar** and your **nickname** before join to the room. To do that, you only have to set `autopublish` property to `false`.

To do that, is necessary to declare the following **ovSettings** variable:  

```javascript
var ovSettings = {
  chat: true,
  autopublish: true,
  toolbarButtons: {
    audio: true,
    video: true,
    screenShare: true,
    fullscreen: true,
    exit: true,
  }
};
```

and add it inside of **webcomponent.sessionConfig** object: 

```javascript
webComponent.sessionConfig = { sessionName, user, token, ovSettings };
```


<div class="row no-margin row-gallery">
	<div class="col-md-6">
		<a data-fancybox="gallery" href="img/demos/ov-webcomponent3.png">
		<img class="img-responsive" src="img/demos/ov-webcomponent3.png">
	</a>
	</div>
	<div class="col-md-6">
		<a data-fancybox="gallery" href="img/demos/ov-webcomponent4.png">
		<img class="img-responsive" src="img/demos/ov-webcomponent4.png">
	</a>
	</div>
</div>

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
	<strong>WARNING</strong>: This makes this tutorial an insecure application. We need to ask OpenVidu Server for a user token in order to connect to our session. <strong>This process should entirely take place in our server-side</strong>, not in our client-side. But due to the lack of an application backend in this tutorial, the JavaScript code itself will perform the POST operations to OpenVidu Server
</div>
</div>

_The token must has inside of an array. If you want that the app allows the screen sharing you must include two differents tokens in the array. If you only add one, the app doesn't allow the screen sharing funcionality._


```javascript
getToken(sessionName).then((token) => {
    // Send the 'token' to OpenVidu web component
});
```

In a production environment we would perform this operations in our application backend, by making use of the _[API REST](reference-docs/REST-API/){:target="_blank"}_, _[OpenVidu Java Client](reference-docs/openvidu-java-client/){:target="_blank"}_ or _[OpenVidu Node Client](reference-docs/openvidu-node-client/){:target="_blank"}_. Here we have implemented the POST requests to OpenVidu Server in a method `getToken()` that returns a Promise with the token. Without going into too much detail, this method performs two _ajax_ requests to OpenVidu Server, passing OpenVidu Server secret to authenticate them:

-   First ajax request performs a POST to `/api/sessions` (we send a `customSessionId` field to name the session with our `sessionName` value retrieved from HTML input)
-   Second ajax request performs a POST to `/api/tokens` (we send a `session` field to assign the token to this same session)

You can inspect this method in detail in the [GitHub repo](https://github.com/OpenVidu/openvidu-tutorials/blob/master/openvidu-webcomponent/web/app.js#L44){:target="_blank"}.

<hr>

## Extra features of OpenVidu Web Component


#### Alternatives to connect to OpenVidu session

In the example above, **OpenVidu Web Component** receives the `sessionConfig` parameter dynamically like this: 

```javascript
webComponent.sessionConfig = { sessionId, user, token };
```

But you can also set them statically, for example if you are building your template in the backend:

```html
<openvidu-webcomponent session-config='{"sessionName":"SessionA", "user":"User1", "token": "[TOKEN_RETRIEVED_FROM_OPENVIDU_SERVER]"}'></openvidu-webcomponent>
```

Besides, openvidu-webcomponent allows you to add **ovSettings** parameter statically:

```html
<openvidu-webcomponent session-config='{"sessionName":"SessionA", "user":"User1",               "ovSettings": {"chat": true, "autopublish": true, "toolbarButtons": {"audio": true,
 "video": true, "screenShare": true, "fullscreen": true, "exit": true }}}'>
</openvidu-webcomponent>
```

And if you want to let the webcomponent get the token for you, you can just dispense with the token and provide two more attributes to it. This is only meant for developing purposes, as you need to hardcode the secret of your OpenVidu Server in the JavaScript code:

```html
<openvidu-webcomponent  openvidu-server-url="https://localhost:4443" openvidu-secret="MY_SECRET" session-config='{"sessionName":"SessionA", "user":"User1", "ovSettings": {"chat": true, "autopublish": true, "toolbarButtons": {"audio": true, "video":true, "screenShare": true, "fullscreen": true, "exit": true }}}'>
</openvidu-webcomponent>
```

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
	<strong>WARNING</strong>: As you can see, when you add parameters to OpenVidu web component statically, you have to replace the <strong>camelCase</strong> with a <strong>hyphen between words</strong>.
</div>
</div>

#### Close the session dynamically

You can also disconnect the user from the session assigning dynamically `undefined` to the **sessionConfig** property :

```javascript
ov.sessionConfig = undefined;
```

#### Choose a theme

OpenVidu  allows you to choose between two themes. By default, the theme selected is **dark theme** but if you prefer change it for a **light them**, you can add `theme="light"`

```html
<openvidu-webcomponent theme="light"></openvidu-webcomponent>
```

<div class="row no-margin row-gallery">
	<div class="col-md-6">
		<a data-fancybox="gallery" href="img/demos/ov-webcomponent5.png">
		    <img class="img-responsive" src="img/demos/ov-webcomponent5.png">
	    </a>
	</div>
    <div class="col-md-6">
		<a data-fancybox="gallery" href="img/demos/ov-webcomponent6.png">
		    <img class="img-responsive" src="img/demos/ov-webcomponent6.png">
	    </a>
	</div>
</div>


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


