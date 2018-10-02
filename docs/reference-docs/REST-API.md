<h2 id="section-title">REST API</h2>
<hr>

All REST operations have in common the header referred to authorization. It is implemented via Basic Auth, and it is as simple as applying Base64 encoding to the username (always "OPENVIDUAPP") and the password (your **secret** shared with openvidu-server). If authorization header is wrong, every call to any REST API operation will return HTTP status `401`.

For example, for secret "MY_SECRET", the final valid HTTP header would be

> `Authorization: Basic T1BFTlZJRFVBUFA6TVlfU0VDUkVU`

### List of available operations
<br>

- Initialize a session: [**POST /api/sessions**](#post-apisessions)
- Generate a token: [**POST /api/tokens**](#post-apitokens)
- Retrieve active session info: [**GET /api/sessions/&lt;SESSION_ID&gt;**](#get-apisessionssession_id)
- Retrieve all active sessions info: [**GET /api/sessions**](#get-apisessions)
- Close a session: [**DELETE /api/sessions/&lt;SESSION_ID&gt;**](#delete-apisessionssession_id)
- Force the disconnection of a user from a session: [**DELETE /api/sessions/&lt;SESSION_ID&gt;/connection/&lt;CONNECTION_ID&gt;**](#delete-apisessionssession_idconnectionconnection_id)
- Force the unpublishing of a user's stream from a session: [**DELETE /api/sessions/&lt;SESSION_ID&gt;/stream/&lt;STREAM_ID&gt;**](#delete-apisessionssession_idstreamstream_id)
- Start the recording of a session: [**POST /api/recordings/start**](#post-apirecordingsstart)
- Stop the recording of a session: [**POST/api/recordings/stop/&lt;RECORDING_ID&gt;**](#post-apirecordingsstoprecording_id)
- Get recording info: [**GET /api/recordings/&lt;RECORDING_ID&gt;**](#get-apirecordingsrecording_id)
- Get all recordings info: [**GET /api/recordings**](#get-apirecordings)
- Delete a recording: [**DELETE /api/recordings/&lt;RECORDING_ID&gt;**](#delete-apirecordingsrecording_id)

---

### POST `/api/sessions`

| _NEW SESSIONID_   | _PARAMETERS_                                                                                                                                                                                       |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Operation**     | POST                                                                                                                                                                                               |
| **URL**           | https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/api/sessions                                                                                                                                                |
| **Headers**       | Authorization: Basic _EncodeBase64(OPENVIDUAPP:&lt;YOUR_SECRET&gt;)_<br/>Content-Type: application/json                                                                                            |
| **Body**          | ```{"mediaMode": "MEDIA_MODE", "recordingMode": "RECORDING_MODE", "defaultRecordingLayout": "RECORDING_LAYOUT", "defaultCustomLayout": "CUSTOM_LAYOUT", "customSessionId": "CUSTOM_SESSION_ID"}``` |
| **Sample return** | ```{"id": "zfgmthb8jl9uellk", "createdAt": 1538481996019}```                                                                                                                                                                   |

> **Body parameters**
>
> ---
>
> - **mediaMode** _(optional)_
>     - `ROUTED` _(default)_ : Media streams will be routed through OpenVidu Server. This Media Mode is mandatory for session recording
>     - Not available yet: `RELAYED`<br><br>
> - **recordingMode** _(optional)_
>     - `ALWAYS`: Automatic recording from the first user publishing until the last participant leaves the session
>     - `MANUAL` _(default)_ : If you want to manage when start and stop the recording<br><br>
> - **defaultRecordingLayout** _(optional)_
>     - `BEST_FIT`_(default)_ : A grid layout where all the videos are evenly distributed
>     - `CUSTOM`: Use your own custom layout. See [Custom recording layouts](/advanced-features/recording/#custom-recording-layouts) section to learn how
>     - Not available yet: `PICTURE_IN_PICTURE`, `VERTICAL_PRESENTATION`, `HORIZONTAL_PRESENTATION`<br><br>
> - **defaultCustomLayout** _(optional)_
>     - A relative path indicating the custom recording layout to be used if more than one is available. Only applies if `defaultRecordingLayout` is set to `CUSTOM`. Default to empty string (if so custom layout expected under path set with [openvidu-server configuration](openvidu-server-params/) property `openvidu.recording.custom-layout`)<br><br>
> - **customSessionId** _(optional)_
>     - You can fix the `sessionId` that will be assigned to the session with this parameter. If you make another request with the exact same `customSessionId` while previous session already exists, no session will be created and a `409` http response will be returned. If this parameter is an empty string or not sent at all, OpenVidu Server will generate a random sessionId for you.

<div></div>

> **Returned JSON**
>
> - `id`: session identifier. Store it for performing future operations onto this session
> - `createdAt`: time when the session was created in UTC milliseconds

<div></div>

> **HTTP responses**
>
> - `200`: session successfully created and sessionId ready to be used
> - `400`: problem with body parameters
> - `409`: parameter `customSessionId` corresponds to an existing session. There has been no change at all in the state of OpenVidu Server. You can proceed to use the rejected custom sessionId as usual without a problem

---

### POST `/api/tokens`

| _NEW TOKEN_       | _PARAMETERS_                                                                                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Operation**     | POST                                                                                                                                                               |
| **URL**           | https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/api/tokens                                                                                                                  |
| **Headers**       | Authorization: Basic _EncodeBase64(OPENVIDUAPP:&lt;YOUR_SECRET&gt;)_<br/>Content-Type: application/json                                                            |
| **Body**          | ```{"session": "SESSION_ID", "role": "ROLE", "data": "DATA"}```                                                                                                    |
| **Sample return** | ```{"id":"wss://localhost:4443?sessionId=zfgmthb8jl9uellk&token=lnlrtnkwm4v8l7uc&role=PUBLISHER&turnUsername=FYYNRC&turnCredential=yfxxs3","session":"zfgmthb8jl9uellk","role":"PUBLISHER","data":"User Data","token":"wss://localhost:4443?sessionId=zfgmthb8jl9uellk&token=lnlrtnkwm4v8l7uc&role=PUBLISHER&turnUsername=FYYNRC&turnCredential=yfxxs3","kurentoOptions":{"videoMaxSendBandwidth":100,"allowedFilters":["GStreamerFilter","ZBarFilter"]}}``` |

> **Body parameters**
>
> ---
>
> - **session**: the sessionId for which the token should be associated<br><br>
> - **role** _(optional. Check [OpenViduRole](../../api/openvidu-node-client/enums/openvidurole.html) section of OpenVidu Node Client for a complete description)_
>     - `SUBSCRIBER`
>     - `PUBLISHER` _(default)_
>     - `MODERATOR`<br><br>
> - **data** _(optional)_ : an optional string to associate any metadata to this token (usually participant's information). Maximum 10000 chars<br><br>
> - **kurentoOptions** _(optional)_ : you can set some configuration properties for the participant owning this token regarding Kurento. This is an object with the following optional properties:
>     - **videoMaxRecvBandwidth**: maximum number of Kbps that the client owning the token will be able to receive from Kurento Media Server. 0 means unconstrained. Giving a value to this property will override the global configuration set in [OpenVidu Server configuration](https://openvidu.io/docs/reference-docs/openvidu-server-params/#list-of-configuration-parameters-when-launching-openvidu-server) (parameter `openvidu.streams.video.max-recv-bandwidth`) for every incoming stream of the user owning the token. _**WARNING**: the lower value set to this property limits every other bandwidth of the WebRTC pipeline this server-to-client stream belongs to. This includes the user publishing the stream and every other user subscribed to the stream._
>     - **videoMinRecvBandwidth**: minimum number of Kbps that the client owning the token will try to receive from Kurento Media Server. 0 means unconstrained. Giving a value to this property will override the global configuration set in [OpenVidu Server configuration](https://openvidu.io/docs/reference-docs/openvidu-server-params/#list-of-configuration-parameters-when-launching-openvidu-server) (parameter `openvidu.streams.video.min-recv-bandwidth`) for every incoming stream of the user owning the token.
>     - **videoMaxSendBandwidth**: maximum number of Kbps that the client owning the token will be able to send to Kurento Media Server. 0 means unconstrained. Giving a value to this property will override the global configuration set in [OpenVidu Server configuration](https://openvidu.io/docs/reference-docs/openvidu-server-params/#list-of-configuration-parameters-when-launching-openvidu-server) (parameter `openvidu.streams.video.max-send-bandwidth`) for every outgoing stream of the user owning the token. _**WARNING**: this value limits every other bandwidth of the WebRTC pipeline this client-to-server stream belongs to. This includes every other user subscribed to the stream._
>     - **videoMinSendBandwidth**: minimum number of Kbps that the client owning the token will try to send to Kurento Media Server. 0 means unconstrained. Giving a value to this property will override the global configuration set in [OpenVidu Server configuration](https://openvidu.io/docs/reference-docs/openvidu-server-params/#list-of-configuration-parameters-when-launching-openvidu-server) (parameter `openvidu.streams.video.min-send-bandwidth`) for every outgoing stream of the user owning the token.
>     - **allowedFilters**: array with the names of the filters the user owning the token will be able to apply (see [Voice and video filters](/advanced-features/filters/))

<div></div>

> **Returned JSON**
>
> - `token`: token value. Send it to one client to pass it as a parameter in openvidu-browser method `Session.connect()`
> - `session`: same as in the body request
> - `role`: same as in the body request
> - `data`: same as in the body request
> - `id`: same value as `token`
> - `kurentoOptions`: object with Kurento configuration if provided, same as in the body request

<div></div>

> **HTTP responses**
>
> - `200`: token successfully created and ready to be used by one client to connect to the associated session
> - `400`: problem with body parameters

---

### GET `/api/sessions/<SESSION_ID>`

| _GET SESSION INFO_ | _PARAMETERS_                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Operation**      | GET                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **URL**            | https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/api/sessions/&lt;SESSION_ID&gt;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **Headers**        | Authorization: Basic _EncodeBase64(OPENVIDUAPP:&lt;YOUR_SECRET&gt;)_<br/>Content-Type: application/x-www-form-urlencoded                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **Sample return**  | ```{"sessionId":"TestSession","createdAt":1538482606338,"mediaMode":"ROUTED","recordingMode":"MANUAL","defaultRecordingLayout":"BEST_FIT","customSessionId":"TestSession","connections":{"numberOfElements":2,"content":[{"connectionId":"vhdxz7abbfirh2lh","createdAt":1538482606412,"location":"","platform":"Chrome 69.0.3497.100 on Linux 64-bit","token":"wss://localhost:4443?sessionId=TestSession&token=2ezkertrimk6nttk&role=PUBLISHER&turnUsername=H0EQLL&turnCredential=kjh48u","role":"PUBLISHER","serverData":"","clientData":"TestClient1","publishers":[{"createdAt":1538482606976,"streamId":"vhdxz7abbfirh2lh_CAMERA_CLVAU","mediaOptions":{"hasAudio":true,"audioActive":true,"hasVideo":true,"videoActive":true,"typeOfVideo":"CAMERA","frameRate":30,"videoDimensions":"{\"width\":640,\"height\":480}","filter":{}}}],"subscribers":[]},{"connectionId":"maxawd3ysuj1rxvq","createdAt":1538482607659,"location":"","platform":"Chrome 69.0.3497.100 on Linux 64-bit","token":"wss://localhost:4443?sessionId=TestSession&token=ovj1b4ysuqmcirti&role=PUBLISHER&turnUsername=INOAHN&turnCredential=oujrqd","role":"PUBLISHER","serverData":"","clientData":"TestClient2","publishers":[],"subscribers":[{"createdAt":1538482607799,"streamId":"vhdxz7abbfirh2lh_CAMERA_CLVAU","publisher":"vhdxz7abbfirh2lh"}]}]},"recording":false}``` |



> **Returned JSON**
>
> - `sessionId`: identifier of the session (identical to _SESSION_ID_ url parameter)
> - `createdAt`: time when the session was created in UTC milliseconds
> - `mediaMode`: media mode configured for the session (`ROUTED` or `RELAYED`)
> - `recording`: whether the session is being recorded or not at this moment
> - `recordingMode`: recording mode configured for the session (`ALWAYS` or `MANUAL`)
> - `defaultRecordingLayout`: the default recording layout configured for the session
> - `defaultCustomLayout`: the default custom layout configured for the session. Its format is a relative path. Only defined if field `defaultRecordingLayout` is set to `CUSTOM`
> - `customSessionId`: custom session identifier. Only defined if the session was initialized passing a `customSessionId` field (see [**POST /api/sessions**](#post-apisessions))
> - `connections`: collection of active connections in the session. This object is defined by a `numberOfElements` property counting the total number of active connections and a `content` array with the actual connections. Each object of this array has this structure:
>     - `connectionId`: identifier of the user's connection
>     - `createdAt`: time when the connection was established in UTC milliseconds
>     - `location`: geo location of the participant _(ONLY IN OPENVIDU PRO)_
>     - `platform`: complete description of the platform used by the participant to connect to the session
>     - `role`: role of the connection
>     - `clientData`: data defined in OpenVidu Browser when calling [`Session.connect`](/../api/openvidu-browser/classes/session.html#connect) (_metadata_ parameter)
>     - `serverData`: data assigned to the user's token when generating the token in OpenVidu Server
>     - `token`: user's token
>     - `publishers`: array of Publisher objects (streams the user is publishing). Each one is defined by the unique `streamId` property, has a `createdAt` property indicating the time it was created in UTC milliseconds and has a `mediaOptions` object with the current properties of the published stream ("hasVideo","hasAudio","videoActive","audioActive","frameRate","videoDimensions","typeOfVideo", "filter")
>     - `subscribers`: array of Subscriber objects (streams the user is subscribed to). Each on is defined by the unique `streamId` and a `publisher` property with the _connectionId_ to identify the connection publishing the stream (must be present inside the `connections.content` array of the session)

<div></div>

> **HTTP responses**
>
> - `200`: the session information has been successfully retrieved
> - `404`: no session exists for the passed SESSION_ID

---

### GET `/api/sessions`

| _GET ALL SESSION INFO_ | _PARAMETERS_                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Operation**          | GET                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| **URL**                | https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/api/sessions                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| **Headers**            | Authorization: Basic _EncodeBase64(OPENVIDUAPP:&lt;YOUR_SECRET&gt;)_                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| **Sample return**      | ```{"numberOfElements":1,"content":[{"sessionId":"TestSession","createdAt":1538482606338,"mediaMode":"ROUTED","recordingMode":"MANUAL","defaultRecordingLayout":"BEST_FIT","customSessionId":"TestSession","connections":{"numberOfElements":2,"content":[{"connectionId":"vhdxz7abbfirh2lh","createdAt":1538482606412,"location":"","platform":"Chrome 69.0.3497.100 on Linux 64-bit","token":"wss://localhost:4443?sessionId=TestSession&token=2ezkertrimk6nttk&role=PUBLISHER&turnUsername=H0EQLL&turnCredential=kjh48u","role":"PUBLISHER","serverData":"","clientData":"TestClient1","publishers":[{"createdAt":1538482606976,"streamId":"vhdxz7abbfirh2lh_CAMERA_CLVAU","mediaOptions":{"hasAudio":true,"audioActive":true,"hasVideo":true,"videoActive":true,"typeOfVideo":"CAMERA","frameRate":30,"videoDimensions":"{\"width\":640,\"height\":480}","filter":{}}}],"subscribers":[]},{"connectionId":"maxawd3ysuj1rxvq","createdAt":1538482607659,"location":"","platform":"Chrome 69.0.3497.100 on Linux 64-bit","token":"wss://localhost:4443?sessionId=TestSession&token=ovj1b4ysuqmcirti&role=PUBLISHER&turnUsername=INOAHN&turnCredential=oujrqd","role":"PUBLISHER","serverData":"","clientData":"TestClient2","publishers":[],"subscribers":[{"createdAt":1538482607799,"streamId":"vhdxz7abbfirh2lh_CAMERA_CLVAU","publisher":"vhdxz7abbfirh2lh"}]}]},"recording":false}]}``` |

> **Returned JSON**
>
> - `numberOfElements`: total number of active sessions
> - `content`: array of sessions. Each object has the same structure as defined in the returned JSON of [**GET /api/sessions/<SESSION_ID>**](#get-apisessionssession_id)

<div></div>

> **HTTP responses**
>
> - `200`: all the session information has been successfully retrieved

---

### DELETE `/api/sessions/<SESSION_ID>`

| _CLOSE SESSION_   | _PARAMETERS_                                                                                                             |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Operation**     | DELETE                                                                                                                   |
| **URL**           | https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/api/sessions/&lt;SESSION_ID&gt;                                                   |
| **Headers**       | Authorization: Basic _EncodeBase64(OPENVIDUAPP:&lt;YOUR_SECRET&gt;)_<br/>Content-Type: application/x-www-form-urlencoded |
| **Sample return** | _Returns nothing_                                                                                                        |

> **HTTP responses**
>
> - `204`: the session has been successfully closed. Every participant will have received the proper events in OpenVidu Browser: [`streamDestroyed`](/../api/openvidu-browser/classes/streamevent.html), [`connectionDestroyed`](/../api/openvidu-browser/classes/connectionevent.html) and [`sessionDisconnected`](/../api/openvidu-browser/classes/sessiondisconnectedevent.html), all of them with "reason" property set to "sessionClosedByServer". Depending on the order of eviction of the users, some of them will receive more events than the others (the first one will only receive the events related to himself, last one will receive every possible event)
> - `404`: no session exists for the passed SESSION_ID

---

### DELETE `/api/sessions/<SESSION_ID>/connection/<CONNECTION_ID>`

| _FORCE DISCONNECTION_   | _PARAMETERS_                                                                                                             |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Operation**     | DELETE                                                                                                                   |
| **URL**           | https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/api/sessions/&lt;SESSION_ID&gt;/connection/&lt;CONNECTION_ID&gt;                  |
| **Headers**       | Authorization: Basic _EncodeBase64(OPENVIDUAPP:&lt;YOUR_SECRET&gt;)_<br/>Content-Type: application/x-www-form-urlencoded |
| **Sample return** | _Returns nothing_                                                                                                        |

> **HTTP responses**
>
> - `204`: the user has been successfully evicted from the session. Every participant will have received the proper events in OpenVidu Browser: [`streamDestroyed`](/../api/openvidu-browser/classes/streamevent.html) if the user was publishing, [`connectionDestroyed`](/../api/openvidu-browser/classes/connectionevent.html) for the remaining users and [`sessionDisconnected`](/../api/openvidu-browser/classes/sessiondisconnectedevent.html) for the evicted user. All of them with "reason" property set to "forceDisconnectByServer"
> - `400`: no session exists for the passed SESSION_ID
> - `404`: no connection exists for the passed CONNECTION_ID

---

### DELETE `/api/sessions/<SESSION_ID>/stream/<STREAM_ID>`

| _FORCE UNPUBLISHING_   | _PARAMETERS_                                                                                                             |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Operation**     | DELETE                                                                                                                   |
| **URL**           | https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/api/sessions/&lt;SESSION_ID&gt;/stream/&lt;STREAM_ID&gt;                  |
| **Headers**       | Authorization: Basic _EncodeBase64(OPENVIDUAPP:&lt;YOUR_SECRET&gt;)_<br/>Content-Type: application/x-www-form-urlencoded |
| **Sample return** | _Returns nothing_                                                                                                        |

> **HTTP responses**
>
> - `204`: the stream has been successfully unpublished. Every participant will have received the proper [`streamDestroyed`](/../api/openvidu-browser/classes/streamevent.html) event in OpenVidu Browser with "reason" property set to "forceUnpublishByServer"
> - `400`: no session exists for the passed SESSION_ID
> - `404`: no stream exists for the passed STREAM_ID

---

### POST `/api/recordings/start`

| _START SESSION RECORDING_ | _PARAMETERS_                                                                                                                                                                                                                                                                  |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Operation**             | POST                                                                                                                                                                                                                                                                          |
| **URL**                   | https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/api/recordings/start                                                                                                                                                                                                                   |
| **Headers**               | Authorization: Basic _EncodeBase64(OPENVIDUAPP:&lt;YOUR_SECRET&gt;)_<br/>Content-Type: application/json                                                                                                                                                                       |
| **Body**                  | ```{"session": "SESSION_ID", "name": "NAME", "recordingLayout": "RECORDING_LAYOUT", "customLayout": "CUSTOM_LAYOUT"}```                                                                                                                                                                                        |
| **Sample return**         | ```{"id":"fds4e07mdug1ga3h","name":"My recording","recordingLayout":"BEST_FIT","sessionId":"fds4e07mdug1ga3h","createdAt":1538483258315,"size":0,"duration":0.0,"url":null,"hasAudio":true,"hasVideo":true,"status":"started"}``` |

> **Body parameters**
>
> ---
>
> - **session**: the sessionId belonging to the session you want to start recording<br><br>
> - **name** _(optional)_ : the name you want to give to the video file. You can access this same property in openvidu-browser on recordingEvents. If no name is provided, the video file will be named after `id` property of the recording. **WARNING: this parameter follows an overwriting policy** (if you pass same "name" value for two different recordings, the newest MP4 file will overwrite the oldest one)<br><br>
> - **recordingLayout** _(optional)_ : you can override the `defaultRecordingLayout` property set on [POST /api/sessions](#post-apisessions). This allows you to use different layouts if you start and stop recording the same session more than once<br><br>
> - **customLayout** _(optional)_ : you can override the `defaultCustomLayout` property set on [POST /api/sessions](#post-apisessions). This allows you to use different custom layouts if you start and stop recording the same session more than once

<div></div>

> **Returned JSON**
>
> - `createdAt`: time when the recording started in UTC milliseconds
> - `duration`: duration of the video file in seconds (0 until stop operation is called)
> - `hasAudio`: true if the recording has an audio track, false otherwise (currently fixed to `true`)
> - `hasVideo`: true if the recording has a video track, false otherwise (currently fixed to `true`)
> - `id`: recording identifier. Store it to perform other operations such as stop, get or delete the recording
> - `recordingLayout`: the recording layout that is being used
> - `name`: name of the recording. If no `name` parameter is passed in the POST operation, will be equal to `id` field
> - `sessionId`: session associated to the recording (same value as `session` in the body request)
> - `size`: size in bytes of the video file (0 until stop operation is called)
> - `status`: set to `"started"`
> - `url`: set to `null`

<div></div>

> **HTTP responses**
>
> - `200`: the session has started to be recorded. The moment this response is retrieved, it means that the video file is already created and contains proper data, and that the recording can be stopped with guarantees
> - `404`: no session exists for the passed SESSION_ID
> - `400`: the session has no connected participants
> - `409`: the session is not configured for using MediaMode `ROUTED` or it is already being recorded
> - `501`: OpenVidu Server recording module is disabled (`openvidu.recording` property set to `false`)

---

### POST `/api/recordings/stop/<RECORDING_ID>`

| _STOP SESSION RECORDING_ | _PARAMETERS_                                                                                                                                                                                                                                                                            |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Operation**            | POST                                                                                                                                                                                                                                                                                    |
| **URL**                  | https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/api/recordings/stop/&lt;RECORDING_ID&gt;                                                                                                                                                                                                         |
| **Headers**              | Authorization: Basic _EncodeBase64(OPENVIDUAPP:&lt;YOUR_SECRET&gt;)_<br/>Content-Type: application/x-www-form-urlencoded                                                                                                                                                                |
| **Sample return**        | ```{"id":"fds4e07mdug1ga3h","name":"My Recording","recordingLayout":"BEST_FIT","sessionId":"fds4e07mdug1ga3h","createdAt":1538483606521,"size":3205004,"duration":12.92,"url":null,"hasAudio":false,"hasVideo":false,"status":"stopped"}``` |

> **Returned JSON**
>
> - `createdAt`: time when the recording started in UTC milliseconds
> - `duration`: duration of the video file in seconds
> - `hasAudio`: true if the recording has an audio track, false otherwise (currently fixed to `true`)
> - `hasVideo`: true if the recording has a video track, false otherwise (currently fixed to `true`)
> - `id`: recording identifier
> - `recordingLayout`: the recording layout that is being used
> - `name`: name of the recording (currently same as `id`)
> - `sessionId`: session associated to the recording
> - `size`: size in bytes of the video file
> - `status`: set to `"stopped"` or `"available"` depending on whether openvidu-server property _openvidu.recording.public-access_ is false or true
> - `url`: set to `null` or `"https://YOUR_OPENVIDU_SERVER_IP/recordings/<RECORDING_ID>.mp4"` depending on whether openvidu-server configuration property _openvidu.recording.public-access_ is false or true

<div></div>

> **HTTP responses**
>
> - `200`: the session has successfully stopped from being recorded. The video file is ready to be reproduced
> - `400`: RECORDING_ID parameter not found in form url-encoded
> - `404`: no recording exists for the passed RECORDING_ID
> - `406`: recording has `starting` status. Wait until `started` status before stopping the recording

---

### GET `/api/recordings/<RECORDING_ID>`

| _GET RECORDING INFO_ | _PARAMETERS_                                                                                                                                                                                                                                                                            |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Operation**        | GET                                                                                                                                                                                                                                                                                     |
| **URL**              | https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/api/recordings/&lt;RECORDING_ID&gt;                                                                                                                                                                                                              |
| **Headers**          | Authorization: Basic _EncodeBase64(OPENVIDUAPP:&lt;YOUR_SECRET&gt;)_<br/>Content-Type: application/x-www-form-urlencoded                                                                                                                                                                |
| **Sample return**    | ```{"id":"fds4e07mdug1ga3h","name":"MyRecording","recordingLayout":"BEST_FIT","sessionId":"fds4e07mdug1ga3h","createdAt":1538483606521,"size":3205004,"duration":12.92,"url":null,"hasAudio":true,"hasVideo":true,"status":"stopped"}``` |

> **Returned JSON**
>
> - `createdAt`: time when the recording started in UTC milliseconds
> - `duration`: duration of the video file in seconds (0 until stop operation is called)
> - `hasAudio`: true if the recording has an audio track, false otherwise (currently fixed to `true`)
> - `hasVideo`: true if the recording has a video track, false otherwise (currently fixed to `true`)
> - `id`: recording identifier. Store it to perform other operations such as stop, get or delete the recording
> - `recordingLayout`: the recording layout that is being used
> - `customLayout`: the custom layout that is being used. Its format is a relative path. Only defined if field `recordingLayout` is set to `CUSTOM`
> - `name`: name of the recording (currently same as `id`)
> - `sessionId`: session associated to the recording (same value as `session` in the body request)
> - `size`: size in bytes of the video file (0 until stop operation is called)
> - `status`: status of the recording (`"starting"`, `"started"`, `"stopped"`, `"available"`, `"failed"`)
> - `url`: set to `null` until stop operation is called. Then can be `null` or `"https://YOUR_OPENVIDU_SERVER_IP/recordings/<RECORDING_ID>.mp4"` depending on whether openvidu-server property _openvidu.recording.public-access_ is false or true

<div></div>

> **HTTP responses**
>
> - `200`: the recording information has been successfully retrieved
> - `404`: no recording exists for the passed RECORDING_ID

---

### GET `/api/recordings`

| _LIST RECORDINGS INFO_ | _PARAMETERS_                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Operation**          | GET                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| **URL**                | https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/api/recordings                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| **Headers**            | Authorization: Basic _EncodeBase64(OPENVIDUAPP:&lt;YOUR_SECRET&gt;)_                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **Sample return**      | ```{"count": 2, "items": [{"duration": 132.08, "hasVideo": true, "createdAt": 1521202349460, "hasAudio": true, "size": 22887561, "recordingLayout": "BEST_FIT", "name": "n0kcws1evvn3esmo", "id": "n0kcws1evvn3esmo", "sessionId": "n0kcws1evvn3esmo", "url": "https://localhost:4443/recordings/n0kcws1evvn3esmo.mp4", "status": "available"}, {"duration": 20.88, "hasVideo": true, "createdAt": 1521200592175, "hasAudio": true, "size": 3766979, "recordingLayout": "BEST_FIT", "name": "gm0hdsv6n8asjgcs", "id": "gm0hdsv6n8asjgcs", "sessionId": "gm0hdsv6n8asjgcs", "url": "https://localhost:4443/recordings/gm0hdsv6n8asjgcs.mp4", "status": "available"}]}``` |

> **Returned JSON**
>
> - `count`: number of total recordings
> - `items`: array of recording information in JSON format. Each item has the same properties as stated in the return value of method [GET /api/recordings/<RECORDING_ID>](/reference-docs/REST-API/#get-apirecordingsrecording_id)

<div></div>

> **HTTP responses**
>
> - `200`: all of the available recording information has been successfully retrieved

---

### DELETE `/api/recordings/<RECORDING_ID>`

| _DELETE RECORDING_ | _PARAMETERS_                                                                                                             |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| **Operation**      | DELETE                                                                                                                   |
| **URL**            | https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/api/recordings/&lt;RECORDING_ID&gt;                                               |
| **Headers**        | Authorization: Basic _EncodeBase64(OPENVIDUAPP:&lt;YOUR_SECRET&gt;)_<br/>Content-Type: application/x-www-form-urlencoded |
| **Sample return**  | _Returns nothing_                                                                                                        |

> **HTTP responses**
>
> - `204`: the video file and all of its metadata has been successfully deleted from the host
> - `404`: no recording exists for the passed RECORDING_ID
> - `409`: the recording has `"started"` status. Stop it before deletion
