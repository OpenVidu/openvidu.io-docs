# openvidu-basic-python

<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-basic-python" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

This is a minimal OpenVidu server application sample built for Python with [Flask](https://flask.palletsprojects.com/){:target="_blank"}.
It internally uses the [OpenVidu REST API](reference-docs/REST-API/).


## Running this application

#### Prerequisites
To run this application you will need **Python 3**:

- [Python 3](https://www.python.org/downloads/){:target="_blank"}

#### Download repository

```bash
git clone https://github.com/OpenVidu/openvidu-tutorials.git -b v2.31.0
cd openvidu-tutorials/openvidu-basic-python
```

#### Create a python3 environment and activate it


```bash
python3 -m venv venv
. venv/bin/activate
```

#### Install dependencies

```bash
pip install -r requirements.txt
```

#### Run application

```bash
python3 app.py
```

## Understanding the code

The application is a simple Flask application with a single controller file `app.py` that exports two endpoints:

- `/api/sessions` : Initialize a session.
- `/api/sessions/:sessionId/connections` : Create a connection.

> You can get more information about these endpoints in the [Application Server Endpoints](application-server/#rest-endpoints) section.

Let's see the code of the controller:

```python
app = Flask(__name__)
# Enable CORS support
cors = CORS(app, resources={r"/*": {"origins": "*"}})

# Load env variables
SERVER_PORT = os.environ.get("SERVER_PORT")
OPENVIDU_URL = os.environ.get("OPENVIDU_URL")
OPENVIDU_SECRET = os.environ.get("OPENVIDU_SECRET")


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=SERVER_PORT)
```

Starting by the top, the `app.py` file has the following fields:

- `app`: Flask application.
- `cors`: CORS support for Flask application.
- `SERVER_PORT`: port of the application server.
- `OPENVIDU_URL`: the URL of your OpenVidu deployment.
- `OPENVIDU_SECRET`: the secret of your OpenVidu deployment.

<br>

#### Initialize session endpoint

The first endpoint allows us to initialize a new [OpenVidu Session](developing-your-video-app/#session). The code of this endpoint is the following:

```python
@app.route("/api/sessions", methods=['POST'])
def initializeSession():
    try:
        body = request.json if request.data else {}
        response = requests.post(
            OPENVIDU_URL + "openvidu/api/sessions",
            verify=False,
            auth=("OPENVIDUAPP", OPENVIDU_SECRET),
            headers={'Content-type': 'application/json'},
            json=body
        )
        response.raise_for_status()
        return response.json()["sessionId"]
    except requests.exceptions.HTTPError as err:
        if (err.response.status_code == 409):
            # Session already exists in OpenVidu
            return request.json["customSessionId"]
        else:
            return err
```

The endpoint creates a new Session using the [OpenVidu REST API](reference-docs/REST-API/) and returns the `sessionId` of the new session. If the request brought a `customSessionId` parameter and that session already existed in the OpenVidu deployment (that's the `409 CONFLICT` error), then the endpoint simply returns the same `customSessionId`. At this point the Session is ready to create Connections, whether it is a newly created Session or an already existing one.

<br>

#### Create connection endpoint

The second endpoint allows us to create a new [OpenVidu Connection](developing-your-video-app/#connection) in the session:

```python
@app.route("/api/sessions/<sessionId>/connections", methods=['POST'])
def createConnection(sessionId):
    body = request.json if request.data else {}
    return requests.post(
        OPENVIDU_URL + "openvidu/api/sessions/" + sessionId + "/connection",
        verify=False,
        auth=("OPENVIDUAPP", OPENVIDU_SECRET),
        headers={'Content-type': 'application/json'},
        json=body
    ).json()["token"]

```

The endpoint creates a new Connection using the [OpenVidu REST API](reference-docs/REST-API/) and returns the `token` of the new connection. We can use this token in [openviu-browser SDK](reference-docs/openvidu-browser/) to connect the user to the Session.
