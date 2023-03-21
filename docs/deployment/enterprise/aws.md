<h2 id="section-title">Deploying OpenVidu Enterprise in AWS</h2>
<hr>

- **[Intro](#intro)**
- **[Single Master deployment](#single-master-deployment)**
- **[High Availability deployment](#high-availability-deployment)**
    - **[Deployment](#deployment)**
        - [1) Previous requirements](#1-previous-requirements)
        - [2) Access to the console of AWS Cloud Formation](#2-access-to-the-console-of-aws-cloud-formation)
        - [3) Select Create Stack ⇨ With new resources](#3-select-create-stack-with-new-resources)
        - [4) Option Specify template ⇨ Amazon S3 URL with the following URL](#4-option-specify-template-amazon-s3-url-with-the-following-url)
        - [5) Specify stack details](#5-specify-stack-details)
            - [5.1) OpenVidu Configuration Parameters](#51-openvidu-configuration-parameters)
            - [5.2) Elasticsearch and Kibana Configuration](#52-elasticsearch-and-kibana-configuration)
            - [5.3) EC2 and Autoscaling configuration](#53-ec2-and-autoscaling-configuration)
            - [5.4) Load Balancer Certificate configuration](#54-load-balancer-certificate-configuration)
            - [5.5) Networking configuration](#55-networking-configuration)
        - [6) Configure your domain when the stack has been created](#6-configure-your-domain-when-the-stack-has-been-created)
    - **[Administration](#administration)**
        - [Check cluster after deploy](#check-cluster-after-deploy)
            - [1) Check Master Nodes](#1-check-master-nodes)
            - [2) Check Media Nodes](#2-check-media-nodes)
            - [3) Check AWS Events reaching Master Nodes](#3-check-aws-events-reaching-master-nodes)
        - [OpenVidu Enterprise Configuration](#openvidu-enterprise-configuration)
            - [1) Change the configuration via API Rest](#1-change-the-configuration-via-api-rest)
            - [2) Change configuration by modifying S3 configuration file](#2-change-configuration-by-modifying-s3-configuration-file)
        - [Autoscaling Configuration](#autoscaling-configuration)
        - [Troubleshouting](#troubleshouting)
        - [Deploying an OpenVidu application](#deploying-an-openvidu-application)

---

## Intro

OpenVidu Enterprise offers two different deployment models:

- **Single Master deployment**: one Master Node, multiple Media Nodes. This is the same architecture used by [OpenVidu Pro](openvidu-pro/scalability/#openvidu-pro-architecture).
- **High Availability deployment**: multiple Master Nodes, multiple Media Nodes. See [High Availability documentation](openvidu-enterprise/high-availability/).

<div class="row">
    <div class="pro-gallery" style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-pro1" data-type="image" class="fancybox-img" href="img/docs/openvidu-enterprise/enterprise-architecture-models.png"><img class="img-responsive" style="margin: auto; max-height: 480px" src="img/docs/openvidu-enterprise/enterprise-architecture-models.png"/></a>
    </div>
</div>

<br><hr>

## Single Master deployment

<br>
OpenVidu Enterprise with a single Master Node can be deployed with the [same Cloudformation used for OpenVidu PRO](deployment/pro/aws).

You just need to specify `enterprise` at the OpenVidu Edition section while deploying the Cloudformation.<br><br>

<p>
    <img class="img-responsive deploy-img" src="img/docs/deployment/openvidu_edition_CF.png">
</p>


<br><hr>

## High Availability deployment
<br>

OpenVidu Enterprise can be deployed with multiple Master nodes to have High Availability and be fault tolerant. In this section, we will explain step by step, how to deploy OpenVidu Enterprise with such capabilities. If you want to read more about OpenVidu Enterprise High Availability architecture, check it out [here](openvidu-enterprise/high-availability).

### Deployment

In this section there is a detailed explanation on how to deploy OpenVidu Enterprise and what is needed previously. You can follow this guide and if you have some doubts, you can also check this tutorial:

<br>
<iframe style="display:block; margin: auto;" width="560" height="315" src="https://www.youtube.com/embed/lezhHlJg-xM?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<br>

#### 1) Previous requirements

<br>

To deploy OpenVidu Enterprise in AWS with High Availability you need at least:

- **A FQDN (Fully Qualified Domain Name)**. The domain name will be configured at the end of the instructions to point to the Load Balancer URL created by the CloudFormation Stack.
- **A valid certificate for your FQDN installed in AWS**. The CloudFormation automatically launches a Load Balancer to be used as entry point to the OpenVidu cluster. The CloudFormation needs the ARN of the certificate as a parameter.
- **A running Elasticsearch and Kibana deployment**. If you do not have any Elastic Stack deployed, check this [guide](openvidu-pro/monitoring-elastic-stack/#examples-of-managed-elastic-stack-services) on how to deploy an Elastic Stack as a service in AWS or Elastic Cloud.
- **A user configured in your Elastic Stack to be used in the OpenVidu configuration**. You can use a normal user with all privileges, or just use a fine-grained one. Check this guide on [how to create a fine-grained](openvidu-pro/monitoring-elastic-stack/#create-a-fine-grained-user) user.

#### 2) Access to the console of AWS Cloud Formation

<p style="text-align: center; margin-top: 20px"><a href="https://console.aws.amazon.com/cloudformation#stacks" class="btn btn-xs btn-primary" title="Developing OpenVidu" target="_blank">Go to CloudFormation<span class="icon icon-circle-arrow-right"></span></a></p>

<br>

---

#### 3) Select _Create Stack_ ⇨ _With new resources_

<p>
    <img class="img-responsive deploy-img" style="margin: auto; max-height: 400px" src="img/docs/deployment/CF_newstack.png">
</p>

---

#### 4) Option _Specify template_ ⇨ _Amazon S3 URL_ with the following URL

<code id="code-2">https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/CF-OpenVidu-Enterprise-latest.yaml</code>
<button id="btn-copy-2" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button" title="Copy to Clipboard">Copy</button>

<p>
    <img class="img-responsive deploy-img" src="img/docs/deployment/CF_url.png">
</p>

> To deploy a fixed version, including previous ones, replace `latest` with the desired version number.<br>
> For example: <code>https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/CF-OpenVidu-Enterprise-<strong>2.25.1</strong>.yaml</code>

<br>

<div class="warningBoxContent">
  <div style="display: table-cell; vertical-align: middle;">
      <i class="icon ion-android-alert warningIcon"></i>
  </div>
  <div class="warningBoxText">
   While deploying the stack, you will see a warning in Cloudformation with this message: <br><br><strong><center>The following resource(s) require capabilities: [AWS::IAM::Role]</center></strong><br> You need to accept it for OpenVidu Enterprise deployment to work. OpenVidu Enterprise needs three IAM Roles: <br><br><ul><li>The <code>LambdaOnCreate</code> only used by a Lambda resource while the Cloudformation is deploying resources. Its purpose is to let a Lambda resource to copy original AMIs of OpenVidu Enterprise into your account. In this way, we can ensure that your deployment will still work even if the AMI is deprecated or removed officially, so your deployment will always work. <br><br> The AMI will be copied once, and their names start with <code>[ OpenVidu ENTERPRISE Master Node AMI Copy ]</code> and <code>[ OpenVidu PRO/ENTERPRISE Media Node AMI Copy ]</code>. This is the AMI that will be used in your deployment.<br><li>The <code>LambdaOnDeleteRole</code> is used by a Lambda which is executed when the Cloudformation is deleted. Its purpose is to configure autoscaling groups so media nodes and master nodes can be deleted safely. </li><br><li>The <code>OpenViduProMasterRole</code> which allows master nodes, so it can work properly with its own S3 bucket and interact correctly with Autoscaling groups.</li></ul><br>You can check all these roles in the Cloudformation template.
  </div>
</div>

---

#### 5) Specify stack details

First, indicate a name for your deployment. Next fill each section with the **Parameters** formulary. **Read carefully all parameters because all of them are important**:

##### 5.1) OpenVidu Configuration Parameters

<div class="row">
    <div style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-example-multimaster-1" data-type="image" class="fancybox-img" href="img/docs/deployment/multimaster_parameters_1.png"><img width="650px" class="img-responsive img-deploy-example" src="img/docs/deployment/multimaster_parameters_1.png"/></a>
    </div>
</div>

<div style="text-align: center" class="table-responsive">
  <table class="deploy-fields-table color-table-gray" style="margin-top: 10px; margin-bottom: 0px">
    <tr>
      <td class="first-col">Domain Name</br><span class="field-comment">This is the FQDN that will be used to access OpenVidu Enterprise. This parameter will be configured at the end of the instructions to point to the Load Balancer URL in this section:  <strong><a href="#6-configure-your-domain-when-the-stack-has-been-created">6. Configure your domain when the stack has been created</a></strong>.<span></td>
      <td><em>Your fully qualified domain</em></br><span class="field-comment">For example: <em><strong>example-multimaster.openvidu.io</strong></em></span></td>
    </tr>
    <tr>
      <td class="first-col">OpenVidu Pro Cluster Id<br><span class="field-comment">This parameter is used by OpenVidu Pro to send indexed statistics to ElasticSearch, and can be used as a way to distinguish different clusters.<span></td>
      <td><em>Your choice</em></br><span class="field-comment">For example: <em><strong>openvidu-multimaster</strong></em></span></td>
    </tr>
    <tr>
      <td class="first-col">OpenVidu Pro License<br><span class="field-comment">Your purchased license key from your <a href="https://openvidu.io/account" target="_blank">OpenVidu account</a>. While in beta, you will not be charged.<span></td>
      <td><em>Your OpenVidu Pro License key</em></td>
    </tr>
    <tr>
      <td class="first-col">Openvidu Secret<br><span class="field-comment">Secret to connect to this OpenVidu Platform. Cannot be empty and must contain only alphanumeric characters [a-zA-Z0-9], hypens "-" and underscores "_"<span></td>
      <td><em>Your choice</em></td>
    </tr>
    <tr>
      <td class="first-col">Media Server<br><span class="field-comment">The Media Server implementation you want to use<span></td>
      <td>
        Possible values:
        <ul>
          <li><strong>mediasoup</strong></li>
          <li><strong>kurento</strong></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td class="first-col">OpenVidu S3 bucket<br><span class="field-comment">S3 bucket for storing configuration and recordings<span></td>
      <td>
        If empty, a new bucket will be created while launching the Cloudformation. If defined, the specified S3 bucket will be used in your deployment.
        If you define it, make sure it is in the same AWS region as your deployment. Don't specify neither the ARN or S3 URL, just the bucket name.
        <br>
        <span class="field-comment">For example: <em><strong>my-s3-bucket</strong></em></span>
      </td>
    </tr>
    <tr>
      <td class="first-col">Enable OpenVidu Recording<br><span class="field-comment">Whether to enable OpenVidu recording module or not<span></td>
      <td>
        Possible values:
        <ul>
          <li><strong><code>true</code></strong> to enable recording capabilities. All recordings will be saved in the <strong>OpenVidu S3 Bucket</strong></li>
          <li><strong><code>false</code></strong> to disable recording capabilities.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td class="first-col">Deploy Coturn in Media Nodes. (Experimental)<br><span class="field-comment">Now TURN/STUN (Coturn) service can be deployed at media nodes. Using Media nodes for Coturn implies better performance and scalability for the Coturn service deployed with OpenVidu. If true, Coturn will be deployed at media nodes. <a href="deployment/pro/on-premises/#coturn-configuration" target="_blank">More info.</a><span></td>
      <td><em>Choose from the drop-down button</em></td>
    </tr>
  </table>
</div>

<br>

##### 5.2) Elasticsearch and Kibana Configuration

<div class="row">
    <div style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-example-multimaster-2" data-type="image" class="fancybox-img" href="img/docs/deployment/multimaster_parameters_2.png"><img width="650px" class="img-responsive img-deploy-example" src="img/docs/deployment/multimaster_parameters_2.png"/></a>
    </div>
</div>

<div style="text-align: center" class="table-responsive">
  <table class="deploy-fields-table color-table-gray" style="margin-top: 10px; margin-bottom: 0px">
    <tr>
      <td class="first-col">Elasticsearch URL</br><span class="field-comment">URL to use the Elasticserch service. It is very important to specify the port, even if it is 443.<span></td>
      <td><em>Your Elasticsearch URL.</em></br><span class="field-comment">For example: <em><strong>https://example.elasticsearch.com:443</strong></em></span></td>
    </tr>
    <tr>
      <td class="first-col">Kibana URL<br><span class="field-comment">URL for Kibana. It is very important to specify the port, even if it is 443.<span></td>
      <td><em>Your Kibana URL.</em></br><span class="field-comment">For example: <em><strong>https://example.kibana.com:443</strong></em></span></td>
    </tr>
    <tr>
      <td class="first-col">Elasticsearch and Kibana username<br><span class="field-comment">Elasticsearch username for OpenVidu<span></td>
       <td><em>Your choice</em></td>
    </tr>
    <tr>
      <td class="first-col">Elasticsearch and Kibana password<br><span class="field-comment">Password of the previous username<span></td>
      <td><em>Your choice</em></td>
    </tr>
  </table>
</div>

<div class="warningBoxContent">
  <div style="display: table-cell; vertical-align: middle;">
      <i class="icon ion-android-alert warningIcon"></i>
  </div>
  <div class="warningBoxText">
    It is very important to specify the port, even if it is 443, for both URLS: <strong>Elasticsearch URL</strong> and <strong>Kibana URL</strong>
  </div>
</div>

<br>

##### 5.3) EC2 and Autoscaling configuration

All of these parameters will create two AutoScaling groups with its correspondant parameters:

<div class="row">
    <div style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-example-multimaster-3" data-type="image" class="fancybox-img" href="img/docs/deployment/multimaster_parameters_3.png"><img width="650px" class="img-responsive img-deploy-example" src="img/docs/deployment/multimaster_parameters_3.png"/></a>
    </div>
</div>

<br>

###### Master Nodes properties

This autoscaling group will control the number of master nodes you will have in your deployment. Master nodes do not autoscale automatically, they are created just by changing the **Desired Size** of its Autoscaling Group. These are the initial parameters that you need to set up:

<div style="text-align: center" class="table-responsive">
  <table class="deploy-fields-table color-table-gray" style="margin-top: 10px; margin-bottom: 0px">
    <tr>
      <td class="first-col">Master Nodes instance type:</br><span class="field-comment">The type of instance you want to use for master nodes.<span></td>
      <td><em>Your choice</em></br><span class="field-comment">For example: <em><strong>c5.xlarge</strong></em></span></td>
    </tr>
    <tr>
      <td class="first-col">Minimum Master Nodes<br><span class="field-comment">Minimum number of Master nodes that you want to have configured.<span></td>
      <td><em>Your choice</em></br><span class="field-comment">For example: <em><strong>1</strong></em></span></td>
    </tr>
    <tr>
      <td class="first-col">Maximum Master Nodes<br><span class="field-comment">Maximum number of Master nodes that you want to have configured.<span></td>
       <td><em>Your choice</em></br><span class="field-comment">For example: <em><strong>2</strong></em></span></td>
    </tr>
    <tr>
      <td class="first-col">Desired Master Nodes<br><span class="field-comment">Number of Master nodes you want to run on deploy.<span></td>
       <td><em>Your choice</em></br><span class="field-comment">For example: <em><strong>2</strong></em></span></td>
    </tr>
  </table>
</div>

</br></br>

###### Media Nodes properties

This autoscaling group will control the number of media nodes you will have in your deployment. Autoscaling will be enabled by default. These are the initial parameters that you need to set up:

<div style="text-align: center" class="table-responsive">
  <table class="deploy-fields-table color-table-gray" style="margin-top: 10px; margin-bottom: 0px">
    <tr>
      <td class="first-col">Media Nodes instance type:</br><span class="field-comment">The type of instance you want to use for your Media Nodes.<span></td>
      <td><em>Your choice</em></br><span class="field-comment">For example: <em><strong>c5.xlarge</strong></em></span></td>
    </tr>
    <tr>
      <td class="first-col">Minimum Media Nodes<br><span class="field-comment">Minimum number of Media Nodes that you want to have configured.<span></td>
      <td><em>Your choice</em></br><span class="field-comment">For example: <em><strong>2</strong></em></span></td>
    </tr>
    <tr>
      <td class="first-col">Maximum Media Nodes<br><span class="field-comment">Maximum number of Media Nodes that you want to have configured.<span></td>
       <td><em>Your choice</em></br><span class="field-comment">For example: <em><strong>4</strong></em></span></td>
    </tr>
    <tr>
      <td class="first-col">Desired Media Nodes<br><span class="field-comment">Number of Media Nodes you want to run on deploy.<span></td>
       <td><em>Your choice</em></br><span class="field-comment">For example: <em><strong>2</strong></em></span></td>
    </tr>
    <tr>
      <td class="first-col">Scale Up Media Nodes on Average CPU<br><span class="field-comment">Average CPU necessary to scale up Media Nodes<span></td>
       <td><em>Your choice</em></br><span class="field-comment">For example: <em><strong>70</strong></em></span></td>
    </tr>
    <tr>
      <td class="first-col">Scale Down Media Nodes on Average CPU<br><span class="field-comment">Average CPU necessary to scale down Media Nodes<span></td>
       <td><em>Your choice</em></br><span class="field-comment">For example: <em><strong>30</strong></em></span></td>
    </tr>
  </table>
</div>

</br></br>

###### Common properties

This is the **SSH key** that you want to use for your EC2 instances for both, **Master Nodes** and **Media Nodes** instances created by their respective Autoscaling Groups

<div style="text-align: center" class="table-responsive">
  <table class="deploy-fields-table color-table-gray" style="margin-top: 10px; margin-bottom: 0px">
    <tr>
      <td class="first-col">SSH Key Name</br><span class="field-comment">EC2 Key to be used in future for administrative tasks.<span></td>
      <td><em>Your choice</em></td>
    </tr>
  </table>
</div>

<br>

##### 5.4) Load Balancer Certificate configuration

<div class="row">
    <div style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-example-multimaster-4" data-type="image" class="fancybox-img" href="img/docs/deployment/multimaster_parameters_4.png"><img width="650px" class="img-responsive img-deploy-example" src="img/docs/deployment/multimaster_parameters_4.png"/></a>
    </div>
</div>

<div style="text-align: center" class="table-responsive">
  <table class="deploy-fields-table color-table-gray" style="margin-top: 10px; margin-bottom: 0px">
    <tr>
      <td class="first-col">ARN of the AWS Certificate</br><span class="field-comment">ARN of the Certificate imported in your AWS account for your FQDN</strong><span></td>
      <td><em>Your choice</em></br><span class="field-comment">For example: <em><strong><code>arn:aws:acm:&lt;region&gt;:&lt;user-id&gt;:certificate/&lt;certicate-id&gt;</code>
</strong></em></span></td>
    </tr>
  </table>
</div>

<br>

##### 5.5) Networking configuration

<div class="row">
    <div style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-example-multimaster-5" data-type="image" class="fancybox-img" href="img/docs/deployment/multimaster_parameters_5.png"><img width="650px" class="img-responsive img-deploy-example" src="img/docs/deployment/multimaster_parameters_5.png"/></a>
    </div>
</div>

<div style="text-align: center" class="table-responsive">
  <table class="deploy-fields-table color-table-gray" style="margin-top: 10px; margin-bottom: 0px">
    <tr>
      <td class="first-col">OpenVidu Pro VPC:</br><span class="field-comment">Which VPC you want to deploy the cluster.</strong><span></td>
      <td><em>Your choice</em></td>
    </tr>
    <tr>
      <td class="first-col">OpenVidu Pro Subnets:</br><span class="field-comment">Which Subnets you want to use for OpenVidu Pro Cluster. You need to select minimum 2 subnets!</strong><span></td>
      <td><em>Your choice</em></td>
    </tr>
  </table>
</div>

<div class="warningBoxContent">
  <div style="display: table-cell; vertical-align: middle;">
      <i class="icon ion-android-alert warningIcon"></i>
  </div>
  <div class="warningBoxText">
    The parameter <strong>"OpenVidu Pro Subnets" must contain two subnets </strong>, each of them from a different Availability Zone. This is because Autoscaling Groups in AWS <strong>needs at least two subnets to ensure High Availability.</strong>
  </div>
</div>

#### 6) Configure your domain when the stack has been created

When everything is deployed, you should see this in the _Outputs section_ of CloudFormation:

<div class="row">
    <div style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-example-multimaster-6" data-type="image" class="fancybox-img" href="img/docs/deployment/multimaster_end_1.png"><img width="650px" class="img-responsive img-deploy-example" src="img/docs/deployment/multimaster_end_1.png"/></a>
    </div>
</div>

Now you need to point the configured **Domain Name** (which was pointing to a _"Dummy IP"_ before the stack was deployed) to the **Load Balancer URL** with a **CNAME** in your DNS. Wait until the domain name is replicated and then, you will be able to reach OpenVidu Enterprise using your Domain name.

---

## Administration

### Check cluster after deploy

If you want to check that everything is set up correctly in AWS after deploying the CloudFormation Stack you can follow the next subsections:

#### 1) Check Master Nodes

<br>
**1.1) Go to the Target Groups panel which name is the same as the deployed CloudFormation Stack**. You can find Target Groups in the EC2 Panel of AWS. The following image shows how the target group may look if we named the CloudFormation Stack as _ov-example_:

<div class="row">
    <div style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-example-multimaster-7" data-type="image" class="fancybox-img" href="img/docs/deployment/multimaster_end_2.png"><img width="650px" class="img-responsive img-deploy-example" src="img/docs/deployment/multimaster_end_2.png"/></a>
    </div>
</div>

**1.2) If all Master Nodes are deployed correctly, you should see something like this**:

<div class="row">
    <div style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-example-multimaster-8" data-type="image" class="fancybox-img" href="img/docs/deployment/multimaster_end_3.png"><img width="650px" class="img-responsive img-deploy-example" src="img/docs/deployment/multimaster_end_3.png"/></a>
    </div>
</div>

You can check that master nodes are deployed correctly if:

- There are master nodes deployed at different availability zones (Only If you have configured more than one master node).
- Status of master nodes is **"healthy"**

<br>
**1.3) Check Openvidu API Load Balancing:**

Execute a GET request to [/openvidu/api/config](reference-docs/REST-API/#get-config). You can do this with `curl`:

```
curl -u OPENVIDUAPP:<OPENVIDU_SECRET> https://<DOMAIN_NAME>/openvidu/api/config
```

This request will return a JSON with all the OpenVidu Pro configuration parameters. You should look at the parameter `AWS_INSTANCE_ID` of the returned JSON. This parameter should be different on each request if you have multiple healthy master nodes, and each of the different values should be the id of the master node which has received the request.

#### 2) Check Media Nodes

As media nodes are not attached to any Load Balancer, the health of these nodes is directly shown in the Autoscaling Group section and managed by Master Nodes. To check all media nodes are correctly setup:

**2.1) Go to the Autoscaling groups section and check the autoscaling group which starts with your CloudFormation Stack name and ends with _"ASGMediaNode"_**

<div class="row">
    <div style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-example-multimaster-9" data-type="image" class="fancybox-img" href="img/docs/deployment/multimaster_end_4.png"><img width="650px" class="img-responsive img-deploy-example" src="img/docs/deployment/multimaster_end_4.png"/></a>
    </div>
</div>

**2.2) If all Media Nodes are deployed correctly, you should see something like this**:

<div class="row">
    <div style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-example-multimaster-10" data-type="image" class="fancybox-img" href="img/docs/deployment/multimaster_end_5.png"><img width="650px" class="img-responsive img-deploy-example" src="img/docs/deployment/multimaster_end_5.png"/></a>
    </div>
</div>

<br>

**2.3) Check OpenVidu has registered all media nodes**:

Execute a GET request to [/openvidu/api/media-nodes](reference-docs/REST-API/#get-all-medianodes) for more information about this request). You can do this with `curl`:

```
curl -u OPENVIDUAPP:<OPENVIDU_SECRET> https://<DOMAIN_NAME>/openvidu/api/media-nodes
```

This request will return a JSON with all registered media nodes and related information.

#### 3) Check AWS Events reaching Master Nodes

OpenVidu Enterprise depends on some AWS Events to be able to register/deregister media nodes in the cluster and for autoscaling events. To check that all events are working properly, SSH into one of your master nodes, and go to `/opt/openvidu/` directory:

```
sudo su
cd /opt/openvidu
```

Now we will check the logs of a service used by OpenVidu Enterprise called `replication-manager`.

> NOTE: As AWS Events are sent into an [SQS Queue](https://aws.amazon.com/es/sqs/), if you have more than one master node, you need to check the logs of all master nodes.
> To consider that such events works correctly, you must see the mentioned events below at least once in one master node.

##### 3.1) Check for autoscaling events

To check for autoscaling events, just execute:

```text
docker-compose logs -f replication-manager | grep custom.autoscaling_schedule
```

After some minutes with your stack deployed, you should see a trace log like this one:

```text
openvidu-replication-manager-1  | 2022-05-17 11:55:58.863  INFO 8 --- [           main] i.o.r.m.s.SQSNotificationListenerAWS     : Notification content: {"source":"custom.autoscaling_schedule","detail":{"time":"2022-05-17T11:55:14Z"}}
```

This means that autoscaling events are reaching master nodes, so media nodes will autoscale accordingly.

<br>

##### 3.2) Check for media nodes Autoscaling Group events

To check for media nodes Autoscaling Group events, you need to increase/decrease the desired capacity of Media Nodes in the Autoscaling group or wait until Cloudwatch rules modifies the number of media nodes.

<br>

###### Check for new media nodes events

```text
docker-compose logs -f replication-manager | grep 'launched in autoscaling group'
```

The result of the log should be:

```text
openvidu-replication-manager-1  | 2022-05-17 12:19:56.656  INFO 8 --- [           main] i.o.r.m.s.SQSNotificationListenerAWS     : New Media Node (i-0ed87803133aaca76,172.31.41.202) launched in autoscaling group
```

###### Check for drop media nodes events

```text
docker-compose logs -f replication-manager | grep 'terminated in autoscaling group'
```

The result of the log should be something like:

```text
openvidu-replication-manager-1  | 2022-05-17 12:23:41.002  INFO 8 --- [           main] i.o.r.m.s.SQSNotificationListenerAWS     : Media Node (i-022d3b9d2d0f42cf7,172.31.10.206) terminated in autoscaling group
```


---
### Autoscaling Configuration

OpenVidu Enterprise Autoscaling is managed by AWS Autoscaling Groups. In consequence, all autoscaling parameters can be changed through Cloudformation parameters.

To change those parameters you just need to go to ** AWS Cloudformation Panel ⇨ Select Your Stack ⇨ Update ⇨ Use current template**.

<div class="row">
    <div class="pro-gallery-steps" style="margin: 25px 35px 25px 35px">
        <a data-fancybox="gallery-pro2" data-caption="First, go to the 'Cloudformation panel' and Select your Stack. Then click in the 'Update' button." data-type="image" class="fancybox-img" href="img/docs/deployment/multimaster_asg_config_1.png"><img class="img-responsive img-pro" src="img/docs/deployment/multimaster_asg_config_1.png"/></a>
        <a data-fancybox="gallery-pro2" data-caption="Select 'Use current template' and click in the 'Next' button." data-type="image" class="fancybox-img" href="img/docs/deployment/multimaster_asg_config_2.png"><img class="img-responsive img-pro" src="img/docs/deployment/multimaster_asg_config_2.png"/></a>
        <a data-fancybox="gallery-pro2" data-caption="Only these parameters can be changed through Cloudformation" data-type="image" class="fancybox-img" href="img/docs/deployment/multimaster_asg_config_3.png"><img class="img-responsive img-pro" src="img/docs/deployment/multimaster_asg_config_3.png"/></a>
    </div>
    <div class="slick-captions-text slick-captions">
      <div class="caption"><p>First, go to the <strong>Cloudformation Panel</strong> and Select your Stack. Then click in the <strong>Update</strong> button.</p></div>
      <div class="caption"><p>Select <strong>Use current template</strong> and click in the <strong>Next</strong> button.</p></div>
      <div class="caption"><p><strong>Only these parameters can be changed through Cloudformation</strong>.</p></div>
    </div>
</div>

---

### OpenVidu Enterprise Configuration

Technically, you can connect to any instance through SSH to change OpenVidu Enterprise configuration, but this will lead to inconsistencies in the configuration, because master nodes and media nodes are now **volatile objects** of the infrastructure. They exist temporary, they can be destroyed and new nodes can be created, so the configuration can not live on any EC2 instance. For this reason, administrative task are done via **API Rest** or **by changing a persisted configuration file in a S3 bucket.**

</br>

#### 1) Change the configuration via API Rest

While OpenVidu Enterprise is running, you can change some parameters of OpenVidu by calling [/openvidu/api/restart](reference-docs/REST-API/#post-restart). All OpenVidu master nodes will restart automatically and the configuration will be persisted in an S3 bucket. All modifiable parameters are [documented](reference-docs/REST-API/#body_8).

Take into account that not all parameters can be changed via API Rest, so in case you need to change something which can not be changed using this method, you must change the [S3 configuration file](#2-change-configuration-by-modifying-s3-configuration-file-not-recommended)

</br>

#### 2) Change configuration by modifying S3 configuration file (Not recommended)

**2.1) Go to the S3 configuration bucket of your CloudFormation**. You can find it as a resource in the CloudFormation panel:

<div class="row">
    <div style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-example-multimaster-11" data-type="image" class="fancybox-img" href="img/docs/deployment/multimaster_end_6.png"><img width="650px" class="img-responsive img-deploy-example" src="img/docs/deployment/multimaster_end_6.png"/></a>
    </div>
</div>

**2.2) Modify the .env configuration in the S3 bucket**: In this S3 bucket you will see a file named `.env`. Any change you want to do which is not possible to do using the API Rest request to [/openvidu/api/restart](reference-docs/REST-API/#post-restart) will be done by modifying the content of the `.env` file in this S3 bucket.

<div class="row">
    <div style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-example-multimaster-12" data-type="image" class="fancybox-img" href="img/docs/deployment/multimaster_end_7.png"><img width="650px" class="img-responsive img-deploy-example" src="img/docs/deployment/multimaster_end_7.png"/></a>
    </div>
</div>
<br>


**2.3) (Optional) Restart Master Nodes via AWS**: By default, OpenVidu Enterprise is configured with this parameter:

- `OPENVIDU_ENTERPRISE_S3_CONFIG_AUTORESTART=true`

This means that any change which happens in the `.env` file of OpenVidu Enterprise bucket, will restart automatically all master nodes. You need to restart your master nodes only if `OPENVIDU_ENTERPRISE_S3_CONFIG_AUTORESTART=false`. In this case, you must restart all your master nodes through your AWS EC2 Panel, or terminating all Master Nodes and wait for the Autoscaling Group to create those instances. New EC2 instances created by the Autoscaling Group will download the updated configuration `.env` file from the S3 bucket.

---

## Troubleshouting

If your master nodes do not reach a **healthy** state as described [here](#1-check-master-nodes), you may need to check the logs of the running services in your master nodes to check what the problem could be.

Usually, the error should appear in the `replication-manager` service, or `openvidu-server` service. SSH into one of your unhealthy master nodes and check the logs of both service to search for possible missconfiguration errors:

```
sudo su
cd /opt/openvidu
docker-compose logs openvidu-server
docker-compose logs replication-manager
```

Also, make sure that all events are processed correctly. Check the section: __[Check cluster after deploy](#check-cluster-after-deploy)__, to verify that the cluster is correctly set up.

---

## Deploying an OpenVidu application

To deploy an OpenVidu application which uses our recently deployed stack, you can use any application developed for OpenVidu. You just need to point your application to the configured **Domain Name** and the **OpenVidu Secret** used in CloudFormation deployment. Additionally, remember that your app needs to be deployed with a valid certificate for WebRTC to work.

If you want to see and example of an application that automatically reconnects users after a node crashes, take a look to the [openvidu-fault-tolerance](https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-fault-tolerance){:target="_blank"} demo.

<script src="js/copy-btn.js"></script>
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
    $('.slick-captions').slick({
      asNavFor: '.pro-gallery-steps',
      arrows: false,
      infinite: false,
      speed: 200,
      fade: true,
      dots: false
    });
    $('.pro-gallery-steps').slick({
      asNavFor: '.slick-captions',
      autoplay: false,
      arrows: true,
      prevArrow: '<div class="slick-btn slick-btn-prev"><i class="icon ion-chevron-left"></i></div>',
      nextArrow: '<div class="slick-btn slick-btn-next"><i class="icon ion-chevron-right"></i></div>',
      infinite: false,
      dots: true,
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
