# openvidu-ipcameras
<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-ipcameras" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>


A secure OpenVidu sample app with a Java backend. It makes use of _openvidu-java-client_ to connect to OpenVidu Server. It serves a single HTML page (generated with [Thymeleaf](http://www.thymeleaf.org/)) where users can subscribe and see a collection of IP cameras.

## Understanding this tutorial

<p align="center">
  <img class="img-responsive" src="img/tutorials/openvidu-ipcameras.png">
</p>

OpenVidu is composed by the modules displayed on the image above.

- **openvidu-browser**: JavaScript library for the browser. It allows you to manage your video-calls straight away from your clients
- **openvidu-java-client**: server SDK for Java. Quick alternative to REST API
- **openvidu-server**: application to control Kurento Media Server
- **Kurento Media Server**: handles low level operations of media flow transmissions

## Running this tutorial

1) Clone the repo:

```bash
git clone https://github.com/OpenVidu/openvidu-tutorials.git
```

2) You will need _Java 8 SDK_. You can install it with:

```bash
sudo apt-get install -y openjdk-8-jdk
```

3) You will need _maven_ to build the project. You can install it with:

```bash
sudo apt-get install -y maven
```

4) Run the tutorial:

```bash
cd openvidu-tutorials/openvidu-ipcameras
mvn package exec:java
```

5) OpenVidu Platform service must be up and running in your development machine. The easiest way is running this Docker container which wraps both of them (you will need [Docker CE](https://store.docker.com/search?type=edition&offering=community){:target="_blank"}):

```bash
# WARNING: this container is not suitable for production deployments of OpenVidu Platform
# Visit https://docs.openvidu.io/en/stable/deployment

docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-server-kms:2.15.0
```

6) Go to _[`https://localhost:8080`](https://localhost:8080){:target="_blank"}_ to test the app once the server is running. The first time you use the docker container, an alert message will suggest you accept the self-signed certificate of _openvidu-server_ when you first try to join a video-call. To test two users in the same computer, use a standard window and an incognito window.

> If you are using **Windows**, read this **[FAQ](troubleshooting/#3-i-am-using-windows-to-run-the-tutorials-develop-my-app-anything-i-should-know){:target="_blank"}** to properly run the tutorial

> To learn **some tips** to develop with OpenVidu, check this **[FAQ](troubleshooting/#2-any-tips-to-make-easier-the-development-of-my-app-with-openvidu){:target="_blank"}**


## Understanding the code

This is a very basic web application with a pretty simple JS/HTML/CSS frontend and a straightforward Java backend that serves HTML files, building the templates with the help of [Thymeleaf](http://www.thymeleaf.org/){:target="_blank"}.

This application provides the

- **Backend**: SpringBoot app with the following classes (`src/main/java` path, `io.openvidu.ipcameras` package)
	- `App.java` : entrypoint for the app
	- `MyRestController.java` : controller for managing the token to enter the OpenVidu Session
	- `SimpleHttpClient.java` : Simple HTTP client able to send REST API requests to insecure servers (self-signed certificates are accepted)<br><br>

- **Frontend templates**: Plain JS/HTML/CSS files served by the backend (`src/main/resources/templates`)
	- `index.html` : template with the subscribe / unsubscribe form

- **Frontend static files** (`src/main/resources/static`)
 	- `openvidu-browser-VERSION.js` : openvidu-browser library. You don't have to manipulate this file
	- `style.css` : some CSS classes to style the templates

As the application allows subscribe to the IP cameras collection, let's describe the code that goes into action.

---

### 1 Login:

At path `/` a login form will be displayed:

<p align="center">
  <img class="img-responsive" style="padding: 25px 0;" src="img/docs/tutorials/ipcameras_index.png">
</p>

### 2 Subscribe to the IP cameras:

Clicking on the subscribe button you will subscribe to the IP cameras collection. These cameras are initialized on the [App.java](https://github.com/OpenVidu/openvidu-tutorials/blob/master/openvidu-ipcameras/src/main/java/io/openvidu/ipcameras/App.java#L33-L35) file.

```java
static Map<String, String> IP_CAMERAS = new HashMap<String, String>() {
	{
		put("Russian building", "rtsp://195.46.114.132/live/ch00_0");
		put("Wickenburg, Arizona", "rtsp://98.163.61.242/live/ch00_0");
		put("City", "rtsp://91.191.213.49:554/live_mpeg4.sdp");
	}
};
```

After the subscribe button is clicked, the subscribe method (hosted in [MyRestController.java](https://github.com/OpenVidu/openvidu-tutorials/blob/3f67046327360242e20c072e8cb0d5378b41fbd4/openvidu-ipcameras/src/main/java/io/openvidu/ipcameras/MyRestController.java#L47)) is called. This method will join to the OpenVidu session, creating a session token, and it will publish the IP cameras defined in the `IP_CAMERAS` variable.

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

	// Generate a token for the user
	String token = null;
	ConnectionProperties connectionProperties = new ConnectionProperties.Builder()
			.type(ConnectionType.WEBRTC)
			.role(OpenViduRole.PUBLISHER)
			.data("user_data")
			.build();
	try {
		token = this.session.createConnection(connectionProperties).getToken();
	} catch (OpenViduHttpException e) {
		if (e.getStatus() == 404) {
			// Session was closed in openvidu-server. Create it again
			createOpenViduSession();
			publishCameras();
			token = this.session.generateToken();
		} else {
			return generateError(model,
					"Error creating OpenVidu token for session " + SESSION_ID + ": " + e.getMessage());
		}
	} catch (OpenViduJavaClientException e) {
		return generateError(model,
				"Error creating OpenVidu token for session " + SESSION_ID + ": " + e.getMessage());
	}

	model.addAttribute("token", token);
	return "index";
}
```

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