<h2 id="section-title">Deploy OpenVidu Pro on premises</h2>
<hr>

- **[Deployment instructions](#deployment-instructions)**
    - [1) Prerequisites](#1-prerequisites)
    - [2) OpenVidu Server Pro Node](#2-openvidu-server-pro-node)
        - [2.1) Deployment](#21-deployment)
        - [2.2) Configuration](#22-configuration)
        - [2.3) Execution](#23-execution)
        - [2.4) Administration](#24-administration)
    - [3) Media Nodes](#3-media-nodes)
        - [3.1) Deployment](#31-deployment)
        - [3.2) Configuration](#32-configuration)
        - [3.3) Execution](#33-execution)
        - [3.4) Administration](#34-administration)
- **[Scalability](#scalability)**
    - [Set the number of Media Nodes on startup](#set-the-number-of-media-nodes-on-startup)
    - [Change the number of Media Nodes on the fly](#change-the-number-of-media-nodes-on-the-fly)
- **[Updating OpenVidu Pro configuration](#updating-openvidu-pro-configuration)**
- **[Troubleshooting](#troubleshooting)**
    - [Troubleshooting OpenVidu Server Pro Node](#troubleshooting-openvidu-server-pro-node)
    - [Troubleshooting Media Nodes](#troubleshooting-media-nodes)

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
    Before deploying OpenVidu Pro you need to <strong><a href="https://openvidu.io/account" target="_blank">create an OpenVidu account</a></strong> to get your license key.<br>There's a <strong>15 day free trial</strong> waiting for you!
</div>
</div>

## Deployment instructions

OpenVidu Pro is deployed on premises in a cluster of machines with **Docker** and **Docker Compose**.

> **NOTE** : Docker basic knowledge is not required, but recommended. If you are completely new to Docker and containers, take a few minutes to read the official [Docker _Get started_](https://docs.docker.com/get-started/){:target="_blank"} documentation.

### 1) Prerequisites

You must have **at least 2 different instances** with a clean installation of **any modern Linux distribution**.

- One instance for the **OpenVidu Server Pro Node**
- One instance for a **Media Node**

You can actually have as many instances as you want for Media Nodes. The number of Media Nodes determines the size of your cluster: the more Media Nodes, the more video sessions your cluster will be able to handle. Check out [Scalability](openvidu-pro/scalability/){:target="_blank"} section for further details.

Once you have your instances ready, be sure to meet the following criteria in them:

- **[Install Docker](https://docs.docker.com/engine/install/#server){:target="_blank"}**

- **[Install Docker Compose](https://docs.docker.com/compose/install/){:target="_blank"}**

- **2 CPUs and 8GB of RAM at least**, as well as a generous network bandwidth

- **Opened ports in _OpenVidu Server Pro Node_**

    - **22 TCP**: to connect using SSH to admin OpenVidu.
    - **80 TCP**: if you select Let's Encrypt to generate an SSL certificate this port is used by the generation process.
    - **443 TCP**: OpenVidu Inspector is served in standard https port.
    - **3478 TCP+UDP**: used by TURN server to resolve clients IPs.
    - **40000 - 65535 TCP+UDP**: used by TURN server to establish relayed media connections.<br><br>

- **Opened ports in _Media Nodes_**

    - **22 TCP**: to connect using SSH to admin OpenVidu.
    - **40000 - 65535 TCP+UDP**: used by Kurento Media Server to establish media connections.
    - **8888 TCP**: Kurento Media Server handler listens on port 8888. <strong style="color: #990000">WARNING!!</strong> Port 8888 **must only be accessible for OpenVidu Server Pro instance**. Access trough this port must be restricted from the Internet, or anyone could spy your sessions.<br><br>

- **Get yourself a domain name**: OpenVidu Pro is deployed using HTTPS because it is mandatory to use WebRTC. Then, if you do not have a domain name, an ugly warning will appear to your users when enter to your site. And of course you can suffer a man-in-the-middle attack. So you will need a domain name pointing to the **OpenVidu Server Pro Node** public IP. You don't need a valid SSL certificate as one can be automatically created for you by Let's Encrypt during the installation process.

<br>

---

### 2) OpenVidu Server Pro Node

#### 2.1) Deployment

Connect through SSH to Openvidu Server Pro instance. When you are on a terminal of the instance, change to root user. Root permissions are necessary to deploy OpenVidu.

```bash
sudo su
```

The recommended folder to install OpenVidu Pro is **`/opt`**. Every other instruction in the documentation regarding on premises deployment assumes this installation path.

```bash
cd /opt
```

Now execute the following command to download and run the installation script.

<p style="text-align: start">
<code id="code-1"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_pro_latest.sh | bash</strong></code>
<button id="btn-copy-1" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
                              title="Copy to Clipboard">Copy</button>
</p>

This will download all required files into `openvidu` folder and will show this message with basic instructions:

```html
Openvidu PRO successfully installed

1. Go to openvidu folder:
$ cd openvidu

2. Configure OPENVIDU_DOMAIN_OR_PUBLIC_IP, OPENVIDU_PRO_LICENSE, OPENVIDU_SECRET, and KIBANA_PASSWORD in .env file:
$ nano .env

3. Start OpenVidu
$ ./openvidu start

For more information, check readme.md
```

> To deploy a fixed version, including previous ones, replace `latest` with the desired version number.<br>
> For example: <code>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_pro_<strong>2.12.0</strong>.sh | bash</code>

---

#### 2.2) Configuration

OpenVidu Pro configuration is specified in the **`.env`** file with environment variables.

- You _must_ give a value to properties **`OPENVIDU_DOMAIN_OR_PUBLIC_IP`**, **`OPENVIDU_SECRET`** and **`KIBANA_PASSWORD`**. Default empty values will fail. 
- You _must_ also provide a value for  **`OPENVIDU_PRO_LICENSE`**. You need an **[OpenVidu account](https://openvidu.io/account){:target="_blank"}** to purchase it. There's a **15 day free trial** waiting for you!
- You can change the **`CERTIFICATE_TYPE`** if you have a valid domain name. Setting this property to `letsencrypt` will automatically generate a valid certificate for you (it is required to set property `LETSENCRYPT_EMAIL`). Or if for any unknown reason you prefer to use your own certificate, set the property to `owncert` and place the certificate files as explained.
- All other configuration properties come with sane defaults. You can go through them and change whatever you want. Visit [OpenVidu CE configuration](reference-docs/openvidu-config/){:target="_blank"} and [OpenVidu Pro configuration](openvidu-pro/reference-docs/openvidu-pro-config/){:target="_blank"} for further information.

The **`.env`** file is pretty self-explanatory. It looks like this:

```bash
# OpenVidu configuration
# ----------------------
# Documentation: https://docs.openvidu.io/en/stable/reference-docs/openvidu-config/

# NOTE: This file doesn't need to quote assignment values, like most shells do.
# All values are stored as-is, even if they contain spaces, so don't quote them.

# Domain name. If you do not have one, the public IP of the machine.
# For example: 198.51.100.1, or openvidu.example.com
OPENVIDU_DOMAIN_OR_PUBLIC_IP=

# OpenVidu PRO License
OPENVIDU_PRO_LICENSE=

# OpenVidu SECRET used for apps to connect to OpenVidu server and users to access to OpenVidu Dashboard
OPENVIDU_SECRET=

# Certificate type:
# - selfsigned:  Self signed certificate. Not recommended for production use.
#                Users will see an ERROR when connected to web page.
# - owncert:     Valid certificate purchased in a Internet services company.
#                Please put the certificates files inside folder ./owncert
#                with names certificate.key and certificate.cert
# - letsencrypt: Generate a new certificate using letsencrypt. Please set the
#                required contact email for Let's Encrypt in LETSENCRYPT_EMAIL
#                variable.
CERTIFICATE_TYPE=selfsigned

# If CERTIFICATE_TYPE=letsencrypt, you need to configure a valid email for notifications
LETSENCRYPT_EMAIL=user@example.com

...
```

<br>

##### Videoconference application

By default, the [OpenVidu Call](demos/openvidu-call/){:target="_blank"} application is deployed alongside OpenVidu Platform. It is accessible in the URL:

```console
https://openvidu_domain_or_public_ip/
```

This application is defined in file `docker-compose.override.yml`. To disable OpenVidu Call application, you can delete the file `docker-compose.override.yml` (or just rename it in case you want to enable it again in the future).

You can configure any other application updating the content of `docker-compose.override.yml` to use any other Docker container, with the following requirements:

- Application server port must be binded to 5442 in the host, as this port is used by NGINX to publish your app in the default HTTPS port (443).
- The app must be served in plain HTTP as NGINX is the responsible of managing SSL certificate, so disable HTTPS and SSL in your app.
- Application has to know OpenVidu Server URL. You can use the environment variables ${OPENVIDU_DOMAIN_OR_PUBLIC_IP} and ${OPENVIDU_SECRET} in `docker-compose.override.yml` file.
- The application and OpenVidu platform are deployed in the same domain. For that reason, the following URLs are reserved for OpenVidu and you cannot use them in the application:
    - `/api/`
    - `/openvidu/`
    - `/dashboard/`

---

#### 2.3) Execution

To start OpenVidu Platform (and the application if enabled) execute this command:

```
./openvidu start
```

All docker images for services will be downloaded (only the first time) and executed.

The first part of the log shows how docker-compose command executes all services:

```
Creating openvidu_kibana_1          ... done
Creating openvidu_app_1             ... done
Creating openvidu_elasticsearch_1   ... done
Creating openvidu_coturn_1          ... done
Creating openvidu_redis_1           ... done
Creating openvidu_openvidu-server_1 ... done
Creating openvidu_nginx_1           ... done
```

Then, `openvidu-server` service logs are shown. When OpenVidu Platform is ready you will see this message:

```
----------------------------------------------------

   OpenVidu Platform is ready!
   ---------------------------

   * OpenVidu Server: https://server/

   * OpenVidu Dashboard: https://server/dashboard/

----------------------------------------------------
```

You can press `Ctrl+C` to come back to the shell and OpenVidu Pro will be executed in the background.

<br>

##### Available services

- Consume [OpenVidu REST API Pro](openvidu-pro/reference-docs/REST-API-pro/){:target="_blank"} through `https://server/`
- If the [application](#videoconference-application) is enabled, it will also be available at `https://server/`
- You can access [OpenVidu Inspector](openvidu-pro/openvidu-inspector/){:target="_blank"} at `https://server/inspector/`
- You can access [Kibana](openvidu-pro/detailed-session-monitoring/){:target="_blank"} at `https://server/kibana/`

---

#### 2.4) Administration

Run the following commands to manage OpenVidu Pro service:

- Start OpenVidu Pro

        ./openvidu start

- Stop OpenVidu Pro

        ./openvidu stop

- Restart OpenVidu Pro

        ./openvidu restart

- Show logs of OpenVidu Pro

        ./openvidu logs

> To change current configuration, you just need to update `.env` configuration file with the new desired values and run `./openvidu restart` command.

<br>

---

### 3) Media Nodes

#### 3.1) Deployment

Follow these steps to add one Media Nodes to the cluster. You can add as many Media Nodes as you want by repeating these instructions in different instances.

Connect through SSH to the Media Node instance. When you are on a terminal of the instance, change to root user. Root permissions are necessary to deploy OpenVidu.

```bash
sudo su
```

The recommended folder to install the Media Node is **`/opt`**. Every other instruction in the documentation regarding on premises deployment assumes this installation path.

```bash
cd /opt
```

Now execute the following command to download and run the installation script.

<p style="text-align: start">
<code id="code-2"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_media_node_latest.sh | bash</strong></code>
<button id="btn-copy-2" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
                              title="Copy to Clipboard">Copy</button>
</p>

This will download all required files into `kms` folder and will show this message with basic instructions:

```html
Media Node successfully installed.

1. Go to kms folder:
$ cd kms

2. Start KMS
$ ./media_node start

For more information, check readme.md
```

> To deploy a fixed version, including previous ones, replace `latest` with the desired version number.<br>
> For example: <code>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_media_node_<strong>2.12.0</strong>.sh | bash</code>

<br>

---

#### 3.2) Configuration

No changes in the default configuration are necessary in Media Nodes.

<br>

---

#### 3.3) Execution

To start the Media Node execute this command:

```
./media_node start
```

All docker images for services will be downloaded (only the first time) and executed.

The first part of the log shows how docker-compose command executes all services:

```
Creating kms_kms_1   ... done
Creating kms_nginx_1 ... done
```

> **WARNING:** after the Media Node service is up and running, you must manually add the Media Node to the cluster. Follow instructions in section **[Change the number of Media Nodes on the fly](#change-the-number-of-media-nodes-on-the-fly)** to do so.

<br>

---

#### 3.4) Administration

Run the following commands to manage Media Node service:

- Start Media Node

        ./media_node start

- Stop Media Node

        ./media_node stop

- Restart Media Node

        ./media_node restart

- Show logs of Media Node

        ./media_node logs

> **WARNING 1:** after the Media Node service is up and running, you must manually add the Media Node to the cluster before you can start using it. Follow instructions in section **[Change the number of Media Nodes on the fly](#change-the-number-of-media-nodes-on-the-fly)** to do so.

> **WARNING 2:** a reboot of [OpenVidu Server Pro Node](#2-openvidu-server-pro-node) will make necessary to manually add all the running Media Nodes to the cluster before you can start using them. Follow instructions in section **[Change the number of Media Nodes on the fly](#change-the-number-of-media-nodes-on-the-fly)** to do so.

<br>

---

## Scalability

### Set the number of Media Nodes on startup

To deploy your OpenVidu Pro cluster with a specific initial number of Media Nodes you just need to install the Media Node service in as many machines as Media Nodes you want. For example, if you want your cluster to be able to grow up to 3 Media Nodes, then you will need 4 machines in your infrastructure: 1 for the OpenVidu Server Pro Node and 3 for each Media Node.

Check out the [Prerequisites](#1-prerequisites) section and make sure that all of your machines intended to run a Media Node service fulfill the requirements for doing so. Then [install and run the Media Node service](#3-media-nodes) in all of them.

### Change the number of Media Nodes on the fly

#### From OpenVidu Inspector

In Cluster page you can add and remove Media Nodes from your cluster just by pressing buttons. To add a Media Node, you need to have it already up and running (follow steps in [Media Nodes section](#3-media-nodes) to install and run one) and define its URI like this: `ws://NEW_MEDIA_NODE_IP:8888/kurento`

<div class="row">
    <div style="margin: 5px 15px 5px 15px">
        <a data-fancybox="gallery-pro3" href="img/docs/openvidu-pro/pro19.png"><img class="img-responsive img-pro img-pro-small" src="img/docs/openvidu-pro/pro19.png"/></a>
    </div>
</div>

> **WARNING**: adding/removing Media Nodes from OpenVidu Inspector in On Premises deployments will not automatically launch/terminate your physical machines:
>
> - To add a new Media Node you need to have the new Media Node already up and running (follow steps in [Media Nodes section](#3-media-nodes) to install and run one) and define its URI like stated in the image above.<br><br>
> - To drop an existing Media Node you will have to terminate the physical machine yourself after successfully calling [DELETE /pro/media-nodes](openvidu-pro/reference-docs/REST-API-pro/#delete-promedia-nodesltmedia_node_idgt){:target="_blank"}, if that's what you want. Usually you will want to wait until the last of the sessions hosted in this Media Node is closed before you remove it. Then, you can listen to [mediaNodeStatusChanged](openvidu-pro/reference-docs/openvidu-server-pro-cdr/#medianodestatuschanged){:target="_blank"} event through OpenVidu Webhook to know when you can safely terminate your instances (listen to `terminated` status).

#### With OpenVidu Pro REST API

You can programmatically add and remove Media Nodes from your cluster by consuming OpenVidu Pro REST API.

- **Add a Media Node**: **[POST /pro/media-nodes](openvidu-pro/reference-docs/REST-API-pro#post-promedia-nodes){:target="_blank"}**
- **Remove a Media Node**: **[DELETE /pro/media-nodes](openvidu-pro/reference-docs/REST-API-pro/#delete-promedia-nodesltmedia_node_idgt){:target="_blank"}**

> **WARNING**: there are some important aspects to keep in mind when launching and dropping Media Nodes through REST API in on premises OpenVidu Pro clusters:
>
> - Trying to drop a Media Node which is currently hosting an OpenVidu Session will fail by default. You can manage the drop policy when calling [DELETE /pro/media-nodes](openvidu-pro/reference-docs/REST-API-pro/#delete-promedia-nodesltmedia_node_idgt){:target="_blank"} through parameter `deletion-strategy`.<br><br>
> - Launching/Dropping Media Nodes in on premises deployments will not automatically start/terminate your physical machines:
>     - To launch a new Media Node you are required to have the Media Node already running (follow steps in [Media Nodes section](#3-media-nodes) to install and run one). Then you must provide the Media Node's URI when calling [POST /pro/media-nodes](openvidu-pro/reference-docs/REST-API-pro#post-promedia-nodes){:target="_blank"} using **`uri`** query parameter.
>     - To drop an existing Media Node you will have to terminate the physical machine yourself after successfully calling [DELETE /pro/media-nodes](openvidu-pro/reference-docs/REST-API-pro/#delete-promedia-nodesltmedia_node_idgt){:target="_blank"}, if that's what you want. Usually you will want to wait until the last of the sessions hosted in this Media Node is closed before you remove it. You can achieve this by setting the [Media Node status](openvidu-pro/scalability/#openvidu-pro-cluster-events){:target="_blank"} to `waiting-idle-to-terminate`. Then, you can listen to [mediaNodeStatusChanged](openvidu-pro/reference-docs/openvidu-server-pro-cdr/#medianodestatuschanged){:target="_blank"} event through OpenVidu Webhook to know when you can safely terminate your instance. The moment will come when `terminated` status is achieved: at that point it is safe to shut down the machine hosting the Media Node.

<br>

---

## Updating OpenVidu Pro configuration

You may want to change the current configuration of an existing OpenVidu Pro cluster. This configuration includes all of the parameters listed in these pages:

- [OpenVidu CE configuration](reference-docs/openvidu-config){:target="_blank"}
- [OpenVidu Pro configuration](openvidu-pro/reference-docs/openvidu-pro-config){:target="_blank"}

Once the cluster is running, there are different ways you can update the value of the configuration parameters. Take into account that all of them require restarting your OpenVidu Server Pro process, so **any active OpenVidu Session will be terminated**.

### 1) With OpenVidu Inspector

OpenVidu Inspector allows you to restart the OpenVidu Server Pro process from **Config** page just by filling a formulary.<br>More information [here](openvidu-pro/openvidu-inspector#programmatic-reset){:target="_blank"}.

> **NOTE 1**: take into account that not all configuration properties are able to be updated this way<br>
> **NOTE 2**: new values will be stored and remembered, so they will be used when OpenVidu Server Pro is restarted in the future

### 2) With OpenVidu Pro REST API

You can consume REST API method **[POST /pro/restart](openvidu-pro/reference-docs/REST-API-pro/#post-prorestart){:target="_blank"}** to programmatically restart the OpenVidu Server Pro process and update its configuration values.

> **NOTE 1**: take into account that not all configuration properties are able to be updated this way<br>
> **NOTE 2**: new values will be stored and remembered, so they will be used when OpenVidu Server Pro is restarted in the future

### 3) Manually connecting through SSH

The ultimate and most definitive way of updating the configuration parameters of an OpenVidu Pro cluster is connecting to the OpenVidu Server Pro Node through SSH and changing the desired values:

1. SSH to the OpenVidu Server Pro machine using your private rsa key
2. Using root user with `sudo su` command, go to OpenVidu Pro installation folder (default and recommended is `/opt/openvidu`)
2. Update file `.env` with the new configuration values
3. Restart OpenVidu Server Pro with `./openvidu restart`

Keep an eye on the OpenVidu logs that will automatically display after restarting the service to check that everything went well.

<br>

---

## Troubleshooting

### Troubleshooting Openvidu Server Pro Node

### Knonw errors

#### Bug when restarting from Inspector or REST

Restarting OpenVidu server from inspector of with REST API is broken. Avoid it. 

We detected a last minute bug when you try to restart the platform using a the web inspector or using `/restart` endpoint in the REST API. If you try to do, you will get the following error in `openvidu-server` logs:

```
openvidu-server_1  | [INFO] 2020-04-24 02:33:57,221 [main] io.openvidu.server.kurento.kms.KmsManager - OpenVidu Server Pro is deployed with 'OPENVIDU_PRO_CLUSTER_MODE' set to 'auto'. Ignoring uris defined in 'KMS_URIS'
openvidu-server_1  | [INFO] 2020-04-24 02:33:57,227 [main] io.openvidu.server.core.SessionManager - Garbage collector for non active sessions initialized. Running every 900 seconds and cleaning up non active Sessions more than 3600 seconds old
openvidu-server_1  | [INFO] 2020-04-24 02:33:57,271 [main] io.openvidu.server.pro.infrastructure.InfrastructureManager - Using path "/opt/openvidu/cluster/aws/aws/" as clustering path (set with property "OPENVIDU_PRO_CLUSTER_PATH")
openvidu-server_1  | [ERROR] 2020-04-24 02:33:57,272 [main] io.openvidu.server.pro.infrastructure.onpremise.OnpremiseInfrastructureManager - Cluster environment "on_premise" requires file "/opt/openvidu/cluster/aws/aws/openvidu_launch_kms.sh" to exist, but cannot be found
openvidu-server_1  | [ERROR] 2020-04-24 02:33:57,272 [main] io.openvidu.server.pro.infrastructure.onpremise.OnpremiseInfrastructureManager - Shutting down OpenVidu Server
```

To fix the issue, you have to enter to the machine with `ssh` and edit the `.env` file removing  `OPENVIDU_PRO_CLUSTER_PATH` variable and restarting the service with `./openvidu restart`.

#### Configuration errors

If there's any error with the configuration, a report detailing which configuration property has issues and a step-by-step guide to fix it will be immediately shown by OpenVidu. The report will be similar to this:

```console
Configuration errors
--------------------

* Property OPENVIDU_SECRET is not set. Cannot be empty.
* Property OPENVIDU_DOMAIN_OR_PUBLIC_IP is not set. Cannot be empty


Fix config errors
---------------

1) Return to shell pressing Ctrl+C
2) Set correct values in '.env' configuration file
3) Restart OpenVidu with:

    $ ./openvidu restart
```

#### Docker compose

To solve any other issue apart from configuration ones, it is important to understand how is OpenVidu service executed. 

OpenVidu is executed as a docker-compose file. The commands executed by the script are the standard docker-compose commands, so internally they just do:

- start
    - `$ docker-compose up -d`
    - `$ docker-compose logs -f openvidu-server`
- stop
    - `$ docker-compose down` 
- restart
    - `$ docker-compose down` 
    - `$ docker-compose up -d`
    - `$ docker-compose logs -f openvidu-server`
- logs
    - `$ docker-compose logs -f openvidu-server`
 
<br>
As you can see, logs of `openvidu-server` service are shown when platform is started or restarted. This log contains the most important information for the OpenVidu execution.

#### Show service logs

Take a look to service logs to see what happened. First, see openvidu-server logs:

```
./openvidu logs
```

You can also see all service logs together: 

```
docker-compose logs -f
```

Or you can inspect one by one the other services:

```
docker-compose logs -f nginx
docker-compose logs -f coturn
docker-compose logs -f redis
docker-compose logs -f app
```

#### Review the configuration

Sometimes we may have a typo when writing a property name. For this reason, openvidu-server prints in the log all the configuration properties you have set in `.env` file and the default values for all other configuration properties. In that way, you can double check what openvidu-server actually *sees*.

```console
Configuration properties
---------------------  
* CERTIFICATE_TYPE=selfsigned
* OPENVIDU_CDR=false
* OPENVIDU_CDR_PATH=/opt/openvidu/cdr
* OPENVIDU_DOMAIN_OR_PUBLIC_IP=my.domain.com
* OPENVIDU_RECORDING=false
* OPENVIDU_RECORDING_AUTOSTOP_TIMEOUT=120
* OPENVIDU_RECORDING_COMPOSED_URL=

...
```

#### Change log level of the services

To change the level of _openvidu-server_ logs change the property `OV_CE_DEBUG_LEVEL` in configuration file `.env`.

---

### Troubleshooting Media Nodes

#### Docker compose

First of all it is important to understand how is Media Nodes service executed. 

Media Node is executed as a docker-compose file. The commands executed by the script are the standard docker-compose commands, so internally they just do:

- start
    - `$ docker-compose up -d`
    - `$ docker-compose logs -f kms`
- stop
    - `$ docker-compose down` 
- restart
    - `$ docker-compose down` 
    - `$ docker-compose up -d`
    - `$ docker-compose logs -f kms`
- logs
    - `$ docker-compose logs -f kms`
 
<br>
As you can see, logs of `kms` service are shown when platform is started or restarted.

#### Show service logs

Take a look to the Media Node service logs to see what happened:

```
./media_node logs
```

You can also see all services logs running in the Media Node together: 

```
docker-compose logs -f
```

#### Change log level of the services

To change the level of Kurento Media Server _kms_ logs change the property `KMS_DEBUG_LEVEL` in configuration file `.env`. For more information about possible values visit [Kurento Debug Logging](https://doc-kurento.readthedocs.io/en/stable/features/logging.html){:target="_blank"}.

#### Change Kurento Media Server docker image

OpenVidu and Kurento Media Server evolve at a different pace. Sometimes, it is possible that a new KMS is released but OpenVidu is not still updated. In that case, if you hit a bug that might be solved in the last KMS version, you can test if just updating KMS fixes your issue. `KMS_IMAGE` property allows you to specify the new KMS image in configuration file `.env`.

<br>

<script src="js/copy-btn.js"></script>

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
