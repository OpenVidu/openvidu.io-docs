<h2 id="section-title">Deploying OpenVidu on AWS</h2>
<hr>

The deployment of OpenVidu can be a piece of cake if you have an AWS account. Just follow these steps:

### 1. Access to the console of AWS Cloud Formation

  <p style="text-align: center; margin-top: 20px"><a href="https://console.aws.amazon.com/cloudformation" class="btn btn-xs btn-primary" title="Developing OpenVidu" target="_blank">Go to CloudFormation<span class="icon icon-circle-arrow-right"></span></a></p>

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

<br>

---

### 4. Specify stack details

First of all, indicate a name for your deployment. Next fill each section of the **Parameters** formulary:

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

#### OpenVidu configuration

All of these properties configure OpenVidu Server. You have a complete description of all available properties **[here](reference-docs/openvidu-server-params){:target="_blank"}**.

#### Other configuration

These properties configure specific details of the CloudFormation stack.

<div style="text-align: center" class="table-responsive">
  <table class="deploy-fields-table color-table-gray" style="margin-top: 10px">
    <tr>
      <td class="first-col">Instance type<br><span class="field-comment">Type of EC2 Instance where to deploy OpenVidu<span></td>
      <td><em>Choose from the drop-down button</em></td>
    </tr>
    <tr>
      <td class="first-col">Key name<br><span class="field-comment">SSH key for your EC2 Instance<span></td>
      <td><em>Choose from the drop-down button</em></br><span class="field-comment">(check <a href="http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html" target="_blank">AWS Docs</a> to create a new one)</span></td>
    </tr>
    <tr>
      <td class="first-col">Ubuntu version<br><span class="field-comment">Version of Ubuntu where to deploy OpenVidu<span></td>
      <td><em>Choose from the drop-down button</em></td>
    </tr>
    <tr>
      <td class="first-col">Deploy Demos<br><span class="field-comment">Choose if you want to deploy OpenVidu demo applications.<br>If true, then parameter <code>openvidu.secret</code> must be MY_SECRET for the demos to work out-of-the-box<span></td>
      <td><em>Choose from the drop-down button</em></td>
    </tr>
    <tr>
      <td class="first-col">Do you want to send info to OpenVidu?<br><span class="field-comment">True if don't mind sending OpenVidu team some anonymous info about your deployment (AWS zone and date)<span></td>
      <td><em>Choose from the drop-down button</em></td>
    </tr>
    <tr>
      <td class="first-col">OpenVidu version<br><span class="field-comment">WARNING: this parameter must only be modified when upgrading an existing stack.<br>See <a href="deployment/upgrading/" target="_blank">Upgrading OpenVidu</a><span></td>
      <td><em><strong>Default value</strong> if not upgrading an existing stack</em><br><span class="field-comment">(see <a href="deployment/upgrading/" target="_blank">Upgrading OpenVidu</a>)</span></td>
    </tr>
  </table>
</div>

<br>

---

### 5. Create your stack

No extra options are necessary. Click on  **_Next_** ➞ **_Next_** ➞ **_Create stack_**

**_CREATE_IN_PROGRESS_** status will show up. You will now have to wait for a few minutes (about 10) until it shows **_CREATE_COMPLETE_**. If status reaches **CREATE_FAILED**, check out [this FAQ](troubleshooting/#13-deploying-openvidu-in-aws-is-failing){:target="_blank"}.

After status changes to **_CREATE_COMPLETE_**, go to **_Outputs_** tab to get your brand new IP and click on it (or if you have deployed under your own custom domain, then you should access through it instead).

  <p style="margin-top: 20px">
    <img class="img-responsive deploy-img" src="img/docs/deployment/CF_output.png">
  </p>

<br>
That URL will give you access to your OpenVidu dashboard. Credentials to access to it:

- `OPENVIDUAPP` as username
- The secret you chose on [Step 4](#openvidu-configuration) as password (parameter `openvidu.secret`)

At OpenVidu dashboard you can test the video transmission. You can now add your own application to your instance. To learn how check out section [Deploying your OpenVidu app](deployment/deploying-app/){:target="_blank"}.

<br>

<script src="js/copy-btn.js"></script>