<h2 id="section-title">openvidu-node-client API</h2>
<hr>

<h3>Check <a href="../../../api/openvidu-node-client/">TypeDoc documentation</a></h3>

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