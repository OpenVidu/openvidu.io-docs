# openvidu-recording-node

<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-recording-node" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

An OpenVidu application with a Node.js backend and a plain JS/HTML/CSS frontend. It makes use of [openvidu-node-client SDK](reference-docs/openvidu-node-client/) to communicate with the OpenVidu deployment. This application demonstrates OpenVidu recording capabilities. It is highly recommended to have read [Recording](advanced-features/recording/) documentation before diving into the tutorial.

<div class="row">
    <div class="pro-gallery" style="margin: 20px 0 15px 0">
        <a data-fancybox="gallery-pro1" data-type="image" class="fancybox-img" href="img/tutorials/openvidu-recording-node.png">
          <img class="img-responsive" style="margin: auto; max-height: 500px" src="img/tutorials/openvidu-recording-node.png"/>
        </a>
    </div>
</div>

## Running this tutorial

To run the tutorial you need the three components stated in [OpenVidu application architecture](developing-your-video-app/#openvidu-application-architecture): an OpenVidu deployment, your server application and your client application. In this order:

#### 1. Run OpenVidu deployment

Using [Docker Engine](https://docs.docker.com/engine/){:target="_blank"}:

```bash
# WARNING: this container is not suitable for production deployments of OpenVidu
# Visit https://docs.openvidu.io/en/stable/deployment

docker run -p 4443:4443 --rm \
    -e OPENVIDU_SECRET=MY_SECRET \
    -e OPENVIDU_RECORDING=true \
    -e OPENVIDU_RECORDING_PATH=/opt/openvidu/recordings \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v /opt/openvidu/recordings:/opt/openvidu/recordings \
openvidu/openvidu-dev:2.22.0
```

> Check out the additional configuration properties and volumes you must set in the `docker run` command for the recording to work. If you let the default value `/opt/openvidu/recordings/` as `OPENVIDU_RECORDING_PATH`, make sure the docker container has write permissions on it.

#### 2. Run the server application and the client application

You need [Node and NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm){:target="_blank"}. Check them with:

```
node --version
npm --version
```

Clone the repo:

```bash
git clone https://github.com/OpenVidu/openvidu-tutorials.git -b v2.22.0
```

Run the application:

```bash
cd openvidu-tutorials/openvidu-recording-node
npm install
node server.js http://localhost:4443 MY_SECRET
```

Go to [`https://localhost:5000`](https://localhost:5000){:target="_blank"} to test the app once the server is running. To test two different users in the same computer, use a standard window and an incognito window.

> To test the application with other devices in your network, visit this **[FAQ](troubleshooting/#3-test-applications-in-my-network-with-multiple-devices)**. On [step 1](troubleshooting/#1-set-the-openvidu-deployment-to-use-your-local-ip-and-other-configurations) add the additional flags to activate the recording module as explained above. And ignore [step 2](troubleshooting/#2-run-your-preferred-server-application-sample) and [step 3](#3-run-the-client-application-tutorial-changing-the-application_server_url), as the application already includes a backend and the frontend doesn't need to communicate with a different application server.


## Understanding the code

This is an application with a JS/HTML/CSS frontend and a straightforward Node.js backend that serves HTML files.

This application provides the:

- **Backend**: Node.js app with the following classes
	- `server.js` : entrypoint for the app and controller for managing the token to enter the OpenVidu Session<br><br>

- **Frontend templates**: Plain JS/HTML/CSS files served by the backend (`public/`)
	- `index.html` : template with the recording features
	- `app.js`: javascript file which hosted OpenVidu methods and front-backend communication<br><br>

- **Frontend static files** (`public/`)
 	- `openvidu-browser-VERSION.js` : openvidu-browser library. You don't have to manipulate this file
	- `style.css` : some CSS classes to style the templates


Although this tutorial includes several methods to make the backend-frontend communication effective, we will focus on the recording features. The application shows how to manage the recordings using the [OpenVidu Recording API](reference-docs/REST-API/#the-recording-object) provided by [openvidu-node-client](reference-docs/openvidu-node-client/#manage-recordings).

#### 1) Start the recording:

```javascript
app.post('/recording-node/api/recording/start', function (req, res) {
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
app.post('/recording-node/api/recording/stop', function (req, res) {
    // Retrieve params from POST body
    var recordingId = req.body.recording;

    OV.stopRecording(recordingId)
        .then(recording => res.status(200).send(recording))
        .catch(error => res.status(400).send(error.message));
});
```

#### 3) Get a recording:

```javascript
app.get('/recording-node/api/recording/get/:recordingId', function (req, res) {
    // Retrieve params from GET url
    var recordingId = req.params.recordingId;

    OV.getRecording(recordingId)
        .then(recording => res.status(200).send(recording))
        .catch(error => res.status(400).send(error.message));
});
```


#### 4) List the recording:

```javascript
app.get('/recording-node/api/recording/list', function (req, res) {
    OV.listRecordings()
        .then(recordings => res.status(200).send(recordings))
        .catch(error => res.status(400).send(error.message));
});
```

#### 5) Delete the recording:

```javascript
app.delete('/recording-node/api/recording/delete', function (req, res) {
    // Retrieve params from DELETE body
    var recordingId = req.body.recording;

    OV.deleteRecording(recordingId)
        .then(() => res.status(200).send())
        .catch(error => res.status(400).send(error.message));
});
```

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js"></script>
<script type='text/javascript' src='js/fancybox-setup.js'></script>