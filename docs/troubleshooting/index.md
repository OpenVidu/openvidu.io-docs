<h2 id="section-title">Troubleshooting and FAQ</h2>
<hr>

1. [Everything looks alright, but I cannot see any remote video](#1-everything-looks-alright-but-i-cannot-see-any-remote-video)
2. [Any tips to make easier the development of my app with OpenVidu?](#2-any-tips-to-make-easier-the-development-of-my-app-with-openvidu)
3. [I am using Windows to run the tutorials / develop my app. Anything I should know?](#3-i-am-using-windows-to-run-the-tutorials-develop-my-app-anything-i-should-know)
4. [Does my app need a server-side?](#4-does-my-app-need-a-server-side)
5. [The CloudFormation Stack is a nice option for Amazon, but I don't like it. I want more control](#5-the-cloudformation-stack-is-a-nice-option-for-amazon-but-i-dont-like-it-i-want-more-control)
6. [What are STUN and TURN servers and why do I need them?](#6-what-are-stun-and-turn-servers-and-why-do-i-need-them)
7. [What does OpenVidu not integrate regarding WebRTC and Kurento yet?](#7-what-does-openvidu-not-integrate-regarding-webrtc-and-kurento-yet)
8. [What platforms are supported by OpenVidu?](#8-what-platforms-are-supported-by-openvidu)
9. [Which is the current status of OpenVidu regarding performance, scalability and fault tolerance?](#9-which-is-the-current-status-of-openvidu-regarding-performance-scalability-and-fault-tolerance)
10. [My local video is not showing up on the browser](#10-my-local-video-is-not-showing-up-on-the-browser)
11. [My Safari users with role SUBSCRIBER are not able to receive any remote video](#11-my-safari-users-with-role-subscriber-are-not-able-to-receive-any-remote-video)
12. [Videos are freezing on Safari for iOS](#12-videos-are-freezing-on-safari-for-ios)
13. [Nginx is not working](#13-nginx-is-not-working)
14. [Do I need to update Let's Encrypt certificates?](#14-do-i-need-to-update-lets-encrypt-certificates)
15. [My commercial certificate is not working, What can I do?](#15-my-commercial-certificate-is-not-working-what-can-i-do)
16. [How can I customize deployed Nginx?](#16-how-can-i-customize-deployed-nginx)
17. [Elastic Search and OpenVidu Pro Common Problems](#17-elastic-search-and-openvidu-pro-common-problems)

---

### 1. Everything looks alright, but I cannot see any remote video

You have an app that uses OpenVidu to stream some video user-to-user, and the process looks perfectly okey. No errors on the console and all the OpenVidu events you are subscribed to are correctly triggered. So what's happening?

99% of the time this is a problem related with **OPENVIDU SERVER NOT HAVING A PUBLIC IP**. To learn more about it, you can check [this FAQ](#6-what-are-stun-and-turn-servers-and-why-do-i-need-them). The quickest solution to this problem is to deploy our ready-to-use [OpenVidu Server in Amazon](deployment/deploying-aws){:target="_blank"}.

If you are a bit reluctant to this quick solution with Amazon CloudFormation, you can always deploy OpenVidu by yourself with Docker. Check [Deploying OpenVidu on premises](deployment/deploying-on-premises/){:target="_blank"} section to learn how to properly do it.

Besides that, these are the recommended steps to follow when videos are not received:

  - Access your OpenVidu dashboard (`https://YOUR_OPENVIDU_IP:4443`) to quickly test the video transmission (user: _OPENVIDUAPP_, pass: _[your private secret]_)
  - Please be sure that your OpenVidu Server host meets the [network requirements](deployment/deploying-on-premises#1-prerequisites){:target="_blank"}.

The other 1% of the time this can be an attempt of **accessing the same camera from two different browsers at the same time**. Remember that Chrome, Firefox, Opera and Safari are distinct processes which cannot generally access the same physical resource (as a webcam) at the same time on your computer. On the other hand, accessing the camera from different tabs of the same browser is tipically possible.

---

### 2. Any tips to make easier the development of my app with OpenVidu?

You can do some things to improve your efficiency while using OpenVidu:

<br>
##### Multiple tabs to test the video transmission
You can use multiple tabs in the same browser to test your video streams.

**WARNING**: you may have trouble for testing with tabs from different browsers at the same time, as they compete for the camera access.

<br>
##### Be very aware of the browser's console
There you can find logs reporting important stuff. Error messages can help you to solve many issues.

<div class="row" style="margin-bottom: 10px">
  <div class="col-md-6 col-sm-6 col-xs-12" style="margin-top: 20px">
    <img class="img-responsive img-more-info" src="img/docs/troubleshooting/chrome_logging.png">
  </div>
  <div class="col-md-6 col-sm-6 col-xs-12" style="margin-top: 20px">
    <img class="img-responsive img-more-info" src="img/docs/troubleshooting/firefox_logging.png">
  </div>
  <div class="col-md-12 col-sm-12 col-xs-12" style="margin-top: 20px">
    <p style="text-align: justify">
      OpenVidu Browser is developed with both <strong>Chrome</strong> (first image) and <strong>Firefox</strong> (second image) in mind in terms of logging. By default the browser's console displays OpenVidu's high-level messages (that's when the option 'Info' is enabled, as seen in the images). This means logs about OpenVidu objects being created and destroyed and logs for each triggered event (only for those you are subscribed to).
    </p>
    <div class="hidden-sm hidden-xs"></div>
    <p style="text-align: justify">
      Warn and Error messages are specifically reserved for unwanted situations, and you should check your code in case you spot one of them.
    </p>
    <div class="hidden-sm hidden-xs"></div>
    <p style="text-align: justify">
      If you enable the lowest level of logging you can see all the messages concerning the WebRTC negotiation process (generally not very interesting for an OpenVidu user).
    </p>
  </div>
</div>

<br>
##### Remember the browser's cache
If you have changed your HTML, JavaScript or CSS code, refreshed the page and cannot see the changes on the browser, probably the cache is still serving the old files. To perform a hard reload of your page on the browser, press `Ctrl + Shift + R`

<br>
##### Share your app through your network to test with multiple devices
Making your app accessible to any device connected to your LAN network is very useful for quickly testing your app with different devices at the same time. To achieve this, you just have to indicate OpenVidu Server to use your dev machine LAN IP address as public url. For example, let's say that your machine has assigned ip `192.168.0.107` in your network:

`docker run -p 4443:4443 -e DOMAIN_OR_PUBLIC_IP=192.168.0.107 openvidu/openvidu-server-kms:2.17.0`

Then you just have to configure your app (REST API address / OpenVidu Java Client / OpenVidu Node Client) to connect to OpenVidu through `https://192.168.0.107:4443/`. Any user connecting to your app through in your LAN network will be able to send and receive video through this OpenVidu Server.

---

### 3. I am using Windows to run the tutorials / develop my app. Anything I should know?

Depending on how you are running Docker in your Windows system you may or may not require to do some changes. If you are using the modern and recommended [Docker for Windows](https://docs.docker.com/docker-for-windows/){:target="_blank"}, everything should work fine out-of-the-box just as explained in tutorials. No changes required.

But if you are running Docker in Windows with the legacy [Docker Toolbox](https://docs.docker.com/toolbox/toolbox_install_windows/){:target="_blank"}, some little changes are needed just because you won't be able to use `localhost` as IP to connect to OpenVidu Server. You will have to use the specific IP allocated to your container. You can get it by running command `docker-machine ip default` (will output something similar to `192.168.99.100`, but the IP can vary).

First of all, you must launch the developing Docker container of OpenVidu Server ([openvidu/openvidu-server-kms](https://hub.docker.com/r/openvidu/openvidu-server-kms/){:target="_blank"}) setting parameter `DOMAIN_OR_PUBLIC_IP` to the IP allocated for Docker in your Windows machine.

What in Linux/Mac is...

```bash
docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-server-kms:2.17.0
```

...in Windows with Docker Toolbox may be...

```bash
docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET -e DOMAIN_OR_PUBLIC_IP=192.168.99.100 openvidu/openvidu-server-kms:2.17.0
```

Then, to let your applications know how to connect to OpenVidu Server:

#### Applications _Client-Side Only_

(For example _[openvidu-hello-world](tutorials/openvidu-hello-world/){:target="_blank"}_, _[openvidu-insecure-js](tutorials/openvidu-insecure-js/){:target="_blank"}_, _[openvidu-insecure-angular](tutorials/openvidu-insecure-angular/){:target="_blank"}_, _[openvidu-getaroom](demos/openvidu-getaroom/){:target="_blank"}_)

When consuming openvidu-server REST API, change `location.hostname` to the IP of the Docker container running openvidu-server (usually `192.168.99.100`). For every one of the insecure tutorials listed above, the url where to send the REST operations ...

    "https://" + location.hostname + ":4443/openvidu/api/<OPERATION>"

... in Windows is ...

    "https://192.168.99.100:4443/openvidu/api/<OPERATION>"

Change this url in every insecure tutorial right here:

- **openvidu-hello-world**: [here](https://github.com/OpenVidu/openvidu-tutorials/blob/bb9880c44aeba391de7d057b35e2cff4df65beb6/openvidu-hello-world/web/app.js#L56){:target="_blank"}
- **openvidu-insecure-js**: [here](https://github.com/OpenVidu/openvidu-tutorials/blob/bb9880c44aeba391de7d057b35e2cff4df65beb6/openvidu-insecure-js/web/app.js#L189){:target="_blank"}
- **openvidu-insecure-angular**: [here](https://github.com/OpenVidu/openvidu-tutorials/blob/bb9880c44aeba391de7d057b35e2cff4df65beb6/openvidu-insecure-angular/src/app/app.component.ts#L15){:target="_blank"}
- **openvidu-getaroom**: [here](https://github.com/OpenVidu/openvidu-tutorials/blob/bb9880c44aeba391de7d057b35e2cff4df65beb6/openvidu-getaroom/web/app.js#L269){:target="_blank"}

> Also you will need to serve your apps over **https**. Browsers only accept camera usage on http when the address is _localhost_, and here it will be `192.168.99.100` or the one that Docker picks up for you. To serve over https with `http-server`, generate a self-signed certificate and run with `-S` flag on the root path of your app:
>
> _Generate a selfsigned certificate (run in your Docker console)_
>
>  `openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -subj '//CN=www.mydom.com\O=My Company LTD.\C=US' -keyout key.pem -out cert.pem`
>
> _Run with SSL flag_
>
>  `http-server -S`

#### Applications _Client-Side + Server-Side_

(Tutorials _[openvidu-js-java](tutorials/openvidu-js-java/){:target="_blank"}_, _[openvidu-mvc-java](tutorials/openvidu-mvc-java/){:target="_blank"}_, _[openvidu-js-node](tutorials/openvidu-js-node/){:target="_blank"}_, _[openvidu-mvc-node](tutorials/openvidu-mvc-node/){:target="_blank"}_ and demo _[openvidu-call](demos/openvidu-call){:target="_blank"}_).

You must let know your app/tutorial how to initialize _openvidu-java-client_ or _openvidu-node-client_ (or where to send your REST API operations in case you are not using any of these clients). For example:

  - **Java tutorials** (tutorials _[openvidu-js-java](tutorials/openvidu-js-java/){:target="_blank"}_, _[openvidu-mvc-java](tutorials/openvidu-mvc-java/){:target="_blank"}_): override the default value of the property `openvidu.url`:

        mvn package exec:java

    in Windows is...

        mvn -Dopenvidu.url=https://192.168.99.100:4443/ package exec:java

    > With this change we are simply changing the param `urlOpenViduServer` that our OpenVidu object from **openvidu-java-client** will receive in [its constructor](api/openvidu-java-client/io/openvidu/java/client/OpenVidu.html#OpenVidu-java.lang.String-java.lang.String-){:target="_blank"}. This change is something related to these specific applications.

  - **Node tutorials** (tutorials _[openvidu-js-node](tutorials/openvidu-js-node/){:target="_blank"}_, _[openvidu-mvc-node](tutorials/openvidu-mvc-node/){:target="_blank"}_): change the URL param passed on launch:

        node server.js https://localhost:4443/ MY_SECRET

    in Windows is...

        node server.js https://192.168.99.100:4443/ MY_SECRET

    > With this change we are simply changing the param `urlOpenViduServer` that our OpenVidu object from **openvidu-node-client** will receive in [its constructor](api/openvidu-node-client/classes/openvidu.html#constructor){:target="_blank"}. This change is something related to these specific applications.

    > With this change we are simply changing the param `urlOpenViduServer` that our OpenVidu object from **openvidu-node-client** will receive in [its constructor](api/openvidu-node-client/classes/openvidu.html#constructor){:target="_blank"}. This change is something related to these specific applications.

---

### 4. Does my app need a server-side?

First of all, let's differentiate between OpenVidu server-side and your application's server-side.

  - You will always need OpenVidu Server deployed at some place on the Internet (check the [Deployment section](deployment/deploying-aws/){:target="_blank"} to learn how to do it in 5 minutes). For now, OpenVidu doesn't support p2p direct connections between two users, so all the traffic must flow to OpenVidu Server or from OpenVidu Server.
  - You will generally want your application to have its own server-side. Why?

Well, it is really not necessary. You can have a pure client-side application if you want. Just check any of these tutorials:<br>[openvidu-hello-world](tutorials/openvidu-hello-world/){:target="_blank"}, [openvidu-insecure-js](tutorials/openvidu-insecure-js/){:target="_blank"}, [openvidu-getaroom](demos/openvidu-getaroom/){:target="_blank"}

The problem here is pretty evident: if you don't have any kind of server side to control your users, anyone can use your app. In fact, you can respectively see [here](https://github.com/OpenVidu/openvidu-tutorials/blob/ff2c3b74658baf70b18ed03e3d3998ebeb011894/openvidu-hello-world/web/app.js#L46){:target="_blank"}, [here](https://github.com/OpenVidu/openvidu-tutorials/blob/ff2c3b74658baf70b18ed03e3d3998ebeb011894/openvidu-insecure-js/web/app.js#L177){:target="_blank"} and [here](https://github.com/OpenVidu/openvidu-tutorials/blob/ff2c3b74658baf70b18ed03e3d3998ebeb011894/openvidu-getaroom/web/app.js#L259){:target="_blank"} a comment warning about this matter in every insecure tutorial. Due to the lack of a server-side in these tutorials, we have no choice but to embed the REST API consumption methods in our JavaScript code, which includes hardcoding our secret in the JS client code.

> **IMPORTANT**: Do NOT include your SECRET in your JavaScript or HTML files in a production environment!

<div class="row" style="margin-bottom: 50px">
  <div class="col-md-4 col-sm-6 col-xs-12" style="margin-top: 40px">
    <img class="img-responsive img-more-info" src="img/docs/home/openvidu-new-architecture-client.png">
  </div>
  <div class="col-md-4 col-sm-6 col-xs-12" style="margin-top: 40px">
    <img class="img-responsive img-more-info" src="img/docs/home/openvidu-new-architecture.png">
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

---

### 5. The CloudFormation Stack is a nice option for Amazon, but I don't like it. I want more control

You can always easily deploy everything by yourself with Docker. To do so, check [Deploying OpenVidu on premises](deployment/deploying-on-premises/){:target="_blank"} section.

---

### 6. What are STUN and TURN servers and why do I need them?

If the user's devices don't have a public and reachable IP, WebRTC connections cannot be established and therefore, video streams cannot be sent or received. This occurs when the users are behind NAT's and Firewalls. In brief, when they are hidden under complex networks.

In order to support these circumstances, WebRTC relies on **STUN and TURN** servers:

  - **STUN** can easily provide to the user's devices their own public IP (the IP that other devices on the Internet use to connect to it), so they can tell OpenVidu where to send the video streams. Only with a STUN server, around **86%** of the time the connection will be successful.
  - **TURN** is an extension of STUN, and covers the most extreme cases of complex networks (symmetric NATs). It acts as a gateway, passing all the media streams from one side to the other. This situation will occur with a probability of around **8%**.

For all purposes, OpenVidu Server acts as a final user, and your connections may fail if it is hosted behind a complex network. To provide a a solid service you definitely need both STUN and TURN servers. There are many public, free-to-use STUN servers ([STUN server list](https://gist.github.com/zziuni/3741933){:target="_blank"}), but because TURN always faces a much larger load when coming into play, no one offers it free of charge. The good news is that it is very easy to install a COTURN server, which offers both STUN and TURN:

  - Our ready-to-use [CloudFormation stack](deployment/deploying-aws){:target="_blank"} already includes a properly configured COTURN server.
  - If you are deploying OpenVidu Server on your own, instructions in the [Deploying OpenVidu on premises](deployment/deploying-on-premises/){:target="_blank"} section already include a COTURN server.

    > You can test your _COTURN_ server on this website: [Trickle ICE](https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/){:target="_blank"}. To do so, remove the default Google server from the list and add your own following this format: `turn:YOUR_TURN_IP:YOUR_TURN_PORT` (add your TURN username and password below)

---

### 7. What does OpenVidu not integrate regarding WebRTC and Kurento yet?

As the main goal OpenVidu has is to make as simple as possible the integration of video-call capabilities in applications, it would make little sense to support all the features provided by Kurento: why would most of developers want visual recognition or augmented reality capabilities when adding video-calls to their apps?

But there's also a bunch of features supported by Kurento or WebRTC that will be part of OpenVidu as well:

  - **Video composing**: right now OpenVidu streams are always sent and received without any processing in Kurento Media Server, so every subscription to a video stream in a video-session implies its own WebRTC connection. We intend to provide the possibility of configuring video-sessions to be processed and send as only one video, composed in a grid by all the published streams (MCU architecture).
  - **Direct p2p connections between users**: OpenVidu will offer the possibility of connecting users without having to use Kurento Media Server as central node. This can be very advantegeous for certain use-cases, as will reduce the need of infraestructure.

---

### 8. What platforms are supported by OpenVidu?

OpenVidu supports a wide range of platforms:

<br>
##### Desktop browsers

- Chrome
- Firefox
- Opera
- Safari
- Microsoft Edge >= 80

<br>
##### Mobile browsers

- For Android
    - Chrome
    - Firefox
    - Microsoft Edge
    - Opera
    - Samsung Internet Browser
- For iOS
    - Safari (Safari is the only browser in iOS with WebRTC support)

> **IMPORTANT**: In iOS versions less than 13 have been found several bugs (videos and audio frozen) with WebRTC in Safari! These bugs look solved in iOS 13.

<br>
##### Mobile native applications

Both Android and iOS are supported:

- Since release **2.7.0** through **[Ionic](https://ionicframework.com/){:target="_blank"}**. You can try [openvidu-ionic](tutorials/openvidu-ionic/){:target="_blank"} tutorial and you will have an OpenVidu native mobile application compatible working in minutes.

- Since release **2.10.0** through **[React Native](https://facebook.github.io/react-native/){:target="_blank"}**. You can try [openvidu-react-native](tutorials/openvidu-react-native/){:target="_blank"} tutorial and you will have an OpenVidu native mobile application working in minutes.

<br>
##### Desktop native applications

- **Windows**, **OSX** and **Linux** are supported since release **2.10.0** through **[Electron](https://electronjs.org/){:target="_blank"}**. You can try [openvidu-electron](tutorials/openvidu-electron/){:target="_blank"} tutorial and you will have an OpenVidu native desktop application working in minutes.

---

### 9. Which is the current status of OpenVidu regarding performance, scalability and fault tolerance?

In terms of **performance**, OpenVidu load testing process is described in detail in this [Medium post](https://medium.com/@openvidu/openvidu-load-testing-a-systematic-study-of-openvidu-platform-performance-b1aa3c475ba9){:target="_blank"}. Results are the following for 7-to-7 sessions where every participant sends one audio-video stream (540x360, 30 fps) and receives 6 remote streams (same video). The table states the maximum number of entities that can be established until CPU reaches 100% use.

<div class="row" style="margin-bottom: 10px; text-align: center; text-align: -webkit-center">
  <img class="img-responsive" src="img/docs/troubleshooting/load_test_results.png">
</div>

About **scalability**, you can try [OpenVidu Pro scalability features](openvidu-pro/scalability/){:target="_blank"}. With OpenVidu Pro you can deploy an OpenVidu cluster to make your application scalable and automatically scale-in and scale-out the number of Media Nodes depending on the workload of your application.

---

### 10. My local video is not showing up on the browser

  You **cannot access the camera or microphone from an `http` URL. It will only work without SSL if the domain is `localhost` or `127.0.0.1`**. Media devices and WebRTC APIs of any browser requires a secure site to be available. In a nutshell: accessing the webcam on `http://localhost:8080` or `http://127.0.0.1:8080` is perfectly OK (at least in Chrome). But, for example, on `http://172.17.0.1:8080` you won't be able to access to them.

  This means that when deploying your app on production, you **MUST** use an SSL certificate and serve your app over `https`.

  This also means that when developing your app in local, if for any reason you want to locally serve your app on a custom URL different than localhost, the only solution is to serve it over `https` with a certificate. If you are making use of the web server we have strongly suggested over the documentation (`npm install -g http-server`), you can do this with the following commands on your application's root path:

  - Generate a selfsigned certificate with _openssl_

        openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -subj '/CN=www.mydom.com/O=My Company LTD./C=US' -keyout key.pem -out cert.pem

  - Run _http-server_ with SSL flag

        http-server -S

---

### 11. My Safari users with role `SUBSCRIBER` are not able to receive any remote video

  Safari needs a user gesture to allow videos to automatically start playing if they have audio. This applies to users with role `SUBSCRIBER`: that is, users that don't need to perform a call to [OpenVidu.initPublisher](api/openvidu-browser/classes/openvidu.html#initpublisher){:target="_blank"}. If a user access its camera or microphone, then there's no need of user gestures at all (as soon as they accept camera permissions, remote videos will automatically start playing).

  So, in this particular case developers must show a button their SUBSCRIBER users must click (any other action that counts as user-gesture is also suitable), and the action executed upon click event should include a call to `video.play()`. The actual video element is completely irrelevant. It can be hidden and with no media attached at all. For example:

```html
<!-- This can be placed anywhere in the DOM. For example, as last child of <body> element -->
<video id="hidden-video"></video>
```

```javascript
// Javascript code run upon any user gesture
var video = document.getElementById("hidden-video").play();
```

  After this JavaScript line has been executed any remote video will start playing. This process is not necessary for future subscribed videos, when there is already some audio being played in the DOM.

---

### 12. Videos are freezing on Safari for iOS

Again, Apple's browser has "special" needs when it comes to video playback. In iPhones and iPads, Safari doesn't support out of the box the playback of multiple videos at the same time if they have audio tracks. Here you have a [link](https://bugs.webkit.org/show_bug.cgi?id=176282#c4){:target="_blank"} to a bug related to this behavior.

Possible solutions to this issue? Tweaking muted property on videos to have only one playing audio at a time. Maybe using user gestures to directly play videos can help too. Other users have reported that it usually works fine if dynamically adding audio tracks to the same MediaStream object. There is not a clear solution to this problem, and depending on the web application some workarounds can succeed and some may not. On our tests we have even seen different behaviors in video playback from one execution to another, breaking the supposed consistency of the browser. It is really a matter of testing different approaches until you find a good enough solution.

Due to these problems, any other WebRTC based service we have tested usually redirected to a native application when trying to connect through iOS Safari. You can implement your native OpenVidu app for both iOS and Android with [Ionic](tutorials/openvidu-ionic/){:target="_blank"} or [React Native](tutorials/openvidu-react-native/){:target="_blank"}.

---

### 13. Nginx is not working

Sometimes OpenVidu Deployments are not working on premises because nginx container is not able to run. 
Most of this problems are related with ports not opened or other services running.

First of all, if you can't access OpenVidu after configuring the deployment to run with Let's Encrypt, you must check the nginx logs with 
the next command:

```
sudo docker-compose logs nginx
```

#### 13.1 Ngnix error while binding ports

```html
sudo docker-compose logs nginx
Attaching to openvidu_nginx_1
nginx_1            | 2020/05/01 12:37:44 [emerg] 15#15: bind() to 0.0.0.0:80 failed (98: Address already in use)
nginx_1            | nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Address already in use)
nginx_1            | 2020/05/01 12:37:44 [emerg] 15#15: bind() to 0.0.0.0:80 failed (98: Address already in use)
nginx_1            | nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Address already in use)
nginx_1            | 2020/05/01 12:37:44 [emerg] 15#15: bind() to 0.0.0.0:80 failed (98: Address already in use)
nginx_1            | nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Address already in use)
nginx_1            | 2020/05/01 12:37:44 [emerg] 15#15: bind() to 0.0.0.0:80 failed (98: Address already in use)
nginx_1            | nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Address already in use)
nginx_1            | 2020/05/01 12:37:44 [emerg] 15#15: bind() to 0.0.0.0:80 failed (98: Address already in use)
nginx_1            | nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Address already in use)
nginx_1            | 2020/05/01 12:37:44 [emerg] 15#15: still could not bind()
nginx_1            | nginx: [emerg] still could not bind()
nginx_1            | Domain name: <your-domain>
nginx_1            | Certificated: letsencrypt
nginx_1            | Letsencrypt Email: <configured-letsencrypt-email>
nginx_1            | Proxy mode: CE
nginx_1            | Demos mode: true
nginx_1            | ===Mode letsencrypt===
...
```

If you see in your logs this: `bind() to 0.0.0.0:80 failed (98: Address already in use)`, or any other errors related with binding ports, your deployment is failing because Nginx service can not use this specified port. In most of the cases this error happens because of port 80 is being used by other services running in the same machine as OpenVidu. Port 80 is used by our Nginx container for https redirection and letsencrypt. **Be sure to not run any services at ports used by OpenVidu. These ports are defined [here](deployment/deploying-on-premises/#1-prerequisites) (OpenVidu CE) and [here](openvidu-pro/deployment/on-premises/#1-prerequisites) (OpenVidu Pro).**

#### 13.2 Let's Encrypt challenges errors

```html
...
nginx_1            | Saving debug log to /var/log/letsencrypt/letsencrypt.log
nginx_1            | Plugins selected: Authenticator webroot, Installer None
nginx_1            | Obtaining a new certificate
nginx_1            | Performing the following challenges:
nginx_1            | http-01 challenge for <your-domain>
nginx_1            | Using the webroot path /var/www/certbot for all unmatched domains.
nginx_1            | Waiting for verification...
nginx_1            | Challenge failed for domain <your-domain>
nginx_1            | http-01 challenge for <your-domain>
nginx_1            | Cleaning up challenges
nginx_1            | Some challenges have failed.
nginx_1            |     - Requesting LetsEncrypt certificate...IMPORTANT NOTES:
nginx_1            |  - The following errors were reported by the server:
nginx_1            |
nginx_1            |  ...
nginx_1            |
nginx_1            |    To fix these errors, please make sure that your domain name was
nginx_1            |    entered correctly and the DNS A/AAAA record(s) for that domain
nginx_1            |    contain(s) the right IP address.
nginx_1            |
nginx_1            |
...
```

These errors can happen because a lot of reasons. Most common scenarios are:

- **DNS A/AAAA record configured is not pointing to the right IP**: This error depends a lot of your kind of network. The most common scenario is OpenVidu deployed behind a NAT which router is not mapping correctly to the local IP and ports used by the machine where the deployment was made.
- **Other services running at port 80 or 443**: If you have another service running at this port, the path `http://<your-domain>/acme-challenge>/...` will not be accessible or it will return an invalid response to Let's Encrypt.

#### 13.3 Other Nginx errors

If none of this errors is your problem, ensure that your deployment accomplish the next points:

- **Make sure to not run any services at port 80 or port 443.** Let's Encrypt will not be able to make the challenges to validate your certificate
- **Try, if possible, to not run any other service (Nginx, Apache, Tomcat) in your OpenVidu machine**.
- **Be sure that all ports documented [here](deployment/deploying-on-premises/#1-prerequisites)(OpenVidu CE) or [here](openvidu-pro/deployment/on-premises/#1-prerequisites) (OpenVidu PRO) are visible using your domain name and your public ip. Also ensure that all the documented ports are available and not used by other services.**

If none of this works, you can try to remove `/opt/openvidu/certificates` folder and restart OpenVidu with:

```
sudo ./openvidu restart
```

### 14. Do I need to update Let's Encrypt certificates?

No, it is not necessary. The Nginx container is configured to renew automatically your certificates.

### 15. My commercial certificate is not working, What can I do?

Sometimes problems related with Commercial Certificates are due because of a wrong creation of the `certificate.key` and the `certificate.cert` in `/opt/openvidu/owncert`.

Be sure that your certificates follow this format:

- certificate.key is the private key and must follow this format:
```
-----BEGIN PRIVATE KEY-----
<BASE64_PRIVATE_KEY>
-----END PRIVATE KEY-----
```

- certificate.cert are the public keys and must follow this format:
```
-----BEGIN CERTIFICATE-----
<BASE64_PUBLIC_KEY>
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
<BASE64_PUBLIC_KEY>
-----END CERTIFICATE-----
```
...

Normally official certificates have a chain of public keys in the .cert file

### 16. How can I customize deployed Nginx?

There are two ways to configure the nginx containers provided in the official deployments of OpenVidu CE and OpenVidu Pro. Before following the next ways of configure deployed nginx of openvidu you had to deploy following the following instructions:

- [Deployment CE in AWS](/deployment/deploying-aws) 
- [Deployment CE On premises](/deployment/deploying-on-premises)
- [Deployment PRO in AWS](openvidu-pro/deployment/aws)
- [Deployment PRO On premises](openvidu-pro/deployment/on-premises)

#### 16.1 Create your own virtual hosts (Server blocks)

If you want to create your own virtual host, you just need to copy your own server blocks in `/opt/openvidu/custom-nginx-vhosts`.
It is very important that your file ends with `*.conf`. For example if you want to add a server block which serves content in `https://<DOMAIN_OR_PUBLIC_IP>/web-test`, you will need to add a file in `/opt/openvidu/custom-nginx-vhosts/web-test.conf` with for example this content:

```console
server {
        listen ...
        server_name ...
        ssl ...                

        location /web-test {
                try_files $uri $uri/ =404;
        }
}
```

If everything is correctly configured, nginx will try to load your new server block in addition with all server blocks of OpenVidu.
You only need to start or restart OpenVidu after add your file in `/opt/openvidu/custom-nginx-vhosts`:

```console
sudo su
cd /opt/openvidu
./openvidu start
```
or
```console
sudo su
cd /opt/openvidu
./openvidu restart
```
#### 16.2 Modify OpenVidu Nginx configuration

You can directly modify all the configuration of OpenVidu:

**1)** First you need to start at least once OpenVidu Sever with all the properly configuration in `/opt/openvidu/.env` to run nginx properly (`DOMAIN_OR_PUBLIC_IP`, `CERTIFICATE_TYPE`, `LETSENCRYPT_EMAIL` and `OPENVIDU_SECRET`). 

**2)** When Nginx is running, let's get the generated configuration by the nginx container by executing:
```console
sudo su
cd /opt/openvidu
docker-compose exec nginx cat /etc/nginx/conf.d/default.conf > custom-nginx.conf
docker-compose exec nginx cat /etc/nginx/nginx.conf > nginx.conf
```
This will generate two files:

- `/opt/openvidu/custom-nginx.conf`: This has all the nginx configuration of OpenVidu
- `/opt/openvidu/nginx.conf`: This has the main config file of nginx.

**4)** Modify the previous generated default config in `/opt/openvidu/custom-nginx.conf` to your necessities.

**5)** You can also modify `nginx.conf`, but don't delete these lines if you want to load `custom-nginx.conf` or your own
server blocks:

```
include /etc/nginx/conf.d/*.conf;
include /etc/nginx/vhost.d/*.conf;
```

**6)** Add these volumes in nginx service in `/opt/openvidu/docker-compose.yml`:
```console
    nginx:
        ...
        volumes:
            ...
            - ./custom-nginx.conf:/custom-nginx/custom-nginx.conf
            - ./nginx.conf:/etc/nginx/nginx.conf
```

This will override default nginx configuration.

> **WARNING**: It is very important that the file is named `custom-nginx.conf`, the nginx container will load this file.

For any changes to be applied you need to start or restart OpenVidu:
```
sudo su
cd /opt/openvidu
./openvidu start
```
or
```console
sudo su
cd /opt/openvidu
./openvidu restart
```

> - **WARNING**: After applying this kind of configuration, if you change any of the .env variable used by NGINX, the configuration will not be changed and nginx could fail.
> If you need to change the `DOMAIN_OR_PUBLIC_IP` and `CERTIFICATE_TYPE` you will need to run nginx again as it was a clean OpenVidu installation, and do this process again, to have.
> a valid configuration. 
> - **WARNING**: If you use a custom nginx, upgrades to newer OpenVidu Pro versions may not work because of NGINX rule changes. 
> If you want to upgrade to a newer version and still using a custom nginx, you need to follow this guide again and adapt your
> custom nginx configuration to the new one.
<br>

#### 17. Elastic Search and OpenVidu Pro Common Problems

Exceptions may happen in OpenVidu Pro if the machine is running out of disk space or if Elasticsearch have not enough JVM heap memory configured.

We made a lot of improvements since version 2.16.0 to avoid this, so problems should not appear if you have configured in `/opt/openvidu/.env` file
a reasonable value in `OPENVIDU_PRO_ELASTICSEARCH_MAX_DAYS_DELETE`. By default the value of this property is **15** days, but if you see that the space 
of your disk is growing too fast, you may need to change this value to a smaller one. 
You can take a look into the disk space in [Monitoring OpenVidu Server Pro Node](openvidu-pro/monitoring-elastic-stack/#monitoring-openvidu-server-pro-node) dashboard
in Kibana.

> **WARNING**: To avoid disk or JVM heap problems in your OpenVidu Server Pro Node, we encourage you to configure an external Elastic Stack. Take a look into how to configure
> an external Elastic Stack [here](openvidu-pro/monitoring-elastic-stack/#configuring-an-external-elastic-stack)
<br>


Some of the exceptions that may occur are:

**Example 1**
```console
openvidu-server_1 | [ERROR] 2020-11-05 14:26:05,526 [main] org.springframework.boot.SpringApplication - Application run failed
openvidu-server_1 | org.springframework.beans.factory.BeanCreationException: Error creating bean with name ‘elasticSearchConfig’: Invocation of init method failed; nested exception is ElasticsearchStatusException[Elasticsearch exception [type=validation_exception, reason=Validation Failed: 1: this action would add [2] total shards, but this cluster currently has [999]/[1000] maximum shards open;]]
```

**Example 2**
```console
[ERROR] 2020-11-04 12:01:43,276 [main] org.springframework.boot.SpringApplication - Application run failed
org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'elasticSearchConfig': Invocation of init method failed; nested exception is ElasticsearchStatusException[Elasticsearch exception [type=cluster_block_exception, reason=index [openvidu] blocked by: [TOO_MANY_REQUESTS/12/index read-only / allow delete (api)];]]
```

Depending on how important is your Elasticsearch data, there are two options to recover from these exceptions:

---
##### Option 1: Recover OpenVidu Pro deployment by deleting Elasticsearch data

**1)** SSH into your OpenVidu Server Pro machine.

**2)** Enter as super user:

```console
sudo su
```
**3)** Stop OpenVidu: 
```console
cd /opt/openvidu/
./openvidu stop
```

**4)** Delete this directory in `/opt/openvidu/`:
```console
rm -rf elasticsearch
```

**5)** Create again the folder `elasticsearch` in `/opt/openvidu`
```console
mkdir elasticsearch
```

**6)** Change permissions to elasticsearch folder
```console
chown -R 1000:1000 elasticsearch
```

**7)** If you have 4GB or more, add this parameter in `/opt/openvidu/.env`:

```console
ES_JAVA_OPTS="-Xms2g -Xmx2g"
```

You can change it to a reasonable value if you need it depending of your machine resources.
Take a look into [Elasticsearch heap config documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/important-settings.html#heap-size-settings){:target="_blank"}

**8)** Restart openvidu with:
```console
./openvidu start
```
------
##### Option 2: Recover OpenVidu Pro deployment while preserving Elasticsearch data

This option is only possible if you have free space in your disk.

**1)** SSH into your OpenVidu Server Pro machine.

**2)** Enter as super user:

```console
sudo su
```

**3)**  Stop OpenVidu:
Stop OpenVidu: 
```console
cd /opt/openvidu/
./openvidu stop
```

**4)** Add this parameter in `/opt/openvidu/.env`:

```console 
ES_JAVA_OPTS="-Xms2g -Xmx2g"
```

You can change it to a reasonable value if you need it depending of your machine resources.
Take a look into [Elasticsearch heap config documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/important-settings.html#heap-size-settings){:target="_blank"}

**5)** Restart openvidu with:
```console
./openvidu start
```

Elasticsearch may take some minutes to start due to a lot of data saved or low memory resources.