<h2 id="section-title">OpenVidu Server RPC protocol</h2>
<hr>

OpenVidu Server offers a **WebSocket endpoint** at path `/openvidu` where clients must connect to ...

- **Call methods**: clients are able to directly call OpenVidu Server methods. Some of them will only be available if the user has the proper role inside the session.
- **Receive server events**: OpenVidu Server will send session events to clients connected to that specific session.

OpenVidu hides all this implementation with _OpenVidu Browser_ JavaScript library, that can be used in all **[officially supported platforms](troubleshooting/#8-what-platforms-are-supported-by-openvidu)**.
But of course it would be possible to develop an SDK implementing this WebSocket based RPC protocol using any desired language or technology.

For example, **[openvidu-android](https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-android){:target="_blank"}** tutorial is a native Android app, so it cannot make use of _OpenVidu Browser_ JavaScript library. The solution to this problem: the application internally implements the OpenVidu Server RPC protocol. But to do so, it is necessary to be very clear about what operations-responses and what server events are defined in OpenVidu Server.

Table of Contents:

- **[Client-Server methods](#client-server-methods)**
    - [ping](#ping)
    - [joinRoom](#joinroom)
    - [publishVideo](#publishvideo)
    - [videoData](#videodata) <a href="openvidu-pro/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin-left: 5px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span></a>
    - [prepareReceiveVideoFrom](#preparereceivevideofrom) <a href="openvidu-enterprise/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: #9c27b0; color: white; font-weight: bold; padding: 0px 5px; margin-left: 5px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">ENTERPRISE</span></a>
    - [receiveVideoFrom](#receivevideofrom)
    - [onIceCandidate](#onicecandidate)
    - [unpublishVideo](#unpublishvideo)
    - [unsubscribeFromVideo](#unsubscribefromvideo)
    - [leaveRoom](#leaveroom)
    - [sendMessage](#sendmessage)
    - [forceUnpublish](#forceunpublish)
    - [forceDisconnect](#forcedisconnect)
    - [applyFilter](#applyfilter)
    - [removeFilter](#removefilter)
    - [execFilterMethod](#execfiltermethod)
    - [addFilterEventListener](#addfiltereventlistener)
    - [removeFilterEventListener](#removefiltereventlistener)
    - [connect](#connect)
    - [reconnectStream](#reconnectstream)

<br>

- **[Server events](#server-events)**
    - [iceCandidate](#icecandidate)
    - [sendMessage](#sendmessage_1)
    - [participantJoined](#participantjoined)
    - [participantLeft](#participantleft)
    - [participantEvicted](#participantevicted)
    - [participantPublished](#participantpublished)
    - [participantUnpublished](#participantunpublished)
    - [streamPropertyChanged](#streampropertychanged)
    - [connectionPropertyChanged](#connectionpropertychanged) <a href="openvidu-pro/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin-left: 5px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span></a>
    - [recordingStarted](#recordingstarted)
    - [recordingStopped](#recordingstopped)
    - [networkQualityLevelChanged](#networkqualitylevelchanged) <a href="openvidu-pro/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin-left: 5px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span></a>
    - [filterEventDispatched](#filtereventdispatched)
    - [forciblyReconnectSubscriber](#forciblyreconnectsubscriber) <a href="openvidu-enterprise/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: #9c27b0; color: white; font-weight: bold; padding: 0px 5px; margin-left: 5px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">ENTERPRISE</span></a>

---

## Client-Server methods

<br>
All operations send by the client side must be a JSON object with these properties

- `id`: an integer to identify each operation call. Must be unique with respect to any other RPC operation call for a particular WebSocket connection
- `jsonrpc`: version of JSON-RPC protocol. Always `"2.0"`
- `method`: the name of the method
- `params`: a JSON object with the method parameters

<br>
All responses from OpenVidu Server to each one of these operations are a JSON object with these properties

- `id`: an integer matching the `id` property of the operation call that generated this response. This allows pairing the operation call sent from the client with its respective server response
- `jsonrpc`: version of JSON-RPC protocol. Always `"2.0"`
- `result`: a JSON object with the operation result. Its fields are obviously dependent on the method that generated this response. Not included if `error` property is defined
- `error`: a JSON object with information about an error triggered during the operation call. Not included if `result` property is defined. This JSON object has 2 properties:
    - `code`: a number identifying the type of error
    - `message`: a string with a detailed description about the error

<br>

---

#### ping

Ping message for the ping-pong mechanism. This is necessary to make OpenVidu Server aware of a client connection, and to act accordingly if no ping is received in a certain interval time. `params` property is only necessary in the first call to this method.

**Method sent by client**

```json
{
    "id": 0,
    "jsonrpc": "2.0",
    "method": "ping",
    "params": {
        "interval": 5000 // Not necessary after first call
    }
}
```

**Response from OpenVidu Server**

```json
{
   "id": 0,
   "jsonrpc":"2.0",
   "result":{
      "value":"pong"
   }
}
```

---

#### joinRoom

Join a client to an already initialized session. The equivalent method in OpenVidu Browser is [Session#connect](api/openvidu-browser/classes/Session.html#connect)

**Method sent by client**

```json
{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "joinRoom",
    "params": {
        "metadata": "TestClient",
        "platform": "Chrome 99.0.4844.51 on Linux 64-bit",
        "recorder": false,
        "sdkVersion": "2.21.0",
        "secret": "",
        "session": "TestSession",
        "token": "wss://sample-ip.com?sessionId=TestSession&token=tok_V9JemXQw9n6T0LY2"
    }
}
```

**Response from OpenVidu Server**

```json
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": {
        "coturnIp": "123.45.67.89",
        "coturnPort": 3478,
        "createdAt": 1646820441354,
        "finalUserId": "97061F3F73313C3E",
        "id": "con_BbmrLNQdb1",
        "mediaServer": "mediasoup",
        "metadata": "TestClient",
        "record": true,
        "role": "PUBLISHER",
        "session": "TestSession",
        "sessionId": "4aktv8cfkhe2ooksplqg0c8v80",
        "turnCredential": "86rwpk",
        "turnUsername": "MQLSZR",
        "value": [
            {
                "createdAt": 1646820435398,
                "id": "con_Ud1Rk3GbYu",
                "metadata": "TestClient",
                "streams": [
                    {
                        "audioActive": true,
                        "createdAt": 1646820436419,
                        "filter": {},
                        "frameRate": 30,
                        "hasAudio": true,
                        "hasVideo": true,
                        "id": "str_CAM_KDeZ_con_Ud1Rk3GbYu",
                        "typeOfVideo": "CAMERA",
                        "videoActive": true,
                        "videoDimensions": "{\"width\":640,\"height\":480}"
                    }
                ]
            }
        ],
        "version": "2.21.0",
        "videoSimulcast": true
    }
}
```

---

#### publishVideo

Start publishing a stream to the session. The equivalent method in OpenVidu Browser is [Session#publish](api/openvidu-browser/classes/Session.html#publish)

**Method sent by client**

```json
{
    "id": 2,
    "jsonrpc": "2.0",
    "method": "publishVideo",
    "params": {
        "audioActive": true,
        "doLoopback": false,
        "frameRate": 30,
        "hasAudio": true,
        "hasVideo": true,
        "sdpOffer": "v=0\r\no=- 9136980301272336337 2 IN IP4 [...] 0c97ae838dfa\r\n",
        "typeOfVideo": "CAMERA",
        "videoActive": true,
        "videoDimensions": "{\"width\":640,\"height\":480}"
    }
}
```

**Response from OpenVidu Server**

```json
{
    "id": 2,
    "jsonrpc": "2.0",
    "result": {
        "createdAt": 1646820441733,
        "id": "str_CAM_ZHxJ_con_BbmrLNQdb1",
        "sdpAnswer": "v=0\r\no=mediasoup-client 10000 [...] a=rtcp-rsize\r\n",
        "sessionId": "4aktv8cfkhe2ooksplqg0c8v80"
    }
}
```

---

#### videoData

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
This feature is part of <a href="openvidu-pro/"><strong>OpenVidu</strong><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin-left: 5px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span></a> tier.
</div>
</div>

Informs the server about the properties of the video being sent by the user. This method should be sent once after publishing a video stream, and every time any of the video properties change. This method is necessary for the [Network Quality API](advanced-features/network-quality/) to properly work.

**Method sent by client**

```json
{
    "id": 19,
    "jsonrpc": "2.0",
    "method": "videoData",
    "params": {
        "audioActive": true,
        "height": 480,
        "videoActive": true,
        "width": 640
    }
}
```

**Response from OpenVidu Server**

```json
{
    "id": 19,
    "jsonrpc": "2.0",
    "result": {
        "sessionId": "4aktv8cfkhe2ooksplqg0c8v80"
    }
}
```

---

#### prepareReceiveVideoFrom

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
This method is part of <a href="openvidu-enterprise/"><strong>OpenVidu</strong><span id="openvidu-pro-tag" style="display: inline-block; background-color: #9c27b0; color: white; font-weight: bold; padding: 0px 5px; margin-left: 5px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">ENTERPRISE</span></a> tier.
</div>
</div>

When using [mediasoup](openvidu-enterprise/#kurento-vs-mediasoup) as media server, the subscription operation must begin with this method. Instead of the client generating an SDP offer and the server sending back an SDP answer, roles are reversed. The server must first generate an SDP offer and the client send back an SDP answer. This is why this method is needed when using mediasoup. The steps to follow are the following ones:

1. Call [prepareReceiveVideoFrom](#preparereceivevideofrom) indicating with parameter `sender` the remote stream to subscribe to.
2. The response will bring an SDP offer in the `spdOffer` attribute that must be used to generate an SDP answer in the client.
3. The SDP answer must be sent by the client in method [receiveVideoFrom](#receivevideofrom), using parameter `sdpAnswer`.

**Method sent by client**

```json
{
    "id": 3,
    "jsonrpc": "2.0",
    "method": "prepareReceiveVideoFrom",
    "params": {
        "reconnect": false,
        "sender": "str_CAM_KDeZ_con_Ud1Rk3GbYu"
    }
}
```

**Response from OpenVidu Server**

```json
{
    "id": 3,
    "jsonrpc": "2.0",
    "result": {
        "sdpOffer": "v=0\r\no=mediasoup-client 10000 [...] a=rtcp-rsize\r\n",
        "sessionId": "4aktv8cfkhe2ooksplqg0c8v80"
    }
}
```

---

#### receiveVideoFrom

Subscribe to a stream being published to the session. The equivalent method in OpenVidu Browser is [Session#subscribe](api/openvidu-browser/classes/Session.html#subscribe).

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
The content of the operation and the response is different when using <a href="openvidu-enterprise/#kurento-vs-mediasoup">Kurento or mediasoup</a> in <a href="openvidu-enterprise/">OpenVidu<span id="openvidu-pro-tag" style="display: inline-block; background-color: #9c27b0; color: white; font-weight: bold; padding: 0px 5px; margin-left: 5px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">ENTERPRISE</span></a> . See method <a href="#preparereceivevideofrom">prepareReceiveVideoFrom</a>.
</div>
</div>

<br>

##### When using Kurento

**Method sent by client**

```json
{
    "id": 4,
    "jsonrpc": "2.0",
    "method": "receiveVideoFrom",
    "params": {
        "sdpOffer": "v=0 ... a=rtpmap:123 ulpfec/90000\r\n",
        "sender": "str_CAM_KDeZ_con_Ud1Rk3GbYu"
    }
}
```

**Response from OpenVidu Server**

```json
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": {
        "sdpAnswer": "v=0 ... :FD:66:54:68:B4:47:25:EF:B6:04:74:AF:7B:08:66:09:F2:7C\r\n",
        "sessionId": "4aktv8cfkhe2ooksplqg0c8v80"
    }
}
```

<br>

##### When using mediasoup

**Method sent by client**

```json
{
    "id": 4,
    "jsonrpc": "2.0",
    "method": "receiveVideoFrom",
    "params": {
        "sdpAnswer": "v=0\r\no=- 519458450557852 [...] apt=113\r\n",
        "sender": "str_CAM_KDeZ_con_Ud1Rk3GbYu"
    }
}
```

**Response from OpenVidu Server**

```json
{
    "id": 4,
    "jsonrpc": "2.0",
    "result": {
        "sessionId": "4aktv8cfkhe2ooksplqg0c8v80"
    }
}
```

---

#### onIceCandidate

Send an ICE candidate to the server.

**Method sent by client**

```json
{
    "id": 5,
    "jsonrpc": "2.0",
    "method": "onIceCandidate",
    "params": {
        "candidate": "candidate:3885250869 1 udp 2122260223 172.17.0.1 39933 typ host generation 0 ufrag Ie9p network-id 1 network-cost 50",
        "endpointName": "con_Ud1Rk3GbYu",
        "sdpMid": "0",
        "sdpMLineIndex": 0
    }
}
```

**Response from OpenVidu Server**

```json
{
    "id": 5,
    "jsonrpc": "2.0",
    "result": {
        "sessionId": "4aktv8cfkhe2ooksplqg0c8v80"
    }
}
```

---

#### unpublishVideo

Stop publishing a stream to the session. The equivalent method in OpenVidu Browser is [Session#unpublish](api/openvidu-browser/classes/Session.html#unpublish)

**Method sent by client**

```json
{
    "id": 6,
    "jsonrpc": "2.0",
    "method": "unpublishVideo",
    "params": {}
}
```

**Response from OpenVidu Server**

```json
{
    "id": 6,
    "jsonrpc": "2.0",
    "result": {
        "sessionId": "4aktv8cfkhe2ooksplqg0c8v80"
    }
}
```

---

#### unsubscribeFromVideo

Stop the subscription from a stream to which the user is currently subscribed. The equivalent method in OpenVidu Browser is [Session#unsubscribe](api/openvidu-browser/classes/Session.html#unsubscribe)

**Method sent by client**

```json
{
    "id": 7,
    "jsonrpc": "2.0",
    "method": "unsubscribeFromVideo",
    "params": {
        "sender": "con_Ud1Rk3GbYu"
    }
}
```

**Response from OpenVidu Server**

```json
{
    "id": 7,
    "jsonrpc": "2.0",
    "result": {
        "sessionId": "4aktv8cfkhe2ooksplqg0c8v80"
    }
}
```

---

#### leaveRoom

Disconnect a client from a session. The equivalent method in OpenVidu Browser is [Session#disconnect](api/openvidu-browser/classes/Session.html#disconnect)

**Method sent by client**

```json
{
    "id": 8,
    "jsonrpc": "2.0",
    "method": "leaveRoom",
    "params": {}
}
```

**Response from OpenVidu Server**

```json
{
    "id": 576,
    "jsonrpc": "2.0",
    "result": {
        "sessionId": "4aktv8cfkhe2ooksplqg0c8v80"
    }
}
```

---

#### sendMessage

Send a signal to the session. The equivalent method in OpenVidu Browser is [Session#signal](api/openvidu-browser/classes/Session.html#signal)

**Method sent by client**

```json
{
    "id": 9,
    "jsonrpc": "2.0",
    "method": "sendMessage",
    "params": {
        "message": "{\"to\":[],\"data\":\"Test message\",\"type\":\"signal:chat\"}"
    }
}
```

**Response from OpenVidu Server**

```json
{
    "id": 9,
    "jsonrpc": "2.0",
    "result": {
        "sessionId": "4aktv8cfkhe2ooksplqg0c8v80"
    }
}
```

---

#### forceUnpublish

Force another client to unpublish its stream from the session. Only possible for clients with role MODERATOR inside the session. The equivalent method in OpenVidu Browser is [Session#forceUnpublish](api/openvidu-browser/classes/Session.html#forceUnpublish)

**Method sent by client**

```json
{
    "id": 10,
    "jsonrpc": "2.0",
    "method": "forceUnpublish",
    "params": {
        "streamId": "str_CAM_KDeZ_con_Ud1Rk3GbYu"
    }
}
```

**Response from OpenVidu Server**

```json
{
    "id": 10,
    "jsonrpc": "2.0",
    "result": {
        "sessionId": "4aktv8cfkhe2ooksplqg0c8v80"
    }
}
```

---

#### forceDisconnect

Force another client to disconnect from the session. Only possible for clients with role MODERATOR inside the session. The equivalent method in OpenVidu Browser is [Session#forceDisconnect](api/openvidu-browser/classes/Session.html#forceDisconnect)

**Method sent by client**

```json
{
    "id": 11,
    "jsonrpc": "2.0",
    "method": "forceDisconnect",
    "params": {
        "connectionId": "con_Ud1Rk3GbYu"
    }
}
```

**Response from OpenVidu Server**

```json
{
    "id": 11,
    "jsonrpc": "2.0",
    "result": {
        "sessionId": "4aktv8cfkhe2ooksplqg0c8v80"
    }
}
```

---

#### applyFilter

Apply a filter to a published stream. The equivalent method in OpenVidu Browser is [Stream#applyFilter](api/openvidu-browser/classes/Stream.html#applyFilter)

**Method sent by client**

```json
{
    "id": 12,
    "jsonrpc": "2.0",
    "method": "applyFilter",
    "params": {
        "options": "{\"command\":\"videobalance saturation=0.0\"}",
        "streamId": "str_CAM_SB57_con_Hr6uUWKHiT",
        "type": "GStreamerFilter"
    }
}
```

**Response from OpenVidu Server**

```json
{
    "id": 12,
    "jsonrpc": "2.0",
    "result": {
        "sessionId": "4aktv8cfkhe2ooksplqg0c8v80"
    }
}
```

---

#### removeFilter

Removed an applied filter from a stream. The equivalent method in OpenVidu Browser is [Stream#removeFilter](api/openvidu-browser/classes/Stream.html#removeFilter)

**Method sent by client**

```json
{
    "id": 13,
    "jsonrpc": "2.0",
    "method": "removeFilter",
    "params": {
        "streamId": "str_CAM_SB57_con_Hr6uUWKHiT"
    }
}
```

**Response from OpenVidu Server**

```json
{
    "id": 13,
    "jsonrpc": "2.0",
    "result": {
        "sessionId": "4aktv8cfkhe2ooksplqg0c8v80"
    }
}
```

---

#### execFilterMethod

Execute a method offered by an applied filter. The equivalent method in OpenVidu Browser is [Filter#execMethod](api/openvidu-browser/classes/Filter.html#execMethod)

**Method sent by client**

```json
{
    "id": 14,
    "jsonrpc": "2.0",
    "method": "execFilterMethod",
    "params": {
        "method": "setElementProperty",
        "params": "{\"propertyName\":\"saturation\",\"propertyValue\":\"1.0\"}",
        "streamId": "str_CAM_SB57_con_Hr6uUWKHiT"
    }
}
```

**Response from OpenVidu Server**

```json
{
    "id": 14,
    "jsonrpc": "2.0",
    "result": {
        "sessionId": "4aktv8cfkhe2ooksplqg0c8v80"
    }
}
```

---

#### addFilterEventListener

Add a listener to an applied filter. The equivalent method in OpenVidu Browser is [Filter#addEventListener](api/openvidu-browser/classes/Filter.html#addEventListener)

**Method sent by client**

```json
{
    "id": 15,
    "jsonrpc": "2.0",
    "method": "addFilterEventListener",
    "params": {
        "eventType": "CodeFound",
        "streamId": "str_CAM_SB57_con_Hr6uUWKHiT"
    }
}
```

**Response from OpenVidu Server**

```json
{
    "id": 15,
    "jsonrpc": "2.0",
    "result": {
        "sessionId": "4aktv8cfkhe2ooksplqg0c8v80"
    }
}
```

---

#### removeFilterEventListener

Remove a listener from an applied filter. The equivalent method in OpenVidu Browser is [Filter#removeEventListener](api/openvidu-browser/classes/Filter.html#removeEventListener)

**Method sent by client**

```json
{
    "id": 16,
    "jsonrpc": "2.0",
    "method": "removeFilterEventListener",
    "params": {
        "eventType": "CodeFound",
        "streamId": "str_CAM_SB57_con_Hr6uUWKHiT"
    }
}
```

**Response from OpenVidu Server**

```json
{
    "id": 16,
    "jsonrpc": "2.0",
    "result": {
        "sessionId": "4aktv8cfkhe2ooksplqg0c8v80"
    }
}
```

---

#### connect

After a network loss and a WebSocket reconnection, this is the first method that the client must send to the server. It will tell if the client still belongs to the OpenVidu Session, or if it is too late and it was evicted from it. See See [Automatic reconnection ➞ Signaling plane breaks](/advanced-features/automatic-reconnection/#signaling-plane-breaks).

**Method sent by client**

```json
{
    "id": 17,
    "jsonrpc": "2.0",
    "method": "connect",
    "params": {
        "reconnect": true,
        "sessionId": "4aktv8cfkhe2ooksplqg0c8v80"
    }
}
```

**Response from OpenVidu Server**

If the server did not evict the user:

```json
{
    "id": 17,
    "jsonrpc": "2.0",
    "result": {
        "sessionId": "4aktv8cfkhe2ooksplqg0c8v80",
        "value": "reconnection successful"
    }
}
```

If the server evicted the user:

```json
{
    "id": 17,
    "jsonrpc": "2.0",
    "error": {
        "code": 40007,
        "message": "reconnection error"
    }
}
```

---

#### reconnectStream

Silently re-negotiates an already established stream, whether it is an outgoing stream (Publisher) or an incoming stream (Subscriber). This can be helpful to reconnect a frozen stream, which may happen when a client loses and recovers its network connection with OpenVidu Server but the media plane remains broken (See [Automatic reconnection ➞ Media plane breaks](/advanced-features/automatic-reconnection/#media-plane-breaks)). This method will recreate a new RTC peer connection in a silent manner (without triggering any events in the clients) using the properties of the previous one.

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
When reconnecting a Subscriber stream in <a href="openvidu-enterprise/#kurento-vs-mediasoup">mediasoup</a> (only for OpenVidu <a href="openvidu-enterprise/">OpenVidu<span id="openvidu-pro-tag" style="display: inline-block; background-color: #9c27b0; color: white; font-weight: bold; padding: 0px 5px; margin-left: 5px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">ENTERPRISE</span></a>), the process is slightly different. See <a href="#when-using-mediasoup-to-reconnect-a-subscriber">below</a>
</div>
</div>

Required params are the stream identifier to reconnect and the new SDP offer generated by the client (which must have created a new RTC peer connection object). The answer will bring the new SDP answer to pass it to the newly created client's peer connection.

**Method sent by client**

```json
{
    "id": 18,
    "jsonrpc": "2.0",
    "method": "reconnectStream",
    "params": {
        "sdpString": "v=0\r\no=- 6389978899592330342 [...] -bc35-59fd59fea848\r\n",
        "stream": "str_CAM_SB57_con_Hr6uUWKHiT"
    }
}
```

**Response from OpenVidu Server**

```json
{
    "id": 18,
    "jsonrpc": "2.0",
    "result": {
        "createdAt": 1646826648338,
        "id": "str_CAM_SB57_con_Hr6uUWKHiT",
        "sdpAnswer": "v=0\r\no=- 3855815448 [...] 4E:34:0B:16\r\n",
        "sessionId": "4aktv8cfkhe2ooksplqg0c8v80"
    }
}
```

<br>

##### When using mediasoup to reconnect a Subscriber

Before sending method [reconnectStream](#reconnectstream) it is necessary to first call [prepareReceiveVideoFrom](#preparereceivevideofrom) with parameter **`"reconnect": true`** like this:

```json
{
    "id": 18,
    "jsonrpc": "2.0",
    "method": "prepareReceiveVideoFrom",
    "params": {
        "reconnect": true,
        "sender": "str_CAM_SB57_con_Hr6uUWKHiT"
    }
}
```

... which will generate the following response from the server:

```json
{
    "id": 18,
    "jsonrpc": "2.0",
    "result": {
        "sdpOffer": "v=0\r\no=mediasoup-client 10000 [...] a=rtcp-rsize\r\n",
        "sessionId": "4aktv8cfkhe2ooksplqg0c8v80"
    }
}
```

Use the resulting `sdpOffer` to generate an SDP answer, that must now be passed as parameter `sdpString` of method [reconnectStream](#reconnectstream).

<br>

---

## Server events

All events generated in OpenVidu Server and sent to clients are a JSON object with 3 properties:

- `jsonrpc`: version of JSON-RPC protocol. Always `"2.0"`
- `method`: the name of the event
- `params`: a JSON object with the event properties

<br>

---

#### iceCandidate

OpenVidu Server has generated an ICE candidate for certain stream. Client must process it on its proper WebRTC peer connection object.

```json
{
    "jsonrpc": "2.0",
    "method": "iceCandidate",
    "params": {
        "candidate": "candidate:1 2 UDP 2015363326 172.17.0.2 9187 typ host",
        "endpointName": "str_CAM_GxWj_con_IoktfUp3Fr",
        "sdpMid": "1",
        "sdpMLineIndex": 1,
        "senderConnectionId": "con_BbmrLNQdb1"
    }
}
```

---

#### sendMessage

A message broadcasted to the session (can be generated by other client or by the application server). See [Send text messages between users](cheatsheet/send-messages/).

```json
{
    "jsonrpc": "2.0",
    "method": "sendMessage",
    "params": {
        "data": "Test message",
        "from": "con_BbmrLNQdb1",
        "type": "signal:chat"
    }
}
```

---

#### participantJoined

Some client has connected to the session.

```json
{
    "jsonrpc": "2.0",
    "method": "participantJoined",
    "params": {
        "createdAt": 1646834217870,
        "id": "con_PLHxdBQ6EG",
        "metadata": "TestClient"
    }
}
```

---

#### participantLeft

Some client has disconnected from the session.

```json
{
    "jsonrpc": "2.0",
    "method": "participantLeft",
    "params": {
        "connectionId": "con_PLHxdBQ6EG",
        "reason": "disconnect"
    }
}
```

---

#### participantEvicted

Some client has been forcibly disconnected from the session.

```json
{
  "method": "participantEvicted",
  "params": {
    "connectionId": "con_PLHxdBQ6EG",
    "reason": "forceDisconnectByUser"
  },
  "jsonrpc": "2.0"
}
```

---

#### participantPublished

Some client has published a stream to the session.

```json
{
    "jsonrpc": "2.0",
    "method": "participantPublished",
    "params": {
        "id": "con_PLHxdBQ6EG",
        "streams": [
            {
                "audioActive": true,
                "createdAt": 1646834218401,
                "filter": {},
                "frameRate": 30,
                "hasAudio": true,
                "hasVideo": true,
                "id": "str_CAM_PBjN_con_PLHxdBQ6EG",
                "typeOfVideo": "CAMERA",
                "videoActive": true,
                "videoDimensions": "{\"width\":640,\"height\":480}"
            }
        ]
    }
}
```

---

#### participantUnpublished

Some client has unpublished a stream from the session.

```json
{
    "jsonrpc": "2.0",
    "method": "participantUnpublished",
    "params": {
        "connectionId": "con_PLHxdBQ6EG",
        "reason": "unpublish"
    }
}
```

---

#### streamPropertyChanged

Some client has changed a property of a stream. See [StreamPropertyChangedEvent](api/openvidu-browser/classes/StreamPropertyChangedEvent.html)

```json
{
    "jsonrpc": "2.0",
    "method": "streamPropertyChanged",
    "params": {
        "connectionId": "con_PLHxdBQ6EG",
        "newValue": "false",
        "property": "audioActive",
        "reason": "publishAudio",
        "streamId": "str_CAM_PBjN_con_PLHxdBQ6EG"
    }
}
```

---

#### connectionPropertyChanged

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
This feature is part of <a href="openvidu-pro/"><strong>OpenVidu</strong><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin-left: 5px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span></a> tier.
</div>
</div>

The local client has changed some of its Connection properties. See [connectionPropertyChanged](api/openvidu-browser/interfaces/SessionEventMap.html#connectionPropertyChanged).

```json
{
    "jsonrpc": "2.0",
    "method": "connectionPropertyChanged",
    "params": {
        "newValue": "MODERATOR",
        "property": "role"
    }
}
```

---

#### recordingStarted

The recording of a session has started.

```json
{
    "jsonrpc": "2.0",
    "method": "recordingStarted",
    "params": {
        "id": "TestSession",
        "name": "MyLastRecordings"
    }
}
```

---

#### recordingStopped

The recording of a session has stopped.

```json
{
    "jsonrpc": "2.0",
    "method": "recordingStopped",
    "params": {
        "id": "TestSession",
        "name": "MyLastRecordings",
        "reason": "recordingStoppedByServer"
    }
}
```

---

#### networkQualityLevelChanged

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
This feature is part of <a href="openvidu-pro/"><strong>OpenVidu</strong><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin-left: 5px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span></a> tier.
</div>
</div>

The network quality level of a client has changed. See [Network quality](advanced-features/network-quality/).

```json
{
    "jsonrpc": "2.0",
    "method": "networkQualityLevelChanged",
    "params": {
        "connectionId": "con_PLHxdBQ6EG",
        "newValue": 5,
        "oldValue": 4
    }
}
```

---

#### filterEventDispatched

A filter applied to a stream by this client has dispatched an event. This can only happen if the client has previously called methods `applyFilter` and `addFilterEventListener`

```json
{
  "method": "filterEventDispatched",
  "params": {
    "connectionId": "con_PLHxdBQ6EG",
    "streamId": "str_CAM_PBjN_con_PLHxdBQ6EG",
    "filterType": "ZBarFilter",
    "eventType": "CodeFound",
    "data": "{timestampMillis=1568204832456, codeType=EAN-13, source=3972c92d-a489-47ae-92f8-13ea6d0e72eb_kurento.MediaPipeline/fdb2f5-19a4-47c2-a27a-705fb277_kurento.ZBarFilter, type=CodeFound, value=0092000001927}"
  },
  "jsonrpc": "2.0"
}
```

---

#### forciblyReconnectSubscriber

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
This method is part of <a href="openvidu-enterprise/"><strong>OpenVidu</strong><span id="openvidu-pro-tag" style="display: inline-block; background-color: #9c27b0; color: white; font-weight: bold; padding: 0px 5px; margin-left: 5px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">ENTERPRISE</span></a> tier.
</div>
</div>

A Subscriber stream must be forcibly reconnected:

1. Use the parameter value `sdpOffer` to generate an SDP answer.
2. Call method [reconnectStream](#reconnectstream). Use the SDP answer as parameter `sdpString`.

This is only necessary when using [mediasoup](openvidu-enterprise/#kurento-vs-mediasoup) as media server.

```json
{
    "jsonrpc": "2.0",
    "method": "forciblyReconnectSubscriber",
    "params": {
        "connectionId": "con_Y6vGaAmYkz",
        "sdpOffer": "v=0\r\no=mediasoup-client 10000 [...] a=rtcp-rsize\r\n",
        "streamId": "str_CAM_GZ8F_con_Y6vGaAmYkz"
    }
}
```
