<h2 id="section-title">OpenVidu configuration</h2>
<div id="openvidu-configuration-properties"></div>
<hr>

This page lists all available configuration properties for an OpenVidu deployment, as well as their possible values and the default ones.<br>
These properties may be set:

- In any official production deployment of OpenVidu CE, Pro or Enterprise: in the **`.env`** config file at OpenVidu installation path, default to `/opt/openvidu`
- In the official [development OpenVidu docker container](https://hub.docker.com/r/openvidu/openvidu-dev){:target="_blank"}: passing them as environment variables with flag **`-e PROPERTY=value`**

---

- **[Configuration parameters for OpenVidu <span id="openvidu-pro-tag" style="display: inline-block; background-color: #06d362; color: white; font-weight: bold; padding: 0px 5px; margin-left: 2px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">CE</span>](#configuration-parameters-for-openvidu-ce)**<div style="margin-bottom: 5px"></div>
- **[Configuration parameters for OpenVidu <span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin-left: 2px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span>](#configuration-parameters-for-openvidu-pro)**<div style="margin-bottom: 5px"></div>
- **[Configuration parameters for OpenVidu <span id="openvidu-pro-tag" style="display: inline-block; background-color: #9c27b0; color: white; font-weight: bold; padding: 0px 5px; margin-left: 2px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">ENTERPRISE</span>](#configuration-parameters-for-openvidu-enterprise)**<div style="margin-bottom: 5px"></div>
- **[Special conditions of OpenVidu development container](#special-conditions-of-openvidu-development-container)**

---

### Configuration parameters for OpenVidu CE

These configuration parameters apply to OpenVidu CE, OpenVidu Pro and OpenVidu Enterprise.

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
| **`OPENVIDU_RECORDING_PUBLIC_ACCESS`** | Whether to allow free HTTP access to recorded sessions or not.<ul><li>If *true*, `OPENVIDU_RECORDING_PATH` will be publicly reachable at `/recordings/`, so any client can connect to<br>`https://DOMAIN_OR_PUBLIC_IP/openvidu/recordings/RECORDING_ID/RECORDING_NAME.EXTENSION`<br>and reach the recorded files.</li><li>If *false*, this path will be secured with Basic Auth the same way that [REST API](reference-docs/REST-API/) is<br>("*OPENVIDUAPP:`OPENVIDU_SECRET`*")</li></ul>For example, for an OpenVidu Server configured with <ul><li>`DOMAIN_OR_PUBLIC_IP=example.com`</li><li>`OPENVIDU_RECORDING=true`</li><li>`OPENVIDU_RECORDING_PATH=/my/path`</li><li>`OPENVIDU_RECORDING_PUBLIC_ACCESS=true`</li></ul> a session with ID *foo* that has been recorded may generate a video file locally stored in the host machine under `/my/path/foo/foo.mp4` and reachable by any client connecting to<br>`https://example.com/openvidu/recordings/foo/foo.mp4` | **false** |
| **`OPENVIDU_RECORDING_NOTIFICATION`** | Which users should receive the recording events (`recordingStarted`, `recordingStopped`) in the client side:<ul><li>`all`: Every user connected to the session.</li><li>`publisher_moderator`: Users with role *PUBLISHER* or *MODERATOR*.</li><li>`moderator`: Only users with role *MODERATOR*.</li><li>`none`: No user will receive these events.</li></ul> | **publisher_moderator** |
| **`OPENVIDU_RECORDING_CUSTOM_LAYOUT`** | System path where OpenVidu Server should look for custom recording layouts. | **/opt/openvidu/custom-layout** |
| **`OPENVIDU_RECORDING_AUTOSTOP_TIMEOUT`** | Timeout in seconds for recordings to automatically stop (and the session involved to be closed) when conditions are met. See [Automatic stop of recordings](advanced-features/recording/#automatic-stop-of-recordings) to learn more. | **120** |
| **`OPENVIDU_RECORDING_COMPOSED_URL`** | Overrides the default URL that the recording module will use to connect to the session being recorded. This only affects *COMPOSED* recordings with video.<br>By default, the URL is built with `DOMAIN_OR_PUBLIC_IP` and `HTTPS_PORT`, so in certain cases where the host does not allow hairpinning (connecting to itself using its own public domain), this can be a solution.<br>For example, for OpenVidu CE using `https://PRIVATE_IP/dashboard` or OpenVidu Pro using `https://PRIVATE_IP/inspector` (where *PRIVATE_IP* is the internal IP of the Master Node), this setting may allow *COMPOSED* recording to work fine with default or custom layouts hosted in the same machine without accessing the Internet. | |
| **`OPENVIDU_RECORDING_DEBUG`** | Enable debug mode for recording. Affects *COMPOSED* and *COMPOSED_QUICK_START* recording output modes. Generates log files with the recording process details inside this particular recording folder (a folder with the recording identifier inside `OPENVIDU_RECORDING_PATH`). | **false** |
| **`OPENVIDU_WEBHOOK`** | Whether to enable the [OpenVidu Webhook](reference-docs/openvidu-server-webhook/) service or not. | **false** |
| **`OPENVIDU_WEBHOOK_ENDPOINT`** | HTTP endpoint where OpenVidu Server will send the POST messages with Webhook events. | |
| **`OPENVIDU_WEBHOOK_HEADERS`** | Array of strings with the HTTP headers that OpenVidu Server will append to each POST message of Webhook events.<br>For example, you may configure a Basic Auth header, setting this property to `[\"Authorization:\ Basic\ bmFtZTpwYXNz\"]` | **[ ]** |
| **`OPENVIDU_WEBHOOK_EVENTS`** | Array of strings with the type of events you want OpenVidu Server to send to your Webhook. | <div style="font-weight: bold; margin-bottom: 5px;">["sessionCreated",<br>"sessionDestroyed",<br>"participantJoined",<br>"participantLeft",<br>"webrtcConnectionCreated",<br>"webrtcConnectionDestroyed",<br>"recordingStatusChanged",<br>"filterEventDispatched",<br>"signalSent",<br>"mediaNodeStatusChanged",<br>"autoscaling",<br>"nodeCrashed",<br>"nodeRecovered"]</div>*(All available events)* |
| **`OPENVIDU_STREAMS_VIDEO_MAX_RECV_BANDWIDTH`** | Maximum video bandwidth sent from clients to OpenVidu Server, in kbps. 0 means *unconstrained*. | **1000** |
| **`OPENVIDU_STREAMS_VIDEO_MIN_RECV_BANDWIDTH`** | Minimum video bandwidth sent from clients to OpenVidu Server, in kbps. 0 means *unconstrained*. | **300** |
| **`OPENVIDU_STREAMS_VIDEO_MAX_SEND_BANDWIDTH`** | Maximum video bandwidth sent from OpenVidu Server to clients, in kbps. 0 means *unconstrained*. | **1000** |
| **`OPENVIDU_STREAMS_VIDEO_MIN_SEND_BANDWIDTH`** | Minimum video bandwidth sent from OpenVidu Server to clients, in kbps. 0 means *unconstrained*. | **300** |
| **`OPENVIDU_STREAMS_FORCED_VIDEO_CODEC`** | Enforce a specific video codec to be used by all clients, to avoid compatibility issues:<ul><li>`MEDIA_SERVER_PREFERRED`<br>A recommended choice is done for you</li><li>`NONE`<br>Let each client use their preferred codec</li><li>`VP8`</li><li>`VP9`</li><li>`H264`</li></ul>[More details](advanced-features/media-codecs/#forced-video-codec). | **MEDIA_SERVER_PREFERRED** |
| **`OPENVIDU_STREAMS_ALLOW_TRANSCODING`** | Allow the media server to perform live transcoding of video streams, ensuring that all codecs match in the session (**Kurento only**).<br>[More details](advanced-features/media-codecs/#allow-transcoding). | **false** |
| **`OPENVIDU_SESSIONS_GARBAGE_INTERVAL`** | How often the garbage collector of non active sessions runs. This helps cleaning up Sessions that have been initialized through REST API, and maybe have had Connections created, but have had no final users connected (no Connection of the Session entered `active` status). Default to 900s (15 mins). 0 to disable the non active sessions garbage collector. | **900** |
| **`OPENVIDU_SESSIONS_GARBAGE_THRESHOLD`** | Minimum time in seconds that a non active session must have been in existence for the garbage collector of non active sessions to remove it. Default to 3600s (1 hour). If non active sessions garbage collector is disabled (property `OPENVIDU_SESSIONS_GARBAGE_INTERVAL` is set to 0) this property is ignored. | **3600** |
| **`OPENVIDU_WEBRTC_ICE_SERVERS`** | Array of ICE servers to use instead of default Coturn at browser/clients side (comma-separated list of ICE Servers). Examples: <ul><li>`["url=turns:example.turn.com:443,staticAuthSecret=secret"]`</li><li>`["url=turns:example.turn.com:443,username=usertest,credential=userpass"]`</li></ul> [More Details](deployment/allow-users-behind-firewalls/){:target="\_blank"} | **[ ]** |

<br>

### Advanced parameters for OpenVidu CE

<div class="warningBoxContent">
  <div style="display: table-cell; vertical-align: middle;">
      <i class="icon ion-android-alert warningIcon"></i>
  </div>
  <div class="warningBoxText">
    These properties are related to infrastructure and network aspects. OpenVidu is deployed with sane defaults, and these configuration properties will normally not require changes. They are only described here for custom on premises deployments with special network conditions or requirements, and only meant for users with deep knowledge about their deployment environment.
  </div>
</div>

| Parameter | Description | Default value |
| --------- | ----------- | ------------- |
| **`COTURN_IP`** | This is the IP of the default TURN/STUN Coturn server deployed with OpenVidu. <br><ul><li>By default it is the autodiscovered Public IPv4. This IP is used by browsers and Kurento Media Server as TURN/STUN service for ICE protocol to autodiscover its own Public IP.</li><li>Possible values: <ul><li>`auto-ipv4`</li><li>`auto-ipv6`</li><li>Any valid Public Ipv4 or Public IPv6</li></ul></li></ul> | **auto-ipv4** |
| **`COTURN_PORT`** | This is the port used for TURN/STUN Coturn server deployed with OpenVidu in the Master Node. <br><ul><li>By default it is 3478. This port is used by browsers and Kurento Media Server as TURN/STUN service port for ICE protocol to autodiscover its own Public IP.</li><li>Possible values: Any value between 1-65535 | **3478** |
| **`OPENVIDU_WEBRTC_ICE_SERVERS`** | Array of ICE servers to use instead of the default Coturn at the client side (comma-separated list of ICE Servers). When `OPENVIDU_WEBRTC_ICE_SERVERS` is used, Kurento <br> still uses `COTURN_IP` (or the public IP of Media Nodes if `OPENVIDU_PRO_COTURN_IN_MEDIA_NODES=true`) but browsers uses the TURN/STUN servers defined at `OPENVIDU_WEBRTC_ICE_SERVERS`.</li> Examples: <ul><li>`["url=turns:example.turn.com:443,staticAuthSecret=secret"]`</li><li>`["url=turns:example.turn.com:443,username=usertest,credential=userpass"]`</li></ul> [More Details](deployment/allow-users-behind-firewalls/){:target="\_blank"} | **[ ]** |


<br>

---

### Configuration parameters for OpenVidu Pro

These configuration parameters apply to OpenVidu Pro and OpenVidu Enterprise.

| Parameter | Description | Default value |
| --------- | ----------- | ------------- |
| **`OPENVIDU_PRO_LICENSE`** | License key of your OpenVidu Pro account. This parameter is mandatory to launch OpenVidu Pro clusters.<br>**[Sign up now to get your 15 day free trial!](https://openvidu.io/account)** | |
| **`OPENVIDU_EDITION`** | OpenVidu Edition to run. Possible values are:<ul><li>`pro`: Run an **[OpenVidu Pro](openvidu-pro/)** cluster.</li><li>`enterprise`: Run an **[OpenVidu Enterprise](openvidu-enterprise/)** cluster.</li></ul> | **pro** |
| **`OPENVIDU_PRO_CLUSTER_ID`** | Unique identifier of your cluster. Each OpenVidu Server Pro instance corresponds to one cluster. You can launch as many clusters as you want with your license key. The cluster ID will always be stored to disk so restarting OpenVidu Server Pro will keep the same previous cluster ID if this configuration parameter is not given a distinct value. | *A random string* |
| **`OPENVIDU_PRO_CLUSTER_MEDIA_NODES`** | The desired number of Media Nodes on startup. If there are too many existing Media Nodes on startup, they will be automatically dropped until this number is reached. If there are not enough, more will be automatically launched. This property has effect only on **[AWS deployments](deployment/pro/aws/)** and if `OPENVIDU_PRO_CLUSTER_AUTOSCALING=false`. | **1** |
| **`OPENVIDU_PRO_CLUSTER_RECONNECTION_TIMEOUT`** | Maximum time in seconds that OpenVidu Server will try to reconnect to a crashed Media Node before terminating it. From the perspective of WebHook events, it is the time frame between a Media Node disconnection and a [mediaNodeStatusChanged](openvidu-pro/scalability/#openvidu-pro-cluster-events) event to `terminating`. Check out [Media Node reconnection configuration](openvidu-pro/fault-tolerance/#media-node-reconnection-configuration) for further information. Minimum 3 seconds, maximum infinite time (expressed with -1). | Depending on the deployment environment: <br>**-1** (infinite retry) for [On Premises](deployment/pro/on-premises/) deployments with [autoscaling](openvidu-pro/scalability/#autoscaling) disabled.<br>**3** (min value) for any other type of deployment. |
| **`OPENVIDU_PRO_CLUSTER_AUTOSCALING`** | Whether to enable autoscaling or not. With autoscaling enabled, the number of Media Nodes will be automatically adjusted according to existing load. Enabling this property makes `OPENVIDU_PRO_CLUSTER_MEDIA_NODES` useless (instead will be using the value given to property `OPENVIDU_PRO_CLUSTER_AUTOSCALING_MIN_NODES`). | **false** |
| **`OPENVIDU_PRO_CLUSTER_AUTOSCALING_MAX_NODES`** | If `OPENVIDU_PRO_CLUSTER_AUTOSCALING=true`, the upper limit of Media Nodes that can be reached. Even when the average load exceeds the threshold, no more Media Nodes will be added to cluster. | **2** |
| **`OPENVIDU_PRO_CLUSTER_AUTOSCALING_MIN_NODES`** | If `OPENVIDU_PRO_CLUSTER_AUTOSCALING=true`, the lower limit of Media Nodes that can be reached. Even when the average load is inferior to the threshold, no more Media Nodes will be removed from the cluster. This property acts as `OPENVIDU_PRO_CLUSTER_MEDIA_NODES` when autoscaling is enabled. | **1** |
| **`OPENVIDU_PRO_CLUSTER_AUTOSCALING_MAX_LOAD`** | If `OPENVIDU_PRO_CLUSTER_AUTOSCALING=true`, the upper average load threshold that will trigger the addition of a new Media Node. Percentage value (0 min, 100 max). | **70** |
| **`OPENVIDU_PRO_CLUSTER_AUTOSCALING_MIN_LOAD`** | If `OPENVIDU_PRO_CLUSTER_AUTOSCALING=true`, the lower average load threshold that will trigger the removal of an existing Media Node. Percentage value (0 min, 100 max). | **20** |
| **`OPENVIDU_PRO_CLUSTER_PATH`** | Path where OpenVidu Server Pro will manage cluster-related files. This includes: looking for custom infrastructure management scripts and storing temporal output files with instances information. | **/opt/openvidu/cluster** |
| **`OPENVIDU_PRO_CLUSTER_TEST`** | If *true*, OpenVidu Server Pro will perform a quick test on startup to check the clustering features:<ol><li>Launch a Media Node</li><li>Connect to it</li><li>Drop it</li></ol>OpenVidu Server Pro logs will inform about the test execution in detail.<br>Immediately after finishing the test, OpenVidu Server Pro process **will terminate** with an exit code of `0` if the test was successful, or `1` if it failed.<br>This property is extremely useful to test that your OpenVidu Pro deployment is working fine. | **false** |
| **`OPENVIDU_PRO_ELASTICSEARCH`** | This property determines whether OpenVidu Pro or Enterprise will use Elasticsearch to store history of sessions, logs and metrics. If it is set to `true`, OpenVidu will try to connect to an Elasticsearch instance, either one deployed by default in OpenVidu Pro or a custom one specified in `OPENVIDU_PRO_ELASTICSEARCH_HOST` in OpenVidu Enterprise. If it is set to `false`, no history of sessions, logs or metrics will be sent to Elasticsearch. | **true** |
| **`OPENVIDU_PRO_ELASTICSEARCH_HOST`** | This property specifies the URL of a custom Elasticsearch instance to be used by OpenVidu Pro or Enterprise. If `OPENVIDU_PRO_ELASTICSEARCH` is set to true, OpenVidu will try to connect to this URL to send history of sessions, logs and metrics. In OpenVidu Pro, if this property is not defined, OpenVidu will deploy a default Elasticsearch instance in the master node to be used by itself. In OpenVidu Enterprise, if this property is not defined while `OPENVIDU_PRO_ELASTICSEARCH` is set to `true`, OpenVidu won't be able to use Elasticsearch. | **http://localhost:9200** |
| **`OPENVIDU_PRO_KIBANA_HOST`** | This property specifies the URL of a Kibana instance to be used by OpenVidu Pro or Enterprise to visualize data stored in Elasticsearch. If `OPENVIDU_PRO_ELASTICSEARCH` is set to true, OpenVidu will use this URL to connect to Kibana. In OpenVidu Pro, if this property is not defined, OpenVidu will deploy a default Kibana instance in the master node to be used by itself. In OpenVidu Enterprise, if this property is not defined while `OPENVIDU_PRO_ELASTICSEARCH` is set to `true`, OpenVidu won't be able to use Kibana to visualize data. | **http://localhost:5601** |
| **`OPENVIDU_PRO_ELASTICSEARCH_MAX_DAYS_DELETE`** | Maximum number of days that Elasticsearch indexes in rollover state will be kept on disk. | **7** |
| **`OPENVIDU_PRO_STATS_SESSION_INTERVAL`** | Interval in seconds for OpenVidu to start gathering statistics from Media Nodes.<br>This includes number of sessions in each Media Node, number of WebRTC connections, recordings, etc...<br>Set it to `0` for no gathering at all. | **5** |
| **`OPENVIDU_PRO_STATS_SERVER_INTERVAL`** | Interval in seconds for server-related metrics gathering: HTTP requests, statuses, log level information...<br>Set it to `0` for no gathering at all. | **10** |
| **`OPENVIDU_PRO_STATS_MONITORING_INTERVAL`** | Interval in seconds for CPU, memory and net usage stats gathering in Master Node. Set it to `0` for no gathering at all. | **10** |
| **`OPENVIDU_PRO_STATS_WEBRTC_INTERVAL`** | Interval in seconds for WebRTC stats gathering from Media Nodes WebRTC endpoints. Set it to `0` for no gathering at all. | **30** |
| **`OPENVIDU_PRO_NETWORK_QUALITY`** | Whether to enable or disable the **[Network Quality API](advanced-features/network-quality/)**.<br>You can monitor and warn users about the quality of their networks with this feature. | **false** |
| **`OPENVIDU_PRO_NETWORK_QUALITY_INTERVAL`** | If `OPENVIDU_PRO_NETWORK_QUALITY=true`, how often the network quality algorithm will be invoked for each user, in seconds. | **5** |
| **`OPENVIDU_PRO_SPEECH_TO_TEXT`** | Engine to use in the **[Speech To Text](advanced-features/speech-to-text/)** service.<br> No value means the Speech To Text service is disabled (this is the deafult configuration). It can be: <ul><li>`azure`: Use Azure Speech To Text engine</li><li>`aws`: Use the Amazon Transcribe engine</li><li>`vosk`: Use the open-śource Vosk engine</li></ul> | |
| **`OPENVIDU_PRO_SPEECH_TO_TEXT_AZURE_KEY`** | If `OPENVIDU_PRO_SPEECH_TO_TEXT=azure`, Azure key for the Speech To Text service. See [Azure Speech To Text docs](https://azure.microsoft.com/en-us/products/cognitive-services/speech-to-text/){:target="_blank"} | |
| **`OPENVIDU_PRO_SPEECH_TO_TEXT_AZURE_REGION`** | If `OPENVIDU_PRO_SPEECH_TO_TEXT=azure`, Azure region in which the Speech To Text service is located (e.g. 'westeurope'). See [Azure Speech To Text docs](https://azure.microsoft.com/en-us/products/cognitive-services/speech-to-text/){:target="_blank"} | |
| **`OPENVIDU_PRO_SPEECH_TO_TEXT_VOSK_MODEL_LOAD_STRATEGY`** | If `OPENVIDU_PRO_SPEECH_TO_TEXT=vosk`, the load strategy for the language models. It can be: <ul><li>`on_demand`: Vosk models will be loaded into memory just when they are needed, and will be unloaded when they are no longer needed.</li><li>`manual`: Vosk models can only be loaded and unloaded with the REST API. See [load](reference-docs/REST-API/#post-speech-to-text) and [unload](reference-docs/REST-API/#delete-speech-to-text) methods.</li></ul> | **on_demand** |
| **`OPENVIDU_PRO_SPEECH_TO_TEXT_IMAGE`** | Docker image to use as Speech To Text module. If using `OPENVIDU_PRO_SPEECH_TO_TEXT=vosk`, this property allows to use a custom image with other Vosk language models than the default ones. See [Using custom languages](advanced-features/speech-to-text/#using-custom-languages). You can configure private Docker registries using property `OPENVIDU_PRO_DOCKER_REGISTRIES` | |
| **`OPENVIDU_PRO_DOCKER_REGISTRIES`** | List of Docker registries to be used by Media Nodes. This is useful for those Docker images that may be overwritten with custom images, which includes the images defined by properties `KMS_IMAGE` and `OPENVIDU_PRO_SPEECH_TO_TEXT_IMAGE`. The list is a JSON array of strings, each one with the following properties:<br>`"serveraddress=test.io,username=test,password=test"` | **[ ]** |
| **`OPENVIDU_BROWSER_LOGS`** | How openvidu-browser logs of clients should be sent to Elasticsearch:<ul><li>`disabled`: Don't send logs.</li><li>`debug`: Send all openvidu-browser logs.</li><li>`debug_app`: Send openvidu-browser logs and frontend app logs.</li></ul> | **disabled** |
| **`OPENVIDU_PRO_RECORDING_STORAGE`** | Where to store recordings:<ul><li>`local`: Use local storage.</li><li>`s3`: Use an AWS S3 bucket</li></ul>See **[Uploading recordings to AWS S3](advanced-features/recording/#uploading-recordings-to-aws-s3)**. | **local** |
| **`OPENVIDU_PRO_AWS_S3_BUCKET`** | If `OPENVIDU_PRO_RECORDING_STORAGE=s3`, AWS S3 bucket where to store recordings. May include paths to allow navigating folder structures inside the bucket. | |
| **`OPENVIDU_PRO_AWS_S3_HEADERS`** | If `OPENVIDU_PRO_RECORDING_STORAGE=s3`, the collection of HTTP header values that the internal AWS client will use during the upload process. The property is a key-value map of strings, following the format of a JSON object.<br>For example, to apply server-side encryption with AES-256, this header is mandatory:<br>`{"x-amz-server-side-encryption":"AES256"}`<br>The list of available headers can be found **[here](https://docs.aws.amazon.com/AWSJavaSDK/latest/javadoc/com/amazonaws/services/s3/Headers.html){:target="_blank"}**. | **{ }** |
| **`OPENVIDU_PRO_AWS_S3_SERVICE_ENDPOINT`** | If `OPENVIDU_PRO_RECORDING_STORAGE=s3` and you want an S3 provider different to AWS, the service endpoint of the S3 bucket. This allows using any kind of S3 compatible buckets, not only AWS. <br>For example: _https://s3.us-west-002.backblazeb2.com_ | |
| **`OPENVIDU_PRO_AWS_S3_WITH_PATH_STYLE_ACCESS`** | If `OPENVIDU_PRO_RECORDING_STORAGE=s3`, true to always use path-style access for all requests. This may be mandatory to avoid _Access Denied_ errors when accessing non-AWS S3 buckets from domain names and not IPs. See AWS docs [Path-style requests](https://docs.aws.amazon.com/AmazonS3/latest/userguide/VirtualHosting.html#path-style-access){:target="_blank"}. | |
| **`OPENVIDU_PRO_AWS_ACCESS_KEY`** | This property applies to <br>`OPENVIDU_PRO_RECORDING_STORAGE=s3` and/or <br>`OPENVIDU_PRO_SPEECH_TO_TEXT=aws`. It is the AWS long-lived credentials access key. Depending on the service you have enabled:<ul><li>`OPENVIDU_PRO_RECORDING_STORAGE=s3`: Must have read and write permissions over the bucket defined in property `OPENVIDU_PRO_AWS_S3_BUCKET`. In this case credentials are optional: if not provided the internal S3 client will try to use the default AWS credentials of the Master Node, if available (see the credentials search order in the [Java Doc](https://docs.aws.amazon.com/AWSJavaSDK/latest/javadoc/com/amazonaws/auth/DefaultAWSCredentialsProviderChain.html)).</li><li>`OPENVIDU_PRO_SPEECH_TO_TEXT=aws`: Must have permissions to manage Amazon Transcribe services. In this case credentials are mandatory.</li></ul> | |
| **`OPENVIDU_PRO_AWS_SECRET_KEY`** | This property applies to <br>`OPENVIDU_PRO_RECORDING_STORAGE=s3` and/or <br>`OPENVIDU_PRO_SPEECH_TO_TEXT=aws`. It is the AWS long-lived credentials secret key. Depending on the service you have enabled:<ul><li>`OPENVIDU_PRO_RECORDING_STORAGE=s3`: In this case credentials are optional: if not provided then the internal S3 client will try to use the default AWS credentials of the machine, if available (see the credentials search order in the [Java Doc](https://docs.aws.amazon.com/AWSJavaSDK/latest/javadoc/com/amazonaws/auth/DefaultAWSCredentialsProviderChain.html)).</li><li>`OPENVIDU_PRO_SPEECH_TO_TEXT=aws`: In this case credentials are mandatory.</li></ul> | |
| **`OPENVIDU_PRO_AWS_REGION`** | This property applies to <br>`OPENVIDU_PRO_RECORDING_STORAGE=s3` and/or <br>`OPENVIDU_PRO_SPEECH_TO_TEXT=aws`. It is the AWS region hosting the services. Depending on the service you have enabled:<ul><li>`OPENVIDU_PRO_RECORDING_STORAGE=s3`: AWS region in which the S3 bucket is located (e.g. "*eu-west-1*"). If not provided, the region will try to be discovered automatically, although this is not always possible.</li><li>`OPENVIDU_PRO_SPEECH_TO_TEXT=aws`: AWS region where Amazon Transcribe will operate. In this case the property is always mandatory.</li></ul> | |
| **`OPENVIDU_PRO_PRIVATE_IP`** | Private IP of Master Node. Media Nodes will use this property to communicate with Master Node. **This property is optional and as a general rule should remain empty**, as Media Nodes will automatically discover this IP.<br>It is only suitable for **[On Premises deployments](deployment/pro/on-premises/)** when Media Nodes are not able to autodiscover the IP address for any kind of not contemplated reason. | |
| **`OPENVIDU_PRO_LICENSE_HTTP_PROXY`** | OpenVidu Pro or Enterprise sends periodically information about CPU usage and license checks. All of those requests requires HTTP/HTTPS access to the Internet to . <br><br> As some environments may use HTTP proxies to access the internet for security reasons, this parameter allows OpenVidu Pro and Enterprise to send license information and CPU usage using a configured proxy in your infrastructure.<br><br> An example of this parameter would be: `your.proxy:8080` | |
| **`KMS_URIS`** | Array of Media Node URIs (comma-separated list of strings) that should be automatically added to the cluster on startup. If any value is provided, then it must be valid and reachable, or OpenVidu will fail to start.<br>This property has effect only on **[On Premises deployments](deployment/pro/on-premises/)**. All of Media Node URIs have the same format:<br>`ws://MEDIA_NODE_IP:8888/kurento`<br>For example, a possible value for this property for a single Media Node might look like this:<br>`["ws://203.0.113.2:8888/kurento"]` | **[ ]** |
| **`ELASTICSEARCH_USERNAME`** | When using a secured **[external Elastic stack](openvidu-pro/monitoring-elastic-stack/#configuring-an-external-elastic-stack)**, the name of the Elastic user. | |
| **`ELASTICSEARCH_PASSWORD`** | When using a secured **[external Elastic stack](openvidu-pro/monitoring-elastic-stack/#configuring-an-external-elastic-stack)**, the password of the Elastic user. | |

<br>

---

### Configuration parameters for OpenVidu Enterprise

These configuration parameters apply only to OpenVidu Enterprise.

| Parameter       | Description                               | Default value                                      |
| --------------- | ----------------------------------------- | -------------------------------------------------- |
| **`OPENVIDU_ENTERPRISE_MEDIA_SERVER`** | Which media server to use in your deployment (see [Kurento vs mediasoup](openvidu-enterprise/#kurento-vs-mediasoup)). Possible values are:<br>• `kurento`<br>• `mediasoup`<br> | `mediasoup` |
| **`OPENVIDU_ENTERPRISE_S3_CONFIG_AUTORESTART`** | If true, master nodes restart automatically on S3 changes. | **true** |
| **`OPENVIDU_WEBRTC_SIMULCAST`** | Whether to enable [simulcast](openvidu-enterprise/simulcast/) for all Publishers or not | **false** |

<br>

### Advanced parameters for OpenVidu Pro and Enterprise

<div class="warningBoxContent">
  <div style="display: table-cell; vertical-align: middle;">
      <i class="icon ion-android-alert warningIcon"></i>
  </div>
  <div class="warningBoxText">
    These properties are related to infrastructure and network aspects. OpenVidu is deployed with sane defaults, and these configuration properties will normally not require changes. They are only described here for custom on premises deployments with special network conditions or requirements, and only meant for users with deep knowledge about their deployment environment.
  </div>
</div>

| Parameter | Description | Default value |
| --------- | ----------- | ------------- |
| **`COTURN_IP`** | This is the IP of the default TURN/STUN Coturn server deployed with OpenVidu in the Master Node. <br><ul><li>By default it is the autodiscovered Public IPv4. This IP is used by browsers and Kurento Media Server (mediasoup does not need it) as TURN/STUN service for ICE protocol to autodiscover its own Public IP.</li><li>This parameter is used when `OPENVIDU_PRO_COTURN_IN_MEDIA_NODES=false`. When <br> `OPENVIDU_PRO_COTURN_IN_MEDIA_NODES=true` the public IP used for Coturn is the public IPv4 of the Media Node being in use, ignoring any value of `COTURN_IP`</li><li>Possible values: <ul><li>`auto-ipv4`</li><li>`auto-ipv6`</li><li>Any valid Public Ipv4 or Public IPv6</li></ul></li></ul> | **auto-ipv4** |
| **`COTURN_PORT`** | This is the port used for TURN/STUN Coturn server deployed with OpenVidu in the Master Node. <br><ul><li>By default it is 3478. This port is used by browsers and Kurento Media Server (mediasoup does not need it) as TURN/STUN service port for ICE protocol to autodiscover its own Public IP.</li><li>This parameter is used only if `OPENVIDU_PRO_COTURN_IN_MEDIA_NODES=false`. When <br> `OPENVIDU_PRO_COTURN_IN_MEDIA_NODES=true`, this property is ignored and `OPENVIDU_PRO_COTURN_PORT_MEDIA_NODES` is used instead (by default 443)</li><li>Possible values: Any value between 1-65535 | **3478** |
| **`OPENVIDU_WEBRTC_ICE_SERVERS`** | Array of ICE servers to use instead of default Coturn at the client side (comma-separated list of ICE Servers). When `OPENVIDU_WEBRTC_ICE_SERVERS` is used, Kurento <br> still uses `COTURN_IP` (or the public IP of Media Nodes if `OPENVIDU_PRO_COTURN_IN_MEDIA_NODES=true`) but browsers uses the TURN/STUN servers defined at `OPENVIDU_WEBRTC_ICE_SERVERS`.</li> Examples: <ul><li>`["url=turns:example.turn.com:443,staticAuthSecret=secret"]`</li><li>`["url=turns:example.turn.com:443,username=usertest,credential=userpass"]`</li></ul> [More Details](deployment/allow-users-behind-firewalls/){:target="\_blank"} | **[ ]** |
| **`COTURN_INTERNAL_RELAY`** | If `true`, Coturn will autodiscover its own default network gateway and use the default network gateway IP as a relay IP for ICE candidates. This is useful if you want relayed traffic to go through the internal network instead of the public internet | **false** |
| **`OPENVIDU_PRO_COTURN_IN_MEDIA_NODES`** | **(Experimental)** If `true`, Coturn will be deployed in Media Nodes. As Public IP and Port configuration for Coturn, parameters `OPENVIDU_PRO_MEDIA_NODE_PUBLIC_IP_AUTODISCOVER` and `OPENVIDU_PRO_COTURN_PORT_MEDIA_NODES` configure how the Public IP is autodiscovered and what port is used respectively. | **false** |
| **`OPENVIDU_PRO_MEDIA_NODE_PUBLIC_IP_AUTODISCOVER`** | This parameter defines how the public IP for Coturn is autodiscovered in Media Nodes when `OPENVIDU_PRO_COTURN_IN_MEDIA_NODES=true`. This IP is used by browsers and Kurento Media Server (mediasoup does not need it) as TURN/STUN service for ICE protocol. Possible values: <ul><li>`auto-ipv4`</li><li>`auto-ipv6`</li></ul> | **false** |
| **`OPENVIDU_PRO_COTURN_PORT_MEDIA_NODES`** | This parameter defines what port is used for Coturn in Media Nodes when `OPENVIDU_PRO_COTURN_IN_MEDIA_NODES=true`. This port is used by browsers and Kurento Media Server (mediasoup does not need it) as TURN/STUN service port for ICE protocol. Possible values: Any value between 1-65535 | 443 |
| **`KMS_IMAGE`** | Docker image used in Media Nodes for Kurento in OpenVidu Pro/Enterprise. By default it is the correspondant image of the deployed version ([see](https://docs.openvidu.io/en/stable/releases/)). If you have created your own Kurento image and it is stored in a private Docker registry, you can configure it using property `OPENVIDU_PRO_DOCKER_REGISTRIES` | |
| **`KMS_DOCKER_ENV_*`** | You can add any environment variable to Kurento/mediasoup running in the Media Node. If you want to add an environment variable to this container, you must add a variable using this prefix: `KMS_DOCKER_ENV_`, followed by the environment variable you want to setup. For example, if you want to setup `KMS_MIN_PORT` to `50000`, it would be `KMS_DOCKER_ENV_KMS_MIN_PORT=50000`. | |
| **`AWS_*`** | These parameters are used in [OpenVidu Pro](deployment/pro/aws/) and [OpenVidu Enterprise](deployment/enterprise/aws/#single-master-deployment) for AWS related issues, in AWS deployments of OpenVidu. You should not touch these parameters, as they are automatically initialized on Cloudformation launch. | |
<!--| **`RM_*`** | These parameters are used in [OpenVidu Enterprise](openvidu-enterprise) to configure service `replication-manager`. You should not touch these parameters, as they are automatically initialized on Cloudformation launch. | |-->

---

### Special conditions of OpenVidu development container

When using the official [development OpenVidu docker container](https://hub.docker.com/r/openvidu/openvidu-dev){:target="_blank"} to develop your app in your LAN network, there are some properties that you can't make use of. In the development container **these configuration properties won't have effect, or may have unwanted side effects** if declared. Avoid declaring them:

- `HTTP_PORT`: in LAN networks redirects or Let's Encrypt don't make sense.
- `CERTIFICATE_TYPE`: in LAN networks certificates don't make sense.

Also, take into account that **these configuration properties have different default values** in the development container:

- `DOMAIN_OR_PUBLIC_IP`: default to `localhost` in the dev container. Container won't fail to start if you don't provide a value to it.
- `OPENVIDU_SECRET`:  default to `MY_SECRET` in the dev container. Container won't fail to start if you don't provide a value to it.
- `HTTPS_PORT`: default to `4443` in the dev container.

Below there is an example of a `docker run` command to launch the OpenVidu development container while setting multiple configuration properties:

```console
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
openvidu/openvidu-dev:latest
```

<br>
