<h2 id="section-title">OpenVidu Server configuration parameters</h2>
<hr>

<br>

- **[Configuration parameters for OpenVidu Server](#configuration-parameters-for-openvidu-server)**
- **[Extra configuration parameters for OpenVidu Server Docker container](#extra-configuration-parameters-for-openvidu-server-docker-container)**
- **[Extra configuration parameters for OpenVidu Server Pro](#extra-configuration-parameters-for-openvidu-server-pro)**
- **[Externalizing configuration](#externalizing-configuration)**

---

### Configuration parameters for OpenVidu Server

| Parameter                          | Description   										           | Default value   |
| ---------------------------------- | --------------------------------------------------------------- | --------------- |
| `server.port`                      | Port where OpenVidu Server will listen to client's connections  | ***4443***      |
| `kms.uris`                         | KMS URL's to which OpenVidu Server will try to connect. They are tested in order until a valid one is found | ***["ws://localhost:8888/kurento"]***<br>(default value for a KMS running in the same machine as OpenVidu Server) |
| `openvidu.secret`                  | Secret used to connect to OpenVidu Server. This value is required when using the [REST API](/reference-docs/REST-API/){:target="_blank"} or any server client ([openvidu-java-client](/reference-docs/openvidu-java-client){:target="_blank"}, [openvidu-node-client](/reference-docs/openvidu-node-client){:target="_blank"}), as well as when connecting to openvidu-server dashboard     | ***MY_SECRET*** |
| `openvidu.publicurl`               | URL to connect clients to OpenVidu Server. This can be the full IP (protocol, host and port) or just a domain name if you have configured it. For example:<br>• `https://my.openvidu.server.com`<br>• `https://12.34.56.78:4443/` | ***local***<br>(with default value _local_ this parameter will be set to `localhost:PORT`, being _PORT_ the param `server.port`) |
| `openvidu.cdr`                     | Whether to enable Call Detail Record or not (check [Call Detail Record](/reference-docs/openvidu-server-cdr){:target="_blank"}) | ***false*** |
| `openvidu.recording`               | Whether to enable recording module or not (check [Recording](/advanced-features/recording/){:target="_blank"})  | ***false*** |
| `openvidu.recording.path`          | System path where to store the video files of recorded sessions | ***/opt/openvidu/recordings*** |
| `openvidu.recording.public-access` | Whether to allow free http access to recorded sessions or not.<br>If *true* path `https://OPENVIDU_IP:[server.port]/[openvidu.recording.path]` will be publicly accessible through `https://OPENVIDU_IP:[server.port]/recordings` path. That means any client can connect to<br><strong style="word-break: break-all">https://OPENVIDU_IP:[server.port]/recordings/&lt;RECORDING_ID&gt;/&lt;RECORDING_NAME&gt;.&lt;EXTENSION&gt;</strong><br>and access the recorded video file.<br>If *false* this path will be secured with `openvidu.secret`.<br>For example, for OpenVidu Server launched in *my.url.com* and configured with *server.port=5000*, *openvidu.recording=true*, *openvidu.recording-path=/my/path* and *openvidu.recording.public-access=true* :<br>A session with id *foo* that has been recorded may generate a video file locally stored in the host machine under `/my/path/foo/foo.mp4` and accesible by any client connecting to `https://my.url.com:5000/recordings/foo/foo.mp4` | ***false*** |
| `openvidu.recording.notification`  | Which users should receive the recording events in the client side (`recordingStarted`, `recordingStopped`). Can be `all` (every user connected to the session), `publisher_moderator` (users with role 'PUBLISHER' or 'MODERATOR'), `moderator` (only users with role 'MODERATOR') or `none` (no user will receive these events) | ***publisher_moderator*** |
| `openvidu.recording.custom-layout` | System path where OpenVidu Server should look for custom recording layouts  | ***/opt/openvidu/custom-layout*** |
| `openvidu.recording.autostop-timeout` | Timeout in seconds for recordings to automatically stop (and the session involved to be closed) when conditions are met: a session recording is started but no user is publishing to it or a session is being recorded and last user disconnects. If a user publishes within the timeout in either case, the automatic stop of the recording is cancelled | ***120*** |
| `openvidu.webhook` | Whether to enable webhook service or not (check [OpenVidu Server Webhook](/reference-docs/openvidu-server-webhook/){:target="_blank"}) | ***false*** |
| `openvidu.webhook.endpoint` | HTTP endpoint where OpenVidu Server will send the POST messages with webhook events |  |
| `openvidu.webhook.headers` | Array of strings with the HTTP headers that OpenVidu Server will append to each POST message of webhook events. For example, you may configure a Basic Auth header _name:pass_ setting this property to `[\"Authorization:\ Basic\ bmFtZTpwYXNz\"]` | ***[ ]*** |
| `openvidu.webhook.events` | Array of strings with the type of events you want OpenVidu Server to send to your webhook | <span style="word-break: break-word; font-weight: bold; font-style: italic">["sessionCreated","sessionDestroyed","participantJoined","participantLeft","webrtcConnectionCreated","webrtcConnectionDestroyed","recordingStatusChanged"]</span><br>(all available events) |
| `openvidu.streams.video.max-recv-bandwidth` | Maximum video bandwidth sent from clients to OpenVidu Server, in kbps. 0 means unconstrained | ***1000*** |
| `openvidu.streams.video.min-recv-bandwidth` | Minimum video bandwidth sent from clients to OpenVidu Server, in kbps. 0 means unconstrained | ***300***  |
| `openvidu.streams.video.max-send-bandwidth` | Maximum video bandwidth sent from OpenVidu Server to clients, in kbps. 0 means unconstrained | ***1000*** |
| `openvidu.streams.video.min-send-bandwidth` | Minimum video bandwidth sent from OpenVidu Server to clients, in kbps. 0 means unconstrained | ***300***  |
| `server.ssl.key-store`             | Path for using custom JKS certificate                           | _(selfsigned OpenVidu key-store)_ |
| `server.ssl.key-store-password`    | Password for the custom JKS                                     | _(selfsigned OpenVidu password)_  |
| `server.ssl.key-alias`             | Alias for the custom JKS                                        | _(selfsigned OpenVidu alias)_     |

Examples:

```console
java -Dopenvidu.secret=YOUR_SECRET -Dopenvidu.publicurl=https://my.openvidu.server.ip:3333/ -Dopenvidu.cdr=true -Dserver.port=3333 -Dkms.uris=["ws://my.kms.ip:8888/kurento"] -jar openvidu-server.jar
```

<br>

---

### Extra configuration parameters for [OpenVidu Server Docker container](https://hub.docker.com/r/openvidu/openvidu-server-kms/){:target="_blank"}

| Parameter       | Description                               | Sample value                                       |
| --------------- | ----------------------------------------- | -------------------------------------------------- |
| `KMS_STUN_IP`   | IP of STUN server used by KMS             | `stun.l.google.com` (free STUN server from Google) |
| `KMS_STUN_PORT` | PORT of STUN server used by KMS           | `19302` (free STUN server from Google)             |
| `KMS_TURN_URL`  | Configuration for TURN server used by KMS | `user:pass@turn_public_ip:turn_port` (_user_ and _pass_ of the TURN server, _turn_public_ip_ its publicly accessible url and _turn_port_ the port the TURN server listens to |

Example:

```console
docker run -d -p 3333:3333 -e openvidu.secret=YOUR_SECRET -e openvidu.publicurl=https://my.openvidu.server.ip:3333/ -e openvidu.cdr=true -e server.port=3333 -e KMS_STUN_IP=stun.l.google.com -e KMS_STUN_PORT=19302 -e KMS_TURN_URL=myuser:mypass@54.54.54.54:3478 openvidu/openvidu-server-kms:2.11.0
```

<br>

---

### Extra configuration parameters for [OpenVidu Server Pro](/openvidu-pro/){:target="_blank"}

| Parameter       | Description                               | Default value                                      |
| --------------- | ----------------------------------------- | -------------------------------------------------- |
| `openvidu.pro.stats.monitoring-interval` | Interval in seconds for CPU, memory and net usage stats gathering in OpenVidu Server Pro host. 0 for no gathering at all | 30 |
| `openvidu.pro.stats.webrtc-interval`     | Interval in seconds for WebRTC stats gathering from media servers WebRTC endpoints. 0 for no gathering at all | 30 |
| `openvidu.pro.cluster`                   | Whether to launch OpenVidu in cluster mode or not. See [Scalability](/openvidu-pro/scalability/){:target="_blank"} section to learn more | false |
| `openvidu.pro.cluster.load.strategy`     | What parameter should be used to distribute the creation of new sessions (and therefore distribution of load) among all available media servers. Can be: [streams, sessions, mediaObjects, cpu] | `streams` |

Example:

```console
java -Dopenvidu.secret=YOUR_SECRET -Dopenvidu.publicurl=https://my.openvidu.server.ip:4443/ -Dopenvidu.cdr=true -Dopenvidu.pro.cluster=true -Dopenvidu.pro.cluster.load.strategy=mediaObjects -Dkms.uris=["ws://my.kms.ip:8888/kurento","ws://my.other.kms.ip:8888/kurento"] -Dopenvidu.pro.stats.webrtc-interval=0 -jar openvidu-server-pro.jar
```

<br>

---

### Externalizing configuration

You can use an external file to configure OpenVidu Server. Simply write the properties you want in a `*.properties` file and launch Java process with property **`spring.config.additional-location`** setting the path to the file. For example:

```console
java -Dspring.config.additional-location=/opt/openvidu/application.properties -jar openvidu-server.jar
```

And having file _/opt/openvidu/application.properties_ one property per line. For example:

```console
openvidu.cdr=true
openvidu.secret=1234
openvidu.webhook=true
openvidu.webhook.endpoint=http://my.webhook.com
openvidu.webhook.events=["sessionCreated","sessionDestroyed"]
openvidu.recording=false
```

<br>