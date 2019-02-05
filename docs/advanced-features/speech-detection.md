# Speech detection

A pretty common requested event is one that allows you to detect when a publisher starts and stops speaking. OpenVidu offers this ability through [PublisherSpeakingEvents](../../api/openvidu-browser/classes/publisherspeakingevent.html){:target="_blank"} that can be configured for [Session](../../api/openvidu-browser/classes/session.html){:target="_blank"} objects:

```javascript
session.on('publisherStartSpeaking', (event) => {
    console.log('Publisher ' + event.connection.connectionId + ' start speaking');
});

session.on('publisherStopSpeaking', (event) => {
    console.log('Publisher ' + event.connection.connectionId + ' stop speaking');
});
```

Event `publisherStopSpeaking` for certain [Connection](../../api/openvidu-browser/classes/connection.html){:target="_blank"} object can only be triggered after `publisherStartSpeaking` has been called for that specific Connection object. In other words, none of these events can be triggered twice in a row for one Connection: they are always launched alternately.

You can further configure the behavior of these two events by using [OpenVidu.setAdvancedConfiguration](../../api/openvidu-browser/classes/openvidu.html#setadvancedconfiguration){:target="_blank"} method:

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


### Audio volume detection

Since release 2.7.0, you have also available a new [StreamManagerEvent](../../api/openvidu-browser/classes/streammanagerevent.html){:target="_blank"} called `streamAudioVolumeChange`. You can get the audio volume (-100 being silence to 0 being max volume) of any Publisher or Subscriber by doing this:

```javascript
publisher.on('streamAudioVolumeChange', (event) => {
    console.log('Publisher audio volume change from ' + event.value.oldValue + ' to' + event.value.newValue);
});
```

<br>