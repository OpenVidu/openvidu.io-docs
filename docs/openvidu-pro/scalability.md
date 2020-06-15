<h2 id="section-title">Scalability</h2>
<hr>

- **[OpenVidu Pro architecture](#openvidu-pro-architecture)**
- **[Pricing of an OpenVidu Pro cluster](#pricing-of-an-openvidu-pro-cluster)**
- **[How to deploy your OpenVidu Pro cluster](#how-to-deploy-your-openvidu-pro-cluster)**
- **[Set the number of Media Nodes on startup](#set-the-number-of-media-nodes-on-startup)**
- **[Change the number of Media Nodes on the fly](#change-the-number-of-media-nodes-on-the-fly)**
- **[OpenVidu Pro cluster events](#openvidu-pro-cluster-events)**
- **[How many users can an OpenVidu Pro cluster handle](#how-many-users-can-an-openvidu-pro-cluster-handle)**
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
        <a data-fancybox="gallery-pro1" href="img/docs/openvidu-pro/openvidu-cluster.png"><img class="img-responsive" style="margin: auto; max-height: 600px" src="img/docs/openvidu-pro/openvidu-cluster.png"/></a>
    </div>
</div>

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

- **Launch a Media Node**: **[POST /pro/media-nodes](openvidu-pro/reference-docs/REST-API-pro#post-promedia-nodes){:target="_blank"}**
- **Drop a Media Node**: **[DELETE /pro/media-nodes](openvidu-pro/reference-docs/REST-API-pro/#delete-promedia-nodesltmedia_node_idgt){:target="_blank"}**

> **WARNING**: depending on the environment where your OpenVidu Pro cluster is deployed, you must take into account some important aspects regarding the launch and drop of Media Nodes. Visit the specific documentation page for your environment:
>
> - [AWS](openvidu-pro/deployment/aws/#with-openvidu-pro-rest-api){:target="_blank"}
> - [On premises](openvidu-pro/deployment/on-premises/#with-openvidu-pro-rest-api){:target="_blank"}

<br>

---

## OpenVidu Pro cluster events

OpenVidu Pro provides an specific server-side event that will inform you every time there is a change in the status of the cluster. You can listen to this event by using [OpenVidu Webhook](reference-docs/openvidu-server-webhook){:target="_blank"} (it will also be registered in [OpenVidu CDR](reference-docs/openvidu-server-cdr){:target="_blank"}).

This event is **[mediaNodeStatusChanged](openvidu-pro/reference-docs/openvidu-server-pro-cdr/#medianodestatuschanged){:target="_blank"}**. By listening to it you will have a complete record of your OpenVidu Pro cluster behavior in real time. And of course you can always use [OpenVidu Pro REST API](openvidu-pro/reference-docs/REST-API-pro){:target="_blank"} to retrieve the status of the whole cluster at any time.

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

## Current limitations of OpenVidu Pro scalability

Below are stated the current limitations regarding the scalability of an OpenVidu Pro cluster. All of them are currently in our roadmap, and will be for sure addressed in future releases.

#### Composed video recording is not scalable

Right now [composed recordings with video](advanced-features/recording/#composed-recording){:target="_blank"} are hosted in OpenVidu Server Pro node, which means that launching multiple simultaneous composed recordings may increase the load on this node to a dangerous point. So a necessary change to improve scalability for this particular use case is to get this module out of OpenVidu Server Pro Node.

For the moment, we recommend limiting the number of simultaneous composed recordings with video and using a more powerful machine in OpenVidu Server Pro Node if required. This doesn't affect either individual recordings or composed recordings with audio-only.

#### Sessions cannot be moved between Media Nodes

Current scalability features doesn't support dynamic migration of OpenVidu Sessions between Media Nodes. Once a Session is initialized inside a Media Node, it will remain there until it is closed. We will work to support Session migration between Media Nodes to A) improve fault tolerance upon the possibility of a Media Node crashing and B) make easier the scale-down process of your OpenVidu Pro cluster, so you don't have to wait until all Sessions inside a Media Node are closed to drop that Media Node from the cluster.

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