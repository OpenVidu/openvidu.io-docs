<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.bundle.min.js"></script>

<h2 id="section-title">Scalability</h2>
<hr>

- **[OpenVidu Pro architecture](#openvidu-pro-architecture)**
    - [How OpenVidu Pro sessions are distributed](#how-openvidu-pro-sessions-are-distributed)
- **[Pricing of an OpenVidu Pro cluster](#pricing-of-an-openvidu-pro-cluster)**
- **[How to deploy your OpenVidu Pro cluster](#how-to-deploy-your-openvidu-pro-cluster)**
- **[Set the number of Media Nodes on startup](#set-the-number-of-media-nodes-on-startup)**
- **[Change the number of Media Nodes on the fly](#change-the-number-of-media-nodes-on-the-fly)**
- **[OpenVidu Pro cluster events](#openvidu-pro-cluster-events)**
- **[How many users can an OpenVidu Pro cluster handle](#how-many-users-can-an-openvidu-pro-cluster-handle)**
- **[Autoscaling](#autoscaling)**
- **[Current limitations of OpenVidu Pro scalability](#current-limitations-of-openvidu-pro-scalability)**

---

## OpenVidu Pro architecture

OpenVidu Pro consists of different nodes that work together to offer OpenVidu services in a distributed and scalable way. Currently, OpenVidu Pro has two types of nodes, following a **Master-Slave** model:

- **OpenVidu Server Pro Node**: this is the master node. It takes care of the **signaling plane**. Manages OpenVidu sessions, forwarding events and messages to clients and distributing the load across the available Media Nodes.<br><br>
- **Media Nodes**: these are the slave nodes, in charge of managing the **media plane**. For that reason, Media Nodes are the actual bottleneck of the OpenVidu cluster and the ones that determine its capacity: more Media Nodes means more concurrent OpenVidu sessions. Two important aspects of Media Nodes:<div style="margin-bottom: 8px"></div>
    - Each OpenVidu session is currently hosted in one Media Node.
    - Each Media Node can manage multiple OpenVidu sessions.

<div class="row">
    <div class="pro-gallery" style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-pro1" href="img/docs/openvidu-pro/openvidu-cluster.png"><img class="img-responsive" style="margin: auto; max-height: 480px" src="img/docs/openvidu-pro/openvidu-cluster.png"/></a>
    </div>
</div>

### How OpenVidu Pro sessions are distributed

There are two different ways to distribute OpenVidu sessions among the different Media Nodes of your cluster.

#### Automatic distribution

This is the default method to allocate sessions in your OpenVidu Pro cluster. OpenVidu periodically gathers the CPU load of all Media Nodes, and each new session will be initialized in the less loaded Media Node. The session is allocated in the less loaded Media Node at the exact moment when its first user connects to it.

When is this method recommended?

- **When your sessions are relatively small in number of participants**. That is: when each session does not take a significant amount of the CPU capacity of the Media Node.
- **When your sessions are not expected to grow in size over time**. If your sessions start small but keep adding participants, at some point they can overload their automatically assigned Media Node.
- **When you expect a fairly even spread of sessions over time**. That is: if your system does not proactively initialize many sessions at once. This may cause the initialization of all of them in the same Media Node (the less loaded at that time), not taking into account the future load it will have to deal with when all the sessions begin to stream media.

If these conditions are sufficiently met, then the automatic distribution process will ensure that sessions are distributed evenly across all available Media Nodes, without having to worry about manual session allocation.

#### Manual distribution

You can force the Media Node where a session must be allocated.

<div class="lang-tabs-container" markdown="1">

<div class="lang-tabs-header">
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; font-weight: bold">REST API</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Java</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Node</button>
</div>

<div id="rest-api" class="lang-tabs-content" markdown="1">

When initializing a Session by calling method **[POST /openvidu/api/sessions](reference-docs/REST-API/#post-openviduapisessions){:target="_blank"}**, provide a Media Node selector through body parameter `mediaNode`.

```json
{
    "mediaNode": {
        "id": "kms_FVrQslIr"
    }
}
```

The `id` value must be the `id` property of a [Media Node object](reference-docs/REST-API/#the-media-node-object){:target="_blank"}.

</div>

<div id="java" class="lang-tabs-content" style="display:none" markdown="1">

```java
OpenVidu openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
SessionProperties sessionProperties = new SessionProperties.Builder()
    .mediaNode("kms_FVrQslIr") // This string being the identifier of an available Media Node
    .build();
Session session = openvidu.createSession(sessionProperties);
```

See [JavaDoc](api/openvidu-java-client/io/openvidu/java/client/OpenVidu.html#createSession-io.openvidu.java.client.SessionProperties-){:target="_blank"}

</div>

<div id="node" class="lang-tabs-content" style="display:none" markdown="1">

```javascript
var openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
var sessionProperties = {
    mediaNode: "kms_FVrQslIr" // This string being the identifier of an available Media Node
};
openVidu.createSession(sessionProperties)
    .then(session => { ... })
    .catch(error => console.error(error));
```

See [TypeDoc](api/openvidu-node-client/classes/openvidu.html#createsession){:target="_blank"}

</div>

</div>

<br>

When is this method recommended?

- **When your sessions are very big in number of participants** and may require a significant share of its Media Node capacity. In other words: if you expect a particular session to need 50% of the Media Node CPU power, then manually controlling which other sessions will also be initialized in that Media Node becomes essential to avoid overloading it.
- **When your sessions keep growing over time**. If more and more participants keep being added to your sessions, then having full control over where new sessions are started is important.
- **When you expect lots of sessions to be initialized in a very short amount of time**. OpenVidu doesn't know how much CPU capacity will consume each session, and by default will initialize them in the less loaded Media Node. This can cause lots of sessions to be allocated in the same Media Node (the less loaded one at that time), and when they begin streaming media and adding participants the load in that specific node can increase to a dangerous point, even with idle Media Nodes available in the cluster. Manual session allocation is the only solution in this case.

<br>

---

## Pricing of an OpenVidu Pro cluster

The price of an OpenVidu Pro cluster is rather simple:

<p style="font-size: 18px; color: #7a7a7a; margin: 25px 0; text-align: center">
You pay <strong>0.0006$</strong> per core per minute in your OpenVidu Pro cluster
</p>

There are 3 important aspects to consider:

1. You only pay for your OpenVidu Pro cluster for the time it is running. Usage will be registered the moment you start your cluster and will stop as soon as you shut your cluster down.
2. You pay for every available core at any given time: if you cluster grows for one hour, that hour you will pay more. If your cluster decreases the next hour, next hour will be cheaper. Currently all Nodes have the same core per minute price.
3. Your cluster (specifically your OpenVidu Server Pro Node) needs Internet access at all times. If your specific use case doesn't allow your cluster to have Internet access, please contact us through [Commercial page](https://openvidu.io/support#commercial){:target="_blank"}.

> In **[Pricing](https://openvidu.io/pricing){:target="_blank"}** section you will find a detailed with different use cases of OpenVidu Pro clusters and their associated cost depending on their size and running time

<br>

---

## How to deploy your OpenVidu Pro cluster

Different environments are supported when deploying an OpenVidu Pro cluster. At the current moment you can:

- [Deploy your OpenVidu Pro cluster in AWS](openvidu-pro/deployment/aws){:target="_blank"}
- [Deploy your OpenVidu Pro cluster on premises in your own infrastructure](openvidu-pro/deployment/on-premises){:target="_blank"}

> We are currently working to natively support other cloud providers such as **Azure**, **Google Cloud** and **Digital Ocean** the same way we support Amazon. But remember you are still able to deploy OpenVidu Pro wherever you want following the guide of [deployment on premises](openvidu-pro/deployment/on-premises){:target="_blank"}

> **Kubernetes** support will also be available soon. Stay tuned!

<br>

---

## Set the number of Media Nodes on startup

When deploying your OpenVidu Pro cluster, you can set the initial desired number of Media Nodes. Each type of deployment has a way of setting this number. Visit your specific OpenVidu Pro cluster deployment instructions to learn more:

- **[AWS](openvidu-pro/deployment/aws#scalability){:target="_blank"}**
- **[On premises](openvidu-pro/deployment/on-premises#scalability){:target="_blank"}**

<br>

---

## Change the number of Media Nodes on the fly

You can launch and drop Media Nodes dynamically in two different ways:

### From OpenVidu Inspector

In Cluster page you can launch and drop Media Nodes just by pressing buttons.

<div class="row">
    <div style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro2" href="img/docs/openvidu-pro/pro18.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/pro18.png"/></a>
    </div>
</div>

### With OpenVidu Pro REST API

You can programmatically launch and drop Media Nodes from your application by consuming OpenVidu Pro REST API.

- **Launch a Media Node**: **[POST /openvidu/api/media-nodes](reference-docs/REST-API/#post-openviduapimedia-nodes){:target="_blank"}**
- **Drop a Media Node**: **[DELETE /openvidu/api/media-nodes](reference-docs/REST-API/#delete-openviduapimedia-nodesltmedia_node_idgt){:target="_blank"}**

> **WARNING**: depending on the environment where your OpenVidu Pro cluster is deployed, you must take into account some important aspects regarding the launch and drop of Media Nodes. Visit the specific documentation page for your environment:
>
> - [AWS](openvidu-pro/deployment/aws/#with-openvidu-pro-rest-api){:target="_blank"}
> - [On premises](openvidu-pro/deployment/on-premises/#with-openvidu-pro-rest-api){:target="_blank"}

<br>

---

## OpenVidu Pro cluster events

OpenVidu Pro provides an specific server-side event that will inform you every time there is a change in the status of the cluster. You can listen to this event by using [OpenVidu Webhook](reference-docs/openvidu-server-webhook){:target="_blank"} (it will also be registered in [OpenVidu CDR](reference-docs/openvidu-server-cdr){:target="_blank"}).

This event is **[mediaNodeStatusChanged](reference-docs/openvidu-server-cdr/#medianodestatuschanged){:target="_blank"}**. By listening to it you will have a complete record of your OpenVidu Pro cluster behavior in real time. And of course you can always use [OpenVidu Pro Media Node REST API](reference-docs/REST-API/#the-media-node-object){:target="_blank"} to retrieve or modify the status of a Media Node at any time.

#### Media Node statuses

Here are all the possible statuses of a Media Node within an OpenVidu Pro cluster.

<div class="row">
    <div class="pro-gallery" style="margin-bottom: 25px">
        <a data-fancybox="gallery-pro3" href="img/docs/openvidu-pro/instance-status.png"><img class="img-responsive" style="margin: auto; max-height: 600px" src="img/docs/openvidu-pro/instance-status.png"/></a>
    </div>
</div>

- `launching`: the Media Node is launching. This is the entry status and can also be reached from _canceled_ status.
- `canceled`: the Media Node will immediately enter terminating status after the launching process succeeds. This status can be reached from _launching_ status.
- `failed`: the Media Node failed to launch. This status can be reached from _launching_ status.
- `running`: the Media Node is up and running. New sessions can now be established in this Media Node. This status can be reached from _launching_ and _waiting-idle-to-terminate_ statuses.
- `waiting-idle-to-terminate`: the Media Node is waiting until the last of its sessions is closed. Once this happens, it will automatically enter _terminating_ status. The Media Node won't accept new sessions during this status. This status can be reached from _running_ status.
- `terminating`: the Media Node is shutting down. This status can be reached from _running_ and _waiting-idle-to-terminate_ statuses.
- `terminated`: the Media Node is shut down. This status can be reached from _terminating_ status. For [On Premises](openvidu-pro/deployment/on-premises/){:target="_blank"} OpenVidu Pro clusters, this status means that you can safely shut down the Media Node instance.

<br>

---

## How many users can an OpenVidu Pro cluster handle

This is probably one of the most important questions when using OpenVidu Pro. The number of Media Nodes you need and the size of each Media Node depends on the answer. Therefore, the price of your OpenVidu Pro cluster also depends on the answer.

That being said, there is no single answer to this question. The load each Media Node can handle depends on many factors:

- The topology of each OpenVidu Session (1:1, 1:N, N:M)
- The type of media streams being published to the Session (only audio, only video, audio + video)
- Whether your Sessions are using advanced features such as [recording](advanced-features/recording){:target="_blank"} or [audio/video filters](advanced-features/filters){:target="_blank"}

You will need to perform some tests for your specific use case, and adapt the size of your cluster accordingly. OpenVidu team can perform these tests for you as part of their commercial services (contact us through [Commercial page](https://openvidu.io/support#commercial){:target="_blank"} to ask for an estimate).

For a quick reference, these are the results of some load tests performed in an OpenVidu Pro cluster deployed on Amazon Web Services with just 1 Media Node. These particular scenario is testing 7-to-7 sessions where every participant sends one audio-video stream (540x360, 30 fps) and receives 6 remote streams (same video). The table states the maximum number of entities that can be established until the Media Node CPU reaches 100% use. Take into account from a pricing point that the number of cores in each column header does not sum up the total number of cores of the cluster (OpenVidu Server Pro Node cores should also be counted).

<div class="row" style="margin-bottom: 10px; text-align: center; text-align: -webkit-center">
  <img class="img-responsive" src="img/docs/troubleshooting/load_test_results2.png">
</div>

[Here](https://medium.com/@openvidu/openvidu-load-testing-a-systematic-study-of-openvidu-platform-performance-b1aa3c475ba9){:target="_blank"} you can find the full article presenting these results.

<br>

---

## Autoscaling

<div style="
    display: table;
    border: 2px solid #0088aa9e;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 25px;
    padding: 5px 0 5px 0;
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
	OpenVidu Pro Autoscaling feature is considered to be in preview phase. What this means is that there could potentially be some bugs affecting its behavior. We recommend some caution in its activation.
</div>
</div>

OpenVidu Pro autoscaling feature allows you to forget about monitoring the status and load of your cluster, letting the cluster itself decide when to automatically increase or decrease the number of Media Nodes. This provides a number of important advantages:

- **Real CPU load** in your existing Media Nodes will determine the optimal size of the cluster at every moment. That very definite and conclusive measure is the one taken into account to decide if your cluster should grow or shrink.
- The **cost** of your OpenVidu Pro cluster will always be dynamically adjusted to what is necessary to support the existing load. If the cluster needs to double its capacity only during 10 minutes, OpenVidu Pro will take care itself of doubling the number of Media Nodes during that time and dropping them after user load has come back to normal. So you will be charged as little as possible while being guaranteed enough space for all your sessions.
- You can **customize the limits of your cluster** so that OpenVidu Pro doesn't launch infinite Media Nodes and always keeps a minimum by default. And you can also set the load threshold to let OpenVidu Pro know when the cluster is loaded or idle enough to launch or drop Media Nodes. To sum up, you have total control over autoscaling behavior.

### Enable autoscaling

Configure the following property in the **`.env`** file at OpenVidu Server Pro Node installation path (default to `/opt/openvidu`)

```console
OPENVIDU_PRO_CLUSTER_AUTOSCALING=true
```

The following properties allows you to configure the autoscaling behavior: the upper and lower limits on the number of Media Nodes and the average load threshold. You have a complete description of them at [OpenVidu Pro configuration](reference-docs/openvidu-config/){:target="_blank"} section.

```console
OPENVIDU_PRO_CLUSTER_AUTOSCALING_MAX_NODES=8
OPENVIDU_PRO_CLUSTER_AUTOSCALING_MIN_NODES=2
OPENVIDU_PRO_CLUSTER_AUTOSCALING_MAX_LOAD=70
OPENVIDU_PRO_CLUSTER_AUTOSCALING_MIN_LOAD=30
```

### Scope of autoscaling depending on the environment

 The scope of autoscaling is different depending on the environment OpenVidu Pro is deployed:
 
 - For **any deployment environment different to On Premises**, OpenVidu Pro will automatically manage the complete lifecycle of all Media Nodes, being able to launch and drop instances on its own. In this case the user doesn't need to do anything regarding instance management.<br><br>
 - For **[On Premises](openvidu-pro/deployment/on-premises/){:target="_blank"}** deployments, OpenVidu Pro won't be able to launch and drop instances from the cluster on its own. It will only be able to transition Media Node statuses from one status to another. That includes disconnecting Media Nodes from the cluster when required (so that you are no longer charged for them), but you will still be responsible of launching and adding to the cluster new Media Nodes when indicated and terminating the instances of disconnected Media Nodes (if that's what you want). In order to accomplish this you must listen to:
    - Event [autoscaling](reference-docs/openvidu-server-cdr/#autoscaling){:target="_blank"}: to know when to launch and/or add to the cluster new Media Nodes (property `mediaNodes.launch.newNodes`). You must launch the Media Node on your own and then you can add it to the cluster programmatically with [OpenVidu Pro REST API](openvidu-pro/deployment/on-premises/#with-openvidu-pro-rest-api){:target="_blank"}.
    - Event [mediaNodeStatusChanged](reference-docs/openvidu-server-cdr/#medianodestatuschanged){:target="_blank"}: to know when to terminate the instance of a Media Node, if that's what you want. Wait for `terminated` status to know when you can safely terminate the Media Node instance without losing any data.

### How does the autoscaling algorithm behave?

Let's take a look at how OpenVidu Pro autoscaling works. First of all, everything starts with the value given to the autoscaling [configuration properties](reference-docs/openvidu-config/){:target="_blank"}. You can set the maximum and minimum number of Media Nodes that the cluster should always respect, regardless of what the cluster load is. And you can also set the threshold indicating the "low load" and "high load" values, so when exceeded the autoscaling algorithm will make changes to the cluster size.

OpenVidu Pro will be constantly monitoring the load of each Media Node of the cluster. When their average load is higher or lower than the indicated limits, the autoscaling algorithm will launch new Media Nodes or drop existing Media Nodes respectively. The power of the autoscaling feature lies in the ability of the algorithm to determine the most optimal Media Node(s) to modify at any given time in order to reach the new desired number of Media Nodes in the least possible amount of time. All of this is determined by the [Media Node statuses](#media-node-statuses).

<div class="row">
    <div class="pro-gallery" style="margin-bottom: 25px">
        <a data-fancybox="gallery-pro3" href="img/docs/openvidu-pro/instance-status.png"><img class="img-responsive" style="margin: auto; max-height: 600px" src="img/docs/openvidu-pro/instance-status.png"/></a>
    </div>
</div>

- When adding Media Nodes to the cluster:
    - Those with `waiting-idle-to-terminate` status will have priority transitioning to `running` status. This is because this transition is instantaneous: the Media Node will be available again to host new sessions immediately.
    - If there are not enough new Media Nodes yet, then those with `canceled` status will transition to `launching` status. This is because Media Nodes that are already in the process of launching will require less time to be ready than new Media Nodes. Besides, oldest launching Media Nodes will have higher priority, as they will require less time to be finally available.
    - If there are not enough new Media Nodes yet, only then completely new Media Nodes will be launched and added to the cluster.<br><br>

- When removing Media Nodes from the cluster:
    - Those with `launching` status will have priority transitioning to `canceled` status. This is because Media Nodes in the process of launching won't ever have any session inside of them, and their shutdown will be immediately effective after the launching process completes.
    - If there are still too many Media Nodes, only then Media Nodes with `running` status will be terminated. Media Nodes with the lowest load will be terminated first, as they will usually take less time to be empty of sessions. If the Media Node is not hosting any session at all, then it will immediately transition to `terminating` status. If it is hosting sessions, then it will transition to `waiting-idle-to-terminate` status.

### Examples of OpenVidu Pro autoscalable clusters

The best way to understand how OpenVidu Pro autoscaling works is by analyzing some real-world scenarios, and seeing how the cluster behaves.
<br>

#### Scenario 1: big sessions cause a simple growth and decline of the load

Let's suppose we configure our cluster with the following values:

```console
OPENVIDU_PRO_CLUSTER_AUTOSCALING_MAX_NODES=8
OPENVIDU_PRO_CLUSTER_AUTOSCALING_MIN_NODES=1
OPENVIDU_PRO_CLUSTER_AUTOSCALING_MAX_LOAD=70
OPENVIDU_PRO_CLUSTER_AUTOSCALING_MIN_LOAD=30
```

Now let's take a 1-hour time window in which 2 identical big OpenVidu sessions will be created. Each session represents a 10-to-10 video-audio conference, each one of them totalling 100 streams and increasing around 36% the CPU load of a 2 CPU - 4GB RAM server. This situation is represented in the graph below:

<br>

<div> <script id="chart-js1">var labelsList1 = ["00:00", "05:00", "10:00", "15:00", "20:00", "25:00", "30:00", "35:00", "40:00", "45:00", "50:00", "55:00", "60:00"]; var totalCpuDataList1 = [0.0, 0.0, 36.59, 36.59, 36.59, 73.18, 73.18, 73.18, 73.18, 36.59, 36.59, 36.59, 36.59]; var avgCpuDataList1 = [0.0, 0.0, 36.59, 36.59, 36.59, 73.18, 36.59, 36.59, 36.59, 18.295, 36.59, 36.59, 36.59]; var runningNodesDataList1 = [1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1]; var launchingNodesDataList1 = [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0]; var waitingNodesDataList1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; var canceledNodesDataList1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; var terminatingNodesDataList1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0]; var maxAvgLoadList1 = [70.0, 70.0, 70.0, 70.0, 70.0, 70.0, 70.0, 70.0, 70.0, 70.0, 70.0, 70.0, 70.0]; var minAvgLoadList1 = [30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0]; var numPublishersList1 = []; var minNodesList1 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]; var maxNodesList1 = [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8]; var infoLogsList1 = ["00:00# 00:00 | TOTAL LOAD =0 %, AVG LOAD =0 %, NODES in the cluster [R=1 W=0 L=0 C=0]", "00:00# 00:00 | <strong>Autoscaling doing nothing</strong>", "05:00# 05:00 | TOTAL LOAD =0 %, AVG LOAD =0 %, NODES in the cluster [R=1 W=0 L=0 C=0]", "05:00# 05:00 | <strong>Autoscaling doing nothing</strong>", "10:00# 10:00 | STARTING session (18) in node (921) with rumpUp 1 and duration 10 >> Added 36.59 % load to the node", "10:00# 10:00 | TOTAL LOAD =36.59 %, AVG LOAD =36.59 %, NODES in the cluster [R=1 W=0 L=0 C=0]", "10:00# 10:00 | <strong>Autoscaling doing nothing</strong>", "15:00# 15:00 | TOTAL LOAD =36.59 %, AVG LOAD =36.59 %, NODES in the cluster [R=1 W=0 L=0 C=0]", "15:00# 15:00 | <strong>Autoscaling doing nothing</strong>", "20:00# 20:00 | TOTAL LOAD =36.59 %, AVG LOAD =36.59 %, NODES in the cluster [R=1 W=0 L=0 C=0]", "20:00# 20:00 | <strong>Autoscaling doing nothing</strong>", "25:00# 25:00 | STARTING session (392) in node (921) with rumpUp 1 and duration 3 >> Added 36.59 % load to the node", "25:00# 25:00 | TOTAL LOAD =73.18 %, AVG LOAD =73.18 %, NODES in the cluster [R=1 W=0 L=1 C=0]", "25:00# 25:00 | <strong>The cluster average load (73.18%) is above its limits [30.00%, 70.00%] and the upper limit of Media Nodes (8) has not been reached. Current number of active nodes is 1 (0 launching and 1 running). 1 new Media Nodes will be launched.</strong>", "30:00# 30:00 | TOTAL LOAD =73.18 %, AVG LOAD =36.59 %, NODES in the cluster [R=1 W=0 L=1 C=0]", "30:00# 30:00 | <strong>Autoscaling doing nothing</strong>", "35:00# 35:00 | TOTAL LOAD =73.18 %, AVG LOAD =36.59 %, NODES in the cluster [R=1 W=0 L=1 C=0]", "35:00# 35:00 | <strong>Autoscaling doing nothing</strong>", "40:00# 40:00 | TOTAL LOAD =73.18 %, AVG LOAD =36.59 %, NODES in the cluster [R=2 W=0 L=0 C=0]", "40:00# 40:00 | <strong>Autoscaling doing nothing</strong>", "45:00# 45:00 | STOPPING session (392) in node (921) >> Reduced 36.59 % load to the node", "45:00# 45:00 | TOTAL LOAD =36.59 %, AVG LOAD =18.3 %, NODES in the cluster [R=1 W=0 L=0 C=0]", "45:00# 45:00 | <strong>The cluster average load (18.30%) is below its limits [30.00%, 70.00%] and the lower limit of Media Nodes (1) has not been reached. Current number of active nodes is 2 (0 launching and 2 running). 1 Media Nodes will be terminated.</strong>", "50:00# 50:00 | REMOVING node (495) with 0% load from the cluster", "50:00# 50:00 | TOTAL LOAD =36.59 %, AVG LOAD =36.59 %, NODES in the cluster [R=1 W=0 L=0 C=0]", "50:00# 50:00 | <strong>Autoscaling doing nothing</strong>", "55:00# 55:00 | TOTAL LOAD =36.59 %, AVG LOAD =36.59 %, NODES in the cluster [R=1 W=0 L=0 C=0]", "55:00# 55:00 | <strong>Autoscaling doing nothing</strong>", "00:00# 00:00 | TOTAL LOAD =36.59 %, AVG LOAD =36.59 %, NODES in the cluster [R=1 W=0 L=0 C=0]", "00:00# 00:00 | <strong>Autoscaling doing nothing</strong>"]; window.chartColors = { red: 'rgb(255, 99, 132)', darkRed: 'rgb(174, 4, 4)', orange: 'rgb(255, 159, 64)', yellow: 'rgb(249, 193, 0)', green: 'rgb(75, 192, 192)', darkGreen: 'rgb(0, 165, 58)', blue: 'rgb(54, 162, 235)', darkBlue: 'rgb(0, 83, 250)', fillDarkBlue: 'rgb(205, 221, 255, 0.7)', purple: 'rgb(153, 102, 255)', grey: 'rgb(231,233,237)', black: 'rgb(0,0,0)', fillGrayTransparent: 'rgb(241,241,241, 0.5)', purple: 'rgb(145, 0, 162)', fillPurple: 'rgb(188, 0, 174, 0.5)' }; var CPU_STYLE_CHART = 'line'; var NODES_STYLE_CHART = 'line'; var HIDE_MAX_AVG = false; var HIDE_MIN_AVG = false; var HIDE_MAX_NODES = false; var HIDE_MIN_NODES = false; var NODES_STEPPED_STYLE = false; var NODES_FILL_STYLE = true; var myChart; window.addEventListener("load", () => { initChart1(); }, false); function initChart1() { var chartContainer = document.getElementById('chart-container1'); var canvas = document.createElement('canvas'); chartContainer.appendChild(canvas); myChart = new Chart(canvas, { type: 'line', data: { labels: labelsList1, datasets: [{ label: 'Max average load', type: CPU_STYLE_CHART, data: maxAvgLoadList1, fill: false, borderColor: window.chartColors.darkRed, backgroundColor: window.chartColors.grey, borderWidth: 2, borderDash: [2, 2], pointRadius: 0, steppedLine: true, hidden: HIDE_MAX_AVG, yAxisID: 'CPU', }, { label: 'Min average load', type: CPU_STYLE_CHART, data: minAvgLoadList1, fill: false, borderColor: window.chartColors.darkGreen, backgroundColor: window.chartColors.grey, borderWidth: 2, borderDash: [2, 2], pointRadius: 0, steppedLine: true, hidden: HIDE_MIN_AVG, yAxisID: 'CPU', }, { label: 'Max Media Nodes', type: NODES_STYLE_CHART, data: maxNodesList1, fill: false, borderColor: window.chartColors.darkRed, backgroundColor: window.chartColors.darkRed, borderWidth: 3, borderDash: [10, 15], pointRadius: 0, steppedLine: true, hidden: HIDE_MAX_NODES, yAxisID: 'NODES', }, { label: 'Min Media Nodes', type: NODES_STYLE_CHART, data: minNodesList1, fill: false, borderColor: window.chartColors.darkGreen, backgroundColor: window.chartColors.darkGreen, borderWidth: 3, borderDash: [10, 15], pointRadius: 0, steppedLine: true, hidden: HIDE_MIN_NODES, yAxisID: 'NODES', }, { label: 'Cluster average load', type: CPU_STYLE_CHART, data: avgCpuDataList1, fill: true, borderColor: window.chartColors.black, backgroundColor: window.chartColors.fillGrayTransparent, borderWidth: 2, yAxisID: 'CPU', }, { label: 'Waiting idle to terminate Media Nodes', type: NODES_STYLE_CHART, data: waitingNodesDataList1, fill: NODES_FILL_STYLE, borderColor: window.chartColors.red, backgroundColor: window.chartColors.red, borderWidth: 2, steppedLine: NODES_STEPPED_STYLE, yAxisID: 'NODES', }, { label: 'Launching Media Nodes', type: NODES_STYLE_CHART, data: launchingNodesDataList1, fill: NODES_FILL_STYLE, borderColor: window.chartColors.yellow, backgroundColor: window.chartColors.yellow, borderWidth: 2, steppedLine: NODES_STEPPED_STYLE, yAxisID: 'NODES', }, { label: 'Canceled Media Nodes', type: NODES_STYLE_CHART, data: canceledNodesDataList1, fill: NODES_FILL_STYLE, borderColor: window.chartColors.purple, backgroundColor: window.chartColors.fillPurple, borderWidth: 2, steppedLine: NODES_STEPPED_STYLE, yAxisID: 'NODES', }, { label: 'Terminating Media Nodes', type: NODES_STYLE_CHART, data: terminatingNodesDataList1, fill: NODES_FILL_STYLE, borderColor: window.chartColors.black, backgroundColor: window.chartColors.black, borderWidth: 2, steppedLine: NODES_STEPPED_STYLE, yAxisID: 'NODES', }, { label: 'Running Media Nodes', type: NODES_STYLE_CHART, data: runningNodesDataList1, fill: NODES_FILL_STYLE, borderColor: window.chartColors.green, backgroundColor: window.chartColors.green, borderWidth: 2, steppedLine: NODES_STEPPED_STYLE, yAxisID: 'NODES', }, { label: 'Cluster total load', type: CPU_STYLE_CHART, data: totalCpuDataList1, fill: true, borderColor: window.chartColors.darkBlue, backgroundColor: window.chartColors.fillDarkBlue, borderWidth: 2, hidden: false, yAxisID: 'CPU', }, /* {*/ /* label: 'Num publishers',*/ /* type: CPU_STYLE_CHART,*/ /* data: numPublishers,*/ /* fill: false,*/ /* borderColor: window.chartColors.purple,*/ /* borderWidth: 2,*/ /* steppedLine: true,*/ /* yAxisID: 'CPU',*/ /* }*/ ] }, options: { responsive: true, maintainAspectRatio: false, title: { display: false }, legend: { display: screen.width > 767, position: 'right' }, lineAtIndex: 60, scales: { yAxes: [{ id: 'CPU', position: 'left', ticks: { beginAtZero: true }, scaleLabel: { display: true, labelString: 'CPU load' } }, { id: 'NODES', position: 'right', ticks: { max: Math.max.apply(Math, maxNodesList1) + 5, callback: function (value) { if (value % 1 === 0) { return value; } } }, scaleLabel: { display: true, labelString: 'Media Nodes' } } ] } } }); } </script> <style> .divchartcontainer { max-height: 45vh; height: 45vh; padding: 5px; } canvas { margin: auto; height: inherit !important; width: auto !important; } </style> <div class="divchartcontainer" id="chart-container1"></div> </div> </div> 

<br><br>

1. The cluster starts at **00:00** with 1 Media Node (the minimum forced by _Min Media Nodes_) and 0 load.
2. At **05:00** the first session is created, and at **10:00** the total load has increased up to 36.59%. The average load is still between the limits, so no action is taken.
3. At **20:00** the second session is created, and at **25:00** the total load has increased up to 73.18%. The average load now exceeds the upper limit, so a new Media Node is added by the algorithm, entering "launching" status and immediately decreasing the average load back to a safe 36.59%.
4. The new Media Node enters "running" status at **40:00**, at which point one of the sessions ends. At **45:00** the total load has decreased to 36.59% and the average load down to 18.29%, because our cluster still has 2 running Media Nodes.
5. At **45:00** one Media Node instantly enters "terminating" status. The one added in second place is for sure empty, as the only ongoing session is the first one, hosted by the first Media Node from the very beginning. So the termination process just immediately removes the second Media Node from the cluster. From **50:00** to the end, the cluster load remains at a comfortable 36.59% with the first Media Node still up and running, hosting the first session.

<br><br>

#### Scenario 2: small sessions cause a continuous growth until Media Node limit is reached

Let's suppose we configure our cluster with the following values:

```console
OPENVIDU_PRO_CLUSTER_AUTOSCALING_MAX_NODES=2
OPENVIDU_PRO_CLUSTER_AUTOSCALING_MIN_NODES=1
OPENVIDU_PRO_CLUSTER_AUTOSCALING_MAX_LOAD=70
OPENVIDU_PRO_CLUSTER_AUTOSCALING_MIN_LOAD=30
```

Now let's take a 1-hour time window in which 6 identical small sessions will be created gradually and evenly distributed over time. Each session represents a 7-to-7 video-audio conference, each one of them totalling 49 streams and increasing around 25% the CPU load of a 2 CPU - 4GB RAM server. This situation is represented in the graph below:

<br>

<div> <script id="chart-js2">var labelsList2 = ["00:00", "05:00", "10:00", "15:00", "20:00", "25:00", "30:00", "35:00", "40:00", "45:00", "50:00", "55:00", "60:00"]; var totalCpuDataList2 = [0.0, 0.0, 25.0, 50.0, 75.0, 100.0, 125.0, 150.0, 150.0, 125.0, 125.0, 125.0, 125.0]; var avgCpuDataList2 = [0.0, 0.0, 25.0, 50.0, 75.0, 50.0, 62.5, 75.0, 75.0, 62.5, 62.5, 62.5, 62.5]; var runningNodesDataList2 = [1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2]; var launchingNodesDataList2 = [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0]; var waitingNodesDataList2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; var canceledNodesDataList2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; var terminatingNodesDataList2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; var maxAvgLoadList2 = [70.0, 70.0, 70.0, 70.0, 70.0, 70.0, 70.0, 70.0, 70.0, 70.0, 70.0, 70.0, 70.0]; var minAvgLoadList2 = [30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0]; var numPublishersList2 = []; var minNodesList2 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]; var maxNodesList2 = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]; var infoLogsList2 = ["00:00# 00:00 | TOTAL LOAD =0 %, AVG LOAD =0 %, NODES in the cluster [R=1 W=0 L=0 C=0]", "00:00# 00:00 | <strong>Autoscaling doing nothing</strong>", "05:00# 05:00 | TOTAL LOAD =0 %, AVG LOAD =0 %, NODES in the cluster [R=1 W=0 L=0 C=0]", "05:00# 05:00 | <strong>Autoscaling doing nothing</strong>", "10:00# 10:00 | STARTING session (47) in node (83) with rumpUp 1 and duration 6 >> Added 25 % load to the node", "10:00# 10:00 | TOTAL LOAD =25 %, AVG LOAD =25 %, NODES in the cluster [R=1 W=0 L=0 C=0]", "10:00# 10:00 | <strong>Autoscaling doing nothing</strong>", "15:00# 15:00 | STARTING session (859) in node (83) with rumpUp 1 and duration 10 >> Added 25 % load to the node", "15:00# 15:00 | TOTAL LOAD =50 %, AVG LOAD =50 %, NODES in the cluster [R=1 W=0 L=0 C=0]", "15:00# 15:00 | <strong>Autoscaling doing nothing</strong>", "20:00# 20:00 | STARTING session (101) in node (83) with rumpUp 1 and duration 10 >> Added 25 % load to the node", "20:00# 20:00 | TOTAL LOAD =75 %, AVG LOAD =75 %, NODES in the cluster [R=1 W=0 L=1 C=0]", "20:00# 20:00 | <strong>The cluster average load (75.00%) is above its limits [30.00%, 70.00%] and the upper limit of Media Nodes (2) has not been reached. Current number of active nodes is 1 (0 launching and 1 running). 1 new Media Nodes will be launched.</strong>", "25:00# 25:00 | STARTING session (259) in node (83) with rumpUp 1 and duration 10 >> Added 25 % load to the node", "25:00# 25:00 | TOTAL LOAD =100 %, AVG LOAD =50 %, NODES in the cluster [R=1 W=0 L=1 C=0]", "25:00# 25:00 | <strong>Autoscaling doing nothing</strong>", "30:00# 30:00 | STARTING session (449) in node (83) with rumpUp 1 and duration 10 >> Added 25 % load to the node", "30:00# 30:00 | TOTAL LOAD =125 %, AVG LOAD =62.5 %, NODES in the cluster [R=1 W=0 L=1 C=0]", "30:00# 30:00 | <strong>Autoscaling doing nothing</strong>", "35:00# 35:00 | STARTING session (890) in node (83) with rumpUp 1 and duration 10 >> Added 25 % load to the node", "35:00# 35:00 | TOTAL LOAD =150 %, AVG LOAD =75 %, NODES in the cluster [R=2 W=0 L=0 C=0]", "35:00# 35:00 | <strong>Autoscaling doing nothing</strong>", "40:00# 40:00 | TOTAL LOAD =150 %, AVG LOAD =75 %, NODES in the cluster [R=2 W=0 L=0 C=0]", "40:00# 40:00 | <strong>Autoscaling doing nothing</strong>", "45:00# 45:00 | STOPPING session (47) in node (83) >> Reduced 25 % load to the node", "45:00# 45:00 | TOTAL LOAD =125 %, AVG LOAD =62.5 %, NODES in the cluster [R=2 W=0 L=0 C=0]", "45:00# 45:00 | <strong>Autoscaling doing nothing</strong>", "50:00# 50:00 | TOTAL LOAD =125 %, AVG LOAD =62.5 %, NODES in the cluster [R=2 W=0 L=0 C=0]", "50:00# 50:00 | <strong>Autoscaling doing nothing</strong>", "55:00# 55:00 | TOTAL LOAD =125 %, AVG LOAD =62.5 %, NODES in the cluster [R=2 W=0 L=0 C=0]", "55:00# 55:00 | <strong>Autoscaling doing nothing</strong>", "00:00# 00:00 | TOTAL LOAD =125 %, AVG LOAD =62.5 %, NODES in the cluster [R=2 W=0 L=0 C=0]", "00:00# 00:00 | <strong>Autoscaling doing nothing</strong>"]; window.chartColors = { red: 'rgb(255, 99, 132)', darkRed: 'rgb(174, 4, 4)', orange: 'rgb(255, 159, 64)', yellow: 'rgb(249, 193, 0)', green: 'rgb(75, 192, 192)', darkGreen: 'rgb(0, 165, 58)', blue: 'rgb(54, 162, 235)', darkBlue: 'rgb(0, 83, 250)', fillDarkBlue: 'rgb(205, 221, 255, 0.7)', purple: 'rgb(153, 102, 255)', grey: 'rgb(231,233,237)', black: 'rgb(0,0,0)', fillGrayTransparent: 'rgb(241,241,241, 0.5)', purple: 'rgb(145, 0, 162)', fillPurple: 'rgb(188, 0, 174, 0.5)' }; var CPU_STYLE_CHART = 'line'; var NODES_STYLE_CHART = 'line'; var HIDE_MAX_AVG = false; var HIDE_MIN_AVG = false; var HIDE_MAX_NODES = false; var HIDE_MIN_NODES = false; var NODES_STEPPED_STYLE = false; var NODES_FILL_STYLE = true; var myChart; window.addEventListener("load", () => { initChart2(); }, false); function initChart2() { var chartContainer = document.getElementById('chart-container2'); var canvas = document.createElement('canvas'); chartContainer.appendChild(canvas); myChart = new Chart(canvas, { type: 'line', data: { labels: labelsList2, datasets: [{ label: 'Max average load', type: CPU_STYLE_CHART, data: maxAvgLoadList2, fill: false, borderColor: window.chartColors.darkRed, backgroundColor: window.chartColors.grey, borderWidth: 2, borderDash: [2, 2], pointRadius: 0, steppedLine: true, hidden: HIDE_MAX_AVG, yAxisID: 'CPU', }, { label: 'Min average load', type: CPU_STYLE_CHART, data: minAvgLoadList2, fill: false, borderColor: window.chartColors.darkGreen, backgroundColor: window.chartColors.grey, borderWidth: 2, borderDash: [2, 2], pointRadius: 0, steppedLine: true, hidden: HIDE_MIN_AVG, yAxisID: 'CPU', }, { label: 'Max Media Nodes', type: NODES_STYLE_CHART, data: maxNodesList2, fill: false, borderColor: window.chartColors.darkRed, backgroundColor: window.chartColors.darkRed, borderWidth: 3, borderDash: [10, 15], pointRadius: 0, steppedLine: true, hidden: HIDE_MAX_NODES, yAxisID: 'NODES', }, { label: 'Min Media Nodes', type: NODES_STYLE_CHART, data: minNodesList2, fill: false, borderColor: window.chartColors.darkGreen, backgroundColor: window.chartColors.darkGreen, borderWidth: 3, borderDash: [10, 15], pointRadius: 0, steppedLine: true, hidden: HIDE_MIN_NODES, yAxisID: 'NODES', }, { label: 'Cluster average load', type: CPU_STYLE_CHART, data: avgCpuDataList2, fill: true, borderColor: window.chartColors.black, backgroundColor: window.chartColors.fillGrayTransparent, borderWidth: 2, yAxisID: 'CPU', }, { label: 'Waiting idle to terminate Media Nodes', type: NODES_STYLE_CHART, data: waitingNodesDataList2, fill: NODES_FILL_STYLE, borderColor: window.chartColors.red, backgroundColor: window.chartColors.red, borderWidth: 2, steppedLine: NODES_STEPPED_STYLE, yAxisID: 'NODES', }, { label: 'Launching Media Nodes', type: NODES_STYLE_CHART, data: launchingNodesDataList2, fill: NODES_FILL_STYLE, borderColor: window.chartColors.yellow, backgroundColor: window.chartColors.yellow, borderWidth: 2, steppedLine: NODES_STEPPED_STYLE, yAxisID: 'NODES', }, { label: 'Canceled Media Nodes', type: NODES_STYLE_CHART, data: canceledNodesDataList2, fill: NODES_FILL_STYLE, borderColor: window.chartColors.purple, backgroundColor: window.chartColors.fillPurple, borderWidth: 2, steppedLine: NODES_STEPPED_STYLE, yAxisID: 'NODES', }, { label: 'Terminating Media Nodes', type: NODES_STYLE_CHART, data: terminatingNodesDataList2, fill: NODES_FILL_STYLE, borderColor: window.chartColors.black, backgroundColor: window.chartColors.black, borderWidth: 2, steppedLine: NODES_STEPPED_STYLE, yAxisID: 'NODES', }, { label: 'Running Media Nodes', type: NODES_STYLE_CHART, data: runningNodesDataList2, fill: NODES_FILL_STYLE, borderColor: window.chartColors.green, backgroundColor: window.chartColors.green, borderWidth: 2, steppedLine: NODES_STEPPED_STYLE, yAxisID: 'NODES', }, { label: 'Cluster total load', type: CPU_STYLE_CHART, data: totalCpuDataList2, fill: true, borderColor: window.chartColors.darkBlue, backgroundColor: window.chartColors.fillDarkBlue, borderWidth: 2, hidden: false, yAxisID: 'CPU', }, /* {*/ /* label: 'Num publishers',*/ /* type: CPU_STYLE_CHART,*/ /* data: numPublishers,*/ /* fill: false,*/ /* borderColor: window.chartColors.purple,*/ /* borderWidth: 2,*/ /* steppedLine: true,*/ /* yAxisID: 'CPU',*/ /* }*/ ] }, options: { responsive: true, maintainAspectRatio: false, title: { display: false }, legend: { display: screen.width > 767, position: 'right' }, lineAtIndex: 60, scales: { yAxes: [{ id: 'CPU', position: 'left', ticks: { beginAtZero: true }, scaleLabel: { display: true, labelString: 'CPU load' } }, { id: 'NODES', position: 'right', ticks: { max: Math.max.apply(Math, maxNodesList2) + 5, callback: function (value) { if (value % 1 === 0) { return value; } } }, scaleLabel: { display: true, labelString: 'Media Nodes' } } ] } } }); } </script> <style> .divchartcontainer { max-height: 45vh; height: 45vh; padding: 5px; } canvas { margin: auto; height: inherit !important; width: auto !important; } </style> <div class="divchartcontainer" id="chart-container2"></div> </div> </div> 

<br><br>

1. The cluster starts at **00:00** with 1 Media Node (the minimum forced by _Min Media Nodes_) and 0 load.
2. Every 5 minutes starting at **05:00** and ending at **30:00**, a new session will be created. In total 6 sessions will be created, each one of them adding up to the total load 25%.
3. During this ramp up, at **20:00** (when the third session has already been initialized) the upper average load limit (70%) will be exceeded. At this exact point the autoscaling algorithm will launch a new Media Node. We can appreciate the average load drop to 50% at **25:00**, when this second Media Node is taken into account.
4. The 3 final sessions are initialized at **25:00**, **30:00** and **35:00**, gradually increasing the average load up to the same point that triggered the launch of a second Media Node at **20:00**.
5. At **35:00** the average load is higher than the configured upper limit (75% > 70%). But we have already reached the maximum number of Media Nodes. The autoscaling algorithm won't launch a third Media Node, so the average load remains above our limit during 5 minutes.
6. At **45:00** one of the 6 sessions is closed, so the average load returns to a safe value, where it remains for the rest of the scenario.

<br><br>

---

## Current limitations of OpenVidu Pro scalability

Below are stated the current limitations regarding the scalability of an OpenVidu Pro cluster. All of them are currently in our roadmap, and will be for sure addressed in future releases.

#### Composed video recording is not scalable

Right now [composed recordings with video](advanced-features/recording/#composed-recording){:target="_blank"} are hosted in OpenVidu Server Pro node, which means that launching multiple simultaneous composed recordings may increase the load on this node to a dangerous point. So a necessary change to improve scalability for this particular use case is to get this module out of OpenVidu Server Pro Node.

For the moment, we recommend limiting the number of simultaneous composed recordings with video and using a more powerful machine in OpenVidu Server Pro Node if required. This doesn't affect either individual recordings or composed recordings with audio-only.

#### Sessions cannot be moved between Media Nodes

Current scalability features doesn't support dynamic migration of OpenVidu Sessions between Media Nodes. Once a Session is initialized inside a Media Node, it will remain there until it is closed. We will work to support Session migration between Media Nodes to A) improve fault tolerance upon the possibility of a Media Node crashing and B) make easier the scale-down process of your OpenVidu Pro cluster, so you don't have to wait until all Sessions inside a Media Node are closed to drop that Media Node from the cluster.

#### One Session cannot be handled by multiple Media Nodes

In the current status of OpenVidu Pro it is still not possible to distribute a single OpenVidu Session between multiple Media Nodes. A Session must be initialized inside a Media Node that will be able to support it at its peak load, as all of the media streams of that Session will flow through that particular Media Node. This means that Media Nodes may become saturated if Sessions continue to be created and load keeps growing. We are working to support more advanced techniques of load balancing in conjunction with OpenVidu Pro autoscaling capabilities, such as load reservation for specific Sessions (the scalability algorithm will also take into account the future load when distributing new Sessions and scaling-in and out the cluster).

<br>

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
