# Speech detection

<div class="warningBoxContent">
  <div style="display: table-cell; vertical-align: middle;">
      <i class="icon ion-android-alert warningIcon"></i>
  </div>
  <div class="warningBoxText">
    Speech detection works with a JavaScript library. <strong>This feature is not available in react-native</strong> for being a native implementation.
  </div>
</div>

A pretty common requested event is one that allows you to detect when a publisher starts and stops speaking. OpenVidu offers this ability through [PublisherSpeakingEvents](api/openvidu-browser/classes/PublisherSpeakingevent.html) that can be configured in [Session](api/openvidu-browser/classes/Session.html) object:

```javascript
session.on('publisherStartSpeaking', (event) => {
    console.log('User ' + event.connection.connectionId + ' start speaking');
});

session.on('publisherStopSpeaking', (event) => {
    console.log('User ' + event.connection.connectionId + ' stop speaking');
});
```

It can also be configured for specific [Publishers](api/openvidu-browser/classes/Publisher.html) or [Subscribers](api/openvidu-browser/classes/Subscriber.html) objects, if you are interested just in certain streams:

```javascript
publisher.on('publisherStartSpeaking', (event) => {
    console.log('The local user start speaking');
});

subscriber.on('publisherStopSpeaking', (event) => {
    console.log('User ' + event.connection.connectionId + ' stop speaking');
});
```

You can further globally configure the behavior of these two events by using [OpenVidu.setAdvancedConfiguration](api/openvidu-browser/classes/OpenVidu.html#setAdvancedConfiguration) method:

```javascript
var OV = new OpenVidu();
OV.setAdvancedConfiguration({
    publisherSpeakingEventsOptions: {
        interval: 100,   // Frequency of the polling of audio streams in ms (default 100)
        threshold: -50  // Threshold volume in dB (default -50)
    }
});
```

You can adjust dynamically this property for each specific Stream by using [StreamManager.updatePublisherSpeakingEventsOptions](api/openvidu-browser/classes/StreamManager.html#updatePublisherSpeakingEventsOptions) method:

```javascript
// 'streamManager' being a Publisher or Subscriber object
streamManager.updatePublisherSpeakingEventsOptions({
    interval: 100,   // Frequency of the polling of audio streams in ms
    threshold: -50  // Threshold volume in dB
});
```

With these events it is really easy to build a layout that can make the main speaker video the bigger one, and alternate the main view between the participants of a session as they take the floor.

---

### Audio volume detection

There is available a [StreamManagerEvent](api/openvidu-browser/classes/StreamManagerEvent.html) called `streamAudioVolumeChange`. You can get the audio volume (-100 being silence to 0 being max volume) of any Publisher or Subscriber by doing this:

```javascript
publisher.on('streamAudioVolumeChange', (event) => {
    console.log('Publisher audio volume change from ' + event.value.oldValue + ' to' + event.value.newValue);
});
```

> With event `streamAudioVolumeChange` you can easily build a volume meter to inform your users that their microphone is working ok, showing the volume being received by the input device.

> The frequency `streamAudioVolumeChange` event is fired with is defined by property `interval` of [OpenVidu.setAdvancedConfiguration](api/openvidu-browser/classes/OpenVidu.html#setAdvancedConfiguration) (default 100ms). You can also adjust these values for each specific Publisher or Subscriber object with method [StreamManager.updatePublisherSpeakingEventsOptions](api/openvidu-browser/classes/StreamManager.html#updatePublisherSpeakingEventsOptions)

<br>
