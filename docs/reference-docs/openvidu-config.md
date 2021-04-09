<h2 id="section-title">OpenVidu configuration</h2>
<hr>

This page lists all available configuration properties for OpenVidu Server, as well as their possible values and the default ones.<br>
These properties may be set:

- In any official production deployment of OpenVidu CE or OpenVidu Pro: in the **`.env`** config file at OpenVidu installation path, default to `/opt/openvidu`
- In the official [development OpenVidu docker container](https://hub.docker.com/r/openvidu/openvidu-server-kms){:target="_blank"}: passing them as environment variables with flag **`-e PROPERTY=value`**

---

- **[Configuration parameters for OpenVidu CE](#configuration-parameters-for-openvidu-ce)**
- **[Configuration parameters for OpenVidu Pro](#configuration-parameters-for-openvidu-pro)**<a href="openvidu-pro/" target="_blank"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin-left: 5px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span></a>
- **[Special conditions of OpenVidu development container](#special-conditions-of-openvidu-development-container)**

---

### Configuration parameters for OpenVidu CE

These configuration parameters apply to both OpenVidu CE and OpenVidu Pro.

| Parameter                          | Description   										           | Default value   |
| ---------------------------------- | --------------------------------------------------------------- | --------------- |
| **`DOMAIN_OR_PUBLIC_IP`** | Domain name where OpenVidu Server will be available). If you do not have one, the public IP of the machine. Clients will use this to connect to OpenVidu Server. For example:<br>• `openvidu.example.com`<br>• `198.51.100.1` | |
| **`OPENVIDU_SECRET`**                  | Secret used to connect to OpenVidu Server. This value is required when using the [REST API](reference-docs/REST-API/){:target="_blank"} or any server client ([openvidu-java-client](reference-docs/openvidu-java-client){:target="_blank"}, [openvidu-node-client](reference-docs/openvidu-node-client){:target="_blank"}), as well as when connecting to openvidu-server dashboard. Can only contain alphanumeric characters, hyphens and underscores (matching regex `[a-zA-Z0-9_-]+`)    | |
| **`CERTIFICATE_TYPE`** | Which type of certificate you want to use in your OpenVidu deployment. Can be:<br>• `selfsigned`<br>• `owncert`<br>• `letsencrypt` | **selfsigned** |
| **`HTTPS_PORT`** | Secure port where OpenVidu Server will listen. All of OpenVidu services will be available at this port. Any client or SDK will have to connect to OpenVidu through this port | **443** |
| **`HTTP_PORT`** | Insecure port from which OpenVidu will automatically redirect any request to the secure port. For example, if property `HTTP_PORT=80` and property `HTTPS_PORT=443`, a request to `http://DOMAIN_OR_PUBLIC_IP/` will be automatically redirected to `https://DOMAIN_OR_PUBLIC_IP/`.<br>**WARNING:** if you have set `CERTIFICATE_TYPE=letsencrypt` you cannot change the default 80 value, as Let's Encrypt needs this port opened to generate your certificate. This applies at least for the first time you execute OpenVidu, when your certificate is generated. You should be able to change this value once Let's Encrypt has successfully run the first time | **80** |
| **`OPENVIDU_CDR`**                     | Whether to enable Call Detail Record or not (check [Call Detail Record](reference-docs/openvidu-server-cdr){:target="_blank"}) | **false** |
| **`OPENVIDU_CDR_PATH`**                | System path where to write CDR files | **/opt/openvidu/cdr** |
| **`OPENVIDU_RECORDING`**               | Whether to enable recording module or not (check [Recording](advanced-features/recording/){:target="_blank"})  | **false** |
| **`OPENVIDU_RECORDING_PATH`**          | System path where to store the video files of recorded sessions | **/opt/openvidu/recordings** |
| **`OPENVIDU_RECORDING_PUBLIC_ACCESS`** | Whether to allow free http access to recorded sessions or not. If *true* system folder `OPENVIDU_RECORDING_PATH` will be publicly accessible through path `/recordings`. That means any client can connect to<br><strong style="word-break: break-all">https://DOMAIN_OR_PUBLIC_IP/openvidu/recordings/RECORDING_ID/RECORDING_NAME.EXTENSION</strong><br>and access the recorded video file.<br>If *false* this path will be secured with Basic Auth the same way the [REST API](reference-docs/REST-API/){:target="_blank"} is secured (OPENVIDUAPP:`OPENVIDU_SECRET`)<br>For example, for OpenVidu Server configured with *DOMAIN_OR_PUBLIC_IP=my.com*<br>*OPENVIDU_RECORDING=true*<br>*OPENVIDU_RECORDING_PATH=/my/path*<br> *OPENVIDU_RECORDING_PUBLIC_ACCESS=true*<br>A session with id *foo* that has been recorded may generate a video file locally stored in the host machine under `/my/path/foo/foo.mp4` and accessible by any client connecting to `https://my.com/openvidu/recordings/foo/foo.mp4` | **false** |
| **`OPENVIDU_RECORDING_NOTIFICATION`**  | Which users should receive the recording events in the client side (`recordingStarted`, `recordingStopped`). Can be `all` (every user connected to the session), `publisher_moderator` (users with role 'PUBLISHER' or 'MODERATOR'), `moderator` (only users with role 'MODERATOR') or `none` (no user will receive these events) | **publisher_moderator** |
| **`OPENVIDU_RECORDING_CUSTOM_LAYOUT`** | System path where OpenVidu Server should look for custom recording layouts  | **/opt/openvidu/custom-layout** |
| **`OPENVIDU_RECORDING_AUTOSTOP_TIMEOUT`** | Timeout in seconds for recordings to automatically stop (and the session involved to be closed) when conditions are met. See [Automatic stop of recordings](advanced-features/recording/#automatic-stop-of-recordings) to learn more | **120** |
| **`OPENVIDU_RECORDING_COMPOSED_URL`** | Overrides the default URL that the recording module will use to connect to the session being recorded. This only affects COMPOSED recordings with video. By default the URL is built with properties `DOMAIN_OR_PUBLIC_IP` and `HTTPS_PORT`, so in certain cases where the host does not allow hairpinning (connecting to its own services using its own public domain) this can be a solution. For example, for OpenVidu CE using `https://PRIVATE_IP/dashboard` or for OpenVidu PRO using `https://PRIVATE_IP/inspector` (being *PRIVATE_IP* the internal IP of the OpenVidu Server Pro Node) may allow COMPOSED recording to work fine with default or custom layouts hosted in the same machine without accessing the Internet |  |
| **`OPENVIDU_RECORDING_DEBUG`**        | Enable debug mode for recording. Affects COMPOSED and COMPOSED_QUICK_START recording output modes. Generates log files with the recording process details inside this particular recording folder (a folder with the recording identifier inside `OPENVIDU_RECORDING_PATH`) | **false** |
| **`OPENVIDU_WEBHOOK`** | Whether to enable webhook service or not (check [OpenVidu Webhook](reference-docs/openvidu-server-webhook/){:target="_blank"}) | **false** |
| **`OPENVIDU_WEBHOOK_ENDPOINT`** | HTTP endpoint where OpenVidu Server will send the POST messages with webhook events |  |
| **`OPENVIDU_WEBHOOK_HEADERS`** | Array of strings with the HTTP headers that OpenVidu Server will append to each POST message of webhook events. For example, you may configure a Basic Auth header _name:pass_ setting this property to `[\"Authorization:\ Basic\ bmFtZTpwYXNz\"]` | **[ ]** |
| **`OPENVIDU_WEBHOOK_EVENTS`** | Array of strings with the type of events you want OpenVidu Server to send to your webhook | <div style="word-break: break-word; font-weight: bold; margin-bottom:5px">["sessionCreated","sessionDestroyed","participantJoined","participantLeft","webrtcConnectionCreated","webrtcConnectionDestroyed","recordingStatusChanged","filterEventDispatched","mediaNodeStatusChanged","autoscaling"]</div>_(All available events)_ |
| **`OPENVIDU_STREAMS_VIDEO_MAX_RECV_BANDWIDTH`** | Maximum video bandwidth sent from clients to OpenVidu Server, in kbps. 0 means unconstrained | **1000** |
| **`OPENVIDU_STREAMS_VIDEO_MIN_RECV_BANDWIDTH`** | Minimum video bandwidth sent from clients to OpenVidu Server, in kbps. 0 means unconstrained | **300** |
| **`OPENVIDU_STREAMS_VIDEO_MAX_SEND_BANDWIDTH`** | Maximum video bandwidth sent from OpenVidu Server to clients, in kbps. 0 means unconstrained | **1000** |
| **`OPENVIDU_STREAMS_VIDEO_MIN_SEND_BANDWIDTH`** | Minimum video bandwidth sent from OpenVidu Server to clients, in kbps. 0 means unconstrained | **300** |
| **`OPENVIDU_STREAMS_FORCED_VIDEO_CODEC`** | This parameter will ensure that all the browsers use the same codec, avoiding transcoding process in the media server, which result in a reduce of CPU usage. Possible values are:<br>• `VP8` (Recommended and default value because its compatibility with browsers)<br>• `H264`<br>• `NONE` (No codec will be forced)<br>| **VP8** |
| **`OPENVIDU_STREAMS_ALLOW_TRANSCODING`** | Defines if transcoding is allowed or not when `OPENVIDU_STREAMS_FORCED_VIDEO_CODEC` is not a compatible codec with the browser. If this parameter is `false`, not compatible browsers with the codec specified in `OPENVIDU_STREAMS_FORCED_VIDEO_CODEC` will fail. | **false** |
| **`OPENVIDU_SESSIONS_GARBAGE_INTERVAL`** | How often the garbage collector of non active sessions runs. This helps cleaning up Sessions that have been initialized through REST API, and maybe have had Connections created, but have had no final users connected (no Connection of the Session entered `active` status). Default to 900s (15 mins). 0 to disable the non active sessions garbage collector | **900** |
| **`OPENVIDU_SESSIONS_GARBAGE_THRESHOLD`** | Minimum time in seconds that a non active session must have been in existence for the garbage collector of non active sessions to remove it. Default to 3600s (1 hour). If non active sessions garbage collector is disabled (property `OPENVIDU_SESSIONS_GARBAGE_INTERVAL` is set to 0) this property is ignored | **3600** |

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
    padding: 10px 0 5px 0;
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
These configuration parameters are part of <a href="openvidu-pro/" target="_blank"><strong>OpenVidu</strong><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin-left: 5px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span></a> tier.
</div>
</div>

| Parameter       | Description                               | Default value                                      |
| --------------- | ----------------------------------------- | -------------------------------------------------- |
| **`OPENVIDU_PRO_LICENSE`** | License key of your OpenVidu Pro account. This parameter is mandatory to launch OpenVidu Pro clusters.<br>**[Sign up now to get your 15 day free trial!](https://openvidu.io/account)** |  |
| **`OPENVIDU_PRO_CLUSTER_ID`**                | Unique identifier of your cluster. Each OpenVidu Server Pro instance corresponds to one cluster. You can launch as many clusters as you want with your license key. Cluster ID will always be stored to disk so restarting OpenVidu Server Pro will keep the same previous cluster ID if this configuration parameter is not given a distinct value | _A random string_ |
| **`OPENVIDU_PRO_CLUSTER_MEDIA_NODES`**       | The desired number of Media Nodes on startup. If there are too many existing Media Nodes on startup, they will be automatically dropped until this number is reached. If there are not enough, more will be automatically launched. This property has effect only on **[AWS deployments](openvidu-pro/deployment/aws/){:target="_blank"}** and if `OPENVIDU_PRO_CLUSTER_AUTOSCALING=false` | **1** |
| **`OPENVIDU_PRO_CLUSTER_AUTOSCALING`**     | Whether to enable or disable autoscaling. With autoscaling the number of Media Nodes will be automatically adjusted according to existing load. This property being true will make property `OPENVIDU_PRO_CLUSTER_MEDIA_NODES` useless (instead will be using the value given to property `OPENVIDU_PRO_CLUSTER_AUTOSCALING_MIN_NODES`) | **false** |
| **`OPENVIDU_PRO_CLUSTER_AUTOSCALING_MAX_NODES`** | If `OPENVIDU_PRO_CLUSTER_AUTOSCALING=true`, the upper limit of Media Nodes that can be reached. Even when the average load exceeds the threshold, no more Media Nodes will be added to cluster | **2** |
| **`OPENVIDU_PRO_CLUSTER_AUTOSCALING_MIN_NODES`** | If `OPENVIDU_PRO_CLUSTER_AUTOSCALING=true`, the lower limit of Media Nodes that can be reached. Even when the average load is inferior to the threshold, no more Media Nodes will be removed from the cluster. This property acts as `OPENVIDU_PRO_CLUSTER_MEDIA_NODES` when autoscaling is enabled | **1** |
| **`OPENVIDU_PRO_CLUSTER_AUTOSCALING_MAX_LOAD`**  | If `OPENVIDU_PRO_CLUSTER_AUTOSCALING=true`, the upper average load threshold that will trigger the addition of a new Media Node. Percentage value (0 min, 100 max) | **70** |
| **`OPENVIDU_PRO_CLUSTER_AUTOSCALING_MIN_LOAD`**  | If `OPENVIDU_PRO_CLUSTER_AUTOSCALING=true`, the lower average load threshold that will trigger the removal of an existing Media Node. Percentage value (0 min, 100 max) | **20** |
| **`OPENVIDU_PRO_CLUSTER_PATH`**              | Path where OpenVidu Server Pro will manage cluster-related files. This includes: looking for custom infrastructure management scripts and storing temporal output files with instances information | **/opt/openvidu/cluster** |
| **`OPENVIDU_PRO_CLUSTER_TEST`**              | If true, OpenVidu Server Pro will perform a quick test on startup to check the clustering features:  it will launch a Media Node, connect to it and finally drop it. OpenVidu Server Pro logs will inform about the test execution in detail. Immediately after finishing the test, OpenVidu Server Pro process **will terminate** with an exit code of 0 if the test was successful and 1 if it failed. This property is extremely useful to test that your OpenVidu Pro deployment is working fine | **false** |
| **`OPENVIDU_PRO_ELASTICSEARCH_HOST`**        | URL where the Elasticsearch service of OpenVidu Pro stack is listening. OpenVidu Pro will send to that URL useful statistics of your sessions. If this parameter is explicitly set to an empty string, OpenVidu Pro will not send any data to Elasticsearch. If it is defined, then it is mandatory that OpenVidu Pro is able to establish a connection to it or start up process will fail. By default OpenVidu Pro deployments have an Elasticsearch installation in localhost | **http://localhost:9200** |
| **`OPENVIDU_PRO_ELASTICSEARCH_MAX_DAYS_DELETE`** | Maximum number of days that Elasticsearch indexes in rollover state will be kept on disk | **7** |
| **`OPENVIDU_PRO_KIBANA_HOST`**        | URL where the Kibana service of OpenVidu Pro stack is listening. You can visualize Elasticsearch data in Kibana with the default dashboards provided by OpenVidu Pro, or you can create your own dashboards to better fit your necessities. If this parameter is explicitly set to an empty string, OpenVidu Pro will not connect to Kibana. If it is defined, then it is mandatory that OpenVidu Pro is able to establish a connection to it or start up process will fail. By default OpenVidu Pro deployments have a Kibana installation in localhost | **http://localhost:5601** |
| **`OPENVIDU_PRO_STATS_SESSION_INTERVAL`** | Interval in seconds for OpenVidu session stats gathering from Media Nodes. This includes number of sessions in each Media Node, number of WebRTC connections, of recordings... Set it to `0` for no gathering at all | **5** |
| **`OPENVIDU_PRO_STATS_SERVER_INTERVAL`** | Interval in seconds for server-related metrics gathering: HTTP requests, statuses, log level information... Set it to `0` for no gathering at all | **10** |
| **`OPENVIDU_PRO_STATS_MONITORING_INTERVAL`** | Interval in seconds for CPU, memory and net usage stats gathering in OpenVidu Server Pro Node. Set it to `0` for no gathering at all | **10** |
| **`OPENVIDU_PRO_STATS_WEBRTC_INTERVAL`**     | Interval in seconds for WebRTC stats gathering from Media Nodes WebRTC endpoints. Set it to `0` for no gathering at all | **30** |
| **`OPENVIDU_PRO_NETWORK_QUALITY`**     | Whether to enable or disable **[network quality API](advanced-features/network-quality/){:target="blank"}**. You can monitor and warn users about the quality of their networks with this feature | **false** |
| **`OPENVIDU_PRO_NETWORK_QUALITY_INTERVAL`**     | If `OPENVIDU_PRO_NETWORK_QUALITY=true`, how often the network quality algorithm will be invoked for each user, in seconds | **5** |
| **`OPENVIDU_BROWSER_LOGS`** | If `OPENVIDU_BROWSER_LOGS=debug` all logs of browsers using [openvidu-browser](reference-docs/openvidu-browser/) will be sent into Elasticsearch. | **disabled** |
| **`OPENVIDU_PRO_RECORDING_STORAGE`** | Where to store recordings. Can be `local` for local storage or `s3` for an AWS S3 bucket. See **[Uploading recordings to AWS S3](advanced-features/recording/#uploading-recordings-to-aws-s3){:target="blank"}** | **local** |
| **`OPENVIDU_PRO_AWS_S3_BUCKET`** | If `OPENVIDU_PRO_RECORDING_STORAGE=s3`, AWS S3 bucket where to store recordings. May include paths to allow navigating folder structures inside the bucket | |
| **`OPENVIDU_PRO_AWS_S3_HEADERS`** | If `OPENVIDU_PRO_RECORDING_STORAGE=s3`, the collection of HTTP header values that the internal AWS client will use during the upload process. The property is a key-value map of strings, following the format of a JSON object. For example, for applying server-side encryption with AES-256, this header is mandatory: `{"x-amz-server-side-encryption":"AES256"}`. The list of available headers can be found **[here](https://docs.aws.amazon.com/AWSJavaSDK/latest/javadoc/com/amazonaws/services/s3/Headers.html){:target="blank"}** | **{ }** |
| **`OPENVIDU_PRO_AWS_ACCESS_KEY`** | If `OPENVIDU_PRO_RECORDING_STORAGE=s3`, AWS long-lived credentials access key. Must have read and write permissions over the bucket defined in property `OPENVIDU_PRO_AWS_S3_BUCKET`. If not provided, then the internal S3 client will try to use the default AWS credentials of the machine, if available (see the credentials search order in the [Java Doc](https://docs.aws.amazon.com/AWSJavaSDK/latest/javadoc/com/amazonaws/auth/DefaultAWSCredentialsProviderChain.html)) | |
| **`OPENVIDU_PRO_AWS_SECRET_KEY`** | If `OPENVIDU_PRO_RECORDING_STORAGE=s3`, AWS long-lived credentials secret key. If not provided, then the internal S3 client will try to use the default AWS credentials of the machine, if available (see the credentials search order in the [Java Doc](https://docs.aws.amazon.com/AWSJavaSDK/latest/javadoc/com/amazonaws/auth/DefaultAWSCredentialsProviderChain.html) | |
| **`OPENVIDU_PRO_AWS_REGION`** | If `OPENVIDU_PRO_RECORDING_STORAGE=s3`, AWS region in which the S3 bucket is located (e.g. "eu-west-1"). If not provided, the region will try to be discovered automatically, although this is not always possible | |
| **`OPENVIDU_PRO_PRIVATE_IP`** | Private IP of OpenVidu Server Pro Node. Media Nodes will use this property to communicate with OpenVidu Server Pro Node. **This property is optional and as a general rule should remain empty**, as Media Nodes will automatically discover this IP. It is only suitable for **[On Premises deployments](openvidu-pro/deployment/on-premises/){:target="_blank"}** when Media Nodes are not able to autodiscover the IP address for any kind of not contemplated reason |  |
| **`KMS_URIS`** | Array of Media Node URIs (comma separated list of strings) that should be automatically added to the cluster on startup. If any value is provided, then it must be valid and accessible, or OpenVidu will fail to start. This property has effect only on **[On Premises deployments](openvidu-pro/deployment/on-premises/){:target="blank"}**. All of Media Node URIs have the same format: `ws://MEDIA_NODE_IP:8888/kurento`. A possible value for this property for a single Media Node could be `["ws://56.11.23.45:8888/kurento"]` | **[ ]** |
| **`ELASTICSEARCH_USERNAME`** | When using a secured **[external Elastic stack](openvidu-pro/monitoring-elastic-stack/#configuring-an-external-elastic-stack){:target="_blank"}**, the name of the Elastic user | |
| **`ELASTICSEARCH_PASSWORD`** | When using a secured **[external Elastic stack](openvidu-pro/monitoring-elastic-stack/#configuring-an-external-elastic-stack){:target="_blank"}** is configured, the password of the Elastic user | |

<br>

---

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