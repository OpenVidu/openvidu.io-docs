# openvidu-virtual-background
<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-virtual-background" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

An OpenVidu application built with plain JavaScript, HTML and CSS, demonstrating OpenVidu Virtual Background capabilities. It is highly recommended to read [Virtual Background](advanced-features/virtual-background/) documentation before running the tutorial.

<div style="
    display: table;
    border: 2px solid #0088aa9e;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 30px;
    padding: 10px 0;
    background-color: rgba(0, 136, 170, 0.04);"><div style="display: table-cell; vertical-align: middle">
    <i class="icon ion-android-alert" style="
    font-size: 50px;
    color: #0088aa;
    display: inline-block;
    padding-left: 25%;
"></i></div>
<div style="
    vertical-align: middle;
    display: table-cell;
    padding-left: 20px;
    padding-right: 20px;
    ">
Virtual Background is part of OpenVidu <a href="openvidu-pro/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin: 0 4px 0 4px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span></a> and <a href="openvidu-enterprise/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(156, 39, 176); color: white; font-weight: bold; padding: 0px 5px; margin: 0 4px 0 4px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">ENTERPRISE</span></a> editions.
</div>
</div>

<div class="row">
    <div class="pro-gallery" style="margin: 20px 0 15px 0">
        <a data-fancybox="gallery-pro1" data-type="image" class="fancybox-img" href="img/tutorials/openvidu-virtual-background.png">
          <img class="img-responsive" style="margin: auto; max-height: 500px" src="img/tutorials/openvidu-virtual-background.png"/>
        </a>
    </div>
</div>

## Running this tutorial

To run the tutorial you need the three components stated in [OpenVidu application architecture](developing-your-video-app/#openvidu-application-architecture): an OpenVidu deployment, your server application and your client application. In this order:

#### 1. Run OpenVidu deployment

You will need an **OpenVidu Pro** or **OpenVidu Enterprise** deployment to test Virtual Background capabilities. See [Deployment documentation](deployment/).

#### 2. Run your preferred server application sample

For more information visit [Application server](application-server/).

> **IMPORTANT**: No matter what server application you choose, make sure to update configuration variables **`OPENVIDU_URL`** and **`OPENVIDU_SECRET`** to the values of your OpenVidu Pro/Enterprise deployment.

<div id="application-server-wrapper"></div>
<script src="js/load-common-template.js" data-pathToFile="server-application-samples.html" data-elementId="application-server-wrapper" data-runAnchorScript="false" data-useCurrentVersion="true"></script>

#### 3. Run the client application tutorial

You will need some kind of http web server installed in your development computer to serve the tutorial. If you have Node.js installed, you can use [http-server](https://github.com/indexzero/http-server){:target="_blank"}. It can be installed with:

```bash
npm install --location=global http-server
```

To serve the tutorial:

```bash
# Using the same repository openvidu-tutorials from step 2
http-server openvidu-tutorials/openvidu-virtual-background/web
```

Go to [`http://localhost:8080`](http://localhost:8080){:target="_blank"} to test the app once the server is running.

> To test the application with other devices in your network, visit this **[FAQ](troubleshooting/#3-test-applications-in-my-network-with-multiple-devices)**. Skip step 1, as you already need a real OpenVidu deployment to use Virtual Background.

## Understanding the code

This tutorial is exactly the same as [openvidu-js](tutorials/openvidu-js/), but adding Virtual Background capabilities.
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


## Deploying openvidu-virtual-background

#### 1) Build the docker image

Under the root project folder, you can see the `openvidu-virtual-background/docker/` directory. Here it is included all the required files yo make it possible the deployment with OpenVidu.

First of all, you will need to create the **openvidu-virtual-background** docker image. Under `openvidu-virtual-background/docker/` directory you will find the `create_image.sh` script. This script will create the docker image with the [openvidu-basic-node](application-server/openvidu-basic-node/) as application server and the static files.

```bash
./create_image.sh openvidu/openvidu-virtual-background-demo:X.Y.Z
```

This script will create an image named `openvidu/openvidu-virtual-background-demo:X.Y.Z`. This name will be used in the next step.

#### 2) Deploy the docker image

Time to deploy the docker image. You can follow the [Deploy OpenVidu based application with Docker](deployment/deploying-openvidu-apps/#with-docker) guide for doing this.

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js"></script>
<script type='text/javascript' src='js/fancybox-setup.js'></script>