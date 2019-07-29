<h2 id="section-title">OpenVidu Server Webhook</h2>
<hr>

OpenVidu offers a webhook service since **release 2.11.0** to receive session events in your app server.

### Enable Webhook service

The following [system properties](/reference-docs/openvidu-server-params){:target="_blank"} allow enabling and configuring OpenVidu Server Webhook service:

- **`openvidu.webhook`**: set it to true to enable webhook service.
- **`openvidu.webhook.endpoint`**: configure the HTTP endpoint where OpenVidu Server will send the POST messages with session events. This property is mandatory if `openvidu.webhook` is set to true.
- **`openvidu.webhook.headers`**: an array of HTTP headers that OpenVidu Server will append to each POST message. For example, you may configure HTTP authorization with this property. By default this property is an empty array (no headers)
- **`openvidu.webhook.events`**: an array with the type of events you want OpenVidu Server to send to your webhook. By default all available events are enabled.

<br>

Check out this sample command. It will launch OpenVidu Server with webhook service enabled, sending session events to HTTP endpoint located at `http://12.34.56.78:5000/my_webhook`, passing a Basic Auth header and sending only `sessionCreated`, `sessionDestroyed` and `recordingStatusChanged` events.

```console
java -jar \
    -Dopenvidu.secret=MY_SECRET \
    -Dopenvidu.publicurl=https://my.domain.com  \
    -Dopenvidu.recording=true \
    -Dopenvidu.webhook=true \
    -Dopenvidu.webhook.endpoint=http://12.34.56.78:5000/my_webhook \
    -Dopenvidu.webhook.headers=[\"Authorization:\ Basic\ T1BFTlZJRFVBUFA6TVlfU0VDUkVU\"] \
    -Dopenvidu.webhook.events=["sessionCreated","sessionDestroyed","recordingStatusChanged"] \
openvidu-server.jar
```

### How your webhook endpoint should be

The HTTP endpoint you configure in property **`openvidu.webhook.endpoint`** must meet two criteria:

- Should listen to HTTP POST requests
- Should return a 200 success response

If OpenVidu Server cannot successfully send the HTTP POST messages to the endpoint and do not receive a 200 success as response, it will log one error message for each attempt. No further action will be taken.

### Available events in Webhook service

OpenVidu Server Webhook service is able to send the same events as defined for [OpenVidu CDR](/reference-docs/openvidu-server-cdr){:target="_blank"}. The structure of each event is slightly different to the CDR ones: instead of having a single key named after the type of event and containing all of the event properties in a single object, webhook events have the type of event defined in an `event` property at the same level as the rest of properties. For example:

```json
{"sessionId":"TestSession","timestamp":1561969010392,"event":"sessionCreated"}

{"sessionId":"TestSession","timestamp":1561968541502,"streamId":"d2oomgno0isd9xqq_CAMERA_ILTAU","participantId":"d2oomgno0isd9xqq","connection":"OUTBOUND","videoSource":"CAMERA","videoFramerate":30,"videoDimensions":"{\"width\":640,\"height\":480}","audioEnabled":true,"videoEnabled":true,"event":"webrtcConnectionCreated"}
```

You can choose only those events that interest you from the whole set of available events with property `openvidu.webhook.events`. For example, if you are only interested in recording related events, you should set the property to:

```console
openvidu.webhook.events=["recordingStatusChanged"]
```

<br>