<h2 id="section-title">Simulcast</h2>
<hr>

[TOC]

---

## What is Simulcast? {: #simulcast-what }

Simulcast is a technique that allows **optimizing the quality** of routed video, in accordance with the needs of each individual Subscriber. Depending on aspects such as device form-factor or network link quality, the video that gets delivered to each participant in a session can be adjusted to be the perfect match for each circumstance.

### How does Simulcast work? {: #simulcast-how }

The way Simulcast works is by making Publishers send several copies of the same video; these are called "layers", and each layer is of a different quality. Participants sending video will pay a small price of higher bandwidth and power requirements, in exchange for the ability to select what is the most appropriate layer for each Subscriber:

<div class="row">
    <div class="pro-gallery" style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-pro1" href="img/docs/openvidu-enterprise/simulcast.png"><img class="img-responsive" style="margin: auto; max-height: 480px" src="img/docs/openvidu-enterprise/simulcast.png"/></a>
    </div>
</div>

The criteria used to select which layer should get delivered to which Subscriber tends to be based on several key metrics or features of the receiving device, such as:

- Quality of the receiver's internet connection. As one would expect, higher bandwidth allows transmitting higher quality video.

- Performance of the receiver device. While a powerful workstation would be able to cope with the highest quality H.264 encoded video, a mobile phone might struggle with it. In this case, it probably makes sense to send lower quality video to those devices, regardless of their network bandwidth.

- Power usage. Similar to the previous point, a mobile device might put a lot of stress on the battery while trying to decode a higher quality video, which puts it at a disadvantage. You don't want your users to run out of charge while in a meeting! So one possibility might be to send lower quality video to those devices which have lower battery levels.

- Application layout. Sometimes it just doesn't make sense to send the highest possible quality, even if receivers could cope with it just fine. For example, if there is a central speaker shown in a large area of the screen, and all other participants are shown as small thumbnails, the speaker should get the highest quality while all others could be shown with the lowest one. This technique helps with saving CPU + battery + network bandwidth of all Publishers, and CPU + network bandwidth on the Media Server.

For more information about Simulcast and how it works in popular web browsers, check these resources:

- [WebRTC Glossary - Simulcast](https://webrtcglossary.com/simulcast/){:target="_blank"}, a short video introduction that visualizes what Simulcast does.

- [WebRTC Codelab - Simulcast](https://webrtccourse.com/course/webrtc-codelab/module/fiddle-of-the-month/lesson/simulcast-playground/){:target="_blank"}, where Tsahi Levent-Levi and Philipp Hancke present the basic concepts of Simulcast and later proceed to show some practical examples.

## Simulcast in OpenVidu Enterprise

Simulcast is enabled directly in the client, using OpenVidu Browser. For this, the client platform itself must support the Simulcast feature: web browsers such as Firefox and Chrome are two of the best candidates. You enable this feature by setting the [enableSimulcastExperimental](api/openvidu-browser/interfaces/openviduadvancedconfiguration.html#enablesimulcastexperimental){:target="_blank"} flag in the [setAdvancedConfiguration](api/openvidu-browser/classes/openvidu.html#setadvancedconfiguration){:target="_blank"} call of OpenVidu Browser:

```javascript
let OV = new OpenVidu();
OV.setAdvancedConfiguration({
    enableSimulcastExperimental: true
});
```

### Beta limitations {: #simulcast-enterprise-beta-limitations }

#### Fixed amount of layers

For now, the number of simulcast encodings is fixed to **3**. This means that, in principle, the client will be asked to send 3 different video qualities, although depending on the implementation this number could be honored or not.

For example, Firefox does send all the requested qualities, regardless of the source video. Meanwhile, Chrome won't send all qualities if the source video doesn't have enough resolution, or if its outbound bandwidth is not high enough to accommodate all of the layers.

The exact decision logic followed by Chrome can be checked in its source code ([simulcast.cc](https://source.chromium.org/chromium/chromium/src/+/main:third_party/webrtc/media/engine/simulcast.cc;l=90-114;drc=2afff37ba007429cd1cb65369ee815bceee6f3c9)):

| Source Size (px) | Source Bitrate (kbps) | Max Layers |
| ----------------:| ---------------------:| ----------:|
|        1920x1080 |                  5000 |          3 |
|         1280x720 |                  2500 |          3 |
|          960x540 |                  1200 |          3 |
|          640x360 |                   700 |          2 |
|          480x270 |                   450 |          2 |
|          320x180 |                   200 |          1 |

#### Fixed resolution of each layer

Each of the simulcast encodings requested to the client browser can indicate by how much the original size should be divided. This is the [scaleResolutionDownBy](https://developer.mozilla.org/en-US/docs/Web/API/RTCRtpEncodingParameters/scaleResolutionDownBy) parameter, and currently it is fixed as per the default values in the WebRTC spec:

- The lowest quality layer contains the video size scaled down by 4.
- The medium layer has the video size scaled down by 2.
- The highest layer maintains the original video size (no scaling).

#### No max bitrate per layer

Simulcast encodings can be configured with a [maxBitrate](https://developer.mozilla.org/en-US/docs/Web/API/RTCRtpEncodingParameters/maxBitrate) parameter, which allows defining lower bitrates for each lower quality layer. However we're not using it, and instead rely on the internal logic that the web browsers use to auto-detect the available bandwidth and distribute bitrate as they see appropriate between layers.

#### No layer selection in the Media Server

In the future, OpenVidu will allow applications to do an explicit selection of which simulcast layer one Subscriber should receive. However, for the moment this feature is not available yet, and the actual selection is automatically performed by the Media Server, according to parameters such as the available download bandwidth of the Subscriber.

#### No layer deactivation in the Publisher

If a Simulcast layer won't be needed by the Media Server, the Publisher might as well be instructed to stop producing it altogether. This makes a lot of sense because otherwise it would be spending lots of resources to encode a layer that nobody needs! (and encoding video is a very expensive operation, so it should be avoided whenever possible).
