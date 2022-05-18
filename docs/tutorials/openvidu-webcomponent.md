# openvidu-webcomponent

<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-webcomponent" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

OpenVidu Web Component is the simplest and quickest way to add videoconference capabilities to your existing web application. It brings many of the features of OpenVidu platform, making it very powerful.
With just a few lines of code you will have your first video call working!

## Running this tutorial
<br>
<iframe style="display:block; margin: auto;" width="560" height="315" src="https://www.youtube.com/embed/t8RhZUOraCQ?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<br>

1) Clone the repo:

```bash
git clone https://github.com/OpenVidu/openvidu-tutorials.git -b v2.22.0
```

2) You will need an http web server installed in your development computer to execute the tutorial. If you have _node.js_ installed, you can use [http-server](https://github.com/indexzero/http-server){:target="_blank"} to serve application files. It can be installed with:

```bash
npm install -g http-server
```

3) Run the tutorial:

```bash
http-server openvidu-tutorials/openvidu-webcomponent/web
```

4) OpenVidu Server must be up and running in your development machine. The easiest way is running this Docker container which wraps both of them (you will need [Docker CE](https://store.docker.com/search?type=edition&offering=community){:target="_blank"}):

```bash
# WARNING: this container is not suitable for production deployments of OpenVidu Platform
# Visit https://docs.openvidu.io/en/stable/deployment

docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-server-kms:2.22.0
```

5) Go to _[`http://localhost:8080`](http://localhost:8080){:target="_blank"}_ to test the app once the server is running. The first time you use the docker container, an alert message will suggest you accept the self-signed certificate of _openvidu-server_ when you first try to join a session.


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

> If you are using **Windows**, read this **[FAQ](troubleshooting/#3-i-am-using-windows-to-run-the-tutorials-develop-my-app-anything-i-should-know)** to properly run the tutorial

> To learn **some tips** to develop with OpenVidu, check this **[FAQ](troubleshooting/#2-any-tips-to-make-easier-the-development-of-my-app-with-openvidu)**

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
In this tutorial, we just alternate the view between the form and the web component, hiding or showing them depending on the Web Component events received. See next point for checking the details.

---

#### app.js (I): OpenVidu Web Component events


<!--
<div style="
    display: table;
    border: 2px solid #ffb600;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    background-color: #FFFBF1;
    margin-bottom: 25px;
    padding: 5px 0 5px 0;"><div style="display: table-cell; vertical-align: middle;">
    <i class="icon ion-android-alert" style="
    font-size: 50px;
    color: #ffb600;
    display: inline-block;
    padding-left: 25%;
"></i></div>
<div style="
    vertical-align: middle;
    display: table-cell;
    padding: 10px 20px;">
    <strong>NOTE</strong>: From 2.22.0 onwards the webcomponent api has been redefined and the previous ones are not available.
</div>
</div> -->

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
    var tokens = {webcam: await getToken(sessionName), screen: await getToken(sessionName)};

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

That's it. Once you configure the tokens into the webcomponent, it will automatically join the proper session ([onSessionCreated](/api/openvidu-angular/components/OpenviduWebComponentComponent.html#onSessionCreated) event will be dispatched so you can update your webapp).

You will be able to see the videconference working and every participant who connects to the same session will be displayed on it.

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

In a production environment we would perform this operations in our application backend, by making use of the _[REST API](reference-docs/REST-API/)_, _[OpenVidu Java Client](reference-docs/openvidu-java-client/)_ or _[OpenVidu Node Client](reference-docs/openvidu-node-client/)_. Here we have implemented the POST requests to OpenVidu Server in a method `getToken()` that returns a Promise with the token. Without going into too much detail, this method performs two _ajax_ requests to OpenVidu Server, passing OpenVidu Server secret to authenticate them:

-   First ajax request performs a POST to `/openvidu/api/sessions` (we send a `customSessionId` field to name the session with our `sessionName` value retrieved from HTML input)
-   Second ajax request performs a POST to `/openvidu/api/sessions/<sessionId>/connection` (the path requires the `sessionId` to assign the token to this same session)

You can inspect this method in detail in the [GitHub repo](https://github.com/OpenVidu/openvidu-tutorials/blob/master/openvidu-webcomponent/web/app.js#L44){:target="_blank"}.

<hr>


## Close the session dynamically

You can also disconnect the user from the session dynamically calling to **disconnect** method which the OpenVidu Webcomponent provides:

```javascript
webComponent.disconnect();
```

## OpenVidu Web Component Customization

#### UI Customization


<div class="row no-margin row-gallery">
	<div class="col-md-6">
		<a data-fancybox="gallery" href="img/demos/ov-webcomponent5.png">
		    <img class="img-responsive" src="img/demos/ov-webcomponent5.png">
	    </a>
	</div>
    <div class="col-md-6">
		<a data-fancybox="gallery" href="img/demos/ov-webcomponent4.png">
		    <img class="img-responsive" src="img/demos/ov-webcomponent4.png">
	    </a>
	</div>
</div>

In the tutorial above, **OpenVidu Web Component** receives the `participantName` parameter dynamically like this:

```javascript
webComponent.participantName = participantName;
```
In addition to this parameter, OpenVidu Web Component offers several other parameters for **customizing the UI** as you wish. You can see all the UI parameters [here](/api/openvidu-angular/components/OpenviduWebComponentComponent.html#inputs).

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
		<a data-fancybox="gallery" href="img/demos/ov-webcomponent7.png">
		    <img class="img-responsive" src="img/demos/ov-webcomponent7.png">
	    </a>
	</div>
    <div class="col-md-6">
		<a data-fancybox="gallery" href="img/demos/ov-webcomponent6.png">
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

With OpenVidu Web Component you will also be able to replace the OpenVidu branding logo with yours. You only have to go to `web/assets/images/` and add your custom logo file with the `logo.png` name.


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
