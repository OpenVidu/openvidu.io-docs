<h2 id="section-title">OpenVidu Server Call Detail Record</h2>
<hr>

OpenVidu Server offers a CDR logging system, so you can easily keep record of every session, every user connecting to them and every media connection established by each one of the users (sending or receiving). To start OpenVidu Server with CDR enabled, launch it with option `openvidu.cdr=true`. The CDR file will be located under `log/` folder in the same path as your Java executable.

The record is a plain text file containing one standard JSON entry for each line. All JSON entries have the following structure:

`{"EVENT_NAME": {"sessionId": "SESSION_ID", "timestamp": TIMESTAMP, "PROP_1": "VALUE_1","PROP_2": "VALUE_2", ... }}`

So every entry is a JSON object identified by a specific event name, and all of them have as properties the `sessionId` identifying the video-session for which this event was registered and the `timestamp`. Besides this two common properties, there are custom properties for every specific event with useful information. The complete list of possible JSON entries is available below:

<hr>

#### sessionCreated

Recorded when a new session has been created.

| Property    | Description                               | Value                                       |
| ----------- | ----------------------------------------- | ------------------------------------------- |
| `sessionId` | Session for which the event was triggered | A string with the session unique identifier |
| `timestamp` | Time when the event was triggered         | UTC milliseconds                            |

Example:
```json
{"sessionCreated":{"sessionId":"fds4e07mdug1ga3h","timestamp":1516292370848}}
```

<hr>

#### sessionDestroyed

Recorded when a session has finished.

| Property    | Description                               | Value                                                     |
| ----------- | ----------------------------------------- | --------------------------------------------------------- |
| `sessionId` | Session for which the event was triggered | A string with the session unique identifier               |
| `timestamp` | Time when the event was triggered         | UTC milliseconds                                          |
| `startTime` | Time when the session started             | UTC milliseconds                                          |
| `endTime`   | Time when the session finished            | UTC milliseconds                                          |
| `duration`  | Total duration of the session             | Seconds                                                   |
| `reason`    | Why the session was destroyed             | [`"lastParticipantLeft"`,<br>`"openviduServerStopped"`] |

Example:
```json
{"sessionDestroyed":{"duration":9,"reason":"lastParticipantLeft","startTime":1523971683579,"sessionId":"fds4e07mdug1ga3h","endTime":1523971692891,"timestamp":1523971692891}}
```

<hr>

#### participantJoined

Recorded when a user has connected to a session.

| Property        | Description                               | Value                                           |
| --------------- | ----------------------------------------- | ----------------------------------------------- |
| `sessionId`     | Session for which the event was triggered | A string with the session unique identifier     |
| `timestamp`     | Time when the event was triggered         | UTC milliseconds                                |
| `participantId` | Identifier of the participant             | A string with the participant unique identifier |

Example:
```json
{"participantJoined":{"participantId":"6ptvp0in09fhbroy","sessionId":"fds4e07mdug1ga3h","timestamp":1523971683629}}
```

<hr>

#### participantLeft

Recorded when a user has left a session.

| Property        | Description                                                   | Value                                           |
| --------------- | ------------------------------------------------------------- | ----------------------------------------------- |
| `sessionId`     | Session for which the event was triggered                     | A string with the session unique identifier     |
| `timestamp`     | Time when the event was triggered                             | UTC milliseconds                                |
| `participantId` | Identifier of the participant                                 | A string with the participant unique identifier |
| `startTime`     | Time when the participant joined the session                  | UTC milliseconds                                |
| `endTime`       | Time when the participant left the session                    | UTC milliseconds                                |
| `duration`      | Total duration of the participant's connection to the session | Seconds                                         |
| `reason`        | How the participant left the session                          | [`"unsubscribe"`,<br>`"unpublish"`,<br>`"disconnect"`,<br>`"networkDisconnect"`,<br>`"openviduServerStopped"`] |

Example:
```json
{"participantLeft":{"participantId":"6ptvp0in09fhbroy","duration":9,"reason":"disconnect","startTime":1523971683629,"sessionId":"fds4e07mdug1ga3h","endTime":1523971692866,"timestamp":1523971692866}}
```

<hr>

#### webrtcConnectionCreated

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
| `videoFramerate` | If `videoEnabled` is `true`, the framerate of the transmitted video | Number of fps |

Example:
```json
{"webrtcConnectionCreated":{"participantId":"6ptvp0in09fhbroy","videoSource":"CAMERA","connection":"INBOUND","audioEnabled":true,"sessionId":"fds4e07mdug1ga3h","videoEnabled":true,"receivingFrom":"eedki0mookh577mx","timestamp":1523971686215,"videoFramerate":30}}
```

<hr>

#### webrtcConnectionDestroyed

Recorded when any media stream connection is closed.

| Property         | Description | Value |
| ---------------- | ----------- | ----- |
| `sessionId`      | Session for which the event was triggered | A string with the session unique identifier |
| `timestamp`      | Time when the event was triggered | UTC milliseconds |
| `participantId`  | Identifier of the participant     | A string with the participant unique identifier |
| `connection`     | Whether the media connection is an inbound connection (the participant is receiving media from OpenVidu) or an outbound connection (the participant is sending media to OpenVidu) | [`"INBOUND"`,`"OUTBOUND"`]|
| `receivingFrom`  | If `connection` is `"INBOUND"`, the participant from whom the media stream is being received | A string with the participant (sender) unique identifier |
| `audioEnabled`   | Whether the media connection is sending audio or not | [`true`,`false`] |
| `videoEnabled`   | Whether the media connection is sending video or not | [`true`,`false`] |
| `videoSource`    | If `videoEnabled` is `true`, the type of video that is being transmitted | [`"CAMERA"`,`"SCREEN"`]|
| `videoFramerate` | If `videoEnabled` is `true`, the framerate of the transmitted video | Number of fps |
| `startTime`      | Time when the media connection was established  | UTC milliseconds |
| `endTime`        | Time when the media connection was disposed     | UTC milliseconds |
| `duration`       | Total duration of the media connection          | Seconds          |
| `reason`         | How the WebRTC connection was destroyed         | [`"unsubscribe"`,<br>`"unpublish"`,<br>`"disconnect"`,<br>`"networkDisconnect"`,<br>`"openviduServerStopped"`] |

Example:
```json
{"webrtcConnectionDestroyed":{"reason":"disconnect","audioEnabled":true,"sessionId":"fds4e07mdug1ga3h","videoEnabled":true,"receivingFrom":"eedki0mookh577mx","participantId":"6ptvp0in09fhbroy","duration":6,"videoSource":"CAMERA","connection":"INBOUND","startTime":1523971686215,"endTime":1523971692831,"timestamp":1523971692831,"videoFramerate":30}}
```

<hr>

#### recordingStarted

Recorded when a new session has started to be recorded

| Property    | Description   	                           | Value                                            |
| ----------- | ------------------------------------------ | ------------------------------------------------ |
| `sessionId` | Session for which the event was triggered  | A string with the session unique identifier      |
| `timestamp` | Time when the event was triggered          | UTC milliseconds                                 |
| `id`        | Unique identifier of the recording         | A string with the recording unique identifier    |
| `recordingLayout` | The type of layout used in the recording   | A [`RecordingLayout`](openvidu-java-client/#recordinglayout) value (BEST_FIT, PICTURE_IN_PICTURE, CUSTOM ...) |
| `hasAudio`  | Wheter the recording file has audio or not | [`true`,`false`] (current version always `true`) |
| `hasVideo`  | Wheter the recording file has video or not | [`true`,`false`] (current version always `true`) |
| `size`      | The size of the video file                 | `0`                                              |
| `duration`  | Duration of the video file                 | `0`                                              |

Example:
```json
{"recordingStarted":{"duration":0,"hasVideo":true,"hasAudio":true,"size":0,"sessionId":"fds4e07mdug1ga3h","id":"fds4e07mdug1ga3h","layout":"BEST_FIT","timestamp":1523973259519}}
```

<hr>

#### recordingStopped

Recorded when a new session has stopped being recorded

| Property    | Description   	                           | Value                                            |
| ----------- | ------------------------------------------ | ------------------------------------------------ |
| `sessionId` | Session for which the event was triggered  | A string with the session unique identifier      |
| `timestamp` | Time when the event was triggered          | UTC milliseconds                                 |
| `id`        | Unique identifier of the recording         | A string with the recording unique identifier    |
| `recordingLayout` | The type of layout used in the recording   | A [`RecordingLayout`](openvidu-java-client/#recordinglayout) value (BEST_FIT, PICTURE_IN_PICTURE, CUSTOM ...) |
| `hasAudio`  | Wheter the recording file has audio or not | [`true`,`false`] (current version always `true`) |
| `hasVideo`  | Wheter the recording file has video or not | [`true`,`false`] (current version always `true`) |
| `size`      | The size of the video file                 | Bytes                                            |
| `duration`  | Duration of the video file                 | Seconds                                          |

Example:
```json
{"recordingStopped":{"duration":4,"hasVideo":true,"hasAudio":true,"size":4919937,"sessionId":"fds4e07mdug1ga3h","id":"fds4e07mdug1ga3h","layout":"BEST_FIT","timestamp":1523973286992}}
```

<br>