<h2 id="section-title">Ready-to-use component</h2>
<hr>

OpenVidu provides a **Web Component** that is the fastest and least impactful way to incorporate video conferencing capabilities to your application. It is extremely easy to add, although its customization is somewhat limited.

The Web Component is built directly from our flagship application [OpenVidu Call](https://openvidu.io/openvidu-call){:target="_blank"}, so all of its advanced features are available when using the Web Component.

> The _ready-to-use component_ is only one of the three strategies available to integrate OpenVidu in your application's client. You can take a look to sections [OpenVidu Components](components/) or [Full control of the UI](full-control-ui/) to explore the other alternatives.

The use of the OpenVidu Web Component is as simple as this:

```html
<html>
    <head>
        <script src='openvidu-webcomponent-{VERSION}.js'></script>
        <link rel="stylesheet" href="openvidu-webcomponent-{VERSION}.css">
    </head>
    <body>
        <openvidu-webcomponent></openvidu-webcomponent>
    </body>
</html>
```

The Web Component will not be visible at this point, as it needs a token to connect to a session. You can do that with JavaScript like this:

```javascript
window.onload = () => {
    var webComponent = document.querySelector('openvidu-webcomponent');
    webComponent.tokens = 'AN_OPENVIDU_TOKEN';
}
```

You can download the OpenVidu Web Component from the [GitHub Releases page](https://github.com/OpenVidu/openvidu/releases){:target="_blank"}, asset `openvidu-webcomponent-VERSION.zip`.

This is just a very simplified snippet on how to add OpenVidu Web Component to your application. Check out the tutorial below to see a real example and all the customizations offered by the Web Component.

<br>

---

## Tutorial

<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-webcomponent" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

### Running this tutorial

To run the tutorial you need the three components stated in [OpenVidu application architecture](developing-your-video-app/#openvidu-application-architecture): an OpenVidu deployment, your server application and your client application. In this order:

#### 1. Run OpenVidu deployment

Using [Docker Engine](https://docs.docker.com/engine/){:target="_blank"}:

```bash
# WARNING: this container is not suitable for production deployments of OpenVidu
# Visit https://docs.openvidu.io/en/stable/deployment

docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-dev:2.27.0
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
http-server openvidu-tutorials/openvidu-webcomponent/web
```

Go to [`http://localhost:8080`](http://localhost:8080){:target="_blank"} to test the app once the server is running.

<div class="row no-margin row-gallery">
	<div class="col-md-6">
		<a data-fancybox="gallery1" data-type="image" href="img/demos/ov-webcomponent2.png" class="fancybox-img">
            <img class="img-responsive" src="img/demos/ov-webcomponent2.png">
        </a>
	</div>
	<div class="col-md-6">
		<a data-fancybox="gallery1" data-type="image" href="img/demos/ov-webcomponent1.png" class="fancybox-img">
            <img class="img-responsive" src="img/demos/ov-webcomponent1.png">
        </a>
	</div>
</div>

> To test the application with other devices in your network, visit this **[FAQ](troubleshooting/#3-test-applications-in-my-network-with-multiple-devices)**

### Understanding the code

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
In this tutorial, we just alternate the view between the form and the web component, hiding or showing them depending on the Web Component events received. See next point for checking the details.

---

#### app.js (I): OpenVidu Web Component events

The OpenVidu Web Component offers several events you can handle them in our JavaScript code.
As the OpenVidu Web Component is created from the [_**openvidu-angular**_](reference-docs/openvidu-angular/) library, you can see all events [here](api/openvidu-angular/components/OpenviduWebComponentComponent.html#outputs).

We just need to get the element once the document is ready and add all the listeners we want:

```javascript
$(document).ready(() => {
    var webComponent = document.querySelector('openvidu-webcomponent');

    webComponent.addEventListener('onSessionCreated', (event) => {
         var session = event.detail;
     });
    webComponent.addEventListener('onJoinButtonClicked', (event) => {});
    webComponent.addEventListener('onToolbarLeaveButtonClicked', (event) => {});
    webComponent.addEventListener('onToolbarCameraButtonClicked', (event) => {});
    webComponent.addEventListener('onToolbarMicrophoneButtonClicked', (event) => {});
    webComponent.addEventListener('onToolbarScreenshareButtonClicked', (event) => {});
    webComponent.addEventListener('onToolbarParticipantsPanelButtonClicked', (event) => {});
    webComponent.addEventListener('onToolbarChatPanelButtonClicked', (event) => {});
    webComponent.addEventListener('onToolbarFullscreenButtonClicked', (event) => {});
    webComponent.addEventListener('onParticipantCreated', (event) => {});
});
```
We should mention that the `onSessionCreated` is returning the openvidu-browser [Session](api/openvidu-browser/classes/Session.html) object so we will be able to use `session` in the same way as if we used **openvidu-browser** directly, and of course use <span><a href="api/openvidu-browser">openvidu-browser API</a></span>.
<br>

---

#### app.js (II): Configuring OpenVidu Web Component

The **joinSession** method is invoked after clicking on the our webapp _join_ button. The main logic that it handles is the following:

 - Get the form input values, with the videoconference to connect and the nickname the user will have in it.
 - Get the two `tokens` from OpenVidu Server. Check out [next point](#get-a-token-from-openvidu-server) to see how this is done.

The tokens are the only parameter that the webcomponent needs. Once we have our tokens ready, we set them to the webcomponent.

We also have assigned a **participantName** for displaying our name in the videoconference. In addition, there are several optional parameters that we can set up for **customizing the UI**. Check them [here](#ui-customization).


```javascript
async function joinSession() {
    //Getting form inputvalue
    var sessionName = document.getElementById('sessionName').value;
    var participantName = document.getElementById('user').value;

    // Requesting tokens
    var promiseResults = await Promise.all([getToken(sessionName), getToken(sessionName)]);
    var tokens = {webcam: promiseResults[0], screen: promiseResults[1]};

    //Getting the webcomponent element
    var webComponent = document.querySelector('openvidu-webcomponent');

    hideForm();

    // Displaying webcomponent
    webComponent.style.display = 'block';

    // Setting up our name and tokens
    webComponent.participantName = participantName;
    webComponent.tokens = tokens;
}
```

That's it. Once you configure the tokens into the webcomponent, it will automatically join the proper session ([onSessionCreated](api/openvidu-angular/components/OpenviduWebComponentComponent.html#onSessionCreated) event will be dispatched so you can update your webapp).

You will be able to see the videconference working and every participant who connects to the same session will be displayed on it.

---

#### Get an OpenVidu token

We ask for the tokens to the [server application](application-server/). The server application will in turn request tokens to the OpenVidu deployment. If you have any doubts about this process, review the [Basic Concepts](developing-your-video-app/#basic-concepts).

Variable `sessionName` is the OpenVidu Session we want a token from.

```javascript
// Requesting tokens
var promiseResults = await Promise.all([getToken(sessionName), getToken(sessionName)]);
var tokens = { webcam: promiseResults[0], screen: promiseResults[1] };
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

> As you can see in the code snippet, the tokens must be placed in an object like this: `{ webcam: TOKEN1, screen: TOKEN2 }`

> If you don't include a second token in property `screen`, the app won't allow screen sharing for that user. If you want to allow streaming both the webcam and the screen, you will need to get two different tokens for the user (this is the default behavior of the tutorial).

<br>

---

### Close the session dynamically

You can also disconnect the user from the session dynamically calling to **disconnect** method which the OpenVidu Webcomponent provides:

```javascript
webComponent.disconnect();
```

### OpenVidu Web Component Customization

#### UI Customization


<div class="row no-margin row-gallery">
	<div class="col-md-6">
		<a data-fancybox="gallery2" data-type="image" class="fancybox-img" href="img/demos/ov-webcomponent5.png">
		    <img class="img-responsive" src="img/demos/ov-webcomponent5.png">
	    </a>
	</div>
    <div class="col-md-6">
		<a data-fancybox="gallery2" data-type="image" class="fancybox-img" href="img/demos/ov-webcomponent4.png">
		    <img class="img-responsive" src="img/demos/ov-webcomponent4.png">
	    </a>
	</div>
</div>

In the tutorial above, **OpenVidu Web Component** receives the `participantName` parameter dynamically like this:

```javascript
webComponent.participantName = participantName;
```
In addition to this parameter, OpenVidu Web Component offers several other parameters for **customizing the UI** as you wish. You can see all the UI parameters [here](api/openvidu-angular/components/OpenviduWebComponentComponent.html#inputs).

Here are some **examples**:

```javascript
// Hide the prejoin page
webComponent.prejoin = false;

// Hide the fullscreen button
webComponent.toolbarFullscreenButton = false;

// Hide the branding logo
webComponent.toolbarDisplayLogo = false;
```

You can also set them statically, for example if you are building your template in the backend:

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
	<strong>WARNING</strong>: As you can see, when you add parameters to OpenVidu Web Component statically, you have to replace the <strong>camelCase</strong> with a <strong>hyphen between words</strong>.
</div>
</div>

```html
<openvidu-webcomponent
    tokens="TOKEN_RETRIEVED_FROM_OPENVIDU_SERVER"
    prejoin="false"
    toolbar-fullscreen-button="false"
    toolbar-display-logo="false"
    >
</openvidu-webcomponent>
```

#### Styles Customization

The OpenVidu Web Component also allows you to **customize the styles** to your liking.

<div class="row no-margin row-gallery">
	<div class="col-md-6">
		<a data-fancybox="gallery3" data-type="image" class="fancybox-img" href="img/demos/ov-webcomponent7.png">
		    <img class="img-responsive" src="img/demos/ov-webcomponent7.png">
	    </a>
	</div>
    <div class="col-md-6">
		<a data-fancybox="gallery3" data-type="image" class="fancybox-img" href="img/demos/ov-webcomponent6.png">
		    <img class="img-responsive" src="img/demos/ov-webcomponent6.png">
	    </a>
	</div>
</div>

You can update the css styles which you can find [here](https://github.com/OpenVidu/openvidu-tutorials/blob/master/openvidu-webcomponent/web/app.css).

```css
:root {
  --ov-primary-color: #303030;
  --ov-secondary-color: #3e3f3f;
  --ov-tertiary-color: #598eff;
  --ov-warn-color: #EB5144;
  --ov-accent-color: #ffae35;
  --ov-light-color: #e6e6e6;

  --ov-logo-background-color: #3e3f3f;
  --ov-text-color: #ffffff;

  --ov-panel-text-color: #1d1d1d;
  --ov-panel-background: #ffffff;

  --ov-buttons-radius: 50%;
  --ov-leave-button-radius: 10px;
  --ov-video-radius: 5px;
  --ov-panel-radius: 5px;
}
```

#### Change the OpenVidu logo

With OpenVidu Web Component you can also replace the OpenVidu branding logo with your custom onw. You just have to add into folder `web/assets/images/` your custom logo file with name `logo.png`.

#### Change the virtual backgrounds

With OpenVidu Web Component you can also replace the virtual backgrounds with your custom ones. You just have to add into folder `web/assets/backgrounds/` your custom backgrounds files with name `bg-1.png`, `bg-2.png`, `bg-3.png` etc. You can add up to 19 backgrounds.


<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js"></script>
<script type='text/javascript' src='js/fancybox-setup.js'></script>
