# openvidu-virtual-background
<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-virtual-background" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

A client-side only application built with JavaScript, HTML and CSS, demonstrating OpenVidu Virtual Background capabilities. It is highly recommended to read [Virtual Background](advanced-features/virtual-background/) documentation before running the tutorial.

## Understanding this tutorial

<p align="center">
  <img class="img-responsive" src="https://docs.google.com/uc?id=0B61cQ4sbhmWSeVBWdkFwWEtqNjA">
</p>

OpenVidu is composed by the three modules displayed on the image above in its insecure version.

- **openvidu-browser**: JavaScript library for the browser. It allows you to manage your video-calls straight away from your clients
- **openvidu-server**: Java application that controls Kurento Media Server
- **Kurento Media Server**: server that handles low level operations of media flows transmission

## Running this tutorial

1) Clone the repo:

```bash
git clone https://github.com/OpenVidu/openvidu-tutorials.git -b v2.21.0
```

2) You will need an http web server installed in your development computer to execute the sample application. If you have _node.js_ installed, you can use [http-server](https://github.com/indexzero/http-server){:target="_blank"} to serve application files. It can be installed with:

```bash
npm install -g http-server
```

3) You will need an **OpenVidu Pro** or **OpenVidu Enterprise** deployment to test Virtual Background capabilities. Modify the OpenVidu URL and secret in the `app.js` file **[here](https://github.com/OpenVidu/openvidu-tutorials/blob/627d636f18d766a24d92f1f9aee4b02dda8a27cd/openvidu-virtual-background/web/app.js#L296-L297){:target="_blank"}** to point to your deployment.

4) Run the tutorial:

```bash
http-server openvidu-tutorials/openvidu-virtual-background/web
```

5) Go to _[`http://localhost:8080`](http://localhost:8080){:target="_blank"}_ to test the app once the server is running.


## Understanding the code

This tutorial is exactly the same as [openvidu-insecure-js](tutorials/openvidu-insecure-js/), but adding Virtual Background capabilities.
Let's focus on the usage of this feature.

In `web/app.js` file there is a section containing all methods making use of Virtual Background.

First method is used to apply a blur Virtual Background to the Publisher's Stream. The method performs the following operations, in the following order:

- Blocks all buttons to avoid unwanted interactions while the Virtual Background is being applied.
- If there was an existing Virtual Background already applied, removes it.
- Applies the Virtual Background calling method [Stream.applyFilter](api/openvidu-browser/classes/Stream.html#applyFilter), storing the resulting [Filter](api/openvidu-browser/classes/Filter.html) object in a variable.
- Unblocks the required buttons to allow new interactions.

```javascript
async function applyBlur() {
  blockVirtualBackgroundButtons();
  if (!!virtualBackground) {
    await publisher.stream.removeFilter();
  }
  virtualBackground = await publisher.stream.applyFilter("VB:blur");
  blurVirtualBackgroundButtons();
}
```

Second method is used to apply an image Virtual Background to the Publisher's Stream. The method performs the following operations, in the following order:

- Blocks all buttons to avoid unwanted interactions while the Virtual Background is being applied.
- If there was an existing Virtual Background already applied, removes it.
- If there is no background image URL defined, sets a default one.
- Applies the Virtual Background calling method [Stream.applyFilter](api/openvidu-browser/classes/Stream.html#applyFilter), storing the resulting [Filter](api/openvidu-browser/classes/Filter.html) object in a variable.
- Unblocks the required buttons to allow new interactions.

```javascript
async function applyImage() {
  blockVirtualBackgroundButtons();
  if (!!virtualBackground) {
    await publisher.stream.removeFilter();
  }
  var url = !!backgroundImageUrl ? backgroundImageUrl : "https://raw.githubusercontent.com/OpenVidu/openvidu.io/master/img/vb/office.jpeg";
  virtualBackground = await publisher.stream.applyFilter("VB:image", { url: url });
  imageVirtualBackgroundButtons();
}
```

Third method is used to modify the background image of an already applied image Virtual Background. It is called whenever the radio button with the different image options is clicked. The method performs the following operations, in the following order:

- Method only executes if there is a Virtual Background of type `VB:image` already applied to the Publisher's Stream.
- Blocks all buttons to avoid unwanted interactions while the Virtual Background is being modified.
- Gets the new background image URL to apply from the radio button event.
- Only if the background image URL is different to the previous one, method [Filter.execMethod](api/openvidu-browser/classes/Filter.html#execMethod) is called on the existing Virtual Background filter object, passing method `update` and the new `url` to apply. The variable storing the current image URL is updated.
- Unblocks the required buttons to allow new interactions.

```javascript
async function modifyImage(radioBtnEvent) {
  if (!!virtualBackground && virtualBackground.type === "VB:image") {
    blockVirtualBackgroundButtons();
    var imageUrl = "https://raw.githubusercontent.com/OpenVidu/openvidu.io/master/img/vb/" + radioBtnEvent.value;
    if (backgroundImageUrl !== imageUrl) {
      await virtualBackground.execMethod("update", { url: imageUrl });
      backgroundImageUrl = imageUrl;
    }
    imageVirtualBackgroundButtons();
  }
}
```

Last method is used to remove an existing Virtual Background from the Publisher's Stream. The method performs the following operations, in the following order:

- Blocks all buttons to avoid unwanted interactions while the Virtual Background is being removed.
- Removes the Virtual Background by calling method [Stream.removeFilter](api/openvidu-browser/classes/Stream.html#removeFilter).
- Cleans the variable used to store the currently applied Virtual Background.
- Unblocks the required buttons to allow new interactions.

```javascript
async function removeVirtualBackground() {
  blockVirtualBackgroundButtons();
  await publisher.stream.removeFilter();
  virtualBackground = undefined;
  noVirtualBackgroundButtons();
}
```