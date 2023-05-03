# openvidu-call

<a href="https://github.com/OpenVidu/openvidu-call" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

OpenVidu Call is the flagship videoconference app based on [OpenVidu Components](components). It includes many of the capabilities offered by OpenVidu platform and brings a great number of basic and advanced features:


- [**Chat service**](cheatsheet/send-messages)
- [**Switch camera**](advanced-features/switch-camera/)
- [**Screensharing**](advanced-features/screen-share)
- [**Speech detection**](advanced-features/speech-detection/)
- [**Automatic reconnection**](advanced-features/automatic-reconnection/)
- [**Virtual background**](advanced-features/virtual-background/)
- [**Recording**](advanced-features/recording/)
- [**Broadcast**](advanced-features/broadcast/)

Moreover, OpenVidu Call contains an **intelligent layout** algorithm that adapts the video layout to the number of participants in the session.
OpenVidu Call is installed by default when you [deploy OpenVidu](deployment).

Visit its <a href="https://openvidu.io/openvidu-call">presentation page</a> for more information.

<p align="center" style="margin-top: 30px">
  <video class="img-responsive" style="max-width: 80%" src="video/components/ov-call-greetings.mp4" muted async loop autoplay playsinline></video>
</p>

## Running the application

To run OpenVidu Call you need the three components started in [OpenVidu application architecture](developing-your-video-app/#openvidu-application-architecture): an OpenVidu deployment, your server application and your client application. In this order:

#### 1. Run OpenVidu deployment

Using [Docker Engine](https://docs.docker.com/engine/){:target="\_blank"}:

```bash
# WARNING: this container is not suitable for production deployments of OpenVidu
# Visit https://docs.openvidu.io/en/stable/deployment
docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-dev:2.27.0
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

1. Clone the repository

```bash
git clone https://github.com/OpenVidu/openvidu-call.git -b v2.27.0
```

2. Install dependencies

```bash
cd openvidu-call-back
npm install
```

3. Run the server application, which in this case is the OpenVidu Call backend. To configure this command you can check below section [Configuration parameters for OpenVidu Call backend](#configuration-parameters-for-openvidu-call-backend).

```bash
npm run dev:start
```

</div>

<div id="java" class="lang-tabs-content" style="display:none" markdown="1">

You need [Java](https://www.java.com/en/download/manual.jsp){:target="\_blank"} and [Maven](https://maven.apache.org/){:target="\_blank"} to run the app.

1. Clone the repository

```bash
git clone https://github.com/OpenVidu/openvidu-call.git -b v2.27.0
```

2. Install dependencies

```bash
cd openvidu-call-back-java
mvn install
```

3. Run the server application, which in this case is the OpenVidu Call backend. To configure this command you can check below section [Configuration parameters for OpenVidu Call backend](#configuration-parameters-for-openvidu-call-backend).

```bash
mvn spring-boot:run
```

</div>
</div>

<br>

#### 3. Run the client application

Install frontend dependencies in path `openvidu-call/openvidu-call-front`:

```bash
npm install
```

Run the client application:

```bash
npx ng serve --open
```

## Understanding the code

OpenVidu Call is the production ready videconference app included by default in any [OpenVidu deployment](deployment). OpenVidu Call consists of:

#### **openvidu-call-back**

OpenVidu Call offers two different flavors of the same backend (Java and Node), so that you can choose the one that is most convenient for you. Both of them are fully functional applications using its corresponding SDK ([openvidu-java-client](reference-docs/openvidu-java-client/) or [openvidu-node-client](reference-docs/openvidu-node-client/)) and exposing the same [REST API](#backend-rest-api).

<div class="lang-tabs-container" markdown="1">

<div class="lang-tabs-header">
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; color: black">Node</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Java</button>
</div>

<div id="node" class="lang-tabs-content" markdown="1">

- `app.ts`: entrypoint of the server.
- `config.ts`: contains the [backend environment variables](#configuration-parameters-for-openvidu-call-backend).
- `AuthController.ts`: controller for login to the OpenVidu Session and do login/logout to the admin dashboard.
- `SessionController.ts`: controller for requesting OpenVidu Tokens (see [basic concepts](developing-your-video-app/#basic-concepts)).
- `CallController.ts`: controller for requesting OpenVidu Call environment information.
- `RecordingController.ts`: controller for recording features.
- `BroadcastController.ts`: controller for broadcast features.
- `OpenViduService.ts`: service using _openvidu-node-client_ to communicate with the OpenVidu deployment.
- `AuthService.ts`: service which includes the auth logic.

_(Used by default with OpenVidu deployment)_

See code [here](https://github.com/OpenVidu/openvidu-call/tree/master/openvidu-call-back){:target="\_blank"}

</div>

<div id="java" class="lang-tabs-content" style="display:none" markdown="1">

- `app.java`: entrypoint of the server.
- `application.properties`: contains the [backend environment variables](#configuration-parameters-for-openvidu-call-backend).
- `AuthController.java`: controller for login to the OpenVidu Session and do login/logout to the admin dashboard.
- `SessionController.java`: controller for requesting OpenVidu Tokens (see [basic concepts](developing-your-video-app/#basic-concepts)).
- `CallController.java`: controller for requesting OpenVidu Call environment information.
- `RecordingController.java`: controller for recording features.
- `BroadcastController.java`: controller for broadcast features.
- `OpenViduService.ts`: service using _openvidu-java-client_ to communicate with the OpenVidu deployment.
- `ProxyService.java`: service for redirecting requests from the frontend to the OpenVidu deployment.
- `AuthService.java`: service which includes the auth logic.
- `SecurityConfig.java`: config file for basic authentication.

See code [here](https://github.com/OpenVidu/openvidu-call/tree/master/openvidu-call-back-java){:target="\_blank"}

</div>
</div>

<br>

##### Session control

The OpenVidu Call backend provides a **basic authentication system** to control the access to the OpenVidu Session. The authentication system is based on a single user with a fixed username and password. The default username and password are represented by variables `CALL_USER` and `CALL_SECRET`respectively.

You can check and change these values in the [configuration parameters](#configuration-parameters-for-openvidu-call-backend).

> Note that the authentication system can be disabled by setting the variable `CALL_PRIVATE_ACCESS` to `DISABLED`.

If you want to know more about what type of authentication you can use with OpenVidu, you can check the [user authentication section](application-server#user-authentication).

<br>

##### Recording management

<div class="warningBoxContent">
  <div style="display: table-cell; vertical-align: middle;">
      <i class="icon ion-android-alert warningIcon"></i>
  </div>
  <div class="warningBoxText">
    This authentication and authorization recording system is very basic and limited. <strong>It will not be suitable for most production environments</strong>. We highly recommend <strong>IMPLEMENTING YOUR OWN USER MANAGEMENT SYSTEM</strong> with real persistence for a properly secured recording process. <br>
    You can check the <a href="docs/application-server/#user-authentication">user authentication section</a> for more information.
  </div>
</div>

For OpenVidu Call backend exists two types of users:

- **Session creator user**: user with full recording privileges. This user who create the session can start, stop and delete the recordings of the OpenVidu Call sessions plus all the privileges of the **Normal user**.

- **Normal user**: user without recording privileges. This user who joins to the created session can only see the recordings available to the OpenVidu Call sessions as well as play, pause, stop and download the recording.

> Note that the playback and download of the recordings is done by the OpenVidu Call frontend. Here the backend acts as a proxy between the frontend and the OpenVidu Server, which is the most optimal way to do it.

To identify who is able to have recording privileges, the OpenVidu Call backend implements a cookie-based session system.
It will generate and store (in-memory) a cookie with an unique `ID` that will be used to identify the user.

This `ID` will be generated when the **session creator user** (that is the first user connecting to the session) creates the session. The token will be sent to the frontend and will be used to identify the user in the backend.

> Note that the recording features can be disabled by setting the variable `CALL_RECORDING` to `DISABLED`.

<br>

##### Admin dashboard

In addition, the backend also provides two endpoints for login and logout to the [admin dashboard](components/openvidu-admin-dashboard).
This dashboard allows you to see the recordings of the all OpenVidu Call sessions and manage them.

The **authentication system** for this dashboard is based on a single user with a fixed password. The default password is represented by variable `CALL_ADMIN_SECRET`.

This admin dashboard will be public in [http://localhost:4200/admin](http://localhost:4200/admin).

##### Broadcast management

The OpenVidu Call backend also provides **broadcasting features**. This feature allows to you stream any OpenVidu Call videoconference to Youtube, Twitch or any other broadcast platform that supports RTMP protocol (check the official documentation section [here](advanced-features/broadcast)).

As identical to the recording features, the broadcast features are also based on a cookie-based session system and the **session creator user** is the only one who can start and stop the broadcast of the OpenVidu Call sessions.


> Note that the broadcast features can be disabled by setting the variable `CALL_BROADCAST` to `DISABLED`.


#### **openvidu-call-front**

A simple Angular app built with [openvidu-angular](api/openvidu-angular/) library allowing us to develop a powerful videconference frontend. See code [here](https://github.com/OpenVidu/openvidu-call/tree/master/openvidu-call-front).

- `services/guards/navigator-guard.service.ts`: service in charge of checking if the navigation to an specific route is allowed verifying the user authentication.
- `services/call.service.ts`: service in charge of the OpenVidu Call environment information.
- `services/auth.service.ts`: service in charge of the authentication process.
- `services/rest.service.ts`: services for requesting OpenVidu Tokens to the application's backend.
- `services/http-interceptor.service.ts`: service for adding the authentication token to the HTTP requests.
- `components/home`: component with the home screen, where the user can define the session name and join it.
- `components/call`: component with the videoconference screen.
- `components/admin-dashboard`: component with the admin dashboard.

Let's focus on the [CallComponent template](https://github.com/OpenVidu/openvidu-call/blob/master/openvidu-call-front/src/app/components/call/call.component.html){:target="\_blank"}. We can have a videoconference app **with a few lines of code**:

```html
<ov-videoconference
	[tokens]="tokens"
	[recordingActivityRecordingsList]="recordingList"
	[recordingActivityRecordingError]="recordingError"
	[broadcastingActivityBroadcastingError]="broadcastingError"
	[activitiesPanelRecordingActivity]="recordingEnabled"
	[toolbarRecordingButton]="recordingEnabled"
	[activitiesPanelBroadcastingActivity]="broadcastingEnabled"
	[toolbarBroadcastingButton]="broadcastingEnabled"
	(onToolbarLeaveButtonClicked)="onLeaveButtonClicked()"
	(onToolbarStartRecordingClicked)="onStartRecordingClicked()"
	(onActivitiesPanelStartRecordingClicked)="onStartRecordingClicked()"
	(onToolbarStopRecordingClicked)="onStopRecordingClicked()"
	(onActivitiesPanelStopRecordingClicked)="onStopRecordingClicked()"
	(onActivitiesPanelDeleteRecordingClicked)="onDeleteRecordingClicked($event)"
	(onActivitiesPanelStartBroadcastingClicked)="onStartBroadcastingClicked($event)"
	(onActivitiesPanelStopBroadcastingClicked)="onStopBroadcastingClicked()"
	(onToolbarStopBroadcastingClicked)="onStopBroadcastingClicked()"
	(onNodeCrashed)="onNodeCrashed()"
>
</ov-videoconference>
```

You will need to request for OpenVidu Tokens to the backend and pass them to the `ov-videoconference` component. You can also pass the recording list and the recording error to the component if the recording features are enabled.

> You can see all the inputs offered by `VideoconferenceComponent` [here](api/openvidu-angular/components/VideoconferenceComponent.html)

Once the tokens are passed to the component, the videoconference will be automatically created and the users will be able to join the session.

You also have the possibility to customize the application listening to the events emitted by the `ov-videoconference` component. <br> For example, you can listen to the `onToolbarLeaveButtonClicked` event to know when the user has clicked on the leave button and do something else.

> You can see all the events offered by `VideoconferenceComponent` [here](api/openvidu-angular/components/VideoconferenceComponent.html#outputs).

<br>

---

## Configuration parameters for OpenVidu Call backend

| Parameter                 | Description                                                                                                               | Default value               |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| **`SERVER_PORT`**         | Number that indicates the port where http server will listen                                                              | `5000`                      |
| **`OPENVIDU_URL`**        | The URL where OpenVidu Server will be reachable.                                                                          | `"http://localhost:4443"`   |
| **`OPENVIDU_SECRET`**     | Secret used to connect to OpenVidu Server.                                                                                | `"MY_SECRET"`               |
| **`CALL_PRIVATE_ACCESS`** | Whether to enable the authentication feature or not.                                                                      | `"ENABLED"`                 |
| **`CALL_USER`**           | Username used for login to the OpenVidu Call session. This property has effect only if is `CALL_PRIVATE_ACCESS='ENABLED'` | `"admin"`                   |
| **`CALL_SECRET`**         | Secret used for login to the OpenVidu Call session. This property has effect only if is `CALL_PRIVATE_ACCESS='ENABLED'`   | _Same as `OPENVIDU_SECRET`_ |
| **`CALL_ADMIN_SECRET`**   | Secret used for login to the OpenVidu Call admin dashboard.                                                               | _Same as `OPENVIDU_SECRET`_ |
| **`CALL_RECORDING`**      | Whether to enable the recording features or not.                                                                          | `"ENABLED"`                 |
| **`CALL_BROADCAST`**      | Whether to enable the broadcast features or not.                                                                          | `"ENABLED"`               |

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
| **HEADERS** | Authorization: Basic `EncodeBase64(CALL_USER:<CALL_SECRET>)`. Only if is `CALL_PRIVATE_ACCESS='ENABLED'` |
| **REQUEST BODY** | `{"sessionId":"session_id", "nickname":"openvidu_name"}` |
| **200 OK RETURN VALUE** | A JSON object with the Connection tokens and recording information.<br>For example: `{"cameraToken": "wss://localhost:4443?sessionId=ses_JM9v0nfD1l&token=tok_MIYGGzuDQb8Xf1Qd", "screenToken": "wss://localhost:4443?sessionId=ses_JM2v0nfD1l&token=tok_MIYGGduDQb8Xf1Qd", "recordings": [], "recordingEnabled": true}` |

| 2. List all recordings ||
| - ||
| **HTTP METHOD** | GET |
| **HEADERS** | Authorization: Basic `EncodeBase64(CALL_USER:<CALL_SECRET>)`. Only if is `CALL_PRIVATE_ACCESS='ENABLED'` |
| **URL** | https://localhost:5000/recordings |
| **200 OK RETURN VALUE** | The list of all [Recording](reference-docs/REST-API/#the-recording-object) objects associated to the session |

| 3. Start recording ||
| - ||
| **HTTP METHOD** | POST |
| **HEADERS** | Authorization: Basic `EncodeBase64(CALL_USER:<CALL_SECRET>)`. Only if is `CALL_PRIVATE_ACCESS='ENABLED'` |
| **URL** | https://localhost:5000/recordings/start |
| **REQUEST BODY** | `{"sessionId": "session_name"}` |
| **200 OK RETURN VALUE** | The [Recording](reference-docs/REST-API/#the-recording-object) object |

| 4. Stop recording ||
| - ||
| **HTTP METHOD** | POST |
| **HEADERS** | Authorization: Basic `EncodeBase64(CALL_USER:<CALL_SECRET>)`. Only if is `CALL_PRIVATE_ACCESS='ENABLED'` |
| **URL** | https://localhost:5000/recordings/stop |
| **REQUEST BODY** | `{"sessionId": "session_name"}` |
| **200 OK RETURN VALUE** | The list of all [Recording](reference-docs/REST-API/#the-recording-object) objects associated to the session |

| 5. Delete a recording ||
| - ||
| **HTTP METHOD** | DELETE |
| **HEADERS** | Authorization: Basic `EncodeBase64(CALL_USER:<CALL_SECRET>)`. Only if is `CALL_PRIVATE_ACCESS='ENABLED'` |
| **URL** | https://localhost:5000/recordings/delete/`RECORDING_ID` |
| **200 OK RETURN VALUE** | The list of all [Recording](reference-docs/REST-API/#the-recording-object) objects associated to the session |

| 6. Get a recording ||
| - ||
| **HTTP METHOD** | GET |
| **HEADERS** | Authorization: Basic `EncodeBase64(CALL_USER:<CALL_SECRET>)`. Only if is `CALL_PRIVATE_ACCESS='ENABLED'` |
| **URL** | https://localhost:5000/recordings/`RECORDING_ID` |
| **206 Partial Content RETURN VALUE** | Byterange used to allow large files to be downloaded or requested progressively |


| 7. Start broadcast ||
| - ||
| **HTTP METHOD** | POST |
| **HEADERS** | Authorization: Basic `EncodeBase64(CALL_USER:<CALL_SECRET>)`. Only if is `CALL_PRIVATE_ACCESS='ENABLED'` |
| **URL** | https://localhost:5000/broadcasts/start |
| **REQUEST BODY** | `{"broadcastUrl": "your_broadcast_url" }` |
| **200 OK RETURN VALUE** | `{"id": "broadcast_id", "status": "STARTED", "broadcastAvailable": true  }` |

| 8. Stop broadcast ||
| - ||
| **HTTP METHOD** | DELETE |
| **HEADERS** | Authorization: Basic `EncodeBase64(CALL_USER:<CALL_SECRET>)`. Only if is `CALL_PRIVATE_ACCESS='ENABLED'` |
| **URL** | https://localhost:5000/broadcasts/stop |
| **200 OK RETURN VALUE** | `{"id": "broadcast_id", "status": "STOPPED", "broadcastAvailable": true  }` |


| 9. Call login ||
| - ||
| **HTTP METHOD** | POST |
| **URL** | https://localhost:5000/login |
| **REQUEST BODY** | Username and password for doing login in OpenVidu session `{"username":"user", "password": "xxx"}` |
| **200 OK RETURN VALUE** | |

| 10. Admin login ||
| - ||
| **HTTP METHOD** | POST |
| **URL** | https://localhost:5000/admin/login |
| **REQUEST BODY** | Password for doing login in Admin dashboard `{"password": "xxx"}` |
| **200 OK RETURN VALUE** | A list of all [Recording](reference-docs/REST-API/#the-recording-object) objects available in the entire OpenVidu deployment |

| 11. Admin logout ||
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

1. In directory `openvidu-call/.`, execute:

```bash
docker build -f docker/Dockerfile.node -t <your-tag-name> .
```

</div>

<div id="java" class="lang-tabs-content" style="display:none" markdown="1">

1. In directory `openvidu-call/.`, execute:

```bash
docker build -f docker/Dockerfile.java -t <your-image-name> .
```

</div>
</div>

<br>

2. After that, you can run the Docker container:

```
docker run -p <your-port>:5000 -e OPENVIDU_URL=<your-openvidu-url> -e OPENVIDU_SECRET=<your-secret> <your-image-name>
```

3. Go to `http://localhost:your-port` to test the app

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

1. Build OpenVidu Call frontend. Set as `BASE_HREF` the desired value depending on the path your application will be accessible:

```bash
cd openvidu-call-front
npm run prod:build BASE_HREF
```

2. Build OpenVidu Call backend:

```bash
cd ../openvidu-call-back
npm run build
```

3. You will find the app built in `dist` directory. You can use Node to launch it:

```bash
cd dist/
node openvidu-call-server.js
```

</div>

<div id="java" class="lang-tabs-content" style="display:none" markdown="1">

1. Build OpenVidu Call frontend. Set as `BASE_HREF` the desired value depending on the path your application will be accessible.

```bash
cd openvidu-call-front
npm run prod:build-java BASE_HREF
```

2. Build OpenVidu Call backend:

```bash
cd ../openvidu-call-back-java
mvn clean package
```

3. You will find the app built in `openvidu-call/openvidu-call-back-java/target/` directory. You can use Java to launch it:

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
