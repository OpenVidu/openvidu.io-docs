# openvidu-electron
<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-electron" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

A client-side only application built with **Electron**. It can be compiled into a native desktop application for **Windows**, **OSX** and **Linux**. It includes [electron-forge](https://www.electronforge.io/){:target="_blank"} as a dependency so the compilation process is as simple as running a single command: `npm run make`

If it is the first time you use OpenVidu, it is highly recommended to start first with **[openvidu-hello-world](/tutorials/openvidu-hello-world/){:target="_blank"}** tutorial due to this being an Electron app and being a little more complex for OpenVidu starters.

## Understanding this tutorial

<p align="center">
  <img class="img-responsive" src="/img/tutorials/openvidu-electron.png">
</p>

OpenVidu is composed by the three modules displayed on the image above.

- **openvidu-browser**: JavaScript library for your Electron app. It allows you to manage your video-calls straight away from your clients
- **openvidu-server**: Java application that controls Kurento Media Server
- **Kurento Media Server**: server that handles low level operations of media flow transmissions

## Running this tutorial

1) You will need **Node** and **NPM**. Install them with the following commands

```bash
sudo curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -
sudo apt-get install -y nodejs
```

2) Clone the repo

```bash
git clone https://github.com/OpenVidu/openvidu-tutorials
```

3) Install dependencies and run the tutorial

```bash
cd openvidu-tutorials/openvidu-electron
npm install
npm start
```

4) _openvidu-server_ and _Kurento Media Server_ must be up and running in your development machine. The easiest way is running this Docker container which wraps both of them (you will need [Docker CE](https://store.docker.com/search?type=edition&offering=community){:target="_blank"}):

```bash
docker run -p 4443:4443 --rm -e openvidu.secret=MY_SECRET openvidu/openvidu-server-kms:2.11.0
```

5) The app will start automatically as a native desktop application, regardless of the OS you are using. If you are on Windows, it will launch as a Windows app. In OSX as an OSX app, and in Linux as a Linux app.

<br>

> If you are using **Windows**, read this **[FAQ](/troubleshooting/#3-i-am-using-windows-to-run-the-tutorials-develop-my-app-anything-i-should-know){:target="_blank"}** to properly run the tutorial

## Understanding the code

As an Electron app, the project has a `main.js` file that serves as entry point. It has not been modified at all, so it remains the same as it is by default in the [electron-quick-start](https://github.com/electron/electron-quick-start){:target="_blank"} example. Most important files are the following ones:

- `openvidu-browser-VERSION.js`: openvidu-browser library. You don't have to manipulate this file.
- `axios.min.js`: library for making HTTP requests from the app. You don't have to manipulate this file.
- `modal.html`: this is the dialog for selecting the screen to share if the user wants to do so.
- `app.js`: sample application main JavaScript file, which makes use of _openvidu-browser-VERSION.js_.
- `style.css`: some CSS classes to style the app.
- `index.html`: HTML code for the form to connect to a video-call and for the video-call itself. It has links to 3 JavaScript files:

<pre class="html-scripts">
  <code>&lt;script src="openvidu-browser-VERSION.js"&gt;&lt;/script&gt;
&lt;script src="axios.min.js"&gt;&lt;/script&gt;
&lt;script src="app.js"&gt;&lt;/script&gt;</code>
</pre>

We have implemented screen-sharing capabilities in this application because the process is slightly different from the rest of platforms that support it. Electron does not provide a default screen selector dialog, so we must implement it ourselves (that is the purpose of `modal.html` file). You can check out this feature in the last section [Screen sharing](#screen-sharing).

Let's see first how `app.js` uses `openvidu-browser-VERSION.js`:

---

#### First lines declare the variables that will be needed in different points along the code

```javascript
const ipcRenderer = require('electron').ipcRenderer;
const BrowserWindow = require('electron').remote.BrowserWindow;

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
function joinSession() {

    session = openvidu.initSession();
    session.on("streamCreated", function (event) {
        session.subscribe(event.stream, "subscriber");
    });
```

Once we have our Publisher properly initialized, we continue by creating a Session object. We do so with `openvidu.initSession` method. We then have to configure our session to listen to `streamCreated` events, so we are able to subscribe to other user media streams when they publish.

---

#### Get a _token_ from OpenVidu Server

We are ready to join the session. But we still need an OpenVidu token, so we must ask for it to openvidu-server. We use `axios.min.js` library to do so.

```javascript
getToken(mySessionId).then(token => {
  // See next point to see how to connect to the session using 'token'
});
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
	<strong>WARNING</strong>: This is why this tutorial is an insecure application. We need to ask OpenVidu Server for a user token in order to connect to our session. <strong>This process should entirely take place in our server-side</strong>, not in our client-side. But due to the lack of an application backend in this tutorial, the JavaScript code itself will perform the POST operations to OpenVidu Server
</div>
</div>

In a production environment we would perform this operations in our application backend, by making use of the _[REST API](/reference-docs/REST-API/){:target="_blank"}_, _[OpenVidu Java Client](/reference-docs/openvidu-java-client/){:target="_blank"}_ or _[OpenVidu Node Client](/reference-docs/openvidu-node-client/){:target="_blank"}_. Here we have implemented the POST requests to OpenVidu Server in a method `getToken()` that returns a Promise with the token. Without going into too much detail, this method performs two _ajax_ requests to OpenVidu Server, passing OpenVidu Server secret to authenticate them:

  - First HTTP request performs a POST to `/api/sessions` (we send a `customSessionId` field to name the session with our `mySessionId` value retrieved from HTML input)
  - Second ajax request performs a POST to `/api/tokens` (we send a `session` field to assign the token to this same session)

You can inspect this method in detail in the [GitHub repo](https://github.com/OpenVidu/openvidu-tutorials/blob/master/openvidu-electron/src/app.js#L102){:target="_blank"}.

---

#### Connect to the session using the token

```javascript
getToken(mySessionId).then(token => {
  session.connect(token)
    .then(() => {
        showSession();
        session.publish(publisher);
    })
    .catch(error => {
        console.log("There was an error connecting to the session:", error.code, error.message);
    });
});
```

We simply need to call `session.connect` passing the recently retrieved token from OpenVidu Server. This method returns a Promise to which you can subscribe to.

In case of success we first set the view to the active video session. Then we proceed to publish our previously created Publisher by calling `session.publish`. At this point the rest of users connected to this session will trigger their own `streamCreated` event and can start watching our media stream.

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

The process to screen-share is slightly different from the rest of platforms that support it. Electron does not provide a default screen selector dialog as browsers do, so we must implement it ourselves (that is the purpose of `modal.html` file). We need a screen unique identifier to initialize our Publisher object like this:

```javascript
OpenVidu.initPublisher({videoSource: "screen:" + SCREEN_ID});
// While in other platforms is simply {videoSource: "screen"},
// which triggers the screen selector dialog of the browser
```

First of all, we must be able to communicate different windows of the application, because in this case the screen selector dialog will be a completely separate window. But of course you could implement it in the same main window of your app, that's up to you.

In `main.js` we import `ipcMain` from Electron and configure it to listen to `screen-share-selected` event. Upon this event it will notify our app with other event (`screen-share-ready`), passing the same message received from the sender.

```javascript
const {
  app,
  BrowserWindow,
  ipcMain
} = require('electron');

// ...

ipcMain.on('screen-share-selected', (event, message) => {
  mainWindow.webContents.send('screen-share-ready', message);
});
```

In `app.js` file, where all our logic lies, we import `ipcRenderer` and configure it to listen to `screen-share-ready` event, sent from our `main.js` file as shown above. At this point we have the necessary parameter to initialize our Publisher:

```javascript
ipcRenderer.on('screen-share-ready', (event, message) => {
  // User has chosen a screen to share. screenId is message parameter
  showSession();
  publisher = openvidu.initPublisher("publisher", {
    videoSource: "screen:" + message
  });
  joinSession();
});
```

So, where's the code that initiates this whole event process? That is `modal.html` file. This HTML view will be launched by `app.js` file in method `initPublisher` if the user has checked the screen-sharing checkbox. Method `openScreenShareModal` will be called then:

```javascript
function openScreenShareModal() {
    let win = new BrowserWindow({
        parent: require('electron').remote.getCurrentWindow(),
        modal: true,
        minimizable: false,
        maximizable: false,
        webPreferences: {
            nodeIntegration: true
        },
        resizable: false
    })
    win.setMenu(null);
    // win.webContents.openDevTools();

    var theUrl = 'file://' + __dirname + '/modal.html'
    win.loadURL(theUrl);
}
```

This code will launch `modal.html` template in a child window. In this file we use Electron API `desktopCapturer` to list and present all available screens. The user is able to select any of them and by clicking button "Share" the selected screen id will be sent as an event `screen-share-selected` just before closing this child window, by making use of the same `ipcRenderer` object as `app.js` do.

```javascript
var availableScreens = [];
var htmlElements = [];
var selectedElement;

const {
  desktopCapturer
} = require('electron')

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
