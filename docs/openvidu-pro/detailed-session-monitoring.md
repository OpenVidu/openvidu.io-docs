<h2 id="section-title">Detailed session monitoring</h2>
<hr>

<p style="font-size: 18px; color: #7a7a7a; margin-top: 30px; padding: 4px;">
OpenVidu Pro brings the power of <a href="https://www.elastic.co/" target="_blank">Elastic Stack</a>. Events and monitoring stats are sent to <a href="https://www.elastic.co/products/elasticsearch/" target="_blank">Elasticsearch</a> and can be visualized through <a href="https://www.elastic.co/products/kibana/" target="_blank">Kibana</a>.
</p>

#### OpenVidu Sessions dahsboard

This dashboard presents a summary of your video sessions and the server resources usage. That includes:

- CPU and memory usage of the server
- The number of session per day
- The location of your users
- The number of publishers and subscribers you have at any time
- The total streamed minutes over time
- Some low-level interesting stats related to the media connections

The last point includes things like the average time to select a pair candidate during the negotiation process, the average milliseconds your clients take to complete the ICE gathering process with OpenVidu Server, the ratio of successful and failed connections, and some WebRTC stats for your published and subscribed streams (Jitter, packet loss, Round-Trip-Time, target bitrate...)

All in all, this information will help you understand better the behavior and performance of your sessions.

<br>

<div class="row">
    <div style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro1" href="/img/docs/openvidu-pro/elastic/sessions-dashboard.png"><img class="img-responsive img-pro" src="/img/docs/openvidu-pro/elastic/sessions-dashboard.png"/></a>
    </div>
</div>

---

#### OpenVidu Recordings dahsboard

This dashboard presents at a glance the status of your recordings. It includes information such as:

- The total number of recordings per day
- Average duration and size of your recorded files
- The distributions of you recordings by duration and size
- The ratio of recordings according to their output mode ([COMPOSED](/advanced-features/recording/#composed-recording){:target="_blank"} or [INDIVIDUAL](/advanced-features/recording/#individual-stream-recording){:target="_blank"} recordings) and their recorded tracks ([audio/video recordings](/advanced-features/recording/#audio-only-and-video-only-recordings){:target="_blank"})

<br>

<div class="row">
    <div style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro2" href="/img/docs/openvidu-pro/elastic/recordings-dashboard.png"><img class="img-responsive img-pro" src="/img/docs/openvidu-pro/elastic/recordings-dashboard.png"/></a>
    </div>
</div>

---

#### Accessing Kibana

OpenVidu Pro serves Kibana through path **/kibana**. So, if you have deployed OpenVidu Pro with domain **my.domain.com**, you will be able to access OpenVidu Inspector through **https://my.domain.com/inspector** and Kibana through **https://my.domain.com/kibana**

This path is secured with Basic Auth, so when connecting to it for the first time you will have to enter the user and password specified when deploying OpenVidu Pro.

<br>

---

#### Creating your own visualizations and dashboards

The dashboards presented above, by default included in OpenVidu Pro, are just an example of what can be done thanks to Kibana. You can create your own visualizations, and set up your very own dashboards with them. To do so, you have available multiple events that OpenVidu Pro periodically stores in Elasticsearch, and you can then use them in Kibana to compose different types of graphs and other useful visual representations.

<p align="center">
  <img class="img-responsive openvidu-pro-img" style="padding: 20px 0 8px 0" src="/img/docs/openvidu-pro/elastic/elastic-stack.png">
</p>

Each one of these events stored by OpenVidu Pro in Elasticsearch has an `elastic_type` field to identify the specific type of event. This field may be:

<div>

<div class="monitoring-div">

<div class="version-buttons">
  <a onclick="changeVersion(event)" class="btn btn-xs btn-primary pressed-btn" title="2.9.0">2.9.0/2.10.0</a>
  <a onclick="changeVersion(event)" class="btn btn-xs btn-primary pressed-btn" title="2.11.0">2.11.0</a>
</div>

<div id="list-290" class="version-container" markdown="1" style="margin-right: 5px">

- `cdr`: event of Call Detail Record. Can take multiple forms according to the type of event (see [OpenVidu CDR](/reference-docs/openvidu-server-cdr/){:target="_blank"})
- `kms`: Kurento Media Server event. These events are always associated to one WebRTC endpoint (a publisher or a subscriber). Can take multiple forms according to the type of event (see [Kurento docs](https://doc-kurento.readthedocs.io/en/latest/features/events.html){:target="_blank"})
- `monitoringStats`: event of CPU, memory and network statistics usage of OpenVidu Pro host
- `webrtcStats`: event of WebRTC statistics for each media endpoint established in Kurento Media Server
- `sessionSummary`: summary of a session, stored once it is closed
- `recordingSummary`: summary of a recording, stored once its session is closed
- `userSummary`: summary of a user, stored once its session is closed
- `connectionSummary`: summary of a connection, stored once its session is closed
- `publisherSummary`: summary of a publisher, stored once its session is closed
- `subscriberSummary`: summary of a subscriber, stored once its session is closed

</div>

<div id="content-290" class="lang-tabs-container elastic-events version-container" markdown="1">

<div class="lang-tabs-header">
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; font-weight: bold">cdr</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">kms</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">monitoringStats</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">webrtcStats</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">sessionSummary</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">recordingSummary</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">userSummary</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">connectionSummary</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">publisherSummary</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">subscriberSummary</button>
</div>

<div id="cdr" class="lang-tabs-content" markdown="1">
```json
{
  "sessionId": "weih6kaewklr4i05",
  "timestamp": 1554191848252,
  "startTime": 1554191765889,
  "duration": 82,
  "reason": "lastParticipantLeft",
  "event": "sessionDestroyed",
  "elastic_type": "cdr"
}
```
</div>

<div id="kms" class="lang-tabs-content" style="display:none" markdown="1">
```json
{
  "streamId": 1,
  "componentId": 1,
  "state": "READY",
  "type": "IceComponentStateChange",
  "timestamp": 1554191839098,
  "session": "weih6kaewklr4i05",
  "user": "6596FB7B9D1A7C25",
  "connection": "ewztvkfl8dttvcxk",
  "endpoint": "ewztvkfl8dttvcxk_bahnv2b0n5fxbohy_CAMERA_XHIHV",
  "msSinceEndpointCreation": 11104,
  "elastic_type": "kms"
}
```
</div>

<div id="monitoringstats" class="lang-tabs-content" style="display:none" markdown="1">
```json
{
  "timestamp": 1554212258873,
  "cpu": 11.887875624741168,
  "mem": {
    "used": 7287344,
    "percentage": 45.13347034796033
  },
  "net": {
    "veth2b4c47c": {
      "rxBytes": 0,
      "txBytes": 0
    },
    "wlp58s0": {
      "rxBytes": 0,
      "txBytes": 0
    }
  },
  "elastic_type": "monitoringStats"
}
```
</div>

<div id="webrtcstats" class="lang-tabs-content" style="display:none" markdown="1">
```json
{
  "session": "weih6kaewklr4i05",
  "user": "6596FB7B9D1A7C25",
  "connection": "bahnv2b0n5fxbohy",
  "endpoint": "bahnv2b0n5fxbohy_CAMERA_XHIHV",
  "mediaType": "video",
  "jitter": 0.005244444590061903,
  "bytesReceived": 6455233,
  "packetsReceived": 6666,
  "packetsLost": 0,
  "timestamp": 1554191847505,
  "fractionLost": 0,
  "remb": 533208,
  "firCount": 6,
  "pliCount": 0,
  "nackCount": 0,
  "sliCount": 0,
  "elastic_type": "webrtcStats"
}
```
</div>

<div id="sessionsummary" class="lang-tabs-content" style="display:none" markdown="1">
```json
{
  "createdAt": 1554191765889,
  "destroyedAt": 1554191848252,
  "sessionId": "weih6kaewklr4i05",
  "customSessionId": "",
  "mediaMode": "ROUTED",
  "recordingMode": "MANUAL",
  "duration": 82,
  "reason": "lastParticipantLeft",
  "users": {
    "numberOfElements": 1,
    "content": [
      {
        "id": "6596FB7B9D1A7C25",
        "location": "Mumbai, India",
        "platform": "Chrome 72.0.3626.109 on Linux 64-bit",
        "connections": {
          "numberOfElements": 1,
          "content": [
            {
              "createdAt": 1554191765994,
              "destroyedAt": 1554191848249,
              "connectionId": "bahnv2b0n5fxbohy",
              "clientData": "",
              "serverData": "",
              "duration": 82,
              "reason": "disconnect",
              "publishers": {
                "numberOfElements": 1,
                "content": [
                  {
                    "sessionId": "weih6kaewklr4i05",
                    "timestamp": 1554191848247,
                    "startTime": 1554191767577,
                    "duration": 80,
                    "reason": "disconnect",
                    "streamId": "bahnv2b0n5fxbohy_CAMERA_XHIHV",
                    "videoSource": "CAMERA",
                    "videoFramerate": -1,
                    "videoDimensions": "{\"width\":640,\"height\":480}",
                    "audioEnabled": true,
                    "videoEnabled": true,
                    "session": "weih6kaewklr4i05",
                    "user": "6596FB7B9D1A7C25",
                    "connection": "bahnv2b0n5fxbohy",
                    "elastic_type": "publisherSummary"
                  }
                ]
              },
              "subscribers": {
                "numberOfElements": 0,
                "content": []
              },
              "geoPoints": "19.09,72.87",
              "session": "weih6kaewklr4i05",
              "user": "6596FB7B9D1A7C25",
              "timestamp": 1554191848252,
              "elastic_type": "connectionSummary"
            }
          ]
        },
        "session": "weih6kaewklr4i05",
        "timestamp": 1554191848252,
        "elastic_type": "userSummary"
      }
    ]
  },
  "recordings": {
    "numberOfElements": 1,
    "content": [
      {
        "sessionId": "weih6kaewklr4i05",
        "timestamp": 1554191784531,
        "startTime": 1554191770662,
        "duration": 9.734,
        "reason": "recordingStoppedByServer",
        "id": "weih6kaewklr4i05",
        "name": "RecordingTest",
        "outputMode": "COMPOSED",
        "resolution": "1920x1080",
        "recordingLayout": "BEST_FIT",
        "hasAudio": true,
        "hasVideo": true,
        "size": 1968384,
        "elastic_type": "recordingSummary"
      }
    ]
  }
}
```
</div>

<div id="recordingsummary" class="lang-tabs-content" style="display:none" markdown="1">
```json
{
  "sessionId": "weih6kaewklr4i05",
  "timestamp": 1554191784531,
  "startTime": 1554191770662,
  "duration": 9.734,
  "reason": "recordingStoppedByServer",
  "id": "weih6kaewklr4i05",
  "name": "RecordingTest",
  "outputMode": "COMPOSED",
  "resolution": "1920x1080",
  "recordingLayout": "BEST_FIT",
  "hasAudio": true,
  "hasVideo": true,
  "size": 1968384,
  "elastic_type": "recordingSummary"
}
```
</div>

<div id="usersummary" class="lang-tabs-content" style="display:none" markdown="1">
```json
{
  "id": "6596FB7B9D1A7C25",
  "location": "Mumbai, India",
  "platform": "Chrome 72.0.3626.109 on Linux 64-bit",
  "connections": {
    "numberOfElements": 1,
    "content": [
      {
        "createdAt": 1554191765994,
        "destroyedAt": 1554191848249,
        "connectionId": "bahnv2b0n5fxbohy",
        "clientData": "",
        "serverData": "",
        "duration": 82,
        "reason": "disconnect",
        "publishers": {
          "numberOfElements": 1,
          "content": [
            {
              "sessionId": "weih6kaewklr4i05",
              "timestamp": 1554191848247,
              "startTime": 1554191767577,
              "duration": 80,
              "reason": "disconnect",
              "streamId": "bahnv2b0n5fxbohy_CAMERA_XHIHV",
              "videoSource": "CAMERA",
              "videoFramerate": -1,
              "videoDimensions": "{\"width\":640,\"height\":480}",
              "audioEnabled": true,
              "videoEnabled": true,
              "session": "weih6kaewklr4i05",
              "user": "6596FB7B9D1A7C25",
              "connection": "bahnv2b0n5fxbohy",
              "elastic_type": "publisherSummary"
            }
          ]
        },
        "subscribers": {
          "numberOfElements": 0,
          "content": []
        },
        "geoPoints": "19.09,72.87",
        "session": "weih6kaewklr4i05",
        "user": "6596FB7B9D1A7C25",
        "timestamp": 1554191848252,
        "elastic_type": "connectionSummary"
      }
    ]
  },
  "session": "weih6kaewklr4i05",
  "timestamp": 1554191848252,
  "elastic_type": "userSummary"
}
```
</div>

<div id="connectionsummary" class="lang-tabs-content" style="display:none" markdown="1">
```json
{
  "createdAt": 1554191765994,
  "destroyedAt": 1554191848249,
  "connectionId": "bahnv2b0n5fxbohy",
  "clientData": "",
  "serverData": "",
  "duration": 82,
  "reason": "disconnect",
  "publishers": {
    "numberOfElements": 1,
    "content": [
      {
        "sessionId": "weih6kaewklr4i05",
        "timestamp": 1554191848247,
        "startTime": 1554191767577,
        "duration": 80,
        "reason": "disconnect",
        "streamId": "bahnv2b0n5fxbohy_CAMERA_XHIHV",
        "videoSource": "CAMERA",
        "videoFramerate": -1,
        "videoDimensions": "{\"width\":640,\"height\":480}",
        "audioEnabled": true,
        "videoEnabled": true,
        "session": "weih6kaewklr4i05",
        "user": "6596FB7B9D1A7C25",
        "connection": "bahnv2b0n5fxbohy",
        "elastic_type": "publisherSummary"
      }
    ]
  },
  "subscribers": {
    "numberOfElements": 0,
    "content": []
  },
  "session": "weih6kaewklr4i05",
  "user": "6596FB7B9D1A7C25",
  "timestamp": 1554191848252,
  "elastic_type": "connectionSummary"
}
```
</div>

<div id="publishersummary" class="lang-tabs-content" style="display:none" markdown="1">
```json
{
  "sessionId": "weih6kaewklr4i05",
  "timestamp": 1554191848247,
  "startTime": 1554191767577,
  "duration": 80,
  "reason": "disconnect",
  "streamId": "bahnv2b0n5fxbohy_CAMERA_XHIHV",
  "videoSource": "CAMERA",
  "videoFramerate": -1,
  "videoDimensions": "{\"width\":640,\"height\":480}",
  "audioEnabled": true,
  "videoEnabled": true,
  "session": "weih6kaewklr4i05",
  "user": "6596FB7B9D1A7C25",
  "connection": "bahnv2b0n5fxbohy",
  "elastic_type": "publisherSummary"
}
```
</div>

<div id="subscribersummary" class="lang-tabs-content" style="display:none" markdown="1">
```json
{
  "sessionId": "weih6kaewklr4i05",
  "timestamp": 1553694100398,
  "startTime": 1553693956035,
  "duration": 144,
  "reason": "disconnect",
  "streamId": "dbslbhe2jzhhybvj_CAMERA_CSBVI",
  "receivingFrom": "dbslbhe2jzhhybvj",
  "videoSource": "CAMERA",
  "videoFramerate": 30,
  "videoDimensions": "{\"width\":640,\"height\":480}",
  "audioEnabled": true,
  "videoEnabled": true,
  "session": "TestSession",
  "user": "A06BB386A40BBC83",
  "connection": "c1tgrtyzlmeix6l3",
  "elastic_type": "subscriberSummary"
}
```
</div>

</div>
</div>
</div>
</div>

<br>

> **NOTE 1**: `sessionSummary` contains all the information available in the rest of summary documents, including an array of `recordingSummary` and an array of `userSummary`. In turn `userSummary` contains an array of `connectionSummary`, that finally contains an array of `publisherSummary` and other of `subscriberSummary`.
> To sum up, this is just a denormalization of the `sessionSummary` document, so Elasticsearch requests and Kibana visualizations are more flexible and easier to accomplish
> ---
> **NOTE 2**: `recordingSummary` events may not contain the final information of the actual recordings (specifically properties `size` and `duration`). This is so because `recordingSummary` event is generated just after its session is closed, but since release 2.11.0 recordings may need a post-processing phase before being available for download and having these properties properly defined. To overcome this limitation, you can simply use the `cdr` event of type `recordingStatusChanged` and status `ready` corresponding to this recording (see event in [CDR docs](/reference-docs/openvidu-server-cdr/#recordingstatuschanged){:target="_blank"}). There you will have all properties of the recording well defined

<br>

You can create powerful visualizations and dashboards by using these documents. Let's see a quick example. Imagine that you are interested in knowing **how many users are connected to your OpenVidu sessions over time**.

<div class="row">
    <div class="pro-gallery-steps" style="margin: 25px 35px 25px 35px">
        <a data-fancybox="gallery-pro3" data-caption="First thing is navigating to 'Visualize' section in Kibana and clicking on the button to add a new visualization" href="/img/docs/openvidu-pro/elastic/tutorial1.png"><img class="img-responsive img-pro" src="/img/docs/openvidu-pro/elastic/tutorial1.png"/></a>
        <a data-fancybox="gallery-pro3" data-caption="Then we have to choose a visualization type. In this case a vertical bar graph might be a pretty good choice" href="/img/docs/openvidu-pro/elastic/tutorial2.png"><img class="img-responsive img-pro" src="/img/docs/openvidu-pro/elastic/tutorial2.png"/></a>
        <a data-fancybox="gallery-pro3" data-caption="We select 'openvidu' index, because that's the index of every OpenVidu Pro event stored in Elasticsearch" href="/img/docs/openvidu-pro/elastic/tutorial3.png"><img class="img-responsive img-pro" src="/img/docs/openvidu-pro/elastic/tutorial3.png"/></a>
        <a data-fancybox="gallery-pro3" data-caption="The visualization page will be shown. Now we have to filter the desired events. In this case, we just want the 'userSummary' event, as it gathers all the information about the final users connecting to our sessions. So, we make sure that field 'elastic_type.keyword' is 'userSummary'" href="/img/docs/openvidu-pro/elastic/tutorial4.png"><img class="img-responsive img-pro" src="/img/docs/openvidu-pro/elastic/tutorial4.png"/></a>
        <a data-fancybox="gallery-pro3" data-caption="Finally we have to configure the data passed to our graph. The metric we want (Y-axis) is simply 'Count', because there is one 'userSummary' event for each final user connecting to a session. And as Bucket (X-axis) we configure a Date Histogram by using 'timestamp' field of the event" href="/img/docs/openvidu-pro/elastic/tutorial5.png"><img class="img-responsive img-pro" src="/img/docs/openvidu-pro/elastic/tutorial5.png"/></a>
        <a data-fancybox="gallery-pro3" data-caption="To store the new visualization just click on 'Save' button in the upper menu and give it a meaningful name" href="/img/docs/openvidu-pro/elastic/tutorial6.png"><img class="img-responsive img-pro" src="/img/docs/openvidu-pro/elastic/tutorial6.png"/></a>
    </div>
    <div class="slick-captions">
      <div class="caption"><p>First thing is navigating to <strong>Visualize</strong> section in Kibana and clicking on the button to add a new visualization</p></div>
      <div class="caption"><p>Then we have to choose a visualization type. In this case a vertical bar graph might be a pretty good choice</p></div>
      <div class="caption"><p>We select <strong>openvidu</strong> index, because that's the index of every OpenVidu Pro event stored in Elasticsearch</p></div>
      <div class="caption"><p>The visualization page will be shown. Now we have to filter the desired events. In this case, we just want the <strong>userSummary</strong> event, as it gathers all the information about the final users connecting to our sessions. So, we make sure that field <strong>elastic_type.keyword</strong> is <strong>userSummary</strong></p></div>
      <div class="caption"><p>Finally we have to configure the data passed to our graph. The metric we want (Y-axis) is simply <strong>Count</strong>, because there is one "userSummary" event for each final user connecting to a session. And as Bucket (X-axis) we configure a Date Histogram by using <strong>timestamp</strong> field of the event</p></div>
      <div class="caption"><p>To store the new visualization just click on <strong>Save</strong> button in the upper menu and give it a meaningful name</p></div>
    </div>
</div>

> The example above is a very simple visualization, but you can apply any metric to any property (or set of properties) of any event (or set of events). You can explore pre-existing visualizations included by default in OpenVidu Pro, and for further info visit **[Kibana docs](https://www.elastic.co/guide/en/kibana/current/createvis.html){:target="_blank"}**

<br>

<script>
function changeVersion(event) {
  var parent = event.target.parentNode.parentNode;
  var txt = event.target.getAttribute('title');
  var txt = txt.replace(/\./g, '');
  for (var i = 0; i < parent.children.length; i++) {
    var child = parent.children[i];
    // Change appearance of version buttons
    if (child.classList.contains('version-buttons')) {
        for (var j = 0; j < child.children.length; j++) {
          var a = child.children[j];
          if (a === event.target) {
            a.classList.add('pressed-btn');
          } else {
            a.classList.remove('pressed-btn');
          }
        }
    }
    // Change visibility of version content
    if (child.classList.contains('version-container')) {
      if (child.id === ('list-' + txt) || child.id === ('content-' + txt)) {
        child.style.display = 'block';
      } else {
        child.style.display = 'none';
      }
    }
  }
}
</script>

<script>
function changeLangTab(event) {
  var parent = event.target.parentNode.parentNode;
  var txt = event.target.textContent || event.target.innerText;
  var txt = txt.replace(/\s/g, "-").toLowerCase();
  for (var i = 0; i < parent.children.length; i++) {
    var child = parent.children[i];
    // Change appearance of language buttons
    if (child.classList.contains('lang-tabs-header')) {
        for (var j = 0; j < child.children.length; j++) {
            var btn = child.children[j];
            if (btn.classList.contains('lang-tabs-btn')) {
                btn.style.backgroundColor = btn === event.target ? '#e8e8e8' : '#f9f9f9';
                btn.style.fontWeight = btn === event.target ? 'bold' : 'normal';
            }
        }
    }
    // Change visibility of language content
    if (child.classList.contains('lang-tabs-content')) {
        if (child.id === txt) {
            child.style.display = 'block';
        } else {
            child.style.display = 'none';
        }
    }
  }
}
</script>

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

<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/brands.css" integrity="sha384-Px1uYmw7+bCkOsNAiAV5nxGKJ0Ixn5nChyW8lCK1Li1ic9nbO5pC/iXaq27X5ENt" crossorigin="anonymous">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/fontawesome.css" integrity="sha384-BzCy2fixOYd0HObpx3GMefNqdbA7Qjcc91RgYeDjrHTIEXqiF00jKvgQG0+zY/7I" crossorigin="anonymous">

<link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.css"/>
<link rel="stylesheet" type="text/css" href="/css/slick-theme.css"/>
<script type="text/javascript" src="//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js"></script>

<script>
    $('.slick-captions').slick({
      asNavFor: '.pro-gallery-steps',
      arrows: false,
      infinite: false,
      speed: 200,
      fade: true,
      dots: false
    });
    $('.pro-gallery-steps').slick({
      asNavFor: '.slick-captions',
      autoplay: false,
      arrows: true,
      prevArrow: '<div class="slick-btn slick-btn-prev"><i class="icon ion-chevron-left"></i></div>',
      nextArrow: '<div class="slick-btn slick-btn-next"><i class="icon ion-chevron-right"></i></div>',
      infinite: false,
      dots: true,
      responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          slidesToShow: 1
        }
      },
    ]
    });
</script>