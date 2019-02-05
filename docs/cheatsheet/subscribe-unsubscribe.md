# Subscribe/Unsubscribe from other user's stream

To receive the stream of a publisher of the session:

```javascript
var subscriber;

session.on('streamCreated', (event) => {
    subscriber = session.subscribe(event.stream, targetElement);
});
```

A new HTML video element will be appended to DOM inside the element `targetElement`. It can be an `HTMLElement` or its `id` attribute, and you can also indicate how to insert the video according to it (see [SubscriberProperties.insertMode](../../api/openvidu-browser/interfaces/subscriberproperties.html#insertmode){:target="_blank"}).

To cancel the subscription and stop receiving media:

```javascript
session.unsubscribe(subscriber);
```

As long as you have the Subscriber object available, you can alternately call `Session.subscribe` and `Session.unsubscribe` as many times as you want.