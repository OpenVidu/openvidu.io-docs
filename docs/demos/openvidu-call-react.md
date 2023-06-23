# openvidu-call-react
<a href="https://github.com/OpenVidu/openvidu-call-react" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

OpenVidu Call demo,<strong> built with React</strong>,  allows users to make videoconference calls with many of the capabilities integrated by OpenVidu platform. It is a frontend-only application.

OpenVidu-Call-React is composed by the five React components displayed in the image below.

<br>
<p align="center">
  <img  class="img-responsive" src="img/demos/openvidu_call_react_diagram.png">
</p>


<hr>
<div class="row no-margin row-gallery">
	<div class="col-md-6">
		<p align="center"><strong>VideoRoom Component</strong></p>
		<p>This is the main component of <strong>OpenVidu-Call-React</strong>. It allows you to establish a connection with your video roommates. This component allows the user to mute the microphone, unpublish the webcam, share the screen, open the chat and leave the session.</p>
	</div>
	<div class="col-md-6">
		<a data-fancybox="gallery" data-type="image" class="fancybox-img" href="img/demos/openvidu_call_react1.png">
			<img class="img-responsive" data-type="image" class="fancybox-img" src="img/demos/openvidu_call_react1.png">
		</a>
	</div>
</div>
<hr>
<div class="row no-margin row-gallery">
	<div class="col-md-6">
		<a data-fancybox="gallery" data-type="image" class="fancybox-img" href="img/demos/openvidu_call_react_chat.png">
			<img class="img-responsive" src="img/demos/openvidu_call_react_chat.png">
		</a>
	</div>
	<div class="col-md-6">
		<p align="center"><strong>Chat Component</strong></p>
		<p>This component provides to Video-room Component a chatting system, integrated with the layout, that allows users to type to each other.
		</p>
	</div>
</div>
<hr>
<div class="row no-margin row-gallery">
	<div class="col-md-6">
		<p align="center"><strong>Stream Component</strong></p>
		<p> With OpenVidu Layout, this component is the responsible of displaying the video stream of each user in a nice way. On the right, we can see four streams displayed in the same videoconference.</p>
	</div>
	<div class="col-md-6">
		<a data-fancybox="gallery" data-type="image" class="fancybox-img" href="img/demos/openvidu_call_react2.png">
			<img class="img-responsive" src="img/demos/openvidu_call_react2.png">
		</a>
	</div>
</div>

---

## Running this demo


To run the tutorial you need the three components stated in [OpenVidu application architecture](developing-your-video-app/#openvidu-application-architecture): an OpenVidu deployment, your server application and your client application. In this order:

#### 1. Run OpenVidu deployment

Using [Docker Engine](https://docs.docker.com/engine/){:target="_blank"}:

```bash
# WARNING: this container is not suitable for production deployments of OpenVidu
# Visit https://docs.openvidu.io/en/stable/deployment

docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-dev:2.28.0
```

#### 2. Run your preferred server application sample

For more information visit [Application server](application-server/).

<div id="application-server-wrapper"></div>
<script src="js/load-common-template.js" data-pathToFile="server-application-samples.html" data-elementId="application-server-wrapper" data-runAnchorScript="false" data-useCurrentVersion="true"></script>

#### 3. Run the client application tutorial


You need [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm){:target="_blank"} to serve the application. Check it with the following command:

```bash
npm -v
```

Cloning the repo:

```bash
git clone https://github.com/OpenVidu/openvidu-call-react.git
```

To serve the tutorial:

```bash
cd openvidu-call-react/openvidu-call-react
npm install
npm start
```

Go to [`http://localhost:3000`](http://localhost:3000){:target="_blank"} to test the app once the server is running.

> To test the application with other devices in your network, visit this **[FAQ](troubleshooting/#3-test-applications-in-my-network-with-multiple-devices)**

## Deploying openvidu-call-react

#### 1) Build the docker image

Under the root project folder, you can see the `openvidu-call-react/docker/` directory. Here it is included all the required files yo make it possible the deployment with OpenVidu.

First of all, you will need to create the **openvidu-call-react** docker image. Under `openvidu-call-react/docker/` directory you will find the `create_image.sh` script.

This script will create the docker image with the [openvidu-basic-node](application-server/openvidu-basic-node/) as application server and the static files. So you will need to clone the `openvidu-tutorials` repository at the same level of the `openvidu-call-react` repository.

```bash
# Clone the openvidu-tutorials repository at the same level of the openvidu-call-react repository
git clone https://github.com/OpenVidu/openvidu-tutorials.git -b v2.28.0
```

Then, you can create the docker image with the following command:

```bash
./create_image.sh openvidu/openvidu-react-demo:X.Y.Z
```

This script will create an image named `openvidu/openvidu-call-react-demo:X.Y.Z`. This name will be used in the next step.

#### 2) Deploy the docker image

Time to deploy the docker image. You can follow the [Deploy OpenVidu based application with Docker](/deployment/deploying-openvidu-apps/#with-docker) guide for doing this.


<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js"></script>
<script type='text/javascript' src='js/fancybox-setup.js'></script>
