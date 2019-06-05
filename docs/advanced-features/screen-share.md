# Screen share

**Chrome**, **Opera**, **Firefox**  and **desktop Electron apps** support screen sharing.

### Chrome >=72, Opera (based on Chrome >=72) and Firefox >=66

To share your screen instead of your webcam, the process is exactly the same as stated in **[Publish a stream](/cheatsheet/publish-unpublish){:target="_blank"}** section, but setting to _"screen"_ `videoSource` property when initializing a Publisher object:

```javascript
OV.initPublisher("html-element-id", { videoSource: "screen" });
```

### Chrome <72 and Opera (based on Chrome <72)

In these cases there's need of a browser extension. An OpenViduError object may be returned with the following [OpenViduError.name](../../api/openvidu-browser/enums/openviduerrorname.html){:target="_blank"} property in the callback function:

- `SCREEN_SHARING_NOT_SUPPORTED`: if the client does not support screen sharing.
- `SCREEN_EXTENSION_NOT_INSTALLED`: Chrome <72 needs an extension to allow screen sharing. `error.message` has the URL of Chrome Web Store where to install the extension.
- `SCREEN_EXTENSION_DISABLED`: if Chrome's screen extension is installed but disabled
- `SCREEN_CAPTURE_DENIED`: if the user doesn't grant permissions to capture the screen when the browser asks to.

```javascript
OV.initPublisher('html-element-id', { videoSource: "screen" }, function(error) {
    if (error.name == 'SCREEN_EXTENSION_NOT_INSTALLED') {
        showWarning(error.message);

        // showWarning could show a button with href 'error.message',
        // so the user can navigate to install the extension.
        // A browser refresh is also needed after installation

    } else if (error.name == 'SCREEN_SHARING_NOT_SUPPORTED') {
        alert('Your browser does not support screen sharing');
    } else if (error.name == 'SCREEN_EXTENSION_DISABLED') {
        alert('You need to enable screen sharing extension');
    } else if (error.name == 'SCREEN_CAPTURE_DENIED') {
        alert('You need to choose a window or application to share');
    }
});
```

### Firefox <66

For **Firefox <66** two different `videoSource` strings are allowed in order to screen share:

- `"screen"`: entire screen
- `"window"`: specific application window

In Chrome and Opera both values will always give access to both entire screen and specific application windows.

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
            var publisher = OV.initPublisher("html-element-id", { videoSource: "screen:" + source.id });
        }
    });
});
```

You can check out [openvidu-electron tutorial](/tutorials/openvidu-electron/){:target="_blank"}, which includes a fully functional screen selector dialog.

<br><br>
<hr>

# Custom Screen Sharing extension for Chrome
<br>
We provide a default extension that will work on any domain in case the client is using Chrome <72 or Opera based on it. But you can create your own Chrome extension always based on ours ([OpenVidu Screen Sharing extension](https://github.com/OpenVidu/openvidu-screen-sharing-chrome-extension){:target="_blank"}). This way your extension may have your own icon, name, description and custom valid domains.

To use your extension, just configure OpenVidu object like this after initializing it:

```javascript
var OV = new OpenVidu();
OV.setAdvancedConfiguration(
    { screenShareChromeExtension: "https://chrome.google.com/webstore/detail/EXTENSION_NAME/EXTENSION_ID" }
);
```

Check the [GitHub README](https://github.com/OpenVidu/openvidu-screen-sharing-chrome-extension){:target="_blank"} for further information.

<br>
