# Screen share

- **[How to screen share](#how-to-screen-share)**
- **[How to know when the user stops sharing the screen](#how-to-know-when-the-user-stops-sharing-the-screen)**
- **[How to change the resolution when screen sharing](#how-to-change-the-resolution-when-screen-sharing)**

<br>

---

## How to screen share

The following desktop platforms support screen sharing (mobile platforms do not currently support it):

- **Chrome**
- **Opera**
- **Firefox**
- **Safari >= 13.0**
- **Microsoft Edge >= 80.0**
- **Electron apps**

### Chrome, Opera, Firefox, Safari, Edge

To share your screen instead of your webcam, the process is exactly the same as stated in **[Publish a stream](cheatsheet/publish-unpublish)** section, but setting to _"screen"_ `videoSource` property when initializing a Publisher object:

```javascript
var OV = new OpenVidu();
var sessionScreen = OV.initSession();
getToken().then((token) => {
    sessionScreen.connect(token).then(() => {
        var publisher = OV.initPublisher("html-element-id", { videoSource: "screen" });

        publisher.once('accessAllowed', (event) => {
            publisher.stream.getMediaStream().getVideoTracks()[0].addEventListener('ended', () => {
                console.log('User pressed the "Stop sharing" button');
            });
            sessionScreen.publish(publisher);

        });

        publisher.once('accessDenied', (event) => {
            console.warn('ScreenShare: Access Denied');
        });

    }).catch((error => {
        console.warn('There was an error connecting to the session:', error.code, error.message);

    }));
});

```

> This code requires relatively modern versions of browsers (from the beginning of 2019). After so much time we can assume that an overwhelming majority of users will not have a version of these browsers from years ago. But if for any reason you want to support Chrome and Firefox from before 2019, please visit and [old version](https://docs.openvidu.io/en/2.16.0/advanced-features/screen-share/) of this same documentation to see how.

### Desktop Electron apps

Electron allows screen-sharing, but there's no default screen selector built in the framework. For the rest of supported platforms, a native dialog will be shown when calling `OpenVidu.initPublisher` with `{ videoSource: "screen" }`, so the user can pick up the screen or application window to share.

For Electron, you must build your own screen selection dialog using [desktopCapturer](https://electronjs.org/docs/api/desktop-capturer){:target="_blank"} API and then append the desired screen identifier to string `"screen"` like this: `{ videoSource: "screen:SCREEN_IDENTIFIER" }`

To do so:

```javascript
desktopCapturer.getSources({
    types: ['window', 'screen']
}).then(async sources => {
    sources.forEach(source => {
        // Name of the screen or window
        console.log(source.name);
        // Thumbnail of the screen or window. You can set this as the src attribute of an <img> element
        console.log(source.thumbnail.toDataURL());
        // ID of the screen or window. This is the required value
        console.log(source.id);

        if (my_condition) {
            var OV = new OpenVidu();
            var publisher = OV.initPublisher("html-element-id", { videoSource: "screen:" + source.id });
        }
    });
});
```

You can check out [openvidu-electron tutorial](tutorials/openvidu-electron/), which includes a fully functional screen selector dialog.

<br>

---

## How to know when the user stops sharing the screen

You can use native Web API to add a listener for determining when the user pressed the "Stop sharing" button shown by browsers when sharing a window or screen. You can do it like this:

```javascript
var OV = new OpenVidu();
var publisher = OV.initPublisherAsync({
    videoSource: "screen"
}).then(publisher => {
    publisher.stream.getMediaStream().addEventListener('inactive', () => {
        console.log('User pressed the "Stop sharing" button');
        // You can send a signal with Session.signal method to warn other participants
    });
});
```

If that doesn't work (it may only work in certain clients, but not in others) you can also try [event ended of MediaStreamTrack](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/ended_event){:target="_blank"}, which serves the same purpose. Following the same example above that would be:

```javascript
var OV = new OpenVidu();
var publisher = OV.initPublisherAsync({
    videoSource: "screen"
}).then(publisher => {
    publisher.stream.getMediaStream().getVideoTracks()[0].addEventListener('ended', () => {
        console.log('User pressed the "Stop sharing" button');
    });
});
```

<br>

---

## How to change the resolution when screen sharing

> **NOTE**: as a general rule, you shouldn't change the resolution of shared screens. Screen sharing videos have special behaviors in terms of bitrate and resolution, and messing around with them can negatively affect the transmission.

If you try setting a custom resolution when initializing a Publisher with screen sharing like this...

```javascript
var publisher = OV.initPublisher("html-element-id", {
    videoSource: "screen",
    resolution: "1280x720"
});
```

... you will see that the resolution parameter doesn't have any effect at all. This is because screen sharing videos have specific widths and heights dependent on the size of the shared screen. Changing it could cut off parts of the screen or modify its aspect ratio. But if you still want to forcibly adjust the width and height in pixels of the screen video, you can do it by using the method [MediaStreamTrack.applyConstraints](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/applyConstraints){:target="_blank"} of native Web API:

```javascript
var publisher = OV.initPublisher("html-element-id", { videoSource: "screen" });

publisher.once('accessAllowed', () => {
    try {
        publisher.stream.getMediaStream().getVideoTracks()[0].applyConstraints({
            width: 1280,
            height: 720
        });
    } catch (error) {
        console.error('Error applying constraints: ', error);
    }
});

```

<br>
