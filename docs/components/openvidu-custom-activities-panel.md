# openvidu-custom-activities-panel

<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-components/openvidu-custom-activities-panel" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

The openvidu-custom-activities-panel tutorial shows how to replace the default **activities panel** with a custom one.

This customization is possible thanks to the [**ActivitiesPanelDirective**](/api/openvidu-angular/directives/ActivitiesPanelDirective.html), which provides us a simple way to customize the [**ActivitiesPanelComponent**](/api/openvidu-angular/components/ActivitiesPanelComponent.html).

<p align="center">
  <img class="img-responsive" style="max-width: 80%" src="img/components/activities-panel.png">
</p>

## Understanding the code

This is an Angular project generated with angular-cli tool, and therefore you will see lots of configuration files and other stuff that doesn't really matter to us. We will focus on the following files under `src/app/` folder:

- `app.module.ts`: defines the AppComponent module where we import and configure the [openvidu-angular](api/openvidu-angular/) library.
- `app.component.ts`: defines *AppComponent*, main component of the app. It handles the request of OpenVidu tokens to pass them to the videoconference component, so it is able to connect to the OpenVidu session.

---

First, we need to install the openvidu-angular library. You can check how to do that [here](api/openvidu-angular/).

The [VideoconferenceComponent](/api/openvidu-angular/components/VideoconferenceComponent.html) needs the OpenVidu tokens to connect to the session. We request them on `ngOnInit` method. The VideoconferenceComponent will automatically use them to connect to the session when available.


```html
<ov-videoconference [tokens]="tokens">
  ...
</ov-videoconference>
```


Inside of the __ov-videoconference__ component, we will add the custom template tagged with the __`*ovActivitiesPanel`__. You can see how the __`ActivitiesPanelDirective`__ works [here](/api/openvidu-angular/directives/ActivitiesPanelDirective.html).


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
cd openvidu-tutorials/openvidu-components/openvidu-custom-activities-panel
npm install
ng serve
```

4) OpenVidu Server must be up and running in your development machine. The easiest way is running this Docker container which wraps both of them (you will need [Docker Engine](https://docs.docker.com/engine/){:target="_blank"}):

```bash
# WARNING: this container is not suitable for production deployments of OpenVidu Platform
# Visit https://docs.openvidu.io/en/stable/deployment

docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-server-kms:2.22.0
```

5) Go to _[`http://localhost:4200`](http://localhost:4200){:target="_blank"}_ to test the app once the server is running. The first time you use the docker container, an alert message will suggest you accept the self-signed certificate of _openvidu-server_ when you first try to join a video-call.

> If you are using **Windows**, read this **[FAQ](troubleshooting/#3-i-am-using-windows-to-run-the-tutorials-develop-my-app-anything-i-should-know)** to properly run the tutorial

> To learn **some tips** to develop with OpenVidu, check this **[FAQ](troubleshooting/#2-any-tips-to-make-easier-the-development-of-my-app-with-openvidu)**