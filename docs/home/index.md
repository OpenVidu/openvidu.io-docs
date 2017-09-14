<h2 id="section-title">What is OpenVidu?</h2>
<hr>

OpenVidu is a platform to facilitate the addition of video calls in your web or mobile 
application, either group or one-to-one calls. In fact, any combination you come up with is easy to implement with OpenVidu.

It is based on [Kurento](http://www.kurento.org), the WebRTC platform for multimedia applications. Openvidu was forked from [KurentoRoom project](https://github.com/Kurento/kurento-room).

OpenVidu is licensed under [Apache License v2](https://choosealicense.com/licenses/apache-2.0/).

<div style="
    display: table;
    border: 1px solid #0088aa;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 25px;"><div style="display: table-cell">
    <i class="icon ion-android-alert" style="
    font-size: 100px;
    color: #0088aa;
    display: inline-block;
    padding-left: 15%;
"></i></div>
<div style="
    vertical-align: middle;
    display: table-cell;
    padding-left: 20px;
    padding-right: 20px;
    ">OpenVidu has been released under <strong>1.0.0-beta</strong> (check the <a href="https://github.com/OpenVidu/openvidu/releases" target="_blank">GitHub release</a>). This means that some bugs may appear while working to provide a stable release version as soon as possible.<br>You can make use of the <a href="https://groups.google.com/forum/#!forum/openvidu">Mailing List</a> or the <a href="https://github.com/OpenVidu/bugtracker">Issue Tracker repository</a> to warn about unknown bugs and to clear up any doubts.</div></div>

----------

What can I do with OpenVidu?
===

You can add video-call functionalities to your app, among many other things. The process is really simple: OpenVidu offers all the necessary services and tools. You just need to integrate them in your app to start enjoying its benefits: what about adding a video-call center for attending your customers face to face? Or maybe you are developing an application to hold meetings via videoconference. Or you are thinking about a teacher streaming to all his students with online lessons. The possibilities are endless.

You can check our [Demos](http://openvidu.io/demos) to get an idea of what you can do with OpenVidu. Here are some cool pictures of them:

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
  <img class="img-responsive" src="/img/docs/home/openvidu-new-architecture.png">
</p>

OpenVidu is divided into two parts: OpenVidu Browser and OpenVidu Server:

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

Running a videocall demo application
====================================
We have implemented a very basic demo application to see OpenVidu in action. To ease the installation, we have packaged it as a docker image. 

 - Please be sure that you have [docker CE installed](https://store.docker.com/search?type=edition&offering=community)
 - Run this Docker container
   
```
docker run -p 5000:5000 -p 4040:4040 -e KMS_STUN_IP=stun.l.google.com -e KMS_STUN_PORT=19302 openvidu/basic-videoconference-demo
```
   
 - Wait until you see a public URL ended with `.ngrok.io` and connect to it.  You can share this URL with anyone you want to test the app over the Internet!
 
----------

Building a simple app with OpenVidu
===================

<p align="center">
  <img class="img-responsive" src="/img/docs/home/openvidu-architecture.png">
</p>

OpenVidu has a traditional **Client - Server** architecture built on three modules that are shown in the image above. To run **openvidu-server** and **Kurento Media Server** you can execute the following container: 

```
docker run -p 8443:8443 --rm -e KMS_STUN_IP=stun.l.google.com -e KMS_STUN_PORT=19302 -e openvidu.secret=MY_SECRET openvidu/openvidu-server-kms
```
 
 
Then, you have to use the library **openvidu-browser** in your JavaScript browser application (frontend). This library is packaged in a JavaScript file. You can use the [last relase version](https://github.com/OpenVidu/openvidu/releases) or the [development version](https://github.com/OpenVidu/openvidu/tree/master/openvidu-browser/src/main/resources/static/js). Add the file in your HTML with `<script src="openvidu-browser-VERSION.js"></script>`.

With the **openvidu-browser** library you can handle all available operations straight away from your client, as creating video calls, joining users to them or publishing/unpublishing video and audio


## Sample application


Once you have up and running Kurento Media Server and openvidu-server, you just need to add a few lines of code in your frontend to make your first video call with OpenVidu. You can take a look to the simplest sample application in GitHub https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-insecure-js.

You can clone the repo and serve the app locally with your favourite tool (we recommend http-server: `sudo npm install -g http-server`)

```
git clone https://github.com/OpenVidu/openvidu-tutorials.git
cd openvidu-tutorials/openvidu-insecure-js/web
http-server
```
You can now start editing HTML, JS and CSS files. Just reload your browser to see your changes (mind the browser's cache!).

### Code description


**1)** Get an *OpenVidu* object and initialize a session with a *sessionId*. Have in mind that this is the parameter that defines which video call to connect. It must start with your openvidu-server URL and if the application doesn't have a server side, you need to include at the end the secret with which you initilized your openvidu-server (in this case, "MY_SECRET"). **WARNING: this is only for demos and developing environments. Do NOT include your secret in production. See [Securization](#securization) section to learn more.**

```javascript
var OV = new OpenVidu();
var session = OV.initSession("wss://" + location.hostname + ":8443/" + sessionId + '?secret=MY_SECRET');
```

**2)** Set the events to be listened by your session. For example, this snippet below will automatically append the new participants videos to HTML element with 'subscriber' id. Available events for the Session object are detailed in [API section](/docs/api/openvidu-browser/#session).

```javascript
session.on('streamCreated', function (event) {
    session.subscribe(event.stream, 'subscriber');
});
```

**3)** Connect to the session. For a non-secure approach, the value of *token* parameter is irrelevant. You can pass as second parameter a callback to be executed after connection is stablished. A common use-case for users that want to stream their own video is the following one: if the connection to the session has been succesful, get a Publisher object (appended to HTML element with id 'publisher') and publish it. The rest of participants will receive the stream.

```javascript
session.connect(token, function (error) {
    // If connection successful, get a publisher and publish to the session
    if (!error) {
        var publisher = OV.initPublisher('publisher', {
            audio: true,
            video: true,
            quality: 'MEDIUM' //'LOW','MEDIUM','HIGH'
        });
        session.publish(publisher);
    } else {
        console.log('Error while connecting to the session');
    }
});
```

**4)** Finally, whenever you want to leave the video call...

```javascript
session.disconnect();
```

With these few lines of code you will already have a functional video-call capability in your app. Check [Securization](#securization) section to learn how to easily make your app ready for production.

If you prefer, there's an Angular version of the sample app that uses _openvidu-browser_ npm package. Check it out [here](https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-insecure-angular).

----------

Securization
===================


## Why?


In a production environment probably you don't want unauthorized users swamping your video calls. It's not possible to control access to them with the first approach we have seen in the sections above: anyone who knows the _sessionId_ could connect to your video call, and if it turns out that the _sessionId_ doesn't belong to an existing session, a new one would be created. The time when we talked about appending your openvidu secret in your JavaScript file, it was clear that this is not an advisable approach for a production app.

In addition, a secure version also means you can choose the role each user has in your video calls (see [OpenViduRole](/docs/api/openvidu-java-client/#openvidurole) section).

Thus, a non-secure version of OpenVidu is only intended for development environments. Don't worry, adding securization is not a difficult task.

## How?


<p align="center">
  <img class="img-responsive" src="/img/docs/home/openvidu-secure-architecture.png">
</p>

In the image above you can see the main difference with the non-secure version of OpenVidu. Of course, you will need a backend, which will now have to call two HTTP REST operations in openvidu-server to get the two parameters needed in the securization process:

 - ***sessionId***: just as in the non-secure version, it identifies each specific video-call. It always starts with the URL of openvidu-server.
 - ***token***: any user joining a specific video call will need to pass a valid token as a parameter

You have three different options available for getting sessionIds and tokens from openvidu-server:

 - [REST API](/reference-docs//REST-API/)
 - [openvidu-java-client](/reference-docs/openvidu-java-client/)
 - [openvidu-node-client](/reference-docs/openvidu-node-client/)

## A sequence diagram to sum up



<p align="center">
  <img class="img-responsive" src="http://www.plantuml.com/plantuml/png/ZP9TIyCm58QlcrznY3SJjawzs8KNWqsdLCeoL0IHNMHDAc6Ob2Jx-FbcQnpHfgwtxVC-vps7cBMG5TNq2wPglw2C2Va9rrS8kOzM5AAYqW9-LniD3rf9Yt__K1MNMy4sWvLMEyCrHWYjr1xm4UQIORZWe_AcB57IQapEA9q6d3JMQKgBTLibbzq6ZGxegL39Hx52jIxvttUg4ou1Wt7eW5luoCbZDWUoc3rFNZCoNvxZduZ3txBx6O6xIPulKPgcFqDgw93vMySbXxGIGyED4KeQr2GQex27CuOx-wror-jcFw9DSxYzMpSeqVUHo8aQhy559T_1Intk1PPB5A6RWtsWsoWFfuMIaXUsvuksZefTpsU_0G00">
</p>

 1. Identify your user and listen to a request for joining a video call (represented by [LOGIN OPERATION] and [JOIN VIDEO CALL] in the diagram). This process is entirely up to you.
 2. You must get a _sessionId_: a new one if the video call is being created or an existing one for an active video call. In the first case you need to ask openvidu-server for it (as shown in the diagram), in the second case you must retrieve it from wherever you stored it when it was created (a data-base or maybe your backend itself).
 3. You also need a new valid _token_ for this session. Ask openvidu-server for it passing the _sessionId_.
 4. Finally return both parameters to your frontend, where using openvidu-browser you may initilize your session with _sessionId_ and then connect to it with _token_. Good news: **the code is exactly the same as explained before in [Code description](#code-description) section**

> Communication between _Your Back_ and _openvidu-server_ modules is outlined in the diagram, but it does not correspond to the real methods. Remember you can handle this from your backend by consuming the [REST API](/docs/api/REST-API/) or by using [openvidu-java-client](#openvidu-backend-client) / [openvidu-node-client](#openvidu-node-client)


## Running a secure videocall application
We have implemented a very basic [demo application](https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-js-java) to see the secure version of OpenVidu in action. It has a Java backend to manage the user sessions and the securization process with OpenVidu Server.

 - Please be sure that you have [docker CE installed](https://store.docker.com/search?type=edition&offering=community)
 - Run this Docker container
   
```
docker run -p 5000:5000 -p 3000:3000 -p 4040:4040 -e KMS_STUN_IP=stun.l.google.com -e KMS_STUN_PORT=19302 openvidu/basic-webinar-demo
```
 
 - Wait until you see a public URL ended with `.ngrok.io` and connect to it.  You can share this URL with anyone you want to test the app over the Internet! To try it on your own, use a standard window and an incognito window to test two users at the same time.
 


## Running a sample advanced app
Wanna try a [real sample application](https://github.com/OpenVidu/classroom-demo) that makes use of everything we have talked about? Take a look at this app. It wraps a frontend built with Angular, a backend built with Spring and a MySQL database:

 - Please be sure that you have docker-compose (`sudo apt-get install docker-compose`)
 - Download the `docker-compose.yml` file and run it:
   
```console
wget -O docker-compose.yml https://raw.githubusercontent.com/OpenVidu/classroom-demo/master/docker/docker-compose.yml
docker-compose up
```
 - Wait until you see a public URL ended with `.ngrok.io` and connect to it.  You can share this URL with anyone you want to test the app over the Internet! To try it on your own, use a standard window and an incognito window to test two users at the same time.

----------

Acknowledgments
===============
OpenVidu platform has been supported under project LERNIM (RTC-2016-4674-7) confunded by the _Ministry of Economy, Finance and Competitiveness_ of Spain, as well as by the _European Union_ FEDER, whose main goal with this funds is to promote technological development, innovation and high-quality research.

<p align="center">
  <img class="img-responsive" width="400px" src="/img/docs/home/ministerio-economia.jpg">
</p>

<p align="center">
  <img class="img-responsive" width="400px" src="/img/docs/home/european-union.png">
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