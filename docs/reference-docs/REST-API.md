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
| **Headers**       | Authorization: Basic _EncodeBase64(OPENVIDUAPP:[YOUR_SECRET])_<br/>Content-Type: application/json   |
| **Body**          | ```{"archiveMode": "ARCHIVE_MODE", "archiveLayout": "ARCHIVE_LAYOUT", "mediaMode": "MEDIA_MODE"}``` |
| **Sample return** | ```{"id": "wss://localhost:8443/jpifeuzfati5qaj8"}```                                               |

> **Body parameters**
>
> - All of them are optional (the Body of the POST operation may be empty)
> - ARCHIVE_MODE
>     - `ALWAYS`: Automatic recording from the first user publishing until the last participant leaves the session
>     - `MANUAL` (_default_) : If you want to manage when start and stop the recording
> - ARCHIVE_LAYOUT
>     - `BEST_FIT`(_default_) : A grid layout where all the videos are evenly distributed
>     - Not available yet: `PICTURE_IN_PICTURE`, `VERTICAL_PRESENTATION`, `HORIZONTAL_PRESENTATION`
> - MEDIA_MODE
>     - `ROUTED` (_default_) : Media streams will be routed through OpenVidu Server. This Media Mode is mandatory for session recording
>     - Not available yet: `RELAYED`

<div></div>

> **Returned JSON**
>
> - `id`: session identifier. Store it for generating tokens and starting session's recording. It is actually the URL where the client will connect to access the session

<div></div>

> **HTTP responses**
>
> - `200`: session succesfully created and sessionId ready to be used
> - `400`: problem with body parameters

---

### POST `/api/tokens`

| _NEW TOKEN_       | _PARAMETERS_                                                                                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Operation**     | POST                                                                                                                                                               |
| **URL**           | https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/api/tokens                                                                                                                  |
| **Headers**       | Authorization: Basic _EncodeBase64(OPENVIDUAPP:[YOUR_SECRET])_<br/>Content-Type: application/json                                                                  |
| **Body**          | ```{"session": "SESSION_ID", "role": "ROLE", "data": "DATA"}```                                                                                                    |
| **Sample return** | ```{"token": "tjyqiq2dw1j4fxjr", "session": "wss://localhost:8443/jpifeuzfati5qaj8", "role": "PUBLISHER", "data": "secure_user_data", "id": "tjyqiq2dw1j4fxjr"}``` |

> **Body parameters**
>
> - SESSION_ID: the sessionId for which the token should be associated
> - ROLE _(See [OpenViduRole](/reference-docs/openvidu-java-client#openvidurole) section)_
>     - `SUBSCRIBER`
>     - `PUBLISHER`
>     - `MODERATOR` (not available yet)
> - DATA: an optional string to associate any metadata to this token (usually participant's information). Maximum 1000 chars

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
> - `200`: token succesfully created and ready to be used by one client to connec to the associated session
> - `400`: problem with body parameters

---

### POST `/api/recordings/start`
_(since v1.8.0)_

| _START SESSION RECORDING_ | _PARAMETERS_                                                                                                                                                                                                                                   |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Operation**             | POST                                                                                                                                                                                                                                           |
| **URL**                   | https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/api/recordings/start                                                                                                                                                                                    |
| **Headers**               | Authorization: Basic _EncodeBase64(OPENVIDUAPP:[YOUR_SECRET])_<br/>Content-Type: application/json                                                                                                                                              |
| **Body**                  | ```{"session": "SESSION_ID"}```                                                                                                                                                                                                                |
| **Sample return**         | ```{"createdAt": 1521196095981, "duration": 0, "hasAudio": true, "hasVideo": true, "id": "jpifeuzfati5qaj8", "name": "jpifeuzfati5qaj8", "sessionId": "wss://localhost:8443/jpifeuzfati5qaj8", "size": 0, "status": "started", "url": null}``` |

> **Body parameters**
>
> - SESSION_ID: the sessionId belonging to the session you want to start recording

<div></div>

> **Returned JSON**
>
> - `createdAt`: time when the recording started in UTC milliseconds
> - `duration`: duration of the video file in seconds (0 until stop operation is called)
> - `hasAudio`: true if the recording has an audio track, false otherwise (currently fixed to `true`)
> - `hasVideo`: true if the recording has a video track, false otherwise (currently fixed to `true`)
> - `id`: recording identifier. Store it to perform other operations such as stop, get or delete the recording
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

---

### POST `/api/recordings/stop/<RECORDING_ID>`
_(since v1.8.0)_

| _STOP SESSION RECORDING_ | _PARAMETERS_                                                                                                        |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| **Operation**            | POST                                                                                                                |
| **URL**                  | https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/api/recordings/stop/&lt;RECORDING_ID&gt;                                     |
| **Headers**              | Authorization: Basic _EncodeBase64(OPENVIDUAPP:[YOUR_SECRET])_<br/>Content-Type: application/x-www-form-urlencoded  |
| **Sample return**        | ```{"createdAt": 1521196095981, "duration": 20.88,, "hasAudio": true, "hasVideo": true, "id": "jpifeuzfati5qaj8", "name": "jpifeuzfati5qaj8", "sessionId": "wss://localhost:8443/jpifeuzfati5qaj8", "size": 3766979, "status": "stopped", "url": null}``` |

> **Returned JSON**
>
> - `createdAt`: time when the recording started in UTC milliseconds
> - `duration`: duration of the video file in seconds
> - `hasAudio`: true if the recording has an audio track, false otherwise (currently fixed to `true`)
> - `hasVideo`: true if the recording has a video track, false otherwise (currently fixed to `true`)
> - `id`: recording identifier
> - `name`: name of the recording (currently same as `id`)
> - `sessionId`: session associated to the recording
> - `size`: size in bytes of the video file
> - `status`: set to `"stopped"` or `"available"` depending on whether openvidu-server property _openvidu.recording.free-access_ is false or true
> - `url`: set to `null` or `"https://YOUR_OPENVIDU_SERVER_IP/recordings/<RECORDING_ID>.mp4"` depending on whether openvidu-server property _openvidu.recording.free-access_ is false or true

<div></div>

> **HTTP responses**
>
> - `200`: the session has succesfully stopped from being recorded. The video file is ready to be reproduced
> - `400`: RECORDING_ID parameter not found in form url-encoded
> - `404`: no recording exists for the passed recording id
> - `406`: recording has `starting` status. Wait until `started` status before stopping the recording

---

### GET `/api/recordings/<RECORDING_ID>`
_(since v1.8.0)_

| _GET RECORDING INFO_ | _PARAMETERS_                                                                                                       |
| -------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Operation**        | GET                                                                                                                |
| **URL**              | https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/api/recordings/&lt;RECORDING_ID&gt;                                         |
| **Headers**          | Authorization: Basic _EncodeBase64(OPENVIDUAPP:[YOUR_SECRET])_<br/>Content-Type: application/x-www-form-urlencoded |
| **Sample return**    | ```{"createdAt": 1521196095981, "duration": 20.88,, "hasAudio": true, "hasVideo": true, "id": "jpifeuzfati5qaj8", "name": "jpifeuzfati5qaj8", "sessionId": "wss://localhost:8443/jpifeuzfati5qaj8", "size": 3766979, "status": "stopped", "url": null}``` |

> **Returned JSON**
>
> - `createdAt`: time when the recording started in UTC milliseconds
> - `duration`: duration of the video file in seconds (0 until stop operation is called)
> - `hasAudio`: true if the recording has an audio track, false otherwise (currently fixed to `true`)
> - `hasVideo`: true if the recording has a video track, false otherwise (currently fixed to `true`)
> - `id`: recording identifier. Store it to perform other operations such as stop, get or delete the recording
> - `name`: name of the recording (currently same as `id`)
> - `sessionId`: session associated to the recording (same value as `session` in the body request)
> - `size`: size in bytes of the video file (0 until stop operation is called)
> - `status`: status of the recording (`"starting"`, `"started"`, `"stopped"`, `"available"`, `"failed"`)
> - `url`: set to `null` until stop operation is called. Then can be `null` or `"https://YOUR_OPENVIDU_SERVER_IP/recordings/<RECORDING_ID>.mp4"` depending on whether openvidu-server property _openvidu.recording.free-access_ is false or true

<div></div>

> **HTTP responses**
>
> - `200`: the recording information has been succesfully retrieved
> - `404`: no recording exists for the passed recording id

---

### GET `/api/recordings`
_(since v1.8.0)_

| _LIST RECORDINGS INFO_ | _PARAMETERS_                                                    |
| ---------------------- | --------------------------------------------------------------- |
| **Operation**          | GET                                                             |
| **URL**                | https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/api/recordings           |
| **Headers**            | Authorization: Basic _EncodeBase64(OPENVIDUAPP:[YOUR_SECRET])_  |
| **Sample return**      | ```{"count": 2, "items": [{"duration": 132.08, "hasVideo": true, "createdAt": 1521202349460, "hasAudio": true, "size": 22887561, "name": "n0kcws1evvn3esmo", "id": "n0kcws1evvn3esmo", "sessionId": "wss://localhost:8443/n0kcws1evvn3esmo", "url": "https://localhost:8443/recordings/n0kcws1evvn3esmo.mp4", "status": "available"}, {"duration": 20.88, "hasVideo": true, "createdAt": 1521200592175, "hasAudio": true, "size": 3766979, "name": "gm0hdsv6n8asjgcs", "id": "gm0hdsv6n8asjgcs", "sessionId": "wss://localhost:8443/gm0hdsv6n8asjgcs", "url": "https://localhost:8443/recordings/gm0hdsv6n8asjgcs.mp4", "status": "available"}]}``` |

> **Returned JSON**
>
> - `count`: number of total recordings
> - `items`: array of recording information in JSON format. Each item has the same properties as stated in the return value of method [GET /api/recordings/<RECORDING_ID>](/reference-docs/REST-API/#get-apirecordingsrecording_id)

<div></div>

> **HTTP responses**
>
> - `200`: all of the available recording information has been succesfully retrieved

---

### DELETE `/api/recordings/<RECORDING_ID>`
_(since v1.8.0)_

| _DELETE RECORDING_ | _PARAMETERS_                                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------------------------------------ |
| **Operation**      | DELETE                                                                                                             |
| **URL**            | https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/api/recordings/&lt;RECORDING_ID&gt;                                         |
| **Headers**        | Authorization: Basic _EncodeBase64(OPENVIDUAPP:[YOUR_SECRET])_<br/>Content-Type: application/x-www-form-urlencoded |
| **Sample return**  | _Returns nothing_                                                                                                  |

> **HTTP responses**
>
> - `204`: the video file and all of its metadata has been succesfully deleted from the host
> - `404`: no recording exists for the passed recording id
> - `409`: the recording has `"started"` status. Stop it before deletion
