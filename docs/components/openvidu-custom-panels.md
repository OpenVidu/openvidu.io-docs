# openvidu-custom-panels

<a href="#" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

In openvidu-custom-panels tutorial we are replacing the default panels and injecting our own with the aim of adapting the app to our needs. This customization can be possible because of the the [**PanelDirective**](api/openvidu-angular/directives/PanelDirective.html) which provides us a simple way to customizing the [**PanelComponent**](api/openvidu-angular/components/PanelComponent.html).


<p align="center">
  <img class="img-responsive" style="max-width: 80%" src="img/components/custom-panels.gif">
</p>

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
cd openvidu-tutorials/openvidu-components/openvidu-custom-panels
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

