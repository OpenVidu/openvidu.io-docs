# Recording

- **[How to record sessions](#how-to-record-sessions)**
- **[Composed recording](#composed-recording)**
- **[Individual stream recording](#individual-stream-recording)**
- **[Audio-only and video-only recordings](#audio-only-and-video-only-recordings)**
- **[Automatic stop of recordings](#automatic-stop-of-recordings)**
- **[Custom recording layouts](#custom-recording-layouts)**
- **[Local recording in the browser](#local-recording-in-the-browser)**

---
<br>

OpenVidu Server can be configured to record sessions. Two types of recordings are available:

- **COMPOSED**: every publisher stream is composed in the same video file in a grid layout. You can use the default layout, that will evenly distribute each stream in the available space, or you can use your own custom layout.

- **INDIVIDUAL**: every publisher stream is recorded in its own file, generating a ZIP file containing all videos along with a text file for synchronization data.

<br>

---

# How to record sessions

To start OpenVidu Server properly configured to allow session recording it is necessary to:

### 1. Have Docker CE installed in the host machine

OpenVidu recording module may use a Docker image that needs to be downloaded from the cloud. The process is **100% automatic**, but you will need [Docker CE](https://docs.docker.com/install/linux/docker-ce/ubuntu/){:target="_blank"} installed in your server. If you enable OpenVidu recording service but there's no Docker installed, OpenVidu Server will fail to init, throwing the following exception:

`Exception connecting to Docker daemon: you need Docker installed in this machine to enable OpenVidu recorder service`

<br>
> **[OpenVidu AWS deployment](/deployment/deploying-aws/){:target="_blank"} already includes the Docker image for recording service and is always launched with recording module enabled. You don't need to install anything or wait during the first execution if you use this type of deployment for OpenVidu Server. You can go straight to [step 3](#3-configure-your-sessions-to-be-recorded)**

<br>

---

### 2. Launch OpenVidu Server with new properties

#### For OpenVidu Server JAR

```console
java -jar \
    -Dopenvidu.recording=true \
    -Dopenvidu.recording.path=/PATH/TO/VIDEO/FILES \
openvidu-server.jar
```

- `openvidu.recording`: if *true* OpenVidu recording service is enabled and sessions can be configured to be recorded. During the first execution of _openvidu-server.jar_, a Docker image ([openvidu/openvidu-recording](https://hub.docker.com/r/openvidu/openvidu-recording/){:target="_blank"}) will be downloaded.
- `openvidu.recording.path`: where to store the recorded video files on the host machine. OpenVidu Server must have write access to this path

<br>

> There are other environment variables related to recordings configuration that may be set. To see the full list, visit [OpenVidu Server configuration parameters](/reference-docs/openvidu-server-params/){:target="_blank"}

#### For OpenVidu Server Docker image _(development environment)_

```console
docker run -p 4443:4443 --rm \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v /PATH/TO/VIDEO/FILES:/PATH/TO/VIDEO/FILES \
    -e openvidu.recording=true \
    -e openvidu.recording.path=/PATH/TO/VIDEO/FILES \
openvidu/openvidu-server-kms:2.11.0
```

- `openvidu.recording`: _same as in OpenVidu Server JAR_
- `openvidu.recording.path`: _same as in OpenVidu Server JAR_

It is also necessary to mount 2 volumes:

- `-v /var/run/docker.sock:/var/run/docker.sock`: gives openvidu-server container access to the local Docker daemon
- `-v /PATH/TO/VIDEO/FILES:/PATH/TO/VIDEO/FILES`: gives access to the recorded video files through the container

<br>
> **IMPORTANT!** `/PATH/TO/VIDEO/FILES` must be the same in property `openvidu.recording.path=/PATH/TO/VIDEO/FILES` and in both sides of flag `-v /PATH/TO/VIDEO/FILES:/PATH/TO/VIDEO/FILES`

<br>

---

### 3. Configure your Sessions to be recorded

<br>
Recording can be configured in two ways:

- **ALWAYS**: the session will be automatically recorded from the moment the first participant starts publishing.

- **MANUAL**: you will have to tell openvidu-server when to start the recording of the session.

In both cases you can stop the recording manually, and every recording will always be automatically stopped if last user leaves the session and certain timeout elapses (see [Automatic stop of recordings](#automatic-stop-of-recordings)).

<br>

You can use [REST API](/reference-docs/REST-API/){:target="_blank"} or any of the server SDKs ([openvidu-java-client](/reference-docs/openvidu-java-client/){:target="_blank"}, [openvidu-node-client](/reference-docs/openvidu-node-client/){:target="_blank"}) to manage your recorded sessions.

<div class="lang-tabs-container" markdown="1">

<div class="lang-tabs-header">
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; font-weight: bold">REST API</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Java</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Node</button>
</div>

<div id="rest-api" class="lang-tabs-content" markdown="1">

1. Initialize your sessions with this POST method: [POST /api/sessions](/reference-docs/REST-API#post-apisessions){:target="_blank"}<br>You may configure default values for recordings started for this session by sending params such as `defaultOutputMode` or `defaultRecordingLayout`. This way you can pre-configure recordings that will be automatically started (for sessions with `{"recordingMode": "ALWAYS"}`). For these sessions configured with `ALWAYS` recording mode, no more steps are needed.

2. If you have configured your session with `"recordingMode": "MANUAL"`

    - Start the recording with this POST method: [POST /api/recordings/start](/reference-docs/REST-API#post-apirecordingsstart){:target="_blank"}<br>You can pass parameters to override default recording configuration values set in step 1 and to further configure it with other available options

    - Stop the recording with this POST method: [POST /api/recordings/stop](/reference-docs/REST-API#post-apirecordingsstopltrecording_idgt){:target="_blank"}

</div>

<div id="java" class="lang-tabs-content" style="display:none" markdown="1">

1. Call `OpenVidu.createSession()` passing as an optional parameter a `SessionProperties` object. You may configure default values for recordings started for this session with that object. This way you can pre-configure recordings that will be automatically started (for sessions with `RecordingMode.ALWAYS`)

        OpenVidu openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
        SessionProperties properties = new SessionProperties.Builder()
            .recordingMode(RecordingMode.MANUAL) // RecordingMode.ALWAYS for automatic recording
            .defaultOutputMode(Recording.OutputMode.INDIVIDUAL)
            .build();
        Session session = openVidu.createSession(properties);

2. If Session is configured with `RecordingMode.MANUAL`, manually start and stop the recording whenever you want. You may pass a [RecordingProperties](/../api/openvidu-java-client/io/openvidu/java/client/RecordingProperties.html){:target="_blank"} object when calling `OpenVidu.startRecording` method to override default values configured in step 1 and to further configure it with other available options

        RecordingProperties properties = new RecordingProperties.Builder()
            .outputMode(Recording.OutputMode.COMPOSED)
            .name("MY_RECORDING_NAME")
            .build();
        Recording recording = openVidu.startRecording(session.getSessionId(), properties); // Starts recording
        recording = openVidu.stopRecording(recording.getId()); // Stops recording

</div>

<div id="node" class="lang-tabs-content" style="display:none" markdown="1">

1. Call `OpenVidu.createSession()` passing as an optional parameter a `SessionProperties` object. You may configure default values for recordings started for this session with that object. This way you can pre-configure recordings that will be automatically started (for sessions with `RecordingMode.ALWAYS`)

        var openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
        var properties = {
            recordingMode: RecordingMode.MANUAL, // RecordingMode.ALWAYS for automatic recording
            defaultOutputMode: Recording.OutputMode.INDIVIDUAL
        };
        var mySession = openvidu.createSession(properties);

2. If Session is configured with `RecordingMode.MANUAL`, manually start and stop the recording whenever you want. You may pass a [RecordingProperties](/../api/openvidu-node-client/interfaces/recordingproperties.html){:target="_blank"} object when calling `OpenVidu.startRecording` method to override default values configured in step 1 and to further configure it with other available options

        var recording;

        // Starts recording
        openvidu.startRecording(sessionId, {
            outputMode: Recording.OutputMode.COMPOSED,
            name: "MY_RECORDING_NAME"
        })
          .then(response => recording = response)
          .catch(error => console.error(error));

        // Stops recording
        openvidu.stopRecording(recording.id)
          .then(response => recording = response)
          .catch(error => console.error(error));

</div>

</div>

<br>

---

<br>

# Composed recording

Every publisher stream is composed in the same video file in a grid layout. This is the default recording mode, and it will generate as output an MP4 file.

You can use the default layout, that will evenly distribute each stream in the available space, or you can [use your own custom layout](#custom-recording-layouts).<br>To use the default layout:

<div class="lang-tabs-container" markdown="1">

<div class="lang-tabs-header">
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; font-weight: bold">REST API</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Java</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Node</button>
</div>

<div id="rest-api" class="lang-tabs-content" markdown="1">

When starting the recording of a session with method [POST /api/recordings/start](/reference-docs/REST-API#post-apirecordingsstart){:target="_blank"} pass parameters<br>`{"outputMode: "COMPOSED", "recordingLayout": "BEST_FIT"}`

</div>

<div id="java" class="lang-tabs-content" style="display:none" markdown="1">

```java
RecordingProperties properties = new RecordingProperties.Builder()
    .outputMode(Recording.OutputMode.COMPOSED)
    .recordingLayout(RecordingLayout.BEST_FIT)
    .build();
Recording recording = openVidu.startRecording(session.getSessionId(), properties);
```

</div>

<div id="node" class="lang-tabs-content" style="display:none" markdown="1">

```javascript
var recording;

openvidu.startRecording(sessionId, {
    outputMode: Recording.OutputMode.COMPOSED,
    recordingLayout: RecordingLayout.BEST_FIT
})
    .then(response => recording = response)
    .catch(error => console.error(error));
```

</div>

</div>

<br> 

For example, for a session with two publishers the video file will look like this when using output mode `COMPOSED` and recording layout `BEST_FIT`

<br>

<p>
    <img class="img-responsive" src="/img/docs/advanced-features/recorded-video.png">
</p>

<br>

> **Notes on COMPOSED recordings**<br>
>
> - If a COMPOSED recording is configured to record video (that is, not being an **[audio-only recording](#audio-only-and-video-only-recordings)**), this type of grid recording **can be a pretty heavy consuming process**. A maximum number of 4 publishers is recommended, and starting more than 2 recordings of this type at the same time can overload server CPUs. For these reasons, it is desirable to launch OpenVidu Server in a host with significant CPU power if COMPOSED video recordings are expected. In comparison, INDIVIDUAL stream recording (and COMPOSED audio-only recording) can be **4x up to 10x more efficient**<br><br>
> - You can configure the resolution of the MP4 file for COMPOSED recordings by using `resolution` property when starting the recording<br><br>
> - A thumbnail got from the middle of the video will be generated for COMPOSED recordings that have video. They will be stored next to the MP4 file and named [RECORDING_ID].jpg

<br>

---

# Individual stream recording

Every publisher stream is recorded in its own file. The final result is a ZIP file containing one WEBM file for each published stream during the recording (named after each stream identifier), along with a text file with synchronization information.

<div class="lang-tabs-container" markdown="1">

<div class="lang-tabs-header">
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; font-weight: bold">REST API</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Java</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Node</button>
</div>

<div id="rest-api" class="lang-tabs-content" markdown="1">

When starting the recording of a session with method [POST /api/recordings/start](/reference-docs/REST-API#post-apirecordingsstart){:target="_blank"} pass parameter `{"outputMode:"INDIVIDUAL"}`

</div>

<div id="java" class="lang-tabs-content" style="display:none" markdown="1">

```java
RecordingProperties properties = new RecordingProperties.Builder()
    .outputMode(Recording.OutputMode.INDIVIDUAL)
    .build();
Recording recording = openVidu.startRecording(session.getSessionId(), properties);
```

</div>

<div id="node" class="lang-tabs-content" style="display:none" markdown="1">

```javascript
var recording;

openvidu.startRecording(sessionId, {
    outputMode: Recording.OutputMode.INDIVIDUAL
})
    .then(response => recording = response)
    .catch(error => console.error(error));
```

</div>

</div>

<br>

For example, for a session with 2 publishers the final content of the ZIP file could be:

```console
MyRecording.zip
+-- MyRecording.json
+-- tzk08sgffcqqwpor_CAMERA_DFDAE.webm
+-- ugkmpnz4bn6yewbi_CAMERA_PAHHB.webm
```

And the content of the JSON synchronization file might be:

```json
{
  "createdAt": 1548947712287,
  "id": "zfgmthb8jl9uellk",
  "name": "MyRecording",
  "sessionId": "zfgmthb8jl9uellk",
  "files": [
    {
      "connectionId": "ugkmpnz4bn6yewbi",
      "streamId": "ugkmpnz4bn6yewbi_CAMERA_PAHHB",
      "size": 4006190,
      "clientData": "",
      "serverData": "UserA",
      "hasAudio": true,
      "hasVideo": true,
      "typeOfVideo": "SCREEN",
      "startTimeOffset": 95,
      "endTimeOffset": 56445
    },
    {
      "connectionId": "tzk08sgffcqqwpor",
      "streamId": "tzk08sgffcqqwpor_CAMERA_DFDAE",
      "size": 2404760,
      "clientData": "",
      "serverData": "UserB",
      "hasAudio": false,
      "hasVideo": true,
      "typeOfVideo": "CAMERA",
      "startTimeOffset": 148,
      "endTimeOffset": 56398
    }
  ]
}
```

<br>

These are the properties in the JSON file

> - **createdAt**: time when the recording was started in UTC milliseconds
> - **id**: unique identifier of the recording
> - **name**: custom name of the recording. You can set this parameter when starting the recording, and the final ZIP file will be named after it
> - **sessionId**: unique identifier of the session that was recorded
> - **files**: array containing one JSON object for each one of the WEBM videos inside the ZIP file
>     - **connectionId**: unique identifier of the connection that published the stream
>     - **streamId**: unique identifier of the recorded stream
>     - **size**: size in bytes of this particular recorded file
>     - **clientData**: data associated to the connection that published the stream, in the client side. You can use this field to identify the user that published this particular recorded stream
>     - **serverData**: data associated to the connection that published the stream, in the server side. You can use this field to identify the user that published this particular recorded stream
>     - **hasAudio**: whether this recorded stream has an audio track or not
>     - **hasVideo**: whether this recorded stream has a video track or not
>     - **typeOfVideo**: type of video ("CAMERA" or "SCREEN"). Only defined if `hasVideo` is true
>     - **startTimeOffset**: the offset in milliseconds for when this particular stream started being recorded, from the `createdAt` property of the root element
>     - **endTimeOffset**: the offset in milliseconds for when this particular stream stopped being recorded, from the `createdAt` property of the root element

<br>

---

# Audio-only and video-only recordings

By default recordings will be generated with both audio and video, but you can configure them to record audio-only or video-only files.

<div class="lang-tabs-container" markdown="1">

<div class="lang-tabs-header">
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; font-weight: bold">REST API</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Java</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Node</button>
</div>

<div id="rest-api" class="lang-tabs-content" markdown="1">

When starting the recording of a session with method [POST /api/recordings/start](/reference-docs/REST-API#post-apirecordingsstart){:target="_blank"} simply pass parameters `hasAudio` or `hasVideo` with the desired values.

</div>

<div id="java" class="lang-tabs-content" style="display:none" markdown="1">

```java
RecordingProperties properties = new RecordingProperties.Builder()
    .hasAudio(true)
    .hasVideo(false)
    .build();
Recording recording = openVidu.startRecording(session.getSessionId(), properties);
```

</div>

<div id="node" class="lang-tabs-content" style="display:none" markdown="1">

```javascript
var recording;

openvidu.startRecording(sessionId, {
    hasAudio: true,
    hasVideo: false
})
    .then(response => recording = response)
    .catch(error => console.error(error));
```

</div>

</div>

<br>

> **Notes on audio/video only recordings**<br>
>
> - Recordings configured to not record neither audio nor video will fail to start, returning a status error of 422<br><br>
> - COMPOSED video-only recordings will generate an MP4 file. COMPOSED audio-only recordings will generate a WEBM file. INDIVIDUAL recordings will always generate a ZIP file containing one WEBM file for each recorded stream<br><br>
> - Streams published during a video-only recording that are audio-only won't be recorded: they won't be included in the grid layout for COMPOSED recordings and won't generate a WEBM file in INDIVIDUAL recordings. Same for audio-only recordings with video-only streams<br><br>
> - Recordings started automatically (with recording mode `ALWAYS`) will record both audio and video

<br>

---

# Automatic stop of recordings

Any started recording will automatically be stopped when any of the following situations occur and certain timeout elapses. This timeout is by default 120 seconds, but you can configure it with [system property `openvidu.recording.autostop-timeout`](/reference-docs/openvidu-server-params/){:target="_blank"}. The automatic recording stop timout will start:

- For any recorded session, if last user disconnects from the session

- For sessions with recording mode `MANUAL`, if the recording is started and no user is publishing a stream

The only condition to abort the timeout is to have any user publishing a stream to the session within the timeout.

Sessions will always remain opened and the recording active during the timeout. If it elapses and no stream is being published to the session, the recording will be stopped. If in addition there's no user connected to the session, the session will also be automatically closed.

---

You can always manually stop any recording at any time:

<div class="lang-tabs-container" markdown="1">

<div class="lang-tabs-header">
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; font-weight: bold">REST API</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Java</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Node</button>
</div>

<div id="rest-api" class="lang-tabs-content" markdown="1">

[POST /api/recordings/stop/&lt;RECORDING_ID&gt;](/reference-docs/REST-API#post-apirecordingsstopltrecording_idgt){:target="_blank"}

</div>

<div id="java" class="lang-tabs-content" style="display:none" markdown="1">

```java
Recording stoppedRecording = openVidu.stopRecording(recordingId);
```

</div>

<div id="node" class="lang-tabs-content" style="display:none" markdown="1">

```javascript
var stoppedRecording;
openvidu.stopRecording(recordingId)
    .then(response => stoppedRecording = response)
    .catch(error => console.error(error));
```

</div>

</div>

<br>

---

# Custom recording layouts

You can create your own layouts for the session recording process. They are implemented with HTML/CSS/JS files, just as your OpenVidu application client-side.

### 1. Create your layout with HTML/CSS/JS files

Put them in a path accessible to openvidu-server. There must be an `index.html` file as entrypoint for your custom layout:

<br>

- **WHAT SHOULD YOUR JS CODE DO**: by making use of *[`openvidu-browser.js`](https://github.com/OpenVidu/openvidu/releases){:target="_blank"}* library, you need to connect a _recorder_ participant to the session. This means:<br><br>

    **1) Your layout must connect to the session using a _token_ like this:**

        'wss://' + location.hostname + ':4443?sessionId=' + SESSION_ID + '&secret=' + SECRET + '&recorder=true';

    Being `SESSION_ID` and `SECRET` two parameters that will be url-encoded under ids `sessionId` and `secret` respectively. So, for example:

        var url = new URL(window.location.href);
        var SESSION_ID = url.searchParams.get("sessionId");
        var SECRET = url.searchParams.get("secret");
        var TOKEN = 'wss://' + location.hostname + ':4443?sessionId=' + SESSION_ID + '&secret=' + SECRET + '&recorder=true';
        var session = OV.initSession();
        session.connect(TOKEN);

    **2) You will need to subscribe to, at least, one event:** `streamCreated` of Session object. That way you can subscribe your recorder to every stream when any user starts publishing (by default, the video element will be automatically removed on every `streamDestroyed` event). To sum up, this would be the simplest code you need to properly start your recorder participant:

        var OV = new OpenVidu();

        var url = new URL(window.location.href);
        var SESSION_ID = url.searchParams.get("sessionId");
        var SECRET = url.searchParams.get("secret");
        var TOKEN = 'wss://' + location.hostname + ':4443?sessionId=' + SESSION_ID + '&secret=' + SECRET + '&recorder=true';
        var session = OV.initSession();

        session.on("streamCreated", (event) => {
            session.subscribe(event.stream, 'html-id-where-insert-video');
        });

        session.connect(TOKEN);

<br>

- **HOW TO IDENTIFY YOUR USERS**: you can identify them by making use of property `Stream.connection.data` of the Stream object retrieved in Session event "streamCreated". That way you may know which particular user should be displayed in which particular HTML element of your layout. For example:

        session.on("streamCreated", (event) => {
            var stream = event.stream;
            if (stream.connection.data === 'userBigVideo') {
                session.subscribe(stream, 'big-video-div');
            } else if (stream.connection.data === 'userSmallVideo') {
                session.subscribe(stream, 'small-video-div');
            }
        });

<br>

---

### 2. Add new properties when launching openvidu-server

You can configure where should OpenVidu Server look for your custom layout in the system.<br>Default path is `/opt/openvidu/custom-layout`, but you can configure it with system property `openvidu.recording.custom-layout`. OpenVidu Server must have read access to that path.

<br>
**[openvidu-server.jar](https://github.com/OpenVidu/openvidu/releases){:target="_blank"}**

```console
java -jar \
    -Dopenvidu.recording=true \
    -Dopenvidu.recording.path=/PATH/TO/VIDEO/FILES \
    -Dopenvidu.recording.custom-layout: /PATH/TO/INDEX/CUSTOM/LAYOUT \
openvidu-server.jar
```

<br>
**[openvidu/openvidu-server-kms](https://hub.docker.com/r/openvidu/openvidu-server-kms/){:target="_blank"}** **_(development environment)_**

```console
docker run -p 4443:4443 --rm \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v /PATH/TO/VIDEO/FILES:/PATH/TO/VIDEO/FILES \
    -v /PATH/TO/INDEX/CUSTOM/LAYOUT:/PATH/TO/INDEX/CUSTOM/LAYOUT \
    -e MY_UID=$(id -u $USER) \
    -e openvidu.recording=true \
    -e openvidu.recording.path=/PATH/TO/VIDEO/FILES \
    -e openvidu.recording.custom-layout=/PATH/TO/INDEX/CUSTOM/LAYOUT \
openvidu/openvidu-server-kms:2.11.0
```

> **WARNING**: remember to add the `-v` option mounting the path defined with `openvidu.recording.custom-layout`

<br>
**[OpenVidu AWS deployment](/deployment/deploying-aws/){:target="_blank"}**

You must store your custom layouts in the server under default path `/opt/openvidu/custom-layout`

<br>

---

### 3. Configure your recordings to use your custom layout

<div class="lang-tabs-container" markdown="1">

<div class="lang-tabs-header">
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; font-weight: bold">REST API</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Java</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Node</button>
</div>

<div id="rest-api" class="lang-tabs-content" markdown="1">

When starting the recording of a session with method [POST /api/recordings/start](/reference-docs/REST-API#post-apirecordingsstart){:target="_blank"} pass parameters<br>`{"outputMode": "COMPOSED", "recordingLayout": "CUSTOM"}`

</div>

<div id="java" class="lang-tabs-content" style="display:none" markdown="1">

```java
RecordingProperties properties = new RecordingProperties.Builder()
    .outputMode(Recording.OutputMode.COMPOSED)
    .recordingLayout(RecordingLayout.CUSTOM)
    .build();
Recording recording = openVidu.startRecording(session.getSessionId(), properties);
```

</div>

<div id="node" class="lang-tabs-content" style="display:none" markdown="1">

```javascript
var recording;

openvidu.startRecording(sessionId, {
    outputMode: Recording.OutputMode.COMPOSED,
    recordingLayout: RecordingLayout.CUSTOM
})
    .then(response => recording = response)
    .catch(error => console.error(error));
```

</div>

</div>

<br>

---

## Configuring multiple custom layouts

You can implement as many custom recording layouts as you want. Simply store each one of them (each one with its own `index.html` entrypoint file) in a subfolder under path defined with system property `openvidu.recording.custom-layout` (default value `/opt/openvidu/custom-layout`). Then, when configuring your sessions as stated above in point 3, just add a new parameter:

<div class="lang-tabs-container" markdown="1">

<div class="lang-tabs-header">
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; font-weight: bold">REST API</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Java</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Node</button>
</div>

<div id="rest-api" class="lang-tabs-content" markdown="1">

When starting the recording of a session with method [POST /api/recordings/start](/reference-docs/REST-API#post-apirecordingsstart){:target="_blank"} pass parameters<br>`{"outputMode": "COMPOSED", "recordingLayout": "CUSTOM", "customLayout": "RELATIVE/PATH/TO/INDEX"}`

</div>

<div id="java" class="lang-tabs-content" style="display:none" markdown="1">

```java
RecordingProperties properties = new RecordingProperties.Builder()
    .outputMode(Recording.OutputMode.COMPOSED)
    .recordingLayout(RecordingLayout.CUSTOM)
    .customLayout("RELATIVE/PATH/TO/INDEX")
    .build();
Recording recording = openVidu.startRecording(session.getSessionId(), properties);
```

</div>

<div id="node" class="lang-tabs-content" style="display:none" markdown="1">

```javascript
var recording;

openvidu.startRecording(sessionId, {
    outputMode: Recording.OutputMode.COMPOSED,
    recordingLayout: RecordingLayout.CUSTOM,
    customLayout: "RELATIVE/PATH/TO/INDEX"
})
    .then(response => recording = response)
    .catch(error => console.error(error));
```

</div>

</div>

<br>

In the snippets above, string `RELATIVE/PATH/TO/INDEX` is the path from openvidu-server configuration property `openvidu.recording.custom-layout` to the specific `index.html` you want to use for a particular recording. So, if you have the following folder tree structure in your OpenVidu Server host:

```
/opt
+-- /openvidu
|   +-- /my_custom_layouts
|       +-- index.html
|       +-- /layout1
|           +-- index.html
|       +-- /layout2
|           +-- index.html
/etc
    ...
```

You should start openvidu-server with property `openvidu.recording.custom-layout=/opt/openvidu/my_custom_layouts` and you can use any of the 3 `index.html` files for recording any of your sessions. To use the outer layout in a recording, just configure in recording properties `recordingLayout` to `CUSTOM`. To use any of the inner layouts, also configure `customLayout` to `layout1` or `layout2`.

<br>

---

## Sample custom layout

This is literally the simplest HTML for a custom recording layout. Use it as a template for building more complex ones (you will need **[latest `openvidu-browser-VERSION.min.js` file](https://github.com/OpenVidu/openvidu/releases){:target="_blank"}** to be in the same folder)

```html
<html>

<head><script src="openvidu-browser-2.8.0.min.js"></script></head>

<body>
    <div id="videos"></div>
</body>

<script>
    var url = new URL(window.location.href);
    var SESSION_ID = url.searchParams.get("sessionId");
    var SECRET = url.searchParams.get("secret");
    var TOKEN = 'wss://' + location.hostname + ':4443?sessionId=' + SESSION_ID + '&secret=' + SECRET + '&recorder=true';

    var OV = new OpenVidu();
    var session = OV.initSession();

    session.on("streamCreated", (event) => {
        session.subscribe(event.stream, 'videos');
    });
    session.connect(TOKEN)
        .then(() => { console.log('Recorder participant connected') })
        .catch(error => { console.error(error) });
</script>

</html>
```

<br><br>

---

# Local recording in the browser

OpenVidu Browser offers an extremely simple API to record Streams directly in the client's browser. Check it out [here](../../api/openvidu-browser/classes/localrecorder.html){:target="_blank"}.

<br>

<script>
function changeLangTab(event) {
  var parent = event.target.parentNode.parentNode;
  var txt = event.target.textContent || event.target.innerText;
  var txt = txt.replace(/\s/g, "-").toLowerCase();
  for (var i = 0; i < parent.children.length; i++) {
    var child = parent.children[i];
    // Change appearance of language buttons
    if (child.classList.contains("lang-tabs-header")) {
        for (var j = 0; j < child.children.length; j++) {
            var btn = child.children[j];
            if (btn.classList.contains("lang-tabs-btn")) {
                btn.style.backgroundColor = btn === event.target ? '#e8e8e8' : '#f9f9f9';
                btn.style.fontWeight = btn === event.target ? 'bold' : 'normal';
            }
        }
    }
    // Change visibility of language content
    if (child.classList.contains("lang-tabs-content")) {
        if (child.id === txt) {
            child.style.display = "block";
        } else {
            child.style.display = "none";
        }
    }
  }
}
</script>