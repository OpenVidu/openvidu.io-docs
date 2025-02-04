<h2 id="section-title">Troubleshooting and FAQ</h2>
<hr>

1. [Everything looks alright, but I cannot see any remote video](#1-everything-looks-alright-but-i-cannot-see-any-remote-video)
2. [Any tips to make easier the development of my app with OpenVidu?](#2-any-tips-to-make-easier-the-development-of-my-app-with-openvidu)
3. [Test applications in my network with multiple devices](#3-test-applications-in-my-network-with-multiple-devices)
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
17. [Elastic Search and OpenVidu Pro common problems](#17-elastic-search-and-openvidu-pro-common-problems)
18. [OpenVidu does not work for clients behind restrictive firewalls](#18-openvidu-does-not-work-for-clients-behind-restrictive-firewalls)
19. [While deploying in Cloudformation (AWS), the Image ID (AMI) does not exist](#19-while-deploying-in-cloudformation-aws-the-image-id-ami-does-not-exist)
<!--19. [How to trust a self-signed certificate](#19-how-to-trust-a-self-signed-certificate)-->


---

### 1. Everything looks alright, but I cannot see any remote video

You have an app that uses OpenVidu to stream some video user-to-user, and the process looks perfectly okey. No errors on the console and all the OpenVidu events you are subscribed to are correctly triggered. So what's happening?

99% of the time this is a problem related with **OPENVIDU SERVER NOT HAVING A PUBLIC IP**. To learn more about it, you can check [this FAQ](#6-what-are-stun-and-turn-servers-and-why-do-i-need-them). The quickest solution to this problem is to deploy our ready-to-use [OpenVidu Server in Amazon](deployment/ce/aws).

If you are a bit reluctant to this quick solution with Amazon CloudFormation, you can always deploy OpenVidu by yourself with Docker. Check [Deploying OpenVidu on premises](deployment/ce/on-premises/) section to learn how to properly do it.

Besides that, these are the recommended steps to follow when videos are not received:

  - Access your OpenVidu dashboard (`https://YOUR_OPENVIDU_IP:4443`) to quickly test the video transmission (user: _OPENVIDUAPP_, pass: _[your private secret]_)
  - Please be sure that your OpenVidu Server host meets the [network requirements](deployment/ce/on-premises#1-prerequisites).

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

Making your app accessible to any device connected to your LAN network is very useful for quickly testing your app with different devices at the same time.
Check out the [next FAQ](#3-test-applications-in-my-network-with-multiple-devices) to learn how to do this with any OpenVidu tutorial.

---

### 3. Test applications in my network with multiple devices

Every tutorial available in OpenVidu documentation shares a similar **"Running this tutorial"** set of instructions (for example, [these](tutorials/openvidu-hello-world/#running-this-tutorial) are the ones for the Hello World tutorial). These instructions all explain how to launch the setup in localhost using plain HTTP. But for any other domain that is not localhost, WebRTC needs a secure connection to work, and therefore a valid SSL certificate.

To serve any application through your network and to be able to test it with different devices, we must serve all components of the OpenVidu setup through the same IP, with HTTPS and using an SSL certificate. To do so, we must slightly reconfigure the components of the basic development setup and we must add a fourth component: a proxy to route all requests. The diagram below depicts this new setup: 

<div class="row">
    <div class="pro-gallery" style="margin: 20px 0 15px 0">
        <a data-fancybox="gallery-pro1" data-type="image" class="fancybox-img" href="img/docs/troubleshooting/proxy-dev-deployment.png">
          <img class="img-responsive" style="margin: auto; max-height: 500px" src="img/docs/troubleshooting/proxy-dev-deployment.png"/>
        </a>
    </div>
</div>

#### 1. Run the OpenVidu deployment with your local IP and other configurations

Get the local IP address of your workstation:

- On Linux: `ip -4 -oneline route get 1.0.0.0 | grep -Po 'src \K\S+'`
- On MacOS: `ipconfig getifaddr "$(route -n get 1.0.0.0 | grep 'interface' | awk '{print $2}')"`
- On Windows: use `ipconfig` command on a cmd terminal. Look for the wireless LAN IPv4 address.

Stop any active OpenVidu deployment container.

```bash
docker rm -f $(docker ps -a | grep openvidu-dev | awk '{print $1}')
```

Run the OpenVidu deployment container with extra configuration, which includes configuration properties `DOMAIN_OR_PUBLIC_IP`, `SERVER_PORT`, `HTTPS_PORT` and `FORCE_PLAIN_HTTP`. Make sure to replace `X.X.X.X` with the local IP of your workstation.

```
# Run OpenVidu deployment container with new env variable
# WARNING: this container is not suitable for production deployments of OpenVidu
# Visit https://docs.openvidu.io/en/stable/deployment
docker run -p 4443:4443 --rm \
  -e OPENVIDU_SECRET=MY_SECRET \
  -e DOMAIN_OR_PUBLIC_IP=X.X.X.X \
  -e SERVER_PORT=4443 \
  -e HTTPS_PORT=443 \
  -e FORCE_PLAIN_HTTP=false \
openvidu/openvidu-dev:2.31.0
```

#### 2. Run your preferred server application sample

If you have no server application sample running in your workstation yet, choose your favorite one and run it as explained below. For more information visit [Application server](application-server/).

<div id="application-server-wrapper"></div>
<script src="js/load-common-template.js" data-pathToFile="server-application-samples.html" data-elementId="application-server-wrapper" data-runAnchorScript="false" data-useCurrentVersion="true"></script>

#### 3. Run the client application tutorial, changing the `APPLICATION_SERVER_URL`

It is necessary to change the URL the client application will use to communicate with the server application.

If this was the original line:

```javascript
var APPLICATION_SERVER_URL = "http://localhost:5000/";
```

Now it should be:

```javascript
var APPLICATION_SERVER_URL = "https://X.X.X.X/";
```

Being `X.X.X.X` the local IP of your workstation. That is the same IP used in step 1 on property `DOMAIN_OR_PUBLIC_IP=X.X.X.X`. Be careful and make sure to change the **protocol from `http` to `https`**!

Then run the client application as stated in its tutorial documentation.

#### 4. Run a proxy to manage the SSL certificate

The proxy will route all requests of the client application using the same IP address, port and SSL certificate. It decides where to route each request based on the path. To do so we use the official NGINX docker container and a `nginx.conf` file specific for each tutorial.

The command below launches the NGINX contanier. It provides the configuration file specific for each tutorial, and it also indicates the location of the SSL certificates. Make sure to run this command at the **root path of the tutorial**.

```bash
# At the root path of the tutorial
# For example: /home/user/openvidu-tutorials/openvidu-hello-world
docker run --rm -p 443:443 \
  --add-host=host.docker.internal:host-gateway \
  -v $PWD/nginx.conf:/etc/nginx/nginx.conf:ro \
  -v $PWD/../certs:/etc/nginx/certs:ro \
nginx
```

You are ready to test the application with any device connected to your network. Connect to **`https://X.X.X.X/`** to see the application's landing page. First time you will have to accept the self-signed certificate.

#### _EXTRA_. Only if you are testing native applications in real mobile devices

To test mobile apps in real Android/iOS devices, you will need to create your own development SSL certificate and install it in your mobile device. This affects the following tutorials: [openvidu-ionic](tutorials/openvidu-ionic/), [openvidu-react-native](tutorials/openvidu-react-native/), [openvidu-android](tutorials/openvidu-android/), [openvidu-ios](tutorials/openvidu-ios/)

1. Use [`mkcert`](https://github.com/FiloSottile/mkcert#installation){:target="_blank"} to create your own certificate using the local IP address of your workstation. Make sure to modify `X.X.X.X` for the actual IP.

        CAROOT="$PWD" mkcert -cert-file cert.pem -key-file key.pem "X.X.X.X"

2. Replace the content of folder `openvidu-tutorials/certs` with the new certificate files.

3. Install the new certificate in your mobile device. This varies from Android to iOS and can be a different process for different devices. But in general terms it will consist of copying `rootCA.pem` file to your device and install it from the security settings section, inside an option similar to "Install CA certificate".

4. Restart the nginx proxy container launched at [step 4](#4-run-a-proxy-to-manage-the-ssl-certificate) so the new SSL certificates under folder `openvidu-tutorials/certs` are used:

        docker restart $(docker ps -a | grep nginx | awk '{print $1}')

At this point the certificate valid for your local IP address will be properly installed in your mobile device, and will be in use by the nginx proxy.
The mobile app should be able to connect to your local OpenVidu deployment without a problem. Remember that you will have to repeat these extra steps if the local IP address of your workstation changes.

<br>

---

### 4. Does my app need a server-side?

Yes, any OpenVidu application needs a client-side and a server-side. It should follow the following general architecture:

<div class="row">
    <div class="pro-gallery" style="margin: 20px 0">
        <a data-fancybox="gallery" data-type="image" href="img/docs/home/openvidu-app-architecture.png" class="fancybox-img"><img class="img-responsive" style="margin: auto; max-height: 400px" src="img/docs/home/openvidu-app-architecture.png"/></a>
    </div>
</div>

You can learn more about the development of an OpenVidu application at [Developing your video app](developing-your-video-app/).

---

### 5. The CloudFormation Stack is a nice option for Amazon, but I don't like it. I want more control

You can always easily deploy everything by yourself with Docker. To do so, check [Deploying OpenVidu on premises](deployment/ce/on-premises/) section.

---

### 6. What are STUN and TURN servers and why do I need them?

If the user's devices don't have a public and reachable IP, WebRTC connections cannot be established and therefore, video streams cannot be sent or received. This occurs when the users are behind NAT's and Firewalls. In brief, when they are hidden under complex networks.

In order to support these circumstances, WebRTC relies on **STUN and TURN** servers:

  - **STUN** can easily provide to the user's devices their own public IP (the IP that other devices on the Internet use to connect to it), so they can tell OpenVidu where to send the video streams. Only with a STUN server, around **86%** of the time the connection will be successful.
  - **TURN** is an extension of STUN, and covers the most extreme cases of complex networks (symmetric NATs). It acts as a gateway, passing all the media streams from one side to the other. This situation will occur with a probability of around **8%**.

For all purposes, OpenVidu Server acts as a final user, and your connections may fail if it is hosted behind a complex network. To provide a a solid service you definitely need both STUN and TURN servers. There are many public, free-to-use STUN servers ([STUN server list](https://gist.github.com/zziuni/3741933){:target="_blank"}), but because TURN always faces a much larger load when coming into play, no one offers it free of charge. The good news is that OpenVidu offers a STUN/TURN service at port 3478 by default in all of its deployments.

For some cases this default Coturn deployed at OpenVidu is not enough for user behind too restrictive firewalls. For such cases you can take a look to this section: [Allow users behind firewalls](deployment/allow-users-behind-firewalls/)

  > You can test your _COTURN_ server on this website: [Trickle ICE](https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/){:target="_blank"}. To do so, remove the default Google server from the list and add your own following this format: `turn:YOUR_TURN_IP:YOUR_TURN_PORT` (add your TURN username and password below)

---

### 7. What does OpenVidu not integrate regarding WebRTC and Kurento yet?

As the main goal OpenVidu has is to make as simple as possible the integration of video-call capabilities in applications, it would make little sense to support all the features provided by Kurento: why would most of developers want visual recognition or augmented reality capabilities when adding video-calls to their apps?

But there's also a bunch of features supported by Kurento or WebRTC that will be part of OpenVidu as well:

  - **Video composing**: right now OpenVidu streams are always sent and received without any processing in Kurento Media Server, so every subscription to a video stream in a video-session implies its own WebRTC connection. We intend to provide the possibility of configuring video-sessions to be processed and send as only one video, composed in a grid by all the published streams (MCU architecture).
  - **Direct p2p connections between users**: OpenVidu will offer the possibility of connecting users without having to use Kurento Media Server as central node. This can be very advantegeous for certain use-cases, as will reduce the need of infrastructure.

---

### 8. What platforms are supported by OpenVidu?

OpenVidu supports a wide range of platforms:

<br>
##### Desktop browsers

- Chrome
- Firefox
- Opera
- Safari
- Microsoft Edge

<br>
##### Mobile browsers

- Chrome
- Firefox
- Microsoft Edge
- Opera
- Safari (for iOS)
- Samsung Internet Browser (for Android)

<br>
##### Mobile native applications

Both Android and iOS are supported with hybrid frameworks:

- **[Ionic](https://ionicframework.com/){:target="_blank"}**. You can try [openvidu-ionic](tutorials/openvidu-ionic/) tutorial and you will have an OpenVidu native mobile application compatible working in minutes.

- **[React Native](https://facebook.github.io/react-native/){:target="_blank"}**. You can try [openvidu-react-native](tutorials/openvidu-react-native/) tutorial and you will have an OpenVidu native mobile application working in minutes.

- There are also available sample native applications for both Android and iOS, but as there are no official OpenVidu SDKs for Android or iOS yet, these applications implement OpenVidu protocol on their own. The openvidu-browser API is not compatible with these applications. You can learn more about them here: [Android](tutorials/openvidu-android/), [iOS](tutorials/openvidu-ios/)

<br>
##### Desktop native applications

Native **Windows**, **macOS** and **Linux** applications are supported through:

- [**Electron**](https://electronjs.org/){:target="_blank"}. You can try [openvidu-electron](tutorials/openvidu-electron/) tutorial and you will have an OpenVidu native desktop application working in minutes.

- [**Ionic**](https://ionicframework.com/){:target="_blank"}. With the proper integration with Electron, you can use the same Ionic source code to compile your app into a native desktop app (as well as a native mobile app, a PWA and a standard web app). Try [openvidu-ionic](tutorials/openvidu-ionic/) tutorial.

---

### 9. Which is the current status of OpenVidu regarding performance, scalability and fault tolerance?

In terms of **performance**, OpenVidu load testing process is described in detail in this [Medium post](https://medium.com/@openvidu/openvidu-load-testing-a-systematic-study-of-openvidu-platform-performance-b1aa3c475ba9){:target="_blank"}. Results are the following for 7-to-7 sessions where every participant sends one audio-video stream (540x360, 30 fps) and receives 6 remote streams (same video). The table states the maximum number of entities that can be established until CPU reaches 100% use. This data is valid for OpenVidu CE.

<div class="row" style="margin-bottom: 10px; text-align: center; text-align: -webkit-center">
  <img class="img-responsive" src="img/docs/troubleshooting/load_test_results.png">
</div>

OpenVidu Pro and OpenVidu Enterprise provide further capabilitites in terms of scalability and fault tolerance. There is detail documentation about these topics here:

- [OpenVidu Pro scalability](openvidu-pro/scalability/)
- [OpenVidu Pro fault tolerance](openvidu-pro/fault-tolerance/)
- [OpenVidu Enterprise: Kurento vs mediasoup](openvidu-enterprise/#kurento-vs-mediasoup)
- [OpenVidu Enteprise scalability](openvidu-enterprise/high-availability/#scalability-in-openvidu-enterprise-ha)
- [OpenVidu Enteprise fault tolerance](openvidu-enterprise/high-availability/#fault-tolerance-in-openvidu-enterprise-ha)

---

### 10. My local video is not showing up on the browser

  You **cannot access the camera or microphone from an `http` URL. It will only work without SSL if the domain is `localhost` or `127.0.0.1`**. Media devices and WebRTC APIs of any browser requires a secure site to be available. In a nutshell: accessing the webcam on `http://localhost:8080` or `http://127.0.0.1:8080` is perfectly OK (at least in Chrome). But, for example, on `http://172.17.0.1:8080` you won't be able to access to them.

  This means that when deploying your app on production, you **MUST** use an SSL certificate and serve your app over `https`.

  This also means that when developing your app in your workstation, in order to test it on your local network with different devices, you will need to serve it through HTTPS with SSL certificates. The OpenVidu deployment must also be prepared to work with SSL. You can check out [this FAQ](#3-test-applications-in-my-network-with-multiple-devices) to see how to run any of the OpenVidu tutorials with this kind of setup.

---

### 11. My Safari users with role `SUBSCRIBER` are not able to receive any remote video

  Safari needs a user gesture to allow videos to automatically start playing if they have audio. This applies to users with role `SUBSCRIBER`: that is, users that don't need to perform a call to [OpenVidu.initPublisher](api/openvidu-browser/classes/OpenVidu.html#initPublisher). If a user access its camera or microphone, then there's no need of user gestures at all (as soon as they accept camera permissions, remote videos will automatically start playing).

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

Due to these problems, any other WebRTC based service we have tested usually redirected to a native application when trying to connect through iOS Safari. You can implement your native OpenVidu app for both iOS and Android with [Ionic](tutorials/openvidu-ionic/) or [React Native](tutorials/openvidu-react-native/).

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

If you see in your logs this: `bind() to 0.0.0.0:80 failed (98: Address already in use)`, or any other errors related with binding ports, your deployment is failing because Nginx service can not use this specified port. In most of the cases this error happens because of port 80 is being used by other services running in the same machine as OpenVidu. Port 80 is used by our Nginx container for https redirection and letsencrypt. **Be sure to not run any services at ports used by OpenVidu. These ports are defined [here](deployment/ce/on-premises/#1-prerequisites) (OpenVidu CE) and [here](deployment/pro/on-premises/#1-prerequisites) (OpenVidu Pro).**

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
- **Be sure that all ports documented [here](deployment/ce/on-premises/#1-prerequisites)(OpenVidu CE) or [here](deployment/pro/on-premises/#1-prerequisites) (OpenVidu PRO) are visible using your domain name and your public ip. Also ensure that all the documented ports are available and not used by other services.**

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

- [Deployment CE in AWS](deployment/ce/aws)
- [Deployment CE On premises](deployment/ce/on-premises)
- [Deployment PRO in AWS](deployment/pro/aws)
- [Deployment PRO On premises](deployment/pro/on-premises)

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

#### 17. Elastic Search and OpenVidu Pro common problems

Exceptions may happen in OpenVidu Pro if the machine is running out of disk space or if Elasticsearch have not enough JVM heap memory configured.

We made a lot of improvements since version 2.16.0 to avoid this, so problems should not appear if you have configured in `/opt/openvidu/.env` file
a reasonable value in `OPENVIDU_PRO_ELASTICSEARCH_MAX_DAYS_DELETE`. By default the value of this property is **15** days, but if you see that the space
of your disk is growing too fast, you may need to change this value to a smaller one.
You can take a look into the disk space in [Node Monitoring Metrics](openvidu-pro/monitoring-elastic-stack/#metricbeat-node-monitoring-metrics) dashboard
in Kibana.

> **WARNING**: To avoid disk or JVM heap problems in your Master Node, we encourage you to configure an external Elastic Stack. Take a look into how to configure
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

---

#### 18. OpenVidu does not work for clients behind restrictive firewalls

OpenVidu CE and OpenVidu Pro deploy by default a TURN server (Coturn) at port 3478. Some strict firewalls have restrictions on requests with origin ports other than 80 and 443, consequently denying requests from port 3478. Follow the instructions of section [Allow users behind firewalls](deployment/allow-users-behind-firewalls/) to solve these situations.

#### 19. While deploying in Cloudformation (AWS), the Image ID (AMI) does not exist

If the AMI of the Cloudformation you are trying to deploy does not exist in your specific region, you will see this error message in the Cloudformation panel:

<div class="row" style="margin-bottom: 50px">
  <div class="col-md-12 col-sm-12 col-xs-12" >
    <img class="img-responsive img-more-info" src="img/docs/troubleshooting/ami_id_not_found.png">
  </div>
</div>

This probably means that the version you are trying to deploy is too old, and it is no longer supported by OpenVidu in that region. But if you need to deploy that Cloudformation, you can copy a legacy AMI present in `eu-west-1` of that unsupported version to your region, and replace it in the Clouformation template.

For each OpenVidu Edition, the steps are a bit different:

---

##### Copy AMIs of OpenVidu CE

**1)** In **AWS**, go to the region you want to deploy.

**2)** Go to the [AWS CloudShell](https://aws.amazon.com/cloudshell/) to use `aws-cli`.

**3)** Copy the OpenVidu CE AMI of the version you want to use into the region you want to deploy:

```bash
# OpenVidu legacy version to deploy
OPENVIDU_VERSION=<OPENVIDU_LEGACY_VERSION>
# Region where OpenVidu is deployed
REGION=<YOUR_REGION>

ORIGINAL_AMI_ID=$(curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/cf_eu_west_1_ov_ce_ami_id.sh |
  bash -s "${OPENVIDU_VERSION}")

# Copy AMI and get AMI Id
NEW_IMAGE_ID=$(aws ec2 copy-image \
    --region "${REGION}" --name "OpenVidu CE - ${OPENVIDU_VERSION}" \
    --source-region eu-west-1 --source-image-id "${ORIGINAL_AMI_ID}" --output text)

# Wait for the AMI to be available
aws ec2 wait image-available --region "${REGION}" --image-ids "${NEW_IMAGE_ID}"

# Print AMI Id
echo "${NEW_IMAGE_ID}"
```

Where `<OPENVIDU_LEGACY_VERSION>` is the legacy version of OpenVidu, and `<YOUR_REGION>` is where the Cloudformation will be deployed.

**4)** Download the cloudformation you want to deploy, get the printed `NEW_IMAGE_ID` from step **3)** and paste it in the section of the Cloudformation: `Mappings.OVAMIMAP.<YOUR_REGION>`.

**5)** Deploy that Cloudformation with the new AMI configured.

---

##### Copy AMIs of OpenVidu PRO

**1)** In **AWS**, go to the region you want to deploy.

**2)** Go to the [AWS CloudShell](https://aws.amazon.com/cloudshell/) to use `aws-cli`.

**3)** Copy the Master Node and Media Node AMIs of the version you want to use into the region you want to deploy:

```bash
# OpenVidu legacy version to deploy
OPENVIDU_VERSION=<OPENVIDU_LEGACY_VERSION>
# Region where OpenVidu is deployed
REGION=<YOUR_REGION>

# Get Original AMI of Master Node
ORIGINAL_OV_AMI_ID=$(curl \
  https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/cf_eu_west_1_ov_pro_ami_id.sh |
  bash -s "${OPENVIDU_VERSION}")

# Copy AMI and get new AMI Id of Master Node
NEW_IMAGE_ID_OV=$(aws ec2 copy-image \
    --region "${REGION}" --name "OpenVidu PRO ${OPENVIDU_VERSION} - Master Node" \
    --source-region eu-west-1 --source-image-id "${ORIGINAL_OV_AMI_ID}" --output text)

# Get Original AMI of Media Node
ORIGINAL_MNODE_AMI_ID=$(curl \
  https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/cf_eu_west_1_ov_pro_media_node_ami_id.sh |
  bash -s "${OPENVIDU_VERSION}")

# Copy AMI and get AMI Id of Media Node
NEW_IMAGE_ID_MNODE=$(aws ec2 copy-image \
    --region "${REGION}" --name "OpenVidu PRO ${OPENVIDU_VERSION} - Media Node" \
    --source-region eu-west-1 --source-image-id "${ORIGINAL_MNODE_AMI_ID}" --output text)

# Wait for both AMIs to be available
aws ec2 wait image-available --region "${REGION}" --image-ids "${NEW_IMAGE_ID_OV}"
aws ec2 wait image-available --region "${REGION}" --image-ids "${NEW_IMAGE_ID_MNODE}"

# Print AMI Ids
echo "Master Node AMI Id: ${NEW_IMAGE_ID_OV}"
echo "Media Node AMI Id: ${NEW_IMAGE_ID_MNODE}"
```

Where `<OPENVIDU_LEGACY_VERSION>` is the legacy version of OpenVidu, and `<YOUR_REGION>` is where the Cloudformation will be deployed.

**4)** Download the cloudformation you want to deploy, get the printed Master Node AMI Id and Media Node Id from step **3)** and:
  - Paste the Master Node AMI Id at `Mappings.OVAMIMAP.<YOUR_REGION>`
  - Paste the Media Node AMI Id at `Mappings.KMSAMIMAP.<YOUR_REGION>.`

**5)** Deploy that Cloudformation with the new AMI configured.

---

##### Copy AMIs of OpenVidu Enteprise

**1)** In **AWS**, go to the region you want to deploy.

**2)** Go to the [AWS CloudShell](https://aws.amazon.com/cloudshell/) to use `aws-cli`.

**3)** Copy the Master Node and Media Node AMIs of the version you want to use into the region you want to deploy:

```bash
# OpenVidu legacy version to deploy
OPENVIDU_VERSION=<OPENVIDU_LEGACY_VERSION>
# Region where OpenVidu is deployed
REGION=<YOUR_REGION>

# Get Original AMI of Master Node
ORIGINAL_OV_AMI_ID=$(curl \
  https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/cf_eu_west_1_ov_enterprise_ami_id.sh |
  bash -s "${OPENVIDU_VERSION}")

# Copy AMI and get new AMI Id of Master Node
NEW_IMAGE_ID_OV=$(aws ec2 copy-image \
    --region "${REGION}" --name "OpenVidu ENTERPRISE ${OPENVIDU_VERSION} - Master Node" \
    --source-region eu-west-1 --source-image-id "${ORIGINAL_OV_AMI_ID}" --output text)

# Get Original AMI of Media Node
ORIGINAL_MNODE_AMI_ID=$(curl \
  https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/cf_eu_west_1_ov_enterprise_media_node_ami_id.sh |
  bash -s "${OPENVIDU_VERSION}")

# Copy AMI and get AMI Id of Media Node
NEW_IMAGE_ID_MNODE=$(aws ec2 copy-image \
    --region "${REGION}" --name "OpenVidu ENTERPRISE ${OPENVIDU_VERSION} - Media Node" \
    --source-region eu-west-1 --source-image-id "${ORIGINAL_MNODE_AMI_ID}" --output text)

# Wait for both AMIs to be available
aws ec2 wait image-available --region "${REGION}" --image-ids "${NEW_IMAGE_ID_OV}"
aws ec2 wait image-available --region "${REGION}" --image-ids "${NEW_IMAGE_ID_MNODE}"

# Print AMI Ids
echo "Master Node AMI Id: ${NEW_IMAGE_ID_OV}"
echo "Media Node AMI Id: ${NEW_IMAGE_ID_MNODE}"
```

Where `<OPENVIDU_LEGACY_VERSION>` is the legacy version of OpenVidu, and `<YOUR_REGION>` is where the Cloudformation will be deployed.

**4)** Download the cloudformation you want to deploy, get the printed Master Node AMI Id and Media Node Id from step **3)** and:
  - Paste the Master Node AMI Id at `Mappings.OVAMIMAP.<YOUR_REGION>`
  - Paste the Media Node AMI Id at `Mappings.KMSAMIMAP.<YOUR_REGION>.`

**5)** Deploy that Cloudformation with the new AMI configured.


<!--
---

#### 20. How to trust a self-signed certificate

Most browsers will not trust a self-signed certificate, showing a security warning page (or rejecting access altogether, like iOS Safari). However, you can override this by installing your Root CA in the device. Then, the self-signed certificate will be trusted just like if it had been issued by a reputable Authority.

- On **desktop browsers**, installing the Root CA is easy because mkcert does it for you:

        CAROOT="$PWD" mkcert -install

- In **iOS**, you can either email the `rootCA.pem` file to yourself, use AirDrop, or serve it from an HTTP server. Normally, a dialog should pop up asking if you want to install the new certificate; afterwards, you must [enable full trust in it](https://support.apple.com/en-nz/HT204477){:target="_blank"}. When finished, your self-signed certs will be trusted by the system, and iOS Safari will allow accessing pages on the `*.home.arpa` subdomain.

- In **Android**, you’ll have to install the Root CA and then enable user roots in the development build of your app. See [this StackOverflow answer](https://stackoverflow.com/a/22040887/749014){:target="_blank"}.
-->

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js"></script>
<script type='text/javascript' src='js/fancybox-setup.js'></script>