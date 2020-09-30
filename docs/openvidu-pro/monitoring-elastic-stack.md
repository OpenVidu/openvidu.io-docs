<h2 id="section-title">Monitoring - Elastic Stack</h2>
<hr>

- **[Kibana Dashboards](#kibana-dashboards)**
    - [OpenVidu Session Dashboard](#openvidu-sessions-dashboard)
    - [OpenVidu Recordings dashboard](#openvidu-recordings-dashboard)
    - [OpenVidu Clustering dashboard](#openvidu-clustering-dashboard)
- **[Accessing Kibana](#accessing-kibana)**
- **[Reviewing logs](#reviewing-logs)**
    - [Log Search Examples](#searching-examples)
- **[Configuring an external Elastic Stack](#configuring-an-external-elastic-stack)**
- **[Creating your own visualizations and dashboards](#creating-your-own-visualizations-and-dashboards)**

---

<p style="font-size: 18px; color: #7a7a7a; margin-top: 30px; padding: 4px;">
OpenVidu Pro brings the power of <a href="https://www.elastic.co/" target="_blank">Elastic Stack</a>. Events and monitoring stats are sent to <a href="https://www.elastic.co/elasticsearch/" target="_blank">Elasticsearch</a> and can be visualized through <a href="https://www.elastic.co/kibana/" target="_blank">Kibana</a>.
</p>


## Kibana Dashboards

By default, OpenVidu Pro imports to Kibana 3 different dashboards to monitor some useful information about:

- OpenVidu Sessions 
- OpenVidu Recordings
- CPU usage of Media Nodes (Clustering information)

Let's see all the different dashboards:

### OpenVidu Sessions dashboard

This dashboard presents a summary of your video sessions and the server resources usage. That includes:

- CPU and memory usage of the server
- The number of session per day
- The location of your users
- The number of publishers and subscribers you have at any time
- The total streamed minutes over time
- Some low-level interesting stats related to the media connections

The last point includes things like the average time to select a pair candidate during the negotiation process, the average milliseconds your clients take to complete the ICE gathering process with OpenVidu Server, the ratio of successful and failed connections, and some WebRTC stats for your published and subscribed streams (Jitter, packet loss, Round-Trip-Time, target bitrate...)

All in all, this information will help you understand better the behavior and performance of your sessions.

<br>

<div class="row">
    <div style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro1" href="img/docs/openvidu-pro/elastic/sessions-dashboard.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/sessions-dashboard.png"/></a>
    </div>
</div>

---

### OpenVidu Recordings dashboard

This dashboard presents at a glance the status of your recordings. It includes information such as:

- The total number of recordings per day
- Average duration and size of your recorded files
- The distributions of you recordings by duration and size
- The ratio of recordings according to their output mode ([COMPOSED](advanced-features/recording/#composed-recording){:target="_blank"} or [INDIVIDUAL](advanced-features/recording/#individual-stream-recording){:target="_blank"} recordings) and their recorded tracks ([audio/video recordings](advanced-features/recording/#audio-only-and-video-only-recordings){:target="_blank"})

<br>

<div class="row">
    <div style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro2" href="img/docs/openvidu-pro/elastic/recordings-dashboard.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/recordings-dashboard.png"/></a>
    </div>
</div>

---

### OpenVidu Clustering dashboard

This dashboard is aimed to show all of the information related to the cluster status and behavior over time. Right now it allows you to inspect the CPU load of each one of your Media Nodes over time.

<div class="row">
    <div style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro4" href="img/docs/openvidu-pro/elastic/clustering-dashboard.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/clustering-dashboard.png"/></a>
    </div>
</div>

## Accessing Kibana

OpenVidu Pro serves Kibana through path **/kibana**. So, if you have deployed OpenVidu Pro with domain **my.domain.com**, you will be able to access OpenVidu Inspector through **https://my.domain.com/inspector** and Kibana through **https://my.domain.com/kibana**

The Elastic Stack deployed with OpenVidu is secured with Basic Auth by default. When connecting to it for the first time you will have to enter the user and password specified when deploying OpenVidu Pro.

<br>

---

## Reviewing logs

Many of OpenVidu processes send their logs to Elasticsearch, so you can review their logs directly from Kibana. All the indices which have logs from services are:

- **filebeat-kurento***: Kurento Media Server logs.
- **filebeat-coturn***: Coturn(TURN/STUN server) logs.
- **filebeat-redis***: Redis logs (This service is used to store TURN credentials).
- **openvidu-logs***: OpenVidu Server logs.

To search for logs you need to:

<div class="row">
    <div class="pro-gallery-steps" style="margin: 25px 35px 25px 35px">
        <a data-fancybox="gallery-pro9" data-caption="First of all, go to the 'Logs' section of Kibana." href="img/docs/openvidu-pro/elastic/review-logs-1.png"><img style="max-height: 400px" class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/review-logs-1.png"/></a>
        <a data-fancybox="gallery-pro9" data-caption="Then go to settings, and configure from which index you want to search logs. In this particular example, we're searching Kurento Media Server logs by setting 'Log indices' to: 'filebeat-kurento'." href="img/docs/openvidu-pro/elastic/review-logs-2.png"><img class="img-responsive img-pro" style="max-height: 400px" src="img/docs/openvidu-pro/elastic/review-logs-2.png"/></a>
        <a data-fancybox="gallery-pro9" data-caption="Add to 'Log Columns' the attributes of the index you want to see in your logs stream. In this example we're adding the attribute 'log_level' to see the type of log ('INFO', 'WARN', 'ERROR', etc...). 
      The attributes may change depending of the index you're reading. For example, in OpenVidu Server Pro, the log level is in the attribute 'severity' for 'openvidu-logs*' indices." href="img/docs/openvidu-pro/elastic/review-logs-3.png"><img class="img-responsive img-pro" style="max-height: 400px" src="img/docs/openvidu-pro/elastic/review-logs-3.png"/></a>
        <a data-fancybox="gallery-pro9" data-caption="Enter what you want to search. You can search for literals, attribute values, etc..." href="img/docs/openvidu-pro/elastic/review-logs-4.png"><img class="img-responsive img-pro" style="max-height: 400px" src="img/docs/openvidu-pro/elastic/review-logs-4.png"/></a>
    </div>
    <div class="slick-captions">
      <div class="caption"><p>First of all, go to the <strong>Logs</strong> section of Kibana.</p></div>
      <div class="caption"><p>Go to settings, and configure from which index you want to search logs. In this particular example, we're searching Kurento Media Server logs by setting <strong>Log indices</strong> to: <code>filebeat-kurento*</code>.</p></div>
      <div class="caption"><p>Add to <strong>Log Columns</strong> the attributes of the index you want to see in your logs stream. In this example we're adding the attribute <code>log_level</code> to see the type of log (<code>INFO</code>, <code>WARN</code>, <code>ERROR</code>, etc...). 
      The attributes may change depending of the index you're reading. For example, in OpenVidu Server Pro, the log level is in the attribute <code>severity</code> for <code>openvidu-logs*</code> indices.</p></div>
      <div class="caption"><p>Enter what you want to search. You can search for literals, attribute values, etc...</div>
    </div>
</div>

### Searching Examples

- Search for a literal in Kurento Media Server logs and see the context:

<div class="row">
    <div style="margin: 5px 15px 35px 15px">
        <video controls class="img-responsive video-pro" style="max-height: 600px" src="img/docs/openvidu-pro/elastic/search-example-1.mp4"/>
    </div>
</div>

- Search by log level in OpenVidu Server Pro logs:

<div class="row">
    <div style="margin: 5px 15px 35px 15px">
        <video controls class="img-responsive video-pro" style="max-height: 600px" src="img/docs/openvidu-pro/elastic/search-example-2.mp4"/>
    </div>
</div>

- Search for logs of one specific Media Node IP:

<div class="row">
    <div style="margin: 5px 15px 35px 15px">
        <video controls class="img-responsive video-pro" style="max-height: 600px" src="img/docs/openvidu-pro/elastic/search-example-3.mp4"/>
    </div>
</div>

<br>

---

## Configuring an external Elastic Stack

An external ELK can be configured with and without security.

| OpenVidu Version  | AWS Elasticsearch Service |  ELK official services | ELK On premises |
|-------------------|---------------------------|------------------------|-----------------|
| <= 2.15.0         | -                         | -                      | -               |
| 2.16.0            |  >= 7.3.0                 | >= 7.3.0               | >= 7.3.0        |

### OpenVidu Pro Configuration for external Elastic Stack

If you have an external Elastic Stack configured without security, you only need to specify these properties in the `/opt/openvidu/.env` file
of your OpenVidu Pro Node. These properties are urls that need to have specified a port, even if it is port 80 or 443. For example:

```html
OPENVIDU_PRO_ELASTICSEARCH_HOST=https://elk.example.com:443
OPENVIDU_PRO_KIBANA_HOST=https://elk.example.com:443/kibana
```

If you have configured a user in your Elastic Stack, you need to specify it also in your `/opt/openvidu/.env`. Only basic auth is supported, which is used by Elastic Stack in their Basic License and is free to use. You need to modify these properties:

```
ELASTICSEARCH_USERNAME=<YOUR_ELK_USER>
ELASTICSEARCH_PASSWORD=<YOUR_ELK_USER_PASSWORD>
```

> - Managed Users by [OpenDistro Elastic Stack](https://opendistro.github.io/for-elasticsearch/) are compatible too. This is the distribution of Elastic Stack used by AWS.
> - You can see how to create a **fine-grained** user for OpenVidu in this **[section](openvidu-pro/monitoring-elastic-stack/#create-fine-grained-used){:target="_blank"}**

### On Premise Elastic Stack

> Work in progress...

### Managed Elastic Stack in AWS with OpenVidu Pro:

In the next section you will see how to configure a Managed Elastic Stack in AWS and how to configure it for OpenVidu:

> Work in Progress...

<!-- 
<div class="row">
    <div class="pro-gallery-steps" style="margin: 25px 35px 25px 35px">
        <a data-fancybox="gallery-pro10" data-caption="First you need to go to the 'Elasticsearch Service' in your AWS Account" href="img/docs/openvidu-pro/elastic/aws_elk_1.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/aws_elk_1.png"/></a>
        <a data-fancybox="gallery-pro10" data-caption="Select: 'Create new Domain'" href="img/docs/openvidu-pro/elastic/aws_elk_2.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/aws_elk_2.png"/></a>
        <a data-fancybox="gallery-pro10" data-caption="We select 'openvidu' index, because that's the index of every OpenVidu Pro event stored in Elasticsearch" href="img/docs/openvidu-pro/elastic/tutorial3.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/tutorial3.png"/></a>
        <a data-fancybox="gallery-pro10" data-caption="The visualization page will be shown. Now we have to filter the desired events. In this case, we just want the 'userSummary' event, as it gathers all the information about the final users connecting to our sessions. So, we make sure that field 'elastic_type.keyword' is 'userSummary'" href="img/docs/openvidu-pro/elastic/tutorial4.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/tutorial4.png"/></a>
        <a data-fancybox="gallery-pro10" data-caption="Finally we have to configure the data passed to our graph. The metric we want (Y-axis) is simply 'Count', because there is one 'userSummary' event for each final user connecting to a session. And as Bucket (X-axis) we configure a Date Histogram by using 'timestamp' field of the event" href="img/docs/openvidu-pro/elastic/tutorial5.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/tutorial5.png"/></a>
        <a data-fancybox="gallery-pro10" data-caption="To store the new visualization just click on 'Save' button in the upper menu and give it a meaningful name" href="img/docs/openvidu-pro/elastic/tutorial6.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/tutorial6.png"/></a>
    </div>
    <div class="slick-captions">
      <div class="caption"><p>First you need to go to the <strong>Elasticsearch Service**</strong> in your AWS Account</p></div>
      <div class="caption"><p>Select: <strong>Create new Domain</strong></p></div>
      <div class="caption"><p>We select <strong>openvidu</strong> index, because that's the index of every OpenVidu Pro event stored in Elasticsearch</p></div>
      <div class="caption"><p>The visualization page will be shown. Now we have to filter the desired events. In this case, we just want the <strong>userSummary</strong> event, as it gathers all the information about the final users connecting to our sessions. So, we make sure that field <strong>elastic_type.keyword</strong> is <strong>userSummary</strong></p></div>
      <div class="caption"><p>Finally we have to configure the data passed to our graph. The metric we want (Y-axis) is simply <strong>Count</strong>, because there is one "userSummary" event for each final user connecting to a session. And as Bucket (X-axis) we configure a Date Histogram by using <strong>timestamp</strong> field of the event</p></div>
      <div class="caption"><p>To store the new visualization just click on <strong>Save</strong> button in the upper menu and give it a meaningful name</p></div>
    </div>
</div>
-->

## Creating your own visualizations and dashboards

The dashboards presented above, by default included in OpenVidu Pro, are just an example of what can be done thanks to Kibana. You can create your own visualizations, and set up your very own dashboards with them. To do so, you have available multiple events that OpenVidu Pro periodically stores in Elasticsearch, and you can then use them in Kibana to compose different types of graphs and other useful visual representations.

<p align="center">
  <img class="img-responsive openvidu-pro-img" style="padding: 20px 0 8px 0" src="img/docs/openvidu-pro/elastic/elastic-stack.png">
</p>

Each one of these events stored by OpenVidu Pro in Elasticsearch has an `elastic_type` field to identify the specific type of event. This field may be:

<div>

<div class="monitoring-div">

<div></div>

<div class="version-container" markdown="1" style="margin-right: 5px; margin-top: 15px">

- `cdr`: event of CDR/Webhook. Can take multiple forms according to the type of event (see [OpenVidu CDR](reference-docs/openvidu-server-cdr/){:target="_blank"})
- `kms`: Kurento Media Server event. These events are always associated to one WebRTC endpoint (a publisher or a subscriber). Can take multiple forms according to the type of event (see [Kurento docs](https://doc-kurento.readthedocs.io/en/latest/features/events.html){:target="_blank"})
- `monitoringStats`: event of CPU, memory and network statistics usage of OpenVidu Sever Pro Node
- `webrtcStats`: event of WebRTC statistics for each media endpoint established in Media Nodes
- `sessionSummary`: summary of a session, stored once it is closed
- `recordingSummary`: summary of a recording, stored once its session is closed
- `userSummary`: summary of a user, stored once its session is closed
- `connectionSummary`: summary of a connection, stored once its session is closed
- `publisherSummary`: summary of a publisher, stored once its session is closed
- `subscriberSummary`: summary of a subscriber, stored once its session is closed

</div>

<div class="lang-tabs-container elastic-events version-container" markdown="1">

<div class="lang-tabs-header">
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; font-weight: bold">cdr</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">kms</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">monitoringStats</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">webrtcStats</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">sessionSummary</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">recordingSummary</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">userSummary</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">connectionSummary</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">publisherSummary</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">subscriberSummary</button>
</div>

<div id="cdr" class="lang-tabs-content" markdown="1">
```json
{
  "sessionId": "TestSession",
  "timestamp": 1582277160836,
  "streamId": "str_CAM_AOIa_con_XZvrQOF5Du",
  "participantId": "con_XZvrQOF5Du",
  "connection": "OUTBOUND",
  "videoSource": "CAMERA",
  "videoFramerate": 30,
  "videoDimensions": "{\"width\":640,\"height\":480}",
  "audioEnabled": true,
  "videoEnabled": true,
  "event": "webrtcConnectionCreated",
  "elastic_type": "cdr"
}
```
</div>

<div id="kms" class="lang-tabs-content" style="display:none" markdown="1">
```json
{
  "state": "FLOWING",
  "padName": "default",
  "mediaType": "VIDEO",
  "type": "MediaFlowOutStateChange",
  "timestamp": 1582277162316,
  "sessionId": "TestSession",
  "user": "70558CA23053A8E9",
  "connection": "con_XZvrQOF5Du",
  "endpoint": "str_CAM_AOIa_con_XZvrQOF5Du",
  "msSinceEndpointCreation": 1480,
  "elastic_type": "kms"
}
```
</div>

<div id="monitoringstats" class="lang-tabs-content" style="display:none" markdown="1">
```json
{
  "timestamp": 1582276785036,
  "cpu": 15.919558359621451,
  "mem": {
    "used": 7667204,
    "percentage": 47.48673231102802
  },
  "net": {
    "veth0c3780f": {
      "rxBytes": 0,
      "txBytes": 1210
    },
    "wlp58s0": {
      "rxBytes": 1487510,
      "txBytes": 442145
    }
  },
  "elastic_type": "monitoringStats"
}
```
</div>

<div id="webrtcstats" class="lang-tabs-content" style="display:none" markdown="1">
```json
{
  "sessionId": "TestSession",
  "user": "70558CA23053A8E9",
  "connection": "con_XZvrQOF5Du",
  "endpoint": "str_CAM_AOIa_con_XZvrQOF5Du",
  "mediaType": "video",
  "jitter": 0.004166666883975267,
  "bytesReceived": 17703914,
  "packetsReceived": 17169,
  "packetsLost": 0,
  "timestamp": 1582277310832,
  "fractionLost": 0,
  "remb": 1000000,
  "firCount": 2,
  "pliCount": 0,
  "nackCount": 0,
  "sliCount": 0,
  "elastic_type": "webrtcStats"
}
```
</div>

<div id="sessionsummary" class="lang-tabs-content" style="display:none" markdown="1">
```json
{
  "createdAt": 1582277158591,
  "destroyedAt": 1582277414413,
  "sessionId": "TestSession",
  "customSessionId": "TestSession",
  "mediaMode": "ROUTED",
  "recordingMode": "MANUAL",
  "duration": 255,
  "reason": "lastParticipantLeft",
  "users": {
    "numberOfElements": 2,
    "content": [
      {
        "id": "7636DE7CA51A6EEC",
        "location": "Rome, Italy",
        "platform": "Chrome 80.0.3987.116 on Linux 64-bit",
        "connections": {
          "numberOfElements": 1,
          "content": [
            {
              "createdAt": 1582277341959,
              "destroyedAt": 1582277414401,
              "connectionId": "con_DdZXrn4e2i",
              "clientData": "TestClient",
              "serverData": "",
              "duration": 72,
              "reason": "disconnect",
              "publishers": {
                "numberOfElements": 0,
                "content": []
              },
              "subscribers": {
                "numberOfElements": 1,
                "content": [
                  {
                    "sessionId": "TestSession",
                    "timestamp": 1582277412497,
                    "startTime": 1582277342542,
                    "duration": 69,
                    "reason": "unsubscribe",
                    "streamId": "str_CAM_AOIa_con_XZvrQOF5Du",
                    "receivingFrom": "con_XZvrQOF5Du",
                    "videoSource": "CAMERA",
                    "videoFramerate": 30,
                    "videoDimensions": "{\"width\":640,\"height\":480}",
                    "audioEnabled": true,
                    "videoEnabled": true,
                    "user": "7636DE7CA51A6EEC",
                    "connection": "con_DdZXrn4e2i",
                    "elastic_type": "subscriberSummary"
                  }
                ]
              },
              "sessionId": "TestSession",
              "user": "7636DE7CA51A6EEC",
              "timestamp": 1582277414413,
              "elastic_type": "connectionSummary"
            }
          ]
        },
        "sessionId": "TestSession",
        "timestamp": 1582277414413,
        "elastic_type": "userSummary"
      },
      {
        "id": "70558CA23053A8E9",
        "location": "Buenos Aires, Argentina",
        "platform": "Chrome 80.0.3987.116 on Linux 64-bit",
        "connections": {
          "numberOfElements": 1,
          "content": [
            {
              "createdAt": 1582277159216,
              "destroyedAt": 1582277414295,
              "connectionId": "con_XZvrQOF5Du",
              "clientData": "TestClient",
              "serverData": "",
              "duration": 255,
              "reason": "disconnect",
              "publishers": {
                "numberOfElements": 1,
                "content": [
                  {
                    "sessionId": "TestSession",
                    "timestamp": 1582277414254,
                    "startTime": 1582277160836,
                    "duration": 253,
                    "reason": "disconnect",
                    "streamId": "str_CAM_AOIa_con_XZvrQOF5Du",
                    "videoSource": "CAMERA",
                    "videoFramerate": 30,
                    "videoDimensions": "{\"width\":640,\"height\":480}",
                    "audioEnabled": true,
                    "videoEnabled": true,
                    "user": "70558CA23053A8E9",
                    "connection": "con_XZvrQOF5Du",
                    "elastic_type": "publisherSummary"
                  }
                ]
              },
              "subscribers": {
                "numberOfElements": 0,
                "content": []
              },
              "sessionId": "TestSession",
              "user": "70558CA23053A8E9",
              "timestamp": 1582277414413,
              "elastic_type": "connectionSummary"
            }
          ]
        },
        "sessionId": "TestSession",
        "timestamp": 1582277414413,
        "elastic_type": "userSummary"
      }
    ]
  },
  "recordings": {
    "numberOfElements": 1,
    "content": [
      {
        "sessionId": "TestSession",
        "timestamp": 1582277407182,
        "startTime": 1582277358067,
        "duration": 0,
        "reason": "recordingStoppedByServer",
        "id": "TestSession",
        "name": "TestSession",
        "outputMode": "INDIVIDUAL",
        "hasAudio": true,
        "hasVideo": false,
        "size": 0,
        "elastic_type": "recordingSummary"
      }
    ]
  },
  "timestamp": 1582277414413,
  "elastic_type": "sessionSummary"
}
```
</div>

<div id="recordingsummary" class="lang-tabs-content" style="display:none" markdown="1">
```json
{
  "sessionId": "TestSession",
  "timestamp": 1582242127579,
  "startTime": 1582242114891,
  "duration": 568.8,
  "reason": "recordingStoppedByServer",
  "id": "TestSession",
  "name": "RecordingTest",
  "outputMode": "COMPOSED",
  "resolution": "1280x720",
  "recordingLayout": "BEST_FIT",
  "hasAudio": true,
  "hasVideo": true,
  "size": 38999950,
  "elastic_type": "recordingSummary"
}
```
</div>

<div id="usersummary" class="lang-tabs-content" style="display:none" markdown="1">
```json
{
  "id": "7636DE7CA51A6EEC",
  "location": "Rome, Italy",
  "platform": "Chrome 80.0.3987.116 on Linux 64-bit",
  "connections": {
    "numberOfElements": 1,
    "content": [
      {
        "createdAt": 1582277341959,
        "destroyedAt": 1582277414401,
        "connectionId": "con_DdZXrn4e2i",
        "clientData": "TestClient",
        "serverData": "",
        "duration": 72,
        "reason": "disconnect",
        "publishers": {
          "numberOfElements": 0,
          "content": []
        },
        "subscribers": {
          "numberOfElements": 1,
          "content": [
            {
              "sessionId": "TestSession",
              "timestamp": 1582277412497,
              "startTime": 1582277342542,
              "duration": 69,
              "reason": "unsubscribe",
              "streamId": "str_CAM_AOIa_con_XZvrQOF5Du",
              "receivingFrom": "con_XZvrQOF5Du",
              "videoSource": "CAMERA",
              "videoFramerate": 30,
              "videoDimensions": "{\"width\":640,\"height\":480}",
              "audioEnabled": true,
              "videoEnabled": true,
              "user": "7636DE7CA51A6EEC",
              "connection": "con_DdZXrn4e2i",
              "elastic_type": "subscriberSummary"
            }
          ]
        },
        "sessionId": "TestSession",
        "user": "7636DE7CA51A6EEC",
        "timestamp": 1582277414413,
        "elastic_type": "connectionSummary"
      }
    ]
  },
  "sessionId": "TestSession",
  "timestamp": 1582277414413,
  "elastic_type": "userSummary"
}
```
</div>

<div id="connectionsummary" class="lang-tabs-content" style="display:none" markdown="1">
```json
{
  "createdAt": 1582277341959,
  "destroyedAt": 1582277414401,
  "connectionId": "con_DdZXrn4e2i",
  "clientData": "TestClient",
  "serverData": "",
  "duration": 72,
  "reason": "disconnect",
  "publishers": {
    "numberOfElements": 0,
    "content": []
  },
  "subscribers": {
    "numberOfElements": 1,
    "content": [
      {
        "sessionId": "TestSession",
        "timestamp": 1582277412497,
        "startTime": 1582277342542,
        "duration": 69,
        "reason": "unsubscribe",
        "streamId": "str_CAM_AOIa_con_XZvrQOF5Du",
        "receivingFrom": "con_XZvrQOF5Du",
        "videoSource": "CAMERA",
        "videoFramerate": 30,
        "videoDimensions": "{\"width\":640,\"height\":480}",
        "audioEnabled": true,
        "videoEnabled": true,
        "user": "7636DE7CA51A6EEC",
        "connection": "con_DdZXrn4e2i",
        "elastic_type": "subscriberSummary"
      }
    ]
  },
  "sessionId": "TestSession",
  "user": "7636DE7CA51A6EEC",
  "timestamp": 1582277414413,
  "elastic_type": "connectionSummary"
}
```
</div>

<div id="publishersummary" class="lang-tabs-content" style="display:none" markdown="1">
```json
{
  "sessionId": "TestSession",
  "timestamp": 1582277414254,
  "startTime": 1582277160836,
  "duration": 253,
  "reason": "disconnect",
  "streamId": "str_CAM_AOIa_con_XZvrQOF5Du",
  "videoSource": "CAMERA",
  "videoFramerate": 30,
  "videoDimensions": "{\"width\":640,\"height\":480}",
  "audioEnabled": true,
  "videoEnabled": true,
  "user": "70558CA23053A8E9",
  "connection": "con_XZvrQOF5Du",
  "elastic_type": "publisherSummary"
}
```
</div>

<div id="subscribersummary" class="lang-tabs-content" style="display:none" markdown="1">
```json
{
  "sessionId": "TestSession",
  "timestamp": 1582277412497,
  "startTime": 1582277342542,
  "duration": 69,
  "reason": "unsubscribe",
  "streamId": "str_CAM_AOIa_con_XZvrQOF5Du",
  "receivingFrom": "con_XZvrQOF5Du",
  "videoSource": "CAMERA",
  "videoFramerate": 30,
  "videoDimensions": "{\"width\":640,\"height\":480}",
  "audioEnabled": true,
  "videoEnabled": true,
  "user": "7636DE7CA51A6EEC",
  "connection": "con_DdZXrn4e2i",
  "elastic_type": "subscriberSummary"
}
```


</div>
</div>
</div>
</div>

<br>

> **NOTE 1**: `sessionSummary` contains all the information available in the rest of summary documents, including an array of `recordingSummary` and an array of `userSummary`. In turn `userSummary` contains an array of `connectionSummary`, that finally contains an array of `publisherSummary` and other of `subscriberSummary`.
> To sum up, this is just a denormalization of the `sessionSummary` document, so Elasticsearch requests and Kibana visualizations are more flexible and easier to accomplish
> ---
> **NOTE 2**: `recordingSummary` events may not contain the final information of the actual recordings (specifically properties `size` and `duration`). This is so because `recordingSummary` event is generated just after its session is closed, but since release 2.11.0 recordings may need a post-processing phase before being available for download and having these properties properly defined. To overcome this limitation, you can simply use the `cdr` event of type `recordingStatusChanged` and status `ready` corresponding to this recording (see event in [CDR docs](reference-docs/openvidu-server-cdr/#recordingstatuschanged){:target="_blank"}). There you will have all properties of the recording well defined

<br>

You can create powerful visualizations and dashboards by using these documents. Let's see a quick example. Imagine that you are interested in knowing **how many users are connected to your OpenVidu sessions over time**.

<div class="row">
    <div class="pro-gallery-steps" style="margin: 25px 35px 25px 35px">
        <a data-fancybox="gallery-pro3" data-caption="First thing is navigating to 'Visualize' section in Kibana and clicking on the button to add a new visualization" href="img/docs/openvidu-pro/elastic/tutorial1.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/tutorial1.png"/></a>
        <a data-fancybox="gallery-pro3" data-caption="Then we have to choose a visualization type. In this case a vertical bar graph might be a pretty good choice" href="img/docs/openvidu-pro/elastic/tutorial2.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/tutorial2.png"/></a>
        <a data-fancybox="gallery-pro3" data-caption="We select 'openvidu' index, because that's the index of every OpenVidu Pro event stored in Elasticsearch" href="img/docs/openvidu-pro/elastic/tutorial3.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/tutorial3.png"/></a>
        <a data-fancybox="gallery-pro3" data-caption="The visualization page will be shown. Now we have to filter the desired events. In this case, we just want the 'userSummary' event, as it gathers all the information about the final users connecting to our sessions. So, we make sure that field 'elastic_type.keyword' is 'userSummary'" href="img/docs/openvidu-pro/elastic/tutorial4.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/tutorial4.png"/></a>
        <a data-fancybox="gallery-pro3" data-caption="Finally we have to configure the data passed to our graph. The metric we want (Y-axis) is simply 'Count', because there is one 'userSummary' event for each final user connecting to a session. And as Bucket (X-axis) we configure a Date Histogram by using 'timestamp' field of the event" href="img/docs/openvidu-pro/elastic/tutorial5.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/tutorial5.png"/></a>
        <a data-fancybox="gallery-pro3" data-caption="To store the new visualization just click on 'Save' button in the upper menu and give it a meaningful name" href="img/docs/openvidu-pro/elastic/tutorial6.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/tutorial6.png"/></a>
    </div>
    <div class="slick-captions">
      <div class="caption"><p>First thing is navigating to <strong>Visualize</strong> section in Kibana and clicking on the button to add a new visualization</p></div>
      <div class="caption"><p>Then we have to choose a visualization type. In this case a vertical bar graph might be a pretty good choice</p></div>
      <div class="caption"><p>We select <strong>openvidu</strong> index, because that's the index of every OpenVidu Pro event stored in Elasticsearch</p></div>
      <div class="caption"><p>The visualization page will be shown. Now we have to filter the desired events. In this case, we just want the <strong>userSummary</strong> event, as it gathers all the information about the final users connecting to our sessions. So, we make sure that field <strong>elastic_type.keyword</strong> is <strong>userSummary</strong></p></div>
      <div class="caption"><p>Finally we have to configure the data passed to our graph. The metric we want (Y-axis) is simply <strong>Count</strong>, because there is one "userSummary" event for each final user connecting to a session. And as Bucket (X-axis) we configure a Date Histogram by using <strong>timestamp</strong> field of the event</p></div>
      <div class="caption"><p>To store the new visualization just click on <strong>Save</strong> button in the upper menu and give it a meaningful name</p></div>
    </div>
</div>

> The example above is a very simple visualization, but you can apply any metric to any property (or set of properties) of any event (or set of events). You can explore pre-existing visualizations included by default in OpenVidu Pro, and for further info visit **[Kibana docs](https://www.elastic.co/guide/en/kibana/current/visualize.html){:target="_blank"}**

<br>

<script>
function changeLangTab(event) {
  var parent = event.target.parentNode.parentNode;
  var txt = event.target.textContent || event.target.innerText;
  var txt = txt.replace(/\s/g, "-").toLowerCase();
  for (var i = 0; i < parent.children.length; i++) {
    var child = parent.children[i];
    // Change appearance of language buttons
    if (child.classList.contains('lang-tabs-header')) {
        for (var j = 0; j < child.children.length; j++) {
            var btn = child.children[j];
            if (btn.classList.contains('lang-tabs-btn')) {
                btn.style.backgroundColor = btn === event.target ? '#e8e8e8' : '#f9f9f9';
                btn.style.fontWeight = btn === event.target ? 'bold' : 'normal';
            }
        }
    }
    // Change visibility of language content
    if (child.classList.contains('lang-tabs-content')) {
        if (child.id === txt) {
            child.style.display = 'block';
        } else {
            child.style.display = 'none';
        }
    }
  }
}
</script>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js"></script>
<script>
  $().fancybox({
    selector : '[data-fancybox]',
    infobar : true,
    arrows : false,
    loop: true,
    protect: true,
    transitionEffect: 'slide',
    buttons : [
        'close'
    ],
    clickOutside : 'close',
    clickSlide   : 'close',
  });
</script>

<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/brands.css" integrity="sha384-Px1uYmw7+bCkOsNAiAV5nxGKJ0Ixn5nChyW8lCK1Li1ic9nbO5pC/iXaq27X5ENt" crossorigin="anonymous">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/fontawesome.css" integrity="sha384-BzCy2fixOYd0HObpx3GMefNqdbA7Qjcc91RgYeDjrHTIEXqiF00jKvgQG0+zY/7I" crossorigin="anonymous">

<link rel="stylesheet" type="text/css" href="css/downloads/slick-1.6.0.css"/>
<link rel="stylesheet" type="text/css" href="css/slick-theme.css"/>
<script type="text/javascript" src="js/downloads/slick-1.6.0.min.js"></script>

<script>
    $('.slick-captions').slick({
      asNavFor: '.pro-gallery-steps',
      arrows: false,
      infinite: false,
      speed: 200,
      fade: true,
      dots: false
    });
    $('.pro-gallery-steps').slick({
      asNavFor: '.slick-captions',
      autoplay: false,
      arrows: true,
      prevArrow: '<div class="slick-btn slick-btn-prev"><i class="icon ion-chevron-left"></i></div>',
      nextArrow: '<div class="slick-btn slick-btn-next"><i class="icon ion-chevron-right"></i></div>',
      infinite: false,
      dots: true,
      responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          slidesToShow: 1
        }
      },
    ]
    });
</script>