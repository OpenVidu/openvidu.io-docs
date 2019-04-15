<h2>Adding videoconference to web and mobile apps</h2>
<hr>

<h3 id="section-title">Video Conference or Live Streaming</h3>
<hr>

#### I) Live Streaming

The **videostreaming** is an unidirectional platform that allows the retransmission of multimedia files (audio or audio and video) through Internet, from a place of emission to different places of reception. The video streaming is ideal for the retransmission of all kinds of events live to any part of the world and the playback can be stored for later viewing.

#### II) VideoConferences
On the other hand, we have audiovisual equipment for the development of **videoconference**. A two-way platform for connecting live video between different people in different places over the Internet. Videoconferencing tools allows visual communication between a group of people from anywhere in the world. It is a multipoint or point-to-point system ideal for business meetings.

You can choose between **P2P or Media Server**:

##### a) P2P: connect your users directly between them

This is a quick and cheap solution, as the need of a server side managing the media streams is removed from the equation. It has a lot of limitations though, especially in how big your videoconferences can get. Each user has to send their video to every other user in the call, and must receive a direct video stream from every one of them. This way the amount of media streams grows exponentially. More than 3 or 4 users per videocall usually end up in a rather unfortunate user experience. Besides that, the lack of a central node for controlling your calls means that you cannot perform such useful tasks as call recording or video forwarding.

And perhaps the worst thing about this option is the fact that it does not release you from the use a media routing server. Many times your clients will be located behind firewalls or complex networks, and that makes the use of TURN servers mandatory. They act as a relay server to connect your clients whenever a direct connection is not possible, and that may happen pretty frequently.

##### b) Media Server: route every video stream through a server

This is the most versatile solution. Using a media server to route your clients video streams expands every possible aspect of real-time video to a higher level (at the expense of having to maintain another service in your stack, of course). But as we stated before, dispensing with a media server is not a viable option in many use cases.



<div class="row no-margin row-gallery">
    <div class="col-md-6 col-sm-6" align="center">
        <div class="img">
            <img class="img-responsive" src="/img/docs/technologies/streaming.png">
        </div>
        <div class=" wow fadeInUp">
            <h4>Live Streaming</h4>
            <p></p>
        </div>
    </div>
    <div class="col-md-6 col-sm-6" align="center">
        <div class="img" >
            <img class="img-responsive" src="/img/docs/technologies/videoconferences.png">
        </div>
        <div class="member-info wow fadeInUp">
              <h4>Video Conferences</h4>
            <p></p>
        </div>
    </div>
</div>

<h4 id="section-title">When to use live streaming </h4>

Live streaming technology enables **high quality video** to be transmitted to **tens of thousands of people** in near real time. Keep in mind that the high quality of video produces a **higher latency** with respect to video conferences.
In addition to this, live streaming platforms allow viewers to **interact with their videos long after their live event is over**.

<div class="row no-margin row-gallery">
    <div class="col-md-6 col-sm-6" >
    <h5 style="color: green;">You should be using these tools for:</h5>
        <ul>
            <li>You want a versatile solution for a larger audience</li>
            <li>You want simplicity for the viewer</li>
            <li>You want production level quality</li>
        </ul>   
    </div>
    <div class="col-md-6 col-sm-6">
        <h5 style="color: #d80000;">You shouldn't be using these tools for:</h5>
        <ul>
            <li>Face to face meetings</li>
            <li>Create live events with less than one second of latency</li>
        </ul> 
    </div>
</div>

<h4 id="section-title">When to use video conferences </h4>

Videoconferencing tools are useful to set internal or external meetings and calls between **one-on-one** or **small groups** of people in multiple location. As it is a **two-way communication**, it allows an active interaction between the participants with **hardly any audio and video delay**.
In addition, this type of tools allow you to communicate in a clearer and more consistent way to your work team. In turn, participants will have the opportunity to ask questions and provide **feedback in real time**.

<div class="row no-margin row-gallery">
    <div class="col-md-6 col-sm-6" >
    <h5 style="color: green;">You should be using these tools for:</h5>
        <ul>
            <li>One-on-One or groups meetings</li>
            <li>Active interaction between participants</li>
            <li>Low video and audio latency</li>
        </ul>   
    </div>
    <div class="col-md-6 col-sm-6">
        <h5 style="color: #d80000;">You shouldn't be using these tools for:</h5>
        <ul>
            <li>Sending a stream to more than a few dozen people</li>
            <li>Creating high quality live video</li>
        </ul> 
    </div>
</div>

<h3 id="section-title">Apps or Development Platforms</h3>
<hr>

The next step, once you have decided to use Video Conferences or Live Streaming, is to choose which option adapts to your needs: 

#### I) Standalone third-party application

Your needs may be met simply by using a third-party application as a non-integral solution, detached from your software core. Don't underestimate the most direct solution: if your user requirements allow the use of *Skype*, *Hangouts*, *Periscope* or *YouTube Live* to hold some meetings or to emit events, that's for sure the cheapest and easiest way to get real-time videocalls or retransmission in your business.

<h4>As a service</h4>

<h5>Live Straming Apps</h5>

<div class="row">
    <div class="col-md-2 col-sm-2 col-xs-4 team-member">
        <div class="effect effects wow fadeInUp">
            <div class="img">
                <img src="/img/docs/technologies/periscope.png" class="img-responsive img-tutorials" alt="" />
                <div class="overlay">
                    <ul class="expand">
                        <li><a href="https://www.pscp.tv/" target="_blank" class="cbp-singlePage">Periscope</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-2 col-sm-2 col-xs-4 team-member">
        <div class="effect effects wow fadeInUp">
            <div class="img">
                <img src="/img/docs/technologies/twitch.png" class="img-responsive img-tutorials" alt="" />
                <div class="overlay">
                    <ul class="expand">
                        <li><a href="https://www.twitch.tv/">Twitch</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-2 col-sm-2 col-xs-4 team-member">
        <div class="effect effects wow fadeInUp">
            <div class="img">
                <img src="/img/docs/technologies/youtube.png" class="img-responsive img-tutorials" alt="" />
                <div class="overlay">
                    <ul class="expand">
                        <li><a href="https://www.youtube.com/" target="_blank" class="cbp-singlePage">YouTube</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-2 col-sm-2 col-xs-4 team-member">
        <div class="effect effects wow fadeInUp">
            <div class="img">
                <img src="/img/docs/technologies/fb.jpg" class="img-responsive img-tutorials" alt="" />
                <div class="overlay">
                    <ul class="expand">
                        <li><a href="https://live.fb.com/" target="_blank" class="cbp-singlePage">FB Live</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-2 col-sm-2 col-xs-4 team-member">
        <div class="effect effects wow fadeInUp">
            <div class="img">
                <img src="/img/docs/technologies/boxcast.png" class="img-responsive img-tutorials" alt="" />
                <div class="overlay">
                    <ul class="expand">
                        <li><a href="https://www.boxcast.com/" target="_blank" class="cbp-singlePage">Boxcast</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-2 col-sm-2 col-xs-4 team-member">
        <div class="effect effects wow fadeInUp">
            <div class="img">
                <img src="/img/docs/technologies/vimeo.png" class="img-responsive img-tutorials" alt="" />
                <div class="overlay">
                    <ul class="expand">
                        <li><a href="https://vimeo.com" target="_blank" class="cbp-singlePage">Vimeo</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<h5>Video Conferences Apps</h5>

<div class="row">

<div class="col-md-2 col-sm-2 col-xs-4 team-member">
        <div class="effect effects wow fadeInUp">
            <div class="img">
                <img src="/img/docs/technologies/openvidu.jpg" class="img-responsive img-tutorials" alt="" />
                <div class="overlay">
                    <ul class="expand">
                        <li><a href="https://call.openvidu.io/" target="_blank" class="cbp-singlePage">OpenVidu</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-2 col-sm-2 col-xs-4 team-member">
        <div class="effect effects wow fadeInUp">
            <div class="img">
                <img src="/img/docs/technologies/skype.png" class="img-responsive img-tutorials" alt="" />
                <div class="overlay">
                    <ul class="expand">
                        <li><a href="https://www.skype.com" target="_blank" class="cbp-singlePage">Skype</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-2 col-sm-2 col-xs-4 team-member">
        <div class="effect effects wow fadeInUp">
            <div class="img">
                <img src="/img/docs/technologies/hangouts.png" class="img-responsive img-tutorials" alt="" />
                <div class="overlay">
                    <ul class="expand">
                        <li><a href="https://hangouts.google.com/">Hangouts</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-2 col-sm-2 col-xs-4 team-member">
        <div class="effect effects wow fadeInUp">
            <div class="img">
                <img src="/img/docs/technologies/appear.png" class="img-responsive img-tutorials" alt="" />
                <div class="overlay">
                    <ul class="expand">
                        <li><a href="https://appear.in/" target="_blank" class="cbp-singlePage">Appear.in</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-2 col-sm-2 col-xs-4 team-member">
        <div class="effect effects wow fadeInUp">
            <div class="img">
                <img src="/img/docs/technologies/zoom.png" class="img-responsive img-tutorials" alt="" />
                <div class="overlay">
                    <ul class="expand">
                        <li><a href="https://zoom.us/" target="_blank" class="cbp-singlePage">Zoom</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-2 col-sm-2 col-xs-4 team-member">
        <div class="effect effects wow fadeInUp">
            <div class="img">
                <img src="/img/docs/technologies/gotomeeting.png" class="img-responsive img-tutorials" alt="" />
                <div class="overlay">
                    <ul class="expand">
                        <li><a href="https://www.gotomeeting.com/features" target="_blank" class="cbp-singlePage">GoToMeeting</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<h4>On premise</h4>

<h5>Video Conferences Apps</h5>

<div class="row">
    <div class="col-md-4 col-sm-4 col-xs-4 team-member">
        <div class="effect effects wow fadeInUp">
            <div class="img">
                <img src="/img/docs/technologies/openvidu.jpg" class="img-responsive img-tutorials" alt="" />
                <div class="overlay">
                    <ul class="expand">
                        <li><a href="https://github.com/OpenVidu/openvidu-call/releases" target="_blank" class="cbp-singlePage">OpenVidu</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-4 col-sm-4 col-xs-4 team-member">
        <div class="effect effects wow fadeInUp">
            <div class="img">
                <img src="/img/docs/technologies/bbb.png" class="img-responsive img-tutorials" alt="" />
                <div class="overlay">
                    <ul class="expand">
                        <li><a href="https://bigbluebutton.org/" target="_blank" class="cbp-singlePage">BigBlueButton</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-4 col-sm-4 col-xs-4 team-member">
        <div class="effect effects wow fadeInUp">
            <div class="img">
                <img src="/img/docs/technologies/jitsi.jpg" class="img-responsive img-tutorials" alt="" />
                <div class="overlay">
                    <ul class="expand">
                        <li><a href="https://jitsi.org/" target="_blank" class="cbp-singlePage">Jitsi</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>



#### II) Software as a Service

 This can be a recommended option if: **_a) you can afford it_** and **_b) you are allowed to outsource the service_**. Besides, the video conference platforms usually support both P2P and routed videocalls and also bring more advanced features pretty useful for companies such as programmable SMS or phone calls, SIP integration and so on.


<h4>Streaming Companies</h4>

<div class="row">
<div class="col-md-6 col-sm-6 col-xs-6 team-member">
        <div class="effect effects wow fadeInUp">
            <div class="img">
                <img src="/img/docs/technologies/ant.jpg" class="img-responsive img-tutorials" alt="" />
                <div class="overlay">
                    <ul class="expand">
                        <li><a href="https://antmedia.io/" target="_blank" class="cbp-singlePage">AntMedia</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-6 col-sm-6 col-xs-6 team-member">
        <div class="effect effects wow fadeInUp">
            <div class="img">
                <img src="/img/docs/technologies/wowza.jpg" class="img-responsive img-tutorials" alt="" />
                <div class="overlay">
                    <ul class="expand">
                        <li><a href="https://www.wowza.com/" target="_blank" class="cbp-singlePage">Wowza</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<h4>Video Conferences Companies</h4>

<div class="row">
    <div class="col-md-2 col-sm-2 col-xs-4 team-member">
        <div class="effect effects wow fadeInUp">
            <div class="img">
                <img src="/img/docs/technologies/tokbox.png" class="img-responsive img-tutorials" alt="" />
                <div class="overlay">
                    <ul class="expand">
                        <li><a href="https://www.tokbox.com" target="_blank" class="cbp-singlePage">Tokbox</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-2 col-sm-2 col-xs-4 team-member">
        <div class="effect effects wow fadeInUp">
            <div class="img">
                <img src="/img/docs/technologies/twilio.png" class="img-responsive img-tutorials" alt="" />
                <div class="overlay">
                    <ul class="expand">
                        <li><a href="https://www.twilio.com/">Twilio</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-2 col-sm-2 col-xs-4 team-member">
        <div class="effect effects wow fadeInUp">
            <div class="img">
                <img src="/img/docs/technologies/agora.png" class="img-responsive img-tutorials" alt="" />
                <div class="overlay">
                    <ul class="expand">
                        <li><a href="https://www.agora.io/en/" target="_blank" class="cbp-singlePage">Agora.io</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-2 col-sm-2 col-xs-4 team-member">
        <div class="effect effects wow fadeInUp">
            <div class="img">
                <img src="/img/docs/technologies/vidyo.jpg" class="img-responsive img-tutorials" alt="" />
                <div class="overlay">
                    <ul class="expand">
                        <li><a href="https://vidyo.io/" target="_blank" class="cbp-singlePage">Vidyo.io</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-2 col-sm-2 col-xs-4 team-member">
        <div class="effect effects wow fadeInUp">
            <div class="img">
                <img src="/img/docs/technologies/temasys.jpg" class="img-responsive img-tutorials" alt="" />
                <div class="overlay">
                    <ul class="expand">
                        <li><a href="https://temasys.io/" target="_blank" class="cbp-singlePage">Temasys</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-2 col-sm-2 col-xs-4 team-member">
        <div class="effect effects wow fadeInUp">
            <div class="img">
                <img src="/img/docs/technologies/apiRTC.png" class="img-responsive img-tutorials" alt="" />
                <div class="overlay">
                    <ul class="expand">
                        <li><a href="https://apirtc.com/" target="_blank" class="cbp-singlePage">apiRTC</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>


#### III) On-Premises Software



<h4>Video Conferences Open Source</h4>

<div class="row">
    <div class="col-md-2 col-sm-2 col-xs-4 team-member">
        <div class="effect effects wow fadeInUp">
            <div class="img">
                <img src="/img/docs/technologies/kurento.jpg" class="img-responsive img-tutorials" alt="" />
                <div class="overlay">
                    <ul class="expand">
                        <li><a href="http://www.kurento.org/" target="_blank" class="cbp-singlePage">Kurento</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-2 col-sm-2 col-xs-4 team-member">
        <div class="effect effects wow fadeInUp">
            <div class="img">
                <img src="/img/docs/technologies/openvidu.jpg" class="img-responsive img-tutorials" alt="" />
                <div class="overlay">
                    <ul class="expand">
                        <li><a href="https://openvidu.io/" target="_blank" class="cbp-singlePage">OpenVidu</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-2 col-sm-2 col-xs-4 team-member">
        <div class="effect effects wow fadeInUp">
            <div class="img">
                <img src="/img/docs/technologies/janus.jpg" class="img-responsive img-tutorials" alt="" />
                <div class="overlay">
                    <ul class="expand">
                        <li><a href="https://janus.conf.meetecho.com/index.html">Janus</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-2 col-sm-2 col-xs-4 team-member">
        <div class="effect effects wow fadeInUp">
            <div class="img">
                <img src="/img/docs/technologies/medooze.png" class="img-responsive img-tutorials" alt="" />
                <div class="overlay">
                    <ul class="expand">
                        <li><a href="http://www.medooze.com/" target="_blank" class="cbp-singlePage">Medooze</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-2 col-sm-2 col-xs-4 team-member">
        <div class="effect effects wow fadeInUp">
            <div class="img">
                <img src="/img/docs/technologies/licode.png" class="img-responsive img-tutorials" alt="" />
                <div class="overlay">
                    <ul class="expand">
                        <li><a href="http://lynckia.com/licode/" target="_blank" class="cbp-singlePage">Licode</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-2 col-sm-2 col-xs-4 team-member">
        <div class="effect effects wow fadeInUp">
            <div class="img">
                <img src="/img/docs/technologies/mediasoup.png" class="img-responsive img-tutorials" alt="" />
                <div class="overlay">
                    <ul class="expand">
                        <li><a href="https://mediasoup.org/" target="_blank" class="cbp-singlePage">Mediasoup</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>


<h4>Video Conferences Closed Source</h4>

<div class="row">
    <div class="col-md-2 col-sm-2 col-xs-4 team-member">
        <div class="effect effects wow fadeInUp">
            <div class="img">
                <img src="/img/docs/technologies/openvidu.jpg" class="img-responsive img-tutorials" alt="" />
                <div class="overlay">
                    <ul class="expand">
                        <li><a href="https://openvidu.io/" target="_blank" class="cbp-singlePage">OpenVidu Pro</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-2 col-sm-2 col-xs-4 team-member">
        <div class="effect effects wow fadeInUp">
            <div class="img">
                <img src="/img/docs/technologies/frozen.png" class="img-responsive img-tutorials" alt="" />
                <div class="overlay">
                    <ul class="expand">
                        <li><a href="https://www.frozenmountain.com/" target="_blank" class="cbp-singlePage">Frozen Mountain</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-2 col-sm-2 col-xs-4 team-member">
        <div class="effect effects wow fadeInUp">
            <div class="img">
                <img src="/img/docs/technologies/flashphoner.png" class="img-responsive img-tutorials" alt="" />
                <div class="overlay">
                    <ul class="expand">
                        <li><a href="https://flashphoner.com/" target="_blank" class="cbp-singlePage">Flashphoner</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-2 col-sm-2 col-xs-4 team-member">
        <div class="effect effects wow fadeInUp">
            <div class="img">
                <img src="/img/docs/technologies/dialogic.png" class="img-responsive img-tutorials" alt="" />
                <div class="overlay">
                    <ul class="expand">
                        <li><a href="https://www.dialogic.com/" target="_blank" class="cbp-singlePage">Dialogic</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-2 col-sm-2 col-xs-4 team-member">
        <div class="effect effects wow fadeInUp">
            <div class="img">
                <img src="/img/docs/technologies/quobis.png" class="img-responsive img-tutorials" alt="" />
                <div class="overlay">
                    <ul class="expand">
                        <li><a href="https://www.quobis.com/" target="_blank" class="cbp-singlePage">Quobis</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    
</div>

<h4>Streaming Open Source</h4>

<div class="row">
    <div class="col-md-6 col-sm-6 col-xs-6 team-member">
        <div class="effect effects wow fadeInUp">
            <div class="img">
                <img src="/img/docs/technologies/ant.jpg" class="img-responsive img-tutorials" alt="" />
                <div class="overlay">
                    <ul class="expand">
                        <li><a href="https://antmedia.io/" target="_blank" class="cbp-singlePage">AntMedia</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-6 col-sm-6 col-xs-6 team-member">
        <div class="effect effects wow fadeInUp">
            <div class="img">
                <img src="/img/docs/technologies/red5.png" class="img-responsive img-tutorials" alt="" />
                <div class="overlay">
                    <ul class="expand">
                        <li><a href="http://red5.org/" target="_blank" class="cbp-singlePage">Red5</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>



<h4>Streaming Closed Source</h4>

<div class="row">
    <div class="col-md-3 col-sm-3 col-xs-3 team-member">
        <div class="effect effects wow fadeInUp">
            <div class="img">
                <img src="/img/docs/technologies/ant.jpg" class="img-responsive img-tutorials" alt="" />
                <div class="overlay">
                    <ul class="expand">
                        <li><a href="https://antmedia.io/" target="_blank" class="cbp-singlePage">AntMedia</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-3 col-sm-3 col-xs-3 team-member">
        <div class="effect effects wow fadeInUp">
            <div class="img">
                <img src="/img/docs/technologies/wowza.jpg" class="img-responsive img-tutorials" alt="" />
                <div class="overlay">
                    <ul class="expand">
                        <li><a href="https://www.wowza.com/" target="_blank" class="cbp-singlePage">Wowza</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
        <div class="col-md-3 col-sm-3 col-xs-3 team-member">
        <div class="effect effects wow fadeInUp">
            <div class="img">
                <img src="/img/docs/technologies/flashphoner.png" class="img-responsive img-tutorials" alt="" />
                <div class="overlay">
                    <ul class="expand">
                        <li><a href="https://flashphoner.com/" target="_blank" class="cbp-singlePage">Flashphoner</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-3 col-sm-3 col-xs-3 team-member">
        <div class="effect effects wow fadeInUp">
            <div class="img">
                <img src="/img/docs/technologies/red5pro.png" class="img-responsive img-tutorials" alt="" />
                <div class="overlay">
                    <ul class="expand">
                        <li><a href="https://red5pro.com/" target="_blank" class="cbp-singlePage">Red5 Pro</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<h3 id="section-title">Decision tree</h3>
<hr>

<div class="docs-gallery">
  <a data-fancybox="gallery-wellcome" href="/img/docs/technologies/flowchartTech.jpg"><img class="img-responsive img-wellcome" src="/img/docs/technologies/flowchartTech.jpg"/></a>
</div>

<h4>OpenVidu</h4>
Once we have learned the differences between live streaming and video conferences and its subcategories, we will be able to clarify what openvidu is. 

First of all, OpenVidu is an **on premise open and closed source video conferences platform**. This means that OpenVidu is an OpenSource project lisenced under [Apache Lisence v2](https://choosealicense.com/licenses/apache-2.0/){target: "_blank"} and you can use it for free.  
However, OpenVidu Team have developed [OpenVidu PRO](http://openvidu.io/docs/openvidu-pro/) which consists of different modules working over OpenVidu Community Edition.

And secondly, OpenVidu offers **as a service external app videoconference** ([call.openvidu.io](https://call.openvidu.io)) and **on premise external app videoconference** ([OpenVidu Call](https://github.com/OpenVidu/openvidu-call/releases)).



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