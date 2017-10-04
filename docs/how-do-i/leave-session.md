# Leave a session

By calling `session.disconnect` method you can leave the session.

```javascript
session.disconnect();
```

`sessionDisconnected` event will be triggered by `session` object. The default behaviour is the deletion of all HTML video elements associated to this particular session. To avoid this, call `event.preventDefault()` method:

```javascript
session.on('sessionDisconnected', function (event) {
    event.preventDefault();
    // Do wahtever you want when the user leaves the session
});
```