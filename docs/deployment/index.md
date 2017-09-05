<h2 id="section-title">OpenVidu Deployment</h2>
<hr>

Table of contents
========

- [Deploying on AWS with Cloud Formation](#deploying-on-aws-with-cloud-formation)
    - [Deploying OpenVidu demos](#deploying-openvidu-demos)
    - [Deploying OpenVidu server and your own app](#deploying-openvidu-server-and-your-own-app)
- [Deploying on AWS with native services and executables](#deploying-on-aws-with-native-services-and-executables)

----------

Deploying on AWS with Cloud Formation
------------------
The deployment of OpenVidu can be a piece of cake if you have an AWS account. Just follow these steps:


### Deploying OpenVidu demos

We have packed all our demos in one single template for AWS CloudFormation. You can follow these steps and see how easy it is to deploy OpenVidu in the cloud.

#### 1. Access to the console of AWS Cloud Formation

  <p><a href="https://console.aws.amazon.com/cloudformation" class="btn btn-xs btn-primary" title="Developing OpenVidu" target="_blank">Go to CloudFormation<span class="icon icon-circle-arrow-right"></span></a></p>

#### 2. Click on _Create Stack_

  <p>
    <img class="img-responsive deploy-img" src="/img/docs/deployment/CF_newstack.png">
  </p>

#### 3. Option _Specify an Amazon S3 template URL_ with the following URL

  <code id="code-1">https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/CF-OpenVidu-Demos.json</code>
  <button id="btn-copy-1" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
                                title="Copy to Clipboard">Copy</button>

  <p>
    <img class="img-responsive deploy-img" src="/img/docs/deployment/CF_url.png">
  </p>

#### 4. Complete the configuration fields

We provide 2 different scenarios: you can use the default **self-signed certificate** stored in the application (users will need to accept the security alert) or if you have a custom domain, allow **Let's Encrypt** to automatically generate a valid and free certificate for your domain.

<div class="row">
  <div class="col col-md-6">
    <h5>Self-signed certificate</h5>
      <table class="deploy-fields-table">
        <tr>
          <th>Field</th>
          <th>Value</th>
        </tr>
        <tr>
          <td>Stack name</td>
          <td><em>Your choice</em></td>
        </tr>
        <tr>
          <td>Do you want Let's Encrypt</td>
          <td><strong>false</strong></td>
        </tr>
        <tr>
          <td>Email address</td>
          <td></td>
        </tr>
        <tr>
          <td>Fully qualified domain name</td>
          <td></td>
        </tr>
        <tr>
          <td>Elastic IP</td>
          <td></td>
        </tr>
        <tr>
          <td>Instance Type</td>
          <td><em>Your choice</em></br>(at least <code>t2.medium</code> recommended)</td>
        </tr>
        <tr>
          <td>KeyName</td>
          <td><em>Your choice</em></br>(check <a href="http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html" target="_blank">AWS Docs</a> to create a new one)</td>
        </tr>
        <tr>
          <td>SSHLocation</td>
          <td><strong>0.0.0.0/0</strong></td>
        </tr>
      </table>
  </div>
  <div class="col col-md-6">
    <h5>Let's Encrypt certificate (a valid certficate free of charge!)</h5>
      <table class="deploy-fields-table">
        <tr>
          <th>Field</th>
          <th>Value</th>
        </tr>
        <tr>
          <td>Stack name</td>
          <td><em>Your choice</em></td>
        </tr>
        <tr>
          <td>Do you want Let's Encrypt</td>
          <td><strong>true</strong></td>
        </tr>
        <tr>
          <td>Email address</td>
          <td><em>Your choice</em></td>
        </tr>
        <tr>
          <td>Fully qualified domain name</td>
          <td><em>Your custom domain</em></br>(for example: <strong>openvidu.io</strong>)</td>
        </tr>
        <tr>
          <td>Elastic IP</td>
          <td><em>One AWS Elastic IP you generated</em></br>(check <a href="http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html#using-instance-addressing-eips-allocating" target="_blank">AWS Docs</a> to generate a new one)</td>
        </tr>
        <tr>
          <td>Instance Type</td>
          <td><em>Your choice</em></br>(at least <code>t2.medium</code> recommended)</td>
        </tr>
        <tr>
          <td>KeyName</td>
          <td><em>Your choice</em></br>(check <a href="http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html" target="_blank">AWS Docs</a> to create a new one)</td>
        </tr>
        <tr>
          <td>SSHLocation</td>
          <td><strong>0.0.0.0/0</strong></td>
        </tr>
      </table>
  </div>
</div>

#### 5. Create your Stack

No extra options are necessary. Click on  **_Next_** ➞ **_Next_** ➞ **_Create_**

**_CREATE_IN_PROGRESS_** status will show up. You will now have to wait for a few minutes.

Despite saying **_CREATE_COMPLETE_**, it can take up to 7 minutes to fully deploy the Demo Software, so please be patient.

#### 6. Access the demo through your new IP

Go to **_Outputs_** tab to get your brand new IP and click on it (or if you have deployed the demos with Let's Encrypt under your own custom domain, you can directly access through it).

  <p>
    <img class="img-responsive deploy-img" src="/img/docs/deployment/CF_output.png">
  </p>

  > **IMPORTANT**: Even though the Status of your new Stack saws "CREATE_COMPLETE", 
  > it will take a bit longer until you can access your demos. Be patient.

### Deploying OpenVidu server and your own app



---

Deploying on AWS with native services and executables
------------------
If you prefer having KMS installed in your EC2 machine and your own version of openvidu-server, follow these few steps. In this case, KMS and openvidu-server run in the same machine.

#### 1. Install KMS (in first command: ***xenial*** for 16.04, ***trusty*** for 14.04)
```console
echo "deb http://ubuntu.kurento.org xenial kms6" | sudo tee /etc/apt/sources.list.d/kurento.list
wget -O - http://ubuntu.kurento.org/kurento.gpg.key | sudo apt-key add -
sudo apt-get update
sudo apt-get -y install kurento-media-server-6.0
```

#### 2. Install COTURN
```console
sudo apt-get -y install coturn
```
> This is a great implementation of a STUN/TURN server, necessary for connecting your users under some complicated circumstances. You can check its documentation [here](https://github.com/coturn/coturn).
> If there's any problem with the installation on **Ubuntu trusty 14.04**:
>
> `wget -c http://ftp.us.debian.org/debian/pool/main/c/coturn/coturn_4.2.1.2-1_amd64.deb`</br>
> `sudo dpkg -i coturn_4.2.1.2-1_amd64.deb`</br>
> `sudo apt-get -f -y install`</br>
> `sudo dpkg -i coturn_4.2.1.2-1_amd64.deb`</br>

#### 3. File `/etc/kurento/modules/kurento/WebRtcEndpoint.conf.ini`
```console
stunServerAddress=YOUR_MACHINE_PUBLIC_IP
stunServerPort=3478
turnURL=USER:PASS@YOUR_MACHINE_PUBLIC_IP:3478
```

#### 4. File `/etc/turnserver.conf`
```console
external-ip=YOUR_MACHINE_PUBLIC_IP
fingerprint
user=USER:PASS
lt-cred-mech
realm=kurento.org
log-file=/var/log/turnserver/turnserver.log
simple-log
```

#### 5. File `/etc/default/coturn`
```
TURNSERVER_ENABLED=1
```

#### 6. Init services
```bash
sudo service coturn restart
sudo service kurento-media-server-6.0 restart
```

#### 7A. Init openvidu-server Docker container...
```console
sudo docker run -d -p 8443:8443 -e openvidu.secret=YOUR_SECRET --net="host" openvidu/openvidu-server
```

> To quickly install the latest official stable version of **Docker CE**:

> 
> `curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -`</br>
> `sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"`</br>
> `sudo apt-get update`</br>
> `sudo apt-get -y install docker-ce`</br>
>

#### 7B. ...or init your own openvidu-server executable
```console
java -jar -Dopenvidu.secret=YOUR_SECRET openvidu-server.jar
```

You can connect to OpenVidu dashboard through `https://YOUR_MACHINE_PUBLIC_IP:8443` (authorization is OPENVIDUAPP:_YOUR_SECRET_)

Make sure you allow TCP and UDP inbound connections to your machine!

<script src="/js/copy-btn.js"></script>