<h2 id="section-title">Deploy OpenVidu Pro on premise</h2>
<hr>

- **[Deployment instructions](#deployment-instructions)**
    - [1) Prerequisites](#1-prerequisites)
    - [2) Network requirements](#2-network-requirements)
    - [3) Ansible inventory](#3-ansible-inventory)
    - [4) Ansible variables](#4-ansible-variables)
    - [5) Deployment command](#5-deployment-command)
- **[Scalability](#scalability)**
    - [Set the number of Media Nodes on startup](#set-the-number-of-media-nodes-on-startup)
    - [Change the number of Media Nodes on the fly](#change-the-number-of-media-nodes-on-the-fly)
- **[Updating OpenVidu Pro configuration](#updating-openvidu-pro-configuration)**
- **[Troubleshooting](#troubleshooting)**

---

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
    Before deploying OpenVidu Pro you need to <strong><a href="/account" target="_blank">create an OpenVidu account</a></strong> to get your license key.<br>There's a <strong>15 day free trial</strong> waiting for you!
</div>
</div>

## Deployment instructions

### 1) Prerequisites

#### In your local machine

You need **Ansible** installed on your laptop or wherever you are running this playbook. You can install Ansible with:

```bash
sudo apt-add-repository -y ppa:ansible/ansible
sudo apt-get update
sudo apt-get install -y ansible
```

Besides you need to install this role for Docker:

```bash
sudo ansible-galaxy install -p /etc/ansible/roles geerlingguy.docker
```

#### In your cluster machines

You must have **at least 2 different instances** with a clean installation of **Ubuntu 16.04**

- One instance for the **OpenVidu Server Pro Node**
- One instance for a **Media Node**

You can actually have as many instances as you want for Media Nodes. The number of Media Nodes determines the size of your cluster: the more Media Nodes, the more video sessions your cluster will be able to handle. Check out [Scalability](/openvidu-pro/scalability/){:target="_blank"} section for further details.

Besides, be sure to meet the following criteria in your cluster instances:

- Have at least a minimum of **2 CPUs and 8GB of RAM**, and a generous network bandwidth
- Have **Python 3** installed (check version with `python3 --version`)

---

### 2) Network requirements

These ports need to be opened and publicly accessible for each type of instance in your cluster:

#### OpenVidu Server Pro instance

- **443 TCP** (OpenVidu Inspector is served on port 443 by default)
- **4443 TCP** (OpenVidu Server Pro REST API endpoint listens on port 4443 by default)
- **3478 TCP** (coturn listens on port 3478 by default)
- **3478 UDP** (opening also UDP port has been proved to facilitate connections with certain type of clients)

#### Media Node instances

- **40000 - 65535 UDP** (WebRTC connections with clients may be established using a random port inside this range)
- **40000 - 65535 TCP** (WebRTC connections with clients may be established using a random port inside this range, if UDP can't be used because client network is blocking it)
- **8888 TCP (must only be accessible for OpenVidu Server Pro instance)** (Kurento Media Server listens on port 8888 by default)


> **NOTE**: in production environments you will have to configure a **fully qualified domain name** in your **OpenVidu Server Pro instance**. You can register a FQDN for the OpenVidu Server Pro instance using a DNS server, pairing the OpenVidu Server Pro instance public IP with your domain name. This is the only way to later set up a valid certificate in OpenVidu Server Pro instance, so clients don't get a warning when connecting to a video session

---

### 3) Ansible inventory

Ansible uses an inventory file to know which instances connect to and how to configure them. Let's clone OpenVidu's Ansible repository to modify this file and prepare the cluster deployment:

```bash
git clone https://github.com/OpenVidu/openvidu-pro-clustering
cd openvidu-pro-clustering # This will be our working directory from now on
git fetch --all
git checkout origin/2.12.0-on-premise # Latest release
```

File `./inventory.yaml` defines our cluster instances. By default it is ready to use a single Media Node, but you can add as many _media-node_ hosts as you want, as you can see in the commented lines.

The IPs in the inventory file should be the addresses which can be reached from the Ansible host. In example, if your Ansible host is on the 192.168.x.x network should be ok to use that address range in your inventory file.

```yaml
---
all:
  hosts:
    openvidu-server:
      ansible_host: OPENVIDU_SERVER_IP
    media-node-1:
      ansible_host: MEDIA_NODE_1_IP
    # media-node-2:
    #   ansible_host: MEDIA_NODE_2_IP
    # ...
    # media-node-N:
    #   ansible_host: MEDIA_NODE_N_IP
  vars:
      ansible_become: true
      ansible_user: USER
      ansible_ssh_private_key_file: /PATH/TO/SSH_public_key
  children:
    media-nodes:
      hosts:
        media-node-1:
      #   media-node-2:
      #   ...
      #   media-node-N:
    openvidu:
      hosts:
        openvidu-server:
```

You need to change:

- **Variable `ansible_user`**: the user you use to connect to the instances, i.e. Ubuntu Server Cloud uses `ubuntu`. If you've deployed those instances in OpenStack using Ubuntu Official Image, `ubuntu` will be the user.
- **Variable `ansible_ssh_private_key_file`**: path to the RSA private key you use to connect to your instances.
- **Value `OPENVIDU_SERVER_IP`**: public IP to connect to the OpenVidu Server Pro instance.
- **Value `MEDIA_NODE_X_IP`**: public IP to connect to the Kurento Media Server instance(s).

---

### 4) Ansible variables

In `./group_vars/all` file you will find all the parameters used to configure the infrastructure.

One of them is your **OpenVidu Pro license key**. You need an **[OpenVidu account](/account){:target="_blank"}** to purchase it. There's a **15 day free trial** waiting for you!

> **WARNING**: when giving value to the variables in `./group_vars/all` file, go through all of them very carefully. Some of them do not have default values, as they are dependant on your infrastructure. Be also very careful to not delete any of them, as the deployment will fail if any variable is missing. For further information about them check out [OpenVidu Server CE configuration](/reference-docs/openvidu-server-params/){:target="_blank"} and [OpenVidu Server Pro configuration](/openvidu-pro/reference-docs/openvidu-server-pro-params/){:target="_blank"}

---

### 5) Deployment command

First time you connect to an instance through SSH, it will ask you to confirm the instance's fingerprint, so try to **login into all the instances** to accept the fingerprint so Ansible can automatically do the job.

```bash
ssh -i /PATH/TO/SSH_public_key USER@INSTANCE_IP
```

Check that Ansible can access the instances. The following command (run it in the repository root folder) will perform a _ping_ to all the instances declared in `./inventory.yaml` file. You should see a successful log message for each one of them if everything is correct.

```bash
ansible -i inventory.yaml -m ping all
```

Finally, launch the Ansible's playbook to deploy your cluster:

```bash
ansible-playbook -i inventory.yaml play.yaml
```

The playbook command will end with the following log:

```console
*********************************************************
 TASK [check-app-ready : check every 60 seconds for 10 attempts if openvidu is up and ready]
*********************************************************
FAILED - RETRYING: check every 60 seconds for 10 attempts if openvidu is up and ready (10 retries left).
FAILED - RETRYING: check every 60 seconds for 10 attempts if openvidu is up and ready ( 9 retries left).
ok: [openvidu-server]

*********************************************************
 PLAY RECAP
*********************************************************
kurento-server-1       : ok=21  changed=18  unreachable=0   failed=0   skipped=0   rescued=0   ignored=0
kurento-server-2       : ok=21  changed=18  unreachable=0   failed=0   skipped=0   rescued=0   ignored=0
openvidu-server        : ok=53  changed=43  unreachable=0   failed=0   skipped=14  rescued=0   ignored=0
```

Once the playbook command has successfully finished, you will have OpenVidu Pro services accessible through the following URLs:

- **OpenVidu Pro Inspector** ([more info](/openvidu-pro/openvidu-inspector/){:target="_blank"}) : `https://YOUR_DNS_NAME/inspector`
- **OpenVidu Pro Kibana dashboard** ([more info](/openvidu-pro/detailed-session-monitoring/){:target="_blank"}) :  `https://YOUR_DNS_NAME/kibana`
- **OpenVidu Pro REST endpoint** ([more info](/openvidu-pro/reference-docs/REST-API-pro/){:target="_blank"}) : `https://YOUR_DNS_NAME:4443` (or the port you defined in property `openvidu_server_port` in file `./group_vars/all`)

> Regarding the compatibility of **openvidu-browser** and **server SDKs** (REST API, openvidu-java-client, openvidu-node-client), use the same version numbers as stated for openvidu-server in [Releases page](/releases/){:target="_blank"}. For example, for OpenVidu Pro 2.10.0, use the artifact versions indicated in [2.10.0 release table](/releases#2100){:target="_blank"}

<br>

---

## Scalability

### Set the number of Media Nodes on startup

[Deployment instructions](#deployment-instructions) inherently contain all the requirements needed to deploy your OpenVidu Pro cluster with a specific initial number of Media Nodes. You first have to prepare the maximum number of Media Nodes you want. For example, if you want your cluster to be able to grow up to 3 Media Nodes, then you will need 4 hosts in your infrastructure: one for the OpenVidu Server Pro Node and three for each Media Node. Check out the [Cluster machines prerequisites](#in-your-cluster-machines).

Then you just need to properly [configure the `inventory.yml` file](#3-ansible-inventory) with each instance IP before running Ansible's playbook. This way your cluster will start with the desired number of Media Nodes.

### Change the number of Media Nodes on the fly

You can launch and drop Media Nodes dynamically in two different ways:

#### From OpenVidu Inspector

In Cluster page you can launch and drop Media Nodes just by pressing buttons. You need to have the new Media Node already up and running (see [Launching new Media Nodes with Ansible](#launching-new-media-nodes-with-ansible)) and define its URI like this: `ws://NEW_MEDIA_NODE_IP:8888/kurento`

<div class="row">
    <div style="margin: 5px 15px 5px 15px">
        <a data-fancybox="gallery-pro3" href="/img/docs/openvidu-pro/pro19.png"><img class="img-responsive img-pro img-pro-small" src="/img/docs/openvidu-pro/pro19.png"/></a>
    </div>
</div>

> **WARNING**: Launching/Dropping Media Nodes from OpenVidu Inspector in On Premises deployments will not automatically start/terminate your instances:
>
> - To launch a new Media Node you need to have the new Media Node already up and running (see [Launching new Media Nodes with Ansible](#launching-new-media-nodes-with-ansible)) and define its URI like stated in the image above.<br><br>
> - To drop an existing Media Node you will have to terminate the instance yourself after clicking the terminate button, if that's what you want. Clicking the button will just disconnect the Media Node from the cluster (you won't be charged for it anymore), but won't terminate the machine. You can listen to [mediaNodeStatusChanged](/openvidu-pro/reference-docs/openvidu-server-pro-cdr/#medianodestatuschanged){:target="_blank"} event through OpenVidu Webhook to know when you can safely terminate your instance (listen to `terminated` status).

#### With OpenVidu Pro REST API

You can programmatically launch and drop Media Nodes from your application by consuming OpenVidu Pro REST API.

- **Launch a Media Node**: **[POST /pro/media-nodes](/openvidu-pro/reference-docs/REST-API-pro#post-promedia-nodes){:target="_blank"}**
- **Drop a Media Node**: **[DELETE /pro/media-nodes](/openvidu-pro/reference-docs/REST-API-pro/#delete-promedia-nodesltmedia_node_idgt){:target="_blank"}**

> **WARNING**: there are some important aspects to keep in mind when launching and dropping Media Nodes through REST API in on premises OpenVidu Pro clusters:
>
> - Trying to drop a Media Node which is currently hosting an OpenVidu Session will fail by default. You can manage the drop policy when calling [DELETE /pro/media-nodes](/openvidu-pro/reference-docs/REST-API-pro/#delete-promedia-nodesltmedia_node_idgt){:target="_blank"} through parameter `deletion-strategy`.<br><br>
> - Launching/Dropping Media Nodes in on premise deployments will not automatically start/terminate your instances:
>     - To launch a new Media Node you are required to have the Media Node already running (see [Launching new Media Nodes with Ansible](#launching-new-media-nodes-with-ansible)). Then you must provide the Media Node's URI when calling [POST /pro/media-nodes](/openvidu-pro/reference-docs/REST-API-pro#post-promedia-nodes){:target="_blank"} (using `uri` query parameter) or [like this in OpenVidu Inspector](#from-openvidu-inspector).
>     - To drop an existing Media Node you will have to terminate the instance yourself after successfully calling [DELETE /pro/media-nodes](/openvidu-pro/reference-docs/REST-API-pro/#delete-promedia-nodesltmedia_node_idgt){:target="_blank"}, if that's what you want. You can listen to [mediaNodeStatusChanged](/openvidu-pro/reference-docs/openvidu-server-pro-cdr/#medianodestatuschanged){:target="_blank"} event through OpenVidu Webhook to know when you can safely terminate your instances (listen to `terminated` status).

#### Launching new Media Nodes with Ansible

To easily launch one or more new Media Nodes, you just have to run the Ansible playbook again with the following change in **`inventory.yml`** file: comment the _openvidu-server_ elements. We just want to deploy Media Nodes, not OpenVidu Server Pro Node. Remove `openvidu-server` from `all.hosts` and `all.children` entries and add as many `media-node-N` elements as you want.

```yaml
---
all:
  hosts:
    #openvidu-server:
    #  ansible_host: OPENVIDU_SERVER_IP
    media-node-1:
      ansible_host: MEDIA_NODE_1_IP
    # ...
    # media-node-N:
    #   ansible_host: MEDIA_NODE_N_IP
  vars:
      ansible_become: true
      ansible_user: USER
      ansible_ssh_private_key_file: /PATH/TO/SSH_public_key
  children:
    media-nodes:
      hosts:
        media-node-1:
      #   ...
      #   media-node-N:
    # openvidu:
    #   hosts:
    #     openvidu-server:
```

Then you can simply run the playbook again:

```bash
ansible-playbook -i inventory.yaml play.yaml
```

This will install a new Media Node in your empty instance(s) without interfering with your existing OpenVidu Pro cluster. After successful installation, you can add the new Media Node to the cluster from [OpenVidu Inspector](#from-openvidu-inspector) or with [REST API Pro](#with-openvidu-pro-rest-api).

<br>

---

## Updating OpenVidu Pro configuration

You may want to change the current configuration of an existing OpenVidu Pro cluster. This configuration includes all of the parameters listed in these pages:

- [OpenVidu Server CE configuration](/reference-docs/openvidu-server-params){:target="_blank"}
- [OpenVidu Server Pro configuration](/openvidu-pro/reference-docs/openvidu-server-pro-params){:target="_blank"}

When deploying an OpenVidu Pro cluster you give value to these parameters directly or indirectly, depending on the [deployment environment](/openvidu-pro/scalability/#how-to-deploy-your-openvidu-pro-cluster){:target="_blank"}. Once the cluster is running, there are different ways you can update the value of the configuration parameters. Take into account that all of them require restarting your OpenVidu Server Pro process, so **any active OpenVidu Session will be terminated**.

### 1) With OpenVidu Inspector

OpenVidu Inspector allows you to restart the OpenVidu Server Pro process from **Config** page just by filling a formulary.<br>More information [here](/openvidu-pro/openvidu-inspector#programmatic-reset){:target="_blank"}.

> **NOTE 1**: take into account that not all configuration properties are able to be updated this way<br>
> **NOTE 2**: new values will be stored and remembered, so they will be used when OpenVidu Server Pro is restarted in the future

### 2) With OpenVidu Pro REST API

You can consume REST API method **[POST /pro/restart](/openvidu-pro/reference-docs/REST-API-pro/#post-prorestart){:target="_blank"}** to programmatically restart the OpenVidu Server Pro process and update its configuration values.

> **NOTE 1**: take into account that not all configuration properties are able to be updated this way<br>
> **NOTE 2**: new values will be stored and remembered, so they will be used when OpenVidu Server Pro is restarted in the future

### 3) Manually connecting through SSH

The ultimate and most definitive way of updating the configuration parameters of an OpenVidu Pro cluster is connecting to the OpenVidu Server Pro Node through SSH and changing the desired values:

1. SSH to the OpenVidu Server Pro machine using your private rsa key
2. Update file `/opt/openvidu/application.properties` with the new configuration values
3. Restart OpenVidu Server Pro with `sudo systemctl restart openvidu`

To validate your changes and check that everything went well, you should take a look to OpenVidu Server Pro logs. If there were any errors with any configuration parameter, OpenVidu Server Pro log should help you fix the issue. You can show last 200 lines of the logs with command `journalctl -n 200 -u openvidu | cat`

<br>

---

## Troubleshooting

To troubleshoot problems with OpenVidu Pro on premises deployments follow these steps:

- **1)**  Provide to us `ansible-playbook` logs (the output of the `ansible-playbook` command)

- **2)**  SSH in to the **OpenVidu Server Pro Node** and provide to us Openvidu logs:

    - `journalctl -u openvidu > openvidu.log`

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

<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/brands.css" integrity="sha384-Px1uYmw7+bCkOsNAiAV5nxGKJ0Ixn5nChyW8lCK1Li1ic9nbO5pC/iXaq27X5ENt" crossorigin="anonymous">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/fontawesome.css" integrity="sha384-BzCy2fixOYd0HObpx3GMefNqdbA7Qjcc91RgYeDjrHTIEXqiF00jKvgQG0+zY/7I" crossorigin="anonymous">

<link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.css"/>
<link rel="stylesheet" type="text/css" href="/css/slick-theme.css"/>
<script type="text/javascript" src="//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js"></script>

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
    $('.pro-gallery-steps').slick({
      autoplay: false,
      arrows: true,
      prevArrow: '<div class="slick-btn slick-btn-prev"><i class="icon ion-chevron-left"></i></div>',
      nextArrow: '<div class="slick-btn slick-btn-next"><i class="icon ion-chevron-right"></i></div>',
      dots: true,
      infinite: false,
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