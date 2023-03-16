# openvidu-ionic-cordova
<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-ionic-cordova" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

An OpenVidu application built with **Ionic**. It uses **Cordova** as hybrid app runtime and **Angular** as frontend framework. It can be compiled into a **native Android app**, a **native iOS app** and into a standard **web app**.

<div class="row">
    <div class="pro-gallery" style="margin: 20px 0 15px 0">
        <a data-fancybox="gallery-pro1" data-type="image" class="fancybox-img" href="img/tutorials/openvidu-ionic.png">
          <img class="img-responsive" style="margin: auto; max-height: 500px" src="img/tutorials/openvidu-ionic.png"/>
        </a>
    </div>
</div>

> If it is the first time you use OpenVidu, it is highly recommended to start with [openvidu-hello-world](tutorials/openvidu-hello-world/) tutorial, as this app is no more than an extension of it with some new features and styles.

<div class="warningBoxContent">
  <div style="display: table-cell; vertical-align: middle;">
      <i class="icon ion-android-alert warningIcon"></i>
  </div>
  <div class="warningBoxText">
    This Ionic tutorial is exactly the same than <a href="tutorials/openvidu-ionic/">openvidu-ionic</a> tutorial but using <a href="https://cordova.apache.org/">Cordova</a> instead of Capacitor as hybrid app runtime.
  </div>
</div>

## Running this tutorial

To run the tutorial you need the three components stated in [OpenVidu application architecture](developing-your-video-app/#openvidu-application-architecture): an OpenVidu deployment, your server application and your client application. In this order:

#### 1. Run OpenVidu deployment

Using [Docker Engine](https://docs.docker.com/engine/){:target="_blank"}:

```bash
# WARNING: this container is not suitable for production deployments of OpenVidu
# Visit https://docs.openvidu.io/en/stable/deployment

docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-dev:2.26.0
```

#### 2. Run your preferred server application sample

For more information visit [Application server](application-server/).

<div id="application-server-wrapper"></div>
<script src="js/load-common-template.js" data-pathToFile="server-application-samples.html" data-elementId="application-server-wrapper" data-runAnchorScript="false" data-useCurrentVersion="true"></script>

#### 3. Run the client application tutorial

You need [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm){:target="_blank"}, [Ionic](https://ionicframework.com/docs/intro/cli){:target="_blank"} and [Cordova](https://cordova.apache.org/docs/en/latest/guide/cli/){:target="_blank"} to run the application. Check them with the following command:

```bash
npm -v
ionic -v
cordova -v
```

You can install Ionic and Cordova CLIs with NPM like this:

```
npm install --location=global @ionic/cli
npm install --location=global cordova
```

Install application dependencies:

```bash
# Using the same repository openvidu-tutorials from step 2

cd openvidu-tutorials/openvidu-ionic-cordova
npm install
```

Now depending on the platform you want to run your app...

<br>

##### In the browser as a web application

```bash
# Path openvidu-tutorials/openvidu-ionic-cordova
ionic serve
```

Go to [`http://localhost:8100`](http://localhost:8100){:target="_blank"} to test the app once the server is running.

To show the app with a mobile device appearance, open the dev tools in your browser. Find the button to adapt the viewport to a mobile device aspect ratio. You may also choose predefined types of devices to see the behavior of your app in different resolutions.

> To test the application with other devices in your network, visit this **[FAQ](troubleshooting/#3-test-applications-in-my-network-with-multiple-devices)**

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

<br>

##### In a mobile device as a native application

Real Android and iOS devices will require a valid SSL certificate in your OpenVidu deployment to work. By default openvidu-ionic-cordova tutorial uses the official demos OpenVidu deployment ([demos.openvidu.io](https://demos.openvidu.io)), so you can quickly test the app without having to worry about this.

But this OpenVidu deployment is not secure and anyone could access your video sessions. At some point you will need one of two things to securely develop your Ionic application:

1. A real OpenVidu deployment with a valid domin name and SSL certificate.
2. A local OpenVidu deployment available in your LAN network with a valid self-signed SSL certificate.

Option 1 just requires to follow the official [deployment instructions](deployment/). For option 2, after running the [steps described above](#running-this-tutorial), we must follow the instructions explained in this **[FAQ](troubleshooting/#3-test-applications-in-my-network-with-multiple-devices)**. In that way we will have the OpenVidu deployment and our server application accessible through our LAN network using a single IP, port and SSL certificate.

Whatever option you choose, once you have your development OpenVidu setup available through a valid SSL certificate, you can proceed to run the app on Android or iOS:<br><br>

###### Android

Follow the [Ionic official instructions](https://ionicframework.com/docs/developing/android){:target="_blank"} to run the app in your Android device with **Cordova**. You will have to install Android Studio and run some commands.

###### iOS

Follow the [Ionic official instructions](https://ionicframework.com/docs/developing/ios){:target="_blank"} to run the app in your iOS device with **Cordova**. You will have to install Xcode, sign the application and run some commands.

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

The code of openvidu-ionic-cordova application is exactly the same as in [openvidu-ionic](tutorials/openvidu-ionic/#understanding-the-code) tutorial. Take a look at that section to understand the code in more depth.

<br>

## Android specific requirements

> The following configurations are already included in this **openvidu-ionic-cordova** project. You don't need to follow below instructions if you are using this tutorial as a starting point.

To handle camera and microphone permissions, we need to use the [Android Permissions](https://ionicframework.com/docs/native/android-permissions){:target="_blank"} plugin. Install it and use it just as indicated by the Ionic documentation.

We also need to request for media permissions in `config.xml`, found in `root` directory. These permissions must be included inside of `<platform name="android">` ([example](https://github.com/OpenVidu/openvidu-tutorials/blob/master/openvidu-ionic-cordova/config.xml){:target="_blank"})

```xml
<config-file mode="merge" parent="/*" target="AndroidManifest.xml">
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.RECORD_AUDIO" />
    <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
</config-file>
```

Moreover, you must add `xmlns:android="http://schemas.android.com/apk/res/android"` to the end of the opening `widget` node.

```xml
<widget id="io.openvidu.sampleios" version="2.6.0" xmlns="http://www.w3.org/ns/widgets" xmlns:android="http://schemas.android.com/apk/res/android" xmlns:cdv="http://cordova.apache.org/ns/1.0">
    ...
</widget>
```

Once these changes are added to our code, the app will be ready to run on our Android phone.

<br>

## iOS specific requirements

After 14.3 release, iOS brings WebRTC support on the [WKWebview](https://ionicframework.com/docs/wkwebview/){:target="_blank"}, which means we can develop our Ionic applications without using any third-party library (in the past it was necessary to use [cordova-plugin-iosrtc](https://github.com/BasqueVoIPMafia/cordova-plugin-iosrtc){:target="_blank"}).

Knowing this, we still have to configure a number of elements such as media permissions:

### Configuration requirements

1) Add the following lines to `config.xml` file under ios platform:

```xml
<platform name="ios">
    ...
    <hook src="hooks/iosrtc-swift-support.js" type="after_platform_add" />
    <config-file parent="NSCameraUsageDescription" target="*-Info.plist">
        <string>OpenVidu needs access to your camera</string>
    </config-file>
    <config-file parent="NSContactsUsageDescription" target="*-Info.plist">
        <string>OpenVidu needs access to contacts</string>
    </config-file>
    <config-file parent="NSMicrophoneUsageDescription" target="*-Info.plist">
        <string>OpenVidu needs access to your microphone</string>
    </config-file>
    ...
</platform>
```

2) Add the following preference to the `config.xml` to allow inline media playback of video elements:

```xml
<preference name="AllowInlineMediaPlayback" value="true" />
```

3) Add this optional dependency to your `package.json`. Don't forget to run `npm install` after that to actually install it:

```json
"optionalDependencies": {
    "ios-deploy": "1.9.4"
}
```

4) Finally remove and reinstall ios platform:

```bash
ionic cordova platform remove ios
ionic cordova platform add ios
```

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js"></script>
<script type='text/javascript' src='js/fancybox-setup.js'></script>