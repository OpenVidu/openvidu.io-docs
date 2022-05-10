# Network quality

<div style="
    display: table;
    border: 2px solid #0088aa9e;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 30px;
    padding: 10px 0;
    background-color: rgba(0, 136, 170, 0.04);"><div style="display: table-cell; vertical-align: middle">
    <i class="icon ion-android-alert" style="
    font-size: 50px;
    color: #0088aa;
    display: inline-block;
    padding-left: 25%;
"></i></div>
<div style="
    vertical-align: middle;
    display: table-cell;
    padding-left: 20px;
    padding-right: 20px;
    ">
This feature is part of <a href="openvidu-pro/"><strong>OpenVidu</strong><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin-left: 5px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span></a> tier.
</div>
</div>

OpenVidu is able to estimate a **quality rating** of the client-side network connection, allowing you to monitor it through a very easy to use API. You can then use this information to tell users about how good or bad their own connection is, helping you manage user expectations around perceived drops in the quality of the service when their devices have a weak network link.

Having a strong network link is one of the most important aspects of a successful WebRTC connection. The problem is that modern networks are very complex systems, and can suffer from a myriad of issues that will have a huge impact in the quality of the media streams being transmitted. While you will typically be in control of your own server's network resources, and will make sure your connection is of a high enough quality, that won't be the case for end users using your application. For that reason, it is especially important to monitor and to be able to warn users about any network issues on their end.

<br>

<p>
    <img style="margin: auto;" class="img-responsive" src="img/docs/advanced-features/network-quality-process.png">
</p>

<br>

---

## Enabling the network quality API

<div style="
    display: table;
    border: 2px solid #0088aa9e;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 30px;
    padding: 10px 0;
    background-color: rgba(0, 136, 170, 0.04);"><div style="display: table-cell; vertical-align: middle">
    <i class="icon ion-android-alert" style="
    font-size: 50px;
    color: #0088aa;
    display: inline-block;
    padding-left: 25%;
"></i></div>
<div style="
    vertical-align: middle;
    display: table-cell;
    padding-left: 20px;
    padding-right: 20px;
    ">
OpenVidu network quality is only available for <strong>PUBLISHERS</strong>. You can only receive the network quality level for participants publishing a media stream. Participants that only receive remote streams will not generate network quality events.
</div>
</div>

To be able to receive the network quality events in your application's client-side, you must enable [OpenVidu Pro configuration property](reference-docs/openvidu-config/#configuration-parameters-for-openvidu-pro) `OPENVIDU_PRO_NETWORK_QUALITY`. You can also set the frequency with which OpenVidu Server Pro will check the network quality of each participant with property `OPENVIDU_PRO_NETWORK_QUALITY_INTERVAL`.

```properties
OPENVIDU_PRO_NETWORK_QUALITY=true
OPENVIDU_PRO_NETWORK_QUALITY_INTERVAL=5
```

After that, you can start receiving network quality events in the application's client side by adding listener **networkQualityLevelChanged** to the [Session object](api/openvidu-browser/classes/Session.html). This listener is able to receive events of type [NetworkQualityLevelChangedEvent](api/openvidu-browser/classes/NetworkQualityLevelChangedEvent.html).

```javascript
session.on('networkQualityLevelChanged', event => {

    if (event.connection.connectionId === session.connection.connectionId) {
        console.log("Now my network quality level is " + event.newValue + ". Before was " + event.oldValue);

        // Do stuff

    } else {
        console.log("Network quality level of connection " + event.connection.connectionId
            + " is " + event.newValue + ". Previous one was " + event.oldValue);

        // Do stuff

    }
});
```

<br>

---

## Understanding the network quality level

The [NetworkQualityLevelChangedEvent](api/openvidu-browser/classes/NetworkQualityLevelChangedEvent.html) provides a number between **0** and **5** in properties `newValue` and `oldValue` with the newest and previous value of the network quality level, respectively.

**The network quality level measures the strength of the network link, not the actual perception users will have of the video or audio**. This distinction is important to keep in mind: even in the face of a very bad network link, WebRTC contains very advanced mechanisms to try and adapt transmissions, but there is no guarantee that these mechanisms will be enough to provide a seamless experience. In the best case, nobody will notice and the video or audio streams will proceed with good quality as if nothing happened; otherwise, video and audio might suffer from choppiness, and overall quality degradation.

Because it is not possible to know ahead of time if the WebRTC adaptation mechanisms are going to overcome all the issues introduced by network hiccups or congestion, applications usually resort to showing an indicator that informs users about quality of their own network. Here are a couple ideas of how to deal with this:

* Displaying a "WiFi signal" style icon, that fills or empties according to the network quality level.
* Displaying a color-coded badge to match the network quality: green for a good network, yellow for a poor network, and red for a very bad network.

Here we provide a description of each network quality level, and *suggestions* about how an application might want to present this information to the user:

<table class="table table-striped table-info" style="background: #e7e7e7;">
    <thead>
        <tr>
            <th scope="col" style="background: #fff; border-bottom: 0px;">Network quality level</th>
            <th scope="col" style="border-bottom: 2px solid #005f76;">Meaning</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">5</th>
            <td>
                <p>
                    <strong>Excellent</strong> network.
                </p>
                <p>
                    This level is only shown under the very best conditions, typically over LAN or other networks where there is virtually no packet loss or jitter issues.
                </p>
                <p>
                    <i>User Interface</i>: Green status badge, or no status at all.
                </p>
            </td>
        </tr>
        <tr>
            <th scope="row">4</th>
            <td>
                <p>
                    <strong>Good</strong> network.
                </p>
                <p>
                    A good network link with low amount of packet loss. Perfect conditions for WebRTC.
                </p>
                <p>
                    <i>User Interface</i>: Green status badge, or no status at all.
                </p>
            </td>
        </tr>
        <tr>
            <th scope="row">3</th>
            <td>
                <p>
                    <strong>Non Optimal</strong> network.
                </p>
                <p>
                    Not ideal, with not too frequent bursts of packet loss. These occasional network issues will be avoided by the WebRTC adaptation mechanisms.
                </p>
                <p>
                    <i>User Interface</i>: Yellow status badge, or no status at all.
                </p>
            </td>
        </tr>
        <tr>
            <th scope="row">2</th>
            <td>
                <p>
                    <strong>Poor</strong> network.
                </p>
                <p>
                    There is a lot of packet loss, and the WebRTC adaptation mechanisms might not be enough to avoid all problems. As a result, media quality could be degraded.
                </p>
                <p>
                    <i>User Interface</i>: Orange status badge, suggesting to move to a better signal coverage area.
                </p>
            </td>
        </tr>
        <tr>
            <th scope="row">1</th>
            <td>
                <p>
                    <strong>Bad</strong> network.
                </p>
                <p>
                    The media will most probably suffer from very low quality and show interruptions or choppiness.
                </p>
                <p>
                    <i>User Interface</i>: Red status badge, warning the user that other participants could have difficulties seeing or hearing them.
                </p>
            </td>
        </tr>
        <tr>
            <th scope="row">0</th>
            <td>
                <p>
                    <strong>Broken</strong> network.
                </p>
                <p>
                    The user has been outright disconnected from OpenVidu. Note however that OpenVidu will try to reconnect, so it might still be possible that the user is able to join the session, if the network conditions improve.
                </p>
                <p>
                    <i>User Interface</i>: Red status badge, informing the user that their connection got temporarily interrupted.
                </p>
            </td>
        </tr>
    </tbody>
</table>

<br>
