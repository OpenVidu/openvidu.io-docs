# openvidu-electron
<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-electron" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

An OpenVidu application built with **Electron**. It can be compiled into a native desktop application for **Windows**, **OSX** and **Linux**. It includes [electron-forge](https://www.electronforge.io/){:target="_blank"} as a dependency so the compilation process is as simple as running a single command: `npm run make`

<div class="row">
    <div class="pro-gallery" style="margin: 20px 0 15px 0">
        <a data-fancybox="gallery-pro1" data-type="image" class="fancybox-img" href="img/tutorials/openvidu-electron.png">
          <img class="img-responsive" style="margin: auto; max-height: 500px" src="img/tutorials/openvidu-electron.png"/>
        </a>
    </div>
</div>

> If it is the first time you use OpenVidu, it is highly recommended to start with [openvidu-hello-world](tutorials/openvidu-hello-world/) tutorial, as this app is no more than an extension of it with some new features and styles.

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

You need [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm){:target="_blank"} to serve the application. Check it with the following command:

```bash
npm -v
```

To serve the tutorial:

```bash
# Using the same repository openvidu-tutorials from step 2

cd openvidu-tutorials/openvidu-electron
npm install
npm start
```

The app will start automatically as a native desktop application, regardless of the OS you are using. If you are on Windows, it will launch as a Windows app. In OSX as an OSX app, and in Linux as a Linux app.

> To test the application with other devices in your network, visit this **[FAQ](troubleshooting/#3-test-applications-in-my-network-with-multiple-devices)**

<div class="row no-margin row-gallery">
	<div class="col-md-6">
		<a data-fancybox="gallery" data-type="image" class="fancybox-img" href="img/demos/openvidu-electron.png">
            <img class="img-responsive" src="img/demos/openvidu-electron.png">
        </a>
	</div>
	<div class="col-md-6">
		<a data-fancybox="gallery" data-type="image" class="fancybox-img" href="img/demos/openvidu-electron2.png">
            <img class="img-responsive" src="img/demos/openvidu-electron2.png">
        </a>
	</div>
</div>

## Understanding the code

As an Electron app, the project has a `main.js` file that serves as entry point. It has been barely modified at all, so it remains basically the same as it is by default in the [electron-quick-start](https://github.com/electron/electron-quick-start){:target="_blank"} example. Most important files are the following ones:

- `main.js`: Electron entrypoint JavaScript file.
- `index.html`: HTML code for the form to connect to a video-call and for the video-call itself. It links to `index.js` and `style.css` files.
- `index.js`: sample application main JavaScript file, which makes use of _openvidu-browser.js_ SDK.
- `style.css`: some CSS classes to style the app.
- `modal.html`: this is the dialog for selecting the screen to share if the user wants to do so.

We have implemented screen-sharing capabilities in this application because the process is slightly different from the rest of platforms that support it. Electron does not provide a default screen selector dialog, so we must implement it ourselves (that is the purpose of `modal.html` file). You can check out this feature in the last section [Screen sharing](#screen-sharing).

Let's see first how `index.js` uses `openvidu-browser.js` SDK:

---

#### First lines make the necessary imports and declare global variables

```javascript
const ipcRenderer = require('electron').ipcRenderer;
const { BrowserWindow } = require('@electron/remote');

const { OpenVidu } = require('openvidu-browser');
const axios = require('axios');

var openvidu;
var session;
var publisher;
var mySessionId;
```

Constants `ipcRenderer` and `BrowserWindow` are Electron objects we will need for our screen selector dialog.

`openvidu` will be our OpenVidu object (entry point to the library). `session` will be the video-call we will connect to. `publisher` will be our media stream to publish to the session, and finally `mySessionId` simply identifies the session to connect to.

---

#### Initialize a publisher

```javascript
function initPublisher() {

    openvidu = new OpenVidu();

    const shareScreen = document.getElementById("screen-sharing").checked;
    if (shareScreen) {
        openScreenShareModal();
    } else {
        publisher = openvidu.initPublisher("publisher");
        joinSession();
    }
}
```

We will first initialize a Publisher before connecting to the session. If the user hasn't checked the screen sharing checkbox, we simply call `openvidu.initPublisher` indicating that we want openvidu-browser to insert our local video inside HTML element with id `publisher`. Then we proceed to join to the session.

If you want to see how to initialize a screen sharing Publisher instead of the webcam, go to section [Screen sharing](#screen-sharing)

---

#### Initialize the session

```javascript
async function joinSession() {

    session = openvidu.initSession();
    session.on("streamCreated", function (event) {
        session.subscribe(event.stream, "subscriber");
    });
```

Once we have our Publisher properly initialized, we continue by creating a Session object. We do so with `openvidu.initSession` method. We then have to configure our session to listen to `streamCreated` events, so we are able to subscribe to other user media streams when they publish.

> You can take a look at all the events in the [Reference Documentation](api/openvidu-browser/classes/Event.html)

---

#### Get an OpenVidu token

We are ready to join the session. But we still need a token to get access to it, so we ask for it to the [server application](application-server/). The server application will in turn request a token to the OpenVidu deployment. If you have any doubts about this process, review the [Basic Concepts](developing-your-video-app/#basic-concepts).

Variable `mySessionId` is the OpenVidu Session we want a token from.

```javascript
mySessionId = document.getElementById("sessionId").value;

const token = await getToken(mySessionId);
```

This is the piece of code in charge of finally retrieving a token from the application server. The tutorial uses `axios` library to perform the necessary [HTTP requests](application-server/#rest-endpoints).

```javascript
var APPLICATION_SERVER_URL = 'http://localhost:5000/';

async function getToken(mySessionId) {
    const sessionId = await createSession(mySessionId);
    return await createToken(sessionId);
}

async function createSession(sessionId) {
    const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions', { customSessionId: sessionId }, {
        headers: { 'Content-Type': 'application/json', },
    });
    return response.data; // The sessionId
}

async function createToken(sessionId) {
    const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections', {}, {
        headers: { 'Content-Type': 'application/json', },
    });
    return response.data; // The token
}
```

---

#### Connect to the session using the token

```javascript
await session.connect(token, { clientData: 'OpenVidu Electron' });
showSession();
session.publish(publisher);
```

We simply need to call `session.connect` passing the recently retrieved OpenVidu Token. In this case we wait for the method to successfully complete before performing the last two actions: setting the view to the active video session and publishing our previously created Publisher by calling `session.publish`.

At this point the rest of users connected to this session will trigger their own `streamCreated` event and will be able to subscribe to our media stream.

---

#### Leaving the session

```javascript
function leaveSession() {
    session.disconnect();
    hideSession();
}
```

Whenever we want a user to leave the session, we just need to call `session.disconnect` method. Here it will be called inside _leaveSession_ function, triggered when the user clicks on "LEAVE" button. This function also returns the page to the "Join a video session" view.

---

#### Screen sharing

The process to screen-share is slightly different from the rest of platforms that support it. Electron does not provide a default screen selector dialog as browsers do, so we must implement it ourselves (that is the purpose of `modal.html` file). We need a screen unique identifier to initialize our publisher object like this:

```javascript
OpenVidu.initPublisher({videoSource: "screen:" + SCREEN_ID});
// While in other platforms is simply {videoSource: "screen"},
// which triggers the screen selector dialog of the browser
```

First of all, we must be able to communicate different windows of the application, because in this case the screen selector dialog will be a completely separate window. But of course you could implement it in the same main window of your app, that's up to you.

In `main.js` we import `ipcMain` from Electron and configure it to listen to `screen-share-selected` event. Upon this event it will notify our app with other event (`screen-share-ready`), passing the same message received from the sender.

```javascript
const { app, BrowserWindow, ipcMain } = require('electron')

// ...

ipcMain.on('screen-share-selected', (event, message) => {
  mainWindow.webContents.send('screen-share-ready', message);
});
```

In `index.js` file (where all our logic is found) we import `ipcRenderer` and configure it to listen to `screen-share-ready` event, sent from our `main.js` file as shown above. At this point we would have the necessary parameter to initialize our publisher and join the session.

```javascript
ipcRenderer.on('screen-share-ready', (event, message) => {
  if (!!message) {
      // User has chosen a screen to share. screenId is message parameter
      showSession();
      publisher = openvidu.initPublisher("publisher", {
          videoSource: "screen:" + message
      });
      joinSession();
  }
});
```

So, where's the code that initiates this whole event process? That is `modal.html` file. This HTML view will be launched by `index.js` file in method `initPublisher` if the user has checked the screen-sharing checkbox. Method `openScreenShareModal` launches `modal.html` template in a child window:

```javascript
function openScreenShareModal() {
    let win = new BrowserWindow({
        parent: require('@electron/remote').getCurrentWindow(),
        modal: true,
        minimizable: false,
        maximizable: false,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false
        },
        resizable: false
    });
    require("@electron/remote").require("@electron/remote/main").enable(win.webContents);

    win.setMenu(null);
    // win.webContents.openDevTools();

    var theUrl = 'file://' + __dirname + '/modal.html'
    win.loadURL(theUrl);
}
```

In `modal.html` file we use Electron API `desktopCapturer` to list and present all available screens. The user is able to select any of them and by clicking button "Share" the selected screen id will be sent as an event `screen-share-selected` just before closing this child window, by making use of the same `ipcRenderer` API.

```javascript
var availableScreens = [];
var htmlElements = [];
var selectedElement;

const desktopCapturer = require('@electron/remote').desktopCapturer;
const ipcRenderer = require('electron').ipcRenderer;

// Call Electron API to list all available screens
desktopCapturer.getSources({
  types: ['window', 'screen']
}).then(async sources => {
  const list = document.getElementById("list-of-screens");
  sources.forEach(source => {
    // Add new element to the list with the thumbnail of the screen
    var el = document.createElement("div");
    el.onclick = () => {
      // Style the new selected screen and store it as the current selection
      htmlElements.forEach(e => {
        e.style.border = "none";
        e.style.background = "none";
      })
      el.style.border = "2px solid #0088aa";
      el.style.background = "rgba(0, 0, 0, 0.06)";
      selectedElement = el;
      document.getElementById("share-btn").disabled = false;
    }
    // Store the new source and the new created HTML element
    availableScreens.push(source);
    htmlElements.push(el);
    var img = document.createElement("img");
    var name = document.createElement("span");
    img.src = source.thumbnail.toDataURL();
    name.innerHTML = source.name;
    // Append new elements to the template
    el.appendChild(img);
    el.appendChild(name);
    list.appendChild(el);
  });
});

function sendScreenSelection() {
  ipcRenderer.send('screen-share-selected', availableScreens[htmlElements.indexOf(selectedElement)].id);
  closeWindow();
}
```

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js"></script>
<script type='text/javascript' src='js/fancybox-setup.js'></script>