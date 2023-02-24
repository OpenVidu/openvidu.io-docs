<h2 id="section-title">Allow users behind firewalls</h2>
<hr>

- **[Introduction](#introduction)**
- **[Prerequisites](#prerequisites)**
- **[Deploy a TURN service for clients behind firewalls (Let's Encrypt)](#deploy-a-turn-service-for-clients-behind-firewalls-with-lets-encrypt)**
- **[Deploy a TURN service for clients behind firewalls (with custom certificates)](#deploy-a-turn-service-for-clients-behind-firewalls-with-custom-certificates)**
- **[Use a third-party TURN SaaS for clients behind firewalls](#use-a-third-party-turn-saas-for-clients-behind-firewalls)**

---

## Introduction

OpenVidu deployments include a TURN server ([Coturn](https://github.com/coturn/coturn){:target="\_blank"}) that listens at port 3478. While that's a good setup for most scenarios, some corporate networks only allow connections to port 443, which OpenVidu uses for its API and WebSocket endpoints. This means that the included TURN server cannot be used in those networks.

To solve this limitation, OpenVidu now can be easily configured with external TURN servers, either to use our brand new TURN appliance that can be deployed externally, or a third-party TURN SaaS. In the next sections, both scenarios will be described.

## Prerequisites

1. A Linux machine with its own **public IP**. **It must be a different machine than those used by OpenVidu**.
2. A **FQDN(Fully Qualified Domain Name)** which must point to the public IP of the machine. No proxies or anything else, just a simple domain/subdomain with a register of type A pointing to its public IP.
3. Good network bandwidth.
4. **Docker** and **docker-compose** installed.

Also, you will need to open these ports:

<br>

##### Inbound Ports
<p>
    <img class="img-responsive deploy-img" src="img/docs/deployment/external_turn_inbound_rules.png">
</p>

- Port **80 TCP** is needed by certbot to renew certificates
- Port **443 TCP/UDP** is needed to connect to coturn from browsers
- Port **22 TCP** is only necessary if you want to SSH into your instance

<br>

##### Outbound Ports
<p>
    <img class="img-responsive deploy-img" src="img/docs/deployment/external_turn_outbound_rules.png">
</p>

- All outbound traffic is recommended for TURN to be able to relay media from all ports to the media nodes.

<br>

<br>

---

## Deploy a TURN service for clients behind firewalls (with Let's Encrypt)

<br>
We provide our own deployment based on the [Coturn](https://github.com/coturn/coturn){:target="\_blank"} project which can be deployed at port 443 with SSL using Let's Encrypt. In this section we will describe how to install it and configure it to be used by OpenVidu:

<br>
**1)** SSH into the machine you will deploy coturn as root.

**2)** Go to `/opt/` directory.

**3)** Execute this command to install our Coturn deployment.

```bash
curl https://s3.eu-west-1.amazonaws.com/aws.openvidu.io/external-turn/4.5.2/install_openvidu_external_coturn.sh | bash
```

**4)** Fill in the file `/opt/coturn/.env` these environment variables:

- `TURN_DOMAIN_NAME`: Domain which is pointing to the public ip of the machine.
- `LETSENCRYPT_EMAIL`: Email you want to use for letsencrypt certificate.
- `TURN_STATIC_AUTH_SECRET`: TURN shared key with OpenVidu. It is recommended to use alphanumeric characters.

**5)** Execute coturn:
```
docker-compose up -d
```

Check the logs to see if everything is OK:
```
docker-compose logs -f
```

You should see this log trace from `certbot` and `coturn` containers:

```text
certbot    | Account registered.
certbot    | Requesting a certificate for <TURN_DOMAIN_NAME>
certbot    |
certbot    | Successfully received certificate.
certbot    | Certificate is saved at: /etc/letsencrypt/live/<TURN_DOMAIN_NAME>/fullchain.pem
certbot    | Key is saved at:         /etc/letsencrypt/live/<TURN_DOMAIN_NAME>/privkey.pem
certbot    | This certificate expires on ******.
certbot    | These files will be updated when the certificate renews.
...
coturn     | 0: : <SSL_TLS_DTLS_VERSION>: Certificate file found: /etc/letsencrypt/live/<TURN_DOMAIN_NAME>/cert.pem
...
coturn     | 0: : <SSL_TLS_DTLS_VERSION>: Certificate file found: /etc/letsencrypt/live/<TURN_DOMAIN_NAME>/privkey.pem
...
coturn     | 0: : IPv4 <PROTOCOL> listener opened on : 0.0.0.0:443
```

Now your TURN server is ready at port 443 with SSL.

> As long as the output of the coturn service matches the above one, you can ignore some error logs that you may see. Coturn is very verbose and tries to apply some default configurations that may produce those errors.

#### Configure OpenVidu to use the new TURN server deployed:

Configure the previously defined `TURN_DOMAIN_NAME` and `TURN_STATIC_AUTH_SECRET` in OpenVidu server using this parameter at `/opt/openvidu/.env/`:

```bash
OPENVIDU_WEBRTC_ICE_SERVERS=["url=turns:<TURN_DOMAIN_NAME>:443,staticAuthSecret=<TURN_STATIC_AUTH_SECRET>"]
```

#### Deployment example

Let's supose that we want to deploy a TURN server using 443 SSL using:

- **Domain name of Turn**: `turn-server.example.com`
- **Static auth secret (Shared secret)**: `mysecret`
- **Letsencrypt email**: `example-email@example.com`

We should have a machine with its own **Public IP with a domain name pointing to it**. It must also be in a **different machine than OpenVidu ones**. The file `/opt/coturn/.env` should look like this:

```
TURN_DOMAIN_NAME=turn-server.example.com
LETSENCRYPT_EMAIL=example-email@example.com
TURN_STATIC_AUTH_SECRET=mysecret
```

On the other hand at OpenVidu, configuration in `/opt/openvidu/.env` should include this property:

```
OPENVIDU_WEBRTC_ICE_SERVERS=["url=turns:turn-server.example.com:443,staticAuthSecret=mysecret"]
```

<br>

---

## Deploy a TURN service for clients behind firewalls (with custom certificates)

<br>
The instructions we provide at [Deploy a TURN service for clients behind firewalls](#deploy-a-turn-service-for-clients-behind-firewalls) are prepared to work by default with SSL using Letsencrypt,
but you may want to use a certificate purchased from a CA or you have your own self-signed certificate. To deploy it you just need to:
<br>

**1)** SSH into the machine you will deploy coturn and change to the root user.

**2)** Go to `/opt/` directory.

**3)** Execute this command to install our Coturn deployment.

```bash
curl https://s3.eu-west-1.amazonaws.com/aws.openvidu.io/external-turn/4.5.2/install_openvidu_external_coturn.sh | bash
```

**4)** Place your certificates in a directory, for example: `/opt/coturn/owncert`. You should have two files at this directory:

- `privkey.pem` (Private key file)
- `cert.pem` (Certificate file)

**5)** Remove the `certbot` service from `/opt/coturn/docker-compose.yml`.

**6)** Modify `/opt/coturn/docker-compose.yml` to use the directory of your certificates. Instead of this volume...:

```yaml
volumes:
    - ./certbot/etc/letsencrypt:/etc/letsencrypt
```

... change it to this one...:

```yaml
volumes:
    - /opt/coturn/owncert:/opt/coturn/owncert
```

**7)** Modify `/opt/coturn/docker-compose.yml` to change all certificate parameters of the `coturn` service from this...

```yaml
command:
    - --cert=/etc/letsencrypt/live/${TURN_DOMAIN_NAME}/cert.pem
    - --pkey=/etc/letsencrypt/live/${TURN_DOMAIN_NAME}/privkey.pem
    ...
```

... to this...:

```yaml
command:
    - --cert=/opt/coturn/owncert/cert.pem
    - --pkey=/opt/coturn/owncert/privkey.pem
...
```

**8)** Give permission to your certificates files at `/opt/coturn/owncert` so it can be accessed by the `coturn` service:

```bash
chmod -R 655 /opt/coturn/owncert
```

**9)** Fill only these parameters in `/opt/coturn/.env` file:

```
TURN_DOMAIN_NAME=turn-server.example.com
TURN_STATIC_AUTH_SECRET=mysecret
```

**10)** Execute coturn:

```
docker-compose up -d
```

Check the logs to see if everything is OK:
```
docker-compose logs -f
```

You should see this log trace from `coturn` container:

```text
coturn     | 0: : <SSL_TLS_DTLS_VERSION>: Certificate file found: //opt/openvidu/owncert/cert.pem
...
coturn     | 0: : <SSL_TLS_DTLS_VERSION>: Certificate file found: //opt/openvidu/owncert/privkey.pem
...
coturn     | 0: : IPv4 <PROTOCOL> listener opened on : 0.0.0.0:443
```

Now your TURN server is ready at port 443 with SSL.

> As long as the output of the coturn service matches the above one, you can ignore some error logs that you may see. Coturn is very verbose and tries to apply some default configurations that may produce those errors.

#### Configure OpenVidu to use the new TURN server deployed:

Configure the previously defined `TURN_DOMAIN_NAME` and `TURN_STATIC_AUTH_SECRET` in OpenVidu server using this parameter at `/opt/openvidu/.env/`:

```bash
OPENVIDU_WEBRTC_ICE_SERVERS=["url=turns:<TURN_DOMAIN_NAME>:443,staticAuthSecret=<TURN_STATIC_AUTH_SECRET>"]
```

<br>

---

## Use a third-party TURN SaaS for clients behind firewalls

If you don't want to manage and provision your own server, we provide in our SDKs the possibility to configure a third-party TURN SaaS as [Xyrsys](https://xirsys.com/){:target="\_blank"} or [Twilio Turn](https://www.twilio.com/stun-turn){:target="\_blank"}. With such services you can also benefit of a **global network transversal service**. These services has its own TURN servers deployed around the world so you can reach the nearest TURN server and benefit of less latency connections.

TURN SaaS offers easy to use APIs to generate TURN endpoints and credentials. You just need to get that information from the TURN SaaS API and pass it to OpenVidu while creating [Connections](reference-docs/REST-API/#the-connection-object){:target="\_blank"}.

<div class="lang-tabs-container" markdown="1">

<div class="lang-tabs-header">
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; color: black">Java</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Node</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">cURL</button>
</div>

<div id="java" class="lang-tabs-content" markdown="1">

```java
Session session = OV.createSession();
IceServerProperties iceServerProperties = new IceServerProperties.Builder()
        .url("turn:<your_turn_endpoint>:443")
        .username("<your_username>")
        .credential("<your_credential>")
        .build();
ConnectionProperties connectionProperties = new ConnectionProperties.Builder()
        .addCustomIceServer(iceServerProperties)
        .build();
session.createConnection(connectionProperties);
```

See [JavaDoc](api/openvidu-java-client/io/openvidu/java/client/IceServerProperties.html){:target="_blank"}

</div>

<div id="node" class="lang-tabs-content" style="display:none" markdown="1">

```javascript
let session = await this.openvidu.createSession({});
let connection = await session.createConnection({
    customIceServers: [
        {
            url: "turn:<your_turn_endpoint>:443",
            username: "<your_username>",
            credential: "<your_credential>"
        }
    ]
});
```

See [TypeDoc](api/openvidu-node-client/classes/session.html#createconnection){:target="_blank"}

</div>

<div id="curl" class="lang-tabs-content" style="display:none" markdown="1">

When creating a Connection with method [POST /openvidu/api/sessions/&lt;SESSION_ID&gt;/connection](reference-docs/REST-API/#post-connection) provide parameter **`customIceServers`**

```sh
curl -X POST https://<DOMAIN_OR_PUBLIC_IP>/openvidu/api/sessions/<SESSION_ID>/connection \
     -u OPENVIDUAPP:<YOUR_SECRET> \
     -H "Content-Type: application/json" \
     --data-binary @- <<BODY
     {
       "type": "WEBRTC",
       "customIceServers": [
         {
           "url": "turn:<your_turn_endpoint>:443",
           "username": "<your_username>",
           "credential": "<your_credential>"
         }
       ]
     }
BODY
```

</div>

</div>

<br>

It is also possible to set fixed TURN credentials at OpenVidu global configuration, but please note that this is generally not recommended, as dynamic credentials associated to the lifecycle of each user is a much more secure option.

```bash
OPENVIDU_WEBRTC_ICE_SERVERS=["url=turns:<your_turn_endpoint>:443,username=<your_username>,credential=<your_credential>"]
```

<br>

<script>
function changeLangTab(event) {
  var parent = event.target.parentNode.parentNode;
  var txt = event.target.textContent || event.target.innerText;
  var txt = txt.replace(/\s/g, "-").toLowerCase();
  for (var i = 0; i < parent.children.length; i++) {
    var child = parent.children[i];
    // Change appearance of language buttons
    if (child.classList.contains("lang-tabs-header")) {
        for (var j = 0; j < child.children.length; j++) {
            var btn = child.children[j];
            if (btn.classList.contains("lang-tabs-btn")) {
                btn.style.backgroundColor = btn === event.target ? '#e8e8e8' : '#f9f9f9';
                btn.style.color = btn === event.target ? 'black' : '#777';
            }
        }
    }
    // Change visibility of language content
    if (child.classList.contains("lang-tabs-content")) {
        if (child.id === txt) {
            child.style.display = "block";
        } else {
            child.style.display = "none";
        }
    }
  }
}
</script>
