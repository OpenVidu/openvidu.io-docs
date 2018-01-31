<h2 id="section-title">openvidu-node-client API</h2>
<hr>

## Code sample

_(>= v1.7.0)_
```javascript
var openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
var properties = new SessionProperties.Builder().build();
var session = openVidu.createSession(properties);

// Getting a sessionId
session.getSessionId(function(sessionId) {
    // Getting a token
    var tokenOptions = new TokenOptions.Builder().build();
    session.generateToken(tokenOptions, function(token){
        // Store all the objects you need for later use and return 'sessionId' and 'token' to the client
    });
});
```
<br>
<hr>

## API

<br>
> NOTE: all input parameters ("Parameters" columns) are listed in strict order, optional ones in _italics_

| Class        | Description   										     |
| ------------ | ------------------------------------------------------- |
| [OpenVidu](#openvidu)     | Use it to create all the sessions you need |
| [Session](#session)      | Allows for the creation of tokens |
| [TokenOptions](#tokenoptions) | Customize each token with this object when generating them |
| [OpenViduRole](#openvidurole) | Enum that defines the values accepted by _TokenOptions.Builder.role(OpenViduRole role)_ method |
| [SessionProperties](#sessionproperties) | Customize each session with this object when creating them |
| [MediaMode](#mediamode) | Enum that defines the type of connections in a session: p2p or through OpenVidu Server |
| [ArchiveMode](#archivemode) | Enum that defines if automatically start the recording of a session or if it must be explicitly invoked |
| [ArchiveLayout](#archivelayout) | Enum that defines the layout for a session recording |

#### **OpenVidu**
| Method         | Returns | Parameters | Description |
| -------------- | ------- | --------------------------------------------- | ----------- |
| OpenVidu() | | `urlOpenViduServer:string`<br>`secret:string` | The constructor receives the URL of your OpenVidu Server and the secret shared with it |
| createSession() | [Session](#session) | _`SessionProperties:properties`_ |  Get a Session object by calling this method (optionally configured with `properties` parameter). You can then store it as you want for later use |

#### **Session**
| Method         | Returns | Parameters  | Description |
| -------------- | ------- | --------------------------------------------- | ----------- |
| getSessionId() |  | `callback(sessionId:string):function` | Returns the unique identifier of the session as the only parameter (`sessionId`) in your `callback` function. You will need to return this parameter to the client side to pass it during the connection process to the session |
| generateToken() |  | _`tokenOptions:TokenOptions`_<br>`callback(token:string):function`  |  Returns the token as the only parameter (`token`) in your `callback` function. This single-use-only token is required in the client side just as the sessionId in order to connect to a session |
| getProperties() | [SessionProperties](#sessionproperties) |  | Returns the properties of the session. These define if the media streams will pass through OpenVidu Server or not and the configuration for the sessin recording (if desired) |

#### **TokenOptions**
| Method         | Returns | Parameters | Description |
| -------------- | ------- | -------------------------------------------| -- |
| getData() | string |        | Returns the metadata associated to the token |
| getRole() | [OpenViduRole](#openvidurole) |  | Returns the role associated to the token     |

##### **TokenOptions.Builder**
_(inner static class)_

| Method         | Returns | Parameters | Description |
| -------------- | ------- | --------------------------------------------- | ----------- |
| TokenOptions.Builder() |  |  | Constructor |
| build() | [TokenOptions](#tokenoptions) |  | Returns a new **TokenOptions** object with the stablished properties. Default values if methods _data()_ and _role()_ are not called are an empty string and OpenViduRole.PUBLISHER, respectively |
| data() | [TokenOptions.Builder](#tokenoptionsbuilder) | `data:string` | Some extra metadata to be associated to the user through its token. The structure of this string is up to you (maybe some standarized format as JSON or XML is a good idea), the only restriction is a maximum length of 1000 chars |
| role() | [TokenOptions.Builder](#tokenoptionsbuilder) | `role:OpenViduRole` | The role associated to this token |

#### **OpenViduRole**
| Enum       | Description |
| ---------- | ------- |
| SUBSCRIBER | They can subscribe to published streams of other users |
| PUBLISHER  | They can subscribe to published streams of other users and publish their own streams|
| MODERATOR  | They can subscribe to published streams of other users, publish their own streams and force _unpublish()_ and _disconnect()_ over a third-party stream or user |

#### **SessionProperties**
| Method         | Returns | Parameters | Description |
| -------------- | ------- | -------------------------------------------| -- |
| archiveLayout() | [ArchiveLayout](#archivelayout) |  | Returns the ArchiveLayout associated to the session |
| archiveMode() | [ArchiveMode](#archivemode) |  | Returns the ArchiveMode associated to the session |
| mediaMode() | [MediaMode](#mediamode) |  | Returns the MediaMode associated to the session |

##### **SessionProperties.Builder**
_(inner static class)_

| Method         | Returns | Parameters | Description |
| -------------- | ------- | --------------------------------------------- | ----------- |
| SessionProperties.Builder() |  |  | Constructor |
| archiveLayout() | [SessionProperties.Builder](#sessionpropertiesbuilder) | `ArchiveLayout:archiveLayout` | Some extra metadata to be associated to the user through its token. The structure of this string is up to you (maybe some standarized format as JSON or XML is a good idea), the only restriction is a maximum length of 1000 chars |
| archiveMode() | [SessionProperties.Builder](#sessionpropertiesbuilder) | `ArchiveMode:archiveMode` | The role associated to this token |
| mediaMode() | [SessionProperties.Builder](#sessionpropertiesbuilder) | `MediaMode:mediaMode` | The role associated to this token |
| build() | [SessionProperties](#sessionproperties) |  | Returns a new **TokenOptions** object with the stablished properties. Default values if methods _data()_ and _role()_ are not called are an empty string and OpenViduRole.PUBLISHER, respectively |

#### **MediaMode**
| Enum       | Description |
| ---------- | ------- |
| RELAYED | The session will attempt to transmit streams directly between clients (P2P)<br>***(feature not available yet)*** |
| ROUTED  | The session will transmit streams using OpenVidu Media Server. This is the mandatory option for session recording |

#### **ArchiveMode**
| Enum       | Description |
| ---------- | ----------- |
| ALWAYS     | The session recording will start automatically as soon as the first participant publishes a stream. It will end automatically when the last participant leaves the session |
| MANUAL     | The session recording only starts when `OpenVidu.startRecording()` method is called and stops only when `OpenVidu.stopRecording()` is called<br>***(feature not available yet. MANUAL mode means no recording at all in the current version)*** |

#### **ArchiveLayout**
| Enum       | Description |
| ---------- | ------- |
| BEST_FIT   |  Grid layout where all the videos are evenly distributed, taking up as much space as possible |