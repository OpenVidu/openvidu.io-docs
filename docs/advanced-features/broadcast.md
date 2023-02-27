# Broadcast to YouTube/Twitch

- **[How does broadcasting work](#how-does-broadcasting-work)**
- **[Customize your broadcast](#customize-your-broadcast)**
    - [Custom broadcast layouts](#custom-broadcast-layouts)
- **[Scalable braodcasting](#scalable-broadcasting)**
- **[Use your own RTMP server](#use-your-own-rtmp-server)**

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

You can easily broadcast your OpenVidu sessions to **YouTube Live**, **Twitch** or any other **live ingestion service**.

<div class="row">
    <div class="pro-gallery" style="margin: 20px 0">
        <a data-fancybox="gallery" data-type="image" href="img/docs/advanced-features/broadcast.png" class="fancybox-img"><img class="img-responsive" style="margin: auto; max-height: 550px" src="img/docs/advanced-features/broadcast.png"/></a>
    </div>
</div>

## How does broadcasting work

To start the broadcast of your OpenVidu session you just need to call the appropriate method passing the identifier of the session to broadcast and the URL of the ingestion service. These URLs usually start with `rtmp://` or `rtmps://`.

<div class="lang-tabs-container" markdown="1">

<div class="lang-tabs-header">
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; color: black">Java</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Node</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">cURL</button>
</div>

<div id="java" class="lang-tabs-content" markdown="1">

```java
OpenVidu openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
Session session = openvidu.createSession();

// After some participant starts publishing to the session...
openvidu.startBroadcast(session.getSessionId(), "rtmp://live.twitch.tv/app/{STREAM_KEY}");
```

See [JavaDoc](api/openvidu-java-client/io/openvidu/java/client/OpenVidu.html#startBroadcast(java.lang.String,java.lang.String)){:target="_blank"}

</div>

<div id="node" class="lang-tabs-content" style="display:none" markdown="1">

```javascript
const openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
const session = openvidu.createSession();

// After some participant starts publishing to the session...

await openvidu.startBroadcast(sessionId, "rtmp://live.twitch.tv/app/{STREAM_KEY}");
```

See [TypeDoc](api/openvidu-node-client/classes/OpenVidu.html#startBroadcast){:target="_blank"}

</div>

<div id="curl" class="lang-tabs-content" style="display:none" markdown="1">

Use method [POST /openvidu/api/broadcast/start](reference-docs/REST-API#start-broadcast)

```sh
curl -X POST https://<DOMAIN_OR_PUBLIC_IP>/openvidu/api/broadcast/start \
     -u OPENVIDUAPP:<YOUR_SECRET> \
     -H "Content-Type: application/json" \
     -d '{ "session": "ses_YnDaGYNcd7", "broadcastUrl": "rtmp://live.twitch.tv/app/{STREAM_KEY}" }'
```

</div>

</div>

<br>

To stop the broadcast of your OpenVidu session:

<div class="lang-tabs-container" markdown="1">

<div class="lang-tabs-header">
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; color: black">Java</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Node</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">cURL</button>
</div>

<div id="java" class="lang-tabs-content" markdown="1">

```java
openvidu.stopBroadcast(session.getSessionId());
```

See [JavaDoc](api/openvidu-java-client/io/openvidu/java/client/OpenVidu.html#stopBroadcast(java.lang.String)){:target="_blank"}

</div>

<div id="node" class="lang-tabs-content" style="display:none" markdown="1">

```javascript
await openvidu.stopBroadcast(sessionId);
```

See [TypeDoc](api/openvidu-node-client/classes/OpenVidu.html#stopBroadcast){:target="_blank"}

</div>

<div id="curl" class="lang-tabs-content" style="display:none" markdown="1">

Use method [POST /openvidu/api/broadcast/stop](reference-docs/REST-API#stop-broadcast)

```sh
curl -X POST https://<DOMAIN_OR_PUBLIC_IP>/openvidu/api/broadcast/stop \
     -u OPENVIDUAPP:<YOUR_SECRET> \
     -H "Content-Type: application/json" \
     -d '{ "session": "ses_YnDaGYNcd7" }'
```

</div>

</div>

<br>

---

## Customize your broadcast

<br>

The broadcast service uses the same underlying module than the [COMPOSED recording](advanced-features/recording/#composed-recording) service. This means that you can use the same properties to customize the broadcast as you would do with a COMPOSED recording:

<div class="lang-tabs-container" markdown="1">

<div class="lang-tabs-header">
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; color: black">Java</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Node</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">cURL</button>
</div>

<div id="java" class="lang-tabs-content" markdown="1">

```java
OpenVidu openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
Session session = openvidu.createSession();

// After some participant starts publishing to the session...
RecordingProperties properties = new RecordingProperties.Builder()
  .recordingLayout(RecordingLayout.BEST_FIT)
  .resolution("1280x720")
  .frameRate(15)
  .build();
openvidu.startBroadcast(session.getSessionId(), "rtmp://live.twitch.tv/app/{STREAM_KEY}", properties);
```

See [JavaDoc](api/openvidu-java-client/io/openvidu/java/client/OpenVidu.html#startBroadcast(java.lang.String,java.lang.String,io.openvidu.java.client.RecordingProperties)){:target="_blank"}

</div>

<div id="node" class="lang-tabs-content" style="display:none" markdown="1">

```javascript
const openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
const session = openvidu.createSession();

// After some participant starts publishing to the session...
const properties = {
    recordingLayout: "BEST_FIT",
    resolution: "1280x720",
    frameRate: 15
}
await openvidu.startBroadcast(sessionId, "rtmp://live.twitch.tv/app/{STREAM_KEY}", properties);
```

See [TypeDoc](api/openvidu-node-client/classes/OpenVidu.html#startBroadcast){:target="_blank"}

</div>

<div id="curl" class="lang-tabs-content" style="display:none" markdown="1">

Use method [POST /openvidu/api/broadcast/start](reference-docs/REST-API#start-broadcast) passing the desired properties in the body request.

```sh
curl -X POST https://<DOMAIN_OR_PUBLIC_IP>/openvidu/api/broadcast/start \
     -u OPENVIDUAPP:<YOUR_SECRET> \
     -H "Content-Type: application/json" \
     --data-binary @- <<BODY
     {
       "session": "ses_YnDaGYNcd7",
       "broadcastUrl": "rtmp://live.twitch.tv/app/{STREAM_KEY}",
       "recordingLayout": "BEST_FIT",
       "resolution": "1280x720",
       "frameRate": 15
     }
BODY
```

</div>

</div>

<br>

The actual recording properties that take effect when applied to a broadcast are a subset of the recording properties, which includes:

- `hasAudio`
- `resolution`
- `frameRate`
- `recordingLayout`
- `customLayout`
- `shmSize`
- `mediaNode`

You can read a complete description of them in the [REST API docs](reference-docs/REST-API/#start-broadcast).

### Custom broadcast layouts

The default layout used when broadcasting an OpenVidu Session will evenly distribute each published stream in the available space. But you can implement your own  custom layout with HTML/CSS/JS. This is exactly the same and works in the same way as explained in this COMPOSED recording section: [Custom recording layouts](advanced-features/recording/#custom-recording-layouts). Everything that is explained there for the custom layouts of COMPOSED recordings applies equally to the custom layouts of the broadcasts.

<br>

---

## Scalable broadcasting

By default the broadcast module runs in the same Media Node hosting the broadcasted Session (see [OpenVidu Pro architecture](openvidu-pro/scalability/#openvidu-pro-architecture)). Hosting the broadcast in the same Media Node as its session is the optimal and default choice, as the media doesn't need to be sent across different Media Nodes, saving network traffic. But you can decide to start the broadcast of a particular session in a different Media Node, if your specific use case can take advantage of it:

<div class="lang-tabs-container" markdown="1">

<div class="lang-tabs-header">
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; color: black">Java</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Node</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">cURL</button>
</div>

<div id="java" class="lang-tabs-content" markdown="1">

```java
RecordingProperties properties = new RecordingProperties.Builder()
    .mediaNode("media_i-1234567890abcdef0") // The string being the unique ID of an existing Media Node
    .build();
openvidu.startBroadcast(session.getSessionId(), "rtmp://live.twitch.tv/app/{STREAM_KEY}", properties);
```

See [JavaDoc](api/openvidu-java-client/io/openvidu/java/client/OpenVidu.html#startBroadcast(java.lang.String,java.lang.String,io.openvidu.java.client.RecordingProperties)){:target="_blank"}

</div>

<div id="node" class="lang-tabs-content" style="display:none" markdown="1">

```javascript
const properties = {
    mediaNode: {id: "media_i-1234567890abcdef0"} // The string being the unique ID of an existing Media Node
}
await openvidu.startBroadcast(sessionId, "rtmp://live.twitch.tv/app/{STREAM_KEY}", properties);
```

See [TypeDoc](api/openvidu-node-client/classes/OpenVidu.html#startBroadcast){:target="_blank"}

</div>

<div id="curl" class="lang-tabs-content" style="display:none" markdown="1">

When starting the broadcast of a session with method [POST /openvidu/api/broadcast/start](reference-docs/REST-API#start-broadcast) you can force the Media Node where to start the broadcast by providing parameter `mediaNode`

```sh
curl -X POST https://<DOMAIN_OR_PUBLIC_IP>/openvidu/api/recordings/start \
     -u OPENVIDUAPP:<YOUR_SECRET> \
     -H "Content-Type: application/json" \
     --data-binary @- <<BODY
     {
       "session": "ses_YnDaGYNcd7",
       "broadcastUrl": "rtmp://live.twitch.tv/app/{STREAM_KEY}",
       "mediaNode": { "id": "media_i-1234567890abcdef0" }
     }
BODY
```

</div>

</div>

<br>

If the provided Media Node does not exist or its status is not valid for starting a broadcast, then a `400 BAD_REQUEST` response is returned. The active broadcasts that are hosted by a Media Node at any given time are available in the [Media Node object](reference-docs/REST-API/#the-media-node-object) of the REST API, in attribute `broadcasts`.

<br>

---

## Use your own RTMP server

OpenVidu broadcasting API allows you to live-stream your OpenVidu sessions to any kind of RTMP ingestion service. This includes not only popular services such as YouTube or Twitch, but also custom RTMP servers. For example, NGINX offers an RTMP module that easily allows setting up a live-streaming server for your OpenVidu sessions to be consumed by thousands of users: **[NGINX RTMP](https://www.nginx.com/products/nginx/modules/rtmp-media-streaming/)**.

<br>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js"></script>
<script type='text/javascript' src='js/fancybox-setup.js'></script>

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
                btn.style.color = btn === event.target ? 'black' : '#777';
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