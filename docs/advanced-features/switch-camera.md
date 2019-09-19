# Switch camera

Before to start, we highly recommend taking a look at our *[publish/unpublish tutorial](https://openvidu.io/docs/cheatsheet/publish-unpublish/){:target="_blank"}* due to we have to be clear about how to publish and unpublish a stream.

Once we have read the *publish/unpublish tutorial*, the steps to be able to switch the cameras are: 

1. Get the video devices
2. Create a new publisher. The **videoSource** field will be the video device ID that we want to show.
3. Unplublish our old publisher
4. Publish our new publisher created with the current videoSource.

To get the video and audio devices of your device, you must use `getDevices` method from OpenVidu : 

```javascript
function getDevices() {
    //Getting the devices
    return OV.getDevices().then(devices => {
        return devices;
    });
}
```

Now we can create a new **publisher** with the specific videoSource, unpublish the old stream and publish and save the new: 

```javascript
var isFrontCamera = false;

function toggleCamera() {
    getDevices().then(devices => {
        // Getting only the video devices
        var videoDevices = devices.filter((device) => device.kind === 'videoinput');

        if(videoDevices && videoDevices.length > 1){

            //Creating a new publisher with specific videoSource
            var newPublisher = OV.initPublisher(undefined, {
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

As we are using **react-native-webrtc** in React Native, we can use a specific way to switch the cameras.

This function allows to switch the front / back cameras in a video track on the fly, without the need for adding / removing tracks or renegotiating.

```javascript
// _switchCamera() Method provided by react-native-webrtc:
this.state.mainStreamManager.stream.getMediaStream().getVideoTracks()[0]._switchCamera();
```
