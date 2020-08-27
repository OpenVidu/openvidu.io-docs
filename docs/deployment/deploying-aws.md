<h2 id="section-title">Deploying OpenVidu on AWS</h2>
<hr>

- **[Deployment instructions](#deployment-instructions)**
    - [1) Access to the console of AWS Cloud Formation](#1-access-to-the-console-of-aws-cloud-formation)
    - [2) Select Create Stack 🠚 With new resources](#2-select-create-stack-with-new-resources)
    - [3) Option Specify template 🠚 Amazon S3 URL with the following URL](#3-option-specify-template-amazon-s3-url-with-the-following-url)
    - [4) Specify stack details](#4-specify-stack-details)
    - [5) Create your stack](#5-create-your-stack)
    - [6) Administration](#6-administration)
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
> For example: <code>https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/CF-OpenVidu-<strong>2.15.0</strong>.yaml</code>

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
- [Self-signed certificate example](deployment/aws-ssl-examples/#1-self-signed-certificate)
- [Let's Encrypt certificate example](deployment/aws-ssl-examples/#2-lets-encrypt-certificate)
- [Custom Certificate example (Commercial CA)](deployment/aws-ssl-examples/#3-custom-certificate-commercial-ca)

#### OpenVidu configuration

Here you will only be able to configure OpenVidu secret, but there are many other configuration values that can be set once the deployment has completed. Visit [Administration](#6-administration) section after your deployment is successful to update OpenVidu configuration.

<div style="text-align: center" class="table-responsive">
  <table class="deploy-fields-table color-table-gray" style="margin-top: 10px">
    <tr>
      <td class="first-col">Openvidu Secret<br><span class="field-comment">Secret to connect to this OpenVidu deployment. No whitespaces or quotations allowed<span></td>
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

**_CREATE_IN_PROGRESS_** status will show up. You will now have to wait about 2 minutes until it shows **_CREATE_COMPLETE_**. If status reaches **CREATE_FAILED**, check out [this FAQ](troubleshooting/#13-deploying-openvidu-in-aws-is-failing){:target="_blank"}.

After status changes to **_CREATE_COMPLETE_**, go to **_Outputs_** tab to get your brand new IP and click on it (or if you have deployed under your own custom domain, then you should access through it instead).

  <p style="margin-top: 20px">
    <img class="img-responsive deploy-img" src="img/docs/deployment/CF_output.png">
  </p>

<br>

That URL is the one to be used to consume OpenVidu REST API. Besides:

- If you have deployed OpenVidu Call (see [Other configuration](#other-configuration)) you can also access to it through that same URL.
- You can access OpenVidu Server dashboard to make a quick test of your deployment through `/dashboard`. Credentials to access to it are `OPENVIDUAPP` as username and your [OpenVidu secret](#openvidu-configuration) as password.

You can now add your own application to your instance. To learn how check out section [Deploy OpenVidu based applications](deployment/#deploy-openvidu-based-applications){:target="_blank"}.

<br>

---

### 6. Administration

AWS deployments of OpenVidu CE are internally identical to [on premises deployments](deployment/deploying-on-premises/){:target="_blank"}. This means that you can manage OpenVidu platform very easily by connecting to your instances through SSH. Located at the default installation path `/opt/openvidu` as `root` user (`$ sudo su`) you will be able to:

- Manage the services as explained in [on premises administration](deployment/deploying-on-premises/#5-administration){:target="_blank"}.
- Update [OpenVidu configuration](reference-docs/openvidu-config){:target="_blank"} just by modifying `.env` file and restarting the services with `./openvidu restart` command.

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
  AWS deployments of OpenVidu CE work under the hood in the exact same manner as on premises deployments. So <strong>everything explained in <a href="deployment/deploying-on-premises/#troubleshooting" target="_blank">Troubleshooting</a> section of on premises deployments also applies to AWS deployments</strong>. There you have detailed instructions on how to debug all of OpenVidu services in case some unexpected problem appears.
</div>
</div>

### CREATE_FAILED CloudFormation stack

First of all, an AWS CloudFormation stack may reach `CREATE_FAILED` status for missing a default VPC. Check out [this FAQ](troubleshooting/#13-deploying-openvidu-in-aws-is-failing){:target="_blank"} on how to fix it.

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

- **4)** Get also the log output of all the services with this command and share with us the output file:

    - `docker-compose logs -f`

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

<script src="js/copy-btn.js"></script>