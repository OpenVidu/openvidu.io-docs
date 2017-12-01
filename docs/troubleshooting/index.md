<h2 id="section-title">Troubleshooting and FAQ</h2>
<hr>

### 1. Everything looks alright, but I cannot see any remote video

You have an app that uses OpenVidu to stream some video user-to-user, and the process looks perfectly okey. No errors on the console and all the OpenVidu events you are subscribed to are correctly triggered. So what's happening?

99% of the time this is a problem related with **OPENVIDU SERVER NOT HAVING A PUBLIC IP**. To learn more about it, you can check [this FAQ](#7-what-are-stun-and-turn-servers-and-why-do-i-need-them). The quickest solution to this problem is to deploy in Amazon our ready-to-use OpenVidu Server with [CloudFormation](/deployment/deploying-aws/#deploying-openvidu-server-on-aws-with-cloud-formation).

If you are a bit reluctant to this quick solution with Amazon CloudFormation, you can always deploy OpenVidu by yourself in Ubuntu 14.04 and 16.04. Check [Deploying OpenVidu as a native service](/deployment/deploying-ubuntu/) section to learn how to properly do it.

Besides that, these are the recommended steps to follow when videos are not received:

  - Access your OpenVidu dashboard (`https://YOUR_OPENVIDU_IP:8443`) to quickly test the video transmission.
  - Please be sure that your OpenVidu Server host meets the [network requirements](/deployment/deploying-ubuntu#server-network-requirements).

The other 1% of the time this can be an attempt of **accessing the same camera from two different browsers at the same time**. Remember that Chrome, Firefox, Opera, Safari and Edge are distinct processes which cannot generally access the same physical resource (as a webcam) at the same time on your computer. On the other hand, accessing the camera from different tabs of the same browser is tipically possible.

### 2. Any tips to make easier the development of my app with OpenVidu?

You can do some things to improve your efficiency while using OpenVidu:

<br>
##### Multiple tabs to test the video transmission
You can use multiple tabs in the same browser to test your video streams.

**WARNING**: you may have trouble for testing with tabs from different browsers the same time, as they compete for the camera access.

<br>
##### Be very aware of the browser's console
There you can find logs reporting important stuff. Error messages can help you to solve many issues.

<div class="row" style="margin-bottom: 10px">
  <div class="col-md-6 col-sm-6 col-xs-12" style="margin-top: 20px">
    <img class="img-responsive img-more-info" src="/img/docs/troubleshooting/chrome_logging.png">
  </div>
  <div class="col-md-6 col-sm-6 col-xs-12" style="margin-top: 20px">
    <img class="img-responsive img-more-info" src="/img/docs/troubleshooting/firefox_logging.png">
  </div>
  <div class="col-md-12 col-sm-12 col-xs-12" style="margin-top: 20px">
    <p style="text-align: justify; font-size: 13px">
      <em>OpenVidu Browser is developed with both <strong>Chrome</strong> (first image) and <strong>Firefox</strong> (second image) in mind in terms of logging. By default the browser's console displays OpenVidu's high-level messages (that's when the option 'Info' is enabled, as seen in the images). This means logs about OpenVidu objects being created and destroyed and logs for each triggered event (only for those you are subscribed to).</em>
    </p>
    <div class="hidden-sm hidden-xs"></div>
    <p style="text-align: justify; font-size: 13px">
      <em>Warn and Error messages are specifically reserved for unwanted situations, and you should check your code in case you spot one of them.</em>
    </p>
    <div class="hidden-sm hidden-xs"></div>
    <p style="text-align: justify; font-size: 13px">
      <em>If you enable the lowest level of logging you can see all the messages concerning the WebRTC negotiation process (generally not very interesting for an OpenVidu user).</em>
    </p>
  </div>
</div>

<br>
##### Remember the browser's cache
If you have changed your HTML, JavaScript or CSS code, refreshed the page and cannot see the changes on the browser, probably the cache is still serving the old files. To perform a hard reload of your page on the browser, press `Ctrl + Shift + R`

<br>
##### Use _Ngrok_ to share your app
Do you want to be able to publish your development app over your network or even the Internet, without really having to deploy it in a server? This can be very helpful, as you can test with different devices and browsers at the same time. To achieve this, you can use _Ngrok_. The set up is quite simple:

  - Download _Ngrok_ with this link [**<a href="https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip">LINK</a>**] and unzip it.
  - Download this _Ngrok_ configuration file (named `ngrok.yml`) from our GitHub repo **[<a href="https://raw.githubusercontent.com/OpenVidu/openvidu-tutorials/master/openvidu-js-java/docker/ngrok.yml">LINK</a>]** and place it in the same path as _Ngrok_ binary.
  - Run _Ngrok_ with this command: `./ngrok start --all -config=ngrok.yml`. You will get two public IPs (ended with `.ngrok.io`) publishing your local address `localhost:5000` and `localhost:3000`.
  - You just have to run you app at port `3000` and run OpenVidu Server locally adding this parameter:
      - When running OpenVidu Server as a Docker container: `-Dspring.profiles.active=ngrok`
      - When running OpenVidu Server as a JAR: `-e spring.profiles.active=ngrok`
  - That's it! Now you can connect to your app through the _Ngrok_ public IP and the connection to OpenVidu Server will work just fine. You have "deployed" your app on your own computer, and cross-device testing through your own network is now possible. Connecting to your app over the Internet is also possible, but the video transmission may not work (check [this FAQ](#1-everything-looks-alright-but-i-cannot-see-any-remote-video) to learn why).


### 3. I am using Windows to run the tutorials / develop my app. Anything I should know?

Yes, some little changes are needed because of the way Docker runs on Windows. In Linux/Mac, Docker containers are easily accesible through `localhost`, but in Windows you will have to use the specific IP allocated to your container (usually `192.168.99.100`). When running any tutorial or developing any application, depending if it is _Client-Side Only_ or _Client-Side + Server-Side_:

#### Client-Side Only

(Tutorials _[openvidu-hello-world](/tutorials/openvidu-hello-world/)_, _[openvidu-insecure-js](/tutorials/openvidu-insecure-js/)_, _[openvidu-insecure-angular](/tutorials/openvidu-insecure-angular/)_, _[openvidu-getaroom](/tutorials/openvidu-getaroom/)_)

When initializing your Session object, change `location.hostname` to the IP of the Docker container running openvidu-server (usually `192.168.99.100`). For example:

    OV.initSession('wss://' + location.hostname + ':8443/' + ...

in Windows is...

    OV.initSession('wss://192.168.99.100:8443/' + ...

> Also you will need to serve your apps over **https**. Browsers only accept camera usage on http when the address is _localhost_, and here it will be `192.168.99.100` or the one that Docker picks up for you. To serve over https with `http-server`, generate a self-signed certificate and run with `-S` flag on the root path of your app:
>
> _Generate a selfsigned certificate (run in  your Docker console)_
>
>  `openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -subj '/CN=www.mydom.com/O=My Company LTD./C=US' -keyout key.pem -out cert.pem`
>
> _Run with SSL flag_
>
>  `http-server -S`

#### Client-Side + Server-Side

Just need to add a new parameter when launching you openvidu-server container and your tutorial/app:

  - **openvidu/openvidu-server-kms Docker container** (See [DockerHub](https://hub.docker.com/r/openvidu/openvidu-server-kms/)): override the default value of the property `openvidu.publicurl`:

        docker run -p 8443:8443 --rm -e KMS_STUN_IP=stun.l.google.com -e KMS_STUN_PORT=19302 -e openvidu.secret=MY_SECRET openvidu/openvidu-server-kms
    
    in Windows is...

        docker run -p 8443:8443 --rm -e KMS_STUN_IP=stun.l.google.com -e KMS_STUN_PORT=19302 -e openvidu.secret=MY_SECRET -e openvidu.publicurl=https://192.168.99.100:8443/ openvidu/openvidu-server-kms

  - **Java tutorials** (tutorials _[openvidu-js-java](/tutorials/openvidu-js-java/)_, _[openvidu-mvc-java](/tutorials/openvidu-mvc-java/)_): override the default value of the property `openvidu.url`:

        mvn package exec:java

    in Windows is...

        mvn -Dopenvidu.url=https://192.168.99.100:8443/ package exec:java

    > Here we are simply changing the param `urlOpenViduServer` that our OpenVidu object from **openvidu-java-client** will receive in [its constructor](/reference-docs/openvidu-java-client/#openvidu). This change is something related to these specific applications.

  - **Node tutorials** (tutorials _[openvidu-js-node](/tutorials/openvidu-js-node/)_, _[openvidu-mvc-node](/tutorials/openvidu-mvc-node/)_): change the URL param passed on launch:

        node server.js https://localhost:8443/ MY_SECRET

    in Windows is...

        node server.js https://192.168.99.100:8443/ MY_SECRET

    > Here we are simply changing the param `urlOpenViduServer` that our OpenVidu object from **openvidu-node-client** will receive in [its constructor](/reference-docs/openvidu-node-client/#openvidu). This change is something related to these specific applications.

### 4. Why does my app need a server-side?

First of all, let's differentiate between OpenVidu server-side and your application's server-side. 

  - You will always need OpenVidu Server deployed at some place on the Internet (check the [Deployment section](/deployment/deploying-aws/) to learn how to do it in 5 minutes). For now, OpenVidu doesn't support p2p direct connections between two users, so all the traffic must flow to OpenVidu Server or from OpenVidu Server.
  - You will generally want your application to have its own server-side. Why?

Well, it is really not necessary. You can have a pure client-side application if you want. Just check any of these tutorials:<br>[openvidu-hello-world](/tutorials/openvidu-hello-world/), [openvidu-insecure-js](/tutorials/openvidu-insecure-js/), [openvidu-getaroom](/tutorials/openvidu-getaroom/)

The problem here is pretty evident: if you don't have any kind of server side to control your users, anyone can use your app. In fact, you can respectively see [here](https://github.com/OpenVidu/openvidu-tutorials/blob/f3c8b29fadf033b75200830a05da64029fed7541/openvidu-hello-world/web/app.js#L9), [here](https://github.com/OpenVidu/openvidu-tutorials/blob/f3c8b29fadf033b75200830a05da64029fed7541/openvidu-insecure-js/web/app.js#L19) and [here](https://github.com/OpenVidu/openvidu-tutorials/blob/f3c8b29fadf033b75200830a05da64029fed7541/openvidu-getaroom/web/app.js#L46) that when initializing the Session object, the SECRET is hardcoded in the JavaScript file. That means that any user with basic knowledge can get your SECRET just by looking at the source code in the browser.

  > **IMPORTANT**: Do NOT include your SECRET in your JavaScript or HTML files in a production environment!

<div class="row" style="margin-bottom: 50px">
  <div class="col-md-4 col-sm-6 col-xs-12" style="margin-top: 40px">
    <img class="img-responsive img-more-info" src="/img/docs/home/openvidu-new-architecture-client.png">
  </div>
  <div class="col-md-4 col-sm-6 col-xs-12" style="margin-top: 40px">
    <img class="img-responsive img-more-info" src="/img/docs/home/openvidu-new-architecture.png">
  </div>
  <div class="col-md-4 col-sm-12 col-xs-12" style="margin-top: 40px">
    <p style="text-align: justify; font-size: 13px">
      <em>First an OpenVidu app Client-Side Only.</em>
    </p>
    <div class="hidden-sm hidden-xs"><br></div>
    <p style="text-align: justify; font-size: 13px">
      <em>Second an OpenVidu app Client-Side + Server-Side.</em>
    </p>
    <div class="hidden-sm hidden-xs"><br></div>
    <p style="text-align: justify; font-size: 13px">
      <em>In production you will usually want the second option to avoid unwanted users.</em>
    </p>
  </div>
</div>

### 5. What are the differences related to OpenVidu between an app without a server-side and an app with a server-side?

OpenVidu works pretty much the same way, but the process you will follow for connecting to a session is a little bit different:

When you have a server-side, your server may ask OpenVidu Server for a `sessionId` and a `token`: the first one will give you the session and the second one will connect the user to it.

When you don't have a server side, the `sessionId` must be built in your JavaScript code in the browser, indicating your OpenVidu Server IP, the identifier of the session and your OpenVidu Server secret. Besides, the `token` param is now completely irrelevant.

So for initializing and connecting to a session:

  - **OpenVidu app without a server-side**

        var OPENVIDU_IP = "my.domain.com"
        var OPENVIDU_SECRET = "MY_SECRET";
        var SESSION_ID = "MY_SESSION";

        var OV = new OpenVidu();
        var session = OV.initSession("wss://" + OPENVIDU_IP + ":8443/" + SESSION_ID + "?secret=" + OPENVIDU_SECRET);

        session.connect(null, function() { ... });

  - **OpenVidu app with a server-side**

        // Return a sessionId and a token from your server...
        
        var OV = new OpenVidu();
        var session = OV.initSession(sessionId)

        session.connect(token, function() { ... });

  > To get a sessionId and a token from OpenVidu Server, you can make use of the [REST API](/reference-docs/REST-API/), [openvidu-java-client](/reference-docs/openvidu-java-client/) or [openvidu-node-client](/reference-docs/openvidu-node-client/)

### 6. The CloudFormation Stack is a nice option for Amazon, but I don't like it. I want more control

You can always deploy everything by yourself. To do so, check [Deploying OpenVidu as a native service](/deployment/deploying-ubuntu/) section. It is very important to understand all the posibilities you have available regarding to the architecture of your system: you can have everything running in the same host or split the services between two or even more machines. That's up to you.

<div id="deploy-arch-row" class="row">
  <div class="col-md-8">
    <img class="img-responsive" src="/img/docs/deployment/app-ovserver-kms-final.png">
  </div>
  <div id="deploy-arch-desc" class="col-md-4">
  <blockquote>
    <ol>
      <li>App, OpenVidu Server and KMS run in the same machine</li>
      <li>App runs in its own machine. OpenVidu Server and KMS run in the same machine</li>
      <li>App, OpenVidu Server and KMS all run in different machines</li>
    </ol>
    </blockquote>
  </div>
</div>

In this diagram [STUN/TURN server](#7-what-are-stun-and-turn-servers-and-why-do-i-need-them) is not outlined. It is another necessary service, and it can be hosted wherever you want (we recommend running it in the same host as Kurento Media Server).

### 7. What are STUN and TURN servers and why do I need them?

If the user's devices don't have a public and reachable IP, WebRTC connections cannot be established and therefore, video streams cannot be sent or received. This occurs when the users are behind NAT's and Firewalls. In brief, when they are hidden under complex networks.

In order to support these circumstances, WebRTC relies on **STUN and TURN** servers:

  - **STUN** can easily provide to the user's devices their own public IP (the IP that other devices on the Internet use to connect to it), so they can tell OpenVidu where to send the video streams. Only with a STUN server, around **86%** of the time the connection will be successful.
  - **TURN** is an extension of STUN, and covers the most extreme cases of complex networks (symmetric NATs). It acts as a gateway, passing all the media streams form one side to the other. This situation will occur with a probability of around **8%**.

For all purposes, OpenVidu Server acts as a final user, and your connections may fail if it is hosted behind a complex network. To provide a a solid service you definitely need both STUN and TURN servers. There are many public, free-to-use STUN servers ([STUN server list](https://gist.github.com/zziuni/3741933)), but because TURN always faces a much larger load when coming into play, no one offers it free of charge. The good news is that it is very easy to install a COTURN server, which offers both STUN and TURN:

  - Our ready-to-use [CloudFormation stack](/deployment/deploying-aws/#deploying-openvidu-server-on-aws-with-cloud-formation) already includes a properly configured COTURN server.
  - If you are deploying OpenVidu Server by your own, there are detailed instructions in the [Deploying OpenVidu as a native service](/deployment/deploying-ubuntu/) section, which explains how to install, configure and run COTURN in Ubuntu.

    > You can test your _COTURN_ server on this website: [Trickle ICE](https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/). To do so, remove the default Google server from the list and add your own following this format: `turn:YOUR_TURN_IP:YOUR_TURN_PORT` (add your TURN username and password below)

### 8. What does OpenVidu not integrate regarding WebRTC and Kurento yet?

As the main goal OpenVidu has is to make as simple as possible the integration of video-call capabilities in applications, it would make little sense to support all the features provided by Kurento: why would most of developers want visual recognition or augmented reality capabilities when adding video-calls to their apps?

But there's also a bunch of features supported by Kurento or WebRTC that will be part of OpenVidu as well:

  - **Video composing**: right now OpenVidu streams are always sent and received without any processing in Kurento Media Server, so every subscription to a video stream in a video-session implies its own WebRTC connection. We intend to provide the possibility of configuring video-sessions to be processed and send as only one video, composed in a grid by all the published streams.
  - **Direct p2p connections between users**: OpenVidu will offer the possibility of connecting users without having to use Kurento Media Server as central node. This can be very advantegeous for certain use-cases, as will reduce the need of infraestructure.
  - **Video recording**: OpenVidu will support multiple (grid) and single stream recording, so developers can easily access video files later.
  - **Mobile platforms**: OpenVIdu will provide clients for both Android and iOS.

### 9. Does OpenVidu support Android and iOS?

At the moment there are no OpenVidu clients for mobile platforms, but we are working on it. In the future you will have available **OpenVidu Android** and **OpenVidu iOS**, joining **OpenVidu Browser**. The main goal here is that all of them are fully compatible with one another.

### 10. Which is the current status of OpenVidu on scalability and fault tolerance?

This particular point relies on Kurento Media Server performance, as it is the media server used by OpenVidu. [TestRTC](https://testrtc.com/) published on September 13, 2017 a very interesting article describing in detail the behaviour of Kurento Media Server while holding a different number of video-sessions. [Here](https://testrtc.com/sessions-kurento-server/) is the complete article.

These are the conclusions for a machine with **8 cores and 15 GB of RAM**. The upper limit where the following scenarios guaranteed good quality of service are:

| Scenario                                 | Size                            |
| ---------------------------------------- | ------------------------------- |
| 1:1 video calls                          | 18 users in 9 parallel sessions |
| 4-way group video calls (grid composing) | 3 rooms of 4 users each         |
| 1:N broadcast                            | 1 broadcaster + 80-150 viewers  |

That said, one of the most important features OpenVidu will offer is the possibility of automated scalability and fault tolerance. We intend to provide an easy-to-use service integrated with Amazon Web Services to allow the automated launching and shutdown of servers depending on the workload of your application.

### 11. I am getting an "Error accesing the camera" and I have already granted permissions on the browser

  If you are using **Chrome**: you **cannot access the camera or microphone from a `http` URL if it is not `localhost` or `127.0.0.1`**. In a nutshell: in Chrome accessing the webcam on `http://localhost:8080` or `http://127.0.0.1:8080` is perfectly OK. But, for example, on `http://172.17.0.1:8080` it will through an error saying "_Only secure origins are allowed_". If for any reason you want to serve your app locally on a custom URL, the only solution is to serve it over `https` with a certificate. If you are making use of the web server we have strongly suggested over the documentation (`npm install -g http-server`), you can do this with the following commands on your application's root path:

  - Generate a selfsigned certificate with _openssl_

        openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -subj '/CN=www.mydom.com/O=My Company LTD./C=US' -keyout key.pem -out cert.pem

  - Run _http-server_ with SSL flag
      
        http-server -S
