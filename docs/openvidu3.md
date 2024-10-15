<h2 id="section-title">OpenVidu v3</h2>
<hr>

<p style="font-size: 18px; color: #7a7a7a; padding: 4px; text-align: right">
<i>June, 2024</i>
</p>

<p style="font-size: 18px; color: #7a7a7a; margin-top: 30px; padding: 4px;">
We are excited to introduce <a href="https://openvidu.io" target="_blank">OpenVidu v3</a>. This is a major milestone for the project and represents many months of hard work by the entire OpenVidu team. It involves a complete overhaul of OpenVidu's internal technologies, architecture and deployment. All in order to offer the best real-time media solution out there. Let's take a quick look at everything you need to know about OpenVidu v3.
</p>

<br>

- **[What are the reasons for this major release?](#what-are-the-reasons-for-this-major-release)**
- **[What has changed?](#what-has-changed)**
- **[Updating from OpenVidu v2 to OpenVidu v3](#updating-from-openvidu-v2-to-openvidu-v3)**
- **[Breaking changes](#breaking-changes)**
- **[Roadmap for the future](#roadmap-for-the-future)**

<br>

---

## What are the reasons for this major release?

At OpenVidu we are always striving to offer the latest technology available to deliver the best results in your real-time applications. We developed [Kurento](https://kurento.openvidu.io/){:target=_blank} more than a decade ago as a powerful SFU, and built OpenVidu on top of it to provide an easy-to-use framework to develop videoconferencing applications. As [Kurento](https://kurento.openvidu.io/){:target=_blank} grew older and some limitations became apparent (mainly related to performance), we decided to evolve OpenVidu to support [mediasoup](https://mediasoup.org/){:target=_blank} instead of Kurento as its internal media server.

And now it is time to take the next big step: we are now integrating [**LiveKit**](https://livekit.io/){:target=_blank} into our stack. LiveKit is a cutting-edge WebRTC stack that is open source and certainly the most popular choice in the community in recent times.

<br>

---

## What has changed?

Being now based on LiveKit's fantastic stack, OpenVidu v3 incorporates the latest innovations and optimizations in real-time media. There are so many new features and improvements that we have to summarize them in different categories:

### Media optmizations

These low-level features will take your application perfomance to the next level:

- [Simulcast](https://docs.livekit.io/realtime/client/publish/#Video-simulcast){target="_blank"} for VP8 and H264 video codecs.
- [Scalable Video Coding (SVC)](https://docs.livekit.io/guides/video-codecs/#Supported-codecs){target="_blank"} for VP9 and AV1 video codecs.
- [Dynamic Broadcasting (Dynacast)](https://docs.livekit.io/realtime/client/publish/#Dynamic-broadcasting){target="_blank"} for minimizing bandwidth consumption. It pauses the publication of any video layer that is not being consumed by any subscriber.
- [Adaptive Stream](https://docs.livekit.io/realtime/client/receive/#Adaptive-stream){target="_blank"} for UI-based video quality optimization. It sends to each user the minimum bits needed to display high-quality rendering based on the size of the video player. If a video player is hidden, the video stream is paused. This allows you to scale your application to large video rooms with thousands of users.
- [Audio RED (REDundant Encoding)](https://docs.livekit.io/guides/audio-red){target="_blank"} and [Hi-fi audio](https://docs.livekit.io/guides/hi-fi-audio/){target="_blank"} for crisp, clear, high-quality audio streams.
- [Audio DTX (Discontinuous Transmission)](https://bloggeek.me/webrtcglossary/dtx/){target="_blank"} for detecting silence in audio tracks and reducing their bandwidth.
- [WHIP](https://millicast.medium.com/whip-the-magic-bullet-for-webrtc-media-ingest-57c2b98fb285){target="_blank"} for low-latency media ingestion.

### New features

- [End-To-End Encryption (E2EE)](https://en.wikipedia.org/wiki/End-to-end_encryption){target="_blank"} for the ultimate secure communication.
- Fine-tuned roles for participants.
- More SDKs for your application client: Android, iOS, Flutter, Unity, React Components.
- Improved server-side media filters architecture: it is now decoupled, making it easier to develop custom filters and to scale them.

### Deployment

- Improved [High Availability deployments](openvidu-enterprise/high-availability/): now all required services are included. [External services](deployment/enterprise/on-premises/#overview) are not needed anymore.
- Improved architecture, making Master Nodes much more scalable. Now one Master Node can handle many more participants.
- Lighter observability stack. We have migrated from Elastic to Prometheus.
- Better connectivity for participants behind firewalls, thanks to TURN over TLS being available by default.

### Better deal for your money

- All ENTERPRISE features will be available in the PRO tier:
    - [mediasoup](openvidu-enterprise/#kurento-vs-mediasoup) support (_experimental_)
    - [High Availability deployments](openvidu-enterprise/high-availability/)
- Most PRO features will be available in the COMMUNITY tier:
    - [S3 recordings](advanced-features/recording/#uploading-recordings-to-s3)
    - [Broadcasting](advanced-features/broadcast/)
    - [Network quality](advanced-features/network-quality/)
    - [Virtual background](advanced-features/virtual-background/)
    - [Phone call integration](advanced-features/sip/)
    - A real [administration dashboard](openvidu-pro/openvidu-inspector/) is now available in COMMUNITY edition
- **iOS** and **React Native** support are now included in COMMUNITY edition

### Better developer experience

- OpenVidu PRO evaluation mode: OpenVidu PRO now includes a special execution mode that can run without a license (limiting the duration of sessions and number of participants). It is the perfect way to develop and test your OpenVidu PRO application for free.
- OpenVidu v3 offers a local deployment with an easy way to test mobile devices inside your network. You can forget about [these instructions](troubleshooting/#3-test-applications-in-my-network-with-multiple-devices): now there is no need to install SSL certificates or configure proxies to locally develop your app.

<br>

These and many other features will make your real-time application more **efficient**, **performant**, **reliable**, **secure** and **future-proof**. You can read more about what OpenVidu v3 has to offer in [our new site](https://openvidu.io){target="_blank"}.

<br>

---

## Updating from OpenVidu v2 to OpenVidu v3

Although this is a major release that involves a complete overhaul of OpenVidu's internal technologies, all OpenVidu v2 Pro/Enterprise users will have available a compatibility module that hopefully will make the transition as seamless as possible, minimizing code changes.

First of all, carefully review the list of [breaking changes](#breaking-changes) to make sure there is nothing important that may prevent you from upgrading.

Then, follow these steps to migrate an application from OpenVidu v2 to OpenVidu v3:

1. Deploy OpenVidu v3.
2. Update your application.
3. Point your server application to your new OpenVidu v3 deployment.

See below every step in detail.

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
    If you encounter any problems when running your OpenVidu v2 app against an OpenVidu v3 deployment, write us to <a href="mailto:pro.support.v2apps@openvidu.io" target="_blank"><strong>pro.support.v2apps@openvidu.io</strong></a> and we will be happy to help you.
</div>
</div>

### 1. Deploy OpenVidu v3

An OpenVidu v2 deployment is **NOT** directly upgradable to an OpenVidu v3 deployment. You will have to deploy OpenVidu v3 completely from scratch. Just follow the [official instructions](https://openvidu.io/docs/self-hosting/deployment-types/){target="_blank"}, making sure to enable **compatibility with OpenVidu v2**. You do this by enabling **`v2compatibility`** module while installing OpenVidu v3.

### 2. Update your application

#### For applications using _openvidu-browser.js_ library

This includes any client application built with web technologies (**JavaScript**, **Angular**, **Vue**, **React**, **Ionic** and **Electron**):

If your application has a _package.json_:

- Replace your `openvidu-browser:2.X.X` dependency with `openvidu-browser-v2compatibility:3.X.X` in your package.json. You can find the latest version in the [releases table below](#artifacts-for-v2-apps-compatible-with-openvidu-v3).

If your application imports the *openvidu-browser.js* bundle library directly:

- Replace file `openvidu-browser-2.X.X.js` with `openvidu-browser-v2compatibility-3.X.X.js`. You can find the latest version in the [releases table below](#artifacts-for-v2-apps-compatible-with-openvidu-v3).

#### For application using the OpenVidu Web Component

This includes any client application built with the [OpenVidu Web Component](/ready-to-use-component/).

- Replace both web component files: `openvidu-webcomponent-2.X.X.js` to `openvidu-webcomponent-v2compatibility-3.X.X.js` and `openvidu-webcomponent-2.X.X.css` to `openvidu-webcomponent-v2compatibility-3.X.X.css`. You can find the latest version in the [releases table below](#artifacts-for-v2-apps-compatible-with-openvidu-v3).

#### For applications using OpenVidu Components (Angular)

- Replace your `openvidu-angular:2.X.X` dependency with `openvidu-angular-v2compatibility:3.X.X` in your `package.json`

<div class="warningBoxContent">
  <div style="display: table-cell; vertical-align: middle;">
      <i class="icon ion-android-alert warningIcon"></i>
  </div>
  <div class="warningBoxText">
    The following client technologies are not currently compatible with OpenVidu v3. We are currently working in providing a compatibility layer for them:
    <ul><br>
        <li><strong>React Native</strong></li>
        <li><strong>Android native</strong></li>
        <li><strong>iOS native</strong></li>
    </ul>
  </div>
</div>

#### For applications using server SDKs [openvidu-java-client, openvidu-node-client]

> This is actually not mandatory, but recommended for consistency and possible future updates.

- If your application has a Java backend and you are using `openvidu-java-client`, replace in your pom.xml `openvidu-java-client:2.X.X` for `openvidu-java-client-v2compatibility:3.X.X`. You can find the latest version in the [releases table below](#artifacts-for-v2-apps-compatible-with-openvidu-v3).
- If your application has a Node backend and you are using `openvidu-node-client`, replace in your package.json `openvidu-node-client:2.X.X` for `openvidu-node-client-v2compatibility:3.X.X`. You can find the latest version in the [releases table below](#artifacts-for-v2-apps-compatible-with-openvidu-v3).

### 3. Point your server application to your new OpenVidu v3 deployment

Make sure that your server application is configured to connect to your new OpenVidu v3 deployment. Depending on the deployment type you have chosen, you will have to update OpenVidu Server URL and OpenVidu Secret in your server application accordingly.

- [OpenVidu Local Deployment](https://openvidu.io/latest/docs/self-hosting/local/#openvidu-pro_1)
- OpenVidu Elastic Deployment:
    - [On-Premises](https://openvidu.io/latest/docs/self-hosting/elastic/on-premises/install/#configure-your-application-to-use-the-deployment)
    - [AWS](https://openvidu.io/latest/docs/self-hosting/elastic/aws/install/#configure-your-application-to-use-the-deployment)
- OpenVidu High Availability Deployment:
    - [On-Premises](https://openvidu.io/latest/docs/self-hosting/ha/on-premises/install-dlb/#configure-your-application-to-use-the-deployment)
    - [AWS](https://openvidu.io/latest/docs/self-hosting/ha/aws/install/#configure-your-application-to-use-the-deployment)

After these steps, your application should be up and running against OpenVidu v3.

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
    If you encounter any problems when running your OpenVidu v2 app against an OpenVidu v3 deployment, write us to <a href="mailto:pro.support.v2apps@openvidu.io" target="_blank"><strong>pro.support.v2apps@openvidu.io</strong></a> and we will be happy to help you.
</div>
</div>

<br>

---

## Breaking changes

Although most OpenVidu v2 applications should work out of the box with OpenVidu v3, there are some breaking changes that developers should be aware of before starting the upgrade process:

#### General breaking changes

- [IP Cameras](advanced-features/ip-cameras/) are not supported (for now).
- [Speech To Text](advanced-features/speech-to-text/) is not supported (for now).
- [Server-side voice and video filters](advanced-features/filters/) are not supported out-of-the-box.
- [Autoscaling](openvidu-pro/scalability/#autoscaling) is not available for On-Premises deployments. It is currently available for AWS deployments.
- In Connection objects the `subscribers` array will always be empty. This applies to the `subscribers` property in the JSON response of the [REST API](reference-docs/REST-API/#the-connection-object) methods, the [Connection#getSubscribers](api/openvidu-java-client/io/openvidu/java/client/Connection.html#getSubscribers()) method of openvidu-java-client, and the [Connection.subscribers](api/openvidu-node-client/classes/Connection.html#subscribers) property of openvidu-node-client.
- As there are no official OpenVidu SDKs for native [Android](tutorials/openvidu-android/) and [iOS](tutorials/openvidu-ios/), applications have to be updated to use the LiveKit SDKs. We are currently working on migration guides.

#### Breaking changes in openvidu-browser

- `reason` attribute is available but not accurate for events: [sessionDisconnected](api/openvidu-browser/classes/SessionDisconnectedEvent.html#reason), [connectionDestroyed](api/openvidu-browser/classes/ConnectionEvent.html#reason), [streamDestroyed](api/openvidu-browser/classes/StreamEvent.html#reason) and [recordingStopped](api/openvidu-browser/classes/RecordingEvent.html#reason).
- When using [Network Quality API](advanced-features/network-quality/#understanding-the-network-quality-level), event [NetworkQualityLevelChanged](api/openvidu-browser/classes/NetworkQualityLevelChangedEvent.html) now returns only values ​​1,3 and 5 (never 2 or 4). Representing 5 good network, 3 average network and 1 poor network.
- Method [Stream.reconnect](api/openvidu-browser/classes/Stream.html#reconnect) exists but does nothing.
- ICE exception events are not generated. This means that [ExceptionEvent](api/openvidu-browser/classes/ExceptionEvent.html) will not be fired with event names [ICE_CANDIDATE_ERROR](api/openvidu-browser/enums/ExceptionEventName.html#ICE_CANDIDATE_ERROR), [ICE_CONNECTION_DISCONNECTED](api/openvidu-browser/enums/ExceptionEventName.html#ICE_CONNECTION_DISCONNECTED), [ICE_CONNECTION_FAILED](api/openvidu-browser/enums/ExceptionEventName.html#ICE_CONNECTION_FAILED).

#### Breaking changes in recording

> You can ignore these points if you are not making use of the [Recording feature](advanced-features/recording/).

- For [`OPENVIDU_PRO_RECORDING_STORAGE=local`](reference-docs/openvidu-config/#configuration-parameters-for-openvidu-pro) files won’t be available in the filesystem until the recording is stopped.
- Media Node selection is disabled for recordings (recordings will always launch in the less loaded node). Providing a [`mediaNode`](advanced-features/recording/#scalable-composed-recording) parameter when starting a recording won't have any effect.
- The output of [INDIVIDUAL recordings](advanced-features/recording/#individual-recording) have `mp4` extension instead of `webm`.
- [INDIVIDUAL recordings](advanced-features/recording/#individual-recording) consume more resources, as transcoding is required.
- Thumbnail is not generated in [COMPOSED recordings](advanced-features/recording/#composed-recording).

#### Breaking changes in Webhook events

> You can ignore these points if you are not listening to [Webhook events](reference-docs/openvidu-server-webhook/).

- Webhook events are not sent when a subscription is made in a Session. This means that [webrtcConnectionCreated](reference-docs/openvidu-server-webhook/#webrtcconnectioncreated) and [webrtcConnectionDestroyed](reference-docs/openvidu-server-webhook/#webrtcconnectiondestroyed) events with property `"connection"` set to `"INBOUND"` will not be fired.
- `reason` attribute is available but not accurate for webhook events [sessionDestroyed](reference-docs/openvidu-server-webhook/#sessiondestroyed), [participantLeft](reference-docs/openvidu-server-webhook/#participantleft), [webrtcConnectionDestroyed](reference-docs/openvidu-server-webhook/#webrtcconnectiondestroyed) and [recordingStatusChanged](reference-docs/openvidu-server-webhook/#recordingstatuschanged).
- `location` attribute has a fixed fake value ("unknown") for webhook events [participantJoined](reference-docs/openvidu-server-webhook/#participantjoined) and [participantLeft](reference-docs/openvidu-server-webhook/#participantleft).
- `videoFramerate` attribute has a fixed fake value (30) for webhook events [webrtcConnectionDestroyed](reference-docs/openvidu-server-webhook/#webrtcconnectioncreated) and [webrtcConnectionDestroyed](reference-docs/openvidu-server-webhook/#webrtcconnectiondestroyed).
- Node management webhooks are not available. These webhook events will not be fired: [nodeCrashed](reference-docs/openvidu-server-webhook/#nodecrashed), [nodeRecovered](reference-docs/openvidu-server-webhook/#noderecovered), [mediaNodeStatusChanged](reference-docs/openvidu-server-webhook/#medianodestatuschanged), [autoscaling](reference-docs/openvidu-server-webhook/#autoscaling), [HANodeRegistered](reference-docs/openvidu-server-webhook/#hanoderegistered), [HANodeDeregistered](reference-docs/openvidu-server-webhook/#hanodederegistered).

#### Breaking changes in REST API

> The affected REST API methods are related to the cluster administration. Functional REST API methods for managing Sessions, Connections and Recordings remain unchanged.

- [Health check API](reference-docs/REST-API/#get-health) method doesn’t return nodes. The response will only have the `status` attribute.
- [Restart API](reference-docs/REST-API/#post-restart) method is not available.
- [Node management API](reference-docs/REST-API/#the-media-node-object) is not available. This affects the following methods: [Retrieve Media Node info](reference-docs/REST-API/#get-medianode), [Retrieve all Media Nodes info](reference-docs/REST-API/#get-all-medianodes), [Add Media Node](reference-docs/REST-API/#post-medianode), [Remove Media Node](reference-docs/REST-API/#delete-medianode), [Modify Media Node](reference-docs/REST-API/#patch-medianode) and [Autodiscover Media Nodes](reference-docs/REST-API/#put-medianode).

#### Breaking changes in operations

- The configuration is different: configuration is now split different files and config parameters have changed.
- You need a brand new deployment. A direct update of an OpenVidu v2 deployment to an OpenVidu v3 deployment is not possible.

<br>

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
    If you encounter any problems when running your OpenVidu v2 app against an OpenVidu v3 deployment, write us to <a href="mailto:pro.support.v2apps@openvidu.io" target="_blank"><strong>pro.support.v2apps@openvidu.io</strong></a> and we will be happy to help you.
</div>
</div>

<br>

---

## Roadmap for the future

The OpenVidu team will spend the near future making sure OpenVidu v2 applications are working fine with OpenVidu v3 (remember that you can write us at [pro.support.v2apps@openvidu.io](mailto:pro.support.v2apps@openvidu.io){target="_blank"} if you need custom support).

We will also address some limitations for users coming from OpenVidu v2: we will incorporate in OpenVidu v3 **Speech To Text** and **IP cameras** support as soon as possible.

As mid-term goals, will be working in supporting a mesh distribution in the media servers, which will allow for massive Rooms in your own infrastructure.


<br>

----

## Artifacts for v2 apps compatible with OpenVidu v3

The below artifacts allow making your OpenVidu v2 application compatible whith an OpenVidu v3 deployment. Read the [instructions](#updating-from-openvidu-v2-to-openvidu-v3) to update your app and make it work against an OpenVidu v3 deployment.

### Release 3.0.0-beta3

<table class="artifact-table">

  <tr>
    <th>Artifact</th>
    <th>Type</th>
    <th>Compatible Version</th>
    <th>Link</th>
    <th class="last-table-col">Info</th>
  </tr>

  <tr>
    <td rowspan="2" style="vertical-align: middle">openvidu-browser-v2compatibility</td>
    <td>NPM package</td>
    <td>3.0.0-beta3</td>
    <td><a class="" href="https://www.npmjs.com/package/openvidu-browser-v2compatibility" target="_blank">NPM</a></td>
    <td rowspan="2" style="vertical-align: middle" class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu client side. It is a library for the browser. It allows you to control your videos and sessions directly from your client's browsers" class="icon ion-information-circled"></i></td>
  </tr>
  <tr>
    <td>JS file</td>
    <td>3.0.0-beta3</td>
    <td><a class="" href="https://github.com/OpenVidu/openvidu/releases/download/v3.0.0-beta3/openvidu-browser-v2compatibility-3.0.0-beta3.min.js" target="_blank">Download</a></td>
  </tr>

  <tr>
    <td>openvidu-angular-v2compatibility</td>
    <td>NPM package</td>
    <td>3.0.0-beta3</td>
    <td><a class="" href="https://www.npmjs.com/package/openvidu-angular-v2compatibility" target="_blank">NPM</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu Angular Components. Easier way to add OpenVidu video calls to your existing Angular application" class="icon ion-information-circled"></i></td>
  </tr>

  <tr>
    <td>openvidu-webcomponent-v2compatibility</td>
    <td>ZIP</td>
    <td>3.0.0-beta3</td>
    <td><a class="" href="https://github.com/OpenVidu/openvidu/releases/download/v3.0.0-beta3/openvidu-webcomponent-v2compatibility-3.0.0-beta3.zip" target="_blank">Download</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu Web Component. Easier way to add OpenVidu video calls to your existing web application" class="icon ion-information-circled"></i></td>
  </tr>

  <tr>
    <td>openvidu-java-client-v2compatibility</td>
    <td>MVN package</td>
    <td>3.0.0-beta3</td>
    <td><a class="" href="https://central.sonatype.com/artifact/io.openvidu/openvidu-java-client-v2compatibility/3.0.0-beta3" target="_blank">MVN Repository</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="SDK for your JAVA server. Simple alternative to the REST API" class="icon ion-information-circled"></i></td>
  </tr>

  <tr>
    <td>openvidu-node-client-v2compatibility</td>
    <td>NPM package</td>
    <td>3.0.0-beta3</td>
    <td><a class="" href="https://www.npmjs.com/package/openvidu-node-client-v2compatibility" target="_blank">NPM</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="SDK for your NODE server. Simple alternative to the REST API" class="icon ion-information-circled"></i></td>
  </tr>

</table>

### Release 3.0.0-beta2

<table class="artifact-table">

  <tr>
    <th>Artifact</th>
    <th>Type</th>
    <th>Compatible Version</th>
    <th>Link</th>
    <th class="last-table-col">Info</th>
  </tr>

  <tr>
    <td rowspan="2" style="vertical-align: middle">openvidu-browser-v2compatibility</td>
    <td>NPM package</td>
    <td>3.0.0-beta2</td>
    <td><a class="" href="https://www.npmjs.com/package/openvidu-browser-v2compatibility" target="_blank">NPM</a></td>
    <td rowspan="2" style="vertical-align: middle" class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu client side. It is a library for the browser. It allows you to control your videos and sessions directly from your client's browsers" class="icon ion-information-circled"></i></td>
  </tr>
  <tr>
    <td>JS file</td>
    <td>3.0.0-beta2</td>
    <td><a class="" href="https://github.com/OpenVidu/openvidu/releases/download/v3.0.0-beta2/openvidu-browser-v2compatibility-3.0.0-beta2.min.js" target="_blank">Download</a></td>
  </tr>

  <tr>
    <td>openvidu-angular-v2compatibility</td>
    <td>NPM package</td>
    <td>3.0.0-beta2</td>
    <td><a class="" href="https://www.npmjs.com/package/openvidu-angular-v2compatibility" target="_blank">NPM</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu Angular Components. Easier way to add OpenVidu video calls to your existing Angular application" class="icon ion-information-circled"></i></td>
  </tr>

  <tr>
    <td>openvidu-webcomponent-v2compatibility</td>
    <td>ZIP</td>
    <td>3.0.0-beta2</td>
    <td><a class="" href="https://github.com/OpenVidu/openvidu/releases/download/v3.0.0-beta2/openvidu-webcomponent-v2compatibility-3.0.0-beta2.zip" target="_blank">Download</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu Web Component. Easier way to add OpenVidu video calls to your existing web application" class="icon ion-information-circled"></i></td>
  </tr>

  <tr>
    <td>openvidu-java-client-v2compatibility</td>
    <td>MVN package</td>
    <td>3.0.0-beta2</td>
    <td><a class="" href="https://central.sonatype.com/artifact/io.openvidu/openvidu-java-client-v2compatibility/3.0.0-beta2" target="_blank">MVN Repository</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="SDK for your JAVA server. Simple alternative to the REST API" class="icon ion-information-circled"></i></td>
  </tr>

  <tr>
    <td>openvidu-node-client-v2compatibility</td>
    <td>NPM package</td>
    <td>3.0.0-beta2</td>
    <td><a class="" href="https://www.npmjs.com/package/openvidu-node-client-v2compatibility" target="_blank">NPM</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="SDK for your NODE server. Simple alternative to the REST API" class="icon ion-information-circled"></i></td>
  </tr>

</table>

### Release 3.0.0-beta1

<table class="artifact-table">

  <tr>
    <th>Artifact</th>
    <th>Type</th>
    <th>Compatible Version</th>
    <th>Link</th>
    <th class="last-table-col">Info</th>
  </tr>

  <tr>
    <td rowspan="2" style="vertical-align: middle">openvidu-browser-v2compatibility</td>
    <td>NPM package</td>
    <td>3.0.0-beta1</td>
    <td><a class="" href="https://www.npmjs.com/package/openvidu-browser-v2compatibility" target="_blank">NPM</a></td>
    <td rowspan="2" style="vertical-align: middle" class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu client side. It is a library for the browser. It allows you to control your videos and sessions directly from your client's browsers" class="icon ion-information-circled"></i></td>
  </tr>
  <tr>
    <td>JS file</td>
    <td>3.0.0-beta1</td>
    <td><a class="" href="https://github.com/OpenVidu/openvidu/releases/download/v3.0.0-beta1/openvidu-browser-v2compatibility-3.0.0-beta1.min.js" target="_blank">Download</a></td>
  </tr>

  <tr>
    <td>openvidu-angular-v2compatibility</td>
    <td>NPM package</td>
    <td>3.0.0-beta1</td>
    <td><a class="" href="https://www.npmjs.com/package/openvidu-angular-v2compatibility" target="_blank">NPM</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu Angular Components. Easier way to add OpenVidu video calls to your existing Angular application" class="icon ion-information-circled"></i></td>
  </tr>

  <tr>
    <td>openvidu-webcomponent-v2compatibility</td>
    <td>ZIP</td>
    <td>3.0.0-beta1</td>
    <td><a class="" href="https://github.com/OpenVidu/openvidu/releases/download/v3.0.0-beta1/openvidu-webcomponent-v2compatibility-3.0.0-beta1.zip" target="_blank">Download</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu Web Component. Easier way to add OpenVidu video calls to your existing web application" class="icon ion-information-circled"></i></td>
  </tr>

  <tr>
    <td>openvidu-java-client-v2compatibility</td>
    <td>MVN package</td>
    <td>3.0.0-beta1</td>
    <td><a class="" href="https://central.sonatype.com/artifact/io.openvidu/openvidu-java-client-v2compatibility/3.0.0-beta1" target="_blank">MVN Repository</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="SDK for your JAVA server. Simple alternative to the REST API" class="icon ion-information-circled"></i></td>
  </tr>

  <tr>
    <td>openvidu-node-client-v2compatibility</td>
    <td>NPM package</td>
    <td>3.0.0-beta1</td>
    <td><a class="" href="https://www.npmjs.com/package/openvidu-node-client-v2compatibility" target="_blank">NPM</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="SDK for your NODE server. Simple alternative to the REST API" class="icon ion-information-circled"></i></td>
  </tr>

</table>

<br>
