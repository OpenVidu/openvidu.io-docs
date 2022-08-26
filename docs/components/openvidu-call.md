# openvidu-call

<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-call" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

OpenVidu Call is the flagship videoconference app integrating many of the capabilities offered by OpenVidu platform. It brings a great number of essential features: **screensharing**, **chat service**, **intelligent layout**, **speech detection**, **switch cameras**, and so on.

Visit its <a href="https://openvidu.io/openvidu-call">presentation page</a> for more information. OpenVidu Call is installed by default when you [deploy OpenVidu](deployment).

<p align="center" style="margin-top: 30px">
  <video class="img-responsive" style="max-width: 80%" src="video/components/ov-call-greetings.mp4" muted async loop autoplay playsinline></video>
</p>

## Understanding the code

OpenVidu Call is production ready videconference app included by default in any OpenVidu deployment. OpenVidu Call consists of:

#### **openvidu-call-back**

The OpenVidu Call backend not only has the basic feature as the basic server applications have but also it has been expanded including recording and authentication logic.

This application provides two backends (Java and Node) with the aim of allowing to choose the tenchnology of your choice.
Both of them are fully functional applications serve using the its corresponding SDK ([openvidu-java-client](reference-docs/openvidu-java-client/) or [openvidu-node-client](reference-docs/openvidu-node-client/)) and they are exposing the same [REST API](#backend-rest-api).

<div class="lang-tabs-container" markdown="1">

<div class="lang-tabs-header">
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; color: black">Node</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Java</button>
</div>

<div id="node" class="lang-tabs-content" markdown="1">

- `app.ts`: entrypoint of the server.
- `config.ts`: contains the contains the [backend environment variables](#configuration-parameters-for-openvidu-call).
- `AdminController.ts`: controller for doing login/logout and access to admin dashboard.
- `SessionController.ts`: controller for allowing to get the token from OpenVidu.
- `RecordingController.ts`: controller for accessing to the all recording features which OpenVidu provides.
- `OpenViduService.ts`: service capable to connect with OpenVidu Server using _openvidu-node-client_.

_(Used by default with OpenVidu deployment)_

See code [here](https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-call/openvidu-call-back){:target="\_blank"}

</div>

<div id="java" class="lang-tabs-content" style="display:none" markdown="1">

- `app.java`: entrypoint of the server.
- `application.properties`: contains the [backend environment variables](#configuration-parameters-for-openvidu-call).
- `AdminController.java`: controller for doing login/logout and access to admin dashboard.
- `SessionController.java`: controller for allowing to get the token from OpenVidu.
- `RecordingController.java`: controller for accessing to the all recording features which OpenVidu provides.
- `OpenViduService.ts`: service capable to connect with OpenVidu Server using _openvidu-java-client_.
- `ProxyService.java`: service capable to redirect a request from frontend to OpenVidu Server.

See code [here](https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-call/openvidu-call-back-java){:target="\_blank"}

</div>
</div>

<br>

The application server allows to us list all recording of a session, start and stop a recording and delete a specific recording.
We also will be able to request for a recording in order to allow the playback of a video.

> For enabling the video playback, the backend acts as proxy between the browser and the OpenVidu Server, which is the most optimal way to download the video.

To identify who is able to manage session recording, the server will generate and save (in memory) a cookie with a token and it will be sent to the **session creator**, who will have permission to record the session.

<div class="warningBoxContent">
  <div style="display: table-cell; vertical-align: middle;">
      <i class="icon ion-android-alert warningIcon"></i>
  </div>
  <div class="warningBoxText">
    This authentication and authorization system is pretty basic and <strong>it is not for production</strong>.
		We highly recommend <strong>IMPLEMENT YOUR OWN USER MANAGEMENT</strong> with persistence for a properly and secure recording feature.
  </div>
</div>

In addition, the server allows do login and logout to the admin dashboard. This dashboard provides a list of all recordings availables in our deployment, playback the videos or delete them.

#### **openvidu-call-front**

A simple Angular app built with [openvidu-angular](api/openvidu-angular/) library allowing us to develop a powerful videconference frontend. See code [here](https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-call/openvidu-call-front).

- `services/rest.service.ts`: services for requesting OpenVidu tokens to the backend.
- `components/home`: component which contains the home screen where the user can define the session name and join it.
- `components/call`: component which contains all the videoconference logic.
- `components/admin-dashboard`: component which contains the admin dashboard logic.

Let's focus on the [call component template](https://github.com/OpenVidu/openvidu-tutorials/blob/master/openvidu-call/openvidu-call-front/src/app/components/call/call.component.html). We can have a videoconference app **in very few lines of code**:

```html
<ov-videoconference
	(onJoinButtonClicked)="onJoinButtonClicked()"
	(onToolbarLeaveButtonClicked)="onLeaveButtonClicked()"
	[tokens]="tokens"
></ov-videoconference>
```

We need request the OpenVidu tokens to the backend and set them in the `ov-videoconference` component in its tokens input property (see [VideoconferenceComponent reference](/api/openvidu-angular/components/VideoconferenceComponent.html)). Once tokens is defined, the component will automatically join the session.

We are also listening every recording event with the aim of having a properly behaviour of this feature and events such as `onLeaveButtonClicked` for customizing our application's logic. You can see all the events offered by `VideoconferenceComponent` [here](api/openvidu-angular/components/VideoconferenceComponent.html#outputs).

## Get and execute the code

To run the tutorial you need the three components started in [OpenVidu application architecture](developing-your-video-app/#openvidu-application-architecture): an OpenVidu deployment, your server application and your client application. In this order:

#### 1. Run OpenVidu deployment

Using [Docker Engine](https://docs.docker.com/engine/){:target="\_blank"}:

```bash
# WARNING: this container is not suitable for production deployments of OpenVidu
# Visit https://docs.openvidu.io/en/stable/deployment
docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-dev:2.22.0
```

#### 2. Clone the repo:

```bash
git clone https://github.com/OpenVidu/openvidu-tutorials.git -b v2.22.0
```

Let's to run the server application. Choose one of backends which OpenVidu Call provide to us:

<div class="lang-tabs-container" markdown="1">

<div class="lang-tabs-header">
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; color: black">Node</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Java</button>
</div>

<div id="node" class="lang-tabs-content" markdown="1">

#### 2. Run the server application

You need [Node and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm){:target="\_blank"}.

**Now to run the application:**

1. Install dependencies of OpenVidu Call backend:

```bash
cd openvidu-call-back
npm install
```

2. Run the server application, which in this case is the OpenVidu Call backend. To configure this command you can check below section [Configuration parameters for OpenVidu Call backend](#configuration-parameters-for-openvidu-call-backend).

```bash
npm run start
```

</div>

<div id="java" class="lang-tabs-content" style="display:none" markdown="1">

#### 2. Run the server application

You need [Java](https://www.java.com/en/download/manual.jsp){:target="\_blank"} and [Maven](https://maven.apache.org/){:target="\_blank"} to run the app.

**Now to run the application:**

1. Install dependencies of OpenVidu Call backend:

```bash
cd openvidu-call-back-java
mvn install
```

2. Run the server application, which in this case is the OpenVidu Call backend. To configure this command you can check below section [Configuration parameters for OpenVidu Call backend](#configuration-parameters-for-openvidu-call-backend).

```
mvn spring-boot:run
```

</div>
</div>

<br>

#### 3. Run the client application

6. Under `openvidu-tutorials/openvidu-call/openvidu-call-front` install the frontend dependencies. Run the following command in a different terminal:

```
npm install
```

7. Finally, run the client application,:

```
npx ng serve --open
```

## Configuration parameters for OpenVidu Call backend

| Parameter             | Description                                  | Default value         |
| --------------------- | -------------------------------------------- | --------------------- |
| **`SERVER_PORT`**     | Port where http server will be listen        | 5000                  |
| **`OPENVIDU_URL`**    | URL where connect to OpenVidu Server         | http://localhost:4443 |
| **`OPENVIDU_SECRET`** | Secret for the OpenVidu Server               | MY_SECRET             |
| **`ADMIN_SECRET`**    | Secret for the OpenVidu Call admin dashboard | OPENVIDU_SECRET value |
| **`RECORDING`**       | If recording is ENABLED or not               | ENABLED               |

These configuration parameters can be set as environment variables. For example, to execute the application against an OpenVidu depoyment with a domain name such us `openvidu.server.com`:

<div class="lang-tabs-container" markdown="1">

<div class="lang-tabs-header">
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; color: black">Node</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Java</button>
</div>

<div id="node" class="lang-tabs-content" markdown="1">

```bash
$ npx cross-env OPENVIDU_URL=https://openvidu.server.com OPENVIDU_SECRET=PASSWORD nodemon src/app.ts
```

</div>

<div id="java" class="lang-tabs-content" style="display:none" markdown="1">

```bash
mvn spring-boot:run -Dspring-boot.run.jvmArguments="-DOPENVIDU_URL=https://openvidu.server.com -DOPENVIDU_SECRET=PASSWORD"
```

</div>
</div>

## Backend REST API

| 1. Initialize a Session ||
| - ||
| **HTTP METHOD** | POST |
| **URL** | https://localhost:5000/sessions |
| **REQUEST BODY** | `{"sessionId":"session_id", "nickname":"openvidu_name"}` |
| **200 OK RETURN VALUE** | A Json object string with the Connection tokens and recording information.<br>For example: `{"cameraToken": "wss://localhost:4443?sessionId=ses_JM9v0nfD1l&token=tok_MIYGGzuDQb8Xf1Qd", "screenToken": "wss://localhost:4443?sessionId=ses_JM2v0nfD1l&token=tok_MIYGGduDQb8Xf1Qd", "recordings": [], "recordingEnabled": true}` |

| 2. List all recordings ||
| - ||
| **HTTP METHOD** | GET |
| **URL** | https://localhost:5000/recordings |
| **200 OK RETURN VALUE** | A list of [Recording](reference-docs/REST-API/#the-recording-object) object available. |

| 3. Start recording ||
| - ||
| **HTTP METHOD** | POST |
| **URL** | https://localhost:5000/recordings/start |
| **REQUEST BODY** | `{"sessionId": "session_name"}` |
| **200 OK RETURN VALUE** | This operation returns a [Recording](reference-docs/REST-API/#the-recording-object) object. |

| 4. Stop recording ||
| - ||
| **HTTP METHOD** | POST |
| **URL** | https://localhost:5000/recordings/stop |
| **REQUEST BODY** | `{"sessionId": "session_name"}` |
| **200 OK RETURN VALUE** | A list of [Recording](reference-docs/REST-API/#the-recording-object) object available. |

| 5. Delete a recording ||
| - ||
| **HTTP METHOD** | DELETE |
| **URL** | https://localhost:5000/recordings/delete/`RECORDING_ID` |
| **200 OK RETURN VALUE** | A list of [Recording](reference-docs/REST-API/#the-recording-object) object available of these session. |

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
| **200 OK RETURN VALUE** | A list of [Recording](reference-docs/REST-API/#the-recording-object) object available in OpenVidu Server |

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
    OpenVidu Call container is designed to be served next to an OpenVidu deployment. To allow the use of this image out of an OpenVidu deployment, you have two options:
	  <ol>
		  <li>Handle the NGINX certificates with a proxy</li>
		  <li>To edit OpenVidu Call image including the certificate</li>
	  </ol>
  </div>
</div>

Building a Docker image of OpenVidu call is really easy. Take account you need to use one Dockerfile or another depending on the server you choose.

<div class="lang-tabs-container" markdown="1">

<div class="lang-tabs-header">
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; color: black">Node</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Java</button>
</div>

<div id="node" class="lang-tabs-content" markdown="1">

1) Under `openvidu-call/` directory, execute:

```
docker build -f docker/Dockerfile.node -t <your-tag-name> .
```

</div>

<div id="java" class="lang-tabs-content" style="display:none" markdown="1">

1) Under `openvidu-call/` directory, execute:

```
docker build -f docker/Dockerfile.java -t <your-tag-name> .
```

</div>
</div>

<br>

2) After that, you can run the Docker container:

```
docker run -p <your-port>:5000 -e OPENVIDU_URL=<your-openvidu-url> -e OPENVIDU_SECRET=<your-secret> <your-tag-name>
```

3) Go to **http://localhost:your-port**

#### Configuration parameters for build OpenVidu Call with Docker

| Parameter       | Description            | Default value |
| --------------- | ---------------------- | ------------- |
| **`BASE_HREF`** | URL prefix of app path | /             |

### Packaged application

You can also build OpenVidu Call **without docker**. Under `openvidu-call/openvidu-call-front/` directory:

<div class="lang-tabs-container" markdown="1">

<div class="lang-tabs-header">
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; color: black">Node</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Java</button>
</div>

<div id="node" class="lang-tabs-content" markdown="1">

1. Build OpenVidu Call frontend:

```bash
npm run prod:build BASE_HREF
```

2. Build OpenVidu Call backend:

```
cd ../openvidu-call-back
npm run build
```

3. You will find the app built in dist directory. You can use Node to launch it:

```
cd dist/
node openvidu-call-server.js
```

</div>

<div id="java" class="lang-tabs-content" style="display:none" markdown="1">

1. Build OpenVidu Call frontend:

```bash
npm run prod:build-java BASE_HREF
```

2. Build OpenVidu Call backend:

```
cd ../openvidu-call-back-java
mvn clean package
```

3. You will find the app built in `openvidu-call/openvidu-call-back-java/target/` directory. You can use Java to launch it:

```
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
