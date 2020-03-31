<h2 id="section-title">Deploying OpenVidu Pro on AWS</h2>
<hr>

- **[Deployment instructions](#deployment-instructions)**
    - [1) Access to the console of AWS Cloud Formation](#1-access-to-the-console-of-aws-cloud-formation)
    - [2) Select 'Create Stack' 🠚 'With new resources'](#2-select-create-stack-with-new-resources)
    - [3) Option 'Specify template' 🠚 'Amazon S3 URL' with the following URL](#3-option-specify-template-amazon-s3-url-with-the-following-url)
    - [4) Specify stack details](#4-specify-stack-details)
    - [5) Create your stack](#5-create-your-stack)
- **[Scalability](#scalability)**
    - [Set the number of Media Nodes on startup](#set-the-number-of-media-nodes-on-startup)
    - [Change the number of Media Nodes on the fly](#change-the-number-of-media-nodes-on-the-fly)
- **[Updating OpenVidu Pro configuration](#updating-openvidu-pro-configuration)**
- **[Troubleshooting](#troubleshooting)**
- **[OpenVidu Pro in AWS Marketplace](#openvidu-pro-in-aws-marketplace)**

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

### 1) Access to the console of AWS Cloud Formation

<p style="text-align: center; margin-top: 20px"><a href="https://console.aws.amazon.com/cloudformation#stacks" class="btn btn-xs btn-primary" title="Developing OpenVidu" target="_blank">Go to CloudFormation<span class="icon icon-circle-arrow-right"></span></a></p>

<br>

---

### 2) Select _Create Stack_ 🠚 _With new resources_

<p>
    <img class="img-responsive deploy-img" style="max-height: 400px" src="img/docs/deployment/CF_newstack.png">
</p>

---

### 3) Option _Specify template_ 🠚 _Amazon S3 URL_ with the following URL

<code id="code-2">https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/CF-OpenVidu-Pro-latest.yaml</code>
<button id="btn-copy-2" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button" title="Copy to Clipboard">Copy</button>

<p>
    <img class="img-responsive deploy-img" src="img/docs/deployment/CF_url.png">
</p>

---

### 4. Specify stack details

First of all, indicate a name for your deployment. Next fill each section of the **Parameters** formulary:

#### OpenVidu Pro License

Your OpenVidu Pro License key. You need an **[OpenVidu account](https://openvidu.io/account){:target="_blank"}** to purchase it. There's a **15 day free trial** waiting for you!

#### SSL certificate configuration

Configuration for your CloudFormation stack certificate. We provide 3 different scenarios: you can use the default **SELF-SIGNED CERTIFICATE** stored in the application (users will need to accept the browser security alert) or if you have a custom domain, either allow **LET'S ENCRYPT** to automatically generate a valid and free certificate for your domain or use your own **CUSTOM CERTIFICATE** if you already have one.

<div style="text-align: center" class="table-responsive">
  <table class="deploy-fields-table color-table" style="margin-top: 10px; margin-bottom: 0px">
    <tr>
      <th></th>
      <th>Self-Signed certificate</th>
      <th><em>Let's Encrypt</em> certificate</th>
      <th>Custom certificate</th>
    </tr>
    <tr>
      <td class="first-col">Choose the certificate</td>
      <td>selfsigned</td>
      <td>letsencrypt</td>
      <td>owncert</td>
    </tr>
    <tr>
      <td class="first-col">Email for Let's Encrypt certification authority</td>
      <td></td>
      <td><em>Your choice</em></td>
      <td><em></em></td>
    </tr>
    <tr>
      <td class="first-col">My domain name</td>
      <td></td>
      <td><em>Your fully qualified domain</em></br><span class="field-comment">For example: if your full URL is <em><strong>https://openvidu.io/</strong></em>  then this is <em><strong>openvidu.io</strong></em></span></td>
      <td><em>Your fully qualified domain</em></br><span class="field-comment">For example: if your full URL is <em><strong>https://openvidu.io/</strong></em>  then this is <em><strong>openvidu.io</strong></em></span></td>
    </tr>
    <tr>
      <td class="first-col">Public elastic IP (EIP)</td>
      <td></td>
      <td><em>One AWS Elastic IP you generated</em></br><span class="field-comment">(check <a href="http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html#using-instance-addressing-eips-allocating" target="_blank">AWS Docs</a> to generate a new one)</span></td>
      <td><em>One AWS Elastic IP you generated</em></br><span class="field-comment">(check <a href="http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html#using-instance-addressing-eips-allocating" target="_blank">AWS Docs</a> to generate a new one)</span></td>
    </tr>
    <tr>
      <td class="first-col">URL to the CRT file</td>
      <td></td>
      <td></td>
      <td><em>URL to your public key file</em></br><span class="field-comment">The CloudFormation stack must have access to this URL, at least temporarily</span></td>
    </tr>
    <tr>
      <td class="first-col">URL to the key file</td>
      <td></td>
      <td></td>
      <td><em>URL to your private key file</em></br><span class="field-comment">The CloudFormation stack must have access to this URL, at least temporarily</span></td>
    </tr>
  </table>
</div>

> If you are using ***LET'S ENCRYPT CERTIFICATE***, of course you will need to register your ElasticIP in your DNS hosting service and associate it with the fully qualified domain name. Until your domain name is not accessible through the public IP you chose, this deployment won't work

#### OpenVidu CE configuration

Configuration properties specific for **OpenVidu Server CE**. You have a complete description of all available properties **[here](reference-docs/openvidu-server-params){:target="_blank"}**.

#### OpenVidu Pro configuration

Configuration properties specific for **OpenVidu Server Pro**. You have a complete description of all available properties **[here](openvidu-pro/reference-docs/openvidu-server-pro-params/){:target="_blank"}**.

#### Kibana configuration

Username and password for the Kibana service deployed with OpenVidu Pro. You will need these credentials for later access to the Kibana dashboard of your OpenVidu Pro deployment. Visit section [Detailed session monitoring](openvidu-pro/detailed-session-monitoring){:target="_blank"} for further information.

#### Networking configuration

<div style="text-align: center" class="table-responsive">
  <table class="deploy-fields-table color-table-gray" style="margin-top: 10px; margin-bottom: 10px;">
    <tr>
      <td class="first-col">OpenVidu VPC<br><span class="field-comment">Dedicated VPC for the OpenVidu Pro cluster<br>All of the EC2 instances of the cluster will connect to this VPC<span></td>
      <td><em>Choose from the drop-down button</em></td>
    </tr>
    <tr>
      <td class="first-col">OpenVidu Subnet<br><span class="field-comment">Subnet of the VPC where to deploy the OpenVidu Pro cluster<span></td>
      <td><em>Choose from the drop-down button</em></td>
    </tr>
  </table>
</div>

#### Other configuration

These properties configure specific details of the CloudFormation stack.

<div style="text-align: center" class="table-responsive">
  <table class="deploy-fields-table color-table-gray" style="margin-top: 10px">
    <tr>
      <td class="first-col">Instance type for Openvidu Server Pro Node<br><span class="field-comment">Type of EC2 Instance where to deploy the <a href="openvidu-pro/scalability/#openvidu-pro-architecture" target="_blank">OpenVidu Server Pro Node</a><span></td>
      <td><em>Choose from the drop-down button</em></td>
    </tr>
    <tr>
      <td class="first-col">Instance type for Media Nodes<br><span class="field-comment">Type of EC2 Instance where to deploy the <a href="openvidu-pro/scalability/#openvidu-pro-architecture" target="_blank">Media Nodes</a><span></td>
      <td><em>Choose from the drop-down button</em></td>
    </tr>
    <tr>
      <td class="first-col">Key name<br><span class="field-comment">SSH key the EC2 Instances of the cluster<span></td>
      <td><em>Choose from the drop-down button</em></br><span class="field-comment">(check <a href="http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html" target="_blank">AWS Docs</a> to create a new one)</span></td>
    </tr>
  </table>
</div>

<br>

---

### 5. Create your stack

No extra options are necessary. Click on  **_Next_** ➞ **_Next_** ➞ **_Create stack_**

**_CREATE_IN_PROGRESS_** status will show up. You will now have to wait for a few minutes (about 10) until it shows **_CREATE_COMPLETE_**.

To connect to **OpenVidu Inspector** and the **Kibana dashboard**, simply access `Outputs` tab after **_CREATE_COMPLETE_** status is reached. There you will have both URLs to access both services.

<div class="row">
    <div style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro12" href="img/docs/openvidu-pro/marketplace/marketOutputs.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/marketplace/marketOutputs.png"/></a>
    </div>
</div>

To consume [OpenVidu REST API](reference-docs/REST-API/){:target="_blank"}, use URL `https://OPENVIDUPRO_PUBLIC_IP:4443`. For example, in the image above that would be `https://ec2-34-244-193-135.eu-west-1.compute.amazonaws.com:4443` using AWS domain. When deploying with a custom domain name (which you should do for a production environment), of course you must use your domain name instead.

<br>

---

## Scalability

### Set the number of Media Nodes on startup

When filling the CloudFormation form, simply set the desired number in section [OpenVidu Pro configuration](#openvidu-pro-configuration).

<div class="row">
    <div style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro2" href="img/docs/openvidu-pro/marketplace/marketClusteringOptions.png"><img class="img-responsive img-pro img-pro-small" src="img/docs/openvidu-pro/marketplace/marketClusteringOptions.png"/></a>
    </div>
</div>

In section [Other configuration](#other-configuration) you can choose the size of your OpenVidu Server Pro Node and your Media Nodes.

<div class="row">
    <div style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro2" href="img/docs/openvidu-pro/marketplace/marketOthers.png"><img class="img-responsive img-pro img-pro-small" src="img/docs/openvidu-pro/marketplace/marketOthers.png"/></a>
    </div>
</div>

### Change the number of Media Nodes on the fly

You can launch and drop Media Nodes dynamically in two different ways:

#### From OpenVidu Inspector

In Cluster page you can launch and drop Media Nodes just by pressing buttons.

<div class="row">
    <div style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro3" href="img/docs/openvidu-pro/pro18.png"><img class="img-responsive img-pro img-pro-small" src="img/docs/openvidu-pro/pro18.png"/></a>
    </div>
</div>

#### With OpenVidu Pro REST API

You can programmatically launch and drop Media Nodes from your application by consuming OpenVidu Pro REST API.

- **Launch a Media Node**: **[POST /pro/media-nodes](openvidu-pro/reference-docs/REST-API-pro#post-promedia-nodes){:target="_blank"}**
- **Drop a Media Node**: **[DELETE /pro/media-nodes](openvidu-pro/reference-docs/REST-API-pro/#delete-promedia-nodesltmedia_node_idgt){:target="_blank"}**

> **WARNING**: there are some important aspects to keep in mind when launching and dropping Media Nodes in AWS deployemnts, specially through OpenVidu Pro REST API (OpenVidu Inspector UI is quite self-descriptive):
>
> - Trying to drop a Media Node which is currently hosting an OpenVidu Session will fail by default. You can manage the drop policy when calling [DELETE /pro/media-nodes](openvidu-pro/reference-docs/REST-API-pro/#delete-promedia-nodesltmedia_node_idgt){:target="_blank"} through parameter `deletion-strategy`.

<br>

---

## Updating OpenVidu Pro configuration

You may want to change the current configuration of an existing OpenVidu Pro cluster. This configuration includes all of the parameters listed in these pages:

- [OpenVidu Server CE configuration](reference-docs/openvidu-server-params){:target="_blank"}
- [OpenVidu Server Pro configuration](openvidu-pro/reference-docs/openvidu-server-pro-params){:target="_blank"}

When deploying an OpenVidu Pro cluster you give value to these parameters directly or indirectly, depending on the [deployment environment](openvidu-pro/scalability/#how-to-deploy-your-openvidu-pro-cluster){:target="_blank"}. Once the cluster is running, there are different ways you can update the value of the configuration parameters. Take into account that all of them require restarting your OpenVidu Server Pro process, so **any active OpenVidu Session will be terminated**.

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
2. Update file `/opt/openvidu/application.properties` with the new configuration values
3. Restart OpenVidu Server Pro with `sudo systemctl restart openvidu`

To validate your changes and check that everything went well, you should take a look to OpenVidu Server Pro logs. If there were any errors with any configuration parameter, OpenVidu Server Pro log should help you fix the issue. You can show last 200 lines of the logs with command `journalctl -n 200 -u openvidu | cat`

<br>

---

## Troubleshooting

First of all, an AWS CloudFormation stack may reach `CREATE_FAILED` status for missing a default VPC. Check out [this FAQ](troubleshooting/#13-deploying-openvidu-in-aws-is-failing){:target="_blank"} to learn how to fix it.

If that is not the problem, then follow these steps:

- **1)** Try to deploy again, but this time disabling option `Rollback on failure` (Configure stack options 🡆 Advanced Options 🡆 Stack creation options). This will prevent the instance to be terminated in case of failure so logs can be gathered. Once you re-deploy with this option, the stack will still fail but you’ll be able to access instances through SSH and retrieve some files to debug the problem.

<div class="row">
    <div style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-pro13" href="img/docs/deployment/CF_1_troubleshooting_rollback.png"><img class="img-responsive img-pro" src="img/docs/deployment/CF_1_troubleshooting_rollback.png"/></a>
    </div>
</div>

- **2)** We will also need the parameters you've used to deploy, to check possible problems in their values

<div class="row">
    <div style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-pro14" href="img/docs/deployment/CF_1_troubleshooting_rollback.png"><img class="img-responsive img-pro" src="img/docs/deployment/CF_2_troubleshooting_parameters.png"/></a>
    </div>
</div>

- **3)** Once you have performed step 1) and the stack creation has failed, please SSH into the instances created and share with us Cloudformation logs

    - `/var/log/cloud-init.log`
    - `/var/log/cloud-init-output.log`
<br><br>

- **4)** Get also the log output of openvidu with this command and share with us the output file:

    - `journalctl -u openvidu > openvidu.log`

> Regarding the compatibility of **openvidu-browser** and **server SDKs** (REST API, openvidu-java-client, openvidu-node-client), use the same version numbers as stated for openvidu-server in [Releases page](https://docs.openvidu.io/en/stable/releases/){:target="_blank"}. For example, for OpenVidu Pro 2.10.0, use the artifact versions indicated in [2.10.0 release table](https://docs.openvidu.io/en/stable/releases#2100){:target="_blank"}

<br>

---

## OpenVidu Pro in AWS Marketplace

<div style="
    display: table;
    border: 1px solid #ffb600;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    background-color: #FFFBF1;
    margin-bottom: 25px;
    padding: 5px 0 5px 0;"><div style="display: table-cell; vertical-align: middle;">
    <i class="icon ion-android-alert" style="
    font-size: 50px;
    color: #ffb600;
    display: inline-block;
    padding-left: 25%;
"></i></div>
<div style="
    vertical-align: middle;
    display: table-cell;
    padding-left: 20px;
    padding-right: 20px;
    ">
    The recommended way of deploying OpenVidu Pro in AWS is by directly using <a href="#deployment-instructions">CloudFormation</a></strong>.<br>Latest available version of OpenVidu Pro in AWS Marketplace is <strong>2.11.0</strong>, but we are working on 2.12.0 support
</div>
</div>

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
    Before deploying OpenVidu Pro in AWS Marketplace you need to contact us through <a href="https://openvidu.io/commercial" target="_blank"><strong>Commercial page</strong></a> to get the credentials you will need during the deployment process. For this outdated way of deploying an OpenVidu Pro cluster you don't need an OpenVidu account, but you will need some special credentials we need to provide to you.
</div>
</div>

### 1) Steps towards configuration

<p style="text-align: center; margin-top: 30px">
    <a href="https://aws.amazon.com/marketplace/pp/prodview-mngn2m3lxhtce?qid=1567758504396&sr=0-2&ref_=srh_res_product_title" class="btn btn-xs btn-primary" style="font-size: 15px; display: table; margin: auto" title="OpenVidu Pro" target="_blank"><span style="display: table-cell; vertical-align:middle">Go to </span><i style="margin-left: 10px; margin-right: 10px; font-size: 45px; vertical-align: middle; font-weight: 100" class="fab fa-aws"></i><span style="display: table-cell; vertical-align:middle"> marketplace</span></a>
</p>

<div class="row wow fadeInUp">
    <div class="pro-gallery-steps" style="margin: 25px 35px 25px 35px">
        <a data-fancybox="gallery-pro5" href="img/docs/openvidu-pro/marketplace/market1.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/marketplace/market1.png"/></a>
        <a data-fancybox="gallery-pro5" href="img/docs/openvidu-pro/marketplace/market6.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/marketplace/market6.png"/></a>
        <a data-fancybox="gallery-pro5" href="img/docs/openvidu-pro/marketplace/market2.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/marketplace/market2.png"/></a>
        <a data-fancybox="gallery-pro5" href="img/docs/openvidu-pro/marketplace/market3.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/marketplace/market3.png"/></a>
        <a data-fancybox="gallery-pro5" href="img/docs/openvidu-pro/marketplace/market4.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/marketplace/market4.png"/></a>
        <a data-fancybox="gallery-pro5" href="img/docs/openvidu-pro/marketplace/market5.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/marketplace/market5.png"/></a>
    </div>
</div>

<br>

---

### 2) Configure your OpenVidu Server Pro

Fill each section of the form with the appropriate values as stated below.

#### Stack name
The name of your deployment

#### SSL Certificate Configuration
This is the kind of certificate you will be using in your deployment. Three different options are offered:

- **selfsigned**: use a selfsigned certificate. This options is meant for testing and developing environments. Leave the rest of the fields with their default value

<div class="row">
    <div style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro6" href="img/docs/openvidu-pro/marketplace/marketSelfsigned.png"><img class="img-responsive img-pro img-pro-small" src="img/docs/openvidu-pro/marketplace/marketSelfsigned.png"/></a>
    </div>
</div>

- **letsencrypt**: use an automatic certificate by Let's Encrypt. This way you don't have to worry about providing your own certificate. You simply have to enter an email account where Let's Encrypt will send its messages, your fully qualified domain name and one AWS Elastic IP for the same region you selected before ([allocate one if you don't have it](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html#using-instance-addressing-eips-allocating){:target="_blank"}). Of course, **you will need to register this Elastic IP in your DNS hosting service and associate it with your fully qualified domain name**. Only after this association between the Elastic IP and your domain name is effective your deployment with Let's Encrypt will work fine.

<div class="row">
    <div style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro7" href="img/docs/openvidu-pro/marketplace/marketLetsencrypt.png"><img class="img-responsive img-pro img-pro-small" src="img/docs/openvidu-pro/marketplace/marketLetsencrypt.png"/></a>
    </div>
</div>

- **owncert**: use your own certificate. You must provide one AWS Elastic IP for the same region you selected before ([allocate one if you don't have it](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html#using-instance-addressing-eips-allocating){:target="_blank"}), and your public certificate and private key, both accessible through uris (an Amazon S3 bucket is the best way to do it). Leave the default values for *Email* and *Fully qualified domain name* fields.

<div class="row">
    <div style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro8" href="img/docs/openvidu-pro/marketplace/marketOwncert.png"><img class="img-responsive img-pro img-pro-small" src="img/docs/openvidu-pro/marketplace/marketOwncert.png"/></a>
    </div>
</div>

#### OpenVidu Configuration

These fields respectively configure different [system properties](reference-docs/openvidu-server-params/){:target="_blank"} of OpenVidu Server.

Besides, you'll find two fields for OpenVidu Pro credentials (_OpenViduProUsername_ and _OpenViduProPassword_). We provide those credentials for you and with them you'll be able to access the OpenVidu Pro artifact (contact us through <a href="https://openvidu.io/commercial" target="_blank"><strong>Commercial page</strong></a> to get them).

<div class="row">
    <div style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro9" href="img/docs/openvidu-pro/marketplace/marketOpenviduconf.png"><img class="img-responsive img-pro img-pro-small" src="img/docs/openvidu-pro/marketplace/marketOpenviduconf.png"/></a>
    </div>
</div>

> If you want to enable [OpenVidu Webhook module](reference-docs/openvidu-server-webhook/){:target="_blank"} by setting **OpenViduWebhook** field to true, your endpoint defined in field **OpenViduWebhookEndpoint** will probably be secured in some way. The syntax for the webhook header (field **OpenViduWebhookHeaders**) should be used to provide the security credentials. For example:
>
> `Authorization: Basic T1BFTlZJRFVBUFA6TVlfU0VDUkVU`
>
> for a basic auth token.

#### Openvidu Security Group

These fields allow you to limit the IPs that will be able to connect to OpenVidu Server Pro.

> **WARNING**: be careful when limiting these IP ranges
>
> - **Port 4443 access Range**: OpenVidu Server Pro REST API and client access point. This should be set to `0.0.0.0/0` if you want any client to be able to use your deployment
> - **Port 3478 access Range**: TURN server port. This should be set to `0.0.0.0/0` if you want any client to be able to use your deployment, as you never know which user might need a TURN connection to be able to send and receive media
> - **SSH Port access Range** can be limited as you want, as it provides SSH access to the server with the proper private key through port 22
> - **HTTPS and HTTP (ports 443 and 80) access Range**: HTTPS access range will determine the directions able to connect to Kibana dashboard. If you are using Let's Encrypt SSL configuration, set HTTP access range to `0.0.0.0/0`, as Let's Encrypt will need to access your server through port 80.
> - **UDP Port access Range** and **TCP Port access Range**: limits the clients that will be able to establish TCP and UDP connections to your OpenVidu Server Pro. So again, if you want to provide service to any client these should be set to `0.0.0.0/0`
> - **MinOpenPort** and **MaxOpenPort**: determine what ports will be available to establish the media connections, so the generous default value is a good choice. If you change the values leaving out any of the previously stated ports, the deployment may fail

<div class="row">
    <div style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro10" href="img/docs/openvidu-pro/marketplace/marketSecurity.png"><img class="img-responsive img-pro img-pro-small" src="img/docs/openvidu-pro/marketplace/marketSecurity.png"/></a>
    </div>
</div>

#### Kibana Dashboard

Set the user and password for accessing Kibana dashboard.

<div class="row">
    <div style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro11" href="img/docs/openvidu-pro/marketplace/marketKibana.png"><img class="img-responsive img-pro img-pro-small" src="img/docs/openvidu-pro/marketplace/marketKibana.png"/></a>
    </div>
</div>

#### Networking info

Because Kurento Media Server cluster runs in an Autoscaling Group this CloudFormation template will create a VPC and a Subnet with all they need to provide internet access to the instances and public IPs. Then all the instances will be connected to this VPC.

<div class="row">
    <div style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro11" href="img/docs/openvidu-pro/marketplace/marketNetworkingOptions.png"><img class="img-responsive img-pro img-pro-small" src="img/docs/openvidu-pro/marketplace/marketNetworkingOptions.png"/></a>
    </div>
</div>

#### Clustering Options

How many Kurento Media Servers do you want to deploy? Default to 1. Keep in mind AWS has limits to the amount of instances you can launch in EC2. Also, you will pay for every instance individually.

<div class="row">
    <div style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro11" href="img/docs/openvidu-pro/marketplace/marketClusteringOptions.png"><img class="img-responsive img-pro img-pro-small" src="img/docs/openvidu-pro/marketplace/marketClusteringOptions.png"/></a>
    </div>
</div>

#### Other parameters

Choose the size of your instance (see [OpenVidu performance FAQ](troubleshooting/#9-which-is-the-current-status-of-openvidu-regarding-performance-scalability-and-fault-tolerance){:target="_blank"}) and a Key Pair ([create one if you don't have any](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html#having-ec2-create-your-key-pair){:target="_blank"}).

You can choose different sizes for OpenVidu Server machine and KMS machines.

<div class="row">
    <div style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro12" href="img/docs/openvidu-pro/marketplace/marketOthers.png"><img class="img-responsive img-pro img-pro-small" src="img/docs/openvidu-pro/marketplace/marketOthers.png"/></a>
    </div>
</div>

You are ready to go. Click on **Next** 🡆 **Next** and complete the following point to deploy OpenVidu Pro cluster.

#### Roles

Before you can deploy the stack, you have to agree that this template will create Roles which will perform request to AWS API in you behalf from the instances. The Role's policy is only _ec2:DescribeInstances_, is the minimum required permission and it's needed to discover other cluster members. Every instance is tagged and the query to the API will simply filter by this tag.

<div class="row">
    <div style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro11" href="img/docs/openvidu-pro/marketplace/marketCapabilities.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/marketplace/marketCapabilities.png"/></a>
    </div>
</div>

After clicking the checkbox, you can now finally press **Create stack** button and deploy OpenVidu Pro cluster.

<br>

---

### 3) Connecting to your OpenVidu Server Pro

Now you just have to wait until Stack status is set to `CREATE_COMPLETE`. Then you will have a production-ready setup with all the advanced features provided by OpenVidu Pro.

<br>

To connect to **OpenVidu Inspector** and the **Kibana dashboard**, simply access `Outputs` tab. There you will have both URLs to access both services.

<div class="row">
    <div style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro12" href="img/docs/openvidu-pro/marketplace/marketOutputs.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/marketplace/marketOutputs.png"/></a>
    </div>
</div>

To consume [OpenVidu REST API](reference-docs/REST-API/){:target="_blank"}, use URL `https://OPENVIDUPRO_PUBLIC_IP:4443`. For example, in the image above that would be `https://ec2-34-244-193-135.eu-west-1.compute.amazonaws.com:4443`

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

<script src="js/copy-btn.js"></script>