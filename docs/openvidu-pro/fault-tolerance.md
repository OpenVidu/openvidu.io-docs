<h2 id="section-title">Fault tolerance</h2>
<hr>

- **[How OpenVidu Pro provides fault tolerance](#how-openvidu-pro-provides-fault-tolerance)**
- **[Making your OpenVidu app fault tolerant](#making-your-openvidu-app-fault-tolerant)**
<!--- **[Recordings and fault tolerance](#recordings-and-fault-tolerance)**-->

---

## How OpenVidu Pro provides fault tolerance

Fault tolerance in OpenVidu Pro is provided through the presence of multiple Media Nodes (see [OpenVidu Pro architecture](openvidu-pro/scalability/#openvidu-pro-architecture)). An OpenVidu Pro cluster with at least 2 Media Nodes ensures that if one Media Node goes down for any reason, the other can take over the affected OpenVidu sessions. This is represented in the image below.

<div class="row">
    <div class="pro-gallery" style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-pro1" href="img/docs/openvidu-pro/fault-tolerance.png" data-caption='If the Media Node hosting "Session 1" crashes, a healthy Media Node can take over it. The application can re-create "Session 1" and clients may reconnect to it'><img class="img-responsive" style="margin: auto; max-height: 480px; transform: translateZ(0);" src="img/docs/openvidu-pro/fault-tolerance.png"/></a>
    </div>
</div>

The points below summarize the functioning of OpenVidu Pro in terms of fault tolerance upon a Media Node crash:

1. The Master Node keeps a persistent, full-duplex connection with Media Nodes through WebSocket.
2. Whenever the Master Node detects a disconnection of a Media Node, it starts a reconnection process that grants 3 seconds to successfully reconnect. At this point, it is possible that videos on the client side are frozen, if the disconnection of the Media Node was an actual crash of the media routing process.
3. If the Master Node succeeds in reconnecting to the Media Node within the allowed time interval, it is considered a one-time issue and no further action is taken. But if the reconnection is not possible, then every OpenVidu session hosted in the crashed Media Node is closed and every participant will receive the proper event to allow the application to rebuild the session. This is further explained in the next section [Making your OpenVidu app fault tolerant](#making-your-openvidu-app-fault-tolerant).

<br>

---

## Making your OpenVidu app fault tolerant

OpenVidu Pro delegates the recovery of the sessions to the application in the event of a Media Node crash. The application should simply re-create the crashed session, which translates in nothing more than repeating the normal process of [joining users to a session](cheatsheet/join-session/):

- Initialize the **Session** in OpenVidu Server from your application's backend.
- Create a new **Connection** for the Session from your application's backend.
- Return the Connection's **token** to your application's frontend so it can use it to call [Session.connect](api/openvidu-browser/classes/Session.html#connect).

The key part is letting the application's frontend know when to ask the application's backend for a new token to re-connect to a recently crashed session. The application's frontend must listen to [`sessionDisconnected`](api/openvidu-browser/interfaces/SessionEventMap.html#sessionDisconnected) event and identify its [`reason`](api/openvidu-browser/classes/SessionDisconnectedEvent.html#reason). If it is **`nodeCrashed`** then the application's frontend just needs to ask the application's backend for a new token for a session with the same identifier as the previous one. This is reproduced in the snippet below, in a JavaScript code using openvidu-browser library.

```javascript
var OV = new OpenVidu();
var session = OV.initSession();

session.on('sessionDisconnected', event => {

  if (event.reason === 'nodeCrashed') {

    // User was evicted from the session upon a node crash
    console.warn('Your session has been closed due to a node crash!');

    // HERE THE CLIENT SHOULD RE-RUN THE PROCESS OF CONNECTING TO THE SESSION AS NORMAL.
    // THE SESSION SHOULD KEEP THE SAME IDENTIFIER.

  } else {

    // User left the session for any conventional reason
    console.log('You left the session!');

    // HERE THE CLIENT SHOULD DO WHATEVER IS NECESSARY UPON A NORMAL SESSION CLOSURE.

  }
});
```

Your application's backend can also receive the [`nodeCrashed`](reference-docs/openvidu-server-cdr/#nodecrashed) CDR event if you want. Listening to this CDR event is really not necessary for achieving fault tolerance and re-building sessions after a Media Node crash, but you can still use it for custom logic and monitoring purposes.

> If you want to see an example of an application that automatically reconnects users after a node crash, take a look to the simple [openvidu-high-availability](https://github.com/OpenVidu/openvidu-high-availability){:target="_blank"} tutorial.

<br>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js"></script>
<script>
  $().fancybox({
    selector : '[data-fancybox]',
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
