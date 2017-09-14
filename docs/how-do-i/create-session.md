# Create a session

You must get an `OpenVidu` object and call `initSession` method. This must receive just one string parameter: the `sessionID`, which unambiguously identify your session:

- If you have a server-side, you should ask for the `sessionId` to OpenVidu Server (thanks to the [REST API](/reference-docs//REST-API/), [openvidu-java-client](/reference-docs/openvidu-java-client/) or [openvidu-node-client](/reference-docs/openvidu-node-client/)) and return it to the client to use it on `initSession` method.

- If you don't have a server side, you willl have to build `sessionId` param by yourself with the following format (this is not recommended for production as the secret must be hardcoded in your JavaScript code):

<p style="text-align: center"><strong>"wss://"</strong> + <code>OPENVIDU_IP</code> + <strong>":8443/"</strong> + <code>SESSION_IDENTIFIER</code> + <strong>"?secret="</strong> + <code>OPENVIDU_SECRET</code></p>

```javascript
// Get sessionId by asking OpenVidu Server from your application server
// and then returning it here or generate it by your own with the format above

var OV = new OpenVidu();
var session = OV.initSession(sessionId);
```
