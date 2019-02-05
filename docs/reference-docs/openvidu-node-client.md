<h2 id="section-title">openvidu-node-client API</h2>
<hr>

_This is a Node library wrapping [OpenVidu Server REST API](/reference-docs/REST-API/){:target="_blank"}_

<h3>Check <a href="../../../api/openvidu-node-client/" target="blank">TypeDoc documentation</a></h3>

<hr>

## Code samples

### Create a session

```javascript
var openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
var properties = {};
openVidu.createSession(properties).then(session => { ... });
```

### Generate a token

```javascript
var tokenOptions = {
    role: "PUBLISHER",
    data: "user_data"
};
session.generateToken(tokenOptions).then(token => { ... });
```

### Fetch session status

```javascript
// Fetch all session info from OpenVidu Server
openvidu.fetch()
  .then(anyChange => {
      var activeSessions = openvidu.activeSessions;
  }):

// Fetch one session info from OpenVidu Server
session.fetch()
  .then(anyChange => {
      var activeConnections = session.activeSessions;
  });
```

### Close a session

```javascript
session.close().then(() => console.log('Session closed'));
```

### Disconnect a user

```javascript
// Find the desired Connection object in the array Session.activeConnections
session.forceDisconnect(connection);
```

### Unpublish a user's stream

```javascript
// Find the desired Publisher object in the array Connection.publishers
session.forceUnpublish(publisher);
```

### Manage recordings

```javascript
// Start recording
var sessionId = session.getSessionId();
openVidu.startRecording(sessionId).then(recordingStarted => ... );

// Stop recording
var recordingId = recordingStarted.id;
openvidu.stopRecording(recordingId).then(recordingStopped => ... );

// Get recording
openvidu.getRecording(recordingId).then(recordingRetrieved => ... );

// List recordings
openVidu.listRecordings().then(recordingList => ... );

// Delete recording
openVidu.deleteRecording(recordingId);
```

<br>
