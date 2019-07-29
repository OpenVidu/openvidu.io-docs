<h2 id="section-title">OpenVidu Server Call Detail Record</h2>
<hr>

OpenVidu Server offers a CDR logging system, so you can easily keep record of every session, every user connecting to them and every media connection established by each one of the users (sending or receiving). To start OpenVidu Server with CDR enabled, launch it with option `openvidu.cdr=true`. The CDR file will be located under `log/` folder in the same path as your Java executable.

The record is a plain text file containing one standard JSON entry for each line. All JSON entries have the following structure:

`{"EVENT_NAME": {"sessionId": "SESSION_ID", "timestamp": TIMESTAMP, "PROP_1": "VALUE_1","PROP_2": "VALUE_2", ... }}`

So every entry is a JSON object identified by a specific event name, and all of them have as properties the `sessionId` identifying the video-session for which this event was registered and the `timestamp`. Besides this two common properties, there are custom properties for every specific event with useful information. The complete list of possible JSON entries is available below:

### List of events in OpenVidu CDR

- [**sessionCreated**](#sessioncreated)
- [**sessionDestroyed**](#sessiondestroyed)
- [**participantJoined**](#participantjoined)
- [**participantLeft**](#participantleft)
- [**webrtcConnectionCreated**](#webrtcconnectioncreated)
- [**webrtcConnectionDestroyed**](#webrtcconnectiondestroyed)
- [**recordingStarted**](#recordingstarted) _(removed in OpenVidu 2.11.0. Use **recordingStatusChanged**)_
- [**recordingStopped**](#recordingstopped) _(removed in OpenVidu 2.11.0. Use **recordingStatusChanged**)_
- [**recordingStatusChanged**](#recordingstatuschanged)

<br>

---

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
| `location`      | Geo location of the participant <a href="/docs/openvidu-pro/"><div id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin-left: 5px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</div></a> | A string with format `"CITY, COUNTRY"` (or `"unknown"`) |
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
| `location`      | Geo location of the participant <a href="/docs/openvidu-pro/"><div id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin-left: 5px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</div></a> | A string with format `"CITY, COUNTRY"` (or `"unknown"`)                                                                                                              |
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
| `reason`          | How the WebRTC connection was destroyed                                                                                                                                           | [`"unsubscribe"`,<br>`"unpublish"`,<br>`"disconnect"`,<br>`"forceUnpublishByUser"`,<br>`"forceUnpublishByServer"`,<br>`"forceDisconnectByUser"`,<br>`"forceDisconnectByServer"`,<br>`"sessionClosedByServer"`,<br>`"networkDisconnect"`,<br>`"openviduServerStopped"`,<br>`"mediaServerDisconnect"`] |

Example:
```json
{"webrtcConnectionDestroyed":{"sessionId":"fds4e07mdug1ga3h","timestamp":1538481449060,"startTime":1538481419726,"duration":29,"reason":"disconnect","participantId":"ges2furjsjjmyi0b","connection":"INBOUND","receivingFrom":"wsalcr1r72goj8sk","videoSource":"CAMERA","videoFramerate":30,"videoDimensions":"{\"width\":640,\"height\":480}","audioEnabled":true,"videoEnabled":true}}
```

<hr>

#### recordingStarted

_REMOVED IN OPENVIDU 2.11.0. Use [**recordingStatusChanged**](#recordingstatuschanged)_<br>
Recorded when a new session has started to be recorded

| Property          | Description                                | Value                                                                                                         |
| ----------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| `sessionId`       | Session for which the event was triggered  | A string with the session unique identifier |
| `timestamp`       | Time when the event was triggered          | UTC milliseconds |
| `id`              | Unique identifier of the recording         | A string with the recording unique identifier |
| `name`            | Name given to the recording file           | A string with the recording name |
| `outputMode`      | Output mode of the recording (`COMPOSED` or `INDIVIDUAL`) | A string with the recording output mode |
| `hasAudio`        | Wheter the recording file has audio or not | [`true`,`false`] |
| `hasVideo`        | Wheter the recording file has video or not | [`true`,`false`] |
| `recordingLayout` | The type of layout used in the recording. Only defined if `outputMode` is `COMPOSED` and `hasVideo` is true | A **[`RecordingLayout` value](/../api/openvidu-java-client/io/openvidu/java/client/RecordingLayout.html){:target="_blank"}** (BEST_FIT, PICTURE_IN_PICTURE, CUSTOM ...) |
| `resolution`      | Resolution of the recorded file. Only defined if `outputMode` is `COMPOSED` and `hasVideo` is true | A string with the width and height of the video file in pixels. e.g. `"1280x720"` |
| `size`            | The size of the video file                 | `0`              |
| `duration`        | Duration of the video file                 | `0`              |

Example:
```json
{"recordingStarted":{"sessionId":"TestSession","timestamp":1549015630563,"id":"TestSession","name":"MyRecording","outputMode":"COMPOSED","hasAudio":false,"hasVideo":true,"recordingLayout":"BEST_FIT","resolution":"1920x1080","size":0,"duration":0.0}}
```

<hr>

#### recordingStopped

_REMOVED IN OPENVIDU 2.11.0. Use [**recordingStatusChanged**](#recordingstatuschanged)_<br>
Recorded when a new session has stopped being recorded

| Property          | Description                                | Value                                         |
| ----------------- | ------------------------------------------ | --------------------------------------------- |
| `sessionId`       | Session for which the event was triggered  | A string with the session unique identifier   |
| `timestamp`       | Time when the event was triggered          | UTC milliseconds                              |
| `startTime`       | Time when the stopped recording started    | UTC milliseconds                              |
| `id`              | Unique identifier of the recording         | A string with the recording unique identifier |
| `name`            | Name given to the recording file           | A string with the recording name              |
| `outputMode`      | Output mode of the recording (`COMPOSED` or `INDIVIDUAL`) | A string with the recording output mode |
| `hasAudio`        | Wheter the recording file has audio or not | [`true`,`false`]                              |
| `hasVideo`        | Wheter the recording file has video or not | [`true`,`false`]                              |
| `recordingLayout` | The type of layout used in the recording. Only defined if `outputMode` is `COMPOSED` and `hasVideo` is true | A **[`RecordingLayout` value](/../api/openvidu-java-client/io/openvidu/java/client/RecordingLayout.html){:target="_blank"}** (BEST_FIT, PICTURE_IN_PICTURE, CUSTOM ...) |
| `resolution`      | Resolution of the recorded file. Only defined if `outputMode` is `COMPOSED` and `hasVideo` is true | A string with the width and height of the video file in pixels. e.g. `"1280x720"` |
| `size`            | The size of the video file                 | Bytes                                         |
| `duration`        | Duration of the video file                 | Seconds                                       |
| `reason`          | Why the recording stopped                  | [`"recordingStoppedByServer"`,<br>`"lastParticipantLeft"`,<br>`"sessionClosedByServer"`,<br>`"automaticStop"`,<br>`"openviduServerStopped"`, <br>`"mediaServerDisconnect"`] |

Example:
```json
{"recordingStopped":{"sessionId":"TestSession","timestamp":1549015640859,"startTime":1549015630563,"id":"TestSession","name":"MyRecording","outputMode":"COMPOSED","hasAudio":false,"hasVideo":true,"recordingLayout":"BEST_FIT","resolution":"1920x1080","size":617509,"duration":5.967,"reason":"recordingStoppedByServer"}}
```

<hr>

#### recordingStatusChanged

Recorded when the status of a recording has changed. The status may be:

- `started`: the session is being recorded. This means the associated video(s) already exists and its size is greater than 0. _NOTE: when using COMPOSED recording with video, this event does not mean there are publisher's streams being recorded in the video file. It only ensures the video file exists and its size is greater than 0_
- `stopped`: the recording process has stopped and files are being processed. The recording entity's _duration_ and _size_ properties will still be set to 0.
- `ready`: the recorded file has been successfully processed and is available for download. The recording entity's _duration_ and _size_ properties are properly defined now
- `failed`: the recording process has failed. The final state of the recorded file cannot be guaranteed to be stable

| Property          | Description                                | Value                                         |
| ----------------- | ------------------------------------------ | --------------------------------------------- |
| `sessionId`       | Session for which the event was triggered  | A string with the session unique identifier   |
| `timestamp`       | Time when the event was triggered          | UTC milliseconds                              |
| `startTime`       | Time when the recording started            | UTC milliseconds |
| `id`              | Unique identifier of the recording         | A string with the recording unique identifier |
| `name`            | Name given to the recording file           | A string with the recording name              |
| `outputMode`      | Output mode of the recording (`COMPOSED` or `INDIVIDUAL`) | A string with the recording output mode |
| `hasAudio`        | Wheter the recording file has audio or not | [`true`,`false`]                              |
| `hasVideo`        | Wheter the recording file has video or not | [`true`,`false`]                              |
| `recordingLayout` | The type of layout used in the recording. Only defined if `outputMode` is `COMPOSED` and `hasVideo` is true | A **[`RecordingLayout` value](/../api/openvidu-java-client/io/openvidu/java/client/RecordingLayout.html){:target="_blank"}** (BEST_FIT, PICTURE_IN_PICTURE, CUSTOM ...) |
| `resolution`      | Resolution of the recorded file. Only defined if `outputMode` is `COMPOSED` and `hasVideo` is true | A string with the width and height of the video file in pixels. e.g. `"1280x720"` |
| `size`            | The size of the video file. 0 until status is _stopped_ | Bytes                            |
| `duration`        | Duration of the video file. 0 until status is _stopped_ | Seconds                          |
| `status`          | Status of the recording                    | [`"started"`,`"stopped"`,`"ready"`,`"failed"`] |
| `reason`          | Why the recording stopped. Only defined when status is _stopped_ or _ready_ | [`"recordingStoppedByServer"`,<br>`"lastParticipantLeft"`,<br>`"sessionClosedByServer"`,<br>`"automaticStop"`,<br>`"openviduServerStopped"`, <br>`"mediaServerDisconnect"`] |

Example:
```json
{"recordingStatusChanged":{"sessionId":"TestSession","timestamp":1549015640859,"startTime":1549015630563,"duration":5.967,"id":"TestSession","name":"MyRecording","outputMode":"COMPOSED","hasAudio":true,"hasVideo":true,"recordingLayout":"BEST_FIT","resolution":"1920x1080","size":617509,"status":"stopped","reason":"sessionClosedByServer"}}
```

<br>
