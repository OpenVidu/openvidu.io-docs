<h2 id="section-title">openvidu-java-client API</h2>
<hr>

_This is a Java library wrapping [OpenVidu REST API](reference-docs/REST-API/)_

<hr>

## Installation

See dependency at [Maven Central](https://search.maven.org/artifact/io.openvidu/openvidu-java-client){:target="_blank"}.

> openvidu-java-client SDK requires **Java 11** or higher

<br>

---

## Documentation

<h4><a href="api/openvidu-java-client">JavaDoc documentation</a></h4>

<br>

---

## Code samples

### Create a Session

```java
OpenVidu openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
SessionProperties properties = new SessionProperties.Builder().build();
Session session = openVidu.createSession(properties);
```

### Create a Connection

```java
ConnectionProperties connectionProperties = new ConnectionProperties.Builder()
    .type(ConnectionType.WEBRTC)
    .role(OpenViduRole.PUBLISHER)
    .data("user_data")
    .build();
Connection connection = session.createConnection(connectionProperties);
String token = connection.getToken(); // Send this string to the client side
```

### Update a Connection

<div style="
    display: table;
    border: 2px solid #0088aa9e;
    border-radius: 5px;
    width: 100%;
    margin-top: 20px;
    margin-bottom: 15px;
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

```java
ConnectionProperties connectionProperties = new ConnectionProperties.Builder()
    .role(OpenViduRole.MODERATOR)
    .record(false)
    .build();
String connectionId = connection.getConnectionId();
session.updateConnection(connectionId, connectionProperties);
```

### Publish an IP camera

```java
ConnectionProperties connectionProperties = new ConnectionProperties.Builder()
    .type(ConnectionType.IPCAM)
    .rtspUri("rtsp://your.camera.ip:7777/path")
    .adaptativeBitrate(true)
    .onlyPlayWithSubscribers(true)
    .networkCache(2000)
    .build();
// "session" being a Session object
Connection ipcamConnection = session.createConnection(connectionProperties);
```

### Fetch Session status

```java
// Fetch all session info from OpenVidu Server
openvidu.fetch():
List<Session> activeSessions = openvidu.getActiveSessions();

// Fetch one session info from OpenVidu Server
session.fetch();
List<Connection> activeConnections = session.getActiveConnections();
```

### Close a Session

```java
session.close();
```

### Destroy a Connection

```java
// Find the desired Connection object in the list returned by Session.getActiveConnections()
session.forceDisconnect(connection);
```

### Unpublish a stream

```java
// Find the desired Publisher object in the list returned by Connection.getPublishers()
session.forceUnpublish(publisher);
```

### Manage recordings

```java
// Start recording
String sessionId = session.getSessionId();
RecordingProperties properties = new RecordingProperties.Builder().build();
Recording recordingStarted = openVidu.startRecording(sessionId, properties);

// Stop recording
String recordingId = recordingStarted.getId();
Recording recordingStopped = openvidu.stopRecording(recordingId);

// Get recording
Recording recordingRetrieved = openvidu.getRecording(recordingId);

// List recordings
List<Recording> recordingList = openVidu.listRecordings();

// Delete recording
openVidu.deleteRecording(recordingId);
```

<br>
