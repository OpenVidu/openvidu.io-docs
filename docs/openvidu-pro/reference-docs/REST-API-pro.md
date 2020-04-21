<h2 id="section-title">REST API Pro</h2>
<hr>

OpenVidu Pro provides all of [OpenVidu CE REST operations](reference-docs/REST-API/){:target="_blank"}, but also includes some extra REST operations of its own.

All REST operations have in common the header referred to authorization. It is implemented via Basic Auth, and it is as simple as applying Base64 encoding to the username (always "OPENVIDUAPP") and the password (your **secret** shared with openvidu-server). If authorization header is wrong, every call to any REST API operation will return HTTP status `401`.

For example, for secret "MY_SECRET", the final valid HTTP header would be

> `Authorization: Basic T1BFTlZJRFVBUFA6TVlfU0VDUkVU`

### List of available operations
<br>

- Get Media Node info: [**GET /pro/media-nodes/&lt;MEDIA_NODE_ID&gt;**](#get-promedia-nodesltmedia_node_idgt)
- Get all Media Nodes info: [**GET /pro/media-nodes**](#get-promedia-nodes)
- Add new Media Node: [**POST /pro/media-nodes**](#post-promedia-nodes)
- Remove Media Node: [**DELETE /pro/media-nodes/&lt;MEDIA_NODE_ID&gt;**](#delete-promedia-nodesltmedia_node_idgt)
- Modify Media Node: [**PATCH /pro/media-nodes/&lt;MEDIA_NODE_ID&gt;**](#patch-promedia-nodesltmedia_node_idgt)
- Force Media Nodes autodiscovery: [**PUT /pro/media-nodes**](#put-promedia-nodes)
- Restart OpenVidu Pro: [**POST /pro/restart**](#post-prorestart)
- Get OpenVidu Pro active configuration: [**GET /pro/config**](#get-proconfig)

---

### GET `/pro/media-nodes/<MEDIA_NODE_ID>`

| _GET MEDIA NODE INFO_ | _PARAMETERS_                                                                                                           |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Operation**       | GET                                                                                                                      |
| **URL**             | https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/pro/media-nodes/&lt;MEDIA_NODE_ID&gt;                                             |
| **Query params**    | `load`, `sessions`, `extra-info`                                                                                         |
| **Headers**         | Authorization: Basic _EncodeBase64(OPENVIDUAPP:&lt;YOUR_SECRET&gt;)_<br/>Content-Type: application/x-www-form-urlencoded |
| **Sample return**   | `{"id": "kms_RicdrF9x", "environmentId": "5372e1c954fd54c13706f476236", "ip": "172.17.0.4", "uri": "ws://172.17.0.4:8888/kurento", "connected": true, "connectionTime": 1583753233620, "sessions": [], "load": 0.0, "status": "running"}` |

> **Query params**
>
> - `load` _(optional boolean, default to false)_ : whether to return Media Node load or not. The value will depend on [configuration property `OPENVIDU_PRO_CLUSTER_LOAD_STRATEGY`](openvidu-pro/reference-docs/openvidu-pro-config){:target="_blank"}
> - `sessions` _(optional boolean, default to false)_ : whether to return session information along Media Node information or not. Only sessions hosted in this Media Node will be retrieved. Session information has same format as returned by method [GET /api/sessions/&lt;SESSION_ID&gt;](reference-docs/REST-API/#get-apisessionsltsession_idgt){:target="_blank"}
> - `extra-info` _(optional boolean, default to false)_ : whether to return extra information about the Media Node or not. Only for advanced users
>
> ---
>
> _Encode query params in the url like this:_ <br> _https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/pro/media-nodes**?load=true&sessions=false&extra-info=false**_

<div></div>

> **Returned JSON**
>
> - `id`: Media Node unique identifier. Use it to perform other REST operations on this Media Node
> - `environmentId`: Media Node identifier dependent on the deployment environment. For example, an AWS EC2 machine id if the cluster is deployed in AWS
> - `ip`: Media Node IP
> - `uri`: Media Node URI endpoint. This is the URI where OpenVidu Server will establish a connection with the Media Node
> - `connected`: whether OpenVidu Server Pro is connected to this Media Node or not. This property may be set to false if there's an unexpected disconnection of the Media Node
> - `connectionTime`: when did OpenVidu Server establish the connection with the Media Node (in UTC milliseconds)
> - `disconnectionTime`: when did OpenVidu Server lose its connection to the Media Node (in UTC milliseconds). Only defined if `connected` is false
> - `sessions`: session information of this Media Node. This property is an array of objects with the exact same format as the response returned by method [GET /api/sessions/&lt;SESSION_ID&gt;](reference-docs/REST-API/#get-apisessionsltsession_idgt){:target="_blank"}. Only available if query param `sessions` is set to true
> - `load`: load of the Media Node. Only available if query param `load` is set to true
> - `status`: status of the Media Node (see [Media Node statuses](openvidu-pro/reference-docs/openvidu-server-pro-cdr/#media-node-statuses){:target="_blank"})
> - `kurentoInfo`: object with extra advanced information about this instance of Kurento Media Server (version, modules, memory usage...). Only available if query param `extra-info` is set to true (for advanced users, subject to change)

<div></div>

> **HTTP responses**
>
> - `200`: the Media Node information has been successfully retrieved
> - `404`: no Media Node exists for the passed MEDIA_NODE_ID
> - `501`: [configuration property `OPENVIDU_PRO_CLUSTER`](openvidu-pro/reference-docs/openvidu-pro-config){:target="_blank"} is set to false. You need to enable cluster mode to be able to manage Media Nodes

---

### GET `/pro/media-nodes`

| _LIST MEDIA NODES INFO_ | _PARAMETERS_                                                                                                         |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Operation**       | GET                                                                                                                      |
| **URL**             | https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/pro/media-nodes                                                                   |
| **Query params**    | `load`, `sessions`, `extra-info`                                                                                         |
| **Headers**         | Authorization: Basic _EncodeBase64(OPENVIDUAPP:&lt;YOUR_SECRET&gt;)_<br/>Content-Type: application/x-www-form-urlencoded |
| **Sample return**   | ```{"numberOfElements": 1, "content": [ {"id": "KMS-XU5ZRM", "uri": "ws://localhost:8888/kurento", "ip": "localhost", "connected": true, "connectionTime": 1562744478463, "load": 0} ]}``` |

> **Query params**
>
> - `load` _(optional boolean, default to false)_ : whether to return Media Nodes load or not. The value will depend on [configuration property `OPENVIDU_PRO_CLUSTER_LOAD_STRATEGY`](openvidu-pro/reference-docs/openvidu-pro-config){:target="_blank"}
> - `sessions` _(optional boolean, default to false)_ : whether to return session information along Media Nodes information or not.  Media Node will be retrieved. Session information has same format as returned by method [GET /api/sessions/&lt;SESSION_ID&gt;](reference-docs/REST-API/#get-apisessionsltsession_idgt){:target="_blank"}
> - `extra-info` _(optional boolean, default to false)_ : whether to return extra information about the Media Nodes or not. Only for advanced users
>
> ---
>
> _Encode query params in the url like this:_ <br> _https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/pro/media-nodes**?load=true&sessions=false&extra-info=false**_

<div></div>

> **Returned JSON**
>
> - `numberOfElements`: total number of registered Media Nodes
> - `content`: array of Media Nodes. Each object has the same structure as defined in the returned JSON of [**GET /pro/media-nodes/&lt;MEDIA_NODE_ID&gt;**](#get-promedia-nodesltmedia_node_idgt)

<div></div>

> **HTTP responses**
>
> - `200`: Media Nodes information has been successfully retrieved
> - `501`: [configuration property `OPENVIDU_PRO_CLUSTER`](openvidu-pro/reference-docs/openvidu-pro-config){:target="_blank"} is set to false. You need to enable cluster mode to be able to manage Media Nodes

---

### POST `/pro/media-nodes`

| _NEW MEDIA NODE_  | _PARAMETERS_                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------------- |
| **Operation**     | POST                                                                                                    |
| **URL**           | https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/pro/media-nodes                                                  |
| **Query params**  | `wait`                                                                                                  |
| **Headers**       | Authorization: Basic _EncodeBase64(OPENVIDUAPP:&lt;YOUR_SECRET&gt;)_<br/>Content-Type: application/json |
| **Body**          | ```{"uri": "MEDIA_NODE_URI"}```                                                                         |
| **Sample return** | ```{ "id": "kms_LrMRlL42", "ip": "172.17.0.5", "uri": "ws://172.17.0.5:8888/kurento", "connected": true, "connectionTime": 1583769116854, "environmentId": "489ed9c4b4d761699dc93", "status": "running" }``` |

> **Query params**
>
> - `wait` _(optional boolean, default to false)_ : whether to wait until the new Media Node reaches `running` status or not. Setting this property to true basically makes this method synchronized. You will not receive an answer until the Media Node is properly running or an error is thrown.
>
> ---
>
> _Encode query params in the url like this:_ <br> _https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/pro/media-nodes**?wait=true**_

<div></div>

> **Body parameters**
>
> ---
>
> - **uri** _(mandatory string only if `OPENVIDU_PRO_CLUSTER_MODE` is `manual`)_ : the websocket endpoint of a running Media Node. For a Kurento Media Server, it should be something similar to `ws://media.server.ip:8888/kurento`. **This property is only necessary and is only taken into account if [OPENVIDU_PRO_CLUSTER_MODE](openvidu-pro/reference-docs/openvidu-pro-config){:target="_blank"} is set to `manual`**. For mode `auto` a new Media Node will be automatically launched ignoring parameter `uri`

<div></div>

> **Returned JSON**
>
> Same JSON response as defined for [**GET /pro/media-nodes/&lt;MEDIA_NODE_ID&gt;**](#get-promedia-nodesltmedia_node_idgt) (with all its query params to their default value). If query param `wait` is set to false, most of its properties will be null. All properties will be defined only after the Media Node reaches `running` status.

<div></div>

> **HTTP responses**
>
> - `200`: the Media Node has been successfully added
> - `400`: problem with some body parameter
> - `404`: the Media Node is not within reach of OpenVidu Server. This simply means that OpenVidu cannot establish a connection with it. This may be caused by multiple reasons: wrong IP, port or path, a network problem, too strict a proxy configuration...
> - `409`: the Media Node was already registered in OpenVidu Server
> - `501`: configuration property [OPENVIDU_PRO_CLUSTER](openvidu-pro/reference-docs/openvidu-pro-config){:target="_blank"} is set to false, or is true but property [`OPENVIDU_PRO_CLUSTER_MODE`](openvidu-pro/reference-docs/openvidu-pro-config){:target="_blank"} is set to `manual` and no `uri` parameter was passed in the body request.
> - `502`: the process of launching a new Media Node instance failed. Only possible if property [`OPENVIDU_PRO_CLUSTER_MODE`](openvidu-pro/reference-docs/openvidu-pro-config){:target="_blank"} is set to `auto`

---

### DELETE `/pro/media-nodes/<MEDIA_NODE_ID>`

| _REMOVE MEDIA NODE_ | _PARAMETERS_                                                                                                            |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| **Operation**      | DELETE                                                                                                                   |
| **URL**            | https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/pro/media-nodes/&lt;MEDIA_NODE_ID&gt;                                             |
| **Query params**   | `deletion-strategy`                                                                                                      |
| **Headers**        | Authorization: Basic _EncodeBase64(OPENVIDUAPP:&lt;YOUR_SECRET&gt;)_<br/>Content-Type: application/x-www-form-urlencoded |
| **Sample return**  | _Returns nothing_                                                                                                        |

> **Query params**
>
> - `wait` _(optional boolean, default to false)_ : whether to wait until the new Media Node reaches `terminated` status or not. Setting this property to true basically makes this method synchronized. You will not receive an answer until the Media Node is fully terminated or an error is thrown.
> - `deletion-strategy` _(optional string, default to "if-no-sessions")_ : how should OpenVidu Pro proceed with the Media Node deletion. Can be:
>     - `now`: OpenVidu Pro will remove the Media Node immediately. All OpenVidu sessions hosted by this Media Node will be closed with reason `mediaServerDisconnect` (all streams, participants and recordings of all these sessions will be stopped with this same reason)
>     - `if-no-sessions` _(default value)_ : if there's any OpenVidu session initialized inside of this Media Node, then this operation will fail with HTTP status `409`. If the Media Node has no ongoing sessions, then OpenVidu Pro will remove it immediately, returning status `204`
>     - `when-no-sessions`: if there's any OpenVidu session initialized inside this Media Node, then it will not be immediately deleted, but instead will be set to `waiting-idle-to-terminate` status. This status means the Media Node is under quarantine and no more sessions will be initialized inside of it. Whenever the last session of this Media Node is destroyed (no matter the reason), then it will be automatically deleted. The response status will be `202` if this operation changed the Media Node to `waiting-idle-to-terminate` status and `204` if there were no ongoing sessions inside the Media Node and therefore OpenVidu Pro has deleted it.
>
> ---
>
> _Encode query params in the url like this:_ <br> _https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/pro/media-nodes/&lt;MEDIA_NODE_ID&gt;**?wait=false&deletion-strategy=now**_

<div></div>

> **HTTP responses**
>
> - `202`: if query parameter `deletion-strategy` is set to `when-no-sessions`, then it means that the Media Node to be deleted has ongoing sessions inside of it. Media Node status has been set to `waiting-idle-to-terminate`
> - `204`: the Media Node was successfully removed
> - `404`: no Media Node exists for the passed MEDIA_NODE_ID
> - `409`: if query parameter `deletion-strategy` is set to `if-no-sessions`, then it means that the Media Node to be deleted has ongoing sessions inside of it. No Media Node deletion will take place at all.
> - `501`: configuration property [OPENVIDU_PRO_CLUSTER](openvidu-pro/reference-docs/openvidu-pro-config){:target="_blank"} is set to false. You need to enable cluster mode to be able to manage Media Nodes
> - `502`: error while terminating the Media Node instance. Only possible if property [`OPENVIDU_PRO_CLUSTER_MODE`](openvidu-pro/reference-docs/openvidu-pro-config){:target="_blank"} is set to `auto`

---

### PATCH `/pro/media-nodes/<MEDIA_NODE_ID>`

| _MODIFY MEDIA NODE_       | _PARAMETERS_                                                                                            |
| ------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Operation**             | PATCH                                                                                                   |
| **URL**                   | https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/pro/media-nodes/&lt;MEDIA_NODE_ID&gt;                            |
| **Headers**               | Authorization: Basic _EncodeBase64(OPENVIDUAPP:&lt;YOUR_SECRET&gt;)_<br/>Content-Type: application/json |
| **Body**                  | ```{"status": "MEDIA_NODE_STATUS"}```                                                                            |
| **Sample return**         | ```{"id": "KMS-GVM2CW", "uri": "ws://localhost:8888/kurento", "ip": "localhost", "connected": true, "connectionTime": 1562746120857, "quarantined": false}``` |

> **Body parameters**
>
> ---
>
> - **status** _(mandatory string)_ : new desired status of the Media Node. Valid values are `waiting-idle-to-terminate` (from `running` status), `running` (from `waiting-idle-to-terminate`) and `terminating` (from both `running` and `waiting-idle-to-terminate`)

<div></div>

> **Returned JSON**
>
> The modified Media Node. Same JSON response as defined for [**GET /pro/media-nodes/&lt;MEDIA_NODE_ID&gt;**](#get-promedia-nodesltmedia_node_idgt) (with all its query params to their default value)

<div></div>

> **HTTP responses**
>
> - `200`: the Media Node has been successfully modified
> - `204`: the Media Node has not been modified because its status was the same as the provided through body parameters
> - `400`: problem with some body parameter. This will also be the status if you try to set property `status` to an invalid one (`launching`, `failed`, `terminated`)
> - `404`: no Media Node exists for the passed MEDIA_NODE_ID
> - `501`: [configuration property `OPENVIDU_PRO_CLUSTER`](openvidu-pro/reference-docs/openvidu-pro-config){:target="_blank"} is set to false. You need to enable cluster mode to be able to manage Media Nodes

---

### PUT `/pro/media-nodes`

| _AUTODISCOVER MEDIA NODES_ | _PARAMETERS_                                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Operation**       | PUT                                                                                                                      |
| **URL**             | https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/pro/media-nodes                                                                   |
| **Headers**         | Authorization: Basic _EncodeBase64(OPENVIDUAPP:&lt;YOUR_SECRET&gt;)_                                                     |
| **Sample return**   | ```{"numberOfElements": 1, "content": [ "id": "kms_LrMRlL42", "ip": "172.17.0.5", "uri": "ws://172.17.0.5:8888/kurento", "connected": true, "connectionTime": 1583769116854, "environmentId": "489ed9c4b4d761699dc93", "status": "running" ]}``` |

> **Returned JSON**
>
> - `numberOfElements`: total number of newly autodiscovered Media Nodes
> - `content`: array of newly autodiscovered Media Nodes. Each object has the same structure as defined in the returned JSON of [**GET /pro/media-nodes/&lt;MEDIA_NODE_ID&gt;**](#get-promedia-nodesltmedia_node_idgt) (with all its query params to their default value)

<div></div>

> **HTTP responses**
>
> - `200`: autodiscovery process has completed
> - `405`: autodiscovery process is not possible. This may happen if OpenVidu Pro cluster environment is set to `on_premise` and no autodiscover script is available.
> - `501`: [configuration property `OPENVIDU_PRO_CLUSTER`](openvidu-pro/reference-docs/openvidu-pro-config){:target="_blank"} is set to false. You need to enable cluster mode to be able to manage Media Nodes

---

### POST `/pro/restart`

| _RESTART OPENVIDU PRO_ | _PARAMETERS_                                                                    |
| ---------------------- | ------------------------------------------------------------------------------- |
| **Operation**          | POST                                                                            |
| **URL**                | https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/pro/restart/                             |
| **Headers**            | Authorization: Basic _EncodeBase64(OPENVIDUAPP:&lt;YOUR_SECRET&gt;)_<br/>Content-Type: application/json |
| **Body**               | ```{"OPENVIDU_SECRET": "MY_SECRET", "OPENVIDU_CDR": true, "OPENVIDU_RECORDING": true, "OPENVIDU_RECORDING_PUBLIC_ACCESS": true, "OPENVIDU_RECORDING_NOTIFICATION": "publisher_moderator", "OPENVIDU_RECORDING_PATH": "/opt/openvidu/recordings", "OPENVIDU_RECORDING_CUSTOM_LAYOUT": "/opt/openvidu/custom-layout", "OPENVIDU_RECORDING_AUTOSTOP_TIMEOUT": 120, "OPENVIDU_WEBHOOK": true, "OPENVIDU_WEBHOOK_ENDPOINT": "http://localhost:7777/webhook/", "OPENVIDU_WEBHOOK_HEADERS": [\"Authorization:\ Basic\ T1BFTlZJRFVBUFA6TVlfU0VDUkVU\"], "OPENVIDU_WEBHOOK_EVENTS": ["recordingStatusChanged"], "OPENVIDU_STREAMS_VIDEO_MAX_RECV_BANDWIDTH": 1000, "OPENVIDU_STREAMS_VIDEO_MIN_RECV_BANDWIDTH": 300, "OPENVIDU_STREAMS_VIDEO_MAX_SEND_BANDWIDTH": 1000, "OPENVIDU_STREAMS_VIDEO_MIN_SEND_BANDWIDTH": 300, "OPENVIDU_SESSIONS_GARBAGE_INTERVAL": 900, "OPENVIDU_SESSIONS_GARBAGE_THRESHOLD": 3600, "OPENVIDU_PRO_STATS_MONITORING_INTERVAL": 30, "OPENVIDU_PRO_STATS_WEBRTC_INTERVAL": 20}``` |

> **Body parameters**
>
> The body of the POST request is a JSON object with the new configuration properties to be applied on the restart process. These include [OpenVidu CE configuration properties](reference-docs/openvidu-config/){:target="_blank"} and [OpenVidu Pro configuration properties](openvidu-pro/reference-docs/openvidu-pro-config){:target="_blank"} (bear in mind not all of them are available for change using this method). All of them are optional. The complete list of available properties is listed below. Visit the configuration docs for a detailed description of each one of them.
>
> ---
>
> - **OPENVIDU_SECRET** _(optional string)_
> - **OPENVIDU_CDR** _(optional boolean)_
> - **OPENVIDU_RECORDING** _(optional boolean)_
> - **OPENVIDU_RECORDING_PATH** _(optional string)_
> - **OPENVIDU_RECORDING_PUBLIC_ACCESS** _(optional boolean)_
> - **OPENVIDU_RECORDING_NOTIFICATION** _(optional string)_
> - **OPENVIDU_RECORDING_CUSTOM_LAYOUT** _(optional string)_
> - **OPENVIDU_RECORDING_AUTOSTOP_TIMEOUT** _(optional number)_
> - **OPENVIDU_WEBHOOK** _(optional boolean)_
> - **OPENVIDU_WEBHOOK_ENDPOINT** _(optional string)_
> - **OPENVIDU_WEBHOOK_HEADERS**: _(optional array of strings)_
> - **OPENVIDU_WEBHOOK_EVENTS** _(optional array of strings)_
> - **OPENVIDU_STREAMS_VIDEO_MAX_RECV_BANDWIDTH** _(optional number)_
> - **OPENVIDU_STREAMS_VIDEO_MIN_RECV_BANDWIDTH** _(optional number)_
> - **OPENVIDU_STREAMS_VIDEO_MAX_SEND_BANDWIDTH** _(optional number)_
> - **OPENVIDU_STREAMS_VIDEO_MIN_SEND_BANDWIDTH** _(optional number)_
> - **OPENVIDU_SESSIONS_GARBAGE_INTERVAL** _(optional number)_
> - **OPENVIDU_SESSIONS_GARBAGE_THRESHOLD** _(optional number)_
> - **OPENVIDU_PRO_CLUSTER** _(optional boolean)_
> - **OPENVIDU_PRO_CLUSTER_ENVIRONMENT** _(optional string)_
> - **OPENVIDU_PRO_CLUSTER_MODE** _(optional string)_
> - **OPENVIDU_PRO_CLUSTER_MEDIA_NODES** _(optional number)_
> - **OPENVIDU_PRO_CLUSTER_AUTODISCOVERY** _(optional boolean)_
> - **OPENVIDU_PRO_CLUSTER_LOAD_STRATEGY** _(optional string)_
> - **OPENVIDU_PRO_CLUSTER_PATH** _(optional string)_
> - **OPENVIDU_PRO_STATS_MONITORING_INTERVAL** _(optional number)_
> - **OPENVIDU_PRO_STATS_WEBRTC_INTERVAL** _(optional number)_

<div></div>

> **HTTP responses**
>
> - `200`: the restarting process has been initialized. All properties are valid and OpenVidu Server should restart properly
> - `400`: there's some problem with a body parameter. The response message will provide further details

<div></div>

> **NOTES**
>
> This method will restart OpenVidu Server Pro with the new provided configuration parameters. For those parameters for which no value has been provided, the previous existing will be used. The new applied values **will be stored in disk** in your configuration file, so you will be able to restart the host without losing your new configuration.

---

### GET `/pro/config`

| _GET OPENVIDU PRO CONFIGURATION_   | _PARAMETERS_                                        |
| ----------------- | -------------------------------------------------------------------- |
| **Operation**     | GET                                                                  |
| **URL**           | https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/pro/config                    |
| **Headers**       | Authorization: Basic _EncodeBase64(OPENVIDUAPP:&lt;YOUR_SECRET&gt;)_ |
| **Sample return** | ```{"VERSION": "2.13.0", "OPENVIDU_SERVER_DEPENDENCY_VERSION": "2.13.0", "OPENVIDU_PUBLICURL": "local", "OPENVIDU_CDR": true, "OPENVIDU_STREAMS_VIDEO_MAX_RECV_BANDWIDTH": 1000, "OPENVIDU_STREAMS_VIDEO_MIN_RECV_BANDWIDTH": 300, "OPENVIDU_STREAMS_VIDEO_MAX_SEND_BANDWIDTH": 1000, "OPENVIDU_STREAMS_VIDEO_MIN_SEND_BANDWIDTH": 300, "OPENVIDU_SESSIONS_GARBAGE_INTERVAL": 900, "OPENVIDU_SESSIONS_GARBAGE_THRESHOLD": 3600, "OPENVIDU_RECORDING": true, "OPENVIDU_RECORDING_VERSION": "2.9.0", "OPENVIDU_RECORDING_PATH": "/opt/openvidu/recordings/", "OPENVIDU_RECORDING_PUBLIC_ACCESS": false, "OPENVIDU_RECORDING_NOTIFICATION": "publisher_moderator", "OPENVIDU_RECORDING_CUSTOM_LAYOUT": "/opt/openvidu/custom-layout/", "OPENVIDU_RECORDING_AUTOSTOP_TIMEOUT": 120, "OPENVIDU_WEBHOOK": false, "OPENVIDU_PRO_STATS_MONITORING_INTERVAL": 0, "OPENVIDU_PRO_STATS_WEBRTC_INTERVAL": 5, "OPENVIDU_PRO_CLUSTER": true, "OPENVIDU_PRO_CLUSTER_ID": "TEST_CLUSTER_ID", "OPENVIDU_PRO_CLUSTER_MODE": "auto", "OPENVIDU_PRO_CLUSTER_ENVIRONMENT": "docker", "OPENVIDU_PRO_CLUSTER_AUTODISCOVERY": true, "OPENVIDU_PRO_CLUSTER_MEDIA_NODES": 1, "OPENVIDU_PRO_CLUSTER_LOAD_STRATEGY": "streams", "OPENVIDU_PRO_CLUSTER_PATH": "/opt/openvidu/cluster/", "OPENVIDU_PRO_ELASTICSEARCH": true, "OPENVIDU_PRO_ELASTICSEARCH_HOST": "http://localhost:9200", "OPENVIDU_PRO_ELASTICSEARCH_VERSION": "7.6.2", "OPENVIDU_PRO_KIBANA": true, "OPENVIDU_PRO_KIBANA_HOST": "http://localhost:5601", "OPENVIDU_PRO_KIBANA_VERSION": "7.6.2"}``` |

> **Returned JSON**
>
> - `VERSION`: version of OpenVidu Server Pro
> - `OPENVIDU_SERVER_DEPENDENCY_VERSION`: version of OpenVidu Server CE upon which this version of OpenVidu Server Pro is built on
> - **Rest of properties**: current active values for the **[configuration properties](reference-docs/openvidu-config/){:target="_blank"}** of OpenVidu Server Pro. These properties are mostly common to method [GET /config](reference-docs/REST-API/#get-config){:target="_blank"} of OpenVidu Server CE. Some of them are [unique for OpenVidu Server Pro](openvidu-pro/reference-docs/openvidu-pro-config){:target="_blank"}

<br>