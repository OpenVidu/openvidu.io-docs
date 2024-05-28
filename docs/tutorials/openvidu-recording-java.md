# openvidu-recording-java

<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-recording-java" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

An OpenVidu application with a Java backend and a plain JS/HTML/CSS frontend. It makes use of [openvidu-java-client SDK](reference-docs/openvidu-java-client/) to communicate with the OpenVidu deployment. This application demonstrates OpenVidu recording capabilities. It is highly recommended to have read [Recording](advanced-features/recording/) documentation before diving into the tutorial.

<div class="row">
    <div class="pro-gallery" style="margin: 20px 0 15px 0">
        <a data-fancybox="gallery-pro1" data-type="image" class="fancybox-img" href="img/tutorials/openvidu-recording-java.png">
          <img class="img-responsive" style="margin: auto; max-height: 500px" src="img/tutorials/openvidu-recording-java.png"/>
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
openvidu/openvidu-dev:2.30.0
```

> Check out the additional configuration properties and volumes you must set in the `docker run` command for the recording to work. If you let the default value `/opt/openvidu/recordings/` as `OPENVIDU_RECORDING_PATH`, make sure the docker container has write permissions on it.

#### 2. Run the server application and the client application

You need [Java](https://www.java.com/en/download/){:target="_blank"} and [Maven](https://maven.apache.org/install.html){:target="_blank"}. Check them with:

```
java --version
mvn --version
```

Clone the repo:

```bash
git clone https://github.com/OpenVidu/openvidu-tutorials.git -b v2.30.0
```

Run the application:

```bash
cd openvidu-tutorials/openvidu-recording-java
mvn package exec:java
```

Go to [`https://localhost:5000`](https://localhost:5000){:target="_blank"} to test the app once the server is running. To test two different users in the same computer, use a standard window and an incognito window.

> To test the application with other devices in your network, visit this **[FAQ](troubleshooting/#3-test-applications-in-my-network-with-multiple-devices)**. On [step 1](troubleshooting/#1-set-the-openvidu-deployment-to-use-your-local-ip-and-other-configurations) add the additional flags to activate the recording module as explained above. And ignore [step 2](troubleshooting/#2-run-your-preferred-server-application-sample) and [step 3](#3-run-the-client-application-tutorial-changing-the-application_server_url), as the application already includes a backend and the frontend doesn't need to communicate with a different application server.


## Understanding the code

This is an application with a JS/HTML/CSS frontend and a straightforward Java backend that serves HTML files, building the templates with the help of [Thymeleaf](http://www.thymeleaf.org/){:target="_blank"}.

This application provides the:

- **Backend**: SpringBoot app with the following classes (`src/main/java` path, `io.openvidu.recording.java` package)
	- `App.java` : entrypoint for the app
	- `MyRestController.java` : controller for managing the token to enter the OpenVidu Session<br><br>

- **Frontend templates**: Plain JS/HTML/CSS files served by the backend (`src/main/resources/templates`)
	- `index.html` : template with the recording features<br><br>

- **Frontend static files** (`src/main/resources/static`)
 	- `openvidu-browser-VERSION.js` : openvidu-browser library. You don't have to manipulate this file
	- `style.css` : some CSS classes to style the templates


Although this tutorial includes several methods to make the backend-frontend communication effective, we will focus on the recording features. The application shows how to manage the recordings using the [OpenVidu Recording API](reference-docs/REST-API/#the-recording-object) provided by [openvidu-java-client](reference-docs/openvidu-java-client/#manage-recordings).

#### 1) Start the recording:

```java
@RequestMapping(value = "/recording/start", method = RequestMethod.POST)
public ResponseEntity<?> startRecording(@RequestBody String param) throws ParseException {
	JSONObject json = (JSONObject) new JSONParser().parse(param);

	String sessionId = (String) json.get("session");
	Recording.OutputMode outputMode = Recording.OutputMode.valueOf((String) json.get("outputMode"));
	boolean hasAudio = (boolean) json.get("hasAudio");
	boolean hasVideo = (boolean) json.get("hasVideo");

	RecordingProperties properties = new RecordingProperties.Builder().outputMode(outputMode).hasAudio(hasAudio)
			.hasVideo(hasVideo).build();

	try {
		Recording recording = this.openVidu.startRecording(sessionId, properties);
		this.sessionRecordings.put(sessionId, true);
		return new ResponseEntity<>(recording, HttpStatus.OK);
	} catch (OpenViduJavaClientException | OpenViduHttpException e) {
		return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}
}
```

#### 2) Stop the recording:

```java
@RequestMapping(value = "/recording/stop", method = RequestMethod.POST)
public ResponseEntity<?> stopRecording(@RequestBody String param) throws ParseException {
	JSONObject json = (JSONObject) new JSONParser().parse(param);
	String recordingId = (String) json.get("recording");

	try {
		Recording recording = this.openVidu.stopRecording(recordingId);
		this.sessionRecordings.remove(recording.getSessionId());
		return new ResponseEntity<>(recording, HttpStatus.OK);
	} catch (OpenViduJavaClientException | OpenViduHttpException e) {
		return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}
}
```

#### 3) Get a recording:

```java
@RequestMapping(value = "/recording/get/{recordingId}", method = RequestMethod.GET)
public ResponseEntity<?> getRecording(@PathVariable(value = "recordingId") String recordingId) {

	try {
		Recording recording = this.openVidu.getRecording(recordingId);
		return new ResponseEntity<>(recording, HttpStatus.OK);
	} catch (OpenViduJavaClientException | OpenViduHttpException e) {
		return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}
}
```


#### 4) List the recording:

```java
@RequestMapping(value = "/recording/list", method = RequestMethod.GET)
public ResponseEntity<?> listRecordings() {

	try {
		List<Recording> recordings = this.openVidu.listRecordings();

		return new ResponseEntity<>(recordings, HttpStatus.OK);
	} catch (OpenViduJavaClientException | OpenViduHttpException e) {
		return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}
}
```

#### 5) Delete the recording:

```java
@RequestMapping(value = "/recording/delete", method = RequestMethod.DELETE)
public ResponseEntity<?> deleteRecording(@RequestBody String param) throws ParseException {
	JSONObject json = (JSONObject) new JSONParser().parse(param);
	String recordingId = (String) json.get("recording");

	try {
		this.openVidu.deleteRecording(recordingId);
		return new ResponseEntity<>(HttpStatus.OK);
	} catch (OpenViduJavaClientException | OpenViduHttpException e) {
		return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}
}
```

## Deploying openvidu-recording-java

#### 1) Build the docker image

Under the root project folder, you can see the `openvidu-recording-java/docker/` directory. Here it is included all the required files yo make it possible the deployment with OpenVidu.

First of all, you will need to create the **openvidu-recording-java** docker image. Under `openvidu-recording-java/docker/` directory you will find the `create_image.sh` script. This script will create the docker image with the openvidu-recording-java server and the static files.


```bash
./create_image.sh openvidu/my-openvidu-recording-java-demo:X.Y.Z
```

This script will create an image named `openvidu/my-openvidu-recording-java-demo:X.Y.Z`. This name will be used in the next step.


#### 2) Deploy the docker image

Time to deploy the docker image. You can follow the [Deploy OpenVidu based application with Docker](/deployment/deploying-openvidu-apps/#with-docker) guide for doing this.


<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js"></script>
<script type='text/javascript' src='js/fancybox-setup.js'></script>