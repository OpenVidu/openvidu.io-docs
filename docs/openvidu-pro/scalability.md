<h2 id="section-title">Scalability</h2>
<hr>

<br>

- **[OpenVidu Pro architecture](#openvidu-pro-architecture)**
- **[Scalability when deploying on AWS](#scalability-when-deploying-on-aws)**
- **[Scalability when deploying on premise](#scalability-when-deploying-on-premise)**
- **[Roadmap](#roadmap)**

<br>

---

## OpenVidu Pro architecture

OpenVidu Pro consists of different nodes that work together to offer OpenVidu services in a distributed, scalable way. Currently, OpenVidu Pro has two types of nodes, following a **Master-Slave** model:

- **OpenVidu Server Pro Node**: this is the master node. It runs openvidu-server-pro Java process, which manages the control plane of the stack. It takes care of OpenVidu sessions, forwarding events and messages to clients and distributing the load across the available Media Nodes.<br><br>
- **Media Node**: these are the slave nodes, in charge of managing the media streams. For that reason, Media Nodes are the actual bottleneck of the OpenVidu cluster and the ones that determine its capacity: more Media Nodes means more concurrent OpenVidu sessions. Each OpenVidu session is currently hosted in one Media Node. Each Media Node can manage multiple OpenVidu sessions.

<br>

> Visit [Deploying OpenVidu Pro](/openvidu-pro/deploying-openvidu-pro){:target="_blank"} to deploy your cluster.

<br>

---

## Scalability when deploying on AWS

#### Setting the number of media servers on startup

When [deploying OpenVidu Pro on AWS](/openvidu-pro/deploying-openvidu-pro#deploying-openvidu-pro-on-aws){:target="_blank"} by filling the CloudFormation form, simply set the desired number in section **[Clustering options](/openvidu-pro/deploying-openvidu-pro/#clustering-options){:target="_blank"}**.

<div class="row">
    <div style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro11" href="/img/docs/openvidu-pro/marketplace/marketClusteringOptions.png"><img class="img-responsive img-pro img-pro-small" src="/img/docs/openvidu-pro/marketplace/marketClusteringOptions.png"/></a>
    </div>
</div>

In section **[Other parameters](/openvidu-pro/deploying-openvidu-pro/#other-parameters){:target="_blank"}** you can choose the size of each Media Server instance.

<div class="row">
    <div style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro12" href="/img/docs/openvidu-pro/marketplace/marketOthers.png"><img class="img-responsive img-pro img-pro-small" src="/img/docs/openvidu-pro/marketplace/marketOthers.png"/></a>
    </div>
</div>

<br>

---

## Scalability when deploying on premise

#### Setting the number of media servers on startup

When [deploying OpenVidu Pro on premise](/openvidu-pro/deploying-openvidu-pro#deploying-openvidu-pro-on-premise){:target="_blank"} with Ansible, you first have to prepare the number of media server instances you want. For example, if you want your cluster to have 3 media server instances, then you will need 4 hosts in your infrastructure: one for the OpenVidu Server pro node and three for each Media Node. Check out the [Cluster machines prerequisites](/openvidu-pro/deploying-openvidu-pro/#in-your-cluster-machines){:target="_blank"} for further information.

Then you just need to properly [configure the `inventory.yml` file](/openvidu-pro/deploying-openvidu-pro/#3-ansibles-inventory){:target="_blank"} with each instance IP before running Ansible's playbook.

<!--

#### Setting the number of media servers on startup

There are 3 [configuration properties](/reference-docs/openvidu-server-params/){:target="_blank"} that you must set up to launch OpenVidu Pro with multiple media servers:

- `openvidu.pro.cluster`: set it to `true`
- `openvidu.pro.cluster.load.strategy`: this property defines the load strategy for distributing the video sessions among the different media servers. New sessions will be established automatically in the less loaded server. This property may be:
    - `streams`: the load is calculated counting the total number of publishers and subscribers in the media server
    - `sessions`: the load is calculated counting the number of sessions in the media server
    - `mediaObjects`: the load is calculated counting the number of media objects in the media server. This includes publisher an dsubscriber endpoints, filter
- `kms.uris`: 

-->

<br>

---

## Roadmap

This is the (non-prioritized) list of features scheduled for OpenVidu Pro regarding scalability:

- **Adding and removing Media Nodes on the fly**: current release only allows to launch the cluster with a fixed number of Media Nodes. In the near future it will be possible to change its number dynamically without restarting the service.
- **Remove composed recording module from OpenVidu Server Pro node**: right now [composed recordings](/advanced-features/recording/#composed-recording){:target="_blank"} are hosted in OpenVidu Server Pro node, which means that launching multiple simultaneous composed recordings may increase the load on this node to a dangerous point. So a necessary change to improve scalability for this particular use case is to get this module out of OpenVidu Server Pro node.
- **Elasticity**: the automated scale-in and scale-out of Media Nodes according to server load is an important feature that OpenVidu Pro will provide.
- **AWS S3 recording**: instead of storing recording files into the cluster nodes, OpenVidu Pro will provide an easy way of uploading them to S3 buckets (in real-time when possible). This way the recording files persistance will be greatly improved: you will be able to drop your cluster nodes (or even manage multiple clusters) without worrying about your recordings.
- **Kubernetes support**: we intend to provide a Kubernetes version of OpenVidu Pro cluster.

<br>