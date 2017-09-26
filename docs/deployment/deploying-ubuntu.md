<h2 id="section-title">Deploying on Ubuntu with native services and executables</h2>
<hr>

## Installation process

If you prefer having KMS installed in your EC2 machine and your own version of openvidu-server, follow these few steps. **Ubuntu xenial 14.04** and **Ubuntu trusty 16.04** are supported.

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

Go to [Using your own certificate](/deployment/custom-certificate#for-the-docker-container-of-openvidu-server) to add your certificate to the container instead of using the self-signed default one (which will launch a security warning on the user's browser).

#### 7B. ...or init your own openvidu-server executable

```console
java -jar -Dopenvidu.secret=YOUR_SECRET openvidu-server.jar &
```
Go to [Using your own certificate](/deployment/custom-certificate#for-a-jar-binary-of-openvidu-server) to add your certificate to the JAR instead of using the self-signed default one (which will launch a security warning on the user's browser).

#### 8. Finally check your server

You can connect to OpenVidu dashboard through `https://YOUR_MACHINE_PUBLIC_IP:8443` (authorization is `OPENVIDUAPP:YOUR_SECRET`). Make sure you allow TCP and UDP inbound connections to your machine!

Now you can deploy your application in the same machine (if the app is not pure frontend HTML/CSS/JS and has a [secure backend](/home/#securization), connect it to OpenVidu Server through _https://localhost:8443_) or in a different one (connect to OpenVidu server through _https://YOUR_MACHINE_PUBLIC_IP:8443_).


## Server network requirements

In order for this deployment to work, you will have to meet 2 sets of needs in the machine hosting your services:
  
  - First of all, you certainly need the machine to have a **public, reachable IP**. The reason is pretty simple: we are precisely installing _COTURN_ service to cover those situations where the final users are hidden behind NATs or complex networks ([learn more](/troubleshooting#what-are-stun-and-turn-servers-and-why-do-i-need-them)). If the _COTURN_ itself is running inside an unreachable machine, your video transmission could fail in certain cases.

  - Besides, the server needs some **ports** opened in the firewall:

      - **3478 TCP & UDP** (_COTURN_ listens on port 3478 by default)
      - **49152 - 65535 UDP** (WebRTC exchanges media through any of these ports)
  
  > If you were still in trouble, we provide a ready-to-use Amazon CloudFormation Stack to easily deploy OpenVidu in a few minutes [here](/deployment/deploying-aws/#deploying-openvidu-server-on-aws-with-cloud-formation).

## Architectures

You can have the following scenarios depending on how many machines you have and what architecture you prefer. What are the advantages and disadvantages of each one of them? Well, it really depends on the power of the machine, the nature of your application and the load expected. In general, having all the services running in one machine will reduce its performance and scalability, but on the other hand, makes it easier the process of installation, configuration and launching.

If you are deploying with these instructions for the first time, we recommend using only one machine. When you verify that everything is working as expected, you can try different configurations to compare overall performance and load capacity.

<div id="deploy-arch-row" class="row">
  <div class="col-md-8">
    <img class="img-responsive" src="/img/docs/deployment/app-ovserver-kms-final.png">
  </div>
  <div id="deploy-arch-desc" class="col-md-4">
  <blockquote>
    <ol>
      <li>App, OpenVidu Server and KMS run in the same machine</li>
      <li>App runs in its own machine. OpenVidu Server and KMS run in the same machine</li>
      <li>App, OpenVidu Server and KMS all run in different machines</li>
    </ol>
    </blockquote>
  </div>
</div>

The instructions above portray scenarios 1 and 2 in the image. In other words, we are supposing that OpenVidu Server and KMS will be hosted in the same machine. The only difference between options 1-2 and option 3 is that for steps 7A and 7B, another parameter is required when launching your openvidu-server:

#### 7A

```console
sudo docker run -d -p 8443:8443 -e openvidu.secret=YOUR_SECRET -e kms.uris=[\"ws://YOUR_KMS_MACHINE_IP:8888/kurento\"] openvidu/openvidu-server
```

#### 7B

```console
java -jar -Dopenvidu.secret=YOUR_SECRET -Dkms.uris=[\"ws://YOUR_KMS_MACHINE_IP:8888/kurento\"] openvidu-server.jar &
```
