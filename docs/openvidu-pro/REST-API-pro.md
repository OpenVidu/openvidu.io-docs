<h2 id="section-title">REST API Pro</h2>
<hr>

OpenVidu Pro provides all of [OpenVidu Community Edition REST operations](/reference-docs/REST-API/){:target="_blank"}, but also includes some extra REST operations of its own.

All REST operations have in common the header referred to authorization. It is implemented via Basic Auth, and it is as simple as applying Base64 encoding to the username (always "OPENVIDUAPP") and the password (your **secret** shared with openvidu-server). If authorization header is wrong, every call to any REST API operation will return HTTP status `401`.

For example, for secret "MY_SECRET", the final valid HTTP header would be

> `Authorization: Basic T1BFTlZJRFVBUFA6TVlfU0VDUkVU`

### List of available operations
<br>

- Get OpenVidu Pro active configuration: [**GET /pro/config**](#get-proconfig)
- Restart OpenVidu Pro: [**POST /pro/restart**](#post-prorestart)
- Get media server info: [**GET /pro/media-servers/&lt;MEDIA_SERVER_ID&gt;**](#get-promedia-serversltmedia_server_idgt)
- Get all media servers info: [**GET /pro/media-servers**](#get-promedia-servers)

<!-- - Register a new media server: [**POST /pro/media-servers**](#post-promedia-servers)
- Deregister a media server: [**DELETE /pro/media-servers/&lt;MEDIA_SERVER_ID&gt;**](#delete-promedia-serversltmedia_server_idgt)-->

---

### GET `/pro/config`

| _GET OPENVIDU PRO CONFIGURATION_   | _PARAMETERS_                                                                                                |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Operation**     | GET                                                                                                                      |
| **URL**           | https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/pro/config                                                                            |
| **Headers**       | Authorization: Basic _EncodeBase64(OPENVIDUAPP:&lt;YOUR_SECRET&gt;)_                                                     |
| **Sample return** | ```{"version": "2.10.0", "openviduPublicurl": "https://localhost:4443/", "openviduCdr": false, "maxRecvBandwidth": 1000, "minRecvBandwidth": 300, "maxSendBandwidth": 1000, "minSendBandwidth": 300, "openviduRecording": true, "openviduRecordingVersion": "2.9.0", "openviduRecordingPath": "/opt/openvidu/recordings/", "openviduRecordingPublicAccess": false, "openviduRecordingNotification": "publisher_moderator", "openviduRecordingCustomLayout": "/opt/openvidu/custom-layout/", "openviduRecordingAutostopTimeout": 120, "openviduWebhook": true, "openviduWebhookEndpoint": "http://localhost:7777/webhook/", "openviduWebhookHeaders": ["Authorization: Basic YWJjZDphYmNk"], "openviduWebhookEvents": ["recordingStatusChanged"], "openviduServerDependencyVersion": "2.10.0", "openviduProStatsMonitoringInterval": 30, "openviduProStatsWebrtcInterval": 30, "openviduProCluster": false, "openviduProClusterLoadStrategy": "streams", "kmsUris": ["ws://localhost:8888/kurento"]}``` |

> **Returned JSON**
>
> - `version`: version of OpenVidu Server Pro
> - `openviduServerDependencyVersion`: version of OpenVidu Server Community Edition upon which this version of OpenVidu Server Pro is built on
> - **Rest of properties**: values given to **[system properties](/reference-docs/openvidu-server-params/){:target="_blank"}** on OpenVidu Server Pro launch. These properties are mostly common to method [GET /config](/reference-docs/REST-API/#get-config){:target="_blank"} of OpenVidu Server Community Edition. Some of them are [unique for OpenVidu Server Pro](/reference-docs/openvidu-server-params/#extra-configuration-parameters-for-openvidu-server-pro){:target="_blank"}

---

### POST `/pro/restart`

| _RESTART OPENVIDU PRO_ | _PARAMETERS_                                                                    |
| ---------------------- | ------------------------------------------------------------------------------- |
| **Operation**          | POST                                                                            |
| **URL**                | https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/pro/restart/                             |
| **Headers**            | Authorization: Basic _EncodeBase64(OPENVIDUAPP:&lt;YOUR_SECRET&gt;)_<br/>Content-Type: application/json |
| **Body**               | ```{"openvidu.secret": "MY_SECRET", "openvidu.cdr": true, "openvidu.recording": true, "openvidu.recording.public-access": true, "openvidu.recording.notification": "publisher_moderator", "openvidu.recording.path": "/opt/openvidu/recordings", "openvidu.recording.custom-layout": "/opt/openvidu/custom-layout", "openvidu.recording.autostop-timeout": 120, "openvidu.webhook": true, "openvidu.webhook.endpoint": "http://localhost:7777/webhook/", "openvidu.webhook.headers": [\"Authorization:\ Basic\ T1BFTlZJRFVBUFA6TVlfU0VDUkVU\"], "openvidu.webhook.events": ["recordingStatusChanged"], "openvidu.streams.video.max-recv-bandwidth": 1000, "openvidu.streams.video.min-recv-bandwidth": 300, "openvidu.streams.video.max-send-bandwidth": 1000, "openvidu.streams.video.min-send-bandwidth": 300, "openvidu.pro.stats.monitoring-interval": 30, "openvidu.pro.stats.webrtc-interval": 20}``` |

> **Body parameters**
>
> The body of the POST request is a JSON object with the new [OpenVidu system properties](/reference-docs/openvidu-server-params/){:target="_blank"} to be applied on the restart process. Not all of them are available, and a few are exclusive to [OpenVidu Pro](/reference-docs/openvidu-server-params/#extra-configuration-parameters-for-openvidu-server-pro){:target="_blank"}. The complete list of available properties is listed below
>
> ---
>
> - **openvidu.secret** _(optional string)_ : new secret to secure OpenVidu Pro
> - **openvidu.cdr** _(optional boolean)_ : whether to enable OpenVidu Call Detail Record or not
> - **openvidu.recording** _(optional boolean)_ : whether to enable OpenVidu recording module or not
> - **openvidu.recording.public-access** _(optional boolean)_ : whether to allow free http access to recorded sessions or not
> - **openvidu.recording.notification** _(optional string)_ : which users should receive the recording events in the client side (`"all"`, `"publisher_moderator"`, `"moderator"` or `"none"`)
> - **openvidu.recording.path** _(optional string)_ : system path where to store the video files of recorded session
> - **openvidu.recording.custom-layout** _(optional string)_ : sytem path where OpenVidu Server should look for custom recording layouts
> - **openvidu.recording.autostop-timeout** _(optional number)_ : timeout in seconds for recordings to automatically stop
> - **openvidu.webhook** _(optional boolean)_ : whether to enable webhook service or not
> - **openvidu.webhook.endpoint** _(optional string)_ : endpoint where OpenVidu Server should sent webhook events. Mandatory if `openvidu.webhook` is true
> - **openvidu.webhook.headers**: _(optional array of strings)_ : HTTP headers OpenVidu Server should attach to each POST message of webhook events
> - **openvidu.webhook.events** _(optional array of strings)_ : events for which a POST message will be sent by OpenVidu Server webhook service
> - **openvidu.streams.video.max-recv-bandwidth** _(optional number)_ : maximum video bandwidth sent from clients to OpenVidu Server, in kbps. 0 means unconstrained
> - **openvidu.streams.video.min-recv-bandwidth** _(optional number)_ : minimum video bandwidth sent from clients to OpenVidu Server, in kbps. 0 means unconstrained
> - **openvidu.streams.video.max-send-bandwidth** _(optional number)_ : maximum video bandwidth sent from OpenVidu Server to clients, in kbps. 0 means unconstrained
> - **openvidu.streams.video.min-send-bandwidth** _(optional number)_ : minimum video bandwidth sent from OpenVidu Server to clients, in kbps. 0 means unconstrained
> - **openvidu.pro.stats.monitoring-interval** _(optional number)_ : interval in seconds for CPU, memory and net usage stats gathering in OpenVidu Server Pro host machine. 0 means no gathering at all
> - **openvidu.pro.stats.webrtc-interval** _(optional number)_ : interval in seconds for WebRTC stats gathering from Kurento Media Server WebRTC endpoints. 0 means no gathering at all

<div></div>

> **HTTP responses**
>
> - `200`: the restarting process has been initialized. All properties are valid and OpenVidu Server should restart properly
> - `400`: there's some problem with a body parameter. The response message will provide further details

<div></div>

> **NOTES**
>
> This method will restart OpenVidu Server Pro with the new provided configuration parameters. If your have [externalized OpenVidu Server Pro configuration](/reference-docs/openvidu-server-params/#externalizing-configuration){:target="_blank"}, the new variables will be stored in the configuration file, so you will be able to restart the host without losing your new configuration

---

### GET `/pro/media-servers/<MEDIA_SERVER_ID>`

| _GET MEDIA SERVER INFO_ | _PARAMETERS_                                                                                                         |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Operation**       | GET                                                                                                                      |
| **URL**             | https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/pro/media-servers/&lt;MEDIA_SERVER_ID&gt;                                        |
| **Query params**    | `load`, `sessions`, `extraInfo`                                                                                          |
| **Headers**         | Authorization: Basic _EncodeBase64(OPENVIDUAPP:&lt;YOUR_SECRET&gt;)_<br/>Content-Type: application/x-www-form-urlencoded |
| **Sample return**   | ```{"id": "KMS-XU5ZRM", "uri": "ws://localhost:8888/kurento", "ip": "localhost", "connected": true, "connectionTime": 1562744478463, "sessions": []}``` |

> **Query params**
>
> - `load` _(optional boolean, default to false)_ : whether to return media server load or not. The value will depend on [configuration property `openvidu.pro.cluster.load.strategy`](/reference-docs/openvidu-server-params/#extra-configuration-parameters-for-openvidu-server-pro){:target="_blank"}
> - `sessions` _(optional boolean, default to false)_ : whether to return session information along media server information or not. Only sessions hosted in this media server will be retrieved. Session information has same format as returned by method [GET /api/sessions/&lt;SESSION_ID&gt;](/reference-docs/REST-API/#get-apisessionsltsession_idgt){:target="_blank"}
> - `extraInfo` _(optional boolean, default to false)_ : whether to return extra information about the media server or not. Only for advanced users
>
> ---
>
> _Encode query params in the url like this:_ <br> _https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/pro/media-servers**?load=true&sessions=false&extraInfo=false**_

<div></div>

> **Returned JSON**
>
> - `id`: media server unique identifier. Use it to perform other REST operations on this media server
> - `uri`: media server URI endpoint. This is the URI where OpenVidu Server will establish a connection with the media server
> - `ip`: media server IP
> - `connected`: whether OpenVidu Server is connected to this media server or not. This property may be set to false if there's an unexpected disconnection of the media server
> - `connectionTime`: when did OpenVidu Server establish the connection with the media server (in UTC milliseconds)
> - `disconnectionTime`: when did OpenVidu Server lose its connection to the media server (in UTC milliseconds). Only defined if `connected` is false
> - `load`: load of the media server. Only available if query param `load` is set to true
> - `sessions`: session information of this media server. This property is an array of objects with the exact same format as the response returned by method [GET /api/sessions/&lt;SESSION_ID&gt;](/reference-docs/REST-API/#get-apisessionsltsession_idgt){:target="_blank"}. Only available if query param `sessions` is set to true
> - `kurentoInfo`: object with extra advanced information about this instance of Kurento Media Server (version, modules, memory usage...). Only available if query param `extraInfo` is set to true (for advanced users)

<div></div>

> **HTTP responses**
>
> - `200`: the media server information has been successfully retrieved
> - `404`: no media server exists for the passed MEDIA_SERVER_ID
> - `501`: [configuration property `openvidu.pro.cluster`](/reference-docs/openvidu-server-params/#extra-configuration-parameters-for-openvidu-server-pro){:target="_blank"} is set to false. You need to enable cluster mode to be able to manage media servers

---

### GET `/pro/media-servers`

| _LIST MEDIA SERVERS INFO_ | _PARAMETERS_                                                                                                         |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Operation**       | GET                                                                                                                      |
| **URL**             | https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/pro/media-servers                                                                 |
| **Query params**    | `load`, `sessions`, `extraInfo`                                                                                          |
| **Headers**         | Authorization: Basic _EncodeBase64(OPENVIDUAPP:&lt;YOUR_SECRET&gt;)_<br/>Content-Type: application/x-www-form-urlencoded |
| **Sample return**   | ```{"numberOfElements": 1, "content": [ {"id": "KMS-XU5ZRM", "uri": "ws://localhost:8888/kurento", "ip": "localhost", "connected": true, "connectionTime": 1562744478463, "load": 0} ]}``` |

> **Query params**
>
> - `load` _(optional boolean, default to false)_ : whether to return media servers load or not. The value will depend on [configuration property `openvidu.pro.cluster.load.strategy`](/reference-docs/openvidu-server-params/#extra-configuration-parameters-for-openvidu-server-pro){:target="_blank"}
> - `sessions` _(optional boolean, default to false)_ : whether to return session information along media servers information or not.  media server will be retrieved. Session information has same format as returned by method [GET /api/sessions/&lt;SESSION_ID&gt;](/reference-docs/REST-API/#get-apisessionsltsession_idgt){:target="_blank"}
> - `extraInfo` _(optional boolean, default to false)_ : whether to return extra information about the media servers or not. Only for advanced users
>
> ---
>
> _Encode query params in the url like this:_ <br> _https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/pro/media-servers**?load=true&sessions=false&extraInfo=false**_

<div></div>

> **Returned JSON**
>
> - `numberOfElements`: total number of registered media servers
> - `content`: array of media servers. Each object has the same structure as defined in the returned JSON of [**/pro/media-servers/&lt;MEDIA_SERVER_ID&gt;**](#get-promedia-serversltmedia_server_idgt)

<div></div>

> **HTTP responses**
>
> - `200`: media servers information has been successfully retrieved
> - `501`: [configuration property `openvidu.pro.cluster`](/reference-docs/openvidu-server-params/#extra-configuration-parameters-for-openvidu-server-pro){:target="_blank"} is set to false. You need to enable cluster mode to be able to manage media servers

<!--

---

### POST `/pro/media-servers`

| _REGISTER A NEW MEDIA SERVER_ | _PARAMETERS_                                                                                          |
| ------------------------- | --------------------------------------------------------------------------------------------------------- |
| **Operation**             | POST                                                                                                      |
| **URL**                   | https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/pro/media-servers                                                  |
| **Headers**               | Authorization: Basic _EncodeBase64(OPENVIDUAPP:&lt;YOUR_SECRET&gt;)_<br/>Content-Type: application/json   |
| **Body**                  | ```{"uri": "MEDIA_SERVER_URI"}```    |
| **Sample return**         | ```{"id": "KMS-GVM2CW", "uri": "ws://localhost:8888/kurento", "ip": "localhost", "connected": true, "connectionTime": 1562746120857}``` |

> **Body parameters**
>
> ---
>
> - **uri** _(mandatory string)_: the websocket endpoint of the running media server. For a Kurento Media Server, it should be something similar to `"ws://media.server.ip:8888/kurento"`

<div></div>

> **Returned JSON**
>
> - `id`: media server unique identifier. Use it to perform other REST operations on this media server
> - `uri`: media server URI endpoint. Same value as provided in property `uri` of the body request
> - `ip`: media server IP (got from the uri)
> - `connected`: set to `true`
> - `connectionTime`: when did OpenVidu Server establish the connection with the media server (in UTC milliseconds)

<div></div>

> **HTTP responses**
>
> - `200`: the media server has been successfully registered by OpenVidu Server
> - `400`: problem with some body parameter
> - `404`: the media server is not within reach of OpenVidu Server. This simply means that OpenVidu cannot establish a connection with it. This may be caused by multiple reasons: wrong IP, port or path, a network problem, too strict a proxy configuration...
> - `409`: the media server was already registered in OpenVidu Server
> - `501`: [configuration property `openvidu.pro.cluster`](/reference-docs/openvidu-server-params/#extra-configuration-parameters-for-openvidu-server-pro){:target="_blank"} is set to false. You need to enable cluster mode to be able to manage media servers

---

### DELETE `/pro/media-servers/<MEDIA_SERVER_ID>`

| _DEREGISTER A MEDIA SERVER_ | _PARAMETERS_                                                                                                    |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| **Operation**      | DELETE                                                                                                                   |
| **URL**            | https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/pro/media-servers/&lt;MEDIA_SERVER_ID&gt;                                        |
| **Query params**    | `force`                                                                                                                 |
| **Headers**        | Authorization: Basic _EncodeBase64(OPENVIDUAPP:&lt;YOUR_SECRET&gt;)_<br/>Content-Type: application/x-www-form-urlencoded |
| **Sample return**  | _Returns nothing_                                                                                                        |

> **Query params**
>
> - `force` _(optional boolean, default to false)_ : whether to force the media server deregistration or not. If there's any OpenVidu session initialized inside this media server and parameter `force` is set to false, then this operation will fail with HTTP status set to `409`. If `force` is set to true, all OpenVidu sessions hosted by this media server will be closed with reason `mediaServerDisconnect` (all streams, participants and recordings of all these sessions will be stopped with that same reason)
>
> ---
>
> _Encode query params in the url like this:_ <br> _https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/pro/media-servers/&lt;MEDIA_SERVER_ID&gt;**?force=true**_

<div></div>

> **HTTP responses**
>
> - `204`: the media server was successfully deregistered
> - `404`: no media server exists for the passed MEDIA_SERVER_ID
> - `409`: there are running sessions in this media server. If you want to avoid this error and force the disconnection of the media server closing all sessions hosted inside of it, set query param `force` to true
> - `501`: [configuration property `openvidu.pro.cluster`](/reference-docs/openvidu-server-params/#extra-configuration-parameters-for-openvidu-server-pro){:target="_blank"} is set to false. You need to enable cluster mode to be able to manage media servers

-->

<br>