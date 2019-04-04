<h2 id="section-title">REST API Pro</h2>
<hr>

OpenVidu Pro provides all of [OpenVidu Community Edition REST operations](/reference-docs/REST-API/){:target="_blank"}, but also includes some extra REST operations of its own.

All REST operations have in common the header referred to authorization. It is implemented via Basic Auth, and it is as simple as applying Base64 encoding to the username (always "OPENVIDUAPP") and the password (your **secret** shared with openvidu-server). If authorization header is wrong, every call to any REST API operation will return HTTP status `401`.

For example, for secret "MY_SECRET", the final valid HTTP header would be

> `Authorization: Basic T1BFTlZJRFVBUFA6TVlfU0VDUkVU`

### List of available operations
<br>

- Get OpenVidu Pro active configuration: [**GET /pro/config**](#get-proconfig)
- Restart OpenVidu Pro: [**POST /pro/restart**](#post-prorestart)


### GET `/pro/config`

| _GET OPENVIDU PRO CONFIGURATION_   | _PARAMETERS_                                                                                                |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Operation**     | GET                                                                                                                      |
| **URL**           | https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/pro/config                                                                            |
| **Headers**       | Authorization: Basic _EncodeBase64(OPENVIDUAPP:&lt;YOUR_SECRET&gt;)_                                                     |
| **Sample return** | ```{"version": "2.9.0", "openviduServerDependencyVersion": "2.9.0", "openviduProStatsMonitoringInterval": 30, "openviduProStatsWebrtcInterval": 20, "openviduPublicurl": "https://localhost:4443/", "openviduCdr": false, "maxRecvBandwidth": 1000, "minRecvBandwidth": 300, "maxSendBandwidth": 1000, "minSendBandwidth": 300, "openviduRecording": true, "openviduRecordingVersion": "2.9.0", "openviduRecordingPath": "/opt/openvidu/recordings/", "openviduRecordingPublicAccess": true, "openviduRecordingNotification": "publisher_moderator", "openviduRecordingCustomLayout": "/opt/openvidu/custom-layout/", "openviduRecordingAutostopTimeout": 120}``` |

> **Returned JSON**
>
> - `version`: version of OpenVidu Server Pro
> - `openviduServerDependencyVersion`: version of OpenVidu Server Community Edition upon which this version of OpenVidu Server Pro is built on
> - `openviduProStatsMonitoringInterval`: interval in seconds for CPU, memory and net usage stats gathering in OpenVidu Server Pro host machine
> - `openviduProStatsWebrtcInterval`: interval in seconds for WebRTC stats gathering from Kurento Media Server WebRTC endpoints
> - **Rest of properties**: values given to **[system properties](/reference-docs/openvidu-server-params/){:target="_blank"}** on OpenVidu Server Pro launch. These properties are common to method [GET /config](/reference-docs/REST-API/#get-config){:target="_blank"} of OpenVidu Server Community Edition

---

### POST `/pro/restart`

| _RESTART OPENVIDU PRO_ | _PARAMETERS_                                                                    |
| ---------------------- | ------------------------------------------------------------------------------- |
| **Operation**          | POST                                                                            |
| **URL**                | https://&lt;YOUR_OPENVIDUSERVER_IP&gt;/pro/restart/                             |
| **Headers**            | Authorization: Basic _EncodeBase64(OPENVIDUAPP:&lt;YOUR_SECRET&gt;)_<br/>Content-Type: application/json |
| **Body**               | ```{"openvidu.secret": "MY_SECRET", "openvidu.cdr": true, "openvidu.recording": true, "openvidu.recording.public-access": true, "openvidu.recording.notification": "publisher_moderator", "openvidu.recording.path": "/opt/openvidu/recordings", "openvidu.recording.custom-layout": "/opt/openvidu/custom-layout", "openvidu.recording.autostop-timeout": 120, "openvidu.streams.video.max-recv-bandwidth": 1000, "openvidu.streams.video.min-recv-bandwidth": 300, "openvidu.streams.video.max-send-bandwidth": 1000, "openvidu.streams.video.min-send-bandwidth": 300, "openvidu.pro.stats.monitoring-interval": 30, "openvidu.pro.stats.webrtc-interval": 20}``` |

> **Body parameters**
>
> The body of the POST request is a JSON object with the new [OpenVidu system properties](/reference-docs/openvidu-server-params/){:target="_blank"} to be applied on the restart process. Not all of them are available, and a few are exclusive to OpenVidu Pro (`openvidu.pro.stats.monitoring-interval`, `openvidu.pro.stats.webrtc-interval`). The complete list of available properties is listed below
>
> ---
>
> - **openvidu.secret** _(optional string)_ : new secret to secure OpenVidu Pro
> - **openvidu.cdr** _(optional boolean)_ : whether to enable OpenVidu Call Detail Record or not
> - **openvidu.recording** _(optional boolean)_ : whether to enable OpenVidu recording module or not
> - **openvidu.recording.public-access** _(optional boolean)_ : whether to allow free http access to recorded sessions or not
> - **openvidu.recording.notification** _(optional string)_ : which users should receive the recording events in the client side (`"all"`, `"publisher_moderator"`, `"moderator"` or `"none"`)
> - **openvidu.recording.path** _(optional string)_ : system path where to store the video files of recorded session
> - **openvidu.recording.custom-layout** _(optional string)_ : sytem path where OpenVidu Server should look for custom recording layouts
> - **openvidu.recording.autostop-timeout** _(optional number)_ : timeout in seconds for recordings to automatically stop
> - **openvidu.streams.video.max-recv-bandwidth** _(optional number)_ : maximum video bandwidth sent from clients to OpenVidu Server, in kbps. 0 means unconstrained
> - **openvidu.streams.video.min-recv-bandwidth** _(optional number)_ : minimum video bandwidth sent from clients to OpenVidu Server, in kbps. 0 means unconstrained
> - **openvidu.streams.video.max-send-bandwidth** _(optional number)_ : maximum video bandwidth sent from OpenVidu Server to clients, in kbps. 0 means unconstrained
> - **openvidu.streams.video.min-send-bandwidth** _(optional number)_ : minimum video bandwidth sent from OpenVidu Server to clients, in kbps. 0 means unconstrained
> - **openvidu.pro.stats.monitoring-interval** _(optional number)_ : interval in seconds for CPU, memory and net usage stats gathering in OpenVidu Server Pro host machine. 0 means no gathering at all
> - **openvidu.pro.stats.webrtc-interval** _(optional number)_ : interval in seconds for WebRTC stats gathering from Kurento Media Server WebRTC endpoints. 0 means no gathering at all

<div></div>

> **HTTP responses**
>
> - `200`: the restarting process has been initialized. All properties are valid and OpenVidu Server should restart properly
> - `400`: there's some problem with a body parameter. The response message will provide further details