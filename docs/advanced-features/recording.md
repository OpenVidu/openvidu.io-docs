# Recording
_(since v1.7.0)_

OpenVidu Server can be configured to record sessions. In the current version 1.8.0, every publisher stream is composed in the same video file in a grid layout, generating a unique MP4 file when the recording stops.

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
    -Dopenvidu.recording.free-access=true \
openvidu-server.jar
```

- `openvidu.recording`: if *true* OpenVidu recording service is enabled and sessions can be configured to be recorded. During the first execution of _openvidu-server.jar_, a Docker image ([openvidu/openvidu-recording](https://hub.docker.com/r/openvidu/openvidu-recording/)) will be downloaded.
- `openvidu.recording.path`: where to store the recorded video files on the host machine.
- `openvidu.recording.free-access`: if *true* any client can connect to<p style="text-align: center; margin: 8px 0 8px 0; word-wrap: break-word;"><strong>https://OPENVIDU_SERVER_IP:OPENVIDU_PORT/recordings/any_session_file.mp4</strong></p> and access any recorded video file. If *false* this path will be secured with `openvidu.secret` param just as OpenVidu Server dashboard at **https://OPENVIDU_SERVER_IP:OPENVIDU_PORT**

#### For OpenVidu Server Docker image

**[openvidu/openvidu-server-kms](https://hub.docker.com/r/openvidu/openvidu-server-kms/)**

```console
docker run -p 8443:8443 --rm \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v /PATH/TO/VIDEO/FILES:/PATH/TO/VIDEO/FILES \
    -e openvidu.recording=true \
    -e MY_UID=$(id -u $USER) \
    -e openvidu.recording.path=/PATH/TO/VIDEO/FILES \
    -e openvidu.recording.free-access=true \
openvidu/openvidu-server-kms
```

**[openvidu/openvidu-server](https://hub.docker.com/r/openvidu/openvidu-server/)** (KMS up and running in the host machine)

```console
docker run --net="host" -p 8443:8443 --rm \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v /PATH/TO/VIDEO/FILES:/PATH/TO/VIDEO/FILES \
    -e openvidu.recording=true \
    -e MY_UID=$(id -u $USER) \
    -e openvidu.recording.path=/PATH/TO/VIDEO/FILES \
    -e openvidu.recording.free-access=true \
openvidu/openvidu-server
```

- `openvidu.recording`: _same as for OpenVidu Server JAR_
- `openvidu.recording.path`: _same for in OpenVidu Server JAR_
- `openvidu.recording.free-access`: _same as for OpenVidu Server JAR_

It is also necessary to mount 2 volumes and pass `MY_UID` variable:

- `-v /var/run/docker.sock:/var/run/docker.sock`: gives openvidu-server container access to the local Docker daemon
- `-v /PATH/TO/VIDEO/FILES:/PATH/TO/VIDEO/FILES`: gives access to the recorded video files through the container
- `-e MY_UID=$(id -u $USER)`: for permission reasons

<br>
> **IMPORTANT!** `/PATH/TO/VIDEO/FILES` must be the same in `openvidu.recording.path=/PATH/TO/VIDEO/FILES` property and in both sides of `-v /PATH/TO/VIDEO/FILES:/PATH/TO/VIDEO/FILES` flag

---

### 3. Configure your Sessions to be recorded

Setting property `openvidu.recording` to *true* only automatically enables recordings for insecure sessions (those directly created from the client side. See [this FAQ](/troubleshooting/#4-why-does-my-app-need-a-server-side) and [this FAQ](/troubleshooting/#5-what-are-the-differences-related-to-openvidu-between-an-app-without-a-server-side-and-an-app-with-a-server-side)).

In order to record a regular securized session, it is necessary to explicitly configure it through the [REST API](/reference-docs/REST-API/) or any of the server clients ([openvidu-java-client](/reference-docs/openvidu-java-client/), [openvidu-node-client](/reference-docs/openvidu-node-client/)).

Recording can be configured in two ways: **automatic recording** _(since v1.7.0)_ or **manual recording** _(since v1.7.0)_:

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
    .archiveMode(ArchiveMode.MANUAL) // ArchiveMode.ALWAYS for automatic recording
    .archiveLayout(ArchiveLayout.BEST_FIT)
    .mediaMode(MediaMode.ROUTED)
    .build();
Session session = openVidu.createSession(properties);
```

If Session is configured with `ArchiveMode.MANUAL`:

```java
Archive archive = openVidu.startRecording(session.getSessionId()); // Starts recording
archive = openVidu.stopRecording(archive.getId()); // Stops recording
```

#### openvidu-node-client

Call `OpenVidu.createSession()` passing as optional parameter a `SessionProperties` object properly configured:

```javascript
var openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
var properties = new SessionProperties.Builder()
    .archiveMode(ArchiveMode.MANUAL) // ArchiveMode.ALWAYS for automatic recording
    .archiveLayout(ArchiveLayout.BEST_FIT)
    .mediaMode(MediaMode.ROUTED)
    .build();
var mySession = openvidu.createSession(properties);
```

If Session is configured with `ArchiveMode.MANUAL`:

```javascript
var archive;

openvidu.startRecording(sessionId) // Starts recording
.then(response => {
    archive = response;
})
.catch(error => console.error(error));

openvidu.stopRecording(archive.getId()) // Stops recording
.then(response => {
    archive = response
})
.catch(error => console.error(error));
```

<hr>

### Future updates

- **Single stream recording**: right now only grid layout recording is supported, but in the near future it is planned to support single stream recording for each participant publishing to the session. This type of video recording is intended to be much less demanding in terms of computing resources, and will provide developers greater freedom in the later processing of their videos.

- **More grid layouts**: only `BEST_FIT` layout is supported right now, but there are more layouts that will be available in next development iterations. Moreover, developers will be able to provide their own custom layout if they want.

<hr>

### Local recording

OpenVidu Browser offers an extremely simple API to record Streams directly in the client's browser. Check it out [here](/reference-docs/openvidu-browser/#localrecorder).