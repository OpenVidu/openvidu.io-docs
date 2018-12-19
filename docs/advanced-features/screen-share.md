# Screen share

To share your screen instead of your webcam, the process is exactly the same as stated in [Publish a stream](/cheatsheet/publish-unpublish/) section, but setting to _"screen"_ `videoSource` property when initializing a Publisher object:

```javascript
OV.initPublisher("html-element-id", { videoSource: "screen" });
```

**Chrome**, **Firefox** and **Opera** support screen sharing. Chrome (and Opera) need an extension and Firefox supports native screen sharing since version 52. An OpenViduError object may be returned with the following [OpenViduError.name](../../api/openvidu-browser/enums/openviduerrorname.html) property in the callback function:

- `SCREEN_SHARING_NOT_SUPPORTED`: if the browser does not support screen sharing.
- `SCREEN_EXTENSION_NOT_INSTALLED`: Chrome needs an extension to allow screen sharing. `error.message` has the URL of Chrome Web Store where to install the extension.
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

For **Firefox** two different `videoSource` strings are allowed in order to screen share:

- `"screen"`: entire screen
- `"window"`: specific application window

In Chrome and Opera `"screen"` value will give access to both entire screen and specific application windows.

<br><br>
<hr>

# Custom Screen Sharing extension for Chrome
<br>
We provide a default extension that will work on any domain, but you can create your own Chrome extension always based on ours ([OpenVidu Screen Sharing extension](https://github.com/OpenVidu/openvidu-screen-sharing-chrome-extension)). This way your extension may have your own icon, name, description and custom valid domains.

To use your extension, just configure OpenVidu object like this after initializing it:

```javascript
var OV = new OpenVidu();
OV.setAdvancedConfiguration(
    { screenShareChromeExtension: "https://chrome.google.com/webstore/detail/EXTENSION_NAME/EXTENSION_ID" }
);
```

Check the [GitHub README](https://github.com/OpenVidu/openvidu-screen-sharing-chrome-extension) for further information.

<br>
