# Automatic reconnection

- **[Signaling plane breaks](#signaling-plane-breaks)**
    - [Reconnection events](#reconnection-events)
- **[Media plane breaks](#media-plane-breaks)**

<br>

---

<br>

Clients are able to automatically reconnect their media streams with OpenVidu after a network drop. To understand how this works, let's first differentiate between the two types of connections that any client has with OpenVidu:

- **Signaling plane**: this is the connection used by clients to send requests to OpenVidu (join a Session, publish a Stream...) and used by OpenVidu to send back to clients answers to those requests and one-way events.
- **Media plane**: this is the connection used by clients and OpenVidu to actually send and receive audio/video data flows.

Both connections live separately and use completely different communication protocols (WebSocket vs WebRTC). Both connections can potentially break independently, although probably the most common case is a simultaneous drop of both connections, when the client undergoes a disconnection to the Internet.

Once these concepts have been clarified, we can now explain which is the workflow once a client connection breaks.

<br>

---

## Signaling plane breaks

The moment the client detects that its signaling connection with OpenVidu is broken, they will actively try to reconnect it and won't stop trying until success. So, after a client loses signaling connection 1 of 3 things may happen depending on the amount of time elapsed (the time indicated in parentheses is roughly a guide):

<br>

##### 1) The client recovers its signaling connection rather quickly _(0~7 seconds)_

Both the signaling plane and the media plane are fine. Nothing else must be done: the user is reconnected to the Session.

<br>

##### 2) The client recovers its signaling connection too late _(> 12 seconds)_

OpenVidu thinks the client has disconnected with no chance of recovery and proceeds to kick him out of the Session. Once the user recovers their connection, they will receive a rejection message from OpenVidu. They are by all means no longer part of the Session, and they need to join it again as a new user. 

The affected participant will trigger the appropriate events with reason property set to `networkDisconnect`:

- [streamDestroyed](api/openvidu-browser/classes/StreamEvent.html){:target="_blank"} event triggered by the [Publisher](api/openvidu-browser/classes/Publisher.html){:target="_blank"} object, if the affected participant was publishing to the Session.
- [sessionDisconnected](api/openvidu-browser/classes/SessionDisconnectedEvent.html){:target="_blank"} event.

Every other participant of the Session will already have received the proper events with `reason` property set to `networkDisconnect`:

- [streamDestroyed](api/openvidu-browser/classes/StreamEvent.html){:target="_blank"} event triggered by the [Session](api/openvidu-browser/classes/Session.html){:target="_blank"} object, if the disconnected participant was publishing to the Session.
- [connectionDestroyed](api/openvidu-browser/classes/ConnectionEvent.html){:target="_blank"} event.

<br>

##### 3) The client recovers its signaling connection soon enough but the media connection gets affected _(7~12 seconds)_

This intermediate case is the only one that requires an actual active process of renegotiation between the client and OpenVidu. The client manages to recover its network connection soon enough that OpenVidu has not evicted it from the Session for lack of ping, but the media plane might be frozen depending on the amount of time elapsed.

In this case, the only solution is to renegotiate the whole media connections with OpenVidu. Clients will automatically do so: they analyze each one of the media connections that where established before the network dropped and for each one of them that is frozen, silently asks OpenVidu to fully recreate a new media connection, keeping the previous configuration. What clients perceive is that videos leave the frozen state and play again without having to do anything.

> **NOTE 1**: It should be stressed that this doesn't mean that the media plane will always be broken at this particular point: it is just one possibility that sometimes may happen depending on many factors: client's device, time elapsed, network topology..

<div></div>

> **NOTE 2**: In rare occasions the client-side may tell the media plane is OK, but it is actually frozen. OpenVidu gathers in the client side all of the available information to decide whether the connection is fully recovered or not (analyzing the ICE connection status), but under some unknown conditions this might not be enough. For this reason, openvidu-browser provides an advanced configuration option to always force the renegotiation of all the media streams established by a client after a network reconnection: [OpenViduAdvancedConfiguration.forceMediaReconnectionAfterNetworkDrop](api/openvidu-browser/interfaces/OpenViduAdvancedConfiguration.html#forceMediaReconnectionAfterNetworkDrop){:target="_blank"}. Developers can enable this option if in their particular use case are seeing this problem repeatedly.

### Reconnection events

To help managing disconnections in the signaling plane, the [Session](api/openvidu-browser/classes/Session.html){:target="_blank"} object owned by the affected user will dispatch the following events during the reconnection process:

1. Event `reconnecting` is triggered once the client realizes its signaling connection to OpenVidu is broken.
2. Once the connection is recovered:
    - If OpenVidu has not evicted the user yet, `reconnected` event is dispatched. Media streams may be renegotiated under the hood if necessary.
    - If OpenVidu has evicted the user, [`sessionDisconnected`](api/openvidu-browser/classes/SessionDisconnectedEvent.html){:target="_blank"} event is fired with reason set to `networkDisconnect`.

```javascript
session.on('reconnecting', () => console.warn('Oops! Trying to reconnect to the session'));
session.on('reconnected', () => console.log('Hurray! You successfully reconnected to the session'));
session.on('sessionDisconnected', (event) => {
    if (event.reason === 'networkDisconnect') {
        console.warn('Dang-it... You lost your connection to the session');
    } else {
        // Disconnected from the session for other reason than a network drop
    }
});
```

<br>

---

## Media plane breaks

It is possible that a client loses its media connection with OpenVidu while maintaining a healthy connection in the signaling plane. WebRTC connections are somewhat more delicate than WebSocket connections, and it is possible under unstable Internet conditions that media freezes while the signaling remains active.

Luckily, openvidu-browser SDK is able to detect these situations in the client side and automatically reconnect the affected media connections in the background. Broken media connections are detected through changes in the [ICE connection state](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/iceConnectionState){:target="_blank"} of WebRTC connections:

- If a media connection enters `failed` ICE connection state, then the reconnection process is triggered immediately.
- If a media connection enters `disconnected` ICE connection state, then a short timeout is started to give the connection time to return to a valid state. If this timeout elapses and the media connection is still broken, then the reconnection process is triggered.

These two situations can be detected with the [ExceptionEvent](api/openvidu-browser/classes/ExceptionEvent.html){:target="_blank"} triggered by the [Session](api/openvidu-browser/classes/Session.html){:target="_blank"} object.

```javascript
session.on('exception', (event) => {
    if (event.name === 'ICE_CONNECTION_FAILED') {
        var stream = event.origin;
        console.warn('Stream ' + stream.streamId + ' broke!');
        console.warn('Reconnection process automatically started');
    }
    if (event.name === 'ICE_CONNECTION_DISCONNECTED') {
        var stream = event.origin;
        console.warn('Stream ' + stream.streamId + ' disconnected!');
        console.warn('Giving it some time to be restored. If not possible, reconnection process will start');
    }
});
```

In case of an ExceptionEvent of name `ICE_CONNECTION_DISCONNECTED`, you can customize the amount of time that openvidu-browser grants to media connections to restore on their own before triggering the reconnection process. To do so change property `iceConnectionDisconnectedExceptionTimeout` of [OpenViduAdvancedConfiguration](api/openvidu-browser/interfaces/OpenViduAdvancedConfiguration.html#iceConnectionDisconnectedExceptionTimeout){:target="_blank"}.

> **NOTE**: this automatic media reconnection feature is subject to the health of the signaling connection. Only applies to media connections that break while the signaling connection is still alive. If media connections break but the signaling connection also breaks (for example, after an Internet network drop), then everything explained in section [Signaling plane breaks](#signaling-plane-breaks) comes into play instead.

<br>