# Automatic reconnection

Clients are able to automatically reconnect their media streams with OpenVidu after a network drop. To understand how this works, let's first differentiate between the two types of connections that any client has with OpenVidu:

- **Signaling plane**: this is the connection used by clients to send requests to OpenVidu (join a Session, publish a Stream...) and used by OpenVidu to send back to clients answers to those requests and one-way events.
- **Media plane**: this is the connection used by clients and OpenVidu to actually send and receive audio/video data flows.

Both connections live separately and use completely different communication protocols (WebSocket vs WebRTC). Once these concepts have been clarified, we can now explain which is the workflow once a client loses their network connection.

The moment the client detects that its connection with OpenVidu is broken, they will actively try to re-establish a connection with OpenVidu's signaling plane, and won't stop trying until success. So, after a client loses its network connection 1 of 3 things may happen depending on the amount of time elapsed (the time indicated in parentheses is roughly a guide):

<br>

##### 1) The client recovers its connection rather quickly _(0~7 seconds)_

Both the signaling plane and the media plane are fine. Nothing else must be done: the user is reconnected to the Session.

<br>

##### 2) The client recovers its connection too late _(> 12 seconds)_

OpenVidu thinks the client has disconnected with no chance of recovery and proceeds to kick him out of the Session. Once the user recovers their connection, they will receive a rejection message from OpenVidu. They are by all means no longer part of the Session, and they need to join it again as a new user. Every other participant of the Session will already have received the proper events with `reason` property set to `networkDisconnect`

- [streamDestroyed](api/openvidu-browser/classes/streamevent.html){:target="_blank"} event (only if the disconnected participant was publishing to the Session)
- [connectionDestroyed](api/openvidu-browser/classes/connectionevent.html){:target="_blank"} event

<br>

##### 3) The client recovers its connection soon enough to hold on the signaling plane but not the media plane _(7~12 seconds)_

This intermediate case is the only one that requires an actual active process of renegotiation between the client and OpenVidu. The client manages to recover its network connection soon enough that OpenVidu has not evicted it from the Session for lack of ping, but the media plane might be frozen depending on the amount of time elapsed.

In this case, the only solution is to renegotiate the whole media connections with OpenVidu. Clients will automatically do so: they analyze each one of the media connections that where established before the network dropped and for each one of them that is frozen, silently asks OpenVidu to fully recreate a new media connection, keeping the previous configuration. What clients perceive is that videos leave the frozen state and play again without having to do anything.

> **NOTE 1**: It should be stressed that this doesn't mean that the media plane will always be broken at this particular point: it is just one possibility that sometimes may happen depending on many factors: client's device, time elapsed, network topology..

<div></div>

> **NOTE 2**: In rare occasions the client-side may tell the media plane is OK, but it is actually frozen. OpenVidu gathers in the client side all of the available information to decide whether the connection is fully recovered or not (analyzing the ICE connection status), but under some unknown conditions this might not be enough. For this reason, openvidu-browser provides an advanced configuration option to always force the renegotiation of all the media streams established by a client after a network reconnection: [OpenViduAdvancedConfiguration.forceMediaReconnectionAfterNetworkDrop](api/openvidu-browser/interfaces/openviduadvancedconfiguration.html#forcemediareconnectionafternetworkdrop){:target="_blank"}. Developers can enable this option if in their particular use case are seeing this problem repeatedly.

<br>

---

## Reconnection events

To help managing the 3 scenarios of the previous section, the [Session](api/openvidu-browser/classes/session.html){:target="_blank"} object owned by the affected user will dispatch the following events during the reconnection process:

1. Event `reconnecting` is triggered once the client realizes its connection to OpenVidu is broken
2. Once the connection ir recovered:
    - If OpenVidu has not evicted the user yet, `reconnected` event is dispatched. Media streams may be renegotiated under the hood if necessary
    - If OpenVidu has evicted the user, [`sessionDisconnected`](api/openvidu-browser/classes/sessiondisconnectedevent.html){:target="_blank"} event is fired with reason set to `networkDisconnect`

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