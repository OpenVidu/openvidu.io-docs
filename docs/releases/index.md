<h2 id="section-title">Releases</h2>
<hr>

## 2.0.0

### Artifacts

<table class="artifact-table">

  <tr>
    <th>Artifact</th>
    <th>Type</th>
    <th>Compatible Version</th>
    <th>Link</th>
    <th class="last-table-col">Info</th>
  </tr>
  
  <tr>
    <td rowspan="2">openvidu-browser</td>
    <td>NPM package</td>
    <td>2.0.0</td>
    <td><a class="" href="https://www.npmjs.com/package/openvidu-browser?activeTab=versions" target="_blank">NPM</a></td>
    <td rowspan="2" class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu client side. It is a library for the browser. It allows you to control your videos and sessions directly from your client's browsers" class="icon ion-information-circled"></i></td>
  </tr>
  <tr>
    <td>JS file</td>
    <td>2.0.0</td>
    <td><a class="" href="https://github.com/OpenVidu/openvidu/releases/tag/v2.0.0" target="_blank">GitHub</a></td>
  </tr>
  
  <tr>
    <td rowspan="3">openvidu-server</td>
    <td>JAR</td>
    <td>2.0.0</td>
    <td><a class="" href="https://github.com/OpenVidu/openvidu/releases/tag/v2.0.0" target="_blank">GitHub</a></td>
    <td rowspan="3" class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu server side. It receives the remote procedure calls from openvidu-browser and manage all the media streams operations. YOU DON'T HAVE TO MAKE DIRECT USE OF IT. Just to run it and know its IP address and password" class="icon ion-information-circled"></i></td>
  </tr>
  <tr>
    <td>Docker container</td>
    <td>2.0.0</td>
    <td><a class="" href="https://hub.docker.com/r/openvidu/openvidu-server/tags/" target="_blank">DockerHub</a></td>
  </tr>
    <tr>
    <td>Docker container (+KMS)</td>
    <td>2.0.0</td>
    <td><a class="" href="https://hub.docker.com/r/openvidu/openvidu-server-kms/tags/" target="_blank">DockerHub</a></td>
  </tr>
  
  <tr>
    <td>openvidu-java-client</td>
    <td>MVN package</td>
    <td>2.0.0</td>
    <td><a class="" href="https://search.maven.org/#artifactdetails%7Cio.openvidu%7Copenvidu-java-client%7C2.0.0%7Cjar" target="_blank">MVN Repository</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="SDK for your JAVA server. Simple alternative to the REST API" class="icon ion-information-circled"></i></td>
  </tr>
  
  <tr>
    <td>openvidu-node-client</td>
    <td>NPM package</td>
    <td>2.0.0</td>
    <td><a class="" href="https://www.npmjs.com/package/openvidu-node-client?activeTab=versions" target="_blank">NPM</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="SDK for your NODE server. Simple alternative to the REST API" class="icon ion-information-circled"></i></td>
  </tr>

</table>

### Release Notes

<br>

This is the first breaking change update for OpenVidu, which brings in lots of new features and internal improvements.

#### BREAKING CHANGES LIST

- **OpenVidu Browser**
    - [`OpenVidu.initSession`](../../api/openvidu-browser/classes/openvidu.html#initsession) now doesn't receive any input parameter.
    - [`OpenVidu.initPublisher`](../../api/openvidu-browser/classes/openvidu.html#initpublisher) input parameters have changed. Now `properties` parameter must match [PublisherProperties](../..//api/openvidu-browser/interfaces/publisherproperties.html) interface.
    - [`Session.connect`](../../api/openvidu-browser/classes/session.html#connect) method has been promisified. Change the last mandatory `callback` parameter for a Promise implementation: `session.connect(token, (error) => { ... })` to `session.connect(token).then(() => {...}).catch(error => {...});` <br><br>

- **OpenVidu Java Client**
    - All `Archive` entities are now called `Recording`. This includes: class `Archive` to `Recording`, class `ArchiveMode` to `RecordingMode`, class `ArchiveLayout` to `RecordingLayout`, method `SessionProperties.archiveLayout()` to `SessionProperties.recordingLayout()`, method `SessionProperties.archiveMode()` to `SessionProperties.recordingMode()`, method `SessionProperties.Builder.archiveLayout()` to `SessionProperties.Builder.recordingLayout()`, method `SessionProperties.Builder.archiveMode()` to `SessionProperties.Builder.recordingMode()`
    - `RecordingLayout` property in [`SessionProperties.Builder`](../../api/openvidu-java-client/io/openvidu/java/client/SessionProperties.Builder.html) is now configured calling method `defaultRecordingLayout()` instead of `recordingLayout()`. This means that if one Session is gonna be recorded more than once, each recording layout may be customize with `RecordingProperties.Builder.recordingLayout()`, which will overwrite the default one globally configured in SessionProperties object. <br><br>

- **OpenVidu Node Client**
    - We have removed the builder pattern in all openvidu-node-client classes. Now objects are used instead, which includes classes `TokenOptions`, `SessionProperties` and `RecordingProperties`. For example, instead of getting a TokenOptions object like this: `var tokenOptions = new TokenOptions.Builder().data(serverData).role(role).build()` now it must be like this: `var tokenOptions = {data: serverData, role: role}`
    - There has been a simple change in certain asynchronous call. Method `Session.getSessionId()` is now synchronous, but method `OpenVidu.createSession()` is now asynchronous (the reason is pretty simple: now method _createSession_ implements the behaviour that _getSessionId_ was providing the first time it was called for certain _Session_ object).
    - All callback methods have been promisified. This includes method `Session.generateToken(tokenOptions?, callback): void` (now  `Session.generateToken(tokenOptions?): Promise<string>`) and method `Session.getSessionId(callback): void` (now `OpenVidu.createSession(): Promise<Session>`, take also into account that the async call has changed from one method to the other as stated in the previous point).
    - All `Archive` entities are now called `Recording`. This includes: object `Archive` to `Recording`, object `ArchiveMode` to `RecordingMode`, object `ArchiveLayout` to `RecordingLayout`, method `SessionProperties.archiveLayout()` to `SessionProperties.recordingLayout()`, method `SessionProperties.archiveMode()` to `SessionProperties.recordingMode()`, method `SessionProperties.Builder.archiveLayout()` to `SessionProperties.Builder.recordingLayout()`, method `SessionProperties.Builder.archiveMode()` to `SessionProperties.Builder.recordingMode()`
    - `recordingLayout` property in [`SessionProperties`](../../api/openvidu-node-client/interfaces/sessionproperties.html) has changed to `defaultRecordingLayout`. This means that if one Session is gonna be recorded more than once, each recording layout may be customize with `recordingLayout` property (of [RecordingProperties](../../api/openvidu-node-client/interfaces/recordingproperties.html) interface, which will overwrite the default one globally configured in SessionProperties object. <br><br>

- **REST API**
    - All `Archive` entities are now called `Recording` in API REST. For example: `{"archiveMode": "ARCHIVE_MODE", "archiveLayout": "ARCHIVE_LAYOUT", "mediaMode": "MEDIA_MODE"}` now is `{"recordingMode": "RECORDING_MODE", "recordingLayout": "RECORDING_LAYOUT", "mediaMode": "MEDIA_MODE"}`.
    - Field `recordingLayout` is now called `defaultRecordingLayout` in operation [POST /api/sessions](https://openvidu.io/docs/reference-docs/REST-API/#post-apisessions). This means that if one Session is gonna be recorded more than once, each recording layout may be customize adding a new field `recordingLayout` in the call to [POST /api/recordings/start](https://openvidu.io/docs/reference-docs/REST-API/#post-apirecordingsstart) of the API REST, which will overwrite the default one globally configured during [POST /api/sessions](https://openvidu.io/docs/reference-docs/REST-API/#post-apisessions) <br><br>

- **Other breaking changes**
    - OpenVidu Server default port from `8443` to `4443`
    - OpenVidu Server configuration property `openvidu.recording.free-access` is now `openvidu.recording.public-access`

#### NEW FEATURES

- **OpenVidu Browser new methods**

    - `Session.publish()`: now returns a Promise so you can tell if the method was successful or not.
    - `Session.signal()`: now returns a Promise so you can tell if the method was successful or not.
    - `Subcriber.subscribeToAudio()` and `Subscriber.subscribeToVideo()`: new methods that allows you to mute the audio or video tracks of a remote stream.
    - `OpenVidu.initPubliher()`: now expects properties as interface [PublisherProperties](../../api/openvidu-browser/interfaces/publisherproperties.html). They include:

            {
                audioSource: undefined, // The source of audio. If undefined default audio input
                videoSource: undefined, // The source of video. If undefined default video input
                publishAudio: true,  	// Whether you want to start publishing with your audio unmuted or muted
                publishVideo: true,  	// Whether you want to start publishing with your video enabled or not
                resolution: '640x480',  // The resolution of your video
                frameRate: 30,			// The frame rate of your video
                insertMode: 'APPEND',	// How the video will be inserted in the target element
                mirror: false       	// Whether to mirror your local video or not
            }

    - `Session.subscribe()`: now expects properties as interface [SubscriberProperties](../../api/openvidu-browser/interfaces/subscriberproperties.html). They include:

            {
                insertMode: 'APPEND',	// How the video will be inserted in the target element
                subscribeToAudio: true, // Whether to initially subscribe to the stream's audio track or not
                subscribeToVideo: true  // Whether to initially subscribe to the stream's video track or not
            }

    - `OpenVidu.getDevices()`: now you can use certain video or audio input device when calling `OpenVidu.initPublisher()`, thanks to properties `audioSource` or `videoSource` of `PublisherProperties` object. Just set these variables to the property `deviceId` of any of the devices returned by this method.
    - `OpenVidu.getUserMedia()`: method improved. Now devs can customize a MediaStream object before calling `OpenVidu.initPublisher()` method, setting property `audioSource` or `videoSource` to a MediaStreamTrack object (see [docs](../../api/openvidu-browser/classes/openvidu.html#getusermedia) for further information)<br><br>

- **OpenVidu Browser new properties**

    - `Stream.frameRate`: new property defining the frame rate of video streams. This property will only have value if the Publisher owning the stream has set property `frameRate` of `PublisherProperties` when calling `OpenVidu.initPublisher()`<br><br>

- **OpenVidu Browser events**

    - New events `accessDialogOpened` and `accessDialogClosed`: dispatched by Publisher objects when the browser asks the user to grant permissions to camera or michrophone by opening a pop-up. You can use them to warn your users about it.
    - New events `recordingStarted` and `recordingStopped`: dispatched by Session object when the recording of a Session starts and stops. You can customize which clients will receive this event thanks to new property `openvidu.recording.notification` (see [OpenVidu Server configuration](/reference-docs/openvidu-server-params/))
    - Events `publisherStartSpeaking` and `publisherStopSpeaking` improved: more customizable thanks to [OpenVidu.setAdvancedConfiguration()](../../api/openvidu-browser/classes/openvidu.html#setadvancedconfiguration) and better overall performance.
    - Events `streamDestroyed`, `connectionDestroyed` and `sessionDisconnected` have new property `reason`. This gives more information about why the events have been dispatched so you can take specific actions depending on the context: maybe a stream has been destroyed because the user publishing has deliberately diposed it or maybe the network connection has unexpectedly closed (see docs for [StreamEvent](../../api/openvidu-browser/classes/streamevent.html), [ConnectionEvent](../../api/openvidu-browser/classes/connectionevent.html) and [SessionDisconnectedEvent](../../api/openvidu-browser/classes/sessiondisconnectedevent.html))<br><br>

- **Other improvements in OpenVidu Browser**

    - Support for [custom screen sharing extensions for Chrome](/advanced-features/screen-share/#custom-screen-sharing-extension-for-chrome)
    - Support for custom STUN and TURN servers in openvidu-browser. Use [OpenVidu.setAdvancedConfiguration()](../../api/openvidu-browser/classes/openvidu.html#setadvancedconfiguration)
    - Library size decreased in almost 30% (_openvidu-browser.min.js_ from 300 KB to 216 KB)<br><br>

- **OpenVidu Server new features**
    - New property `name` for recordings: you can now specify which name should OpenVidu Server give to each one of your recording files. You can do it by using the **REST API** (by setting [body parameter "name" in POST /api/recordings/start](/reference-docs/REST-API/#post-apirecordingsstart)), **openvidu-java-client** (by using [RecordingProperties.Builder.name()](../../api/openvidu-java-client/io/openvidu/java/client/RecordingProperties.Builder.html)) or **openvidu-node-client** (by setting property [RecordingProperties.name](../../api/openvidu-node-client/interfaces/recordingproperties.html#name))
    - Now support for initializing sessions with a custom `sessionId`. You can take advantage of this new property to facilitate the mapping between OpenVidu Server 'session' entities and your own 'session' entities. You can set it by using the **REST API** (by setting [body parameter "customSessionId" in POST /api/sessions](/reference-docs/REST-API/#post-apisessions)), **openvidu-java-client** (by using [SessionProperties.Builder.customSessionId()](../../api/openvidu-java-client/io/openvidu/java/client/SessionProperties.Builder.html)) or **openvidu-node-client** (by setting property [SessionProperties.customSessionId](../../api/openvidu-node-client/interfaces/sessionproperties.html#customsessionid))
    - Call Detail Record extended: new events `recordingStarted` and `recordingStopped`, property `reason` for events `sessionDestroyed`, `participantLeft` and `webrtcConnectionDestroyed`.

#### BUG FIXES

- Now when any participant unexpectedly disconnects from a session (for example, due to a network failure), `connectionDestroyed` event is sent to the rest of participants with property `reason` set to `networkDisconnect`.
- When OpenVidu Server is stopped, it will try to gracefully finish every in progress session and recording. This way no recording file will end corrupted upon OpenVidu Server termination (this cannot be granted if the process crashes or is forcibly terminated)
- Now both STUN and TURN [OpenVidu Server configuration parameters](/reference-docs/openvidu-server-params/#list-of-additional-configuration-parameters-when-launching-openvidu-server-kms-docker-container) can be set up at the same time with no overwritings.
- Tons of small fixes and code refactoring that makes OpenVidu more stable and easy to test and develop

<br>
<hr>

## 1.9.0-beta-1

### Artifacts

<table class="artifact-table">

  <tr>
    <th>Artifact</th>
    <th>Type</th>
    <th>Compatible version</th>
    <th>Link</th>
    <th class="last-table-col">Info</th>
  </tr>
  
  <tr>
    <td rowspan="2">openvidu-browser</td>
    <td>NPM package</td>
    <td>1.9.0-beta-1</td>
    <td><a class="" href="https://www.npmjs.com/package/openvidu-browser?activeTab=versions" target="_blank">NPM</a></td>
    <td rowspan="2" class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu client side. It is a library for the browser. It allows you to control your videos and sessions directly from your client's browsers" class="icon ion-information-circled"></i></td>
  </tr>
  <tr>
    <td>JS file</td>
    <td>1.9.0-beta-1</td>
    <td><a class="" href="https://github.com/OpenVidu/openvidu/releases/tag/v1.9.0-beta-1" target="_blank">GitHub</a></td>
  </tr>
  
  <tr>
    <td rowspan="3">openvidu-server</td>
    <td>JAR</td>
    <td>1.9.0-beta-1</td>
    <td><a class="" href="https://github.com/OpenVidu/openvidu/releases/tag/v1.9.0-beta-1" target="_blank">GitHub</a></td>
    <td rowspan="3" class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu server side. It receives the remote procedure calls from openvidu-browser and manage all the media streams operations. YOU DON'T HAVE TO MAKE DIRECT USE OF IT. Just to run it and know its IP address and password" class="icon ion-information-circled"></i></td>
  </tr>
  <tr>
    <td>Docker container</td>
    <td>1.9.0-beta-1</td>
    <td><a class="" href="https://hub.docker.com/r/openvidu/openvidu-server/tags/" target="_blank">DockerHub</a></td>
  </tr>
    <tr>
    <td>Docker container (+KMS)</td>
    <td>1.9.0-beta-1</td>
    <td><a class="" href="https://hub.docker.com/r/openvidu/openvidu-server-kms/tags/" target="_blank">DockerHub</a></td>
  </tr>
  
  <tr>
    <td>openvidu-java-client</td>
    <td>MVN package</td>
    <td>1.8.0</td>
    <td><a class="" href="https://search.maven.org/#artifactdetails%7Cio.openvidu%7Copenvidu-java-client%7C1.8.0%7Cjar" target="_blank">MVN Repository</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="SDK for your JAVA server. Simple alternative to the REST API" class="icon ion-information-circled"></i></td>
  </tr>
  
  <tr>
    <td>openvidu-node-client</td>
    <td>NPM package</td>
    <td>1.8.0</td>
    <td><a class="" href="https://www.npmjs.com/package/openvidu-node-client?activeTab=versions" target="_blank">NPM</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="SDK for your NODE server. Simple alternative to the REST API" class="icon ion-information-circled"></i></td>
  </tr>
  
</table>

### Release Notes

<br>

- **Safari support**: now OpenVidu is compatible with the most recent versions of Safari in Mac and iOS. It is necessary to use Kurento Media Server 6.7.0:<br><br>
    - **[openvidu/openvidu-server-kms:1.9.0-beta-1](https://hub.docker.com/r/openvidu/openvidu-server-kms/tags/)** Docker image already incorporates KMS 6.7.0
    - **[openvidu/openvidu-server:1.9.0-beta-1](https://hub.docker.com/r/openvidu/openvidu-server/tags/)** Docker image and **[openvidu-server-1.9.0-beta-1.jar](https://github.com/OpenVidu/openvidu/releases/tag/v1.9.0-beta-1)** need KMS 6.7.0. To install it, first be sure to completely uninstall and clean any previous version of KMS and then:
        
<pre style="padding-left: 80px"><code class="bash hljs"># In first command: xenial for Ubuntu 16.04, trusty for Ubuntu 14.04
sudo echo "deb http://ubuntu.openvidu.io/6.7.0 xenial kms6" | sudo tee /etc/apt/sources.list.d/kurento.list
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 5AFA7A83
sudo apt-get update
sudo apt-get -y dist-upgrade
sudo apt-get -y install kurento-media-server
sudo apt-get -y install openh264-gst-plugins-bad-1.5
</code></pre>

<p style="padding-left: 80px">To start and stop KMS 6.7.0:</p>

<pre style="padding-left: 80px"><code class="bash hljs">sudo service kurento-media-server start
sudo service kurento-media-server stop
</code></pre>

