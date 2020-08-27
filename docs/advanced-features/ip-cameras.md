# IP cameras

- **[How to publish IP cameras](#how-to-publish-ip-cameras)**
- **[How to unpublish IP cameras](#how-to-unpublish-ip-cameras)**
- **[Configuring IP cameras](#configuring-ip-cameras)**

<br>

---

## How to publish IP cameras

You can publish any IP camera sending video over **[RTSP](https://en.wikipedia.org/wiki/Real_Time_Streaming_Protocol){:target="_blank"}**. You perform this operation from your server by consuming OpenVidu Server REST API.

<div class="lang-tabs-container" markdown="1">

<div class="lang-tabs-header">
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; font-weight: bold">REST API</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Java</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Node</button>
</div>

<div id="rest-api" class="lang-tabs-content" markdown="1">

Use method **[POST /sessions/{sessionId}/connection](reference-docs/REST-API#post-apisessionsltsession_idgtconnection)**

</div>

<div id="java" class="lang-tabs-content" style="display:none" markdown="1">
<i>Not available yet</i>
</div>

<div id="node" class="lang-tabs-content" style="display:none" markdown="1">
<i>Not available yet</i>
</div>

</div>

#### Events dispatched in the clients

Whenever you call this method, a new participant will join the chosen session, and a new stream will be published to it. All the expected events are triggered in every client connected to the Session, just as when a regular client joins and publishes to a session. The workflow is:

1. Your backend publishes an IP Camera to the session as shown in the code snippets above
2. Every client connected to that session will receive a **[connectionCreated](api/openvidu-browser/classes/connectionevent.html){:target="_blank"}** event. This event will be no different to any *connectionCreated* event dispatched by a regular client joining the session
3. Every client connected to that session will receive a **[streamCreated](api/openvidu-browser/classes/streamevent.html){:target="_blank"}** event. The only difference with any other *streamCreated* event dispatched by a regular client publishing to the session is that the Stream object returned by the event will have property `typeOfVideo` set to `"IPCAM"`. Users can subscribe to this stream as any other regular stream (see [Subscribe/Unsubscribe from a stream](cheatsheet/subscribe-unsubscribe){:target="_blank"})

After [unpublishing the IP camera](#how-to-unpublish-ip-cameras) all participants connected to the session will receive the proper **[streamDestroyed](api/openvidu-browser/classes/streamevent.html){:target="_blank"}** and **[connectionDestroyed](api/openvidu-browser/classes/connectionevent.html){:target="_blank"}** events.

#### Events dispatched in the backend

Your backend side will also receive the expected events in the [CDR](reference-docs/openvidu-server-cdr){:target="_blank"} and [Webhook](reference-docs/openvidu-server-webhook){:target="_blank"}. Just as happens for the client-side events, for the backend same events will be dispatched as for any other regular user:

- ***participantJoined*** event fot the new IP camera participant. `platform` property is set to `"IPCAM"`.
```json
{"participantJoined":{"sessionId":"MySurveillanceSession","timestamp":1582108095130,"participantId":"ipc_IPCAM_rtsp_C4CU_b1_dnsdojo_com_1935_live_sys3_stream","location":"Amsterdam, Netherlands","platform":"IPCAM","clientData":"","serverData":"Beach camera"}}
```
- ***webrtcConnectionCreated*** event fot the new IP camera stream. It is actually an RTSP stream and not a WebRTC stream, but for the shake of compatibility the name of the event will remain the same for now. `videoSource` property is set to `"IPCAM"`.
```json
{"webrtcConnectionCreated":{"sessionId":"MySurveillanceSession","timestamp":1582108095351,"streamId":"str_IPC_SJmx_ipc_IPCAM_rtsp_C4CU_b1_dnsdojo_com_1935_live_sys3_stream","participantId":"ipc_IPCAM_rtsp_C4CU_b1_dnsdojo_com_1935_live_sys3_stream","connection":"OUTBOUND","rtspUri":"rtsp://b1.dnsdojo.com:1935/live/sys3.stream","adaptativeBitrate":true,"onlyPlayWithSubscribers":true,"videoSource":"IPCAM","videoFramerate":null,"videoDimensions":null,"audioEnabled":true,"videoEnabled":true}}
```

After [unpublishing the IP camera](#how-to-unpublish-ip-cameras) your backend will receive the proper events **webrtcConnectionDestroyed** (one for the IP camera's stream itself and one for each user that was subscribed to the camera's stream) and **participantLeft** event (only one for the camera's connection).

<br>

---

## How to unpublish IP cameras

To unpublish an IP camera stream you must remove the connection owning the stream. You can do it from your server:

<div class="lang-tabs-container" markdown="1">

<div class="lang-tabs-header">
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; font-weight: bold">REST API</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Java</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Node</button>
</div>

<div id="rest-api" class="lang-tabs-content" markdown="1">

Use method **[DELETE /api/sessions/&lt;SESSION_ID&gt;/connection/&lt;CONNECTION_ID&gt;](reference-docs/REST-API#delete-apisessionsltsession_idgtconnectionltconnection_idgt)**

</div>

<div id="java" class="lang-tabs-content" style="display:none" markdown="1">

```java
// Find the desired Connection object in the list returned by Session.getActiveConnections()
session.forceDisconnect(connection);
```

See [JavaDoc](api/openvidu-java-client/io/openvidu/java/client/Session.html){:target="_blank"}

</div>

<div id="node" class="lang-tabs-content" style="display:none" markdown="1">

```node
// Find the desired Connection object in the array Session.activeConnections
session.forceDisconnect(connection);
```

See [TypeDoc](api/openvidu-node-client/classes/session.html#forcedisconnect){:target="_blank"}

</div>

</div>

> **WARNING**: you cannot remove an IP camera by directly deleting its Stream. You must delete the Connection object instead. Trying to remove an IP camera by deleting its Stream instead of its Connection will result in an error. See HTTP responses of method [**DELETE /api/sessions/&lt;SESSION_ID&gt;/stream/&lt;STREAM_ID&gt;**](reference-docs/REST-API#delete-apisessionsltsession_idgtstreamltstream_idgt){:target="_blank"}

<br>

---

## Configuring IP cameras

When [publishing an IP camera](#how-to-publish-ip-cameras), you can configure 2 properties that will affect the management of the camera's media stream. These are:

#### adaptativeBitrate

Whether to decode the IP camera stream in OpenVidu to allow adapting the bitrate depending on network conditions or not. It is active by default, and it allows OpenVidu Server to provide a robust and reliable flow of the camera's stream. But of course this has a CPU cost.

Some use cases may not need this decoding process for the IP camera video. For example, if your IP camera and OpenVidu are both located in the same network (and therefore there will be no packet losses or buffer congestion) and you are sure that the clients subscribing to the stream will support the same codec used by the RTSP camera stream, then setting this property to false will save valuable CPU power.

#### onlyPlayWithSubscribers

Whether to enable the IP camera stream only when some user is subscribed to it or not. What this means is that OpenVidu Server will only establish the RTSP connection with the IP camera when some participant asks to subscribe to the camera's stream. The rest of the time OpenVidu Server will not be effectively receiving any packets from the IP camera, saving CPU power and bandwidth. This option is active by default.

The counterpart to this option, which in principle would always seem desirable, is that the first participant requesting to subscribe to the camera's stream will take a little longer to do so, as OpenVidu Server has to establish the RTSP connection with the camera in the first place. Just after the last participant subscribed to the camera's stream unsubscribes from it, the RTSP connection between OpenVidu Server and the IP camera will be closed again, and the cycle starts again (next first participant subscribing to the camera's stream will have to wait longer than usual to receive the video).

Generally speaking you'll want this option set to true, but if for your particular use case the response time of the first subscriber to the camera's stream is vital, you can set this option to false to never stop receiving the camera's feed.

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
                btn.style.fontWeight = btn === event.target ? 'bold' : 'normal';
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