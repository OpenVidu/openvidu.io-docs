# IP cameras

- **[How to publish IP cameras](#how-to-publish-ip-cameras)**
- **[How to unpublish IP cameras](#how-to-unpublish-ip-cameras)**
- **[Configuring IP cameras](#configuring-ip-cameras)**

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
For <a href="openvidu-enterprise/"><strong>OpenVidu</strong><span id="openvidu-pro-tag" style="display: inline-block; background-color: #9c27b0; color: white; font-weight: bold; padding: 0px 5px; margin-left: 5px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">ENTERPRISE</span></a> IP cameras support is only available when using Kurento as media server. Currently mediasoup is not compatible with IP cameras. See <a href="openvidu-enterprise/#kurento-vs-mediasoup">Kurento vs mediasoup</a>.
</div>
</div>

<br>

---

## How to publish IP cameras

You can publish any IP camera sending video over **[RTSP](https://en.wikipedia.org/wiki/Real_Time_Streaming_Protocol){:target="_blank"}**. You perform this operation from your server by consuming OpenVidu REST API.

<div class="lang-tabs-container" markdown="1">

<div class="lang-tabs-header">
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; color: black">Java</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Node</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">cURL</button>
</div>

<div id="java" class="lang-tabs-content" markdown="1">

```java
ConnectionProperties connectionProperties = new ConnectionProperties.Builder()
    .type(ConnectionType.IPCAM)
    .rtspUri("rtsp://your.camera.ip:7777/path")
    .adaptativeBitrate(true)
    .onlyPlayWithSubscribers(false)
    .networkCache(1000)
    .build();
// "session" being a Session object
Connection connection = session.createConnection(connectionProperties);
```

See [JavaDoc](api/openvidu-java-client/io/openvidu/java/client/Session.html#createConnection(io.openvidu.java.client.ConnectionProperties)){:target="_blank"}

</div>

<div id="node" class="lang-tabs-content" style="display:none" markdown="1">

```javascript
var connectionProperties = {
    type: "IPCAM",
    rtspUri: "rtsp://your.camera.ip:7777/path",
    adaptativeBitrate: true,
    onlyPlayWithSubscribers: false,
    networkCache: 1000
};
// "session" being a Session object
session.createConnection(connectionProperties)
    .then(connection => { ... })
    .catch(error => console.error(error));
```

See [TypeDoc](api/openvidu-node-client/classes/session.html#createconnection){:target="_blank"}

</div>

<div id="curl" class="lang-tabs-content" style="display:none" markdown="1">

Initialize a Connection of type `IPCAM` with method **[POST /openvidu/api/sessions/&lt;SESSION_ID&gt;/connection](reference-docs/REST-API#post-connection)**

```sh
curl -X POST https://<DOMAIN_OR_PUBLIC_IP>/openvidu/api/sessions/<SESSION_ID>/connection \
     -u OPENVIDUAPP:<YOUR_SECRET> \
     -H "Content-Type: application/json" \
     --data-binary @- <<BODY
     {
       "type": "IPCAM",
       "data": "Office security camera",
       "record": true,
       "rtspUri": "rtsp://your.camera.ip.sdp",
       "adaptativeBitrate": true,
       "onlyPlayWithSubscribers": true,
       "networkCache": 2000
     }
BODY
```

</div>

</div>

<br>

#### Events dispatched in the clients

Whenever you call this method, a new Connection to the session will be created and a new stream will be published. All the expected events are triggered in every client connected to the Session, just as when a regular client joins and publishes to a session. The workflow is:

1. Your backend publishes an IP Camera to the session by creating a new Connection of type `IPCAM`, as shown in the code snippets above.
2. Every client connected to that session will receive a **[connectionCreated](api/openvidu-browser/classes/ConnectionEvent.html)** event. This event will be no different to any *connectionCreated* event dispatched by a regular client joining the session.
3. Every client connected to that session will receive a **[streamCreated](api/openvidu-browser/classes/StreamEvent.html)** event. The only difference with any other *streamCreated* event dispatched by a regular client publishing to the session is that the Stream object returned by the event will have property [typeOfVideo](api/openvidu-browser/classes/Stream.html#typeOfVideo) set to `IPCAM`. Users can subscribe to this stream as any other regular stream to start receiving the IP camera's feed (see [Subscribe/Unsubscribe from a stream](cheatsheet/subscribe-unsubscribe)).

After [unpublishing the IP camera](#how-to-unpublish-ip-cameras) all participants connected to the session will receive the proper **[streamDestroyed](api/openvidu-browser/classes/StreamEvent.html)** and **[connectionDestroyed](api/openvidu-browser/classes/ConnectionEvent.html)** events.

<br>

#### Events dispatched in the backend

Your backend side will also receive the expected events in your [Webhook](reference-docs/openvidu-server-webhook). Just as happens for the client-side events, for the backend same events will be dispatched as for any other regular user.

- **[participantJoined](reference-docs/openvidu-server-webhook/#participantjoined)** event fot the new IP camera Connection. `platform` property is set to `"IPCAM"`.
```json
{
  "participantJoined": {
    "sessionId": "MySurveillanceSession",
    "timestamp": 1582108095130,
    "connectionId": "ipc_IPCAM_rtsp_C4CU_b1_dnsdojo_com_1935_live_sys3_stream",
    "location": "Amsterdam, Netherlands",
    "platform": "IPCAM",
    "clientData": "",
    "serverData": "Beach camera"
  }
}
```
- **[webrtcConnectionCreated](reference-docs/openvidu-server-webhook/#webrtcconnectioncreated)** event fot the new IP camera stream. It is actually an RTSP stream and not a WebRTC stream, but for the sake of compatibility the name of the event will remain the same for now. `videoSource` property is set to `IPCAM` and there are new properties specific to IP cameras.
```json
{
  "webrtcConnectionCreated": {
    "sessionId": "MySurveillanceSession",
    "timestamp": 1582108095351,
    "streamId": "str_IPC_SJmx_ipc_IPCAM_rtsp_C4CU_b1_dnsdojo_com_1935_live_sys3_stream",
    "connectionId": "ipc_IPCAM_rtsp_C4CU_b1_dnsdojo_com_1935_live_sys3_stream",
    "connection": "OUTBOUND",
    "rtspUri": "rtsp://b1.dnsdojo.com:1935/live/sys3.stream",
    "adaptativeBitrate": true,
    "onlyPlayWithSubscribers": true,
    "networkCache": 2000,
    "videoSource": "IPCAM",
    "videoFramerate": null,
    "videoDimensions": null,
    "audioEnabled": true,
    "videoEnabled": true
  }
}
```

After [unpublishing the IP camera](#how-to-unpublish-ip-cameras) your backend will receive the proper events **[webrtcConnectionDestroyed](reference-docs/openvidu-server-webhook/#webrtcconnectiondestroyed)** (one for the IP camera's stream itself and one for each user that was subscribed to the camera's feed) and **[participantLeft](reference-docs/openvidu-server-webhook/#participantleft)** event (only one for the camera's Connection).

<br>

---

## How to unpublish IP cameras

To unpublish an IP camera you must remove its Connection. You can do it from your server:

<div class="lang-tabs-container" markdown="1">

<div class="lang-tabs-header">
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; color: black">Java</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Node</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">cURL</button>
</div>

<div id="java" class="lang-tabs-content" markdown="1">

```java
// Find the desired Connection object in the list returned by Session.getConnections()
session.forceDisconnect(connection);
```

See [JavaDoc](api/openvidu-java-client/io/openvidu/java/client/Session.html#forceDisconnect(io.openvidu.java.client.Connection)){:target="_blank"}

</div>

<div id="node" class="lang-tabs-content" style="display:none" markdown="1">

```javascript
// Find the desired Connection object in the array Session.connections
session.forceDisconnect(connection);
```

See [TypeDoc](api/openvidu-node-client/classes/session.html#forcedisconnect){:target="_blank"}

</div>

<div id="curl" class="lang-tabs-content" style="display:none" markdown="1">

Use method **[DELETE /openvidu/api/sessions/&lt;SESSION_ID&gt;/connection/&lt;CONNECTION_ID&gt;](reference-docs/REST-API#delete-connection)**

```sh
curl -X DELETE https://<DOMAIN_OR_PUBLIC_IP>/openvidu/api/sessions/<SESSION_ID>/connection/<CONNECTION_ID> \
     -u OPENVIDUAPP:<YOUR_SECRET>
```

</div>

</div>

> **WARNING**: you cannot remove an IP camera by directly deleting its Stream. You must delete the Connection object instead. Trying to remove an IP camera by deleting its Stream instead of its Connection will result in an error. See HTTP responses of method [**DELETE /openvidu/api/sessions/&lt;SESSION_ID&gt;/stream/&lt;STREAM_ID&gt;**](reference-docs/REST-API#delete-stream)

<br>

---

## Configuring IP cameras

When [publishing an IP camera](#how-to-publish-ip-cameras), you can configure different properties that will affect the management of the camera's media stream. These are:

#### adaptativeBitrate

Whether to re-encode the IP camera stream in OpenVidu, or not. Enabling this allows OpenVidu to provide a dynamic video quality that is automatically adapted to the network conditions of Subscribers of the IP camera, which helps avoid playback issues. It is active by default, and it allows the OpenVidu deployment to provide a robust and reliable flow to participants that will receive the IP camera stream. But re-encoding video has a moderately high CPU cost.

When this option is disabled, the video is served as-is from the IP camera. For this to work, the source video codec must be compatible with receiving browsers; normally this means outputting either H.264 or VP8 video from the camera. OpenVidu will not adapt the video quality dynamically, which greatly reduces CPU usage on the server; however you could still change by hand the IP camera's settings in order to vary the output size or bitrate.

An example of situation where you might want to disable this setting is in environments where all Subscribers are guaranteed to have a very good network link with OpenVidu, thus network congestion is expected to be zero, and there is no need for dynamic quality adaptation.

#### onlyPlayWithSubscribers

Whether to enable the IP camera stream only when some user is subscribed to it or not. What this means is that the OpenVidu deployment will only establish the RTSP connection with the IP camera when some participant asks to subscribe to the camera's stream. The rest of the time the OpenVidu deployment will not be effectively receiving any packets from the IP camera, saving CPU power and bandwidth. This option is active by default.

The counterpart to this option, which in principle would always seem desirable, is that the first participant requesting to subscribe to the camera's stream will take a little longer to do so, as the OpenVidu deployment has to establish the RTSP connection with the camera in the first place. Just after the last participant subscribed to the camera's stream unsubscribes from it, the RTSP connection between the OpenVidu deployment and the IP camera will be closed again, and the cycle starts again (next first participant subscribing to the camera's stream will have to wait longer than usual to receive the video).

Generally speaking you'll want this option set to true, but if for your particular use case the response time of the first subscriber to the camera's stream is vital, you can set this option to false to never stop receiving the camera's feed.

#### networkCache

Set the size of the buffer of the endpoint receiving the IP camera's stream, in milliseconds. The smaller it is, the less delay the signal will have, but more problematic will be in unstable networks. Use short buffers only if there is a quality connection between the IP camera and the OpenVidu deployment. The default safe value is 2000 ms.

<br>

<script>
function changeLangTab(event) {
  var parent = event.target.parentNode.parentNode;
  var txt = event.target.textContent || event.target.innerText;
  var txt = txt.replace(/\s/g, "-").toLowerCase();
  for (var i = 0; i < parent.children.length; i++) {
    var child = parent.children[i];
    // Change appearance of language buttons
    if (child.classList.contains("lang-tabs-header")) {
        for (var j = 0; j < child.children.length; j++) {
            var btn = child.children[j];
            if (btn.classList.contains("lang-tabs-btn")) {
                btn.style.backgroundColor = btn === event.target ? '#e8e8e8' : '#f9f9f9';
                btn.style.color = btn === event.target ? 'black' : '#777';
            }
        }
    }
    // Change visibility of language content
    if (child.classList.contains("lang-tabs-content")) {
        if (child.id === txt) {
            child.style.display = "block";
        } else {
            child.style.display = "none";
        }
    }
  }
}
</script>
