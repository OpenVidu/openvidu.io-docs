<h2 id="section-title">Releases</h2>
<hr>

- [2.4.0](#240)
- [2.3.0](#230)
- [2.2.0](#220)
- [2.1.0](#210)
- [2.0.0](#200)
- [1.9.0-beta-1](#190-beta-1)

---

## 2.4.0

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
    <td>2.4.0</td>
    <td><a class="" href="https://www.npmjs.com/package/openvidu-browser" target="_blank">NPM</a></td>
    <td rowspan="2" class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu client side. It is a library for the browser. It allows you to control your videos and sessions directly from your client's browsers" class="icon ion-information-circled"></i></td>
  </tr>
  <tr>
    <td>JS file</td>
    <td>2.4.0</td>
    <td><a class="" href="https://github.com/OpenVidu/openvidu/releases/tag/v2.4.0" target="_blank">GitHub</a></td>
  </tr>
  
  <tr>
    <td rowspan="3">openvidu-server</td>
    <td>JAR</td>
    <td>2.4.0</td>
    <td><a class="" href="https://github.com/OpenVidu/openvidu/releases/tag/v2.4.0" target="_blank">GitHub</a></td>
    <td rowspan="3" class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu server side. It receives the remote procedure calls from openvidu-browser and manage all the media streams operations. YOU DON'T HAVE TO MAKE DIRECT USE OF IT. Just to run it and know its IP address and password" class="icon ion-information-circled"></i></td>
  </tr>
  <tr>
    <td>Docker container</td>
    <td>2.4.0</td>
    <td><a class="" href="https://hub.docker.com/r/openvidu/openvidu-server/tags/" target="_blank">DockerHub</a></td>
  </tr>
    <tr>
    <td>Docker container (+KMS)</td>
    <td>2.4.0</td>
    <td><a class="" href="https://hub.docker.com/r/openvidu/openvidu-server-kms/tags/" target="_blank">DockerHub</a></td>
  </tr>
  
  <tr>
    <td>openvidu-java-client</td>
    <td>MVN package</td>
    <td>2.4.0</td>
    <td><a class="" href="https://search.maven.org/#artifactdetails%7Cio.openvidu%7Copenvidu-java-client%7C2.4.0%7Cjar" target="_blank">MVN Repository</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="SDK for your JAVA server. Simple alternative to the REST API" class="icon ion-information-circled"></i></td>
  </tr>
  
  <tr>
    <td>openvidu-node-client</td>
    <td>NPM package</td>
    <td>2.4.0</td>
    <td><a class="" href="https://www.npmjs.com/package/openvidu-node-client" target="_blank">NPM</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="SDK for your NODE server. Simple alternative to the REST API" class="icon ion-information-circled"></i></td>
  </tr>

  <tr>
    <td>openvidu-webcomponent</td>
    <td>ZIP</td>
    <td>2.4.0</td>
    <td><a class="" href="https://github.com/OpenVidu/openvidu/releases/tag/v2.4.0" target="_blank">GitHub</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu Web Component. Easier way to add OpenVidu video calls to your existing web application" class="icon ion-information-circled"></i></td>
  </tr>

</table>

### Release Notes

#### NEW FEATURES

<br>
##### OpenVidu Java Client and OpenVidu Node Client REST API support for v2.3.0

Backend clients are now compatible with REST API 2.3.0, adding methods:

- `Session.close()`: close a Session from your backend
- `Session.forceDisconnect()`: force some user to leave a Session
- `Session.forceUnpublish()`: force some user to unpublish a Publisher from a Session
- `Session.fetch()`: bring Session information from OpenVidu Server
- `OpenVidu.fetch()`: bring information from every active Session from OpenVidu Server

You can call methods `Session.fetch()` and `OpenVidu.fetch()` to bring the current status of sessions from OpenVidu Server. You can consult now directly from _OpenVidu Java Client_ / _OpenVidu Node Client_ all the active sessions with [`OpenVidu.getActiveSessions()`](https://openvidu.io/api/openvidu-java-client/) / [`OpenVidu.activeSessions`](https://openvidu.io/api/openvidu-node-client/classes/openvidu.html#activesessions) and the active connections of a session with [`Session.getActiveConnections()`](https://openvidu.io/api/openvidu-java-client/) / [`Session.activeConnections`](https://openvidu.io/api/openvidu-node-client/classes/session.html#activeconnections).

<br>
##### OpenVidu CDR extended

Event `recordingStopped` event now has `reason` property. Can be: 

- `"recordingStoppedByServer"`: the recording was stopped by the application (using REST API, OpenVidu Java Client or OpenVidu Node Client)
- `"lastParticipantLeft"`: if the Session was configured for automatic recording (`RecordingMode.ALWAYS`, check [OpenVidu Node Client](https://openvidu.io/api/openvidu-node-client/enums/recordingmode.html) docs for more info), then it stopped because the last participant left the session
- `"sessionClosedByServer"`: the recording stopped because the session was forcibly closed by the application (using REST API, OpenVidu Java Client or OpenVidu Node Client)
- `"openviduServerStopped"`: the recording stopped because OpenVidu Server process unexpectedly stopped (cannot be guaranteed)

<br>
##### OpenVidu WebComponent improvements

- Added a generic fullscreen button which will set as fullscreen element the entire component
- Local video toolbar shown on fullscreen
- User's nickname update process is now less intrusive (pop-up removed, simple text input instead)
- Updated every dialog: now they appear inside of the component (center position), instead of appended to DOM body
- The chat component is integrated in the layout for a better experience
- New close chat button (top right corner)
- New send button (bottom right corner)
- New avatar user in each message. A new snapshot image will be displayed with each new message

#### BUG FIXES

- OpenVidu Server dashboard test could sometimes fail because of a misuse of TURN server
- OpenVidu Java Client: pending requests bug fixed
- Remote Stream status properties are now properly updated when calling `Session.publish`, `Session.unpublish` and `Session.publish` for the same Publisher object (having unpublished audio or video in between the calls)

---
<br>

## 2.3.0

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
    <td>2.3.0</td>
    <td><a class="" href="https://www.npmjs.com/package/openvidu-browser/v/2.3.0" target="_blank">NPM</a></td>
    <td rowspan="2" class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu client side. It is a library for the browser. It allows you to control your videos and sessions directly from your client's browsers" class="icon ion-information-circled"></i></td>
  </tr>
  <tr>
    <td>JS file</td>
    <td>2.3.0</td>
    <td><a class="" href="https://github.com/OpenVidu/openvidu/releases/tag/v2.3.0" target="_blank">GitHub</a></td>
  </tr>
  
  <tr>
    <td rowspan="3">openvidu-server</td>
    <td>JAR</td>
    <td>2.3.0</td>
    <td><a class="" href="https://github.com/OpenVidu/openvidu/releases/tag/v2.3.0" target="_blank">GitHub</a></td>
    <td rowspan="3" class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu server side. It receives the remote procedure calls from openvidu-browser and manage all the media streams operations. YOU DON'T HAVE TO MAKE DIRECT USE OF IT. Just to run it and know its IP address and password" class="icon ion-information-circled"></i></td>
  </tr>
  <tr>
    <td>Docker container</td>
    <td>2.3.0</td>
    <td><a class="" href="https://hub.docker.com/r/openvidu/openvidu-server/tags/" target="_blank">DockerHub</a></td>
  </tr>
    <tr>
    <td>Docker container (+KMS)</td>
    <td>2.3.0</td>
    <td><a class="" href="https://hub.docker.com/r/openvidu/openvidu-server-kms/tags/" target="_blank">DockerHub</a></td>
  </tr>
  
  <tr>
    <td>openvidu-java-client</td>
    <td>MVN package</td>
    <td>2.2.0</td>
    <td><a class="" href="https://search.maven.org/#artifactdetails%7Cio.openvidu%7Copenvidu-java-client%7C2.2.0%7Cjar" target="_blank">MVN Repository</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="SDK for your JAVA server. Simple alternative to the REST API" class="icon ion-information-circled"></i></td>
  </tr>
  
  <tr>
    <td>openvidu-node-client</td>
    <td>NPM package</td>
    <td>2.2.0</td>
    <td><a class="" href="https://www.npmjs.com/package/openvidu-node-client?activeTab=versions" target="_blank">NPM</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="SDK for your NODE server. Simple alternative to the REST API" class="icon ion-information-circled"></i></td>
  </tr>

  <tr>
    <td>openvidu-webcomponent</td>
    <td>ZIP</td>
    <td>2.3.0</td>
    <td><a class="" href="https://github.com/OpenVidu/openvidu/releases/tag/v2.3.0" target="_blank">GitHub</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu Web Component. Easier way to add OpenVidu video calls to your existing web application" class="icon ion-information-circled"></i></td>
  </tr>

</table>

### Release Notes

#### OPENVIDU WEB COMPONENT

OpenVidu platform now offers an easier way to get started: just include our new Web Component into your web and start enjoying video call capabilities with just 3 new lines of code:

Add to your `index.html` OpenVidu Web Component files:

```html
<link rel="stylesheet" href="openvidu-webcomponent.css" />
<script src="openvidu-webcomponent.js"></script>
```

And add your video-call element wherever you want in your application:

```html
<openvidu-webcomponent session-config='{"user":"NICKNAME", "token":"TOKEN"}' theme="dark"></openvidu-webcomponent>
```

Being `NICKNAME` the user's name during the call and `TOKEN` one token generated in OpenVidu Server. Of course, if you want to connect users to the same session, the tokens should be generated for the same session.
Attribute `theme` can be `dark` or `light`. Use the one that better fits your application.

OpenVidu Web Component supports a reasonable amount of different dimensions, and every video displayed inside of it will be automatically relocated and resized for its optimal position upon window resizing. You can set the position, width and height of the component by styling it like this:

1. Setting its property `position` to `absolute` or `fixed`, depending on your web layout and the desired behavior you want the component to have.
2. Playing with values:
    - `width`
    - `height`
    - `top` or `bottom`
    - `right` or `left`

For example, the following CSS rule would position the upper OpenVidu Web Component in the bottom-right corner of your web, taking up half of the height of the page and a third of its width.

```css
openvidu-webcomponent {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 33vw;
  height: 50vh;
}
```

If you give enough width to the component (at least `700px`), users can communicate through an integrated chat.

> To see some images of OpenVidu Web Component in action, check this post on [Medium](https://medium.com/@openvidu/openvidu-2-3-0-web-component-and-tons-of-new-features-3341d46cbb54). If you want to learn more about OpenVidu Web Component, visit [Tutorials section](/tutorials/openvidu-webcomponent)

<br>
#### NEW FEATURES

<br>
##### StreamPropertyChangedEvent (See [here](https://openvidu.io/api/openvidu-browser/classes/streampropertychangedevent.html))

OpenVidu Browser now lets users connected to a Session know when any Stream they are subscribed to undergoes any possible change in its properties. Every Session object will dispatch this new event (you can subscribe to it to every Publisher or Subscriber object too). This event can refer to the following Stream properties:

- `Stream.audioActive`: this property may change if the user publishing the Stream calls `Publisher.pusblishAudio(bool)`.
- `Stream.videoActive`: this property may change if the user publishing the Stream calls `Publisher.publishVideo(bool)`.
- `Stream.videoDimensions`: this property may change if...
    - ...the user publishing the stream is screen-sharing and the shared window changes its dimensions.
    - ...the user is publishing from a mobile device and it is rotated (every camera from a phone will invert the resolution in the output video when rotated).

So, for example, now you can do:

```javascript
var OV = new OpenVidu();
var session = OV.initSession();
session.on('streamPropertyChanged', event => {
    if (event.changedProperty === 'audioActive') {
        console.log('The state of the audio of the publisher has changed. Is enabled? -> ' + event.newValue);
    } else if (event.changedProperty === 'videoActive') {
        console.log('The state of the video of the publisher has changed. Is enabled? -> ' + event.newValue);
    } else if (event.changedProperty === 'videoDimensions') {
        console.log('The video dimensions of the publisher has changed. New dimensions: ' + event.newValue);
    }
});
```

This way you can react more easily upon this variations in the published streams and update your application's layout accordingly.

<br>
##### Session.capabilities (See [here](https://openvidu.io/api/openvidu-browser/interfaces/capabilities.html))

You can check capabilities property of Session object to know which methods are able to invoke each one of your clients, depending on their role. Also, if a client tries to call a method for which he has no permissions, now an OpenViduError is thrown with property `name` being [`OPENVIDU_PERMISSION_DENIED`](https://openvidu.io/api/openvidu-browser/enums/openviduerrorname.html#openvidu_permission_denied).

<br>
##### New MODERATOR role

At last developers have available the new role that has been in our roadmap for a long time. Users connecting to a session with a token configured with MODERATOR role can call every method granted for SUBSCRIBER and PUBLISHER roles, but also:

- [`Session.forceDisconnect`](https://openvidu.io/api/openvidu-browser/classes/session.html#forcedisconnect): you can evict any user from the Session (force the method `Session.disconnect`)
- [`Session.forceUnpublish`](https://openvidu.io/api/openvidu-browser/classes/session.html#forceunpublish): you can stop the Publisher of any user publishing in the Session (force the method `Session.unpublish`)

<br>
##### REST API extended

5 new methods join the [REST API of OpenVidu Server](https://openvidu.io/docs/reference-docs/REST-API/):

- Retrieve active session info: [**GET /api/sessions/&lt;SESSION_ID&gt;**](https://openvidu.io/docs/reference-docs/REST-API/#get-apisessionssession_id)
- Retrieve all active sessions info: [**GET /api/sessions**](https://openvidu.io/docs/reference-docs/REST-API/#get-apisessions)
- Close a session: [**DELETE /api/sessions/&lt;SESSION_ID&gt;**](https://openvidu.io/docs/reference-docs/REST-API/#delete-apisessionssession_id)
- Force the disconnection of a user from a session: [**DELETE /api/sessions/&lt;SESSION_ID&gt;/connection/&lt;CONNECTION_ID&gt;**](https://openvidu.io/docs/reference-docs/REST-API/#delete-apisessionssession_idconnectionconnection_id)
- Force the unpublishing of a user's stream from a session: [**DELETE /api/sessions/&lt;SESSION_ID&gt;/stream/&lt;STREAM_ID&gt;**](https://openvidu.io/docs/reference-docs/REST-API/#delete-apisessionssession_idstreamstream_id)

> Future iterations will add this capabilities to [openvidu-java-client](https://openvidu.io/docs/reference-docs/openvidu-java-client/) and [openvidu-node-client](https://openvidu.io/docs/reference-docs/openvidu-node-client/) libraries

<br>
##### Configure global bandwidth for your WebRTC connections

We have included a first way to set the maximum and minimum bandwidths for the media connections established between browsers and OpenVidu Server. You can configure it with the following system properties, as stated in [OpenVidu Server configuration](https://openvidu.io/docs/reference-docs/openvidu-server-params/) sections:

- `openvidu.streams.video.max-recv-bandwidth`: Maximum video bandwidth sent from clients to OpenVidu Server, in kbps. 0 means unconstrained	(default 600)
- `openvidu.streams.video.min-recv-bandwidth`: Minimum video bandwidth sent from clients to OpenVidu Server, in kbps. 0 means unconstrained	(default 300)
- `openvidu.streams.video.max-send-bandwidth`: Maximum video bandwidth sent from OpenVidu Server to clients, in kbps. 0 means unconstrained	(default 600)
- `openvidu.streams.video.min-send-bandwidth`: Minimum video bandwidth sent from OpenVidu Server to clients, in kbps. 0 means unconstrained	(default 300)

> Future iterations will study the possibility of configuring this same parameters for each session individually or even for each incoming or outgoing WebRTC connection (maybe as part of [`PublisherProperties`](https://openvidu.io/api/openvidu-browser/interfaces/publisherproperties.html) or [`SubscriberProperties`](https://openvidu.io/api/openvidu-browser/interfaces/subscriberproperties.html))

---
<br>

## 2.2.0

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
    <td>2.2.0</td>
    <td><a class="" href="https://www.npmjs.com/package/openvidu-browser?activeTab=versions" target="_blank">NPM</a></td>
    <td rowspan="2" class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu client side. It is a library for the browser. It allows you to control your videos and sessions directly from your client's browsers" class="icon ion-information-circled"></i></td>
  </tr>
  <tr>
    <td>JS file</td>
    <td>2.2.0</td>
    <td><a class="" href="https://github.com/OpenVidu/openvidu/releases/tag/v2.2.0" target="_blank">GitHub</a></td>
  </tr>
  
  <tr>
    <td rowspan="3">openvidu-server</td>
    <td>JAR</td>
    <td>2.2.0</td>
    <td><a class="" href="https://github.com/OpenVidu/openvidu/releases/tag/v2.2.0" target="_blank">GitHub</a></td>
    <td rowspan="3" class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu server side. It receives the remote procedure calls from openvidu-browser and manage all the media streams operations. YOU DON'T HAVE TO MAKE DIRECT USE OF IT. Just to run it and know its IP address and password" class="icon ion-information-circled"></i></td>
  </tr>
  <tr>
    <td>Docker container</td>
    <td>2.2.0</td>
    <td><a class="" href="https://hub.docker.com/r/openvidu/openvidu-server/tags/" target="_blank">DockerHub</a></td>
  </tr>
    <tr>
    <td>Docker container (+KMS)</td>
    <td>2.2.0</td>
    <td><a class="" href="https://hub.docker.com/r/openvidu/openvidu-server-kms/tags/" target="_blank">DockerHub</a></td>
  </tr>
  
  <tr>
    <td>openvidu-java-client</td>
    <td>MVN package</td>
    <td>2.2.0</td>
    <td><a class="" href="https://search.maven.org/#artifactdetails%7Cio.openvidu%7Copenvidu-java-client%7C2.2.0%7Cjar" target="_blank">MVN Repository</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="SDK for your JAVA server. Simple alternative to the REST API" class="icon ion-information-circled"></i></td>
  </tr>
  
  <tr>
    <td>openvidu-node-client</td>
    <td>NPM package</td>
    <td>2.2.0</td>
    <td><a class="" href="https://www.npmjs.com/package/openvidu-node-client?activeTab=versions" target="_blank">NPM</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="SDK for your NODE server. Simple alternative to the REST API" class="icon ion-information-circled"></i></td>
  </tr>

</table>

### Release Notes

<br>

OpenVidu now offers **integrated and automated support for TURN server**. We encourage developers to check out our **[post on Medium](https://medium.com/@openvidu/openvidu-2-2-0-turn-made-easy-9d7e145f8905)** to learn more about it.

The platform now integrates by default a COTURN server as part of its ecosystem. This means that media connections will work OK even when clients are located on restricted networks. When [deploying OpenVidu Server in Amazon Web Services](https://openvidu.io/docs/deployment/deploying-aws/) with our Cloud Formation template no changes are required at all. If you are deploying OpenVidu Server on your own in an Ubuntu machine, installation instructions have changed a little bit. You have them properly updated [here](https://openvidu.io/docs/deployment/deploying-ubuntu/).

---
<br>

## 2.1.0

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
    <td>2.1.0</td>
    <td><a class="" href="https://www.npmjs.com/package/openvidu-browser?activeTab=versions" target="_blank">NPM</a></td>
    <td rowspan="2" class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu client side. It is a library for the browser. It allows you to control your videos and sessions directly from your client's browsers" class="icon ion-information-circled"></i></td>
  </tr>
  <tr>
    <td>JS file</td>
    <td>2.1.0</td>
    <td><a class="" href="https://github.com/OpenVidu/openvidu/releases/tag/v2.1.0" target="_blank">GitHub</a></td>
  </tr>
  
  <tr>
    <td rowspan="3">openvidu-server</td>
    <td>JAR</td>
    <td>2.1.0</td>
    <td><a class="" href="https://github.com/OpenVidu/openvidu/releases/tag/v2.1.0" target="_blank">GitHub</a></td>
    <td rowspan="3" class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu server side. It receives the remote procedure calls from openvidu-browser and manage all the media streams operations. YOU DON'T HAVE TO MAKE DIRECT USE OF IT. Just to run it and know its IP address and password" class="icon ion-information-circled"></i></td>
  </tr>
  <tr>
    <td>Docker container</td>
    <td>2.1.0</td>
    <td><a class="" href="https://hub.docker.com/r/openvidu/openvidu-server/tags/" target="_blank">DockerHub</a></td>
  </tr>
    <tr>
    <td>Docker container (+KMS)</td>
    <td>2.1.0</td>
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

#### NEW FEATURES

**OpenVidu Browser support for video management**

We have implemented a new class in OpenVidu Browser aimed to better support declarative frontend frameworks such as Angular, React or Vue.js.

Now Publisher and Subscriber objects both inherit from [StreamManager](../../api/openvidu-browser/classes/streammanager.html), which provides 2 different methods to tell OpenVidu what DOM video players should display each specific stream (`addVideoElement` and `createVideoElement`). This allows us to let OpenVidu take control of the video elements (even if our framework dynamically creates them) and do not worry about its internals. This is all explained in detail in [Manage video players](/how-do-i/manage-videos) section.

If you want to check out a real example of this behavior, explore our renovated [OpenVidu Angular tutorial](/tutorials/openvidu-insecure-angular/).<br><br>

---
<br>

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

#### NEW FEATURES

- **OpenVidu Browser new methods**

    - `Session.publish()`: now returns a Promise so you can tell if the method was successful or not.
    - `Session.signal()`: now returns a Promise so you can tell if the method was successful or not.
    - `Subcriber.subscribeToAudio()` and `Subscriber.subscribeToVideo()`: new methods that allows you to mute the audio or video tracks of a remote stream.
    - `OpenVidu.initPublisher()`: now expects properties as interface [PublisherProperties](../../api/openvidu-browser/interfaces/publisherproperties.html). They include:

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
    - There has been a simple change in certain asynchronous call. Method `Session.getSessionId()` is now synchronous, but method `OpenVidu.createSession()` is now asynchronous (the reason is pretty simple: now method _createSession_ implements the behavior that _getSessionId_ was providing the first time it was called for certain _Session_ object).
    - All callback methods have been promisified. This includes method `Session.generateToken(tokenOptions?, callback): void` (now  `Session.generateToken(tokenOptions?): Promise<string>`) and method `Session.getSessionId(callback): void` (now `OpenVidu.createSession(): Promise<Session>`, take also into account that the async call has changed from one method to the other as stated in the previous point).
    - All `Archive` entities are now called `Recording`. This includes: object `Archive` to `Recording`, object `ArchiveMode` to `RecordingMode`, object `ArchiveLayout` to `RecordingLayout`, method `SessionProperties.archiveLayout()` to `SessionProperties.recordingLayout()`, method `SessionProperties.archiveMode()` to `SessionProperties.recordingMode()`, method `SessionProperties.Builder.archiveLayout()` to `SessionProperties.Builder.recordingLayout()`, method `SessionProperties.Builder.archiveMode()` to `SessionProperties.Builder.recordingMode()`
    - `recordingLayout` property in [`SessionProperties`](../../api/openvidu-node-client/interfaces/sessionproperties.html) has changed to `defaultRecordingLayout`. This means that if one Session is gonna be recorded more than once, each recording layout may be customize with `recordingLayout` property (of [RecordingProperties](../../api/openvidu-node-client/interfaces/recordingproperties.html) interface, which will overwrite the default one globally configured in SessionProperties object. <br><br>

- **REST API**
    - All `Archive` entities are now called `Recording` in API REST. For example: `{"archiveMode": "ARCHIVE_MODE", "archiveLayout": "ARCHIVE_LAYOUT", "mediaMode": "MEDIA_MODE"}` now is `{"recordingMode": "RECORDING_MODE", "recordingLayout": "RECORDING_LAYOUT", "mediaMode": "MEDIA_MODE"}`.
    - Field `recordingLayout` is now called `defaultRecordingLayout` in operation [POST /api/sessions](https://openvidu.io/docs/reference-docs/REST-API/#post-apisessions). This means that if one Session is gonna be recorded more than once, each recording layout may be customize adding a new field `recordingLayout` in the call to [POST /api/recordings/start](https://openvidu.io/docs/reference-docs/REST-API/#post-apirecordingsstart) of the API REST, which will overwrite the default one globally configured during [POST /api/sessions](https://openvidu.io/docs/reference-docs/REST-API/#post-apisessions) <br><br>

- **Other breaking changes**
    - OpenVidu Server default port from `8443` to `4443`
    - OpenVidu Server configuration property `openvidu.recording.free-access` is now `openvidu.recording.public-access`

---
<br>

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

