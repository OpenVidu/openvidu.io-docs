
# openvidu-basic-java

<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-basic-java" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

This is a minimal OpenVidu server application sample built for Java with [Spring Boot](https://spring.io/){:target="_blank"}.
It internally uses [openvidu-java-client SDK](reference-docs/openvidu-java-client/).

## Running this application

#### Prerequisites
To run this application you will need **Java** and **Maven**:

- [Java (>=11)](https://www.java.com/en/download/manual.jsp){:target="_blank"}
- [Maven](https://maven.apache.org){:target="_blank"}

#### Download repository

```bash
git clone git@github.com:OpenVidu/openvidu-tutorials.git
cd openvidu-tutorials/openvidu-basic-java
```

#### Run application

```bash
mvn spring-boot:run
```

## Understanding the code

The application is a simple Spring Boot application with a single controller class `Controller.java` that exports two endpoints:

- `/api/sessions` : Initialize a session.
- `/api/sessions/:sessionId/connections` : Create a connection.

> You can get more information about these endpoints in the [Application Server Endpoints](application-server/#rest-endpoints) section.


Let's see the code of the controller:

```java
@CrossOrigin(origins = "*")
@RestController
public class Controller {

@Value("${OPENVIDU_URL}")
	private String OPENVIDU_URL;

	@Value("${OPENVIDU_SECRET}")
	private String OPENVIDU_SECRET;

	private OpenVidu openvidu;

	@PostConstruct
	public void init() {
		this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
	}

	...
}
```

Starting by the top, the `Controller` class has the following annotations:

- `@CrossOrigin(origins = "*")`: Allows the application to be accessed from any domain.
- `@RestController`: Marks the class as a controller where every method returns a domain object instead of a view.

Going deeper, the `Controller` class has the following fields:

- `OPENVIDU_URL`: the URL of the OpenVidu deployment. It is injected from the environment variable `OPENVIDU_URL` using the `@Value("${OPENVIDU_URL}")` annotation.

- `OPENVIDU_SECRET`: the secret of the OpenVidu deployment. It is injected from the environment variable `OPENVIDU_SECRET` using the `@Value("${OPENVIDU_SECRET}")` annotation.

- `openvidu`: the `OpenVidu` object that will be used to interact with the the OpenVidu deployment. It is initialized in the `init()` method marked with the `@PostConstruct` annotation.

<br>

#### Initialize session endpoint

The first endpoint allows us to initialize a new [OpenVidu Session](/developing-your-video-app/#session). The code of this endpoint is the following:

```java
@CrossOrigin(origins = "*")
@RestController
public class Controller {
	...

	/**
	 * @param params The Session properties
	 * @return The Session ID
	 */
	@PostMapping("/api/sessions")
	public ResponseEntity<String> initializeSession(@RequestBody(required = false) Map<String, Object> params)
			throws OpenViduJavaClientException, OpenViduHttpException {
		SessionProperties properties = SessionProperties.fromJson(params).build();
		Session session = openvidu.createSession(properties);
		return new ResponseEntity<>(session.getSessionId(), HttpStatus.OK);
	}
}
```

We build the `SessionProperties` object using the parameters received from the request body. This property is necessary to configure the `Session` object.

Finally, the session identifier is returned in the response body.

<br>

#### Create connection endpoint

The second endpoint allows us to create a new [OpenVidu Connection](/developing-your-video-app/#connection) in the session:

```java
@CrossOrigin(origins = "*")
@RestController
public class Controller {
	...

	/**
	 * @param sessionId The Session in which to create the Connection
	 * @param params    The Connection properties
	 * @return The Token associated to the Connection
	 */
	@PostMapping("/api/sessions/{sessionId}/connections")
	public ResponseEntity<String> createConnection(@PathVariable("sessionId") String sessionId,
			@RequestBody(required = false) Map<String, Object> params)
			throws OpenViduJavaClientException, OpenViduHttpException {
		Session session = openvidu.getActiveSession(sessionId);
		if (session == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
		Connection connection = session.createConnection(properties);
		return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
	}
}

```

After checking if OpenVidu Session exists, we build the `ConnectionProperties` object from the request body.
After that, we use the `Session` object (retrieved from the `OpenVidu` object using the `sessionId` path variable) to create a new `Connection` object.

Finally, the token associated to the `Connection` is returned in the response body. We can use this token in [openviu-browser SDK](reference-docs/openvidu-browser/) to connect the user to the Session.
