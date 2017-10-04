# Receive other users streams

```javascript
session.on('streamCreated', function(event) {
    session.subscribe(event.stream, 'html-id');
});
```

A new HTML video element will be appended to DOM inside the element with id `html-id`. If you prefer to manage the stream object by yourself, you can always get its `srcObject` property to insert it on any `HTMLMediaElement` (such as a `<video>` element). For example:
```javascript
session.on('streamCreated', function(event) {
    session.subscribe(event.stream, ''); // Empty html id
    var video = document.getElementById('myVideoElement'); 
    video.srcObject = event.stream.getVideoSrcObject();
});
```