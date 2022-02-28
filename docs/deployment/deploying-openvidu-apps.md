<h2 id="section-title">Deploy OpenVidu based applications</h2>
<hr>

- **[OpenVidu Call application installed by default](#openvidu-call-application-installed-by-default)**
- **[Deploy other OpenVidu based application](#deploy-other-openvidu-based-application)**

---

## OpenVidu Call application installed by default

When deploying OpenVidu platform for production the [OpenVidu Call](https://openvidu.io/openvidu-call){:target="_blank"} application is automatically deployed and it is accessible in the URL:

```console
https://DOMAIN_OR_PUBLIC_IP/
```

If you set a custom port in property `HTTPS_PORT` as defined in [configuration properties](reference-docs/openvidu-config/), the URL will be:

```console
https://DOMAIN_OR_PUBLIC_IP:HTTPS_PORT/
```

### Remove OpenVidu Call application

You can remove OpenVidu Call application very easily:

* 1) Stop OpenVidu:

```console
$ cd /opt/openvidu
$ ./openvidu stop
```

* 2) Delete the file `docker-compose.override.yml`

```console
$ rm docker-compose.override.yml
```

* 3) Start OpenVidu

```console
$ ./openvidu start
```

## Deploy other OpenVidu based application

If you want to deploy your own OpenVidu based application on the same server as you deployed OpenVidu, you can choose to deploy it in the same port and with the same SSL certificate as OpenVidu or in any other port.

Obviously, you can deploy your own application in a different server than OpenVidu platform, just configuring the OpenVidu URL an OpenVidu SECRET properly.

### With the same port and certificate as OpenVidu

Using the same port and certificate than OpenVidu is very useful because you don't have to worry about certificate management.

But as OpenVidu platform and the application are sharing the same domain, the following paths can not be used by application (they are used by OpenVidu platform):

- `/openvidu/`
- `/dashboard/` (only in OpenVidu CE)
- `/inspector/` (only in OpenVidu Pro)

You can deploy your own application dockerized or installed natively.

#### With Docker

If the application is dockerized, it can be defined in the file `/opt/openvidu/docker-compose.override.yml` and the lifecycle of the application will be linked to the lifecycle of OpenVidu platform (start, stop, etc..).

The following requirements must be followed:

- Application has to use `network_mode: host`
- Application must be server in plain http, without https.
- Http port must be 5442. This port is used by the NGINX included in OpenVidu Platform.
- OpenVidu platform URL has to be configured to `http://localhost:5443`
- OpenVidu Secret is available in the env variable ${OPENVIDU_SECRET}

Here it is the `docker-compose.override.yml` used by OpenVidu Call application. You can based on it the configuration of your own app.

```
version: '3.1'

services:
    app:
        image: openvidu/openvidu-call:2.20.0
        restart: on-failure
        network_mode: host
        environment:
            - SERVER_PORT=5442
            - OPENVIDU_URL=http://localhost:5443
            - OPENVIDU_SECRET=${OPENVIDU_SECRET}
```

#### Installed natively

Just take into account the following details:

- Application must be server in plain http, without https.
- Http port must be 5442. This port is used by the NGINX included in OpenVidu Platform.
- OpenVidu platform URL has to be configured to `http://localhost:5443`
- OpenVidu Secret has to be manually configured to the `OPENVIDU_SECRET` value you specify in the `.env` file.

You will have to control the lifecyle of your application, usually installing it as a service to be started automatically in case of restarting the server.

### In a different port as OpenVidu

If you prefer to deploy the application in a different port, just take into account the following aspects:

- You can configure OpenVidu platform in any port with [configuration param](reference-docs/openvidu-config/) `HTTPS_PORT`, freeing default 443 if that's what you want.
- If you are using Let's Encrypt in OpenVidu platform, you can not change `HTTP_PORT` (by default to 80). If you change it, Let's Encrypt won't work properly when SSL certificate is going to be renewed.
- Just publish your application in the port you want, but make sure this port is HTTPS, as secure protocol is mandatory for WebRTC applications.
- OpenVidu platform URL has to be configured to `http://localhost:5443`
- OpenVidu Secret has to be manually configured to the `OPENVIDU_SECRET` value you specify in the `.env` file.
