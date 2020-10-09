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
This feature is part of <a href="openvidu-pro/"><strong>OpenVidu</strong><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin-left: 5px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span></a> tier.
</div>
</div>

## What's the network quality

One of the most important elements of a videconference based on WebRTC is the network. It has a huge impact in our virtual meetings quality experience because of having an unstable network may reduce the quality and efficiency of the videoconference. For that reason, it's highly recommend have a good network and monitoring its stability.

Making use of the WebRTC stats, the OpenVidu team has been capable to extract the network quality level in a very simple way and provide to the OpenVidu users an efficient way to monitoring their network in a blink of an eye.

<br>

<p>
    <img style="margin: auto;" class="img-responsive" src="img/docs/advanced-features/network-quality-process.png">
</p>


## How to use the network quality API

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
OpenVidu network quality is only available for <strong>PUBLISHERS</strong>. What that means is that you only can receive the network quality level for participants that publish media.
</div>
</div>

#### Supported platforms

Network quality is not supported for all platform supported by OpenVidu. This is because in some platforms, the webRTC stats received are very limited and we can't calculate the network quality level from them.

The following table shows which platform provide us the enough statistics to calculate the network quality level:

<table class="table table-striped table-pricing" style="background: #e7e7e7">
    <thead>
        <tr>
            <th scope="col" style="background: #fff; border-bottom: 0px;">Platform</th>
            <th scope="col" style="border-bottom: 2px solid #005f76;">Network Quality API</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">Chrome</th>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
        </tr>
        <tr>
            <th scope="row">Safari</th>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
        </tr>
        <tr>
            <th scope="row">Firefox</th>
            <td><i class="icon ion-close pricing-table-icon"></i></td>
        </tr>
        <tr>
            <th scope="row">Edge</th>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
        </tr>
        <tr>
            <th scope="row">Opera</th>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
        </tr>
        <tr>
            <th scope="row">Electron</th>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
        </tr>
        <tr>
            <th scope="row">Samsung Mobile</th>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
        </tr>
        <tr>
            <th scope="row">Ionic (Android)</th>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
        </tr>
        <tr>
            <th scope="row">Ionic (iOS)</th>
            <td><i class="icon ion-close pricing-table-icon"></i></td>
        </tr>
        <tr>
            <th scope="row">React Native</th>
            <td><i class="icon ion-close pricing-table-icon"></i></td>
        </tr>
    </tbody>
</table>

#### Get the network quality level

After see the compatibility table above, you can use the network quality API of a very simple way.

To be able of get the network quality level in your client app, you need enable the `OPENVIDU_PRO_NETWORK_QUALITY` property in your [OpenVidu Pro configuration](openvidu-pro/reference-docs/openvidu-pro-config/){:target="_blank"} and set the frequency of time that you want OpenVidu to check your network.

The default networ quality values are the following:

```yaml
OPENVIDU_PRO_NETWORK_QUALITY=false
OPENVIDU_PRO_NETWORK_QUALITY_INTERVAL=5
```

After that, you only have to listen the **networkQualityChanged** events in your client app as bellow:

```javascript
session.on('networkQualityLevelChanged', (event) => {
    console.log("Network quality has changed", event.qualityLevel);
});
```

## How to understand the network quality result

The network quality event will return a quality level number (`qualityLevel` *from 0 to 5*). You can check the following easy table to know the meaning of this numbers:


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
            <td>The network is broken</td>
        </tr>
        <tr>
            <th scope="row">1</th>
            <td>The network is bad</td>
        </tr>
        <tr>
            <th scope="row">2</th>
            <td>The network is poor</td>
        </tr>
        <tr>
            <th scope="row">3</th>
            <td>Network is non optimal</td>
        </tr>
        <tr>
            <th scope="row">4</th>
            <td>The network is good</td>
        </tr>
        <tr>
            <th scope="row">5</th>
            <td>The network is excellent</td>
        </tr>
    </tbody>
</table>

<br>

