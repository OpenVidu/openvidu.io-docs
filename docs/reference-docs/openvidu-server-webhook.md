<h2 id="section-title">OpenVidu Server Webhook</h2>
<hr>

OpenVidu offers a webhook service to receive session events in your app server.

### Enable Webhook service

The following [system properties](reference-docs/openvidu-server-params){:target="_blank"} allow enabling and configuring OpenVidu Server Webhook service:

- **`OPENVIDU_WEBHOOK`**: set it to true to enable webhook service.
- **`OPENVIDU_WEBHOOK_ENDPOINT`**: configure the HTTP endpoint where OpenVidu Server will send the POST messages with session events. This property is mandatory if `OPENVIDU_WEBHOOK` is set to true.
- **`OPENVIDU_WEBHOOK_HEADERS`**: an array of HTTP headers that OpenVidu Server will append to each POST message. For example, you may configure HTTP authorization with this property. By default this property is an empty array (no headers)
- **`OPENVIDU_WEBHOOK_EVENTS`**: an array with the type of events you want OpenVidu Server to send to your webhook. By default all available events are enabled.

<br>

For example, the configuration properties below will launch OpenVidu Server with webhook service enabled, sending session events to an HTTP endpoint located at `http://12.34.56.78:5000/my_webhook`, passing a Basic Auth header and sending only `sessionCreated`, `sessionDestroyed` and `recordingStatusChanged` events.

```console
OPENVIDU_WEBHOOK=true
OPENVIDU_WEBHOOK_ENDPOINT=http://12.34.56.78:5000/my_webhook
OPENVIDU_WEBHOOK_HEADERS=[\"Authorization:\ Basic\ T1BFTlZJRFVBUFA6TVlfU0VDUkVU\"] \
OPENVIDU_WEBHOOK_EVENTS=["sessionCreated","sessionDestroyed","recordingStatusChanged"] \
```

### How your webhook endpoint should be

The HTTP endpoint you configure in property **`OPENVIDU_WEBHOOK_ENDPOINT`** must meet two criteria:

- Should listen to HTTP POST requests
- Should return a 200 success response upon each POST request

If OpenVidu Server cannot successfully send the HTTP POST messages to the endpoint and do not receive a 200 success as response, it will log one error message for each attempt. No further action will be taken.

### Available events in Webhook service

OpenVidu Server Webhook service is able to send the same events as defined for [OpenVidu CDR](reference-docs/openvidu-server-cdr){:target="_blank"}. The structure of each event is slightly different to the CDR ones: instead of having a single key named after the type of event and containing all of the event properties in a single object, webhook events have the type of event defined in an `event` property at the same level as the rest of properties. For example:

- For `sessionCreated` event, what in OpenVidu CDR is ...

        {"sessionCreated":{"sessionId":"fds4e07mdug1ga3h","timestamp":1538481330577}}

    ... in OpenVidu Webhook is ...

        {"event":"sessionCreated", "sessionId":"fds4e07mdug1ga3h","timestamp":1538481330577}

- For `webrtcConnectionCreated` event, what in OpenVidu CDR is ...

        {"webrtcConnectionCreated":{"sessionId":"MySession","timestamp":1561968541502,"streamId":"d2oomgno0isd9_CAMERA_ILTAU","participantId":"d2oomgno0isd9","connection":"OUTBOUND","videoSource":"CAMERA","videoFramerate":30,"videoDimensions":"{\"width\":640,\"height\":480}","audioEnabled":true,"videoEnabled":true}}

    ... in OpenVidu Webhook is ...

        {"event":"webrtcConnectionCreated","sessionId":"MySession","timestamp":1561968541502,"streamId":"d2oomgno0isd9_CAMERA_ILTAU","participantId":"d2oomgno0isd9","connection":"OUTBOUND","videoSource":"CAMERA","videoFramerate":30,"videoDimensions":"{\"width\":640,\"height\":480}","audioEnabled":true,"videoEnabled":true}

<br>
You can choose only those events that interest you from the whole set of available events with property `OPENVIDU_WEBHOOK_EVENTS`. For example, if you are only interested in recording related events, you should set the property to:

```console
OPENVIDU_WEBHOOK_EVENTS=["recordingStatusChanged"]
```

<br>