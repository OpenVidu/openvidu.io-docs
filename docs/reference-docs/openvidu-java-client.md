<h2 id="section-title">openvidu-java-client API</h2>
<hr>

_This is a Java library wrapping [OpenVidu Server REST API](/reference-docs/REST-API/){:target="_blank"}_

<h3>Check <a href="../../../api/openvidu-java-client/" target="_blank">JavaDoc documentation</a></h3>

<hr>

## Code samples

### Create a session

```java
OpenVidu openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
SessionProperties properties = new SessionProperties.Builder().build();
Session session = openVidu.createSession(properties);
```

### Generate a token

```java
TokenOptions tokenOptions = new TokenOptions.Builder()
    .role(OpenViduRole.PUBLISHER)
    .data("user_data")
    .build();
String token = session.generateToken(tokenOptions);
```

### Fetch session status

```java
// Fetch all session info from OpenVidu Server
openvidu.fetch():
List<Session> activeSessions = openvidu.getActiveSessions();

// Fetch one session info from OpenVidu Server
session.fetch();
List<Connection> activeConnections = session.getActiveConnections();
```

### Close a session

```java
session.close();
```

### Disconnect a user

```java
// Find the desired Connection object in the list returned by Session.getActiveConnections()
session.forceDisconnect(connection);
```

### Unpublish a user's stream

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
