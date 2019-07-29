<h2 id="section-title">Releases</h2>
<hr>

- [2.11.0](#2110)
- [2.10.0](#2100)
- [2.9.0](#290)
- [2.8.0](#280)
- [2.7.0](#270)
- [2.6.0](#260)
- [2.5.0](#250)
- [2.4.0](#240)
- [2.3.0](#230)
- [2.2.0](#220)
- [2.1.0](#210)
- [2.0.0](#200)
- [1.9.0-beta-1](#190-beta-1)

---

## 2.11.0

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
    <td>2.11.0</td>
    <td><a class="" href="https://www.npmjs.com/package/openvidu-browser" target="_blank">NPM</a></td>
    <td rowspan="2" class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu client side. It is a library for the browser. It allows you to control your videos and sessions directly from your client's browsers" class="icon ion-information-circled"></i></td>
  </tr>
  <tr>
    <td>JS file</td>
    <td>2.11.0</td>
    <td><a class="" href="https://github.com/OpenVidu/openvidu/releases/tag/v2.11.0" target="_blank">GitHub</a></td>
  </tr>
  
  <tr>
    <td rowspan="3">openvidu-server</td>
    <td>JAR</td>
    <td>2.11.0</td>
    <td><a class="" href="https://github.com/OpenVidu/openvidu/releases/tag/v2.11.0" target="_blank">GitHub</a></td>
    <td rowspan="3" class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu server side. It receives the remote procedure calls from openvidu-browser and manage all the media streams operations. YOU DON'T HAVE TO MAKE DIRECT USE OF IT. Just to run it and know its IP address and password" class="icon ion-information-circled"></i></td>
  </tr>
  <tr>
    <td>Docker container</td>
    <td>2.11.0</td>
    <td><a class="" href="https://hub.docker.com/r/openvidu/openvidu-server/tags/" target="_blank">DockerHub</a></td>
  </tr>
    <tr>
    <td>Docker container (+KMS)</td>
    <td>2.11.0</td>
    <td><a class="" href="https://hub.docker.com/r/openvidu/openvidu-server-kms/tags/" target="_blank">DockerHub</a></td>
  </tr>
  
  <tr>
    <td>openvidu-java-client</td>
    <td>MVN package</td>
    <td>2.11.0</td>
    <td><a class="" href="https://search.maven.org/#artifactdetails%7Cio.openvidu%7Copenvidu-java-client%7C2.11.0%7Cjar" target="_blank">MVN Repository</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="SDK for your JAVA server. Simple alternative to the REST API" class="icon ion-information-circled"></i></td>
  </tr>
  
  <tr>
    <td>openvidu-node-client</td>
    <td>NPM package</td>
    <td>2.11.0</td>
    <td><a class="" href="https://www.npmjs.com/package/openvidu-node-client" target="_blank">NPM</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="SDK for your NODE server. Simple alternative to the REST API" class="icon ion-information-circled"></i></td>
  </tr>

  <tr>
    <td>openvidu-webcomponent</td>
    <td>ZIP</td>
    <td>2.11.0</td>
    <td><a class="" href="https://github.com/OpenVidu/openvidu/releases/tag/v2.11.0" target="_blank">GitHub</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu Web Component. Easier way to add OpenVidu video calls to your existing web application" class="icon ion-information-circled"></i></td>
  </tr>

  <tr>
    <td>openvidu-angular</td>
    <td>NPM package</td>
    <td>2.11.0</td>
    <td><a class="" href="https://www.npmjs.com/package/openvidu-angular" target="_blank">NPM</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu Angular. Easier way to add OpenVidu video calls to your existing Angular application" class="icon ion-information-circled"></i></td>
  </tr>

  <tr>
    <td>openvidu-react</td>
    <td>NPM package</td>
    <td>2.11.0</td>
    <td><a class="" href="https://www.npmjs.com/package/openvidu-react" target="_blank">NPM</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu React. Easier way to add OpenVidu video calls to your existing React application" class="icon ion-information-circled"></i></td>
  </tr>

  <tr>
    <td>Kurento Media Server</td>
    <td>Ubuntu package</td>
    <td>6.11.0</td>
    <td><a class="" href="https://doc-kurento.readthedocs.io/en/6.11.0/user/installation.html#local-installation" target="_blank">Kurento Docs</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="Core component in charge of the media transmissions" class="icon ion-information-circled"></i></td>
  </tr>

</table>

### Release Notes

#### NEW FEATURES IN OPENVIDU COMMUNITY

<br>

##### OpenVidu Webhook service

You are now able to receive OpenVidu events in your application server by using the brand new Webhook service. This is a feature that has been requested for a long time, and you can start using it right now.

> You have all the information in the official documentation: [OpenVidu Server Webhook](https://openvidu.io/docs/reference-docs/openvidu-server-webhook/){:target="_blank"}

<br>

##### Externalizing configuration of OpenVidu Server

Are you tired of having to write all the configuration parameters in openvidu-server launch command? Well, now you can externalize all your configuration into a separate file. You just need to use property `spring.config.additional-location` like this:

```bash
java -Dspring.config.additional-location=/path/to/application.properties -jar openvidu-server.jar
```

Then all configuration parameters listed in that file will be used.

> You have all the information in the official documentation: [Externalizing configuration](https://openvidu.io/docs/reference-docs/openvidu-server-params/#externalizing-configuration){:target="_blank"}

#### NEW FEATURES IN OPENVIDU PRO

<br>

##### First version of scalability

Finally OpenVidu brings the possibility of deploying a cluster with multiple media server instances. OpenVidu Pro will distribute your sessions among all available media servers based on their current load. Take a look to the official OpenVidu Pro tier documentation to learn more: [Scalability](https://openvidu.io/docs/openvidu-pro/scalability){:target="_blank"}

<br>

##### Persistent configuration when restarting OpenVidu Server Pro
Whenever you restart OpenVidu Server Pro by using the [REST API](https://openvidu.io/docs/openvidu-pro/REST-API-pro/#post-prorestart){:target="_blank"}, the new parameters you provide will be saved to disk. This way you will be able to stop the service or even the host without losing the last configuration you provided when restarting OpenVidu Server Pro through REST API.

#### BUG FIXES

- _openvidu-browser_: when sharing the entire screen in Electron, no Publisher was being initalized. Now it does.
- _openvidu-browser_: mobile devices where sending a streamPropertyChanged event when rotating the phone even when the Publisher wasn't being published to the session (error on the websocket connection). Now they don't.
- _openvidu-server_: when KMS crashed and was rebooted, sometimes the first user republishing a Stream would get an error. Now it doesn't.
- _openvidu-pro_: restarting OpenVidu Pro from Inspector and enabling CDR failed. Now it doesn't.
- _openvidu-pro_: Kibana failed returning documents before running a session. Now it doesn't.
- _openvidu-pro_: Inspector loggin process may failed when connecting through Firefox. Now it doesn't.

#### OTHER NOTEWORTHY CHANGES

Although this is not a visible feature for OpenVidu final users, we would like to mention that we have updated OpenVidu Server to **Spring Boot 2**. OpenVidu Server core has been based on Spring Boot 1 since the beginning of the project, but we decided to invest some time to upgrade it to the latest stable version to take advantage of its many new improvements. This should translate in better performance, stability and security.

#### BREAKING CHANGES

OpenVidu CDR events `recordingStarted` and `recordingStopped` are now deprecated in favour of `recordingStatusChanged` event. Check this new event [here](https://openvidu.io/docs/reference-docs/openvidu-server-cdr){:target="_blank"}. Besides, event `recordingStopped` now won't provide the final values of the recording (specifically its `duration` and `size` properties, that will be 0). You will have to listen to `recordingStatusChanged` with status `ready` to get them.

<br>

---

## 2.10.0

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
    <td>2.10.0</td>
    <td><a class="" href="https://www.npmjs.com/package/openvidu-browser" target="_blank">NPM</a></td>
    <td rowspan="2" class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu client side. It is a library for the browser. It allows you to control your videos and sessions directly from your client's browsers" class="icon ion-information-circled"></i></td>
  </tr>
  <tr>
    <td>JS file</td>
    <td>2.10.0</td>
    <td><a class="" href="https://github.com/OpenVidu/openvidu/releases/tag/v2.10.0" target="_blank">GitHub</a></td>
  </tr>
  
  <tr>
    <td rowspan="3">openvidu-server</td>
    <td>JAR</td>
    <td>2.10.0</td>
    <td><a class="" href="https://github.com/OpenVidu/openvidu/releases/tag/v2.10.0" target="_blank">GitHub</a></td>
    <td rowspan="3" class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu server side. It receives the remote procedure calls from openvidu-browser and manage all the media streams operations. YOU DON'T HAVE TO MAKE DIRECT USE OF IT. Just to run it and know its IP address and password" class="icon ion-information-circled"></i></td>
  </tr>
  <tr>
    <td>Docker container</td>
    <td>2.10.0</td>
    <td><a class="" href="https://hub.docker.com/r/openvidu/openvidu-server/tags/" target="_blank">DockerHub</a></td>
  </tr>
    <tr>
    <td>Docker container (+KMS)</td>
    <td>2.10.0</td>
    <td><a class="" href="https://hub.docker.com/r/openvidu/openvidu-server-kms/tags/" target="_blank">DockerHub</a></td>
  </tr>
  
  <tr>
    <td>openvidu-java-client</td>
    <td>MVN package</td>
    <td>2.10.0</td>
    <td><a class="" href="https://search.maven.org/#artifactdetails%7Cio.openvidu%7Copenvidu-java-client%7C2.10.0%7Cjar" target="_blank">MVN Repository</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="SDK for your JAVA server. Simple alternative to the REST API" class="icon ion-information-circled"></i></td>
  </tr>
  
  <tr>
    <td>openvidu-node-client</td>
    <td>NPM package</td>
    <td>2.10.0</td>
    <td><a class="" href="https://www.npmjs.com/package/openvidu-node-client" target="_blank">NPM</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="SDK for your NODE server. Simple alternative to the REST API" class="icon ion-information-circled"></i></td>
  </tr>

  <tr>
    <td>openvidu-webcomponent</td>
    <td>ZIP</td>
    <td>2.10.0</td>
    <td><a class="" href="https://github.com/OpenVidu/openvidu/releases/tag/v2.10.0" target="_blank">GitHub</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu Web Component. Easier way to add OpenVidu video calls to your existing web application" class="icon ion-information-circled"></i></td>
  </tr>

  <tr>
    <td>openvidu-angular</td>
    <td>NPM package</td>
    <td>2.10.0</td>
    <td><a class="" href="https://www.npmjs.com/package/openvidu-angular" target="_blank">NPM</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu Angular. Easier way to add OpenVidu video calls to your existing Angular application" class="icon ion-information-circled"></i></td>
  </tr>

  <tr>
    <td>openvidu-react</td>
    <td>NPM package</td>
    <td>2.10.0</td>
    <td><a class="" href="https://www.npmjs.com/package/openvidu-react" target="_blank">NPM</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu React. Easier way to add OpenVidu video calls to your existing React application" class="icon ion-information-circled"></i></td>
  </tr>

  <tr>
    <td>Kurento Media Server</td>
    <td>Ubuntu package</td>
    <td>6.10.0</td>
    <td><a class="" href="https://doc-kurento.readthedocs.io/en/6.10.0/user/installation.html#local-installation" target="_blank">Kurento Docs</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="Core component in charge of the media transmissions" class="icon ion-information-circled"></i></td>
  </tr>

</table>

### Release Notes

#### NEW FEATURES

This release brings support to more and more clients, so you can expand your OpenVidu client-side range. Of course, they are all compatible with each other and with every other platform already supported.

<br>
##### Electron support

OpenVidu has supported most popular browsers since its inception, and past releases brought official support to Android and iOS through [Ionic](https://openvidu.io/docs/tutorials/openvidu-ionic/){:target="_blank"}. But there was still a gap regarding desktop applications. With 2.10.0 we are happy to announce that you are now able to implement your Windows, OSX and Linux native app with OpenVidu through Electron.

> What is Electron? It is great framework for building native desktop applications with classic web technologies (simple, good old HTML, CSS and JS).

Electron is to desktop operating systems what Ionic is to mobile operating systems. Some examples of great applications built with Electron are Slack, Skype, Atom or Visual Studio Code
Using Electron means that the same codebase you are already using for your web and mobile application can be used to build a desktop app that will work on Windows, OSX and Linux. Take a look to our brand new [openvidu-electron](https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-electron){:target="_blank"} tutorial, and you will have a desktop OpenVidu app working in minutes. It even brings screen-sharing!

<br>

##### React Native support

You’re not convinced by Ionic? Now you can choose React Native framework for developing your OpenVidu mobile app. React Native is rather similar to Ionic from the developers perspective, but at the same time its nature is very different. Essentially, it really uses native Android and iOS UI components under the hood while Ionic is based on WebView (in a nutshell, it runs on the browser).

> React Native support is not part of the open source stack of OpenVidu platform. Please, contact us through [Commercial](https://openvidu.io/commercial){:target="_blank"} page to ask for React Native support. You can then use [openvidu-react-native](https://openvidu.io/docs/tutorials/openvidu-react-native/){:target="_blank"} tutorial to quickly get started

<br>

##### Internet Explorer support

Yes, it’s 2019. But there’s still a lot of companies out there that provide/require IE support and need videoconferencing systems to work in this browser relic. So that’s why we have brought OpenVidu support to IE through Temasys plugin. Only IE 11 is supported (going further back was too much of a pain).

> Internet Explorer support is not part of the open source stack of OpenVidu platform. Please, contact us through [Commercial](https://openvidu.io/commercial){:target="_blank"} page to ask for React Native support. You can then use [openvidu-internet-explorer](https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-internet-explorer/){:target="_blank"} tutorial to quickly get started

<br>

#### BUG FIXES

- *openvidu-angular* and *openvidu-webcomponent* were failing when screen sharing. Now they don’t.
- *openvidu-browser*: screen-sharing streams are not mirrored in the local videos now by default.
- *openvidu-browser*: event streamPlaying was being triggered anormally when calling [`StreamManager.addVideoElement`](https://openvidu.io/api/openvidu-browser/classes/streammanager.html#addvideoelement){:target="_blank"} method. Now it doesn’t.
- *openvidu-node-client* and *openvidu-java-client*: removed static methods and properties from OpenVidu object. Now it is possible to keep a collection of OpenVidu objects from same Node or Java app by using SDK clients, which allows to manage multiple OpenVidu Servers from the same application.
- *openvidu-browser* now checks version compatibility with openvidu-server. If version numbers are not equal, an error will be printed in the browser’s console when calling Session.connect method, so developers know they must use same version number on both sides. This gives devs very useful information about a very common mistake that usually leads to bugs that can be very difficult to trace but have a really simple solution, which is simply upgrading openvidu-browser library version. This new verification is not really a bug fix, but for sure will help avoiding future bugs.

<br>

---

<br>

## 2.9.0

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
    <td>2.9.0</td>
    <td><a class="" href="https://www.npmjs.com/package/openvidu-browser" target="_blank">NPM</a></td>
    <td rowspan="2" class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu client side. It is a library for the browser. It allows you to control your videos and sessions directly from your client's browsers" class="icon ion-information-circled"></i></td>
  </tr>
  <tr>
    <td>JS file</td>
    <td>2.9.0</td>
    <td><a class="" href="https://github.com/OpenVidu/openvidu/releases/tag/v2.9.0" target="_blank">GitHub</a></td>
  </tr>
  
  <tr>
    <td rowspan="3">openvidu-server</td>
    <td>JAR</td>
    <td>2.9.0</td>
    <td><a class="" href="https://github.com/OpenVidu/openvidu/releases/tag/v2.9.0" target="_blank">GitHub</a></td>
    <td rowspan="3" class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu server side. It receives the remote procedure calls from openvidu-browser and manage all the media streams operations. YOU DON'T HAVE TO MAKE DIRECT USE OF IT. Just to run it and know its IP address and password" class="icon ion-information-circled"></i></td>
  </tr>
  <tr>
    <td>Docker container</td>
    <td>2.9.0</td>
    <td><a class="" href="https://hub.docker.com/r/openvidu/openvidu-server/tags/" target="_blank">DockerHub</a></td>
  </tr>
    <tr>
    <td>Docker container (+KMS)</td>
    <td>2.9.0</td>
    <td><a class="" href="https://hub.docker.com/r/openvidu/openvidu-server-kms/tags/" target="_blank">DockerHub</a></td>
  </tr>
  
  <tr>
    <td>openvidu-java-client</td>
    <td>MVN package</td>
    <td>2.9.0</td>
    <td><a class="" href="https://search.maven.org/#artifactdetails%7Cio.openvidu%7Copenvidu-java-client%7C2.9.0%7Cjar" target="_blank">MVN Repository</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="SDK for your JAVA server. Simple alternative to the REST API" class="icon ion-information-circled"></i></td>
  </tr>
  
  <tr>
    <td>openvidu-node-client</td>
    <td>NPM package</td>
    <td>2.9.0</td>
    <td><a class="" href="https://www.npmjs.com/package/openvidu-node-client" target="_blank">NPM</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="SDK for your NODE server. Simple alternative to the REST API" class="icon ion-information-circled"></i></td>
  </tr>

  <tr>
    <td>openvidu-webcomponent</td>
    <td>ZIP</td>
    <td>2.9.0</td>
    <td><a class="" href="https://github.com/OpenVidu/openvidu/releases/tag/v2.9.0" target="_blank">GitHub</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu Web Component. Easier way to add OpenVidu video calls to your existing web application" class="icon ion-information-circled"></i></td>
  </tr>

  <tr>
    <td>openvidu-angular</td>
    <td>NPM package</td>
    <td>2.9.0</td>
    <td><a class="" href="https://www.npmjs.com/package/openvidu-angular" target="_blank">NPM</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu Angular. Easier way to add OpenVidu video calls to your existing Angular application" class="icon ion-information-circled"></i></td>
  </tr>

  <tr>
    <td>openvidu-react</td>
    <td>NPM package</td>
    <td>2.9.0</td>
    <td><a class="" href="https://www.npmjs.com/package/openvidu-react" target="_blank">NPM</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu React. Easier way to add OpenVidu video calls to your existing React application" class="icon ion-information-circled"></i></td>
  </tr>

  <tr>
    <td>Kurento Media Server</td>
    <td>Ubuntu package</td>
    <td>6.10.0</td>
    <td><a class="" href="https://doc-kurento.readthedocs.io/en/6.10.0/user/installation.html#local-installation" target="_blank">Kurento Docs</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="Core component in charge of the media transmissions" class="icon ion-information-circled"></i></td>
  </tr>

</table>

### Release Notes

#### NEW FEATURES

<br>
##### Ubuntu 18.04 bionic support

Our team has released [Kurento 6.10.0](https://doc-kurento.readthedocs.io/en/6.10.0/project/relnotes/v6_10_0.html){:target="_blank"}, which can now be installed in Ubuntu 18.04 systems. This is a milestone we've been working on for quite some time, and we finally believe we're ready to launch official support for the newest Ubuntu LTS version. Deployment section in OpenVidu Docs is properly updated to inform about this.

We still consider Ubuntu Bionic to be in a preliminary support state, and some bugs may appear. In fact, we know for sure there's one limitation: no OpenCV filters will work in Ubuntu 18.04 at this moment. OpenVidu has supported [audio and video filters](https://openvidu.io/docs/advanced-features/filters/){:target="_blank"} for a long time now, and it is a cool feature that allows developers to implement some advanced audio and video real-time processing in the server side. But unfortunately Kurento has not been updated yet to support it in Bionic, so no FaceOverlayFilter or ChromaFilter will work in new Ubuntu version. But you can still use [GStreamer filters](https://openvidu.io/docs/advanced-features/filters/#gstreamer-filters){:target="_blank"}!

<br>

##### OpenVidu Server boot process greatly improved

OpenVidu Server now checks all requiered conditions at boot time, which helps solving missconfiguration problems when [deploying on Ubuntu](https://openvidu.io/docs/deployment/deploying-ubuntu/){:target="_blank"}. This includes every requirement related to permissions and installed software. If something is missing, wrong or there are not enough permissions in certain path, the OpenVidu Server process immediately exits with a clear description about what happened and a possible solution to fix it.

In our experience, this makes the process of installing OpenVidu Server directly in Ubuntu so much easier and manageable.

<br>

##### OpenVidu reconnection to Kurento Media Server

If OpenVidu Server loses its connection to Kurento Media Server, now it will try to reconnect automatically. When it does so, if it is a new instance of Kurento, every stream of every previously active session will be destroyed with reason `mediaServerDisconnect` and every active recording will be stopped with same reason, but your users will not be disconnected from your sessions. This way you can directly re-publish and re-subscribe any desired stream right away.

This may help in case Kurento crashes: your users will have lost their media connections, but they will still be connected to their OpenVidu sessions and will only have to re-establish streams once OpenVidu Server is connected to a new Kurento instance.

<br>

##### OpenVidu upgrade process

Do you want to upgrade your OpenVidu deployment? Now you have a section entirely dedicated to it in the [documentation](https://openvidu.io/docs/deployment/upgrading/){:target="_blank"}. If you have deployed OpenVidu in AWS, it's as easy as launching a single command. If you have chosen Ubuntu deployment, then you will have to manually run some commands. Either way, you have available proper instructions now.

<br>

##### Native screen-sharing for Chrome

OpenVidu has supported native screen-sharing for Firefox since its inception, but Google decided to have Chrome require an extension to allow screen-sharing. Finally they changed their mind and brought Chrome up to the standard, supporting *[getDisplayMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia){:target="_blank"}* API.

So, our client library openvidu-browser now supports native screen-sharing for Chrome≥72. No extension needed for these browsers!

<br>

##### OpenVidu Call improvements

Our best demo application has been updated with some exciting new features:

- Users can now share their webcam and their screen at the same time.
- The chat is better integrated now.
- You can enlarge as many videos as you want, not just one. Available space will be automatically managed by the application for best fit.
- Preview window for camera and mic selection has undergone many necessary fixes. Now it works fine in every OS and client supported by OpenVidu.
[openvidu-call-ionic](https://openvidu.io/docs/demos/openvidu-call-ionic/){:target="_blank"} (Ionic version of OpenVidu Call for mobile devices) now supports Ionic 4 and works fine in iOS.ready to

<br>

#### BUG FIXES

- For COMPOSED recording with video, when multiple screen sharing streams were being published it crashed. Now it doesn't.
- For COMPOSED recordings with video, when stopping them immediatley after started, sometimes the generated video file would not be playable. Now in this cases `failed` status is set to this recordings, so you can take care of them properly.
- After manually stopping ALWAYS recordings (sessions that are automatically recorded once first publisher starts) in an ongoing session, now publishing a stream when no publishers are active in the session won't start automatically a new recording.
- Active sessions retrieval now returns sessions created with [REST API](https://openvidu.io/docs/reference-docs/REST-API/#get-apisessions){:target="_blank"} or server SDKs that have not received any client connection (before this fix they would not be returned until some user had connected to it)
- [Call Detail Record](https://openvidu.io/docs/reference-docs/openvidu-server-cdr/){:target="_blank"}: `recordingStopped` event for INDIVIDUAL recordings wasn't updating their duration and size values (both properties had value 0)
- *[streamPropertyChanged](https://openvidu.io/api/openvidu-browser/classes/streampropertychangedevent.html){:target="_blank"}* event was firing an exception in the browser for streams for which a user wasn't subscribed to.
- Avoid 500 error when sending no body on POST operations of the REST API, such as `POST /api/sessions`
- Minor bug fixes in openvidu-java-client.

<br>

#### OPENVIDU PRO

We are excited to announce OpenVidu Pro: a commercial tier for OpenVidu platform. Check it out **[here](https://openvidu.io/docs/openvidu-pro/){:target="_blank"}**.

<br>

---

## 2.8.0

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
    <td>2.8.0</td>
    <td><a class="" href="https://www.npmjs.com/package/openvidu-browser" target="_blank">NPM</a></td>
    <td rowspan="2" class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu client side. It is a library for the browser. It allows you to control your videos and sessions directly from your client's browsers" class="icon ion-information-circled"></i></td>
  </tr>
  <tr>
    <td>JS file</td>
    <td>2.8.0</td>
    <td><a class="" href="https://github.com/OpenVidu/openvidu/releases/tag/v2.8.0" target="_blank">GitHub</a></td>
  </tr>
  
  <tr>
    <td rowspan="3">openvidu-server</td>
    <td>JAR</td>
    <td>2.8.0</td>
    <td><a class="" href="https://github.com/OpenVidu/openvidu/releases/tag/v2.8.0" target="_blank">GitHub</a></td>
    <td rowspan="3" class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu server side. It receives the remote procedure calls from openvidu-browser and manage all the media streams operations. YOU DON'T HAVE TO MAKE DIRECT USE OF IT. Just to run it and know its IP address and password" class="icon ion-information-circled"></i></td>
  </tr>
  <tr>
    <td>Docker container</td>
    <td>2.8.0</td>
    <td><a class="" href="https://hub.docker.com/r/openvidu/openvidu-server/tags/" target="_blank">DockerHub</a></td>
  </tr>
    <tr>
    <td>Docker container (+KMS)</td>
    <td>2.8.0</td>
    <td><a class="" href="https://hub.docker.com/r/openvidu/openvidu-server-kms/tags/" target="_blank">DockerHub</a></td>
  </tr>
  
  <tr>
    <td>openvidu-java-client</td>
    <td>MVN package</td>
    <td>2.8.1</td>
    <td><a class="" href="https://search.maven.org/#artifactdetails%7Cio.openvidu%7Copenvidu-java-client%7C2.8.1%7Cjar" target="_blank">MVN Repository</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="SDK for your JAVA server. Simple alternative to the REST API" class="icon ion-information-circled"></i></td>
  </tr>
  
  <tr>
    <td>openvidu-node-client</td>
    <td>NPM package</td>
    <td>2.8.0</td>
    <td><a class="" href="https://www.npmjs.com/package/openvidu-node-client" target="_blank">NPM</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="SDK for your NODE server. Simple alternative to the REST API" class="icon ion-information-circled"></i></td>
  </tr>

  <tr>
    <td>openvidu-webcomponent</td>
    <td>ZIP</td>
    <td>2.8.0</td>
    <td><a class="" href="https://github.com/OpenVidu/openvidu/releases/tag/v2.8.0" target="_blank">GitHub</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu Web Component. Easier way to add OpenVidu video calls to your existing web application" class="icon ion-information-circled"></i></td>
  </tr>

  <tr>
    <td>openvidu-angular</td>
    <td>NPM package</td>
    <td>2.8.0</td>
    <td><a class="" href="https://www.npmjs.com/package/openvidu-angular" target="_blank">NPM</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu Angular. Easier way to add OpenVidu video calls to your existing Angular application" class="icon ion-information-circled"></i></td>
  </tr>

  <tr>
    <td>openvidu-react</td>
    <td>NPM package</td>
    <td>2.8.0</td>
    <td><a class="" href="https://www.npmjs.com/package/openvidu-react" target="_blank">NPM</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu React. Easier way to add OpenVidu video calls to your existing React application" class="icon ion-information-circled"></i></td>
  </tr>

  <tr>
    <td>Kurento Media Server</td>
    <td>Ubuntu package</td>
    <td>6.9.0</td>
    <td><a class="" href="https://doc-kurento.readthedocs.io/en/6.9.0/user/installation.html#local-installation" target="_blank">Kurento Docs</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="Core component in charge of the media transmissions" class="icon ion-information-circled"></i></td>
  </tr>

</table>

### Release Notes

#### NEW FEATURES

<br>
##### Individual stream recording

Finally individual stream recording is available in OpenVidu. When recording a session you can now configure it to store each published stream in its own file.

This, on the one hand, gives developers lots of freedom to compose any kind of layout and achieve any kind of result once the recording has stopped, by using some post-processing video tool. On the other hand, this type of recording has proven to be 4x more efficient in comparison with previous grid recording in our first tests, allowing a better quality and a higher number of streams per recording, and more simultaneous recordings.

We have entirely rewritten [Recording documentation](/advanced-features/recording/){:target="_blank"} explaining all these new features. Take a look at it!

<br>

##### Audio-only and video-only recording

Configure your recordings to be audio-only or video-only. This is available for both `COMPOSED` and `INDIVIDUAL` recordings. It is worth mentioning that audio-only `COMPOSED` recordings takes advantage of the new recording capabilities introduced in this release to make it an extremley efficient process. Check out the **[full documentation](/advanced-features/recording/#audio-only-and-video-only-recordings){:target="_blank"}** on this subject.

<br>

##### Other improvements

- New property `resolution` when starting recordings. With it you can set the width and height in pixels of the recorded file. This is only available for `COMPOSED` recordings. `INDIVIDUAL` recordings will always record the video files with the native resolution of each video stream
- Automatic stop of recordings is greatly improved. Check it out **[here](/advanced-features/recording/#automatic-stop-of-recordings){:target="_blank"}**
- New property **[Stream.creationTime](https://openvidu.io/api/openvidu-browser/classes/stream.html#creationtime){:target="_blank"}** in OpenVidu Browser. This is the time when a stream was created in OpenVidu Server. Reflects the real starting time of the media stream transmission on the server side.
- OpenVidu Server now destroys any stranded recording container left on the host on start up. This allows keeping the host machine clean when restarting the service
- New REST method available in OpenVidu Server: `GET /config`. You can consult OpenVidu Server version and all active configuration properties with it. Check it out **[here](/reference-docs/REST-API/#get-config){:target="_blank"}**.

<br>

#### BUG FIXES

- Fixed a problem that was causing unexpected websocket disconnections from OpenVidu Server due to HttpSessions expiring after half an hour. It has been fixed by adding real reconnection capailities to websockets established from clients. This also fixes a problem with recordings longer than 30 minutes sometimes failing. _Issue [#146](https://github.com/OpenVidu/openvidu/issues/146){:target="_blank"}_
- Recording layout improved: default BEST_FIT layout used in COMPOSED recordings was including small black bars in the upper and left margins of the layout, that were visible in the final video file. This is now fixed.
- openvidu-browser: property **[Connection.creationTime](https://openvidu.io/api/openvidu-browser/classes/connection.html#creationtime){:target="_blank"}** now has real value (brought from OpenVidu Server) instead of a local value. Now it reflects the real time some user connected to the Session. _Issue [#170](https://github.com/OpenVidu/openvidu/issues/170){:target="_blank"}_
- openvidu-call: now when setting a screen-share stream in full-screen mode, aspect ratio is preserved to avoid loss of information

<br>

#### BREAKING CHANGES

Even though this is not a major update with incompatibility changes according to _semver_, there are in fact a couple of changes that are worth mentioning:

- Recorded files folder structure has changed: each recording is stored now in its own folder, named after the unique recording id. This doesn't affect the recordings management through REST API, openvidu-java-client or openvidu-node-client. But if you were locally managing the recordings, then a new folder structure is expected now.
- openvidu-node-client: Recording properties `Recording.hasAudio`, `Recording.hasVideo` and  `Recording.name` have been included into new [Recording.properties](/../api/openvidu-node-client/classes/recording.html#properties){:target="_blank"} attribute: `Recording.properties.hasAudio`, `Recording.properties.hasVideo` and `Recording.properties.name`

<br>

---

<br>

## 2.7.0

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
    <td>2.7.0</td>
    <td><a class="" href="https://www.npmjs.com/package/openvidu-browser" target="_blank">NPM</a></td>
    <td rowspan="2" class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu client side. It is a library for the browser. It allows you to control your videos and sessions directly from your client's browsers" class="icon ion-information-circled"></i></td>
  </tr>
  <tr>
    <td>JS file</td>
    <td>2.7.0</td>
    <td><a class="" href="https://github.com/OpenVidu/openvidu/releases/tag/v2.7.0" target="_blank">GitHub</a></td>
  </tr>
  
  <tr>
    <td rowspan="3">openvidu-server</td>
    <td>JAR</td>
    <td>2.7.0</td>
    <td><a class="" href="https://github.com/OpenVidu/openvidu/releases/tag/v2.7.0" target="_blank">GitHub</a></td>
    <td rowspan="3" class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu server side. It receives the remote procedure calls from openvidu-browser and manage all the media streams operations. YOU DON'T HAVE TO MAKE DIRECT USE OF IT. Just to run it and know its IP address and password" class="icon ion-information-circled"></i></td>
  </tr>
  <tr>
    <td>Docker container</td>
    <td>2.7.0</td>
    <td><a class="" href="https://hub.docker.com/r/openvidu/openvidu-server/tags/" target="_blank">DockerHub</a></td>
  </tr>
    <tr>
    <td>Docker container (+KMS)</td>
    <td>2.7.0</td>
    <td><a class="" href="https://hub.docker.com/r/openvidu/openvidu-server-kms/tags/" target="_blank">DockerHub</a></td>
  </tr>
  
  <tr>
    <td>openvidu-java-client</td>
    <td>MVN package</td>
    <td>2.5.0</td>
    <td><a class="" href="https://search.maven.org/#artifactdetails%7Cio.openvidu%7Copenvidu-java-client%7C2.5.0%7Cjar" target="_blank">MVN Repository</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="SDK for your JAVA server. Simple alternative to the REST API" class="icon ion-information-circled"></i></td>
  </tr>
  
  <tr>
    <td>openvidu-node-client</td>
    <td>NPM package</td>
    <td>2.5.0</td>
    <td><a class="" href="https://www.npmjs.com/package/openvidu-node-client" target="_blank">NPM</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="SDK for your NODE server. Simple alternative to the REST API" class="icon ion-information-circled"></i></td>
  </tr>

  <tr>
    <td>openvidu-webcomponent</td>
    <td>ZIP</td>
    <td>2.7.0</td>
    <td><a class="" href="https://github.com/OpenVidu/openvidu/releases/tag/v2.7.0" target="_blank">GitHub</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu Web Component. Easier way to add OpenVidu video calls to your existing web application" class="icon ion-information-circled"></i></td>
  </tr>

  <tr>
    <td>openvidu-angular</td>
    <td>NPM package</td>
    <td>2.7.1</td>
    <td><a class="" href="https://www.npmjs.com/package/openvidu-angular" target="_blank">NPM</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu Angular. Easier way to add OpenVidu video calls to your existing Angular application" class="icon ion-information-circled"></i></td>
  </tr>

  <tr>
    <td>openvidu-react</td>
    <td>NPM package</td>
    <td>2.7.1</td>
    <td><a class="" href="https://www.npmjs.com/package/openvidu-react" target="_blank">NPM</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu React. Easier way to add OpenVidu video calls to your existing React application" class="icon ion-information-circled"></i></td>
  </tr>

  <tr>
    <td>Kurento Media Server</td>
    <td>Ubuntu package</td>
    <td>6.8.1</td>
    <td><a class="" href="https://doc-kurento.readthedocs.io/en/6.8.1/user/installation.html#local-installation" target="_blank">Kurento Docs</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="Core component in charge of the media transmissions" class="icon ion-information-circled"></i></td>
  </tr>

</table>

### Release Notes

#### NEW FEATURES

<br>
##### Safari support

OpenVidu finally brings Safari to its collection of supported platforms. Two things to take into account when developing a Safari compatible application:

- If there are gonna be other types of clients rather than Safari connecting to the same session, then transcoding will be necessary in OpenVidu Server. This will bring up CPU load significantly. This behavior is due to Safari not supporting any other codec than H264, when rest of platforms usually prefer VP8. Good news is this is a problem that will soon fix on its own: Safari will support VP8 in the near future (see [Release 68 Notes](https://webkit.org/blog/8475/release-notes-for-safari-technology-preview-68/){:target="_blank"})
- A little hack is needed in your app if your Safari users are gonna have `SUBSCRIBER` role (only receiving video, without accessing their microphone or camera). [Learn more here](/troubleshooting/#11-my-safari-users-with-role-subscriber-are-not-able-to-receive-any-remote-video){:target="_blank"}

<br>

##### Ionic support for iOS

Apple support is completed with Ionic platform for iOS. Now you can implement an Ionic app that will compile OK into an iOS native application. Our [openvidu-ionic](/tutorials/openvidu-ionic/){:target="_blank"} tutorial is now fully compatible with iPhones and iPads. We recommend to use it as a starting point for your Android/iOS application, but in openvidu-ionic tutorial you also have everything you need to integrate OpenVidu in any Ionic app. Take a look at it!

<br>

##### New event `streamAudioVolumeChange`

You can now listen to volume changes in any Publisher or Subscriber object. You can, for example, add a real-time audio wave or perform some action when certain level of noise or silence is reached. More details [here](/advanced-features/speech-detection/#audio-volume-detection){:target="_blank"}.

#### BUG FIXES

<br>

- Recording layout now internally hides cursor (no need of styling the layout with `cursor:none`). _Issue [#138](https://github.com/OpenVidu/openvidu/issues/138){:target="_blank"}_
- Recording stopping process reinforced to terminate and gracefully generate video files for failed recording containers (those that do not receive any video from the session caused by a misconfiguration or a wrong custom recording layout). This will help getting rid off dead containers and keeping OpenVidu Server clean. _Issue [#148](https://github.com/OpenVidu/openvidu/issues/148){:target="_blank"}_
- Mirroring local video fix: when changing to screen-share, local video is now un-mirrored, and viceversa. _Issue [#13](https://github.com/OpenVidu/openvidu-call/issues/13){:target="_blank"}_
- Sessions configured with `Recording.MANUAL` now automatically stop their recording if last participant left the session and no user published to the same session in 2 minutes. _Issue [#149](https://github.com/OpenVidu/openvidu/issues/149){:target="_blank"}_
- `Publisher.publishAudio` and `Publisher.publishVideo` may be called without having initialized a Session or having called `Session.publish(Publisher)`

<br>

---

<br>

## 2.6.0

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
    <td>2.6.0</td>
    <td><a class="" href="https://www.npmjs.com/package/openvidu-browser" target="_blank">NPM</a></td>
    <td rowspan="2" class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu client side. It is a library for the browser. It allows you to control your videos and sessions directly from your client's browsers" class="icon ion-information-circled"></i></td>
  </tr>
  <tr>
    <td>JS file</td>
    <td>2.6.0</td>
    <td><a class="" href="https://github.com/OpenVidu/openvidu/releases/tag/v2.6.0" target="_blank">GitHub</a></td>
  </tr>
  
  <tr>
    <td rowspan="3">openvidu-server</td>
    <td>JAR</td>
    <td>2.6.0</td>
    <td><a class="" href="https://github.com/OpenVidu/openvidu/releases/tag/v2.6.0" target="_blank">GitHub</a></td>
    <td rowspan="3" class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu server side. It receives the remote procedure calls from openvidu-browser and manage all the media streams operations. YOU DON'T HAVE TO MAKE DIRECT USE OF IT. Just to run it and know its IP address and password" class="icon ion-information-circled"></i></td>
  </tr>
  <tr>
    <td>Docker container</td>
    <td>2.6.0</td>
    <td><a class="" href="https://hub.docker.com/r/openvidu/openvidu-server/tags/" target="_blank">DockerHub</a></td>
  </tr>
    <tr>
    <td>Docker container (+KMS)</td>
    <td>2.6.0</td>
    <td><a class="" href="https://hub.docker.com/r/openvidu/openvidu-server-kms/tags/" target="_blank">DockerHub</a></td>
  </tr>
  
  <tr>
    <td>openvidu-java-client</td>
    <td>MVN package</td>
    <td>2.5.0</td>
    <td><a class="" href="https://search.maven.org/#artifactdetails%7Cio.openvidu%7Copenvidu-java-client%7C2.5.0%7Cjar" target="_blank">MVN Repository</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="SDK for your JAVA server. Simple alternative to the REST API" class="icon ion-information-circled"></i></td>
  </tr>
  
  <tr>
    <td>openvidu-node-client</td>
    <td>NPM package</td>
    <td>2.5.0</td>
    <td><a class="" href="https://www.npmjs.com/package/openvidu-node-client" target="_blank">NPM</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="SDK for your NODE server. Simple alternative to the REST API" class="icon ion-information-circled"></i></td>
  </tr>

  <tr>
    <td>openvidu-webcomponent</td>
    <td>ZIP</td>
    <td>2.6.0</td>
    <td><a class="" href="https://github.com/OpenVidu/openvidu/releases/tag/v2.6.0" target="_blank">GitHub</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu Web Component. Easier way to add OpenVidu video calls to your existing web application" class="icon ion-information-circled"></i></td>
  </tr>

  <tr>
    <td>openvidu-angular</td>
    <td>NPM package</td>
    <td>2.6.0</td>
    <td><a class="" href="https://www.npmjs.com/package/openvidu-angular" target="_blank">NPM</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu Angular. Easier way to add OpenVidu video calls to your existing Angular application" class="icon ion-information-circled"></i></td>
  </tr>

  <tr>
    <td>openvidu-react</td>
    <td>NPM package</td>
    <td>2.6.0</td>
    <td><a class="" href="https://www.npmjs.com/package/openvidu-react" target="_blank">NPM</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu React. Easier way to add OpenVidu video calls to your existing React application" class="icon ion-information-circled"></i></td>
  </tr>

  <tr>
    <td>Kurento Media Server</td>
    <td>Ubuntu package</td>
    <td>6.8.1</td>
    <td><a class="" href="https://doc-kurento.readthedocs.io/en/6.8.1/user/installation.html#local-installation" target="_blank">Kurento Docs</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="Core component in charge of the media transmissions" class="icon ion-information-circled"></i></td>
  </tr>

</table>

### Release Notes

#### NEW FEATURES

<br>
##### Ionic support

There's a [complete tutorial](/tutorials/openvidu-ionic/){:target="_blank"} in OpenVidu Docs to get a native Android app working with OpenVidu in just a few steps. You can just clone and use our sample application as a starting point or maybe you want to add OpenVidu to your existing Ionic app. [Here you have](/tutorials/openvidu-ionic/#android-specific-requirements){:target="_blank"} the necessary configuration steps to do so (basically Android permissions stuff).

We are currently working on making OpenVidu work on iOS with Ionic.

<br>
##### New types of filters supported

OpenVidu 2.5.0 brought a fantastic and a differentiating element: [real time audio and video filters](/advanced-features/filters/){:target="_blank"}. Now we have extended this capability to support new GStreamer based filters such as **textoverlay**, **timeoverlay** or **clockoverlay**.

You can embed any text, the timestamp of the video or the current time, easily customizing its position and format. Check these filters in [GStreamer section](/advanced-features/filters/#gstreamer-filters){:target="_blank"} of filters documentation.

<br>
##### Recording service now generates a thumbnail when stopping the recording

Whenever you stop the recording of a session, OpenVidu will automatically generate a thumbnail for the video, getting it from the middle of the video timeline. You can access it from `https://OPENVIDU_SERVER_IP:4443/recordings/RECORDING_NAME.jpg`

Do not worry about their lifecycle: they are linked to the video file itself. If you decide to delete the recording, thumbnail will also be deleted.

#### BUG FIXES

<br>
##### Important fix for increasing success rate in establishing media connections

Time ago we ran into a pretty ugly bug that was causing some problems during WebRTC negotiation, resulting in some clients located in complex networks (like a company's WiFi network) not being able to connect to OpenVidu Server. What developers perceived was that in certain scenarios some users simply couldn't receive or send any media connection.

This bug has been completely solved in OpenVidu 2.6.0. Now media connections will work fine in almost every client network configuration.

<br>

---

<br>

## 2.5.0

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
    <td>2.5.0</td>
    <td><a class="" href="https://www.npmjs.com/package/openvidu-browser" target="_blank">NPM</a></td>
    <td rowspan="2" class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu client side. It is a library for the browser. It allows you to control your videos and sessions directly from your client's browsers" class="icon ion-information-circled"></i></td>
  </tr>
  <tr>
    <td>JS file</td>
    <td>2.5.0</td>
    <td><a class="" href="https://github.com/OpenVidu/openvidu/releases/tag/v2.5.0" target="_blank">GitHub</a></td>
  </tr>
  
  <tr>
    <td rowspan="3">openvidu-server</td>
    <td>JAR</td>
    <td>2.5.0</td>
    <td><a class="" href="https://github.com/OpenVidu/openvidu/releases/tag/v2.5.0" target="_blank">GitHub</a></td>
    <td rowspan="3" class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu server side. It receives the remote procedure calls from openvidu-browser and manage all the media streams operations. YOU DON'T HAVE TO MAKE DIRECT USE OF IT. Just to run it and know its IP address and password" class="icon ion-information-circled"></i></td>
  </tr>
  <tr>
    <td>Docker container</td>
    <td>2.5.0</td>
    <td><a class="" href="https://hub.docker.com/r/openvidu/openvidu-server/tags/" target="_blank">DockerHub</a></td>
  </tr>
    <tr>
    <td>Docker container (+KMS)</td>
    <td>2.5.0</td>
    <td><a class="" href="https://hub.docker.com/r/openvidu/openvidu-server-kms/tags/" target="_blank">DockerHub</a></td>
  </tr>
  
  <tr>
    <td>openvidu-java-client</td>
    <td>MVN package</td>
    <td>2.5.0</td>
    <td><a class="" href="https://search.maven.org/#artifactdetails%7Cio.openvidu%7Copenvidu-java-client%7C2.5.0%7Cjar" target="_blank">MVN Repository</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="SDK for your JAVA server. Simple alternative to the REST API" class="icon ion-information-circled"></i></td>
  </tr>
  
  <tr>
    <td>openvidu-node-client</td>
    <td>NPM package</td>
    <td>2.5.0</td>
    <td><a class="" href="https://www.npmjs.com/package/openvidu-node-client" target="_blank">NPM</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="SDK for your NODE server. Simple alternative to the REST API" class="icon ion-information-circled"></i></td>
  </tr>

  <tr>
    <td>openvidu-webcomponent</td>
    <td>ZIP</td>
    <td>2.5.0</td>
    <td><a class="" href="https://github.com/OpenVidu/openvidu/releases/tag/v2.5.0" target="_blank">GitHub</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu Web Component. Easier way to add OpenVidu video calls to your existing web application" class="icon ion-information-circled"></i></td>
  </tr>

  <tr>
    <td>openvidu-angular</td>
    <td>NPM package</td>
    <td>2.5.0</td>
    <td><a class="" href="https://www.npmjs.com/package/openvidu-angular" target="_blank">NPM</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu Angular. Easier way to add OpenVidu video calls to your existing Angular application" class="icon ion-information-circled"></i></td>
  </tr>

  <tr>
    <td>openvidu-react</td>
    <td>NPM package</td>
    <td>2.5.0</td>
    <td><a class="" href="https://www.npmjs.com/package/openvidu-react" target="_blank">NPM</a></td>
    <td class="last-table-col"><i data-toggle="tooltip" data-placement="right" title="OpenVidu React. Easier way to add OpenVidu video calls to your existing React application" class="icon ion-information-circled"></i></td>
  </tr>

</table>

### Release Notes

#### NEW FEATURES

<br>
##### Kurento filters support

OpenVidu API offers a simple way of applying filters to video and audio streams in the server side by making use of Kurento Media Server capabilities. See [Voice and video filters](https://openvidu.io/docs/advanced-features/filters/){:target="_blank"} section to learn more.

<br>
##### Individual user configuration for maximum/minimum bandwidth

In version 2.3.0 we introduced [4 new configuration parameters for OpenVidu Server](#configure-global-bandwidth-for-your-webrtc-connections) that allow the limitation of the video bandwidth both sent and received to/from OpenVidu Server, affecting all video streams in a global manner. Now it is possible to specifically configure certain input and output bandwidth for every user connected to a session. This way you can customize the bandwidth for each Publisher and Subscriber object of each Connection object. Users with no specific configuration will use the global values.

You can set custom bandwidths by using **REST API**, **openvidu-java-client** or **openvidu-node-client**:

- **REST API**: in [POST /api/tokens](https://openvidu.io/docs/reference-docs/REST-API/#post-apitokens){:target="_blank"} append a property in the json body like this

        "kurentoOptions": {
          "videoMaxRecvBandwidth": 1000,
          "videoMinRecvBandwidth": 1000,
          "videoMaxSendBandwidth": 1000,
          "videoMinSendBandwidth": 1000
        }

- **openvidu-java-client**: build your tokens like this
  
        KurentoOptions kurentoOptions = new KurentoOptions.Builder()
          .videoMaxRecvBandwidth(1000)
          .videoMinRecvBandwidth(1000)
          .videoMaxSendBandwidth(1000)
          .videoMinSendBandwidth(1000)
          .build();
        TokenOptions tokenOptions = new TokenOptions.Builder()
          .data("User data")
          .role(OpenViduRole.PUBLISHER)
          .kurentoOptions(kurentoOptions)
          .build();
        String myToken = mySession.generateToken(tokenOptions);

- **openvidu-node-client**: build your tokens like this

        var tokenOptions = {
            data: "User data",
            role: OpenViduRole.PUBLISHER,
            kurentoOptions: {
              videoMaxRecvBandwidth: 1000,
              videoMinRecvBandwidth: 1000,
              videoMaxSendBandwidth: 1000,
              videoMinSendBandwidth: 1000
            }
        };
        mySession.generateToken(tokenOptions).then(token => { ... } );

<br>
##### REST API and Server SDKs improvements

- `Connection` objects have a brand new property very useful for session analysis: `platform`. It carries a complete description of the platform used by the client to connect to your session. For example: `"Chrome 69.0.3497.81 on OS X 10.13.6 64-bit"` or `"Firefox Mobile 62.0 on Mobile (Android 8.1.0)"`

    You can get this information by retrieving session information with the REST api (_[GET /api/sessions](https://openvidu.io/docs/reference-docs/REST-API/#get-apisessions){:target="_blank"}_ or _[GET /api/sessions/SESSION_ID](https://openvidu.io/docs/reference-docs/REST-API/#get-apisessionsltsession_idgt){:target="_blank"}_) or inspecting _openvidu-java-client_ and _openvidu-node-client_ Session objects: calling `Session.fetch()` or `OpenVidu.fetch()` will update the status of their `activeConnections` property. Then you can check it out in _openvidu-node-client_ (property _[`Session.activeConnections`](https://openvidu.io/api/openvidu-node-client/classes/session.html#activeconnections){:target="_blank"}_) or _openvidu-java-client_ (method _[`Session.getActiveConnections()`](https://openvidu.io/api/openvidu-java-client/){:target="_blank"}_)

- `Session`, `Connection` and `Publisher` objects now have `createdAt` property, indicating when these objects where initialized in OpenVidu Server. This property has been integrated to maintain consistency with OpenVidu Server Call Detail Record, which has already been storing it in previous versions (check `"timestamp"` property of every [CDR entry](https://openvidu.io/docs/reference-docs/openvidu-server-cdr){:target="_blank"}).

<br>
##### OpenVidu Browser improvements

- New method `OpenVidu.checkScreenSharingCapabilities()`. It allows developers to know if the client platform supports screen sharing (see its declaration in [OpenVidu Documentation](https://openvidu.io//api/openvidu-browser/classes/openvidu.html#checkscreensharingcapabilities){:target="_blank"})

<br>
##### New OpenVidu Angular and OpenVidu React libraries

We introduced OpenVidu Web Component in release [2.3.0](#230). Now we offer native libraries for both Angular and React (latest versions) to insert the same powerful component in your applications by making use of each framework capabilities. You can check a tutorial for OpenVidu Angular ([openvidu-library-angular](https://openvidu.io/docs/tutorials/openvidu-library-angular/){:target="_blank"}) and  for OpenVidu React ([openvidu-library-react](https://openvidu.io/docs/tutorials/openvidu-library-react/){:target="_blank"}) right now.

Of course you can keep using OpenVidu Browser library instead of these components in any frontend framework. These tutorials show a basic use of OpenVidu Browser in an Angular app ([openvidu-insecure-angular](https://openvidu.io/docs/tutorials/openvidu-insecure-angular/){:target="_blank"}) and in a React app ([openvidu-insecure-react](https://openvidu.io/docs/tutorials/openvidu-insecure-react/){:target="_blank"}).

#### BUG FIXES

- Local tracks now are not stopped on stream disposal if property _[`PublisherProperties.videoSource`](https://openvidu.io/api/openvidu-browser/interfaces/publisherproperties.html#videosource){:target="_blank"}_ was of type MediaStreamTrack (custom stream got with _[`OpenVidu.getUserMedia()`](https://openvidu.io/api/openvidu-browser/classes/openvidu.html#getusermedia){:target="_blank"}_). _Issue [#107](https://github.com/OpenVidu/openvidu/issues/107){:target="_blank"}, PR [#108](https://github.com/OpenVidu/openvidu/pull/108){:target="_blank"}_
- Deprecated `RTCPeerConnection.getRemoteStreams` and `RTCPeerConnection.getLocalStreams` to `RTCPeerConnection.getReceivers` and `RTCPeerConnection.getSenders`. _Issue [#54](https://github.com/OpenVidu/openvidu/issues/54){:target="_blank"}_
- Allow full screen sharing in Firefox. _Issue [#103](https://github.com/OpenVidu/openvidu/issues/103){:target="_blank"}, PR [#105](https://github.com/OpenVidu/openvidu/pull/105){:target="_blank"}_
- Fixed duplicated camera permissions in Firefox if `PublisherProperties.videoSource/audioSource` are provided as MediaStreamTracks. _PR [#109](https://github.com/OpenVidu/openvidu/pull/109){:target="_blank"}_
- openvidu-node-client now rejects with Error object upon OpenVidu Server unreachable. _Issue [#116](https://github.com/OpenVidu/openvidu/issues/116){:target="_blank"}, PR [#117](https://github.com/OpenVidu/openvidu/pull/117){:target="_blank"}_

<br>

---

<br>

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

You can call methods `Session.fetch()` and `OpenVidu.fetch()` to bring the current status of sessions from OpenVidu Server. You can consult now directly from _OpenVidu Java Client_ / _OpenVidu Node Client_ all the active sessions with [`OpenVidu.getActiveSessions()`](https://openvidu.io/api/openvidu-java-client/){:target="_blank"} / [`OpenVidu.activeSessions`](https://openvidu.io/api/openvidu-node-client/classes/openvidu.html#activesessions){:target="_blank"} and the active connections of a session with [`Session.getActiveConnections()`](https://openvidu.io/api/openvidu-java-client/){:target="_blank"} / [`Session.activeConnections`](https://openvidu.io/api/openvidu-node-client/classes/session.html#activeconnections){:target="_blank"}.

<br>
##### OpenVidu CDR extended

Event `recordingStopped` event now has `reason` property. Can be: 

- `"recordingStoppedByServer"`: the recording was stopped by the application (using REST API, OpenVidu Java Client or OpenVidu Node Client)
- `"lastParticipantLeft"`: if the Session was configured for automatic recording (`RecordingMode.ALWAYS`, check [OpenVidu Node Client](https://openvidu.io/api/openvidu-node-client/enums/recordingmode.html){:target="_blank"} docs for more info), then it stopped because the last participant left the session
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

<br>

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
medium
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

> To see some images of OpenVidu Web Component in action, check this post on [Medium](https://medium.com/@openvidu/openvidu-2-3-0-web-component-and-tons-of-new-features-3341d46cbb54){:target="_blank"}. If you want to learn more about OpenVidu Web Component, visit [Tutorials section](/tutorials/openvidu-webcomponent){:target="_blank"}

<br>
#### NEW FEATURES

<br>
##### StreamPropertyChangedEvent (See [here](https://openvidu.io/api/openvidu-browser/classes/streampropertychangedevent.html){:target="_blank"})

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
##### Session.capabilities (See [here](https://openvidu.io/api/openvidu-browser/interfaces/capabilities.html){:target="_blank"})

You can check capabilities property of Session object to know which methods are able to invoke each one of your clients, depending on their role. Also, if a client tries to call a method for which he has no permissions, now an OpenViduError is thrown with property `name` being [`OPENVIDU_PERMISSION_DENIED`](https://openvidu.io/api/openvidu-browser/enums/openviduerrorname.html#openvidu_permission_denied){:target="_blank"}.

<br>
##### New MODERATOR role

At last developers have available the new role that has been in our roadmap for a long time. Users connecting to a session with a token configured with MODERATOR role can call every method granted for SUBSCRIBER and PUBLISHER roles, but also:

- [`Session.forceDisconnect`](https://openvidu.io/api/openvidu-browser/classes/session.html#forcedisconnect){:target="_blank"}: you can evict any user from the Session (force the method `Session.disconnect`)
- [`Session.forceUnpublish`](https://openvidu.io/api/openvidu-browser/classes/session.html#forceunpublish){:target="_blank"}: you can stop the Publisher of any user publishing in the Session (force the method `Session.unpublish`)

<br>
##### REST API extended

5 new methods join the [REST API of OpenVidu Server](https://openvidu.io/docs/reference-docs/REST-API/){:target="_blank"}:

- Retrieve active session info: [**GET /api/sessions/&lt;SESSION_ID&gt;**](https://openvidu.io/docs/reference-docs/REST-API//#get-apisessionsltsession_idgt){:target="_blank"}
- Retrieve all active sessions info: [**GET /api/sessions**](https://openvidu.io/docs/reference-docs/REST-API/#get-apisessions){:target="_blank"}
- Close a session: [**DELETE /api/sessions/&lt;SESSION_ID&gt;**](https://openvidu.io/docs/reference-docs/REST-API/#delete-apisessionsltsession_idgt){:target="_blank"}
- Force the disconnection of a user from a session: [**DELETE /api/sessions/&lt;SESSION_ID&gt;/connection/&lt;CONNECTION_ID&gt;**](https://openvidu.io/docs/reference-docs/REST-API/#delete-apisessionsltsession_idgtconnectionltconnection_idgt){:target="_blank"}
- Force the unpublishing of a user's stream from a session: [**DELETE /api/sessions/&lt;SESSION_ID&gt;/stream/&lt;STREAM_ID&gt;**](https://openvidu.io/docs/reference-docs/REST-API/#delete-apisessionsltsession_idgtstreamltstream_idgt){:target="_blank"}

> Future iterations will add this capabilities to [openvidu-java-client](https://openvidu.io/docs/reference-docs/openvidu-java-client/){:target="_blank"} and [openvidu-node-client](https://openvidu.io/docs/reference-docs/openvidu-node-client/){:target="_blank"} libraries

<br>
##### Configure global bandwidth for your WebRTC connections

We have included a first way to set the maximum and minimum bandwidths for the media connections established between browsers and OpenVidu Server. You can configure it with the following system properties, as stated in [OpenVidu Server configuration](https://openvidu.io/docs/reference-docs/openvidu-server-params/){:target="_blank"} sections:

- `openvidu.streams.video.max-recv-bandwidth`: Maximum video bandwidth sent from clients to OpenVidu Server, in kbps. 0 means unconstrained	(default 1000)
- `openvidu.streams.video.min-recv-bandwidth`: Minimum video bandwidth sent from clients to OpenVidu Server, in kbps. 0 means unconstrained	(default 300)
- `openvidu.streams.video.max-send-bandwidth`: Maximum video bandwidth sent from OpenVidu Server to clients, in kbps. 0 means unconstrained	(default 1000)
- `openvidu.streams.video.min-send-bandwidth`: Minimum video bandwidth sent from OpenVidu Server to clients, in kbps. 0 means unconstrained	(default 300)

> Future iterations will study the possibility of configuring this same parameters for each session individually or even for each incoming or outgoing WebRTC connection (maybe as part of [`PublisherProperties`](https://openvidu.io/api/openvidu-browser/interfaces/publisherproperties.html){:target="_blank"} or [`SubscriberProperties`](https://openvidu.io/api/openvidu-browser/interfaces/subscriberproperties.html){:target="_blank"})

<br>

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

OpenVidu now offers **integrated and automated support for TURN server**. We encourage developers to check out our **[post on Medium](https://medium.com/@openvidu/openvidu-2-2-0-turn-made-easy-9d7e145f8905){:target="_blank"}** to learn more about it.

The platform now integrates by default a COTURN server as part of its ecosystem. This means that media connections will work OK even when clients are located on restricted networks. When [deploying OpenVidu Server in Amazon Web Services](https://openvidu.io/docs/deployment/deploying-aws/){:target="_blank"} with our Cloud Formation template no changes are required at all. If you are deploying OpenVidu Server on your own in an Ubuntu machine, installation instructions have changed a little bit. You have them properly updated [here](https://openvidu.io/docs/deployment/deploying-ubuntu/){:target="_blank"}.

<br>

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

Now Publisher and Subscriber objects both inherit from [StreamManager](../../api/openvidu-browser/classes/streammanager.html){:target="_blank"}, which provides 2 different methods to tell OpenVidu what DOM video players should display each specific stream (`addVideoElement` and `createVideoElement`). This allows us to let OpenVidu take control of the video elements (even if our framework dynamically creates them) and do not worry about its internals. This is all explained in detail in [Manage video players](/cheatsheet/manage-videos){:target="_blank"} section.

If you want to check out a real example of this behavior, explore our renovated [OpenVidu Angular tutorial](/tutorials/openvidu-insecure-angular/){:target="_blank"}.<br><br>

<br>

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
    - `OpenVidu.initPublisher()`: now expects properties as interface [PublisherProperties](../../api/openvidu-browser/interfaces/publisherproperties.html){:target="_blank"}. They include:

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

    - `Session.subscribe()`: now expects properties as interface [SubscriberProperties](../../api/openvidu-browser/interfaces/subscriberproperties.html){:target="_blank"}. They include:

            {
                insertMode: 'APPEND',	// How the video will be inserted in the target element
                subscribeToAudio: true, // Whether to initially subscribe to the stream's audio track or not
                subscribeToVideo: true  // Whether to initially subscribe to the stream's video track or not
            }

    - `OpenVidu.getDevices()`: now you can use certain video or audio input device when calling `OpenVidu.initPublisher()`, thanks to properties `audioSource` or `videoSource` of `PublisherProperties` object. Just set these variables to the property `deviceId` of any of the devices returned by this method.
    - `OpenVidu.getUserMedia()`: method improved. Now devs can customize a MediaStream object before calling `OpenVidu.initPublisher()` method, setting property `audioSource` or `videoSource` to a MediaStreamTrack object (see [docs](../../api/openvidu-browser/classes/openvidu.html#getusermedia){:target="_blank"} for further information)<br><br>

- **OpenVidu Browser new properties**

    - `Stream.frameRate`: new property defining the frame rate of video streams. This property will only have value if the Publisher owning the stream has set property `frameRate` of `PublisherProperties` when calling `OpenVidu.initPublisher()`<br><br>

- **OpenVidu Browser events**

    - New events `accessDialogOpened` and `accessDialogClosed`: dispatched by Publisher objects when the browser asks the user to grant permissions to camera or michrophone by opening a pop-up. You can use them to warn your users about it.
    - New events `recordingStarted` and `recordingStopped`: dispatched by Session object when the recording of a Session starts and stops. You can customize which clients will receive this event thanks to new property `openvidu.recording.notification` (see [OpenVidu Server configuration](/reference-docs/openvidu-server-params/){:target="_blank"})
    - Events `publisherStartSpeaking` and `publisherStopSpeaking` improved: more customizable thanks to [OpenVidu.setAdvancedConfiguration()](../../api/openvidu-browser/classes/openvidu.html#setadvancedconfiguration){:target="_blank"} and better overall performance.
    - Events `streamDestroyed`, `connectionDestroyed` and `sessionDisconnected` have new property `reason`. This gives more information about why the events have been dispatched so you can take specific actions depending on the context: maybe a stream has been destroyed because the user publishing has deliberately diposed it or maybe the network connection has unexpectedly closed (see docs for [StreamEvent](../../api/openvidu-browser/classes/streamevent.html){:target="_blank"}, [ConnectionEvent](../../api/openvidu-browser/classes/connectionevent.html){:target="_blank"} and [SessionDisconnectedEvent](../../api/openvidu-browser/classes/sessiondisconnectedevent.html){:target="_blank"})<br><br>

- **Other improvements in OpenVidu Browser**

    - Support for [custom screen sharing extensions for Chrome](/advanced-features/screen-share/#custom-screen-sharing-extension-for-chrome){:target="_blank"}
    - Support for custom STUN and TURN servers in openvidu-browser. Use [OpenVidu.setAdvancedConfiguration()](../../api/openvidu-browser/classes/openvidu.html#setadvancedconfiguration){:target="_blank"}
    - Library size decreased in almost 30% (_openvidu-browser.min.js_ from 300 KB to 216 KB)<br><br>

- **OpenVidu Server new features**
    - New property `name` for recordings: you can now specify which name should OpenVidu Server give to each one of your recording files. You can do it by using the **REST API** (by setting [body parameter "name" in POST /api/recordings/start](/reference-docs/REST-API/#post-apirecordingsstart){:target="_blank"}), **openvidu-java-client** (by using [RecordingProperties.Builder.name()](../../api/openvidu-java-client/io/openvidu/java/client/RecordingProperties.Builder.html){:target="_blank"}) or **openvidu-node-client** (by setting property [RecordingProperties.name](../../api/openvidu-node-client/interfaces/recordingproperties.html#name){:target="_blank"})
    - Now support for initializing sessions with a custom `sessionId`. You can take advantage of this new property to facilitate the mapping between OpenVidu Server 'session' entities and your own 'session' entities. You can set it by using the **REST API** (by setting [body parameter "customSessionId" in POST /api/sessions](/reference-docs/REST-API/#post-apisessions){:target="_blank"}), **openvidu-java-client** (by using [SessionProperties.Builder.customSessionId()](../../api/openvidu-java-client/io/openvidu/java/client/SessionProperties.Builder.html){:target="_blank"}) or **openvidu-node-client** (by setting property [SessionProperties.customSessionId](../../api/openvidu-node-client/interfaces/sessionproperties.html#customsessionid){:target="_blank"})
    - Call Detail Record extended: new events `recordingStarted` and `recordingStopped`, property `reason` for events `sessionDestroyed`, `participantLeft` and `webrtcConnectionDestroyed`.

#### BUG FIXES

- Now when any participant unexpectedly disconnects from a session (for example, due to a network failure), `connectionDestroyed` event is sent to the rest of participants with property `reason` set to `networkDisconnect`.
- When OpenVidu Server is stopped, it will try to gracefully finish every in progress session and recording. This way no recording file will end corrupted upon OpenVidu Server termination (this cannot be granted if the process crashes or is forcibly terminated)
- Now both STUN and TURN [OpenVidu Server configuration parameters](/reference-docs/openvidu-server-params/#extra-configuration-parameters-for-openVidu-server-docker-container){:target="_blank"} can be set up at the same time with no overwritings.
- Tons of small fixes and code refactoring that makes OpenVidu more stable and easy to test and develop

#### BREAKING CHANGES

- **OpenVidu Browser**
    - [`OpenVidu.initSession`](../../api/openvidu-browser/classes/openvidu.html#initsession){:target="_blank"} now doesn't receive any input parameter.
    - [`OpenVidu.initPublisher`](../../api/openvidu-browser/classes/openvidu.html#initpublisher){:target="_blank"} input parameters have changed. Now `properties` parameter must match [PublisherProperties](../..//api/openvidu-browser/interfaces/publisherproperties.html){:target="_blank"} interface.
    - [`Session.connect`](../../api/openvidu-browser/classes/session.html#connect){:target="_blank"} method has been promisified. Change the last mandatory `callback` parameter for a Promise implementation: `session.connect(token, (error) => { ... })` to `session.connect(token).then(() => {...}).catch(error => {...});` <br><br>

- **OpenVidu Java Client**
    - All `Archive` entities are now called `Recording`. This includes: class `Archive` to `Recording`, class `ArchiveMode` to `RecordingMode`, class `ArchiveLayout` to `RecordingLayout`, method `SessionProperties.archiveLayout()` to `SessionProperties.recordingLayout()`, method `SessionProperties.archiveMode()` to `SessionProperties.recordingMode()`, method `SessionProperties.Builder.archiveLayout()` to `SessionProperties.Builder.recordingLayout()`, method `SessionProperties.Builder.archiveMode()` to `SessionProperties.Builder.recordingMode()`
    - `RecordingLayout` property in [`SessionProperties.Builder`](../../api/openvidu-java-client/io/openvidu/java/client/SessionProperties.Builder.html){:target="_blank"} is now configured calling method `defaultRecordingLayout()` instead of `recordingLayout()`. This means that if one Session is gonna be recorded more than once, each recording layout may be customize with `RecordingProperties.Builder.recordingLayout()`, which will overwrite the default one globally configured in SessionProperties object. <br><br>

- **OpenVidu Node Client**
    - We have removed the builder pattern in all openvidu-node-client classes. Now objects are used instead, which includes classes `TokenOptions`, `SessionProperties` and `RecordingProperties`. For example, instead of getting a TokenOptions object like this: `var tokenOptions = new TokenOptions.Builder().data(serverData).role(role).build()` now it must be like this: `var tokenOptions = {data: serverData, role: role}`
    - There has been a simple change in certain asynchronous call. Method `Session.getSessionId()` is now synchronous, but method `OpenVidu.createSession()` is now asynchronous (the reason is pretty simple: now method _createSession_ implements the behavior that _getSessionId_ was providing the first time it was called for certain _Session_ object).
    - All callback methods have been promisified. This includes method `Session.generateToken(tokenOptions?, callback): void` (now  `Session.generateToken(tokenOptions?): Promise<string>`) and method `Session.getSessionId(callback): void` (now `OpenVidu.createSession(): Promise<Session>`, take also into account that the async call has changed from one method to the other as stated in the previous point).
    - All `Archive` entities are now called `Recording`. This includes: object `Archive` to `Recording`, object `ArchiveMode` to `RecordingMode`, object `ArchiveLayout` to `RecordingLayout`, method `SessionProperties.archiveLayout()` to `SessionProperties.recordingLayout()`, method `SessionProperties.archiveMode()` to `SessionProperties.recordingMode()`, method `SessionProperties.Builder.archiveLayout()` to `SessionProperties.Builder.recordingLayout()`, method `SessionProperties.Builder.archiveMode()` to `SessionProperties.Builder.recordingMode()`
    - `recordingLayout` property in [`SessionProperties`](../../api/openvidu-node-client/interfaces/sessionproperties.html){:target="_blank"} has changed to `defaultRecordingLayout`. This means that if one Session is gonna be recorded more than once, each recording layout may be customize with `recordingLayout` property (of [RecordingProperties](../../api/openvidu-node-client/interfaces/recordingproperties.html){:target="_blank"} interface, which will overwrite the default one globally configured in SessionProperties object. <br><br>

- **REST API**
    - All `Archive` entities are now called `Recording` in API REST. For example: `{"archiveMode": "ARCHIVE_MODE", "archiveLayout": "ARCHIVE_LAYOUT", "mediaMode": "MEDIA_MODE"}` now is `{"recordingMode": "RECORDING_MODE", "recordingLayout": "RECORDING_LAYOUT", "mediaMode": "MEDIA_MODE"}`.
    - Field `recordingLayout` is now called `defaultRecordingLayout` in operation [POST /api/sessions](https://openvidu.io/docs/reference-docs/REST-API/#post-apisessions){:target="_blank"}. This means that if one Session is gonna be recorded more than once, each recording layout may be customize adding a new field `recordingLayout` in the call to [POST /api/recordings/start](https://openvidu.io/docs/reference-docs/REST-API/#post-apirecordingsstart){:target="_blank"} of the API REST, which will overwrite the default one globally configured during [POST /api/sessions](https://openvidu.io/docs/reference-docs/REST-API/#post-apisessions){:target="_blank"} <br><br>

- **Other breaking changes**
    - OpenVidu Server default port from `8443` to `4443`
    - OpenVidu Server configuration property `openvidu.recording.free-access` is now `openvidu.recording.public-access`

<br>

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
    - **[openvidu/openvidu-server-kms:1.9.0-beta-1](https://hub.docker.com/r/openvidu/openvidu-server-kms/tags/){:target="_blank"}** Docker image already incorporates KMS 6.7.0
    - **[openvidu/openvidu-server:1.9.0-beta-1](https://hub.docker.com/r/openvidu/openvidu-server/tags/){:target="_blank"}** Docker image and **[openvidu-server-1.9.0-beta-1.jar](https://github.com/OpenVidu/openvidu/releases/tag/v1.9.0-beta-1){:target="_blank"}** need KMS 6.7.0. To install it, first be sure to completely uninstall and clean any previous version of KMS and then:
        
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

