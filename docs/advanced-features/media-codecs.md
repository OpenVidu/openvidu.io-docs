<h2 id="section-title">Media Codecs</h2>

---

OpenVidu is able to handle WebRTC media streams by using different media servers in the backend, depending on its configuration:

* [Kurento](https://www.kurento.org/)
* [mediasoup](https://mediasoup.org/) <span id="openvidu-pro-tag" style="display: inline-block; background-color: #9c27b0; color: white; font-weight: bold; padding: 0px 5px; margin-left: 5px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">ENTERPRISE</span>

These are selected with the `OPENVIDU_ENTERPRISE_MEDIA_SERVER` parameter in the OpenVidu's `.env` configuration file.

While OpenVidu goes to great lengths to hide the differences between each media server, there are some key aspects that cannot be abstracted away and will have a direct impact on how applications work. One such aspect is how video codecs are handled between participants in a session, depending on the [OpenVidu configuration](https://docs.openvidu.io/en/stable/reference-docs/openvidu-config/).

Table of Contents:

[TOC]

---

## Codecs on Session

### Forced Video Codec

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

Initialize your Session object with **[POST /openvidu/api/sessions](reference-docs/REST-API/#post-session){:target="_blank"}**, passing `{ "forcedVideoCodec": "<VALUE>" }`.

</div>

<div id="java" class="lang-tabs-content" style="display:none" markdown="1">

```java
OpenVidu openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
SessionProperties sessionProperties = new SessionProperties.Builder()
    .forcedVideoCodec(VideoCodec.<VALUE>)
    .build();
Session session = openVidu.createSession(sessionProperties);
```

See [JavaDoc](api/openvidu-java-client/io/openvidu/java/client/SessionProperties.Builder.html#forcedVideoCodec(io.openvidu.java.client.VideoCodec)){:target="_blank"}.

</div>

<div id="node" class="lang-tabs-content" style="display:none" markdown="1">

```javascript
const openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
const sessionProperties = { forcedVideoCodec: VideoCodec.<VALUE> };
const session = openvidu.createSession(sessionProperties);
```

See [TypeDoc](api/openvidu-node-client/interfaces/sessionproperties.html#forcedvideocodec){:target="_blank"}.

</div>

</div>

<br>

Possible values are:

* **`MEDIA_SERVER_PREFERRED`**: A recommended choice is done for you, based on the media server that is currently in use. This is the default setting, and gets automatically translated into these values:
    - For *mediasoup*, the selected value is *NONE*.
    - For *Kurento*, the selected value is *VP8*.
* **`NONE`**: No specific codec is enforced. This means that a negotiation will occur between the media server and every participant, where the client platform's preferred codec will be given preference whenever possible.
* **`VP8`**: All participants will use the [VP8](https://en.wikipedia.org/wiki/VP8) codec.
* **`VP9`**: All participants will use the [VP9](https://en.wikipedia.org/wiki/VP9) codec.
* **`H264`**: All participants will use the [H.264](https://en.wikipedia.org/wiki/Advanced_Video_Coding) codec.


### Allow Transcoding (Kurento only)

Kurento media server is able to automatically convert between different codecs on the fly, if the need arises. This is called *transcoding*, and is a great way to ensure compatibility between endpoints; however, it is also a [very CPU intensive operation](https://doc-kurento.readthedocs.io/en/latest/user/troubleshooting.html#cpu-usage-grows-too-high).

The `OPENVIDU_STREAMS_ALLOW_TRANSCODING` setting is a *true* / *false* value that can be used to allow Kurento doing this conversion of codecs between participants. When this setting is enabled, two participants that are definitely unable to agree on a common codec will make Kurento transcode one's media into something that the other is able to receive.

When this setting is disabled, Kurento will not try to accommodate codecs that are incompatible. This means that if two participants are unable to agree on a codec supported by both, they won't be able to communicate.

For example:

* With ALLOW_TRANSCODING, if participant A is *only* able to send VP8 video, but participant B is *only* able to receive H.264, Kurento would take A's video, transcode it from VP8 to H.264 on the fly, and send the resulting media stream to B.
* Without ALLOW_TRANSCODING, the participants would fail to communicate. B would probably see a black video, or raise a decoding error.

In practice, transcoding is rarely needed because all implementations of WebRTC must include support for both VP8 *and* H.264 codecs. It is rare that two given participants are not able to find a common codec. However, such situation might arise in other scenarios like when using IP cameras or other specialized hardware.


## Codecs on Recording

How media codecs are selected will have an impact on the [OpenVidu's Recording](https://docs.openvidu.io/en/stable/advanced-features/recording/) feature. The *INDIVIDUAL* recording mode will generate different file formats, depending on the media server that is being used by OpenVidu:

* For *mediasoup*, the [Matroska](https://en.wikipedia.org/wiki/Matroska) container format is used; the recording file extension is `.mkv`.

    The reasoning behind this choice is that mediasoup is not able to perform any kind of transcoding, so a flexible container format must be chosen such that (mostly) any codec can be stored in it, as-is from what the client sends to the server.

* For *Kurento*, [WebM](https://en.wikipedia.org/wiki/WebM) is used instead; the recording file extension is `.webm`.

    This is a format that has great compatibility with all web browsers out there; you can play a WebM file back directly on a web browser, without any prior conversion, which is something that cannot be done with Matroska. However, WebM is not as flexible, only being able to store video encoded with VP8 or VP9 codecs. This is safe to do with Kurento, because its automatic transcoding capabilities will ensure that the correct codec is used for the recording. Read on the section below for more details.


### Limitations

**mediasoup**:

* VP9 + Matroska is still an experimental feature in FFmpeg. In our tests, the resulting `.mkv` file is playable, but it only contains audio, and no video.


### Transcoding on recording (Kurento only)

While the mediasoup media server will receive and store a media stream as-is, without any further processing, Kurento doesn't have this requirement and is able to convert the incoming media into a suitable format for recording. For this reason, when using the mediasoup media server, the recording format is forced to be Matroska, however with Kurento, the recording format can be set to the more compatible WebM format.

As of current versions, Kurento will store any VP8-encoded video as-is into a WebM container; any other codecs (like H.264) will be transcoded into VP8 before storing. This ensures that the output format is a well-formed WebM file, but this process can have an expensive toll on CPU usage.

For this reason, **we recommend to force the VP8 video codec when using Kurento as media server** (`OPENVIDU_STREAMS_FORCED_VIDEO_CODEC=VP8`).
