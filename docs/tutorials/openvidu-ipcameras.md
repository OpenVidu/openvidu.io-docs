# openvidu-ipcameras
<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-ipcameras" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

An OpenVidu application with a Java backend. It makes use of _openvidu-java-client SDK_ to communicate with the OpenVidu deployment. It serves a single HTML page (generated with [Thymeleaf](http://www.thymeleaf.org/)) where users can subscribe and see a collection of IP cameras.

<div class="row">
    <div class="pro-gallery" style="margin: 20px 0 15px 0">
        <a data-fancybox="gallery-pro1" data-type="image" class="fancybox-img" href="img/tutorials/openvidu-ipcameras.png">
          <img class="img-responsive" style="margin: auto; max-height: 500px" src="img/tutorials/openvidu-ipcameras.png"/>
        </a>
    </div>
</div>

## Running this tutorial

To run the tutorial you need the three components stated in [OpenVidu application architecture](developing-your-video-app/#openvidu-application-architecture): an OpenVidu deployment, your server application and your client application. In this order:

#### 1. Run OpenVidu deployment

Using [Docker Engine](https://docs.docker.com/engine/){:target="_blank"}:

```bash
# WARNING: this container is not suitable for production deployments of OpenVidu
# Visit https://docs.openvidu.io/en/stable/deployment

docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-dev:2.25.0
```

#### 2. Run the server application and the client application

You need [Java](https://www.java.com/en/download/){:target="_blank"} and [Maven](https://maven.apache.org/install.html){:target="_blank"}. Check them with:

```
java --version
mvn --version
```

Clone the repo:

```bash
git clone https://github.com/OpenVidu/openvidu-tutorials.git -b v2.25.0
```

Run the application:

```bash
cd openvidu-tutorials/openvidu-ipcameras
mvn package exec:java
```

Go to _[`https://localhost:8080`](https://localhost:8080){:target="_blank"}_ to test the app once the server is running.

> To test the application with other devices in your network, visit this **[FAQ](troubleshooting/#3-test-applications-in-my-network-with-multiple-devices)**. Ignore [step 2](troubleshooting/#2-run-your-preferred-server-application-sample) and [step 3](#3-run-the-client-application-tutorial-changing-the-application_server_url), as the application already includes a backend and the frontend doesn't need to communicate with a different application server.


## Understanding the code

This is a very basic web application with a pretty simple JS/HTML/CSS frontend and a straightforward Java backend that serves HTML files, building the templates with the help of [Thymeleaf](http://www.thymeleaf.org/){:target="_blank"}.

This application provides the...

- **Backend**: SpringBoot app with the following classes (`src/main/java` path, `io.openvidu.ipcameras` package)
	- `App.java` : entrypoint for the app
	- `MyRestController.java` : controller for managing the OpenVidu session and publishing IP cameras<br><br>

- **Frontend templates**: Plain JS/HTML/CSS files served by the backend (`src/main/resources/templates`)
	- `index.html` : template with the subscribe / unsubscribe form<br><br>

- **Frontend static files** (`src/main/resources/static`)
 	- `openvidu-browser-VERSION.js` : openvidu-browser library. You don't have to manipulate this file
	- `style.css` : some CSS classes to style the templates

The application allows subscribing to the IP cameras collection from the web page. Let's describe the code that goes into action.

---

### 1) Login

At path `/` a login form will be displayed, providing a very simple password authentication:

<p align="center">
  <img class="img-responsive" style="padding: 25px 0;" src="img/docs/tutorials/ipcameras_index.png">
</p>

### 2) Subscribe to the IP cameras

Clicking on the subscribe button you will subscribe to the IP cameras collection. These cameras are initialized on the [App.java](https://github.com/OpenVidu/openvidu-tutorials/blob/master/openvidu-ipcameras/src/main/java/io/openvidu/ipcameras/App.java#L33-L35){:target="_blank"} file.

```java
static Map<String, String> IP_CAMERAS = new HashMap<String, String>() {
	{
		put("Amsterdam", "http://92.110.185.114:8080/mjpg/video.mjpg");
		put("Czech Republic", "http://185.137.146.14:80/mjpg/video.mjpg");
		put("Japan bridge", "http://211.132.61.124:80/mjpg/video.mjpg");
	}
};
```

After the subscribe button is clicked, the subscribe method (hosted in [MyRestController.java](https://github.com/OpenVidu/openvidu-tutorials/blob/master/openvidu-ipcameras/src/main/java/io/openvidu/ipcameras/MyRestController.java){:target="_blank"}) is called. This method will:

1. Create an OpenVidu Session.
2. Publish the IP cameras defined in the `IP_CAMERAS` map.
3. Create a Connection and return its token for the browser user.

```java
@RequestMapping(value = "/")
public String subscribe(@RequestParam(name = "credentials", required = false) String credentials, Model model)
		throws OpenViduJavaClientException, OpenViduHttpException {

	if (credentials == null) {
		return "index";
	}
	try {
		checkCredentials(credentials);
	} catch (Exception e) {
		return generateError(model, "Wrong credentials");
	}

	// Create our surveillance session if not available yet
	if (OV == null || session == null) {
		try {
			createOpenViduSession();
			publishCameras();
		} catch (OpenViduJavaClientException | OpenViduHttpException e) {
			return generateError(model,
					"Error sending request to OpenVidu Server: " + e.getCause() + ". " + e.getMessage());
		}
	}

	// Create a Connection for the client
	ConnectionProperties connectionProperties = new ConnectionProperties.Builder()
			.type(ConnectionType.WEBRTC)
			.role(OpenViduRole.SUBSCRIBER)
			.build();
	String token = null;
	try {
		token = this.session.createConnection(connectionProperties).getToken();
	} catch (OpenViduHttpException e) {
		if (e.getStatus() == 404) {
			// Session was closed in openvidu-server. Re-create it
			createOpenViduSession();
			publishCameras();
			token = this.session.createConnection().getToken();
		} else {
			return generateError(model,
					"Error creating Connection for session " + SESSION_ID + ": " + e.getMessage());
		}
	} catch (OpenViduJavaClientException e) {
		return generateError(model,
				"Error creating Connection for session " + SESSION_ID + ": " + e.getMessage());
	}

	model.addAttribute("token", token);
	return "index";
}
```

The highlights of the code are the creation of the two Connection objects in the Session. To publish each IP camera in method `publishCameras()`:

```java
ConnectionProperties connectionProperties = new ConnectionProperties.Builder()
	.type(ConnectionType.IPCAM)
	.data(cameraName)
	.rtspUri(cameraUri)
	.adaptativeBitrate(true)
	.onlyPlayWithSubscribers(true)
	.build();
session.createConnection(connectionProperties);
```

To create a Connection for the browser user and return a token to the client side:

```java
ConnectionProperties connectionProperties = new ConnectionProperties.Builder()
	.type(ConnectionType.WEBRTC)
	.role(OpenViduRole.SUBSCRIBER)
	.build();
String token = null;
try {
	token = this.session.createConnection(connectionProperties).getToken();
} catch ( ... )
```

## Deploying openvidu-ipcameras

#### 1) Build the docker image

Under the root project folder, you can see the `openvidu-ipcameras/docker/` directory. Here it is included all the required files yo make it possible the deployment with OpenVidu.

First of all, you will need to create the **openvidu-ipcameras** docker image. Under `openvidu-ipcameras/docker/` directory you will find the `create_image.sh` script. This script will create the docker image with the openvidu-ipcameras server and the static files.


```bash
./create_image.sh openvidu/my-openvidu-ipcameras-demo:X.Y.Z
```

This script will create an image named `openvidu/my-openvidu-ipcameras-demo:X.Y.Z`. This name will be used in the next step.


#### 2) Deploy the docker image

Time to deploy the docker image. You can follow the [Deploy OpenVidu based application with Docker](/deployment/deploying-openvidu-apps/#with-docker) guide for doing this.

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js"></script>
<script type='text/javascript' src='js/fancybox-setup.js'></script>