# openvidu-custom-ui

<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-components/openvidu-custom-ui" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

openvidu-custom-ui tutorial is made for showing how the easy it is the UI customizing of your **openvidu-angular** based application.

<p align="center">
  <img class="img-responsive" style="max-width: 80%" src="img/components/custom-ui.png">
</p>


## Understanding the code

<div class="warningBoxContent">
  <div style="display: table-cell; vertical-align: middle;">
      <i class="icon ion-android-alert warningIcon"></i>
  </div>
  <div class="warningBoxText">
    openvidu-custom-ui is not production ready videconference app because it's using an insecure communication for requesting the token to OpenVidu Server. We highly recommend do this in the backend side.
  </div>
</div>

This is an Angular project generated with angular-cli tool, and therefore you will see lots of configuration files and other stuff that doesn't really matter to us. We will focus on the following files under `src/app/` folder:

- `app.module.ts`: Define the AppComponent module where we import and configure the [openvidu-angular](api/openvidu-angular/) library.
- `app.component.ts`: defines *AppComponent*, main component of the app. It contains the functionalities for requesting the OpenVidu token for setting them up to the videoconference component and start the session.
- `app.component.html`: HTML for AppComponent.
---

#### Configure openvidu-angular

First, we need to install the openvidu-angular library. You can check how to do that [here](/api/openvidu-angular/).

---

The [VideoconferenceComponent](/api/openvidu-angular/components/VideoconferenceComponent.html) needs the tokens for connecting to the session. We will requesting them when the users clicks on the _joinButton_ so we call to `onJoinButtonClicked` method when this is happening. After requesting the token, the VideoconferenceComponent will use them for connecting to the session.


```html
<ov-videoconference (onJoinButtonClicked)="onJoinButtonClicked()" [tokens]="tokens">
  ...
</ov-videoconference>
```

####`app.component.ts` declares the following properties and methods:

```javascript
  title = 'openvidu-custom-ui';
  tokens!: TokenModel;
  private sessionId = 'openvidu-custom-ui';
  private OPENVIDU_SERVER_URL = 'https://' + location.hostname + ':4443';
  private OPENVIDU_SERVER_SECRET = 'MY_SECRET';

  constructor(private httpClient: HttpClient) {}

  async onJoinButtonClicked() {
    this.tokens = {
      webcam: await this.getToken(),
      screen: await this.getToken(),
    };
  }

  getToken() {
	  ...
	  // Requesting an insecure token. This logic must be on server side.
  }

```

#### Customize the UI

With openvidu-angular you have to customize the basic UI to suit your tastes. You will be able to handle the **shape of buttons, panels abd videos customization**, the **background color personalization** of panels, buttons and videoconference and also you will can **change the text color**.

To archieve this, you only have to personalize the css styles added in `variables.scss` file.


```css
:root {
  --ov-primary-color: #303030;
  --ov-secondary-color: #3e3f3f;
  --ov-tertiary-color: #598eff;
  --ov-warn-color: #EB5144;
  --ov-accent-color: #ffae35;
  --ov-light-color: #e6e6e6;

  --ov-logo-background-color: #3e3f3f;

  --ov-text-color: #ffffff;

  --ov-panel-text-color: #1d1d1d;
  --ov-panel-background: #ffffff;

  --ov-buttons-radius: 50%;
  --ov-leave-button-radius: 10px;
  --ov-video-radius: 5px;
  --ov-panel-radius: 5px;
}
```

Moreover you can change the branding logo which is appearing in the toolbar. For doing this, you only have to add you own logo under `/assets/images` and name this file as `logo.png`.

---

## Running this tutorial


1) You will need angular-cli (and of course NPM) to serve the Angular frontend. You can check it with the following command:

```bash
npm -v
ng v
```

2) Clone the repo:

```bash
git clone https://github.com/OpenVidu/openvidu-tutorials.git -b v2.21.0
```

3) Run the tutorial:

```bash
cd openvidu-tutorials/openvidu-components/openvidu-custom-ui
npm install
ng serve
```

4) OpenVidu Platform service must be up and running in your development machine. The easiest way is running this Docker container which wraps both of them (you will need [Docker CE](https://store.docker.com/search?type=edition&offering=community){:target="_blank"}):

```bash
# WARNING: this container is not suitable for production deployments of OpenVidu Platform
# Visit https://docs.openvidu.io/en/stable/deployment

docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-server-kms:2.21.0
```

5) Go to _[`http://localhost:4200`](http://localhost:4200){:target="_blank"}_ to test the app once the server is running. The first time you use the docker container, an alert message will suggest you accept the self-signed certificate of _openvidu-server_ when you first try to join a video-call.

> If you are using **Windows**, read this **[FAQ](troubleshooting/#3-i-am-using-windows-to-run-the-tutorials-develop-my-app-anything-i-should-know)** to properly run the tutorial

> To learn **some tips** to develop with OpenVidu, check this **[FAQ](troubleshooting/#2-any-tips-to-make-easier-the-development-of-my-app-with-openvidu)**






<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js"></script>
<script>
  $().fancybox({
    selector : '[data-fancybox="gallery"]',
    infobar : true,
    arrows : false,
    loop: true,
    protect: true,
    transitionEffect: 'slide',
    buttons : [
        'close'
    ],
    clickOutside : 'close',
    clickSlide   : 'close',
  });
</script>


