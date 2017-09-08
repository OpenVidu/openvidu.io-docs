<h2 id="section-title">Tutorial - Deploying OpenVidu Demos on AWS</h2>
<hr>

Deploying on AWS with Cloud Formation
------------------
We have packed all our demos in one single template for AWS CloudFormation. You can follow these steps and see how easy it is to deploy OpenVidu in the cloud.

<div style="
    display: table;
    border: 1px solid #0088aa;
    border-radius: 5px;
    width: 100%;"><div style="display: table-cell">
    <i class="icon ion-android-alert" style="
    font-size: 60px;
    color: #0088aa;
    display: inline-block;
    padding-left: 30%;
"></i></div>
<div style="
    vertical-align: middle;
    display: table-cell;
    padding-left: 20px;
    padding-right: 20px;
    ">This CloudFormation Stack will send us some data for the sake of statistics gathering. This ONLY includes the <strong>AWS geographical area</strong>, the <strong>version of OpenVidu</strong> that is being used and the <strong>current date</strong>.</div></div>

#### 1. Access to the console of AWS Cloud Formation

  <p><a href="https://console.aws.amazon.com/cloudformation" class="btn btn-xs btn-primary" title="Developing OpenVidu" target="_blank">Go to CloudFormation<span class="icon icon-circle-arrow-right"></span></a></p>

#### 2. Click on _Create Stack_

  <p>
    <img class="img-responsive deploy-img" src="/img/docs/deployment/CF_newstack.png">
  </p>

#### 3. Option _Specify an Amazon S3 template URL_ with the following URL

  <code id="code-1">https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/CF-OpenVidu-Demos-latest.json</code>
  <button id="btn-copy-1" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
                                title="Copy to Clipboard">Copy</button>

  <p>
    <img class="img-responsive deploy-img" src="/img/docs/deployment/CF_url.png">
  </p>

#### 4. Complete the configuration fields

We provide 3 different scenarios: you can use the default **SELF-SIGNED CERTIFICATE** stored in the application (users will need to accept the security alert) or if you have a custom domain, either allow **LET'S ENCRYPT** to automatically generate a valid and free certificate for your domain or use your own **CUSTOM CERTIFICATE** if you already have one.

<div style="text-align: center" class="table-responsive">
  <table class="deploy-fields-table color-table">
    <tr>
      <th></th>
      <th>Self-Signed certificate</th>
      <th><em>Let's Encrypt</em> certificate</th>
      <th>Custom certificate</th>
    </tr>
    <tr>
      <td class="first-col">Stack name</td>
      <td><em>Your choice</em></td>
      <td><em>Your choice</em></td>
      <td><em>Your choice</em></td>
    </tr>
    <tr>
      <td class="first-col">Type of SSL Certificate</td>
      <td>selfsigned</td>
      <td>letsencrypt</td>
      <td>owncert</td>
    </tr>
    <tr>
      <td class="first-col">Email</td>
      <td></td>
      <td><em>Your choice</em></td>
      <td><em></em></td>
    </tr>
    <tr>
      <td class="first-col">Fully qualified domain name</td>
      <td></td>
      <td><em>Your custom domain</em></br><span class="field-comment">(for example: <em>openvidu.io</em>)</span></td>
      <td><em>Your custom domain</em></br><span class="field-comment">(for example: <em>openvidu.io</em>)</span></td>
    </tr>
    <tr>
      <td class="first-col">Elastic IP</td>
      <td></td>
      <td><em>One AWS Elastic IP you generated</em></br><span class="field-comment">(check <a href="http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html#using-instance-addressing-eips-allocating" target="_blank">AWS Docs</a> to generate a new one)</span></td>
      <td><em>One AWS Elastic IP you generated</em></br><span class="field-comment">(check <a href="http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html#using-instance-addressing-eips-allocating" target="_blank">AWS Docs</a> to generate a new one)</span></td>
    </tr>
    <tr>
      <td class="first-col">CRT File</td>
      <td></td>
      <td></td>
      <td><em>Content of your <strong>.crt</strong> file</em><br><span class="field-comment">-----BEGIN CERTIFICATE-----<br>fooFOOfooFOOfooFOOfoo...<br>-----END CERTIFICATE-----</span></td>
    </tr>
    <tr>
      <td class="first-col">KEY File</td>
      <td></td>
      <td></td>
      <td><em>Content of your <strong>.key</strong> file</em><br><span class="field-comment">-----BEGIN RSA PRIVATE KEY-----<br>fooFOOfooFOOfooFOOfoo...<br>-----END RSA PRIVATE KEY-----</span></td>
    </tr>
    <tr>
      <td class="first-col">Instance Type</td>
      <td><em>Your choice</em></br><span class="field-comment">(at least <code>t2.medium</code> recommended)</span></td>
      <td><em>Your choice</em></br><span class="field-comment">(at least <code>t2.medium</code> recommended)</span></td>
      <td><em>Your choice</em></br><span class="field-comment">(at least <code>t2.medium</code> recommended)</span></td>
    </tr>
    <tr>
      <td class="first-col">KeyName</td>
      <td><em>Your choice</em></br><span class="field-comment">(check <a href="http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html" target="_blank">AWS Docs</a> to create a new one)</span></td>
      <td><em>Your choice</em></br><span class="field-comment">(check <a href="http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html" target="_blank">AWS Docs</a> to create a new one)</span></td>
      <td><em>Your choice</em></br><span class="field-comment">(check <a href="http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html" target="_blank">AWS Docs</a> to create a new one)</span></td>
    </tr>
  </table>
</div>

#### 5. Create your Stack

No extra options are necessary. Click on  **_Next_** ➞ **_Next_** ➞ **_Create_**

**_CREATE_IN_PROGRESS_** status will show up. You will now have to wait for a few minutes.

Despite saying **_CREATE_COMPLETE_**, it can take up to 7 minutes to fully deploy the Demo Software, so please be patient.

#### 6. Access the demos through your new IP

Go to **_Outputs_** tab to get your brand new IP and click on it (or if you have deployed the demos with Let's Encrypt under your own custom domain, then you should access through it).

  <p>
    <img class="img-responsive deploy-img" src="/img/docs/deployment/CF_output_demos.png">
  </p>

  > **IMPORTANT**: Even though the Status of your new Stack shows "CREATE_COMPLETE", 
  > it will take a bit longer until you can access your demos. Be patient.


<script src="/js/copy-btn.js"></script>