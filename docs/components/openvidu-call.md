# openvidu-call
<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-call" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

OpenVidu Call is the flagship videoconference app integrating many of the capabilities offered by OpenVidu platform. It brings a great number of essential features: **screensharing**, **chat service**, **intelligent layout**, **speech detection**, **switch cameras**, and so on.

Visit its <a href="https://openvidu.io/openvidu-call">presentation page</a> for more information. OpenVidu Call is installed by default when you [deploy OpenVidu](deployment).

<p align="center" style="margin-top: 30px">
  <video class="img-responsive" style="max-width: 80%" src="video/components/ov-call-greetings.mp4" muted async loop autoplay playsinline></video>
</p>

</br>

OpenVidu Call frontend is built using <strong>openvidu-angular</strong> client library. As it's a production ready application, it also provides a backend which is built with <strong>Node</strong> using ExpressJS.

## Understanding the code

OpenVidu Call is production ready videconference app included by default in any OpenVidu deployment. OpenVidu Call consists of:

* **openvidu-call-backend**: a simple Node.js backend which uses ExpressJS to request tokens from the OpenVidu deployment (using [openvidu-node-client](reference-docs/openvidu-node-client/)) and return them back to the frontend. See code [here](https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-call/openvidu-call-back).

    - `app.ts`: entrypoint of the server.
    - `config.ts`: file which contains the backend environmet variables.
    - `CallController.ts`: controller for allowing to get the token through REST API.
    - `OpenViduService.ts`: service capable to connect with OpenVidu Server using *openvidu-node-client*.

<br>

* **openvidu-call-front**: a simple Angular app built with [openvidu-angular](api/openvidu-angular/) library. See code [here](https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-call/openvidu-call-front).

    - `services/rest.service.ts`: services for requesting OpenVidu tokens to the backend.
    - `components/home`: component which contains the home screen where the user can define the session name and join it.
    - `components/call`: component which contains all the videoconference logic.

Let's focus on the [call component template](https://github.com/OpenVidu/openvidu-tutorials/blob/484418d6d143b89ab0896dee22c66ba17d65afb0/openvidu-call/openvidu-call-front/src/app/components/call/call.component.html#L1-L5). We can have a videoconference app **in no more than 5 lines**:

```html
<ov-videoconference
	(onJoinButtonClicked)="onJoinButtonClicked()"
	(onToolbarLeaveButtonClicked)="onLeaveButtonClicked()"
	[tokens]="tokens"
></ov-videoconference>
```

We need to request the OpenVidu tokens to our backend and set them in the `ov-videoconference` component in its `tokens` input property (see [VideoconferenceComponent reference](/api/openvidu-angular/components/VideoconferenceComponent.html)). Once `tokens` is defined, the component will automatically join the session.

We are also listening to the `onJoinButtonClicked` and `onToolbarLeaveButtonClicked` events to customize our application's logic. You can see all the events offered by `VideoconferenceComponent` component [here](api/openvidu-angular/components/VideoconferenceComponent.html#outputs).

---

## Get and execute the code

To run the tutorial you need the three components stated in [OpenVidu application architecture](developing-your-video-app/#openvidu-application-architecture): an OpenVidu deployment, your server application and your client application. In this order:

#### 1. Run OpenVidu deployment

Using [Docker Engine](https://docs.docker.com/engine/){:target="_blank"}:

```bash
# WARNING: this container is not suitable for production deployments of OpenVidu
# Visit https://docs.openvidu.io/en/stable/deployment

docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-dev:2.22.0
```

#### 2. Run the server application and the client application

You need [Node and NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm){:target="_blank"}. Check them with:

```
node --version
npm --version
```

Now to run the application...

1) Clone the repo:

```bash
git clone https://github.com/OpenVidu/openvidu-tutorials.git -b v2.22.0
```

2) Install dependencies of OpenVidu Call backend:

```bash
# Path openvidu-tutorials/openvidu-call
npm install --prefix openvidu-call-back
```

3) Run the server application, which in this case is the OpenVidu Call backend. To configure this command you can check below section [Configuration parameters for OpenVidu Call backend](#configuration-parameters-for-openvidu-call-backend).

```bash
# Path openvidu-tutorials/openvidu-call
npm run --prefix openvidu-call-back start
```

4) Install dependencies of OpenVidu Call frontend. Run the following command in a different terminal:

```bash
# Path openvidu-tutorials/openvidu-call
npm install --prefix openvidu-call-front
```

5) Run the client application, which in this case is the OpenVidu Call frontend.

```bash
# Path openvidu-tutorials/openvidu-call
cd openvidu-call-front
npx ng serve --open
```



## Configuration parameters for OpenVidu Call backend

| Parameter                     | Description   					                    | Default value         |
| ----------------------------- | ------------------------------------------- | --------------------- |
| **`SERVER_PORT`**             | Port where the Node HTTP server will listen | 5000                  |
| **`OPENVIDU_URL`**            | URL of the OpenVidu deployment              | http://localhost:4443 |
| **`OPENVIDU_SECRET`**         | Secret of the OpenVidu deployment           | MY_SECRET             |

These configuration parameters can be set as environment variables. For example, to execute the application against an OpenVidu depoyment with a domain name such us `openvidu.server.com`:

```bash
$ npx cross-env OPENVIDU_URL=https://openvidu.server.com OPENVIDU_SECRET=PASSWORD nodemon src/app.ts
```

## How to build OpenVidu Call

### Docker image

<div class="warningBoxContent">
  <div style="display: table-cell; vertical-align: middle;">
      <i class="icon ion-android-alert warningIcon"></i>
  </div>
  <div class="warningBoxText">
    OpenVidu Call container is designed to be served next to an OpenVidu deployment. To allow the use of this image out of an OpenVidu deployment, you have two options:
	  <ol>
		  <li>Handle the NGINX certificates with a proxy	</li>
		  <li>To edit OpenVidu Call image including the certificate</li>
	  </ol>
  </div>
</div>

Building a Docker image of OpenVidu call is really easy.

1) Under **openvidu-call** directory, execute:

```
docker build -f docker/Dockerfile -t <your-tag-name> .
```

2) After that, you can run the Docker container:

```
docker run -p <your-port>:5000 -e OPENVIDU_URL=<your-openvidu-url> -e OPENVIDU_SECRET=<your-secret> <your-tag-name>
```
3) Go to **http://localhost:your-port**

#### Configuration parameters for build OpenVidu Call with Docker

| Parameter                     | Description   					       | Default value   |
| ----------------------------- | ---------------------------------------- | --------------- |
| **`BASE_HREF`**               | URL prefix of app path                   | /               |




### Packaged Node.js application

You can also build OpenVidu Call using webpack. Under **openvidu-call** directory:

1) Build OpenVidu Call frontend:

```bash
npm run build-prod BASE_HREF --prefix openvidu-call-front
```

2) Build OpenVidu Call backend:

```
cd openvidu-call-back
npm run build
```

3) You will find the app built in dist directory. You can use Node to launch it:

```
cd dist/
node openvidu-call-server.js
```
