# Voice and video filters

OpenVidu API offers a simple way of applying filters to video and audio streams in the server side by making use of Kurento Media Server capabilities. This is the current status of filter support in OpenVidu:

- Real time filters are only available for **Kurento Media Server**. OpenVidu Enterprise edition supports mediasoup as media server, and audio and video filters are not compatible with it.
- You can apply **one filter at a time to a published Stream**. Every user subscribed to it will receive the modified stream.
- You can **remove an applied filter**.
- You can **call any remote method** offered by an applied filter
- You can **add and remove event listeners** to any event dispatched by an applied filter.
- You must configure the allowed filters the user will be able to apply when **creating the Connection**.

---

## Step by step

<br>
##### 1) Generate a Connection with the filters the user will be able to apply

This is a simple way of securing the ability of applying filters from OpenVidu Browser, so that not every user is able to apply any filter at any time.

<div class="lang-tabs-container" markdown="1">

<div class="lang-tabs-header">
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; font-weight: bold">REST API</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Java</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Node</button>
</div>

<div id="rest-api" class="lang-tabs-content" markdown="1">

When creating a Connection with method **[POST /openvidu/api/sessions/&lt;SESSION_ID&gt;/connection](reference-docs/REST-API#post-connection){:target="_blank"}** include in the JSON body a parameter `kurentoOptions` with a property `allowedFilters`: a string array containing the name of the filters the user will be able to apply

```json  
{
    "type": "WEBRTC",
    "data": "user_data",
    "role": "PUBLISHER",
    "kurentoOptions": {
        "allowedFilters": ["GStreamerFilter", "FaceOverlayFilter"]
    }
}
```

</div>

<div id="java" class="lang-tabs-content" style="display:none" markdown="1">

When creating a Connection, call `ConnectionProperties.Builder#connectionProperties(KurentoOptions)` to set `allowedFilters` value with method `KurentoOptions.Builder#allowedFilters(String[])`. This method receives a string array containing the name of the filters the user will be able to apply

```java
ConnectionProperties connectionProperties = new ConnectionProperties.Builder()
    .type(ConnectionType.WEBRTC)
    .data("user_data")
    .role(OpenViduRole.PUBLISHER)
    .kurentoOptions(
        new KurentoOptions.Builder()
            .allowedFilters(new String[]{"GStreamerFilter", "FaceOverlayFilter"})
            .build())
    .build();
Connection connection = session.createConnection(connectionProperties);
String token = connection.getToken(); // Send this string to the client side
```

</div>

<div id="node" class="lang-tabs-content" style="display:none" markdown="1">

When creating a Connection, include in [ConnectionProperties](api/openvidu-node-client/interfaces/connectionproperties.html){:target="_blank"} parameter a `kurentoOptions` object with `allowedFiters` property: a string array containing the name of the filters the user will be able to apply

```javascript
var connectionProperties = {
    role: "PUBLISHER",
    data: "user_data",
    kurentoOptions: {
        allowedFilters: ["GStreamerFilter", "FaceOverlayFilter"]
    }
};
session.createConnection(connectionProperties).then(connection => { 
    var token = connection.token; // Send this string to the client side
});
```

</div>

</div>

<br>
##### 2.A) Initialize a Publisher object configured for using a filter from the beginning of the publishing ...

Use [PublisherProperties](api/openvidu-browser/interfaces/PublisherProperties.html){:target="_blank"}, specifically property [filter](api/openvidu-browser/interfaces/PublisherProperties.html#filter){:target="_blank"}:

```javascript
var OV = new OpenVidu();
var publisher = OV.initPublisher(
    targetElement,
    filter: {
        type: "GStreamerFilter",
        options: {
            command: "videoflip method=vertical-flip"
        }
    }
);

// ... user already connected to "session" with the appropriate token of the created Connection
session.publish(publisher);
```

<br>
##### 2.B) ... or apply the filter dynamically after publishing the stream, whenever you want

```javascript
// ... user already connected to the session with the appropriate token of the created Connection
// and successfully publishing the Publisher object

publisher.stream.applyFilter("GStreamerFilter", { command: "videoflip method=vertical-flip" })
    .then(() => {
        console.log("Video rotated!");
    })
    .catch(error => {
        console.error(error);
    });
```

<br>
##### 3) You can execute any method offered by the filter

```javascript
// ... user already connected to the session with the appropriate token of the created Connection,
// successfully publishing the Publisher object and a filter being applied to its stream

publisher.stream.filter.execMethod("setElementProperty", {"propertyName":"method","propertyValue":"horizontal-flip"})
    .then(() => {
        console.log("Video rotation direction modified!");
    })
    .catch(error => {
        console.error(error);
    });
```

<br>
##### 4) You can also subscribe to any filter event (if it dispatches any), and later unsubscribe from it

```javascript
// ... user already connected to the session with the appropriate token of the created Connection,
// successfully publishing the Publisher object and a filter being applied to its stream

publisher.stream.filter.addEventListener("FooFilterEvent", filterEvent => {
        console.log('Filter event received!. Data: ' + filterEvent.data);
    });

...

publisher.stream.filter.removeEventListener("FooFilterEvent");
```

<br>
##### 4) To remove the filter

```javascript
// ... user already connected to the session with the appropriate token of the created Connection,
// successfully publishing the Publisher object and a filter being applied to its stream

publisher.stream.removeFilter()
    .then(() => {
        console.log("Filter removed");
    })
    .catch(error => {
        console.error(error);
    });
```

> Moderators are not only able to call all of these methods over their `Publisher.stream` object, but also over any `Subscriber.stream` object. Also, they don't need any special Connection permissions to apply filters (no need of `kurentoOptions` configuration in their Connection) and can bypass any restriction set to other Connections in this regard.

<br>

---

## Filter samples

#### GStreamer filters

These filters are set with _type_ `GStreamerFilter` and an _options_ parameter like this:

```javascript
publisher.stream.applyFilter("GStreamerFilter", {"command": "GSTREAMER_COMMAND"})
```

A list of interesting values for `GSTREAMER_COMMAND` parameter is stated below. Replace `GSTREAMER_COMMAND` in the upper code snippet for any of the examples provided in the following list items:

<br>

##### Video overlay filters

- **gdkpixbufoverlay** : overlays an image on top of the video. This is very useful, for example, to add a logo<br>Example: `gdkpixbufoverlay location=/images/img.png offset-x=10 offset-y=10 overlay-height=200 overlay-width=200`<br>Documentation: [Link](https://gstreamer.freedesktop.org/documentation/gdkpixbuf/gdkpixbufoverlay.html){:target="_blank"}<div style="margin-bottom: 7px"></div>
- **textoverlay** : overlays an embedded text on top of the video<br>Example: `textoverlay text="Embedded text" valignment=top halignment=right font-desc="Cantarell 25"`<br>Documentation: [Link](https://gstreamer.freedesktop.org/documentation/pango/textoverlay.html){:target="_blank"}<div style="margin-bottom: 7px"></div>
- **timeoverlay** : overlays the time the video stream has been playing<br>Example: `timeoverlay valignment=bottom halignment=right font-desc="Sans, 20"`<br>Documentation: [Link](https://gstreamer.freedesktop.org/documentation/pango/timeoverlay.html){:target="_blank"}<div style="margin-bottom: 7px"></div>
- **clockoverlay** : overlays a clock with the local time (in OpenVidu Server host)<br>Example: `clockoverlay valignment=bottom halignment=right shaded-background=true font-desc="Sans, 20"`<br>Documentation: [Link](https://gstreamer.freedesktop.org/documentation/pango/clockoverlay.html){:target="_blank"}<div style="margin-bottom: 7px"></div>

<br>

##### Video effect filters

- **videoflip** : rotates the video stream<br>Example: `videoflip method=vertical-flip`<br>Documentation: [Link](https://gstreamer.freedesktop.org/documentation/videofilter/videoflip.html){:target="_blank"}<div style="margin-bottom: 7px"></div>
- **videocrop** : crops the video steam<br>Example: `videocrop top=100 left=35 right=0 bottom=0`<br>Documentation: [Link](https://gstreamer.freedesktop.org/documentation/videocrop/videocrop.html){:target="_blank"}<div style="margin-bottom: 7px"></div>
- **videobox** : resizes a video stream by adding borders or cropping<br>Example: `videobox fill=black top=20 bottom=20 left=-10 right=-10`<br>Documentation: [Link](https://gstreamer.freedesktop.org/documentation/videobox/index.html){:target="_blank"}<div style="margin-bottom: 7px"></div>
- **chromahold** : removes all colors from the video stream except the RGB indicated one<br>Example: `chromahold target-r=0 target-g=0 target-b=255 tolerance=90`<br>Documentation: [Link](https://gstreamer.freedesktop.org/documentation/coloreffects/chromahold.html){:target="_blank"}<div style="margin-bottom: 7px"></div>
- **coloreffects** : applies different color filters to the video stream<br>Example: `coloreffects preset=heat`<br>Documentation: [Link](https://gstreamer.freedesktop.org/documentation/coloreffects/coloreffects.html){:target="_blank"}<div style="margin-bottom: 7px"></div>
- **videobalance** : changes different properties of the video stream such as brightness, contrast, hue or saturation<br>Example: `videobalance saturation=0.0`<br>Documentation: [Link](https://gstreamer.freedesktop.org/documentation/videofilter/videobalance.html){:target="_blank"}<div style="margin-bottom: 7px"></div>
- **gamma** : adjusts gamma level of the video stream<br>Example: `gamma gamma=5.0`<br>Documentation: [Link](https://gstreamer.freedesktop.org/documentation/videofilter/gamma.html){:target="_blank"}<div style="margin-bottom: 7px"></div>
- **videomedian** : adds a median filter to the video stream<br>Example: `videomedian filtersize=9 lum-only=false`<br>Documentation: [Link](https://gstreamer.freedesktop.org/documentation/videofilter/videomedian.html){:target="_blank"}<div style="margin-bottom: 7px"></div>
- Many effects of **[effectv project](https://wiki.gnome.org/Projects/GnomeVideoEffects/Effects){:target="_blank"}** : funny filters for the video stream like `agingtv`, `dicetv`, `optv`, `quarktv`, `radioactv`, `revtv`, `rippletv`, `shagadelictv`, `streaktv`, `vertigotv`, `warptv`<br>Example: `radioactv`

<br>

##### Audio filters

- **audioecho** : adds reverb to the audio stream<br>Example: `audioecho delay=50000000 intensity=0.6 feedback=0.4`<br>Documentation: [Link](https://gstreamer.freedesktop.org/documentation/audiofx/audioecho.html){:target="_blank"}<div style="margin-bottom: 7px"></div>
- **audioamplify** : amplifies an audio stream by a given factor<br>Example: `audioamplify amplification=1.5 clipping-method=wrap-positive`<br>Documentation: [Link](https://gstreamer.freedesktop.org/documentation/audiofx/audioamplify.html){:target="_blank"}<div style="margin-bottom: 7px"></div>
- **pitch** : controls the pitch of an audio stream<br>Example: `pitch pitch=1.2`<br>Documentation: [Link](https://gstreamer.freedesktop.org/documentation/soundtouch/pitch.html){:target="_blank"}<div style="margin-bottom: 7px"></div>
- Other audio filters: check them out in [GStreamer site](https://gstreamer.freedesktop.org/data/doc/gstreamer/head/gst-plugins-good-plugins/html/gst-plugins-good-plugins-plugin-audiofx.html){:target="_blank"}<div style="margin-bottom: 7px"></div>

> All available GStreamer plugins can be found in [GStreamer site](https://gstreamer.freedesktop.org/documentation/plugins_doc.html){:target="_blank"}.


#### Kurento filters

<br>

- **FaceOverlayFilter** _(overlay an image over detected faces)_

        publisher.stream.applyFilter("FaceOverlayFilter")
            .then(filter => {
                filter.execMethod(
                    "setOverlayedImage",
                    {
                        "uri":"https://cdn.pixabay.com/photo/2013/07/12/14/14/derby-148046_960_720.png",
                        "offsetXPercent":"-0.2F",
                        "offsetYPercent":"-0.8F",
                        "widthPercent":"1.3F",
                        "heightPercent":"1.0F"
                    });
            });

<br>

- **ChromaFilter** _(set a chroma background)_

        publisher.stream.applyFilter(
            "ChromaFilter",
            {
                "window": {
                    "topRightCornerX": 0,
                    "topRightCornerY": 0,
                    "width": 50,
                    "height": 50
                },
                "backgroundImage": "https://www.maxpixel.net/static/photo/1x/Cool-Blue-Liquid-Lake-Abstract-Background-Clear-316144.jpg"
            });

> You must install Kurento ChromaFilter library in the same host as Kurento Media Server: `sudo apt-get install kms-chroma`

<br>

- **ZBarFilter** _(detect and read bar codes information)_

        publisher.stream.applyFilter("ZBarFilter")
            .then(filter => {
                filter.addEventListener("CodeFound", filterEvent => {
                    console.log('Bar code found!. Data: ' + filterEvent.data);
                }
            });

<br>

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
