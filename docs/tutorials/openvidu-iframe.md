# openvidu-iframe
<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-iframe" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

This is a simple demo where you can embed an OpenVidu application inside of an iframe. The embedded application will be _openvidu-hello-world_ tutorial, so it is highly recommended to complete [openvidu-hello-world](tutorials/openvidu-hello-world/) tutorial first.

<div class="row">
    <div class="pro-gallery" style="margin: 20px 0 15px 0">
        <a data-fancybox="gallery-pro1" data-type="image" class="fancybox-img" href="img/tutorials/openvidu-iframe.png">
          <img class="img-responsive" style="margin: auto; max-height: 500px" src="img/tutorials/openvidu-iframe.png"/>
        </a>
    </div>
</div>

## Running this tutorial

To run the tutorial you need the three components stated in [OpenVidu application architecture](developing-your-video-app/#openvidu-application-architecture): an OpenVidu deployment, your server application and your client application. In this order:

#### 1. Run OpenVidu deployment

Using [Docker Engine](https://docs.docker.com/engine/){:target="_blank"}:

```bash
# WARNING: this container is not suitable for production deployments of OpenVidu
# Visit https://docs.openvidu.io/en/stable/deployment

docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-dev:2.27.0
```

#### 2. Run your preferred server application sample

For more information visit [Application server](application-server/).

<div id="application-server-wrapper"></div>
<script src="js/load-common-template.js" data-pathToFile="server-application-samples.html" data-elementId="application-server-wrapper" data-runAnchorScript="false" data-useCurrentVersion="true"></script>

#### 3. Run the client application tutorial

You will need some kind of http web server installed in your development computer to serve the tutorial. If you have Node.js installed, you can use [http-server](https://github.com/indexzero/http-server){:target="_blank"}. It can be installed with:

```bash
npm install --location=global http-server
```

Run an OpenVidu tutorial to be embedded inside the iframe. We will use [openvidu-hello-world](tutorials/openvidu-hello-world/):

```bash
# Using the same repository openvidu-tutorials from step 2
http-server openvidu-tutorials/openvidu-hello-world/web
```

Now open a different terminal and run the _openvidu-iframe_ tutorial:

```bash
http-server openvidu-tutorials/openvidu-iframe/web
```

Finally go to [`http://localhost:8081`](http://localhost:8081){:target="_blank"} to test the *openvidu-iframe* application. You will see the *openvidu-hello-world* app embedded in an iframe.

> To test the application with other devices in your network, visit this **[FAQ](troubleshooting/#3-test-applications-in-my-network-with-multiple-devices)**. In this case, make sure you change `src` property of the `<iframe>` element in [index.html](https://github.com/OpenVidu/openvidu-tutorials/blob/12c21df5b0f8781bed1f1810f668555d734a3c71/openvidu-iframe/web/index.html#L39){:target="_blank"} file to this value: `src="https://X.X.X.X/hello-world"` (being `X.X.X.X` the local IP of your workstation). In this way the inner application will be properly loaded by the iframe application through the proxy.

<div class="row no-margin row-gallery">
	<div class="col-md-6">
		<a data-fancybox="gallery" data-type="image" class="fancybox-img" href="img/docs/tutorials/openvidu-iframe.png">
			<img class="img-responsive" src="img/docs/tutorials/openvidu-iframe.png">
		</a>
	</div>
	<div class="col-md-6">
		<a data-fancybox="gallery" data-type="image" class="fancybox-img" href="img/docs/tutorials/openvidu-iframe2.png">
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
<script type='text/javascript' src='js/fancybox-setup.js'></script>
