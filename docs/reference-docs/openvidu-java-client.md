<h2 id="section-title">openvidu-java-client API</h2>
<hr>

## Code sample

_(>= v1.7.0)_
```java
OpenVidu openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
SessionProperties properties = new SessionProperties.Builder().build();
Session session = openVidu.createSession(properties);

// Getting a sessionId
String sessionId = session.getSessionId();

// Getting a token
TokenOptions tokenOptions = new TokenOptions.Builder().build();
String token = session.generateToken(tokenOptions);

// Store all the objects you need for later use and return 'sessionId' and 'token' to the client
```
<br>
<hr>

## API

<br>
> NOTE: all input parameters ("Parameters" columns) are listed in strict order, optional ones in _italics_

| Class                                   | Description                                                                                             |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| [OpenVidu](#openvidu)                   | Use it to create sessions and manage recordings                                                         |
| [Session](#session)                     | Allows for the creation of tokens                                                                       |
| [TokenOptions](#tokenoptions)           | Customize each token with this class when generating them                                               |
| [OpenViduRole](#openvidurole)           | Enum that defines the values accepted by _TokenOptions.Builder.role(OpenViduRole role)_ method          |
| [SessionProperties](#sessionproperties) | Customize each session with this class when creating them                                               |
| [MediaMode](#mediamode)                 | Enum that defines the type of connections in a session: p2p or through OpenVidu Server                  |
| [ArchiveMode](#archivemode)             | Enum that defines if automatically start the recording of a session or if it must be explicitly invoked |
| [ArchiveLayout](#archivelayout)         | Enum that defines the layout for a session recording                                                    |
| [Archive](#archive)                     | Represents one recording file                                                                           |
| [Archive.Status](#archivestatus)        | Status of the recording                                                                                 |

#### **OpenVidu**
| Method            | Returns                   | Parameters                                    | Description                                                                                                                                      |
| ----------------- | ------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| OpenVidu()        |                           | `String:urlOpenViduServer`<br>`String:secret` | The constructor receives the URL of your OpenVidu Server and the secret shared with it                                                           |
| createSession()   | [Session](#session)       | _`SessionProperties:properties`_              | Get a Session object by calling this method (optionally configured with `properties` parameter). You can then store it as you want for later use |
| startRecording()  | [Archive](#archive)       | `String:sessionId`                            | Start the recording for the session with id `sessionId`. Once the method returns, the recording can be stopped with guarantees                   |
| stopRecording()   | [Archive](#archive)       | `String:recordingId`                          | Stop the recording with id `recordingId`                                                                                                         |
| getRecording()    | [Archive](#archive)       | `String:recordingId`                          | Get the updated information of the recording with id `recordingId`                                                                               |
| listRecordings()  | List<[Archive](#archive)> |                                               | Get the information of all recordings                                                                                                            |
| deleteRecording() |                           | `String:recordingId`                          | Delete the recording with id `recordingId`                                                                                                       |

#### **Session**
| Method         | Returns | Parameters  | Description |
| -------------- | ------- | --------------------------------------------- | ----------- |
| generateToken() | String | _`TokenOptions:tokenOptions`_  | The value returned is required in the client side just as the sessionId in order to connect to a session. It is a single-use-only token |
| getSessionId() | String |  | Returns the unique identifier of the session. You will need to return this parameter to the client side to pass it during the connection process to the session |
| getProperties() | [SessionProperties](#sessionproperties) |  | Returns the properties of the session. These define if the media streams will pass through OpenVidu Server or not and the configuration for the sessin recording (if desired) |

#### **TokenOptions**
| Method    | Returns                       | Parameters | Description                                  |
| --------- | ----------------------------- | ---------- | -------------------------------------------- |
| getData() | String                        |            | Returns the metadata associated to the token |
| getRole() | [OpenViduRole](#openvidurole) |            | Returns the role associated to the token     |

##### **TokenOptions.Builder**
_(inner static class)_

| Method         | Returns | Parameters | Description |
| -------------- | ------- | --------------------------------------------- | ----------- |
| TokenOptions.Builder() |  |  | Constructor |
| build() | [TokenOptions](#tokenoptions) |  | Returns a new **TokenOptions** object with the stablished properties. Default values if methods _data()_ and _role()_ are not called are an empty string and OpenViduRole.PUBLISHER, respectively |
| data() | [TokenOptions.Builder](#tokenoptionsbuilder) | `String:data` | Some extra metadata to be associated to the user through its token. The structure of this string is up to you (maybe some standarized format as JSON or XML is a good idea), the only restriction is a maximum length of 1000 chars |
| role() | [TokenOptions.Builder](#tokenoptionsbuilder) | `OpenViduRole:role` | The role associated to this token |

#### **OpenViduRole**
| Enum       | Description                                                                                                                                                    |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SUBSCRIBER | They can subscribe to published streams of other users                                                                                                         |
| PUBLISHER  | They can subscribe to published streams of other users and publish their own streams                                                                           |
| MODERATOR  | They can subscribe to published streams of other users, publish their own streams and force _unpublish()_ and _disconnect()_ over a third-party stream or user |

#### **SessionProperties**
| Method          | Returns                         | Parameters | Description                                         |
| --------------- | ------------------------------- | ---------- | --------------------------------------------------- |
| archiveLayout() | [ArchiveLayout](#archivelayout) |            | Returns the ArchiveLayout associated to the session |
| archiveMode()   | [ArchiveMode](#archivemode)     |            | Returns the ArchiveMode associated to the session   |
| mediaMode()     | [MediaMode](#mediamode)         |            | Returns the MediaMode associated to the session     |

##### **SessionProperties.Builder**
_(inner static class)_

| Method         | Returns | Parameters | Description |
| -------------- | ------- | --------------------------------------------- | ----------- |
| SessionProperties.Builder() |  |  | Constructor |
| archiveLayout() | [SessionProperties.Builder](#sessionpropertiesbuilder) | `ArchiveLayout:archiveLayout` | How the videos will be distributed in the recording layout |
| archiveMode() | [SessionProperties.Builder](#sessionpropertiesbuilder) | `ArchiveMode:archiveMode` | When will the session recording process start |
| mediaMode() | [SessionProperties.Builder](#sessionpropertiesbuilder) | `MediaMode:mediaMode` | How the media streams will be transmitted (as p2p direct connections between clients or routed through OpenVidu Media Server). Recording service requires MediaMode.ROUTED |
| build() | [SessionProperties](#sessionproperties) |  | Returns a new **SessionProperties** object with the stablished properties. Default values if methods _archiveLayout()_, _archiveMode()_ _mediaMode()_ are not called are BEST_FIT, MANUAL and ROUTED, respectively |

#### **MediaMode**
| Enum    | Description                                                                                                                 |
| ------- | --------------------------------------------------------------------------------------------------------------------------- |
| RELAYED | The session will attempt to transmit streams directly between clients (P2P)<br>***(feature not available yet)***            |
| ROUTED  | _DEFAULT_ The session will transmit streams using OpenVidu Media Server. This is the mandatory option for session recording |

#### **ArchiveMode**
| Enum   | Description                                                                                                                                                                                                             |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ALWAYS | The session recording will start automatically as soon as the first participant publishes a stream. It will end automatically when the last participant leaves the session (or you can call `OpenVidu.stopRecording()`) |
| MANUAL | _DEFAULT_ The session recording only starts when `OpenVidu.startRecording()` method is called and stops only when `OpenVidu.stopRecording()` is called                                                                  |

#### **ArchiveLayout**
| Enum     | Description                                                                                            |
| -------- | ------------------------------------------------------------------------------------------------------ |
| BEST_FIT | _DEFAULT_ Grid layout where all the videos are evenly distributed, taking up as much space as possible |

#### **Archive**
| Method         | Returns                          | Parameters | Description                                                                         |
| -------------- | -------------------------------- | ---------- | ----------------------------------------------------------------------------------- |
| getId()        | String                           |            | Returns the recording identifier                                                    |
| getName()      | String                           |            | Returns the recording name                                                          |
| getSessionId() | String                           |            | Returns the session identifier associated to this recording                         |
| getCreatedAt() | long                             |            | Returns the time when the recording started (UTC milliseconds)                      |
| getSize()      | long                             |            | Returns the size of the recording in bytes (0 until the recording is stopped)       |
| getDuration()  | double                           |            | Returns the duration of the recording in seconds (0 until the recording is stopped) |
| hasAudio()     | boolean                          |            | Returns if the recording has audio tracks (currently fixed to true)                 |
| hasVideo()     | boolean                          |            | Returns if the recording has video tracks (currently fixed to true)                 |
| getStatus()    | [Archive.Status](#archivestatus) |            | Returns the status of the recording                                                 |

##### **Archive.Status**
_(inner enum)_

| Enum      | Description                                                                                                                                                        |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| starting  | The recording is starting (cannot be stopped)                                                                                                                      |
| started   | The recording has started and is going on                                                                                                                          |
| stopped   | The recording has finished OK                                                                                                                                      |
| available | The recording is available for downloading. This status is reached for all stopped recordings if openvidu-server property `openvidu.recording.free-access` is true |
| failed    | The recording has failed                                                                                                                                           |