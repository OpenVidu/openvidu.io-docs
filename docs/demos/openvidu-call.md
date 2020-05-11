# openvidu-call
<a href="https://github.com/OpenVidu/openvidu-call.git" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

OpenVidu Call is a videoconference app allowing users to make videoconference calls with many of the capabilities integrated by OpenVidu platform. It brings a great number of essential features: **screensharing**, **chat service**, **intelligent layout**, **speech detection**, **switch cameras**, and so on. Visit its <a href="https://openvidu.io/openvidu-call">presentation page</a> for more information. OpenVidu Call is installed by default when you [deploy OpenVidu](deployment).

OpenVidu Call frontend is built with <strong>Angular 9</strong> and its backend is built with <strong>NodeJS</strong> using ExpressJS.

---

## Get and execute the code

1)  Clone the repo:

```bash
git clone https://github.com/OpenVidu/openvidu-call.git
cd openvidu-call
```

2) You will need node and NPM execute the app (frontend and backend). You can install them with in ubuntu with the following commands:

```bash
sudo apt-get update
sudo curl -sL https://deb.nodesource.com/setup_12.x | sudo bash -
sudo apt-get install -y nodejs
```

Plase visit <a href="https://nodejs.org/">https://nodejs.org/</a> to install it on other platforms.

3) Execute OpenVidu platform

> If you are using **Docker Toolbox on Windows**, read this **[FAQ](troubleshooting/#3-i-am-using-windows-to-run-the-tutorials-develop-my-app-anything-i-should-know){:target="_blank"}** to properly execute OpenVidu development container and how to adapt these instructions.

OpenVidu Platform must be up and running. The easiest way is running this OpenVidu development container (you will need [Docker CE](https://store.docker.com/search?type=edition&offering=community){:target="_blank"}):

```bash
# WARNING: this container is not suitable for production deployments of OpenVidu Platform
# Visit https://docs.openvidu.io/en/stable/deployment

docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-server-kms:2.13.0
```

4) Install NPM dependencies of NodeJS backend:

```
npm install --prefix openvidu-call-back
```

5) Start OpenVidu Call backend

```
npm run start --prefix openvidu-call-back
```

6) Install NPM dependencies of Angular frontend:

```
npm install --prefix openvidu-call-front
```

7) Finally, start OpenVidu Call frontend

```
cd openvidu-call-front
ng serve --open
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
$ OPENVIDU_URL=https://openvidu.server.com OPENVIDU_SECRET=PASSWORD npm run start
```

## How to build OpenVidu Call

### Docker image

Build a docker image of OpenVidu call is really easy. Under **openvidu-call** directory:

1) Go to *docker* directory and generate the docker image:

```
docker build -f prod.dockerfile -t <your-tag-name> --build-arg BRANCH_NAME=<branch-name> --build-arg BASE_HREF=<your-base-href>.
```

2) After that, you can run the docker container:

```
docker run -p 5000:<your_port> -e SERVER_PORT=<your_port> -e OPENVIDU_URL=<your_openvidu_url> -e OPENVIDU_SECRET=<your_secret> <your-tag-name>
```
3) Go to **http://localhost:your_port**

#### Configuration parameters for build OpenVidu Call with docker

| Parameter                     | Description   					       | Default value   |
| ----------------------------- | ---------------------------------------- | --------------- |
| **`BRANCH_NAME`**             | Name of the branch from will be built it | master          |
| **`BASE_HREF`**               | URL prefix of app path                   | /               |


> TODO: Put a warning about the lack of https certificate. So, this image will need a proper NGINX in front of it to be executed in a machine outside OpenVidu Platform.

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
node dist/openvidu-call-server.js
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
