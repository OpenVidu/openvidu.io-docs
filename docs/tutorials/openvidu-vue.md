# openvidu-vue
<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-vue" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

An OpenVidu application built with **Vue.js**.

<div class="row">
    <div class="pro-gallery" style="margin: 20px 0 15px 0">
        <a data-fancybox="gallery-pro1" data-type="image" class="fancybox-img" href="img/tutorials/openvidu-vue.png">
          <img class="img-responsive" style="margin: auto; max-height: 500px" src="img/tutorials/openvidu-vue.png"/>
        </a>
    </div>
</div>

> If it is the first time you use OpenVidu, it is highly recommended to start with [openvidu-hello-world](tutorials/openvidu-hello-world/) tutorial, as this app is no more than an extension of it with some new features and styles.

> openvidu-vue app is to all intents and purposes the same as [openvidu-js](tutorials/openvidu-js/) app, but using Vue.js framework instead of plain web technologies. Try openvidu-vue if you plan to use Vue.js framework in your frontend.

## Running this tutorial

To run the tutorial you need the three components stated in [OpenVidu application architecture](developing-your-video-app/#openvidu-application-architecture): an OpenVidu deployment, your server application and your client application. In this order:

#### 1. Run OpenVidu deployment

Using [Docker Engine](https://docs.docker.com/engine/){:target="_blank"}:

```bash
# WARNING: this container is not suitable for production deployments of OpenVidu
# Visit https://docs.openvidu.io/en/stable/deployment

docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-dev:2.25.0
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

cd openvidu-tutorials/openvidu-vue
npm install
npm run serve
```

Go to [`http://localhost:8080`](http://localhost:8080){:target="_blank"} to test the app once the server is running.

> To test the application with other devices in your network, visit this **[FAQ](troubleshooting/#3-test-applications-in-my-network-with-multiple-devices)**

<div class="row no-margin row-gallery">
	<div class="col-md-6">
		<a data-fancybox="gallery" data-type="image" class="fancybox-img" href="img/demos/insecure-join.png">
            <img class="img-responsive" src="img/demos/insecure-join.png">
        </a>
	</div>
	<div class="col-md-6">
		<a data-fancybox="gallery" data-type="image" class="fancybox-img" href="img/demos/insecure-session.png">
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

```javascript
import { OpenVidu } from 'openvidu-browser';
```

---

####`App.vue` declares the following properties:

```javascript
// OpenVidu objects
OV: undefined,
session: undefined,
mainStreamManager: undefined,
publisher: undefined,
subscribers: [],

// Join form
mySessionId: "SessionA",
myUserName: "Participant" + Math.floor(Math.random() * 100),
```

`OV` object will allow us to get a `session` object, which is declared just after it. `mainStreamManager` is the main video of the page, which will display the publisher or one of the subscribers. `publisher` StreamManager object will be our own local webcam stream and `subscribers` StreamManager array will store the active streams of other users in the video-call. Finally, `mySessionId` and `myUserName` params simply represent the video-call and your participant's nickname, as you will see in a moment.

---

#### Whenever a user clicks on the submit input defined in `App.vue` template, `joinSession()` method is called:

<br>

We first get an OpenVidu object and initialize a Session object with it.

```javascript
// --- 1) Get an OpenVidu object ---
this.OV = new OpenVidu();

// --- 2) Init a session ---
this.session = this.OV.initSession();
```

Then we subscribe to the Session events that interest us.

```javascript
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

> You can take a look at all the events in the [Reference Documentation](api/openvidu-browser/classes/Event.html)

---

#### Get an OpenVidu token

We are ready to join the session. But we still need a token to get access to it, so we ask for it to the [server application](application-server/). The server application will in turn request a token to the OpenVidu deployment. If you have any doubts about this process, review the [Basic Concepts](developing-your-video-app/#basic-concepts).

```javascript
// --- 4) Connect to the session with a valid user token ---

// Get a token from the OpenVidu deployment
this.getToken(this.mySessionId).then((token) => {
    // See next point to see how to connect to the session using 'token'
}
```

This is the piece of code in charge of finally retrieving a token from the application server. The tutorial uses `axios` library to perform the necessary [HTTP requests](application-server/#rest-endpoints).

```javascript
async getToken(mySessionId) {
    const sessionId = await this.createSession(mySessionId);
    return await this.createToken(sessionId);
},

async createSession(sessionId) {
    const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions', { customSessionId: sessionId }, {
        headers: { 'Content-Type': 'application/json', },
    });
    return response.data; // The sessionId
},

async createToken(sessionId) {
    const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections', {}, {
        headers: { 'Content-Type': 'application/json', },
    });
    return response.data; // The token
},
```

---

#### Finally connect to the session and publish your webcam:

```javascript
// --- 4) Connect to the session with a valid user token ---

// Get a token from the OpenVidu deployment
this.getToken(this.mySessionId).then((token) => {

    // First param is the token. Second param can be retrieved by every user on event
    // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
    this.session.connect(token, { clientData: this.myUserName })
        .then(() => {

            // --- 5) Get your own camera stream with the desired properties ---

            // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
            // element: we will manage it on our own) and with the desired properties
            let publisher = this.OV.initPublisher(undefined, {
              audioSource: undefined, // The source of audio. If undefined default microphone
              videoSource: undefined, // The source of video. If undefined default webcam
              publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
              publishVideo: true, // Whether you want to start publishing with your video enabled or not
              resolution: "640x480", // The resolution of your video
              frameRate: 30, // The frame rate of your video
              insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
              mirror: false, // Whether to mirror your local video or not
            });

            // Set the main video in the page to display our webcam and store our Publisher
            this.mainStreamManager = publisher;
            this.publisher = publisher;

            // --- 6) Publish your stream ---

            this.session.publish(publisher);
        })
        .catch((error) => {
            console.log("There was an error connecting to the session:", error.code, error.message);
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

```javascript
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

```javascript
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

```javascript
leaveSession() {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---
    if (this.session) this.session.disconnect();

    // Empty all properties...
    this.session = undefined;
    this.mainStreamManager = undefined;
    this.publisher = undefined;
    this.subscribers = [];
    this.OV = undefined;

    // Remove beforeunload listener
    window.removeEventListener("beforeunload", this.leaveSession);
}
```

## Deploying openvidu-vue

#### 1) Build the docker image

Under the root project folder, you can see the `openvidu-vue/docker/` directory. Here it is included all the required files yo make it possible the deployment with OpenVidu.

First of all, you will need to create the **openvidu-vue** docker image. Under `openvidu-vue/docker/` directory you will find the `create_image.sh` script. This script will create the docker image with the [openvidu-basic-node](application-server/openvidu-basic-node/) as application server and the static files.

```bash
./create_image.sh openvidu/openvidu-vue-demo:X.Y.Z
```

This script will create an image named `openvidu/openvidu-vue-demo:X.Y.Z`. This name will be used in the next step.

#### 2) Deploy the docker image

Time to deploy the docker image. You can follow the [Deploy OpenVidu based application with Docker](/deployment/deploying-openvidu-apps/#with-docker) guide for doing this.


<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js"></script>
<script type='text/javascript' src='js/fancybox-setup.js'></script>