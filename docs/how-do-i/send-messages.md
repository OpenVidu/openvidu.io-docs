# Send text messages between users
_(since **v1.2.0**)_

Any user connected to a session can send messages to every other participant of the session, as a broadcast message for everyone or to one or more specific participants. To do so:

```javascript
// Sender of the message (after calling 'session.connect')

session.signal({
        data: 'My custom message',  // Any string (optional)
        to: [],                     // Array of Connection objects (optional)
        type: 'my-chat'             // The type of message (optional)
    },
    function (error) {              // Callback for catching errors ('error' is null if success)
        if (error) {
            console.log('Error sending signal: ' + error);
        }
    }
);
```

Any user subscribed to that _type_ will receive the message:

```javascript
// Receiver of the message (usually before calling 'session.connect')

session.on('signal:my-chat', (event) => {
    console.log(event.data); // Message
    console.log(event.from); // Connection object of the sender
    console.log(event.type); // The type of message ("my-chat")
});
```

You can subscribe to **all signals** just by calling:

```javascript
// Receiver of all messages (usually before calling 'session.connect')

session.on('signal', (event) => {
    console.log(event.data); // Message
    console.log(event.from); // Connection object of the sender
    console.log(event.type); // The type of message
});
```

You can send messages to specific users adding to `to` array the proper Connection objects:

```javascript
// Sender of the message (after calling 'session.connect')

session.signal({
    data: 'My private custom message',
    to: [connection1, connection2],
    type: 'my-private-chat'
});
```

Only participants represented by `connection1` and `connection2` objects will receive the signal event (only if they are subscribed to it!). You can get Connection objects by subscribing to `connectionCreated` event before connecting to a session:

```javascript
this.session.on('connectionCreated', (event) => {
    console.log(event.connection);
});
```