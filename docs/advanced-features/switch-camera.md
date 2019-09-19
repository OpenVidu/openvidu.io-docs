# Switch camera

As a first step, we strongly recommend taking a look at *[Publish/Unpublish stream](/cheatsheet/publish-unpublish/){:target="_blank"}* documentation, as we need to be very clear about those concepts before we address the switching camera operation.

The general steps to switch the camera device are:

1. Get the video devices
2. Create a new publisher. The `videoSource` field will be the new video device ID.
3. Unpublish the old publisher
4. Publish our new publisher created with the new `videoSource`.

To list the video and audio devices of a client, you must use `OpenVidu.getDevices()` method (take a look to [getDevices](https://openvidu.io/api/openvidu-browser/classes/openvidu.html#getdevices){:target="_blank"} method and [Device](https://openvidu.io/api/openvidu-browser/interfaces/device.html){:target="_blank"} object in openvidu-browser documentation)

```javascript
var OV = new OpenVidu();
OV.getDevices().then(devices => {
    return devices;
});
```

Now we can create a new **publisher** with the specific `videoSource`, unpublish the old stream and publish the new one:

```javascript
var isFrontCamera = false; // This allows as to toggle the camera between the front and back one

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
            session.unpublish(publisher);

            //Assigning the new publisher to the global variable 'publisher'
            publisher = newPublisher;

            // Publishing the new publisher
            this.session.publish(publisher);
        }
    });
}
```

#### React Native

In React Native the camera switching works in a different way. As we are using plugin **react-native-webrtc**, we must use a specific method provided by the plugin to switch the camera.

This function allows us to switch between the front/back camera in a video track on the fly, without the need for adding/removing tracks or renegotiating the media.

```javascript
// _switchCamera() Method provided by react-native-webrtc plugin
// It belongs to MediaStream object, contained in Stream object of openvidu-browser API

stream.getMediaStream().getVideoTracks()[0]._switchCamera();
```
