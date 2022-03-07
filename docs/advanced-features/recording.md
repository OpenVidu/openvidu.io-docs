# Recording

- **[How to record sessions](#how-to-record-sessions)**
- **[Composed recording](#composed-recording)**
    - [Composed quick start recording](#composed-quick-start-recording)
    - [Scalable composed recording](#scalable-composed-recording)<a href="openvidu-pro/" target="_blank"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin-left: 5px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span></a>
- **[Individual stream recording](#individual-recording)**
    - [Selecting streams to be recorded](#individual-recording-selection)<a href="openvidu-pro/" target="_blank"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin-left: 5px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span></a>
- **[Audio-only and video-only recordings](#audio-only-and-video-only-recordings)**
- **[Automatic stop of recordings](#automatic-stop-of-recordings)**
- **[Custom recording layouts](#custom-recording-layouts)**
    - [Configuring multiple custom layouts](#configuring-multiple-custom-layouts)
    - [Using an external custom layout](#using-an-external-custom-layout)
    - [Debugging your custom layouts](#debugging-your-custom-layouts)
    - [Sample custom layout](#sample-custom-layout)
- **[Uploading recordings to S3](#uploading-recordings-to-s3)**<a href="openvidu-pro/" target="_blank"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin-left: 5px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span></a>
- **[Local recording in the browser](#local-recording-in-the-browser)**
- **[Troubleshooting](#troubleshooting)**

---

<br>

OpenVidu Server can be configured to record sessions. Two modes of recordings are available:

- **COMPOSED**: every publisher stream is composed in the same video file in a grid layout. You can use the default layout, that will evenly distribute each stream in the available space, or you can use your own custom layout implemented with HTML/CSS/JS.

- **INDIVIDUAL**: every publisher stream is recorded in its own file, generating a ZIP file containing all videos along with a text file with synchronization data. This recording mode cannot directly produce a single mixed video file of all the streams of the session, but is much more efficient than COMPOSED mode (which is quite demanding in terms of CPU).

<br>

For technical information about the media codecs and formats used for recording, check here: [Codecs on OpenVidu Recordings](advanced-features/media-codecs/#recording){:target="_blank"}.

<br>

---

# How to record sessions

### 1. Enable OpenVidu recording module

#### For OpenVidu production deployments

Configure the following property in the **`.env`** file at OpenVidu installation path (default to `/opt/openvidu`)

```properties
OPENVIDU_RECORDING=true
```

> There are other environment variables related to recordings configuration that may be set.<br>
> Visit [OpenVidu configuration](reference-docs/openvidu-config/){:target="_blank"} to see the full list.

#### For OpenVidu development docker container

If your are using the official [openvidu/openvidu-server-kms](https://hub.docker.com/r/openvidu/openvidu-server-kms){:target="_blank"} docker container in your development environment and want to enable the recording module, then run it like this:

```shell
docker run -p 4443:4443 --rm \
    -e OPENVIDU_RECORDING=true \
    -e OPENVIDU_RECORDING_PATH=/PATH/TO/VIDEO/FILES \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v /PATH/TO/VIDEO/FILES:/PATH/TO/VIDEO/FILES \
openvidu/openvidu-server-kms:2.21.0
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
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; color: black">Java</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Node</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">cURL</button>
</div>

<div id="java" class="lang-tabs-content" markdown="1">

1. Call `OpenVidu.createSession()` passing as an optional parameter a `SessionProperties` object. You may configure default values for recordings started for this session with that object. This way you can pre-configure recordings that will be automatically started (for sessions with `RecordingMode.ALWAYS`)

        OpenVidu openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
        RecordingProperties recordingProperties = new RecordingProperties.Builder()
            .outputMode(Recording.OutputMode.COMPOSED)
            .resolution("640x480")
            .frameRate(24)
            .build();
        SessionProperties sessionProperties = new SessionProperties.Builder()
            .recordingMode(RecordingMode.MANUAL) // RecordingMode.ALWAYS for automatic recording
            .defaultRecordingProperties(recordingProperties)
            .build();
        Session session = openVidu.createSession(sessionProperties);

2. If Session is configured with `RecordingMode.MANUAL`, manually start and stop the recording whenever you want. You may pass a [RecordingProperties](api/openvidu-java-client/io/openvidu/java/client/RecordingProperties.html){:target="_blank"} object when calling `OpenVidu.startRecording` method to override default values configured in step 1 or to further configure it with other available options

        RecordingProperties properties = new RecordingProperties.Builder()
            .name("MY_RECORDING_NAME")
            .build();
        Recording recording = openVidu.startRecording(session.getSessionId(), properties); // Starts recording
        recording = openVidu.stopRecording(recording.getId()); // Stops recording

</div>

<div id="node" class="lang-tabs-content" style="display:none" markdown="1">

1. Call `OpenVidu.createSession()` passing as an optional parameter a `SessionProperties` object. You may configure default values for recordings started for this session with that object. This way you can pre-configure recordings that will be automatically started (for sessions with `RecordingMode.ALWAYS`)

        var openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
        var sessionProperties = {
            recordingMode: RecordingMode.MANUAL, // RecordingMode.ALWAYS for automatic recording
            defaultRecordingProperties: {
                outputMode: Recording.OutputMode.COMPOSED,
                resolution: "640x480",
                frameRate: 24
            }
        };
        var mySession = openvidu.createSession(sessionProperties);

2. If Session is configured with `RecordingMode.MANUAL`, manually start and stop the recording whenever you want. You may pass a [RecordingProperties](api/openvidu-node-client/interfaces/recordingproperties.html){:target="_blank"} object when calling `OpenVidu.startRecording` method to override default values configured in step 1 or to further configure it with other available options

        var recording;

        // Starts recording
        openvidu.startRecording(sessionId, {
            name: "MY_RECORDING_NAME"
        })
          .then(response => recording = response)
          .catch(error => console.error(error));

        // Stops recording
        openvidu.stopRecording(recording.id)
          .then(response => recording = response)
          .catch(error => console.error(error));

</div>

<div id="curl" class="lang-tabs-content" style="display:none" markdown="1">

1. Initialize your sessions with method [POST /openvidu/api/sessions](reference-docs/REST-API#post-session){:target="_blank"}<br>You may configure default values for recordings started for this session by sending parameter `defaultRecordingProperties`. This way you can pre-configure recordings that will be automatically started (for sessions with `{"recordingMode": "ALWAYS"}`). For these sessions configured with `ALWAYS` recording mode, no more steps are needed.

        curl -X POST https://<DOMAIN_OR_PUBLIC_IP>/openvidu/api/sessions \
             -u OPENVIDUAPP:<YOUR_SECRET> \
             -H "Content-Type: application/json" \
             --data-binary @- <<BODY
             {
               "session": "ses_YnDaGYNcd7",
               "recordingMode": "MANUAL",
               "defaultRecordingProperties": {
                 "outputMode": "COMPOSED",
                 "resolution": "640x480",
                 "frameRate": 24
               }
             }
        BODY

2. If you have configured your session with `"recordingMode": "MANUAL"` :

    - Start the recording with method [POST /openvidu/api/recordings/start](reference-docs/REST-API#post-recording-start){:target="_blank"}. You can pass parameters to override the default recording properties set in step 1 or to further configure it with other available options.

            curl -X POST https://<DOMAIN_OR_PUBLIC_IP>/openvidu/api/recordings/start \
                 -u OPENVIDUAPP:<YOUR_SECRET> \
                 -H "Content-Type: application/json" \
                 -d '{ "session": "ses_YnDaGYNcd7", "name": "MY_RECORDING_NAME" }'

    - Stop the recording with method [POST /openvidu/api/recordings/stop](reference-docs/REST-API#post-recording-stop){:target="_blank"}

            curl -X POST https://<DOMAIN_OR_PUBLIC_IP>/openvidu/api/recordings/stop/<RECORDING_ID> \
                 -u OPENVIDUAPP:<YOUR_SECRET>

</div>

</div>

<br>

---

<br>

# Composed recording {: #composed-recording }

Every publisher stream is composed in the same video file in a grid layout. This is the default recording mode, and it will generate as output an MP4 file.

You can use the default layout, that will evenly distribute each stream in the available space, or you can [use your own custom layout](#custom-recording-layouts).<br>To use the default layout:

<div class="lang-tabs-container" markdown="1">

<div class="lang-tabs-header">
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; color: black">Java</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Node</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">cURL</button>
</div>

<div id="java" class="lang-tabs-content" markdown="1">

```java
RecordingProperties properties = new RecordingProperties.Builder()
    .outputMode(Recording.OutputMode.COMPOSED)
    .recordingLayout(RecordingLayout.BEST_FIT)
    .resolution("640x480")
    .frameRate(24)
    .build();
Recording recording = openVidu.startRecording(session.getSessionId(), properties);
```

</div>

<div id="node" class="lang-tabs-content" style="display:none" markdown="1">

```javascript
var recording;

openvidu.startRecording(sessionId, {
    outputMode: Recording.OutputMode.COMPOSED,
    recordingLayout: RecordingLayout.BEST_FIT,
    resolution: "640x480",
    frameRate: 24
})
    .then(response => recording = response)
    .catch(error => console.error(error));
```

</div>

<div id="curl" class="lang-tabs-content" style="display:none" markdown="1">

When starting the recording of a session with method [POST /openvidu/api/recordings/start](reference-docs/REST-API#post-recording-start){:target="_blank"} pass parameter `outputMode` to `"COMPOSED"`

```sh
curl -X POST https://<DOMAIN_OR_PUBLIC_IP>/openvidu/api/recordings/start \
     -u OPENVIDUAPP:<YOUR_SECRET> \
     -H "Content-Type: application/json" \
     --data-binary @- <<BODY
     {
       "session": "ses_YnDaGYNcd7",
       "outputMode": "COMPOSED",
       "recordingLayout": "BEST_FIT",
       "resolution": "640x480",
       "frameRate": 24
     }
BODY
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
> - If a COMPOSED recording is configured to record video (that is, not being an **[audio-only recording](#audio-only-and-video-only-recordings)**), this type of grid recording **can be a pretty heavy consuming process**. A maximum number of 4 publishers is recommended, and starting more than 2 recordings of this type at the same time can overload server CPUs. For these reasons, when using OpenVidu CE it is desirable to launch OpenVidu Server in a host with significant CPU power if COMPOSED video recordings are expected. In OpenVidu Pro, the same applies to the Media Node hosting the recording process. In comparison, INDIVIDUAL stream recording (and COMPOSED audio-only recording) can be **4x up to 10x more efficient**<br><br>
> - You can configure the resolution and frame rate of the MP4 file for COMPOSED recordings by using `resolution` and `frameRate` properties when starting the recording<br><br>
> - A thumbnail got from the middle of the video will be generated for COMPOSED recordings that have video. They will be stored next to the MP4 file and named [RECORDING_ID].jpg

<br>

---

## Composed quick start recording

There is an extra recording output mode which is a variation of [COMPOSED recording](#composed-recording). The resulting recorded file will be exactly the same, but in this case the lifespan of the recording module will be attached to the **lifecycle of the session**, not to the lifecycle of the recording. This means that:

- If you configure a Session with this composed quick start recording mode, a new recording module especially dedicated to this session will be instantiated even before you start to record it. All of the session streams will be rendered by the recording module all the time, even when not being recorded.
- When starting the recording, the process will be as fast as physically possible for composed recordings: no need to launch the recording module and to establish the inner media connections, as this has already been done in the background.
- When stopping the recording, the recording module of this session won't be terminated. This way the next recording of the same session will also start as quickly as possible. Only when closing the session this particular recording module will be terminated and its resources freed up.

When should you consider using this mode? When **response time** starting a composed recording is key in your use case. If you are going to start and stop multiple short composed recordings for the same session over time, then this mode can also be helpful. But take into account that each one of the sessions initialized with this recording mode **will require considerable CPU power in your server** (at least 1 dedicated CPU).

To initialize a Session with this recording output mode, just use **`outputMode = COMPOSED_QUICK_START`** when [configuring your sessions to be recorded](#2-configure-your-sessions-to-be-recorded):

<div class="lang-tabs-container" markdown="1">

<div class="lang-tabs-header">
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; color: black">Java</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Node</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">cURL</button>
</div>

<div id="java" class="lang-tabs-content" markdown="1">

    OpenVidu openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    RecordingProperties recordingProperties = new RecordingProperties.Builder()
        .outputMode(Recording.OutputMode.COMPOSED_QUICK_START)
        .build();
    SessionProperties sessionProperties = new SessionProperties.Builder()
        .defaultRecordingProperties(recordingProperties)
        .build();
    Session session = openVidu.createSession(sessionProperties);

</div>

<div id="node" class="lang-tabs-content" style="display:none" markdown="1">

    var openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    var sessionProperties = {
        defaultRecordingProperties: {
            outputMode: Recording.OutputMode.COMPOSED_QUICK_START
        }
    };
    var mySession = openvidu.createSession(sessionProperties);

</div>

<div id="curl" class="lang-tabs-content" style="display:none" markdown="1">

Initialize your sessions with method [POST /openvidu/api/sessions](reference-docs/REST-API#post-session){:target="_blank"} providing `{"defaultRecordingProperties": {"outputMode": "COMPOSED_QUICK_START"}}`

```sh
curl -X POST https://<DOMAIN_OR_PUBLIC_IP>/openvidu/api/sessions \
     -u OPENVIDUAPP:<YOUR_SECRET> \
     -H "Content-Type: application/json" \
     -d '{ "defaultRecordingProperties": {"outputMode": "COMPOSED_QUICK_START" }}'
```

</div>

</div>

<br>

Then you can initialize your recording as usual:

- If you have configured the session with recording mode `ALWAYS`, then the recording will be automatically started in `COMPOSED_QUICK_START` output mode when the first user publishes.
- If you have configured the session with recording mode `MANUAL`, then you can start recordings with `COMPOSED_QUICK_START` or `COMPOSED` output modes (both will end up being set to `COMPOSED_QUICK_START`), but also with `INDIVIDUAL` output mode if you need so.

> The default recording output mode of the session will determine the output mode of its recordings. If the session is configured with `COMPOSED`, starting a recording with `COMPOSED` or `COMPOSED_QUICK_START` will always end up with the recording set to `COMPOSED`. If the session is configured with `COMPOSED_QUICK_START`, starting a recording with `COMPOSED` or `COMPOSED_QUICK_START` will always end up with the recording set to `COMPOSED_QUICK_START`.

<br>

---

## Scalable composed recording

<div style="
    display: table;
    border: 2px solid #0088aa9e;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 30px;
    padding: 10px 0;
    background-color: rgba(0, 136, 170, 0.04);"><div style="display: table-cell; vertical-align: middle">
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
This feature is part of <a href="openvidu-pro/" target="_blank"><strong>OpenVidu</strong><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin-left: 5px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span></a> tier.
</div>
</div>

For an OpenVidu Pro cluster, by default **composed recordings with video** take place in the same Media Node hosting the recorded Session (see [OpenVidu Pro architecture](openvidu-pro/scalability/#openvidu-pro-architecture){:target="_blank"}). By transferring the recording process to Media Nodes, the Master Node avoids being overloaded even with multiple composed video recordings in progress. Hosting the recording in the same Media Node as its session is the optimal and default choice, as the media doesn't need to be sent across different Media Nodes, saving network traffic. But you can decide to start the composed video recording of a session in a different Media Node, if your specific use case can take advantage of it:

<div class="lang-tabs-container" markdown="1">

<div class="lang-tabs-header">
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; color: black">Java</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Node</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">cURL</button>
</div>

<div id="java" class="lang-tabs-content" markdown="1">

```java
RecordingProperties properties = new RecordingProperties.Builder()
    .outputMode(Recording.OutputMode.COMPOSED)
    .hasVideo(true)
    .mediaNode("media_i-1234567890abcdef0") // The string being the unique ID of an existing Media Node
    .build();
Recording recording = openVidu.startRecording(session.getSessionId(), properties);
```

</div>

<div id="node" class="lang-tabs-content" style="display:none" markdown="1">

```javascript
var recording;

openvidu.startRecording(sessionId, {
    outputMode: Recording.OutputMode.COMPOSED,
    hasVideo: true,
    mediaNode: {id: "media_i-1234567890abcdef0"} // The string being the unique ID of an existing Media Node
})
    .then(response => recording = response)
    .catch(error => console.error(error));
```

</div>

<div id="curl" class="lang-tabs-content" style="display:none" markdown="1">

When starting the recording of a session with method [POST /openvidu/api/recordings/start](reference-docs/REST-API#post-recording-start){:target="_blank"} you can force the Media Node where to start the recording by providing parameter `mediaNode`

```sh
curl -X POST https://<DOMAIN_OR_PUBLIC_IP>/openvidu/api/recordings/start \
     -u OPENVIDUAPP:<YOUR_SECRET> \
     -H "Content-Type: application/json" \
     -d '{ "session": "ses_YnDaGYNcd7", "mediaNode": { "id": "media_i-1234567890abcdef0" }}'
```

</div>

</div>

<br>

If the provided Media Node does not exist or its status is not valid for starting a recording, then a `400 BAD_REQUEST` response is returned. The active recordings that are hosted by a Media Node at any given time are available in the [Media Node object](reference-docs/REST-API/#the-media-node-object){:target="_blank"} of the REST API, in attribute `recordingIds`.

For another perspective on this matter, visit [Scalable recording](openvidu-pro/scalability/#scalable-recording){:target="_blank"}.

<br>

---

# Individual stream recording {: #individual-recording }

Every publisher stream is recorded in its own file. The final result is a ZIP file containing one WEBM file for each published stream during the recording (named after each stream identifier), along with a text file with synchronization information.

<div class="lang-tabs-container" markdown="1">

<div class="lang-tabs-header">
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; color: black">Java</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Node</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">cURL</button>
</div>

<div id="java" class="lang-tabs-content" markdown="1">

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

<div id="curl" class="lang-tabs-content" style="display:none" markdown="1">

When starting the recording of a session with method [POST /openvidu/api/recordings/start](reference-docs/REST-API#post-recording-start){:target="_blank"} pass parameter `outputMode` to `"INDIVIDUAL"`.

```sh
curl -X POST https://<DOMAIN_OR_PUBLIC_IP>/openvidu/api/recordings/start \
     -u OPENVIDUAPP:<YOUR_SECRET> \
     -H "Content-Type: application/json" \
     -d '{ "session": "ses_YnDaGYNcd7", "outputMode": "INDIVIDUAL" }'
```

</div>

</div>

<br>

For example, for a session with 2 publishers the final content of the ZIP file could be:

```console
MyRecording.zip
+-- MyRecording.json
+-- str_CAM_WyJt_con_HZPIDsWXBx.webm
+-- str_CAM_CPQ7_con_PHBKMPOlLb.webm
```

And the content of the JSON synchronization file (`MyRecording.json` in the example above) might be:

```json
{
  "createdAt": 1548947712287,
  "id": "ses_MEx72i7vFd",
  "name": "MyRecording",
  "sessionId": "ses_MEx72i7vFd",
  "files": [
    {
      "connectionId": "con_HZPIDsWXBx",
      "streamId": "str_CAM_WyJt_con_HZPIDsWXBx",
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
      "connectionId": "con_PHBKMPOlLb",
      "streamId": "str_CAM_CPQ7_con_PHBKMPOlLb",
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
> - **id**: unique identifier of the recording. It is built from the session identifier
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

## Selecting streams to be recorded {: #individual-recording-selection }

<div style="
    display: table;
    border: 2px solid #0088aa9e;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 30px;
    padding: 10px 0;
    background-color: rgba(0, 136, 170, 0.04);"><div style="display: table-cell; vertical-align: middle">
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
This feature is part of <a href="openvidu-pro/" target="_blank"><strong>OpenVidu</strong><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin-left: 5px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span></a> tier.
</div>
</div>

In OpenVidu CE all of the streams published to a session being recorded with INDIVIDUAL mode will always be stored to disk. In OpenVidu Pro you have greater control: you can configure in detail which streams are to be recorded, and even activate and deactivate the recording of a specific stream during the very same recording process.

This applies to [INDIVIDUAL recording](#individual-recording). You can specify the streams that should or shouldn't be recorded in a session when creating the Connection for a participant. The default option when creating a Connection is to record all of the streams published by it. Below there are examples of Connections being created that will make their published streams NOT to be recorded when recording the session in INDIVIDUAL mode.

<div class="lang-tabs-container" markdown="1">

<div class="lang-tabs-header">
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; color: black">Java</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Node</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">cURL</button>
</div>

<div id="java" class="lang-tabs-content" markdown="1">

```java
ConnectionProperties connectionProperties = new ConnectionProperties.Builder()
    .record(false)
    .build();
Connection connection = session.createConnection(connectionProperties);
String token = connection.getToken(); // Send this string to the client side
```

See [JavaDoc](api/openvidu-java-client/io/openvidu/java/client/Session.html#createConnection(io.openvidu.java.client.ConnectionProperties)){:target="_blank"}

</div>

<div id="node" class="lang-tabs-content" style="display:none" markdown="1">

```javascript
var connectionProperties = {
    record: false
};
session.createConnection(connectionProperties).then(connection => {
    var token = connection.token; // Send this string to the client side
});
```

See [TypeDoc](api/openvidu-node-client/classes/session.html#createconnection){:target="_blank"}

</div>

<div id="curl" class="lang-tabs-content" style="display:none" markdown="1">

When creating a Connection with method **[POST /openvidu/api/sessions/&lt;SESSION_ID&gt;/connection](reference-docs/REST-API#post-connection){:target="_blank"}** pass parameter `record` to false.

```sh
curl -X POST https://<DOMAIN_OR_PUBLIC_IP>/openvidu/api/sessions/<SESSION_ID>/connection \
     -u OPENVIDUAPP:<YOUR_SECRET> \
     -H "Content-Type: application/json" \
     -d '{ "record": false }'
```

</div>

</div><br>

You can also change on the fly whether the streams of a Connection must be recorded or not. By using the capability of dynamically updating the options of a Connection you can start or stop the individual recording of the Connection's stream at any moment, even while the recording is active:

<div class="lang-tabs-container" markdown="1">

<div class="lang-tabs-header">
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; color: black">Java</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Node</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">cURL</button>
</div>

<div id="java" class="lang-tabs-content" markdown="1">

```java
ConnectionProperties connectionProperties = new ConnectionProperties.Builder()
    .record(false) // false to stop the recording, true to start it
    .build();
// connectionId being Connection.getConnectionId()
session.updateConnection(connectionId, connectionProperties);
```

See [JavaDoc](api/openvidu-java-client/io/openvidu/java/client/Session.html#updateConnection(java.lang.String,io.openvidu.java.client.ConnectionProperties)){:target="_blank"}

</div>

<div id="node" class="lang-tabs-content" style="display:none" markdown="1">

```javascript
var connectionProperties = {
    record: false // false to stop the recording, true to start it
};
// connectionId being Connection.connectionId
session.updateConnection(connectionId, connectionProperties).then(connection => { ... });
```

See [TypeDoc](api/openvidu-node-client/classes/session.html#updateconnection){:target="_blank"}

</div>

<div id="curl" class="lang-tabs-content" style="display:none" markdown="1">

Use method **[PATCH /openvidu/api/sessions/&lt;SESSION_ID&gt;/connection/&lt;CONNECTION_ID&gt;](reference-docs/REST-API/#patch-connection){:target="_blank"}** to modify the connection property `record` to true or false. This will start or stop the recording of the stream published by the Connection identified by `CONNECTION_ID`.

```sh
curl -X PATCH https://<DOMAIN_OR_PUBLIC_IP>/openvidu/api/sessions/<SESSION_ID>/connection/<CONNECTION_ID> \
     -u OPENVIDUAPP:<YOUR_SECRET> \
     -H "Content-Type: application/json" \
     -d '{ "record": false }'
```

</div>

</div><br>

If the same stream of some user is recorded multiple times during one INDIVIDUAL session recording, then the resulting ZIP file described in [INDIVIDUAL recording](#individual-recording) may have this content:

```plaintext
MyRecording.zip
+-- MyRecording.json
+-- str_CAM_WyJt_con_HZPIDsWXBx.webm
+-- str_CAM_CPQ7_con_PHBKMPOlLb.webm
+-- str_CAM_CPQ7_con_PHBKMPOlLb-1.webm
+-- str_CAM_CPQ7_con_PHBKMPOlLb-2.webm
```

In this case the recording process for stream `str_CAM_CPQ7_con_PHBKMPOlLb` has been started and stopped 3 times, generating 3 separate files for the same recording named `MyRecording`.

<br>

---

# Audio-only and video-only recordings

By default recordings will be generated with both audio and video, but you can configure them to record audio-only or video-only files.

<div class="lang-tabs-container" markdown="1">

<div class="lang-tabs-header">
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; color: black">Java</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Node</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">cURL</button>
</div>

<div id="java" class="lang-tabs-content" markdown="1">

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

<div id="curl" class="lang-tabs-content" style="display:none" markdown="1">

When starting the recording of a session with method [POST /openvidu/api/recordings/start](reference-docs/REST-API#post-recording-start){:target="_blank"} simply pass parameters `hasAudio` or `hasVideo` with the desired values.

```sh
curl -X POST https://<DOMAIN_OR_PUBLIC_IP>/openvidu/api/recordings/start \
     -u OPENVIDUAPP:<YOUR_SECRET> \
     -H "Content-Type: application/json" \
     -d '{"session": "ses_YnDaGYNcd7", "hasAudio": true, "hasVideo": false}'
```

</div>

</div>

> **Notes on audio/video only recordings**<br>
>
> - Recordings configured to not record neither audio nor video will fail to start, returning a status error of 422<br><br>
> - COMPOSED video-only recordings will generate an MP4 file. COMPOSED audio-only recordings will generate a WEBM file. INDIVIDUAL recordings will always generate a ZIP file containing one WEBM file for each recorded stream<br><br>
> - Streams published during a video-only recording that are audio-only won't be recorded: they won't be included in the grid layout for COMPOSED recordings and won't generate a WEBM file in INDIVIDUAL recordings. Same for audio-only recordings with video-only streams<br><br>
> - COMPOSED audio-only recording is not available when using mediasoup in [OpenVidu Enterprise](/openvidu-enterprise/#kurento-vs-mediasoup){:target="_blank"}<br><br>

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
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; color: black">Java</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Node</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">cURL</button>
</div>

<div id="java" class="lang-tabs-content" markdown="1">

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

<div id="curl" class="lang-tabs-content" style="display:none" markdown="1">

[POST /openvidu/api/recordings/stop/&lt;RECORDING_ID&gt;](reference-docs/REST-API#post-recording-stop){:target="_blank"}

```sh
curl -X POST https://<DOMAIN_OR_PUBLIC_IP>/openvidu/api/recordings/stop/<RECORDING_ID> \
     -u OPENVIDUAPP:<YOUR_SECRET>
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
OPENVIDU_RECORDING_CUSTOM_LAYOUT=/PATH/TO/INDEX/CUSTOM/LAYOUT
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
openvidu/openvidu-server-kms:2.21.0
```

> **WARNING**: remember to add the `-v` option mounting the path defined with `OPENVIDU_RECORDING_CUSTOM_LAYOUT`

<br>

---

### 3. Configure your recordings to use your custom layout

<div class="lang-tabs-container" markdown="1">

<div class="lang-tabs-header">
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; color: black">Java</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Node</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">cURL</button>
</div>

<div id="java" class="lang-tabs-content" markdown="1">

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

<div id="curl" class="lang-tabs-content" style="display:none" markdown="1">

When starting the recording of a session with method [POST /openvidu/api/recordings/start](reference-docs/REST-API#post-recording-start){:target="_blank"} pass parameters:

- `"outputMode": "COMPOSED"`
- `"recordingLayout": "CUSTOM"`

```sh
curl -X POST https://<DOMAIN_OR_PUBLIC_IP>/openvidu/api/recordings/start \
     -u OPENVIDUAPP:<YOUR_SECRET> \
     -H "Content-Type: application/json" \
     --data-binary @- <<BODY
     {
       "session": "ses_YnDaGYNcd7",
       "outputMode": "COMPOSED",
       "recordingLayout": "CUSTOM"
     }
BODY
```

</div>

</div>

<br>

---

## Configuring multiple custom layouts

You can implement as many custom recording layouts as you want. Simply store each one of them (each one with its own `index.html` entrypoint file) in a subfolder under path defined with system property `OPENVIDU_RECORDING_CUSTOM_LAYOUT` (default value `/opt/openvidu/custom-layout`). Then, when configuring your sessions as stated above in point 3, just add a new parameter:

<div class="lang-tabs-container" markdown="1">

<div class="lang-tabs-header">
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; color: black">Java</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Node</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">cURL</button>
</div>

<div id="java" class="lang-tabs-content" markdown="1">

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

<div id="curl" class="lang-tabs-content" style="display:none" markdown="1">

When starting the recording of a session with method [POST /openvidu/api/recordings/start](reference-docs/REST-API#post-recording-start){:target="_blank"} pass parameters:

- `"outputMode": "COMPOSED"`
- `"recordingLayout": "CUSTOM"`
- `"customLayout": "RELATIVE/PATH/TO/INDEX"`

```sh
curl -X POST https://<DOMAIN_OR_PUBLIC_IP>/openvidu/api/recordings/start \
     -u OPENVIDUAPP:<YOUR_SECRET> \
     -H "Content-Type: application/json" \
     --data-binary @- <<BODY
     {
       "session": "ses_YnDaGYNcd7",
       "outputMode": "COMPOSED",
       "recordingLayout": "CUSTOM",
       "customLayout": "RELATIVE/PATH/TO/INDEX"
     }
BODY
```

</div>

</div>

<br>

In the snippets above, string `RELATIVE/PATH/TO/INDEX` is the path from openvidu-server configuration property `OPENVIDU_RECORDING_CUSTOM_LAYOUT` to the specific `index.html` you want to use for a particular recording. So, if you have the following folder tree structure in your OpenVidu Server host:

```plaintext
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
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; color: black">Java</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Node</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">cURL</button>
</div>

<div id="java" class="lang-tabs-content" markdown="1">

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

<div id="curl" class="lang-tabs-content" style="display:none" markdown="1">

When starting the recording of a session with method [POST /openvidu/api/recordings/start](reference-docs/REST-API#post-recording-start){:target="_blank"} pass parameters:

- `"outputMode": "COMPOSED"`
- `"recordingLayout": "CUSTOM"`
- `"customLayout": "https://USER:PASS@my.domain.com:8888/path?myParam=123"`

```sh
curl -X POST https://<DOMAIN_OR_PUBLIC_IP>/openvidu/api/recordings/start \
     -u OPENVIDUAPP:<YOUR_SECRET> \
     -H "Content-Type: application/json" \
     --data-binary @- <<BODY
     {
       "session": "ses_YnDaGYNcd7",
       "outputMode": "COMPOSED",
       "recordingLayout": "CUSTOM",
       "customLayout": "https://USER:PASS@my.domain.com:8888/path?myParam=123"
     }
BODY
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

**https://OPENVIDUAPP:`SECRET`@`OPENVIDU_IP`:`OPENVIDU_PORT`/openvidu/layouts/index.html?sessionId=`SESSION_ID`&secret=`SECRET`**

Being:

- `SECRET`: parameter `OPENVIDU_SECRET` configured when launching openvidu-server
- `OPENVIDU_IP`: the IP where openvidu-server is accessible in your development machine. You will be probably using [openvidu-server-kms docker container](https://hub.docker.com/r/openvidu/openvidu-server-kms/){:target="_blank"} in your development environment, so this parameter is `localhost` if you are in Mac or Linux, and the docker IP of the container if you are in Windows (see this [FAQ](troubleshooting/#3-i-am-using-windows-to-run-the-tutorials-develop-my-app-anything-i-should-know){:target="_blank})
- `OPENVIDU_PORT`: port where openvidu-server is listening. In OpenVidu production deployments this is by default `443` and if using the development container it is by default `4443`.
- `SESSION_ID`: the session ID you have initialized for the debugging process. Here's a little tip: you can initialize the session in openvidu-server ([REST API](reference-docs/REST-API/#post-session){:target="_blank"}, [openvidu-java-client](reference-docs/openvidu-java-client/#create-a-session){:target="_blank"}, [openvidu-node-client](reference-docs/openvidu-node-client/#create-a-session){:target="_blank"}) configuring parameter `customSessionId` to fix this session ID and avoid having to change it every time you restart your session.

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

# Uploading recordings to S3

<div style="
    display: table;
    border: 2px solid #0088aa9e;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 30px;
    padding: 10px 0;
    background-color: rgba(0, 136, 170, 0.04);"><div style="display: table-cell; vertical-align: middle">
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
This feature is part of <a href="openvidu-pro/" target="_blank"><strong>OpenVidu</strong><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin-left: 5px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span></a> tier.
</div>
</div>

OpenVidu Pro can be configured to upload recordings to **any S3 compatible bucket** instead of storing them in local storage.

S3 provides persistance for recording data in OpenVidu Pro clusters. It brings multiple advantages:

- You can terminate clusters without worrying losing your recordings, as long as they are properly uploaded to the bucket.
- Launching an OpenVidu Pro cluster configured to use an already populated S3 bucket will make the existing recordings accessible and manageable from the new cluster.
- You can upload to the same S3 bucket from different OpenVidu Pro clusters.

Bare in mind that the upload process **is not performed in real time** while the recording is active. Recordings must be first stopped before they are automatically uploaded to S3, and terminating a cluster with an active recording will result in losing that entire recording. Listen to **[recordingStatusChanged](reference-docs/openvidu-server-cdr/#recordingstatuschanged){:target="blank"}** event to know when a recording has been successfully uploaded to S3.

To enable S3 recording storage configure the following properties in the **`.env`** file at Master Node installation path (default to `/opt/openvidu`)

```properties
OPENVIDU_PRO_RECORDING_STORAGE=s3
OPENVIDU_PRO_AWS_S3_BUCKET=your-bucket-name
OPENVIDU_PRO_AWS_S3_HEADERS=
OPENVIDU_PRO_AWS_S3_SERVICE_ENDPOINT=
OPENVIDU_PRO_AWS_ACCESS_KEY=your-access-key
OPENVIDU_PRO_AWS_SECRET_KEY=your-secret-key
OPENVIDU_PRO_AWS_REGION=eu-west-1
```

There is a complete description of these properties at [OpenVidu Pro configuration](reference-docs/openvidu-config/){:target="_blank"}. Take into account the following points:

- Property `OPENVIDU_PRO_AWS_S3_BUCKET` can have a folder structure if you want OpenVidu Pro to upload recordings to a specific folder of your bucket.
- Property `OPENVIDU_PRO_AWS_S3_HEADERS` allows further configuring the internal S3 client of OpenVidu Pro with the HTTP headers used when uploading the recordings. The property is a key-value map of strings, following the format of a JSON object. For example, according to AWS documentation, for applying server-side encryption with AES-256, this header is mandatory: `{"x-amz-server-side-encryption":"AES256"}`. The list of available headers can be found [here](https://docs.aws.amazon.com/AWSJavaSDK/latest/javadoc/com/amazonaws/services/s3/Headers.html){:target="_blank"}.
- Property `OPENVIDU_PRO_AWS_S3_SERVICE_ENDPOINT` allows you to configure any S3 compatible endpoint. If blank, then AWS S3 will be assumed. Must be an URL. For example: _https://s3.us-west-002.backblazeb2.com_
- Properties `OPENVIDU_PRO_AWS_ACCESS_KEY` and `OPENVIDU_PRO_AWS_SECRET_KEY` refer only to long-lived AWS credentials with read and write access to the specified bucket. They can be omitted. If so, the internal S3 client will try to use the default AWS credentials of the machine, if available (see the credentials search order in the [Java Doc](https://docs.aws.amazon.com/AWSJavaSDK/latest/javadoc/com/amazonaws/auth/DefaultAWSCredentialsProviderChain.html){:target="_blank"}). For short-lived credentials, the internal S3 client will do its best to automatically refresh them when expired.
- Property `OPENVIDU_PRO_AWS_REGION` may not be necessary. S3 buckets are not tied to a specific world region, and theoretically the internal S3 client should be able to autodiscover the region from the bucket's name only. But this has been proven to may not be possible in some occasions, and the property must be specified explicitly in these cases.

<br>

---

# Local recording in the browser

OpenVidu Browser offers an extremely simple API to record Streams directly in the client's browser. Check it out [here](api/openvidu-browser/classes/LocalRecorder.html){:target="_blank"}.

<br>

---

# Troubleshooting

#### The video files of COMPOSED or COMPOSED_QUICK_START recordings are showing an error message

If the resulting video file of a COMPOSED or COMPOSED_QUICK_START recording with video (not audio-only) is a blank page showing an error message, then it is very likely that your host does not support hairpinning. Hairpinning is the ability of a host to access one of its own internal services using its own public domain/IP.

COMPOSED and COMPOSED_QUICK_START  recordings with video uses a special module that connects to the recorded session using the public domain of your OpenVidu deployment. This is only true if you are **not** using an [external custom layout](#using-an-external-custom-layout). This means:

- For OpenVidu CE and its single-node environment, this means that the recording module is not able to connect to OpenVidu Server from inside the same machine.
- For OpenVidu PRO and its multi-node environment, this means that Media Nodes are not able to reach Master Node using its public IP (the recording module is hosted in the Media Nodes).

There are 2 possible solutions to this problem:

1. **RECOMMENDED ONE**: change your firewall/proxy/security to allow hairpinning from the affected host.
2. **HACKY ONE**: allow the recording module to connect to the session using the internal private IP of the OpenVidu host. To do so set [configuration property](reference-docs/openvidu-config/){:target="_blank"} `OPENVIDU_RECORDING_COMPOSED_URL` to a specific value.

     - For OpenVidu CE: `https://HOST:PORT/dashboard` being `HOST` the internal IP of the host and `PORT` the public port of the deployment ([configuration property](reference-docs/openvidu-config/){:target="_blank"} `HTTPS_PORT`)
    - For OpenVidu PRO: `https://HOST:PORT/inspector` being `HOST` the internal IP of the Master Node and `PORT` the public port of the deployment ([configuration property](reference-docs/openvidu-config/){:target="_blank"} `HTTPS_PORT`)

#### Enable debug mode of COMPOSED or COMPOSED_QUICK_START recordings

COMPOSED and COMPOSED_QUICK_START recordings with video (not audio-only) use a special module that can be initialized in a debug mode that will log much more information. Set [configuration property](reference-docs/openvidu-config/){:target="_blank"} `OPENVIDU_RECORDING_DEBUG` to true to enable the recording debug mode.

#### First time launching a COMPOSED or COMPOSED_QUICK_START recording is taking too long or throwing an error

There is a known bug affecting the first time a COMPOSED or COMPOSED_QUICK_START recording is launched that may prevent the recording process to properly start. After the error is received, second attempt should work just fine. Take into account that for OpenVidu Pro, this may happen for every new Media Node hosting a COMPOSED or COMPOSED_QUICK_START recording for the first time.

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
                btn.style.color = btn === event.target ? 'black' : '#777';
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
