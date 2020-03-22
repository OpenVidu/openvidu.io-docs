# openvidu-call-ionic
<a href="https://github.com/OpenVidu/openvidu-call-ionic" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

OpenVidu Call Ionic demo, built with <strong>Ionic v4 and Angular 8</strong>,  allows users to make videoconference calls in theirs devices with many of the capabilities integrated by OpenVidu platform. It is a frontend-only application.

OpenVidu-Call-Ionic is composed by the five Angular components displayed in the image below.

<div style="
    display: table;
    border: 2px solid #ffb600;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    background-color: #FFFBF1;
    margin-bottom: 25px;
    padding: 5px 0 5px 0;"><div style="display: table-cell; vertical-align: middle;">
    <i class="icon ion-android-alert" style="
    font-size: 50px;
    color: #ffb600;
    display: inline-block;
    padding-left: 25%;
"></i></div>
<div style="
    vertical-align: middle;
    display: table-cell;
    padding: 10px 20px;">
    Android 5 (Lollipop) and 6 (Marshmallow) will not work with Ionic v4 until <a href="https://github.com/ionic-team/ionic/issues/15438#issuecomment-426686443" target="_blank">this issue</a> is properly solved
</div>
</div>


<br>
<p align="center">
  <img  class="img-responsive" src="img/demos/openvidu-call-ionic-diagram.png">
</p>

<hr>

## Running this demo


#### Using the browser

1) Clone the repo:

```bash
git clone https://github.com/OpenVidu/openvidu-call-ionic.git
```

2) You will need ionic-cli (and of course node 8.9 or greater) to serve the Ionic app. You can install it with the following command:

```bash
npm install -g ionic@latest
```

3) Run the tutorial:

```bash
cd openvidu-call-ionic
npm install
ionic serve
```

4) _openvidu-server_ and _Kurento Media Server_ must be up and running in your development machine. The easiest way is running this Docker container which wraps both of them (you will need [Docker CE](https://store.docker.com/search?type=edition&offering=community){:target="_blank"}):

```bash
docker run -p 4443:4443 --rm -e openvidu.secret=MY_SECRET openvidu/openvidu-server-kms:2.12.0
```

5) Go to _[`localhost:8100`](http://localhost:8100){:target="_blank"}_ to test the app once the server is running. The first time you use the docker container, an alert message will suggest you accept the self-signed certificate of _openvidu-server_ when you first try to join a video-call.

6) To show the app with the device appearance, press `F12` button in your keyboard and the browser DevTool will be opened.

7) Then, you can find a button with a device icon at the top of the browser page. Pressing this button, you should see the device appearance and it will allow you choose your favourite device.

<div class="row no-margin row-gallery">
	<div class="col-md-6">
		<a data-fancybox="gallery" href="img/demos/ov-call-ionic-browser.png">
		<img class="img-responsive" src="img/demos/ov-call-ionic-browser.png">
	</a>
	</div>
	<div class="col-md-6">
		<a data-fancybox="gallery" href="img/demos/ov-call-ionic-browser2.png">
		<img class="img-responsive" src="img/demos/ov-call-ionic-browser2.png">
	</a>
	</div>
</div>


> If you are using **Windows**, read this **[FAQ](troubleshooting/#3-i-am-using-windows-to-run-the-tutorials-develop-my-app-anything-i-should-know){:target="_blank"}** to properly run the tutorial

> To learn **some tips** to develop with OpenVidu, check this **[FAQ](troubleshooting/#2-any-tips-to-make-easier-the-development-of-my-app-with-openvidu){:target="_blank"}**


#### Using the Android apk in an Android device


To deploy the apk Android not only you need to have **Java JDK8**, **Android Studio** and **Android SDK** installed but also you have to set up the specific **environment variables**. Fortunately, Ionic provide us a [great guide](https://beta.ionicframework.com/docs/installation/android){:target="_blank"} to allows us to configure step by step all the requirements.

After we have completed all the steps of the Ionic guide and performed steps 1) and 2) stated above, we must continue with the following commands:

3) Connect the device to the same network as the PC. 

4) Establishing the same WIFI in both devices, you need to know IP of your PC in the network. For know that, you can execute `ifconfig` in your command shell and you will can find something like `192.168.0.105`.

Your `public_url` will be `https://192.168.0.105` with the port `4443` (https://192.168.0.105:4443). 

Finally, you will must set the `OPENVIDU_SERVER_URL` variable [in the app](https://github.com/OpenVidu/openvidu-call-ionic/blob/180f4577a0be9ae9c83170ff9684ded2e40c0808/src/app/shared/services/openvidu.service.ts#L11){:target="_blank"} and the `openvidu.publicurl` parameter used to run *openvidu-server* with your *public_url* and the *port*. 


5) _openvidu-server_ and _Kurento Media Server_ must be up and running in your development machine. The easiest way is running this Docker container which wraps both of them (you will need [Docker CE](https://store.docker.com/search?type=edition&offering=community){:target="_blank"}):

```bash
docker run -p 4443:4443 --rm -e openvidu.secret=MY_SECRET -e openvidu.publicurl="your_public_url":4443 openvidu/openvidu-server-kms:2.12.0
```

6) Connect the device to the PC. You can check if your device is authoriced with the `adb devices` command.

7) Run the tutorial:

```bash
cd openvidu-call-ionic
npm install
ionic cordova run android
```

<div style="
    display: table;
    border: 1px solid #ffb600;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    background-color: #FFFBF1;
    margin-bottom: 25px;
    padding: 5px 0 5px 0;"><div style="display: table-cell; vertical-align: middle;">
    <i class="icon ion-android-alert" style="
    font-size: 50px;
    color: #ffb600;
    display: inline-block;
    padding-left: 25%;
"></i></div>
<div style="
    vertical-align: middle;
    display: table-cell;
    padding-left: 20px;
    padding-right: 20px;
    ">
    To deploy apps to an Android device and debug them, developer mode must be enabled and allow for USB debugging turned on. Check out <a href="https://developer.android.com/studio/debug/dev-options#enable" target="blank">these instructions</a> to do this on a device.
</div>
</div>


#### In an iOS device with native app

To deploy the iOS app you will need first to follow [this guide](https://beta.ionicframework.com/docs/installation/ios){:target="_blank"} to properly configure your development environment. Then, it is crucial to have an OpenVidu Server properly deployed with a **valid certificate**.

<div style="
    display: table;
    border: 2px solid #ffb600;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    background-color: #FFFBF1;
    margin-bottom: 25px;
    padding: 5px 0 5px 0;"><div style="display: table-cell; vertical-align: middle;">
    <i class="icon ion-android-alert" style="
    font-size: 50px;
    color: #ffb600;
    display: inline-block;
    padding-left: 25%;
"></i></div>
<div style="
    vertical-align: middle;
    display: table-cell;
    padding: 10px 20px;">
    iOS devices will require OpenVidu Server to be deployed in a valid domain well-protected with a certificate.<br>No iPhone or iPad will allow connections to a non-secure OpenVidu Server from within a native application. To facilitate first steps with OpenVidu and Ionic on iOS devices, if no custom url is defined <a href="https://github.com/OpenVidu/openvidu-tutorials/blob/master/openvidu-ionic/src/app/app.component.ts#L19" target="_blank">here in the app</a> then our demos OpenVidu Server will be used. <strong>Note: this is a publicly accessible OpenVidu Server. Anyone could access your sessions. Use it only for an initial test and under your own responsibility</strong>
</div>
</div>

After we have completed all the steps of the Ionic guide and performed steps 1) and 2) stated above, we must continue with the following commands:

<br>

4) Add ios platform

```bash
# In openvidu-tutorials/openvidu-ionic
ionic cordova platform add ios
```

5) Run the tutorial. The app will be automatically launched in your iOS device. First execution you'll need to trust your developer account in your device under `Settings -> General -> Device management -> your_apple_developer_account`

```bash
# In openvidu-tutorials/openvidu-ionic
ionic cordova run ios
```

You will need to sign your application in Xcode (opening folder _openvidu-ionic/platforms/ios_) with your developer team to avoid any errors. From Apple [official documentation](https://help.apple.com/xcode/mac/current/#/dev5a825a1ca){:target="_blank"}:

<p align="center">
  <img class="img-responsive xcode-img" style="padding: 25px 0; max-width: 750px" src="img/tutorials/xcode_sign.png">
</p>

<div class="row">

<div class="screenshots-gallery" style="text-align: -webkit-center; width: 90%; margin: auto;" >
	<a data-fancybox="gallery-screenshot" href="img/demos/ov-call-ionic1.png">
		<img class="/img-responsive img-gallery" style="max-height: 600px" src="img/demos/ov-call-ionic1.png"/>
	</a>
	<a data-fancybox="gallery-screenshot" href="img/demos/ov-call-ionic2.png">
		<img class="img-responsive img-gallery" style="max-height: 600px" src="img/demos/ov-call-ionic2.png"/>
	</a>
	<a data-fancybox="gallery-screenshot" href="img/demos/ov-call-ionic5.png">
		<img class="img-responsive img-gallery" style="max-height: 600px" src="img/demos/ov-call-ionic5.png"/>
	</a>
	<a data-fancybox="gallery-screenshot" href="img/demos/ov-call-ionic3.png">
		<img class="img-responsive img-gallery" style="max-height: 600px" src="img/demos/ov-call-ionic3.png"/>
	</a>
	<a data-fancybox="gallery-screenshot" href="img/demos/ov-call-ionic4.png">
		<img class="img-responsive img-gallery" style="max-height: 600px" src="img/demos/ov-call-ionic4.png"/>
	</a>
</div>
</div>

<br>


<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js"></script>
<script>
  $().fancybox({
    selector : '[data-fancybox="gallery"]',
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

<link rel="stylesheet" type="text/css" href="css/downloads/slick-1.6.0.css"/>
<link rel="stylesheet" type="text/css" href="css/slick-theme.css"/>
<script type="text/javascript" src="js/downloads/slick-1.6.0.min.js"></script>

<script>
    $('.screenshots-gallery').slick({
      autoplay: false,
      arrows: true,
		prevArrow: '<div class="slick-btn slick-btn-prev"><i class="icon ion-chevron-left"></i></div>',
      nextArrow: '<div class="slick-btn slick-btn-next"><i class="icon ion-chevron-right"></i></div>',
      autoplaySpeed: 4000,
      dots: true,
      infinite: true,
      pauseOnHover: false,
      pauseOnFocus: false,
      responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 1
        }
      },
    ]
    });
</script>
