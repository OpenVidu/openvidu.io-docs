# Leave a session

By calling `session.disconnect` method you can leave the session.

```javascript
session.disconnect();
```

This action will trigger the following events:

- `sessionDisconnected`: dispatched by [Session](../../api/openvidu-browser/classes/session.html){:target="_blank"} object of the local user that is leaving. Automatically cleans all remote videos.
- `streamDestroyed`: dispatched by [Publisher](../../api/openvidu-browser/classes/publisher.html){:target="_blank"} object of the local user that is leaving (only if publishing). Automatically cleans the local video.
- `streamDestroyed`: dispatched by [Session](../../api/openvidu-browser/classes/session.html){:target="_blank"} object of every other remote user connected to the session. Automatically cleans the remote video.
- `connectionDestroyed`: dispatched by [Session](../../api/openvidu-browser/classes/session.html){:target="_blank"} object of every other remote user connected to the session.

<br>