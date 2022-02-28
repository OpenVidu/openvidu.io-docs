<h2 id="section-title">Monitoring - Elastic Stack</h2>

<p style="font-size: 18px; color: #7a7a7a; margin-top: 30px; padding: 4px;">
OpenVidu Pro brings the power of <a href="https://www.elastic.co/" target="_blank">Elastic Stack</a>. Events and monitoring stats are sent to <a href="https://www.elastic.co/elasticsearch/" target="_blank">Elasticsearch</a> and can be visualized through <a href="https://www.elastic.co/kibana/" target="_blank">Kibana</a>.
</p>

---

- **[Accessing Kibana](#accessing-kibana)**
- **[Kibana Dashboards](#kibana-dashboards)**
    - [CPU vs Sessions/Connections/Streams/Recordings](#cpu-vs-sessionsconnectionsstreamsrecordings)
    - [OpenVidu Sessions](#openvidu-sessions)
    - [OpenVidu Recordings](#openvidu-recordings)
    - [Server Application Metrics](#server-application-metrics)
    - [Server Monitoring Metrics](#server-monitoring-metrics)
    - [[Metricbeat] Cluster Monitoring Metrics](#metricbeat-cluster-monitoring-metrics)
    - [[Metricbeat] Node Monitoring Metrics](#metricbeat-node-monitoring-metrics)
    - [[Metricbeat] Nginx Metrics](#metricbeat-nginx-metrics)
- **[Elasticsearch indexes](#elasticsearch-indexes)**
    - [Logs and metrics](#logs-and-metrics)
    - [OpenVidu Events](#openvidu-events)
- **[Creating your own visualizations and dashboards](#creating-your-own-visualizations-and-dashboards)**
- **[Reviewing logs](#reviewing-logs)**
    - [Reviewing logs with Kibana](#reviewing-logs-with-kibana)
    - [Reviewing logs and metrics using OpenVidu Inspector](#reviewing-logs-and-metrics-using-openvidu-inspector)
- **[Configuring an external Elastic Stack](#configuring-an-external-elastic-stack)**
    - [OpenVidu Pro Configuration for external Elastic Stack](#openvidu-pro-configuration-for-external-elastic-stack)
    - [Examples of managed Elastic Stack services](#examples-of-managed-elastic-stack-services)
        - [Elastic Stack in AWS with OpenVidu Pro configuration](#elastic-stack-in-aws-with-openvidu-pro-configuration)
        - [Elastic Stack in Elastic Cloud with OpenVidu Pro configuration](#elastic-stack-in-elastic-cloud-with-openvidu-pro-configuration)
    - [Create a fine-grained user](#create-a-fine-grained-user)
        - [Create a fine-grained user using Kibana UI](#create-a-fine-grained-user-using-kibana-ui)
        - [Create a fine-grained user using Elastic Stack REST API](#create-a-fine-grained-user-using-elastic-stack-rest-api)

---

## Accessing Kibana

OpenVidu Pro offers two different web dashboards:

- Access OpenVidu Inspector through **`https://DOMAIN_OR_PUBLIC_IP/inspector`**
- Access Kibana through **`https://DOMAIN_OR_PUBLIC_IP/kibana`**

The Elastic Stack deployed with OpenVidu is secured with Basic Auth by default. When connecting to it for the first time you will have to enter the user and password specified when deploying OpenVidu Pro.

<br>

---

## Kibana Dashboards

By default, OpenVidu Pro imports to Kibana multiple dashboards to monitor useful information about your cluster, including metrics about performance, behavior and usage. Let's see all the different dashboards:

### CPU vs Sessions/Connections/Streams/Recordings

This dashboard allows you to monitor the CPU usage of the system over time, presenting it against the total number of OpenVidu Sessions, Connections, Streams and Recordings.

<br>

<div class="row">
    <div style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro1" href="img/docs/openvidu-pro/elastic/cpuvs.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/cpuvs.png"/></a>
    </div>
</div>

### OpenVidu Sessions

This dashboard presents a summary of your video sessions and their behavior. That includes:

- The number of session per day
- The location of your users
- The number of publishers and subscribers you have at any time
- The total streamed minutes over time
- Some low-level interesting stats related to the media connections

The last point includes things like the average time to select a pair candidate during the negotiation process, the average milliseconds your clients take to complete the ICE gathering process with OpenVidu Server, the ratio of successful and failed connections, and some WebRTC stats for your published and subscribed streams (Jitter, packet loss, Round-Trip-Time, target bitrate...)

All in all, this information will help you understand better the behavior and performance of your sessions, and adapt your cluster accordingly.

<br>

<div class="row">
    <div style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro2" href="img/docs/openvidu-pro/elastic/sessions-dashboard.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/sessions-dashboard.png"/></a>
    </div>
</div>

### OpenVidu Recordings

This dashboard presents at a glance the status of your recordings. It includes information such as:

- The total number of recordings per day
- Average duration and size of your recorded files
- The distributions of you recordings by duration and size
- The ratio of recordings according to their output mode ([COMPOSED](advanced-features/recording/#composed-recording) or [INDIVIDUAL](advanced-features/recording/#individual-recording)) and their recorded tracks ([audio/video recordings](advanced-features/recording/#audio-only-and-video-only-recordings))

<br>

<div class="row">
    <div style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro3" href="img/docs/openvidu-pro/elastic/recordings-dashboard.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/recordings-dashboard.png"/></a>
    </div>
</div>

### Server Application Metrics

Statistics about OpenVidu Server Pro as a web server application. Among others:

- Number of requests performed to OpenVidu Server Pro
- Error rate of requests
- Number of requests to each endpoint, and its response time
- Http status codes returned

<br>

<div class="row">
    <div class="pro-gallery" style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro4" href="img/docs/openvidu-pro/elastic/server-application-stats1.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/server-application-stats1.png"/></a>
        <a data-fancybox="gallery-pro4" href="img/docs/openvidu-pro/elastic/server-application-stats2.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/server-application-stats2.png"/></a>
    </div>
</div>

### Server Monitoring Metrics

Statistics about OpenVidu Server Pro as a Spring application. It includes:

- Start time and CPU usage
- Stats about the Java Virtual Machine: heap, classes loaded, buffers, threads
- Information about Tomcat server: active sessions, send and receive bytes
- Number of logs by level: INFO, WARN, ERROR

<div class="row">
    <div class="pro-gallery" style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro5" href="img/docs/openvidu-pro/elastic/server-monitoring-stats1.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/server-monitoring-stats1.png"/></a>
        <a data-fancybox="gallery-pro5" href="img/docs/openvidu-pro/elastic/server-monitoring-stats2.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/server-monitoring-stats2.png"/></a>
        <a data-fancybox="gallery-pro5" href="img/docs/openvidu-pro/elastic/server-monitoring-stats3.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/server-monitoring-stats3.png"/></a>
    </div>
</div>


### [Metricbeat] Cluster Monitoring Metrics

Metrics overview of the entire cluster. This dashboard lets you see the state of your cluster globally, which includes:

- Number of nodes
- Average CPU usage
- Average memory usage
- Average disk usage
- Inbound/Outbound networking metrics

Additionally you can check specific metrics of your nodes by clicking into one of the displayed hosts which will redirect you into the specific [[Metricbeat] Node Monitoring Metrics](#metricbeat-node-monitoring-metrics) of the selected host.

<div class="row">
    <div class="pro-gallery" style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro6" href="img/docs/openvidu-pro/elastic/cluster-monitoring-metrics1.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/cluster-monitoring-metrics1.png"/></a>
        <a data-fancybox="gallery-pro6" href="img/docs/openvidu-pro/elastic/cluster-monitoring-metrics2.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/cluster-monitoring-metrics2.png"/></a>
    </div>
</div>

### [Metricbeat] Node Monitoring Metrics

More detailed metrics about OpenVidu Pro Cluster Nodes. This dashboard includes information showed in [[Metricbeat] Cluster Monitoring Metrics](#metricbeat-cluster-monitoring-metrics) with additional information like:

- Memory usage
- Inbound/Outbound networking metrics
- Network packet losses
- Advanced charts about CPU/disk/network usage
- Advanced information about disk usage

If you accessed this dashboard by selecting a node in [[Metricbeat] Cluster Monitoring Metrics](#metricbeat-cluster-monitoring-metrics), you will see information about the selected node in this panel. Otherwise
if you access this dashboard without any filter or by accessing the dashboard panel, this dashboard will show average information about the entire cluster.

<div class="row">
    <div class="pro-gallery" style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro7" href="img/docs/openvidu-pro/elastic/node-monitoring-metrics1.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/node-monitoring-metrics1.png"/></a>
        <a data-fancybox="gallery-pro7" href="img/docs/openvidu-pro/elastic/node-monitoring-metrics2.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/node-monitoring-metrics2.png"/></a>
    </div>
</div>

### [Metricbeat] Nginx Metrics

This dashboard contains metrics about the deployed NGINX proxy which handles all requests to the cluster. It includes:

- Active connections: number of active client connections including waiting connections.
- Request Rate: rate of client requests.
- Drops Rate: dropped client connections.
- Accepts and Handled Rate: number of accepted and handled client connections.
- Reading/Writing/Waiting Rates: number of connections where Nginx is reading/writing/waiting.

<div class="row">
    <div class="pro-gallery" style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro8" href="img/docs/openvidu-pro/elastic/nginx-metrics1.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/nginx-metrics1.png"/></a>
    </div>
</div>

<br>

---

## Elasticsearch indexes

All events, logs and metrics of OpenVidu are stored within indexes in ElasticSearch. You can explore this data by going to: <br>
**Kibana Menu -> Discover -> Select a filebeat index.**

OpenVidu logs and OpenVidu events are sent both by OpenVidu Pro Server in `openvidu-logs-*` and `openvidu` indexes respectively.
On the other hand all the information about other logs services and metrics are sent by:

All data sent to Elasticsearch can be classified in this categories:

- OpenVidu logs: This data, which contains all OpenVidu Pro Server logs, is sent to `openvidu-logs-*` indexes.
- OpenVidu events: All events that occurs in OpenVidu Pro are sent to `openvidu` index. You can read more information in the [OpenVidu Events](#openvidu-events) section.
- OpenVidu Application and Server metrics: All this data goes to `server-metrics-*` and `session-metrics-*`.
- [Filebeat](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-overview.html){:target="_blank"} data: This service is responsible for sending logs to `filebeat-*` indexes.
- [Metricbeat](https://www.elastic.co/guide/en/beats/metricbeat/master/metricbeat-overview.html){:target="_blank"} data: This service is responsible for sending metrics to `metricbeat-*` indexes.

All data sent by **Filebeat** and **Metricbeat** follows a common format named **ECS (Elastic Common Schema)**. Here is a version table of the ECS format followed by each OpenVidu Pro Version.

| OpenVidu Pro version | Metricbeat / Filebeat Version | ECS version - (More information about ECS [here](https://www.elastic.co/guide/en/beats/metricbeat/current/exported-fields-ecs.html){:target="_blank"}) |
|------------------|-------------------------|-------------------------|
| ≤ 2.15.0         | -                       | -                       |
| 2.16.0           | 7.8.0                   | 1.5.0                   |
| 2.17.0           | 7.8.0                   | 1.5.0                   |
| 2.18.0           | 7.8.0                   | 1.5.0                   |
| 2.19.0           | 7.8.0                   | 1.5.0                   |
| 2.20.0           | 7.8.0                   | 1.5.0                   |

### Logs and metrics

All index patterns which start with `filebeat-*` refers to OpenVidu Pro services logs. On the other hand metrics are sent to indexes which start with `metricbeat-*`.

Logs and metrics indexes are:

  - **filebeat-kurento***: Kurento Media Server logs.
  - **filebeat-coturn***: Coturn(TURN/STUN server) logs.
  - **filebeat-redis***: Redis logs (This service is used to store TURN credentials).
  - **filebeat-media-node-controller***: Logs of the media-node-controller which manage orchestration in media nodes.
  - **filebeat-openvidu-recording***: Logs of [COMPOSED recording](advanced-features/recording/#composed-recording).
  - **filebeat-nginx***: Logs of Nginx container.
  - **openvidu-logs***: Logs of OpenVidu Server Pro.
  - **openvidu-browser-logs***: Logs of clients/browsers using openvidu-browser related with OpenVidu itself. These are only sent if `OPENVIDU_BROWSER_LOGS=debug` in `/opt/openvidu/.env`file ([More info](reference-docs/openvidu-config/)).
  - **metricbeat-***: Metrics sent by all the nodes of the OpenVidu Pro Cluster.

Logs and metrics sent by **Filebeat** and **Metricbeat** include some properties to distinguish the origin of the data, in addition to the ECS attributes. These properties are present in all
`filebeat-*`, `metricbeat-*` and `openvidu-logs-*` indexes:

- `node_role`: Which can be `masternode` or `medianode`.
- `node_id`: Which can be `master_<id>` or `media_<id>`. Depending on the deployed environment the `<id>` may change.
- `cluster_id`: Defined Cluster Id in `OPENVIDU_PRO_CLUSTER_ID`. If no cluster id is defined, the `DOMAIN_OR_PUBLIC_IP` will be used instead.

### OpenVidu Events

All events of OpenVidu are stored in the index `openvidu`, which have an `elastic_type` field to identify the specific type of event. This field may be:

<div markdown="1">

<div class="monitoring-div" markdown="1">

<div style="margin-right: 5px; margin-top: 15px" markdown="1">

- `cdr`: event of CDR/Webhook. Can take multiple forms according to the type of event (see [OpenVidu CDR](reference-docs/openvidu-server-cdr/))
- `kms`: Kurento Media Server event. These events are always associated to one WebRTC endpoint (a publisher or a subscriber). Can take multiple forms according to the type of event (see [Kurento docs](https://doc-kurento.readthedocs.io/en/latest/features/events.html){:target="_blank"})
- `webrtcStats`: event of WebRTC statistics for each media endpoint established in Media Nodes
- `webrtcDebug`: event with further information about the WebRTC negotiation process, such as SDPs, for each media endpoint established in Media Nodes
- `networkQualityStats`: event of network quality for a specific client. See [Network quality](advanced-features/network-quality/)
- `sessionSummary`: summary of a session, stored once it is closed
- `recordingSummary`: summary of a recording, stored once its session is closed. This object does not hold the final values of the recording entity and some properties may not be properly defined. Use _cdr_ event *[recordingStatusChanged](reference-docs/openvidu-server-cdr/#recordingstatuschanged)* with property _status_ set to _ready_ to get the full recording object
- `userSummary`: summary of a user, stored once its session is closed
- `connectionSummary`: summary of a connection, stored once its session is closed
- `publisherSummary`: summary of a publisher, stored once its session is closed
- `subscriberSummary`: summary of a subscriber, stored once its session is closed

</div>

<div class="lang-tabs-container elastic-events">

<div class="lang-tabs-header">
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; font-weight: bold">cdr</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">kms</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">webrtcStats</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">webrtcDebug</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">networkQualityStats</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">sessionSummary</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">recordingSummary</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">userSummary</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">connectionSummary</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">publisherSummary</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">subscriberSummary</button>
</div>

<div id="cdr" class="lang-tabs-content">
```json
{
  "elastic_type": "cdr",
  "sessionId": "TestSession",
  "uniqueSessionId": "TestSession_1614770057250",
  "event": "sessionDestroyed",
  "reason": "sessionClosedByServer",
  "startTime": 1614770057250,
  "duration": 32,
  "timestamp": 1614770090067,
  "cluster_id": "my_cluster",
  "master_node_id": "master_localhost"
}
```
</div>

<div id="kms" class="lang-tabs-content" style="display:none">
```json
{
  "elastic_type": "kms",
  "sessionId": "TestSession",
  "uniqueSessionId": "TestSession_1614770057250",
  "user": "09847CC560698063",
  "connectionId": "con_Sazh73ER9L",
  "endpoint": "str_CAM_GdhM_con_Sazh73ER9L",
  "type": "MediaFlowOutStateChange",
  "state": "FLOWING",
  "padName": "default",
  "mediaType": "VIDEO",
  "msSinceEndpointCreation": 1264,
  "timestamp": 1614770060288,
  "cluster_id": "my_cluster",
  "master_node_id": "master_localhost"
}
```
</div>

<div id="webrtcstats" class="lang-tabs-content" style="display:none">
```json
{
    "elastic_type": "webrtcStats",
    "sessionId": "TestSession",
    "uniqueSessionId": "TestSession_1614770057250",
    "user": "09847CC560698063",
    "connectionId": "con_Sazh73ER9L",
    "endpoint": "str_CAM_GdhM_con_Sazh73ER9L",
    "mediaType": "video",
    "jitter": 0.0016666667070239782,
    "bytesReceived": 2730078,
    "packetsReceived": 2770,
    "packetsLost": 1,
    "fractionLost": 0,
    "remb": 1000000,
    "firCount": 4,
    "pliCount": 0,
    "nackCount": 0,
    "sliCount": 0,
    "timestamp": 1614770089024,
    "cluster_id": "my_cluster",
    "master_node_id": "master_localhost"
  }
```
</div>

<div id="webrtcdebug" class="lang-tabs-content" style="display:none">
```json
{
    "elastic_type": "webrtcDebug",
    "sessionId": "TestSession",
    "uniqueSessionId": "TestSession_1614770057250",
    "user": "09847CC560698063",
    "connectionId": "con_Sazh73ER9L",
    "endpoint": "str_CAM_GdhM_con_Sazh73ER9L",
    "issuer": "client",
    "operation": "publish",
    "type": "sdpOffer",
    "content": "v=0\r\no=- 4910633521260399716 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=group [...]",
    "timestamp": 1614770058822,
    "cluster_id": "my_cluster",
    "master_node_id": "master_localhost"
  }
```
</div>

<div id="networkqualitystats" class="lang-tabs-content" style="display:none">
```json
{
  "elastic_type": "networkQualityStats",
  "sessionId": "TestSession",
  "uniqueSessionId": "TestSession_1614770057250",
  "connectionId": "con_Sazh73ER9L",
  "newValue": 4,
  "oldValue": 5,
  "timestamp": 1614770077777,
  "cluster_id": "my_cluster",
  "master_node_id": "master_localhost"
}
```
</div>

<div id="sessionsummary" class="lang-tabs-content" style="display:none">
```json
{
  "elastic_type": "sessionSummary",
  "sessionId": "TestSession",
  "uniqueSessionId": "TestSession_1614772177070",
  "customSessionId": "TestSession",
  "createdAt": 1614772177070,
  "destroyedAt": 1614772405616,
  "mediaMode": "ROUTED",
  "recordingMode": "MANUAL",
  "duration": 228,
  "reason": "sessionClosedByServer",
  "users": {
    "numberOfElements": 2,
    "content": [
      {
        "elastic_type": "userSummary",
        "sessionId": "TestSession",
        "uniqueSessionId": "TestSession_1614772177070",
        "id": "75F38955B0E01784",
        "location": "Rome, Italy",
        "platform": "Chrome 88.0.4324.182 on Linux 64-bit",
        "connections": {
          "numberOfElements": 1,
          "content": [
            {
              "elastic_type": "connectionSummary",
              "sessionId": "TestSession",
              "uniqueSessionId": "TestSession_1614772177070",
              "user": "75F38955B0E01784",
              "connectionId": "con_Yvwjb4DiNC",
              "createdAt": 1614772179451,
              "destroyedAt": 1614772405598,
              "duration": 226,
              "clientData": "subscriberClient",
              "serverData": "",
              "reason": "sessionClosedByServer",
              "publishers": {
                "numberOfElements": 0,
                "content": []
              },
              "subscribers": {
                "numberOfElements": 1,
                "content": [
                  {
                    "elastic_type": "subscriberSummary",
                    "sessionId": "TestSession",
                    "uniqueSessionId": "TestSession_1614772177070",
                    "user": "75F38955B0E01784",
                    "connectionId": "con_Yvwjb4DiNC",
                    "streamId": "str_CAM_LURy_con_X5VIu6DNPF",
                    "startTime": 1614772179593,
                    "duration": 225,
                    "reason": "sessionClosedByServer",
                    "receivingFrom": "con_X5VIu6DNPF",
                    "videoSource": "CAMERA",
                    "videoFramerate": 30,
                    "videoDimensions": "{\"width\":640,\"height\":480}",
                    "audioEnabled": true,
                    "videoEnabled": true,
                    "timestamp": 1614772405493,
                    "cluster_id": "my_cluster",
                    "master_node_id": "master_localhost",
                    "media_node_id": "media_i-1234567890abcdef0"
                  }
                ]
              },
              "timestamp": 1614772405616,
              "cluster_id": "my_cluster",
              "master_node_id": "master_localhost",
              "media_node_id": "media_i-1234567890abcdef0"
            }
          ]
        },
        "timestamp": 1614772405616,
        "cluster_id": "my_cluster",
        "master_node_id": "master_localhost",
        "media_node_id": "media_i-1234567890abcdef0"
      },
      {
        "elastic_type": "userSummary",
        "sessionId": "TestSession",
        "uniqueSessionId": "TestSession_1614772177070",
        "id": "A1DA910C165C2B16",
        "location": "Buenos Aires, Argentina",
        "platform": "Chrome 88.0.4324.182 on Linux 64-bit",
        "connections": {
          "numberOfElements": 1,
          "content": [
            {
              "elastic_type": "connectionSummary",
              "sessionId": "TestSession",
              "uniqueSessionId": "TestSession_1614772177070",
              "user": "A1DA910C165C2B16",
              "connectionId": "con_X5VIu6DNPF",
              "createdAt": 1614772177417,
              "destroyedAt": 1614772405572,
              "duration": 228,
              "clientData": "publisherClient",
              "serverData": "",
              "reason": "sessionClosedByServer",
              "publishers": {
                "numberOfElements": 1,
                "content": [
                  {
                    "elastic_type": "publisherSummary",
                    "sessionId": "TestSession",
                    "uniqueSessionId": "TestSession_1614772177070",
                    "user": "A1DA910C165C2B16",
                    "connectionId": "con_X5VIu6DNPF",
                    "streamId": "str_CAM_LURy_con_X5VIu6DNPF",
                    "startTime": 1614772178719,
                    "duration": 226,
                    "reason": "sessionClosedByServer",
                    "videoSource": "CAMERA",
                    "videoFramerate": 30,
                    "videoDimensions": "{\"width\":640,\"height\":480}",
                    "audioEnabled": true,
                    "videoEnabled": true,
                    "timestamp": 1614772405549,
                    "cluster_id": "my_cluster",
                    "master_node_id": "master_localhost",
                    "media_node_id": "media_i-1234567890abcdef0"
                  }
                ]
              },
              "subscribers": {
                "numberOfElements": 0,
                "content": []
              },
              "timestamp": 1614772405616,
              "cluster_id": "my_cluster",
              "master_node_id": "master_localhost",
              "media_node_id": "media_i-1234567890abcdef0"
            }
          ]
        },
        "timestamp": 1614772405616,
        "cluster_id": "my_cluster",
        "master_node_id": "master_localhost",
        "media_node_id": "media_i-1234567890abcdef0"
      }
    ]
  },
  "recordings": {
    "numberOfElements": 1,
    "content": [
      {
        "elastic_type": "recordingSummary",
        "sessionId": "TestSession",
        "uniqueSessionId": "TestSession_1614772177070",
        "startTime": 1614772194381,
        "duration": 0,
        "reason": "sessionClosedByServer",
        "id": "TestSession",
        "name": "MyRecording",
        "outputMode": "INDIVIDUAL",
        "hasAudio": true,
        "hasVideo": false,
        "size": 0,
        "timestamp": 1614772405602,
        "cluster_id": "my_cluster",
        "master_node_id": "master_localhost",
        "media_node_id": "media_i-1234567890abcdef0"
      }
    ]
  },
  "timestamp": 1614772405616,
  "cluster_id": "my_cluster",
  "master_node_id": "master_localhost",
  "media_node_id": "media_i-1234567890abcdef0"
}
```
</div>

<div id="recordingsummary" class="lang-tabs-content" style="display:none">
```json
{
  "elastic_type": "recordingSummary",
  "sessionId": "TestSession",
  "uniqueSessionId": "TestSession_1614772177070",
  "id": "TestSession",
  "startTime": 1614772194381,
  "duration": 0,
  "reason": "sessionClosedByServer",
  "name": "MyRecordings",
  "outputMode": "INDIVIDUAL",
  "hasAudio": true,
  "hasVideo": false,
  "size": 0,
  "timestamp": 1614772405602,
  "cluster_id": "localhost",
  "master_node_id": "master_localhost",
  "media_node_id": "media_i-1234567890abcdef0"
}
```
</div>

<div id="usersummary" class="lang-tabs-content" style="display:none">
```json
{
  "elastic_type": "userSummary",
  "sessionId": "TestSession",
  "uniqueSessionId": "TestSession_1614772177070",
  "id": "A1DA910C165C2B16",
  "location": "Buenos Aires, Argentina",
  "platform": "Chrome 88.0.4324.182 on Linux 64-bit",
  "connections": {
    "numberOfElements": 1,
    "content": [
      {
        "elastic_type": "connectionSummary",
        "sessionId": "TestSession",
        "uniqueSessionId": "TestSession_1614772177070",
        "user": "A1DA910C165C2B16",
        "connectionId": "con_X5VIu6DNPF",
        "createdAt": 1614772177417,
        "destroyedAt": 1614772405572,
        "duration": 228,
        "clientData": "publisherClient",
        "serverData": "",
        "reason": "sessionClosedByServer",
        "publishers": {
          "numberOfElements": 1,
          "content": [
            {
              "elastic_type": "publisherSummary",
              "sessionId": "TestSession",
              "uniqueSessionId": "TestSession_1614772177070",
              "user": "A1DA910C165C2B16",
              "connectionId": "con_X5VIu6DNPF",
              "streamId": "str_CAM_LURy_con_X5VIu6DNPF",
              "startTime": 1614772178719,
              "duration": 226,
              "reason": "sessionClosedByServer",
              "videoSource": "CAMERA",
              "videoFramerate": 30,
              "videoDimensions": "{\"width\":640,\"height\":480}",
              "audioEnabled": true,
              "videoEnabled": true,
              "timestamp": 1614772405549,
              "cluster_id": "my_cluster",
              "master_node_id": "master_localhost",
              "media_node_id": "media_i-1234567890abcdef0"
            }
          ]
        },
        "subscribers": {
          "numberOfElements": 0,
          "content": []
        },
        "timestamp": 1614772405616,
        "cluster_id": "my_cluster",
        "master_node_id": "master_localhost",
        "media_node_id": "media_i-1234567890abcdef0"
      }
    ]
  },
  "timestamp": 1614772405616,
  "cluster_id": "my_cluster",
  "master_node_id": "master_localhost",
  "media_node_id": "media_i-1234567890abcdef0"
}
```
</div>

<div id="connectionsummary" class="lang-tabs-content" style="display:none">
```json
{
  "elastic_type": "connectionSummary",
  "sessionId": "TestSession",
  "uniqueSessionId": "TestSession_1614772177070",
  "user": "A1DA910C165C2B16",
  "connectionId": "con_X5VIu6DNPF",
  "createdAt": 1614772177417,
  "destroyedAt": 1614772405572,
  "duration": 228,
  "clientData": "publisherClient",
  "serverData": "",
  "reason": "sessionClosedByServer",
  "publishers": {
    "numberOfElements": 1,
    "content": [
      {
        "elastic_type": "publisherSummary",
        "sessionId": "TestSession",
        "uniqueSessionId": "TestSession_1614772177070",
        "user": "A1DA910C165C2B16",
        "connectionId": "con_X5VIu6DNPF",
        "streamId": "str_CAM_LURy_con_X5VIu6DNPF",
        "startTime": 1614772178719,
        "duration": 226,
        "reason": "sessionClosedByServer",
        "videoSource": "CAMERA",
        "videoFramerate": 30,
        "videoDimensions": "{\"width\":640,\"height\":480}",
        "audioEnabled": true,
        "videoEnabled": true,
        "timestamp": 1614772405549,
        "cluster_id": "my_cluster",
        "master_node_id": "master_localhost",
        "media_node_id": "media_i-1234567890abcdef0"
      }
    ]
  },
  "subscribers": {
    "numberOfElements": 0,
    "content": []
  },
  "timestamp": 1614772405616,
  "cluster_id": "my_cluster",
  "master_node_id": "master_localhost",
  "media_node_id": "media_i-1234567890abcdef0"
}
```
</div>

<div id="publishersummary" class="lang-tabs-content" style="display:none">
```json
{
  "elastic_type": "publisherSummary",
  "sessionId": "TestSession",
  "uniqueSessionId": "TestSession_1614772177070",
  "user": "A1DA910C165C2B16",
  "connectionId": "con_X5VIu6DNPF",
  "streamId": "str_CAM_LURy_con_X5VIu6DNPF",
  "startTime": 1614772178719,
  "duration": 226,
  "reason": "sessionClosedByServer",
  "videoSource": "CAMERA",
  "videoFramerate": 30,
  "videoDimensions": "{\"width\":640,\"height\":480}",
  "audioEnabled": true,
  "videoEnabled": true,
  "timestamp": 1614772405549,
  "cluster_id": "my_cluster",
  "master_node_id": "master_localhost",
  "media_node_id": "media_i-1234567890abcdef0"
}
```
</div>

<div id="subscribersummary" class="lang-tabs-content" style="display:none">
```json
{
  "elastic_type": "subscriberSummary",
  "sessionId": "TestSession",
  "uniqueSessionId": "TestSession_1614772177070",
  "user": "75F38955B0E01784",
  "connectionId": "con_Yvwjb4DiNC",
  "streamId": "str_CAM_LURy_con_X5VIu6DNPF",
  "startTime": 1614772179593,
  "duration": 225,
  "reason": "sessionClosedByServer",
  "receivingFrom": "con_X5VIu6DNPF",
  "videoSource": "CAMERA",
  "videoFramerate": 30,
  "videoDimensions": "{\"width\":640,\"height\":480}",
  "audioEnabled": true,
  "videoEnabled": true,
  "timestamp": 1614772405493,
  "cluster_id": "my_cluster",
  "master_node_id": "master_localhost",
  "media_node_id": "media_i-1234567890abcdef0"
}
```


</div>
</div>
</div>
</div>

<div class="after-section-helper"></div>

<br>

> **NOTE 1**: `sessionSummary` contains all the information available in the rest of summary documents, including an array of `recordingSummary` and an array of `userSummary`. In turn `userSummary` contains an array of `connectionSummary`, that finally contains an array of `publisherSummary` and other of `subscriberSummary`.
> To sum up, this is just a denormalization of the `sessionSummary` document, so Elasticsearch requests and Kibana visualizations are more flexible and easier to accomplish
> ---
> **NOTE 2**: `recordingSummary` events may not contain the final information of the actual recordings (specifically properties `size` and `duration`). This is so because `recordingSummary` event is generated just after its session is closed, but since release 2.11.0 recordings may need a post-processing phase before being available for download and having these properties properly defined. To overcome this limitation, you can simply use the `cdr` event of type `recordingStatusChanged` and status `ready` corresponding to this recording (see event in [CDR docs](reference-docs/openvidu-server-cdr/#recordingstatuschanged)). There you will have all properties of the recording well defined

<br>

---

## Creating your own visualizations and dashboards

The dashboards presented above, by default included in OpenVidu Pro, are just an example of what can be done thanks to Kibana. You can create your own visualizations, and set up your very own dashboards with them. To do so, you have available multiple events that OpenVidu Pro periodically stores in Elasticsearch, and you can then use them in Kibana to compose different types of graphs and other useful visual representations.

<p align="center">
  <img class="img-responsive openvidu-pro-img" style="padding: 20px 0 8px 0" src="img/docs/openvidu-pro/elastic/elastic-stack.png">
</p>

You can create powerful visualizations and dashboards by using these documents. Let's see a quick example. Imagine that you are interested in knowing **how many users are connected to your OpenVidu sessions over time**.

<div class="row">
    <div class="pro-gallery-steps" style="margin: 25px 35px 25px 35px">
        <a data-fancybox="gallery-pro5" data-caption="First thing is navigating to 'Visualize' section in Kibana and clicking on the button to add a new visualization" href="img/docs/openvidu-pro/elastic/tutorial1.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/tutorial1.png"/></a>
        <a data-fancybox="gallery-pro5" data-caption="Then we have to choose a visualization type. In this case a vertical bar graph might be a pretty good choice" href="img/docs/openvidu-pro/elastic/tutorial2.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/tutorial2.png"/></a>
        <a data-fancybox="gallery-pro5" data-caption="We select 'openvidu' index, because that's the index of every OpenVidu Pro event stored in Elasticsearch" href="img/docs/openvidu-pro/elastic/tutorial3.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/tutorial3.png"/></a>
        <a data-fancybox="gallery-pro5" data-caption="The visualization page will be shown. Now we have to filter the desired events. In this case, we just want the 'userSummary' event, as it gathers all the information about the final users connecting to our sessions. So, we make sure that field 'elastic_type.keyword' is 'userSummary'" href="img/docs/openvidu-pro/elastic/tutorial4.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/tutorial4.png"/></a>
        <a data-fancybox="gallery-pro5" data-caption="Finally we have to configure the data passed to our graph. The metric we want (Y-axis) is simply 'Count', because there is one 'userSummary' event for each final user connecting to a session. And as Bucket (X-axis) we configure a Date Histogram by using 'timestamp' field of the event" href="img/docs/openvidu-pro/elastic/tutorial5.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/tutorial5.png"/></a>
        <a data-fancybox="gallery-pro5" data-caption="To store the new visualization just click on 'Save' button in the upper menu and give it a meaningful name" href="img/docs/openvidu-pro/elastic/tutorial6.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/tutorial6.png"/></a>
    </div>
    <div class="slick-captions-text slick-captions">
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

---

## Reviewing logs

### Reviewing logs with Kibana

Many of OpenVidu processes send their logs to Elasticsearch, so you can review their logs directly from Kibana. To search for logs you need to:

<div class="row">
    <div class="pro-gallery-steps-logs" style="margin: 25px 35px 25px 35px">
        <a data-fancybox="gallery-pro9" data-caption="First of all, go to the 'Logs' section of Kibana." href="img/docs/openvidu-pro/elastic/review-logs-1.png"><img style="max-height: 400px" class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/review-logs-1.png"/></a>
        <a data-fancybox="gallery-pro9" data-caption="Enter what you want to search. You can search for literals, attribute values, etc..." href="img/docs/openvidu-pro/elastic/review-logs-4.png"><img class="img-responsive img-pro" style="max-height: 400px" src="img/docs/openvidu-pro/elastic/review-logs-4.png"/></a>
    </div>
    <div class="slick-captions-text slick-captions-logs">
      <div class="caption"><p>First of all, go to the <strong>Logs</strong> section of Kibana.</p></div>
      <div class="caption"><p>Enter what you want to search. You can search for literals, attribute values, etc...</div>
    </div>
</div>

#### Examples

- Search for Kurento Media Server logs:

<div class="row">
    <div style="margin: 5px 15px 35px 15px">
        <video controls preload="none" class="img-responsive video-pro" style="max-height: 600px" src="img/docs/openvidu-pro/elastic/search-example-1.mp4"/>
    </div>
</div>

- Search for Kurento Media Server logs of one specific node id:

<div class="row">
    <div style="margin: 5px 15px 35px 15px">
        <video controls preload="none" class="img-responsive video-pro" style="max-height: 600px" src="img/docs/openvidu-pro/elastic/search-example-2.mp4"/>
    </div>
</div>

- Search for Kurento Media Server logs of one specific Media Node IP:

<div class="row">
    <div style="margin: 5px 15px 35px 15px">
        <video controls preload="none" class="img-responsive video-pro" style="max-height: 600px" src="img/docs/openvidu-pro/elastic/search-example-3.mp4"/>
    </div>
</div>

- Search for OpenVidu Server logs:
<div class="row">
    <div style="margin: 5px 15px 35px 15px">
        <video controls preload="none" class="img-responsive video-pro" style="max-height: 600px" src="img/docs/openvidu-pro/elastic/search-example-4.mp4"/>
    </div>
</div>

---

### Reviewing logs and metrics using OpenVidu Inspector

Searching logs in Kibana can be a little bit complicated when you want to debug specific logs for specific sessions. We offer you an easy way to search for these logs using the [OpenVidu Inspector](openvidu-pro/openvidu-inspector/).
You just need to:

<div class="row">
    <div class="pro-gallery-steps-elkaws" style="margin: 25px 35px 25px 35px">
        <a data-fancybox="gallery-pro13" data-caption="Go to the history section." href="img/docs/openvidu-pro/elastic/review-logs-inspector-3.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/review-logs-inspector-1.png"/></a>
        <a data-fancybox="gallery-pro13" data-caption="Select the session you want to debug." href="img/docs/openvidu-pro/elastic/review-logs-inspector-2.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/review-logs-inspector-2.png"/></a>
        <a data-fancybox="gallery-pro13" data-caption="Choose what logs you want to review." href="img/docs/openvidu-pro/elastic/review-logs-inspector-3.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/review-logs-inspector-3.png"/></a>
    </div>
    <div class="slick-captions-text slick-captions-elkaws">
      <div class="caption"><p>Go to the section <strong>History</strong> section of <strong>OpenVidu Inspector</strong>.</p></div>
      <div class="caption"><p>Select the session you want to debug.</p></div>
      <div class="caption"><p>Choose what logs you want to review.</p></div>
    </div>
</div>

<br>

---

## Configuring an external Elastic Stack

An external Elastic Stack can be configured with and without security. The table below shows a compatibility table between versions of OpenVidu Pro and external Elastic providers.

| OpenVidu Pro version | [AWS Elasticsearch Service](https://aws.amazon.com/elasticsearch-service/){:target="_blank"} | [Elastic Cloud](https://www.elastic.co/cloud/){:target="_blank"} | Your own Elastic Stack on premises |
|------------------|---------------------------|----------------|---------------------------|
| ≤ 2.15.0         | -                         | -              | -                         |
| 2.16.0           | ≥ 7.3.0                   | ≥ 7.3.0        | ≥ 7.3.0                   |
| 2.17.0           | ≥ 7.8.0                   | ≥ 7.8.0        | ≥ 7.8.0                   |
| 2.18.0           | ≥ 7.8.0                   | ≥ 7.8.0        | ≥ 7.8.0                   |
| 2.19.0           | ≥ 7.8.0                   | ≥ 7.8.0        | ≥ 7.8.0                   |
| 2.20.0           | ≥ 7.8.0                   | ≥ 7.8.0        | ≥ 7.8.0                   |

### OpenVidu Pro Configuration for external Elastic Stack

If you have an external Elastic Stack configured without security, you only need to specify these properties in the `/opt/openvidu/.env` file
of your Master Node. These properties are URLs that need to have specified a port, even if it is port 80 or 443. For example:

```html
OPENVIDU_PRO_ELASTICSEARCH_HOST=https://elk.example.com:443
OPENVIDU_PRO_KIBANA_HOST=https://elk.example.com:443/kibana
```

If you have configured a user in your Elastic Stack, you need to also specify it in your `/opt/openvidu/.env`. Only Basic Auth is supported, which is used by Elastic Stack in their Basic License and is free to use. You need to modify these properties:

```
ELASTICSEARCH_USERNAME=<YOUR_ELK_USER>
ELASTICSEARCH_PASSWORD=<YOUR_ELK_USER_PASSWORD>
```

Remember that any change you do in `/opt/openvidu/.env` will require you to restart your OpenVidu Server Pro. Just execute `./openvidu restart` in `/opt/openvidu`.

> - Managed Users by [OpenDistro Elastic Stack](https://opendistro.github.io/for-elasticsearch/) are compatible too. This is the distribution of Elastic Stack used by AWS.
> - You can see how to create a **fine-grained** user for OpenVidu in this **[section](#create-a-fine-grained-user)**

### Examples of managed Elastic Stack services

Any deployed Elastic Stack can be used, but to give a clear guide on how to configure an external Elastic Stack, we will explain how to configure a managed one [in AWS](#elastic-stack-in-aws-with-openvidu-pro-configuration) and [in Elastic Cloud](#elastic-stack-in-elastic-cloud-with-openvidu-pro-configuration).

#### Elastic Stack in AWS with OpenVidu Pro configuration

In the next section you will see how to configure a Managed Elastic Stack in AWS and how to configure it for OpenVidu:

<div class="row">
    <div class="pro-gallery-steps-elkaws" style="margin: 25px 35px 25px 35px">
        <a data-fancybox="gallery-pro10" data-caption="First you need to go to the 'Elasticsearch Service' in your AWS Account" href="img/docs/openvidu-pro/elastic/aws_elk_1.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/aws_elk_1.png"/></a>
        <a data-fancybox="gallery-pro10" data-caption="Select: 'Create new Domain'" href="img/docs/openvidu-pro/elastic/aws_elk_2.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/aws_elk_2.png"/></a>
        <a data-fancybox="gallery-pro10" data-caption="Choose the 'Deployment Type' you want" href="img/docs/openvidu-pro/elastic/aws_elk_3.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/aws_elk_3.png"/></a>
        <a data-fancybox="gallery-pro10" data-caption="After that you can configure your ELK as you want until security configuration, which is explained in the next steps" href="img/docs/openvidu-pro/elastic/aws_elk_4.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/aws_elk_4.png"/></a>
        <a data-fancybox="gallery-pro10" data-caption="Check 'Enable fine-grained access control' and select 'Create master user'. This user will have super user privileges but you can create after that a user with only necessary privileges." href="img/docs/openvidu-pro/elastic/aws_elk_5.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/aws_elk_5.png"/></a>
        <a data-fancybox="gallery-pro10" data-caption="Select 'Allow open access to the domain'" href="img/docs/openvidu-pro/elastic/aws_elk_6.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/aws_elk_6.png"/></a>
        <a data-fancybox="gallery-pro10" data-caption="Select 'Allow open access to the domain'" href="img/docs/openvidu-pro/elastic/aws_elk_7.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/aws_elk_7.png"/></a>
        <a data-fancybox="gallery-pro10" data-caption="Get the 'Endpoint' and 'Kibana' URLs, which will be used in our OpenVidu Pro configuration" href="img/docs/openvidu-pro/elastic/aws_elk_8.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/aws_elk_8.png"/></a>
    </div>
    <div class="slick-captions-text slick-captions-elkaws">
      <div class="caption"><p>First you need to go to the <strong>Elasticsearch Service</strong> in your AWS Account.</p></div>
      <div class="caption"><p>Select: <strong>Create new Domain</strong>.</p></div>
      <div class="caption"><p>Choose the <strong>Deployment Type</strong> you want.</p></div>
      <div class="caption"><p>After that you can configure your ELK as you want until security configuration, which is explained in the next steps.</p></div>
      <div class="caption"><p>Check <strong>Enable fine-grained access control</strong> and select <strong>Create master user</strong>. This user will have super user privileges but you can create after that a user with only necessary privileges.</p></div>
      <div class="caption"><p>Select <strong>Allow open access to the domain</strong>.</p></div>
      <div class="caption"><p>Click <strong>Next</strong> and <strong>Confirm</strong> and you're cluster will be created in a matter of seconds.</p></div>
      <div class="caption"><p>Get the <strong>Endpoint</strong> and <strong>Kibana</strong> URLs, which will be used in our OpenVidu Pro configuration</p></div>
    </div>
</div>

When the **Domain Status** of your Elasticsearch cluster is ready, let's configure OpenVidu Pro to use it. You will need to modify `/opt/openvidu/.env` and add into this file the **username**, **password**, **Domain Endpoint** and **Kibana** URL from previous steps. The `.env` file must have this parameters:

```html
OPENVIDU_PRO_ELASTICSEARCH_HOST=https://xxxxxxxx.es.amazonaws.com:443
OPENVIDU_PRO_KIBANA_HOST=https://xxxxxxxx.es.amazonaws.com:443/_plugin/kibana/
ELASTICSEARCH_USERNAME=<YOUR_USERNAME>
ELASTICSEARCH_PASSWORD=<YOUR_PASSWORD>
```

Where:

- `OPENVIDU_PRO_ELASTICSEARCH_HOST`: The **Domain Endpoint** URL visible in the Elasticsearch panel of AWS.
- `OPENVIDU_PRO_KIBANA_HOST`: The **Kibana** URL also visible in the Elasticsearch panel of AWS.
- `ELASTICSEARCH_USERNAME`: The master user you have created in previous steps.
- `ELASTICSEARCH_PASSWORD`: The master password you have created in previous steps.

Remember that any change you do in `/opt/openvidu/.env` will require you to restart your OpenVidu Server. Just execute `./openvidu restart` in `/opt/openvidu`.

> - Note that you need to specify port 443 in `OPENVIDU_PRO_ELASTICSEARCH_HOST` and `OPENVIDU_PRO_KIBANA_HOST`.

<div style="
    display: table;
    border: 2px solid #ffb600;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    background-color: #FFFBF1;
    margin-bottom: 25px;
    padding: 5px 0 5px 0;"><div style="display: table-cell; vertical-align: middle;">
    <i class="icon ion-android-alert" style="
    font-size: 50px;
    color: #ffb600;
    display: inline-block;
    padding-left: 25%;
"></i></div>
<div style="
    vertical-align: middle;
    display: table-cell;
    padding: 10px 20px;">
    <strong>WARNING</strong>: Elasticsearch index deletion policy (which is responsible for delete indexes after the specified days in <code>OPENVIDU_PRO_ELASTICSEARCH_MAX_DAYS_DELETE</code>) does not work with AWS Elasticsearch.
    You must create your own deletion policy strategy in your AWS Elasticsearch service.
</div>
</div>

#### Elastic Stack in Elastic Cloud with OpenVidu Pro configuration

In this section you will see how to configure a Managed Elastic Stack in Elastic Cloud (The official Elastic Stack as a Service) and how to configure it for OpenVidu:

<div class="row">
    <div class="pro-gallery-steps-elastic-cloud" style="margin: 25px 35px 25px 35px">
        <a data-fancybox="gallery-pro11" data-caption="First of all, click on 'Create deployment'" href="img/docs/openvidu-pro/elastic/elastic_cloud_1.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/elastic_cloud_1.png"/></a>
        <a data-fancybox="gallery-pro11" data-caption="Select: 'Elastic Stack'." href="img/docs/openvidu-pro/elastic/elastic_cloud_2.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/elastic_cloud_2.png"/></a>
        <a data-fancybox="gallery-pro11" data-caption="Configure your Elastic Stack as you want and click 'Create deployment'." href="img/docs/openvidu-pro/elastic/elastic_cloud_3.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/elastic_cloud_3.png"/></a>
        <a data-fancybox="gallery-pro11" data-caption="Get the 'Username' and 'Password' generated by Elastic Cloud. This user will have super user privileges but you can create after that a user with only necessary privileges." href="img/docs/openvidu-pro/elastic/elastic_cloud_4.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/elastic_cloud_4.png"/></a>
        <a data-fancybox="gallery-pro11" data-caption="When the deployment is ready, get the 'Elasticsearch endpoint' and 'Kibana endpoint' to use it for OpenVidu Pro." href="img/docs/openvidu-pro/elastic/elastic_cloud_5.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/elastic_cloud_5.png"/></a>
    </div>
    <div class="slick-captions-text slick-captions-elastic-cloud">
      <div class="caption"><p>First of all, click on <strong>Create deployment</strong>.</p></div>
      <div class="caption"><p>Select: <strong>Elastic Stack</strong>.</p></div>
      <div class="caption"><p>Configure your Elastic Stack as you want and click <strong>Create deployment</strong>.</p></div>
      <div class="caption"><p>Get the <strong>Username</strong> and <strong>password</strong> generated by Elastic Cloud. This user will have super user privileges but you can create after that a user with only necessary privileges.</p></div>
      <div class="caption"><p>When the deployment is ready, get the <strong>Elasticsearch endpoint</strong> and <strong>Kibana endpoint</strong> to use it for OpenVidu Pro.</p></div>
    </div>
</div>

When the cluster is ready, let's configure OpenVidu Pro to use it. You will need to modify `/opt/openvidu/.env` and add into this file the **Username** and **Password** generated by Elastic Cloud and your **ElasticSearch** and **Kibana** endpoint URLs. The `.env` file must have this parameters:

```html
OPENVIDU_PRO_ELASTICSEARCH_HOST=https://xxxxxxxx.elastic-cloud.com:9243/
OPENVIDU_PRO_KIBANA_HOST=https://yyyyyyyy.elastic-cloud.com:9243
ELASTICSEARCH_USERNAME=<YOUR_USERNAME>
ELASTICSEARCH_PASSWORD=<YOUR_PASSWORD>
```

Where:

- `OPENVIDU_PRO_ELASTICSEARCH_HOST`: The **Domain Endpoint** URL visible in the Elastic Cloud panel.
- `OPENVIDU_PRO_KIBANA_HOST`: The **Kibana** URL visible in the Elastic Cloud panel.
- `ELASTICSEARCH_USERNAME`: The master user generated by Elastic Cloud.
- `ELASTICSEARCH_PASSWORD`: The master password generated by Elastic Cloud.

Remember that any change you do in `/opt/openvidu/.env` will require you to restart your OpenVidu Server. Just execute `./openvidu restart` in `/opt/openvidu`.

> - Note that you need to specify port 9243 in `OPENVIDU_PRO_ELASTICSEARCH_HOST` and `OPENVIDU_PRO_KIBANA_HOST`. But you can also use port 443, Elastic Cloud has configured both ports for both URLs.
> - `OPENVIDU_PRO_ELASTICSEARCH_HOST` and `OPENVIDU_PRO_KIBANA_HOST` use the same https port, but both URLs has a different subdomain associated.
> - You can [create a fine-grained user](#create-a-fine-grained-user) to let OpenVidu access to specific resources of Elasticsearch and Kibana

### Create a fine-grained user

Configuring a user with all the privileges is not secure. To accomplish better security in your Elastic Stack cluster we will create a role and a user prepared to be used by OpenVidu Server Pro.

#### Create a fine-grained user using Kibana UI

<div class="row">
    <div class="pro-gallery-steps-fine-grained" style="margin: 25px 35px 25px 35px">
        <a data-fancybox="gallery-pro12" data-caption="First of all, go to the 'Stack Management' section." href="img/docs/openvidu-pro/elastic/fine-grained-user-1.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/fine-grained-user-1.png"/></a>
        <a data-fancybox="gallery-pro12" data-caption="In the 'Stack Management' section, go to 'Roles'." href="img/docs/openvidu-pro/elastic/fine-grained-user-2.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/fine-grained-user-2.png"/></a>
        <a data-fancybox="gallery-pro12" data-caption="Click on 'Create role' button." href="img/docs/openvidu-pro/elastic/fine-grained-user-3.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/fine-grained-user-3.png"/></a>
        <a data-fancybox="gallery-pro12" data-caption="Add into the role the 'Cluster privileges' and 'Indexes privileges' specified in the image. All these privileges are necessary for OpenVidu to send logs, metrics and Events related with OpenVidu." href="img/docs/openvidu-pro/elastic/fine-grained-user-4.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/fine-grained-user-4.png"/></a>
        <a data-fancybox="gallery-pro12" data-caption="Click on 'Add Space privilege'." href="img/docs/openvidu-pro/elastic/fine-grained-user-5.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/fine-grained-user-5.png"/></a>
        <a data-fancybox="gallery-pro12" data-caption="Select 'Default' space and 'Custom Privilege'." href="img/docs/openvidu-pro/elastic/fine-grained-user-6.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/fine-grained-user-6.png"/></a>
        <a data-fancybox="gallery-pro12" data-caption="Select 'All' in 'Saved Objects Management'. In this way OpenVidu will be able to update, add and remove dashboards and other Kibana configurations." href="img/docs/openvidu-pro/elastic/fine-grained-user-7.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/fine-grained-user-7.png"/></a>
        <a data-fancybox="gallery-pro12" data-caption="Click on 'Create role' button." href="img/docs/openvidu-pro/elastic/fine-grained-user-8.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/fine-grained-user-8.png"/></a>
        <a data-fancybox="gallery-pro12" data-caption="" href="img/docs/openvidu-pro/elastic/fine-grained-user-9.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/fine-grained-user-9.png"/></a>
        <a data-fancybox="gallery-pro12" data-caption="After the role is created, go to 'Users' section." href="img/docs/openvidu-pro/elastic/fine-grained-user-10.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/fine-grained-user-10.png"/></a>
        <a data-fancybox="gallery-pro12" data-caption="Configure an 'Username' and a 'Password' and the 'Role' created before. Then just click on  'Create User' button" href="img/docs/openvidu-pro/elastic/fine-grained-user-11.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/elastic/fine-grained-user-11.png"/></a>
    </div>
    <div class="slick-captions-text slick-captions-fine-grained">
      <div class="caption"><p>First of all, go to the <strong>Stack Management</strong> section.</p></div>
      <div class="caption"><p>In the <strong>Stack Management</strong> section, go to <strong>Roles</strong>.</p></div>
      <div class="caption"><p>Click on <strong>Create role</strong> button.</p></div>
      <div class="caption"><p>Add into the role the <strong>Cluster privileges</strong> and <strong>Indexes privileges</strong> specified in the image. All these privileges are necessary for OpenVidu to send logs, metrics and Events related with OpenVidu.</p></div>
      <div class="caption"><p>Click on <strong>Add Space privilege.</strong></p></div>
      <div class="caption"><p>Select <strong>Default</strong> space and <strong>Custom Privilege</strong>.</p></div>
      <div class="caption"><p>Select <strong>All</strong> in <strong>Saved Objects Management</strong>. In this way OpenVidu will be able to update, add and remove dashboards and other Kibana configurations.</p></div>
      <div class="caption"><p>Click on <strong>Create role</strong> button.</p></div>
      <div class="caption"><p>After the role is created, go to <strong>Users</strong> section.</p></div>
      <div class="caption"><p>Click on <strong>Create User</strong> button.</p></div>
      <div class="caption"><p>Configure an <strong>Username</strong> and a <strong>Password</strong> and the <strong>Role</strong> created before. Then just click on  <strong>Create User</strong> button.</p></div>
    </div>
</div>

After creating the user you just need to configure it in your `/opt/openvidu/.env` file:
```
ELASTICSEARCH_USERNAME=<USER_NAME>
ELASTICSEARCH_PASSWORD=<USER_PASSWORD>
```

#### Create a fine-grained user using Elastic Stack REST API

If you want to create a role and a user without using the UI you can create both by using REST API requests.

1. First you need to create a role using the name you want by calling Kibana REST API.
2. Secondly, create a user which will use the role created before by calling Elasticsearch REST API.

You can see an example of both HTTP requests here:
<div>

<div class="monitoring-div">

<div class="lang-tabs-container kibana-user-post elastic-events">

<div class="lang-tabs-header">
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; font-weight: bold">CREATE ROLE</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">CREATE USER</button>
</div>

<div id="create-role" class="lang-tabs-content">
<ul>
  <li><p><code>ROLE_NAME</code>: Name that you want for the role you are creating</p></li>
</ul>
```html
$ curl -X PUT "localhost:5601/api/security/role/<ROLE_NAME>" -H 'kbn-xsrf: true' -H 'Content-Type: application/json' -d'
{
   "elasticsearch":{
      "cluster":[
         "monitor",
         "manage_ilm",
         "manage_pipeline",
         "manage_ingest_pipelines",
         "manage_index_templates"
      ],
      "indices":[
         {
            "names":[
               "metricbeat*",
               "openvidu",
               "openvidu-logs*",
               "filebeat*",
               "server-metrics*",
               "session-metrics*",
               "loadtest*"
            ],
            "privileges":[
               "create_doc",
               "create_index",
               "manage",
               "read",
               "write",
               "manage_ilm"
            ]
         }
      ],
      "run_as":[

      ]
   },
   "kibana":[
      {
         "spaces":[
            "default"
         ],
         "base":[

         ],
         "feature":{
            "savedObjectsManagement":[
               "all"
            ]
         }
      }
   ]
}
'
```
</div>

<div id="create-user" class="lang-tabs-content" style="display:none">
<ul>
  <li><p><code>USER_NAME</code>: Name for the user you are creating</p></li>
  <li><p><code>USER_PASSWORD</code>: Password for the user you are creating</p></li>
  <li><p><code>ROLE_NAME</code>: Name of the role created before</p></li>
</ul>
```html
$ curl -X POST "localhost:9200/_security/user/<USER_NAME>?pretty" -H 'Content-Type: application/json' -d'
{
  "password" : "<USER_PASSWORD>",
  "roles" : [ "<ROLE_NAME>" ]
}
'
```
</div>
</div>
</div>
</div>
<br>

After creating the user you just need to configure it in your `/opt/openvidu/.env` file:
```
ELASTICSEARCH_USERNAME=<USER_NAME>
ELASTICSEARCH_PASSWORD=<USER_PASSWORD>
```

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
    $('.pro-gallery').slick({
      autoplay: true,
      arrows: false,
      autoplaySpeed: 3000,
      dots: true,
      infinite: true,
      pauseOnHover: false,
      pauseOnFocus: false,
      responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 1
        }
      },
    ]
    });

    $('.slick-captions-logs').slick({
      asNavFor: '.pro-gallery-steps',
      arrows: false,
      infinite: false,
      speed: 200,
      fade: true,
      dots: false
    });
    $('.pro-gallery-steps-logs').slick({
      asNavFor: '.slick-captions-logs',
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
    $('.slick-captions-elkaws').slick({
      asNavFor: '.pro-gallery-steps',
      arrows: false,
      infinite: false,
      speed: 200,
      fade: true,
      dots: false
    });
    $('.pro-gallery-steps-elkaws').slick({
      asNavFor: '.slick-captions-elkaws',
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

    $('.slick-captions-elastic-cloud').slick({
      asNavFor: '.pro-gallery-steps-elastic-cloud',
      arrows: false,
      infinite: false,
      speed: 200,
      fade: true,
      dots: false
    });
    $('.pro-gallery-steps-elastic-cloud').slick({
      asNavFor: '.slick-captions-elastic-cloud',
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

    $('.slick-captions-fine-grained').slick({
      asNavFor: '.pro-gallery-steps-fine-grained',
      arrows: false,
      infinite: false,
      speed: 200,
      fade: true,
      dots: false
    });
    $('.pro-gallery-steps-fine-grained').slick({
      asNavFor: '.slick-captions-fine-grained',
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
