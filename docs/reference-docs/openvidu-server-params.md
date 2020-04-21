<h2 id="section-title">OpenVidu Server configuration</h2>
<hr>

This page lists all available configuration properties for OpenVidu Server, as well as their possible values and the default ones.<br>
These properties may be set:

- In any official production deployment of OpenVidu: in the **`.env`** config file at OpenVidu installation path (default `/opt/openvidu`).
- In the official [development OpenVidu docker container](https://hub.docker.com/r/openvidu/openvidu-server-kms){:target="_blank"}: passing them as environment variables with flag **`-e PROPERTY=value`**

---

- **[Configuration parameters for OpenVidu](#configuration-parameters-for-openvidu)**
- **[Special conditions of OpenVidu development container](#special-conditions-of-openvidu-development-container)**

---

### Configuration parameters for OpenVidu

| Parameter                          | Description   										           | Default value   |
| ---------------------------------- | --------------------------------------------------------------- | --------------- |
| **`OPENVIDU_DOMAIN_OR_PUBLIC_IP`** | Domain name where OpenVidu Server will be available. If you do not have one, the public IP of the machine. Clients will use this to connect to OpenVidu Server. For example:<br>• `openvidu.example.com`<br>• `198.51.100.1` | |
| **`OPENVIDU_SECRET`**                  | Secret used to connect to OpenVidu Server. This value is required when using the [REST API](reference-docs/REST-API/){:target="_blank"} or any server client ([openvidu-java-client](reference-docs/openvidu-java-client){:target="_blank"}, [openvidu-node-client](reference-docs/openvidu-node-client){:target="_blank"}), as well as when connecting to openvidu-server dashboard     | |
| **`CERTIFICATE_TYPE`** | Which type of certificate you want to use in your OpenVidu deployment. Can be:<br>• `selfsigned`<br>• `owncert`<br>• `letsencrypt` | ***selfsigned*** |
| **`OPENVIDU_CDR`**                     | Whether to enable Call Detail Record or not (check [Call Detail Record](reference-docs/openvidu-server-cdr){:target="_blank"}) | ***false*** |
| **`OPENVIDU_RECORDING`**               | Whether to enable recording module or not (check [Recording](advanced-features/recording/){:target="_blank"})  | ***false*** |
| **`OPENVIDU_RECORDING_PATH`**          | System path where to store the video files of recorded sessions. **WARNING: for OpenVidu Pro 2.13.0 this property does not support other than the default value** | ***/opt/openvidu/recordings*** |
| **`OPENVIDU_RECORDING_PUBLIC_ACCESS`** | Whether to allow free http access to recorded sessions or not.<br>If *true* path `/[OPENVIDU_RECORDING_PATH]` will be publicly accessible through `https://OPENVIDU_DOMAIN_OR_PUBLIC_IP/recordings` path. That means any client can connect to<br><strong style="word-break: break-all">https://OPENVIDU_DOMAIN_OR_PUBLIC_IP/recordings/RECORDING_ID/RECORDING_NAME.EXTENSION</strong><br>and access the recorded video file.<br>If *false* this path will be secured with `OPENVIDU_SECRET`.<br>For example, for OpenVidu Server configured with *OPENVIDU_DOMAIN_OR_PUBLIC_IP=my.url.com*<br>*OPENVIDU_RECORDING=true*<br>*OPENVIDU_RECORDING_PATH=/my/path*<br> *OPENVIDU_RECORDING_PUBLIC_ACCESS=true*<br>A session with id *foo* that has been recorded may generate a video file locally stored in the host machine under `/my/path/foo/foo.mp4` and accessible by any client connecting to `https://my.url.com/recordings/foo/foo.mp4` | ***false*** |
| **`OPENVIDU_RECORDING_NOTIFICATION`**  | Which users should receive the recording events in the client side (`recordingStarted`, `recordingStopped`). Can be `all` (every user connected to the session), `publisher_moderator` (users with role 'PUBLISHER' or 'MODERATOR'), `moderator` (only users with role 'MODERATOR') or `none` (no user will receive these events) | ***publisher_moderator*** |
| **`OPENVIDU_RECORDING_CUSTOM_LAYOUT`** | System path where OpenVidu Server should look for custom recording layouts  | ***/opt/openvidu/custom-layout*** |
| **`OPENVIDU_RECORDING_AUTOSTOP_TIMEOUT`** | Timeout in seconds for recordings to automatically stop (and the session involved to be closed) when conditions are met. See [Automatic stop of recordings](advanced-features/recording/#automatic-stop-of-recordings) to learn more | ***120*** |
| **`OPENVIDU_WEBHOOK`** | Whether to enable webhook service or not (check [OpenVidu Server Webhook](reference-docs/openvidu-server-webhook/){:target="_blank"}) | ***false*** |
| **`OPENVIDU_WEBHOOK_ENDPOINT`** | HTTP endpoint where OpenVidu Server will send the POST messages with webhook events |  |
| **`OPENVIDU_WEBHOOK_HEADERS`** | Array of strings with the HTTP headers that OpenVidu Server will append to each POST message of webhook events. For example, you may configure a Basic Auth header _name:pass_ setting this property to `[\"Authorization:\ Basic\ bmFtZTpwYXNz\"]` | ***[ ]*** |
| **`OPENVIDU_WEBHOOK_EVENTS`** | Array of strings with the type of events you want OpenVidu Server to send to your webhook | <span style="word-break: break-word; font-weight: bold; font-style: italic">["sessionCreated","sessionDestroyed","participantJoined","participantLeft","webrtcConnectionCreated","webrtcConnectionDestroyed","recordingStatusChanged"]</span><br>(all available events) |
| **`OPENVIDU_STREAMS_VIDEO_MAX_RECV_BANDWIDTH`** | Maximum video bandwidth sent from clients to OpenVidu Server, in kbps. 0 means unconstrained | ***1000*** |
| **`OPENVIDU_STREAMS_VIDEO_MIN_RECV_BANDWIDTH`** | Minimum video bandwidth sent from clients to OpenVidu Server, in kbps. 0 means unconstrained | ***300***  |
| **`OPENVIDU_STREAMS_VIDEO_MAX_SEND_BANDWIDTH`** | Maximum video bandwidth sent from OpenVidu Server to clients, in kbps. 0 means unconstrained | ***1000*** |
| **`OPENVIDU_STREAMS_VIDEO_MIN_SEND_BANDWIDTH`** | Minimum video bandwidth sent from OpenVidu Server to clients, in kbps. 0 means unconstrained | ***300***  |
| **`OPENVIDU_SESSIONS_GARBAGE_INTERVAL`** | How often the garbage collector of non active sessions runs. This helps cleaning up sessions that have been initialized through REST API (and maybe tokens have been created for them) but have had no users connected. Default to 900s (15 mins). 0 to disable the non active sessions garbage collector | ***900***  |
| **`OPENVIDU_SESSIONS_GARBAGE_THRESHOLD`** | Minimum time in seconds that a non active session must have been in existence for the garbage collector of non active sessions to remove it. Default to 3600s (1 hour). If non active sessions garbage collector is disabled (property `OPENVIDU_SESSIONS_GARBAGE_INTERVAL` is set to 0) this property is ignored | ***3600***  |

<br>

---

### Special conditions of OpenVidu development container

When using the official [development OpenVidu docker container](https://hub.docker.com/r/openvidu/openvidu-server-kms){:target="_blank"} to develop your app in your LAN network, there are some restrictions and also some extra parameters that you should take into account.

In the development container **these configuration properties won't have effect**, or may have unknown effects if declared:

- `OPENVIDU_DOMAIN_OR_PUBLIC_IP`: use `OPENVIDU_PUBLICURL` instead (see below).
- `CERTIFICATE_TYPE`: in LAN networks certificates don't make sense.

Rest of common configuration properties are available for the development container. You can also set the following ones that are **only suitable for the development container**:

| Parameter                          | Description   										           | Default value   |
| ---------------------------------- | --------------------------------------------------------------- | --------------- |
| **`OPENVIDU_PUBLICURL`** | Full URL where OpenVidu Server will be accessible. This includes the protocol, hostname and port. Clients will use this to connect to OpenVidu Server. This substitutes property `OPENVIDU_DOMAIN_OR_PUBLIC_IP` when OpenVidu is running in the dev container in your LAN network. For example:<br>• `https://localhost:4443/`<br>• `https://192.168.1.111:4443/` | ***https://localhost:PORT/***<br>Being _PORT_ the configuration parameter `server.port` (by default`4443`) |

<br>