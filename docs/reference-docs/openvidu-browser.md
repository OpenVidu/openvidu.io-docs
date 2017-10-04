<h2 id="section-title">openvidu-browser API</h2>
<hr>

> NOTE: all input parameters ("Parameters" columns) are listed in strict order, optional ones in _italics_

| Class      | Description   										     |
| ---------- | ---------------------------------------------------------- |
| [OpenVidu](#openvidu) | Use it to initialize your sessions and publishers |
| [Session](#session)  | Represents a video call. It can also be seen as a room where multiple users can connect. Participants who publish their videos to a session will be seen by the rest of users connected to that specific session  |
| [Publisher](#publisher)  | Packs local media streams. Users can publish it to a session |
| [Subscriber](#subscriber) | Packs remote media streams. Users automatically receive them when others publish their streams|
| [Stream](#stream) | Represents each one of the videos send and receive by a user in a session. Therefore each Publisher and Subscriber has an attribute of type Stream |
| [Connection](#connection) | Represents each one of the user's connection to the session (the local one and other user's connections). Therefore each Session and Stream object has an attribute of type Connection |
| [OpenViduError](#openviduerror)  | Simple object to identify errors on runtime |
| [OpenViduErrorName](#openviduerrorname)  | OpenViduError names enum |

#### **OpenVidu**
| Method           | Returns | Parameters | Description |
| ---------------- | ------- | ------------------------------------------- | ----------- |
| _`constructor`_    | [OpenVidu](#OpenVidu) |  | Returns a new OpenVidu object. This is the entry point to OpenVidu in the browser |
| `initSession`    | [Session](#session) | _`apikey:string`_<br/>`sessionId:string` | Returns a session with id **sessionId** |
| `initPublisher`  | [Publisher](#publisher) | `parentId:string`<br/>_`cameraOptions:any`_<br/>_`callback:function`_ | Starts local video stream, appending it to **parentId** HTML element, with the specific **cameraOptions** settings and executing **callback** function in the end. _cameraOptions_ is an object with the following (optional) properties:<br/><br/>**var cameraOptions = {</br><span style="padding-left: 20px">audio: boolean,</span></br><span style="padding-left: 20px">video: boolean,</span></br><span style="padding-left: 20px">audioActive: boolean,</span></br><span style="padding-left: 20px">videoActive: boolean,</span></br><span style="padding-left: 20px">quality: string,</span></br><span style="padding-left: 20px">screen: boolean</span><br/>}**<br/><br/><ul style="padding-left: 20px"><li>**audio**: whether to transmit audio or not</li><li>**video**: whether to transmit video or not</li><li>**audioActive**: whether to join the session with the audio unmuted or muted. Only makes sense if property _audio_ is set to true. You can change audio state later during the session with _Publisher.publishAudio(true)_</li><li>**videoActive**: whether to join the session with the video enabled or disabled. Only makes sense if property _video_ is set to true. You can change video state later during the session with _Publisher.publishVideo(true)_</li><li>**quality**: quality of the video ("LOW", "MEDIUM", "HIGH")</li><li>**screen**: whether to use screen capturing as the video source instead of a camera or not</li></ul> |
| `checkSystemRequirements`  | number |  | Returns 1 if the browser supports WebRTC, 0 otherwise |
| `getDevices` | Promise | `callback(error, deviceInfo):function` | Collects information about the media input and output devices available on the system, returned in **deviceInfo** array |
| `enableProdMode`  |  |  | Disable all logging except error level |

#### **Session**
| Method           | Returns | Parameters | Description |
| ---------------- | ------- | ------------------------------------------- | ----------- |
| `connect`    |  | `token:string`<br/>_`metadata:any`_<br/>`callback(error):function` | Connects to the session using **token** and executes **callback** in the end (_error_ parameter null if success). **metadata** parameter allows you to pass extra data to share with other users when they receive _streamCreated_ event. You can also add metadata through openvidu-backend-client when generating tokens (see [TokenOptions](/reference-docs/openvidu-java-client/#tokenoptions)). The structure of this string is up to you (maybe some standarized format as JSON or XML is a good idea), the only restriction is a maximum length of 1000 chars |
| `disconnect`  |  | | Leaves the session, destroying all streams and deleting the user as a participant |
| `publish`  | | `publisher:Publisher` | Publishes the specific user's local stream contained in **publisher** object to the session |
| `unpublish` | | `publisher:Publisher` | Unpublishes the specific user's local stream contained in **publisher** object |
| `on` | | `eventName:string`<br/>`callback:function` | **callback** function will be triggered each time **eventName** event is recieved |
| `once` | | `eventName:string`<br/>`callback:function` | **callback** function will be triggered once when **eventName** event is recieved. The listener is removed immediately |
| `off` | | `eventName:string`<br/>`eventHandler:any` | Removes **eventHandler** handler for **eventName** event |
| `subscribe` | [Subscriber](#subscriber) | `stream:Stream`<br/>`htmlId:string`<br/>_`videoOptions:any`_ | Subscribes to **stream**, appending a new HTML Video element to DOM element of **htmlId** id, with **videoOptions** settings. This method is usually called in the callback of _streamCreated_ event |
| `unsubscribe` | | `subscriber:Subscriber` | Unsubscribes from **subscriber**, automatically removing its HTML Video element |

| Property    | Type   | Description                  |
| ------------| ------ | ---------------------------- |
| `sessionId` | string | The unique id of the session |


| Event                  | Properties            | Description                  |
| -----------------------| --------------------- | ---------------------------- |
| `streamCreated`        | stream:[Stream](#stream)         | Triggered by Session object when a new Stream (published by other client) has been created and added to it |
| `streamDestroyed`      | stream:[Stream](#stream)<br/>preventDefault():Function | Triggered by Session object when an existing Stream (published by other client) has been destroyed. The default behaviour is the deletion of the HTML video element associated to it. To prevent it, call `preventDefault()` method on the event object  |
| `connectionCreated`    | connection:[Connection](#connection) | Triggered by Session object whenever any client has joined the session. This includes dispatching one event for each client that joins the session when you are already connected to it, one for each existing participant the first time you connect to the session and once for your own local connection |
| `connectionDestroyed`  | connection:[Connection](#connection) | Triggered by Session object whenever a client (other than your own) leaves the session. This event can also mean that `streamDestroyed` events could be dispatched, depending on the streams associated to it  |
| `sessionDisconnected`  | preventDefault():Function | Triggered by Session object when the client disconnects from the Session. Default behaviour is the deletion of all HTML video elements. Call `preventDefault()` on event object to prevent it and delete them by yourself |

#### **Publisher**
| Method         | Returns | Parameters | Description |
| -------------- | ------- | ------------------------------------------- | ----------- |
| `publishAudio` |  | `value:boolean`| Enable or disable the audio track depending on whether value is _true_ or _false_ |
| `publishVideo` |  | `value:boolean`| Enable or disable the video track depending on whether value is _true_ or _false_ |
| `destroy`      | [Publisher](#publihser) || Delets the publisher object and removes it from DOM. The rest of users will trigger a _streamDestroyed_ event |
| `subscribeToRemote` | | | Local video will be replaced by your remote video (same stream as other clients will receive from you) |
| `on` | | `eventName:string`<br/>`callback:function` | **callback** function will be triggered each time **eventName** event is recieved |

| Property    | Type   | Description                  |
| ------------| ------ | ---------------------------- |
| `accessAllowed` | boolean | _true_ if the user has granted access to the camera, _false_ otherwise |
| `element` | Element | The parent HTML Element which contains the publisher |
| `id` | string | The id of the HTML Video element of the publisher |
| `stream` | [Stream](#stream) | The stream object of the publisher |
| `session` | [Session](#session) | The session to which the publisher belongs |

| Event                  | Properties            | Description                  |
| -----------------------| --------------------- | ---------------------------- |
| `accessAllowed`        |          | Triggered by Publisher object when the user has granted access to the camera/microphone |
| `accessDenied`         |          | Triggered by Publisher object when the user has rejected access to the camera/microphone |
| `videoElementCreated`  | element:HTMLVideoElement | Triggered by Publisher object inmediately after a new video element has been added to DOM |
| `videoPlaying`         | element:HTMLVideoElement | Triggered by Subscriber object when the video (same as `videoElementCreated`) starts playing. Only triggered for those Publisher objects which have NOT called their method _subscribeToRemote_ |
| `remoteVideoPlaying`   | element:HTMLVideoElement | Triggered by Publisher object when your looped remote video starts playing. Only triggered for those Publisher objects which have called their method _subscribeToRemote_|

#### **Subscriber**
| Method         | Returns | Parameters | Description |
| -------------- | ------- | ------------------------------------------- | ----------- |
| | | | |


| Property    | Type   | Description                  |
| ------------| ------ | ---------------------------- |
| `element` | Element | The parent HTML Element which contains the subscriber |
| `id` | string | The id of the HTML Video element of the subscriber |
| `stream` | [Stream](#stream) | The stream object of the subscriber |

| Event                  | Properties            | Description                  |
| -----------------------| --------------------- | ---------------------------- |
| `videoElementCreated`  | element:HTMLVideoElement | Triggered by Subscriber object inmediately after a new video element has been added to DOM |
| `videoPlaying`         | element:HTMLVideoElement | Triggered by Subscriber object when the video (same as `videoElementCreated`) starts playing |

#### **Stream**
| Property    | Type   | Description                  |
| ------------| ------ | ---------------------------- |
| `connection` | [Connection](#connection) | The Connection object to which the Stream belongs |

#### **Connection**
| Property    | Type   | Description                  |
| ------------| ------ | ---------------------------- |
| `connectionId` | string | Unique identifier of the connection |
| `data` | string | Data associated to this connection (and therefore to certain user). This is an important field: it allows you to broadcast all the information you want for each user (a username, for example)  |
| `creationTime` | number | Time when this connection was created |

#### **OpenViduError**
| Method           | Returns | Parameters | Description |
| ---------------- | ------- | ------------------------------------------- | ----------- |
| _`constructor`_    | [OpenViduError](#openviduerror) | _`name:OpenViduErrorName`_<br/>`message:string` | Returns a new OpenViduError object |

| Property     | Type   | Description                  |
| ------------ | ------ | ---------------------------- |
| `name` | [OpenViduErrorName](#openviduerrorname) | The name and unique identifier of the error |
| `message` | string | Further information about the error |

#### **OpenViduErrorName**
 _(enum)_

| Constant     ||
| ------------ |-|
| `CAMERA_ACCESS_DENIED` ||
| `MICROPHONE_ACCESS_DENIED` ||
| `SCREEN_CAPTURE_DENIED` ||
| `NO_VIDEO_DEVICE` ||
| `NO_INPUT_DEVICE` ||
| `SCREEN_EXTENSION_NOT_INSTALLED` ||
| `GENERIC_ERROR` ||

