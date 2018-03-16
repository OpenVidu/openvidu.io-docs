# Screen share

To share your screen instead of your webcam, the process is exactly the same as stated in [Publish a stream](/how-do-i/publish-unpublish/) section, but setting to _true_ `screen` property when initializing a Publisher object:

```javascript
OV.initPublisher('html-element-id', { screen: true });
```

Both **Chrome** and **Firefox** support screen sharing. Chrome needs an extension and Firefox supports native screen sharing since version 52. Two different [OpenViduError](http://openvidu.io/docs/reference-docs/openvidu-browser/#openviduerror) can be returned in the callback function:

- `SCREEN_SHARING_NOT_SUPPORTED`: if the browser does not support screen sharing.
- `SCREEN_EXTENSION_NOT_INSTALLED`: Chrome needs an extension to allow screen sharing. `error.message` has the URL of Chrome Web Store where to install the extension.

```javascript
OV.initPublisher('html-element-id', { screen: true }, function(error) {
    if (error.name == 'SCREEN_EXTENSION_NOT_INSTALLED') {
        showWarning(error.message);
        // showWarning could show a button with href 'error.message',
        // so the user can navigate to install the extension.
        // A browser refresh is also needed after installation
    } else if (error.name == 'SCREEN_SHARING_NOT_SUPPORTED') {
        alert('Your browser does not support screen sharing');
    }
});
```

<br/>

> **NOTE**: for testing screen sharing in **Firefox < 59** it is a mandatory requirement to serve your application over HTTPS, even though you are connecting through `localhost`. For Chrome and Firefox ≥ 59 you can serve your app through `http://localhost:PORT` when developing without a problem.