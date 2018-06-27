# Speech detection

A pretty common requested event is one that allows you to detect when a publisher starts and stops speaking. OpenVidu offers this ability through [PublisherSpeakingEvents](../../api/openvidu-browser/classes/publisherspeakingevent.html) that can be configured for [Session](../../api/openvidu-browser/classes/session.html) objects:

```javascript
session.on('publisherStartSpeaking', (event) => {
    console.log('Publisher ' + event.connection.connectionId + ' start speaking');
});

session.on('publisherStopSpeaking', (event) => {
    console.log('Publisher ' + event.connection.connectionId + ' stop speaking');
});
```

Event `publisherStopSpeaking` for certain [Connection](../../api/openvidu-browser/classes/connection.html) object can only be triggered after `publisherStartSpeaking` has been called for that specific Connection object. In other words, none of these events can be triggered twice in a row for one Connection: they are always launched alternately.

You can further configure the behavior of these two events by using [OpenVidu.setAdvancedConfiguration](../../api/openvidu-browser/classes/openvidu.html#setadvancedconfiguration) method:

```javascript
var OV = new OpenVidu();
OV.setAdvancedConfiguration({
    publisherSpeakingEventsOptions: {
        interval: 50,   // Frequency of the polling of audio streams in ms
        threshold: -50  // Threshold volume in dB
    }
});
```

With these events it is really easy to build a layout that can make the main speaker video the bigger one, and alternate the main view between the participants of a session as they take the floor.