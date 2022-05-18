# openvidu-toolbar-panel-buttons

<a href="#" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

The openvidu-toolbar-panel-buttons tutorial shows how to add new additional panel buttons to the default toolbar, so custom panels may be toggled from it.

This customization is possible thanks to the [**ToolbarAdditionalPanelButtonsDirective**](/api/openvidu-angular/directives/ToolbarAdditionalPanelButtonsDirective.html), which provides us a simple way to customizing the [**ToolbarComponent**](/api/openvidu-angular/components/ToolbarComponent.html).

<p align="center">
  <img class="img-responsive" style="max-width: 80%" src="img/components/toolbar-panel-buttons.png">
</p>

## Understanding the code

<div class="warningBoxContent">
  <div style="display: table-cell; vertical-align: middle;">
      <i class="icon ion-android-alert warningIcon"></i>
  </div>
  <div class="warningBoxText">
    openvidu-toolbar-panel-buttons is not production ready videconference app because it's using an insecure communication for requesting the token to OpenVidu Server. We highly recommend do this in the backend side.
  </div>
</div>

This is an Angular project generated with angular-cli tool, and therefore you will see lots of configuration files and other stuff that doesn't really matter to us. We will focus on the following files under `src/app/` folder:

- `app.module.ts`: Define the AppComponent module where we import and configure the [openvidu-angular](api/openvidu-angular/) library.
- `app.component.ts`: defines *AppComponent*, main component of the app. It contains the functionalities for requesting the OpenVidu token for setting them up to the videoconference component and start the session.
- `app.component.html`: HTML for AppComponent.
---

#### Configure openvidu-angular

First, we need to install the openvidu-angular library. You can check how to do that [here](api/openvidu-angular/).

---

The [VideoconferenceComponent](/api/openvidu-angular/components/VideoconferenceComponent.html) needs the tokens for connecting to the session. We will requesting them when the users clicks on the _joinButton_ so we call to `onJoinButtonClicked` method when this is happening. After requesting the token, the VideoconferenceComponent will use them for connecting to the session.


```html
<ov-videoconference (onJoinButtonClicked)="onJoinButtonClicked()" [tokens]="tokens">
  ...
</ov-videoconference>
```


Inside of the __ov-videoconference__ component, we will add the custom template tagged with the __`*ovToolbarAdditionalPanelButtons`__. You can see how the __`ToolbarAdditionalPanelButtonsDirective`__ works [here](/api/openvidu-angular/directives/ToolbarAdditionalPanelButtonsDirective.html).


## Running this tutorial


1) You will need angular-cli (and of course NPM) to serve the Angular frontend. You can check it with the following command:

```bash
npm -v
ng v
```

2) Clone the repo:

```bash
git clone https://github.com/OpenVidu/openvidu-tutorials.git -b v2.22.0
```

3) Run the tutorial:

```bash
cd openvidu-tutorials/openvidu-components/openvidu-toolbar-panel-button
npm install
ng serve
```

4) OpenVidu Server must be up and running in your development machine. The easiest way is running this Docker container which wraps both of them (you will need [Docker CE](https://store.docker.com/search?type=edition&offering=community){:target="_blank"}):

```bash
# WARNING: this container is not suitable for production deployments of OpenVidu Platform
# Visit https://docs.openvidu.io/en/stable/deployment

docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-server-kms:2.22.0
```

5) Go to _[`http://localhost:4200`](http://localhost:4200){:target="_blank"}_ to test the app once the server is running. The first time you use the docker container, an alert message will suggest you accept the self-signed certificate of _openvidu-server_ when you first try to join a video-call.

> If you are using **Windows**, read this **[FAQ](troubleshooting/#3-i-am-using-windows-to-run-the-tutorials-develop-my-app-anything-i-should-know)** to properly run the tutorial

> To learn **some tips** to develop with OpenVidu, check this **[FAQ](troubleshooting/#2-any-tips-to-make-easier-the-development-of-my-app-with-openvidu)**

