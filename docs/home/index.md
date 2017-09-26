<h2 id="section-title">What is OpenVidu?</h2>
<hr>

OpenVidu is a platform to facilitate the addition of video calls in your web or mobile 
application, either group or one-to-one calls. In fact, any combination you come up with is easy to implement with OpenVidu.

OpenVidu is licensed under [Apache License v2](https://choosealicense.com/licenses/apache-2.0/).

----------

What can I do with OpenVidu?
===

You can add video-call functionalities to your app, among many other things. The process is really simple: OpenVidu offers all the necessary services and tools. You just need to integrate them in your app to start enjoying its benefits: one-to-one calls, one-to-many calls, many-to-many calls. Decide which user can publish and which can't. Mute audio or video whenever you want.

So, what about adding a video-call center for attending your customers face to face? Or maybe you are developing an application to hold meetings via videoconference. Or you are thinking about a teacher streaming to all his students within online lessons. The possibilities are endless.

You can check our **[Demos](http://openvidu.io/demos)** to get an idea of what you can do with OpenVidu. Here are some cool pictures of them:

<div class="docs-gallery">
    <a data-fancybox="gallery-wellcome" href="/img/demos/insecure-session.png"><img class="img-responsive img-wellcome" src="/img/demos/insecure-session.png"/></a>
    <a data-fancybox="gallery-wellcome" href="/img/demos/getaroom-session-6.png"><img class="img-responsive img-wellcome" src="/img/demos/getaroom-session-6.png"/></a>
    <a data-fancybox="gallery-wellcome" href="/img/demos/getaroom-session-6-mob.png"><img class="img-responsive img-wellcome" src="/img/demos/getaroom-session-6-mob.png"/></a>
    <a data-fancybox="gallery-wellcome" href="/img/demos/openvidu-classroom-video.png"><img class="img-responsive img-wellcome" src="/img/demos/openvidu-classroom-video.png"/></a>
</div>

----------

OpenVidu Architecture
===

<p align="center" style="margin-top: 50px; margin-bottom: 50px">
  <img class="img-responsive" style="max-height: 550px;" src="/img/docs/home/openvidu-new-architecture.png">
</p>

OpenVidu is divided into two parts:

  - **OpenVidu Browser**: it is a library to use in your client side (available for JavaScript and TypeScript). It allows you to create video-calls, join users to them, send and receive video and audio, etc... All the actions available with OpenVidu are managed via OpenVidu Browser.
  - **OpenVidu Server**: it is an application that handles the server-side stuff. It receives the operations from OpenVidu Browser and do whatever is necessary to establish and manage your video-calls. You will never have to explicitly use it: just to run it and know its IP address.

----------

Get started
===

These are the recommended steps for getting started with OpenVidu:

1. The best way to get your first app working in a few minutes is following our **[OpenVidu Hello Word Tutorial](/tutorials/openvidu-hello-world/)**.

2. After that, you can try any of our **[Client-Side-Only](/tutorials/#client-side-only)** tutorials, or maybe go straight to step 3 if you think that you already handle OpenVidu reasonably well.

3. Try now any of our **[Client-Side + Server-Side](/tutorials/#client-side-server-side)** tutorials, where you can see how a complete web application works with OpenVidu. Choose your preferred framework, since all 4 applications are exactly the same regarding their look and functionality.

4. Finally you can **deploy your first app** and see it working in the real world. You can follow our tutorial, where you can deploy our Demos in your own Amazon machine in a few minutes (**[Deploying OpenVidu Demos on AWS](/deployment/deploying-demos-aws/)**). Then you can deploy your own app following these steps (**[Deploying OpenVidu Server and your app on AWS](/deployment/deploying-aws/)**).

----------

How does OpenVidu work?
===

**[WebRTC](https://webrtc.org/)** is the ultimate responsible for all media transmission at the very heart of OpenVidu. WebRTC is a modern, cross-platform framework that democratizes media transmission over the Internet. It is promoted by Google, Mozilla, Opera and others.

**[Kurento](http://www.kurento.org/)** is the WebRTC framework on which OpenVidu is built. Openvidu was forked from [KurentoRoom project](https://github.com/Kurento/kurento-room).

<div class="row no margin" style="margin-top: 2em; margin-bottom: 2em">
  <div class="col-md-6">
    <img class="img-responsive" style="max-height: 110px; margin: auto" src="/img/assets/webrtc2.png">
  </div>
  <div class="col-md-6">
    <img class="img-responsive" style="max-height: 130px; margin: auto" src="/img/assets/kurento.png">
  </div>
</div>

What are the differences between Kurento and OpenVidu?

OpenVidu wraps and hides all the low-level operations. The main goal we pursue is to provide a simple, effective, easy-to-use API so you can forget about WebRTC, ICE candidates and media server tricky stuff. We internally use Kurento to generate, connect, modify and destroy media-pipelines, but OpenVidu simplifies as far as possible the process, focusing on the use-case of video-call sessions (one-to-one, one-to-many, many-to-many, users with different roles).

**Ultimately, developers can create video-calls with just a few lines of code, all from their client-side**.

----------

Acknowledgments
===============
OpenVidu platform has been supported under project LERNIM (RTC-2016-4674-7) confunded by the _Ministry of Economy, Finance and Competitiveness_ of Spain, as well as by the _European Union_ FEDER, whose main goal with this funds is to promote technological development, innovation and high-quality research.

<p align="center">
  <img class="img-acknowledgments" width="400px" src="/img/docs/home/ministerio-economia.jpg">
  <img class="img-acknowledgments" width="400px" src="/img/docs/home/european-union.png">
</p>


<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js"></script>
<script>
  $().fancybox({
    selector : '[data-fancybox="gallery-wellcome"]',
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

<link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.css"/>
<link rel="stylesheet" type="text/css" href="/css/slick-theme.css"/>
<script type="text/javascript" src="//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js"></script>

<script>
    $('.docs-gallery').slick({
      autoplay: true,
      autoplaySpeed: 4000,
      dots: true,
      infinite: true,
      pauseOnHover: false,
      pauseOnFocus: false,
      responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 1
        }
      },
    ]
    });
</script>