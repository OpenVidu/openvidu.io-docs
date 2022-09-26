# openvidu-call

<a href="https://github.com/OpenVidu/openvidu-call" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

OpenVidu Call is the flagship videoconference app integrating many of the capabilities offered by OpenVidu platform. It brings a great number of essential features: **screensharing**, **chat service**, **intelligent layout**, **speech detection**, **switch cameras**, and so on.

Visit its <a href="https://openvidu.io/openvidu-call">presentation page</a> for more information. OpenVidu Call is installed by default when you [deploy OpenVidu](deployment).

<p align="center" style="margin-top: 30px">
  <video class="img-responsive" style="max-width: 80%" src="video/components/ov-call-greetings.mp4" muted async loop autoplay playsinline></video>
</p>

## Understanding the code

OpenVidu Call is the production ready videconference app included by default in any OpenVidu deployment. OpenVidu Call consists of:

#### **openvidu-call-back**

The OpenVidu Call backend provides the necessary logic for a secure management of your OpenVidu Sessions. It also includes other features such as recording capabilities and user authentication. It is the perfect starting point for you own custom backend.

OpenVidu Call offers two different flavors of the same backend (Java and Node), so that you can choose the one that is most convenient for you. Both of them are fully functional applications using its corresponding SDK ([openvidu-java-client](reference-docs/openvidu-java-client/) or [openvidu-node-client](reference-docs/openvidu-node-client/)) and exposing the same [REST API](#backend-rest-api).

<div class="lang-tabs-container" markdown="1">

<div class="lang-tabs-header">
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; color: black">Node</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Java</button>
</div>

<div id="node" class="lang-tabs-content" markdown="1">

- `app.ts`: entrypoint of the server.
- `config.ts`: contains the [backend environment variables](#configuration-parameters-for-openvidu-call-backend).
- `AdminController.ts`: controller for login/logout and access to admin dashboard.
- `SessionController.ts`: controller for requesting OpenVidu Tokens (see [basic concepts](developing-your-video-app/#basic-concepts)).
- `RecordingController.ts`: controller for recording features.
- `OpenViduService.ts`: service using _openvidu-node-client_ to communicate with the OpenVidu deployment.

_(Used by default with OpenVidu deployment)_

See code [here](https://github.com/OpenVidu/openvidu-call/openvidu-call-back){:target="\_blank"}

</div>

<div id="java" class="lang-tabs-content" style="display:none" markdown="1">

- `app.java`: entrypoint of the server.
- `application.properties`: contains the [backend environment variables](#configuration-parameters-for-openvidu-call-backend).
- `AdminController.java`: controller for login/logout and access to admin dashboard.
- `SessionController.java`: controller for requesting OpenVidu Tokens (see [basic concepts](developing-your-video-app/#basic-concepts)).
- `RecordingController.java`: controller for recording features.
- `OpenViduService.ts`: service using _openvidu-java-client_ to communicate with the OpenVidu deployment.
- `ProxyService.java`: service for redirecting requests from the frontend to the OpenVidu deployment.

See code [here](https://github.com/OpenVidu/openvidu-call/openvidu-call-back-java){:target="\_blank"}

</div>
</div>

<br>

The application server allows us to list the recordings of a session, start and stop a recording and delete a specific recording. It also allows starting the playback of a video in the client device.

> For enabling the video playback, the backend acts as proxy between the browser and the OpenVidu deployment, which is the most optimal way to download the video.

To identify who is able to manage a session recording, the server will generate and save (in-memory) a cookie with a token and it will be sent to the **session creator** (that is the first user connecting to the OpenVidu session). This user will have the necessary permissions to manage the session's recording.

<div class="warningBoxContent">
  <div style="display: table-cell; vertical-align: middle;">
      <i class="icon ion-android-alert warningIcon"></i>
  </div>
  <div class="warningBoxText">
    This authentication and authorization system is very basic and limited. <strong>It will not be suitable for most production environments</strong>. We highly recommend <strong>IMPLEMENTING YOUR OWN USER MANAGEMENT SYSTEM</strong> with real persistence for a properly secured recording process.
  </div>
</div>

In addition, the server allows logging in and out of the admin dashboard. This dashboard provides a list of all recordings availables in our deployment, allows the playback of the videos and their deletion.

#### **openvidu-call-front**

A simple Angular app built with [openvidu-angular](api/openvidu-angular/) library allowing us to develop a powerful videconference frontend. See code [here](https://github.com/OpenVidu/openvidu-call/openvidu-call-front).

- `services/rest.service.ts`: services for requesting OpenVidu Tokens to the application's backend.
- `components/home`: component with the home screen, where the user can define the session name and join it.
- `components/call`: component with the videoconference screen.
- `components/admin-dashboard`: component with the admin dashboard.

Let's focus on the [call component template](https://github.com/OpenVidu/openvidu-tutorials/blob/master/openvidu-call/openvidu-call-front/src/app/components/call/call.component.html). We can have a videoconference app **with a few lines of code**:

```html
<ov-videoconference
	(onJoinButtonClicked)="onJoinButtonClicked()"
	(onToolbarLeaveButtonClicked)="onLeaveButtonClicked()"
	[tokens]="tokens"
></ov-videoconference>
```

We need to request OpenVidu Tokens to the backend and set them in the `ov-videoconference` component, specifically in its `tokens` input property (see [VideoconferenceComponent reference](api/openvidu-angular/components/VideoconferenceComponent.html)). Once tthe okens are defined, the component will automatically join the session.

We are also listening to some events such as `onLeaveButtonClicked` to customize our application's logic. You can see all the events offered by `VideoconferenceComponent` [here](api/openvidu-angular/components/VideoconferenceComponent.html#outputs).

<br>

---

## Running the application

To run OpenVidu Call you need the three components started in [OpenVidu application architecture](developing-your-video-app/#openvidu-application-architecture): an OpenVidu deployment, your server application and your client application. In this order:

#### 1. Run OpenVidu deployment

Using [Docker Engine](https://docs.docker.com/engine/){:target="\_blank"}:

```bash
# WARNING: this container is not suitable for production deployments of OpenVidu
# Visit https://docs.openvidu.io/en/stable/deployment
docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-dev:2.23.0
```

#### 2. Run your preferred server application

Let's run the server application. Choose one of the backends offered in OpenVidu Call:

<div class="lang-tabs-container" markdown="1">

<div class="lang-tabs-header">
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; color: black">Node</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Java</button>
</div>

<div id="node" class="lang-tabs-content" markdown="1">

You need [Node and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm){:target="\_blank"}.

1) Clone the repository

```bash
git clone https://github.com/OpenVidu/openvidu-tutorials.git -b v2.23.0
```

2) Install dependencies

```bash
cd openvidu-call-back
npm install
```

3) Run the server application, which in this case is the OpenVidu Call backend. To configure this command you can check below section [Configuration parameters for OpenVidu Call backend](#configuration-parameters-for-openvidu-call-backend).

```bash
npm run start
```

</div>

<div id="java" class="lang-tabs-content" style="display:none" markdown="1">

You need [Java](https://www.java.com/en/download/manual.jsp){:target="\_blank"} and [Maven](https://maven.apache.org/){:target="\_blank"} to run the app.

1) Clone the repository

```bash
git clone https://github.com/OpenVidu/openvidu-tutorials.git -b v2.23.0
```

2) Install dependencies

```bash
cd openvidu-call-back-java
mvn install
```

3) Run the server application, which in this case is the OpenVidu Call backend. To configure this command you can check below section [Configuration parameters for OpenVidu Call backend](#configuration-parameters-for-openvidu-call-backend).

```bash
mvn spring-boot:run
```

</div>
</div>

<br>

#### 3. Run the client application

Install frontend dependencies in path `openvidu-tutorials/openvidu-call/openvidu-call-front`:

```bash
npm install
```

Run the client application:

```bash
npx ng serve --open
```

## Configuration parameters for OpenVidu Call backend

| Parameter             | Description                                  | Default value         |
| --------------------- | -------------------------------------------- | --------------------- |
| **`SERVER_PORT`**     | Number that indicates the port where http server will listen  | `5000`                  |
| **`OPENVIDU_URL`**    | String that indicates the URL to connect to the OpenVidu deployment | `"http://localhost:4443"` |
| **`OPENVIDU_SECRET`** | String with the secret of the OpenVidu deployment | `"MY_SECRET"`             |
| **`ADMIN_SECRET`**    | String with the secret of the OpenVidu Call admin dashboard | _Same as `OPENVIDU_SECRET`_ |
| **`RECORDING`**       | If recording features are ENABLED or not | `"ENABLED"`               |

These configuration parameters can be set as environment variables. For example, to execute the application against an OpenVidu deployment with a domain name such us `my.openvidu.deployment.com` that is configured with secret `PASSWORD`:

<div class="lang-tabs-container" markdown="1">

<div class="lang-tabs-header">
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; color: black">Node</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Java</button>
</div>

<div id="node" class="lang-tabs-content" markdown="1">

```bash
$ npx cross-env OPENVIDU_URL=https://my.openvidu.deployment.com OPENVIDU_SECRET=PASSWORD nodemon src/app.ts
```

</div>

<div id="java" class="lang-tabs-content" style="display:none" markdown="1">

```bash
mvn spring-boot:run -Dspring-boot.run.jvmArguments="-DOPENVIDU_URL=https://my.openvidu.deployment.com -DOPENVIDU_SECRET=PASSWORD"
```

</div>
</div>

## Backend REST API

| 1. Initialize a Session ||
| - ||
| **HTTP METHOD** | POST |
| **URL** | https://localhost:5000/sessions |
| **REQUEST BODY** | `{"sessionId":"session_id", "nickname":"openvidu_name"}` |
| **200 OK RETURN VALUE** | A JSON object with the Connection tokens and recording information.<br>For example: `{"cameraToken": "wss://localhost:4443?sessionId=ses_JM9v0nfD1l&token=tok_MIYGGzuDQb8Xf1Qd", "screenToken": "wss://localhost:4443?sessionId=ses_JM2v0nfD1l&token=tok_MIYGGduDQb8Xf1Qd", "recordings": [], "recordingEnabled": true}` |

| 2. List all recordings ||
| - ||
| **HTTP METHOD** | GET |
| **URL** | https://localhost:5000/recordings |
| **200 OK RETURN VALUE** | The list of all [Recording](reference-docs/REST-API/#the-recording-object) objects associated to the session |

| 3. Start recording ||
| - ||
| **HTTP METHOD** | POST |
| **URL** | https://localhost:5000/recordings/start |
| **REQUEST BODY** | `{"sessionId": "session_name"}` |
| **200 OK RETURN VALUE** | The [Recording](reference-docs/REST-API/#the-recording-object) object |

| 4. Stop recording ||
| - ||
| **HTTP METHOD** | POST |
| **URL** | https://localhost:5000/recordings/stop |
| **REQUEST BODY** | `{"sessionId": "session_name"}` |
| **200 OK RETURN VALUE** | The list of all [Recording](reference-docs/REST-API/#the-recording-object) objects associated to the session |

| 5. Delete a recording ||
| - ||
| **HTTP METHOD** | DELETE |
| **URL** | https://localhost:5000/recordings/delete/`RECORDING_ID` |
| **200 OK RETURN VALUE** | The list of all [Recording](reference-docs/REST-API/#the-recording-object) objects associated to the session |

| 6. Get a recording ||
| - ||
| **HTTP METHOD** | GET |
| **URL** | https://localhost:5000/recordings/`RECORDING_ID` |
| **206 Partial Content RETURN VALUE** | Byterange used to allow large files to be downloaded or requested progressively |

| 7. Admin login ||
| - ||
| **HTTP METHOD** | POST |
| **URL** | https://localhost:5000/admin/login |
| **REQUEST BODY** | Password for doing login in Admin dashboard `{"password": "xxx"}` |
| **200 OK RETURN VALUE** | A list of all [Recording](reference-docs/REST-API/#the-recording-object) objects available in the entire OpenVidu deployment |

| 8. Admin logout ||
| - ||
| **HTTP METHOD** | POST |
| **URL** | https://localhost:5000/admin/logout |

## How to build OpenVidu Call

### Docker image

<div class="warningBoxContent">
  <div style="display: table-cell; vertical-align: middle;">
      <i class="icon ion-android-alert warningIcon"></i>
  </div>
  <div class="warningBoxText">
    OpenVidu Call container is designed to be served next to an OpenVidu deployment. To allow the use of this image out of an OpenVidu deployment, you have two options:<br><br>
	  <ol>
		  <li>Handle the NGINX certificates with a proxy</li>
		  <li>Edit OpenVidu Call image to include the SSL certificate</li>
	  </ol>
  </div>
</div>

The process to build a Docker image of OpenVidu call is really easy. Take into account that you need to use one Dockerfile or another depending on the server technology you choose (Node or Java).

<div class="lang-tabs-container" markdown="1">

<div class="lang-tabs-header">
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; color: black">Node</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Java</button>
</div>

<div id="node" class="lang-tabs-content" markdown="1">

1) In directory `openvidu-call/.`, execute:

```bash
docker build -f docker/Dockerfile.node -t <your-tag-name> .
```

</div>

<div id="java" class="lang-tabs-content" style="display:none" markdown="1">

1) In directory `openvidu-call/.`, execute:

```bash
docker build -f docker/Dockerfile.java -t <your-image-name> .
```

</div>
</div>

<br>

2) After that, you can run the Docker container:

```
docker run -p <your-port>:5000 -e OPENVIDU_URL=<your-openvidu-url> -e OPENVIDU_SECRET=<your-secret> <your-image-name>
```

3) Go to `http://localhost:your-port` to test the app

#### Configuration parameters when building OpenVidu Call Docker image

| Parameter       | Description                       | Default value |
| --------------- | --------------------------------- | ------------- |
| **`BASE_HREF`** | URL prefix for application's path | `/`           |

### Packaged application

You can also build OpenVidu Call **without Docker** and serve it directly using Node or Java. Placed at `openvidu-call/.` root path:

<div class="lang-tabs-container" markdown="1">

<div class="lang-tabs-header">
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; color: black">Node</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Java</button>
</div>

<div id="node" class="lang-tabs-content" markdown="1">

1) Build OpenVidu Call frontend. Set as `BASE_HREF` the desired value depending on the path your application will be accessible:

```bash
cd openvidu-call-front
npm run prod:build BASE_HREF
```

2) Build OpenVidu Call backend:

```bash
cd ../openvidu-call-back
npm run build
```

3) You will find the app built in `dist` directory. You can use Node to launch it:

```bash
cd dist/
node openvidu-call-server.js
```

</div>

<div id="java" class="lang-tabs-content" style="display:none" markdown="1">

1) Build OpenVidu Call frontend. Set as `BASE_HREF` the desired value depending on the path your application will be accessible.

```bash
cd openvidu-call-front
npm run prod:build-java BASE_HREF
```

2) Build OpenVidu Call backend:

```bash
cd ../openvidu-call-back-java
mvn clean package
```

3) You will find the app built in `openvidu-call/openvidu-call-back-java/target/` directory. You can use Java to launch it:

```bash
cd target/
java -jar openvidu-backend-java.jar
```

</div>
</div>

<script>
function changeLangTab(event) {
  var parent = event.target.parentNode.parentNode;
  var txt = event.target.textContent || event.target.innerText;
  var txt = txt.replace(/\s/g, "-").toLowerCase();
  for (var i = 0; i < parent.children.length; i++) {
    var child = parent.children[i];
    // Change appearance of language buttons
    if (child.classList.contains("lang-tabs-header")) {
        for (var j = 0; j < child.children.length; j++) {
            var btn = child.children[j];
            if (btn.classList.contains("lang-tabs-btn")) {
                btn.style.backgroundColor = btn === event.target ? '#e8e8e8' : '#f9f9f9';
                btn.style.color = btn === event.target ? 'black' : '#777';
            }
        }
    }
    // Change visibility of language content
    if (child.classList.contains("lang-tabs-content")) {
        if (child.id === txt) {
            child.style.display = "block";
        } else {
            child.style.display = "none";
        }
    }
  }
}
</script>
