# openvidu-ios

<div class="warningBoxContent">
  <div style="display: table-cell; vertical-align: middle;">
      <i class="icon ion-android-alert warningIcon"></i>
  </div>
  <div class="warningBoxText">
    <strong>openvidu-ios sample application is a paid feature</strong>. Contact us through <a href="https://openvidu.io/support#commercial" target="_blank">Commercial support</a> to get it
  </div>
</div>

A client-side only **iOS native** application built with **Swift** and using official **Google WebRTC library**.

If it is the first time you use OpenVidu, it is highly recommended to start first with **[openvidu-hello-world](tutorials/openvidu-hello-world/){:target="\_blank"}** tutorial due to this being a native iOS app and being a little more complex for OpenVidu starters.

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
	 OpenVidu does not provide an iOS client SDK yet, so this application directly implements <a href="developing/rpc/">OpenVidu Server RPC protocol</a>. In other words, it internally implements what <a target="_blank" href="reference-docs/openvidu-browser">openvidu-browser</a> library does. Everything about this implementation is explained in section <a href="#using-openvidu-server-rpc-protocol">Using OpenVidu Server RPC protocol</a>
</div>
</div>


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



## Understanding this tutorial


<p align="center">
  <img class="img-responsive" src="img/tutorials/openvidu-iOS.png">
</p>

OpenVidu is composed by the three modules displayed on the image above in its insecure version.

-   **openvidu-ios**: iOS application built with Swift connected to OpenVidu through websocket
-   **openvidu-server**: Java application that controls Kurento Media Server
-   **Kurento Media Server**: server that handles low level operations of media flow transmissions

## Running this tutorial

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
	 This tutorial has been tested using Xcode 12, iPhone 7 and 7 Plus devices (iOS 14).
</div>
</div>

To run the iOS app you need **Xcode** and an **iOS device**.
You can download Xcode [here](https://developer.apple.com/xcode/){:target="_blank"}.

After we have set up Xcode we must continue with the following commands:

**1)** Install dependencies under `./openvidu-ios/openvidu-ios`

```bash
pod update
pod install
```

**2)** Open **Xcode** and import the project _(openvidu-ios.xcworkspace)_

**3)** By default, this app is pointing to our demo server _(https://demos.openvidu.io)_. You can change the **OPENVIDU_URL** value in `openvidu-ios/openvidu-ios/constants/JSONConstants.swift`. If you want to set and launch OpenVidu locally, continue with point 4. If you don't, go to point 8.

**4)** Now you need the IP of your PC in your LAN network, which we will use in points 5) and 6) to configure OpenVidu Server and your app. In Linux/OSX you can simply get it by running the following command on your shell (will probably output something like `192.168.1.111`)


```console
awk '/inet / && $2 != "127.0.0.1"{print $2}' <(ifconfig)
```

**5)** OpenVidu Server must be up and running in your development machine. The easiest way is running this Docker container which wraps both of them (you will need [Docker CE](https://store.docker.com/search?type=edition&offering=community){:target="\_blank"}). Set property `DOMAIN_OR_PUBLIC_IP` to the IP we just got in point 4). In the example below that would be replacing `-e DOMAIN_OR_PUBLIC_IP=YOUR_OPENVIDU_IP` to `-e DOMAIN_OR_PUBLIC_IP=192.168.1.111`

```bash
# WARNING: this container is not suitable for production deployments of OpenVidu Platform
# Visit https://docs.openvidu.io/en/stable/deployment

docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET -e DOMAIN_OR_PUBLIC_IP=YOUR_OPENVIDU_IP openvidu/openvidu-server-kms:2.22.0
```

**6)** In Xcode Studio, you must also indicate the OpenVidu Server URL to the app. Check the point 3.

**7)** Connect the device to the same network as your PC.

**8)** Connect the device to the PC. You will need to sign your application in Xcode with your developer team to avoid any errors. From [Apple official documentation](https://help.apple.com/xcode/mac/current/#/dev5a825a1ca).


**9)** Run the tutorial. In Xcode, click on the Play button after selecting your connected device.
