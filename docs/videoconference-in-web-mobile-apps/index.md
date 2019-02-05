<h2 id="section-title">Adding videoconference to web and mobile apps</h2>
<hr>

When facing the task of integrating real-time communications into web and mobile applications or any kind of software platform, first thing to address is understanding the 2 different topologies on which you can base your client's connections.

### 1. P2P or Media Server?

#### a) P2P: connect your users directly between them
This is a quick and cheap solution, as the need of a server side managing the media streams is removed from the equation. It has a lot of limitations though, especially in how big your videoconferences can get. Each user has to send their video to every other user in the call, and must receive a direct video stream from every one of them. This way the amount of media streams grows exponentially. More than 3 or 4 users per videocall usually end up in a rather unfortunate user experience. Besides that, the lack of a central node for controlling your calls means that you cannot perform such useful tasks as call recording or video forwarding.

And perhaps the worst thing about this option is the fact that it does not release you from the use a media routing server. Many times your clients will be located behind firewalls or complex networks, and that makes the use of TURN servers mandatory. They act as a relay server to connect your clients whenever a direct connection is not possible, and that may happen pretty frequently.

#### b) Media Server: route every video stream through a server
This is the most versatile solution. Using a media server to route your clients video streams expands every possible aspect of real-time video to a higher level (at the expense of having to maintain another service in your stack, of course). But as we stated before, dispensing with a media server isn't a viable option in many use cases.

### 2. Which kind of solution best suits my needs?

Developers now may decide basically between 3 different options:

#### a) Standalone third-party application

Your needs may be met simply by using a third-party application as a non-integral solution, detached from your software core. Don't underestimate the most direct solution: if your user requirements allow the use of Skype or Hangouts to hold some meetings, that's for sure the cheapest and easiest way to get real-time videocalls in your business.

#### b) Software as a Service

This includes services offered by companies such as [Tokbox](https://tokbox.com/){:target="_blank"}, [Twilio](https://www.twilio.com/){:target="_blank"}, [Agora.io](https://www.agora.io/en/){:target="_blank"}, [Temasys](https://temasys.io/){:target="_blank"}, [Xirsys](https://xirsys.com/){:target="_blank"} or [Kandy](https://www.kandy.io/){:target="_blank"}. This can be a recommended option if:   ***a) you can afford it*** and ***b) you are allowed to outsource the service***. Besides, these platforms usually support both P2P and routed videocalls and also bring more advanced features pretty useful for companies such as programmable SMS or phone calls, SIP integration and so on.

#### c) On-Premises Software

This is: media servers. This should be your choice if you want to own the 

Here you can find OpenVidu, Janus, Jitsi, Medooze, Mediasoup, Licode

### 3. What about the development of my application?
Once you have decided whether to use a SaaS solution or an On-Premises solution, probably the most important thing is to do a little research on your candidate platforms and answer the following questions:

#### a) What is the quality of the API and its documentation?
Not all platforms offers the same methods and for sure not all platforms have taken care of their documentation at the same level.


#### b) Ready made solutions
