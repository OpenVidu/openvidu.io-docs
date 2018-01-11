# Mute/Unmute audio and video

By calling `publisher.publishAudio()` or `publisher.publishVideo()` method you can toggle audio and video. For these methods to have effect your Publisher object must have been initialized with `audio: true` and `video: true` respectively (see [Publish a stream](/how-do-i/publish-unpublish/) section).

```javascript
publisher.publishAudio(audioEnabled);   // true to unmute the audio, false to mute it
publisher.publishVideo(videoEnabled);   // true to enable the video, false to disable it 
                                        // (a black screen will show up instead)
```
