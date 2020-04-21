# Recording

- **[How to record sessions](#how-to-record-sessions)**
- **[Composed recording](#composed-recording)**
- **[Individual stream recording](#individual-stream-recording)**
- **[Audio-only and video-only recordings](#audio-only-and-video-only-recordings)**
- **[Automatic stop of recordings](#automatic-stop-of-recordings)**
- **[Custom recording layouts](#custom-recording-layouts)**
    - [Configuring multiple custom layouts](#configuring-multiple-custom-layouts)
    - [Using an external custom layout](#using-an-external-custom-layout)
    - [Debugging your custom layouts](#debugging-your-custom-layouts)
    - [Sample custom layout](#sample-custom-layout)
- **[Local recording in the browser](#local-recording-in-the-browser)**

---
<br>

OpenVidu Server can be configured to record sessions. Two modes of recordings are available:

- **COMPOSED**: every publisher stream is composed in the same video file in a grid layout. You can use the default layout, that will evenly distribute each stream in the available space, or you can use your own custom layout implemented with HTML/CSS/JS.

- **INDIVIDUAL**: every publisher stream is recorded in its own file, generating a ZIP file containing all videos along with a text file with synchronization data. This recording mode cannot directly produce a single mixed video file of all the streams of the session, but is much more efficient than COMPOSED mode (which is quite demanding in terms of CPU).

<br>

---

# How to record sessions

### 1. Enable OpenVidu recording module

#### For OpenVidu production deployments

Configure the following property in the **`.env`** file at OpenVidu installation path (default to `/opt/openvidu`)

```yaml
OPENVIDU_RECORDING=true
```

> There are other environment variables related to recordings configuration that may be set.<br>
> Visit [OpenVidu configuration](reference-docs/openvidu-config/){:target="_blank"} to see the full list.

#### For OpenVidu development docker container

If your are using the official [openvidu/openvidu-server-kms](https://hub.docker.com/r/openvidu/openvidu-server-kms){:target="_blank"} docker container in your development environment and want to enable the recording module, then run it like this:

```console
docker run -p 4443:4443 --rm \
    -e OPENVIDU_RECORDING=true \
    -e OPENVIDU_RECORDING_PATH=/PATH/TO/VIDEO/FILES \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v /PATH/TO/VIDEO/FILES:/PATH/TO/VIDEO/FILES \
openvidu/openvidu-server-kms:2.12.0
```

The two configuration properties that must be set are:

- `OPENVIDU_RECORDING`: enables OpenVidu recording module. Another Docker image ([openvidu/openvidu-recording](https://hub.docker.com/r/openvidu/openvidu-recording/){:target="_blank"}) will be downloaded only during the first run of the container.
- `OPENVIDU_RECORDING_PATH`: where to store the recorded video files on the host machine. OpenVidu Server must have write access to this path.

It is also necessary to mount 2 volumes:

- `-v /var/run/docker.sock:/var/run/docker.sock`: gives OpenVidu development container access to the Docker daemon.
- `-v /PATH/TO/VIDEO/FILES:/PATH/TO/VIDEO/FILES`: gives access to the recorded video files through the container.

> **IMPORTANT!** `/PATH/TO/VIDEO/FILES` must be the same in property `OPENVIDU_RECORDING_PATH=/PATH/TO/VIDEO/FILES` and in both sides of volume flag `-v /PATH/TO/VIDEO/FILES:/PATH/TO/VIDEO/FILES`

<p></p>

> There are other environment variables related to recordings configuration that may be set.<br>
> Visit [OpenVidu configuration](reference-docs/openvidu-config/){:target="_blank"} to see the full list.

<br>

---

### 2. Configure your Sessions to be recorded

<br>
Recording can be configured in two ways:

- **ALWAYS**: the session will be automatically recorded from the moment the first participant starts publishing.

- **MANUAL**: you will have to tell OpenVidu when to start the recording of the session.

In both cases you can stop the recording manually, and every recording will always be automatically stopped if last user leaves the session and certain timeout elapses (see [Automatic stop of recordings](#automatic-stop-of-recordings)).

<br>

You can use [REST API](reference-docs/REST-API/){:target="_blank"} or any of the server SDKs ([openvidu-java-client](reference-docs/openvidu-java-client/){:target="_blank"}, [openvidu-node-client](reference-docs/openvidu-node-client/){:target="_blank"}) to manage your recorded sessions.

<div class="lang-tabs-container" markdown="1">

<div class="lang-tabs-header">
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; font-weight: bold">REST API</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Java</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Node</button>
</div>

<div id="rest-api" class="lang-tabs-content" markdown="1">

1. Initialize your sessions with this POST method: [POST /api/sessions](reference-docs/REST-API#post-apisessions){:target="_blank"}<br>You may configure default values for recordings started for this session by sending params such as `defaultOutputMode` or `defaultRecordingLayout`. This way you can pre-configure recordings that will be automatically started (for sessions with `{"recordingMode": "ALWAYS"}`). For these sessions configured with `ALWAYS` recording mode, no more steps are needed.

2. If you have configured your session with `"recordingMode": "MANUAL"`

    - Start the recording with this POST method: [POST /api/recordings/start](reference-docs/REST-API#post-apirecordingsstart){:target="_blank"}<br>You can pass parameters to override default recording configuration values set in step 1 and to further configure it with other available options

    - Stop the recording with this POST method: [POST /api/recordings/stop](reference-docs/REST-API#post-apirecordingsstopltrecording_idgt){:target="_blank"}

</div>

<div id="java" class="lang-tabs-content" style="display:none" markdown="1">

1. Call `OpenVidu.createSession()` passing as an optional parameter a `SessionProperties` object. You may configure default values for recordings started for this session with that object. This way you can pre-configure recordings that will be automatically started (for sessions with `RecordingMode.ALWAYS`)

        OpenVidu openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
        SessionProperties properties = new SessionProperties.Builder()
            .recordingMode(RecordingMode.MANUAL) // RecordingMode.ALWAYS for automatic recording
            .defaultOutputMode(Recording.OutputMode.INDIVIDUAL)
            .build();
        Session session = openVidu.createSession(properties);

2. If Session is configured with `RecordingMode.MANUAL`, manually start and stop the recording whenever you want. You may pass a [RecordingProperties](api/openvidu-java-client/io/openvidu/java/client/RecordingProperties.html){:target="_blank"} object when calling `OpenVidu.startRecording` method to override default values configured in step 1 and to further configure it with other available options

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

2. If Session is configured with `RecordingMode.MANUAL`, manually start and stop the recording whenever you want. You may pass a [RecordingProperties](api/openvidu-node-client/interfaces/recordingproperties.html){:target="_blank"} object when calling `OpenVidu.startRecording` method to override default values configured in step 1 and to further configure it with other available options

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

When starting the recording of a session with method [POST /api/recordings/start](reference-docs/REST-API#post-apirecordingsstart){:target="_blank"} pass parameters<br>`{"outputMode: "COMPOSED", "recordingLayout": "BEST_FIT"}`

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
    <img class="img-responsive" src="img/docs/advanced-features/recorded-video.png">
</p>

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

When starting the recording of a session with method [POST /api/recordings/start](reference-docs/REST-API#post-apirecordingsstart){:target="_blank"} pass parameter `{"outputMode:"INDIVIDUAL"}`

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

When starting the recording of a session with method [POST /api/recordings/start](reference-docs/REST-API#post-apirecordingsstart){:target="_blank"} simply pass parameters `hasAudio` or `hasVideo` with the desired values.

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

> **Notes on audio/video only recordings**<br>
>
> - Recordings configured to not record neither audio nor video will fail to start, returning a status error of 422<br><br>
> - COMPOSED video-only recordings will generate an MP4 file. COMPOSED audio-only recordings will generate a WEBM file. INDIVIDUAL recordings will always generate a ZIP file containing one WEBM file for each recorded stream<br><br>
> - Streams published during a video-only recording that are audio-only won't be recorded: they won't be included in the grid layout for COMPOSED recordings and won't generate a WEBM file in INDIVIDUAL recordings. Same for audio-only recordings with video-only streams<br><br>
> - Recordings started automatically (with recording mode `ALWAYS`) will record both audio and video

<br>

---

# Automatic stop of recordings

Any started recording will automatically be stopped when any of the following situations occur and certain timeout elapses. This timeout is by default 120 seconds, but you can configure it with [system property `OPENVIDU_RECORDING_AUTOSTOP_TIMEOUT`](reference-docs/openvidu-config/){:target="_blank"}. The automatic recording stop timout will start:

- For any recorded session, if last user disconnects from the session.

- For sessions with recording mode `MANUAL`, if the recording is started and no user is publishing a stream.

The only condition to abort the timeout is to have any user publishing a stream to the session within the timeout.

During the timeout sessions will always remain opened and the recording active. If the timeout elapses and no stream is being published to the session, the recording will be stopped. If in addition there's no user connected to the session, the session will also be immediately closed.

You can always manually stop any recording at any time, even during the automatic stop timeout:

<div class="lang-tabs-container" markdown="1">

<div class="lang-tabs-header">
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; font-weight: bold">REST API</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Java</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Node</button>
</div>

<div id="rest-api" class="lang-tabs-content" markdown="1">

[POST /api/recordings/stop/&lt;RECORDING_ID&gt;](reference-docs/REST-API#post-apirecordingsstopltrecording_idgt){:target="_blank"}

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

        'wss://' + location.host + '?sessionId=' + SESSION_ID + '&secret=' + SECRET + '&recorder=true';

    Being `SESSION_ID` and `SECRET` two parameters that will be url-encoded under ids `sessionId` and `secret` respectively. So, for example:

        var url = new URL(window.location.href);
        var SESSION_ID = url.searchParams.get("sessionId");
        var SECRET = url.searchParams.get("secret");
        var TOKEN = 'wss://' + location.host + '?sessionId=' + SESSION_ID + '&secret=' + SECRET + '&recorder=true';
        var session = OV.initSession();
        session.connect(TOKEN);

    **2) You will need to subscribe to, at least, one event:** `streamCreated` of Session object. That way you can subscribe your recorder to every stream when any user starts publishing (by default, the video element will be automatically removed on every `streamDestroyed` event). To sum up, this would be the simplest code you need to properly start your recorder participant:

        var OV = new OpenVidu();

        var url = new URL(window.location.href);
        var SESSION_ID = url.searchParams.get("sessionId");
        var SECRET = url.searchParams.get("secret");
        var TOKEN = 'wss://' + location.host + '?sessionId=' + SESSION_ID + '&secret=' + SECRET + '&recorder=true';
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

### 2. Configure custom layouts in OpenVidu Server

You can configure where should OpenVidu Server look for your custom layout in the system.<br>Default path is `/opt/openvidu/custom-layout`, but you can configure it with system property `OPENVIDU_RECORDING_CUSTOM_LAYOUT`. OpenVidu Server must have read access to that path, where you must have stored the `index.html` file of your layout.

<br>
**OpenVidu production deployments**

Default path `/opt/openvidu/custom-layout` is the recommended one. But if for any reason you want to change it, then set the following property in the **`.env`** configuration file:

```console
OPENVIDU_RECORDING_PATH=/PATH/TO/VIDEO/FILES
```

<br>
**[OpenVidu development docker container](https://hub.docker.com/r/openvidu/openvidu-server-kms/){:target="_blank"}** **_(development environment)_**

```console
docker run -p 4443:4443 --rm \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v /PATH/TO/VIDEO/FILES:/PATH/TO/VIDEO/FILES \
    -v /PATH/TO/INDEX/CUSTOM/LAYOUT:/PATH/TO/INDEX/CUSTOM/LAYOUT \
    -e OPENVIDU_RECORDING=true \
    -e OPENVIDU_RECORDING_PATH=/PATH/TO/VIDEO/FILES \
    -e OPENVIDU_RECORDING_CUSTOM_LAYOUT=/PATH/TO/INDEX/CUSTOM/LAYOUT \
openvidu/openvidu-server-kms:2.12.0
```

> **WARNING**: remember to add the `-v` option mounting the path defined with `OPENVIDU_RECORDING_CUSTOM_LAYOUT`

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

When starting the recording of a session with method [POST /api/recordings/start](reference-docs/REST-API#post-apirecordingsstart){:target="_blank"} pass parameters<br>`{"outputMode": "COMPOSED", "recordingLayout": "CUSTOM"}`

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

You can implement as many custom recording layouts as you want. Simply store each one of them (each one with its own `index.html` entrypoint file) in a subfolder under path defined with system property `OPENVIDU_RECORDING_CUSTOM_LAYOUT` (default value `/opt/openvidu/custom-layout`). Then, when configuring your sessions as stated above in point 3, just add a new parameter:

<div class="lang-tabs-container" markdown="1">

<div class="lang-tabs-header">
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; font-weight: bold">REST API</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Java</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Node</button>
</div>

<div id="rest-api" class="lang-tabs-content" markdown="1">

When starting the recording of a session with method [POST /api/recordings/start](reference-docs/REST-API#post-apirecordingsstart){:target="_blank"} pass parameters<br>`{"outputMode": "COMPOSED", "recordingLayout": "CUSTOM", "customLayout": "RELATIVE/PATH/TO/INDEX"}`

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

In the snippets above, string `RELATIVE/PATH/TO/INDEX` is the path from openvidu-server configuration property `OPENVIDU_RECORDING_CUSTOM_LAYOUT` to the specific `index.html` you want to use for a particular recording. So, if you have the following folder tree structure in your OpenVidu Server host:

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

You should start openvidu-server with property `OPENVIDU_RECORDING_CUSTOM_LAYOUT=/opt/openvidu/my_custom_layouts` and you can use any of the 3 `index.html` files for recording any of your sessions. To use the outer layout in a recording, just configure in recording properties `recordingLayout` to `CUSTOM`. To use any of the inner layouts, also configure `customLayout` to `layout1` or `layout2`.

<br>

---

## Using an external custom layout

OpenVidu allows you to configure a recording to use a custom layout deployed outside OpenVidu host. This is useful if, for whatever reason, you have your layout being served in a different server. To achieve this, you just have to configure the complete URL where your layout is served in property `customLayout`:

<div class="lang-tabs-container" markdown="1">

<div class="lang-tabs-header">
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; font-weight: bold">REST API</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Java</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Node</button>
</div>

<div id="rest-api" class="lang-tabs-content" markdown="1">

When starting the recording of a session with method [POST /api/recordings/start](reference-docs/REST-API#post-apirecordingsstart){:target="_blank"} pass parameters<br>`{"outputMode": "COMPOSED", "recordingLayout": "CUSTOM", "customLayout": "https://USER:PASS@my.domain.com:8888/path?myParam=123"}`

</div>

<div id="java" class="lang-tabs-content" style="display:none" markdown="1">

```java
RecordingProperties properties = new RecordingProperties.Builder()
    .outputMode(Recording.OutputMode.COMPOSED)
    .recordingLayout(RecordingLayout.CUSTOM)
    .customLayout("https://USER:PASS@my.domain.com:8888/path?myParam=123")
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
    customLayout: "https://USER:PASS@my.domain.com:8888/path?myParam=123"
})
    .then(response => recording = response)
    .catch(error => console.error(error));
```

</div>

</div>

<br>

> As you can see, this URL may have credentials and any query parameter or token you may need in your custom layout.<br>For example, in the snippets above the layout files would be protected by Basic Auth with "USER" ans "PASS" as username and password, and you could access value `123` in your layout JS code just by calling <br>`new URL(window.location.href).searchParams.get("myParam");`

<br>

---

## Debugging your custom layouts

To debug your custom layout, you just need to store it in the path declared with property `OPENVIDU_RECORDING_CUSTOM_LAYOUT`, as explained in section [Configure custom layouts in OpenVidu Server](#2-configure-custom-layouts-in-openvidu-server).

Then, by using your OpenVidu application, start a session and as many publishers as you expect to be recorded in your custom layout. Finally you just have to connect to your layout through **Chrome** by entering url:

**https://OPENVIDUAPP:`SECRET`@`OPENVIDU_IP`:`OPENVIDU_PORT`/layouts/custom/index.html?sessionId=`SESSION_ID`&secret=`SECRET`**

Being:

- `SECRET`: parameter `OPENVIDU_SECRET` configured when launching openvidu-server
- `OPENVIDU_IP`: the IP where openvidu-server is accessible in your development machine. You will be probably using [openvidu-server-kms docker container](https://hub.docker.com/r/openvidu/openvidu-server-kms/){:target="_blank"} in your development environment, so this parameter is `localhost` if you are in Mac or Linux, and the docker IP of the container if you are in Windows (see this [FAQ](troubleshooting/#3-i-am-using-windows-to-run-the-tutorials-develop-my-app-anything-i-should-know){:target="_blank})
- `OPENVIDU_PORT`: port where openvidu-server is listening. In OpenVidu production deployments this is by default `443` and if using the development container it is by default `4443`.
- `SESSION_ID`: the session ID you have initialized for the debugging process. Here's a little tip: you can initialize the session in openvidu-server ([REST API](reference-docs/REST-API/#post-apisessions){:target="_blank"}, [openvidu-java-client](reference-docs/openvidu-java-client/#create-a-session){:target="_blank"}, [openvidu-node-client](reference-docs/openvidu-node-client/#create-a-session){:target="_blank"}) configuring parameter `customSessionId` to fix this session ID and avoid having to change it every time you restart your session.

> By connecting with Chrome to the above URL you will see the exact result obtained when recording a session with your custom layout. You can open the browsers console to debug any error, and you can also change the HTML/CSS/JS files of your layout until you are happy with the outcome. Refresh the browser's tab after any change in the HTML/JS/CSS files to see the changes.

<br>

---

## Sample custom layout

This is literally the simplest HTML for a custom recording layout. Use it as a template for building more complex ones (you will need **[latest `openvidu-browser-VERSION.min.js` file](https://github.com/OpenVidu/openvidu/releases){:target="_blank"}** to be in the same folder. Be sure to use the same version number as your openvidu-server!)

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
    var TOKEN = 'wss://' + location.host + '?sessionId=' + SESSION_ID + '&secret=' + SECRET + '&recorder=true';

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

OpenVidu Browser offers an extremely simple API to record Streams directly in the client's browser. Check it out [here](api/openvidu-browser/classes/localrecorder.html){:target="_blank"}.

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