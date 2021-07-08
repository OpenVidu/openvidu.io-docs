<h2 id="section-title">Deploying OpenVidu on Digital Ocean</h2>
<hr>

- **[Deployment instructions](#deployment-instructions)**
    - [1) Create Droplet](#1-create-droplet)
    - [2) Update docker-compose](#2-update-docker-compose)
    - [3) Download and install newest copy of OpenVidu](#3-download-and-install-newest-copy-of-openvidu)
    - [4) Configure OpenVidu](#4-configure-openvidu)
    - [5) Configure the Firewall](#5-configure-the-firewall)
    - [6) Run OpenVidu](#6-run-openvidu)

---

## Deployment instructions

The deployment of OpenVidu on Digital Ocean is within your grasp using these instructions. 

### 1.  Create Droplet
Create a new DO droplet based on the [docker marketplace image](https://marketplace.digitalocean.com/apps/docker).

The standard droplet is sufficient for testing and limited production use.
### 2.  Update docker-compose
SSH in as root and perform the following:

    rm /usr/local/bin/docker-compose
    VERSION="$(curl --silent https://api.github.com/repos/docker/compose/releases/latest | jq .name -r)"
    DESTINATION=/usr/local/bin/docker-compose
    sudo curl -L https://github.com/docker/compose/releases/download/${VERSION}/docker-compose-$(uname -s)-$(uname -m) -o $DESTINATION
    sudo chmod 755 $DESTINATION

### 3. Download and install newest copy of OpenVidu
    cd /opt/
    curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_latest.sh | bash

### 4. Configure OpenVidu
You can manually edit the `/opt/openvidu/.env` file. However, if you want to work completely from the prompt or incorporate the setup into a script use the following steps:

####Development OpenVidu Configuration
If you are building an OpenVidu instance for your own testing you don't need a domain. 

You'll access it by the IP address, and browsers will complain about the self-signed certificate.
 
Set the following environment variables:

```
IPADDRESS=[your Droplet IP Address]
OVSECRET=[a self-chosen string to act as your secret]
```
Add them to OpenVidu's .env:    
```
sed -i "s/DOMAIN_OR_PUBLIC_IP=/DOMAIN_OR_PUBLIC_IP=$IPADDRESS/g" /opt/openvidu/.env
sed -i "s/OPENVIDU_SECRET=/OPENVIDU_SECRET=$OVSECRET/g" /opt/openvidu/.env
```
####Production OpenVidu Configuration
If you want to access droplet using a proper domain name and have browsers be happy, there are a few more steps.

First point your chosen domain at the droplet's IP address. 

If you're using Digital Ocean as your DNS, you can do this by creating an A record in Networking 
and then pointing it at the IP address for your new droplet. Otherwise, do this at your registrar. 

> **Note**: OpenVidu will not be able to complete the letsencrypt certbot process if the domain is not resolving on the IP address.  Be sure you have given ample time for the domain name you've assigned to propagate. 

Configure OpenVidu's .env file first by setting the following environment files:

    DOMAINNAME=[your domain name, i.e. ov.mydomain.com]
    OVSECRET=[a self-chosen string to act as your secret]
    ADMINEMAIL=[a valid email you wish to attach to the SSL certificate]
Then add them to OpenVidu's configuration using the following:    

    sed -i "s/DOMAIN_OR_PUBLIC_IP=/DOMAIN_OR_PUBLIC_IP=$DOMAINNAME/g" /opt/openvidu/.env
    sed -i "s/OPENVIDU_SECRET=/OPENVIDU_SECRET=$OVSECRET/g" /opt/openvidu/.env
    sed -i "s/LETSENCRYPT_EMAIL=user@example.com/LETSENCRYPT_EMAIL=$ADMINEMAIL/g" .env
    sed -i "s/CERTIFICATE_TYPE=selfsigned/CERTIFICATE_TYPE=letsencrypt/g" .env
 
### 5. Configure the Firewall
Configure the firewall by running the following commands:

    ufw allow ssh
    ufw allow 80/tcp
    ufw allow 443/tcp
    ufw allow 3478/tcp
    ufw allow 3478/udp
    ufw allow 40000:57000/tcp
    ufw allow 40000:57000/udp
    ufw allow 57001:65535/tcp
    ufw allow 57001:65535/udp
    ufw --force enable
    
### 6. Run OpenVidu
You're ready to run OpenVidu! Run the following commands. Note there could be one or more long pauses, so be patient.

You'll know it is ready when it presents the urls to you for access.  

    cd /opt/openvidu/
    ./openvidu start
