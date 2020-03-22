<h2 id="section-title">Deploying OpenVidu on Ubuntu</h2>
<hr>

## Installation process

**Ubuntu Xenial 16.04** and **Ubuntu Bionic 18.04** are supported (see [Ubuntu Bionic limitations](#ubuntu-bionic-limitations)).

#### 1. Install KMS

**Ubuntu Xenial 16.04**

```bash
sudo echo "deb [arch=amd64] http://ubuntu.openvidu.io/6.13.0 xenial kms6" | sudo tee /etc/apt/sources.list.d/kurento.list
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 5AFA7A83
sudo apt-get update
sudo apt-get -y install kurento-media-server
```

**Ubuntu Bionic 18.04**

```bash
sudo echo "deb [arch=amd64] http://ubuntu.openvidu.io/6.13.0 bionic kms6" | sudo tee /etc/apt/sources.list.d/kurento.list
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 5AFA7A83
sudo apt-get update
sudo apt-get -y install kurento-media-server
```

After installing KMS, it is necessary to change the default user running it to the current one with this line:

```bash
sudo sed -i "s/DAEMON_USER=\"kurento\"/DAEMON_USER=\"${USER}\"/g" /etc/default/kurento-media-server
```

#### 2. Install COTURN
```bash
sudo apt-get -y install coturn
```

> This is a great implementation of a STUN/TURN server, necessary for connecting your users under some complicated circumstances. You can check its documentation [here](https://github.com/coturn/coturn){:target="_blank"}.

#### 3. Install Redis
```bash
sudo apt-get -y install redis-server
```

#### 4. File `/etc/kurento/modules/kurento/WebRtcEndpoint.conf.ini`
```console
externalAddress=YOUR_MACHINE_PUBLIC_IP
```

> You can also add optional parameter `networkInterfaces` to optimize and speed up the negotiation process. It is a comma-separated list with the network interfaces that OpenVidu should only try when negotiating media connections. For example:
>
>     externalAddress=YOUR_MACHINE_PUBLIC_IP
>     networkInterfaces=eth0,enp0s25

#### 5. File `/etc/turnserver.conf`
```console
external-ip=YOUR_MACHINE_PUBLIC_IP
listening-port=3478
fingerprint
lt-cred-mech
max-port=65535
min-port=40000
pidfile="/var/run/turnserver.pid"
realm=openvidu
simple-log
redis-userdb="ip=127.0.0.1 dbname=0 password=turn connect_timeout=30"
verbose
```

#### 6. File `/etc/default/coturn`
```bash
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
java -jar -Dopenvidu.secret=MY_SECRET -Dopenvidu.publicurl=https://YOUR_MACHINE_PUBLIC_IP:4443/ openvidu-server-{VERSION}.jar
```

Being `MY_SECRET` the password you want for securing your OpenVidu Server. This will be needed for connecting to OpenVidu Server dashboard and for consuming OpenVidu Server REST API. Keep it safe!

> **1)** You will need Java 8 to run OpenVidu Server:
> 
> `sudo apt-get install -y openjdk-8-jre`</br>
> 
> **2)** You can get any [version](releases/){:target="_blank"} of OpenVidu Server with the command below. To ensure compatibility comply with version numbers listed in [releases page](releases/){:target="_blank"}
> 
> `wget https://github.com/OpenVidu/openvidu/releases/download/v{VERSION}/openvidu-server-{VERSION}.jar`</br>
>
> **3)** If you want to enable recording module of OpenVidu Server to record your sessions, you must install [Docker CE](https://docs.docker.com/install/linux/docker-ce/ubuntu/){:target="_blank"} and add [some more system properties](advanced-features/recording/#2-launch-openvidu-server-with-new-properties){:target="_blank"} to the `java -jar` command. Check out [Recording](advanced-features/recording){:target="_blank"} section to learn more

<br>
Go to [Using your own certificate](#using-your-own-certificate) to add your certificate to the JAR instead of using the self-signed default one (which will launch a security warning on the user's browser).

#### 9. Finally check your server

You can connect to OpenVidu dashboard through `https://YOUR_OPENVIDU_SERVER_MACHINE_PUBLIC_IP:4443` (authorization is `OPENVIDUAPP:MY_SECRET`). Make sure you allow TCP and UDP inbound connections to your machine!

To connect your application to OpenVidu Server, use the same URL `https://YOUR_OPENVIDU_SERVER_MACHINE_PUBLIC_IP:4443`. To learn more, check out [Connecting your app to OpenVidu](deployment/deploying-app/#connecting-your-external-app-to-openvidu){:target="_blank"}.

<br>

---

## Server network requirements

In order for this deployment to work, you will have to meet 2 sets of needs in the machine hosting your services:
  
  - First of all, you certainly need the machine to have a **public, reachable IP**. The reason is pretty simple: we are precisely installing _COTURN_ service to cover those situations where the final users are hidden behind NATs or complex networks (**[learn more](troubleshooting/#6-what-are-stun-and-turn-servers-and-why-do-i-need-them){:target="_blank"}**). If the *COTURN* itself is running inside an unreachable machine, your video transmission will probably fail. And also make sure the server bandwidth is significant, as each media connection can potentially consume up to several MBs.

  - Besides, the server needs some **ports** opened in the firewall:

      - **4443 TCP** (_OpenVidu Server_ listens on port 4443 by default)
      - **3478 UDP and TCP** (_COTURN_ listens on port 3478 by default)
      - **40000 - 65535 UDP and TCP** (WebRTC will randomly exchange media through any of these ports. TCP might be used if client network blocks UDP connections)
  
  > If you were still in trouble, we provide a ready-to-use Amazon CloudFormation Stack to easily deploy OpenVidu in just a few minutes [here](deployment/deploying-aws){:target="_blank"}.

<br>

---

## Using your own certificate

OpenVidu Server is a Java application and therefore needs a Java keystore (**.jks**) for providing security certificates. If you don't have it, you can easily obtain a **.jks** file from your certificate and private key files (**.crt** and **.key** respectively, or maybe both of them being **.pem**). You do so by using **_openssl_** and **_keytool_** :

```bash
# Export certificate in p12 format (password will be asked)
# YOUR_CRT.crt and YOUR_KEY.key files may be YOUR_CRT.pem and YOUR_KEY.pem files instead
openssl pkcs12 -export -name YOUR_KEYSTORE_ALIAS -in YOUR_CRT.crt -inkey YOUR_PRIVATE_KEY.key -out p12keystore.p12

# Generate jks (password will be asked again)
keytool -importkeystore -srckeystore p12keystore.p12 -srcstoretype pkcs12 -deststoretype pkcs12 -alias YOUR_KEYSTORE_ALIAS -destkeystore YOUR_KEYSTORE_NAME.jks
```

<br>
In order to use your JKS, just give the proper value to the following OpenVidu Server properties on launch:

- `server.ssl.key-store`=/PATH/TO/YOUR_KEYSTORE_NAME.jks
- `server.ssl.key-store-password`=value_provided_when_generating_jks
- `server.ssl.key-alias`=YOUR_KEYSTORE_ALIAS

<br>

##### Example

```bash
java -jar -Dopenvidu.secret=MY_SECRET -Dserver.ssl.key-store=/opt/openvidu/my_keystore.jks -Dserver.ssl.key-store-password=MY_KEYSTORE_SECRET -Dserver.ssl.key-alias=my_cert_alias openvidu-server-2.5.0.jar
```

> Remember we provide a super simple way of using a **FREE**, **AUTOMATIC** and 100% **VALID** certificate thanks to Let's Encrypt technology: when deploying your CloudFormation Stack, just fill in the form fields with the values from the column **[LET'S ENCRYPT CERTIFICATE](deployment/deploying-aws#4-specify-stack-details){:target="_blank"}**

<br>

---

## Ubuntu Bionic limitations

OpenVidu supports **Ubuntu Xenial 16.04** and **Ubuntu Bionic 18.04**. OpenCV filters will not work in Bionic. All filters will work fine in Xenial.

Regarding filters explained in [Voice and video filters](advanced-features/filters/){:target="_blank} section, this will affect *FaceOverlayFilter* and *ChromaFilter*. In fact, no built-in module explained in [Kurento Docs](https://doc-kurento.readthedocs.io/en/stable/features/kurento_modules.html){:target="_blank} will work in Ubuntu Bionic (*PointerDetectorFilter*, *CrowdDetectorFilter*, *PlateDetectorFIlter*).

*ZBarFilter* and *GStreamer* filters work fine in Ubuntu Bionic.

<br>
