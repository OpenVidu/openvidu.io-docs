<h2 id="section-title">REST API</h2>
<hr>

All REST operations have in common the header referred to authorization. It is implemented via Basic Auth, and it is as simple as applying Base64 encoding to the username (always "OPENVIDUAPP") and the password (your **secret** shared with openvidu-server). If authorization header is wrong, every call to any REST API operation will return HTTP status `401`.

For example, for secret "MY_SECRET", the final valid HTTP header would be

> `Authorization: Basic T1BFTlZJRFVBUFA6TVlfU0VDUkVU`

### List of available operations
<br>

- Initialize a session: [**POST /api/sessions**](#post-apisessions)
- Generate a token: [**POST /api/tokens**](#post-apitokens)
- Retrieve active session info: [**GET /api/sessions/&lt;SESSION_ID&gt;**](#get-apisessionsltsession_idgt)
- Retrieve all active sessions info: [**GET /api/sessions**](#get-apisessions)
- Close a session: [**DELETE /api/sessions/&lt;SESSION_ID&gt;**](#delete-apisessionsltsession_idgt)
- Force the disconnection of a user from a session: [**DELETE /api/sessions/&lt;SESSION_ID&gt;/connection/&lt;CONNECTION_ID&gt;**](#delete-apisessionsltsession_idgtconnectionltconnection_idgt)
- Force the unpublishing of a user's stream from a session: [**DELETE /api/sessions/&lt;SESSION_ID&gt;/stream/&lt;STREAM_ID&gt;**](#delete-apisessionsltsession_idgtstreamltstream_idgt)
- Start the recording of a session: [**POST /api/recordings/start**](#post-apirecordingsstart)
- Stop the recording of a session: [**POST/api/recordings/stop/&lt;RECORDING_ID&gt;**](#post-apirecordingsstopltrecording_idgt)
- Get recording info: [**GET /api/recordings/&lt;RECORDING_ID&gt;**](#get-apirecordingsltrecording_idgt)
- Get all recordings info: [**GET /api/recordings**](#get-apirecordings)
- Delete a recording: [**DELETE /api/recordings/&lt;RECORDING_ID&gt;**](#delete-apirecordingsltrecording_idgt)
- Get OpenVidu active configuration: [**GET /config**](#get-config)

---

### POST `/api/sessions`

| _NEW SESSIONID_   | _PARAMETERS_                                        |
| ----------------- | --------------------------------------------------- |
| **Operation**     | POST                                                |
| **URL**           | https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/api/sessions |
| **Headers**       | Authorization: Basic _EncodeBase64(OPENVIDUAPP:&lt;YOUR_SECRET&gt;)_<br/>Content-Type: application/json |
| **Body**          | ```{"mediaMode": "MEDIA_MODE", "recordingMode": "RECORDING_MODE", "customSessionId": "CUSTOM_SESSION_ID", "defaultOutputMode": "OUTPUT_MODE", "defaultRecordingLayout": "RECORDING_LAYOUT", "defaultCustomLayout": "CUSTOM_LAYOUT"}``` |
| **Sample return** | ```{"id": "zfgmthb8jl9uellk", "createdAt": 1538481996019}``` |

> **Body parameters**
>
> ---
>
> - **mediaMode** _(optional string)_
>     - `ROUTED` _(default)_ : Media streams will be routed through OpenVidu Server. This Media Mode is mandatory for session recording
>     - Not available yet: `RELAYED`<br><br>
> - **recordingMode** _(optional string)_
>     - `ALWAYS`: Automatic recording from the first user publishing until the last participant leaves the session
>     - `MANUAL` _(default)_ : If you want to manage when start and stop the recording<br><br>
> - **customSessionId** _(optional string)_
>     - You can fix the `sessionId` that will be assigned to the session with this parameter. If you make another request with the exact same `customSessionId` while previous session already exists, no session will be created and a `409` http response will be returned. If this parameter is an empty string or not sent at all, OpenVidu Server will generate a random sessionId for you<br><br>
> - **defaultOutputMode** _(optional string)_
>     - `COMPOSED`_(default)_ : when recording the session, all streams will be composed in the same file in a grid layout
>     - `INDIVIDUAL`: when recording the session, every stream is recorded in its own file<br><br>
> - **defaultRecordingLayout** _(optional string. Only applies if `defaultOutputMode` is set to `COMPOSED`)_
>     - `BEST_FIT`_(default)_ : A grid layout where all the videos are evenly distributed
>     - `CUSTOM`: Use your own custom layout. See [Custom recording layouts](/advanced-features/recording/#custom-recording-layouts){:target="_blank"} section to learn how
>     - Not available yet: `PICTURE_IN_PICTURE`, `VERTICAL_PRESENTATION`, `HORIZONTAL_PRESENTATION`<br><br>
> - **defaultCustomLayout** _(optional string. Only applies if `defaultRecordingLayout` is set to `CUSTOM`)_
>     - A relative path indicating the custom recording layout to be used if more than one is available. Default to empty string (if so custom layout expected under path set with [openvidu-server configuration](openvidu-server-params/){:target="_blank"} property `openvidu.recording.custom-layout`)

<div></div>

> **Returned JSON**
>
> - `id`: session identifier. Store it for performing future operations onto this session
> - `createdAt`: time when the session was created in UTC milliseconds

<div></div>

> **HTTP responses**
>
> - `200`: session successfully created and sessionId ready to be used
> - `400`: problem with some body parameter
> - `409`: parameter `customSessionId` corresponds to an existing session. There has been no change at all in the state of OpenVidu Server. You can proceed to use the rejected custom sessionId as usual without a problem

---

### POST `/api/tokens`

| _NEW TOKEN_       | _PARAMETERS_                                      |
| ----------------- | ------------------------------------------------- |
| **Operation**     | POST                                              |
| **URL**           | https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/api/tokens |
| **Headers**       | Authorization: Basic _EncodeBase64(OPENVIDUAPP:&lt;YOUR_SECRET&gt;)_<br/>Content-Type: application/json |
| **Body**          | ```{"session": "SESSION_ID", "role": "ROLE", "data": "DATA", "kurentoOptions": KURENTO_OPTIONS}``` |
| **Sample return** | ```{"id":"wss://localhost:4443?sessionId=zfgmthb8jl9uellk&token=lnlrtnkwm4v8l7uc&role=PUBLISHER&turnUsername=FYYNRC&turnCredential=yfxxs3", "session": "zfgmthb8jl9uellk", "role": "PUBLISHER", "data": "User Data", "token":"wss://localhost:4443?sessionId=zfgmthb8jl9uellk&token=lnlrtnkwm4v8l7uc&role=PUBLISHER&turnUsername=FYYNRC&turnCredential=yfxxs3", "kurentoOptions": {"videoMaxSendBandwidth": 700, "allowedFilters": ["GStreamerFilter", "ZBarFilter"]}}``` |

> **Body parameters**
>
> ---
>
> - **session** _(mandatory string)_: the sessionId for which the token should be associated<br><br>
> - **role** _(optional string. Check [OpenViduRole](../../api/openvidu-node-client/enums/openvidurole.html){:target="_blank"} section of OpenVidu Node Client for a complete description)_
>     - `SUBSCRIBER`
>     - `PUBLISHER` _(default)_
>     - `MODERATOR`<br><br>
> - **data** _(optional string)_ : metadata associated to this token (usually participant's information)<br><br>
> - **kurentoOptions** _(optional JSON object)_ : you can set some configuration properties for the participant owning this token regarding Kurento. This is a JSON object with the following optional properties:<br><br>
>     - **videoMaxRecvBandwidth**: maximum number of Kbps that the client owning the token will be able to receive from Kurento Media Server. 0 means unconstrained. Giving a value to this property will override the global configuration set in _[OpenVidu Server configuration](https://openvidu.io/docs/reference-docs/openvidu-server-params){:target="_blank"}_ (parameter `openvidu.streams.video.max-recv-bandwidth`) for every incoming stream of the user owning the token. _**WARNING**: the lower value set to this property limits every other bandwidth of the WebRTC pipeline this server-to-client stream belongs to. This includes the user publishing the stream and every other user subscribed to the same stream._
>     - **videoMinRecvBandwidth**: minimum number of Kbps that the client owning the token will try to receive from Kurento Media Server. 0 means unconstrained. Giving a value to this property will override the global configuration set in _[OpenVidu Server configuration](https://openvidu.io/docs/reference-docs/openvidu-server-params){:target="_blank"}_ (parameter `openvidu.streams.video.min-recv-bandwidth`) for every incoming stream of the user owning the token.
>     - **videoMaxSendBandwidth**: maximum number of Kbps that the client owning the token will be able to send to Kurento Media Server. 0 means unconstrained. Giving a value to this property will override the global configuration set in _[OpenVidu Server configuration](https://openvidu.io/docs/reference-docs/openvidu-server-params){:target="_blank"}_ (parameter `openvidu.streams.video.max-send-bandwidth`) for every outgoing stream of the user owning the token. _**WARNING**: this value limits every other bandwidth of the WebRTC pipeline this client-to-server stream belongs to. This includes every other user subscribed to the stream._
>     - **videoMinSendBandwidth**: minimum number of Kbps that the client owning the token will try to send to Kurento Media Server. 0 means unconstrained. Giving a value to this property will override the global configuration set in _[OpenVidu Server configuration](https://openvidu.io/docs/reference-docs/openvidu-server-params){:target="_blank"}_ (parameter `openvidu.streams.video.min-send-bandwidth`) for every outgoing stream of the user owning the token.
>     - **allowedFilters**: array of strings containing the names of the filters the user owning the token will be able to apply (see [Voice and video filters](/advanced-features/filters/){:target="_blank"})

<div></div>

> **Returned JSON**
>
> - `token`: token value. Send it to one client to pass it as a parameter in openvidu-browser method _[`Session.connect`](/../api/openvidu-browser/classes/session.html#connect){:target="_blank"}_
> - `session`: same as in the body request
> - `role`: same as in the body request
> - `data`: same as in the body request
> - `id`: same value as `token`
> - `kurentoOptions`: object with Kurento configuration if provided, same as in the body request

<div></div>

> **HTTP responses**
>
> - `200`: token successfully created and ready to be used by one client to connect to the associated session
> - `400`: problem with some body parameter
> - `404`: provided value for `session` parameter was not found in OpenVidu Server. You must first call `POST /api/sessions` to get a session id

---

### GET `/api/sessions/<SESSION_ID>`

| _GET SESSION INFO_ | _PARAMETERS_                                                           |
| ------------------ | ---------------------------------------------------------------------- |
| **Operation**      | GET                                                                    |
| **URL**            | https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/api/sessions/&lt;SESSION_ID&gt; |
| **Headers**        | Authorization: Basic _EncodeBase64(OPENVIDUAPP:&lt;YOUR_SECRET&gt;)_<br/>Content-Type: application/x-www-form-urlencoded |
| **Sample return**  | ```{"sessionId":"TestSession","createdAt":1538482606338,"mediaMode":"ROUTED","recordingMode":"MANUAL","defaultOutputMode":"COMPOSED","defaultRecordingLayout":"BEST_FIT","customSessionId":"TestSession","connections":{"numberOfElements":2,"content":[{"connectionId":"vhdxz7abbfirh2lh","createdAt":1538482606412,"location":"","platform":"Chrome 69.0.3497.100 on Linux 64-bit","token":"wss://localhost:4443?sessionId=TestSession&token=2ezkertrimk6nttk&role=PUBLISHER&turnUsername=H0EQLL&turnCredential=kjh48u","role":"PUBLISHER","serverData":"","clientData":"TestClient1","publishers":[{"createdAt":1538482606976,"streamId":"vhdxz7abbfirh2lh_CAMERA_CLVAU","mediaOptions":{"hasAudio":true,"audioActive":true,"hasVideo":true,"videoActive":true,"typeOfVideo":"CAMERA","frameRate":30,"videoDimensions":"{\"width\":640,\"height\":480}","filter":{}}}],"subscribers":[]},{"connectionId":"maxawd3ysuj1rxvq","createdAt":1538482607659,"location":"","platform":"Chrome 69.0.3497.100 on Linux 64-bit","token":"wss://localhost:4443?sessionId=TestSession&token=ovj1b4ysuqmcirti&role=PUBLISHER&turnUsername=INOAHN&turnCredential=oujrqd","role":"PUBLISHER","serverData":"","clientData":"TestClient2","publishers":[],"subscribers":[{"createdAt":1538482607799,"streamId":"vhdxz7abbfirh2lh_CAMERA_CLVAU","publisher":"vhdxz7abbfirh2lh"}]}]},"recording":false}``` |


> **Returned JSON**
>
> - `sessionId`: identifier of the session (identical to _SESSION_ID_ url parameter)
> - `createdAt`: time when the session was created in UTC milliseconds
> - `mediaMode`: media mode configured for the session (`ROUTED` or `RELAYED`)
> - `recording`: whether the session is being recorded or not at this moment
> - `recordingMode`: recording mode configured for the session (`ALWAYS` or `MANUAL`)
> - `defaultOutputMode`: the default output mode for the recordings of the session (`COMPOSED` or `INDIVIDUAL`)
> - `defaultRecordingLayout`: the default recording layout configured for the recordings of the session. Only defined if field `defaultOutputMode` is set to `COMPOSED`
> - `defaultCustomLayout`: the default custom layout configured for the recordings of the session. Its format is a relative path. Only defined if field `defaultRecordingLayout` is set to `CUSTOM`
> - `customSessionId`: custom session identifier. Only defined if the session was initialized passing a `customSessionId` field (see [**POST /api/sessions**](#post-apisessions))
> - `connections`: collection of active connections in the session. This object is defined by a `numberOfElements` property counting the total number of active connections and a `content` array with the actual connections. Each object of this array has this structure:
>     - `connectionId`: identifier of the user's connection
>     - `createdAt`: time when the connection was established in UTC milliseconds
>     - `location`: geo location of the participant <a href="/docs/openvidu-pro/"><div id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin-left: 5px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</div></a>
>     - `platform`: complete description of the platform used by the participant to connect to the session
>     - `role`: role of the connection
>     - `clientData`: data defined in OpenVidu Browser when calling _[`Session.connect`](/../api/openvidu-browser/classes/session.html#connect){:target="_blank"}_ (_metadata_ parameter)
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

| _GET ALL SESSION INFO_ | _PARAMETERS_                                                         |
| ---------------------- | -------------------------------------------------------------------- |
| **Operation**          | GET                                                                  |
| **URL**                | https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/api/sessions                  |
| **Headers**            | Authorization: Basic _EncodeBase64(OPENVIDUAPP:&lt;YOUR_SECRET&gt;)_ |
| **Sample return**      | ```{"numberOfElements":1,"content":[{"sessionId":"TestSession","createdAt":1538482606338,"mediaMode":"ROUTED","recordingMode":"MANUAL","defaultOutputMode":"COMPOSED","defaultRecordingLayout":"BEST_FIT","customSessionId":"TestSession","connections":{"numberOfElements":2,"content":[{"connectionId":"vhdxz7abbfirh2lh","createdAt":1538482606412,"location":"","platform":"Chrome 69.0.3497.100 on Linux 64-bit","token":"wss://localhost:4443?sessionId=TestSession&token=2ezkertrimk6nttk&role=PUBLISHER&turnUsername=H0EQLL&turnCredential=kjh48u","role":"PUBLISHER","serverData":"","clientData":"TestClient1","publishers":[{"createdAt":1538482606976,"streamId":"vhdxz7abbfirh2lh_CAMERA_CLVAU","mediaOptions":{"hasAudio":true,"audioActive":true,"hasVideo":true,"videoActive":true,"typeOfVideo":"CAMERA","frameRate":30,"videoDimensions":"{\"width\":640,\"height\":480}","filter":{}}}],"subscribers":[]},{"connectionId":"maxawd3ysuj1rxvq","createdAt":1538482607659,"location":"","platform":"Chrome 69.0.3497.100 on Linux 64-bit","token":"wss://localhost:4443?sessionId=TestSession&token=ovj1b4ysuqmcirti&role=PUBLISHER&turnUsername=INOAHN&turnCredential=oujrqd","role":"PUBLISHER","serverData":"","clientData":"TestClient2","publishers":[],"subscribers":[{"createdAt":1538482607799,"streamId":"vhdxz7abbfirh2lh_CAMERA_CLVAU","publisher":"vhdxz7abbfirh2lh"}]}]},"recording":false}]}``` |

> **Returned JSON**
>
> - `numberOfElements`: total number of active sessions
> - `content`: array of sessions. Each object has the same structure as defined in the returned JSON of [**GET /api/sessions/&lt;SESSION_ID&gt;**](#get-apisessionsltsession_idgt)

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
> - `204`: the session has been successfully closed. Every participant will have received the proper events in OpenVidu Browser: [`streamDestroyed`](/../api/openvidu-browser/classes/streamevent.html){:target="_blank"}, [`connectionDestroyed`](/../api/openvidu-browser/classes/connectionevent.html){:target="_blank"} and [`sessionDisconnected`](/../api/openvidu-browser/classes/sessiondisconnectedevent.html){:target="_blank"}, all of them with "reason" property set to "sessionClosedByServer". Depending on the order of eviction of the users, some of them will receive more events than the others (the first one will only receive the events related to himself, last one will receive every possible event)
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
> - `204`: the user has been successfully evicted from the session. Every participant will have received the proper events in OpenVidu Browser: [`streamDestroyed`](/../api/openvidu-browser/classes/streamevent.html){:target="_blank"} if the user was publishing, [`connectionDestroyed`](/../api/openvidu-browser/classes/connectionevent.html){:target="_blank"} for the remaining users and [`sessionDisconnected`](/../api/openvidu-browser/classes/sessiondisconnectedevent.html){:target="_blank"} for the evicted user. All of them with "reason" property set to "forceDisconnectByServer"
> - `400`: no session exists for the passed SESSION_ID
> - `404`: no connection exists for the passed CONNECTION_ID

---

### DELETE `/api/sessions/<SESSION_ID>/stream/<STREAM_ID>`

| _FORCE UNPUBLISHING_ | _PARAMETERS_                                                                                                             |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Operation**        | DELETE                                                                                                                   |
| **URL**              | https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/api/sessions/&lt;SESSION_ID&gt;/stream/&lt;STREAM_ID&gt;                          |
| **Headers**          | Authorization: Basic _EncodeBase64(OPENVIDUAPP:&lt;YOUR_SECRET&gt;)_<br/>Content-Type: application/x-www-form-urlencoded |
| **Sample return**    | _Returns nothing_                                                                                                        |

> **HTTP responses**
>
> - `204`: the stream has been successfully unpublished. Every participant will have received the proper [`streamDestroyed`](/../api/openvidu-browser/classes/streamevent.html){:target="_blank"} event in OpenVidu Browser with "reason" property set to "forceUnpublishByServer"
> - `400`: no session exists for the passed SESSION_ID
> - `404`: no stream exists for the passed STREAM_ID

---

### POST `/api/recordings/start`

| _START SESSION RECORDING_ | _PARAMETERS_                                                                                              |
| ------------------------- | --------------------------------------------------------------------------------------------------------- |
| **Operation**             | POST                                                                                                      |
| **URL**                   | https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/api/recordings/start                                               |
| **Headers**               | Authorization: Basic _EncodeBase64(OPENVIDUAPP:&lt;YOUR_SECRET&gt;)_<br/>Content-Type: application/json   |
| **Body**                  | ```{"session": "SESSION_ID", "name": "NAME", "outputMode": "OUTPUT_MODE", "hasAudio": "HAS_AUDIO", "hasVideo": "HAS_VIDEO", "resolution": "RESOLUTION", "recordingLayout": "RECORDING_LAYOUT", "customLayout": "CUSTOM_LAYOUT"}```    |
| **Sample return**         | ```{"id": "fds4e07mdug1ga3h", "sessionId": "fds4e07mdug1ga3h", "name": "MyRecording", "outputMode": "COMPOSED", "hasAudio":true, "hasVideo":false,"createdAt":1538483606521, "size":3205004, "duration":12.92, "url":null, "status": "started"}``` |

> **Body parameters**
>
> ---
>
> - **session** _(mandatory string)_: the sessionId belonging to the session you want to start recording<br><br>
> - **name** _(optional string)_ : the name you want to give to the video file. You can access this same property in openvidu-browser on recordingEvents. If no name is provided, the video file will be named after `id` property of the recording<br><br>
> - **outputMode** _(optional string)_ : record all streams in a single file in a grid layout or record each stream in its own separate file. This property will override the `defaultOutputMode` property set on [POST /api/sessions](#post-apisessions) for this particular recording
>     - `COMPOSED`_(default)_ : when recording the session, all streams will be composed in the same file in a grid layout
>     - `INDIVIDUAL`: when recording the session, every stream is recorded in its own file<br><br>
> - **hasAudio** _(optional boolean)_ : whether to record audio or not. Default to true<br><br>
> - **hasVideo** _(optional boolean)_ : whether to record video or not. Default to true <br><br>
> - **recordingLayout** _(optional string. Only applies if `outputMode` is set to `COMPOSED` and `hasVideo` to true)_ : the layout to be used in this recording. This property will override the `defaultRecordingLayout` property set on [POST /api/sessions](#post-apisessions) for this particular recording.
>     - `BEST_FIT`_(default)_ : A grid layout where all the videos are evenly distributed
>     - `CUSTOM`: Use your own custom layout. See [Custom recording layouts](/advanced-features/recording/#custom-recording-layouts){:target="_blank"} section to learn how
>     - Not available yet: `PICTURE_IN_PICTURE`, `VERTICAL_PRESENTATION`, `HORIZONTAL_PRESENTATION`<br><br>
> - **customLayout** _(optional string. Only applies if `recordingLayout` is set to `CUSTOM`)_ : a relative path indicating the custom recording layout to be used if more than one is available. Default to empty string (if so custom layout expected under path set with [openvidu-server system property](openvidu-server-params/){:target="_blank"} `openvidu.recording.custom-layout`) . This property will override the `defaultCustomLayout` property set on [POST /api/sessions](#post-apisessions) for this particular recording<br><br>
> - **resolution** _(optional string. Only applies if `outputMode` is set to `COMPOSED` and `hasVideo` to true)_ : the resolution of the recorded video file. It is a string indicating the width and height in pixels like this: `"1920x1080"`. Values for both width and height must be between 100 and 1999

<div></div>

> **Returned JSON**
>
> - `id`: recording identifier. Store it to perform other operations such as stop, get or delete the recording
> - `sessionId`: session associated to the recording (same value as `session` in the body request)
> - `name`: name of the recording. If no `name` parameter is passed in the POST operation, will be equal to `id` field
> - `outputMode`: output mode of the recording
> - `hasAudio`: true if the recording has an audio track, false otherwise
> - `hasVideo`: true if the recording has a video track, false otherwise
> - `recordingLayout`: the recording layout that is being used. Only defined if `outputMode` is set to `COMPOSED` and `hasVideo` to true
> - `customLayout`: the custom layout that is being used. Only defined if `recordingLayout` is set to `CUSTOM`
> - `resolution`: resolution of the video file. Only defined if `outputMode` is set to `COMPOSED` and `hasVideo` to true
> - `createdAt`: time when the recording started in UTC milliseconds
> - `size`: size in bytes of the video file (0 until stop operation is called)
> - `duration`: duration of the video file in seconds (0 until stop operation is called)
> - `url`: set to `null`
> - `status`: set to `"started"`

<div></div>

> **HTTP responses**
>
> - `200`: the session has started to be recorded. The moment this response is retrieved, it means that the video file is already created and contains proper data, and that the recording can be stopped with guarantees
> - `400`: problem with some body parameter
> - `422`: `resolution` parameter exceeds acceptable values (for both width and height, min 100px and max 1999px) or trying to start a recording with both `hasAudio` and `hasVideo` to false
> - `404`: no session exists for the passed `sessionId` parameter
> - `406`: the session has no connected participants
> - `409`: the session is not configured for using MediaMode `ROUTED` or it is already being recorded
> - `501`: OpenVidu Server recording module is disabled (`openvidu.recording` property set to `false`)

---

### POST `/api/recordings/stop/<RECORDING_ID>`

| _STOP SESSION RECORDING_ | _PARAMETERS_                                                                    |
| ------------------------ | ------------------------------------------------------------------------------- |
| **Operation**            | POST                                                                            |
| **URL**                  | https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/api/recordings/stop/&lt;RECORDING_ID&gt; |
| **Headers**              | Authorization: Basic _EncodeBase64(OPENVIDUAPP:&lt;YOUR_SECRET&gt;)_<br/>Content-Type: application/x-www-form-urlencoded |
| **Sample return**        | ```{"id": "fds4e07mdug1ga3h", "sessionId": "fds4e07mdug1ga3h", "name": "MyRecording", "outputMode": "COMPOSED", "hasAudio": true, "hasVideo": false, "createdAt": 1538483606521, "size": 3205004, "duration": 12.92, "url": null, "status": "stopped"}``` |

> **Returned JSON**
>
> - `id`: recording identifier
> - `sessionId`: session associated to the recording
> - `name`: name of the recording. If no `name` parameter is passed when starting the recording, will be equal to `id` field
> - `outputMode`: output mode of the recording
> - `hasAudio`: true if the recording has an audio track, false otherwise
> - `hasVideo`: true if the recording has a video track, false otherwise
> - `recordingLayout`: the recording layout used in the recording. Only defined if `outputMode` is set to `COMPOSED` and `hasVideo` to true
> - `customLayout`: the custom layout used in the recording. Only defined if `recordingLayout` is set to `CUSTOM`
> - `resolution`: resolution of the video file. Only defined if `outputMode` is set to `COMPOSED` and `hasVideo` to true
> - `createdAt`: time when the recording started in UTC milliseconds
> - `size`: size in bytes of the video file
> - `duration`: duration of the video file in seconds
> - `url`: set to `null` or `"https://YOUR_OPENVIDUSERVER_IP/recordings/<RECORDING_ID>/<RECORDING_NAME>.<EXTENSION>"` depending on whether [openvidu-server system property `openvidu.recording.public-access`](openvidu-server-params/){:target="_blank"} is false or true
> - `status`: set to `"stopped"` or `"available"` depending on whether [openvidu-server system property `openvidu.recording.public-access`](openvidu-server-params/){:target="_blank"} is false or true

<div></div>

> **HTTP responses**
>
> - `200`: the session has successfully stopped from being recorded. The video file is ready to be reproduced
> - `404`: no recording exists for the passed RECORDING_ID
> - `406`: recording has `starting` status. Wait until `started` status before stopping the recording

---

### GET `/api/recordings/<RECORDING_ID>`

| _GET RECORDING INFO_ | _PARAMETERS_                                                                |
| -------------------- | --------------------------------------------------------------------------- |
| **Operation**        | GET                                                                         |
| **URL**              | https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/api/recordings/&lt;RECORDING_ID&gt;  |
| **Headers**          | Authorization: Basic _EncodeBase64(OPENVIDUAPP:&lt;YOUR_SECRET&gt;)_<br/>Content-Type: application/x-www-form-urlencoded |
| **Sample return**    | ```{"id": "fds4e07mdug1ga3h", "sessionId": "fds4e07mdug1ga3h", "name": "MyRecording", "outputMode": "COMPOSED", "hasAudio": true, "hasVideo": false, "createdAt": 1538483606521, "size": 3205004, "duration": 12.92, "url": null, "status": "stopped"}``` |

> **Returned JSON**
>
> - `id`: recording identifier
> - `sessionId`: session associated to the recording
> - `name`: name of the recording. If no `name` parameter is passed when starting the recording, will be equal to `id` field
> - `outputMode`: output mode of the recording
> - `hasAudio`: true if the recording has an audio track, false otherwise
> - `hasVideo`: true if the recording has a video track, false otherwise
> - `recordingLayout`: the recording layout used in the recording. Only defined if `outputMode` is set to `COMPOSED` and `hasVideo` to true
> - `customLayout`: the custom layout used in the recording. Only defined if `recordingLayout` is set to `CUSTOM`
> - `resolution`: resolution of the video file. Only defined if `outputMode` is set to `COMPOSED` and `hasVideo` to true
> - `createdAt`: time when the recording started in UTC milliseconds
> - `size`: size in bytes of the video file (0 until stop operation is called)
> - `duration`: duration of the video file in seconds (0 until stop operation is called)
> - `url`: set to `null` until stop operation is called. Then can be `null` or `"https://YOUR_OPENVIDUSERVER_IP/recordings/<RECORDING_ID>/<RECORDING_NAME>.<EXTENSION>"` depending on whether [openvidu-server system property `openvidu.recording.public-access`](openvidu-server-params/){:target="_blank"} is false or true.
> - `status`: status of the recording (`"starting"`, `"started"`, `"stopped"`, `"available"`, `"failed"`)

<div></div>

> **HTTP responses**
>
> - `200`: the recording information has been successfully retrieved
> - `404`: no recording exists for the passed RECORDING_ID

---

### GET `/api/recordings`

| _LIST RECORDINGS INFO_ | _PARAMETERS_                                                         |
| ---------------------- | -------------------------------------------------------------------- |
| **Operation**          | GET                                                                  |
| **URL**                | https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/api/recordings                |
| **Headers**            | Authorization: Basic _EncodeBase64(OPENVIDUAPP:&lt;YOUR_SECRET&gt;)_ |
| **Sample return**      | ```{"count": 2, "items": [{"id": "n0kcws1evvn3esmo", "sessionId": "n0kcws1evvn3esmo", "name": "n0kcws1evvn3esmo", "outputMode": "COMPOSED", "hasAudio": true, "hasVideo": true, "recordingLayout": "BEST_FIT", "resolution": "1920x1080", "createdAt": 1521202349460, "size": 22887561, "duration": 132.08, "url": "https://localhost:4443/recordings/n0kcws1evvn3esmo/n0kcws1evvn3esmo.mp4", "status": "available"}, {"id": "fds4e07mdug1ga3h", "sessionId": "fds4e07mdug1ga3h", "name": "MyRecording", "outputMode": "COMPOSED", "hasAudio": true, "hasVideo": false, "createdAt": 1538483606521, "size": 3205004, "duration": 12.92, "url": "https://localhost:4443/recordings/fds4e07mdug1ga3h/MyRecording.webm", "status": "available"}]}``` |

> **Returned JSON**
>
> - `count`: number of total recordings
> - `items`: array of recording information in JSON format. Each item has the same properties as stated in the return value of method [GET /api/recordings/&lt;RECORDING_ID&gt;](#get-apirecordingsltrecording_idgt)

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

---

### GET `/config`

| _GET OPENVIDU CONFIGURATION_   | _PARAMETERS_                                                                                                |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Operation**     | GET                                                                                                                      |
| **URL**           | https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/config                                                                            |
| **Headers**       | Authorization: Basic _EncodeBase64(OPENVIDUAPP:&lt;YOUR_SECRET&gt;)_                                                     |
| **Sample return** | ```{"version": "2.9.0", "openviduPublicurl": "https://localhost:4443/", "openviduCdr": false, "maxRecvBandwidth": 1000, "minRecvBandwidth": 300, "maxSendBandwidth": 1000, "minSendBandwidth": 300, "openviduRecording": true, "openviduRecordingVersion": "2.8.0", "openviduRecordingPath": "/opt/openvidu/recordings/", "openviduRecordingPublicAccess": true, "openviduRecordingNotification": "publisher_moderator", "openviduRecordingCustomLayout": "/opt/openvidu/custom-layout/", "openviduRecordingAutostopTimeout": 120, "openviduWebhook": true, "openviduWebhookEndpoint": "http://localhost:7777/webhook/", "openviduWebhookHeaders": ["Authorization: Basic YWJjZDphYmNk"], "openviduWebhookEvents": ["recordingStatusChanged"]}``` |

> **Returned JSON**
>
> - `version`: version of OpenVidu Server
> - **Rest of properties**: values given to **[system properties](/reference-docs/openvidu-server-params/){:target="_blank"}** on OpenVidu Server launch

<br>