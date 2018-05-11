<h2 id="section-title">REST API</h2>
<hr>

All REST operations have in common the header referred to authorization. It is implemented via Basic Auth, and it is as simple as applying Base64 encoding to the username (always "OPENVIDUAPP") and the password (your **secret** shared with openvidu-server). An example is shown below:

For secret "MY_SECRET", the final HTTP header would be

> `Authorization: Basic T1BFTlZJRFVBUFA6TVlfU0VDUkVU`

### POST `/api/sessions`

| _NEW SESSIONID_   | _PARAMETERS_                                                                                        |
| ----------------- | --------------------------------------------------------------------------------------------------- |
| **Operation**     | POST                                                                                                |
| **URL**           | https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/api/sessions                                                 |
| **Headers**       | Authorization: Basic _EncodeBase64(OPENVIDUAPP:&lt;YOUR_SECRET&gt;)_<br/>Content-Type: application/json   |
| **Body**          | ```{"mediaMode": "MEDIA_MODE", "recordingMode": "RECORDING_MODE", "defaultRecordingLayout": "RECORDING_LAYOUT", "defaultCustomLayout": "CUSTOM_LAYOUT", "customSessionId": "CUSTOM_SESSION_ID"}``` |
| **Sample return** | ```{"id": "wss://localhost:4443/jpifeuzfati5qaj8"}```                                               |

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
> - `id`: session identifier. Store it for generating tokens and starting session's recording. It is actually the URL where the client will connect to access the session

<div></div>

> **HTTP responses**
>
> - `200`: session successfully created and sessionId ready to be used
> - `400`: problem with body parameters
> - `409`: parameter `customSessionId` corresponds to an existing session. There has been no change at all in the state of OpenVidu Server

---

### POST `/api/tokens`

| _NEW TOKEN_       | _PARAMETERS_                                                                                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Operation**     | POST                                                                                                                                                               |
| **URL**           | https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/api/tokens                                                                                                                  |
| **Headers**       | Authorization: Basic _EncodeBase64(OPENVIDUAPP:&lt;YOUR_SECRET&gt;)_<br/>Content-Type: application/json                                                            |
| **Body**          | ```{"session": "SESSION_ID", "role": "ROLE", "data": "DATA"}```                                                                                                    |
| **Sample return** | ```{"token": "tjyqiq2dw1j4fxjr", "session": "wss://localhost:4443/jpifeuzfati5qaj8", "role": "PUBLISHER", "data": "secure_user_data", "id": "tjyqiq2dw1j4fxjr"}``` |

> **Body parameters**
>
> ---
>
> - **session**: the sessionId for which the token should be associated<br><br>
> - **role** _(optional. Check [OpenViduRole](../../api/openvidu-node-client/enums/openvidurole.html) section of OpenVidu Node Client for a complete description)_
>     - `SUBSCRIBER`
>     - `PUBLISHER` _(default)_
>     - `MODERATOR`<br><br>
> - **data** _(optional)_ : an optional string to associate any metadata to this token (usually participant's information). Maximum 1000 chars

<div></div>

> **Returned JSON**
>
> - `token`: token value. Send it to one client to pass it as a parameter in openvidu-browser method `Session.connect()`
> - `session`: same as in the body request
> - `role`: same as in the body request
> - `data`: same as in the body request
> - `id`: same value as `token`

<div></div>

> **HTTP responses**
>
> - `200`: token successfully created and ready to be used by one client to connec to the associated session
> - `400`: problem with body parameters

---

### POST `/api/recordings/start`

| _START SESSION RECORDING_ | _PARAMETERS_                                                                                                                                                                                                                                   |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Operation**             | POST                                                                                                                                                                                                                                           |
| **URL**                   | https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/api/recordings/start                                                                                                                                                                                    |
| **Headers**               | Authorization: Basic _EncodeBase64(OPENVIDUAPP:&lt;YOUR_SECRET&gt;)_<br/>Content-Type: application/json                                                                                                                                              |
| **Body**                  | ```{"session": "SESSION_ID", "name": "NAME", "recordingLayout": "RECORDING_LAYOUT"}```                                                                                                                                                                                                                |
| **Sample return**         | ```{"createdAt": 1521196095981, "duration": 0, "hasAudio": true, "hasVideo": true, "id": "jpifeuzfati5qaj8", "recordingLayout": "BEST_FIT", "name": "jpifeuzfati5qaj8", "sessionId": "wss://localhost:4443/jpifeuzfati5qaj8", "size": 0, "status": "started", "url": null}``` |

> **Body parameters**
>
> ---
>
> - **session**: the sessionId belonging to the session you want to start recording<br><br>
> - **name** _(optional)_ : the name you want to give to the video file. You can access this same property in openvidu-browser on recordingEvents. If no name is provided, the video file will be named after `id` property of the recording<br><br>
> - **recordingLayout** _(optional)_ : you can override the `defaultRecordingLayout` property set on [POST /api/sessions](#post-apisessions). This allows you to use different layouts if you start and stop recording the same session more than once

<div></div>

> **Returned JSON**
>
> - `createdAt`: time when the recording started in UTC milliseconds
> - `duration`: duration of the video file in seconds (0 until stop operation is called)
> - `hasAudio`: true if the recording has an audio track, false otherwise (currently fixed to `true`)
> - `hasVideo`: true if the recording has a video track, false otherwise (currently fixed to `true`)
> - `id`: recording identifier. Store it to perform other operations such as stop, get or delete the recording
> - `recordingLayout`: the recording layout that is being used
> - `name`: name of the recording (currently same as `id`)
> - `sessionId`: session associated to the recording (same value as `session` in the body request)
> - `size`: size in bytes of the video file (0 until stop operation is called)
> - `status`: set to `"started"`
> - `url`: set to `null`

<div></div>

> **HTTP responses**
>
> - `200`: the session has started to be recorded. The moment this response is retrieved, it means that the video file is already created and contains proper data, and that the recording can be stopped with guarantees
> - `404`: no session exists for the passed sessionId
> - `400`: the session has no connected participants
> - `409`: the session is not configured for using MediaMode `ROUTED` or it is already being recorded
> - `501`: OpenVidu Server recording module is disabled (`openvidu.recording` property set to `false`)

---

### POST `/api/recordings/stop/<RECORDING_ID>`

| _STOP SESSION RECORDING_ | _PARAMETERS_                                                                                                        |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| **Operation**            | POST                                                                                                                |
| **URL**                  | https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/api/recordings/stop/&lt;RECORDING_ID&gt;                                     |
| **Headers**              | Authorization: Basic _EncodeBase64(OPENVIDUAPP:&lt;YOUR_SECRET&gt;)_<br/>Content-Type: application/x-www-form-urlencoded  |
| **Sample return**        | ```{"createdAt": 1521196095981, "duration": 20.88, "hasAudio": true, "hasVideo": true, "id": "jpifeuzfati5qaj8", "recordingLayout": "BEST_FIT", "name": "jpifeuzfati5qaj8", "sessionId": "wss://localhost:4443/jpifeuzfati5qaj8", "size": 3766979, "status": "stopped", "url": null}``` |

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
> - `url`: set to `null` or `"https://YOUR_OPENVIDU_SERVER_IP/recordings/<RECORDING_ID>.mp4"` depending on whether openvidu-server property _openvidu.recording.public-access_ is false or true

<div></div>

> **HTTP responses**
>
> - `200`: the session has successfully stopped from being recorded. The video file is ready to be reproduced
> - `400`: RECORDING_ID parameter not found in form url-encoded
> - `404`: no recording exists for the passed recording id
> - `406`: recording has `starting` status. Wait until `started` status before stopping the recording

---

### GET `/api/recordings/<RECORDING_ID>`

| _GET RECORDING INFO_ | _PARAMETERS_                                                                                                       |
| -------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Operation**        | GET                                                                                                                |
| **URL**              | https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/api/recordings/&lt;RECORDING_ID&gt;                                         |
| **Headers**          | Authorization: Basic _EncodeBase64(OPENVIDUAPP:&lt;YOUR_SECRET&gt;)_<br/>Content-Type: application/x-www-form-urlencoded |
| **Sample return**    | ```{"createdAt": 1521196095981, "duration": 20.88, "hasAudio": true, "hasVideo": true, "id": "jpifeuzfati5qaj8", "recordingLayout": "BEST_FIT", "name": "jpifeuzfati5qaj8", "sessionId": "wss://localhost:4443/jpifeuzfati5qaj8", "size": 3766979, "status": "stopped", "url": null}``` |

> **Returned JSON**
>
> - `createdAt`: time when the recording started in UTC milliseconds
> - `duration`: duration of the video file in seconds (0 until stop operation is called)
> - `hasAudio`: true if the recording has an audio track, false otherwise (currently fixed to `true`)
> - `hasVideo`: true if the recording has a video track, false otherwise (currently fixed to `true`)
> - `id`: recording identifier. Store it to perform other operations such as stop, get or delete the recording
> - `recordingLayout`: the recording layout that is being used
> - `name`: name of the recording (currently same as `id`)
> - `sessionId`: session associated to the recording (same value as `session` in the body request)
> - `size`: size in bytes of the video file (0 until stop operation is called)
> - `status`: status of the recording (`"starting"`, `"started"`, `"stopped"`, `"available"`, `"failed"`)
> - `url`: set to `null` until stop operation is called. Then can be `null` or `"https://YOUR_OPENVIDU_SERVER_IP/recordings/<RECORDING_ID>.mp4"` depending on whether openvidu-server property _openvidu.recording.public-access_ is false or true

<div></div>

> **HTTP responses**
>
> - `200`: the recording information has been successfully retrieved
> - `404`: no recording exists for the passed recording id

---

### GET `/api/recordings`

| _LIST RECORDINGS INFO_ | _PARAMETERS_                                                    |
| ---------------------- | --------------------------------------------------------------- |
| **Operation**          | GET                                                             |
| **URL**                | https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/api/recordings           |
| **Headers**            | Authorization: Basic _EncodeBase64(OPENVIDUAPP:&lt;YOUR_SECRET&gt;)_  |
| **Sample return**      | ```{"count": 2, "items": [{"duration": 132.08, "hasVideo": true, "createdAt": 1521202349460, "hasAudio": true, "size": 22887561, "recordingLayout": "BEST_FIT", "name": "n0kcws1evvn3esmo", "id": "n0kcws1evvn3esmo", "sessionId": "wss://localhost:4443/n0kcws1evvn3esmo", "url": "https://localhost:4443/recordings/n0kcws1evvn3esmo.mp4", "status": "available"}, {"duration": 20.88, "hasVideo": true, "createdAt": 1521200592175, "hasAudio": true, "size": 3766979, "recordingLayout": "BEST_FIT", "name": "gm0hdsv6n8asjgcs", "id": "gm0hdsv6n8asjgcs", "sessionId": "wss://localhost:4443/gm0hdsv6n8asjgcs", "url": "https://localhost:4443/recordings/gm0hdsv6n8asjgcs.mp4", "status": "available"}]}``` |

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

| _DELETE RECORDING_ | _PARAMETERS_                                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------------------------------------ |
| **Operation**      | DELETE                                                                                                             |
| **URL**            | https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/api/recordings/&lt;RECORDING_ID&gt;                                         |
| **Headers**        | Authorization: Basic _EncodeBase64(OPENVIDUAPP:&lt;YOUR_SECRET&gt;)_<br/>Content-Type: application/x-www-form-urlencoded |
| **Sample return**  | _Returns nothing_                                                                                                  |

> **HTTP responses**
>
> - `204`: the video file and all of its metadata has been successfully deleted from the host
> - `404`: no recording exists for the passed recording id
> - `409`: the recording has `"started"` status. Stop it before deletion
