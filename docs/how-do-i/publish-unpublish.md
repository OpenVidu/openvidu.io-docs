# Publish/Unpublish a stream

You can publish a stream after joining a session: get a `Publisher` object through OpenVidu object (`OpenVidu.initPublisher`) and publish it with `Session` object.

```javascript
// After joining a session...

var publisher = OV.initPublisher('html-id');
session.publish(publisher);
```

`initPublisher` method will append to DOM a new HTML video element inside the element with id `html-id`, showing your camera. You can then publish it to the session whenever you want (perhaps you want the user to confirm that his camera is working well before publishing it).

You can add two more parameters to `initPublisher` method: an object with properties about your publisher stream and a callback function to be executed in case any error takes places during publisher initialization:

```javascript
OV.initPublisher(
    'html-element-id',
    {
        audio: true,        // Whether you want to transmit audio or not
        video: true,        // Whether you want to transmit video or not
        audioActive: true,  // Whether you want to start the publishing with your audio unmuted or muted
        videoActive: true,  // Whether you want to start the publishing with your video enabled or disabled
        quality: 'MEDIUM',  // The quality of your video ('LOW', 'MEDIUM', 'HIGH')
        screen: false       // true to get your screen as video source instead of your camera
                            // See 'How do I...?' -> 'Screen share' section to learn more
    },
    function(error) {       // Function to be executed in case the Publisher initialization fails
        if (error) {
            console.log('Error while initializing publisher: ', error);
        }
    }
);
```

To unpublish the stream:

```javascript
session.unpublish(publisher);
```

As long as you have the Publisher object available, you can alternately call `Session.publish` and `Session.unpublish` as many times as you want.

<br/>
> **NOTE**: only users with Role `PUBLISHER` or `MODERATOR` can call `Session.publish` method (see [OpenViduRole](/reference-docs/openvidu-java-client#openvidurole) section)