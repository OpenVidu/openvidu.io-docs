# openvidu-speech-to-text
<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-speech-to-text" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

An OpenVidu application built with plain JavaScript, HTML and CSS, demonstrating OpenVidu Speech to Text capabilities. It is highly recommended to read [Speech to Text](advanced-features/speech-to-text/) documentation before running the tutorial.

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
Speech to Text is part of OpenVidu <a href="openvidu-pro/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin: 0 4px 0 4px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">PRO</span></a> and <a href="openvidu-enterprise/"><span id="openvidu-pro-tag" style="display: inline-block; background-color: rgb(156, 39, 176); color: white; font-weight: bold; padding: 0px 5px; margin: 0 4px 0 4px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif;">ENTERPRISE</span></a> editions.
</div>
</div>

<div class="row">
    <div class="pro-gallery" style="margin: 20px 0 15px 0">
        <a data-fancybox="gallery-pro1" data-type="image" class="fancybox-img" href="img/tutorials/openvidu-speech-to-text.png">
          <img class="img-responsive" style="margin: auto; max-height: 500px" src="img/tutorials/openvidu-speech-to-text.png"/>
        </a>
    </div>
</div>

## Running this tutorial

To run the tutorial you need the three components stated in [OpenVidu application architecture](developing-your-video-app/#openvidu-application-architecture): an OpenVidu deployment, your server application and your client application. In this order:

#### 1. Run OpenVidu deployment

You will need an **OpenVidu Pro** or **OpenVidu Enterprise** deployment to test Speech to Text capabilities. See [Deployment documentation](deployment/).

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
http-server openvidu-tutorials/openvidu-speech-to-text/web
```

Go to [`http://localhost:8080`](http://localhost:8080){:target="_blank"} to test the app once the server is running.

> To test the application with other devices in your network, visit this **[FAQ](troubleshooting/#3-test-applications-in-my-network-with-multiple-devices)**. Skip step 1, as you already need a real OpenVidu deployment to use Speech to Text.

## Understanding the code

This tutorial is exactly the same as [openvidu-js](tutorials/openvidu-js/), but adding Speech to Text capabilities.
Let's focus on the usage of this feature.

In `web/app.js` file there is a section containing all methods making use of Speech to Text.

In this tutorial each participant video will have a button to start/stop the transcription of the audio. The transcription will be displayed at the bottom of the page view.

When the button is clicked, the following code will be executed:

```javascript
if(text === 'Enable captions') {
  //  ...
  await this.session.subscribeToSpeechToText(stream, 'en-US');
} else {
  // ...
  await this.session.unsubscribeFromSpeechToText(stream);
}
```

The first time the button is clicked, the `subscribeToSpeechToText` method will be called. This method will start the transcription of the audio of the stream. OpenVidu will try to recognise the audio language and will return the transcription in that language. In this case, the transcription will be in English (`en-US`).

 The second time the button is clicked, the `unsubscribeFromSpeechToText` method will be called. This method will stop the transcription of the audio of the stream.


## Deploying openvidu-speech-to-text

#### 1) Build the docker image

Under the root project folder, you can see the `openvidu-speech-to-text/docker/` directory. Here it is included all the required files yo make it possible the deployment with OpenVidu.

First of all, you will need to create the **openvidu-speech-to-text** docker image. Under `openvidu-speech-to-text/docker/` directory you will find the `create_image.sh` script. This script will create the docker image with the [openvidu-basic-node](application-server/openvidu-basic-node/) as application server and the static files.

```bash
./create_image.sh openvidu/openvidu-speech-to-text-demo:X.Y.Z
```

This script will create an image named `openvidu/openvidu-speech-to-text-demo:X.Y.Z`. This name will be used in the next step.

#### 2) Deploy the docker image

Time to deploy the docker image. You can follow the [Deploy OpenVidu based application with Docker](deployment/deploying-openvidu-apps/#with-docker) guide for doing this.

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js"></script>
<script type='text/javascript' src='js/fancybox-setup.js'></script>