# Screen share

To share your screen instead of your webcam, the process is exactly the same as stated in [Publish a stream](/how-do-i/publish-stream/) section, but setting to _true_ `screen` property when initializing a Publisher object:

```javascript
OV.initPublisher('html-element-id', { screen: true });
```

Both Chrome and Firefox support screen sharing.

For Chrome, it is a necessary requirement that the user has an extension installed. If it is not, `initPublisher` will return an error with _name_ `SCREEN_EXTENSION_NOT_INSTALLED` and _message_ the URL of Chrome Web Store where to install the extension. So, a possible approach would be:

```javascript
OV.initPublisher('html-element-id', { screen: true }, function(error) {
    if (error.name == 'SCREEN_EXTENSION_NOT_INSTALLED') {
        showWarning(error.message);
        // showWarning could show a button with href 'error.message',
        // so the user can navigate to install the extension.
        // A browser refresh is also needed after installation
    }
});
```

For Firefox it is even easier, as it supports native screen capturing since version 52, so no extension is needed (a typical alert telling the user to select the window to share will pop up, similar to camera/microphone permission alert).