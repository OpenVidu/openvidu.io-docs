# openvidu-ionic
<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-ionic-capacitor" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

An OpenVidu application built with **Ionic**. It uses **Capacitor** as hybrid app runtime and **Angular** as frontend framework. It can be compiled into a **native Android app**, a **native iOS app** and into a standard **web app**.

<div class="row">
    <div class="pro-gallery" style="margin: 20px 0 15px 0">
        <a data-fancybox="gallery-pro1" data-type="image" class="fancybox-img" href="img/tutorials/openvidu-ionic.png">
          <img class="img-responsive" style="margin: auto; max-height: 500px" src="img/tutorials/openvidu-ionic.png"/>
        </a>
    </div>
</div>

> If it is the first time you use OpenVidu, it is highly recommended to start with [openvidu-hello-world](tutorials/openvidu-hello-world/) tutorial, as this app is no more than an extension of it with some new features and styles.

## Running this tutorial

To run the tutorial you need the three components stated in [OpenVidu application architecture](developing-your-video-app/#openvidu-application-architecture): an OpenVidu deployment, your server application and your client application. In this order:

#### 1. Run OpenVidu deployment

Using [Docker Engine](https://docs.docker.com/engine/){:target="_blank"}:

```bash
# WARNING: this container is not suitable for production deployments of OpenVidu
# Visit https://docs.openvidu.io/en/stable/deployment

docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-server-kms:2.22.0
```

#### 2. Run your preferred server application sample

For more information visit [Application server](application-server/).

<div id="application-server-wrapper"></div>
<script src="js/load-common-template.js" data-pathToFile="server-application-samples.html" data-elementId="application-server-wrapper" data-runAnchorScript="false" data-useCurrentVersion="true"></script>

#### 3. Run the client application tutorial

You need [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm){:target="_blank"} and [Ionic](https://ionicframework.com/docs/intro/cli){:target="_blank"} to run the application. Check them with the following command:

```bash
npm -v
ionic -v
```

You can install Ionic CLI with NPM like this:

```
npm install -g @ionic/cli
```

Install application dependencies:

```bash
# Using the same repository openvidu-tutorials from step 2

cd openvidu-tutorials/openvidu-ionic
npm install
```

Now depending on the platform you want to run your app...

<br>

##### In the browser

```bash
# Path openvidu-tutorials/openvidu-ionic
ionic serve
```

Go to _[`http://localhost:8100`](http://localhost:8100){:target="_blank"}_ to test the app once the server is running. The first time you use the OpenVidu deployment docker container, an alert message will suggest you accept the self-signed certificate when joining an OpenVidu session for the first time.

To show the app with a mobile device appearance, open the dev tools in your browser. Find the button to adapt the viewport to a mobile device aspect ratio. You may also choose predefined types of devices to see the behavior of your app in different resolutions.

<div class="row no-margin row-gallery">
	<div class="col-md-6">
		<a data-fancybox="gallery" data-type="image" class="fancybox-img" href="img/demos/ionic-chrome1.png">
            <img class="img-responsive" src="img/demos/ionic-chrome1.png">
        </a>
	</div>
	<div class="col-md-6">
		<a data-fancybox="gallery" data-type="image" class="fancybox-img" href="img/demos/ionic-chrome2.png">
            <img class="img-responsive" src="img/demos/ionic-chrome2.png">
        </a>
	</div>
</div>

> If you are using **Windows**, read this **[FAQ](troubleshooting/#3-i-am-using-windows-to-run-the-tutorials-develop-my-app-anything-i-should-know)** to properly run the tutorial

> To learn **some tips** to develop with OpenVidu, check this **[FAQ](troubleshooting/#2-any-tips-to-make-easier-the-development-of-my-app-with-openvidu)**

<br>

##### In an Android device with native app

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
	This tutorial has been tested on Android 8.1, 9 and 10
</div>
</div>

To install the Android APK in your mobile device not only you need to have **Java**, **Android Studio** and **Android SDK** installed but also you have to set up the specific **environment variables**. Follow Ionic's [Android Development guide](https://ionicframework.com/docs/developing/android){:target="_blank"} to configure all the requirements.

After we have completed all the steps of the Ionic guide:

1. Connect the device to the same network as your PC

2. Now you need the IP of your development device in your LAN network, which we will use to configure OpenVidu deployment and your app. In Linux/OSX you can simply get it by running the following command on your shell (will probably output something like `192.168.1.19`)

        awk '/inet / && $2 != "127.0.0.1"{print $2}' <(ifconfig)

3. You need to configure OpenVidu deployment to use the IP of your LAN network. To do so, we need to re-launch the Docker container of the [first step](#1-run-openvidu-deployment), passing as public domain this IP. In the example below, that would be replacing `YOUR_OPENVIDU_IP` with the actual IP.

        # Stop any active OpenVidu deployment container
        docker rm -f $(docker ps -a | grep openvidu-server-kms | awk '{print $1}')

        # Run OpenVidu deployment container with new env variable
        # WARNING: this container is not suitable for production deployments of OpenVidu
        # Visit https://docs.openvidu.io/en/stable/deployment
        docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET -e DOMAIN_OR_PUBLIC_IP=YOUR_OPENVIDU_IP openvidu/openvidu-server-kms:2.22.0

4. You also need to configure the IP of your LAN network as the application server URL to be used by the Ionic application client. Set it in `OPENVIDU_SERVER_URL` variable [**right here**](https://github.com/OpenVidu/openvidu-tutorials/blob/master/openvidu-ionic/src/app/app.component.ts#L18){:target="_blank"}. The complete URL is `https://DOMAIN_OR_PUBLIC_IP:5000`, being DOMAIN_OR_PUBLIC_IP the IP address also configured in your OpenVidu deployment container in step 3. In this way, the Ionic application client will be able to communicate with your application server through your LAN network.

5. Connect the device to the PC. You must enable USB debugging and give permissions (check out [Set up an Android Device](https://ionicframework.com/docs/developing/android#set-up-an-android-device){:target="_blank"} in Ionic docs)

6. Run the tutorial. Capacitor provide us a special command to automatically open the Android code in your Android Studio:

        # In openvidu-tutorials/openvidu-ionic-capacitor
        npx cap open android

Or you can do it manually, opening the `openvidu-tutorials/openvidu-ionic/android` directory in your Android Studio.

<br>

##### In an iOS device with native app

The native platforms are included in **openvidu-ionic-capacitor**. You don't need to do any extra about this.

Capacitor provide us with a special command to automatically open the iOS app in Xcode:

```bash
# In openvidu-tutorials/openvidu-ionic-capacitor
npx cap open ios
```

You will need to sign your application in Xcode (opening folder _openvidu-ionic/platforms/ios_) with your developer team to avoid any errors. From Apple [official documentation](https://help.apple.com/xcode/mac/current/#/dev5a825a1ca){:target="_blank"}:

<p align="center">
  <img class="img-responsive xcode-img" style="padding: 25px 0; max-width: 750px" src="img/tutorials/xcode_sign.png">
</p>

<br>

<div class="row no-margin ">
	<div class="col-md-4 col-sm-4">
		<a data-fancybox="gallery2" data-type="image" class="fancybox-img" href="img/demos/ov-ionic1.png">
      <img class="img-responsive" src="img/demos/ov-ionic1.png">
    </a>
	</div>
	<div class="col-md-4 col-sm-4">
		<a data-fancybox="gallery2" data-type="image" class="fancybox-img" href="img/demos/ov-ionic2.png">
      <img class="img-responsive" src="img/demos/ov-ionic2.png">
    </a>
	</div>
    <div class="col-md-4 col-sm-4">
		<a data-fancybox="gallery2" data-type="image" class="fancybox-img" href="img/demos/ov-ionic3.png">
      <img class="img-responsive" src="img/demos/ov-ionic3.png">
    </a>
	</div>
</div>

<br>

## Understanding the code

See [Understanding the code](tutorials/openvidu-ionic/#understanding-the-code) section of **openvidu-ionic**.

## Android specific requirements

> The following configurations are already included in this **openvidu-ionic-cordova** project. You don't need to follow below instructions if you are using this tutorial as a starting point.

To handle camera and microphone permissions, we need to use the [Android Permissions](https://ionicframework.com/docs/native/android-permissions){:target="_blank"} plugin. Install it and use it just as indicated by the Ionic documentation.

We also need to request for media permissions adding these few lines in `/android/app/src/main/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
<uses-permission android:name="android.permission.INTERNET" />
```

## iOS specific requirements

> The following configurations are already included in this **openvidu-ionic-cordova** project. You don't need to follow below instructions if you are using this tutorial as a starting point.

We must to add the following lines to `ios/App/App/Info.plist` file for media permissions.

```xml
<key>NSCameraUsageDescription</key>
<string>This Application uses your camera to make video calls.</string>
<key>NSMicrophoneUsageDescription</key>
<string>This Application uses your microphone to make calls.</string>
```

<br>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js"></script>
<script type='text/javascript' src='js/fancybox-setup.js'></script>