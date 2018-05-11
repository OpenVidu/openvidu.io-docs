# Send text messages between users

Any user connected to a session can send messages to every other participant of the session, as a broadcast message for everyone or to one or more specific participants. To do so:

```javascript
// Sender of the message (after 'session.connect')

session.signal({
      data: 'My custom message',  // Any string (optional)
      to: [],                     // Array of Connection objects (optional. Broadcast to everyone if empty)
      type: 'my-chat'             // The type of message (optional)
    })
    .then(() => {
        console.log('Message successfully sent');
    })
    .catch(error => {
        console.error(error);
    });
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
// Sender of the adressed message (after calling 'session.connect')

session.signal({
    data: 'My private custom message',
    to: [connection1, connection2],
    type: 'my-private-chat'
});
```

In this last case, only participants represented by `connection1` and `connection2` objects will receive the signal event (only if they are subscribed to it!). You can get Connection objects by subscribing to `connectionCreated` event before connecting to a session:

```javascript
this.session.on('connectionCreated', (event) => {
    console.log(event.connection);
});
```