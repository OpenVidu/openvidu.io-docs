<h2 id="section-title">Media Codecs</h2>

---

OpenVidu is able to handle WebRTC media streams by using different media servers in the backend, depending on its configuration:

* [Kurento](https://www.kurento.org/)

* [mediasoup](https://mediasoup.org/) <span id="openvidu-pro-tag" style="display: inline-block; background-color: #9c27b0; color: white; font-weight: bold; padding: 0px 5px; margin-left: 5px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">ENTERPRISE</span>

These are selected with the `OPENVIDU_ENTERPRISE_MEDIA_SERVER` parameter in OpenVidu's `.env` configuration file.

While OpenVidu goes to great lengths to hide the differences between each media server, there are some key aspects that cannot be abstracted away and will have a direct impact on how applications work. One such aspect is how video codecs are handled between participants in a session, depending on the [OpenVidu configuration](reference-docs/openvidu-config/).

Table of Contents:

[TOC]

---

## Quick tour on video codecs

The WebRTC specification mandates compatibility with two video codecs:

* [VP8].
* [H.264].

These are well rounded and established codecs, with mature implementations in lots of systems, and even hardware decoders in computers and mobile devices.

*VP8* is the default choice for most WebRTC implementations, due to its good overall quality and the fact that it is royalty free. Meanwhile, *H.264* is a de-facto standard in the audiovisual industry, well supported in all kinds of hardware and software platforms.

On top of those, there are some new codecs have been slowly added to some clients. None of these are mandated by the WebRTC specification, so support for them varies greatly among platforms:

* [VP9] is the successor of *VP8*, and brings to the table a greater ability to compress the video streams without noticeable loss of quality.
* [H.265] is the equivalent evolution of *H.264*, with also much improved compression ratios, but still limited adoption, probably because it is encumbered with usage licenses.
* [AV1] is the newest arrival, and promises to be the best overall codec for real time video transmission; however, it still has a long way until enough adoption makes it a safe choice when compatibility between platforms is a deciding factor.

Codec support in OpenVidu is as follows:

* Kurento

    - *VP8*
    - *H.264*

* mediasoup <span id="openvidu-pro-tag" style="display: inline-block; background-color: #9c27b0; color: white; font-weight: bold; padding: 0px 5px; margin-left: 5px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">ENTERPRISE</span>

    - *VP8*
    - *H.264*
    - *VP9* (check [recording limitations](#recording-limitations) below)


## Codec compatibility table {: #codec-compatibility }

This table summarizes compatibility of different platforms with the video codecs supported by OpenVidu. Here we show whether the codec worked as expected in our tests, together with the web browser or client version that was used for the test, and notes regarding failures.

For compatibility tests with simulcast (mediasoup only), check the [simulcast codec compatibility table](openvidu-enterprise/simulcast/#codec-compatibility).

The test method was as follows:

* Create a new session from Chrome on Linux.
* Use the OpenVidu's [Forced Video Codec](#forced-video-codec) feature to ensure that only the desired codec was used by all participants.
* Connect one by one with all desired combinations of Operating System, WebRTC client, and OpenVidu's media server.

|             | Kurento VP8 | Kurento H.264 | mediasoup VP8 | mediasoup H.264 | mediasoup VP9 |
|-------------|-------------|---------------|---------------|-----------------|---------------|
| **WINDOWS** |             |               |               |                 |               |
| Chrome      | ✔ 98        | ✔ 98          | ✔ 98          | ✔ 98            | ✔ 98          |
| Firefox     | ✔ 97        | ✔ 97          | ✔ 97          | ✔ 97            | ✔ 97          |
| Opera       | ✔ 84        | ✖ 84 [1]      | ✔ 84          | ✖ 84 [1]        | ✔ 84          |
| Edge        | ✔ 98        | ✔ 98          | ✔ 98          | ✔ 98            | ✔ 98          |
| **LINUX**   |             |               |               |                 |               |
| Chrome      | ✔ 98        | ✔ 98          | ✔ 98          | ✔ 98            | ✔ 98          |
| Firefox     | ✔ 97        | ✔ 97          | ✔ 97          | ✔ 97            | ✔ 97          |
| Opera       | ✔ 84        | ✖ 84 [1]      | ✔ 84          | ✖ 84 [1]        | ✔ 84          |
| Edge        | ✔ 98        | ✔ 98          | ✔ 98          | ✔ 98            | ✔ 98          |
| **ANDROID** |             |               |               |                 |               |
| Chrome      | ✔ 98        | ✔ 98          | ✔ 98          | ✔ 98            | ✔ 98          |
| Firefox     | ✔ 97        | ✔ 97          | ✔ 97          | ✔ 97            | ✔ 97          |
| Opera       | ✔ 67        | ✔ 67          | ✔ 67          | ✔ 67            | ✔ 67          |
| Edge        | ✖ 98 [1]    | ✖ 98 [1]      | ✖ 98 [1]      | ✖ 98 [1]        | ✖ 98 [1]      |
| Samsung     | ✔ 16.0      | ✔ 16.0        | ✔ 16.0        | ✔ 16.0          | ✔ 16.0        |
| **MACOS**   |             |               |               |                 |               |
| Chrome      | ✔ 98        | ✔ 98          | ✔ 98          | ✔ 98            | ✔ 98          |
| Firefox     | ✔ 97        | ✔ 97          | ✔ 97          | ✔ 97            | ✔ 97          |
| Opera       | ✔ 84        | ✔ 84          | ✔ 84          | ✔ 84            | ✔ 84          |
| Edge        | ✔ 98        | ✔ 98          | ✔ 98          | ✔ 98            | ✔ 98          |
| Safari      | ✔ 15.1      | ✔ 15.1        | ✔ 15.1        | ✔ 15.1          | ✔ 15.1        |
| **IOS**     |             |               |               |                 |               |
| Chrome      | ✔ 98        | ✔ 98          | ✔ 98          | ✔ 98            | ✔ 98          |
| Firefox     | ✔ 97        | ✔ 97          | ✔ 97          | ✔ 97            | ✔ 97          |
| Opera       | ✔ 3.2.9     | ✔ 3.2.9       | ✔ 3.2.9       | ✔ 3.2.9         | ✔ 3.2.9       |
| Edge        | ✔ 98        | ✔ 98          | ✔ 98          | ✔ 98            | ✔ 98          |
| Safari      | ✔ 15.3      | ✔ 15.3        | ✔ 15.3        | ✔ 15.3          | ✔ 15.3        |
<!-- Markdown Tables Generator: https://www.tablesgenerator.com/markdown_tables -->

[1]: Remote video is black. The client is unable to decode incoming video.


## Codecs on OpenVidu Sessions

### Forced Video Codec {: #forced-video-codec }

OpenVidu allows you to make a decision about the video codec(s) that participants will use to encode their videos in a session.

If you don't care about this technical detail, just using the default values is fine for most cases. However, there are instances where you might want to have control over the codec used by participants. For example, forcing everyone to use H.264 might be desirable to leverage the hardware encoder that lots of mobile devices include.

This feature can be set globally for the OpenVidu Server by setting the `OPENVIDU_STREAMS_FORCED_VIDEO_CODEC` property in the **`.env`** file of your deployment, or in a per-session basis through these methods:

<div class="lang-tabs-container" markdown="1">

<div class="lang-tabs-header">
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; font-weight: bold">REST API</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Java</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Node</button>
</div>

<div id="rest-api" class="lang-tabs-content" markdown="1">

Initialize your Session object with **[POST /openvidu/api/sessions](reference-docs/REST-API/#post-session)**, passing `{ "forcedVideoCodec": "VP8" }`.

</div>

<div id="java" class="lang-tabs-content" style="display:none" markdown="1">

```java
OpenVidu openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
SessionProperties sessionProperties = new SessionProperties.Builder()
    .forcedVideoCodec(VideoCodec.VP8)
    .build();
Session session = openVidu.createSession(sessionProperties);
```

See [JavaDoc](api/openvidu-java-client/io/openvidu/java/client/SessionProperties.Builder.html#forcedVideoCodec(io.openvidu.java.client.VideoCodec)){:target="_blank"}.

</div>

<div id="node" class="lang-tabs-content" style="display:none" markdown="1">

```javascript
const openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
const sessionProperties = { forcedVideoCodec: VideoCodec.VP8 };
const session = openvidu.createSession(sessionProperties);
```

See [TypeDoc](api/openvidu-node-client/interfaces/sessionproperties.html#forcedvideocodec).

</div>

</div>

<br>

Possible values are:

* **`MEDIA_SERVER_PREFERRED`**: A recommended choice is done for you, based on the media server that is currently in use. This is the default setting, and gets automatically translated into these values:

    - For Kurento, the selected value is *VP8*.
    - For mediasoup, the selected value is *NONE*.

* **`NONE`**: No specific codec is enforced. This means that a negotiation will occur between the media server and every participant, where the client platform's preferred codec will be given preference whenever possible.

* **`VP8`**: All participants will use the [VP8] codec.

* **`VP9`**: All participants will use the [VP9] codec (mediasoup only).

* **`H264`**: All participants will use the [H.264] codec.

The value `NONE` is of special interest because it leaves every participant to negotiate codecs with the media server. Depending on the participant's platform, a different codec might be selected; most platforms favor usage of VP8 as video codecs, while Safari is the prominent exception and will choose H.264 if given the chance. The actual selection, however, is influenced by the media server used by OpenVidu:

* Kurento leaves all participants complete freedom to use their platform's favored codec. If Publishers and Subscribers end up selecting mismatched codecs, the media server will make them work by transcoding video on the fly, to ensure compatibility. This requires that transcoding is allowed (see below). This is also why the choice of `MEDIA_SERVER_PREFERRED` translates to `VP8` for Kurento, in an attempt to avoid server-side transcoding by forcing everybody to use the same codec.

* mediasoup doesn't have the ability to perform transcoding. It leaves Publishers to use their platform's favored codec, but Subscribers will consequently be constrained to that choice, so that Subscribers will not end up requesting a codec that is not being already provided by their Publisher. This constraint on the Subscribers is what makes it safe to use `NONE`, and it's why `MEDIA_SERVER_PREFERRED` translates to `NONE` for mediasoup.

    A potential caveat of this codec selection logic, is that a Publisher might decide to send video with some codec that is not supported by a Subscriber; the consequence would be a black video in the Subscriber, caused by a failed decoding. In practice, **this is rarely the case** for participants that are compliant with the WebRTC specification, because WebRTC mandates support for **both VP8 and H.264 codecs**. No matter which one is selected by the Publisher, any proper WebRTC Subscriber should be able to handle it.


### Allow Transcoding (Kurento only)

Kurento media server is able to automatically convert between different codecs on the fly, if the need arises. This is called *transcoding*, and is a great way to ensure compatibility between endpoints; however, it is also a [very CPU intensive operation](https://doc-kurento.readthedocs.io/en/latest/user/troubleshooting.html#cpu-usage-grows-too-high).

The `OPENVIDU_STREAMS_ALLOW_TRANSCODING` setting is a (*true* | *false*) value that can be used to allow Kurento doing this conversion of codecs between participants. When this setting is enabled, two participants that are using mismatched codecs will have Kurento transcoding the Publisher's media into what the Subscriber is expecting to receive. When this setting is disabled, Kurento will not try to accommodate codecs that are incompatible; if a Publisher sends a codec that differs from what a Subscriber wants to receive, they won't be able to communicate.

To have a Publisher sending some codec different from what Subscribers expect is something that can happen in WebRTC sessions where the Forced Video Codec feature is set to `NONE`. It can also happen when publishing video from an IP Camera that produces its own non-configurable codec.

For example:

* With *Allow Transcoding* *enabled*, if Publisher "A" must send H.264 video (e.g. from an IP Camera), but Subscriber "B" can only receive VP8 (e.g. a very limited native WebRTC client), Kurento would take A's video, transcode it from H.264 to VP8 on the fly, and send the resulting media stream to B.

* With *Allow Transcoding* *enabled* and *Forced Video Codec* set to `NONE`, if Publisher "A" is a Chrome web browser (which favors using VP8), and Subscriber "B" is a Safari web browser (which favors using H.264), Kurento would take A's video, transcode it from VP8 to H.264 on the fly, and send the resulting media stream to B.

* With *Allow Transcoding* *disabled*, the participants would fail to communicate in both examples above. B would probably see a black video, or raise a decoding error.

In practice, **transcoding is rarely needed** for participants that are compliant with the WebRTC specification, because WebRTC mandates support for **both VP8 and H.264 codecs**. This is also why the choice of `MEDIA_SERVER_PREFERRED` translates to `VP8` for Kurento, in an attempt to avoid server-side transcoding by forcing everybody to use the same codec.


## Codecs on OpenVidu Recordings {: #recording }

### INDIVIDUAL recording

How media codecs are selected will have an impact on the OpenVidu's [INDIVIDUAL recording](advanced-features/recording/#individual-recording) feature, depending on the media server that is being used by OpenVidu:

* With Kurento, the [WebM](https://en.wikipedia.org/wiki/WebM) container format is used, and the recording file extension is `.webm`.

    This is a format that has great compatibility with all web browsers out there; you can play a WebM file back directly on a web browser, without any prior conversion, which is something that cannot be done with Matroska. However, WebM is not as flexible, only being able to store video encoded with VP8 or VP9 codecs.

    All Kurento recordings are stored with VP8 video; its automatic transcoding capabilities are used to ensure this. Incoming VP8-encoded video gets stored as-is, while other codecs (like H.264) get transcoded into VP8 before storing.

    Transcoding can have an expensive toll on CPU usage; for this reason, **we recommend to force VP8 when using Kurento as media server**, with *Forced Video Codec* set to either `VP8` or `MEDIA_SERVER_PREFERRED` (the default).

* With mediasoup, [Matroska](https://en.wikipedia.org/wiki/Matroska) is used instead, and the recording file extension is `.mkv`.

    The reasoning behind this choice is that mediasoup is not able to perform any kind of transcoding, so a flexible container format must be chosen such that (mostly) any codec can be stored in it, as-is from what Publishers send to the server.

    mediasoup recordings are stored with whatever video codec is sent by Publishers, which in turn can be configured in OpenVidu with the *Forced Video Codec* feature. If *Forced Video Codec* is set to `NONE`, every Publisher will use their platform's favored codec, meaning that different recorded files might end up with different codecs.

    For example, recordings from Firefox and Chrome would contain VP8 video, because that's the codec favored by those web browsers; meanwhile, recordings from Safari would end up containing H.264 video.


### COMPOSED recording

All of OpenVidu's [COMPOSED recording](advanced-features/recording/#composed-recording) files get generated the same way, and they are not affected by other features such as *Forced Video Codec*. COMPOSED recordings are actually made from adding a ghost participant in the session and recording its whole screen; this process uses AAC and H.264 for audio and video respectively, and they are stored into an MP4 container format, where the recording file extension is `.mp4`.


### Limitations {: #recording-limitations }

**mediasoup**:

* Recording VP9 is still an experimental feature that is not ready for use. As of current versions of OpenVidu, the resulting `.mkv` files are playable, but will only contain audio, and no video.



[VP8]: https://en.wikipedia.org/wiki/VP8
[VP9]: https://en.wikipedia.org/wiki/VP9
[H.264]: https://en.wikipedia.org/wiki/Advanced_Video_Coding
[H.265]: https://en.wikipedia.org/wiki/High_Efficiency_Video_Coding
[AV1]: https://en.wikipedia.org/wiki/AV1



<script>
function changeLangTab(event) {
  var parent = event.target.parentNode.parentNode;
  var txt = event.target.textContent || event.target.innerText;
  var txt = txt.replace(/\s/g, "-").toLowerCase();
  for (var i = 0; i < parent.children.length; i++) {
    var child = parent.children[i];
    // Change appearance of language buttons
    if (child.classList.contains("lang-tabs-header")) {
        for (var j = 0; j < child.children.length; j++) {
            var btn = child.children[j];
            if (btn.classList.contains("lang-tabs-btn")) {
                btn.style.backgroundColor = btn === event.target ? '#e8e8e8' : '#f9f9f9';
                btn.style.fontWeight = btn === event.target ? 'bold' : 'normal';
            }
        }
    }
    // Change visibility of language content
    if (child.classList.contains("lang-tabs-content")) {
        if (child.id === txt) {
            child.style.display = "block";
        } else {
            child.style.display = "none";
        }
    }
  }
}
</script>
