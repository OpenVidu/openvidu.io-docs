# Publish/Unpublish a stream

You can publish a stream after joining a session: get a `Publisher` object through OpenVidu object (`OpenVidu.initPublisher`) and publish it with `Session` object.

```javascript
var publisher = OV.initPublisher(targetElement);
// Register all the events you want with 'publisher.on(...)'
session.publish(publisher);
// Method Session.publish must always be called after successfully connecting to session
```

- `OpenVidu.initPublisher` method will insert into DOM a new HTML video element inside the element `targetElement`, showing your camera. This target element can be an `HTMLElement` or its `id` attribute, and you can also indicate how to insert the video according to it (see [PublisherProperties.insertMode](../../api/openvidu-browser/interfaces/publisherproperties.html#insertmode){:target="_blank"}). You can then publish it to the session whenever you want (perhaps you want the user to confirm that the camera is working well before publishing it).

- `Session.publish` method will make [Publisher](../../api/openvidu-browser/classes/publisher.html){:target="_blank"} object trigger `streamCreated` event in the local user that is publishing and will make [Session](../../api/openvidu-browser/classes/session.html){:target="_blank"} object trigger `streamCreated` event in every other remote user connected to the session. <br><br>

You can add two more parameters to `initPublisher` method: an object with properties about your publisher stream and a callback function to be executed just after the method finishes and before the publisher object dispatches `accessAllowed` or `accessDenied` event:

```javascript
OV.initPublisher(
    targetElement,
    {
        audioSource: undefined, // The source of audio. If undefined default audio input
        videoSource: undefined, // The source of video. If undefined default video input
        publishAudio: true,  	// Whether you want to start the publishing with audio unmuted or muted
        publishVideo: true,  	// Whether you want to start the publishing with video enabled or disabled
        resolution: '640x480',  // The resolution of your video
        frameRate: 30,			// The frame rate of your video
        insertMode: 'APPEND',	// How the video will be inserted according to targetElement
        mirror: false       	// Whether to mirror your local video or not
    },
    (error) => {                // Function to be executed when the method finishes
        if (error) {
            console.error('Error while initializing publisher: ', error);
        } else {
            console.log('Publisher successfully initialized');
        }
    }
);
```

To unpublish the stream:

```javascript
session.unpublish(publisher);
```

As long as you have the Publisher object available, you can alternately call `Session.publish` and `Session.unpublish` as many times as you want. It is also possible to change the Publisher dynamically (for example if you want to stop transmitting your webcam and start sharing your screen, all of it without leaving the session). To do so:

```javascript
session.unpublish(oldPubliser);
newPublisher = OV.initPublisher(newOptions);
// Register all the events you want with 'newPublisher.on(...)'
session.publish(newPublisher);
```

<br/>
> **NOTE**: only users with Role `PUBLISHER` or `MODERATOR` can call `Session.publish` method. You can check [OpenViduRole](../../api/openvidu-node-client/enums/openvidurole.html){:target="_blank"} section of OpenVidu Node Client for a complete description