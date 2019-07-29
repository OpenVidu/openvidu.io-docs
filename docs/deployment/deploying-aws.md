<h2 id="section-title">Deploying OpenVidu on AWS</h2>
<hr>

The deployment of OpenVidu can be a piece of cake if you have an AWS account. Just follow these steps:

### 1. Access to the console of AWS Cloud Formation

  <p><a href="https://console.aws.amazon.com/cloudformation" class="btn btn-xs btn-primary" title="Developing OpenVidu" target="_blank">Go to CloudFormation<span class="icon icon-circle-arrow-right"></span></a></p>

### 2. Click on _Create Stack_

  <p>
    <img class="img-responsive deploy-img" style="max-height: 400px" src="/img/docs/deployment/CF_newstack.png">
  </p>

### 3. Option _Specify template_ 🠚 _Amazon S3 URL_ with the following URL

  <code id="code-2">https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/CF-OpenVidu-latest.yaml</code>
  <button id="btn-copy-2" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
                                title="Copy to Clipboard">Copy</button>

  <p>
    <img class="img-responsive deploy-img" src="/img/docs/deployment/CF_url.png">
  </p>

### 4. Specify stack details

First of all, indicate a name for your deployment. Next fill the **Parameters** form depending on the certificate configuration you want.

#### SSL Certificate Configuration

Configuration for your CloudFormation stack certificate. We provide 3 different scenarios: you can use the default **SELF-SIGNED CERTIFICATE** stored in the application (users will need to accept the browser security alert) or if you have a custom domain, either allow **LET'S ENCRYPT** to automatically generate a valid and free certificate for your domain or use your own **CUSTOM CERTIFICATE** if you already have one.

<div style="text-align: center" class="table-responsive">
  <table class="deploy-fields-table color-table">
    <tr>
      <th></th>
      <th>Self-Signed certificate</th>
      <th><em>Let's Encrypt</em> certificate</th>
      <th>Custom certificate</th>
    </tr>
    <tr>
      <td class="first-col">WhichCert</td>
      <td>selfsigned</td>
      <td>letsencrypt</td>
      <td>owncert</td>
    </tr>
    <tr>
      <td class="first-col">LetsEncryptEmail</td>
      <td></td>
      <td><em>Your choice</em></td>
      <td><em></em></td>
    </tr>
    <tr>
      <td class="first-col">MyDomainName</td>
      <td></td>
      <td><em>Your fully qualified domain</em></br><span class="field-comment">For example: if your full URL is <em><strong>https://openvidu.io/</strong></em>  then this is <em><strong>openvidu.io</strong></em></span></td>
      <td><em>Your fully qualified domain</em></br><span class="field-comment">For example: if your full URL is <em><strong>https://openvidu.io/</strong></em>  then this is <em><strong>openvidu.io</strong></em></span></td>
    </tr>
    <tr>
      <td class="first-col">PublicElasticIP</td>
      <td></td>
      <td><em>One AWS Elastic IP you generated</em></br><span class="field-comment">(check <a href="http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html#using-instance-addressing-eips-allocating" target="_blank">AWS Docs</a> to generate a new one)</span></td>
      <td><em>One AWS Elastic IP you generated</em></br><span class="field-comment">(check <a href="http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html#using-instance-addressing-eips-allocating" target="_blank">AWS Docs</a> to generate a new one)</span></td>
    </tr>
    <tr>
      <td class="first-col">OwnCertCRT</td>
      <td></td>
      <td></td>
      <td><em>URL to your public key file</em></td>
    </tr>
    <tr>
      <td class="first-col">OwnCertKEY</td>
      <td></td>
      <td></td>
      <td><em>URL to your private key file</em></td>
    </tr>
  </table>
</div>

> If you are using ***LET'S ENCRYPT CERTIFICATE***, of course you will need to register your ElasticIP in your DNS hosting service and associate it with the fully qualified domain name. Until your domain name is not accessible through the public IP you chose, this deployment won't work

#### OpenVidu Configuration

All of these properties configure OpenVidu Server. You have a list of all available properties [here](/reference-docs/openvidu-server-params){:target="_blank"}.

<div style="text-align: center" class="table-responsive">
  <table class="deploy-fields-table color-table-gray">
    <tr>
      <td class="first-col">OpenViduSecret</td>
      <td><em>Your choice</em></td>
    </tr>
    <tr>
      <td class="first-col">FreeHTTPAccesToRecordingVideos<br><span class="field-comment">Property <a href="/docs/reference-docs/openvidu-server-params" target="_blank"><code>openvidu.recording.public-access</code></a><span></td>
      <td><em>Choose from the drop-down button</em></td>
    </tr>
    <tr>
      <td class="first-col">OpenviduRecordingNotification<br><span class="field-comment">Property <a href="/docs/reference-docs/openvidu-server-params" target="_blank"><code>openvidu.recording.notification</code></a><span></td>
      <td><em>Choose from the drop-down button</em></td>
    </tr>
    <tr>
      <td class="first-col">OpenviduStreamsVideoMaxRecvBandwidth<br><span class="field-comment">Property <a href="/docs/reference-docs/openvidu-server-params" target="_blank"><code>openvidu.streams.video.max-recv-bandwidth</code></a><span></td>
      <td><em>Your choice</em></td>
    </tr>
      <tr>
      <td class="first-col">OpenviduStreamsVideoMinRecvBandwidth<br><span class="field-comment">Property <a href="/docs/reference-docs/openvidu-server-params/#configuration-parameters-for-openvidu-server" target="_blank"><code>openvidu.streams.video.min-recv-bandwidth</code></a><span></td>
      <td><em>Your choice</em></td>
    </tr>
      <tr>
      <td class="first-col">OpenviduStreamsVideoMinSendBandwidth<br><span class="field-comment">Property <a href="/docs/reference-docs/openvidu-server-params/#configuration-parameters-for-openvidu-server" target="_blank"><code>openvidu.streams.video.max-send-bandwidth</code></a><span></td>
      <td><em>Your choice</em></td>
    </tr>
      <tr>
      <td class="first-col">OpenviduStreamsVideoMaxRecvBandwidth<br><span class="field-comment">Property <a href="/docs/reference-docs/openvidu-server-params/#configuration-parameters-for-openvidu-server" target="_blank"><code>openvidu.streams.video.min-send-bandwidth</code></a><span></td>
      <td><em>Your choice</em></td>
    </tr>
    <tr>
      <td class="first-col">WantToDeployDemos<br><span class="field-comment">True if you want to deploy OpenVidu Demos. If so OpenViduSecret must be MY_SECRET<span></td>
      <td><em>Choose from the drop-down button</em></td>
    </tr>
  </table>
</div>

#### Other parameters

<div style="text-align: center" class="table-responsive">
  <table class="deploy-fields-table color-table-gray">
    <tr>
      <td class="first-col">Instance Type</td>
      <td><em>Your choice</em></td>
    </tr>
    <tr>
      <td class="first-col">KeyName</td>
      <td><em>Your choice</em></br><span class="field-comment">(check <a href="http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html" target="_blank">AWS Docs</a> to create a new one)</span></td>
    </tr>
    <tr>
      <td class="first-col">WantToSendInfo<br><span class="field-comment">True if don't mind sending OpenVidu team some info about your deployment (AWS zone and date)<span></td>
      <td><em>Choose from the drop-down button</em></td>
    </tr>
  </table>
</div>

#### 5. Create your Stack

No extra options are necessary. Click on  **_Next_** ➞ **_Next_** ➞ **_Create stack_**

**_CREATE_IN_PROGRESS_** status will show up. You will now have to wait for a few minutes until it shows **_CREATE_COMPLETE_** (between 6-10 minutes).

> If status reaches **CREATE_FAILED**, check out [this FAQ](/troubleshooting/#13-deploying-openvidu-in-aws-is-failing){:target="_blank"}

#### 6. Access and test your OpenVidu Server through your new IP

After status changes to **_CREATE_COMPLETE_**, go to **_Outputs_** tab to get your brand new IP and click on it (or if you have deployed under your own custom domain, then you should access through it)

  <p>
    <img class="img-responsive deploy-img" src="/img/docs/deployment/CF_output.png">
  </p>

<br>
You will connect to your OpenVidu dashboard. Credentials to access to it:

- `OPENVIDUAPP` as username
- The secret you chose on [Step 4](#openvidu-configuration) as password (field **OpenViduSecret** in the table).

At OpenVidu dashboard you can test the video transmission. You can now add your own application to your instance. To learn how check out section [Deploying your OpenVidu app](/deployment/deploying-app/).

<br>

<script src="/js/copy-btn.js"></script>