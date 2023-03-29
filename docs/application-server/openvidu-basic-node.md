# openvidu-basic-node

<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-basic-node" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

This is a minimal OpenVidu server application sample built for Node with [Express](https://expressjs.com/){:target="_blank"}.
It internally uses [openvidu-node-client SDK](https://docs.openvidu.io/en/stable/reference-docs/openvidu-node-client/).

## Running this application

#### Prerequisites
To run this application you will need **Node**:

- [Node](https://nodejs.org/es/download/){:target="_blank"}

#### Download repository

```bash
git clone https://github.com/OpenVidu/openvidu-tutorials.git -b v2.26.0
cd openvidu-tutorials/openvidu-basic-node
```

#### Install dependencies

```bash
npm install
```

#### Run application

```bash
node index.js
```

## Understanding the code

The application is a simple Express app with a single controller file `index.js` that exports two endpoints:

- `/api/sessions` : Initialize a session.
- `/api/sessions/:sessionId/connections` : Create a connection.

> You can get more information about these endpoints in the [Application Server Endpoints](application-server/#rest-endpoints) section.

Let's see the code of the controller:

```javascript
var cors = require("cors");
var app = express();

// Environment variable: PORT where the node server is listening
var SERVER_PORT = process.env.SERVER_PORT || 5000;
// Environment variable: URL where our OpenVidu server is listening
var OPENVIDU_URL = process.env.OPENVIDU_URL || 'http://localhost:4443';
// Environment variable: secret shared with our OpenVidu server
var OPENVIDU_SECRET = process.env.OPENVIDU_SECRET || 'MY_SECRET';

// Enable CORS support
app.use(
  cors({
    origin: "*",
  })
);

var server = http.createServer(app);
var openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);

// Serve application
server.listen(SERVER_PORT, () => {
  console.log("Application started on port: ", SERVER_PORT);
  console.warn('Application server connecting to OpenVidu at ' + OPENVIDU_URL);
});
```

Starting by the top, the `index.js` file has the following fields:

- `cors`: allows the application to be accessed from any domain.
- `app`: the Express application.
- `server`: the HTTP server.
- `openvidu`: the `OpenVidu` object that will be used to interact with the OpenVidu deployment. It is initialized with the `OPENVIDU_URL` and `OPENVIDU_SECRET` environment variables.
- `SERVER_PORT`: the port where the application will be listening.
- `OPENVIDU_URL`: the URL of the OpenVidu deployment.
- `OPENVIDU_SECRET`: the secret of the OpenVidu deployment.

<br>

#### Initialize session endpoint

The first endpoint allows us to initialize a new [OpenVidu Session](/developing-your-video-app/#session). The code of this endpoint is the following:

```javascript
app.post("/api/sessions", async (req, res) => {
  var session = await openvidu.createSession(req.body);
  res.send(session.sessionId);
});
```

We build the `Session` object using the `OpenVidu` object and the parameters received from the request body.

Finally, the session identifier is returned in the response body.

<br>

#### Create connection endpoint

The second endpoint allows us to create a new [OpenVidu Connection](/developing-your-video-app/#connection) in the session:

```javascript
app.post("/api/sessions/:sessionId/connections", async (req, res) => {
  var session = openvidu.activeSessions.find(
    (s) => s.sessionId === req.params.sessionId
  );
  if (!session) {
    res.status(404).send();
  } else {
    var connection = await session.createConnection(req.body);
    res.send(connection.token);
  }
});
```

After checking if OpenVidu Session exists, the `Connection` object is built using the `Session` object and the parameters received from the request body.

Finally, the `Token` associated to the `Connection` is returned in the response body. We can use this token in [openviu-browser SDK](reference-docs/openvidu-browser/) to connect the user to the Session.
