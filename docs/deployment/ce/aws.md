<h2 id="section-title">Deploying OpenVidu CE on AWS</h2>
<hr>

- **[Deployment instructions](#deployment-instructions)**
    - [1) Access to the console of AWS Cloud Formation](#1-access-to-the-console-of-aws-cloud-formation)
    - [2) Select Create Stack 🠚 With new resources](#2-select-create-stack-with-new-resources)
    - [3) Option Specify template 🠚 Amazon S3 URL with the following URL](#3-option-specify-template-amazon-s3-url-with-the-following-url)
    - [4) Specify stack details](#4-specify-stack-details)
    - [5) Create your stack](#5-create-your-stack)
    - [6) Administration](#6-administration)
- **[Domain and SSL Configuration Examples](#domain-and-ssl-configuration-examples)**
    - [Self-signed certificate](#1-self-signed-certificate)
    - [Let's Encrypt certificate](#2-lets-encrypt-certificate)
    - [Custom Certificate (Commercial CA)](#3-custom-certificate-commercial-ca)
    - [Common Problems](#common-problems)
- **[Troubleshooting](#troubleshooting)**
    - [CREATE_FAILED CloudFormation stack](#create_failed-cloudformation-stack)
    - [Kurento Media Server crash](#kurento-media-server-crash)
---

## Deployment instructions

The deployment of OpenVidu can be a piece of cake if you have an AWS account. Just follow these steps:

### 1. Access to the console of AWS Cloud Formation

  <p style="text-align: center; margin-top: 20px"><a href="https://console.aws.amazon.com/cloudformation#stacks" class="btn btn-xs btn-primary" title="Developing OpenVidu" target="_blank">Go to CloudFormation<span class="icon icon-circle-arrow-right"></span></a></p>

<br>

---

### 2. Select _Create Stack_ 🠚 _With new resources_

  <p>
      <img class="img-responsive deploy-img" style="margin: auto; max-height: 400px" src="img/docs/deployment/CF_newstack.png">
  </p>

<br>

---

### 3. Option _Specify template_ 🠚 _Amazon S3 URL_ with the following URL

  <code id="code-2">https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/CF-OpenVidu-latest.yaml</code>
  <button id="btn-copy-2" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
                                title="Copy to Clipboard">Copy</button>

  <p>
    <img class="img-responsive deploy-img" src="img/docs/deployment/CF_url.png">
  </p>

> To deploy a fixed version, including previous ones, replace `latest` with the desired version number.<br>
> For example: <code>https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/CF-OpenVidu-<strong>2.21.0</strong>.yaml</code>

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
      <th>Custom certificate (Commercial CA)</th>
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

Here you will only be able to configure OpenVidu secret, but there are many other configuration values that can be set once the deployment has completed. Visit [Administration](#6-administration) section after your deployment is successful to update OpenVidu configuration.

<div style="text-align: center" class="table-responsive">
  <table class="deploy-fields-table color-table-gray" style="margin-top: 10px">
    <tr>
      <td class="first-col">Openvidu Secret<br><span class="field-comment">Secret to connect to this OpenVidu Platform. Cannot be empty and must contain only alphanumeric characters [a-zA-Z0-9], hypens "-" and underscores "_"<span></td>
      <td><em>Your choice</em></td>
    </tr>
  </table>
</div>

#### EC2 Instance configuration

These properties configure specific details of the EC2 machine that will be launched by CloudFormation.

<div style="text-align: center" class="table-responsive">
  <table class="deploy-fields-table color-table-gray" style="margin-top: 10px">
    <tr>
      <td class="first-col">Instance type<br><span class="field-comment">Type of EC2 Instance where to deploy OpenVidu<span></td>
      <td><em>Choose from the drop-down button</em></td>
    </tr>
    <tr>
      <td class="first-col">SSH Key<br><span class="field-comment">SSH key for your EC2 Instance<span></td>
      <td><em>Choose from the drop-down button</em></br><span class="field-comment">(check <a href="http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html" target="_blank">AWS Docs</a> to create a new one)</span></td>
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
      <td class="first-col">Send deployment info to OpenVidu team<br><span class="field-comment">Choose if you don't mind sending to OpenVidu team the version deployed and AWS region<span></td>
      <td><em>Choose from the drop-down button</em></td>
    </tr>
  </table>
</div>

<br>

---

### 5. Create your stack

No extra options are necessary. Click on  **_Next_** ➞ **_Next_** ➞ **_Create stack_**

**_CREATE_IN_PROGRESS_** status will show up. You will now have to wait about 2 minutes until it shows **_CREATE_COMPLETE_**. If status reaches **CREATE_FAILED**, check out [this section](#create_failed-cloudformation-stack).

After status changes to **_CREATE_COMPLETE_**, go to **_Outputs_** tab to get your brand new IP and click on it (or if you have deployed under your own custom domain, then you should access through it instead).

  <p style="margin-top: 20px">
    <img class="img-responsive deploy-img" src="img/docs/deployment/CF_output.png">
  </p>

<br>

That URL is the one to be used to consume OpenVidu REST API. Besides:

- If you have deployed OpenVidu Call (see [Other configuration](#other-configuration)) you can also access to it through that same URL.
- You can access OpenVidu Server dashboard to make a quick test of your deployment through `/dashboard`. Credentials to access to it are `OPENVIDUAPP` as username and your [OpenVidu secret](#openvidu-configuration) as password.

You can now add your own application to your instance. To learn how check out section [Deploy OpenVidu based applications](deployment/#deploy-openvidu-based-applications).


<div class="warningBoxContent">
  <div style="display: table-cell; vertical-align: middle;">
      <i class="icon ion-android-alert warningIcon"></i>
  </div>
  <div class="warningBoxText">
    While deploying the stack, you will see a warning with this message: <br><br><strong><center>The following resource(s) require capabilities: [AWS::IAM::Role]</center></strong><br> You need to accept it for OpenVidu CE deployment to work. The <code>CloudformationLambdaRole</code> role is only used by a Lambda resource to copy the original AMI of OpenVidu to your account. In this way, we can ensure that your deployment will still work even if the AMI is deprecated or removed officially, so your deployment will always work. <br><br> AMIs will be copied once, and their names start with <code>[ OpenVidu CE AMI Copy ]</code>. This is the AMI that will be used in your deployment. You can check the Role in the Cloudformation template.
  </div>
</div>

<br>

---

### 6. Administration

AWS deployments of OpenVidu CE are internally identical to [on premises deployments](deployment/ce/on-premises/). This means that you can manage OpenVidu platform very easily by connecting to your instances through SSH. Located at the default installation path `/opt/openvidu` as `root` user (`$ sudo su`) you will be able to:

- Manage the services as explained in [on premises administration](deployment/ce/on-premises/#5-administration).
- Update [OpenVidu configuration](reference-docs/openvidu-config) just by modifying `.env` file and restarting the services with `./openvidu restart` command.

<br>

---

## Domain and SSL Configuration Examples

These examples are focusing in the [Domain and SSL certificate configuration](#domain-and-ssl-certificate-configuration) section of the [Deploying OpenVidu on AWS](#deployment-instructions) instructions to clarify any doubt on how to configure it.

As OpenVidu is deployed with default sane configuration, your domain and SSL certificate configuration are the most important parameters to deploy your stack correctly.

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

- Deploy OpenVidu quickly for testing or developing purposes.
- Deploy OpenVidu without a Fully Qualified Domain Name (FQDN).

#### 1.1) Cloudformation parameters

Let's see an example of this scenario for the Cloudformation parameters section:

<div class="row">
    <div style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-example-1" href="img/docs/deployment/aws-examples-selfsigned-no-fqdn.png"><img width="650px" class="img-responsive img-deploy-example" src="img/docs/deployment/aws-examples-selfsigned-no-fqdn.png"/></a>
    </div>
</div>

1. Select as Certificate type: **selfsigned**
2. Keep empty all the parameters in the **Domain and SSL certificate configuration** section, because we don't have any Elastic Ip, domain or other SSL configuration to specify in this scenario.

### 2) Let's Encrypt certificate

This scenario is meant for you if you want to:

- Deploy OpenVidu for production or even developing purposes.
- Deploy OpenVidu with a Fully Qualified Domain Name (FQDN).
- Use a valid SSL certificate.

For this specific scenario you will need to:

#### 2.1) Create an Elastic IP

1. Go to your EC2 AWS section, and click here:
<div class="row">
    <div style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-example-lets-1" href="img/docs/deployment/aws-examples-letsencrypt-1.png"><img width="200px" class="img-responsive img-deploy-example" src="img/docs/deployment/aws-examples-letsencrypt-1.png"/></a>
    </div>
</div>
2. Click on **Allocate Elastic IP address**
<div class="row">
    <div style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-example-lets-2" href="img/docs/deployment/aws-examples-letsencrypt-2.png"><img class="img-responsive img-deploy-example" src="img/docs/deployment/aws-examples-letsencrypt-2.png"/></a>
    </div>
</div>
3. This will generate an Elastic IP that you will be able to use for your OpenVidu deployment with letsencrypt
<div class="row">
    <div style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-example-lets-3" href="img/docs/deployment/aws-examples-letsencrypt-3.png"><img class="img-responsive img-deploy-example" src="img/docs/deployment/aws-examples-letsencrypt-3.png"/></a>
    </div>
</div>

#### 2.2) Register a FQDN pointing to the Elastic IP

This step will depend of the DNS register you want to use. You need to create a DNS register of **type A pointing to the Elastic IP created before**. For the next steps, let's suppose that our domain is: **example.openvidu.io**.

#### 2.3) Cloudformation parameters

Let's see an example of this scenario for the Cloudformation parameters section:

<div class="row">
    <div style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-example-lets-4" href="img/docs/deployment/aws-examples-letsencrypt-4.png"><img class="img-responsive img-deploy-example" src="img/docs/deployment/aws-examples-letsencrypt-4.png"/></a>
    </div>
</div>

The important fields of this section are:

- The **AWS Elastic IP (EIP)** with the Elastic IP created in step [2.1](#21-create-an-elastic-ip)
- The **Domain Name pointing to Elastic IP** with the FQDN created at step [2.2](#22-register-a-fqdn-pointing-to-the-elastic-ip)
- The **Email for Let's Encrypt** with the email you want to use for your Let's Encrypt certificate.

### 3) Custom Certificate (Commercial CA)

This scenario is meant for you if you want to:

- Deploy OpenVidu for production.
- Deploy OpenVidu with a Fully Qualified Domain Name (FQDN).
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
        <a data-fancybox="gallery-example-own-1" href="img/docs/deployment/aws-examples-owncert-1.png"><img class="img-responsive img-deploy-example" src="img/docs/deployment/aws-examples-owncert-1.png"/></a>
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
  AWS deployments of OpenVidu CE work under the hood in the exact same manner as on premises deployments. So <strong>everything explained in <a href="deployment/ce/on-premises/#troubleshooting">Troubleshooting</a> section of on premises deployments also applies to AWS deployments</strong>. There you have detailed instructions on how to debug all of OpenVidu services in case some unexpected problem appears.
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
        <a data-fancybox="gallery-pro13" href="img/docs/deployment/CF_1_troubleshooting_rollback.png"><img class="img-responsive img-pro" src="img/docs/deployment/CF_1_troubleshooting_rollback.png"/></a>
    </div>
</div>

- **2)** We will also need the parameters you've used to deploy, to check possible problems in their values

<div class="row">
    <div style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-pro14" href="img/docs/deployment/CF_1_troubleshooting_rollback.png"><img class="img-responsive img-pro" src="img/docs/deployment/CF_2_troubleshooting_parameters.png"/></a>
    </div>
</div>

- **3)** Once you have performed step 1) and the stack creation has failed, please SSH into the created EC2 instance and share with us CloudFormation logs

    - `/var/log/cloud-init.log`
    - `/var/log/cloud-init-output.log`
<br><br>

- **4)** Get also the log output of all the services. Check [this section](deployment/ce/on-premises/#show-service-logs) to see services logs:

<br>

---

### Kurento Media Server crash

Sometimes Kurento Media Server (the service in charge of streaming media inside of Media Nodes) may crash. If this happens on a regular basis, or better, you have isolated a specific use case where KMS always crashes, then perform the following steps to collect a crash report that will help us fix the issue.

In AWS deployments of OpenVidu CE, KMS crash reports are enabled by default. You can directly get them with the following steps:

#### 1) Download the KMS crash report

```bash
ssh -i AWS_SSH_KEY ubuntu@OPENVIDU_IP "sudo tar zcvfP ~/core_dumps.tar.gz /opt/openvidu/kms-crashes/*"
scp -i AWS_SSH_KEY ubuntu@OPENVIDU_IP:~/core_dumps.tar.gz .
```

Replace `AWS_SSH_KEY` with the path to the SSH key of the EC2 instance and `OPENVIDU_IP` with its IP address.

#### 2) Clean the KMS crash report

So as not to consume too much hard drive, delete the crash report once you have downloaded it. **IMPORTANT**: obviously, do NOT do this before downloading the report.

```bash
ssh -i AWS_SSH_KEY ubuntu@OPENVIDU_IP "sudo rm /opt/openvidu/kms-crashes/* && sudo rm ~/core_dumps.tar.gz"
```

Replace `AWS_SSH_KEY` with the path to the SSH key of the EC2 instance and `OPENVIDU_IP` with its IP address.

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

<link rel="stylesheet" type="text/css" href="css/downloads/slick-1.6.0.css"/>
<link rel="stylesheet" type="text/css" href="css/slick-theme.css"/>
<script type="text/javascript" src="js/downloads/slick-1.6.0.min.js"></script>

<script>
    $('.docs-gallery').slick({
      autoplay: true,
      autoplaySpeed: 4000,
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
</script>

<script src="js/copy-btn.js"></script>
