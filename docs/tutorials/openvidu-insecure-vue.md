# openvidu-insecure-vue
<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-insecure-vue" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

A client-side only application built with **Vue.js** framework. This tutorial has been provided by [*@Ninjak*](https://github.com/Ninjak), We appreciate his collaboration from OpenVidu.

If it is the first time you use OpenVidu, it is highly recommended to start with **[openvidu-hello-world](tutorials/openvidu-hello-world/){:target="_blank"}** tutorial, as this app is no more than an extension of it with some new features and styles.

This is the Vue version of [openvidu-insecure-js](tutorials/openvidu-insecure-js/){:target="_blank"}. Try it if you plan to use Vue framework for your frontend.

## Understanding this tutorial

<p align="center">
  <img class="img-responsive" src="img/tutorials/openvidu-insecure-vue.png">
</p>

OpenVidu is composed by the three modules displayed on the image above in its insecure version.

- **openvidu-browser**: NPM package for your Vue app. It allows you to manage your video-calls straight away from your clients
- **openvidu-server**: Java application that controls Kurento Media Server
- **Kurento Media Server**: server that handles low level operations of media flow transmissions

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
	Tutorial's name includes "insecure" word because this application has no backend and therefore it has no control over the users. Typically you don't want such application in production environments. When you feel comfortable with the client-side of OpenVidu, add your own server or follow one of our super simple secure tutorials.
</div>
</div>

## Running this tutorial
<br>
<iframe style="display:block; margin: auto;" width="560" height="315" src="https://www.youtube.com/embed/2HdUV5AdSTg?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<br>

1) Clone the repo:

```bash
git clone https://github.com/OpenVidu/openvidu-tutorials.git -b v2.19.0
```

2) Run the tutorial:

```bash
cd openvidu-tutorials/openvidu-insecure-vue
npm install
npm run serve
```

3) OpenVidu Platform service must be up and running in your development machine. The easiest way is running this Docker container which wraps both of them (you will need [Docker CE](https://store.docker.com/search?type=edition&offering=community){:target="_blank"}):

```bash
# WARNING: this container is not suitable for production deployments of OpenVidu Platform
# Visit https://docs.openvidu.io/en/stable/deployment

docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-server-kms:2.19.0
```

4) Go to _[`http://localhost:8080`](http://localhost:8080){:target="_blank"}_ to test the app once the server is running. The first time you use the docker container, an alert message will suggest you accept the self-signed certificate of _openvidu-server_ when you first try to join a video-call.

> If you are using **Windows**, read this **[FAQ](troubleshooting/#3-i-am-using-windows-to-run-the-tutorials-develop-my-app-anything-i-should-know){:target="_blank"}** to properly run the tutorial

> To learn **some tips** to develop with OpenVidu, check this **[FAQ](troubleshooting/#2-any-tips-to-make-easier-the-development-of-my-app-with-openvidu){:target="_blank"}**

<div class="row no-margin row-gallery">
	<div class="col-md-6">
		<a data-fancybox="gallery" href="img/demos/insecure-join.png">
		<img class="img-responsive" src="img/demos/insecure-join.png">
	</a>
	</div>
	<div class="col-md-6">
		<a data-fancybox="gallery" href="img/demos/insecure-session.png">
		<img class="img-responsive" src="img/demos/insecure-session.png">
	</a>
	</div>
</div>

## Understanding the code

This is an Vue project, and therefore you will see lots of configuration files and other stuff that doesn't really matter to us. We will focus on the following files under `src/` folder:

- `App.vue`: defines *App*, main component of the app. It contains the functionalities for joining a video-call and for handling the video-calls themselves.
- `UserVideo.vue`: defines *UserVideo*, used to display every user video. It contains one *OvVideo*, the name of the user and also handles a click event to update the view of *App*.
- `OvVideo.vue`: defines *OvVideo*, which wraps the final HTML `<video>` that finally displays the media stream.

Let's see first how `App.vue` uses NPM package `openvidu-browser`:

---

#### We import the necessary objects from `openvidu-browser`:

```typescript
import { OpenVidu } from 'openvidu-browser';
```

---

####`App.vue` declares the following properties:

```typescript
// OpenVidu objects
OV: undefined,
session: undefined,
publisher: undefined, // Local
subscribers: [], // Remotes

// Join form
mySessionId: 'SessionA',
myUserName: 'Participant' + Math.floor(Math.random() * 100),

// Main video of the page, will be 'publisher' or one of the 'subscribers',
// updated by click event in UserVideoComponent children
mainStreamManager: undefined,
```

`OpenVidu` object will allow us to get a `Session` object, which is declared just after it. `publisher` StreamManager object will be our own local webcam stream and `subscribers` StreamManager array will store the active streams of other users in the video-call. Finally, `mySessionId` and `myUserName` params simply represent the video-call and your participant's nickname, as you will see in a moment.

---

#### Whenever a user clicks on the submit input defined in `App.vue` template, `joinSession()` method is called:

<br>

We first get an OpenVidu object and initialize a Session object with it.

```typescript
// --- 1) Get an OpenVidu object ---

this.OV = new OpenVidu();

// --- 2) Init a session ---

this.session = this.OV.initSession();
```

Then we subscribe to the Session events that interest us.

```typescript
// --- 3) Specify the actions when events take place in the session ---

// On every new Stream received...
this.session.on('streamCreated', ({ stream }) => {

    // Subscribe to the Stream to receive it. Second parameter is undefined
    // so OpenVidu doesn't create an HTML video by its own
    let subscriber = this.session.subscribe(stream, undefined);
    this.subscribers.push(subscriber);
});

// On every Stream destroyed...
this.session.on('streamDestroyed', (event: StreamEvent) => {

    // Remove the stream from 'subscribers' array
   const index = this.subscribers.indexOf(stream.streamManager, 0);
    if (index >= 0) {
        this.subscribers.splice(index, 1);
    }
});

// On every asynchronous exception...
this.session.on('exception', ({ exception }) => {
    console.warn(exception);
});
```

As we are using Vue framework, a good approach for managing the remote media streams is to loop across an array of them, feeding a common component with each `Subscriber` object and let it manage its video. This component will be our *UserVideo*. To do this, we need to store each new Subscriber we received in array `subscribers` (of the parent class `StreamManager`), and we must remove from it every deleted subscriber whenever it is necessary. To achieve this, we use the following events:

- `streamCreated`: for each new Stream received by the Session object, we subscribe to it and store the returned Subscriber object in our `subscribers` array. Method `session.subscribe` has *undefined* as second parameter so OpenVidu doesn't insert and HTML video element in the DOM on its own (we will use the video element contained in one of our child components). HTML template of *App* loops through `subscribers` array with an `v-for` directive, declaring a *UserVideo* for each subscriber. We feed them not really as `Subscriber` objects, but rather as their parent class `StreamManager`. This way we can reuse *UserVideo* to also display our `Publisher` object (that also inhertis from class StreamManager). `user-video` also declares the `click` event so we can update the main video player view when the user clicks on its Publisher or any Subscriber videos.

        <div id="video-container" class="col-md-6">
            <user-video :stream-manager="publisher" @click.native="updateMainVideoStreamManager(publisher)"/>
            <user-video v-for="sub in subscribers" :key="sub.stream.connection.connectionId" :stream-manager="sub" @click.native="updateMainVideoStreamManager(sub)"/>
        </div>

- `streamDestroyed`: for each Stream that has been destroyed from the Session object (which means a user has left the video-call), we remove the associated Subscriber from `subscribers` array, so Vue will automatically delete the required UserVideo from HTML. Each Stream object has a property `streamManager` that indicates which Subscriber or Publisher owns it (in the same way, each StreamManager object also has a reference to its Stream).

- `exception`: event triggered by Session object when an asynchronous unexpected error takes place on the server-side

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
	<strong>WARNING</strong>: This is why this tutorial is an insecure application. We need to ask OpenVidu Server for a user token in order to connect to our session. <strong>This process should entirely take place in our server-side</strong>, not in our client-side. But due to the lack of an application backend in this tutorial, the Vue front itself will perform the POST operations to OpenVidu Server
</div>
</div>

```typescript
// --- 4) Connect to the session with a valid user token ---

// 'getToken' method is simulating what your server-side should do.
// 'token' parameter should be retrieved and returned by your own backend
this.getToken().then(token => {
	// See next point to see how to connect to the session using 'token'
});
```

Now we need a token from OpenVidu Server. In a production environment we would perform this operations in our application backend, by making use of the _[REST API](reference-docs/REST-API/){:target="_blank"}_, _[OpenVidu Java Client](reference-docs/openvidu-java-client/){:target="_blank"}_ or _[OpenVidu Node Client](reference-docs/openvidu-node-client/){:target="_blank"}_. Here we have implemented the POST requests to OpenVidu Server in a method `getToken()` that returns a Promise with the token, using `axios` library. Without going into too much detail, this method performs two POST requests to OpenVidu Server, passing OpenVidu Server secret to authenticate them:

  - First request performs a POST to `/openvidu/api/sessions` (we send a `customSessionId` field to name the session with our `mySessionId` value retrieved from HTML input)
  - Second request performs a POST to `/openvidu/api/sessions/<sessionId>/connection` (the path requires the `sessionId` to assign the token to this same session)

You can inspect this method in detail in the [GitHub repo](https://github.com/OpenVidu/openvidu-tutorials/blob/8920cf2c4aa953a23688ae3e26d370165a955a35/openvidu-insecure-vue/src/App.vue#L155){:target="_blank"}.

---

#### Finally connect to the session and publish your webcam:

```typescript
 // --- 4) Connect to the session with a valid user token ---

// 'getToken' method is simulating what your server-side should do.
// 'token' parameter should be retrieved and returned by your own backend
this.getToken().then(token => {

    // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
    // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
    this.session.connect(token, { clientData: this.myUserName })
        .then(() => {

            // --- 5) Get your own camera stream ---

            // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
            // element: we will manage it on our own) and with the desired properties
            this.publisher = this.OV.initPublisher(undefined, {
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: undefined, // The source of video. If undefined default webcam
                publishAudio: true,     // Whether you want to start publishing with your audio unmuted or not
                publishVideo: true,     // Whether you want to start publishing with your video enabled or not
                resolution: '640x480',  // The resolution of your video
                frameRate: 30,          // The frame rate of your video
                insertMode: 'APPEND',   // How the video is inserted in the target element 'video-container'
                mirror: false           // Whether to mirror your local video or not
            });

            // --- 6) Publish your stream ---

            this.session.publish(publisher);

            // Set the main video in the page to display our webcam and store our Publisher
            this.mainStreamManager = publisher;
        })
        .catch(error => {
            console.log('There was an error connecting to the session:', error.code, error.message);
        });
});
```

In `session.connect` method first param is the recently retrieved user token. Second param is the value every user will receive in `event.stream.connection.data` property on `streamCreated` event (this value will be used by *UserVideo* to append the user's nickname to the his video). So in this case it is an object with a property "clientData" with value "myUserName", which is binded from HTML input `<input v-model="myUserName" class="form-control" type="text" required>` (filled by the user).

If the method succeeds, we proceed to publish our webcam to the session. To do so we get a `Publisher` object with the desired properties and publish it to the Session through `Session.publish()` method. The rest of users will receive our Stream object and will execute their `streamCreated` event. Finally we make the main video player (which is just another *UserVideo*) display the Publisher object by default. This is the HTML code that will display the main stream manager:

```html
<div id="main-video" class="col-md-6">
    <user-video :stream-manager="mainStreamManager"/>
</div>
```

And we store the Publisher under `this.publisher`, which is also of parent class `StreamManager`. This way our webcam will be appended along all remote subscribers, in exactly the same way they are shown (remember all of them are displayed by *UserVideo*):

```html
<div id="video-container" class="col-md-6">
    <user-video :stream-manager="publisher" @click.native="updateMainVideoStreamManager(publisher)"/>
</div>
```

You can see that every `<user-video>` component for our Publisher and every Subscriber also updates the main video player when clicking on it.

Last point worth considering is the implementation of *UserVideo* and *OvVideo*. Each *UserVideo* manages one StreamManager object (a Subscriber or a Publisher) that will be fed to its child component *OvVideo*. Its main task is not managing the final video player (that is *OvVideo* responsibility), but displaying custom information for each one of them (the user's nickname in this case):

```html
<div v-if="streamManager">
	<ov-video :stream-manager="streamManager"/>
	<div><p>{{ clientData }}</p></div>
</div>
```

```typescript
export default {
	name: 'UserVideo',

	components: {
		OvVideo,
	},

	props: {
		streamManager: Object,
	},

	computed: {
		clientData () {
			const { clientData } = this.getConnectionData();
			return clientData;
		},
	},

	methods: {
		getConnectionData () {
			const { connection } = this.streamManager.stream;
			return JSON.parse(connection.data);
		},
	},
};
```

*OvVideo* html template is just the video element:

```html
<video autoplay />
```

And the unique responsibility of the component's logic is letting OpenVidu know the exact HTML DOM video player associated to its StreamManger. To do so we use method `StreamManager.addVideoElement`, which receives a native HTML video element. The way we implement this is Vue hook: we get the video element with *this.$el* tag and we call the method once after the view has initialized (*mounted*) and once every time the StreamManager input changes

```typescript
export default {
	name: 'OvVideo',

	props: {
		streamManager: Object,
	},

	mounted () {
		this.streamManager.addVideoElement(this.$el);
	},
};
```

---

#### Leaving the session

Whenever we want a user to leave the session, we just need to call `session.disconnect` method in `App.vue`:

```typescript
  leaveSession() {

    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

    if (this.session) { this.session.disconnect(); };

    // Empty all properties...
    this.subscribers = [];
    delete this.publisher;
    delete this.session;
    delete this.OV;
  }
```
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
