<h2 id="section-title">Deploying OpenVidu on AWS</h2>
<hr>

Deploying OpenVidu Server on AWS with Cloud Formation
------------------
The deployment of OpenVidu can be a piece of cake if you have an AWS account. Just follow these steps:

#### 1. Access to the console of AWS Cloud Formation

  <p><a href="https://console.aws.amazon.com/cloudformation" class="btn btn-xs btn-primary" title="Developing OpenVidu" target="_blank">Go to CloudFormation<span class="icon icon-circle-arrow-right"></span></a></p>

#### 2. Click on _Create Stack_

  <p>
    <img class="img-responsive deploy-img" src="/img/docs/deployment/CF_newstack.png">
  </p>

#### 3. Option _Specify an Amazon S3 template URL_ with the following URL

  <code id="code-2">https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/CF-OpenVidu-latest.json</code>
  <button id="btn-copy-2" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
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
      <td><em>Your custom domain</em></br><span class="field-comment">For example: if your full URL is <em><strong>https://openvidu.io/</strong></em>  then this is <em><strong>openvidu.io</strong></em></span></td>
      <td><em>Your custom domain</em></br><span class="field-comment">For example: if your full URL is <em><strong>https://openvidu.io/</strong></em>  then this is <em><strong>openvidu.io</strong></em></span></td>
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
      <td class="first-col">OpenVidu Secret</td>
      <td><em>Your choice</em></td>
      <td><em>Your choice</em></td>
      <td><em>Your choice</em></td>
    </tr>
    <tr>
      <td class="first-col">Free HTTP access to recorded videos<br><span class="field-comment">(see <code>openvidu.recording.public-access</code> property <a href="/docs/reference-docs/openvidu-server-params/#list-of-configuration-parameters-when-launching-openvidu-server">here</a>)<span></td>
      <td><em>true / false</em></td>
      <td><em>true / false</em></td>
      <td><em>true / false</em></td>
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

> If you are using ***LET'S ENCRYPT CERTIFICATE***, of course you will need to register your ElasticIP in your DNS hosting service and associate it with the fully qualified domain name.

#### 5. Create your Stack

No extra options are necessary. Click on  **_Next_** ➞ **_Next_** ➞ **_Create_**

**_CREATE_IN_PROGRESS_** status will show up. You will now have to wait for a few minutes until it shows **_CREATE_COMPLETE_** (between 6-10 minutes).

> If status reaches **CREATE_FAILED**, check out [this FAQ](/troubleshooting/#13-deploying-openvidu-in-aws-is-failing){:target="_blank"}

#### 6. Access and test your OpenVidu Server through your new IP

After status changes to **_CREATE_COMPLETE_**, go to **_Outputs_** tab to get your brand new IP and click on it (or if you have deployed under your own custom domain, then you should access through it).

  <p>
    <img class="img-responsive deploy-img" src="/img/docs/deployment/CF_output.png">
  </p>

You will connect to your OpenVidu dashboard. To access to it use:

- `OPENVIDUAPP` as username
- The secret you chose on [Step 4](#4-complete-the-configuration-fields) as password (field **OpenVidu Secret** in the table). 

At OpenVidu dashboard you can test the video transmission. You can now add your own application to your instance. To learn how check the [next section](#adding-your-own-app-to-cloudformation-openvidu-server).

<br>

<script src="/js/copy-btn.js"></script>