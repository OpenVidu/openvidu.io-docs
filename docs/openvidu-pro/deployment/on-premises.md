<h2 id="section-title">Deploy OpenVidu Pro on premises</h2>
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
    Before deploying OpenVidu Pro you need to <strong><a href="https://openvidu.io/account" target="_blank">create an OpenVidu account</a></strong> to get your license key.<br>There's a <strong>15 day free trial</strong> waiting for you!
</div>
</div>

## Deployment instructions

### 1) Prerequisites

#### In your cluster machines

You must have **at least 2 different instances** with a clean installation of **any modern Linux distribution**.

- One instance for the **OpenVidu Server Pro Node**
- One instance for a **Media Node**

You can actually have as many instances as you want for Media Nodes. The number of Media Nodes determines the size of your cluster: the more Media Nodes, the more video sessions your cluster will be able to handle. Check out [Scalability](openvidu-pro/scalability/){:target="_blank"} section for further details.

Besides, be sure to meet the following criteria in your cluster instances:

- Have at least a minimum of **2 CPUs and 8GB of RAM**, and a generous network bandwidth
- **[Install Docker](https://docs.docker.com/engine/install/#server){:target="_blank"}**
- **[Install Docker Compose](https://docs.docker.com/compose/install/){:target="_blank"}**

---

### 2) Network requirements

These ports need to be opened and publicly accessible for each type of instance in your cluster:

#### OpenVidu Server Pro instance

- **22 TCP**: to connect using SSH to admin OpenVidu.
- **80 TCP**: if you select Let's Encrypt to generate an SSL certificate this port is used by the generation process.
- **443 TCP** (OpenVidu Inspector is served on port 443 by default)
- **3478 TCP** (coturn listens on port 3478 by default)
- **3478 UDP** (opening also UDP port has been proved to facilitate connections with certain type of clients)

#### Media Node instances

- **22 TCP**: to connect using SSH to admin OpenVidu.
- **40000 - 65535 UDP** (WebRTC connections with clients may be established using a random port inside this range)
- **40000 - 65535 TCP** (WebRTC connections with clients may be established using a random port inside this range, if UDP can't be used because client network is blocking it)
- **8888 TCP (must only be accessible for OpenVidu Server Pro instance)** (Kurento Media Server listens on port 8888 by default)


> **NOTE**: in production environments you will have to configure a **fully qualified domain name** in your **OpenVidu Server Pro instance**. You can register a FQDN for the OpenVidu Server Pro instance using a DNS server, pairing the OpenVidu Server Pro instance public IP with your domain name. This is the only way to later set up a valid certificate in OpenVidu Server Pro instance, so clients don't get a warning when connecting to a video session

---

### 3) Deployment OpenVidu Server Pro instance
First connect by ssh to Openvidu Server Pro instance, and move to `/opt` with the following command:

```bash
cd /opt
```

Execute the following command to download and run the installation script.

<p style="text-align: start">
<code id="code-2">curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_pro_latest.sh | bash</code>
<button id="btn-copy-2" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
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

<br>

#### 3.1) Configuration

OpenVidu Platform configuration is specified in the **`.env`** file with environment variables.

- You _must_ give a value to properties **`OPENVIDU_DOMAIN_OR_PUBLIC_IP`**, **`OPENVIDU_SECRET`** and **`KIBANA_PASSWORD`**. Default empty values will fail. 
- Other value that you _must_ give is  **`OPENVIDU_PRO_LICENSE`** You need an **[OpenVidu account](https://openvidu.io/account){:target="_blank"}** to purchase it. There's a **15 day free trial** waiting for you!
- You can change the **`CERTIFICATE_TYPE`** if you have a valid domain name. Setting this property to `letsencrypt` will automatically generate a valid certificate for you (it is required to set property `LETSENCRYPT_EMAIL`). Or if for any unknown reason you prefer to use your own certificate, set the property to `owncert` and place the certificate files as explained.
- All other configuration properties come with sane defaults. You can go through them and change whatever you want. Visit [OpenVidu Server CE configuration](reference-docs/openvidu-server-params/){:target="_blank"} and [OpenVidu Server Pro configuration](openvidu-pro/reference-docs/openvidu-server-pro-params/){:target="_blank"} for further information.

The **`.env`** file is pretty self-explanatory. It looks like this:

```bash
# OpenVidu configuration
# ----------------------
# Documentation: https://docs.openvidu.io/en/stable/reference-docs/openvidu-server-params/

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

<br>

---

#### 3.2) Execution

To start OpenVidu Platform (and the application if enabled) you can execute this command:

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

You can press `Ctrl+C` to come back to the shell and OpenVidu will be executed in the background.

If the application is enabled, it will be available at `https://server/`

You can open OpenVidu Dashboard to verify if the platform is working as expected go to `https://server/dashboard/` with credentials:

- user: OPENVIDUAPP
- pass: the value of OPENVIDU_SECRET in `.env` file

<br>

---

#### 3.3) Administration

Run the following commands to manage OpenVidu Platform service:

- Start OpenVidu

        ./openvidu start

- Stop OpenVidu

        ./openvidu stop

- Restart OpenVidu

        ./openvidu restart

- Show logs of OpenVidu

        ./openvidu logs

> To change current configuration, you just need to update `.env` configuration file with the new desired values and run `./openvidu restart` command.

<br>

---

### 4) Deployment Media Node instance

Follow these steps to add as many Media Nodes as you need. First connect by ssh to Media Node instance, and move to `/opt` with the following command:

```bash
cd /opt
```

Execute the following command to download and run the installation script.

<p style="text-align: start">
<code id="code-2">curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_media_node_latest.sh | bash</code>
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

<br>

---

#### 4.1) Execution

To start Media Node (and the application if enabled) you can execute this command:

```
./media_node start
```

All docker images for services will be downloaded (only the first time) and executed.

The first part of the log shows how docker-compose command executes all services:

```
Creating kms_kms_1   ... done
Creating kms_nginx_1 ... done
```

<br>

---

#### 4.2) Administration

Run the following commands to manage Media Node service:

- Start Media Node

        ./media_node start

- Stop Media Node

        ./media_node stop

- Restart Media Node

        ./media_node restart

- Show logs of Media Node

        ./media_node logs

<br>

---

#### 4.3) Connect Media Node to Openvidu Server Pro

**IMPORTANT** If we reboot Openvidu Pro Instance we'll have to connect the media nodes again.

Every time we install a media node we must add it to Openvidu Pro. This can be done in one of the following ways:

##### From OpenVidu Inspector

In Cluster page you can launch and drop Media Nodes just by pressing buttons. You need to have the new Media Node already up and running (see [Launching new Media Nodes with Ansible](#launching-new-media-nodes-with-ansible)) and define its URI like this: `ws://NEW_MEDIA_NODE_IP:8888/kurento`

<div class="row">
    <div style="margin: 5px 15px 5px 15px">
        <a data-fancybox="gallery-pro3" href="img/docs/openvidu-pro/pro19.png"><img class="img-responsive img-pro img-pro-small" src="img/docs/openvidu-pro/pro19.png"/></a>
    </div>
</div>

> **WARNING**: Launching/Dropping Media Nodes from OpenVidu Inspector in On Premises deployments will not automatically start/terminate your instances:
>
> - To launch a new Media Node you need to have the new Media Node already up and running (see [Launching new Media Nodes with Ansible](#launching-new-media-nodes-with-ansible)) and define its URI like stated in the image above.<br><br>
> - To drop an existing Media Node you will have to terminate the instance yourself after clicking the terminate button, if that's what you want. Clicking the button will just disconnect the Media Node from the cluster (you won't be charged for it anymore), but won't terminate the machine. You can listen to [mediaNodeStatusChanged](openvidu-pro/reference-docs/openvidu-server-pro-cdr/#medianodestatuschanged){:target="_blank"} event through OpenVidu Webhook to know when you can safely terminate your instance (listen to `terminated` status).

##### With OpenVidu Pro REST API

You can programmatically launch and drop Media Nodes from your application by consuming OpenVidu Pro REST API.

- **Launch a Media Node**: **[POST /pro/media-nodes](openvidu-pro/reference-docs/REST-API-pro#post-promedia-nodes){:target="_blank"}**
- **Drop a Media Node**: **[DELETE /pro/media-nodes](openvidu-pro/reference-docs/REST-API-pro/#delete-promedia-nodesltmedia_node_idgt){:target="_blank"}**

> **WARNING**: there are some important aspects to keep in mind when launching and dropping Media Nodes through REST API in on premises OpenVidu Pro clusters:
>
> - Trying to drop a Media Node which is currently hosting an OpenVidu Session will fail by default. You can manage the drop policy when calling [DELETE /pro/media-nodes](openvidu-pro/reference-docs/REST-API-pro/#delete-promedia-nodesltmedia_node_idgt){:target="_blank"} through parameter `deletion-strategy`.<br><br>
> - Launching/Dropping Media Nodes in on premises deployments will not automatically start/terminate your instances:
>     - To launch a new Media Node you are required to have the Media Node already running (see [Launching new Media Nodes with Ansible](#launching-new-media-nodes-with-ansible)). Then you must provide the Media Node's URI when calling [POST /pro/media-nodes](openvidu-pro/reference-docs/REST-API-pro#post-promedia-nodes){:target="_blank"} (using `uri` query parameter) or [like this in OpenVidu Inspector](#from-openvidu-inspector).
>     - To drop an existing Media Node you will have to terminate the instance yourself after successfully calling [DELETE /pro/media-nodes](openvidu-pro/reference-docs/REST-API-pro/#delete-promedia-nodesltmedia_node_idgt){:target="_blank"}, if that's what you want. You can listen to [mediaNodeStatusChanged](openvidu-pro/reference-docs/openvidu-server-pro-cdr/#medianodestatuschanged){:target="_blank"} event through OpenVidu Webhook to know when you can safely terminate your instances (listen to `terminated` status).

---

## Updating OpenVidu Pro configuration

You may want to change the current configuration of an existing OpenVidu Pro cluster. This configuration includes all of the parameters listed in these pages:

- [OpenVidu Server CE configuration](reference-docs/openvidu-server-params){:target="_blank"}
- [OpenVidu Server Pro configuration](openvidu-pro/reference-docs/openvidu-server-pro-params){:target="_blank"}

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
2. Using root user with `sudo su` command
2. Go to folder `/opt/openvidu` and update file `.env` with the new configuration values
3. Restart OpenVidu Server Pro with `./openvidu restart` in the folder `/opt/openvidu`

To validate your changes and check that everything went well, you should take a look to OpenVidu Server Pro logs.

<br>

---

## Troubleshooting

### Openvidu Server Pro Instance

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

To solve any other issue, it is important to understand how is OpenVidu executed. 

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
* OPENVIDU_CDR_PATH=log
* OPENVIDU_DOMAIN_OR_PUBLIC_IP=my.domain.com
* OPENVIDU_RECORDING=true
* OPENVIDU_RECORDING_AUTOSTOP_TIMEOUT=120
* OPENVIDU_RECORDING_COMPOSED_URL=

...
```

#### Java options

To use java options in openvidu-server change the property `JAVA_OPTIONS` in configuration file `.env`

For more information about posible values for java option visit [Configuring Java Options](https://docs.oracle.com/cd/E37116_01/install.111210/e23737/configuring_jvm.htm#OUDIG00007)

#### Change log level of the services

To change the level of _openvidu-server_ logs change the property `OV_CE_DEBUG_LEVEL` in configuration file `.env`.

### Media Node Instance

#### Docker compose

To solve any other issue, it is important to understand how is Media Node executed. 

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

Take a look to service logs to see what happened. First, see openvidu-server logs:

```
./media_node logs
```

You can also see all service logs together: 

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