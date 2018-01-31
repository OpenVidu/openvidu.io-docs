<h2 id="section-title">REST API</h2>
<hr>

This is the straightforward way to get **sessionId** and **token** params from openvidu-server without using _openvidu-java-client_ or _openvidu-node-client_.

Two REST operations are provided: ***/api/sessions*** and ***/api/tokens***.
Both operations have in common the header referred to authorization. It is implemented via Basic Auth, and it is as simple as applying Base64 encoding to the username (always "OPENVIDUAPP") and the password (your **secret** shared with openvidu-server). An example is shown below:

For secret "MY_SECRET", the final header would be

> Authorization:Basic T1BFTlZJRFVBUFA6TVlfU0VDUkVU

### /api/sessions

| _NEW SESSIONID_ | _PARAMETERS_ |
| ---------       | -- |
| **Operation** | POST |
| **URL** | https://[YOUR_OPENVIDUSERVER_IP]/api/sessions |
| **Headers** | Authorization:Basic _EncodeBase64(OPENVIDUAPP:[YOUR_SECRET])_ |
| **Body** _*see notes below_ | {"archiveMode": "ARCHIVE_MODE", "archiveLayout": "ARCHIVE_LAYOUT", "mediaMode": "MEDIA_MODE"} |
| **Returns** | {"id": "SESSIONID"} |

> **Body parameters**
>
> - All of them are optional (the Body of the POST operation may be empty)
> - ARCHIVE_MODE
>     - `ALWAYS`: Automatic recording from the first user publishing until the last participant leaves the session
>     - `MANUAL` (_default_) : If you want to manage when start and stop the recording. _NOT AVAILABLE YET: no recording at all if this Archive Mode is set_
> - ARCHIVE_LAYOUT
>     - `BEST_FIT`(_default_) : A grid layout where all the videos are evenly distributed
>     - Not available yet: `PICTURE_IN_PICTURE`, `VERTICAL_PRESENTATION`, `HORIZONTAL_PRESENTATION`
> - MEDIA_MODE
>     - `ROUTED` (_default_) : Media streams will be routed through OpenVidu Server. This Media Mode is mandatory for session recording
>     - Not available yet: `RELAYED`

### /api/tokens

| _NEW TOKEN_   | _PARAMETERS_                                                                                    |
| ------------- | ----------------------------------------------------------------------------------------------- |
| **Operation** | POST                                                                                            |
| **URL**       | https://[YOUR_OPENVIDUSERVER_IP]/api/tokens                                                     |
| **Headers**   | Authorization:Basic _EncodeBase64(OPENVIDUAPP:[YOUR_SECRET])_<br/>Content-Type:application/json |
| **Body**      | {"session": "SESSIONID", "role": "ROLE", "data": "DATA"}                                        |
| **Returns**   | {"token": "TOKEN", "session": "SESSIONID", "role": "ROLE", "data": "DATA", "id": "TOKEN"}       |


> **Body parameters**
> 
> - SESSIONID: the sessionId for which the token should be associated
> - ROLE _(See [OpenViduRole](/reference-docs/openvidu-java-client#openvidurole) section)_
>     - `SUBSCRIBER`
>     - `PUBLISHER`
>     - `MODERATOR` (not available yet)
> - DATA: an optional string to associate any metadata to this token (usually participant's information)

