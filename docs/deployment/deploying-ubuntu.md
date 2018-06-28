<h2 id="section-title">Deploying on Ubuntu with native services and executables</h2>
<hr>

## Installation process

If you prefer having KMS installed in your EC2 machine and your own version of openvidu-server, follow these few steps. Only **Ubuntu xenial 16.04** is supported.

#### 1. Install KMS
```console
echo "deb http://ubuntu.openvidu.io/6.7.2 xenial kms6" | tee /etc/apt/sources.list.d/kurento.list
apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 5AFA7A83
apt-get update
apt-get -y install kurento-media-server
apt-get -y install openh264-gst-plugins-bad-1.5
```

#### 2. Install COTURN
```console
sudo apt-get -y install coturn
```

> This is a great implementation of a STUN/TURN server, necessary for connecting your users under some complicated circumstances. You can check its documentation [here](https://github.com/coturn/coturn).

#### 3. Install Redis
```console
sudo apt-get -y install redis-server
```

#### 4. File `/etc/kurento/modules/kurento/WebRtcEndpoint.conf.ini`
```console
stunServerAddress=YOUR_MACHINE_PUBLIC_IP
stunServerPort=3478
```

#### 5. File `/etc/turnserver.conf`
```console
external-ip=YOUR_MACHINE_PUBLIC_IP
listening-port=3478
fingerprint
lt-cred-mech
max-port=65535
min-port=49152
pidfile="/var/run/turnserver.pid"
realm=openvidu
simple-log
redis-userdb="ip=127.0.0.1 dbname=0 password=turn connect_timeout=30"
verbose
```

#### 6. File `/etc/default/coturn`
```
TURNSERVER_ENABLED=1
```

#### 7. Init services
```bash
sudo service redis-server restart
sudo service coturn restart
sudo service kurento-media-server restart
```

#### 8. Init Openvidu Server JAR executable

```console
java -jar -Dopenvidu.secret=YOUR_SECRET -Dopenvidu.publicurl=https://YOUR_MACHINE_PUBLIC_IP:4443/ openvidu-server.jar &
```

> You will need Java 8 to run OpenVidu Server:
> 
> `sudo add-apt-repository -y ppa:openjdk-r/ppa`</br>
> `sudo sudo apt-get update`</br>
> `sudo apt-get install -y openjdk-8-jre`</br>
> 
> You can get any [version](/releases/) of OpenVidu Server running:
> 
> `wget https://github.com/OpenVidu/openvidu/releases/download/v{VERSION}/openvidu-server-{VERSION}.jar`</br>

Go to [Using your own certificate](/deployment/custom-certificate#for-a-jar-binary-of-openvidu-server) to add your certificate to the JAR instead of using the self-signed default one (which will launch a security warning on the user's browser).

#### 9. Finally check your server

You can connect to OpenVidu dashboard through `https://YOUR_OPENVIDU_SERVER_MACHINE_PUBLIC_IP:4443` (authorization is `OPENVIDUAPP:YOUR_SECRET`). Make sure you allow TCP and UDP inbound connections to your machine!

To connect your application to OpenVidu Server, use the same URL `https://YOUR_OPENVIDU_SERVER_MACHINE_PUBLIC_IP:4443`. To learn more, this scenario is exactly the same as portrayed [here](/deployment/deploying-aws#connecting-your-external-app-to-cloudformation-openvidu-server).

## Server network requirements

In order for this deployment to work, you will have to meet 2 sets of needs in the machine hosting your services:
  
  - First of all, you certainly need the machine to have a **public, reachable IP**. The reason is pretty simple: we are precisely installing _COTURN_ service to cover those situations where the final users are hidden behind NATs or complex networks ([learn more](/troubleshooting#6-what-are-stun-and-turn-servers-and-why-do-i-need-them)). If the _COTURN_ itself is running inside an unreachable machine, your video transmission could fail in certain cases.

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

The instructions above portray scenarios 1 and 2 in the image. In other words, we are supposing that OpenVidu Server and KMS will be hosted in the same machine. The only difference between options 1-2 and option 3 is that for step 8 another parameter is required when launching your openvidu-server:

```console
java -Dopenvidu.secret=YOUR_SECRET -Dopenvidu.publicurl=https://YOUR_MACHINE_PUBLIC_IP:4443/ -Dkms.uris=[\"ws://YOUR_KMS_MACHINE_IP:8888/kurento\"] -jar openvidu-server.jar
```
