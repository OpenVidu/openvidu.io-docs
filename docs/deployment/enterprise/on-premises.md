<h2 id="section-title">Deploying OpenVidu Enterprise on premises</h2>
<hr>

- **[Single master deployment](#regular-deployment)**
- **[High Availability deployment](#high-availability-deployment)**
    - **[Overview](#overview)**
    - **[Prerequisites](#prerequisites)**
        - **[Base Services ports configuration](#base-services-ports-configuration)**
        - **[OpenVidu Enterprise Nodes ports configuration](#openvidu-enterprise-nodes-ports-configuration)**
    - **[Installing Base Services](#installing-base-services)**
    - **[Installing OpenVidu Enterprise Nodes](#installing-openvidu-enterprise-nodes)**
    - **[Node management](#node-management)**
    - **[Troubleshooting](#troubleshooting)**
        - **[Common installation errors](#common-installation-errors)**
        - **[Cluster health check](#cluster-health-check)**
        - **[Check the logs](#check-the-logs)**

<hr>
<br>

## Single master deployment
<br>

OpenVidu Enterprise on premises is deployed just as [OpenVidu Pro on premises](deployment/pro/on-premises). You just need to add the following property to OpenVidu configuration `.env` file [here](deployment/pro/on-premises/#22-configuration).

    OPENVIDU_EDITION=enterprise

<br><hr>

## High Availability deployment
<br>

### Overview

OpenVidu Enterprise on premises can be deployed in a High Availability (HA) configuration. The difference of [OpenVidu Enterprise Single Master deployment](deployment/enterprise/on-premises/#regular-deployment) and [OpenVidu Enterprise HA deployment](deployment/enterprise/on-premises/#high-availability-deployment) is that in the latter you will have several OpenVidu Enterprise Nodes running at the same time, and all of them will be able to handle your users' sessions. This is specially useful when you have a lot of sessions and you want to distribute the load among several servers.

The following diagram shows a typical HA deployment:

<div class="row">
    <div class="pro-gallery" style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-pro1" data-type="image" class="fancybox-img" href="img/docs/deployment/openvidu-enterprise-ha-extended.png"><img class="img-responsive" style="margin: auto; max-height: 600px; image-rendering: -webkit-optimize-contrast;" src="img/docs/deployment/openvidu-enterprise-ha-extended.png"/></a>
    </div>
</div>

You need a Load Balancer (LB) to distribute the traffic among the different OpenVidu Enterprise Nodes. The LB will be the only entry point to your OpenVidu Enterprise deployment. The LB will redirect the traffic to the different OpenVidu Enterprise Nodes, and each of them will be able to handle the **signaling plane**. The LB will also be in charge of detecting when a Node is down, and redirecting the traffic to the rest of the Nodes.

The **media plane** will be handled directly by the OpenVidu Enterprise Nodes. The LB will not be involved in the media traffic.

To be fully Highly Available, you need to deploy the following services also HA:

- Redis (for storing sessions and cluster information)
- S3 (for storing recordings and configuration)
- Elasticsearch and Kibana (for storing and visualizing logs and metrics)

To simplify the deployment explanation, we will explain a reduced version of the HA deployment, where all the services, Load Balancer and OpenVidu Call will be deployed in a node called **Base Services**, and the OpenVidu Enterprise Nodes will be deployed in different nodes. But keep in mind that the **Base Services** node is not production ready, and it is only used here to simplify the explanation.

This is the diagram of the reduced HA deployment:

<div class="row">
    <div class="pro-gallery" style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-pro1" data-type="image" class="fancybox-img" href="img/docs/deployment/openvidu-enterprise-ha-reduced.png"><img class="img-responsive" style="margin: auto; max-height: 600px; image-rendering: -webkit-optimize-contrast;" src="img/docs/deployment/openvidu-enterprise-ha-reduced.png"/></a>
    </div>
</div>

<hr>

### Prerequisites

- You must have **at least 3 different machine/instances with a Public IP address each one**. One of them will be the **Base Services** node, and the rest will be the **OpenVidu Enterprise Nodes**.
- Each machine must have:
    - Any Linux distribution (we recommend Ubuntu)
    - Docker and Docker Compose installed
    - A public IP address.
    - All the instances should be in the same network, and they should be able to communicate with each other (Ports configuration will be explained later).
    - Each instance must have at least 8GB of RAM and 4 CPU cores. We recommend having 16GB of RAM and 8 CPU cores and some extra disk space for recordings. Recordings are stored locally while being recorded, and then they are uploaded to S3. So you need to have enough disk space to store all the recordings while they are being recorded.
- A FQDN (Fully Qualified Domain Name) pointing to the **Base Services** node. This FQDN will be used to access OpenVidu Call and as a Load Balancer for OpenVidu Enterprise.

In the following image you can see the private IPs addresses of each node. We will use this network setup in the rest of the deployment explanation:

<div class="row">
    <div class="pro-gallery" style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-pro1" data-type="image" class="fancybox-img" href="img/docs/deployment/openvidu-enterprise-ha-reduced-2.png"><img class="img-responsive" style="margin: auto; max-height: 600px; image-rendering: -webkit-optimize-contrast;" src="img/docs/deployment/openvidu-enterprise-ha-reduced-2.png"/></a>
    </div>
</div>

<hr>

#### Base Services ports configuration

The following are the inbound and outbound rules that you need to open in the **Base Services** node:

<br>

##### Inbound rules

<div class="row">
    <div class="pro-gallery" style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-pro1" data-type="image" class="fancybox-img" href="img/docs/deployment/openvidu-enterprise-ha-base-services-ports.png"><img class="img-responsive img-pro" style="margin: auto; max-height: 600px; image-rendering: -webkit-optimize-contrast; " src="img/docs/deployment/openvidu-enterprise-ha-base-services-ports.png"/></a>
    </div>
</div>



- **(Optional) Port 22 TCP (Open to 0.0.0.0,::/0)**: Used to access the machine via SSH for administration purposes.
- **Port 80 TCP (Open to 0.0.0.0,::/0)**: Used by the nginx proxy for letsencrypt certificate generation.
- **Port 443 TCP (Open to 0.0.0.0,::/0)**: Used by the nginx proxy to serve OpenVidu Call and OpenVidu Enterprise API.
- **Port 6379 TCP (Open to 10.5.0.0/24)** (Optional): Used by Redis to store sessions and cluster information. This port should be open only to the OpenVidu Enterprise Nodes.
- **Port 5601 TCP (Open to 10.5.0.0/24)**: Used by Kibana to serve the logs and metrics. This port should be open only to the OpenVidu Enterprise Nodes.
- **Port 9000 TCP (Open to 10.5.0.0/24)**: Used by Minio for configuration and recordings. This port should be open only to the OpenVidu Enterprise Nodes.
- **Port 9200 TCP (Open to 10.5.0.0/24)**: Used by Elasticsearch to serve the logs and metrics. This port should be open only to the OpenVidu Enterprise Nodes.
- **Port 5443 TCP (Open to 10.5.0.0/24)**: Used to serve the OpenVidu Enterprise API through internal network. If you have your OpenVidu Application Server in the same network, you can use `http://10.5.0.5:5443` to access the API, instead of using the external domain name. This is only valid for OpenVidu Application Servers, not for browser/device clients.

<br>

##### Outbound rules

<div class="row">
    <div class="pro-gallery" style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-pro1" data-type="image" class="fancybox-img" href="img/docs/deployment/openvidu-enterprise-ha-base-services-out-ports.png"><img class="img-responsive img-pro" style="margin: auto; max-height: 600px; image-rendering: -webkit-optimize-contrast; " src="img/docs/deployment/openvidu-enterprise-ha-out-ports.png"/></a>
    </div>
</div>

<hr>

#### OpenVidu Enterprise Nodes ports configuration

The following are the inbound and outbound rules that you need to open in the **OpenVidu Enterprise Nodes**:

<br>

##### Inbound rules

<div class="row">
    <div class="pro-gallery" style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-pro1" data-type="image" class="fancybox-img" href="img/docs/deployment/openvidu-enterprise-ha-node-ports.png"><img class="img-responsive img-pro" style="margin: auto; max-height: 600px; image-rendering: -webkit-optimize-contrast; " src="img/docs/deployment/openvidu-enterprise-ha-node-ports.png"/></a>
    </div>
</div>

- **(Optional) Port 22 TCP (Open to 0.0.0.0,::/0)**: Used to access the machine via SSH for administration purposes.
- **Port 443 TCP/UDP (Open to 0.0.0.0,::/0)**: This port in OpenVidu Enterprise HA is used for TURN/STUN instead of 3478.
- **Port 3000: (Open to 10.5.0.0/24)**: Used by a service called **Media Node Controller** which provision the Media Servers and recording containers. This port should be open only to the OpenVidu Enterprise Nodes.
- **Port 4000: (Open to 10.5.0.0/24)**: Used by the **[Speech To Text](advanced-features/speech-to-text/){:target="_blank"}** service. This port should be open only to the OpenVidu Enterprise Nodes.
- **Port 4443: (Open to 10.5.0.0/24)**: Used by the **Replication Manager** service to replicate the sessions and recordings and proxy accordingly all the requests to the OpenVidu Server. This port should be open only to the OpenVidu Enterprise Nodes and the Load Balancer.
- **Port 5443: (Open to 10.5.0.0/24)**: Used by **OpenVidu Server**. This port is consumed by the **Replication Manager** service, and it should be open only to the OpenVidu Enterprise Nodes.
- **Port 40000-65535 TCP/UDP (Open to 0.0.0.0,::/0)**: Used by Media Server to send and receive media streams.

<br>

##### Outbound rules

<div class="row">
    <div class="pro-gallery" style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-pro1" data-type="image" class="fancybox-img" href="img/docs/deployment/openvidu-enterprise-ha-base-services-out-ports.png"><img class="img-responsive img-pro" style="margin: auto; max-height: 600px; image-rendering: -webkit-optimize-contrast; " src="img/docs/deployment/openvidu-enterprise-ha-out-ports.png"/></a>
    </div>
</div>

<hr>

#### Installing Base Services

In order to install the base services, you need to follow the next steps:

**1)** SSH into the **Base Services** machine (In the example is 10.5.0.5)

**2)** Change to superuser:
```bash
sudo su
```

**3)** Go to `/opt` directory:
```bash
cd /opt
```

**4)** Now execute the following command to download and run the installation script.

<p style="text-align: start">
<code id="code-1"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_ov_enterprise_ha_base_latest.sh | bash</strong></code>
<button id="btn-copy-1" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
                              title="Copy to Clipboard">Copy</button>
</p>

This will download all required files into `ov-enterprise-base-services` folder and will show this message with basic instructions:

```text
=======================================
OpenVidu Enterprise HA successfully installed.
=======================================

1. Go to openvidu folder:
------------------------------------------------
$ cd ov-enterprise-base-services
------------------------------------------------


2. Configure the .env file with your own values:
   Check the documentation for more information:
   https://docs.openvidu.io/en/<version>/deployment/enterprise/on-premises/#high-availability-deployment
------------------------------------------------
$ nano .env
------------------------------------------------


3. Start OpenVidu Enterprise HA Base Services:
------------------------------------------------
$ ./base-services start
------------------------------------------------
```

> To deploy a fixed version, including previous ones, replace `latest` with the desired version number like:<br>
> <code>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_ov_enterprise_ha_base_<strong>2.28.0</strong>.sh | bash</code>

**5)** Go to `ov-enterprise-base-services` folder:

```bash
cd ov-enterprise-base-services
```

**6)** In this directory you will see a `.env` file. This file contains all the configuration parameters that you need to set up in order to run the **Base Services**. As this base service contains the Load Balancer, S3, Redis, Elasticsearch and OpenVidu Call Application, we will configure those services via this config file:

- **`DOMAIN_OR_PUBLIC_IP`**: Set the FQDN or public IP of the machine where you are installing the **Base Services**. In this example, `openvidu.example.com`.
- **`OPENVIDU_SECRET`**: Set the secret that you want to use for the **OpenVidu Server**. This parameter is needed by default OpenVidu Call Application to connect to the OpenVidu Server.
- **`CERTIFICATE_TYPE`**: Set the type of certificate that you are using, which can be `selfsigned`, `owncert` or `letsencrypt`. If you want to know more about this parameter, please check this [section](deployment/ce/on-premises/#domain-and-ssl-configuration-examples){:target="_blank"}.
- **`LETSENCRYPT_EMAIL`**: Set the email that you want to use for the certificate.
- **`OPENVIDU_ENTERPRISE_HA_NODE_IPS`**: Set the IP addresses of the **OpenVidu Enterprise Nodes**, separated by commas.
- **`OPENVIDU_ENTERPRISE_HA_REDIS_PASSWORD`**: Set the password for the deployed Redis database in this machine. This password will be used by the **OpenVidu Enterprise Nodes** to connect to this Redis database.
- **`OPENVIDU_ENTERPRISE_HA_S3_CONFIG_BUCKET`**: Set the name of the S3 bucket that you want to use to store the configuration files. This bucket will be created automatically in a Minio server that will be deployed in this machine and will be used by the **OpenVidu Enterprise Nodes**.
- **`OPENVIDU_ENTERPRISE_HA_S3_CONFIG_ACCESS_KEY`**: Set the access key for the S3 bucket.
- **`OPENVIDU_ENTERPRISE_HA_S3_CONFIG_SECRET_KEY`**: Set the secret key for the S3 bucket.
- **`ELASTICSEARCH_USERNAME`**: Set the username for the Elasticsearch and Kibana service.
- **`ELASTICSEARCH_PASSWORD`**: Set the password for the Elasticsearch and Kibana service.

The configuration file for this deployment would look like this:

```bash
DOMAIN_OR_PUBLIC_IP=openvidu.example.io
OPENVIDU_SECRET=OPENVIDU_SECRET
CERTIFICATE_TYPE=letsencrypt
LETSENCRYPT_EMAIL=openvidu@example.io
OPENVIDU_ENTERPRISE_HA_NODE_IPS=10.5.0.6,10.5.0.7
OPENVIDU_ENTERPRISE_HA_REDIS_PASSWORD=REDIS_SECRET
OPENVIDU_ENTERPRISE_HA_S3_CONFIG_BUCKET=openvidu-enterprise
OPENVIDU_ENTERPRISE_HA_S3_CONFIG_ACCESS_KEY=minioadmin
OPENVIDU_ENTERPRISE_HA_S3_CONFIG_SECRET_KEY=MINIO_SECRET
ELASTICSEARCH_USERNAME=elasticadmin
ELASTICSEARCH_PASSWORD=ELASTIC_SECRET
```

> Note the following:
>
> - The domain `openvidu.example.io` should be pointing to the public IP of the machine where you are installing the **Base Services**. If you are using a self-signed certificate, you can use the public IP of the machine instead of the domain. If you are using a Let's Encrypt certificate, you need to set the domain.
> - The `OPENVIDU_ENTERPRISE_HA_NODE_IPS` parameter should contain the IP addresses of the **OpenVidu Enterprise Nodes** that you are going to deploy. In this example, the IPs are `10.5.0.6` and `10.5.0.7`
> - Make sure to change secret values `OPENVIDU_SECRET`, `REDIS_SECRET`, `MINIO_SECRET` and `ELASTIC_SECRET` to your own values. Use alphanumeric characters, dashes and underscores only, and do not use special characters.

**7)** Now, you can start the **Base Services** by executing the following command:

```bash
./base-services start
```

**8)** After deploying **OpenVidu Enterprise HA Base Services**, and if the installation of **Base Services** has been successful, you will be able to access the following services:

- **OpenVidu Call Application**: `https://openvidu.example.io`
- **Kibana**: `https://openvidu.example.io/kibana`
- **Minio**: `https://openvidu.example.io/minio`
- **OpenVidu Inspector**: `https://openvidu.example.io/inspector/`

<hr>

#### Installing OpenVidu Enterprise Nodes

This guide provides step-by-step instructions on how to install and set up OpenVidu Enterprise Nodes. We will set up one node first (10.5.0.6), then replicate this process for the second node (10.6.0.7).

**1)** SSH into the **Base Services** machine (In the example is 10.5.0.6):

**2)** Change to superuser:
```bash
sudo su
```

**3)** Go to `/opt` directory:
```bash
cd /opt
```

**4)** Now execute the following command to download and run the installation script:

<p style="text-align: start">
<code id="code-1"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_enterprise_ha_node_latest.sh | bash</strong></code>
<button id="btn-copy-1" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
                              title="Copy to Clipboard">Copy</button>
</p>

> To deploy a fixed version, including previous ones, replace `latest` with the desired version number like:<br>
> <code>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_enterprise_ha_node_<strong>2.28.0</strong>.sh | bash</code>

This will download all required files into `openvidu` folder and will show this message with basic instructions:

```text
=======================================
OpenVidu Enterprise HA successfully installed.
=======================================

1. Go to openvidu folder:
------------------------------------------------
$ cd openvidu
------------------------------------------------


2. Configure the .env file with your own values:
   Check the documentation for more information:
   https://docs.openvidu.io/en/<version>/deployment/enterprise/on-premises/#high-availability-deployment
------------------------------------------------
$ nano .env
------------------------------------------------


3. Start OpenVidu
------------------------------------------------
$ ./openvidu start
------------------------------------------------
```

**5)** Go to `openvidu` folder:
```bash
cd openvidu
```

**6)** In this directory, you will find the `.env` file. This file contains all the configuration parameters that you need to set for the **OpenVidu Enterprise Node**. The minimal configuration that you need to set is the following:

- **`DOMAIN_OR_PUBLIC_IP`**: Set the domain or public IP of the machine where you are installing the **OpenVidu Enterprise Node**. This domain name should be the same as the one used by the Load Balancer.
- **`OPENVIDU_PRO_LICENSE`**: Set the license of your **OpenVidu License** subscription. You need an [OpenVidu account](https://openvidu.io/account) to purchase it. There's a 15 day free trial waiting for you!
- **`OPENVIDU_SECRET`**: The OpenVidu Secret used by Applications to connect to the **OpenVidu Enterprise Node**.
- **`OPENVIDU_ENTERPRISE_MEDIA_SERVER`**: The media server used by **OpenVidu Enterprise Node**. You can choose between `kurento` or `mediasoup`.
- **`HTTPS_PORT`**: The port used by the Load Balancer to redirect the traffic to the **OpenVidu Enterprise Node**. This port should be the same as the one used in the Load Balancer.
- **`OPENVIDU_ENTERPRISE_HA_NODE_PRIVATE_IP`**: The private IP of the machine where you are installing the **OpenVidu Enterprise Node**.
- **`OPENVIDU_ENTERPRISE_HA_REDIS_HOST`**: The IP or hostname of your Redis deployment.
- **`OPENVIDU_ENTERPRISE_HA_REDIS_PASSWORD`**: The password of your Redis deployment.
- **`OPENVIDU_ENTERPRISE_HA_S3_CONFIG_SERVICE_ENDPOINT`**: The endpoint of your S3 deployment/provider.
- **`OPENVIDU_ENTERPRISE_HA_S3_CONFIG_BUCKET`**: The bucket name you want to use to store the configuration files.
- **`OPENVIDU_ENTERPRISE_HA_S3_CONFIG_ACCESS_KEY`**: The access key of your S3 deployment/provider.
- **`OPENVIDU_ENTERPRISE_HA_S3_CONFIG_REGION`**: The region of your S3 provider. (Usually with on premises deployments like Minio, this value is not required).
- **`OPENVIDU_PRO_ELASTICSEARCH_HOST`**: The http URL of your Elasticsearch deployment/service.
- **`OPENVIDU_PRO_KIBANA_HOST`**: The http URL of your Kibana deployment/service.
- **`ELASTICSEARCH_USERNAME`**: The username of your Elasticsearch deployment/service.
- **`ELASTICSEARCH_PASSWORD`**: The password of your Elasticsearch deployment/service.

The configuration file for this deployment would look like this:

```bash
DOMAIN_OR_PUBLIC_IP=openvidu.example.io
OPENVIDU_PRO_LICENSE=<YOUR_OPENVIDU_PRO_LICENSE>
OPENVIDU_SECRET=OPENVIDU_SECRET
OPENVIDU_ENTERPRISE_MEDIA_SERVER=mediasoup
HTTPS_PORT=443
OPENVIDU_ENTERPRISE_HA_NODE_PRIVATE_IP=10.5.0.6
OPENVIDU_ENTERPRISE_HA_REDIS_HOST=10.5.0.5
OPENVIDU_ENTERPRISE_HA_REDIS_PORT=6379
OPENVIDU_ENTERPRISE_HA_REDIS_PASSWORD=REDIS_SECRET
OPENVIDU_ENTERPRISE_HA_S3_CONFIG_SERVICE_ENDPOINT=http://10.5.0.5:9000
OPENVIDU_ENTERPRISE_HA_S3_CONFIG_BUCKET=openvidu-enterprise
OPENVIDU_ENTERPRISE_HA_S3_CONFIG_ACCESS_KEY=minioadmin
OPENVIDU_ENTERPRISE_HA_S3_CONFIG_SECRET_KEY=MINIO_SECRET
OPENVIDU_PRO_ELASTICSEARCH_HOST=http://10.5.0.5:9200
OPENVIDU_PRO_KIBANA_HOST=http://10.5.0.5:5601
ELASTICSEARCH_USERNAME=elasticadmin
ELASTICSEARCH_PASSWORD=ELASTIC_SECRET
```

Observe that the `OPENVIDU_ENTERPRISE_HA_NODE_PRIVATE_IP` is the private IP of the machine where you are installing the **OpenVidu Enterprise Node**, and the rest of the configuration parameters for Redis, S3, Elasticsearch and Kibana are pointing to the private IP of the machine where you had installed the **Base Services**.

**7)** Start the **OpenVidu Enterprise Node**:

```bash
./openvidu start
```

When you see the following message, the **OpenVidu Enterprise Node** is ready to be used:

```text
replication-manager  | ----------------------------------------------------
replication-manager  |
replication-manager  |    OpenVidu Enterprise HA Node is ready!
replication-manager  |    ---------------------------
replication-manager  |
replication-manager  |    * OpenVidu Server URL: https://openvidu.example.io:443/
replication-manager  |
replication-manager  |    * OpenVidu Dashboard: https://openvidu.example.io:443/inspector
replication-manager  |
replication-manager  |    NOTE: This is a node of an OpenVidu Enterprise Cluster
replication-manager  |      with High Availability. Your Load Balancer configured
replication-manager  |      with the domain name 'openvidu.example.io'
replication-manager  |      should register the private IP of this node: '10.5.0.6'
replication-manager  |
replication-manager  | ----------------------------------------------------
```

**8)** To set up additional nodes, simply replicate the installation process previously detailed. Copy the `.env` file to the new machines, initiate the **OpenVidu Enterprise Node**, and modify the `OPENVIDU_ENTERPRISE_HA_NODE_PRIVATE_IP` to match the private IP of the current installation machine. In our example we would have to set the following value in the `.env` file of the second node:

```bash
OPENVIDU_ENTERPRISE_HA_NODE_PRIVATE_IP=10.5.0.7
```


<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js"></script>
<script type='text/javascript' src='js/fancybox-setup.js'></script>