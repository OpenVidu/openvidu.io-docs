# openvidu-call

OpenVidu Call demo,<strong> built with Angular 6</strong>,  allows users to make videoconference calls with many of the capabilities integrated by OpenVidu platform. It is a frontend-only application.

OpenVidu-Call is composed by the four Angular components displayed in the image below.

<br>
<p align="center">
  <img  class="img-responsive" src="/img/demos/openvidu_call_diagram.png">
</p>

<hr>
<div class="row no-margin row-gallery">
	<div class="col-md-6">
		<a data-fancybox="gallery" href="/img/demos/openvidu_call_login.png">
			<img class="img-responsive" src="/img/demos/openvidu_call_login.png">
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
		<p>This is the main component of <strong>OpenVidu-Call</strong>. It allows you to establish a connection with your video roommates. The Video-room Component would not be able to establish this connection without the help of OpenVidu Service. This component allows the user to mute the microphone, unpublish the webcam, share the screen, open the chat and leave the session.</p>
	</div>
	<div class="col-md-6">
		<a data-fancybox="gallery" href="/img/demos/openvidu_call1.png">
			<img class="img-responsive" src="/img/demos/openvidu_call1.png">
		</a>
	</div>
</div>
<hr>
<div class="row no-margin row-gallery">
	<div class="col-md-6">
		<a data-fancybox="gallery" href="/img/demos/openvidu_call_chat2.png">
			<img class="img-responsive" src="/img/demos/openvidu_call_chat2.png">
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
		<a data-fancybox="gallery" href="/img/demos/openvidu_call5.png">
			<img class="img-responsive" src="/img/demos/openvidu_call5.png">
		</a>
	</div>
</div>

---

## Running this demo

<br>

> If you are using **Windows**, read this **[FAQ](/troubleshooting/#3-i-am-using-windows-to-run-the-tutorials-develop-my-app-anything-i-should-know)** to properly run the tutorial

> To learn **some tips** to develop with OpenVidu, check this **[FAQ](/troubleshooting#2-any-tips-to-make-easier-the-development-of-my-app-with-openvidu)**

1)  Clone the repo:

```bash
git clone https://github.com/OpenVidu/openvidu-call.git
```

2) You will need node, NPM and angular-cli to execute the app. You can install them with:

```bash
sudo apt-get update
sudo curl -sL https://deb.nodesource.com/setup_8.x | sudo bash -
sudo apt-get install -y nodejs
sudo npm install -g @angular/cli
```

3)  _openvidu-server_ and _Kurento Media Server_ must be up and running in your development machine. The easiest way is running this Docker container which wraps both of them (you will need [Docker CE](https://store.docker.com/search?type=edition&offering=community)):

```bash
docker run -p 4443:4443 --rm -e openvidu.secret=MY_SECRET openvidu/openvidu-server-kms
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
