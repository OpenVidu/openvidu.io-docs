# openvidu-recording-java

<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-recording-java" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

A simple Java application that uses [openvidu-java-client](reference-docs/openvidu-java-client/){:target="_blank"} to demonstrate OpenVidu recording capabilities. It is highly recommended to have read [Recording]{:target="_blank"} documentation before diving into the tutorial.

## Understanding this tutorial

<p align="center">
  <img class="img-responsive" src="img/tutorials/openvidu-recording-java.png">
</p>

OpenVidu is composed by the modules displayed on the image above.

- **openvidu-browser**: JavaScript library for the browser. It allows you to manage your video-calls straight away from your clients
- **openvidu-java-client**: server SDK for Java. Quick alternative to REST API
- **openvidu-server**: application to control Kurento Media Server
- **Kurento Media Server**: handles low level operations of media flow transmissions

## Running this tutorial

1) You will need **_Java 8 SKD_**  and **_maven_** to build this project. You can install them with:

```bash
sudo apt-get install -y openjdk-8-jdk
sudo apt-get install -y maven
```

2) Clone the repo:

```bash
git clone https://github.com/OpenVidu/openvidu-tutorials.git -b v2.16.0
```

3) Run the tutorial:

```bash
cd openvidu-tutorials/openvidu-recording-java
mvn package exec:java
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
openvidu/openvidu-server-kms:2.16.0
```

5) Go to _[`https://localhost:5000`](https://localhost:5000){:target="_blank"}_ to test the app once the server is running. The first time you use the docker container, an alert message will suggest you accept the self-signed certificate of _openvidu-server_ when you first try to join a video-call. To test two users in the same computer, use a standard window and an incognito window.

> If you are using **Windows**, read this **[FAQ](troubleshooting/#3-i-am-using-windows-to-run-the-tutorials-develop-my-app-anything-i-should-know){:target="_blank"}** to properly run the tutorial

> To learn **some tips** to develop with OpenVidu, check this **[FAQ](troubleshooting/#2-any-tips-to-make-easier-the-development-of-my-app-with-openvidu){:target="_blank"}**


## Understanding the code

This is an advanced tutorial application with a JS/HTML/CSS frontend and a straightforward Java backend that serves HTML files, building the templates with the help of [Thymeleaf](http://www.thymeleaf.org/){:target="_blank"}.


This application provides the

- **Backend**: SpringBoot app with the following classes (`src/main/java` path, `io.openvidu.recording.java` package)
	- `App.java` : entrypoint for the app
	- `MyRestController.java` : controller for managing the token to enter the OpenVidu Session<br><br>

- **Frontend templates**: Plain JS/HTML/CSS files served by the backend (`src/main/resources/templates`)
	- `index.html` : template with the recording features<br><br>

- **Frontend static files** (`src/main/resources/static`)
 	- `openvidu-browser-VERSION.js` : openvidu-browser library. You don't have to manipulate this file
	- `style.css` : some CSS classes to style the templates


Although this tutorial includes several methods to make the backend-frontend communication effective, we will focus on the recording features. The application shows how to manage the recordings using the [OpenVidu Recording API](reference-docs/REST-API/#the-recording-object){:target="_blank"} provided by [openvidu-java-client](reference-docs/openvidu-java-client/#manage-recordings){:target="_blank"}.

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