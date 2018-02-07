<h2 id="section-title">OpenVidu Server configuration parameters</h2>
<hr>

#### List of configuration parameters when launching openvidu-server:

| Parameter                        | Description   										     | Default value |
| -------------------------------- | ------------------------------------------------------- | ------------- |
| `server.port`                    | Port where OpenVidu Server will listen to client's connections | ***8443*** |
| `kms.uris`                       | KMS URL's to which OpenVidu Server will try to connect. They are tested in order until a valid one is found | ***[\"ws://localhost:8888/kurento\"]***<br>(default value for a KMS running in the same machine as OpenVidu Server) |
| `openvidu.secret`                | Secret used to connect to OpenVidu Server. This value is required when using the [REST API](/reference-docs/REST-API/) or any server client ([openvidu-java-client](/reference-docs/openvidu-java-client), [openvidu-node-client](/reference-docs/openvidu-node-client)), as well as when connecting to openvidu-server dashboard | ***MY_SECRET*** |
| `openvidu.publicurl`             | URL to connect clients to OpenVidu Server. This must be the full IP of your OpenVidu Server, including _protocol_, _host_ and _port_ (for example: `https://my.openvidu.server.ip:8443`). If no _port_ argument is provided, `server.port` param will be appended to it | ***local***<br>(with default value _local_ this parameter will be set to `localhost:PORT`, being _PORT_ the param `server.port`) |
| `openvidu.cdr`                   | Whether to enable Call Detail Record or not (check [Call Detail Record](#call-detail-record)) | ***false*** |
| `openvidu.recording`             | Whether to enable recording module or not (check [Recording](/advanced-features/recording/)) | ***false*** |
| `openvidu.recording.path`        | System path where to store the video files of recorded sessions | ***/opt/openvidu/recordings*** |
| `openvidu.recording.free-access` | Whether to allow free http access to recorded sessions or not.<br>If *true* path `https://OPENVIDU_SERVER_IP:[server.port]/[openvidu.recording.path]` will be publicly accessible through `https://OPENVIDU_SERVER_IP:[server.port]/recordings` path.<br>For example, for OpenVidu Server launched in *my-domain.com* and configured with *server.port=5000*, *openvidu.recording=true*, *openvidu.recording-path=/my/path* and *openvidu.recording.free-access=true* : A session with id *foo* that has been recorded will generate a video file locally stored under `/my/path/foo.mkv` and accesible by any client connecting to `https://my-domain.com:5000/recordings/foo.mkv`.<br>If *false* HTTP basic authentication will be required to access any video file stored under that route (as requested when connecting to OpenVidu dashboard on `https://OPENVIDU_SERVER_IP:[server.port]`) | ***false*** |

Example:

```console
java -Dopenvidu.secret=YOUR_SECRET -Dopenvidu.publicurl=https://my.openvidu.server.ip:3333 -Dopenvidu.cdr=true -Dserver.port=3333 -Dkms.uris=[\"ws://my.kms.ip:8888/kurento\"] -jar openvidu-server.jar
```

#### List of additional configuration parameters when launching [openvidu-server-kms](https://hub.docker.com/r/openvidu/openvidu-server-kms/) Docker container:

| Parameter            | Description   	                      | Sample value |
| -------------------- | ------------------------------------ | ------------- |
| `KMS_STUN_IP`   | IP of STUN server used by KMS             | `stun.l.google.com` (free STUN server from Google) |
| `KMS_STUN_PORT` | PORT of STUN server used by KMS           | `19302` (free STUN server from Google) | 
| `KMS_TURN_URL`  | Configuration for TURN server used by KMS | `user:pass@turn_public_ip:turn_port` (_user_ and _pass_ of the TURN server, _turn_public_ip_ its publicly accessible url and _turn_port_ the port the TURN server listens to |

Example:

```console
docker run -d -p 3333:3333 -e openvidu.secret=YOUR_SECRET -e openvidu.publicurl=https://my.openvidu.server.ip:3333 -e openvidu.cdr=true -e server.port=3333 -e KMS_STUN_IP=stun.l.google.com -e KMS_STUN_PORT=19302 -e KMS_TURN_URL=myuser:mypass@54.54.54.54:3478 openvidu/openvidu-server-kms
```

#### Call Detail Record

OpenVidu Server offers a CDR logging system, so you can easily keep record of every session, every user connecting to them and every connection established by each one of the users. To start OpenVidu Server with CDR enabled, launch it with option `openvidu.cdr=true`. The CDR file will be located under `log/` folder in the same path as your Java executable.

The record is a plain text file containing one standard JSON entry for each line. All JSON entries have the following structure:

`{"[EVENT_NAME]": {"sessionId": "[SESSION_ID]", "timestamp": "[TIMESTAMP]", "[CUSTOM_PROPERTY_1]": "[CUSTOM_VALUE_1]","[CUSTOM_PROPERTY_2]": "[CUSTOM_VALUE_2]", ... }}`

So every entry is a JSON object identified by a specific event name, and all of them have as properties the `sessionId` identifying the video-session for which this event was registered and the `timestamp`. Besides this two common properties, there are custom properties for every specific event with useful information. The complete list of possible JSON entries is available below:

<hr>

##### sessionCreated

Recorded when a new session has been created.

| Property         | Description   	                      | Value |
| ---------------- | ------------------------------------ | ----- |
| `sessionId` | Session for which the event was triggered | A string with the session unique identifier |
| `timestamp` | Time when the event was triggered | UTC milliseconds |

Example:
```json
{"sessionCreated":{"sessionId":"fds4e07mdug1ga3hlrfh3sdf6d","timestamp":1516292370848}}
```

<hr>

##### sessionDestroyed

Recored when a session has finished.

| Property    | Description | Value |
| ----------- | --------- | ----- |
| `sessionId` | Session for which the event was triggered | A string with the session unique identifier |
| `timestamp` | Time when the event was triggered | UTC milliseconds |
| `startTime` | Time when the session started          | UTC milliseconds |
| `endTime`   | Time when the session finished          | UTC milliseconds |
| `duration`  | Total duration of the session         | Seconds |

Example:
```json
{"sessionDestroyed":{"duration":4,"startTime":1516292370848,"sessionId":"fds4e07mdug1ga3hlrfh3sdf6d","endTime":1516292375176,"timestamp":1516292375176}}
```

<hr>

##### participantJoined

Recorded when a user has connected to a session.

| Property         | Description   	                      | Value |
| ---------------- | ------------------------------------ | ----- |
| `sessionId` | Session for which the event was triggered | A string with the session unique identifier |
| `timestamp` | Time when the event was triggered | UTC milliseconds |
| `participantId` | Identifier of the participant          | A string with the participant unique identifier |

Example: 
```json
{"participantJoined":{"participantId":"ogjud06fhgkck4id5a8p4a6ejp","sessionId":"fds4e07mdug1ga3hlrfh3sdf6d","timestamp":1516292370885}}
```

<hr>

##### participantLeft

Recorded when a user has left a session.

| Property    | Description | Value |
| ----------- | --------- | ----- |
| `sessionId` | Session for which the event was triggered | A string with the session unique identifier |
| `timestamp` | Time when the event was triggered | UTC milliseconds |
| `participantId` | Identifier of the participant          | A string with the participant unique identifier |
| `startTime` | Time when the participant joined the session          | UTC milliseconds |
| `endTime`   | Time when the participant left the session          | UTC milliseconds |
| `duration`  | Total duration of the participant's connection to the session         | Seconds |

Example:
```json
{"participantLeft":{"participantId":"ogjud06fhgkck4id5a8p4a6ejp","duration":4,"startTime":1516292370885,"sessionId":"fds4e07mdug1ga3hlrfh3sdf6d","endTime":1516292375195,"timestamp":1516292375195}}
```

<hr>

##### webrtcConnectionCreated

Recorded when a new media stream has been established. Can be an "INBOUND" connection (the user is receiving a stream from a publisher of the session) or an "OUTBOUND" connection (the user is a publishing a stream to the session).

| Property    | Description | Value |
| ----------- | --------- | ----- |
| `sessionId` | Session for which the event was triggered | A string with the session unique identifier |
| `timestamp` | Time when the event was triggered | UTC milliseconds |
| `participantId` | Identifier of the participant          | A string with the participant unique identifier |
| `connection` | Whether the media connection is an inbound connection (the participant is receiving media from OpenVidu) or an outbound connection (the participant is sending media to OpenVidu)      | [`"INBOUND"`,`"OUTBOUND"`]|
| `receivingFrom` | If `connection` is `"INBOUND"`, the participant from whom the media stream is being received | A string with the participant (sender) unique identifier |
| `audioEnabled` | Whether the media connection is sending audio or not        | [`true`,`false`] |
| `videoEnabled` | Whether the media connection is sending video or not      | [`true`,`false`] |
| `videoSource` | If `videoEnabled` is `true`, the type of video that is being transmitted | [`"CAMERA"`,`"SCREEN"`]|

Example:
```json
{"webrtcConnectionCreated":{"participantId":"ogjud06fhgkck4id5a8p4a6ejp","videoSource":"CAMERA","connection":"OUTBOUND","audioEnabled":true,"sessionId":"fds4e07mdug1ga3hlrfh3sdf6d","videoEnabled":true,"timestamp":1516292371499}}
```

<hr>

##### webrtcConnectionDestroyed

Recorded when any media stream connection is closed.

| Property    | Description | Value |
| ----------- | --------- | ----- |
| `sessionId` | Session for which the event was triggered | A string with the session unique identifier |
| `timestamp` | Time when the event was triggered | UTC milliseconds |
| `participantId` | Identifier of the participant          | A string with the participant unique identifier |
| `connection` | Whether the media connection is an inbound connection (the participant is receiving media from OpenVidu) or an outbound connection (the participant is sending media to OpenVidu)      | [`"INBOUND"`,`"OUTBOUND"`]|
| `receivingFrom` | If `connection` is `"INBOUND"`, the participant from whom the media stream is being received | A string with the participant (sender) unique identifier |
| `audioEnabled` | Whether the media connection is sending audio or not        | [`true`,`false`] |
| `videoEnabled` | Whether the media connection is sending video or not      | [`true`,`false`] |
| `videoSource` | If `videoEnabled` is `true`, the type of video that is being transmitted | [`"CAMERA"`,`"SCREEN"`]|
| `startTime` | Time when the media connection was established         | UTC milliseconds |
| `endTime`   | Time when the media connection closed          | UTC milliseconds |
| `duration`  | Total duration of the media connection         | Seconds |

Example:
```json
{"webrtcConnectionDestroyed":{"participantId":"ogjud06fhgkck4id5a8p4a6ejp","duration":3,"videoSource":"CAMERA","connection":"OUTBOUND","audioEnabled":true,"startTime":1516292371499,"sessionId":"fds4e07mdug1ga3hlrfh3sdf6d","endTime":1516292375180,"videoEnabled":true,"timestamp":1516292375180}}
```