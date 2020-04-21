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

> To deploy a fixed version, including previous ones, replace `latest` with the desired version number.<br>
> For example: <code>https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/CF-OpenVidu-Pro-<strong>2.12.0</strong>.yaml</code>

<br>

---

### 4. Specify stack details

First of all, indicate a name for your deployment. Next fill each section of the **Parameters** formulary:

#### Domain and SSL certificate configuration

Configuration for your CloudFormation stack certificate. We provide 3 different scenarios: you can use the default **SELF-SIGNED CERTIFICATE** stored in the application (users will need to accept the browser security alert) or if you have a custom domain, either allow **LET'S ENCRYPT** to automatically generate a valid and free certificate for your domain or use your own **CUSTOM CERTIFICATE** if you already have one (and for some unknown reason you still want to use that).

<div style="text-align: center" class="table-responsive">
  <table class="deploy-fields-table color-table" style="margin-top: 10px; margin-bottom: 0px">
    <tr>
      <th></th>
      <th>Self-Signed certificate</th>
      <th><em>Let's Encrypt</em> certificate</th>
      <th>Custom certificate</th>
    </tr>
    <tr>
      <td class="first-col">Certificate Type</td>
      <td>selfsigned</td>
      <td>letsencrypt</td>
      <td>owncert</td>
    </tr>
    <tr>
      <td class="first-col">AWS Elastic IP (EIP)</td>
      <td></td>
      <td><em>One AWS Elastic IP you generated</em></br><span class="field-comment">(check <a href="http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html#using-instance-addressing-eips-allocating" target="_blank">AWS Docs</a> to generate a new one)</span></td>
      <td><em>One AWS Elastic IP you generated</em></br><span class="field-comment">(check <a href="http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html#using-instance-addressing-eips-allocating" target="_blank">AWS Docs</a> to generate a new one)</span></td>
    </tr>
    <tr>
      <td class="first-col">Domain Name pointing to Elastic IP</td>
      <td></td>
      <td><em>Your fully qualified domain</em></br><span class="field-comment">For example: <em><strong>openvidu.company.com</strong></em></span></td>
      <td><em>Your fully qualified domain</em></br><span class="field-comment">For example: <em><strong>openvidu.company.com</strong></em></span></td>
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
    <tr>
      <td class="first-col">Email for Let's Encrypt</td>
      <td></td>
      <td><em>Your choice</em></td>
      <td><em></em></td>
    </tr>
  </table>
</div>

> If you are using ***LET'S ENCRYPT CERTIFICATE***, of course you will need to register your ElasticIP in your DNS hosting service and associate it with the fully qualified domain name. Until your domain name is not accessible through the public IP you chose, this deployment won't work

#### OpenVidu configuration

<div style="text-align: center" class="table-responsive">
  <table class="deploy-fields-table color-table-gray" style="margin-top: 10px; margin-bottom: 0px">
    <tr>
      <td class="first-col">OpenVidu Pro License key<br><span class="field-comment">Your purchased license key from your <a href="https://openvidu.io/account" target="_blank">OpenVidu account</a>.  There's a 15 day free trial waiting for you!<span></td>
      <td><em>Your OpenVidu Pro License key</em></td>
    </tr>
    <tr>
      <td class="first-col">Initial number of Media Node in your cluster<br><span class="field-comment">How many Media Nodes do you want on startup (EC2 instances will be launched)<span></td>
      <td><em>Your choice</em></td>
    </tr>
    <tr>
      <td class="first-col">Openvidu Secret<br><span class="field-comment">Secret to connect to this OpenVidu deployment. No whitespaces or quotations allowed<span></td>
      <td><em>Your choice</em></td>
    </tr>
  </table>
</div>

> There are many other configuration values that can be set once the deployment has completed. Visit [OpenVidu CE configuration](reference-docs/openvidu-server-params/){:target="_blank"} and [OpenVidu Pro configuration](openvidu-pro/reference-docs/openvidu-server-pro-params/){:target="_blank"}  for further information.

#### Kibana configuration

Username and password for the Kibana service deployed with OpenVidu Pro. You will need these credentials for later access to the Kibana dashboard of your OpenVidu Pro deployment. Visit section [Detailed session monitoring](openvidu-pro/detailed-session-monitoring){:target="_blank"} for further information.

<div style="text-align: center" class="table-responsive">
  <table class="deploy-fields-table color-table-gray" style="margin-top: 10px; margin-bottom: 10px">
    <tr>
      <td class="first-col">Kibana username</td>
      <td><em>You choice</em></td>
    </tr>
    <tr>
      <td class="first-col">Kibana password</td>
      <td><em>Your choice</em></td>
    </tr>
  </table>
</div>

#### EC2 Instance configuration

These properties configure specific details of the EC2 machines that will be launched by CloudFormation.

<div style="text-align: center" class="table-responsive">
  <table class="deploy-fields-table color-table-gray" style="margin-top: 10px; margin-bottom: 10px;">
    <tr>
      <td class="first-col">Instance type for Openvidu Server Pro Node<br><span class="field-comment">Type of EC2 Instance where to deploy the <a href="openvidu-pro/scalability/#openvidu-pro-architecture" target="_blank">OpenVidu Server Pro Node</a><span></td>
      <td><em>Choose from the drop-down button</em></td>
    </tr>
    <tr>
      <td class="first-col">Instance type for Media Nodes<br><span class="field-comment">Type of EC2 Instance where to deploy the <a href="openvidu-pro/scalability/#openvidu-pro-architecture" target="_blank">Media Nodes</a><span></td>
      <td><em>Choose from the drop-down button</em></td>
    </tr>
    <tr>
      <td class="first-col">SSH Key<br><span class="field-comment">SSH key for the EC2 Instances of the cluster<span></td>
      <td><em>Choose from the drop-down button</em></br><span class="field-comment">(check <a href="http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html" target="_blank">AWS Docs</a> to create a new one)</span></td>
    </tr>
  </table>
</div>

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

These properties configure some other options of your stack.

<div style="text-align: center" class="table-responsive">
  <table class="deploy-fields-table color-table-gray" style="margin-top: 10px">
    <tr>
      <td class="first-col">Deploy OpenVidu Call application<br><span class="field-comment">Choose if you want to deploy OpenVidu Call application alongside OpenVidu platform<span></td>
      <td><em>Choose from the drop-down button</em></td>
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

To consume [OpenVidu REST API](reference-docs/REST-API/){:target="_blank"}, use URL `https://OPENVIDUPRO_PUBLIC_IP/`. For example, in the image above that would be `https://ec2-34-244-193-135.eu-west-1.compute.amazonaws.com/` using AWS domain. When deploying with a custom domain name (which you should do for a production environment), of course you must use your domain name instead.

<br>

---

## Scalability

### Set the number of Media Nodes on startup

When filling the CloudFormation form, simply set the desired number in section [OpenVidu configuration](#openvidu-configuration).

<div class="row">
    <div style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro2" href="img/docs/openvidu-pro/marketplace/marketClusteringOptions.png"><img class="img-responsive img-pro img-pro-small" src="img/docs/openvidu-pro/marketplace/marketClusteringOptions.png"/></a>
    </div>
</div>

In section [EC2 Instance configuration](#ec2-instance-configuration) you can choose the size of your OpenVidu Server Pro Node and your Media Nodes.

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

> **WARNING**: there are some important aspects to keep in mind when launching and dropping Media Nodes in AWS deployments, especially through OpenVidu Pro REST API (OpenVidu Inspector UI is quite self-descriptive):
>
> - Trying to drop a Media Node which is currently hosting an OpenVidu Session will fail by default. You can manage the drop policy when calling [DELETE /pro/media-nodes](openvidu-pro/reference-docs/REST-API-pro/#delete-promedia-nodesltmedia_node_idgt){:target="_blank"} through parameter `deletion-strategy`.<br><br>
> - Launching/Dropping Media Nodes in AWS OpenVidu Pro deployments will automatically start/terminate EC2 instances. The termination of an EC2 instance that was hosting a removed Media Node will be done only when it is safe. This moment is reached when OpenVidu Webhook event [mediaNodeStatusChanged](openvidu-pro/reference-docs/openvidu-server-pro-cdr/#medianodestatuschanged){:target="_blank"} is triggered with value `terminated`.

<br>

---

## Updating OpenVidu Pro configuration

You may want to change the current configuration of an existing OpenVidu Pro cluster. This configuration includes all of the parameters listed in these pages:

- [OpenVidu CE configuration](reference-docs/openvidu-server-params){:target="_blank"}
- [OpenVidu Pro configuration](openvidu-pro/reference-docs/openvidu-server-pro-params){:target="_blank"}

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

1. SSH to the OpenVidu Server Pro Node machine using your private rsa key
2. Using root user with `sudo su` command, go to OpenVidu Pro installation folder (default and recommended is `/opt/openvidu`)
2. Update file `.env` with the new configuration values
3. Restart OpenVidu Server Pro with `./openvidu restart`

Keep an eye on the OpenVidu logs that will automatically display after restarting the service to check that everything went well.

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

- **4)** Get also the log output of all the services with this command and share with us the output file:

    - `docker-compose logs -f`

> AWS deployments of OpenVidu Pro work under the hood in the exact same manner as on premises deployments. So **everything explained in [Troubleshooting](openvidu-pro/deployment/on-premises/#troubleshooting){:target="_blank"} section of on premises deployments also applies to AWS deployments**. There you have detailed instructions on how to debug all of OpenVidu Pro services in case some unexpected problem appears.

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