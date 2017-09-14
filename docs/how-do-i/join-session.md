# Join a session

By calling `session.connect` method you can join a properly initialized session.

```javascript
session.connect(token, function(error) {...});
```

- If you have a server-side, you should ask for a user's `token` to OpenVidu Server (thanks to the [REST API](/reference-docs//REST-API/), [openvidu-java-client](/reference-docs/openvidu-java-client/) or [openvidu-node-client](/reference-docs/openvidu-node-client/)) and return it to the client to use it on `connect` method.

- If you don't have a server side, `token` value is completely irrelevant, so it can be undefined or null.

You can add an optional second parameter to pass some user metadata that will be recieved by every other user connected to the same session (check [Share data between users](/how-do-i/share-data/) to learn more).

```javascript
session.connect(token, DATA, function(error) {...});
```