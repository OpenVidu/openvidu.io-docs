# Network quality

<div style="
    display: table;
    border: 2px solid #0088aa9e;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 30px;
    padding: 10px 0 5px 0;
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
This feature is part of <a href="openvidu-pro/" target="_blank"><strong>OpenVidu</strong><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin-left: 5px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span></a> tier.
</div>
</div>

One of the most important elements in real-time WebRTC connections is the network. It can have a huge impact in the quality of the media streams being transmitted. Usually we have control over the quality of the server-side network, but we don't have any guarantee about the network of the clients. For that reason, it is especially important to monitor and to be able to warn about network problems to our end users.

By making use of the WebRTC stats, OpenVidu offers a very simple API to monitor client-side network qualities and warn affected users. It allows to receive events in the application's client-side to notify users about their own network quality, as well as other user's network qualities. A common way of notifying this in the UI of the app is drawing a network icon, filling it for displaying good networks and emptying it for displaying poor networks.

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
    padding: 10px 0 5px 0;
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

To be able to receive the network quality events in your application's client-side, you must enable [OpenVidu Pro configuration property](reference-docs/openvidu-config/#configuration-parameters-for-openvidu-pro){:target="_blank"} `OPENVIDU_PRO_NETWORK_QUALITY`. You can also set the frequency with which OpenVidu Server Pro will check the network quality of each participant with property `OPENVIDU_PRO_NETWORK_QUALITY_INTERVAL`.

```yaml
OPENVIDU_PRO_NETWORK_QUALITY=true
OPENVIDU_PRO_NETWORK_QUALITY_INTERVAL=5
```

After that, you can start receiving network quality events in the application's client side by adding listener **networkQualityLevelChanged** to the [Session object](api/openvidu-browser/classes/session.html){:target="_blank"}. This listener is able to receive events of type [NetworkQualityLevelChangedEvent](api/openvidu-browser/classes/networkqualitylevelchangedevent.html){:target="_blank"}.

```javascript
session.on('networkQualityLevelChanged', event => {

    if (event.connection.connectionId === session.connection.connectionId) {
        console.log("This is my network quality level: " + event.qualityLevel);
        
        // Do stuff

    } else {
        console.log("Network quality level of connection " + event.connection.connectionId
            + " is " + event.qualityLevel);
        
        // Do stuff

    }
});
```

<br>

---

## Understanding the network quality result

The [NetworkQualityLevelChangedEvent](api/openvidu-browser/classes/networkqualitylevelchangedevent.html){:target="_blank"} provides in property `qualityLevel` a number between 0 and 5. The following table summarizes the meaning of those numbers:


<table class="table table-striped table-pricing" style="background: #e7e7e7">
    <thead>
        <tr>
            <th scope="col" style="background: #fff; border-bottom: 0px;">Network quality level</th>
            <th scope="col" style="border-bottom: 2px solid #005f76;">Meaning</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">0</th>
            <td>The network is <strong>broken</strong></td>
        </tr>
        <tr>
            <th scope="row">1</th>
            <td>The network is <strong>bad</strong></td>
        </tr>
        <tr>
            <th scope="row">2</th>
            <td>The network is <strong>poor</strong></td>
        </tr>
        <tr>
            <th scope="row">3</th>
            <td>The network is <strong>non optimal</strong></td>
        </tr>
        <tr>
            <th scope="row">4</th>
            <td>The network is <strong>good</strong></td>
        </tr>
        <tr>
            <th scope="row">5</th>
            <td>The network is <strong>excellent</strong></td>
        </tr>
    </tbody>
</table>

<br>

