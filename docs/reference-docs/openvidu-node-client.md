<h2 id="section-title">openvidu-node-client API</h2>
<hr>

_This is a Node library wrapping [OpenVidu REST API](reference-docs/REST-API/)_

<hr>

## Installation

```bash
npm i -S openvidu-node-client
```

<br>

---

## Documentation

<h4><a href="api/openvidu-node-client">TypeDoc documentation</a></h4>

<br>

---

## Code samples

### Create a Session

```javascript
var openVidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
var properties = {};
openVidu.createSession(properties).then(session => { ... });
```

### Create a Connection

```javascript
var connectionProperties = {
    role: "PUBLISHER",
    data: "user_data"
};
session.createConnection(connectionProperties).then(connection => {
    var token = connection.token; // Send this string to the client side
});
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
This feature is part of <a href="openvidu-pro/"><strong>OpenVidu</strong><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin-left: 5px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span></a> tier.
</div>
</div>

```javascript
var connectionProperties = {
    type: "WEBRTC",
    role: "MODERATOR",
    record: false
};
var connectionId = connection.connectionId;
session.updateConnection(connectionId, connectionProperties).then(connection => { ... });
```

### Publish an IP camera

```javascript
var connectionProperties = {
    type: "IPCAM",
    rtspUri: "rtsp://your.camera.ip:7777/path",
    adaptativeBitrate: true,
    onlyPlayWithSubscribers: true,
    networkCache: 2000
};
// "session" being a Session object
session.createConnection(connectionProperties)
    .then(ipcamConnection => { ... })
    .catch(error => console.error(error));
```

### Fetch Session status

```javascript
// Fetch all session info from OpenVidu Server
openvidu.fetch()
  .then(anyChange => {
      var activeSessions = openvidu.activeSessions;
  });

// Fetch one session info from OpenVidu Server
session.fetch()
  .then(anyChange => {
      var activeConnections = session.activeSessions;
  });
```

### Close a Session

```javascript
session.close().then(() => console.log('Session closed'));
```

### Destroy a Connection

```javascript
// Find the desired Connection object in the array Session.activeConnections
session.forceDisconnect(connection);
```

### Unpublish a stream

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
