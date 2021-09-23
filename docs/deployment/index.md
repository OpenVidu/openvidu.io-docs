<h2 id="section-title">Deploying OpenVidu</h2>
<hr>

- **[OpenVidu Editions](#openvidu-editions)**
- **[OpenVidu for production on AWS](#openvidu-for-production-on-aws)**
- **[OpenVidu for production on premises](#openvidu-for-production-on-premises)**
- **[OpenVidu for development](#openvidu-for-development)**
- **[Deploy OpenVidu based applications](#deploy-openvidu-based-applications)**

---

## OpenVidu Editions

OpenVidu is a platform that you can install on your premises or in any cloud provider. **OpenVidu is not provided as a hosted service**.

OpenVidu has different editions:

- <span style="font-family: Montserrat, sans-serif; font-weight: 700;">OpenVidu </span><div id="openvidu-pro-tag" style="pointer-events: none; display: inline-block; margin-right: 4px; background-color: #06d362; color: white; font-weight: bold; padding: 0px 5px; margin-left: 2px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">CE</div>: it has an open source Apache 2 license and is free to use.<div style="margin-bottom: 5px"></div>
- <span style="font-family: Montserrat, sans-serif; font-weight: 700;">OpenVidu </span><div id="openvidu-pro-tag" style="pointer-events: none; display: inline-block; margin-right: 4px; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin-left: 2px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</div>: provides additional features built on top of CE edition. Its pricing model is described in the [pricing page](https://openvidu.io/pricing){:target="_blank"}. You can get a license with 15-days free trial creating an account. Find more information about PRO edition in its [documentation section](openvidu-pro/){:target="_blank"}.<div style="margin-bottom: 5px"></div>
- <span style="font-family: Montserrat, sans-serif; font-weight: 700;">OpenVidu </span><div id="openvidu-pro-tag" style="pointer-events: none; display: inline-block; margin-right: 4px; background-color: #9c27b0; color: white; font-weight: bold; padding: 0px 5px; margin-left: 2px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">ENTERPRISE</div>: offers the best performance, improved media quality and better scalability for high-demand environments. Find more information about ENTERPRISE edition in its [documentation section](openvidu-enterprise/){:target="_blank"}.

<br>

---

## OpenVidu for production on AWS

OpenVidu Platform can be deployed very easily in Amazon Web Services thanks to [CloudFormation](https://aws.amazon.com/cloudformation/){:target="_blank"}. Depending on the edition you want to deploy, instructions are different:

- <a href="deployment/ce/aws" target="_blank">Deploy <span style="font-family: Montserrat, sans-serif; font-weight: 700;">OpenVidu </span><div id="openvidu-pro-tag" style="pointer-events: none; display: inline-block; margin-right: 4px; background-color: #06d362; color: white; font-weight: bold; padding: 0px 5px; margin-left: 2px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">CE</div> on AWS</a><div style="margin-bottom: 5px"></div>
- <a href="deployment/pro/aws" target="_blank">Deploy <span style="font-family: Montserrat, sans-serif; font-weight: 700;">OpenVidu </span><div id="openvidu-pro-tag" style="pointer-events: none; display: inline-block; margin-right: 4px; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin-left: 2px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</div> on AWS</a><div style="margin-bottom: 5px"></div>
- <a href="deployment/enterprise/aws" target="_blank">Deploy <span style="font-family: Montserrat, sans-serif; font-weight: 700;">OpenVidu </span><div id="openvidu-pro-tag" style="pointer-events: none; display: inline-block; margin-right: 4px; background-color: #9c27b0; color: white; font-weight: bold; padding: 0px 5px; margin-left: 2px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">ENTERPRISE</div> on AWS</a>

<br>

---

## OpenVidu for production on premises

OpenVidu platform can be deployed in any modern linux distribution on premises or in any cloud provider. Deployment is based on docker, allowing a better administration. Depending on the edition you want to deploy, instructions are different:

- <a href="deployment/ce/on-premises" target="_blank">Deploy <span style="font-family: Montserrat, sans-serif; font-weight: 700;">OpenVidu </span><div id="openvidu-pro-tag" style="pointer-events: none; display: inline-block; margin-right: 4px; background-color: #06d362; color: white; font-weight: bold; padding: 0px 5px; margin-left: 2px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">CE</div> on premises</a><div style="margin-bottom: 5px"></div>
- <a href="deployment/pro/on-premises" target="_blank">Deploy <span style="font-family: Montserrat, sans-serif; font-weight: 700;">OpenVidu </span><div id="openvidu-pro-tag" style="pointer-events: none; display: inline-block; margin-right: 4px; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin-left: 2px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</div> on premises</a><div style="margin-bottom: 5px"></div>
- <a href="deployment/enterprise/on-premises" target="_blank">Deploy <span style="font-family: Montserrat, sans-serif; font-weight: 700;">OpenVidu </span><div id="openvidu-pro-tag" style="pointer-events: none; display: inline-block; margin-right: 4px; background-color: #9c27b0; color: white; font-weight: bold; padding: 0px 5px; margin-left: 2px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">ENTERPRISE</div> on premises</a>

<br>

---

## OpenVidu for development

<div class="warn">
  <div class="div-icon"><i class="icon ion-android-alert"></i></div>
  <div class="text">
	  This deployment is <b>not designed for production</b>. It lacks important elements to allow proper communications between devices not connected to the same LAN. 
  </div>
</div>

To develop OpenVidu CE based applications you can execute a simple-to-use docker image that includes OpenVidu server and Kurento Media Server. This image is the recommended way to try OpenVidu and works in any operating system (Linux, Windows or Mac). 

Can be executed with the following command (you will need [Docker CE](https://store.docker.com/search?type=edition&offering=community){:target="_blank"}):

```bash
docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-server-kms:2.19.0
```

And the OpenVidu platform for development will be available in [`https://localhost:4443/`](https://localhost:4443/){:target="_blank"}

If you want to develop using OpenVidu PRO specific features, then you should use a production deployment.

<div class="warn">
  <div class="div-icon"><i class="icon ion-android-alert"></i></div>
  <div class="text">
	  If you are using <b>Docker Toolbox on Windows</b>, read this <b><a href="troubleshooting/#3-i-am-using-windows-to-run-the-tutorials-develop-my-app-anything-i-should-know" target="blank">FAQ</a></b> to properly execute OpenVidu development container and how to adapt these instructions.
  </div>
</div>

## Deploy OpenVidu based applications

When deploying OpenVidu platform for production the [OpenVidu Call](https://openvidu.io/openvidu-call/){:target="_blank"} application is automatically deployed.

You can remove OpenVidu Call application from the OpenVidu platform. 

You can deploy other OpenVidu based application in the server you have deployed OpenVidu or in any other server.

Visit the [Deploying OpenVidu Applications](deployment/deploying-openvidu-apps) for detailed instructions.

