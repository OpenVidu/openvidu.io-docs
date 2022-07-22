<h2 id="section-title">Deploying OpenVidu on AWS</h2>
<hr>

<div style="
    display: table;
    border: 2px solid #ffb600;
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
    padding: 10px 20px;">
    This OpenVidu Cloudformation template is no longer supported. A legacy AMI is preserved in <code>eu-west-1</code> region of AWS. If you will deploy in a different region than <code>eu-west-1</code>, check <a href="https://docs.openvidu.io/en/stable/troubleshooting/#19-while-deploying-in-cloudformation-aws-the-image-id-ami-does-not-exist" target="_blank">this section</a>.
</div>
</div>

The deployment of OpenVidu can be a piece of cake if you have an AWS account. Just follow these steps:

### 1. Access to the console of AWS Cloud Formation

  <p style="text-align: center; margin-top: 20px"><a href="https://console.aws.amazon.com/cloudformation#stacks" class="btn btn-xs btn-primary" title="Developing OpenVidu" target="_blank">Go to CloudFormation<span class="icon icon-circle-arrow-right"></span></a></p>

<br>

---

### 2. Select _Create Stack_ 🠚 _With new resources_

  <p>
    <img class="img-responsive deploy-img" style="max-height: 400px" src="img/docs/deployment/CF_newstack.png">
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
> For example: <code>https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/CF-OpenVidu-<strong>2.12.0</strong>.yaml</code>

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

Here you will only be able to configure OpenVidu secret, but there are many other configuration values that can be set once the deployment has completed. Visit [OpenVidu configuration](reference-docs/openvidu-config){:target="_blank"} for further information.

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

You can now add your own application to your instance. To learn how check out section [Deploying your OpenVidu app](deployment/deploying-app/){:target="_blank"}.

<br>

<script src="js/copy-btn.js"></script>