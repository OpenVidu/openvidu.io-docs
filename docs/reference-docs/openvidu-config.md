<h2 id="section-title">OpenVidu configuration</h2>
<hr>

This page lists all available configuration properties for OpenVidu Server, as well as their possible values and the default ones.<br>
These properties may be set:

- In any official production deployment of OpenVidu CE or OpenVidu Pro: in the **`.env`** config file at OpenVidu installation path, default to `/opt/openvidu`
- In the official [development OpenVidu docker container](https://hub.docker.com/r/openvidu/openvidu-server-kms){:target="_blank"}: passing them as environment variables with flag **`-e PROPERTY=value`**

---

- **[Configuration parameters for OpenVidu <span id="openvidu-pro-tag" style="display: inline-block; background-color: #06d362; color: white; font-weight: bold; padding: 0px 5px; margin-left: 2px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">CE</span>](#configuration-parameters-for-openvidu-ce)**<div style="margin-bottom: 5px"></div>
- **[Configuration parameters for OpenVidu <span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin-left: 2px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span>](#configuration-parameters-for-openvidu-pro)**<div style="margin-bottom: 5px"></div>
<!-- - **[Configuration parameters for OpenVidu Enterprise](#configuration-parameters-for-openvidu-enterprise)**<a href="openvidu-enterprise/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: #9c27b0; color: white; font-weight: bold; padding: 0px 5px; margin-left: 5px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">ENTERPRISE</span></a>-->
- **[Special conditions of OpenVidu development container](#special-conditions-of-openvidu-development-container)**

---

### Configuration parameters for OpenVidu CE

These configuration parameters apply to both OpenVidu CE and OpenVidu Pro.

| Parameter | Description | Default value |
| --------- | ----------- | ------------- |
| **`DOMAIN_OR_PUBLIC_IP`** | Domain name where OpenVidu Server will be reachable. If you do not have one, the public IP address of the machine. Clients will use this to connect to OpenVidu Server. For example:<ul><li>`openvidu.example.com`</li><li>`192.0.2.2`</li></ul> | |
| **`OPENVIDU_SECRET`** | Secret used to connect to OpenVidu Server. This value is required when using the [REST API](reference-docs/REST-API/) or any server client ([openvidu-java-client](reference-docs/openvidu-java-client), [openvidu-node-client](reference-docs/openvidu-node-client)), as well as when connecting to openvidu-server dashboard. Can only contain alphanumeric characters, hyphens and underscores (matching regex `[a-zA-Z0-9_-]+`). | |
| **`CERTIFICATE_TYPE`** | Which type of certificate you want to use in your OpenVidu deployment:<ul><li>`selfsigned`</li><li>`owncert`</li><li>`letsencrypt`</li></ul> | **selfsigned** |
| **`HTTPS_PORT`** | Secure port where OpenVidu Server will listen for connections. All of OpenVidu services will be reachable at this port. Any client or SDK will have to connect to OpenVidu at this port. | **443** |
| **`HTTP_PORT`** | Insecure port from which OpenVidu will automatically redirect any request to the secure port.<br>For example, with<br>`HTTP_PORT=80` and `HTTPS_PORT=443`<br>a request to<br>`http://DOMAIN_OR_PUBLIC_IP/`<br>will be automatically redirected to<br>`https://DOMAIN_OR_PUBLIC_IP/`<br>**WARNING:** if you have set `CERTIFICATE_TYPE=letsencrypt`, you cannot change the default value *80*, as Let's Encrypt needs this port opened to generate your certificate. This applies at least for the first time you execute OpenVidu, when your certificate is generated. You should be able to change this value later, once Let's Encrypt has successfully run for the first time. | **80** |
| **`OPENVIDU_CDR`** | Whether to enable [Call Detail Record](reference-docs/openvidu-server-cdr) or not. | **false** |
| **`OPENVIDU_CDR_PATH`** | System path where to write CDR files | **/opt/openvidu/cdr** |
| **`OPENVIDU_RECORDING`** | Whether to enable the [Recording](advanced-features/recording/) module or not. | **false** |
| **`OPENVIDU_RECORDING_PATH`** | System path where to store the video files of recorded sessions. | **/opt/openvidu/recordings** |
| **`OPENVIDU_RECORDING_PUBLIC_ACCESS`** | Whether to allow free HTTP access to recorded sessions or not.<ul><li>If *true*, `OPENVIDU_RECORDING_PATH` will be publicly reachable at `/recordings/`, so any client can connect to<br>`https://DOMAIN_OR_PUBLIC_IP/openvidu/recordings/RECORDING_ID/RECORDING_NAME.EXTENSION`<br>and reach the recorded files.</li><li>If *false*, this path will be secured with Basic Auth the same way that [REST API](reference-docs/REST-API/) is<br>("*OPENVIDUAPP:`OPENVIDU_SECRET`*")</li></ul>For example, for an OpenVidu Server configured with ...<ul><li>`DOMAIN_OR_PUBLIC_IP=example.com`</li><li>`OPENVIDU_RECORDING=true`</li><li>`OPENVIDU_RECORDING_PATH=/my/path`</li><li>`OPENVIDU_RECORDING_PUBLIC_ACCESS=true`</li></ul>... a session with ID *foo* that has been recorded may generate a video file locally stored in the host machine under `/my/path/foo/foo.mp4` and reachable by any client connecting to<br>`https://example.com/openvidu/recordings/foo/foo.mp4` | **false** |
| **`OPENVIDU_RECORDING_NOTIFICATION`** | Which users should receive the recording events (`recordingStarted`, `recordingStopped`) in the client side:<ul><li>`all`: Every user connected to the session.</li><li>`publisher_moderator`: Users with role *PUBLISHER* or *MODERATOR*.</li><li>`moderator`: Only users with role *MODERATOR*.</li><li>`none`: No user will receive these events.</li></ul> | **publisher_moderator** |
| **`OPENVIDU_RECORDING_CUSTOM_LAYOUT`** | System path where OpenVidu Server should look for custom recording layouts. | **/opt/openvidu/custom-layout** |
| **`OPENVIDU_RECORDING_AUTOSTOP_TIMEOUT`** | Timeout in seconds for recordings to automatically stop (and the session involved to be closed) when conditions are met. See [Automatic stop of recordings](advanced-features/recording/#automatic-stop-of-recordings) to learn more. | **120** |
| **`OPENVIDU_RECORDING_COMPOSED_URL`** | Overrides the default URL that the recording module will use to connect to the session being recorded. This only affects *COMPOSED* recordings with video.<br>By default, the URL is built with `DOMAIN_OR_PUBLIC_IP` and `HTTPS_PORT`, so in certain cases where the host does not allow hairpinning (connecting to itself using its own public domain), this can be a solution.<br>For example, for OpenVidu CE using `https://PRIVATE_IP/dashboard` or OpenVidu PRO using `https://PRIVATE_IP/inspector` (where *PRIVATE_IP* is the internal IP of the Master Node), this setting may allow *COMPOSED* recording to work fine with default or custom layouts hosted in the same machine without accessing the Internet. | |
| **`OPENVIDU_RECORDING_DEBUG`** | Enable debug mode for recording. Affects *COMPOSED* and *COMPOSED_QUICK_START* recording output modes. Generates log files with the recording process details inside this particular recording folder (a folder with the recording identifier inside `OPENVIDU_RECORDING_PATH`). | **false** |
| **`OPENVIDU_WEBHOOK`** | Whether to enable the [OpenVidu Webhook](reference-docs/openvidu-server-webhook/) service or not. | **false** |
| **`OPENVIDU_WEBHOOK_ENDPOINT`** | HTTP endpoint where OpenVidu Server will send the POST messages with Webhook events. | |
| **`OPENVIDU_WEBHOOK_HEADERS`** | Array of strings with the HTTP headers that OpenVidu Server will append to each POST message of Webhook events.<br>For example, you may configure a Basic Auth header, setting this property to `[\"Authorization:\ Basic\ bmFtZTpwYXNz\"]` | **[ ]** |
| **`OPENVIDU_WEBHOOK_EVENTS`** | Array of strings with the type of events you want OpenVidu Server to send to your Webhook. | <pre>[<br>  "sessionCreated",<br>  "sessionDestroyed",<br>  "participantJoined",<br>  "participantLeft",<br>  "webrtcConnectionCreated",<br>  "webrtcConnectionDestroyed",<br>  "recordingStatusChanged",<br>  "signalSent",<br>  "filterEventDispatched",<br>  "mediaNodeStatusChanged",<br>  "autoscaling",<br>  "nodeCrashed"<br>]</pre> *(All available events)* |
| **`OPENVIDU_STREAMS_VIDEO_MAX_RECV_BANDWIDTH`** | Maximum video bandwidth sent from clients to OpenVidu Server, in kbps. 0 means *unconstrained*. | **1000** |
| **`OPENVIDU_STREAMS_VIDEO_MIN_RECV_BANDWIDTH`** | Minimum video bandwidth sent from clients to OpenVidu Server, in kbps. 0 means *unconstrained*. | **300** |
| **`OPENVIDU_STREAMS_VIDEO_MAX_SEND_BANDWIDTH`** | Maximum video bandwidth sent from OpenVidu Server to clients, in kbps. 0 means *unconstrained*. | **1000** |
| **`OPENVIDU_STREAMS_VIDEO_MIN_SEND_BANDWIDTH`** | Minimum video bandwidth sent from OpenVidu Server to clients, in kbps. 0 means *unconstrained*. | **300** |
| **`OPENVIDU_STREAMS_FORCED_VIDEO_CODEC`** | Enforce a specific video codec to be used by all clients, to avoid compatibility issues:<ul><li>`MEDIA_SERVER_PREFERRED`<br>A recommended choice is done for you</li><li>`NONE`<br>Let each client use their preferred codec</li><li>`VP8`</li><li>`VP9`</li><li>`H264`</li></ul>[More details](advanced-features/media-codecs/). | **MEDIA_SERVER_PREFERRED** |
| **`OPENVIDU_STREAMS_ALLOW_TRANSCODING`** | Allow the media server to perform live transcoding of video streams, ensuring that all codecs match in the session (**Kurento only**).<br>[More details](advanced-features/media-codecs/). | **false** |
| **`OPENVIDU_SESSIONS_GARBAGE_INTERVAL`** | How often the garbage collector of non active sessions runs. This helps cleaning up Sessions that have been initialized through REST API, and maybe have had Connections created, but have had no final users connected (no Connection of the Session entered `active` status). Default to 900s (15 mins). 0 to disable the non active sessions garbage collector. | **900** |
| **`OPENVIDU_SESSIONS_GARBAGE_THRESHOLD`** | Minimum time in seconds that a non active session must have been in existence for the garbage collector of non active sessions to remove it. Default to 3600s (1 hour). If non active sessions garbage collector is disabled (property `OPENVIDU_SESSIONS_GARBAGE_INTERVAL` is set to 0) this property is ignored. | **3600** |

<br>

---

### Configuration parameters for OpenVidu Pro

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
These configuration parameters are part of <a href="openvidu-pro/"><strong>OpenVidu</strong><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin-left: 5px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span></a> tier.
</div>
</div>

| Parameter | Description | Default value |
| --------- | ----------- | ------------- |
| **`OPENVIDU_PRO_LICENSE`** | License key of your OpenVidu Pro account. This parameter is mandatory to launch OpenVidu Pro clusters.<br>**[Sign up now to get your 15 day free trial!](https://openvidu.io/account)** | |
| **`OPENVIDU_EDITION`** | OpenVidu Edition to run. Possible values are:<ul><li>`pro`: Run an **[OpenVidu Pro](openvidu-pro/)** cluster.</li><li>`enterprise`: Run an **[OpenVidu Enterprise](openvidu-enterprise/)** cluster.</li></ul> | **pro** |
| **`OPENVIDU_PRO_CLUSTER_ID`** | Unique identifier of your cluster. Each OpenVidu Server Pro instance corresponds to one cluster. You can launch as many clusters as you want with your license key. The cluster ID will always be stored to disk so restarting OpenVidu Server Pro will keep the same previous cluster ID if this configuration parameter is not given a distinct value. | *A random string* |
| **`OPENVIDU_PRO_CLUSTER_MEDIA_NODES`** | The desired number of Media Nodes on startup. If there are too many existing Media Nodes on startup, they will be automatically dropped until this number is reached. If there are not enough, more will be automatically launched. This property has effect only on **[AWS deployments](deployment/pro/aws/)** and if `OPENVIDU_PRO_CLUSTER_AUTOSCALING=false`. | **1** |
| **`OPENVIDU_PRO_CLUSTER_AUTOSCALING`** | Whether to enable autoscaling or not. With autoscaling enabled, the number of Media Nodes will be automatically adjusted according to existing load. Enabling this property makes `OPENVIDU_PRO_CLUSTER_MEDIA_NODES` useless (instead will be using the value given to property `OPENVIDU_PRO_CLUSTER_AUTOSCALING_MIN_NODES`). | **false** |
| **`OPENVIDU_PRO_CLUSTER_AUTOSCALING_MAX_NODES`** | If `OPENVIDU_PRO_CLUSTER_AUTOSCALING=true`, the upper limit of Media Nodes that can be reached. Even when the average load exceeds the threshold, no more Media Nodes will be added to cluster. | **2** |
| **`OPENVIDU_PRO_CLUSTER_AUTOSCALING_MIN_NODES`** | If `OPENVIDU_PRO_CLUSTER_AUTOSCALING=true`, the lower limit of Media Nodes that can be reached. Even when the average load is inferior to the threshold, no more Media Nodes will be removed from the cluster. This property acts as `OPENVIDU_PRO_CLUSTER_MEDIA_NODES` when autoscaling is enabled. | **1** |
| **`OPENVIDU_PRO_CLUSTER_AUTOSCALING_MAX_LOAD`** | If `OPENVIDU_PRO_CLUSTER_AUTOSCALING=true`, the upper average load threshold that will trigger the addition of a new Media Node. Percentage value (0 min, 100 max). | **70** |
| **`OPENVIDU_PRO_CLUSTER_AUTOSCALING_MIN_LOAD`** | If `OPENVIDU_PRO_CLUSTER_AUTOSCALING=true`, the lower average load threshold that will trigger the removal of an existing Media Node. Percentage value (0 min, 100 max). | **20** |
| **`OPENVIDU_PRO_CLUSTER_PATH`** | Path where OpenVidu Server Pro will manage cluster-related files. This includes: looking for custom infrastructure management scripts and storing temporal output files with instances information. | **/opt/openvidu/cluster** |
| **`OPENVIDU_PRO_CLUSTER_TEST`** | If *true*, OpenVidu Server Pro will perform a quick test on startup to check the clustering features:<ol><li>Launch a Media Node</li><li>Connect to it</li><li>Drop it</li></ol>OpenVidu Server Pro logs will inform about the test execution in detail.<br>Immediately after finishing the test, OpenVidu Server Pro process **will terminate** with an exit code of `0` if the test was successful, or `1` if it failed.<br>This property is extremely useful to test that your OpenVidu Pro deployment is working fine. | **false** |
| **`OPENVIDU_PRO_ELASTICSEARCH_HOST`** | URL where the Elasticsearch service of OpenVidu Pro stack is listening.<br>OpenVidu Pro will send to that URL useful statistics of your sessions. If this parameter is explicitly set to an empty string, OpenVidu Pro will not send any data to Elasticsearch. If it is defined, then it is mandatory that OpenVidu Pro is able to establish a connection to it or start up process will fail. By default, OpenVidu Pro deployments have an Elasticsearch stack installed on *localhost*. | **http://localhost:9200** |
| **`OPENVIDU_PRO_ELASTICSEARCH_MAX_DAYS_DELETE`** | Maximum number of days that Elasticsearch indexes in rollover state will be kept on disk. | **7** |
| **`OPENVIDU_PRO_KIBANA_HOST`** | URL where the Kibana service of OpenVidu Pro stack is listening.<br>You can visualize Elasticsearch data in Kibana with the default dashboards provided by OpenVidu Pro, or you can create your own dashboards to better fit your needs.<br>If this parameter is explicitly set to an empty string, OpenVidu Pro will not connect to Kibana. If it is defined, then it is mandatory that OpenVidu Pro is able to establish a connection to it or else the start up process will fail.<br>By default, OpenVidu Pro deployments have Kibana installed on *localhost*. | **http://localhost:5601** |
| **`OPENVIDU_PRO_STATS_SESSION_INTERVAL`** | Interval in seconds for OpenVidu to start gathering statistics from Media Nodes.<br>This includes number of sessions in each Media Node, number of WebRTC connections, recordings, etc...<br>Set it to `0` for no gathering at all. | **5** |
| **`OPENVIDU_PRO_STATS_SERVER_INTERVAL`** | Interval in seconds for server-related metrics gathering: HTTP requests, statuses, log level information...<br>Set it to `0` for no gathering at all. | **10** |
| **`OPENVIDU_PRO_STATS_MONITORING_INTERVAL`** | Interval in seconds for CPU, memory and net usage stats gathering in Master Node. Set it to `0` for no gathering at all. | **10** |
| **`OPENVIDU_PRO_STATS_WEBRTC_INTERVAL`** | Interval in seconds for WebRTC stats gathering from Media Nodes WebRTC endpoints. Set it to `0` for no gathering at all. | **30** |
| **`OPENVIDU_PRO_NETWORK_QUALITY`** | Whether to enable or disable the **[Network Quality API](advanced-features/network-quality/)**.<br>You can monitor and warn users about the quality of their networks with this feature. | **false** |
| **`OPENVIDU_PRO_NETWORK_QUALITY_INTERVAL`** | If `OPENVIDU_PRO_NETWORK_QUALITY=true`, how often the network quality algorithm will be invoked for each user, in seconds. | **5** |
| **`OPENVIDU_BROWSER_LOGS`** | How openvidu-browser logs of clients should be sent to Elasticsearch:<ul><li>`disabled`: Don't send logs.</li><li>`debug`: Send all openvidu-browser logs.</li><li>`debug_app`: Send openvidu-browser logs and frontend app logs.</li></ul> | **disabled** |
| **`OPENVIDU_PRO_RECORDING_STORAGE`** | Where to store recordings:<ul><li>`local`: Use local storage.</li><li>`s3`: Use an AWS S3 bucket</li></ul>See **[Uploading recordings to AWS S3](advanced-features/recording/#uploading-recordings-to-aws-s3)**. | **local** |
| **`OPENVIDU_PRO_AWS_S3_BUCKET`** | If `OPENVIDU_PRO_RECORDING_STORAGE=s3`, AWS S3 bucket where to store recordings. May include paths to allow navigating folder structures inside the bucket. | |
| **`OPENVIDU_PRO_AWS_S3_HEADERS`** | If `OPENVIDU_PRO_RECORDING_STORAGE=s3`, the collection of HTTP header values that the internal AWS client will use during the upload process. The property is a key-value map of strings, following the format of a JSON object.<br>For example, to apply server-side encryption with AES-256, this header is mandatory:<br>`{"x-amz-server-side-encryption":"AES256"}`<br>The list of available headers can be found **[here](https://docs.aws.amazon.com/AWSJavaSDK/latest/javadoc/com/amazonaws/services/s3/Headers.html){:target="_blank"}**. | **{ }** |
| **`OPENVIDU_PRO_AWS_S3_SERVICE_ENDPOINT`** | If `OPENVIDU_PRO_RECORDING_STORAGE=s3` and you want an S3 provider different to AWS, the service endpoint of the S3 bucket. This allows using any kind of S3 compatible buckets, not only AWS. <br>For example: _https://s3.us-west-002.backblazeb2.com_ | |
| **`OPENVIDU_PRO_AWS_ACCESS_KEY`** | If `OPENVIDU_PRO_RECORDING_STORAGE=s3`, AWS long-lived credentials access key. Must have read and write permissions over the bucket defined in property `OPENVIDU_PRO_AWS_S3_BUCKET`. If not provided, then the internal S3 client will try to use the default AWS credentials of the machine, if available (see the credentials search order in the [Java Doc](https://docs.aws.amazon.com/AWSJavaSDK/latest/javadoc/com/amazonaws/auth/DefaultAWSCredentialsProviderChain.html)). | |
| **`OPENVIDU_PRO_AWS_SECRET_KEY`** | If `OPENVIDU_PRO_RECORDING_STORAGE=s3`, AWS long-lived credentials secret key. If not provided, then the internal S3 client will try to use the default AWS credentials of the machine, if available (see the credentials search order in the [Java Doc](https://docs.aws.amazon.com/AWSJavaSDK/latest/javadoc/com/amazonaws/auth/DefaultAWSCredentialsProviderChain.html)). | |
| **`OPENVIDU_PRO_AWS_REGION`** | If `OPENVIDU_PRO_RECORDING_STORAGE=s3`, AWS region in which the S3 bucket is located (e.g. "*eu-west-1*"). If not provided, the region will try to be discovered automatically, although this is not always possible. | |
| **`OPENVIDU_PRO_PRIVATE_IP`** | Private IP of Master Node. Media Nodes will use this property to communicate with Master Node. **This property is optional and as a general rule should remain empty**, as Media Nodes will automatically discover this IP.<br>It is only suitable for **[On Premises deployments](deployment/pro/on-premises/)** when Media Nodes are not able to autodiscover the IP address for any kind of not contemplated reason. | |
| **`OPENVIDU_PRO_LICENSE_HTTP_PROXY`** | OpenVidu Pro or Enterprise sends periodically information about CPU usage and license checks. All of those requests requires HTTP/HTTPS access to the Internet to . <br><br> As some environments may use HTTP proxies to access the internet for security reasons, this parameter allows OpenVidu Pro and Enterprise to send license information and CPU usage using a configured proxy in your infrastructure.<br><br> An example of this parameter would be: `your.proxy:8080` | |
| **`KMS_URIS`** | Array of Media Node URIs (comma-separated list of strings) that should be automatically added to the cluster on startup. If any value is provided, then it must be valid and reachable, or OpenVidu will fail to start.<br>This property has effect only on **[On Premises deployments](deployment/pro/on-premises/)**. All of Media Node URIs have the same format:<br>`ws://MEDIA_NODE_IP:8888/kurento`<br>For example, a possible value for this property for a single Media Node might look like this:<br>`["ws://203.0.113.2:8888/kurento"]` | **[ ]** |
| **`ELASTICSEARCH_USERNAME`** | When using a secured **[external Elastic stack](openvidu-pro/monitoring-elastic-stack/#configuring-an-external-elastic-stack)**, the name of the Elastic user. | |
| **`ELASTICSEARCH_PASSWORD`** | When using a secured **[external Elastic stack](openvidu-pro/monitoring-elastic-stack/#configuring-an-external-elastic-stack)**, the password of the Elastic user. | |

<br>

---

<!--### Configuration parameters for OpenVidu Enterprise

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
These configuration parameters are part of <a href="openvidu-enterprise/"><strong>OpenVidu</strong><span id="openvidu-pro-tag" style="display: inline-block; background-color: #9c27b0; color: white; font-weight: bold; padding: 0px 5px; margin-left: 5px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">ENTERPRISE</span></a> tier.
</div>
</div>

| Parameter       | Description                               | Default value                                      |
| --------------- | ----------------------------------------- | -------------------------------------------------- |
| **`OPENVIDU_ENTERPRISE_MEDIA_SERVER`** | Which media server to use in your deployment. Possible values are:<br>• `kurento`<br>• `mediasoup`<br> | `mediasoup` |

<br>

---
-->

### Special conditions of OpenVidu development container

When using the official [development OpenVidu docker container](https://hub.docker.com/r/openvidu/openvidu-server-kms){:target="_blank"} to develop your app in your LAN network, there are some properties that you can't make use of. In the development container **these configuration properties won't have effect, or may have unwanted side effects** if declared. Avoid declaring them:

- `HTTP_PORT`: in LAN networks redirects or Let's Encrypt don't make sense.
- `CERTIFICATE_TYPE`: in LAN networks certificates don't make sense.

Also, take into account that **these configuration properties have different default values** in the development container:

- `DOMAIN_OR_PUBLIC_IP`: default to `localhost` in the dev container. Container won't fail to start if you don't provide a value to it.
- `OPENVIDU_SECRET`:  default to `MY_SECRET` in the dev container. Container won't fail to start if you don't provide a value to it.
- `HTTPS_PORT`: default to `4443` in the dev container.

Below there is an example of a `docker run` command to launch the OpenVidu development container while setting multiple configuration properties:

```bash
docker run -p 4443:4443 --rm \
    -e OPENVIDU_SECRET=my_password \
    -e OPENVIDU_RECORDING=true \
    -e OPENVIDU_RECORDING_PATH=/home/openvidu/recordings \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v /home/openvidu/recordings:/home/openvidu/recordings \
    -e OPENVIDU_CDR=true \
    -e OPENVIDU_CDR_PATH=/home/openvidu/cdr \
    -v /home/openvidu/cdr:/home/openvidu/cdr \
    -e OPENVIDU_WEBHOOK=true \
    -e OPENVIDU_WEBHOOK_ENDPOINT=https://localhost:7777/my-endpoint \
openvidu/openvidu-server-kms:latest
```

<br>
