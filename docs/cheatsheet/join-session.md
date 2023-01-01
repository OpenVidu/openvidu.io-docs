# Join a session

First initialize a Session object:

```javascript
var OV = new OpenVidu();
var session = OV.initSession();
```

Then by calling `session.connect` method you can join a properly initialized session.

```javascript
// After retrieving a token from OpenVidu Server...
session.connect(token)
    .then( ... )
    .catch( ... );
```
<br>
You must ask OpenVidu Server for a user token. To do so:

1. **Initialize a Session in OpenVidu Server**
    - [REST API](reference-docs/REST-API#post-session)
    - [openvidu-java-client](reference-docs/openvidu-java-client#create-a-session)
    - [openvidu-node-client](reference-docs/openvidu-node-client#create-a-session)<br><br>

2. **Create a Connection in this session in OpenVidu Server**
    - [REST API](reference-docs/REST-API#post-connection)
    - [openvidu-java-client](reference-docs/openvidu-java-client#create-a-connection)
    - [openvidu-node-client](reference-docs/openvidu-node-client#create-a-connection)<br><br>

3. **Return the Connection's token to your client-side to use it on **`Session.connect()`<br><br>

You can add an optional second parameter to pass some user metadata that will be received by every other user connected to the same session (check [Share data between users](cheatsheet/share-data/) to learn more).

```javascript
session.connect(token, DATA)
    .then( ... )
    .catch( ... );
```
