<h2 id="section-title">OpenVidu Server configuration parameters</h2>
<hr>

### List of configuration parameters when launching openvidu-server

| Parameter                          | Description   										             | Default value   |
| ---------------------------------- | --------------------------------------------------------------- | --------------- |
| `server.port`                      | Port where OpenVidu Server will listen to client's connections  | ***4443***      |
| `kms.uris`                         | KMS URL's to which OpenVidu Server will try to connect. They are tested in order until a valid one is found | ***[\"ws://localhost:8888/kurento\"]***<br>(default value for a KMS running in the same machine as OpenVidu Server) |
| `openvidu.secret`                  | Secret used to connect to OpenVidu Server. This value is required when using the [REST API](/reference-docs/REST-API/) or any server client ([openvidu-java-client](/reference-docs/openvidu-java-client), [openvidu-node-client](/reference-docs/openvidu-node-client)), as well as when connecting to openvidu-server dashboard     | ***MY_SECRET*** |
| `openvidu.publicurl`               | URL to connect clients to OpenVidu Server. This can be the full IP (protocol, host and port) or just a domain name if you have configured it. For example:<br>• `https://my.openvidu.server.com`<br>• `https://12.34.56.78:4443/` | ***local***<br>(with default value _local_ this parameter will be set to `localhost:PORT`, being _PORT_ the param `server.port`) |
| `openvidu.cdr`                     | Whether to enable Call Detail Record or not (check [Call Detail Record](#call-detail-record)) | ***false*** |
| `openvidu.recording`               | Whether to enable recording module or not (check [Recording](/advanced-features/recording/))  | ***false*** |
| `openvidu.recording.path`          | System path where to store the video files of recorded sessions | ***/opt/openvidu/recordings*** |
| `openvidu.recording.public-access` | Whether to allow free http access to recorded sessions or not.<br>If *true* path `https://OPENVIDU_SERVER_IP:[server.port]/[openvidu.recording.path]` will be publicly accessible through `https://OPENVIDU_SERVER_IP:[server.port]/recordings` path.<br>For example, for OpenVidu Server launched in *my-domain.com* and configured with *server.port=5000*, *openvidu.recording=true*, *openvidu.recording-path=/my/path* and *openvidu.recording.public-access=true* : A session with id *foo* that has been recorded will generate a video file locally stored under `/my/path/foo.mp4` and accesible by any client connecting to `https://my-domain.com:5000/recordings/foo.mp4`.<br>If *false* HTTP basic authentication will be required to access any video file stored under that route (as requested when connecting to OpenVidu dashboard on `https://OPENVIDU_SERVER_IP:[server.port]`) | ***false*** |
| `openvidu.recording.notification`  | Which users should receive the recording events in the client side (`recordingStarted`, `recordingStopped`). Can be `all` (every user connected to the session), `publisher_moderator` (users with role 'PUBLISHER' or 'MODERATOR') or `none` (no user will receive these events) | ***publisher_moderator*** |
| `openvidu.recording.custom-layout` | Where should OpenVidu Server look for custom recording layouts  | ***/opt/openvidu/custom-layout*** |
| `server.ssl.key-store`             | Path for using custom JKS certificate                           | _(selfsigned OpenVidu key-store)_ |
| `server.ssl.key-store-password`    | Password for the custom JKS                                     | _(selfsigned OpenVidu password)_  |
| `server.ssl.key-alias`             | Alias for the custom JKS                                        | _(selfsigned OpenVidu alias)_     |

Examples:

```console
java -Dopenvidu.secret=YOUR_SECRET -Dopenvidu.publicurl=https://my.openvidu.server.ip:3333 -Dopenvidu.cdr=true -Dserver.port=3333 -Dkms.uris=[\"ws://my.kms.ip:8888/kurento\"] -jar openvidu-server.jar
```

```console
docker run -d -p 3333:3333 -e openvidu.secret=YOUR_SECRET -e openvidu.publicurl=https://my.openvidu.server.ip:3333 -e openvidu.cdr=true -e server.port=3333 -e kms.uris=[\"ws://my.kms.ip:8888/kurento\"] openvidu/openvidu-server
```

<br>

### List of additional configuration parameters when launching [openvidu-server-kms](https://hub.docker.com/r/openvidu/openvidu-server-kms/) Docker container

| Parameter       | Description                               | Sample value                                       |
| --------------- | ----------------------------------------- | -------------------------------------------------- |
| `KMS_STUN_IP`   | IP of STUN server used by KMS             | `stun.l.google.com` (free STUN server from Google) |
| `KMS_STUN_PORT` | PORT of STUN server used by KMS           | `19302` (free STUN server from Google)             |
| `KMS_TURN_URL`  | Configuration for TURN server used by KMS | `user:pass@turn_public_ip:turn_port` (_user_ and _pass_ of the TURN server, _turn_public_ip_ its publicly accessible url and _turn_port_ the port the TURN server listens to |

Example:

```console
docker run -d -p 3333:3333 -e openvidu.secret=YOUR_SECRET -e openvidu.publicurl=https://my.openvidu.server.ip:3333 -e openvidu.cdr=true -e server.port=3333 -e KMS_STUN_IP=stun.l.google.com -e KMS_STUN_PORT=19302 -e KMS_TURN_URL=myuser:mypass@54.54.54.54:3478 openvidu/openvidu-server-kms
```

<br>