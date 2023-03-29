# Switch camera

As a first step, we strongly recommend taking a look at *[Publish/Unpublish stream](cheatsheet/publish-unpublish/)* documentation, as we need to be very clear about those concepts before we address the switching camera operation.

That being said, there are two ways of switching the media source of a published stream:

#### By using method `Publisher.replaceTrack`

You can use method [Publisher.replaceTrack](api/openvidu-browser/classes/Publisher.html#replaceTrack) to seamlessly change the video track being published by a Publisher object.

```javascript
// 'myPublisher' a Publisher object obtained through 'OpenVidu.initPublisher()' method
// 'myTrack' a MediaStreamTrack object
// 'properties' a PublisherProperties object https://docs.openvidu.io/en/stable/api/openvidu-browser/interfaces/PublisherProperties.html

var mediaStream = await this.OV.getUserMedia(properties);

// Getting the video track from mediaStream
var myTrack = mediaStream.getVideoTracks()[0];

// Replacing video track
myPublisher.replaceTrack(myTrack)
    .then(() => console.log('New track has been published'))
    .catch(error => console.error('Error replacing track', error));
```

You can obtain this new [MediaStreamTrack](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack){:target="_blank"} by using the native Web API or simply with [OpenVidu.getUserMedia](api/openvidu-browser/classes/OpenVidu.html#getUserMedia) method.

> **WARNING:** this method has been proven to work, but there may be some combinations of published/replaced tracks that may be incompatible between them and break the connection inside the OpenVidu deployment.
> A complete renegotiation may be the only solution in this case

#### By initializing a new Publisher

You can also take a more "radical" path and directly use a new Publisher initialized with the new desired audio or video source. The general steps to switch the camera/microphone device in this way are:

1. List all the client's available media devices
2. Create a new Publisher with the desired device. If we want to switch the video, the `videoSource` field will be the new video deviceId
3. Unpublish the old Publisher
4. Publish our new Publisher created with the new `videoSource`

To list the video and audio devices of a client, you must use `OpenVidu.getDevices()` method (take a look to [getDevices](api/openvidu-browser/classes/OpenVidu.html#getDevices) method and [Device](api/openvidu-browser/interfaces/Device.html) object in openvidu-browser documentation)

```javascript
var OV = new OpenVidu();
OV.getDevices().then(devices => {
    // 'devices' array contains all available media devices
});
```

Now we can create a new **publisher** with the specific `videoSource`, unpublish the old stream and publish the new one:

```javascript
var isFrontCamera = false; // This allows us to toggle the camera between the front and back one

function toggleCamera() {
    getDevices().then(devices => {
        // Getting only the video devices
        var videoDevices = devices.filter(device => device.kind === 'videoinput');

        if (videoDevices && videoDevices.length > 1){

            // Creating a new publisher with specific videoSource
            // In mobile devices the default and first camera is the front one
            var newPublisher = OV.initPublisher('html-element-id', {
                videoSource: isFrontCamera ? videoDevices[1].deviceId : videoDevices[0].deviceId,
                publishAudio: true,
                publishVideo: true,
                mirror: isFrontCamera // Setting mirror enable if front camera is selected
            });

            // Changing isFrontCamera value
            isFrontCamera = !isFrontCamera;

            // Unpublishing the old publisher
            session.unpublish(publisher).then(() => {
                console.log('Old publisher unpublished!');

                // Assigning the new publisher to our global variable 'publisher'
                publisher = newPublisher;

                // Publishing the new publisher
                this.session.publish(publisher).then(() => {
                    console.log('New publisher published!');
                });
            });
        }
    });
}
```

<br>

---

### React Native

In React Native the camera switching works in a different way. As we are using plugin **react-native-webrtc**, we must use a specific method provided by the plugin to switch the camera.

This function allows us to switch between the front/back camera in a video track on the fly, without the need for adding/removing tracks or renegotiating the media.

```javascript
// _switchCamera() Method provided by react-native-webrtc plugin
// It belongs to MediaStream object, contained in Stream object of openvidu-browser API

stream.getMediaStream().getVideoTracks()[0]._switchCamera();
```

<br>
