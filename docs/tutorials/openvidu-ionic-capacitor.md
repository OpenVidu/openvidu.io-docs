# openvidu-ionic-capacitor
<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-ionic-capacitor" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

A client-side only application built with **Ionic 5** and **Angular 10** frameworks. It can be compiled into a **native Android app**, a **native iOS app** and into a standard **web app**.

If it is the first time you use OpenVidu, it is highly recommended to start first with **[openvidu-hello-world](tutorials/openvidu-hello-world/){:target="_blank"}** tutorial due to this being a cordova ionic app and being a little more complex for OpenVidu starters.



<div class="warningBoxContent">
  <div style="display: table-cell; vertical-align: middle;">
      <i class="icon ion-android-alert warningIcon"></i>
  </div>
  <div class="warningBoxText">
    This ionic tutorial is exactly the same than <a href="tutorials/openvidu-ionic/">openvidu-ionic</a> tutorial but using <a href="https://capacitorjs.com/">Capacitor</a> instead of Cordova.
    As you know, <strong>cordova-plugin-iosrtc</strong> plugin is required for building and running the project in iOS platform and it <a href="https://github.com/cordova-rtc/cordova-plugin-iosrtc/issues/498#issuecomment-619541365">only has official support for ionic project based on Cordova</a>. <strong>If you decide use Capacitor, take account that this iOS plugin  could have some bugs or some incompatible features.</strong>

  </div>
</div>

## Understanding this tutorial

<p align="center">
  <img class="img-responsive" src="img/tutorials/openvidu-ionic.png">
</p>

OpenVidu is composed by the three modules displayed on the image above in its insecure version.

- **openvidu-browser**: NPM package for your Ionic app. It allows you to manage your video-calls straight away from your clients
- **openvidu-server**: Java application that controls Kurento Media Server
- **Kurento Media Server**: server that handles low level operations of media flow transmissions

## Running this tutorial

**1)** You will need **Node**, **NPM** and **Ionic** to serve the app. Install them with the following commands

```bash
sudo curl -sL https://deb.nodesource.com/setup_14.x | sudo bash -
sudo apt-get install -y nodejs
sudo npm install -g ionic@latest
```

**2)** Clone the repo:

```bash
git clone https://github.com/OpenVidu/openvidu-tutorials.git -b v2.18.0
```

**3)** Install dependencies

```bash
cd openvidu-tutorials/openvidu-ionic-capacitor
npm install
```

Now depending on the platform you want to run your app...

#### In the browser

See [how to run in the browser](tutorials/openvidu-ionic/#in-the-browser) section of **openvidu-ionic**.



#### In an Android device with native app

For previous steps, see [how to run in Android device](tutorials/openvidu-ionic/#in-an-android-device-with-native-app) section of **openvidu-ionic**.

**9)** Capacitor provide us a special command for automatically open the Android code in your Android Studio:

```bash
# In openvidu-tutorials/openvidu-ionic-capacitor
npx cap open android
```

Optionally, you can do it manually, opening the `openvidu-tutorials/openvidu-ionic-capacitor/android` directory in your Android Studio.



#### In an iOS device with native app

For previous steps, see [how to run in iOS device](tutorials/openvidu-ionic/#in-an-ios-device-with-native-app) section of **openvidu-ionic**.




**4)** The native platforms are included in **openvidu-ionic-capacitor **. You don't need to do any extra about this.

**5)** Capacitor provide us a special command for automatically open the iOS code in your xCode:

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
		<a data-fancybox="gallery2" href="img/demos/ov-ionic1.png">
		<img class="img-responsive" src="img/demos/ov-ionic1.png">
	</a>
	</div>
	<div class="col-md-4 col-sm-4">
		<a data-fancybox="gallery2" href="img/demos/ov-ionic2.png">
		<img class="img-responsive" src="img/demos/ov-ionic2.png">
	</a>
	</div>
    <div class="col-md-4 col-sm-4">
		<a data-fancybox="gallery2" href="img/demos/ov-ionic3.png">
		<img class="img-responsive" src="img/demos/ov-ionic3.png">
	</a>
	</div>
</div>

<br>

## Understanding the code

See [Understanding the code](tutorials/openvidu-ionic/#understanding-the-code) section of **openvidu-ionic**.

## Android specific requirements

See [Android specific requirements](tutorials/openvidu-ionic/#android-specific-requirements) section of **openvidu-ionic**.

## iOS specific requirements

See [iOS specific requirements](tutorials/openvidu-ionic/#ios-specific-requirements) section of **openvidu-ionic**.

Moreover, an explicit change to bear in mind is in the `applyIosIonicVideoAttributes` method. You will need to remove the `zIndex` property line (required in the openvidu-ionic tutorial) allowing to the iOS videos get visible to the html.

The method would be as follows:

```typescript
private applyIosIonicVideoAttributes() {
    const ratio = this._streamManager.stream.videoDimensions.height / this._streamManager.stream.videoDimensions.width;
    this.elementRef.nativeElement.style.width = '100% !important';
    this.elementRef.nativeElement.style.objectFit = 'fill';
    const computedWidth = this.elementRef.nativeElement.offsetWidth;
    this.elementRef.nativeElement.style.height = computedWidth * ratio + 'px';
    if (!this._streamManager.remote) {
        // It is a Publisher video. Custom iosrtc plugin mirror video
        this.elementRef.nativeElement.style.transform = 'scaleX(-1)';
    }
    cordova.plugins.iosrtc.refreshVideos();
}
```



<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js"></script>
<script>
  $().fancybox({
    selector : '[data-fancybox]',
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