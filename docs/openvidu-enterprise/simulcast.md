<h2 id="section-title">Simulcast</h2>
<hr>

[TOC]

---

## What is simulcast? {: #intro }

Simulcast is a technique used with WebRTC, that allows **optimized quality of routed video**, in accordance with the needs of each individual receiver.

Depending on aspects such as device form-factor or network link bandwidth, the video quality that gets delivered can be selected to be the perfect match for the particular circumstances of each receiver. This is in contrast with the more traditional methods of adaptive video bitrate in WebRTC, which affect all participants equally while delivering the same capped video quality for all of them.


### Simulcast technical details

The way simulcast works is by having each Publisher send their video in two or three variants. These are called "*layers*", and **each layer contains a different quality level of the same video**. The SFU (media server) is then able to select the layer of most adequate quality for the network conditions and functional needs of each Subscriber:

<div class="row">
    <div class="pro-gallery" style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-pro1" href="img/docs/openvidu-enterprise/simulcast.png"><img class="img-responsive" style="margin: auto; max-height: 480px" src="img/docs/openvidu-enterprise/simulcast.png"/></a>
    </div>
</div>

The criteria used to select which layer should get delivered to which Subscriber tends to be based on several key metrics or features of the receiving device, such as:

* **Network link** quality of the receiver's connection. As one would expect, higher bandwidth allows transmitting higher quality video.

* **Performance** of the receiver device. While a powerful workstation would be able to cope with the highest quality H.264 encoded video, a mobile phone might struggle with it. In this case, it probably makes sense to send lower quality video to those devices, regardless of their network bandwidth.

* **Power usage**. Similar to the previous point, a mobile device might put a lot of stress on the battery while trying to decode a higher quality video, which puts it at a disadvantage. You don't want your users to run out of charge while in a meeting! So one possibility might be to send lower quality video to those devices with strict battery usage requirements.

* **Application layout**. Sometimes it just doesn't make sense to send the highest possible quality, even if receivers could cope with it just fine. For example, if there is a central speaker shown in a large area of the screen, and all other participants are shown as small thumbnails, the speaker should get the highest quality while all others could be shown with the lowest one. This technique helps with saving CPU + battery + network bandwidth of all Publishers, and CPU + network bandwidth on the Media Server.

For more information about simulcast and how it works in popular web browsers, check these resources:

* [WebRTC Glossary - Simulcast](https://webrtcglossary.com/simulcast/), a short video introduction that visualizes what simulcast does.
* [WebRTC Codelab - Simulcast](https://webrtccourse.com/course/webrtc-codelab/module/fiddle-of-the-month/lesson/simulcast-playground/), where Tsahi Levent-Levi and Philipp Hancke present the basic concepts of simulcast and later proceed to show some practical examples.

<br>

---

## Using simulcast in OpenVidu

Simulcast is a video routing optimization that can be safely enabled in most cases, given that it allows the Media Server to adjust the quality that is distributed to each Subscriber independently. However, since its introduction in **OpenVidu 2.21**, simulcast will remain disabled by default. When we gather enough user feedback, we'll decide whether this feature should come enabled by default in future releases.

In any case, the only situation where simulcast might be undesired is when a Publisher has severe bandwidth limitations or is a low-power device. In those cases, simulcast might provide worse results, given that it imposes a small extra bandwidth and power toll on Publishers.


### Enabling simulcast {: #enabling }

Simulcast is enabled at the Publisher level, but it can only be used in **OpenVidu deployments with the mediasoup media server**. To actually enable it, there are two alternatives:

1. Use a global setting, to have it enabled by default for all Publishers. This is done by setting `OPENVIDU_WEBRTC_SIMULCAST=true` in the OpenVidu Server's `.env` file.

2. Configure individually when creating each Publisher from the client side. This can be done with *openvidu-browser*, by setting [`PublisherProperties.videoSimulcast = true`](api/openvidu-browser/interfaces/PublisherProperties.html#videoSimulcast) when calling [`OpenVidu.initPublisher()`](api/openvidu-browser/classes/OpenVidu.html#initPublisher).

Note that it is possible to combine these methods to achieve a very easy configuration for some common use cases:

* To use simulcast on **all Publishers except one**, you can enable it globally (OpenVidu Server with `OPENVIDU_WEBRTC_SIMULCAST=true`), then disable it just on the appropriate Publisher (*openvidu-browser* with `PublisherProperties.videoSimulcast = false`).

* To use simulcast **only on one Publisher** (e.g. for a Teacher - Students kind of room), you can disable it globally (OpenVidu Server with `OPENVIDU_WEBRTC_SIMULCAST=false`), then enable it only on the appropriate Publisher (*openvidu-browser* with `PublisherProperties.videoSimulcast = true`).


### Pros and Cons: Bandwidth and power usage {: #pros-cons }

Enabling simulcast incurs a small penalty on Publishers, which see their network and power usage slightly incremented (around 20% to 30%). This is because with simulcast, Publishers now need to generate duplicate or triplicate versions of their video (causing an increment on CPU usage), and send them all to the Media Server (causing an increment in network usage).

This penalty on Publishers is generally considered worth it, because simulcast allows the Media Server to quickly switch between quality layers for every individual outbound stream. This means Subscribers will see an improvement in how well and how fast the received quality is adapted to their network and performance conditions.


## Simulcast compatibility table {: #simulcast-compatibility }

Simulcast can only be used with the **VP8** and **H.264** video codecs. Enabling simulcast will fail and cause errors on Publishers if the video codecs of the WebRTC session have been forced to a different codec, such as VP9.

This table summarizes compatibility of different platforms with the simulcast feature. Here we show whether the codec worked as expected in our tests, together with the web browser or client version that was used for the test, and notes regarding failures.

For a similar table that shows compatibility with all non-simulcast video codecs supported by OpenVidu, check the [media codecs compatibility table](advanced-features/media-codecs/#codec-compatibility).

|             | Simulcast VP8 | Simulcast H.264 |
|-------------|---------------|-----------------|
| **WINDOWS** |               |                 |
| Chrome      | ✔ 98          | ✔ 98            |
| Firefox     | ✔ 97          | ✔ 97            |
| Opera       | ✔ 84          | ✖ 84 [1]        |
| Edge        | ✔ 98          | ✔ 98            |
| **LINUX**   |               |                 |
| Chrome      | ✔ 98          | ✔ 98            |
| Firefox     | ✔ 97          | ✔ 97            |
| Opera       | ✔ 84          | ✖ 84 [1]        |
| Edge        | ✔ 98          | ✔ 98            |
| **ANDROID** |               |                 |
| Chrome      | ✔ 98          | ✔ 98            |
| Firefox     | ✔ 97          | ✔ 97            |
| Opera       | ✔ 67          | ✔ 67            |
| Edge        | ✖ 98 [1]      | ✖ 98 [1]        |
| Samsung     | ✔ 16.0        | ✔ 16.0          |
| **MACOS**   |               |                 |
| Chrome      | ✔ 98          | ✔ 98            |
| Firefox     | ✔ 97          | ✔ 97            |
| Opera       | ✔ 84          | ✔ 84            |
| Edge        | ✔ 98          | ✔ 98            |
| Safari      | ✔ 15.1        | ✔ 15.1          |
| **IOS**     |               |                 |
| Chrome      | ✔ 98          | ✔ 98            |
| Firefox     | ✔ 97          | ✔ 97            |
| Opera       | ✔ 3.2.9       | ✔ 3.2.9         |
| Edge        | ✔ 98          | ✔ 98            |
| Safari      | ✔ 15.3        | ✔ 15.3          |
<!-- Markdown Tables Generator: https://www.tablesgenerator.com/markdown_tables -->

[1]: Remote video is black. The client is unable to decode incoming video.


### Recording compatibility

OpenVidu's [Recording](advanced-features/recording/) feature works the same with or without simulcast enabled. Note however, what the [INDIVIDUAL recording](advanced-features/recording/#individual-recording) does is just to dump all media received by the media server as-is into a file; if (when) a Publisher stops sending a simulcast layer, this will cause an abrupt change in the resolution or framerate of the recording. Such abrupt changes most probably won't cause any issues, and we were able to check that popular programs work fine, such as VLC, MPlayer, FFmpeg, etc.


### Default layer settings {: #layer-settings }

Each of the simulcast encodings requested by the client can indicate by how much the original size should be divided. This is the [`scaleResolutionDownBy`](https://w3c.github.io/webrtc-pc/#dom-rtcrtpencodingparameters-scaleresolutiondownby) parameter, and OpenVidu currently requests them as per the default values in the WebRTC spec:

* The **low** quality layer contains the video size scaled down by **4**.
* The **medium** layer has the video size scaled down by **2**.
* The **high** layer maintains the original video size (no scaling).

For cases where less than 3 layers will be sent (e.g. if source video is too small), OpenVidu omits the lowest layers. So, for example, a 640x360 video will be sent with just the *medium* and *high* quality layers.

Regarding bitrate, simulcast layers can be configured with a [`maxBitrate`](https://w3c.github.io/webrtc-pc/#dom-rtcrtpencodingparameters-maxbitrate) parameter. However OpenVidu doesn't use it, and instead relies on the default values assigned by WebRTC implementations.

Layers can later be reconfigured or deactivated with the [`active`](https://w3c.github.io/webrtc-pc/#dom-rtcrtpencodingparameters-active) parameter; see the customization section below for instructions and example code.


### Content Hint: Webcam, Screenshare, Custom {: #content-hint }

OpenVidu automatically configures simulcast to do the correct thing depending on the source of the video:

* For **webcam**, due to how human perception works, video feels better when it is smoother, even if it contains some visual defects. In case of network congestion, simulcast tries to keep **high framerate**, at the cost of lower bitrate and video resolution.
* For **screenshare**, text and details are of utmost importance. In case of network congestion, simulcast tries to keep **high bitrate and resolution**, at the cost of lower framerate.

*openvidu-browser* will automatically apply the correct settings when requesting video tracks from the browser.

If you are providing your own custom track (setting a `MediaStreamTrack` into [`PublisherProperties.videoSource`](api/openvidu-browser/interfaces/PublisherProperties.html#videoSource), then passing it to [`OpenVidu.initPublisher()`](api/openvidu-browser/classes/OpenVidu.html#initPublisher)) you might want to let *openvidu-browser* know about what type of content your track will contain. Do this by providing a track where the [`track.contentHint`](https://w3c.github.io/mst-content-hint/#video-content-hints) property had been previously set to one of `"motion"` (for webcam kind of video, where there are people or real-world imagery) or `"detail"` (for screenshare kind of video, where there are geometric shapes, still pictures, or text).


### Advanced: Customizing simulcast layers {: #layer-customizing }

While OpenVidu sets simulcast up appropriately for best overall performance on general use cases, you might want to fine tune its layer settings. This can be done directly in the Publisher's client by means of the [RTCPeerConnection](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection) object. You can obtain a reference to this object with [`Stream.getRTCPeerConnection()`](api/openvidu-browser/classes/Stream.html#getRTCPeerConnection) in *openvidu-browser*.

Simulcast layers are set in what WebRTC calls an **RTP Sender**, which can be retrieved with [`RTCPeerConnection.getSenders()`](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/getSenders). Note that your PeerConnection object will contain one Sender for audio and another for video, so you should filter them by track type:

```javascript
const pc = ovStream.getRTCPeerConnection();
const sender = pc.getSenders().find((s) => s.track?.kind === "video");
```

Once you have the video RTP Sender, [`sender.getParameters()`](https://developer.mozilla.org/en-US/docs/Web/API/RTCRtpSender/getParameters) returns a `parameters` object that can be modified and later applied back with [`sender.setParameters()`](https://developer.mozilla.org/en-US/docs/Web/API/RTCRtpSender/setParameters). Each of the simulcast layers is called an **encoding**, and can be found in `parameters.encodings`, which is an array of [RTCRtpEncodingParameters](https://w3c.github.io/webrtc-pc/#dom-rtcrtpencodingparameters).

You can use the [`active`](https://w3c.github.io/webrtc-pc/#dom-rtcrtpencodingparameters-active), [`maxBitrate`](https://w3c.github.io/webrtc-pc/#dom-rtcrtpencodingparameters-maxbitrate), and [`scaleResolutionDownBy`](https://w3c.github.io/webrtc-pc/#dom-rtcrtpencodingparameters-scaleresolutiondownby) members to alter the contents of each simulcast layer. Refer to the docs of *RTCRtpEncodingParameters* for a detailed description. Note that an extra member named [`maxFramerate`](https://www.w3.org/TR/2018/CR-webrtc-20180927/#dom-rtcrtpencodingparameters-maxframerate) used to exist too; while it got deleted from the WebRTC standard, Chrome 98 does in fact implement it as of this writing, so you might want to use it to fine tune the framerate.

Note that it's only possible to modify already existing entries in the `parameters.encodings` array; you cannot add or remove new entries.


#### About layer deactivation

The [`active`](https://w3c.github.io/webrtc-pc/#dom-rtcrtpencodingparameters-active) parameter should be remarked here, because it can be used to stop or resume sending of a simulcast layer.

If a Publisher is started with several simulcast layers, but after a while some of them won't be needed temporarily, the Publisher might as well be instructed to stop producing them altogether.

This makes a lot of sense because otherwise Publishers might be spending their resources to encode layers that nobody needs! Encoding video is quite an expensive operation, so it should be avoided whenever possible.


#### A complete example

Say that you know that a Publisher's video will be shown only as a very small picture in every Subscriber's screen. It is probably worth saving CPU and network bandwidth by telling the Publisher to only send a low quality video. This is how you would stop the highest-quality simulcast layers from being sent, while at the same time reducing the lower ones to 1/8th of the original size:

```javascript
// Get the RTCRtpEncodingParameters from the video sender.
const pc = ovStream.getRTCPeerConnection();
const sender = pc.getSenders().find((s) => s.track.kind === "video");
const params = sender.getParameters();
const encodings = params.encodings ?? [];

// Reduce resolution of the 2 lowest layers by /16 and /8.
for (let i = 0; i < Math.min(2, encodings.length); i++) {
  encodings[i].scaleResolutionDownBy = 16.0 / (2 ** i);
}

// Stop sending the highest layer(s).
for (let i = 2; i < encodings.length; i++) {
  encodings[i].active = false;
}

// Apply the changes.
await sender.setParameters(params);
```

The effect is an immediate change in the simulcast layers that are being sent by the Publisher.


## Simulcast features and limitations in OpenVidu {: #limitations }

### Maximum amount of layers

Different WebRTC implementations handle simulcast in specific ways, and one of the most important differences is how many simulcast layers can be sent at the same time.

Google Chrome (and all Chromium-based browsers, such as Edge or Opera) will send only a fixed amount of layers depending on the size of the captured video; the exact decision logic can be checked in its source code here: [simulcast.cc](https://source.chromium.org/chromium/chromium/src/+/main:third_party/webrtc/media/engine/simulcast.cc;l=90-114;drc=d3251968d1b3dbe7e1353a3f15970b47173103e9).

| Video size (px) | Max layers |
| ---------------:| ----------:|
|       1920x1080 |          3 |
|        1280x720 |          3 |
|         960x540 |          3 |
|         640x360 |          2 |
|         480x270 |          2 |
|         320x180 |          1 |

On top of that, Chrome might apply other dynamic criteria such as available bandwidth, hardware performance, or battery usage. Sadly, it seems that the Chrome development team hasn't documented a comprehensive list of such conditions that we could share here.

Firefox and Safari also implement their own set of rules, but again they are lacking proper documentation so it's difficult to present a reliable guide here. In general, using 3 simulcast layers seems to be the most common setting across all implementations.


### No layer selection in Subscribers

In the future, OpenVidu might allow applications to do an explicit selection of which simulcast layer one Subscriber prefers to receive. However, for the moment this feature is not available yet, and Subscribers will just leave the layer selection logic to the Media Server. This works according to parameters such as the available download bandwidth of the Subscriber, and will always attempt to use the highest possible quality layer.

<br>

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