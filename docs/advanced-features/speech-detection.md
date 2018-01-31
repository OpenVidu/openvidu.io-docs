# Speech detection
_(since **v1.3.0**)_

A pretty common requested event is one that allows you to detect when a publisher starts and stops speaking. OpenVidu offers this ability through two events that can be configured for [Session](/reference-docs/openvidu-browser/#session) objects:

```javascript
session.on('publisherStartSpeaking', (event) => {
    console.log('Publisher ' + event.connection.connectionId + ' start speaking');
});

session.on('publisherStopSpeaking', (event) => {
    console.log('Publisher ' + event.connection.connectionId + ' stop speaking');
});
```
Event `publisherStopSpeaking` for certain [Connection](/reference-docs/openvidu-browser/#connection) object can only be triggered after `publisherStartSpeaking` has been called for that specific Connection object. In other words, none of these events can be triggered twice in a row for one Connection: they are always launched alternately.

With these events it is really easy to build a layout that can make the main speaker video the bigger one, and alternate the main view between the participants of a session as they take the floor. You can check the complete API reference for these events in [Session events](/reference-docs/openvidu-browser/#session) section.