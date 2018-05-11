# Mute/Unmute audio and video

By calling `Publisher.publishAudio()` or `Publisher.publishVideo()` method you can toggle audio and video of your Publisher object. Every user subscribed to its stream will stop receiving audio or video.

```javascript
publisher.publishAudio(audioEnabled);   // true to unmute the audio track, false to mute it
publisher.publishVideo(videoEnabled);   // true to enable the video track, false to disable it
```

By calling `Subscriber.subscribeToAudio()` or `Subscriber.subscribeToVideo()` method you can toggle audio and video of any Subscriber object. You will stop receiving audio or video from it (only affects the client calling the method).

```javascript
subscriber.subscribeToAudio(audioEnabled);  // true to unmute the audio track, false to mute it
subscriber.subscribeToVideo(videoEnabled);  // true to enable the video, false to disable it
```