# openvidu-recording-node

<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-recording-node" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

A simple Node application that uses [openvidu-node-client](reference-docs/openvidu-node-client/){:target="_blank"} to demonstrate OpenVidu recording capabilities. It is highly recommended to have read [Recording](advanced-features/recording/){:target="_blank"} documentation before diving into the tutorial.
## Understanding this tutorial

<p align="center">
  <img class="img-responsive" src="img/tutorials/openvidu-recording-node.png">
</p>

OpenVidu is composed by the modules displayed on the image above.

- **openvidu-browser**: JavaScript library for the browser. It allows you to manage your video-calls straight away from your clients
- **openvidu-node-client**: server SDK for Node. Quick alternative to REST API
- **openvidu-server**: application to control Kurento Media Server
- **Kurento Media Server**: handles low level operations of media flow transmissions

## Running this tutorial
<br>
<iframe style="display:block; margin: auto;" width="560" height="315" src="https://www.youtube.com/embed/MzfysRkkq0Q?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<br>

1) You will need node and NPM execute the app. You can check them with in ubuntu with the following commands:

```bash
node -v
npm -v
```
Plase visit [https://nodejs.org/](https://nodejs.org/){:target="_blank"} to install it on other platforms.

2) Clone the repo:

```bash
git clone https://github.com/OpenVidu/openvidu-tutorials.git -b v2.20.0
```

3) Run the tutorial:

```bash
cd openvidu-tutorials/openvidu-recording-node
npm install
node server.js https://localhost:4443 MY_SECRET
```

4) OpenVidu Platform service must be up and running in your development machine. The easiest way is running this Docker container which wraps both of them (you will need [Docker CE](https://store.docker.com/search?type=edition&offering=community){:target="_blank"}). Bare in mind the additional configuration properties and volumes you must set for the recording to work. If you let the default value `/opt/openvidu/recordings/` as `OPENVIDU_RECORDING_PATH`, make sure the docker container has write permissions on it.

```bash
# WARNING: this container is not suitable for production deployments of OpenVidu Platform
# Visit https://docs.openvidu.io/en/stable/deployment

docker run -p 4443:4443 --rm \
    -e OPENVIDU_SECRET=MY_SECRET \
    -e OPENVIDU_RECORDING=true \
    -e OPENVIDU_RECORDING_PATH=/opt/openvidu/recordings \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v /opt/openvidu/recordings:/opt/openvidu/recordings \
openvidu/openvidu-server-kms:2.20.0
```

5) Go to _[`https://localhost:5000`](https://localhost:5000){:target="_blank"}_ to test the app once the server is running. The first time you use the docker container, an alert message will suggest you accept the self-signed certificate of _openvidu-server_ when you first try to join a video-call. To test two users in the same computer, use a standard window and an incognito window.

> If you are using **Windows**, read this **[FAQ](troubleshooting/#3-i-am-using-windows-to-run-the-tutorials-develop-my-app-anything-i-should-know){:target="_blank"}** to properly run the tutorial

> To learn **some tips** to develop with OpenVidu, check this **[FAQ](troubleshooting/#2-any-tips-to-make-easier-the-development-of-my-app-with-openvidu){:target="_blank"}**


## Understanding the code

This is an advanced tutorial application with a JS/HTML/CSS frontend and a straightforward NodeJS backend that serves HTML files.

This application provides the

- **Backend**: NodeJS app with the following classes
	- `server.js` : entrypoint for the app and controller for managing the token to enter the OpenVidu Session<br><br>

- **Frontend templates**: Plain JS/HTML/CSS files served by the backend (`public/`)
	- `index.html` : template with the recording features
	- `app.js`: javascript file which hosted OpenVidu methods and front-backend communication<br><br>

- **Frontend static files** (`public/`)
 	- `openvidu-browser-VERSION.js` : openvidu-browser library. You don't have to manipulate this file
	- `style.css` : some CSS classes to style the templates


Although this tutorial includes several methods to make the backend-frontend communication effective, we will focus on the recording features. The application shows how to manage the recordings using the [OpenVidu Recording API](reference-docs/REST-API/#the-recording-object){:target="_blank"} provided by [openvidu-node-client](reference-docs/openvidu-node-client/#manage-recordings){:target="_blank"}.

#### 1) Start the recording:

```javascript
app.post('/api/recording/start', function (req, res) {
	// Retrieve params from POST body
	var recordingProperties = {
		outputMode: req.body.outputMode,
		hasAudio: req.body.hasAudio,
		hasVideo: req.body.hasVideo,
	}
	var sessionId = req.body.session;

	OV.startRecording(sessionId, recordingProperties)
		.then(recording => res.status(200).send(recording))
		.catch(error => res.status(400).send(error.message));
});
```

#### 2) Stop the recording:

```javascript
app.post('/api/recording/stop', function (req, res) {
    // Retrieve params from POST body
    var recordingId = req.body.recording;

    OV.stopRecording(recordingId)
        .then(recording => res.status(200).send(recording))
        .catch(error => res.status(400).send(error.message));
});
```

#### 3) Get a recording:

```javascript
app.get('/api/recording/get/:recordingId', function (req, res) {
    // Retrieve params from GET url
    var recordingId = req.params.recordingId;

    OV.getRecording(recordingId)
        .then(recording => res.status(200).send(recording))
        .catch(error => res.status(400).send(error.message));
});
```


#### 4) List the recording:

```javascript
app.get('/api/recording/list', function (req, res) {
    OV.listRecordings()
        .then(recordings => res.status(200).send(recordings))
        .catch(error => res.status(400).send(error.message));
});
```

#### 5) Delete the recording:

```javascript
app.delete('/api/recording/delete', function (req, res) {
    // Retrieve params from DELETE body
    var recordingId = req.body.recording;

    OV.deleteRecording(recordingId)
        .then(() => res.status(200).send())
        .catch(error => res.status(400).send(error.message));
});
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