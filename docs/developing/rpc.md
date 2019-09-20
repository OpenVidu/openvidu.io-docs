
OpenVidu Server RPC protocol
===================

OpenVidu Server offers a WebSocket endpoint at path `/openvidu` where clients must connect to ...

- **Call methods**: clients are able to directly call OpenVidu Server methods. Some of them will only be available if the user has the proper role inside the session.
- **Receive server events**: OpenVidu Server will send session events to clients connected to that specific session.

OpenVidu hides all this implementation with _OpenVidu Browser_ JavaScript library, that can be used in all **[officially supported platforms](/troubleshooting/#8-what-platforms-are-supported-by-openvidu){:target="_blank"}**.
But of course it would be possible to develop an SDK implementing this WebSocket based RPC protocol using any desired language or technology.

For example, **[openvidu-android](https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-android){:target="_blank"}** tutorial is a native Android app, so it cannot make use of _OpenVidu Browser_ JavaScript library. The solution to this problem: the application internally implements the OpenVidu Server RPC protocol. But to do so, it is necessary to be very clear about what operations-responses and what server events are defined in OpenVidu Server.

<br>

---

## Client-Server methods

<br>
All operations send by the client side must be a JSON object with these properties

- `jsonrpc`: version of JSON-RPC protocol. Always `"2.0"`
- `method`: the name of the method
- `params`: a JSON object with the method parameters
- `id`: an integer to identify this operation call. Must be unique with respect to any other operation call

<br>
All responses from OpenVidu Server to each one of these operations are a JSON object with these properties

- `jsonrpc`: version of JSON-RPC protocol. Always `"2.0"`
- `id`: an integer matching the `id` property of the operation call that generated this response. This allows pairing the operation call sent from the client with its respective server response
- `result`: a JSON object with the operation result. Its fields are obviously dependent on the method that generated this response. Not included if `error` property is defined
- `error`: a JSON object with information about an error triggered during the operation call. Not included if `result` property is defined. This JSON object has 2 properties:
    - `code`: a number identifying the type of error
    - `message`: a string with a detailed description about the error

<br>
Complete list of operations:

- **[ping](#ping)**
- **[joinRoom](#joinroom)**
- **[publishVideo](#publishvideo)**
- **[receiveVideoFrom](#receivevideofrom)**
- **[onIceCandidate](#onicecandidate)**
- **[unpublishVideo](#unpublishvideo)**
- **[unsubscribeFromVideo](#unsubscribefromvideo)**
- **[leaveRoom](#leaveroom)**
- **[sendMessage](#sendmessage)**
- **[forceUnpublish](#forceunpublish)**
- **[forceDisconnect](#forcedisconnect)**
- **[applyFilter](#applyfilter)**
- **[removeFilter](#removefilter)**
- **[execFilterMethod](#execfiltermethod)**
- **[addFilterEventListener](#addfiltereventlistener)**
- **[removeFilterEventListener](#removefiltereventlistener)**

---

#### ping

Ping message for the ping-pong mechanism. This is necessary to make OpenVidu Server aware of a client connection, and to act accordingly if no ping is received in a certain interval time. `params` property is only necessary in the first call to this method.

**Method sent by client**

```json
{
    "jsonrpc": "2.0",
    "method": "ping",
    "params": {
        "interval": 5000 // Not necessary after first call
    },
    "id": 0
}
```

**Response from OpenVidu Server**

```json
{
   "id": 0,
   "result":{
      "value":"pong"
   },
   "jsonrpc":"2.0"
}
```

---

#### joinRoom

Join a client to an already initialized session. The equivalent method in OpenVidu Browser is [Session#connect](https://openvidu.io/api/openvidu-browser/classes/session.html#connect){:target="_blank"}

**Method sent by client**

```json
{
  "jsonrpc": "2.0",
  "method": "joinRoom",
  "params": {
    "token": "wss://localhost:4443?sessionId=TestSession&token=rpjyfwrwckltdtk3&role=PUBLISHER&version=2.11.0",
    "session": "TestSession",
    "platform": "Chrome 76.0.3809.132 on Linux 64-bit",
    "metadata": "{clientData: TestClient}",
    "secret": "",
    "recorder": false
  },
  "id": 1
}
```

**Response from OpenVidu Server**

```json
{
  "id": 1,
  "result": {
    "id": "y4gsjcy37m1rcjkx",
    "createdAt": 1568198320797,
    "metadata": "{clientData: TestClient}",
    "value": [
      {
        "id": "ydqsx1r7jp3zmduf",
        "createdAt": 1568197954222,
        "metadata": "{clientData: OtherClient}",
        "streams": [
          {
            "id": "ydqsx1r7jp3zmduf_CAMERA_MLMZG",
            "createdAt": 1568197956221,
            "hasAudio": true,
            "hasVideo": true,
            "videoActive": true,
            "audioActive": true,
            "typeOfVideo": "CAMERA",
            "frameRate": 30,
            "videoDimensions": "{\"width\":640,\"height\":480}",
            "filter": {}
          }
        ]
      }
    ],
    "sessionId": "nqo83ml4kc2kgaoe65311n7in0"
  },
  "jsonrpc": "2.0"
}
```

---

#### publishVideo

Start publishing a stream to the session. The equivalent method in OpenVidu Browser is [Session#publish](https://openvidu.io/api/openvidu-browser/classes/session.html#publish){:target="_blank"}

**Method sent by client**

```json
{
  "jsonrpc": "2.0",
  "method": "publishVideo",
  "params": {
    "sdpOffer": "v=0 ... ssrc:1665235233 label:f320e350-b667-4765-87da-4ee4f595b9fe\r\n",
    "doLoopback": false,
    "hasAudio": true,
    "hasVideo": true,
    "audioActive": true,
    "videoActive": true,
    "typeOfVideo": "CAMERA",
    "frameRate": 30,
    "videoDimensions": "{\"width\":640,\"height\":480}"
  },
  "id": 2
}
```

**Response from OpenVidu Server**

```json
{
  "id": 2,
  "result": {
    "sdpAnswer": "v=0 ... :EA:63:12:29:12:D6:4B:9A:63:F1:AB:D4:CC\r\n",
    "id": "nflyoomouisnvvas_CAMERA_DYVFP",
    "createdAt": 1568193997244,
    "sessionId": "lu7h4for17svik11aum6qqi9v1"
  },
  "jsonrpc": "2.0"
}
```

---

#### receiveVideoFrom

Subscribe to a stream being published to the session. The equivalent method in OpenVidu Browser is [Session#subscribe](https://openvidu.io/api/openvidu-browser/classes/session.html#subscribe){:target="_blank"}

**Method sent by client**

```json
{
  "jsonrpc": "2.0",
  "method": "receiveVideoFrom",
  "params": {
    "sender": "ydqsx1r7jp3zmduf_CAMERA_MLMZG",
    "sdpOffer": "v=0 ... a=rtpmap:123 ulpfec/90000\r\n"
  },
  "id": 3
}
```

**Response from OpenVidu Server**

```json
{
  "id": 3,
  "result": {
    "sdpAnswer": "v=0 ... :FD:66:54:68:B4:47:25:EF:B6:04:74:AF:7B:08:66:09:F2:7C\r\n",
    "sessionId": "ajcecubc3sdcki0f6fnsefrr0t"
  },
  "jsonrpc": "2.0"
}
```

---

#### onIceCandidate

Send and ICE candidate to the server.

**Method sent by client**

```json
{
  "jsonrpc": "2.0",
  "method": "onIceCandidate",
  "params": {
    "endpointName": "nflyoomouisnvvas",
    "candidate": "candidate:3885250869 1 udp 2122260223 172.17.0.1 53467 typ host generation 0 ufrag 3KLI network-id 1 network-cost 50",
    "sdpMid": "0",
    "sdpMLineIndex": 0
  },
  "id": 4
}
```

**Response from OpenVidu Server**

```json
{
  "id": 4,
  "result": {
    "sessionId": "lu7h4for17svik11aum6qqi9v1"
  },
  "jsonrpc": "2.0"
}
```

---

#### unpublishVideo

Stop publishing a stream to the session. The equivalent method in OpenVidu Browser is [Session#unpublish](https://openvidu.io/api/openvidu-browser/classes/session.html#unpublish){:target="_blank"}

**Method sent by client**

```json
{
  "jsonrpc": "2.0",
  "method": "unpublishVideo",
  "params": {},
  "id": 5
}
```

**Response from OpenVidu Server**

```json
{
  "id": 5,
  "result": {
    "sessionId": "822vl7sqllncvbivsoqt8q0nes"
  },
  "jsonrpc": "2.0"
}
```

---

#### unsubscribeFromVideo

Stop the subscription from a stream to which the user is currently subscribed. The equivalent method in OpenVidu Browser is [Session#unsubscribe](https://openvidu.io/api/openvidu-browser/classes/session.html#unsubscribe){:target="_blank"}

**Method sent by client**

```json
{
  "jsonrpc": "2.0",
  "method": "unsubscribeFromVideo",
  "params": {
    "sender": "ydqsx1r7jp3zmduf"
  },
  "id": 6
}
```

**Response from OpenVidu Server**

```json
{
  "id": 6,
  "result": {
    "sessionId": "ajcecubc3sdcki0f6fnsefrr0t"
  },
  "jsonrpc": "2.0"
}
```

---

#### leaveRoom

Disconnect a client from a session. The equivalent method in OpenVidu Browser is [Session#disconnect](https://openvidu.io/api/openvidu-browser/classes/session.html#disconnect){:target="_blank"}

**Method sent by client**

```json
{
  "jsonrpc": "2.0",
  "method": "leaveRoom",
  "params": {},
  "id": 7
}
```

**Response from OpenVidu Server**

```json
{
  "id": 7,
  "result": {
    "sessionId": "lu7h4for17svik11aum6qqi9v1"
  },
  "jsonrpc": "2.0"
}
```

---

#### sendMessage

Send a signal to the session. The equivalent method in OpenVidu Browser is [Session#signal](https://openvidu.io/api/openvidu-browser/classes/session.html#signal){:target="_blank"}

**Method sent by client**

```json
{
  "jsonrpc": "2.0",
  "method": "sendMessage",
  "params": {
    "message": "{\"to\":[],\"data\":\"Test message\",\"type\":\"signal:chat\"}"
  },
  "id": 8
}
```

**Response from OpenVidu Server**

```json
{
  "id": 8,
  "result": {
    "sessionId": "nqo83ml4kc2kgaoe65311n7in0"
  },
  "jsonrpc": "2.0"
}
```

---

#### forceUnpublish

Force another client to unpublish its stream from the session. Only possible for clients with role MODERATOR inside the session. The equivalent method in OpenVidu Browser is [Session#forceUnpublish](https://openvidu.io/api/openvidu-browser/classes/session.html#forceunpublish){:target="_blank"}

**Method sent by client**

```json
{
  "jsonrpc": "2.0",
  "method": "forceUnpublish",
  "params": {
    "streamId": "ydqsx1r7jp3zmduf_CAMERA_MLMZG"
  },
  "id": 9
}
```

**Response from OpenVidu Server**

```json
{
  "id": 9,
  "result": {
    "sessionId": "rh75l2dg35v9pqsrsbi5n09p72"
  },
  "jsonrpc": "2.0"
}
```

---

#### forceDisconnect

Force another client to disconnect from the session. Only possible for clients with role MODERATOR inside the session. The equivalent method in OpenVidu Browser is [Session#forceDisconnect](https://openvidu.io/api/openvidu-browser/classes/session.html#forcedisconnect){:target="_blank"}

**Method sent by client**

```json
{
  "jsonrpc": "2.0",
  "method": "forceDisconnect",
  "params": {
    "connectionId": "4v8cftv2zylhkjvd"
  },
  "id": 10
}
```

**Response from OpenVidu Server**

```json
{
  "id": 10,
  "result": {
    "sessionId": "6f0djrngic4ed49ov0poesp3f4"
  },
  "jsonrpc": "2.0"
}
```

---

#### applyFilter

Apply a filter to a published stream. The equivalent method in OpenVidu Browser is [Stream#applyFilter](https://openvidu.io/api/openvidu-browser/classes/stream.html#applyfilter){:target="_blank"}

**Method sent by client**

```json
{
  "jsonrpc": "2.0",
  "method": "applyFilter",
  "params": {
    "streamId": "wzvwjiise4lfbhvp_CAMERA_MCLFF",
    "type": "GStreamerFilter",
    "options": "{\"command\":\"videobalance saturation=0.0\"}"
  },
  "id": 11
}
```

**Response from OpenVidu Server**

```json
{
  "id": 11,
  "result": {
    "sessionId": "iege6n3t7c3oj8ilj91hgaktp6"
  },
  "jsonrpc": "2.0"
}
```

---

#### removeFilter

Removed an applied filter from a stream. The equivalent method in OpenVidu Browser is [Stream#removeFilter](https://openvidu.io/api/openvidu-browser/classes/stream.html#removefilter){:target="_blank"}

**Method sent by client**

```json
{
  "jsonrpc": "2.0",
  "method": "removeFilter",
  "params": {
    "streamId": "wzvwjiise4lfbhvp_CAMERA_MCLFF"
  },
  "id": 12
}
```

**Response from OpenVidu Server**

```json
{
  "id": 12,
  "result": {
    "sessionId": "iege6n3t7c3oj8ilj91hgaktp6"
  },
  "jsonrpc": "2.0"
}
```

---

#### execFilterMethod

Execute a method offered by an applied filter. The equivalent method in OpenVidu Browser is [Filter#execMethod](https://openvidu.io/api/openvidu-browser/classes/filter.html#execmethod){:target="_blank"}

**Method sent by client**

```json
{
  "jsonrpc": "2.0",
  "method": "execFilterMethod",
  "params": {
    "streamId": "wzvwjiise4lfbhvp_CAMERA_MCLFF",
    "method": "setElementProperty",
    "params": "{\"propertyName\":\"saturation\",\"propertyValue\":\"1.0\"}"
  },
  "id": 13
}
```

**Response from OpenVidu Server**

```json
{
  "id": 12,
  "result": {
    "sessionId": "iege6n3t7c3oj8ilj91hgaktp6"
  },
  "jsonrpc": "2.0"
}
```

---

#### addFilterEventListener

Add a listener to an applied filter. The equivalent method in OpenVidu Browser is [Filter#addEventListener](https://openvidu.io/api/openvidu-browser/classes/filter.html#addeventlistener){:target="_blank"}

**Method sent by client**

```json
{
  "jsonrpc": "2.0",
  "method": "addFilterEventListener",
  "params": {
    "streamId": "wzvwjiise4lfbhvp_CAMERA_MCLFF",
    "eventType": "CodeFound"
  },
  "id": 14
}
```

**Response from OpenVidu Server**

```json
{
  "id": 14,
  "result": {
    "sessionId": "iege6n3t7c3oj8ilj91hgaktp6"
  },
  "jsonrpc": "2.0"
}
```

---

#### removeFilterEventListener

Remove a listener from an applied filter. The equivalent method in OpenVidu Browser is [Filter#removeEventListener](https://openvidu.io/api/openvidu-browser/classes/filter.html#removeeventlistener){:target="_blank"}

**Method sent by client**

```json
{
  "jsonrpc": "2.0",
  "method": "removeFilterEventListener",
  "params": {
    "streamId": "wzvwjiise4lfbhvp_CAMERA_MCLFF",
    "eventType": "CodeFound"
  },
  "id": 15
}
```

**Response from OpenVidu Server**

```json
{
  "id": 15,
  "result": {
    "sessionId": "iege6n3t7c3oj8ilj91hgaktp6"
  },
  "jsonrpc": "2.0"
}
```

<br>

---

## Server events

All events generated in OpenVidu Server and sent to clients are a JSON object with 3 properties:

- `jsonrpc`: version of JSON-RPC protocol. Always `"2.0"`
- `method`: the name of the event
- `params`: a JSON object with the event properties

<br>
Complete list of server events:

- **[iceCandidate](#icecandidate)**
- **[sendMessage](#sendmessage_1)**
- **[participantJoined](#participantjoined)**
- **[participantLeft](#participantleft)**
- **[participantEvicted](#participantevicted)**
- **[participantPublished](#participantpublished)**
- **[participantUnpublished](#participantunpublished)**
- **[streamPropertyChanged](#streampropertychanged)**
- **[recordingStarted](#recordingstarted)**
- **[recordingStopped](#recordingstopped)**
- **[filterEventDispatched](#filtereventdispatched)**

---

#### iceCandidate

OpenVidu Server has generated an ICE candidate for certain stream. Client must process it on its proper WebRTC peer connection object.

```json
{
  "method": "iceCandidate",
  "params": {
    "senderConnectionId": "nflyoomouisnvvas",
    "endpointName": "nflyoomouisnvvas_CAMERA_DYVFP",
    "sdpMLineIndex": 0,
    "sdpMid": "0",
    "candidate": "candidate:1 1 UDP 2013266431 fe80::f816:3eff:fe48:cb5b 25037 typ host"
  },
  "jsonrpc": "2.0"
}
```

---

#### sendMessage

A message broadcasted to the session (can be generated by other client or by the application server).

```json
{
  "method": "sendMessage",
  "params": {
    "data": "Test message",
    "from": "y4gsjcy37m1rcjkx",
    "type": "signal:chat"
  },
  "jsonrpc": "2.0"
}
```

---

#### participantJoined

Some client has connected to the session.

```json
{
  "method": "participantJoined",
  "params": {
    "id": "tvwerf2quejh2vio",
    "createdAt": 1568199474610,
    "metadata": "{clientData: TestClient}"
  },
  "jsonrpc": "2.0"
}
```

---

#### participantLeft

Some client has disconnected from the session.

```json
{
  "method": "participantLeft",
  "params": {
    "connectionId": "4v8cftv2zylhkjvd",
    "reason": "forceDisconnectByUser"
  },
  "jsonrpc": "2.0"
}
```

---

#### participantEvicted

Some client has been forcibly disconnected from the session.

```json
{
  "method": "participantEvicted",
  "params": {
    "connectionId": "4v8cftv2zylhkjvd",
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
  "method": "participantPublished",
  "params": {
    "id": "qpdg7gcw0vf5wb97",
    "streams": [
      {
        "id": "qpdg7gcw0vf5wb97_CAMERA_EDGRS",
        "createdAt": 1568199288275,
        "hasAudio": true,
        "hasVideo": true,
        "audioActive": true,
        "videoActive": true,
        "typeOfVideo": "CAMERA",
        "frameRate": 30,
        "videoDimensions": "{\"width\":640,\"height\":480}",
        "filter": {}
      }
    ]
  },
  "jsonrpc": "2.0"
}
```

---

#### participantUnpublished

Some client has unpublished a stream from the session.

```json
{
  "method": "participantUnpublished",
  "params": {
    "connectionId": "qpdg7gcw0vf5wb97",
    "reason": "unpublish"
  },
  "jsonrpc": "2.0"
}
```

---

#### streamPropertyChanged

Some client has changed a property of a stream. See [StreamPropertyChangedEvent](https://openvidu.io/api/openvidu-browser/classes/streampropertychangedevent.html){:target="_blank"}

```json
{
  "method": "streamPropertyChanged",
  "params": {
    "connectionId": "lnek7tftxofol1ie",
    "streamId": "lnek7tftxofol1ie_CAMERA_JVBHX",
    "property": "videoActive",
    "newValue": "false",
    "reason": "publishVideo"
  },
  "jsonrpc": "2.0"
}
```

---

#### recordingStarted

The recording of a session has started.

```json
{
  "method": "recordingStarted",
  "params": {
    "id": "lnek7tftxofol1ie",
    "name": "MyLastRecording"
  },
  "jsonrpc": "2.0"
}
```

---

#### recordingStopped

The recording of a session has stopped.

```json
{
  "method": "recordingStopped",
  "params": {
    "id": "lnek7tftxofol1ie",
    "name": "MyLastRecording",
    "reason": "recordingStoppedByServer"
  },
  "jsonrpc": "2.0"
}
```

---

#### filterEventDispatched

A filter applied to a stream by this client has dispatched an event. This can only happen if the client has previously called methods `applyFilter` and `addFilterEventListener`

```json
{
  "method": "filterEventDispatched",
  "params": {
    "connectionId": "wzvwjiise4lfbhvp",
    "streamId": "wzvwjiise4lfbhvp_CAMERA_MCLFF",
    "filterType": "ZBarFilter",
    "eventType": "CodeFound",
    "data": "{timestampMillis=1568204832456, codeType=EAN-13, source=3972c92d-a489-47ae-92f8-13ea6d0e72eb_kurento.MediaPipeline/fdb2f5-19a4-47c2-a27a-705fb277_kurento.ZBarFilter, type=CodeFound, value=0092000001927}"
  },
  "jsonrpc": "2.0"
}
```
