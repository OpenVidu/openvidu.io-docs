<h2 id="section-title">REST API</h2>
<hr>

You have full control over OpenVidu Server through its REST API. All of the REST API operations exposed by OpenVidu Server...

- Share the same base path `/openvidu/api/`
- Share the same Authorization header. It is implemented via Basic Auth, and it is as simple as applying Base64 encoding to the username (always "OPENVIDUAPP") and the password ([configuration property](reference-docs/openvidu-config/){:target="blank"}`OPENVIDU_SECRET`). All REST API operations return HTTP status `401` if the Authorization header is wrong or not provided. For example, for secret "MY_SECRET" the final HTTP header would be:

> `Authorization: Basic T1BFTlZJRFVBUFA6TVlfU0VDUkVU`

### List of available operations
<br>

- Initialize a session: [**POST /openvidu/api/sessions**](#post-openviduapisessions)
- Generate a token: [**POST /openvidu/api/tokens**](#post-openviduapitokens)
- Retrieve active session info: [**GET /openvidu/api/sessions/&lt;SESSION_ID&gt;**](#get-openviduapisessionsltsession_idgt)
- Retrieve all active sessions info: [**GET /openvidu/api/sessions**](#get-openviduapisessions)
- Send a signal to a session: [**POST /openvidu/api/signal**](#post-openviduapisignal)
- Close a session: [**DELETE /openvidu/api/sessions/&lt;SESSION_ID&gt;**](#delete-openviduapisessionsltsession_idgt)
- Force the disconnection of a user from a session: [**DELETE /openvidu/api/sessions/&lt;SESSION_ID&gt;/connection/&lt;CONNECTION_ID&gt;**](#delete-openviduapisessionsltsession_idgtconnectionltconnection_idgt)
- Force the unpublishing of a user's stream from a session: [**DELETE /openvidu/api/sessions/&lt;SESSION_ID&gt;/stream/&lt;STREAM_ID&gt;**](#delete-openviduapisessionsltsession_idgtstreamltstream_idgt)
- Publish a stream from an IP camera: [**POST /openvidu/api/sessions/&lt;SESSION_ID&gt;/connection**](#post-openviduapisessionsltsession_idgtconnection)
- Start the recording of a session: [**POST /openvidu/api/recordings/start**](#post-openviduapirecordingsstart)
- Stop the recording of a session: [**POST /openvidu/api/recordings/stop/&lt;RECORDING_ID&gt;**](#post-openviduapirecordingsstopltrecording_idgt)
- Get recording info: [**GET /openvidu/api/recordings/&lt;RECORDING_ID&gt;**](#get-openviduapirecordingsltrecording_idgt)
- Get all recordings info: [**GET /openvidu/api/recordings**](#get-openviduapirecordings)
- Delete a recording: [**DELETE /openvidu/api/recordings/&lt;RECORDING_ID&gt;**](#delete-openviduapirecordingsltrecording_idgt)
- Get OpenVidu active configuration: [**GET /openvidu/api/config**](#get-openviduapiconfig)

### Objects
<br>

- [**Session object**](#session-object)
- [**Connection object**](#connection-object)
- [**Recording object**](#recording-object)

<br>

---

<div class="rest-api-section"></div>

### POST `/openvidu/api/sessions`

##### Description

Initialize a session in OpenVidu Server. This is the very first operation to perform in order to establish an OpenVidu session. Then tokens for the session can be generated and passed to be consumed in the client side.

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
    "recordingMode": "ALWAYS",
    "customSessionId": "CUSTOM_SESSION_ID",
    "defaultOutputMode": "COMPOSED",
    "defaultRecordingLayout": "BEST_FIT",
    "defaultCustomLayout": "CUSTOM_LAYOUT"
}
```

> - **mediaMode** _(optional String)_
>     - `ROUTED` _(default)_ : Media streams will be routed through OpenVidu Server. This Media Mode is mandatory for session recording.
>     - Not available yet: `RELAYED`<br><br>
> - **recordingMode** _(optional String)_
>     - `ALWAYS`: Automatic recording from the first user publishing until the last participant leaves the session.
>     - `MANUAL` _(default)_ : If you want to manage when start and stop the recording.<br><br>
> - **customSessionId** _(optional String)_
>     - You can fix the `sessionId` that will be assigned to the session with this parameter. If you make another request with the exact same `customSessionId` while previous session already exists, no session will be created and a `409` http response will be returned. If this parameter is an empty string or not sent at all, OpenVidu Server will generate a random sessionId for you. If set, it must be an alphanumeric string: allowed numbers [`0-9`], letters [`a-zA-Z`], dashes (`-`) and underscores (`_`).<br><br>
> - **defaultOutputMode** _(optional String)_
>     - `COMPOSED`_(default)_ : when recording the session, all streams will be composed in the same file in a grid layout.
>     - `INDIVIDUAL`: when recording the session, every stream is recorded in its own file.
>     - `COMPOSED_QUICK_START` : same as `COMPOSED`, but the recording will start much quicker in exchange for a higher CPU usage during the lifespan of the session (see [Composed quick start recording](advanced-features/recording/#composed-quick-start-recording){:target="blank"} for further information). <br><br>
> - **defaultRecordingLayout** _(optional String. Only applies if `defaultOutputMode` is set to `COMPOSED`)_
>     - `BEST_FIT`_(default)_ : A grid layout where all the videos are evenly distributed.
>     - `CUSTOM`: Use your own custom layout. See [Custom recording layouts](advanced-features/recording/#custom-recording-layouts){:target="blank"} section to learn how.
>     - Not available yet: `PICTURE_IN_PICTURE`, `VERTICAL_PRESENTATION`, `HORIZONTAL_PRESENTATION`<br><br>
> - **defaultCustomLayout** _(optional String. Only applies if `defaultRecordingLayout` is set to `CUSTOM`)_
>     - A relative path indicating the custom recording layout to be used if more than one is available. Default to empty string (if so custom layout expected under path set with [openvidu-server configuration](reference-docs/openvidu-config/){:target="blank"} property `OPENVIDU_RECORDING_CUSTOM_LAYOUT`).

##### Sample return

```json
{
    "id": "ses_YnDaGYNcd7",
    "createdAt": 1538481996019
}
```

||||
| - |||
| id | String | Session successfully created and sessionId ready to be used |
| createdAt | Number | Problem with some body parameter |

##### HTTP responses

|||
| - ||
| 200 | Session successfully created and sessionId ready to be used |
| 400 | Problem with some body parameter |
| 409 | Parameter `customSessionId` corresponds to an existing session. There has been no change at all in the state of OpenVidu Server. You can proceed to use the rejected custom sessionId as usual without a problem |

<br>

---

### POST `/openvidu/api/tokens`

##### Description

Generate a token for a session. This token must be sent to the client side to be used in openvidu-browser library to connect to the session.

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
> - **role** _(optional string. Check [OpenViduRole](api/openvidu-node-client/enums/openvidurole.html){:target="blank"} section of OpenVidu Node Client for a complete description)_
>     - `SUBSCRIBER`
>     - `PUBLISHER` _(default)_
>     - `MODERATOR`<br><br>
> - **data** _(optional String)_ : metadata associated to this token (usually participant's information).<br><br>
> - **record** _(optional Boolean)_ : whether to record the streams published by the participant owning this token. This only affects [INDIVIDUAL recording](advanced-features/recording/#selecting-streams-to-be-recorded){:target="blank"}. Default to `true`.<br><br>
> - **kurentoOptions** _(optional Object)_ : you can set some configuration properties for the participant owning this token regarding Kurento. This is a JSON object with the following optional properties:<br><br>
>     - **videoMaxRecvBandwidth** _(optional Number)_ : maximum number of Kbps that the client owning the token will be able to receive from Kurento Media Server. 0 means unconstrained. Giving a value to this property will override the global configuration set in _[OpenVidu configuration](reference-docs/openvidu-config){:target="blank"}_ (parameter `OPENVIDU_STREAMS_VIDEO_MAX_RECV_BANDWIDTH`) for every incoming stream of the user owning the token. _**WARNING**: the lower value set to this property limits every other bandwidth of the WebRTC pipeline this server-to-client stream belongs to. This includes the user publishing the stream and every other user subscribed to the same stream._<br><br>
>     - **videoMinRecvBandwidth** _(optional Number)_ : minimum number of Kbps that the client owning the token will try to receive from Kurento Media Server. 0 means unconstrained. Giving a value to this property will override the global configuration set in _[OpenVidu configuration](reference-docs/openvidu-config){:target="blank"}_ (parameter `OPENVIDU_STREAMS_VIDEO_MIN_RECV_BANDWIDTH`) for every incoming stream of the user owning the token.<br><br>
>     - **videoMaxSendBandwidth** _(optional Number)_ : maximum number of Kbps that the client owning the token will be able to send to Kurento Media Server. 0 means unconstrained. Giving a value to this property will override the global configuration set in _[OpenVidu configuration](reference-docs/openvidu-config){:target="blank"}_ (parameter `OPENVIDU_STREAMS_VIDEO_MAX_SEND_BANDWIDTH`) for every outgoing stream of the user owning the token. _**WARNING**: this value limits every other bandwidth of the WebRTC pipeline this client-to-server stream belongs to. This includes every other user subscribed to the stream._<br><br>
>     - **videoMinSendBandwidth** _(optional Number)_ : minimum number of Kbps that the client owning the token will try to send to Kurento Media Server. 0 means unconstrained. Giving a value to this property will override the global configuration set in _[OpenVidu configuration](reference-docs/openvidu-config){:target="blank"}_ (parameter `OPENVIDU_STREAMS_VIDEO_MIN_SEND_BANDWIDTH`) for every outgoing stream of the user owning the token.<br><br>
>     - **allowedFilters** _(optional array of strings)_ : names of the filters the user owning the token will be able to apply (see [Voice and video filters](advanced-features/filters/){:target="blank"}).

##### Sample return

```json
{
    "token": "wss://my.openvidu.ip?sessionId=ses_YnDaGYNcd7&token=lnlrtnkwm4v8l&role=PUBLISHER&turnUsername=FYYNRC&turnCredential=yfxxs3",
    "id": "wss://my.openvidu.ip?sessionId=ses_YnDaGYNcd7&token=lnlrtnkwm4v8l&role=PUBLISHER&turnUsername=FYYNRC&turnCredential=yfxxs3",
    "session": "ses_YnDaGYNcd7",
    "role": "PUBLISHER",
    "data": "My Server Data",
    "record": true,
    "kurentoOptions": {
        "videoMaxRecvBandwidth": 1000,
        "videoMinRecvBandwidth": 300,
        "videoMaxSendBandwidth": 1000,
        "videoMinSendBandwidth": 300,
        "allowedFilters": [ "GStreamerFilter", "ZBarFilter" ]
  }
}
```

||||
| - |||
| token | String | Token value. Send it to one client to pass it as a parameter in openvidu-browser method _[`Session.connect`](api/openvidu-browser/classes/session.html#connect){:target="blank"}_ |
| id | String | Same value as `token` |
| session | String | Same as in the body request |
| role | String | Same as in the body request |
| data | String | Same as in the body request |
| record | Boolean | Same as in the body request |
| kurentoOptions | Object | Object with Kurento configuration if provided, same as in the body request |

##### HTTP responses

|||
| - ||
| 200 | Token successfully created and ready to be used by one client to connect to the associated session |
| 400 | Problem with some body parameter |
| 404 | Provided value for `session` parameter was not found in OpenVidu Server. You must first call [**POST /openvidu/api/sessions**](#post-openviduapisessions) to get a session id |

<br>

---

### GET `/openvidu/api/sessions/<SESSION_ID>`

##### Description

Retrieve an initialized session from OpenVidu Server. A session is considered initialized after method [**POST /openvidu/api/sessions**](#post-openviduapisessions) has been called.

##### Operation

|   ||
| - ||
| **METHOD**  | GET |
| **URL**     | https://`YOUR_OPENVIDUSERVER_IP`/openvidu/api/sessions/`SESSION_ID` |
| **HEADERS** | Authorization: Basic `EncodeBase64(OPENVIDUAPP:<YOUR_SECRET>)`<br/>Content-Type: application/x-www-form-urlencoded |

##### Sample return

This operation returns a [**Session object**](#session-object).

##### HTTP responses

|||
| - ||
| 200 | The session information has been successfully retrieved |
| 404 | No session exists for the passed `SESSION_ID` |

<br>

---

### GET `/openvidu/api/sessions`

##### Description

Retrieve all the initialized sessions from OpenVidu Server.

##### Operation

|   ||
| - ||
| **METHOD**  | GET |
| **URL**     | https://`YOUR_OPENVIDUSERVER_IP`/openvidu/api/sessions |
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
| numberOfElements | Number | Total number of active sessions |
| content | Array of Objects | Array of [**Session objects**](#session-object) |

##### HTTP responses

|||
| - ||
| 200 | All the session information has been successfully retrieved |

<br>

---

### POST `/openvidu/api/signal`

##### Description

Send a signal to a session, as a broadcast message or to specific participants. This is the server-side implementation of the client operation [**Session.signal**](api/openvidu-browser/classes/session.html#signal){:target="blank"}.

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

### DELETE `/openvidu/api/sessions/<SESSION_ID>`

##### Description

Close a session. This will stop all of the processes taking place for this session: all of its connections, streams and recordings will be closed.

##### Operation

|   ||
| - ||
| **METHOD**  | DELETE |
| **URL**     | https://`YOUR_OPENVIDUSERVER_IP`/openvidu/api/sessions/`SESSION_ID` |
| **HEADERS** | Authorization: Basic `EncodeBase64(OPENVIDUAPP:<YOUR_SECRET>)`<br/>Content-Type: application/x-www-form-urlencoded |

##### HTTP responses

|||
| - ||
| 204 | The session has been successfully closed. Every participant will have received the proper events in OpenVidu Browser: [**streamDestroyed**](api/openvidu-browser/classes/streamevent.html){:target="blank"}, [**connectionDestroyed**](api/openvidu-browser/classes/connectionevent.html){:target="blank"} and [**sessionDisconnected**](api/openvidu-browser/classes/sessiondisconnectedevent.html){:target="blank"}, all of them with "reason" property set to "sessionClosedByServer". Depending on the order of eviction of the users, some of them will receive more events than the others: the first user evicted will only receive the events related to himself, last one will receive every possible event |
| 404 | No session exists for the passed `SESSION_ID` |

<br>

---

### DELETE `/openvidu/api/sessions/<SESSION_ID>/connection/<CONNECTION_ID>`

##### Description

Force the disconnection of a user from a session. All of the streams associated to this connection (both publishers and subscribers) will be destroyed. If the user was publishing a stream, all other subscribers of other users receiving it will also be destroyed.

##### Operation

|   ||
| - ||
| **METHOD**  | DELETE |
| **URL**     | https://`YOUR_OPENVIDUSERVER_IP`/openvidu/api/sessions/`SESSION_ID`/connection/`CONNECTION_ID` |
| **HEADERS** | Authorization: Basic `EncodeBase64(OPENVIDUAPP:<YOUR_SECRET>)`<br/>Content-Type: application/x-www-form-urlencoded |

##### HTTP responses

|||
| - ||
| 204 | The participant has been successfully evicted from the session. Every participant will have received the proper events in OpenVidu Browser: [**streamDestroyed**](api/openvidu-browser/classes/streamevent.html){:target="blank"} if the user was publishing, [**connectionDestroyed**](api/openvidu-browser/classes/connectionevent.html){:target="blank"} for the remaining users and [**sessionDisconnected**](api/openvidu-browser/classes/sessiondisconnectedevent.html){:target="blank"} for the evicted user. All of them with "reason" property set to "forceDisconnectByServer" |
| 400 | No session exists for the passed `SESSION_ID` |
| 404 | No connection exists for the passed `CONNECTION_ID` |

<br>

---

### DELETE `/openvidu/api/sessions/<SESSION_ID>/stream/<STREAM_ID>`

##### Description

Force the unpublishing of a user's stream from a session. All of the subscribers receiving this stream will also be destroyed.

##### Operation

|   ||
| - ||
| **METHOD**  | DELETE |
| **URL**     | https://`YOUR_OPENVIDUSERVER_IP`/openvidu/api/sessions/`SESSION_ID`/stream/`STREAM_ID` |
| **HEADERS** | Authorization: Basic `EncodeBase64(OPENVIDUAPP:<YOUR_SECRET>)`<br/>Content-Type: application/x-www-form-urlencoded |

##### HTTP responses

|||
| - ||
| 204 | The stream has been successfully unpublished. Every participant will have received the proper [**streamDestroyed**](api/openvidu-browser/classes/streamevent.html){:target="blank"} event in OpenVidu Browser with "reason" property set to "forceUnpublishByServer" |
| 400 | No session exists for the passed `SESSION_ID` |
| 404 | No stream exists for the passed `STREAM_ID` |
| 405 | You cannot directly delete the stream of an IPCAM participant (any participant created with method [**POST /openvidu/api/sessions/&lt;SESSION_ID&gt;/connection**](#post-openviduapisessionsltsession_idgtconnection)). Instead you must delete the connection object with [**DELETE /openvidu/api/sessions/&lt;SESSION_ID&gt;/connection/&lt;CONNECTION_ID&gt;**](#delete-openviduapisessionsltsession_idgtconnectionltconnection_idgt) |

<br>

---

### POST `/openvidu/api/sessions/<SESSION_ID>/connection`

##### Description

Publish an IP camera sending video over RTSP. The IP camera will behave in the session as any other participant publishing a stream. Learn more at [IP cameras](advanced-features/ip-cameras/){:target="blank"} section.

##### Operation

|   ||
| - ||
| **METHOD**  | POST |
| **URL**     | https://`YOUR_OPENVIDUSERVER_IP`/openvidu/api/sessions/`SESSION_ID`/connection |
| **HEADERS** | Authorization: Basic `EncodeBase64(OPENVIDUAPP:<YOUR_SECRET>)`<br/>Content-Type: application/json |

##### Body

```json
{
   "type": "IPCAM",
   "rtspUri": "rtsp://your.camera.ip.sdp",
   "adaptativeBitrate": true,
   "onlyPlayWithSubscribers": true,
   "networkCache": 2000,
   "data": "Office security camera"
}
```

> - **type** _(optional String)_ : which type of stream will be published. For now can only be `IPCAM`. Default to `IPCAM`<br><br>
> - **rtspUri** _(mandatory String)_ : RTSP URI of the IP camera. For example: `rtsp://your.camera.ip:7777/path`<br><br>
> - **adaptativeBitrate** _(optional Boolean)_ : whether to use adaptative bitrate (and therefore adaptative quality) or not. For local network connections that do not require media transcoding this can be disabled to save CPU power. If you are not sure if transcoding might be necessary, setting this property to false **may result in media connections not being established**. Default to `true`<br><br>
> - **onlyPlayWithSubscribers** _(optional Boolean)_ : enable the IP camera stream only when some user is subscribed to it. This allows you to reduce power consumption and network bandwidth in your server while nobody is asking to receive the camera's video. On the counterpart, first user subscribing to the IP camera stream will take a little longer to receive its video. Default to `true`<br><br>
> - **networkCache** _(optional Number)_ : size of the buffer of the endpoint receiving the IP camera's stream, in milliseconds. The smaller it is, the less delay the signal will have, but more problematic will be in unstable networks. Use short buffers only if there is a quality connection between the IP camera and OpenVidu Server. Default to `2000`<br><br>
> - **data** _(optional String)_ : metadata you want to associate to the camera's participant. This will be included as [Connection.data](api/openvidu-browser/classes/connection.html#data){:target="blank"} property received by your clients on [connectionCreated](api/openvidu-browser/classes/connectionevent.html){:target="blank"} event, and will also be available in backend events ([CDR](reference-docs/openvidu-server-cdr){:target="blank"} and [Webhook](reference-docs/openvidu-server-webhook){:target="blank"}).

##### Sample return

Returns the new [**Connection object**](#connection-object) with the following particularities:

- Property `platform` will be set to `IPCAM`.
- It won't include the `token` property.
- Property `publishers` will have a single object with an extra property `rtspUri` and `mediaOptions` will have extra fields  ("adaptativeBitrate", "onlyPlayWithSubscribers", "networkCache")
- Property `subscribers` will always be empty, as IP cameras are send-only connection.

This is an example of a Connection object for an IP camera in comparison with a regular [**Connection object**](#connection-object) :

```json
{
    "connectionId": "ipc_IPCAM_rtsp_8K5Y_your_camera_ip_sdp",
    "createdAt": 1600563332396,
    "location": "Milan, Italy",
    "platform": "IPCAM",
    "role": "PUBLISHER",
    "serverData": "Office security camera",
    "clientData": "",
    "publishers": [
        {
            "createdAt": 1600563332435,
            "streamId": "str_IPC_P76J_ipc_IPCAM_rtsp_8K5Y_your_camera_ip_sdp",
            "rtspUri": "rtsp://your.camera.ip.sdp",
            "mediaOptions": {
                "hasAudio": true,
                "audioActive": true,
                "hasVideo": true,
                "videoActive": true,
                "typeOfVideo": "IPCAM",
                "frameRate": null,
                "videoDimensions": null,
                "filter": {},
                "adaptativeBitrate": true,
                "onlyPlayWithSubscribers": true,
                "networkCache": 2000
            }
        }
    ],
    "subscribers": []
}
```

##### HTTP responses

|||
| - ||
| 200 | The IP camera has been successfully published to the session. Every participant will have received the proper events in OpenVidu Browser: [**connectionCreated**](api/openvidu-browser/classes/connectionevent.html){:target="blank"} identifying the new camera participant and [**streamCreated**](api/openvidu-browser/classes/streamevent.html){:target="blank"} so they can subscribe to the IP camera stream. |
| 400 | Problem with some body parameter |
| 404 | No session exists for the passed `SESSION_ID` |
| 500 | Unexpected error when publishing the IP camera stream into the session. See the error message for further information |

<br>

---

### POST `/openvidu/api/recordings/start`

##### Description

Start the recording of a session. See [**Recording**](advanced-features/recording/){:target="blank"} documentation.

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
    "name":"MyRecording",
    "outputMode":"COMPOSED",
    "hasAudio": true,
    "hasVideo": true,
    "recordingLayout":"CUSTOM",
    "customLayout":"",
    "resolution": "1280x720",
}
```

> - **session** _(mandatory String)_ : the sessionId belonging to the session you want to start recording.<br><br>
> - **name** _(optional String)_ : the name you want to give to the video file. You can access this same property in openvidu-browser on [recordingEvents](api/openvidu-browser/classes/recordingevent.html){:target="blank"}. If no name is provided, the video file will be named after `id` property of the recording.<br><br>
> - **outputMode** _(optional String)_ : record all streams in a single file in a grid layout or record each stream in its own separate file. This property will override the `defaultOutputMode` property set on [POST /openvidu/api/sessions](#post-openviduapisessions) for this particular recording.
>     - `COMPOSED`_(default)_ : when recording the session, all streams will be composed in the same file in a grid layout.
>     - `INDIVIDUAL`: when recording the session, every stream is recorded in its own file.<br><br>
> - **hasAudio** _(optional Boolean)_ : whether to record audio or not. Default to `true`<br><br>
> - **hasVideo** _(optional Boolean)_ : whether to record video or not. Default to `true` <br><br>
> - **recordingLayout** _(optional String. Only applies if `outputMode` is set to `COMPOSED` and `hasVideo` to true)_ : the layout to be used in this recording. This property will override the `defaultRecordingLayout` property set on [POST /openvidu/api/sessions](#post-openviduapisessions) for this particular recording.
>     - `BEST_FIT`_(default)_ : A grid layout where all the videos are evenly distributed.
>     - `CUSTOM`: Use your own custom layout. See [Custom recording layouts](advanced-features/recording/#custom-recording-layouts){:target="blank"} section to learn how.
>     - Not available yet: `PICTURE_IN_PICTURE`, `VERTICAL_PRESENTATION`, `HORIZONTAL_PRESENTATION`<br><br>
> - **customLayout** _(optional String. Only applies if `recordingLayout` is set to `CUSTOM`)_ : a relative path indicating the custom recording layout to be used if more than one is available. Default to empty string (if so custom layout expected under path set with [openvidu-server configuration property](reference-docs/openvidu-config/){:target="blank"} `OPENVIDU_RECORDING_CUSTOM_LAYOUT`). This property will override the `defaultCustomLayout` property set on [POST /openvidu/api/sessions](#post-openviduapisessions) for this particular recording.<br><br>
> - **resolution** _(optional String. Only applies if `outputMode` is set to `COMPOSED` and `hasVideo` to true)_ : the resolution of the recorded video file. It is a string indicating the width and height in pixels like this: `"1920x1080"`. Values for both width and height must be between 100 and 1999.

##### Sample return

This operation returns a [**Recording object**](#recoding-object).

##### HTTP responses

|||
| - ||
| 200 | The session has started to be recorded. The moment this response is retrieved, it means that the video file is already created and contains proper data, and that the recording can be stopped with guarantees |
| 400 | Problem with some body parameter |
| 422 | `resolution` parameter exceeds acceptable values (for both width and height, min 100px and max 1999px) or trying to start a recording with both `hasAudio` and `hasVideo` to false |
| 404 | No session exists for the passed `session` body parameter |
| 406 | The session has no connected participants |
| 409 | The session is not configured for using MediaMode `ROUTED` or it is already being recorded |
| 501 | OpenVidu Server recording module is disabled: `OPENVIDU_RECORDING` [configuration property](reference-docs/openvidu-config/){:target="blank"} is set to `false` |

<br>

---

### POST `/openvidu/api/recordings/stop/<RECORDING_ID>`

##### Description

Stop the recording of a session. See [**Recording**](advanced-features/recording/){:target="blank"} documentation.

##### Operation

|   ||
| - ||
| **METHOD**  | POST |
| **URL**     | https://`YOUR_OPENVIDUSERVER_IP`/openvidu/api/recordings/stop/`RECORDING_ID` |
| **HEADERS** | Authorization: Basic `EncodeBase64(OPENVIDUAPP:<YOUR_SECRET>)`<br/>Content-Type: application/x-www-form-urlencoded |

##### Sample return

This operation returns a [**Recording object**](#recording-object).

##### HTTP responses

|||
| - ||
| 200 | The session has successfully stopped from being recorded |
| 404 | No recording exists for the passed `RECORDING_ID` |
| 406 | Recording has `starting` status. Wait until `started` status before stopping the recording |
| 501 | OpenVidu Server recording module is disabled: `OPENVIDU_RECORDING` [configuration property](reference-docs/openvidu-config/){:target="blank"} is set to `false` |

<br>

---

### GET `/openvidu/api/recordings/<RECORDING_ID>`

##### Description

Retrieve a recording from OpenVidu Server.

##### Operation

|   ||
| - ||
| **METHOD**  | GET |
| **URL**     | https://`YOUR_OPENVIDUSERVER_IP`/openvidu/api/recordings/`RECORDING_ID` |
| **HEADERS** | Authorization: Basic `EncodeBase64(OPENVIDUAPP:<YOUR_SECRET>)`<br/>Content-Type: application/x-www-form-urlencoded |

##### Sample return

This operation returns a [**Recording object**](#recording-object).

##### HTTP responses

|||
| - ||
| 200 | The recording information has been successfully retrieved |
| 404 | No recording exists for the passed `RECORDING_ID` |
| 501 | OpenVidu Server recording module is disabled: `OPENVIDU_RECORDING` [configuration property](reference-docs/openvidu-config/){:target="blank"} is set to `false` |

<br>

---

### GET `/openvidu/api/recordings`

##### Description

Retrieve all the recordings from OpenVidu Server.

##### Operation

|   ||
| - ||
| **METHOD**  | GET |
| **URL**     | https://`YOUR_OPENVIDUSERVER_IP`/openvidu/api/recordings |
| **HEADERS** | Authorization: Basic `EncodeBase64(OPENVIDUAPP:<YOUR_SECRET>)` |

##### Sample return

```json
{
    "count": 0,
    "items": []
}
```

||||
| - |||
| count | Number | Total number of recordings |
| items | Array of Objects | Array of [**Recording objects**](#recording-object) |

##### HTTP responses

|||
| - ||
| 200 | All the recording information has been successfully retrieved |
| 501 | OpenVidu Server recording module is disabled: `OPENVIDU_RECORDING` [configuration property](reference-docs/openvidu-config/){:target="blank"} is set to `false` |

<br>

---

### DELETE `/openvidu/api/recordings/<RECORDING_ID>`

##### Description

Delete a recording. This will delete all of the recording files from disk.

##### Operation

|   ||
| - ||
| **METHOD**  | DELETE |
| **URL**     | https://`YOUR_OPENVIDUSERVER_IP`/openvidu/api/recordings/`RECORDING_ID` |
| **HEADERS** | Authorization: Basic `EncodeBase64(OPENVIDUAPP:<YOUR_SECRET>)`<br/>Content-Type: application/x-www-form-urlencoded |

##### HTTP responses

|||
| - ||
| 204 | All of the recording files have been successfully deleted from disk |
| 404 | No recording exists for the passed `RECORDING_ID` |
| 409 | The recording has `started` status. [Stop](#post-openviduapirecordingsstopltrecording_idgt) it before deletion |
| 501 | OpenVidu Server recording module is disabled: `OPENVIDU_RECORDING` [configuration property](reference-docs/openvidu-config/){:target="blank"} is set to `false` |

<br>

---

### GET `/openvidu/api/config`

##### Description

Retrieve current [OpenVidu configuration](reference-docs/openvidu-config/){:target="blank"}.

##### Operation

|   ||
| - ||
| **METHOD**  | GET |
| **URL**     | https://`YOUR_OPENVIDUSERVER_IP`/openvidu/api/config |
| **HEADERS** | Authorization: Basic `EncodeBase64(OPENVIDUAPP:<YOUR_SECRET>)` |

##### Sample return

Returns an object with the version of OpenVidu Server in `VERSION` property and all of the current [configuration](reference-docs/openvidu-config/){:target="blank"} in the rest of properties.

```json
{
    "VERSION": "2.15.0",
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
    ]
}
```

##### HTTP responses

|||
| - ||
| 200 | OpenVidu configuration has been successfully retrieved |

<br>

---

### Session object

Related operations

- [**GET /openvidu/api/sessions/&lt;SESSION_ID&gt;**](#get-openviduapisessionsltsession_idgt)
- [**GET /openvidu/api/sessions**](#get-openviduapisessions)

```json
{
    "sessionId": "ses_YnDaGYNcd7",
    "createdAt": 1538481996019,
    "mediaMode": "ROUTED",
    "recording": false,
    "recordingMode": "MANUAL",
    "defaultOutputMode": "COMPOSED",
    "defaultRecordingLayout": "CUSTOM",
    "defaultCustomLayout": "",
    "customSessionId": "TestSession",
    "connections": {
        "numberOfElements": 2,
        "content": [
            {
                "connectionId": "con_Xnxg19tonh",
                "createdAt": 1538481999022,
                "location": "Madrid, Spain",
                "platform": "Chrome 85.0.4183.102 on Linux 64-bit",
                "token": "wss://my.openvidu.ip?sessionId=ses_YnDaGYNcd7&token=lnlrtnkwm4v8l&role=PUBLISHER&turnUsername=FYYNRC&turnCredential=yfxxs3",
                "role": "PUBLISHER",
                "serverData": "My Server Data",
                "clientData": "My Client Data",
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
                "subscribers": []
            },
            {
                "connectionId": "con_TNVdbuQCJF",
                "createdAt": 1538482000334,
                "location": "Berlin, Germany",
                "platform": "Firefox 80.0 on Mac OS X 10.7.2",
                "token": "wss://my.openvidu.ip?sessionId=ses_YnDaGYNcd7&token=pf83ndk92kfpt&role=PUBLISHER&turnUsername=LPO8IJ&turnCredential=hhbd3r",
                "role": "SUBSCRIBER",
                "serverData": "My Other Server Data",
                "clientData": "My Other Client Data",
                "publishers": [],
                "subscribers": [
                    {
                        "createdAt": 1538482000784,
                        "streamId": "str_CAM_NhxL_con_Xnxg19tonh"
                    }
                ]
            }
        ]
    }
}
```

||||
| - |||
| sessionId | String | Identifier of the session. Same value as `SESSION_ID` url parameter) |
| createdAt | Number | Time when the session was created in UTC milliseconds |
| mediaMode | String | Media mode configured for the session (`ROUTED` or `RELAYED`) |
| recording | Boolean | Whether the session is being recorded or not at this moment |
| recordingMode | String | Recording mode configured for the session (`ALWAYS` or `MANUAL`) |
| defaultOutputMode | String | The default output mode for the recordings of the session (`COMPOSED` or `INDIVIDUAL`) |
| defaultRecordingLayout | String | The default recording layout configured for the recordings of the session. Only defined if field `defaultOutputMode` is set to `COMPOSED` |
| defaultCustomLayout | String | The default custom layout configured for the recordings of the session. Its format is a relative path. Only defined if field `defaultRecordingLayout` is set to `CUSTOM` |
| customSessionId | String | Custom session identifier. Only defined if the session was initialized passing a `customSessionId` field in method [**POST /openvidu/api/sessions**](#post-openviduapisessions) |
| connections | Object | Collection of active connections in the session. This object is defined by a `numberOfElements` property counting the total number of active connections and a `content` array with the actual connections. See [**Connection object**](#connection-object) |

### Connection object

Related operations

- [**GET /openvidu/api/sessions/&lt;SESSION_ID&gt;**](#get-openviduapisessionsltsession_idgt)
- [**GET /openvidu/api/sessions**](#get-openviduapisessions)
- [**POST /openvidu/api/sessions/&lt;SESSION_ID&gt;/connection**](#post-openviduapisessionsltsession_idgtconnection)

```json
{
    "connectionId": "con_Xnxg19tonh",
    "createdAt": 1538481999022,
    "location": "Madrid, Spain",
    "platform": "Chrome 85.0.4183.102 on Linux 64-bit",
    "token": "wss://my.openvidu.ip?sessionId=ses_YnDaGYNcd7&token=lnlrtnkwm4v8l&role=PUBLISHER&turnUsername=FYYNRC&turnCredential=yfxxs3",
    "role": "PUBLISHER",
    "serverData": "My Server Data",
    "clientData": "My Client Data",
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
    "subscribers": []
}
```

||||
| - |||
| connectionId | String | Identifier of the user's connection |
| createdAt | Number | Time when the connection was established in UTC milliseconds |
| location | String | Geographic location of the participant <a href="openvidu-pro/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin-left: 5px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span></a> |
| platform | String | Complete description of the platform used by the participant to connect to the session |
| token | String | Token of the connection |
| role | String | Role of the connection |
| serverData | String | Data assigned to the user's token when generating the token in OpenVidu Server (see [**POST /openvidu/api/tokens**](#post-openviduapitokens)) |
| clientData | String | Data defined in OpenVidu Browser when calling [**Session.connect**](api/openvidu-browser/classes/session.html#connect){:target="blank"}  (`metadata` parameter) |
| publishers | Array of Objects | Collection of Publisher objects: streams the user is currently publishing. Each one has the following properties: <ul><li style="color:inherit;margin-bottom:4px;margin-top:4px">streamId (String) : identifier of the stream</li><li style="color:inherit;margin-bottom:4px">createdAt (Number) : time when the stream was published in UTC milliseconds</li><li style="color:inherit;margin-bottom:4px">mediaOptions (Object) : current properties of the published stream. See [**Stream**](api/openvidu-browser/classes/stream.html){:target="blank"} object from openvidu-browser library for a description of them. Some may change dynamically. See [**StreamPropertyChanged**](api/openvidu-browser/classes/streampropertychangedevent.html){:target="blank"} event of openvidu-browser library. <ul><li style="color:inherit;margin-bottom:4px;margin-top:4px">hasVideo (Boolean)</li><li style="color:inherit;margin-bottom:4px">hasAudio (Boolean)</li><li style="color:inherit;margin-bottom:4px">videoActive (Boolean)</li><li style="color:inherit;margin-bottom:4px">audioActive (Boolean)</li><li style="color:inherit;margin-bottom:4px">frameRate (Number)</li><li style="color:inherit;margin-bottom:4px">videoDimensions (String)</li><li style="color:inherit;margin-bottom:4px">typeOfVideo (String)</li><li style="color:inherit;margin-bottom:4px">filter (Object)</li></ul></li></ul> |
| subscribers | Array of Objects | Collection of Subscriber objects: streams the user is currently subscribed to. Each one has the following properties: <ul><li style="color:inherit;margin-bottom:4px;margin-top:4px">streamId (String) : equal to the `streamId` property of its associated publisher, that must be present in the `publishers` array of some other connection of the session</li><li style="color:inherit;margin-bottom:4px">createdAt (Number) : time when the subscription was established in UTC milliseconds</li></ul> |

### Recording object

Related operations

- [**POST /openvidu/api/recordings/start**](#post-openviduapirecordingsstart)
- [**POST /openvidu/api/recordings/stop/&lt;RECORDING_ID&gt;**](#post-openviduapirecordingsstopltrecording_idgt)
- [**GET /openvidu/api/recordings/&lt;RECORDING_ID&gt;**](#get-openviduapirecordingsltrecording_idgt)
- [**GET /openvidu/api/recordings**](#get-openviduapirecordings)

```json
{
    "id": "ses_YnDaGYNcd7",
    "name": "MyRecording",
    "outputMode": "COMPOSED",
    "hasAudio": true,
    "hasVideo": true,
    "resolution": "1280x720",
    "recordingLayout": "CUSTOM",
    "customLayout": "",
    "sessionId": "ses_YnDaGYNcd7",
    "createdAt": 1600564785109,
    "size": 303072692,
    "duration": 108000.234,
    "url": "https://my.openvidu.ip/openvidu/recordings/ses_YnDaGYNcd7/MyRecording.mp4",
    "status": "ready"
}
```

||||
| - |||
| id | String | Recording identifier. It will be based on the identifier of the session. Store it to perform other operations such as stop, get or delete the recording |
| name | String | Name of the recording. If no `name` parameter is provided, will be equal to `id` field |
| outputMode | String | Output mode of the recording |
| hasAudio | Boolean | True if the recording includes an audio track, false otherwise |
| hasVideo | Boolean | True if the recording includes a video track, false otherwise |
| resolution | String | Resolution of the video file. Only defined if `outputMode` is set to `COMPOSED` and `hasVideo` to true |
| recordingLayout | String | The recording layout that is being used. Only defined if `outputMode` is set to `COMPOSED` and `hasVideo` to true |
| customLayout | String | The custom layout that is being used. Only defined if `recordingLayout` is set to `CUSTOM` |
| sessionId | String | Session associated to the recording |
| createdAt | Number | Time when the recording started in UTC milliseconds |
| size | Number | Size in bytes of the video file. Only guaranteed to be greater than `0` if status is `ready` |
| duration | Number | Duration of the video file in seconds. Only guaranteed to be greater than `0` if status is `ready` |
| url | String | URL where the recording file is available.  Only guaranteed to different than `null` if status is `ready`<div style="margin-top:10px"></div>The final URL value follows this format:<div style="margin-top:5px"></div>`https://YOUR_OPENVIDUSERVER_IP/openvidu/recordings/<RECORDING_ID>/<RECORDING_NAME>.<EXTENSION>`<br>This path will be protected with OpenVidu credentials depending on whether [openvidu-server configuration property `OPENVIDU_RECORDING_PUBLIC_ACCESS`](reference-docs/openvidu-config/){:target="blank"} is false or true. This format is equals to the AWS S3 URL object property of the uploaded object for OpenVidu Pro deployments configured to [upload recordings to S3](advanced-features/recording/#uploading-recordings-to-aws-s3){:target="blank"} |
| status | String | Status of the recording: <ul><li style="color:inherit;margin-bottom:4px;margin-top:4px"><code>starting</code>: the recording is being started. This is in a way a special status, because it can only appear if a concurrent REST API call to list recordings is done at the narrow time frame in which the recording starts. The moment the start operation returns, the recording status will be <i>started</i>. A recording in this status cannot be stopped. It does not get triggered in CDR/Webhook [recordingStatusChanged](reference-docs/openvidu-server-cdr/#recordingstatuschanged){:target="blank"}.</li><li style="color:inherit;margin-bottom:4px"><code>started</code>: the session is being recorded. This means the associated video(s) already exists and its size is greater than 0. NOTE: when using COMPOSED recording with video, this event does not mean there are publisher's streams being actually recorded in the video file. It only ensures the video file exists and its size is greater than 0.</li><li style="color:inherit;margin-bottom:4px"><code>stopped</code>: the recording process has stopped and files are being processed. Depending on the type of OpenVidu deployment and configuration, properties <i>duration</i> and <i>size</i> can be set to 0 and <i>url</i> can be null. If this is the case, wait for status <i>ready</i> to get the final value of these properties.</li><li style="color:inherit;margin-bottom:4px"><code>ready</code>: the recorded file has been successfully processed and is available for download. Properties <i>duration</i>, <i>size</i> and <i>url</i> will always be properly defined at this moment. For OpenVidu Pro deployments configured to [upload recordings to S3](advanced-features/recording/#uploading-recordings-to-aws-s3){:target="blank"} this status means that the recording has been successfully stored in the S3 bucket.</li><li style="color:inherit;margin-bottom:4px"><code>failed</code>: the recording process has failed. The final state of the recorded file cannot be guaranteed to be stable.</li></ul> The recording status will be `started` after calling the start operation and while the recording is active. After calling stop operation, the status may be `stopped` or `ready` depending on the type of deployment of OpenVidu. OpenVidu CE will always return `ready` status. OpenVidu Pro will always return `stopped` status and properties `size`, `duration` and `url` will not have their final value defined yet. Listen to [recordingStatusChanged](reference-docs/openvidu-server-cdr/#recordingstatuschanged){:target="blank"} CDR/Webhook event to know when the recording has reached `ready` status in this case |

<br>
