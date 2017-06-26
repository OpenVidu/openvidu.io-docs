<h2 id="section-title">OpenVidu Deployment</h2>
<hr>

Deploying on AWS with Cloud Formation
------------------
The deployment of OpenVidu can be a piece of cake if you have an AWS account. Just follow these steps:

### Deploying an OpenVidu demo

#### 1. Access to the console of Cloud Formation with this URL

  [https://eu-west-1.console.aws.amazon.com/cloudformation](https://eu-west-1.console.aws.amazon.com/cloudformation)

#### 2. Click on _Create Stack_

  <p align="center">
    <img class="img-responsive" src="https://docs.google.com/uc?id=0B61cQ4sbhmWSb0ttOUNzMkp0ckU">
  </p>

#### 3. Option _Specify an Amazon S3 template URL_ with the following URL

  `https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/CF-coturn-kms-openvidu.yaml`

  <p align="center">
    <img class="img-responsive" src="https://docs.google.com/uc?id=0B61cQ4sbhmWSZE1pVHYxbU5Lb0k">
  </p>

#### 4. Complete the fields

- **Stack name**: `OpenVidu`
- **InstanceType**: `t2.medium`
- **KeyName**: _whatever key you want_

#### 5. Create your Stack

No extra options are necessary. Click on  **_Next_** ➞ **_Next_** ➞ **_Create_**

**_CREATE_IN_PROGRESS_** status will show up.

#### 6. Access the demo through your new IP

Wait until status shows **_CREATE_COMPLETE_**

Go to **_Outputs_** tab to get your brand new IP and click on it. Accept the certificate and there you have your deployed OpenVidu demo!

  <p align="center">
    <img class="img-responsive" src="https://docs.google.com/uc?id=0B61cQ4sbhmWSZDNpdWpTMkw3Mlk">
  </p>

---

Deploying on AWS with native services and executables
------------------
If you prefer to have your own local . In this case, KMS and openvidu-server run in the same machine, the first one as a native service and the second one in a Docker container.

#### 1. Install KMS (in first command: ***xenial*** for 16.04, ***trusty*** for 14.04)
```bash
echo "deb http://ubuntu.kurento.org xenial kms6" | sudo tee /etc/apt/sources.list.d/kurento.list
wget -O - http://ubuntu.kurento.org/kurento.gpg.key | sudo apt-key add -
sudo apt-get update
sudo apt-get install kurento-media-server-6.0
```

#### 2. Install COTURN
```bash
sudo apt-get install coturn
```

#### 3. File `/etc/kurento/modules/kurento/WebRtcEndpoint.conf.ini`
```
stunServerAddress=STUN_IP
stunServerPort=STUN_PORT
turnURL=USER:PASS@YOUR_MACHINES'S_PUBLIC_IP:3478
```

#### 4. File `/etc/turnserver.conf`
```
external-ip=YOUR_MACHINES'S_PUBLIC_IP
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

#### 7. Init openvidu-server Docker container (securization enabled)

```html
sudo docker run -d -p 8443:8443 -e openvidu.security=true -e openvidu.secret=YOUR_SECRET -e kms.uris=[\"ws://YOUR_MACHINE'S_INTERNAL_IP:8888/kurento\"] openvidu/openvidu-server
```


