<h2 id="section-title">Troubleshooting and FAQ</h2>
<hr>

### Everything looks alright, but I cannot see any remote video

You have implemented an app that uses OpenVidu to stream some video user-to-user, and the process looks perfectly okey. No errors on the console and all the OpenVidu events you are subscribed to are correctly triggered. So what's happening?

Okey, you have come across the most common issue with WebRTC. And 99% of the time this is a problem related with **[STUN/TURN servers](#what-are-stun-and-turn-servers-and-why-do-i-need-them)**.

To provide a a solid service you definitely need both STUN and TURN servers. There are many public, free-to-use STUN servers ([STUN server list](https://gist.github.com/zziuni/3741933)), but because TURN always faces a much larger load when coming into play, no one offers it free of charge. The good news is that it is very easy to install a COTURN server, which offers both STUN and TURN:

  - Our ready-to-use [CloudFormation stack](/deployment/deploying-aws/#deploying-openvidu-server-on-aws-with-cloud-formation) already includes a properly configured COTURN server.
  - If you are deploying OpenVidu Server by your own, there are detailed instructions in the [Deploying OpenVidu as a native service](/deployment/deploying-ubuntu/) section, which explains how to install, configure and run COTURN in Ubuntu.

These are the recommended steps to follow when videos are not received, even after COTURN has been added:

  - Access your OpenVidu dashboard (`https://YOUR_OPENVIDU_IP:8443`) to quickly test the video transmission.
  - Please be sure that the COTURN host meets the [network requirements](/deployment/deploying-ubuntu#server-network-requirements).
  - Check that your COTURN server is properly working with the [Trickle ICE web](https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/). To do so, remove the default Google server from the list and add your own following this format: `turn:YOUR_TURN_IP:YOUR_TURN_PORT` (add your TURN username and password below).


### Why does my app need a server-side?

First of all, let's differentiate between OpenVidu server-side and your application's server-side. 

  - You will always need OpenVidu Server deployed at some place on the Internet (check the [Deployment section](/deployment/deploying-aws/) to learn how to do it in 5 minutes). For now, OpenVidu doesn't support p2p direct connections between two users, so all the traffic must flow to OpenVidu Server or from OpenVidu Server.
  - You will generally want your application to have its own server-side. Why?

Well, it is really not necessary. You can have a pure client-side application if you want. Just check any of these tutorials:<br>[openvidu-insecure-js](/tutorials/openvidu-insecure-js/), [openvidu-getaroom](/tutorials/openvidu-getaroom/)

The problem here is pretty evident: if you don't have any kind of server side to control your users, anyone can use your app. In fact, you can respectively see [here](https://github.com/OpenVidu/openvidu-tutorials/blob/5049635370ab4d6abc95a7caccd95965a939fb1e/openvidu-insecure-js/web/app.js#L19) and [here](https://github.com/OpenVidu/openvidu-tutorials/blob/5049635370ab4d6abc95a7caccd95965a939fb1e/openvidu-getaroom/web/app.js#L46) that when initializing the Session object, the SECRET is hardcoded in the JavaScript file. That means that any user with basic knowledge can get your SECRET just by looking at the source code in the browser.

  > **IMPORTANT**: Don't include your SECRET in your JavaScript or HTML files in a production environment!


### The CloudFormation Stack is a nice option for Amazon, but I don't like it. I want more control

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

In this diagram [STUN/TURN server](#what-are-stun-and-turn-servers-and-why-do-i-need-them) is not outlined. It is another necessary service, and it can be hosted wherever you want (we recommend running it in the same host as Kurento Media Server).

### What are STUN and TURN servers and why do I need them?

If the user's devices don't have a public and reachable IP, WebRTC connections cannot be established and therefore, video streams cannot be sent or received. This occurs when the users are behind NAT's and Firewalls. In brief, when they are hidden under complex networks.

In order to support these circumstances, WebRTC relies on **STUN and TURN** servers:

  - **STUN** can easily provide to the user's devices their own public IP (the IP that other devices on the Internet use to connect to it), so they can tell OpenVidu where to send the video streams. Only with a STUN server, around **86%** of the time the connection will be successful.
  - **TURN** is an extension of STUN, and covers the most extreme cases where both sides of the connection are hidden behind complex networks. It acts as a gateway, passing all the media streams form one side to the other. This situation will occur with a probability of around **8%**.
