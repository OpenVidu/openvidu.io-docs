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
    - [API REST](/reference-docs/REST-API#post-apisessions){:target="_blank"}
    - [openvidu-java-client](/reference-docs/openvidu-java-client#create-a-session){:target="_blank"}
    - [openvidu-node-client](/reference-docs/openvidu-node-client#create-a-session){:target="_blank"}<br><br>

2. **Generate a token for this session in OpenVidu Server**
    - [API REST](/reference-docs/REST-API#post-apitokens){:target="_blank"}
    - [openvidu-java-client](/reference-docs/openvidu-java-client#generate-a-token){:target="_blank"}
    - [openvidu-node-client](/reference-docs/openvidu-node-client#generate-a-token){:target="_blank"}<br><br>

3. **Return this token to your client-side to use it on **`Session.connect()`<br><br>

You can add an optional second parameter to pass some user metadata that will be recieved by every other user connected to the same session (check [Share data between users](/cheatsheet/share-data/){:target="_blank"} to learn more).

```javascript
session.connect(token, DATA)
    .then( ... )
    .catch( ... );
```