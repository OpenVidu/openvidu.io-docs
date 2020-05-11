<h2 id="section-title">Deploying OpenVidu</h2>
<hr>

## OpenVidu Editions

OpenVidu is a platform that you can install on your premises or in any cloud provider. **OpenVidu is not provided as a hosted service**.

OpenVidu is provided in two editions:

- **OpenVidu Community Edition (CE)**: It has an open source Apache 2 license and is free to use. It can be installed on a linux machine. 
- **OpenVidu Pro Edition (Pro)**: Provides additional features compared with CE edition. Its pricing model is described in the [pricing page](https://openvidu.io/pricing). You can get a license wirh 15-days free trial creating an account. Find more information about PRO edition in its [documentation section](/openvidu-pro/).

## OpenVidu on AWS

OpenVidu Platform can be deployed very easily in Amazon Web Services thanks to [Cloud Formation](https://aws.amazon.com/cloudformation/). Depending on the edition you want to deploy, instructions are different:


<div class="container" style="margin-top: 30px">

  <div class="row">
    <div class="col-sm-1 col-xs-12 "></div>
    <a href="deployment/deploying-aws"><div class="dp-button col-sm-5 col-xs-12 ">
      <h4>Deploying</h4>
      <h3>OpenVidu CE<br> on AWS</h3>
    </div></a>
    <a href="openvidu-pro/deployment/aws"><div class="dp-button col-sm-5 col-xs-12 ">
      <h4>Deploying</h4>
      <h3>OpenVidu PRO<br> on AWS</h3>
    </div></a>
  </div>
</div>

## OpenVidu on premises

OpenVidu platform can be deployed in any modern linux distribution on premises or in any cloud provider. Deployment is based on docker, allowing a better administration. Depending on the edition you want to deploy, instructions are different:

<div class="container" style="margin-top: 30px">

  <div class="row">
    <div class="col-sm-1 col-xs-12 "></div>
    <a href="deployment/deploying-on-premises"><div class="dp-button col-sm-5 col-xs-12 ">
      <h4>Deploying</h4>
      <h3>OpenVidu CE<br> on premises</h3>
    </div></a>
    <a href="openvidu-pro/deployment/on-premises"><div class="dp-button col-sm-5 col-xs-12 ">
      <h4>Deploying</h4>
      <h3>OpenVidu PRO<br> on premises</h3>
    </div></a>
  </div>
</div>

## OpenVidu for development

> **IMPORTANT** This deployment is not designed for production. It lacks important elements to allow proper communications between devices not connected to the same LAN.

To develop OpenVidu based applications you can execute a simple-to-use docker image that includes OpenVidu server and Kurento Media Server. This image is the recommended way to try OpenVidu and works in any operating system (Linux, Windows or Mac).

Can be executed with the following command (you will need [Docker CE](https://store.docker.com/search?type=edition&offering=community){:target="_blank"}):

```bash
$ docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-server-kms:2.13.0
```

And the OpenVidu platform for development will be available in https://localhost:4443/

> If you are using **Docker Toolbox on Windows**, read this **[FAQ](troubleshooting/#3-i-am-using-windows-to-run-the-tutorials-develop-my-app-anything-i-should-know){:target="_blank"}** to properly execute OpenVidu development container and how to adapt these instructions.


## Deploy OpenVidu based applications

When deploying OpenVidu platform with any procedure (except OpenVidu for development) the [OpenVidu Call](https://openvidu.io/openvidu-call/){:target="_blank"} application is deployed. It is accessible in the URL:

```console
https://DOMAIN_OR_PUBLIC_IP:HTTPS_PORT/
```

### Disable OpenVidu Call application

The application is defined in file `docker-compose.override.yml` installed in `/opt/openvidu`. To disable OpenVidu Call application, you can delete the file `docker-compose.override.yml`.

### Configure other application

There are multiple ways to install your own OpenVidu based application in the same server than OpenVidu platform. 

#### With the same port and certificate as OpenVidu

Using the same port and certificate than OpenVidu is very useful because you don't have to worry about certificate management. 

If the application is dockerized, it can be defined in the file `docker-compose.override.yml` and the lifecicly of the application will be vinculated to the lifecycle of OpenVidu platform. The following requirements have to be followed:
- Application http port must be binded to 5442 in the host, as this port is used by the NGINX included in OpenVidu Platform.
- You can use the environment variables `${DOMAIN_OR_PUBLIC_IP}`, `${HTTP_PORT}` and `${OPENVIDU_SECRET}` in `docker-compose.override.yml` file to configure your own application to point to OpenVidu platform.

If the application is not dockerized, just make sure the app is accessible in 5442 http port. Https can not be used here as the NGINX included wiht OpenVidu is responsable of certificates.

Lastly, take into account that the following paths are reserved for OpenVidu platform and can not be used by application:

- `/api/`
- `/openvidu/`
- `/dashboard/`
- `/recordings/`


#### In a different port as OpenVidu

If you prefer to deploy the application in a different port, just take into account the following aspects:

- You can configure OpenVidu platform in any port with .env param `HTTPS_PORT` to allow you to deploy your app in any port. 
- If you are using Let's Encrypt, do not change `HTTP_PORT` (by default to 80) or Let's Encrypt may not work properly.
- Just publish your application in the port you want, but be sure this port is https (mandatory for WebRTC).