<h2 id="section-title">openvidu-browser API</h2>
<hr>

> NOTE: all input parameters ("Parameters" columns) are listed in strict order, optional ones in _italics_

| Class      | Description   										     |
| ---------- | ---------------------------------------------------------- |
| [OpenVidu](#openvidu)   | Use it to initialize your sessions and publishers |
| [Session](#session)    | Represents a video call. It can also be seen as a room where multiple users can connect. Participants who publish their videos to a session will be seen by the rest of users connected to that specific session  |
| [Publisher](#publisher)  | Packs local media streams. Users can publish it to a session |
| [Subscriber](#subscriber) | Packs remote media streams. Users automatically receive them when others publish their streams|
| [Stream](#stream)     | Represents each one of the videos send and receive by a user in a session. Therefore each Publisher and Subscriber has an attribute of type Stream |
| [Connection](#connection)     | Represents each one of the user's connection to the session (the local one and other user's connections). Therefore each Session and Stream object has an attribute of type Connection |

#### **OpenVidu**
| Method           | Returns | Parameters | Description |
| ---------------- | ------- | ------------------------------------------- | ----------- |
| `initSession`    | [Session](#session) | _`apikey:string`_<br/>`sessionId:string` | Returns a session with id **sessionId**. This parameter must always start with the URL of openvidu-server (automatically set when asking for it to openvidu-server) |
| `initPublisher`  | [Publisher](#publisher) | `parentId:string`<br/>_`cameraOptions:any`_<br/>_`callback:function`_ | Starts local video stream, appending it to **parentId** HTML element, with the specific **cameraOptions** settings and executing **callback** function in the end. _cameraOptions_ must be an object with three properties: **{audio:boolean, video:boolean, quality:string}**, being _audio_/_video_ false if you want to initialize them muted (_Publisher.publishAudio(true)_ and _Publisher.publishVideo(true)_ can unmute them later) and _quality_ must be 'LOW', 'MEDIUM' or 'HIGH'|
| `checkSystemRequirements`  | number |  | Returns 1 if the browser supports WebRTC, 0 otherwise|
| `getDevices` | Promise | `callback(error, deviceInfo):function` | Collects information about the media input and output devices available on the system, returned in **deviceInfo** array |

#### **Session**
| Method           | Returns | Parameters | Description |
| ---------------- | ------- | ------------------------------------------- | ----------- |
| `connect`    |  | `token:string`<br/>_`metadata:string`_<br/>`callback(error):function` | Connects to the session using **token** and executes **callback** in the end (_error_ parameter null if success). **metadata** parameter allows you to pass a string as extra data to share with other users when they receive _participantJoined_ event. You can also add metadata through openvidu-backend-client when generating tokens (see [TokenOptions](#tokenoptions)). The structure of this string is up to you (maybe some standarized format as JSON or XML is a good idea), the only restriction is a maximum length of 1000 chars |
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
| `streamCreated`        | stream:[Stream](#stream)         | Triggered by Session object when a new Stream has been created and added to it |
| `streamDestroyed`      | stream:[Stream](#stream)<br/>preventDefault():Function | Triggered by Session object when an existing Stream has been destroyed. The default behaviour is the deletion of the HTML video element associated to it. To prevent it, call `preventDefault()` method on the event object  |
| `connectionCreated`    | connection:[Connection](#connection) | Triggered by Session object whenever any user has joined the session. This includes dispatching one event for each user that joins the session when you are already connected to it, one for each existing participant the first time you connect to the session and once for your own local connection |
| `connectionDestroyed`  | connection:[Connection](#connection) | Triggered by Session object whenever a user leaves the session. This event can also mean that `streamDestroyed` events could be dispatched, depending on the streams associated to it  |
| `sessionDisconnected`  | preventDefault():Function | Triggered by Session object when the user disconnects from the Session. Default behaviour is the deletion of all HTML video elements. Call `preventDefault()` on event object to prevent it and delete them by yourself |

#### **Publisher**
| Method         | Returns | Parameters | Description |
| -------------- | ------- | ------------------------------------------- | ----------- |
| `publishAudio` |  | `value:boolean`| Enable or disable the audio track depending on whether value is _true_ or _false_ |
| `publishVideo` |  | `value:boolean`| Enable or disable the video track depending on whether value is _true_ or _false_ |
| `destroy`      | [Publisher](#publihser) || Delets the publisher object and removes it from DOM. The rest of users will trigger a _streamDestroyed_ event |

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
| `accessDenied`      |          | Triggered by Publisher object when the user has rejected access to the camera/microphone |
| `videoElementCreated`      | element:HTMLVideoElement | Triggered by Publisher object inmediately after a new video element has been added to DOM |

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
| `videoElementCreated`      | element:HTMLVideoElement | Triggered by Subscriber object inmediately after a new video element has been added to DOM |

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
