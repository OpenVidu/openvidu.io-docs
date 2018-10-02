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
{"sessionCreated":{"sessionId":"fds4e07mdug1ga3h","timestamp":1538481330577}}
```

<hr>

#### sessionDestroyed

Recorded when a session has finished.

| Property    | Description                               | Value                                                                                 |
| ----------- | ----------------------------------------- | ------------------------------------------------------------------------------------- |
| `sessionId` | Session for which the event was triggered | A string with the session unique identifier                                           |
| `timestamp` | Time when the event was triggered         | UTC milliseconds                                                                      |
| `startTime` | Time when the session started             | UTC milliseconds                                                                      |
| `duration`  | Total duration of the session             | Seconds                                                                               |
| `reason`    | Why the session was destroyed             | [`"lastParticipantLeft"`,<br>`"sessionClosedByServer"`,<br>`"openviduServerStopped"`] |

Example:
```json
{"sessionDestroyed":{"sessionId":"fds4e07mdug1ga3h","timestamp":1538481699154,"startTime":1538481330577,"duration":368,"reason":"lastParticipantLeft"}}
```

<hr>

#### participantJoined

Recorded when a user has connected to a session.

| Property        | Description                                                                            | Value                                                   |
| --------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `sessionId`     | Session for which the event was triggered                                              | A string with the session unique identifier             |
| `timestamp`     | Time when the event was triggered                                                      | UTC milliseconds                                        |
| `participantId` | Identifier of the participant                                                          | A string with the participant unique identifier         |
| `location`      | Geo location of the participant _(ONLY IN OPENVIDU PRO)_                               | A string with format `"CITY, COUNTRY"` (or `"unknown"`) |
| `platform`      | Complete description of the platform used by the participant to connect to the session | A string with the platform description                  |

Example:
```json
{"participantJoined":{"sessionId":"fds4e07mdug1ga3h","timestamp":1538481330760,"participantId":"wsalcr1r72goj8sk","location":"Berlin, Germany","platform":"Chrome 69.0.3497.81 on OS X 10.13.6 64-bit"}}
```

<hr>

#### participantLeft

Recorded when a user has left a session.

| Property        | Description                                                                            | Value                                                                                                                                                                |
| --------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sessionId`     | Session for which the event was triggered                                              | A string with the session unique identifier                                                                                                                          |
| `timestamp`     | Time when the event was triggered                                                      | UTC milliseconds                                                                                                                                                     |
| `participantId` | Identifier of the participant                                                          | A string with the participant unique identifier                                                                                                                      |
| `location`      | Geo location of the participant _(ONLY IN OPENVIDU PRO)_                                 | A string with format `"CITY, COUNTRY"` (or `"unknown"`)                                                                                                              |
| `platform`      | Complete description of the platform used by the participant to connect to the session | A string with the platform description                                                                                                                               |
| `startTime`     | Time when the participant joined the session                                           | UTC milliseconds                                                                                                                                                     |
| `duration`      | Total duration of the participant's connection to the session                          | Seconds                                                                                                                                                              |
| `reason`        | How the participant left the session                                                   | [`"disconnect"`,<br>`"forceDisconnectByUser"`,<br>`"forceDisconnectByServer"`,<br>`"sessionClosedByServer"`,<br>`"networkDisconnect"`,<br>`"openviduServerStopped"`] |

Example:
```json
{"participantLeft":{"sessionId":"fds4e07mdug1ga3h","timestamp":1538481597612,"startTime":1538481532507,"duration":65,"reason":"disconnect","participantId":"lgge40niviipjzwg","location":"Berlin, Germany","platform":"Chrome 69.0.3497.81 on OS X 10.13.6 64-bit"}}
```

<hr>

#### webrtcConnectionCreated

Recorded when a new media stream has been established. Can be an "INBOUND" connection (the user is receiving a stream from a publisher of the session) or an "OUTBOUND" connection (the user is a publishing a stream to the session).

| Property          | Description                                                                                                                                                                       | Value                                                    |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `sessionId`       | Session for which the event was triggered                                                                                                                                         | A string with the session unique identifier              |
| `timestamp`       | Time when the event was triggered                                                                                                                                                 | UTC milliseconds                                         |
| `participantId`   | Identifier of the participant                                                                                                                                                     | A string with the participant unique identifier          |
| `connection`      | Whether the media connection is an inbound connection (the participant is receiving media from OpenVidu) or an outbound connection (the participant is sending media to OpenVidu) | [`"INBOUND"`,`"OUTBOUND"`]                               |
| `receivingFrom`   | If `connection` is `"INBOUND"`, the participant from whom the media stream is being received                                                                                      | A string with the participant (sender) unique identifier |
| `audioEnabled`    | Whether the media connection has negotiated audio or not                                                                                                                          | [`true`,`false`]                                         |
| `videoEnabled`    | Whether the media connection has negotiated video or not                                                                                                                          | [`true`,`false`]                                         |
| `videoSource`     | If `videoEnabled` is `true`, the type of video that is being transmitted                                                                                                          | [`"CAMERA"`,`"SCREEN"`]                                  |
| `videoFramerate`  | If `videoEnabled` is `true`, the framerate of the transmitted video                                                                                                               | Number of fps                                            |
| `videoDimensions` | If `videoEnabled` is `true`, the dimensions transmitted video                                                                                                                     | String with the dimensions (e.g. `"1920x1080"`)          |

Example:
```json
{"webrtcConnectionCreated":{"sessionId":"fds4e07mdug1ga3h","timestamp":1538481419726,"participantId":"ges2furjsjjmyi0b","connection":"INBOUND","receivingFrom":"wsalcr1r72goj8sk","videoSource":"CAMERA","videoFramerate":30,"videoDimensions":"{\"width\":640,\"height\":480}","audioEnabled":true,"videoEnabled":true}}
```

<hr>

#### webrtcConnectionDestroyed

Recorded when any media stream connection is closed.

| Property          | Description                                                                                                                                                                       | Value                                                                                                                                                                                                                                                                  |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sessionId`       | Session for which the event was triggered                                                                                                                                         | A string with the session unique identifier                                                                                                                                                                                                                            |
| `timestamp`       | Time when the event was triggered                                                                                                                                                 | UTC milliseconds                                                                                                                                                                                                                                                       |
| `participantId`   | Identifier of the participant                                                                                                                                                     | A string with the participant unique identifier                                                                                                                                                                                                                        |
| `connection`      | Whether the media connection is an inbound connection (the participant is receiving media from OpenVidu) or an outbound connection (the participant is sending media to OpenVidu) | [`"INBOUND"`,`"OUTBOUND"`]                                                                                                                                                                                                                                             |
| `receivingFrom`   | If `connection` is `"INBOUND"`, the participant from whom the media stream is being received                                                                                      | A string with the participant (sender) unique identifier                                                                                                                                                                                                               |
| `audioEnabled`    | Whether the media connection has negotiated audio or not                                                                                                                          | [`true`,`false`]                                                                                                                                                                                                                                                       |
| `videoEnabled`    | Whether the media connection has negotiated video or not                                                                                                                          | [`true`,`false`]                                                                                                                                                                                                                                                       |
| `videoSource`     | If `videoEnabled` is `true`, the type of video that is being transmitted                                                                                                          | [`"CAMERA"`,`"SCREEN"`]                                                                                                                                                                                                                                                |
| `videoFramerate`  | If `videoEnabled` is `true`, the framerate of the transmitted video                                                                                                               | Number of fps                                                                                                                                                                                                                                                          |
| `videoDimensions` | If `videoEnabled` is `true`, the dimensions transmitted video                                                                                                                     | String with the dimensions (e.g. `"1920x1080"`)                                                                                                                                                                                                                        |
| `startTime`       | Time when the media connection was established                                                                                                                                    | UTC milliseconds                                                                                                                                                                                                                                                       |
| `duration`        | Total duration of the media connection                                                                                                                                            | Seconds                                                                                                                                                                                                                                                                |
| `reason`          | How the WebRTC connection was destroyed                                                                                                                                           | [`"unsubscribe"`,<br>`"unpublish"`,<br>`"disconnect"`,<br>`"forceUnpublishByUser"`,<br>`"forceUnpublishByServer"`,<br>`"forceDisconnectByUser"`,<br>`"forceDisconnectByServer"`,<br>`"sessionClosedByServer"`,<br>`"networkDisconnect"`,<br>`"openviduServerStopped"`] |

Example:
```json
{"webrtcConnectionDestroyed":{"sessionId":"fds4e07mdug1ga3h","timestamp":1538481449060,"startTime":1538481419726,"duration":29,"reason":"disconnect","participantId":"ges2furjsjjmyi0b","connection":"INBOUND","receivingFrom":"wsalcr1r72goj8sk","videoSource":"CAMERA","videoFramerate":30,"videoDimensions":"{\"width\":640,\"height\":480}","audioEnabled":true,"videoEnabled":true}}
```

<hr>

#### recordingStarted

Recorded when a new session has started to be recorded

| Property          | Description                                | Value                                                                                                         |
| ----------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| `sessionId`       | Session for which the event was triggered  | A string with the session unique identifier                                                                   |
| `timestamp`       | Time when the event was triggered          | UTC milliseconds                                                                                              |
| `id`              | Unique identifier of the recording         | A string with the recording unique identifier                                                                 |
| `recordingLayout` | The type of layout used in the recording   | A [`RecordingLayout`](openvidu-java-client/#recordinglayout) value (BEST_FIT, PICTURE_IN_PICTURE, CUSTOM ...) |
| `hasAudio`        | Wheter the recording file has audio or not | [`true`,`false`] (current version always `true`)                                                              |
| `hasVideo`        | Wheter the recording file has video or not | [`true`,`false`] (current version always `true`)                                                              |
| `size`            | The size of the video file                 | `0`                                                                                                           |
| `duration`        | Duration of the video file                 | `0`                                                                                                           |

Example:
```json
{"recordingStarted":{"sessionId":"fds4e07mdug1ga3h","timestamp":1538481536707,"id":"TestSession","name":"TestSession","recordingLayout":"BEST_FIT","hasAudio":true,"hasVideo":true,"size":0,"duration":0.0}}
```

<hr>

#### recordingStopped

Recorded when a new session has stopped being recorded

| Property          | Description                                | Value                                                                                                                           |
| ----------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `sessionId`       | Session for which the event was triggered  | A string with the session unique identifier                                                                                     |
| `timestamp`       | Time when the event was triggered          | UTC milliseconds                                                                                                                |
| `id`              | Unique identifier of the recording         | A string with the recording unique identifier                                                                                   |
| `recordingLayout` | The type of layout used in the recording   | A [`RecordingLayout`](/../api/openvidu-node-client/enums/recordinglayout.html) value (BEST_FIT, PICTURE_IN_PICTURE, CUSTOM ...) |
| `hasAudio`        | Wheter the recording file has audio or not | [`true`,`false`] (current version always `true`)                                                                                |
| `hasVideo`        | Wheter the recording file has video or not | [`true`,`false`] (current version always `true`)                                                                                |
| `size`            | The size of the video file                 | Bytes                                                                                                                           |
| `duration`        | Duration of the video file                 | Seconds                                                                                                                         |
| `reason`          | Why the recording stopped                  | [`"recordingStoppedByServer"`,<br>`"lastParticipantLeft"`,<br>`"sessionClosedByServer"`,<br>`"openviduServerStopped"`]          |

Example:
```json
{"recordingStopped":{"sessionId":"fds4e07mdug1ga3h","timestamp":1538481568974,"startTime":1538481536707,"duration":28.72,"reason":"recordingStoppedByServer","id":"TestSession","name":"TestSession","recordingLayout":"BEST_FIT","hasAudio":false,"hasVideo":false,"size":6084390}}
```

<br>