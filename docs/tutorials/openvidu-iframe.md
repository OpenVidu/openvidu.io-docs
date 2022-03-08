# openvidu-iframe
<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-iframe" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

This is a simple demo where you can embed an OpenVidu application inside of an iframe. The embedded application will be _openvidu-hello-world_ tutorial, so it is highly recommended to complete [openvidu-hello-world](tutorials/openvidu-hello-world/) tutorial first.

## Running this tutorial
<br>
<iframe style="display:block; margin: auto;" width="560" height="315" src="https://www.youtube.com/embed/_GieJZtrQHI?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<br>

1) Clone the repo:

```bash
git clone https://github.com/OpenVidu/openvidu-tutorials.git -b v2.21.0
```

2) You will need an http web server installed in your development computer to execute the tutorial. If you have _node.js_ installed, you can use [http-server](https://github.com/indexzero/http-server){:target="_blank"} to serve application files. It can be installed with:

```bash
npm install -g http-server
```

3) Run an OpenVidu tutorial (we will use [openvidu-hello-world](tutorials/openvidu-hello-world/)):

```bash
http-server openvidu-tutorials/openvidu-hello-world/web
```

4) OpenVidu Platform service must be up and running in your development machine. The easiest way is running this Docker container which wraps both of them (you will need [Docker CE](https://store.docker.com/search?type=edition&offering=community){:target="_blank"}):

```bash
# WARNING: this container is not suitable for production deployments of OpenVidu Platform
# Visit https://docs.openvidu.io/en/stable/deployment

docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-server-kms:2.21.0
```

5) Go to _[`localhost:8080`](http://localhost:8080){:target="_blank"}_ to test the _openvidu-hello-world_ app once the server is running. The first time you use the docker container, an alert message will suggest you accept the self-signed certificate of _openvidu-server_ when you first try to join a video-call.

> If you are using **Windows**, read this **[FAQ](troubleshooting/#3-i-am-using-windows-to-run-the-tutorials-develop-my-app-anything-i-should-know)** to properly run the tutorial

> To learn **some tips** to develop with OpenVidu, check this **[FAQ](troubleshooting/#2-any-tips-to-make-easier-the-development-of-my-app-with-openvidu)**

6) Open **another terminal** and run the _openvidu-iframe_ tutorial:

```bash
http-server openvidu-tutorials/openvidu-iframe/web
```

7) Go to _[`localhost:8081`](http://localhost:8081){:target="_blank"}_ to test the _openvidu-iframe_ app once the server is running. You will can see the completely funcional _openvidu-hello-world_ app embedded inside of an iframe.


<div class="row no-margin row-gallery">
	<div class="col-md-6">
		<a data-fancybox="gallery" href="img/docs/tutorials/openvidu-iframe.png">
		<img class="img-responsive" src="img/docs/tutorials/openvidu-iframe.png">
	</a>
	</div>
	<div class="col-md-6">
		<a data-fancybox="gallery" href="img/docs/tutorials/openvidu-iframe2.png">
		<img class="img-responsive" src="img/docs/tutorials/openvidu-iframe2.png">
	</a>
	</div>
</div>


## Understanding the code

First of all,  let's clarify what an `iframe` is. It is the representation of a nested browsing context, embedding another HTML page into the current one. Knowing that, the _openvidu-iframe_ application is extremely simple. It has only 2 files:

- `style.css`: some CSS classes to style _index.html_.
- `index.html`: HTML code with the iframe. This iframe can potentially hold any OpenVidu web application (_openvidu-hello-world_ in this tutorial).

Let's see how `index.html` uses the iframe:

#### Adding the iframe to index.html

This iframe will embed the application served on `http://127.0.0.1:8080` (_openvidu-hello-world_ in this tutorial).

```html
<!-- Iframe where the application served on http://127.0.0.1:8080 will be embedded -->
<iframe
  class="openvidu-iframe"
  title="OpenVidu Iframe"
  src="http://127.0.0.1:8080"
  allow="camera; microphone"
></iframe>
```

#### Allow media permission

We need to allow requests for media permissions within the iframe. Adding attribute `allow="camera; microphone"` to the element is enough.

<br>

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
