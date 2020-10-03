<h2 id="section-title">OpenVidu CDR</h2>
<hr>

OpenVidu Server offers a CDR logging system, so you can easily keep record of every session and its internal behavior. To start OpenVidu Server with CDR enabled, set [configuration property **`OPENVIDU_CDR=true`**](reference-docs/openvidu-config/){:target="_blank"}. The CDR file location is given by configuration property `OPENVIDU_CDR_PATH`, default to `/opt/openvidu/cdr`.

The CDR file is a plain UTF-8 text file complying with [JSON Lines](http://jsonlines.org/){:target="_blank"} format: one standard JSON entry for each line. All JSON entries share the following structure:

```json
{"EVENT_NAME": {"sessionId": "SESSION_ID", "timestamp": 1234567890, "PROP_1":"VAL_1", "PROP_2":"VAL_2", ... }}
```

So every entry is a JSON object with a single key (the event name) and a JSON object as value (the event content). This JSON value follows this format:

- `sessionId`: a string with the unique identifier of the session for which the event was registered.
- `timestamp`: a number with the time when the event was registered in UTC milliseconds.
- `PROP_1`, `PROP_2` ... `PROP_N` : custom properties for each specific event. Their name and type differ from each other.

### Events in OpenVidu CDR

- [**sessionCreated**](#sessioncreated)
- [**sessionDestroyed**](#sessiondestroyed)
- [**participantJoined**](#participantjoined)
- [**participantLeft**](#participantleft)
- [**webrtcConnectionCreated**](#webrtcconnectioncreated)
- [**webrtcConnectionDestroyed**](#webrtcconnectiondestroyed)
- [**recordingStatusChanged**](#recordingstatuschanged)
- [**filterEventDispatched**](#filtereventdispatched)

<br>

---

#### sessionCreated

Recorded when a new session has been created.

| Property    | Description                               | Value                                       |
| ----------- | ----------------------------------------- | ------------------------------------------- |
| `sessionId` | Session for which the event was triggered | A string with the session unique identifier |
| `timestamp` | Time when the event was triggered         | UTC milliseconds                            |

```json
{
  "sessionCreated": {
    "sessionId": "ses_Jd8tUyvhXO",
    "timestamp": 1601394690713
  }
}
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

```json
{
  "sessionDestroyed": {
    "sessionId": "ses_Jd8tUyvhXO",
    "timestamp": 1601395365656,
    "startTime": 1601394690713,
    "duration": 674,
    "reason": "lastParticipantLeft"
  }
}
```

<hr>

#### participantJoined

Recorded when a user has connected to a session.

| Property        | Description                                                                            | Value                                                   |
| --------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `sessionId`     | Session for which the event was triggered                                              | A string with the session unique identifier             |
| `timestamp`     | Time when the event was triggered                                                      | UTC milliseconds                                        |
| `participantId` | Identifier of the participant                                                          | A string with the participant unique identifier         |
| `location`      | Geo location of the participant <a href="openvidu-pro/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin-left: 5px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span></a> | A string with format `"CITY, COUNTRY"` (or `"unknown"`) |
| `platform`      | Complete description of the platform used by the participant to connect to the session | A string with the platform description                  |
| `clientData`    | Metadata associated to this participant from the client side. This corresponds to parameter `metadata` of openvidu-browser method [`Session.connect`](api/openvidu-browser/classes/session.html#connect){:target="_blank"} | A string with the participant client-side metadata (generated when calling `Session.connect` method) |
| `serverData`    | Metadata associated to this participant from the server side. This corresponds to parameter `data` of REST API operation [`POST /openvidu/api/tokens`](reference-docs/REST-API/#post-openviduapitokens){:target="_blank"} or its Java/Node server SDKs variants | A string with the participant server-side metadata (generated with the token) |

```json
{
  "participantJoined": {
    "sessionId": "ses_Jd8tUyvhXO",
    "timestamp": 1601394715606,
    "participantId": "con_EIeO06zgMz",
    "location": "Berlin, Germany",
    "platform": "Chrome 85.0.4183.121 on Linux 64-bit",
    "clientData": "Mike",
    "serverData": "{'user': 'client1'}"
  }
}
```

<hr>

#### participantLeft

Recorded when a user has left a session.

| Property        | Description                                                                            | Value                                                                                                                                                                |
| --------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sessionId`     | Session for which the event was triggered                                              | A string with the session unique identifier                                                                                                                          |
| `timestamp`     | Time when the event was triggered                                                      | UTC milliseconds                                                                                                                                                     |
| `participantId` | Identifier of the participant                                                          | A string with the participant unique identifier                                                                                                                      |
| `location`      | Geo location of the participant <a href="openvidu-pro/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin-left: 5px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span></a> | A string with format `"CITY, COUNTRY"` (or `"unknown"`)                                                                                                              |
| `platform`      | Complete description of the platform used by the participant to connect to the session | A string with the platform description                                                                                                                               |
| `clientData`    | Metadata associated to this participant from the client side. This corresponds to parameter `metadata` of openvidu-browser method [`Session.connect`](api/openvidu-browser/classes/session.html#connect){:target="_blank"} | A string with the participant client-side metadata (generated when calling `Session.connect` method) |
| `serverData`    | Metadata associated to this participant from the server side. This corresponds to parameter `data` of REST API operation [`POST /openvidu/api/tokens`](reference-docs/REST-API/#post-openviduapitokens){:target="_blank"} or its Java/Node server SDKs variants | A string with the participant server-side metadata (generated with the token) |
| `startTime`     | Time when the participant joined the session                                           | UTC milliseconds                                                                                                                                                     |
| `duration`      | Total duration of the participant's connection to the session                          | Seconds                                                                                                                                                              |
| `reason`        | How the participant left the session                                                   | [`"disconnect"`,<br>`"forceDisconnectByUser"`,<br>`"forceDisconnectByServer"`,<br>`"sessionClosedByServer"`,<br>`"networkDisconnect"`,<br>`"openviduServerStopped"`] |

```json
{
  "participantLeft": {
    "sessionId": "ses_Jd8tUyvhXO",
    "timestamp": 1601395365655,
    "startTime": 1601394715606,
    "duration": 650,
    "reason": "disconnect",
    "participantId": "con_EIeO06zgMz",
    "location": "Berlin, Germany",
    "platform": "Chrome 85.0.4183.121 on Linux 64-bit",
    "clientData": "Mike",
    "serverData": "{'user': 'client1'}"
  }
}
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

```json
{
  "webrtcConnectionCreated": {
    "sessionId": "ses_Jd8tUyvhXO",
    "timestamp": 1601394849759,
    "streamId": "str_CAM_GPdf_con_EIeO06zgMz",
    "participantId": "con_ThN5Rgi8Y8",
    "connection": "INBOUND",
    "receivingFrom": "con_EIeO06zgMz",
    "videoSource": "CAMERA",
    "videoFramerate": 30,
    "videoDimensions": "{\"width\":1280,\"height\":720}",
    "audioEnabled": true,
    "videoEnabled": true
  }
}
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

```json
{
  "webrtcConnectionDestroyed": {
    "sessionId": "ses_Jd8tUyvhXO",
    "timestamp": 1601394894238,
    "startTime": 1601394849759,
    "duration": 44,
    "reason": "unsubscribe",
    "streamId": "str_CAM_GPdf_con_EIeO06zgMz",
    "participantId": "con_ThN5Rgi8Y8",
    "connection": "INBOUND",
    "receivingFrom": "con_EIeO06zgMz",
    "videoSource": "CAMERA",
    "videoFramerate": 30,
    "videoDimensions": "{\"width\":1280,\"height\":720}",
    "audioEnabled": true,
    "videoEnabled": true
  }
}
```

<hr>

#### recordingStatusChanged

Recorded when the status of a recording has changed. The status may be:

<ul><li style="margin-bottom:4px"><code>started</code>: the session is being recorded. This means the associated video(s) already exists and its size is greater than 0. NOTE: when using COMPOSED recording with video, this event does not mean there are publisher's streams being actually recorded in the video file. It only ensures the video file exists and its size is greater than 0.</li><li style="margin-bottom:4px"><code>stopped</code>: the recording process has stopped and files are being processed. Depending on the type of OpenVidu deployment and configuration, properties <i>duration</i> and <i>size</i> can be set to 0 and <i>url</i> can be null. If this is the case, wait for status <i>ready</i> to get the final value of these properties.</li><li style="margin-bottom:4px"><code>ready</code>: the recorded file has been successfully processed and is available for download. Properties <i>duration</i>, <i>size</i> and <i>url</i> will always be properly defined at this moment. For OpenVidu Pro deployments configured to <a href="advanced-features/recording/#uploading-recordings-to-aws-s3" target="_blank">upload recordings to S3</a> this status means that the recording has been successfully stored in the S3 bucket.</li><li style="margin-bottom:4px"><code>failed</code>: the recording process has failed. The final state of the recorded file cannot be guaranteed to be stable.</li></ul>

| Property          | Description                                | Value                                         |
| ----------------- | ------------------------------------------ | --------------------------------------------- |
| `sessionId`       | Session for which the event was triggered  | A string with the session unique identifier   |
| `timestamp`       | Time when the event was triggered          | UTC milliseconds                              |
| `startTime`       | Time when the recording started            | UTC milliseconds |
| `id`              | Unique identifier of the recording         | A string with the recording unique identifier |
| `name`            | Name given to the recording file           | A string with the recording name              |
| `outputMode`      | Output mode of the recording (`COMPOSED` or `INDIVIDUAL`) | A string with the recording output mode |
| `hasAudio`        | Whether the recording file has audio or not | [`true`,`false`]                              |
| `hasVideo`        | Whether the recording file has video or not | [`true`,`false`]                              |
| `recordingLayout` | The type of layout used in the recording. Only defined if `outputMode` is `COMPOSED` and `hasVideo` is true | A **[`RecordingLayout` value](api/openvidu-java-client/io/openvidu/java/client/RecordingLayout.html){:target="_blank"}** (BEST_FIT, PICTURE_IN_PICTURE, CUSTOM ...) |
| `resolution`      | Resolution of the recorded file. Only defined if `outputMode` is `COMPOSED` and `hasVideo` is true | A string with the width and height of the video file in pixels. e.g. `"1280x720"` |
| `size`            | The size of the video file. Only guaranteed to be greater than `0` if status is `ready` | Bytes                            |
| `duration`        | Duration of the video file. Only guaranteed to be greater than `0` if status is `ready` | Seconds                          |
| `status`          | Status of the recording                    | [`"started"`,`"stopped"`,`"ready"`,`"failed"`] |
| `reason`          | Why the recording stopped. Only defined when status is _stopped_ or _ready_ | [`"recordingStoppedByServer"`,<br>`"lastParticipantLeft"`,<br>`"sessionClosedByServer"`,<br>`"automaticStop"`,<br>`"openviduServerStopped"`, <br>`"mediaServerDisconnect"`] |

```json
{
  "recordingStatusChanged": {
    "sessionId": "ses_Jd8tUyvhXO",
    "timestamp": 1601395005555,
    "startTime": 1601394992838,
    "duration": 8.6,
    "reason": "recordingStoppedByServer",
    "id": "ses_Jd8tUyvhXO",
    "name": "MyRecording",
    "outputMode": "COMPOSED",
    "resolution": "1920x1080",
    "recordingLayout": "BEST_FIT",
    "hasAudio": true,
    "hasVideo": true,
    "size": 1973428,
    "status": "ready"
  }
}
```

<hr>

#### filterEventDispatched

Recorded when a filter event has been dispatched. This event can only be triggered if a filter has been applied to a stream and a listener has been added to a specific event offered by the filter. See [Voice and video filters](advanced-features/filters){:target="_blank"} to learn more.

| Property          | Description                                | Value                                         |
| ----------------- | ------------------------------------------ | --------------------------------------------- |
| `sessionId`       | Session for which the event was triggered  | A string with the session unique identifier   |
| `timestamp`       | Time when the event was triggered          | UTC milliseconds                              |
| `participantId`   | Identifier of the participant              | A string with the participant unique identifier |
| `streamId`        | Identifier of the stream for which the filter is applied | A string with the stream unique identifier |
| `filterType`      | Type of the filter applied to the stream   | A string with the type of filter              |
| `eventType`       | Event of the filter that was triggered     | A string with the type of event               |
| `data`            | Data of the filter event                   | A string with the data returned by the filter event. Its value will depend on the type of filter and event |

```json
{
  "filterEventDispatched": {
    "sessionId": "ses_Jd8tUyvhXO",
    "timestamp": 1601394994829,
    "participantId": "con_EIeO06zgMz",
    "streamId": "str_CAM_GPdf_con_EIeO06zgMz",
    "filterType": "ZBarFilter",
    "eventType": "CodeFound",
    "data": "{timestampMillis=1568645808285, codeType=EAN-13, source=23353-1d3c_kurento.MediaPipeline/1f56f4a5-807c-71a30d40_kurento.ZBarFilter, type=CodeFound, value=0012345678905, tags=[], timestamp=1568645808}"
  }
}
```

<br>
