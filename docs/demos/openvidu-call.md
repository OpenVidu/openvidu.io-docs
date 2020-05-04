# openvidu-call
<a href="https://github.com/OpenVidu/openvidu-call.git" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

OpenVidu Call is a full and safe videoconference app using OpenVidu. Its frontend is built with <strong>Angular 9</strong> and its backend in <strong>NodeJS</strong> using ExpressJS.

OpenVidu Call allows users to make videoconference calls with many of the capabilities integrated by OpenVidu platform. Videconference app required a great number of essential features (**screensharing**, **chat service**, **intelligent layout**, **speech detection**, **switch cameras**, and so on) and OpenVidu Call has them with the help of [**openvidu-browser**](https://www.npmjs.com/package/openvidu-browser){:target="_blank"}.

<!-- <br>
<p align="center">
  <img  class="img-responsive" src="img/demos/openvidu_call_diagram.png">
</p> -->

<hr>
<div class="row no-margin row-gallery">
	<div class="col-md-6">
		<a data-fancybox="gallery" href="img/demos/openvidu_call_login.png">
			<img class="img-responsive" src="img/demos/openvidu_call_login.png">
		</a>
	</div>
	<div class="col-md-6">
		<p align="center"><strong>Easy join a room</strong></p>
		<p>You can joint to room with a click. OpenVidu call by default provide us a random session name with the aim of get safer the room access. Moreover, you can share it with whomever the user wants to join the videoconference.</p>
	</div>
</div>
<hr>
<div class="row no-margin row-gallery">
	<div class="col-md-6">
		<p align="center"><strong>Setting up your session</strong></p>
		<p><strong>OpenVidu Call</strong> allows you configure your session before join to the room. You will can check and set your microphone and your webcam device, create your own avatar or to choose the default avatar and to establish your nickname.</p>
	</div>
	<div class="col-md-6">
		<a data-fancybox="gallery" href="img/demos/openvidu_call1.png">
			<img class="img-responsive" src="img/demos/openvidu_call1.png">
		</a>
	</div>
</div>
<hr>
<div class="row no-margin row-gallery">
	<div class="col-md-6">
		<a data-fancybox="gallery" href="img/demos/openvidu_call5.png">
			<img class="img-responsive" src="img/demos/openvidu_call5.png">
		</a>
	</div>
	<div class="col-md-6">
		<p align="center"><strong>Multi-party videoconference</strong></p>
		<p> With OpenVidu Call you can join into a multi-party videoconference, displayed in a nice and intelligent layout. You will be able to zoom in and zoom out and make fullscreen the video you want.    </p>
	</div>
</div>
<hr>
<div class="row no-margin row-gallery">
	<div class="col-md-6">
		<p align="center"><strong>Chatting time!</strong></p>
		<p>OpenVidu Call provides a nice chat where you will be able to exchange messages with all your videoconference mates. The chat view will be carefuly and responsively integrated in the layout.
		</p>
	</div>
	<div class="col-md-6">
		<a data-fancybox="gallery" href="img/demos/openvidu_call3.png">
			<img class="img-responsive" src="img/demos/openvidu_call3.png">
		</a>
	</div>
</div>

---

## Running this demo

You have several options to run OpenVidu Call:

#### Using Docker

 The easiest way is running this Docker container (you will need [Docker CE](https://store.docker.com/search?type=edition&offering=community){:target="_blank"}):


1) Run OpenVidu Call container
```bash
docker run -p 5000:5000 openvidu/openvidu-call
```

2) Go to [http://localhost:5000](http://localhost:5000)

#### Cloning GitHub Repository


1)  Clone the repo and move to stable brach:

```bash
git clone https://github.com/OpenVidu/openvidu-call.git
cd openvidu-call
git checkout -b v2.12.0b v2.12.0
```

2) You will need node, NPM and angular-cli to execute the app. You can install them with in linux with the following commands:

```bash
sudo apt-get update
sudo curl -sL https://deb.nodesource.com/setup_12.x | sudo bash -
sudo apt-get install -y nodejs
sudo npm install -g @angular/cli
```

3)  OpenVidu Platform service must be up and running in your development machine. The easiest way is running this Docker container which wraps both of them (you will need [Docker CE](https://store.docker.com/search?type=edition&offering=community){:target="_blank"}):

```bash
# WARNING: this container is not suitable for production deployments of OpenVidu Platform
# Visit https://docs.openvidu.io/en/stable/deployment/deploying-on-premises

docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-server-kms:2.13.0
```

4)  Install NPM dependencies of Angular app:

```
cd openvidu-call/openvidu-call-front
npm install
```

5)  Build OpenVidu Call frontend:

```
npm run build
```

6) Intall NPM dependencies of NodeJS backend:

```
cd ../openvidu-call-back
npm install
```

7) Start backend:

```
npm run start
```
8) Go to [http://localhost:5000](http://localhost:5000)

> If you are using **Windows**, read this **[FAQ](troubleshooting/#3-i-am-using-windows-to-run-the-tutorials-develop-my-app-anything-i-should-know){:target="_blank"}** to properly run the tutorial

> To learn **some tips** to develop with OpenVidu, check this **[FAQ](troubleshooting/#2-any-tips-to-make-easier-the-development-of-my-app-with-openvidu){:target="_blank"}**

#### Using the Release

**[Here](https://github.com/OpenVidu/openvidu-call/releases){:target="_blank"}** are OpenVidu Call releases.
The **openvidu-call-X.X.X.tar.gz** file contains the compiled app served in `/` and **openvidu-call-demos-X.X.X.tar.gz** file contains the compiled app served in `/openvidu-call/`.

To run OpenVidu Call with the compiled files you will need:

1) OpenVidu Platform service must be up and running in your development machine. The easiest way is running this Docker container which wraps both of them (you will need [Docker CE](https://store.docker.com/search?type=edition&offering=community){:target="_blank"}):

```bash
# WARNING: this container is not suitable for production deployments of OpenVidu Platform
# Visit https://docs.openvidu.io/en/stable/deployment/deploying-on-premises

docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-server-kms:2.13.0
```

2) Download the release:

```bash
wget https://github.com/OpenVidu/openvidu-call/releases/download/v2.13.0/openvidu-call-demos-2.13.0.tar.gz
```

3) Decompress the downloaded file:


```bash
mkdir openvidu-call
tar -xvzf openvidu-call-2.13.0.tar.gz -C openvidu-call/
cd openvidu-call
```


4) You will need **node**. You can install them with:

```bash
sudo apt-get update
sudo curl -sL https://deb.nodesource.com/setup_12.x | sudo bash -
sudo apt-get install -y nodejs
```

5) Serve the app:

```bash
node openvidu-call-server.js
```

Wait until you see on the output a line IP address.

By default, the app will be served in `localhost:5000` address. You will need go to [`https://localhost:4443/`](https://localhost:4443/){:target="_blank"} to accept the self-signed certificate. Once accepted, you will be able to test OpenVidu Call in the default IP [`localhost:5000`](http://localhost:5000){:target="_blank"}

## Extra features

Launching OpenVidu Call, you can configure the `openvidu_call_port`, `openvidu_url` and `openvidu_secret`.

#### Using docker

```bash
docker run -p 5000:your_port -e SERVER_PORT=your_port -e OPENVIDU_URL=your_openvidu_url -e OPENVIDU_SECRET=your_secret openvidu/openvidu-call:X.Y.Z
```


#### Using release artifacts

Including a file named **.env** in the root directory:

```
SERVER_PORT=<your-openvidu-call-port>
OPENVIDU_URL=<your-openvidu-server-url>
OPENVIDU_SECRET=<your-openvidu-server-secret>
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
