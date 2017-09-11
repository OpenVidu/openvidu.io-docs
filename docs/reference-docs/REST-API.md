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
| **Returns** | {"id": "SESSIONID"} |

### /api/tokens

| _NEW TOKEN_ | _PARAMETERS_ |
| ---------       | -- |
| **Operation** | POST |
| **URL** | https://[YOUR_OPENVIDUSERVER_IP]/api/tokens |
| **Headers** | Authorization:Basic _EncodeBase64(OPENVIDUAPP:[YOUR_SECRET])_<br/>Content-Type:application/json |
| **Body** | {"session": "SESSIONID", "role": "ROLE", "data": "DATA"} |
| **Returns** | {"token": "TOKEN", "session": "SESSIONID", "role": "ROLE", "data": "DATA", "id": "TOKEN"} |


> **ROLE** value in Body field of POST to "/api/tokens" can be:
> 
> - SUBSCRIBER
> - PUBLISHER
> - MODERATOR
> 
> (See [OpenViduRole](/api/openvidu-java-client/#openvidurole) section)

