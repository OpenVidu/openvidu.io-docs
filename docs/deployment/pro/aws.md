<h2 id="section-title">Deploying OpenVidu Pro on AWS</h2>
<hr>

- **[Deployment instructions](#deployment-instructions)**
    - [1) Access to the console of AWS Cloud Formation](#1-access-to-the-console-of-aws-cloud-formation)
    - [2) Select 'Create Stack' ⇨ 'With new resources'](#2-select-create-stack-with-new-resources)
    - [3) Option 'Specify template' ⇨ 'Amazon S3 URL' with the following URL](#3-option-specify-template-amazon-s3-url-with-the-following-url)
    - [4) Specify stack details](#4-specify-stack-details)
    - [5) Create your stack](#5-create-your-stack)
    - [6) Administration](#6-administration)
- **[Domain and SSL Configuration Examples](#domain-and-ssl-configuration-examples)**
    - [Self-signed certificate](#1-self-signed-certificate)
    - [Let's Encrypt certificate](#2-lets-encrypt-certificate)
    - [Custom Certificate (Commercial CA)](#3-custom-certificate-commercial-ca)
    - [Common Problems](#common-problems)
- **[Scalability](#scalability)**
    - [Set the number of Media Nodes on startup](#set-the-number-of-media-nodes-on-startup)
    - [Change the number of Media Nodes on the fly](#change-the-number-of-media-nodes-on-the-fly)
- **[Updating OpenVidu Pro configuration](#updating-openvidu-pro-configuration)**
- **[Troubleshooting](#troubleshooting)**
    - [CREATE_FAILED CloudFormation stack](#create_failed-cloudformation-stack)
    - [Kurento Media Server crash](#kurento-media-server-crash)

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

### 2) Select _Create Stack_ ⇨ _With new resources_

<p>
    <img class="img-responsive deploy-img" style="margin: auto; max-height: 400px" src="img/docs/deployment/CF_newstack.png">
</p>

---

### 3) Option _Specify template_ ⇨ _Amazon S3 URL_ with the following URL

<code id="code-2">https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/CF-OpenVidu-Pro-latest.yaml</code>
<button id="btn-copy-2" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button" title="Copy to Clipboard">Copy</button>

<p>
    <img class="img-responsive deploy-img" src="img/docs/deployment/CF_url.png">
</p>

> To deploy a fixed version, including previous ones, replace `latest` with the desired version number.<br>
> For example: <code>https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/CF-OpenVidu-Pro-<strong>2.26.2</strong>.yaml</code>

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

> If you have questions about how to configure your Domain and SSL certificates, you can check these examples:
>
- [Self-signed certificate example](#1-self-signed-certificate)
- [Let's Encrypt certificate example](#2-lets-encrypt-certificate)
- [Custom Certificate example (Commercial CA)](#3-custom-certificate-commercial-ca)

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
      <td class="first-col">Openvidu Secret<br><span class="field-comment">Secret to connect to this OpenVidu Platform. Cannot be empty and must contain only alphanumeric characters [a-zA-Z0-9], hypens "-" and underscores "_"<span></td>
      <td><em>Your choice</em></td>
    </tr>
  </table>
</div>

> There are many other configuration values that can be set once the deployment has completed. Check out section [Updating OpenVidu Pro configuration](#updating-openvidu-pro-configuration) once the deployment is done.

#### OpenVidu Recording Configuration

Configure if you want or not to enable OpenVidu Recordings and what type of persistence do you want.

<div style="text-align: center" class="table-responsive">
  <table class="deploy-fields-table color-table-gray" style="margin-top: 10px; margin-bottom: 10px">
    <tr>
      <td class="first-col">OpenVidu Recording</td>
      <td>
        Possible values:
        <ul>
          <li><strong>disabled</strong> Recordings will not be active.</li>
          <li><strong>local</strong> Recordings will be active and saved locally.</li>
          <li><strong>s3</strong> Recordings will be active and saved in s3.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td class="first-col">S3 Bucket where recordings will be stored</td>
      <td>Name for the bucket you want to use. If empty, a new bucket will be created with the cloudformation stack id</td>
    </tr>
  </table>
</div>

#### Elasticsearch configuration

You have three options for configuring the deployment with Elasticsearch and Kibana:

- **1)** Using an external Elasticsearch and Kibana deployment.
- **2)** Using an Elasticsearch and Kibana deployed next to the OpenVidu Server master node.
- **3)** Not deploying Elasticsearch and Kibana at all.

The next sections will take a closer look at these three options.
##### Option 1: External Elasticsearch and Kibana (Recommended)

Requirements to use an external Elasticsearch and Kibana are:

- A running Elasticsearch and Kibana deployment. If you don't have any Elastic Stack deployed, check this [guide](openvidu-pro/monitoring-elastic-stack/#examples-of-managed-elastic-stack-services) on how to deploy an Elastic Stack as a service in AWS or Elastic Cloud.
- An user configured in your Elastic Stack to be used in the OpenVidu configuration. You can use a normal user with all privileges or just use a fine-grained one. Check this guide on [how to create a fine-grained](openvidu-pro/monitoring-elastic-stack/#create-a-fine-grained-user) user.

After that, just fill this section of the form with these parameters:

<div style="text-align: center" class="table-responsive">
  <table class="deploy-fields-table color-table-gray" style="margin-top: 10px; margin-bottom: 10px">
    <tr>
      <td class="first-col">Enable Elasticsearch and Kibana</td>
      <td>Parameter which enables or disables the use of Elasticsearch and Kibana by OpenVidu Pro. In this case, it must be set to <code>true</code>.</td>
    </tr>
    <tr>
      <td class="first-col">Elasticsearch URL</td>
      <td><em>URL of the Elasticsearch service.</em> For example: <code>https://elk.example.com</code></td>
    </tr>
    <tr>
      <td class="first-col">Kibana URL</td>
      <td><em>URL of the Kibana service.</em> For example: <code>https://elk.example.com/kibana</code></td>
    </tr>
    <tr>
      <td class="first-col">Elasticsearch and Kibana username</td>
      <td><em>Username of the user configured in your Elastic Stack.</em></td>
    </tr>
    <tr>
      <td class="first-col">Elasticsearch and Kibana password</td>
      <td><em>Password of the user configured in your Elastic Stack.</em></td>
    </tr>
  </table>
</div>
<br>

##### Option 2: Elasticsearch and Kibana deployed next to OpenVidu

Configuring Elasticsearch and Kibana next to OpenVidu is convenient sometimes because the cloudformation template is prepared to deploy automatically such services.
But this option can have it downsides because Elasticsearch, Kibana and OpenVidu Server Pro will be running in the same machine. These downsides are:

- **You will need to monitor disk space**: OpenVidu generates events and all logs and metrics are sent to Elasticsearch. You will need to take special care of the `OPENVIDU_PRO_ELASTICSEARCH_MAX_DAYS_DELETE` parameter in the `/opt/openvidu/.env` file of your deployment so you don't run out of disk space.
- **Resources used By OpenVidu Server Pro are shared with Elasticsearch and Kibana**: It is well known that Elasticsearch and Kibana can consume a lot of resources. If you want to keep OpenVidu Server Pro free of this resource consumption, it is recommended to deploy Elasticsearch and Kibana externally.

<div style="text-align: center" class="table-responsive">
  <table class="deploy-fields-table color-table-gray" style="margin-top: 10px; margin-bottom: 10px">
    <tr>
      <td class="first-col">Enable Elasticsearch and Kibana</td>
      <td>Parameter which enables or disables the use of Elasticsearch and Kibana by OpenVidu Pro. In this case, it must be set to <code>true</code>.</td>
    </tr>
    <tr>
      <td class="first-col">Elasticsearch URL</td>
      <td><em>Empty.</em> You don't want to use any external Elasticsearch service</td>
    </tr>
    <tr>
      <td class="first-col">Kibana URL</td>
      <td><em>Empty.</em> You don't want to use any external Kibana Service.</td>
    </tr>
    <tr>
      <td class="first-col">Elasticsearch and Kibana username</td>
      <td><em>Your choice.</em> It will be configured while deploying.</td>
    </tr>
    <tr>
      <td class="first-col">Elasticsearch and Kibana password</td>
      <td><em>Your choice.</em> It will be configured while deploying.</em></td>
    </tr>
  </table>
</div>
<br>

##### Option 3: No Elasticsearch and Kibana

If you don't want to use Elasticsearch and Kibana, just configure the following parameters:

<div style="text-align: center" class="table-responsive">
  <table class="deploy-fields-table color-table-gray" style="margin-top: 10px; margin-bottom: 10px">
    <tr>
      <td class="first-col">Enable Elasticsearch and Kibana</td>
      <td>Parameter which enables or disables the use of Elasticsearch and Kibana by OpenVidu Pro. In this case, it must be set to <code>false</code>.</td>
    </tr>
    <tr>
      <td class="first-col">Elasticsearch URL</td>
      <td><em>Empty.</em> You don't want to use any external Elasticsearch service</td>
    </tr>
    <tr>
      <td class="first-col">Kibana URL</td>
      <td><em>Empty.</em> You don't want to use any external Kibana Service.</td>
    </tr>
    <tr>
      <td class="first-col">Elasticsearch and Kibana username</td>
      <td><em>Empty.</em> You don't need to configure any username.</td>
    </tr>
    <tr>
      <td class="first-col">Elasticsearch and Kibana password</td>
      <td><em>Empty.</em> You don't need to configure any password.</em></td>
    </tr>
  </table>
</div>

<br>

#### EC2 Instance configuration

These properties configure specific details of the EC2 machines that will be launched by CloudFormation.

<div style="text-align: center" class="table-responsive">
  <table class="deploy-fields-table color-table-gray" style="margin-top: 10px; margin-bottom: 10px;">
    <tr>
      <td class="first-col">Instance type for Master Node<br><span class="field-comment">Type of EC2 Instance where to deploy the <a href="openvidu-pro/scalability/#openvidu-pro-architecture">Master Node</a><span></td>
      <td><em>Choose from the drop-down button</em></td>
    </tr>
    <tr>
      <td class="first-col">Instance type for Media Nodes<br><span class="field-comment">Type of EC2 Instance where to deploy the <a href="openvidu-pro/scalability/#openvidu-pro-architecture">Media Nodes</a><span></td>
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
    <tr>
      <td class="first-col">Deploy Coturn in Media Nodes. (Experimental)<br><span class="field-comment">Now TURN/STUN (Coturn) service can be deployed at media nodes. Using Media nodes for Coturn implies better performance and scalability for the Coturn service deployed with OpenVidu. If true, Coturn will be deployed at media nodes. <a href="deployment/pro/on-premises/#coturn-configuration" target="_blank">More info.</a><span></td>
      <td><em>Choose from the drop-down button</em></td>
    </tr>
  </table>
</div>

<br>

---

### 5. Create your stack

No extra options are necessary. Click on  **_Next_** ➞ **_Next_** ➞ **_Create stack_**

**_CREATE_IN_PROGRESS_** status will show up. You will now have to wait for a few minutes (about 10) until it shows **_CREATE_COMPLETE_**. If status reaches CREATE_FAILED, check out [this section](#create_failed-cloudformation-stack).

To connect to **OpenVidu Inspector** and the **Kibana dashboard**, simply access `Outputs` tab after **_CREATE_COMPLETE_** status is reached. There you will have both URLs to access both services.

<div class="row">
    <div style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro12" data-type="image" class="fancybox-img" href="img/docs/openvidu-pro/marketplace/marketOutputs.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/marketplace/marketOutputs.png"/></a>
    </div>
</div>

To consume [OpenVidu REST API](reference-docs/REST-API/), use URL `https://OPENVIDUPRO_PUBLIC_IP/`. For example, in the image above that would be `https://ec2-34-244-193-135.eu-west-1.compute.amazonaws.com/` using AWS domain. When deploying with a custom domain name (which you should do for a production environment), of course you must use your domain name instead.

If you have deployed OpenVidu Call you can also access to it through that same URL. You can now add your own application to your instance. To learn how check out section [Deploy OpenVidu based applications](deployment/#deploy-openvidu-based-applications).
<br>

<div class="warningBoxContent">
  <div style="display: table-cell; vertical-align: middle;">
      <i class="icon ion-android-alert warningIcon"></i>
  </div>
  <div class="warningBoxText">
   While deploying the stack, you will see a warning in Cloudformation with this message: <br><br><strong><center>The following resource(s) require capabilities: [AWS::IAM::Role]</center></strong><br> You need to accept it for OpenVidu PRO deployment to work. OpenVidu PRO needs two IAM Roles: <br><br><ul><li>The <code>CloudformationLambdaRole</code> only used by a Lambda resource to copy original AMIs of OpenVidu to your account. In this way, we can ensure that your deployment will still work even if the AMI is deprecated or removed officially, so your deployment will always work. <br><br> The AMI will be copied once, and their names start with <code>[ OpenVidu PRO Master Node AMI Copy ]</code> and <code>[ OpenVidu PRO/ENTERPRISE Media Node AMI Copy ]</code>. This is the AMI that will be used in your deployment. Also, the <code>CloudformationLambdaRole</code> is used to remove all media nodes when the Cloudformation is removed.</li><br><li>Another role which OpenVidu PRO needs to create, remove and autodiscover media nodes deployed. This role is defined in the cloudformation template as <code>OpenViduManageEC2Role</code></li></ul><br>You can check both roles in the Cloudformation template.
  </div>
</div>

---

### 6. Administration

AWS deployments of OpenVidu Pro are internally identical to [on premises deployments](deployment/pro/on-premises/). This means that you can manage OpenVidu platform very easily by connecting to your instances through SSH.

- **Master Node**: located at the default installation path `/opt/openvidu` as `root` user (`$ sudo su`), you will be able to manage the services as explained in on premises [Master Node administration](deployment/pro/on-premises/#24-administration).
- **Media Nodes**: located at the default installation path `/opt/kms` as `root` user (`$ sudo su`), you will be able to manage the services as explained in on premises [Media Nodes administration](deployment/pro/on-premises/#34-administration).

<br>

---

## Domain and SSL Configuration Examples

These examples are focusing in the [Domain and SSL certificate configuration](#domain-and-ssl-certificate-configuration) section of the [Deploying OpenVidu Pro on AWS](#deployment-instructions) instructions to clarify any doubt on how to configure it.

As OpenVidu Pro is deployed with default sane configuration, your domain and SSL certificate configuration are the most important parameters to deploy your stack correctly.

Let's see all different scenarios:

### 1) Self-signed certificate

<div class="warningBoxContent">
  <div style="display: table-cell; vertical-align: middle;">
      <i class="icon ion-android-alert warningIcon"></i>
  </div>
  <div class="warningBoxText">
        This example should be used only for development environments. <strong>Don't use it in production</strong>.
  </div>
</div>

This scenario is meant for you if you want to:

- Deploy OpenVidu Pro quickly for testing or developing purposes.
- Deploy OpenVidu Pro without a Fully Qualified Domain Name (FQDN).

#### 1.1) Cloudformation parameters 🔗

Let's see an example of this scenario for the Cloudformation parameters section:

<div class="row">
    <div style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-example-1" data-type="image" class="fancybox-img" href="img/docs/deployment/aws-examples-selfsigned-no-fqdn.png"><img width="650px" class="img-responsive img-deploy-example" src="img/docs/deployment/aws-examples-selfsigned-no-fqdn.png"/></a>
    </div>
</div>

1. Select as Certificate type: **selfsigned**
2. Keep all the parameters in the **Domain and SSL certificate configuration** section empty, because we don't have any Elastic Ip, domain or other SSL configuration to specify in this scenario.

### 2) Let's Encrypt certificate

This scenario is meant for you if you want to:

- Deploy OpenVidu Pro for production or even developing purposes.
- Deploy OpenVidu Pro with a Fully Qualified Domain Name (FQDN).
- Use a valid SSL certificate.

For this specific scenario you will need to:

#### 2.1) Create an Elastic IP

1. Go to your EC2 AWS section, and click here:
<div class="row">
    <div style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-example-lets-1" data-type="image" class="fancybox-img" href="img/docs/deployment/aws-examples-letsencrypt-1.png"><img width="200px" class="img-responsive img-deploy-example" src="img/docs/deployment/aws-examples-letsencrypt-1.png"/></a>
    </div>
</div>
2. Click on **Allocate Elastic IP address**
<div class="row">
    <div style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-example-lets-1" data-type="image" class="fancybox-img" href="img/docs/deployment/aws-examples-letsencrypt-2.png"><img class="img-responsive img-deploy-example" src="img/docs/deployment/aws-examples-letsencrypt-2.png"/></a>
    </div>
</div>
3. This will generate an Elastic IP that you will be able to use for your OpenVidu Pro deployment with letsencrypt
<div class="row">
    <div style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-example-lets-1" data-type="image" class="fancybox-img" href="img/docs/deployment/aws-examples-letsencrypt-3.png"><img class="img-responsive img-deploy-example" src="img/docs/deployment/aws-examples-letsencrypt-3.png"/></a>
    </div>
</div>

#### 2.2) Register a FQDN pointing to the Elastic IP

This step will depend of the DNS register you want to use. You need to create a DNS register of **type A pointing to the Elastic IP created before**. For the next steps, let's suppose that our domain is: **example.openvidu.io**.

#### 2.3) Cloudformation parameters

Let's see an example of this scenario for the Cloudformation parameters section:

<div class="row">
    <div style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-example-lets-4" data-type="image" class="fancybox-img" href="img/docs/deployment/aws-examples-letsencrypt-4.png"><img class="img-responsive img-deploy-example" src="img/docs/deployment/aws-examples-letsencrypt-4.png"/></a>
    </div>
</div>

The important fields of this section are:

- The **AWS Elastic IP (EIP)** with the Elastic IP created in step [2.1](#21-create-an-elastic-ip)
- The **Domain Name pointing to Elastic IP** with the FQDN created at step [2.2](#22-register-a-fqdn-pointing-to-the-elastic-ip)
- The **Email for Let's Encrypt** with the email you want to use for your Let's Encrypt certificate.

### 3) Custom Certificate (Commercial CA)

This scenario is meant for you if you want to:

- Deploy OpenVidu Pro for production.
- Deploy OpenVidu Pro with a Fully Qualified Domain Name (FQDN).
- Use a valid SSL certificate from a **Commercial CA**.

For this specific scenario you will need to:

#### 3.1) Generate certificates files

To use this kind of certificate, you need to generate two files, `certificate.cert` (public keys of the certificate) and `certificate.key` (private key), and upload them to an HTTP server to make it available for the Cloudformation parameters. But first, follow these steps to generate these files: <br><br>

**1)** Create a CSR and a private key. This can be easily done by executing:
```bash
openssl req -newkey rsa:2048 -nodes -keyout certificate.key -out certificate.csr
```
While executing this command, you will be asked to enter some information to generate the files `certificate.key` and `certificate.csr`. Ensure that all these information are correctly inserted (**Common Name**, **Organization Name**, etc...). The most important parameter is the **Common Name** field which should match the name that you want to use for your certificate.

For example, let's suppose that your domain is **example.openvidu.io**. The parameter **Common Name** could be: **example.openvidu.io** or **www.example.openvidu.io**. Otherwise, if you're using a WildCart certificate, the **Common Name** parameter would be ** *.openvidu.io**.

**2)** The previous command generated the `certificate.key` and `certificate.csr` files. The `certificate.csr` is the one that you need to provide to your CA. Depending of your CA this step can differ. **Check your CA documentation about this topic**.

**3)** Usually the files to generate the `certificate.cert` can be downloaded or are sent via email from the CA. These files are:

- The intermediate certificate. (It usually have more than one key with `---BEGIN CERTIFICATE---` This file will be called as `intermediate.cert` in following steps.
- Your ssl certificate.  An unique certificate key with `---BEGIN CERTIFICATE---`. This file will be called as `public.cert` in following steps.<br>

**4)** You need to concat these two files in an unique `certificate.cert` file in this way:
```bash
cat public.cert intermediate.crt > certificate.cert
```

**5)** Now you have the `certificate.key` generated in step 1) and the `certificate.cert` generated in step 4).

<div style="
    display: table;
    border: 2px solid #0088aa9e;
    border-radius: 5px;
    width: 100%;
    margin-top: 40px;
    margin-bottom: 10px;
    padding: 10px 0;
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
If you're still having doubts about how to generate the certificates files, you can follow this <a href="https://www.digitalocean.com/community/tutorials/how-to-install-an-ssl-certificate-from-a-commercial-certificate-authority" target="_blank">guide</a> for a further understanding.
</div>
</div>

<br><br>

#### 3.2) Upload your certificate files into an HTTP server.

Now that you have both certificate files, you need to make it available via HTTP for the Cloudformation template. Let's suppose that you upload both files and the URLs are:

- `http://example-http-server.io/certificate.cert`
- `http://example-http-server.io/certificate.key`

#### 3.3) Create an Elastic IP and a FQDN pointing to it.

Just follow the same steps of the Let's Encrypt section: [2.1](#21-create-an-elastic-ip) and [2.2](#22-register-a-fqdn-pointing-to-the-elastic-ip)


#### 3.4) Cloudformation parameters

Let's see an example of this scenario for the Cloudformation parameters section:

<div class="row">
    <div style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-example-own-1" data-type="image" class="fancybox-img" href="img/docs/deployment/aws-examples-owncert-1.png"><img class="img-responsive img-deploy-example" src="img/docs/deployment/aws-examples-owncert-1.png"/></a>
    </div>
</div>

These are the important fields of the cloudformation parameters:

- The **AWS Elastic IP (EIP)** with the Elastic IP created in step [2.1](#21-create-an-elastic-ip)
- The **Domain Name pointing to Elastic IP** with the FQDN created at step [2.2](#22-register-a-fqdn-pointing-to-the-elastic-ip)
- The **URL to the CRT file (owncert)** with the URL to the `certificate.cert` file created at step [3.1](#31-generate-the-certificates-files-using-the-commercial-ca-services) and uploaded to an HTTP server in step [3.2](#32-upload-your-certificate-files-into-an-http-server).
- The **URL to the key file (owncert)** with the URL to the `certificate.key` file created at step [3.1](#31-generate-the-certificates-files-using-the-commercial-ca-services) and uploaded to an HTTP server in step [3.2](#32-upload-your-certificate-files-into-an-http-server).

#### 3.5) Remove your certificates files from the HTTP server of step [3.2](#32-upload-your-certificate-files-into-an-http-server)

It is very important after the deployment to invalidate the URLs created at step [3.2](#32-upload-your-certificate-files-into-an-http-server) after the stack is successfully deployed. These files available via HTTP are only necessary for CloudFormation EC2 instances to be able to download the certificate files and configure it into the system and are no longer necessary after the deployment process.

### Common problems

- [Nginx is not working.](troubleshooting/#13-nginx-is-not-working)
- [Do I need to update Let's Encrypt certificates?](troubleshooting/#14-do-i-need-to-update-lets-encrypt-certificates)
- [My commercial certificate is not working, What can I do?](troubleshooting/#15-my-commercial-certificate-is-not-working-what-can-i-do)
- [How can I customize Nginx](troubleshooting/#16-how-can-i-customize-deployed-nginx)

---

## Scalability

### Set the number of Media Nodes on startup

When filling the CloudFormation form, simply set the desired number in section [OpenVidu configuration](#openvidu-configuration).

<div class="row">
    <div style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro2" data-type="image" class="fancybox-img" href="img/docs/openvidu-pro/marketplace/marketClusteringOptions.png"><img class="img-responsive img-pro img-pro-small" src="img/docs/openvidu-pro/marketplace/marketClusteringOptions.png"/></a>
    </div>
</div>

In section [EC2 Instance configuration](#ec2-instance-configuration) you can choose the size of your Master Node and your Media Nodes.

<div class="row">
    <div style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro2" data-type="image" class="fancybox-img" href="img/docs/openvidu-pro/marketplace/marketOthers.png"><img class="img-responsive img-pro img-pro-small" src="img/docs/openvidu-pro/marketplace/marketOthers.png"/></a>
    </div>
</div>

### Change the number of Media Nodes on the fly

You can launch and drop Media Nodes dynamically in two different ways:

#### From OpenVidu Inspector

In Cluster page you can launch and drop Media Nodes just by pressing buttons.

<div class="row">
    <div style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro3" data-type="image" class="fancybox-img" href="img/docs/openvidu-pro/pro18.png"><img class="img-responsive img-pro img-pro-small" src="img/docs/openvidu-pro/pro18.png"/></a>
    </div>
</div>

#### With OpenVidu Pro REST API

You can programmatically launch and drop Media Nodes from your application by consuming OpenVidu Pro REST API.

- **Launch a Media Node**: **[POST /openvidu/api/media-nodes](reference-docs/REST-API/#post-medianode)**
- **Drop a Media Node**: **[DELETE /openvidu/api/media-nodes](reference-docs/REST-API/#delete-medianode)**

> **WARNING**: there are some important aspects to keep in mind when launching and dropping Media Nodes in AWS deployments, especially through OpenVidu Pro REST API (OpenVidu Inspector UI is quite self-descriptive):
>
> - Trying to drop a Media Node which is currently hosting an OpenVidu Session will fail by default. You can manage the drop policy when calling [DELETE /openvidu/api/media-nodes](reference-docs/REST-API/#delete-medianode) through parameter `deletion-strategy`.<br><br>
> - Launching/Dropping Media Nodes in AWS OpenVidu Pro deployments will automatically start/terminate EC2 instances. The termination of an EC2 instance that was hosting a removed Media Node will be done only when it is safe. This moment is reached when OpenVidu Webhook event [mediaNodeStatusChanged](reference-docs/openvidu-server-webhook/#medianodestatuschanged) is triggered with value `terminated`.

<br>

---

## Updating OpenVidu Pro configuration

You may want to change the current configuration of an existing OpenVidu Pro cluster. This configuration includes all of the parameters listed in these pages:

- [OpenVidu CE configuration](reference-docs/openvidu-config)
- [OpenVidu Pro configuration](reference-docs/openvidu-config)

Once the cluster is running, there are different ways you can update the value of the configuration parameters. Take into account that all of them require restarting your OpenVidu Server Pro process, so **any active OpenVidu Session will be terminated**.

### 1) With OpenVidu Inspector

OpenVidu Inspector allows you to restart the OpenVidu Server Pro process from **Config** page just by filling a formulary.<br>More information [here](openvidu-pro/openvidu-inspector#programmatic-reset).

> **NOTE 1**: take into account that not all configuration properties are able to be updated this way<br>
> **NOTE 2**: new values will be stored and remembered, so they will be used when OpenVidu Server Pro is restarted in the future

### 2) With OpenVidu Pro REST API

You can consume REST API method **[POST /openvidu/api/restart](reference-docs/REST-API/#post-restart)** to programmatically restart the OpenVidu Server Pro process and update its configuration values.

> **NOTE 1**: take into account that not all configuration properties are able to be updated this way<br>
> **NOTE 2**: new values will be stored and remembered, so they will be used when OpenVidu Server Pro is restarted in the future

### 3) Manually connecting through SSH

The ultimate and most definitive way of updating the configuration parameters of an OpenVidu Pro cluster is connecting to the Master Node through SSH and changing the desired values:

1. SSH to the Master Node machine using your private rsa key
2. Using root user with `sudo su` command, go to OpenVidu Pro installation folder (default and recommended is `/opt/openvidu`)
2. Update file `.env` with the new configuration values
3. Restart OpenVidu Server Pro with `./openvidu restart`

Keep an eye on the OpenVidu logs that will automatically display after restarting the service to check that everything went well.

<br>

---

## Troubleshooting

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
  AWS deployments of OpenVidu Pro work under the hood in the exact same manner as on premises deployments. So <strong>everything explained in <a href="deployment/pro/on-premises/#troubleshooting">Troubleshooting</a> section of on premises deployments also applies to AWS deployments</strong>. There you have detailed instructions on how to debug all of OpenVidu services in case some unexpected problem appears.
</div>
</div>

### CREATE_FAILED CloudFormation stack

First of all, an AWS CloudFormation stack may reach `CREATE_FAILED` status for missing a default VPC.

You can inspect your default VPCs like this: [https://docs.aws.amazon.com/vpc/latest/userguide/default-vpc.html#view-default-vpc](https://docs.aws.amazon.com/vpc/latest/userguide/default-vpc.html#view-default-vpc){:target="_blank"}<br>
And you can create a default VPC like this: [https://docs.aws.amazon.com/vpc/latest/userguide/default-vpc.html#create-default-vpc](https://docs.aws.amazon.com/vpc/latest/userguide/default-vpc.html#create-default-vpc){:target="_blank"}

If that is not the problem, then follow these steps:

- **1)** Try to deploy again, but this time disabling option `Rollback on failure` (Configure stack options 🡆 Advanced Options 🡆 Stack creation options). This will prevent the instance to be terminated in case of failure so logs can be gathered. Once you re-deploy with this option, the stack will still fail but you’ll be able to access instances through SSH and retrieve some files to debug the problem.

<div class="row">
    <div style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-pro13" data-type="image" class="fancybox-img" href="img/docs/deployment/CF_1_troubleshooting_rollback.png"><img class="img-responsive img-pro" src="img/docs/deployment/CF_1_troubleshooting_rollback.png"/></a>
    </div>
</div>

- **2)** We will also need the parameters you've used to deploy, to check possible problems in their values

<div class="row">
    <div style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-pro13" data-type="image" class="fancybox-img" href="img/docs/deployment/CF_1_troubleshooting_rollback.png"><img class="img-responsive img-pro" src="img/docs/deployment/CF_2_troubleshooting_parameters.png"/></a>
    </div>
</div>

- **3)** Once you have performed step 1) and the stack creation has failed, please SSH into the instances created and share with us Cloudformation logs

    - `/var/log/cloud-init.log`
    - `/var/log/cloud-init-output.log`
<br><br>

- **4)** Get also the log output of all the services. Check [this section](deployment/pro/on-premises/#show-service-logs) to see services logs:

<br>

---

### Kurento Media Server crash

Sometimes Kurento Media Server (the service in charge of streaming media inside of Media Nodes) may crash. If this happens on a regular basis, or better, you have isolated a specific use case where KMS always crashes, then perform the following steps to collect a crash report that will help us fix the issue.

In AWS deployments of OpenVidu Pro, KMS crash reports are enabled by default. You can directly get them with the following steps:

#### 1) Download the KMS crash reports

```bash
ssh -i AWS_SSH_KEY ubuntu@MEDIA_NODE_IP "sudo tar zcvfP ~/core_dumps.tar.gz /opt/openvidu/kms-crashes/*"
scp -i AWS_SSH_KEY ubuntu@MEDIA_NODE_IP:~/core_dumps.tar.gz .
```

Replace `AWS_SSH_KEY` with the path to the SSH key of your Media Node EC2 instance and `MEDIA_NODE_IP` with its IP address. This only applies to a single Media Node. If you have more Media Nodes experiencing KMS crashes, perform these same steps in all of them. Send us the resulting zipped report files.

#### 2) Clean the KMS crash reports

So as not to consume too much hard drive, delete the crash reports once you have downloaded them. **IMPORTANT**: obviously, do NOT do this before downloading the report.

```bash
ssh -i AWS_SSH_KEY ubuntu@MEDIA_NODE_IP "sudo rm /opt/openvidu/kms-crashes/* && sudo rm ~/core_dumps.tar.gz"
```

Replace `AWS_SSH_KEY` with the path to the SSH key of your Media Node EC2 instance and `MEDIA_NODE_IP` with its IP address. This only applies to a single Media Node and must be performed for each Media Node from which you downloaded a crash report.

<br>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js"></script>
<script type='text/javascript' src='js/fancybox-setup.js'></script>

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
