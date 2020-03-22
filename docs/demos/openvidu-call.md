# openvidu-call
<a href="https://github.com/OpenVidu/openvidu-call.git" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

OpenVidu Call demo, built with <strong>Angular 8</strong>,  allows users to make videoconference calls with many of the capabilities integrated by OpenVidu platform. It is a frontend-only application.

OpenVidu-Call is composed by the six Angular components displayed in the image below.

<br>
<p align="center">
  <img  class="img-responsive" src="img/demos/openvidu_call_diagram.png">
</p>

<hr>
<div class="row no-margin row-gallery">
	<div class="col-md-6">
		<a data-fancybox="gallery" href="img/demos/openvidu_call_login.png">
			<img class="img-responsive" src="img/demos/openvidu_call_login.png">
		</a>
	</div>
	<div class="col-md-6">
		<p align="center"><strong>Login Component</strong></p>
		<p>This component allows you to set the videocall name and login in that session. That session name can be shared with whomever the user wants to join the videoconference.</p>
	</div>
</div>
<hr>
<div class="row no-margin row-gallery">
	<div class="col-md-6">
		<p align="center"><strong>Video-room Component</strong></p>
		<p>This is the main component of <strong>OpenVidu-Call</strong>. It allows you to set up the session before join to the room. You will can check and set your microphone and your webcam device, create your own avatar or to choose the default avatar and to establish the nickname.</p>
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
		<a data-fancybox="gallery" href="img/demos/openvidu_call2.png">
			<img class="img-responsive" src="img/demos/openvidu_call2.png">
		</a>
	</div>
	<div class="col-md-6">
		<p align="center"><strong>Chat Component</strong></p>
		<p>This component provides to Video-room Component a chatting system that allows users to type to each other.
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


```bash
docker run -p 4443:4443 openvidu/openvidu-call
```

#### Cloning GitHub Repository


1)  Clone the repo:

```bash
git clone https://github.com/OpenVidu/openvidu-call.git
```

2) You will need node, NPM and angular-cli to execute the app. You can install them with:

```bash
sudo apt-get update
sudo curl -sL https://deb.nodesource.com/setup_12.x | sudo bash -
sudo apt-get install -y nodejs
sudo npm install -g @angular/cli
```

3)  _openvidu-server_ and _Kurento Media Server_ must be up and running in your development machine. The easiest way is running this Docker container which wraps both of them (you will need [Docker CE](https://store.docker.com/search?type=edition&offering=community){:target="_blank"}):

```bash
docker run -p 4443:4443 --rm -e openvidu.secret=MY_SECRET openvidu/openvidu-server-kms:2.12.0
```

4)  Install NPM dependencies of Angular app:

```
cd openvidu-call/front/openvidu-call
npm install
```

5)  Launch the server:

```
ng serve --open
```

> If you are using **Windows**, read this **[FAQ](troubleshooting/#3-i-am-using-windows-to-run-the-tutorials-develop-my-app-anything-i-should-know){:target="_blank"}** to properly run the tutorial

> To learn **some tips** to develop with OpenVidu, check this **[FAQ](troubleshooting/#2-any-tips-to-make-easier-the-development-of-my-app-with-openvidu){:target="_blank"}**

#### Using the Release

**[Here](https://github.com/OpenVidu/openvidu-call/releases){:target="_blank"}** are OpenVidu Call releases.
The **openvidu-call-X.X.X.tar.gz** file contains the compiled app served in `/` and **openvidu-call-demos-X.X.X.tar.gz** file contains the compiled app served in `/openvidu-call/`.

To run OpenVidu Call with the compiled files you will need:

1) openvidu-server and Kurento Media Server must be up and running in your development machine. The easiest way is running this Docker container which wraps both of them (you will need [Docker CE](https://store.docker.com/search?type=edition&offering=community){:target="_blank"}):

```bash
docker run -p 4443:4443 --rm -e openvidu.secret=MY_SECRET openvidu/openvidu-server-kms:2.12.0
```

2) Download the release:

```bash
wget https://github.com/OpenVidu/openvidu-call/releases/download/v2.8.0/openvidu-call-demos-2.8.0.tar.gz
```

3) Decompress the downloaded file:


```
mkdir openvidu-call
tar -xvzf openvidu-call-2.8.0.tar.gz -C openvidu-call/
cd openvidu-call
```


4) You will need a HTTP server to display the app like [NGINX](https://www.nginx.com/){:target="_blank"} or [http-server](https://www.npmjs.com/package/http-server){:target="_blank"}.  We will use **http-server**:

You will need **node** and **NPM** to install http-server. You can install them with:

```bash
sudo apt-get update
sudo curl -sL https://deb.nodesource.com/setup_12.x | sudo bash -
sudo apt-get install -y nodejs
```

Install **http-server**:

```bash
npm i http-server
```

5) Serve the app:

```
http-server
```
Wait until you see on the output a line IP address. 

By default, the app will be served in `localhost:8080` address. You will need go to [`https://localhost:4443/`](https://localhost:4443/){:target="_blank"} to accept the self-signed certificate. Once accepted, you will be able to test OpenVidu Call in the default IP [`localhost:8080`](http://localhost:8080){:target="_blank"}

## Extra features

Using the OpenVidu Call release, you can set up the address where your app will be served with `http-server -a "your_address"`. Moreover, by including a **JSON** file named **ov-settings.json** in the root directory, you can configure the `openvidu_url` and `openvidu_secret`;

```json
{
  "openviduCredentials": {
    "openvidu_url": "https://0.0.0.0:4443",
    "openvidu_secret": "MY_SECRET"
  }
}
```

Not only you can establish your own **openvidu_url** and **openvidu_secret** parameters, but also you can customize the session interface adding an extra JSON object named  **openviduSettings** inside of the file. You have explained how **openviduSettings** object must be treated in detail [here](tutorials/openvidu-webcomponent/#interface-configuration){:target="_blank"}.


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
