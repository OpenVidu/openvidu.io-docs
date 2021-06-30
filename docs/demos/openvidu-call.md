# openvidu-call
<a href="https://github.com/OpenVidu/openvidu-call.git" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

OpenVidu Call is a videoconference app allowing users to make videoconference calls with many of the capabilities integrated by OpenVidu platform. It brings a great number of essential features: **screensharing**, **chat service**, **intelligent layout**, **speech detection**, **switch cameras**, and so on. Visit its <a href="https://openvidu.io/openvidu-call">presentation page</a> for more information. OpenVidu Call is installed by default when you [deploy OpenVidu](deployment).

OpenVidu Call frontend is built with <strong>Angular 9</strong> and its backend is built with <strong>NodeJS</strong> using ExpressJS.

<p align="center">
  <img class="img-responsive" src="img/demos/openvidu-call-architecture.png">
</p>


---

## Understanding code structure

<p align="center">
  <img class="img-responsive" src="img/demos/openvidu-call-front-code.png">
</p>
<p align="center">
  <img class="img-responsive" src="img/demos/openvidu-call-back-code.png">
</p>



## Get and execute the code

1)  Clone the repo:

```bash
git clone https://github.com/OpenVidu/openvidu-call.git
cd openvidu-call
```

2) You will need node and NPM execute the app (frontend and backend). You can install them with in ubuntu with the following commands:

```bash
sudo apt-get update
sudo curl -sL https://deb.nodesource.com/setup_14.x | sudo bash -
sudo apt-get install -y nodejs
```

Plase visit <a href="https://nodejs.org/">https://nodejs.org/</a> to install it on other platforms.

3) Execute OpenVidu platform

> If you are using **Docker Toolbox on Windows**, read this **[FAQ](troubleshooting/#3-i-am-using-windows-to-run-the-tutorials-develop-my-app-anything-i-should-know){:target="_blank"}** to properly execute OpenVidu development container and how to adapt these instructions.

OpenVidu Platform must be up and running. The easiest way is running this OpenVidu development container (you will need [Docker CE](https://store.docker.com/search?type=edition&offering=community){:target="_blank"}):

```bash
# WARNING: this container is not suitable for production deployments of OpenVidu Platform
# Visit https://docs.openvidu.io/en/stable/deployment

docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-server-kms:2.17.0
```

4) Install NPM dependencies of NodeJS backend:

```
npm install --prefix openvidu-call-back
```

5) Start OpenVidu Call backend. To configure this command you can check the section below.

```
npm run start --prefix openvidu-call-back
```

6) Install NPM dependencies of Angular frontend. **Open another terminal** to run the following command:

```
npm install --prefix openvidu-call-front
```

7) Finally, start OpenVidu Call frontend

```
cd openvidu-call-front
npx ng serve --open
```

> To learn **some tips** to develop with OpenVidu, check this **[FAQ](troubleshooting/#2-any-tips-to-make-easier-the-development-of-my-app-with-openvidu){:target="_blank"}**

## Configuration parameters for OpenVidu Call

| Parameter                     | Description   					       | Default value   |
| ----------------------------- | ---------------------------------------- | --------------- |
| **`SERVER_PORT`**             | Port where http server will be listen    | 5000            |
| **`OPENVIDU_URL`**            | URL where connect to OpenVidu platform   | http://localhost:4443 |
| **`OPENVIDU_SECRET`**         | Secret for the OpenVidu platform         | MY_SECRET       |

This configuration parameters can be configured as environment variables. For example, to execute the application against an OpenVidu Platform deployed for production you should use the command:

```
$ npx cross-env OPENVIDU_URL=https://openvidu.server.com OPENVIDU_SECRET=PASSWORD nodemon src/app.ts
```

## How to build OpenVidu Call

### Docker image

<div class="warningBoxContent">
  <div style="display: table-cell; vertical-align: middle;">
      <i class="icon ion-android-alert warningIcon"></i>
  </div>
  <div class="warningBoxText">
    OpenVidu Call container is designed to be used into OpenVidu deployment. To allow use this image out of OpenVidu deployment, you have two options:
	  <ol>
		  <li>Handle the NGINX certificates with a proxy	</li>
		  <li>To edit OpenVidu Call image including the certificate</li>
	  </ol>
  </div>
</div>

Build a docker image of OpenVidu call is really easy.

1) Under **openvidu-call** directory, execute:

```
docker build -f docker/custom.dockerfile -t <your-tag-name> --build-arg BASE_HREF=<your-base-href> .
```

2) After that, you can run the docker container:

```
docker run -p <your-port>:5000 -e OPENVIDU_URL=<your-openvidu-url> -e OPENVIDU_SECRET=<your-secret> <your-tag-name>
```
3) Go to **http://localhost:your-port**

#### Configuration parameters for build OpenVidu Call with docker

| Parameter                     | Description   					       | Default value   |
| ----------------------------- | ---------------------------------------- | --------------- |
| **`BASE_HREF`**               | URL prefix of app path                   | /               |




### Packaged Node.js application

You also can build OpenVidu Call using webpack. Under **openvidu-call** directory:

1) Build OpenVidu Call frontend:

```bash
npm run build-prod BASE_HREF --prefix openvidu-call-front
```

2) Build OpenVidu Call backend:

```
cd openvidu-call-back
npm run build
```

3) You will found the app built in dist directory. You can use node to launch it:

```
cd dist/
node openvidu-call-server.js
```

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js"></script>
<script>
  $().fancybox({
    selector : '[data-fancybox="gallery"]',
    infobar : true,
    arrows : false,
    loop: true,
    protect: true,
    transitionEffect: 'slide',
    buttons : [
        'close'
    ],
    clickOutside : 'close',
    clickSlide   : 'close',
  });
</script>
