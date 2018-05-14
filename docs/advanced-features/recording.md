# Recording

OpenVidu Server can be configured to record sessions. In the current version, every publisher stream is composed in the same video file in a grid layout, generating a unique MP4 file when the recording stops.

For example, in a session with two publishers the video file will look like this:

<p>
    <img class="img-responsive deploy-img" src="/img/docs/advanced-features/recorded-video.png">
</p>

<div style="
    display: table;
    border: 1px solid #0088aa;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 25px;"><div style="display: table-cell">
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
	This type of grid recording is a pretty heavy consuming process. In order to record sessions and achieve good quality in the resulting videos it is strongly recommended to launch OpenVidu Server in a host with generous computing resources (Multicore >= 1GHz, 16GB of RAM)
</div>
</div>

<br>

To start OpenVidu Server properly configured to allow session recording it is necessary to:

### 1. Have Docker CE installed in the host machine

OpenVidu recording module consists of a Docker image that needs to be downloaded from the cloud. The process is **100% automatic**, but you will need [Docker CE](https://www.docker.com/community-edition#/download) installed in your server. If you enable OpenVidu recording service but there's no Docker installed, OpenVidu Server will fail to init, throwing the following exception:

`Exception connecting to Docker daemon: you need Docker installed in this machine to enable OpenVidu recorder service`

<br>
> **[OpenVidu CloudFormation](/deployment/deploying-aws/) already includes the Docker image for recording service. You don't need to install anything or wait during the first execution if you use this type of deployment for OpenVidu Server**

---

### 2. Launch OpenVidu Server with new environment variables
_(Only variables related with OpenVidu recording service are stated below. To see a complete list of available environment variables, visit [OpenVidu Server configuration](/reference-docs/openvidu-server-params/))_

#### For OpenVidu Server JAR

```console
java -jar \
    -Dopenvidu.recording=true \
    -Dopenvidu.recording.path=/path/to/video/files \
    -Dopenvidu.recording.public-access=true \
openvidu-server.jar
```

- `openvidu.recording`: if *true* OpenVidu recording service is enabled and sessions can be configured to be recorded. During the first execution of _openvidu-server.jar_, a Docker image ([openvidu/openvidu-recording](https://hub.docker.com/r/openvidu/openvidu-recording/)) will be downloaded.
- `openvidu.recording.path`: where to store the recorded video files on the host machine.
- `openvidu.recording.public-access`: if *true* any client can connect to<p style="text-align: center; margin: 8px 0 8px 0; word-wrap: break-word;"><strong>https://OPENVIDU_SERVER_IP:OPENVIDU_PORT/recordings/any_session_file.mp4</strong></p> and access any recorded video file. If *false* this path will be secured with `openvidu.secret` param just as OpenVidu Server dashboard at **https://OPENVIDU_SERVER_IP:OPENVIDU_PORT**

#### For OpenVidu Server Docker image

**[openvidu/openvidu-server-kms](https://hub.docker.com/r/openvidu/openvidu-server-kms/)**

```console
docker run -p 4443:4443 --rm \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v /PATH/TO/VIDEO/FILES:/PATH/TO/VIDEO/FILES \
    -e openvidu.recording=true \
    -e MY_UID=$(id -u $USER) \
    -e openvidu.recording.path=/PATH/TO/VIDEO/FILES \
    -e openvidu.recording.public-access=true \
openvidu/openvidu-server-kms
```

**[openvidu/openvidu-server](https://hub.docker.com/r/openvidu/openvidu-server/)** (KMS up and running in the host machine)

```console
docker run --net="host" --rm \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v /PATH/TO/VIDEO/FILES:/PATH/TO/VIDEO/FILES \
    -e openvidu.recording=true \
    -e MY_UID=$(id -u $USER) \
    -e openvidu.recording.path=/PATH/TO/VIDEO/FILES \
    -e openvidu.recording.public-access=true \
openvidu/openvidu-server
```

- `openvidu.recording`: _same as in OpenVidu Server JAR_
- `openvidu.recording.path`: _same as in OpenVidu Server JAR_
- `openvidu.recording.public-access`: _same as in OpenVidu Server JAR_

It is also necessary to mount 2 volumes and pass `MY_UID` variable:

- `-v /var/run/docker.sock:/var/run/docker.sock`: gives openvidu-server container access to the local Docker daemon
- `-v /PATH/TO/VIDEO/FILES:/PATH/TO/VIDEO/FILES`: gives access to the recorded video files through the container
- `-e MY_UID=$(id -u $USER)`: for permission reasons

<br>
> **IMPORTANT!** `/PATH/TO/VIDEO/FILES` must be the same in property `openvidu.recording.path=/PATH/TO/VIDEO/FILES` and in both sides of flag `-v /PATH/TO/VIDEO/FILES:/PATH/TO/VIDEO/FILES`

---

### 3. Configure your Sessions to be recorded

Setting property `openvidu.recording` to *true* only automatically enables recordings for insecure sessions (those directly created from the client side. See [this FAQ](/troubleshooting/#4-does-my-app-need-a-server-side)).

In order to record a regular securized session, it is necessary to explicitly configure it through the [REST API](/reference-docs/REST-API/) or any of the server clients ([openvidu-java-client](/reference-docs/openvidu-java-client/), [openvidu-node-client](/reference-docs/openvidu-node-client/)).

Recording can be configured in two ways: **automatic recording** or **manual recording**:

- **Automatic recording**: your sessions will be recorded from the moment the first participant starts publishing media until the last participant leaves the session.
- **Manual recording**: you will have to tell openvidu-server to start and to stop the recording. The recording will never be automatically stopped even though all participants leave the session (in fact the session will not be closed until the recording stops).

#### API REST

1. Initialize your sessions with this POST method: [POST /api/sessions](/reference-docs/REST-API#post-apisessions). For sessions configured for automatic recording no more steps are needed
2. If you have configured your session for manual recording
    - Start the recording with this POST method: [POST /api/recordings/start](/reference-docs/REST-API#post-apirecordingsstart)
    - Stop the recording with this POST method: [POST /api/recordings/stop](/reference-docs/REST-API#post-apirecordingsstoprecording_id)

#### openvidu-java-client

Call `OpenVidu.createSession()` passing as optional parameter a `SessionProperties` object properly configured:

```java
OpenVidu openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
SessionProperties properties = new SessionProperties.Builder()
    .recordingMode(RecordingMode.MANUAL) // RecordingMode.ALWAYS for automatic recording
    .defaultRecordingLayout(RecordingLayout.BEST_FIT)
    .mediaMode(MediaMode.ROUTED)
    .build();
Session session = openVidu.createSession(properties);
```

If Session is configured with `RecordingMode.MANUAL`:

```java
Recording recording = openVidu.startRecording(session.getSessionId()); // Starts recording
recording = openVidu.stopRecording(recording.getId()); // Stops recording
```

#### openvidu-node-client

Call `OpenVidu.createSession()` passing as optional parameter a `SessionProperties` object properly configured:

```javascript
var openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
var properties = new SessionProperties.Builder()
    .recordingMode(RecordingMode.MANUAL) // RecordingMode.ALWAYS for automatic recording
    .defaultRecordingLayout(RecordingLayout.BEST_FIT)
    .mediaMode(MediaMode.ROUTED)
    .build();
var mySession = openvidu.createSession(properties);
```

If Session is configured with `RecordingMode.MANUAL`:

```javascript
var recording;

openvidu.startRecording(sessionId) // Starts recording
.then(response => {
    recording = response;
})
.catch(error => console.error(error));

openvidu.stopRecording(recording.getId()) // Stops recording
.then(response => {
    recording = response
})
.catch(error => console.error(error));
```

<br><br>
<hr>

# Custom recording layouts

You can create your own layouts for the session recording process. They are implemented with HTML/CSS/JS files, just as your OpenVidu application client-side.

### 1. Create your layout with HTML/CSS/JS files

Put them in a path accessible to openvidu-server. There must be an `index.html` file as entrypoint for your custom layout:

<br>

- **WHAT SHOULD YOUR JS CODE DO**: by making use of [`openvidu-browser.js`](https://github.com/OpenVidu/openvidu/releases) library, you need to connect a _recorder_ participant to the session. This means:<br><br>

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

---

### 2. Add new properties when launching openvidu-server

On the one hand a new property `openvidu.recording.custom-layout` and on the other hand, if using Docker images, a new `-v` option:

**[openvidu-server.jar](https://github.com/OpenVidu/openvidu/releases)**

```console
java -jar \
    -Dopenvidu.recording=true \
    -Dopenvidu.recording.path=/PATH/TO/VIDEO/FILES \
    -Dopenvidu.recording.public-access=true \
    -Dopenvidu.recording.custom-layout: /PATH/TO/INDEX/CUSTOM/LAYOUT \
openvidu-server.jar
```

**[openvidu/openvidu-server-kms](https://hub.docker.com/r/openvidu/openvidu-server-kms/)**

```console
docker run -p 4443:4443 --rm \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v /PATH/TO/VIDEO/FILES:/PATH/TO/VIDEO/FILES \
    -v /PATH/TO/INDEX/CUSTOM/LAYOUT:/PATH/TO/INDEX/CUSTOM/LAYOUT \
    -e MY_UID=$(id -u $USER) \
    -e openvidu.recording=true \
    -e openvidu.recording.path=/PATH/TO/VIDEO/FILES \
    -e openvidu.recording.custom-layout=/PATH/TO/INDEX/CUSTOM/LAYOUT \
openvidu/openvidu-server-kms
```

**[openvidu/openvidu-server](https://hub.docker.com/r/openvidu/openvidu-server/)** (KMS up and running in the host machine)

```console
docker run --net="host" --rm \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v /PATH/TO/VIDEO/FILES:/PATH/TO/VIDEO/FILES \
    -v /PATH/TO/INDEX/CUSTOM/LAYOUT:/PATH/TO/INDEX/CUSTOM/LAYOUT \
    -e MY_UID=$(id -u $USER) \
    -e openvidu.recording=true \
    -e openvidu.recording.path=/PATH/TO/VIDEO/FILES \
    -e openvidu.recording.custom-layout=/PATH/TO/INDEX/CUSTOM/LAYOUT \
openvidu/openvidu-server-kms
```

---

### 3. Configure your sessions to use your custom layout

Do exactly the same process explained [here](recording/#3-configure-your-sessions-to-be-recorded), but changing `recordingLayout` from `BEST_FIT` to `CUSTOM`.

- If you are using the _API REST_, just change json body parameter `"recordingLayout":"BEST_FIT"` to `"recordingLayout":"CUSTOM"`.
- If you are using _openvidu-java-client_ or _openvidu-node-client_, change

    `SessionProperties.Builder().recordingLayout(RecordingLayout.BEST_FIT)`

    to

    `SessionProperties.Builder().recordingLayout(RecordingLayout.CUSTOM)`

<br>

---

## Configuring multiple custom layouts

You can implement as many custom recording layouts as you want. Simply store each one of them (each one with its own `index.html` entrypoint file) in a subfolder under path `/PATH/TO/INDEX/CUSTOM/LAYOUT`. Then, when configuring your sessions as stated above in point 3, just add a new parameter besides changing `recordingLayout` property:

  - If you are using the _API REST_, add an additional field to json body: `"recordingLayout":"CUSTOM", "customLayout":"RELATIVE/PATH/TO/INDEX"`
  - If you are using _openvidu-java-client_ or _openvidu-node-client_, create SessionProperties object with a new step: `new SessionProperties.Builder().recordingLayout(RecordingLayout.CUSTOM).customLayout("RELATIVE/PATH/TO/INDEX").build())`

<br>
Path `RELATIVE/PATH/TO/INDEX` is the path from openvidu-server configuration property `openvidu.recording.custom-layout` to the specific `index.html` you want to use for a particular session recording. So, if you have the following folder tree structure:

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

You should start openvidu-server with property `openvidu.recording.custom-layout=/opt/openvidu/my_custom_layouts` and you can use any of the 3 `index.html` files for recording any of your sessions. To use the outer layout, just configure `recordingLayout` to `CUSTOM`. To use any of the inner layouts, also configure `customLayout` to `layout1` or `layout2`.

---

## Sample custom layout

This is literally the simplest HTML for a custom recording layout. Use it as a template for building more complex ones.

```html
<html>

<head><script src="openvidu-browser-2.0.0.min.js"></script></head>

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

<hr>

# Local recording

OpenVidu Browser offers an extremely simple API to record Streams directly in the client's browser. Check it out [here](../../api/openvidu-browser/classes/localrecorder.html).

<br>