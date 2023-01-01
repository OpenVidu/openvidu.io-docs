# openvidu-ios

<div class="warningBoxContent">
  <div style="display: table-cell; vertical-align: middle;">
      <i class="icon ion-android-alert warningIcon"></i>
  </div>
  <div class="warningBoxText">
    <strong>openvidu-ios sample application is a paid feature</strong>. Contact us through <a href="https://openvidu.io/support#commercial" target="_blank">Commercial support</a> to get it
  </div>
</div>

An **iOS native** OpenVidu application built with **Swift** using official **Google WebRTC library**.

<div style="
    display: table;
    border: 2px solid #0088aa9e;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 25px;
    padding: 5px 0 5px 0;
    background-color: rgba(0, 136, 170, 0.04);"><div style="display: table-cell; vertical-align: middle;">
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
	 OpenVidu does not provide an iOS client SDK yet, so this application directly implements <a href="developing/rpc/">OpenVidu Server RPC protocol</a>. In other words, it internally implements what <a target="_blank" href="reference-docs/openvidu-browser">openvidu-browser</a> library does
</div>
</div>

<div class="row">
    <div class="pro-gallery" style="margin: 20px 0 15px 0">
        <a data-fancybox="gallery-pro1" data-type="image" class="fancybox-img" href="img/tutorials/openvidu-iOS.png">
          <img class="img-responsive" style="margin: auto; max-height: 500px" src="img/tutorials/openvidu-iOS.png"/>
        </a>
    </div>
</div>

> If it is the first time you use OpenVidu, it is highly recommended to start first with [openvidu-hello-world](tutorials/openvidu-hello-world/) tutorial due to this being a native iOS app and being a little more complex for OpenVidu beginners.

## openvidu-ios features

<table class="table table-striped table-pricing" style="background: #e7e7e7">
    <thead>
        <tr>
            <th scope="col" style="background: #fff; border-bottom: 0px;">Feature</th>
            <th scope="col" style="border-bottom: 2px solid #005f76;">Enable</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td scope="row"><strong>OpenVidu compatibility</strong></td>
            <td> from <strong>2.15.0</strong></td>
        </tr>
        <tr>
            <td scope="row"><strong>Latest iOS versions</strong></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
        </tr>
        <tr>
            <td scope="row"><strong>OpenVidu RPC protocol</strong></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
        </tr>
        <tr>
            <td scope="row"><strong>Mute / Unmute video</strong></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
        </tr>
        <tr>
            <td scope="row"><strong>Mute / Unmute audio</strong></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
        </tr>
        <tr>
            <td scope="row"><strong>Toggle speaker / headset</strong></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
        </tr>
        <tr>
            <td scope="row"><strong>Subscribe / unsubscribe stream</strong></td>
            <td><i class="icon ion-checkmark pricing-table-icon"></i></td>
        </tr>
    </tbody>
</table>

## Running this tutorial

To run the iOS app you need a **Mac device** with **Xcode** installed and an **iOS device**. You can download Xcode [here](https://developer.apple.com/xcode/){:target="_blank"}.

After we have set Xcode up, we need the three components stated in [OpenVidu application architecture](developing-your-video-app/#openvidu-application-architecture): an OpenVidu deployment, your server application and your client application. To facilitate the first execution of the tutorial, it is configured by default to use the official OpenVidu demos ([demos.openvidu.io](https://demos.openvidu.io){:target="_blank"}), so both the OpenVidu deployment and the server application are provided. We just need to run the client application (i.e., openvidu-ios app):

1. Install dependencies under `./openvidu-ios/openvidu-ios`

        pod update
        pod install

2. Open Xcode and import the project _(openvidu-ios.xcworkspace)_

3. Run the application in your device. Check out [official Xcode docs](https://developer.apple.com/documentation/xcode/running-your-app-in-simulator-or-on-a-device){:target="_blank"}.

> **WARNING**: the OpenVidu demos deployment is not secure and is only intended for a first quick test. Anyone could access to your video sessions. To run the tutorial in your own network, see [Running this tutorial in your network](#running-this-tutorial-in-your-network)


<div class="row no-margin row-gallery">
	<div class="col-md-12">
		<a data-fancybox="gallery" data-type="image" class="fancybox-img" href="img/demos/ov-ios.png">
            <img class="img-responsive" src="img/demos/ov-ios.png">
        </a>
	</div>
</div>

### Running this tutorial in your network

Real Android and iOS devices will require a valid SSL certificate in your OpenVidu deployment to work. By default openvidu-ios tutorial uses the official demos OpenVidu deployment ([demos.openvidu.io](https://demos.openvidu.io){:target="_blank"}), so you can quickly test the app without having to worry about this.

But this OpenVidu deployment is not secure and anyone could access your video sessions. At some point you will need one of two things to securely develop your application:

1. A real OpenVidu deployment with a valid domin name and SSL certificate.
2. A local OpenVidu deployment available in your LAN network with a valid self-signed SSL certificate.

Option 1 just requires to follow the official [deployment instructions](deployment/). For option 2, follow the instructions explained in this **[FAQ](troubleshooting/#3-test-applications-in-my-network-with-multiple-devices)**. In that way we will have the OpenVidu deployment and our server application accessible through our LAN network using a single IP, port and SSL certificate.

Either way, remember to configure your new application server URL in the iOS app. You can do that on file `openvidu-ios/openvidu-ios/constants/JSONConstants.swift`. The value of `APPLICATION_SERVER_URL` must be the URL of your application server.

<br>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js"></script>
<script type='text/javascript' src='js/fancybox-setup.js'></script>