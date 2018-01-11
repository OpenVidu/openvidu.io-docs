# Subscribe/Unsubscribe from other user's stream

To receive the stream of a publisher of the session:

```javascript
var subscriber;

session.on('streamCreated', function(event) {
    subscriber = session.subscribe(event.stream, 'html-id');
});
```

A new HTML video element will be appended to DOM inside the element with id `html-id`. If you prefer to manage the stream object by yourself, you can always get its `MediaStream` property to insert it on any `HTMLMediaElement` as its `srcObject` (such as a `<video>` element). For example:
```javascript
session.on('streamCreated', function(event) {
    subscriber = session.subscribe(event.stream, ''); // Empty html id
    var video = document.getElementById('myVideoElement'); 
    video.srcObject = event.stream.getMediaStream();
});
```

To cancel the subscription and stop receiving media:

```javascript
session.unsubscribe(subscriber);
```

As long as you have the Subscriber object available, you can alternately call `Session.subscribe` and `Session.unsubscribe` as many times as you want.