<h2 id="section-title">OpenVidu Deployment</h2>
<hr>


Deploying on AWS
===================
Here you have a step by step guide to deploy a production version of OpenVidu in an Ubuntu machine. In this case, KMS and openvidu-server run in the same machine, the first one as a native service and the second one in a Docker container.

#### 1. Install KMS (in first command: ***xenial*** for 16.04, ***trusty*** for 14.04)
```bash
echo "deb http://ubuntu.kurento.org xenial kms6" | sudo tee /etc/apt/sources.list.d/kurento.list
wget -O - http://ubuntu.kurento.org/kurento.gpg.key | sudo apt-key add -
sudo apt-get update
sudo apt-get install kurento-media-server-6.0
```

#### 2. Install COTURN
```
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

```
sudo docker run -d -p 8443:8443 -e openvidu.security=true -e openvidu.secret=YOUR_SECRET -e kms.uris=[\"ws://YOUR_MACHINE'S_INTERNAL_IP:8888/kurento\"] openvidu/openvidu-server
```


