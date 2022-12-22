<h2 id="section-title">REST API</h2>
<hr>

You have full control over OpenVidu Server through its REST API. All of the REST API operations exposed by OpenVidu Server:

* Share the same base path: `/openvidu/api/`.
* Share the same Authorization header.

The Authorization header is implemented via Basic Auth, and it is as simple as applying Base64 encoding to the username (always "*OPENVIDUAPP*") and the password (the `OPENVIDU_SECRET` [configuration property](reference-docs/openvidu-config/)).

All REST API operations return HTTP status `401` if the Authorization header is wrong or not provided.

For example, with a secret "*MY_SECRET*" the HTTP header would be:

> `Authorization: Basic T1BFTlZJRFVBUFA6TVlfU0VDUkVU`


### Index
<br>

<div class="index-list" markdown="1">

- [The Session object](#the-session-object)
    - [Initialize a session](#post-session)
    - [Retrieve session info](#get-session)
    - [Retrieve all sessions info](#get-all-sessions)
    - [Close a session](#delete-session)
- [The Connection object](#the-connection-object)
    - [Initialize a connection](#post-connection)
    - [Retrieve connection info](#get-connection)
    - [Retrieve all connections info](#get-all-connections)
    - [Modify a connection](#patch-connection)<a href="openvidu-pro/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin-left: 5px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span></a>
    - [Close a connection](#delete-connection)
- [The Recording object](#the-recording-object)
    - [Start the recording of a session](#post-recording-start)
    - [Stop the recording of a session](#post-recording-stop)
    - [Retrieve recording info](#get-recording)
    - [Retrieve all recording info](#get-all-recordings)
    - [Delete a recording](#delete-recording)
- [The Media Node object](#the-media-node-object)<a href="openvidu-pro/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin-left: 5px; margin-top:2px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span></a>
    - [Retrieve Media Node info](#get-medianode)
    - [Retrieve all Media Nodes info](#get-all-medianodes)
    - [Add Media Node](#post-medianode)
    - [Remove Media Node](#delete-medianode)
    - [Modify Media Node](#patch-medianode)
    - [Autodiscover Media Nodes](#put-medianode)
- [Others](#others)
    - [Generate a token](#post-token) **(DEPRECATED. Use [Initialize a connection](#post-connection))**
    - [Unpublish a stream from a connection](#delete-stream)
    - [Send a signal to a session](#post-signal)
    - [Get OpenVidu active configuration](#get-config)
    - [Check OpenVidu health](#get-health)<a href="openvidu-pro/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin-left: 5px; margin-top:2px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span></a>
    - [Restart OpenVidu](#post-restart)<a href="openvidu-pro/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin-left: 5px; margin-top:2px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span></a>
    - [Load Speech To Text language model](#post-speech-to-text)<a href="openvidu-pro/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin-left: 5px; margin-top:2px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span></a>
    - [Unload Speech To Text language model](#delete-speech-to-text)<a href="openvidu-pro/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin-left: 5px; margin-top:2px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span></a>

</div>

<br>

---

<div class="rest-api-section"></div>

## The Session object

A Session is a conference room where users can send/receive media streams to/from each other.

```json
{
    "id": "ses_YnDaGYNcd7",
    "object": "session",
    "createdAt": 1538481996019,
    "mediaMode": "ROUTED",
    "recordingMode": "MANUAL",
    "defaultRecordingProperties": {
        "name": "MyRecording",
        "hasAudio": true,
        "hasVideo": true,
        "outputMode": "COMPOSED",
        "recordingLayout": "BEST_FIT",
        "resolution": "1280x720",
        "frameRate": 25,
        "shmSize": 536870912,
        "mediaNode": "media_i-po39jr3e10rkjsdfj"
    },
    "customSessionId": "TestSession",
    "connections": {
        "numberOfElements": 0,
        "content": []
    },
    "recording": false,
    "forcedVideoCodec": "VP8",
    "allowTranscoding": false,
    "mediaNodeId": "media_i-po39jr3e10rkjsdfj"
}
```

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| id | String | Identifier of the session |
| object | String (`session`) | String representing the object’s type. Objects of the same type share the same value |
| createdAt | Number | Time when the session was created in UTC milliseconds |
| mediaMode | String | Media mode configured for the session (`ROUTED` or `RELAYED`) |
| recordingMode | String | Recording mode configured for the session (`ALWAYS` or `MANUAL`) |
| defaultRecordingProperties | Object | The recording properties to apply by default to any recording started for this Session |
| customSessionId | String | Custom session identifier. Only defined if the session was initialized passing a `customSessionId` field in method [**POST /openvidu/api/sessions**](#post-session) |
| connections | Object | Collection of active connections in the session. This object is defined by a `numberOfElements` property counting the total number of active connections and a `content` array with the actual active connections. Active connections are those with `status` property set to `active`. See [**Connection object**](#the-connection-object) |
| recording | Boolean | Whether the session is being recorded or not at this moment |
| forcedVideoCodec | String | Enforce a specific video codec to be used by all clients, to avoid compatibility issues:<ul><li>`MEDIA_SERVER_PREFERRED`<br>A recommended choice is done for you</li><li>`NONE`<br>Let each client use their preferred codec</li><li>`VP8`</li><li>`VP9`</li><li>`H264`</li></ul>[More details](advanced-features/media-codecs/#forced-video-codec). |
| allowTranscoding | Boolean | Allow the media server to perform live transcoding of video streams, ensuring that all codecs match in the session (**Kurento only**).<br>[More details](advanced-features/media-codecs/#allow-transcoding). |
| mediaNodeId <a href="openvidu-pro/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin-left: 5px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span></a> | String | Identifier of the Media Node hosting this session. It is the `id` property of a [Media Node object](#the-media-node-object). Only defined after the session has actually been allocated inside the Media Node, which only happens after the first user connects to the session. See [Manual distribution](openvidu-pro/scalability/#how-openvidu-pro-sessions-are-distributed) of OpenVidu Pro sessions |

---

### POST `/openvidu/api/sessions` {:id=post-session}

##### Description

Initialize a Session in OpenVidu Server. This is the very first operation to perform in OpenVidu workflow. After that, Connection objects can be generated for this Session and their token passed to the client-side, so clients can use it to connect to the Session.

##### Operation

|   ||
| - ||
| **METHOD**  | POST |
| **URL**     | https://`YOUR_OPENVIDUSERVER_IP`/openvidu/api/sessions |
| **HEADERS** | Authorization: Basic `EncodeBase64(OPENVIDUAPP:<YOUR_SECRET>)`<br/>Content-Type: application/json |

##### Body

```json
{
    "mediaMode": "ROUTED",
    "recordingMode": "MANUAL",
    "customSessionId": "CUSTOM_SESSION_ID",
    "forcedVideoCodec": "VP8",
    "allowTranscoding": false,
    "defaultRecordingProperties": {
        "name": "MyRecording",
        "hasAudio": true,
        "hasVideo": true,
        "outputMode": "COMPOSED",
        "recordingLayout": "BEST_FIT",
        "resolution": "1280x720",
        "frameRate": 25,
        "shmSize": 536870912,
        "mediaNode": {
            "id": "media_i-0c58bcdd26l11d0sd"
        }
    },
    "mediaNode": {
        "id": "media_i-0c58bcdd26l11d0sd"
    }
}
```

> - **mediaMode** _(optional String)_
>     - `ROUTED` _(default)_ : media streams will be routed through OpenVidu Server. This Media Mode is mandatory for session recording.
>     - `RELAYED`: not available yet<br><br>
> - **recordingMode** _(optional String)_
>     - `MANUAL` _(default)_ : if you want to manage when start and stop the recording.
>     - `ALWAYS`: automatic recording from the first user publishing until the last participant leaves the session.<br><br>
> - **customSessionId** _(optional String)_ : you can fix the `sessionId` that will be assigned to the session with this parameter. If you make another request with the exact same `customSessionId` while previous session already exists, no session will be created and a `409` http response will be returned. If this parameter is an empty string or not sent at all, OpenVidu Server will generate a random sessionId for you. If set, it must be an alphanumeric string: allowed numbers [`0-9`], letters [`a-zA-Z`], dashes (`-`) and underscores (`_`).<br><br>
> - **forcedVideoCodec** _(optional String)_ : Enforce a specific video codec to be used by all clients.<br><br>
> - **allowTranscoding** _(optional Boolean)_ : Allow the media server to perform live transcoding of video streams.<br><br>
> - **defaultRecordingProperties** _(optional Object)_ : the recording properties to apply by default to any recording started for this Session. You can of course override these default values and change the recording properties of any Recording [when starting them](#post-recording-start). The object structure is the same as the one defined in [Start the recording of a session](#post-recording-start).<br><br>
> - **mediaNode** _(optional Object)_ <a href="openvidu-pro/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin-left: 5px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span></a> : an object with the Media Node selector to force the Media Node allocation of this session (see [Manual distribution](openvidu-pro/scalability/#how-openvidu-pro-sessions-are-distributed) of OpenVidu Pro sessions). Right now it may only have a single property `id` with a Media Node identifier. That is the `id` property of a [Media Node object](#the-media-node-object). If not set, by default the recording will be allocated in the less loaded Media Node.<br><br>

##### Returns

This operation returns a [**Session object**](#the-session-object).

##### HTTP responses

|||
| - ||
| 200 | Session successfully created and sessionId ready to be used |
| 400 | Problem with some body parameter |
| 409 | Parameter `customSessionId` corresponds to an existing Session. There has been no change at all in the state of OpenVidu Server. You can proceed to use the rejected custom sessionId as usual without a problem |

<br>

---

### GET `/openvidu/api/sessions/<SESSION_ID>` {:id=get-session}

##### Description

Retrieve a Session from OpenVidu Server.

##### Operation

|   ||
| - ||
| **METHOD**  | GET |
| **URL**     | https://`YOUR_OPENVIDUSERVER_IP`/openvidu/api/sessions/`SESSION_ID` |
| **HEADERS** | Authorization: Basic `EncodeBase64(OPENVIDUAPP:<YOUR_SECRET>)` |

##### Returns

This operation returns a [**Session object**](#the-session-object).

##### HTTP responses

|||
| - ||
| 200 | The Session object has been successfully retrieved |
| 404 | No Session exists for the passed `SESSION_ID` |

<br>

---

### GET `/openvidu/api/sessions` {:id=get-all-sessions}

##### Description

Retrieve all Sessions from OpenVidu Server.

##### Operation

|   ||
| - ||
| **METHOD**  | GET |
| **URL**     | https://`YOUR_OPENVIDUSERVER_IP`/openvidu/api/sessions |
| **HEADERS** | Authorization: Basic `EncodeBase64(OPENVIDUAPP:<YOUR_SECRET>)` |

##### Returns

```json
{
    "numberOfElements": 0,
    "content": []
}
```

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| numberOfElements | Number | Total number of Sessions |
| content | Array of Objects | Array of [**Session objects**](#the-session-object) |

##### HTTP responses

|||
| - ||
| 200 | All of the Session objects have been successfully retrieved |

<br>

---

### DELETE `/openvidu/api/sessions/<SESSION_ID>` {:id=delete-session}

##### Description

Close a Session. This will stop all of the processes of this Session: all of its Connections, Streams and Recordings will be closed.

##### Operation

|   ||
| - ||
| **METHOD**  | DELETE |
| **URL**     | https://`YOUR_OPENVIDUSERVER_IP`/openvidu/api/sessions/`SESSION_ID` |
| **HEADERS** | Authorization: Basic `EncodeBase64(OPENVIDUAPP:<YOUR_SECRET>)` |

##### HTTP responses

|||
| - ||
| 204 | The Session has been successfully closed. Every participant will have received the proper events in OpenVidu Browser: [**streamDestroyed**](api/openvidu-browser/classes/StreamEvent.html), [**connectionDestroyed**](api/openvidu-browser/classes/ConnectionEvent.html) and [**sessionDisconnected**](api/openvidu-browser/classes/SessionDisconnectedEvent.html), all of them with "reason" property set to "sessionClosedByServer". Depending on the order of eviction of the users, some of them will receive more events than the others: the first user evicted will only receive the events related to himself, last one will receive every possible event |
| 404 | No Session exists for the passed `SESSION_ID` |

<br>

---

## The Connection object

A Connection represents each one of the users connected to a Session. You must create a Connection for each final user connecting to the Session.

- After creating the Connection, its `status` property will be set to `pending`. This means that the Connection is currently available to be taken by a final user.
- Pass the `token` attribute of a Connection object to the client-side, and use it to call method **[Session.connect](api/openvidu-browser/classes/Session.html#connect)** of OpenVidu Browser library.
- After this, the Connection object will be associated to this final user and its `status` property will be set to `active`. Other properties will also be now populated with the data of the final user.

```json
{
    "id": "con_Xnxg19tonh",
    "object": "connection",
    "type": "WEBRTC",
    "status": "active",
    "sessionId": "ses_YnDaGYNcd7",
    "createdAt": 1538481999022,
    "activeAt": 1538481999843,
    "location": "Madrid, Spain",
    "ip": "37.122.145.190",
    "platform": "Chrome 85.0.4183.102 on Linux 64-bit",
    "token": "wss://localhost:4443?sessionId=TestSession&token=tok_AVe8o7iltWqtijyl&role=PUBLISHER&version=2.16.0&coturnIp=localhost&turnUsername=M2ALIY&turnCredential=7kfjy2",
    "serverData": "My Server Data",
    "clientData": "My Client Data",
    "record": true,
    "role": "PUBLISHER",
    "kurentoOptions": {
        "videoMaxRecvBandwidth": 1000,
        "videoMinRecvBandwidth": 300,
        "videoMaxSendBandwidth": 1000,
        "videoMinSendBandwidth": 300,
        "allowedFilters": [
            "GStreamerFilter",
            "ZBarFilter"
        ]
    },
    "rtspUri": null,
    "adaptativeBitrate": null,
    "onlyPlayWithSubscribers": null,
    "networkCache": null,
    "publishers": [
        {
            "createdAt": 1538481999710,
            "streamId": "str_CAM_NhxL_con_Xnxg19tonh",
            "mediaOptions": {
                "hasAudio": true,
                "audioActive": true,
                "hasVideo": true,
                "videoActive": true,
                "typeOfVideo": "CAMERA",
                "frameRate": 30,
                "videoDimensions": "{\"width\":640,\"height\":480}",
                "filter": {}
            }
        }
    ],
    "subscribers": [
        {
            "streamId": "str_MIC_JSXs_con_OV0CsFsykJ",
            "createdAt": 1538482000856
        }
    ],
    "customIceServers": [
        {
            "url": "turn:turn-domain.com:443",
            "username": "usertest",
            "credential": "userpass"
        }
    ]
}
```

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| id | String | Identifier of the Connection |
| object | String (`connection`) | String representing the object’s type. Objects of the same type share the same value |
| type | String | Type of the Connection. It can be `WEBRTC` for a regular user connecting from an application or `IPCAM` for an IP camera |
| status | String | Status of the Connection: <ul><li style="color:inherit;margin-bottom:4px;margin-top:4px"><code>pending</code>: the Connection is waiting for any user to use its internal <code>token</code> to connect to the Session, calling method [Session.connect](api/openvidu-browser/classes/Session.html#connect) OpenVidu Browser.</li><li style="color:inherit;margin-bottom:4px"><code>active</code>: the internal <code>token</code> of the Connection has already been used by some user to connect to the Session, and it cannot be used again.</li></ul> |
| sessionId | String | Identifier of the Session to which the user is connected |
| createdAt | Number | Time when the Connection was created in UTC milliseconds |
| activeAt | Number | Time when the Connection was taken by a user by calling method [Session.connect](api/openvidu-browser/classes/Session.html#connect) with the Connection's `token` property, in UTC milliseconds. This is the time when the Connection `status` passed from `pending` to `active` |
| location <a href="openvidu-pro/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin-left: 5px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span></a> | String | Geographic location of the participant |
| ip | String | IP of the participant, as seen by OpenVidu Server |
| platform | String | Complete description of the platform used by the participant to connect to the Session. Set to `IPCAM` if `type=IPCAM` |
| token | String | Token of the Connection. Pass it to the client-side to be used in method [Session.connect](api/openvidu-browser/classes/Session.html#connect). Set to null if `type=IPCAM` |
| serverData | String | Data assigned to the Connection in your application's server-side when [creating the Connection](#post-connection) (`data` parameter) |
| clientData | String | Data assigned to the Connection in your application's client-side when calling [Session.connect](api/openvidu-browser/classes/Session.html#connect)  (`metadata` parameter). Set to null if `type=IPCAM` or `status=pending` |
| record <a href="openvidu-pro/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin-left: 5px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span></a> | Boolean | Whether the streams published by this Connection will be recorded or not. This only affects [INDIVIDUAL recording](advanced-features/recording/#individual-recording-selection) |
| role | String | **Only for `type=WEBRTC`**. Role of the Connection |
| kurentoOptions | Object | **Only for `type=WEBRTC`**. Configuration properties applied to the streams of this Connection, regarding Kurento |
| customIceServers | Array of Objects | **Only for `type=WEBRTC`**. Collection of IceServer objects specified on the creation of the connection. By default, if this parameter was not specified in its creation, it will return an empty list. Each one has the following properties: <ul><li style="color:inherit;margin-bottom:4px;margin-top:4px">url (String): Url of the custom STUN/TURN configured.</li><li style="color:inherit;margin-bottom:4px;margin-top:4px">username (Optional String): Specified username for TURN configured.</li><li style="color:inherit;margin-bottom:4px;margin-top:4px">credential (Optional String): Specified credential for TURN configured.</li></ul> |
| rtspUri | String | **Only for `type=IPCAM`**. RTSP URI of the IP camera |
| adaptativeBitrate | Boolean | **Only for `type=IPCAM`**. Whether to use adaptative bitrate (and therefore adaptative quality) or not |
| onlyPlayWithSubscribers | Boolean | **Only for `type=IPCAM`**. Whether to enable the IP camera stream only when some user is subscribed to it, or not |
| networkCache | Number | **Only for `type=IPCAM`**. Size of the buffer of the endpoint receiving the IP camera's stream, in milliseconds |
| publishers | Array of Objects | Collection of Publisher objects: streams the Connection is currently publishing. Each one has the following properties: <ul><li style="color:inherit;margin-bottom:4px;margin-top:4px">streamId (String) : identifier of the stream</li><li style="color:inherit;margin-bottom:4px">createdAt (Number) : time when the stream was published in UTC milliseconds</li><li style="color:inherit;margin-bottom:4px">mediaOptions (Object) : current properties of the published stream. See [**Stream**](api/openvidu-browser/classes/Stream.html) object from openvidu-browser library for a description of them. Some may change dynamically. See [**StreamPropertyChanged**](api/openvidu-browser/classes/StreamPropertyChangedEvent.html) event of openvidu-browser library. <ul><li style="color:inherit;margin-bottom:4px;margin-top:4px">hasVideo (Boolean)</li><li style="color:inherit;margin-bottom:4px">hasAudio (Boolean)</li><li style="color:inherit;margin-bottom:4px">videoActive (Boolean)</li><li style="color:inherit;margin-bottom:4px">audioActive (Boolean)</li><li style="color:inherit;margin-bottom:4px">frameRate (Number)</li><li style="color:inherit;margin-bottom:4px">videoDimensions (String)</li><li style="color:inherit;margin-bottom:4px">typeOfVideo (String)</li><li style="color:inherit;margin-bottom:4px">filter (Object)</li></ul></li></ul> |
| subscribers | Array of Objects | Collection of Subscriber objects: streams the user is currently subscribed to. Each one has the following properties: <ul><li style="color:inherit;margin-bottom:4px;margin-top:4px">streamId (String) : equal to the `streamId` property of its associated publisher, that must be present in the `publishers` array of some other connection of the Session</li><li style="color:inherit;margin-bottom:4px">createdAt (Number) : time when the subscription was established in UTC milliseconds</li></ul> |

---

### POST `/openvidu/api/sessions/<SESSION_ID>/connection` {:id=post-connection}

##### Description

Create a new Connection in the Session.

##### Operation

|   ||
| - ||
| **METHOD**  | POST |
| **URL**     | https://`YOUR_OPENVIDUSERVER_IP`/openvidu/api/sessions/`SESSION_ID`/connection |
| **HEADERS** | Authorization: Basic `EncodeBase64(OPENVIDUAPP:<YOUR_SECRET>)`<br/>Content-Type: application/json |

##### Body

For a regular user Connection (type `WEBRTC`)

```json
{
    "type": "WEBRTC",
    "data": "My Server Data",
    "record": true,
    "role": "PUBLISHER",
    "kurentoOptions": {
        "videoMaxRecvBandwidth": 1000,
        "videoMinRecvBandwidth": 300,
        "videoMaxSendBandwidth": 1000,
        "videoMinSendBandwidth": 300,
        "allowedFilters": [ "GStreamerFilter", "ZBarFilter" ]
    },
    "customIceServers": [
        {
            "url": "turn:turn-domain.com:443",
            "username": "usertest",
            "credential": "userpass"
        }
    ]
}
```

For an IP camera Connection (type `IPCAM`)

```json
{
   "type": "IPCAM",
   "data": "Office security camera",
   "record": true,
   "rtspUri": "rtsp://your.camera.ip.sdp",
   "adaptativeBitrate": true,
   "onlyPlayWithSubscribers": true,
   "networkCache": 2000
}
```

> - **type** _(optional String)_ : which type of Connection will be created. It can be `WEBRTC` for a regular user connecting from an application or `IPCAM` for an IP camera. Default to `WEBRTC`<br><br>
> - **data** _(optional String)_ : metadata associated to this Connection (usually participant's information). This populates property `serverData` of the [Connection object](#the-connection-object)<br><br>
> - **record** _(optional Boolean)_ <a href="openvidu-pro/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin-left: 5px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span></a> : whether to record the streams published by the Connection or not. This only affects [INDIVIDUAL recording](advanced-features/recording/#individual-recording-selection). Default to `true`<br><br>
> - **role** _(optional String. Check [OpenViduRole](api/openvidu-node-client/enums/openvidurole.html) section of OpenVidu Node Client for a complete description)_: only for type `WEBRTC`. Defines the role of the Connection:
>     - `SUBSCRIBER`
>     - `PUBLISHER` _(default)_
>     - `MODERATOR`<br><br>
> - **kurentoOptions** _(optional Object)_ : only for type `WEBRTC`. You can set some configuration properties for the Connection regarding Kurento. This is a JSON object with the following optional properties:<br><br>
>     - **videoMaxRecvBandwidth** _(optional Number)_ : maximum number of Kbps that the Connection will be able to receive from Kurento Media Server per subscriber stream. 0 means unconstrained. Giving a value to this property will override the global configuration set in _[OpenVidu configuration](reference-docs/openvidu-config)_ (parameter `OPENVIDU_STREAMS_VIDEO_MAX_RECV_BANDWIDTH`) for every incoming stream of the Connection. _**WARNING**: the lower value set to this property limits every other bandwidth of the WebRTC pipeline this server-to-client stream belongs to. This includes the user publishing the stream and every other user subscribed to the same stream._<br><br>
>     - **videoMinRecvBandwidth** _(optional Number)_ : minimum number of Kbps that the Connection will try to receive from Kurento Media Server per subscriber stream. 0 means unconstrained. Giving a value to this property will override the global configuration set in _[OpenVidu configuration](reference-docs/openvidu-config)_ (parameter `OPENVIDU_STREAMS_VIDEO_MIN_RECV_BANDWIDTH`) for every incoming stream of the Connection.<br><br>
>     - **videoMaxSendBandwidth** _(optional Number)_ : maximum number of Kbps that the Connection will be able to send to Kurento Media Server per publisher stream. 0 means unconstrained. Giving a value to this property will override the global configuration set in _[OpenVidu configuration](reference-docs/openvidu-config)_ (parameter `OPENVIDU_STREAMS_VIDEO_MAX_SEND_BANDWIDTH`) for every outgoing stream of the Connection. _**WARNING**: this value limits every other bandwidth of the WebRTC pipeline this client-to-server stream belongs to. This includes every other user subscribed to the stream._<br><br>
>     - **videoMinSendBandwidth** _(optional Number)_ : minimum number of Kbps that the Connection will try to send to Kurento Media Server per publisher stream. 0 means unconstrained. Giving a value to this property will override the global configuration set in _[OpenVidu configuration](reference-docs/openvidu-config)_ (parameter `OPENVIDU_STREAMS_VIDEO_MIN_SEND_BANDWIDTH`) for every outgoing stream of the Connection.<br><br>
>     - **allowedFilters** _(optional array of strings)_ : names of the filters the Connection will be able to apply to its published streams (see [Voice and video filters](advanced-features/filters/)).<br><br>
> - **customIceServers** _(optional Array of Objects)_ : only for type `WEBRTC`. By default OpenVidu uses its own TURN/STUN server in its deployments, but you can use a custom ICE Server (STUN/TURN server) if you wish by setting those in this parameter. The objects inside of the array has these properties<br><br>
>     - **url** _(mandatory String)_ : Url of the custom STUN/TURN configured.<br><br>
>     - **username** _(Optional with STUN, mandatory with TURN. String)_ : Specified username for TURN configured.<br><br>
>     - **credential** _(Optional with STUN, mandatory with TURN. String)_ : Specified username for TURN configured.<br><br>
> - **rtspUri** _(mandatory String if property `type` is `IPCAM`)_ : only for type `IPCAM`. RTSP URI of the IP camera. For example: `rtsp://your.camera.ip:7777/path`<br><br>
> - **adaptativeBitrate** _(optional Boolean)_ : only for type `IPCAM`. Whether to use adaptative bitrate (and therefore adaptative quality) or not. For local network connections that do not require media transcoding this can be disabled to save CPU power. If you are not sure if transcoding might be necessary, setting this property to false **may result in media connections not being established**. Default to `true`<br><br>
> - **onlyPlayWithSubscribers** _(optional Boolean)_ : only for type `IPCAM`. Enable the IP camera stream only when some user is subscribed to it. This allows you to reduce power consumption and network bandwidth in your server while nobody is asking to receive the camera's video. On the counterpart, first user subscribing to the IP camera stream will take a little longer to receive its video. Default to `true`<br><br>
> - **networkCache** _(optional Number)_ : only for type `IPCAM`. Size of the buffer of the endpoint receiving the IP camera's stream, in milliseconds. The smaller it is, the less delay the signal will have, but more problematic will be in unstable networks. Use short buffers only if there is a quality connection between the IP camera and OpenVidu Server. Default to `2000`<br><br>

##### Returns

Returns a [**Connection object**](#the-connection-object).

##### HTTP responses

|||
| - ||
| 200 | The Connection has been successfully created. If it is of type `WEBRTC`, its token can now be used to connect a final user. If it is of type `IPCAM`, every participant will immediately receive the proper events in OpenVidu Browser: [**connectionCreated**](api/openvidu-browser/classes/ConnectionEvent.html) identifying the new IP camera Connection and [**streamCreated**](api/openvidu-browser/classes/StreamEvent.html) so they can subscribe to the IP camera stream. |
| 400 | Problem with some body parameter |
| 404 | No session exists for the passed `SESSION_ID` |
| 500 | Unexpected error when creating the Connection object. This can only happen if type is `IPCAM`. See the error message for further information |

<br>

---

### GET `/openvidu/api/sessions/<SESSION_ID>/connection/<CONNECTION_ID>` {:id=get-connection}

##### Description

Get a Connection from a Session.

##### Operation

|   ||
| - ||
| **METHOD**  | GET |
| **URL**     | https://`YOUR_OPENVIDUSERVER_IP`/openvidu/api/sessions/`SESSION_ID`/connection/`CONNECTION_ID` |
| **HEADERS** | Authorization: Basic `EncodeBase64(OPENVIDUAPP:<YOUR_SECRET>)` |

##### Returns

This operation returns a [**Connection object**](#the-connection-object).

##### HTTP responses

|||
| - ||
| 200 | The Connection object has been successfully retrieved |
| 400 | No Session exists for the passed `SESSION_ID` |
| 404 | No Connection exists for the passed `CONNECTION_ID` |

<br>

---

### GET `/openvidu/api/sessions/<SESSION_ID>/connection` {:id=get-all-connections}

##### Description

List all Connections from a Session.

##### Operation

|   ||
| - ||
| **METHOD**  | GET |
| **URL**     | https://`YOUR_OPENVIDUSERVER_IP`/openvidu/api/sessions/`SESSION_ID`/connection |
| **HEADERS** | Authorization: Basic `EncodeBase64(OPENVIDUAPP:<YOUR_SECRET>)` |

##### Returns

```json
{
    "numberOfElements": 0,
    "content": []
}
```

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| numberOfElements | Number | Total number of Connections |
| content | Array of Objects | Array of [**Connection objects**](#the-connection-object) |

##### HTTP responses

|||
| - ||
| 200 | All of the Connection objects have been successfully retrieved |
| 404 | No Session exists for the passed `SESSION_ID` |

<br>

---

### PATCH `/openvidu/api/sessions/<SESSION_ID>/connection/<CONNECTION_ID>` {:id=patch-connection}

<div style="
    display: table;
    border: 2px solid #0088aa9e;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 30px;
    padding: 10px 0;
    background-color: rgba(0, 136, 170, 0.04);"><div style="display: table-cell; vertical-align: middle">
    <i class="icon ion-android-alert" style="
    font-size: 50px;
    color: #0088aa;
    display: inline-block;
    padding-left: 25%;
"></i></div>
<div style="
    vertical-align: middle;
    display: table-cell;
    padding-left: 20px;
    padding-right: 20px;
    ">
This feature is part of OpenVidu <a href="openvidu-pro/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin: 0 4px 0 4px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span></a> and <a href="openvidu-enterprise/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(156, 39, 176); color: white; font-weight: bold; padding: 0px 5px; margin: 0 4px 0 4px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">ENTERPRISE</span></a> editions.
</div>
</div>

##### Description

Modify the properties of a Connection. The following properties are modifiable:

- `role`: you can dynamically change the role of the Connection in the Session.
- `record`: you can enable or disable INDIVIDUAL recording of the streams published by this Connection. See [Selecting streams to be recorded](advanced-features/recording/#individual-recording-selection) for further information.

The affected client will trigger one [ConnectionPropertyChangedEvent](api/openvidu-browser/classes/ConnectionPropertyChangedEvent.html) for each modified property.

##### Operation

|   ||
| - ||
| **METHOD**  | PATCH |
| **URL**     | https://`YOUR_OPENVIDUSERVER_IP`/openvidu/api/sessions/`SESSION_ID`/connection/`CONNECTION_ID` |
| **HEADERS** | Authorization: Basic `EncodeBase64(OPENVIDUAPP:<YOUR_SECRET>)`<br/>Content-Type: application/json |

##### Body

```json
{
    "role": "PUBLISHER",
    "record": true
}
```

> - **role** _(optional String)_ : new `role` property of the Connection
> - **record** _(optional Boolean)_ : new `record` property of the Connection

##### Sample return

This operation returns the modified [**Connection object**](#the-connection-object).

##### HTTP responses

|||
| - ||
| 200 | The Connection has been successfully modified |
| 400 | Problem with some body parameter |
| 404 | No Session exists for the passed `SESSION_ID`, or no Connection exists for the passed `CONNECTION_ID` |

<br>

---

### DELETE `/openvidu/api/sessions/<SESSION_ID>/connection/<CONNECTION_ID>` {:id=delete-connection}

##### Description

Force the disconnection of a user from a Session. All of the streams associated to this Connection (both publishers and subscribers) will be destroyed. If the user was publishing a stream, all other subscribers of other users receiving it will also be destroyed.

If the `CONNECTION_ID` belongs to a Connection in `pending` status, this method will simply invalidate it (its token will be no longer available for any user to connect to the Session).

##### Operation

|   ||
| - ||
| **METHOD**  | DELETE |
| **URL**     | https://`YOUR_OPENVIDUSERVER_IP`/openvidu/api/sessions/`SESSION_ID`/connection/`CONNECTION_ID` |
| **HEADERS** | Authorization: Basic `EncodeBase64(OPENVIDUAPP:<YOUR_SECRET>)` |

##### HTTP responses

|||
| - ||
| 204 | The Connection has been successfully removed from the session. Every participant will have received the proper events in OpenVidu Browser: [**streamDestroyed**](api/openvidu-browser/classes/StreamEvent.html) if the user was publishing, [**connectionDestroyed**](api/openvidu-browser/classes/ConnectionEvent.html) for the remaining users and [**sessionDisconnected**](api/openvidu-browser/classes/SessionDisconnectedEvent.html) for the evicted user. All of them with "reason" property set to "forceDisconnectByServer".<br>If the `CONNECTION_ID` belongs to a Connection in `pending` status, it has been successfully invalidated and its token can no longer be used. |
| 400 | No Session exists for the passed `SESSION_ID` |
| 404 | No Connection for the passed `CONNECTION_ID` |

<br>

---

## The Recording object

A Recording represents the recording process of a Session.

```json
{
    "id": "ses_YnDaGYNcd7",
    "object": "recording",
    "name": "MyRecording",
    "outputMode": "COMPOSED",
    "hasAudio": true,
    "hasVideo": true,
    "resolution": "1280x720",
    "frameRate": 25,
    "recordingLayout": "CUSTOM",
    "customLayout": "",
    "sessionId": "ses_YnDaGYNcd7",
    "mediaNode": "media_i-po39jr3e10rkjsdfj",
    "createdAt": 1600564785109,
    "size": 303072692,
    "duration": 108000.234,
    "url": "https://my.openvidu.ip/openvidu/recordings/ses_YnDaGYNcd7/MyRecording.mp4",
    "status": "ready"
}
```

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| id | String | Identifier of the Recording. It will be based on the identifier of the session. Store it to perform other operations such as stop, get or delete the Recording |
| object | String (`recording`) | String representing the object’s type. Objects of the same type share the same value |
| name | String | Name of the Recording. If no `name` parameter is provided, will be equal to `id` field |
| outputMode | String | Output mode of the Recording |
| hasAudio | Boolean | True if the Recording includes an audio track, false otherwise |
| hasVideo | Boolean | True if the Recording includes a video track, false otherwise |
| resolution | String | Resolution of the video file. Only defined if `outputMode` is set to `COMPOSED` or `COMPOSED_QUICK_START` and `hasVideo` to true |
| frameRate | Number | Frame rate of the video file. Only defined if `outputMode` is set to `COMPOSED` or `COMPOSED_QUICK_START` and `hasVideo` to true |
| recordingLayout | String | The recording layout that is being used. Only defined if `outputMode` is set to `COMPOSED`  or `COMPOSED_QUICK_START` and `hasVideo` to true |
| customLayout | String | The custom layout that is being used. Only defined if `recordingLayout` is set to `CUSTOM` |
| sessionId | String | Session associated to the Recording |
| mediaNode | String |  |
| createdAt | Number | Time when the Recording started in UTC milliseconds |
| size | Number | Size in bytes of the video file. Only guaranteed to be greater than `0` if status is `ready` |
| duration | Number | Duration of the video file in seconds. Only guaranteed to be greater than `0` if status is `ready` |
| url | String | URL where the Recording file is available.  Only guaranteed to different than `null` if status is `ready`<div style="margin-top:10px"></div>The final URL value follows this format:<div style="margin-top:5px"></div>`https://YOUR_OPENVIDUSERVER_IP/openvidu/recordings/<RECORDING_ID>/<RECORDING_NAME>.<EXTENSION>`<br>This path will be protected with OpenVidu credentials depending on whether [openvidu-server configuration property `OPENVIDU_RECORDING_PUBLIC_ACCESS`](reference-docs/openvidu-config/) is false or true. This format is equals to the AWS S3 URL object property of the uploaded object for OpenVidu Pro deployments configured to [upload recordings to S3](advanced-features/recording/#uploading-recordings-to-aws-s3) |
| status | String | Status of the Recording: <ul><li style="color:inherit;margin-bottom:4px;margin-top:4px"><code>starting</code>: the Recording is being started. This is in a way a special status, because it can only appear if a concurrent REST API call to list recordings is done at the narrow time frame in which the Recording starts. The moment the start operation returns, the Recording status will be <i>started</i>. A Recording in this status cannot be stopped. It does not get triggered in CDR/Webhook [recordingStatusChanged](reference-docs/openvidu-server-webhook/#recordingstatuschanged).</li><li style="color:inherit;margin-bottom:4px"><code>started</code>: the session is being recorded. This means the associated video(s) already exists and its size is greater than 0. NOTE: when using COMPOSED recording with video, this event does not mean there are publisher's streams being actually recorded in the video file. It only ensures the video file exists and its size is greater than 0.</li><li style="color:inherit;margin-bottom:4px"><code>stopped</code>: the recording process has stopped and files are being processed. Depending on the type of OpenVidu deployment and configuration, properties <i>duration</i> and <i>size</i> can be set to 0 and <i>url</i> can be null. If this is the case, wait for status <i>ready</i> to get the final value of these properties.</li><li style="color:inherit;margin-bottom:4px"><code>ready</code>: the recorded file has been successfully processed and is available for download. Properties <i>duration</i>, <i>size</i> and <i>url</i> will always be properly defined at this moment. For OpenVidu Pro deployments configured to [upload recordings to S3](advanced-features/recording/#uploading-recordings-to-aws-s3) this status means that the Recording has been successfully stored in the S3 bucket.</li><li style="color:inherit;margin-bottom:4px"><code>failed</code>: the recording process has failed. The final state of the recorded file cannot be guaranteed to be stable.</li></ul> The recording status will be `started` after calling the start operation and while the Recording is active. After calling stop operation, the status may be `stopped` or `ready` depending on the type of deployment of OpenVidu. OpenVidu CE will always return `ready` status. OpenVidu Pro will always return `stopped` status and properties `size`, `duration` and `url` will not have their final value defined yet. Listen to [recordingStatusChanged](reference-docs/openvidu-server-webhook/#recordingstatuschanged) CDR/Webhook event to know when the Recording has reached `ready` status in this case |

---

### POST `/openvidu/api/recordings/start` {:id=post-recording-start}

##### Description

Start the recording of a Session. See [**Recording**](advanced-features/recording/) documentation.

##### Operation

|   ||
| - ||
| **METHOD**  | POST |
| **URL**     | https://`YOUR_OPENVIDUSERVER_IP`/openvidu/api/recordings/start |
| **HEADERS** | Authorization: Basic `EncodeBase64(OPENVIDUAPP:<YOUR_SECRET>)`<br/>Content-Type: application/json |

##### Body

```json
{
    "session":"ses_YnDaGYNcd7",
    "name": "MyRecording",
    "hasAudio": true,
    "hasVideo": true,
    "outputMode": "COMPOSED",
    "recordingLayout": "CUSTOM",
    "customLayout": "mySimpleLayout",
    "resolution": "1280x720",
    "frameRate": 25,
    "shmSize": 536870912,
    "ignoreFailedStreams": false,
    "mediaNode": {
        "id": "media_i-0c58bcdd26l11d0sd"
    }
}
```

> - **session** _(mandatory String)_ : the sessionId belonging to the session you want to start recording.<br><br>
> - **name** _(optional String)_ : the name you want to give to the video file. You can access this same property in openvidu-browser on [recordingEvents](api/openvidu-browser/classes/RecordingEvent.html). If no name is provided, the video file will be named after `id` property of the recording.<br><br>
> - **outputMode** _(optional String)_ : record all streams in a single file in a grid layout or record each stream in its own separate file.
>     - `COMPOSED`_(default)_ : when recording the session, all streams will be composed in the same file in a grid layout.
>     - `INDIVIDUAL`: when recording the session, every stream is recorded in its own file.
>     - `COMPOSED_QUICK_START` : same as `COMPOSED`, but the recording will start much quicker in exchange for a higher CPU usage during the lifespan of the session. See [Composed quick start recording](advanced-features/recording/#composed-quick-start-recording) for further information. This output mode only applies when defined in the `defaultRecordingProperties` object when [initializing a Session](#post-session).<br><br>
> - **hasAudio** _(optional Boolean)_ : whether to record audio or not. Default to `true`<br><br>
> - **hasVideo** _(optional Boolean)_ : whether to record video or not. Default to `true`<br><br>
> - **recordingLayout** _(optional String. Only applies if `outputMode` is set to `COMPOSED` or `COMPOSED_QUICK_START` and `hasVideo` to true)_ : the layout to be used in this recording.
>     - `BEST_FIT`_(default)_ : a grid layout where all the videos are evenly distributed.
>     - `CUSTOM`: use your own custom layout. See [Custom recording layouts](advanced-features/recording/#custom-recording-layouts) section to learn how.
>     - Not available yet: `PICTURE_IN_PICTURE`, `VERTICAL_PRESENTATION`, `HORIZONTAL_PRESENTATION`<br><br>
> - **customLayout** _(optional String. Only applies if `recordingLayout` is set to `CUSTOM`)_ : a relative path indicating the custom recording layout to be used if more than one is available. Default to empty string (if so custom layout expected under path set with [openvidu-server configuration property](reference-docs/openvidu-config/) `OPENVIDU_RECORDING_CUSTOM_LAYOUT`).<br><br>
> - **resolution** _(optional String. Only applies if `outputMode` is set to `COMPOSED` or `COMPOSED_QUICK_START` and `hasVideo` to true)_ : the resolution of the recorded video file. It is a string indicating the width and height in pixels like this: `"1280x720"`. Values for both width and height must be between 100 and 1999. Default to `"1280x720"`.<br><br>
> - **frameRate** _(optional Number. Only applies if `outputMode` is set to `COMPOSED` or `COMPOSED_QUICK_START` and `hasVideo` to true)_ : the frame rate of the recorded video file. Minimum 1 and maximum 120. Default to 25.<br><br>
> - **shmSize** _(optional Number. Only applies if `outputMode` is set to `COMPOSED` or `COMPOSED_QUICK_START` and `hasVideo` to true)_ : the amount of memory dedicated to the recording module in charge of this specific recording, in bytes. The default value is usually fine, but you can adjust it to your needs. Default to 536870912 (512 MB).<br><br>
> - **ignoreFailedStreams** _(optional Boolean. Only applies if `outputMode` is set to `INDIVIDUAL`)_ : whether to ignore failed streams or not when starting the recording. For [INDIVIDUAL recording](advanced-features/recording/#individual-recording), by default all the streams available at the moment the recording process starts must be healthy and properly sending media. If some stream that should be sending media is broken, then the recording process fails after a 10s timeout. In this way your application is notified that some stream is not being recorded, so it can retry the process again. But you can disable this rollback behavior and simply ignore any failed stream, which will be susceptible to be recorded in the future if media starts flowing as expected at any point. The downside of this behavior is that you will have no guarantee that all streams present at the beginning of a recording are actually being recorded. Default to false.<br><br>
> - **mediaNode** _(optional Object)_ <a href="openvidu-pro/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin-left: 5px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span></a>
>     - An object with the Media Node selector to force the Media Node allocation of this recording. Only for composed recordings with video (see [Scalable composed recording](advanced-features/recording/#scalable-composed-recording)). Right now it may only have a single property `id` with a Media Node identifier. That is the `id` property of a [Media Node object](#the-media-node-object). If not set, by default the recording will be allocated in the same Media Node as the one hosting the recorded session, which is the best option in terms of network traffic.<br><br>

##### Returns

This operation returns a [**Recording object**](#the-recording-object).

##### HTTP responses

|||
| - ||
| 200 | The session has started to be recorded. The moment this response is retrieved, it means that the video file is already created and contains proper data, and that the recording can be stopped with guarantees |
| 400 | Problem with some body parameter |
| 422 | `resolution` parameter exceeds acceptable values (for both width and height, min 100px and max 1999px), `frameRate` parameter exceeds acceptable values (min 0 and max 120), `shmSize` exceed acceptable values (min 134217728), or trying to start a recording with both `hasAudio` and `hasVideo` to false |
| 404 | No session exists for the passed `session` body parameter |
| 406 | The session has no connected participants |
| 409 | The session is not configured for using MediaMode `ROUTED` or it is already being recorded |
| 501 | OpenVidu Server recording module is disabled: `OPENVIDU_RECORDING` [configuration property](reference-docs/openvidu-config/) is set to `false` |

<br>

---

### POST `/openvidu/api/recordings/stop/<RECORDING_ID>` {:id=post-recording-stop}

##### Description

Stop the recording of a Session. See [**Recording**](advanced-features/recording/) documentation.

##### Operation

|   ||
| - ||
| **METHOD**  | POST |
| **URL**     | https://`YOUR_OPENVIDUSERVER_IP`/openvidu/api/recordings/stop/`RECORDING_ID` |
| **HEADERS** | Authorization: Basic `EncodeBase64(OPENVIDUAPP:<YOUR_SECRET>)` |

##### Returns

This operation returns a [**Recording object**](#the-recording-object).

##### HTTP responses

|||
| - ||
| 200 | The session has successfully stopped from being recorded |
| 404 | No recording exists for the passed `RECORDING_ID` |
| 406 | Recording has `starting` status. Wait until `started` status before stopping the recording |
| 501 | OpenVidu Server recording module is disabled: `OPENVIDU_RECORDING` [configuration property](reference-docs/openvidu-config/) is set to `false` |

<br>

---

### GET `/openvidu/api/recordings/<RECORDING_ID>` {:id=get-recording}

##### Description

Retrieve a Recording from OpenVidu Server.

##### Operation

|   ||
| - ||
| **METHOD**  | GET |
| **URL**     | https://`YOUR_OPENVIDUSERVER_IP`/openvidu/api/recordings/`RECORDING_ID` |
| **HEADERS** | Authorization: Basic `EncodeBase64(OPENVIDUAPP:<YOUR_SECRET>)` |

##### Returns

This operation returns a [**Recording object**](#the-recording-object).

##### HTTP responses

|||
| - ||
| 200 | The recording information has been successfully retrieved |
| 404 | No recording exists for the passed `RECORDING_ID` |
| 501 | OpenVidu Server recording module is disabled: `OPENVIDU_RECORDING` [configuration property](reference-docs/openvidu-config/) is set to `false` |

<br>

---

### GET `/openvidu/api/recordings` {:id=get-all-recordings}

##### Description

Retrieve all Recordings from OpenVidu Server.

##### Operation

|   ||
| - ||
| **METHOD**  | GET |
| **URL**     | https://`YOUR_OPENVIDUSERVER_IP`/openvidu/api/recordings |
| **HEADERS** | Authorization: Basic `EncodeBase64(OPENVIDUAPP:<YOUR_SECRET>)` |

##### Returns

```json
{
    "count": 0,
    "items": []
}
```

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| count | Number | Total number of recordings |
| items | Array of Objects | Array of [**Recording objects**](#the-recording-object) |

##### HTTP responses

|||
| - ||
| 200 | All the recording information has been successfully retrieved |
| 501 | OpenVidu Server recording module is disabled: `OPENVIDU_RECORDING` [configuration property](reference-docs/openvidu-config/) is set to `false` |

<br>

---

### DELETE `/openvidu/api/recordings/<RECORDING_ID>` {:id=delete-recording}

##### Description

Delete a Recording. This will delete all of the recording files from disk.

##### Operation

|   ||
| - ||
| **METHOD**  | DELETE |
| **URL**     | https://`YOUR_OPENVIDUSERVER_IP`/openvidu/api/recordings/`RECORDING_ID` |
| **HEADERS** | Authorization: Basic `EncodeBase64(OPENVIDUAPP:<YOUR_SECRET>)` |

##### HTTP responses

|||
| - ||
| 204 | All of the recording files have been successfully deleted from disk |
| 404 | No recording exists for the passed `RECORDING_ID` |
| 409 | The recording has `started` status. [Stop](#post-recording-stop) it before deletion |
| 501 | OpenVidu Server recording module is disabled: `OPENVIDU_RECORDING` [configuration property](reference-docs/openvidu-config/) is set to `false` |

<br>

---

## The Media Node object

Media Nodes represent each one of the worker instances of your OpenVidu Pro cluster. See [OpenVidu Pro architecture](openvidu-pro/scalability/#openvidu-pro-architecture).

<div style="
    display: table;
    border: 2px solid #0088aa9e;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 30px;
    padding: 10px 0;
    background-color: rgba(0, 136, 170, 0.04);"><div style="display: table-cell; vertical-align: middle">
    <i class="icon ion-android-alert" style="
    font-size: 50px;
    color: #0088aa;
    display: inline-block;
    padding-left: 25%;
"></i></div>
<div style="
    vertical-align: middle;
    display: table-cell;
    padding-left: 20px;
    padding-right: 20px;
    ">
The Media Node API is part of OpenVidu <a href="openvidu-pro/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin: 0 4px 0 4px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span></a> and <a href="openvidu-enterprise/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(156, 39, 176); color: white; font-weight: bold; padding: 0px 5px; margin: 0 4px 0 4px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">ENTERPRISE</span></a> editions.
</div>
</div>

```json
{
    "id": "media_i-0c58bcdd26l11d0sd",
    "object": "mediaNode",
    "environmentId": "i-0c58bcdd26l11d0sd",
    "ip": "172.17.0.2",
    "uri": "ws://172.17.0.2:8888/kurento",
    "launchingTime": 1600678236916,
    "connected": true,
    "connectionTime": 1600678251771,
    "load": 12.45,
    "status": "running",
    "sessions": [],
    "recordingIds": [],
    "kurentoInfo": {}
}
```

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| id | String | Media Node unique identifier. Use it to perform REST operations on this Media Node |
| object | String (`mediaNode`) | String representing the object’s type. Objects of the same type share the same value |
| environmentId | String | Media Node unique identifier dependent on the deployment environment. For example, an AWS EC2 machine identifier if the cluster is deployed in AWS |
| ip | String | Media Node IP |
| uri | String | Media Node URI endpoint. This is the URI where OpenVidu Server will establish a connection with the Media Node |
| launchingTime | Number | When the Media Node was launched, in UTC milliseconds |
| connected | Boolean | Whether OpenVidu Server Pro is connected to this Media Node or not. This property may be false if there is an unexpected disconnection of the Media Node |
| connectionTime | Number | When OpenVidu Server established the connection with the Media Node, in UTC milliseconds |
| disconnectionTime | Number | When OpenVidu Server lost its connection to the Media Node, in UTC milliseconds. Only available if `connected` is false |
| load | Number | CPU load of the Media Node. Decimal number between 0.00 and 100.00 |
| status | String | Status of the Media Node. See [**Media Node statuses**](openvidu-pro/scalability/#media-node-statuses) |
| sessions | Array of Objects | Collection of sessions initialized in this Media Node. See [**Session object**](reference-docs/REST-API/#the-session-object)<div style="margin-top:10px"></div>Property only retrievable when providing query param `sessions=true` in methods:<ul style="margin-top:10px"><li style="color: inherit"><a href="#get-medianode"><strong>GET /openvidu/api/media-nodes/&lt;MEDIA_NODE_ID&gt;</strong></a></li><li style="color: inherit"><a href="#get-all-medianodes"><strong>GET /openvidu/api/media-nodes</strong></a></li></ul> |
| recordingIds | Array of Strings | Collection of recordings initialized in this Media Node. Each string is the id of a [**Recording object**](reference-docs/REST-API/#the-recording-object). See [**Scalable composed recording**](advanced-features/recording/#scalable-composed-recording) <div style="margin-top:10px"></div>Property only retrievable when providing query param `recordings=true` in methods:<ul style="margin-top:10px"><li style="color: inherit"><a href="#get-medianode"><strong>GET /openvidu/api/media-nodes/&lt;MEDIA_NODE_ID&gt;</strong></a></li><li style="color: inherit"><a href="#get-all-medianodes"><strong>GET /openvidu/api/media-nodes</strong></a></li></ul> |
| kurentoInfo | Object | Object with extra advanced information about the Kurento Media Server internal process of this Media Node (version, modules, memory usage...). This is a property aimed at advanced users, subject to change.<div style="margin-top:10px"></div>Property only retrievable when providing query param `extra-info=true` in methods:<ul style="margin-top:10px"><li style="color: inherit"><a href="#get-medianode"><strong>GET /openvidu/api/media-nodes/&lt;MEDIA_NODE_ID&gt;</strong></a></li><li style="color: inherit"><a href="#get-all-medianodes"><strong>GET /openvidu/api/media-nodes</strong></a></li></ul> |

---

### GET `/openvidu/api/media-nodes/<MEDIA_NODE_ID>` {:id=get-medianode}

<div style="
    display: table;
    border: 2px solid #0088aa9e;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 30px;
    padding: 10px 0;
    background-color: rgba(0, 136, 170, 0.04);"><div style="display: table-cell; vertical-align: middle">
    <i class="icon ion-android-alert" style="
    font-size: 50px;
    color: #0088aa;
    display: inline-block;
    padding-left: 25%;
"></i></div>
<div style="
    vertical-align: middle;
    display: table-cell;
    padding-left: 20px;
    padding-right: 20px;
    ">
The Media Node API is part of OpenVidu <a href="openvidu-pro/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin: 0 4px 0 4px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span></a> and <a href="openvidu-enterprise/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(156, 39, 176); color: white; font-weight: bold; padding: 0px 5px; margin: 0 4px 0 4px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">ENTERPRISE</span></a> editions.
</div>
</div>

##### Description

Retrieve the information of a Media Node.

##### Operation

|   ||
| - ||
| **METHOD**  | GET |
| **URL**     | https://`YOUR_OPENVIDUSERVER_IP`/openvidu/api/media-nodes/`MEDIA_NODE_ID` |
| **HEADERS** | Authorization: Basic `EncodeBase64(OPENVIDUAPP:<YOUR_SECRET>)`<br/>Content-Type: application/x-www-form-urlencoded |
| **QUERY PARAMS** | `sessions`,`recordings`,`extra-info` |

##### Query params

| Parameter | Type | Default | Description |
| --------- | ---- | --------| ----------- |
| sessions | Boolean | false | Whether to return session information along Media Node information or not. Only sessions hosted in this Media Node will be retrieved. See [**Session object**](reference-docs/REST-API/#the-session-object) |
| extra&#8209;info | Boolean | false | Whether to return extra information about the Media Node or not. Only for advanced users |

> https://`YOUR_OPENVIDUSERVER_IP`/openvidu/api/media-nodes/`MEDIA_NODE_ID`?sessions=false&recordings=true&extra-info=false

##### Sample return

This operation returns a [**Media Node object**](#the-media-node-object).

##### HTTP responses

|||
| - ||
| 200 | The Media Node information has been successfully retrieved |
| 404 | No Media Node exists for the passed `MEDIA_NODE_ID` |

<br>

---

### GET `/openvidu/api/media-nodes` {:id=get-all-medianodes}

<div style="
    display: table;
    border: 2px solid #0088aa9e;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 30px;
    padding: 10px 0;
    background-color: rgba(0, 136, 170, 0.04);"><div style="display: table-cell; vertical-align: middle">
    <i class="icon ion-android-alert" style="
    font-size: 50px;
    color: #0088aa;
    display: inline-block;
    padding-left: 25%;
"></i></div>
<div style="
    vertical-align: middle;
    display: table-cell;
    padding-left: 20px;
    padding-right: 20px;
    ">
The Media Node API is part of OpenVidu <a href="openvidu-pro/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin: 0 4px 0 4px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span></a> and <a href="openvidu-enterprise/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(156, 39, 176); color: white; font-weight: bold; padding: 0px 5px; margin: 0 4px 0 4px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">ENTERPRISE</span></a> editions.
</div>
</div>

##### Description

Retrieve the information of all Media Nodes.

##### Operation

|   ||
| - ||
| **METHOD**  | GET |
| **URL**     | https://`YOUR_OPENVIDUSERVER_IP`/openvidu/api/media-nodes |
| **HEADERS** | Authorization: Basic `EncodeBase64(OPENVIDUAPP:<YOUR_SECRET>)`<br/>Content-Type: application/x-www-form-urlencoded |
| **QUERY PARAMS** | `sessions`,`recordings`,`extra-info` |

##### Query params

| Parameter | Type | Default | Description |
| --------- | ---- | --------| ----------- |
| sessions | Boolean | false | Whether to return session information along Media Node information or not. Only sessions hosted in this Media Node will be retrieved. See [**Session object**](reference-docs/REST-API/#the-session-object) |
| extra&#8209;info | Boolean | false | Whether to return extra information about the Media Node or not. Only for advanced users |

> https://`YOUR_OPENVIDUSERVER_IP`/openvidu/api/media-nodes?sessions=false&recordings=true&extra-info=false

##### Sample return

```json
{
    "numberOfElements": 0,
    "content": []
}
```

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| numberOfElements | Number | Total number of Media Nodes |
| content | Array of Objects | Array of [**Media Node objects**](#the-media-node-object) |

##### HTTP responses

|||
| - ||
| 200 | All the Media Nodes information has been successfully retrieved |

<br>

---

### POST `/openvidu/api/media-nodes` {:id=post-medianode}

<div style="
    display: table;
    border: 2px solid #0088aa9e;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 30px;
    padding: 10px 0;
    background-color: rgba(0, 136, 170, 0.04);"><div style="display: table-cell; vertical-align: middle">
    <i class="icon ion-android-alert" style="
    font-size: 50px;
    color: #0088aa;
    display: inline-block;
    padding-left: 25%;
"></i></div>
<div style="
    vertical-align: middle;
    display: table-cell;
    padding-left: 20px;
    padding-right: 20px;
    ">
The Media Node API is part of OpenVidu <a href="openvidu-pro/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin: 0 4px 0 4px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span></a> and <a href="openvidu-enterprise/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(156, 39, 176); color: white; font-weight: bold; padding: 0px 5px; margin: 0 4px 0 4px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">ENTERPRISE</span></a> editions.
</div>
</div>

##### Description

Add a new Media Node to the cluster.

##### Operation

|   ||
| - ||
| **METHOD**  | POST |
| **URL**     | https://`YOUR_OPENVIDUSERVER_IP`/openvidu/api/media-nodes |
| **HEADERS** | Authorization: Basic `EncodeBase64(OPENVIDUAPP:<YOUR_SECRET>)`<br/>Content-Type: application/json |
| **QUERY PARAMS** | `wait` |

##### Query params

| Parameter | Type | Default | Description |
| --------- | ---- | --------| ----------- |
| wait | Boolean | false | Whether to wait until the new Media Node reaches `running` status or not. Setting this property to true basically makes this method synchronized. You will not receive a response until the Media Node is properly running or an error is thrown |

> https://`YOUR_OPENVIDUSERVER_IP`/openvidu/api/media-nodes?wait=false

##### Body

Example for [On Premises deployments](deployment/pro/on-premises/):

```json
{
    "uri": "ws://172.17.0.5:8888/kurento",
    "environmentId": "myCustomInstance"
}
```

> - **uri** _(mandatory String only for [On Premises deployments](deployment/pro/on-premises/))_ : the websocket endpoint of a running Media Node. Should be something similar to `ws://media.server.ip:8888/kurento`. **This property is only necessary and is only taken into account [On Premises deployments](deployment/pro/on-premises/)**. For other deployment environments a new Media Node will be automatically launched completely ignoring parameter `uri`.
> - **environmentId** _(optional String only for [On Premises deployments](deployment/pro/on-premises/))_ : a custom environment id. This can help further identify your on premises Media Node.

Example for [AWS deployments](deployment/pro/aws/):

```json
{
    "instanceType": "c5.2xlarge",
    "volumeSize": 200
}
```

> - **instanceType** _(optional String only for [AWS deployments](deployment/pro/aws/))_ : a valid EC2 instance type. If specified, a Media Node will be created using the specified EC2 instance type. If not especified, value `AWS_INSTANCE_TYPE` in `/opt/openvidu/.env` will be used. **This property is only taken into account in [AWS deployments](deployment/pro/aws/)**.
> - **volumeSize** _(optional Number only for [AWS deployments](deployment/pro/aws/))_ : Volume size for the new Media Node in GB. If specified, the Media Node will be created with such disk volume size. If not especified, value `AWS_VOLUME_SIZE` in `/opt/openvidu/.env` will be used. **This property is only taken into account in [AWS deployments](deployment/pro/aws/)**.

##### Sample return

This operation returns the created [**Media Node object**](#the-media-node-object). Most of its properties won't be defined until the Media Node reaches `running` status. You can user query param `wait=true` to wait until the Media Node is running before receiving the response, or you can listen to [mediaNodeStatusChanged](reference-docs/openvidu-server-webhook/#medianodestatuschanged) webhook event.

##### HTTP responses

|||
| - ||
| 200 | The Media Node has been successfully added to the cluster |
| 400 | Problem with some body parameter |
| 404 | The Media Node is not within reach of OpenVidu Server. This simply means that OpenVidu cannot establish a connection with it. This may be caused by multiple reasons: wrong IP, port or path, a network problem, too strict a proxy configuration... |
| 405 | For [OpenVidu Enterprise HA](openvidu-enterprise/high-availability/) clusters this method is not allowed |
| 409 | The Media Node was already registered in OpenVidu Server as part of the cluster |
| 501 | The cluster is deployed [On Premises](deployment/pro/on-premises/) and no `uri` parameter was passed in the body request |
| 502 | The process of launching a new Media Node instance failed. This won't ever happen for [On Premises deployments](deployment/pro/on-premises/), where instances require to be previously launched |

<br>

---

### DELETE `/openvidu/api/media-nodes/<MEDIA_NODE_ID>` {:id=delete-medianode}

<div style="
    display: table;
    border: 2px solid #0088aa9e;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 30px;
    padding: 10px 0;
    background-color: rgba(0, 136, 170, 0.04);"><div style="display: table-cell; vertical-align: middle">
    <i class="icon ion-android-alert" style="
    font-size: 50px;
    color: #0088aa;
    display: inline-block;
    padding-left: 25%;
"></i></div>
<div style="
    vertical-align: middle;
    display: table-cell;
    padding-left: 20px;
    padding-right: 20px;
    ">
The Media Node API is part of OpenVidu <a href="openvidu-pro/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin: 0 4px 0 4px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span></a> and <a href="openvidu-enterprise/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(156, 39, 176); color: white; font-weight: bold; padding: 0px 5px; margin: 0 4px 0 4px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">ENTERPRISE</span></a> editions.
</div>
</div>

##### Description

Remove a Media Node from the cluster. If there are ongoing Sessions currently hosted by the Media Node and the deletion process is forced, all of the Sessions will be closed.

##### Operation

|   ||
| - ||
| **METHOD**  | DELETE |
| **URL**     | https://`YOUR_OPENVIDUSERVER_IP`/openvidu/api/media-nodes/`MEDIA_NODE_ID` |
| **HEADERS** | Authorization: Basic `EncodeBase64(OPENVIDUAPP:<YOUR_SECRET>)`<br/>Content-Type: application/x-www-form-urlencoded |
| **QUERY PARAMS** | `wait`,`deletion-strategy` |

##### Query params

| Parameter | Type | Default | Description |
| --------- | ---- | --------| ----------- |
| wait | Boolean | false | Whether to wait until the new Media Node reaches `terminated` status or not. Setting this property to true basically makes this method synchronized. You will not receive a response until the Media Node is fully terminated or an error is thrown |
| deletion&#8209;strategy | String | "if&#8209;no&#8209;sessions" | How should OpenVidu Pro proceed with the Media Node deletion. Can be: <ul style="margin-top:10px"><li style="color: inherit"><code><strong>now</strong></code> : OpenVidu Pro will remove the Media Node immediately. All OpenVidu sessions hosted by this Media Node will be closed with reason <code>mediaServerDisconnect</code> (all streams, participants and recordings of all these sessions will be stopped with this same reason)</li><li style="color: inherit"><code><strong>if-no-sessions</strong></code> : if there's any OpenVidu session initialized inside of this Media Node, then this operation will fail with HTTP status <strong>409</strong>. If the Media Node has no ongoing sessions, then OpenVidu Pro will remove it immediately, returning status <strong>204</strong>.</li> <li style="color: inherit"><code><strong>when-no-sessions</strong></code> : if there's any OpenVidu session initialized inside this Media Node, then it will not be immediately deleted, but instead will be set to `waiting-idle-to-terminate` status. This status means the Media Node is under quarantine and no more sessions will be initialized inside of it. Whenever the last session of this Media Node is destroyed (no matter the reason), then it will be automatically deleted. The response status will be <strong>202</strong> if this operation changed the Media Node to <code>waiting-idle-to-terminate</code> status and <strong>204</strong> if there were no ongoing sessions inside the Media Node and therefore OpenVidu Pro has deleted it.</li></ul> |

> https://`YOUR_OPENVIDUSERVER_IP`/openvidu/api/media-nodes/`MEDIA_NODE_ID`?wait=false&deletion-strategy=if-no-sessions

##### HTTP responses

|||
| - ||
| 202 | If query parameter `deletion-strategy` is set to `when-no-sessions`, then it means that the Media Node to be deleted has ongoing sessions inside of it. Media Node status has been set to `waiting-idle-to-terminate` |
| 204 | The Media Node was successfully removed |
| 404 | No Media Node exists for the passed `MEDIA_NODE_ID` |
| 405 | For [OpenVidu Enterprise HA](openvidu-enterprise/high-availability/) clusters this method is not allowed |
| 409 | If query parameter `deletion-strategy` is set to `if-no-sessions`, then it means that the Media Node to be deleted has ongoing sessions inside of it. No Media Node deletion will take place at all |
| 502 | Error while terminating the Media Node instance. This won't ever happen for [On Premises deployments](deployment/pro/on-premises/), where instances require manual shut down |

<br>

---

### PATCH `/openvidu/api/media-nodes/<MEDIA_NODE_ID>` {:id=patch-medianode}

<div style="
    display: table;
    border: 2px solid #0088aa9e;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 30px;
    padding: 10px 0;
    background-color: rgba(0, 136, 170, 0.04);"><div style="display: table-cell; vertical-align: middle">
    <i class="icon ion-android-alert" style="
    font-size: 50px;
    color: #0088aa;
    display: inline-block;
    padding-left: 25%;
"></i></div>
<div style="
    vertical-align: middle;
    display: table-cell;
    padding-left: 20px;
    padding-right: 20px;
    ">
The Media Node API is part of OpenVidu <a href="openvidu-pro/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin: 0 4px 0 4px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span></a> and <a href="openvidu-enterprise/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(156, 39, 176); color: white; font-weight: bold; padding: 0px 5px; margin: 0 4px 0 4px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">ENTERPRISE</span></a> editions.
</div>
</div>

##### Description

Modify the status of a Media Node. This method allows you to manually transition a Media Node through its [statuses](openvidu-pro/scalability/#media-node-statuses).

##### Operation

|   ||
| - ||
| **METHOD**  | PATCH |
| **URL**     | https://`YOUR_OPENVIDUSERVER_IP`/openvidu/api/media-nodes/`MEDIA_NODE_ID` |
| **HEADERS** | Authorization: Basic `EncodeBase64(OPENVIDUAPP:<YOUR_SECRET>)`<br/>Content-Type: application/json |

##### Body

```json
{
    "status": "terminating"
}
```

> - **status** _(mandatory String)_ : new desired status of the Media Node. Valid values are `canceled` (from `launching` status), `launching` (from `canceled` status), `waiting-idle-to-terminate` (from `running` status), `running` (from `waiting-idle-to-terminate`) and `terminating` (from both `running` and `waiting-idle-to-terminate`). Visit **[Media Node statuses](openvidu-pro/scalability/#media-node-statuses)** to understand the Media Node lifecycle

##### Sample return

This operation returns the modified [**Media Node object**](#the-media-node-object).

##### HTTP responses

|||
| - ||
| 200 | The Media Node has been successfully modified |
| 204 | The Media Node has not been modified because its status was the same as the provided through body parameters |
| 400 | Problem with some body parameter. This means the Media Node cannot transition from its current status to the indicated one in the `status` request body parameter |
| 404 | No Media Node exists for the passed `MEDIA_NODE_ID` |
| 405 | For [OpenVidu Enterprise HA](openvidu-enterprise/high-availability/) clusters this method is not allowed |

<br>

---

### PUT `/openvidu/api/media-nodes` {:id=put-medianode}

<div style="
    display: table;
    border: 2px solid #0088aa9e;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 30px;
    padding: 10px 0;
    background-color: rgba(0, 136, 170, 0.04);"><div style="display: table-cell; vertical-align: middle">
    <i class="icon ion-android-alert" style="
    font-size: 50px;
    color: #0088aa;
    display: inline-block;
    padding-left: 25%;
"></i></div>
<div style="
    vertical-align: middle;
    display: table-cell;
    padding-left: 20px;
    padding-right: 20px;
    ">
The Media Node API is part of OpenVidu <a href="openvidu-pro/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin: 0 4px 0 4px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span></a> and <a href="openvidu-enterprise/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(156, 39, 176); color: white; font-weight: bold; padding: 0px 5px; margin: 0 4px 0 4px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">ENTERPRISE</span></a> editions.
</div>
</div>

##### Description

Autodiscover Media Nodes. This method makes OpenVidu Server search for reachable, running Media Nodes that are not part of the cluster yet. This can be useful in case a Media Node was launched by any other means than OpenVidu itself: this method is the only way to automatically add these Media Nodes to the running cluster.

##### Operation

|   ||
| - ||
| **METHOD**  | PUT |
| **URL**     | https://`YOUR_OPENVIDUSERVER_IP`/openvidu/api/media-nodes |
| **HEADERS** | Authorization: Basic `EncodeBase64(OPENVIDUAPP:<YOUR_SECRET>)` |

##### Sample return

```json
{
    "numberOfElements": 0,
    "content": []
}
```

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| numberOfElements | Number | Total number of newly autodiscovered Media Nodes |
| content | Array of Objects | Array of newly autodiscovered [**Media Node objects**](#the-media-node-object) |

##### HTTP responses

|||
| - ||
| 200 | Autodiscovery process has completed |
| 405 | For [OpenVidu Enterprise HA](openvidu-enterprise/high-availability/) clusters this method is not allowed |

<br>

---

## Others

### POST `/openvidu/api/tokens` {:id=post-token}

<div class="warningBoxContent">
  <div style="display: table-cell; vertical-align: middle;">
      <i class="icon ion-android-alert warningIcon"></i>
  </div>
  <div class="warningBoxText">
    The Token API is deprecated. Use the Connection API: instead of generating a Token with <a href="#post-token"><strong>POST /openvidu/api/tokens</strong></a>, create a Connection with <a href="#post-connection"><strong>POST /openvidu/api/sessions/&lt;SESSION_ID&gt;/connection</strong></a>
  </div>
</div>

##### Description

Generate a token for a Session. This token must be sent to the client side to be used in openvidu-browser library to connect to the Session.

##### Operation

|   ||
| - ||
| **METHOD**  | POST |
| **URL**     | https://`YOUR_OPENVIDUSERVER_IP`/openvidu/api/tokens |
| **HEADERS** | Authorization: Basic `EncodeBase64(OPENVIDUAPP:<YOUR_SECRET>)`<br/>Content-Type: application/json |

##### Body

```json
{
  "session": "SESSION_ID",
  "role": "PUBLISHER",
  "data": "DATA",
  "kurentoOptions": {
      "videoMaxRecvBandwidth": 1000,
      "videoMinRecvBandwidth": 300,
      "videoMaxSendBandwidth": 1000,
      "videoMinSendBandwidth": 300,
      "allowedFilters": [ "GStreamerFilter", "ZBarFilter" ]
  }
}
```

> - **session** _(mandatory String)_ : the sessionId for which the token should be associated.<br><br>
> - **role** _(optional String. Check [OpenViduRole](api/openvidu-node-client/enums/openvidurole.html) section of OpenVidu Node Client for a complete description)_
>     - `SUBSCRIBER`
>     - `PUBLISHER` _(default)_
>     - `MODERATOR`<br><br>
> - **data** _(optional String)_ : metadata associated to this token. Usually participant's information.<br><br>
> - **kurentoOptions** _(optional Object)_ : you can set some configuration properties for the participant owning this token regarding Kurento. This is a JSON object with the following optional properties:<br><br>
>     - **videoMaxRecvBandwidth** _(optional Number)_ : maximum number of Kbps that the client owning the token will be able to receive from Kurento Media Server. 0 means unconstrained. Giving a value to this property will override the global configuration set in _[OpenVidu configuration](reference-docs/openvidu-config)_ (parameter `OPENVIDU_STREAMS_VIDEO_MAX_RECV_BANDWIDTH`) for every incoming stream of the user owning the token. _**WARNING**: the lower value set to this property limits every other bandwidth of the WebRTC pipeline this server-to-client stream belongs to. This includes the user publishing the stream and every other user subscribed to the same stream._<br><br>
>     - **videoMinRecvBandwidth** _(optional Number)_ : minimum number of Kbps that the client owning the token will try to receive from Kurento Media Server. 0 means unconstrained. Giving a value to this property will override the global configuration set in _[OpenVidu configuration](reference-docs/openvidu-config)_ (parameter `OPENVIDU_STREAMS_VIDEO_MIN_RECV_BANDWIDTH`) for every incoming stream of the user owning the token.<br><br>
>     - **videoMaxSendBandwidth** _(optional Number)_ : maximum number of Kbps that the client owning the token will be able to send to Kurento Media Server. 0 means unconstrained. Giving a value to this property will override the global configuration set in _[OpenVidu configuration](reference-docs/openvidu-config)_ (parameter `OPENVIDU_STREAMS_VIDEO_MAX_SEND_BANDWIDTH`) for every outgoing stream of the user owning the token. _**WARNING**: this value limits every other bandwidth of the WebRTC pipeline this client-to-server stream belongs to. This includes every other user subscribed to the stream._<br><br>
>     - **videoMinSendBandwidth** _(optional Number)_ : minimum number of Kbps that the client owning the token will try to send to Kurento Media Server. 0 means unconstrained. Giving a value to this property will override the global configuration set in _[OpenVidu configuration](reference-docs/openvidu-config)_ (parameter `OPENVIDU_STREAMS_VIDEO_MIN_SEND_BANDWIDTH`) for every outgoing stream of the user owning the token.<br><br>
>     - **allowedFilters** _(optional array of strings)_ : names of the filters the user owning the token will be able to apply (see [Voice and video filters](advanced-features/filters/)).

##### Returns

This operation returns a Token object:

```json
{
    "id": "wss://localhost:4443?sessionId=ses_YnDaGYNcd7&token=tok_HCGhiWHWX6hC9el4&role=PUBLISHER&version=2.16.0&coturnIp=localhost&turnUsername=C4LVAW&turnCredential=3hbpdz&webrtcStatsInterval=0",
    "token": "wss://localhost:4443?sessionId=ses_YnDaGYNcd7&token=tok_HCGhiWHWX6hC9el4&role=PUBLISHER&version=2.16.0&coturnIp=localhost&turnUsername=C4LVAW&turnCredential=3hbpdz&webrtcStatsInterval=0",
    "connectionId": "con_Xnxg19tonh",
    "createdAt": 1538481996024,
    "session": "ses_YnDaGYNcd7",
    "role": "PUBLISHER",
    "data": "MY_SERVER_DATA",
    "record": true,
    "kurentoOptions": {
        "videoMaxRecvBandwidth": 1000,
        "videoMinRecvBandwidth": 300,
        "videoMaxSendBandwidth": 1000,
        "videoMinSendBandwidth": 300,
        "allowedFilters": [
            "GStreamerFilter",
            "ZBarFilter"
        ]
    }
}
```

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| id | String | Token value. Send it to one client to pass it as parameter in openvidu-browser method [Session.connect](api/openvidu-browser/classes/Session.html#connect) |
| token | String | Same value as `id` |
| connectionId | String | Connection identifier that will be assigned to the user consuming this token |
| createdAt | Number | Time when the token was created in UTC milliseconds |
| session | String | Identifier of the session for which this token is valid |
| role | String | Role of the token. Check [OpenViduRole](api/openvidu-node-client/enums/openvidurole.html) section of OpenVidu Node Client for a complete description |
| data | String | Metadata associated to this token. Usually participant's information |
| record | Boolean | Whether the streams published by the participant owning this token will be recorded or not. This only affects [INDIVIDUAL recording](advanced-features/recording/#individual-recording-selection) <a href="openvidu-pro/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin-left: 5px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span></a> |
| kurentoOptions | Object | Configuration properties for the participant owning this token regarding Kurento. See a complete description of them in the body of [POST /openvidu/api/tokens](#body_1) |

##### HTTP responses

|||
| - ||
| 200 | Token successfully created and ready to be used by one client to connect to the associated session |
| 400 | Problem with some body parameter |
| 404 | Provided value for `session` parameter was not found in OpenVidu Server. You must first call [**POST /openvidu/api/sessions**](#post-session) to get a session id |

<br>

---

### DELETE `/openvidu/api/sessions/<SESSION_ID>/stream/<STREAM_ID>` {:id=delete-stream}

##### Description

Force the unpublishing of a media stream from a Session. The stream belongs to a specific [Connection obejct](#the-connection-object). All subscribers receiving this stream will also be destroyed.

##### Operation

|   ||
| - ||
| **METHOD**  | DELETE |
| **URL**     | https://`YOUR_OPENVIDUSERVER_IP`/openvidu/api/sessions/`SESSION_ID`/stream/`STREAM_ID` |
| **HEADERS** | Authorization: Basic `EncodeBase64(OPENVIDUAPP:<YOUR_SECRET>)` |

##### HTTP responses

|||
| - ||
| 204 | The stream has been successfully unpublished. Every participant will have received the proper [**streamDestroyed**](api/openvidu-browser/classes/StreamEvent.html) event in OpenVidu Browser with "reason" property set to "forceUnpublishByServer" |
| 400 | No session exists for the passed `SESSION_ID` |
| 404 | No stream exists for the passed `STREAM_ID` |
| 405 | You cannot directly delete the stream of an IPCAM participant (any participant created with method [**POST /openvidu/api/sessions/&lt;SESSION_ID&gt;/connection**](#post-connection)). Instead you must delete the connection object with [**DELETE /openvidu/api/sessions/&lt;SESSION_ID&gt;/connection/&lt;CONNECTION_ID&gt;**](#delete-connection) |

<br>

---

### POST `/openvidu/api/signal` {:id=post-signal}

##### Description

Send a signal to a Session, to specific [Connections](#the-connection-object) or as a broadcast message to all Connections. This is the server-side implementation of the client operation [**Session.signal**](api/openvidu-browser/classes/Session.html#signal).

##### Operation

|   ||
| - ||
| **METHOD**  | POST |
| **URL**     | https://`YOUR_OPENVIDUSERVER_IP`/openvidu/api/signal |
| **HEADERS** | Authorization: Basic `EncodeBase64(OPENVIDUAPP:<YOUR_SECRET>)`<br/>Content-Type: application/json |

##### Body

```json
{
    "session":"ses_YnDaGYNcd7",
    "to": ["con_Xnxg19tonh", "con_TNVdbuQCJF"],
    "type":"MY_TYPE",
    "data":"This is my signal data"
}
```

> - **session** _(mandatory String)_ : the sessionId of the session you want to send the signal to.<br><br>
> - **to** _(optional Array of String)_ : list of connection identifiers to which you want to send the signal. If this property is not included or is an empty array, the signal will be sent to all participants of the session.<br><br>
> - **type** _(optional String)_ : type of the signal. In the body example above, only users subscribed to `Session.on('signal:MY_TYPE')` will trigger that signal. Users subscribed to `Session.on('signal')` will trigger signals of any type.<br><br>
> - **data** _(optional String)_ : actual data of the signal.

##### HTTP responses

|||
| - ||
| 200 | Signal successfully sent. This doesn't necessary mean that all the intended recipients will have received it correctly. If any user has lost its connection to OpenVidu Server during this process, it may not receive the signal |
| 400 | There is a problem with some body parameter |
| 404 | No session exists for the passed `session` body parameter |
| 406 | No connection exists for the passed `to` array. This error may be triggered if the session has no connected participants or if you provide some string value that does not correspond to a valid connectionId of the session (even though others may be correct) |

<br>

---

### GET `/openvidu/api/config` {:id=get-config}

##### Description

Retrieve current [OpenVidu configuration](reference-docs/openvidu-config/).

##### Operation

|   ||
| - ||
| **METHOD**  | GET |
| **URL**     | https://`YOUR_OPENVIDUSERVER_IP`/openvidu/api/config |
| **HEADERS** | Authorization: Basic `EncodeBase64(OPENVIDUAPP:<YOUR_SECRET>)` |

##### Returns

Returns an object with the current [OpenVidu configuration](reference-docs/openvidu-config/). This is an example of the object returned by OpenVidu CE:

```json
{
    "VERSION": "2.16.0",
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
    "OPENVIDU_RECORDING_VERSION": "2.16.0",
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
    ]
}
```

This is an example of an object returned by OpenVidu Pro. It includes all properties of [OpenVidu CE configuration](reference-docs/openvidu-config/#configuration-parameters-for-openvidu-ce) and others unique to [OpenVidu Pro configuration](reference-docs/openvidu-config/#configuration-parameters-for-openvidu-pro):

```json
{
    "VERSION": "2.15.1",
    "OPENVIDU_SERVER_DEPENDENCY_VERSION": "2.16.0",
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
    "OPENVIDU_RECORDING_VERSION": "2.16.0",
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
    "OPENVIDU_PRO_STATS_MONITORING_INTERVAL": 10,
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
    "OPENVIDU_PRO_NETWORK_QUALITY": true,
    "OPENVIDU_PRO_NETWORK_QUALITY_INTERVAL": 10,
    "OPENVIDU_PRO_ELASTICSEARCH": true,
    "OPENVIDU_PRO_ELASTICSEARCH_HOST": "http://127.0.0.1:9200",
    "OPENVIDU_PRO_ELASTICSEARCH_VERSION": "7.8.0",
    "OPENVIDU_PRO_KIBANA": true,
    "OPENVIDU_PRO_KIBANA_HOST": "http://127.0.0.1/kibana",
    "OPENVIDU_PRO_KIBANA_VERSION": "7.8.0",
    "OPENVIDU_PRO_RECORDING_STORAGE": "local"
}
```

##### HTTP responses

|||
| - ||
| 200 | OpenVidu configuration has been successfully retrieved |

<br>

---

### GET `/openvidu/api/health` {:id=get-health}

<div style="
    display: table;
    border: 2px solid #0088aa9e;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 30px;
    padding: 10px 0;
    background-color: rgba(0, 136, 170, 0.04);"><div style="display: table-cell; vertical-align: middle">
    <i class="icon ion-android-alert" style="
    font-size: 50px;
    color: #0088aa;
    display: inline-block;
    padding-left: 25%;
"></i></div>
<div style="
    vertical-align: middle;
    display: table-cell;
    padding-left: 20px;
    padding-right: 20px;
    ">
Health API is part of OpenVidu <a href="openvidu-pro/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin: 0 4px 0 4px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span></a> and <a href="openvidu-enterprise/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(156, 39, 176); color: white; font-weight: bold; padding: 0px 5px; margin: 0 4px 0 4px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">ENTERPRISE</span></a> editions.
</div>
</div>

##### Description

Check the health status of the OpenVidu Pro cluster. An OpenVidu Pro cluster is healthy if Master Node is up and there is at least one Media Node running and connected to the cluster (see [OpenVidu Pro architecture](openvidu-pro/scalability/#openvidu-pro-architecture)).

##### Operation

|   ||
| - ||
| **METHOD**  | GET |
| **URL**     | https://`YOUR_OPENVIDUSERVER_IP`/openvidu/api/health |
| **HEADERS** | Authorization: Basic `EncodeBase64(OPENVIDUAPP:<YOUR_SECRET>)` |

##### Sample return

```json
{
    "status": "UP"
}
```

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| status | String | Health status of the OpenVidu Pro cluster. Can be `UP` or `DOWN` |

##### HTTP responses

|||
| - ||
| 200 | Health status is `UP` |
| 503 | Health status is `DOWN` |

<br>

---

### POST `/openvidu/api/restart` {:id=post-restart}

<div style="
    display: table;
    border: 2px solid #0088aa9e;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 30px;
    padding: 10px 0;
    background-color: rgba(0, 136, 170, 0.04);"><div style="display: table-cell; vertical-align: middle">
    <i class="icon ion-android-alert" style="
    font-size: 50px;
    color: #0088aa;
    display: inline-block;
    padding-left: 25%;
"></i></div>
<div style="
    vertical-align: middle;
    display: table-cell;
    padding-left: 20px;
    padding-right: 20px;
    ">
Restart API is part of OpenVidu <a href="openvidu-pro/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin: 0 4px 0 4px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span></a> and <a href="openvidu-enterprise/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(156, 39, 176); color: white; font-weight: bold; padding: 0px 5px; margin: 0 4px 0 4px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">ENTERPRISE</span></a> editions.
</div>
</div>

##### Description

Restart OpenVidu Server Pro programmatically. This helps easily modifying configuration properties and cleaning up any possible stranded process or file.

##### Operation

|   ||
| - ||
| **METHOD**  | POST |
| **URL**     | https://`YOUR_OPENVIDUSERVER_IP`/openvidu/api/restart |
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
    "OPENVIDU_PRO_NETWORK_QUALITY": true,
    "OPENVIDU_PRO_NETWORK_QUALITY_INTERVAL": 5,
    "OPENVIDU_PRO_STATS_WEBRTC_INTERVAL":20
}
```

> The body of the POST request is a JSON object with the new configuration properties to be applied on the restart process. These include [OpenVidu CE configuration properties](reference-docs/openvidu-config/#configuration-parameters-for-openvidu-ce), [OpenVidu Pro configuration properties](reference-docs/openvidu-config/#configuration-parameters-for-openvidu-pro) and [OpenVidu Enterprise configuration properties](reference-docs/openvidu-config/#configuration-parameters-for-openvidu-enterprise). All of them are optional. Not all properties can be modified this way. Others require a manual update.
> 
> The list of properties that **MAY NOT BE MODIFIED** through this method is available below. All other properties are modifiable. Visit the configuration docs for a detailed description of each one of them.
>
> ---
>
> - **DOMAIN_OR_PUBLIC_IP**
> - **CERTIFICATE_TYPE**
> - **HTTP_PORT**
> - **HTTPS_PORT**
> - **OPENVIDU_SECRET**
> - **OPENVIDU_PRO_LICENSE**
> - **OPENVIDU_PRO_STATS_MONITORING_INTERVAL**
> - **OPENVIDU_PRO_CLUSTER_TEST**
> - **ELASTICSEARCH_USERNAME**
> - **ELASTICSEARCH_PASSWORD**
> - **KMS_IMAGE**
> - **MEDIASOUP_IMAGE**
> - **OPENVIDU_EDITION**
> - **OPENVIDU_ENTERPRISE_MEDIA_SERVER**
> - **OPENVIDU_PRO_ELASTICSEARCH_HOST**
> - **OPENVIDU_PRO_KIBANA_HOST**
> - **COTURN_IP**
> - **COTURN_PORT**
> - **COTURN_INTERNAL_RELAY**

##### HTTP responses

|||
| - ||
| 200 | The restarting process has been initialized. All properties are valid and OpenVidu Server should restart properly |
| 400 | There is some problem with a body parameter. The error message will provide further details |

<div></div>

> **NOTES**
>
> This method will restart OpenVidu Server Pro with the new provided configuration parameters. For those parameters for which no value has been provided, the previous existing value will be used. The changed properties are persistent: the new applied values **will be stored in disk** in your configuration file, so you will be able to restart the host without losing the changed configuration.

<br>

---

### POST `/openvidu/api/speech-to-text/load` {:id=post-speech-to-text}

<div style="
    display: table;
    border: 2px solid #0088aa9e;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 30px;
    padding: 10px 0;
    background-color: rgba(0, 136, 170, 0.04);"><div style="display: table-cell; vertical-align: middle">
    <i class="icon ion-android-alert" style="
    font-size: 50px;
    color: #0088aa;
    display: inline-block;
    padding-left: 25%;
"></i></div>
<div style="
    vertical-align: middle;
    display: table-cell;
    padding-left: 20px;
    padding-right: 20px;
    ">
Speech to Text API is part of OpenVidu <a href="openvidu-pro/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin: 0 4px 0 4px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span></a> and <a href="openvidu-enterprise/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(156, 39, 176); color: white; font-weight: bold; padding: 0px 5px; margin: 0 4px 0 4px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">ENTERPRISE</span></a> editions.
</div>
</div>

##### Description

Load a Speech to Text language model in a Media Node. This operation is available when [Speech to Text](advanced-features/speech-to-text) is enabled.
The following [environment variables](reference-docs/openvidu-config/#configuration-parameters-for-openvidu-pro) impact the behavior of this operation:

- **`OPENVIDU_PRO_SPEECH_TO_TEXT`**: it must be set to `vosk` for the operation to be available. Other Speech to Text engines do not require language model management.<br><br>
- **`OPENVIDU_PRO_SPEECH_TO_TEXT_VOSK_MODEL_LOAD_STRATEGY`**:
    - If set to `manual`: the operation is mandatory. Language models must be manually loaded into Media Nodes before clients may enable Speech to Text transcriptions. An error will be return to the client if the required language model is not loaded in the required Media Node when calling [Session.subscribeToSpeechToText](api/openvidu-browser/classes/Session.html#subscribeToSpeechToText) method.
    - If set to `on_demand`: the operation is possible but not mandatory. You can still decide when to load a language model in a Media Node, but if a client enables Speech to Text transcriptions and the required Media Node does not have the required language model available in memory, it will automatically load it.

##### Operation

|   ||
| - ||
| **METHOD**  | POST |
| **URL**     | https://`YOUR_OPENVIDUSERVER_IP`/openvidu/api/speech-to-text/load |
| **HEADERS** | Authorization: Basic `EncodeBase64(OPENVIDUAPP:<YOUR_SECRET>)`<br/>Content-Type: application/json |

##### Body

```json
{
    "lang": "en-US",
    "mediaNode": {
        "id": "media_i-0c58bcdd26l11d0sd"
    }
}
```

> - **lang** _(mandatory String)_ : The language model to load.<br><br>
> - **mediaNode** _(mandatory Object)_: An object with the Media Node selector to where to load the language model. Right now it may only have a single property `id` with a Media Node identifier. That is the `id` property of a [Media Node object](#the-media-node-object).

##### HTTP responses

|||
| - ||
| 200 | The language model has been successfully loaded into the specified Media Node |
| 400 | There is some problem with a body parameter. The error message will provide further details |
| 404 | The language model cannot be found in the Media Node |
| 409 | The language model is already loaded in the specified Media Node |
| 501 | Speech to Text module is disabled or configured with an engine that does not support language model management. Configuration property `OPENVIDU_PRO_SPEECH_TO_TEXT` must be set to `vosk` |

<br>

---

### POST `/openvidu/api/speech-to-text/unload` {:id=delete-speech-to-text}

<div style="
    display: table;
    border: 2px solid #0088aa9e;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 30px;
    padding: 10px 0;
    background-color: rgba(0, 136, 170, 0.04);"><div style="display: table-cell; vertical-align: middle">
    <i class="icon ion-android-alert" style="
    font-size: 50px;
    color: #0088aa;
    display: inline-block;
    padding-left: 25%;
"></i></div>
<div style="
    vertical-align: middle;
    display: table-cell;
    padding-left: 20px;
    padding-right: 20px;
    ">
Speech to Text API is part of OpenVidu <a href="openvidu-pro/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin: 0 4px 0 4px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span></a> and <a href="openvidu-enterprise/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(156, 39, 176); color: white; font-weight: bold; padding: 0px 5px; margin: 0 4px 0 4px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">ENTERPRISE</span></a> editions.
</div>
</div>

##### Description

Unload a Speech to Text language model from a Media Node. This operation is available when [Speech to Text](advanced-features/speech-to-text) is enabled.
The following [environment variables](reference-docs/openvidu-config/#configuration-parameters-for-openvidu-pro) impact the behavior of this operation:

- **`OPENVIDU_PRO_SPEECH_TO_TEXT`**: it must be set to `vosk` for the operation to be available. Other Speech to Text engines do not require language model management.<br><br>
- **`OPENVIDU_PRO_SPEECH_TO_TEXT_VOSK_MODEL_LOAD_STRATEGY`**:
    - If set to `manual`: the operation is not mandatory but recommended. Unloading unused language models from Media Nodes is advisable, as depending on the model a good amount of the server's memory could be occupied by it.
    - If set to `on_demand`: the operation is possible, but the only case in which it could make sense is to unload a language model that is not going to be finally used. As soon as a model is required, the automatic unload of the model is guaranteed once it is no longer needed. If the model is being used, a `405` HTTP status will be returned when calling this operation.

##### Operation

|   ||
| - ||
| **METHOD**  | POST |
| **URL**     | https://`YOUR_OPENVIDUSERVER_IP`/openvidu/api/speech-to-text/unload |
| **HEADERS** | Authorization: Basic `EncodeBase64(OPENVIDUAPP:<YOUR_SECRET>)`<br/>Content-Type: application/json |

##### Body

```json
{
    "lang": "en-US",
    "mediaNode": {
        "id": "media_i-0c58bcdd26l11d0sd"
    }
}
```

> - **lang** _(mandatory String)_ : The language model to load.<br><br>
> - **mediaNode** _(mandatory Object)_: An object with the Media Node selector to where to load the language model. Right now it may only have a single property `id` with a Media Node identifier. That is the `id` property of a [Media Node object](#the-media-node-object).

##### HTTP responses

|||
| - ||
| 200 | The language model has been successfully unloaded from the specified Media Node |
| 400 | There is some problem with a body parameter. The error message will provide further details |
| 404 | The language model cannot be found in the Media Node |
| 405 | The language model cannot be unloaded as it is currently in use in the Media Node |
| 409 | The language model is not loaded in the specified Media Node |
| 501 | Speech to Text module is disabled or configured with an engine that does not support language model management. Configuration property `OPENVIDU_PRO_SPEECH_TO_TEXT` must be set to `vosk` |

<br>