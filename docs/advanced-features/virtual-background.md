# Virtual Background

- **[How does Virtual Background work](#how-does-virtual-background-work)**
- **[Applying a Virtual Background before connecting to the Session](#applying-a-virtual-background-before-connecting-to-the-session)**
- **[Virtual Background limitations](#virtual-background-limitations)**

<br>

---

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
This feature is part of OpenVidu <a href="openvidu-pro/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin: 0 4px 0 4px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span></a> and <a href="openvidu-enterprise/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(156, 39, 176); color: white; font-weight: bold; padding: 0px 5px; margin: 0 4px 0 4px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">ENTERPRISE</span></a> editions.
</div>
</div>

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
    <strong>WARNING</strong>: OpenVidu Virtual Background is considered an experimental feature. This means that there is a possibility that unexpected bugs may arise, and that the API may change in the near future.
</div>
</div>

OpenVidu Virtual Background allows you to apply a filter to a video stream, such as a blurring effect or a background image. In this way you may cut out the person from the background, giving a more professional look to your video calls. Take a look to the video below to get an idea of what is possible with OpenVidu Virtual Background:

<video class="img-responsive" style="margin: auto; margin-top: 40px; margin-bottom: 40px; max-width: 80%;" src="img/docs/advanced-features/virtual-background.mp4" muted autoplay playsinline async loop></video>

You can check out [openvidu-virtual-background](tutorials/openvidu-virtual-background/) tutorial to see this feature in action.

## How does Virtual Background work

You can apply a Virtual Background to a [Stream](api/openvidu-browser/classes/Stream.html) object using the same openvidu-browser API used for applying server-side [voice and video filters](advanced-features/filters/).

To apply a blur effect:

```javascript
var OV = new OpenVidu();
var publisher = OV.initPublisherAsync(targetElement);
var virtualBackgroundFilter = await publisher.stream.applyFilter("VB:blur");
```

To apply a background image:

```javascript
var OV = new OpenVidu();
var publisher = OV.initPublisherAsync(targetElement);
var virtualBackgroundFilter = await publisher.stream.applyFilter("VB:image", {
    url: "https://raw.githubusercontent.com/OpenVidu/openvidu.io/master/img/vb/office.jpeg",
});
```

To modify the background image of an active Virtual Background filter:

```javascript
await virtualBackgroundFilter.execMethod("update", {
    url: "https://raw.githubusercontent.com/OpenVidu/openvidu.io/master/img/vb/beach.jpeg"
});
```

To remove a Virtual Background filter:

```javascript
await publisher.stream.removeFilter();
```

## Applying a Virtual Background before connecting to the Session

It is a very common use case for any videoconferencing application to have a configuration panel prior to joining the video session. In this configuration panel, the user sets up its nickname, camera, microphone and other settings. It is therefore necessary to be able to configure a Virtual Background before connecting to the Session, so that users have a preview of their appearance before others start receiving their streams.

If you try applying a Virtual Background before connecting to a Session, an [OpenViduError](api/openvidu-browser/classes/OpenViduError.html) will be triggered by default:

```json
{
    "name": "VIRTUAL_BACKGROUND_ERROR",
    "message": "Virtual Background requires the client to be connected to a Session or to have a 'token' property available in 'options' parameter with a valid OpenVidu token"
}
```

To avoid this, pass a `token` parameter to the method, providing a valid token generated for any Session in OpenVidu Server:

```javascript
var myToken; // A valid token from OpenVidu Server

var OV = new OpenVidu();
var publisher = OV.initPublisherAsync(targetElement);
publisher.stream.applyFilter("VB:image", {
    url: "https://raw.githubusercontent.com/OpenVidu/openvidu.io/master/img/vb/office.jpeg",
    token: myToken
});
```

## Virtual Background limitations

Keep the following points in mind when implementing Virtual Background in your application:

- Virtual Background is compatible with most platforms, but not all. It has been successfully tested in desktop browsers (Chrome, Firefox, Edge, Opera, Safari), mobile browsers (Chrome, Firefox, Edge, Opera, Safari, Samsung Internet Browser), Electron and Ionic for Android. Right now it is not supported in React Native, Ionic for iOS and native Android/iOS apps.
- HD resolutions may reduce performance. It is recommended to apply Virtual Background only on SD resolutions and below (max 640x480).
- On mobile devices, a change in screen orientation after applying a Virtual Background (because of mobile rotation) can distort the filtered video. Mobile applications that allow screen rotation should not use Virtual Background.
- Applying **more than one Virtual Background in the same device** can reduce performance to the point of making it unusable. Make sure to apply only one Virtual Background to a single Stream per device.
- Virtual Backgrounds can only by applied to **Publisher's streams**.
- It is not possible to apply both a Virtual Background filter and a server-side filter at the same time on the same Stream.
- In Ionic when applying a background image, high resolution images may fail to be applied. The exact height and width in pixels from which the problem occurs has not been determined.
- The behavior of Virtual Backgrounds may vary and its performance be affected when the **focus** of the application is lost. For example, in recent versions of Google Chrome, the Publisher's stream will freeze if a Virtual Background is being applied to it and the user changes the application's tab. In recent versions of Firefox, the image will not freeze, but the framerate will significantly drop.