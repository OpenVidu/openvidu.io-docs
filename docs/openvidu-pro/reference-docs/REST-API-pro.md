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

### Objects
<br>

- [**Media Node object**](#media-node-object)

<br>

---

<div class="rest-api-section rest-api-pro-section"></div>

### GET `/pro/media-nodes/<MEDIA_NODE_ID>`

##### Description

Retrieve the information of a Media Node.

##### Operation

|   ||
| - ||
| **METHOD**  | GET |
| **URL**     | https://`YOUR_OPENVIDUSERVER_IP`/pro/media-nodes/`MEDIA_NODE_ID` |
| **HEADERS** | Authorization: Basic `EncodeBase64(OPENVIDUAPP:<YOUR_SECRET>)`<br/>Content-Type: application/x-www-form-urlencoded |
| **QUERY PARAMS** | `sessions`,`extra-info` |

##### Query params

| Parameter  | Type | Default | Description |
| - ||||
| sessions | Boolean | false | Whether to return session information along Media Node information or not. Only sessions hosted in this Media Node will be retrieved. See [**Session object**](reference-docs/REST-API/#session-object){:target="blank"} |
| extra&#8209;info | Boolean | false | Whether to return extra information about the Media Node or not. Only for advanced users |

> https://`YOUR_OPENVIDUSERVER_IP`/pro/media-nodes/`MEDIA_NODE_ID`?sessions=false&extra-info=false

##### Sample return

This operation returns a [**Media Node object**](#media-node-object).

##### HTTP responses

|||
| - ||
| 200 | The Media Node information has been successfully retrieved |
| 404 | No Media Node exists for the passed `MEDIA_NODE_ID` |

<br>

---

### GET `/pro/media-nodes`

##### Description

Retrieve the information of all Media Nodes.

##### Operation

|   ||
| - ||
| **METHOD**  | GET |
| **URL**     | https://`YOUR_OPENVIDUSERVER_IP`/pro/media-nodes |
| **HEADERS** | Authorization: Basic `EncodeBase64(OPENVIDUAPP:<YOUR_SECRET>)`<br/>Content-Type: application/x-www-form-urlencoded |
| **QUERY PARAMS** | `sessions`,`extra-info` |

##### Query params

| Parameter  | Type | Default | Description |
| - ||||
| sessions | Boolean | false | Whether to return session information along Media Node information or not. Only sessions hosted in this Media Node will be retrieved. See [**Session object**](reference-docs/REST-API/#session-object){:target="blank"} |
| extra&#8209;info | Boolean | false | Whether to return extra information about the Media Node or not. Only for advanced users |

> https://`YOUR_OPENVIDUSERVER_IP`/pro/media-nodes?sessions=false&extra-info=false

##### Sample return

```json
{
    "numberOfElements": 0,
    "content": []
}
```

||||
| - |||
| numberOfElements | Number | Total number of Media Nodes |
| content | Array of Objects | Array of [**Media Node objects**](#media-node-object) |

##### HTTP responses

|||
| - ||
| 200 | All the Media Nodes information has been successfully retrieved |

<br>

---

### POST `/pro/media-nodes`

##### Description

Add a new Media Node to the cluster.

##### Operation

|   ||
| - ||
| **METHOD**  | POST |
| **URL**     | https://`YOUR_OPENVIDUSERVER_IP`/pro/media-nodes |
| **HEADERS** | Authorization: Basic `EncodeBase64(OPENVIDUAPP:<YOUR_SECRET>)`<br/>Content-Type: application/json |
| **QUERY PARAMS** | `wait` |

##### Query params

| Parameter  | Type | Default | Description |
| - ||||
| wait | Boolean | false | Whether to wait until the new Media Node reaches `running` status or not. Setting this property to true basically makes this method synchronized. You will not receive a response until the Media Node is properly running or an error is thrown |

> https://`YOUR_OPENVIDUSERVER_IP`/pro/media-nodes?wait=false

##### Body

```json
{
    "uri": "ws://172.17.0.5:8888/kurento"
}
```

> - **uri** _(mandatory String only for [On Premises deployments](openvidu-pro/deployment/on-premises/){:target="_blank"})_ : the websocket endpoint of a running Media Node. Should be something similar to `ws://media.server.ip:8888/kurento`. **This property is only necessary and is only taken into account [On Premises deployments](openvidu-pro/deployment/on-premises/){:target="_blank"}**. For other deployment environments a new Media Node will be automatically launched completely ignoring parameter `uri`

##### Sample return

This operation returns the created [**Media Node object**](#media-node-object). Most of its properties won't be defined until the Media Node reaches `running` status. You can user query param `wait=true` to wait until the Media Node is running before receiving the response, or you can listen to [mediaNodeStatusChanged](openvidu-pro/reference-docs/openvidu-server-pro-cdr/#medianodestatuschanged){:target="blank"} webhook event.

##### HTTP responses

|||
| - ||
| 200 | The Media Node has been successfully added to the cluster |
| 400 | Problem with some body parameter |
| 404 | The Media Node is not within reach of OpenVidu Server. This simply means that OpenVidu cannot establish a connection with it. This may be caused by multiple reasons: wrong IP, port or path, a network problem, too strict a proxy configuration... |
| 409 | The Media Node was already registered in OpenVidu Server as part of the cluster |
| 501 | The cluster is deployed [On Premises](openvidu-pro/deployment/on-premises/){:target="_blank"} and no `uri` parameter was passed in the body request |
| 502 | The process of launching a new Media Node instance failed. This won't ever happen for [On Premises deployments](openvidu-pro/deployment/on-premises/){:target="_blank"}, where instances require to be previously launched |

<br>

---

### DELETE `/pro/media-nodes/<MEDIA_NODE_ID>`

##### Description

Remove a Media Node from the cluster. If there are ongoing sessions currently hosted by the Media Node and the deletion process is forced, all of the sessions will be closed.

##### Operation

|   ||
| - ||
| **METHOD**  | DELETE |
| **URL**     | https://`YOUR_OPENVIDUSERVER_IP`/pro/media-nodes/`MEDIA_NODE_ID` |
| **HEADERS** | Authorization: Basic `EncodeBase64(OPENVIDUAPP:<YOUR_SECRET>)`<br/>Content-Type: application/x-www-form-urlencoded |
| **QUERY PARAMS** | `wait`,`deletion-strategy` |

##### Query params

| Parameter  | Type | Default | Description |
| - ||||
| wait | Boolean | false | Whether to wait until the new Media Node reaches `terminated` status or not. Setting this property to true basically makes this method synchronized. You will not receive a response until the Media Node is fully terminated or an error is thrown |
| deletion&#8209;strategy | String | "if&#8209;no&#8209;sessions" | How should OpenVidu Pro proceed with the Media Node deletion. Can be: <ul style="margin-top:10px"><li style="color: inherit"><code><strong>now</strong></code> : OpenVidu Pro will remove the Media Node immediately. All OpenVidu sessions hosted by this Media Node will be closed with reason <code>mediaServerDisconnect</code> (all streams, participants and recordings of all these sessions will be stopped with this same reason)</li><li style="color: inherit"><code><strong>if-no-sessions</strong></code> : if there's any OpenVidu session initialized inside of this Media Node, then this operation will fail with HTTP status <strong>409</strong>. If the Media Node has no ongoing sessions, then OpenVidu Pro will remove it immediately, returning status <strong>204</strong>.</li> <li style="color: inherit"><code><strong>when-no-sessions</strong></code> : if there's any OpenVidu session initialized inside this Media Node, then it will not be immediately deleted, but instead will be set to `waiting-idle-to-terminate` status. This status means the Media Node is under quarantine and no more sessions will be initialized inside of it. Whenever the last session of this Media Node is destroyed (no matter the reason), then it will be automatically deleted. The response status will be <strong>202</strong> if this operation changed the Media Node to <code>waiting-idle-to-terminate</code> status and <strong>204</strong> if there were no ongoing sessions inside the Media Node and therefore OpenVidu Pro has deleted it.</li></ul> |

> https://`YOUR_OPENVIDUSERVER_IP`/pro/media-nodes/`MEDIA_NODE_ID`?wait=false&deletion-strategy=if-no-sessions

##### HTTP responses

|||
| - ||
| 202 | If query parameter `deletion-strategy` is set to `when-no-sessions`, then it means that the Media Node to be deleted has ongoing sessions inside of it. Media Node status has been set to `waiting-idle-to-terminate` |
| 204 | The Media Node was successfully removed |
| 404 | No Media Node exists for the passed `MEDIA_NODE_ID` |
| 409 | If query parameter `deletion-strategy` is set to `if-no-sessions`, then it means that the Media Node to be deleted has ongoing sessions inside of it. No Media Node deletion will take place at all |
| 502 | Error while terminating the Media Node instance. This won't ever happen for [On Premises deployments](openvidu-pro/deployment/on-premises/){:target="blank"}, where instances require manual shut down |

<br>

---

### PATCH `/pro/media-nodes/<MEDIA_NODE_ID>`

##### Description

Modify the status of a Media Node. This method allows you to manually transition a Media Node through its [statuses](openvidu-pro/scalability/#media-node-statuses){:target="_blank"}.

##### Operation

|   ||
| - ||
| **METHOD**  | PATCH |
| **URL**     | https://`YOUR_OPENVIDUSERVER_IP`/pro/media-nodes/`MEDIA_NODE_ID` |
| **HEADERS** | Authorization: Basic `EncodeBase64(OPENVIDUAPP:<YOUR_SECRET>)`<br/>Content-Type: application/json |

##### Body

```json
{
    "status": "terminating"
}
```

> - **status** _(mandatory String)_ : new desired status of the Media Node. Valid values are `canceled` (from `launching` status), `launching` (from `canceled` status), `waiting-idle-to-terminate` (from `running` status), `running` (from `waiting-idle-to-terminate`) and `terminating` (from both `running` and `waiting-idle-to-terminate`). Visit **[Media Node statuses](openvidu-pro/scalability/#media-node-statuses){:target="_blank"}** to understand the Media Node lifecycle

##### Sample return

This operation returns the modified [**Media Node object**](#media-node-object).

##### HTTP responses

|||
| - ||
| 200 | The Media Node has been successfully modified |
| 204 | The Media Node has not been modified because its status was the same as the provided through body parameters |
| 400 | Problem with some body parameter. This means the Media Node cannot transition from its current status to the indicated one in the `status` request body parameter |
| 404 | No Media Node exists for the passed `MEDIA_NODE_ID` |

<br>

---

### PUT `/pro/media-nodes`

##### Description

Autodiscover Media Nodes. This method makes OpenVidu Server search for reachable, running Media Nodes that are not part of the cluster yet. This can be useful in case a Media Node was launched by any other means than OpenVidu itself: this method is the only way to automatically add these Media Nodes to the running cluster.

##### Operation

|   ||
| - ||
| **METHOD**  | PUT |
| **URL**     | https://`YOUR_OPENVIDUSERVER_IP`/pro/media-nodes |
| **HEADERS** | Authorization: Basic `EncodeBase64(OPENVIDUAPP:<YOUR_SECRET>)` |

##### Sample return

```json
{
    "numberOfElements": 0,
    "content": []
}
```

||||
| - |||
| numberOfElements | Number | Total number of newly autodiscovered Media Nodes |
| content | Array of Objects | Array of newly autodiscovered [**Media Node objects**](#media-node-object) |

##### HTTP responses

|||
| - ||
| 200 | Autodiscovery process has completed |

<!--| 405 | Autodiscovery process is not possible. This may happen if OpenVidu Pro cluster environment is set to `on_premise` and no autodiscover script is available |-->

<br>

---

### POST `/pro/restart`

##### Description

Restart OpenVidu Server Pro programmatically. This helps easily modifying configuration properties and cleaning up any possible stranded process or file.

##### Operation

|   ||
| - ||
| **METHOD**  | POST |
| **URL**     | https://`YOUR_OPENVIDUSERVER_IP`/pro/restart |
| **HEADERS** | Authorization: Basic `EncodeBase64(OPENVIDUAPP:<YOUR_SECRET>)`<br/>Content-Type: application/json |

##### Body

```json
{
    "OPENVIDU_SECRET":"MY_SECRET",
    "OPENVIDU_CDR":true,
    "OPENVIDU_RECORDING":true,
    "OPENVIDU_RECORDING_PUBLIC_ACCESS":true,
    "OPENVIDU_RECORDING_NOTIFICATION":"publisher_moderator",
    "OPENVIDU_RECORDING_PATH":"/opt/openvidu/recordings",
    "OPENVIDU_RECORDING_CUSTOM_LAYOUT":"/opt/openvidu/custom-layout",
    "OPENVIDU_RECORDING_AUTOSTOP_TIMEOUT":120,
    "OPENVIDU_WEBHOOK":true,
    "OPENVIDU_WEBHOOK_ENDPOINT":"http://localhost:7777/webhook/",
    "OPENVIDU_WEBHOOK_HEADERS":[
        "Authorization: Basic T1BFTlZJRFVBUFA6TVlfU0VDUkVU"
   ],
    "OPENVIDU_WEBHOOK_EVENTS":[
        "recordingStatusChanged"
    ],
    "OPENVIDU_STREAMS_VIDEO_MAX_RECV_BANDWIDTH":1000,
    "OPENVIDU_STREAMS_VIDEO_MIN_RECV_BANDWIDTH":300,
    "OPENVIDU_STREAMS_VIDEO_MAX_SEND_BANDWIDTH":1000,
    "OPENVIDU_STREAMS_VIDEO_MIN_SEND_BANDWIDTH":300,
    "OPENVIDU_SESSIONS_GARBAGE_INTERVAL":900,
    "OPENVIDU_SESSIONS_GARBAGE_THRESHOLD":3600,
    "OPENVIDU_PRO_STATS_MONITORING_INTERVAL":30,
    "OPENVIDU_PRO_STATS_WEBRTC_INTERVAL":20
}
```

> The body of the POST request is a JSON object with the new configuration properties to be applied on the restart process. These include [OpenVidu CE configuration properties](reference-docs/openvidu-config/){:target="blank"} and [OpenVidu Pro configuration properties](openvidu-pro/reference-docs/openvidu-pro-config){:target="blank"}. All of them are optional. Not all properties can be modified this way. Others require a manual update. The complete list of available properties to be modified with this method is listed below. Visit the configuration docs for a detailed description of each one of them.
>
> ---
>
> - **OPENVIDU_CDR** _(optional Boolean)_
> - **OPENVIDU_RECORDING** _(optional Boolean)_
> - **OPENVIDU_RECORDING_PATH** _(optional String)_
> - **OPENVIDU_RECORDING_PUBLIC_ACCESS** _(optional Boolean)_
> - **OPENVIDU_RECORDING_NOTIFICATION** _(optional String)_
> - **OPENVIDU_RECORDING_CUSTOM_LAYOUT** _(optional String)_
> - **OPENVIDU_RECORDING_AUTOSTOP_TIMEOUT** _(optional Number)_
> - **OPENVIDU_WEBHOOK** _(optional Boolean)_
> - **OPENVIDU_WEBHOOK_ENDPOINT** _(optional String)_
> - **OPENVIDU_WEBHOOK_HEADERS**: _(optional Array of Strings)_
> - **OPENVIDU_WEBHOOK_EVENTS** _(optional Array of Strings)_
> - **OPENVIDU_STREAMS_VIDEO_MAX_RECV_BANDWIDTH** _(optional Number)_
> - **OPENVIDU_STREAMS_VIDEO_MIN_RECV_BANDWIDTH** _(optional Number)_
> - **OPENVIDU_STREAMS_VIDEO_MAX_SEND_BANDWIDTH** _(optional Number)_
> - **OPENVIDU_STREAMS_VIDEO_MIN_SEND_BANDWIDTH** _(optional Number)_
> - **OPENVIDU_SESSIONS_GARBAGE_INTERVAL** _(optional Number)_
> - **OPENVIDU_SESSIONS_GARBAGE_THRESHOLD** _(optional Number)_
> - **OPENVIDU_PRO_CLUSTER_ID** _(optional String)_
> - **OPENVIDU_PRO_CLUSTER_MEDIA_NODES** _(optional Number)_
> - **OPENVIDU_PRO_CLUSTER_PATH** _(optional String)_
> - **OPENVIDU_PRO_CLUSTER_AUTOSCALING** _(optional Boolean)_
> - **OPENVIDU_PRO_CLUSTER_AUTOSCALING_MAX_NODES** _(optional Number)_
> - **OPENVIDU_PRO_CLUSTER_AUTOSCALING_MIN_NODES** _(optional Number)_
> - **OPENVIDU_PRO_CLUSTER_AUTOSCALING_MAX_LOAD** _(optional Number)_
> - **OPENVIDU_PRO_CLUSTER_AUTOSCALING_MIN_LOAD** _(optional Number)_
> - **OPENVIDU_PRO_STATS_MONITORING_INTERVAL** _(optional Number)_
> - **OPENVIDU_PRO_STATS_WEBRTC_INTERVAL** _(optional Number)_

##### HTTP responses

|||
| - ||
| 200 | The restarting process has been initialized. All properties are valid and OpenVidu Server should restart properly |
| 400 | There is some problem with a body parameter. The error message will provide further details |

<div></div>

> **NOTES**
>
> This method will restart OpenVidu Server Pro with the new provided configuration parameters. For those parameters for which no value has been provided, the previous existing will be used. The new applied values **will be stored in disk** in your configuration file, so you will be able to restart the host without losing your new configuration.

<br>

---

### GET `/pro/config`

##### Description

Retrieve current [OpenVidu Pro configuration](openvidu-pro/reference-docs/openvidu-pro-config/){:target="blank"}.

##### Operation

|   ||
| - ||
| **METHOD**  | GET |
| **URL**     | https://`YOUR_OPENVIDUSERVER_IP`/pro/config |
| **HEADERS** | Authorization: Basic `EncodeBase64(OPENVIDUAPP:<YOUR_SECRET>)` |

##### Sample return

Returns an object with the current [OpenVidu Pro configuration properties](reference-docs/openvidu-config/){:target="blank"}. These properties are mostly common to method [GET /config](reference-docs/REST-API/#get-config){:target="_blank"} of OpenVidu Server CE. Some of them are unique for OpenVidu Server Pro.

```json
{
    "VERSION": "2.15.1",
    "OPENVIDU_SERVER_DEPENDENCY_VERSION": "2.15.0",
    "DOMAIN_OR_PUBLIC_IP": "my.openvidu.ip",
    "HTTPS_PORT": 443,
    "OPENVIDU_PUBLICURL": "https://my.openvidu.ip",
    "OPENVIDU_CDR": false,
    "OPENVIDU_STREAMS_VIDEO_MAX_RECV_BANDWIDTH": 1000,
    "OPENVIDU_STREAMS_VIDEO_MIN_RECV_BANDWIDTH": 300,
    "OPENVIDU_STREAMS_VIDEO_MAX_SEND_BANDWIDTH": 1000,
    "OPENVIDU_STREAMS_VIDEO_MIN_SEND_BANDWIDTH": 300,
    "OPENVIDU_SESSIONS_GARBAGE_INTERVAL": 900,
    "OPENVIDU_SESSIONS_GARBAGE_THRESHOLD": 3600,
    "OPENVIDU_RECORDING": true,
    "OPENVIDU_RECORDING_VERSION": "2.15.0",
    "OPENVIDU_RECORDING_PATH": "/opt/openvidu/recordings/",
    "OPENVIDU_RECORDING_PUBLIC_ACCESS": false,
    "OPENVIDU_RECORDING_NOTIFICATION": "moderator",
    "OPENVIDU_RECORDING_CUSTOM_LAYOUT": "/opt/openvidu/custom-layout/",
    "OPENVIDU_RECORDING_AUTOSTOP_TIMEOUT": 60,
    "OPENVIDU_WEBHOOK": true,
    "OPENVIDU_WEBHOOK_ENDPOINT": "http://my.webhook.endpoint:7777/webhook",
    "OPENVIDU_WEBHOOK_HEADERS": [],
    "OPENVIDU_WEBHOOK_EVENTS": [
        "sessionCreated",
        "sessionDestroyed",
        "recordingStatusChanged"
    ],
    "KMS_URIS": [
        "ws://10.1.1.26:8888/kurento",
        "ws://10.1.1.16:8888/kurento"
    ],
    "OPENVIDU_PRO_STATS_MONITORING_INTERVAL": 60,
    "OPENVIDU_PRO_STATS_WEBRTC_INTERVAL": 30,
    "OPENVIDU_PRO_CLUSTER_ID": "MY_CLUSTER",
    "OPENVIDU_PRO_CLUSTER_ENVIRONMENT": "docker",
    "OPENVIDU_PRO_CLUSTER_MEDIA_NODES": 1,
    "OPENVIDU_PRO_CLUSTER_PATH": "/opt/openvidu/cluster/",
    "OPENVIDU_PRO_CLUSTER_AUTOSCALING": true,
    "OPENVIDU_PRO_CLUSTER_AUTOSCALING_MAX_NODES": 3,
    "OPENVIDU_PRO_CLUSTER_AUTOSCALING_MIN_NODES": 2,
    "OPENVIDU_PRO_CLUSTER_AUTOSCALING_MAX_LOAD": 70,
    "OPENVIDU_PRO_CLUSTER_AUTOSCALING_MIN_LOAD": 30,
    "OPENVIDU_PRO_ELASTICSEARCH": true,
    "OPENVIDU_PRO_ELASTICSEARCH_HOST": "http://127.0.0.1:9200",
    "OPENVIDU_PRO_ELASTICSEARCH_VERSION": "7.8.0",
    "OPENVIDU_PRO_KIBANA": true,
    "OPENVIDU_PRO_KIBANA_HOST": "http://127.0.0.1/kibana",
    "OPENVIDU_PRO_KIBANA_VERSION": "7.8.0",
    "OPENVIDU_PRO_NETWORK_STAT": false
}
```

##### HTTP responses

|||
| - ||
| 200 | OpenVidu Pro configuration has been successfully retrieved |

<br>

---

### Media Node object

Related operations

- [**GET /pro/media-nodes/&lt;MEDIA_NODE_ID&gt;**](#get-promedia-nodesltmedia_node_idgt)
- [**GET /pro/media-nodes**](#get-promedia-nodes)
- [**POST /pro/media-nodes**](#post-promedia-nodes)
- [**PATCH /pro/media-nodes/&lt;MEDIA_NODE_ID&gt;**](#patch-promedia-nodesltmedia_node_idgt)
- [**PUT /pro/media-nodes**](#put-promedia-nodes)

```json
{
    "id": "kms_FVrQslIr",
    "environmentId": "i-0c58bcdd26l11d0sd",
    "ip": "172.17.0.2",
    "uri": "ws://172.17.0.2:8888/kurento",
    "launchingTime": 1600678236916,
    "connected": true,
    "connectionTime": 1600678251771,
    "load": 12.45,
    "status": "running",
    "sessions": [],
    "kurentoInfo": {}
}
```

||||
| - |||
| id | String | Media Node unique identifier. Use it to perform REST operations on this Media Node |
| environmentId | String | Media Node unique identifier dependent on the deployment environment. For example, an AWS EC2 machine identifier if the cluster is deployed in AWS |
| ip | String | Media Node IP |
| uri | String | Media Node URI endpoint. This is the URI where OpenVidu Server will establish a connection with the Media Node |
| launchingTime | Number | When the Media Node was launched, in UTC milliseconds |
| connected | Boolean | Whether OpenVidu Server Pro is connected to this Media Node or not. This property may be false if there is an unexpected disconnection of the Media Node |
| connectionTime | Number | When OpenVidu Server established the connection with the Media Node, in UTC milliseconds |
| disconnectionTime | Number | When OpenVidu Server lost its connection to the Media Node, in UTC milliseconds. Only available if `connected` is false |
| load | Number | CPU load of the Media Node. Decimal number between 0.00 and 100.00 |
| status | String | Status of the Media Node. See [**Media Node statuses**](openvidu-pro/scalability/#media-node-statuses){:target="blank"} |
| sessions | Array of Objects | Collection of sessions initialized in this Media Node. See [**Session object**](reference-docs/REST-API/#session-object){:target="blank"}<div style="margin-top:10px"></div>Property only retrievable when providing query param `sessions=true` in methods:<ul style="margin-top:10px"><li style="color: inherit"><a href="#get-promedia-nodesltmedia_node_idgt"><strong>GET /pro/media-nodes/&lt;MEDIA_NODE_ID&gt;</strong></a></li><li style="color: inherit"><a href="#get-promedia-nodes"><strong>GET /pro/media-nodes</strong></a></li></ul> |
| kurentoInfo | Object | Object with extra advanced information about the Kurento Media Server internal process of this Media Node (version, modules, memory usage...). This is a property aimed at advanced users, subject to change.<div style="margin-top:10px"></div>Property only retrievable when providing query param `extra-info=true` in methods:<ul style="margin-top:10px"><li style="color: inherit"><a href="#get-promedia-nodesltmedia_node_idgt"><strong>GET /pro/media-nodes/&lt;MEDIA_NODE_ID&gt;</strong></a></li><li style="color: inherit"><a href="#get-promedia-nodes"><strong>GET /pro/media-nodes</strong></a></li></ul> |

<br>