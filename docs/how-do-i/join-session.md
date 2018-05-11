# Join a session

By calling `session.connect` method you can join a properly initialized session.

```javascript
session.connect(token)
    .then( ... )
    .catch( ... );
```
<br>
You must ask OpenVidu Server for a user token. To do so:

1. **Initialize a Session in OpenVidu Server**
    - [API REST](/reference-docs/REST-API#post-apisessions)
    - [openvidu-java-client](/reference-docs/openvidu-java-client#create-a-session)
    - [openvidu-node-client](/reference-docs/openvidu-node-client#create-a-session)<br><br>

2. **Generate a token for this session in OpenVidu Server**
    - [API REST](/reference-docs/REST-API#post-apitokens)
    - [openvidu-java-client](/reference-docs/openvidu-java-client#generate-a-token)
    - [openvidu-node-client](/reference-docs/openvidu-node-client#generate-a-token)<br><br>

3. **Return this token to your client-side to use it on **`Session.connect()`<br><br>

You can add an optional second parameter to pass some user metadata that will be recieved by every other user connected to the same session (check [Share data between users](/how-do-i/share-data/) to learn more).

```javascript
session.connect(token, DATA)
    .then( ... )
    .catch( ... );
```