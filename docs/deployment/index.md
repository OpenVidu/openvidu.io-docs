<h2 id="section-title">Deploying OpenVidu</h2>
<hr>

- **[OpenVidu Editions](#openvidu-editions)**
- **[OpenVidu on AWS](#openvidu-on-aws)**
- **[OpenVidu on premises](#openvidu-on-premises)**
- **[OpenVidu for development](#openvidu-for-development)**
- **[Deploy OpenVidu based applications](#deploy-openvidu-based-applications)**

---

## OpenVidu Editions

OpenVidu is a platform that you can install on your premises or in any cloud provider. **OpenVidu is not provided as a hosted service**.

OpenVidu is provided in two editions:

- **OpenVidu Community Edition (CE)**: It has an open source Apache 2 license and is free to use. It can be installed on a linux machine. 
- **OpenVidu Pro Edition (Pro)**: Provides additional features compared with CE edition. Its pricing model is described in the [pricing page](https://openvidu.io/pricing){:target="_blank"}. You can get a license wirh 15-days free trial creating an account. Find more information about PRO edition in its [documentation section](/openvidu-pro/){:target="_blank"}.

<br>

---

## OpenVidu on AWS

OpenVidu Platform can be deployed very easily in Amazon Web Services thanks to [Cloud Formation](https://aws.amazon.com/cloudformation/){:target="_blank"}. Depending on the edition you want to deploy, instructions are different:

<div class="row" style="margin-top: 20px">
  <div class="col-md-1"></div>
  <div class="col-md-5 col-sm-6 team-member">
      <div class="effect effects wow fadeInUp">
          <div class="img">
              <div class="img-responsive img-tutorials" alt="" style="text-align: center; border: 2px solid #0088aa; padding: 15px"><h3 style="border-top: none; margin: 0; color: #0088aa; line-height: 30px"><div style="font-size: 18px; margin-bottom: 10px">Deploying</div>OpenVidu CE<br>on AWS</h3></div>
              <a href="deployment/deploying-aws" class="cbp-singlePage"><div class="overlay"></div></a>
          </div>
      </div>
  </div>
  <div class="col-md-5 col-sm-6 team-member">
      <div class="effect effects wow fadeInUp">
          <div class="img">
              <div class="img-responsive img-tutorials" alt="" style="text-align: center; border: 2px solid #0088aa; padding: 15px"><h3 style="border-top: none; margin: 0; color: #0088aa; line-height: 30px"><div style="font-size: 18px; margin-bottom: 10px">Deploying</div>OpenVidu PRO<br>on AWS</h3></div>
              <a href="openvidu-pro/deployment/aws" class="cbp-singlePage"><div class="overlay"></div></a>
          </div>
      </div>
  </div>
  <div class="col-md-1"></div>
</div>

<br>

---

## OpenVidu on premises

OpenVidu platform can be deployed in any modern linux distribution on premises or in any cloud provider. Deployment is based on docker, allowing a better administration. Depending on the edition you want to deploy, instructions are different:

<div class="row" style="margin-top: 20px">
  <div class="col-md-1"></div>
  <div class="col-md-5 col-sm-6 team-member">
      <div class="effect effects wow fadeInUp">
          <div class="img">
              <div class="img-responsive img-tutorials" alt="" style="text-align: center; border: 2px solid #0088aa; padding: 15px"><h3 style="border-top: none; margin: 0; color: #0088aa; line-height: 30px"><div style="font-size: 18px; margin-bottom: 10px">Deploying</div>OpenVidu CE<br>on premises</h3></div>
              <a href="deployment/deploying-on-premises" class="cbp-singlePage"><div class="overlay"></div></a>
          </div>
      </div>
  </div>
  <div class="col-md-5 col-sm-6 team-member">
      <div class="effect effects wow fadeInUp">
          <div class="img">
              <div class="img-responsive img-tutorials" alt="" style="text-align: center; border: 2px solid #0088aa; padding: 15px"><h3 style="border-top: none; margin: 0; color: #0088aa; line-height: 30px"><div style="font-size: 18px; margin-bottom: 10px">Deploying</div>OpenVidu PRO<br>on premises</h3></div>
              <a href="openvidu-pro/deployment/on-premises" class="cbp-singlePage"><div class="overlay"></div></a>
          </div>
      </div>
  </div>
  <div class="col-md-1"></div>
</div>

<br>

---

## OpenVidu for development

> **IMPORTANT** This deployment is not designed for production. It lacks important elements to allow proper communications between devices not connected to the same LAN.

To develop OpenVidu based applications you can execute a simple-to-use docker image that includes OpenVidu server and Kurento Media Server. This image is the recommended way to try OpenVidu and works in any operating system (Linux, Windows or Mac).

Can be executed with the following command (you will need [Docker CE](https://store.docker.com/search?type=edition&offering=community){:target="_blank"}):

```bash
docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-server-kms:2.13.0
```

And the OpenVidu platform for development will be available in [`https://localhost:4443/`](https://localhost:4443/){:target="_blank"}

<div class="warn">
  <div class="div-icon"><i class="icon ion-android-alert"></i></div>
  <div class="text">
	  If you are using <b>Docker Toolbox on Windows</b>, read this <b><a href="troubleshooting/#3-i-am-using-windows-to-run-the-tutorials-develop-my-app-anything-i-should-know" target="blank">FAQ</a></b> to properly execute OpenVidu development container and how to adapt these instructions.
  </div>
</div>

---

## Deploy OpenVidu based applications

When deploying OpenVidu platform with any procedure (except OpenVidu for development) the [OpenVidu Call](https://openvidu.io/openvidu-call/){:target="_blank"} application is deployed alongside it. It is accessible in the URL:

```console
https://DOMAIN_OR_PUBLIC_IP:HTTPS_PORT/
```

Both `DOMAIN_OR_PUBLIC_IP` and `HTTPS_PORT` can be defined as [configuration properties](reference-docs/openvidu-config/){:target="_blank"} when deploying OpenVidu.

### Disable OpenVidu Call application

The application is defined in file `docker-compose.override.yml` installed in `/opt/openvidu`. To disable OpenVidu Call application, you can delete the file `docker-compose.override.yml`.

### Configure other application

There are multiple ways to install your own OpenVidu based application in the same server as OpenVidu platform. 

#### With the same port and certificate as OpenVidu

Using the same port and certificate than OpenVidu is very useful because you don't have to worry about certificate management. 

If the application is dockerized, it can be defined in the file `docker-compose.override.yml` and the lifecycle of the application will be linked to the lifecycle of OpenVidu platform. The following requirements must be followed:
- Application http port must be binded to 5442 in the host, as this port is used by the NGINX included in OpenVidu Platform.
- You can use the environment variables `${DOMAIN_OR_PUBLIC_IP}`, `${HTTP_PORT}` and `${OPENVIDU_SECRET}` in `docker-compose.override.yml` file to configure your own application to point to OpenVidu platform.

If the application is not dockerized, just make sure the app is accessible in 5442 http port. HTTPS can not be used here as the NGINX included with OpenVidu is responsible of certificates.

Lastly, take into account that the following paths are reserved for OpenVidu platform and can not be used by application:

- `/api/`
- `/openvidu/`
- `/dashboard/`
- `/recordings/`

#### In a different port as OpenVidu

If you prefer to deploy the application in a different port, just take into account the following aspects:

- You can configure OpenVidu platform in any port with [configuration param](reference-docs/openvidu-config/){:target="_blank"} `HTTPS_PORT`, freeing default 443 if that's what you want.
- If you are using Let's Encrypt, do not change `HTTP_PORT` (by default to 80) or Let's Encrypt may not work properly. This is technically only required the first time you start OpenVidu services, when the certificate is automatically generated.
- Just publish your application in the port you want, but make sure this port is HTTPS, as secure protocol is mandatory for WebRTC.