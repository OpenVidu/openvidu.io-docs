# openvidu-library-react

<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-library-react" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

OpenVidu Library React is one of the simplest and quickest tutorials to add videoconference capabilities to your existing web application. This tutorial uses _openvidu-react_ library.

## Running this tutorial

To run the tutorial you need the three components stated in [OpenVidu application architecture](developing-your-video-app/#openvidu-application-architecture): an OpenVidu deployment, your server application and your client application. In this order:

#### 1. Run OpenVidu deployment

Using [Docker Engine](https://docs.docker.com/engine/){:target="_blank"}:

```bash
# WARNING: this container is not suitable for production deployments of OpenVidu
# Visit https://docs.openvidu.io/en/stable/deployment

docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-dev:2.25.0
```

#### 2. Run your preferred server application sample

For more information visit [Application server](application-server/).

<div id="application-server-wrapper"></div>
<script src="js/load-common-template.js" data-pathToFile="server-application-samples.html" data-elementId="application-server-wrapper" data-runAnchorScript="false" data-useCurrentVersion="true"></script>

#### 3. Run the client application tutorial

You need [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm){:target="_blank"} to serve the application. Check it with the following command:

```bash
npm -v
```

To serve the tutorial:

```bash
# Using the same repository openvidu-tutorials from step 2

cd openvidu-tutorials/openvidu-library-react
npm install
npm start
```

Go to [`http://localhost:3000`](http://localhost:3000){:target="_blank"} to test the app once the server is running.

> To test the application with other devices in your network, visit this **[FAQ](troubleshooting/#3-test-applications-in-my-network-with-multiple-devices)**

<div class="row no-margin row-gallery">
	<div class="col-md-6">
		<a data-fancybox="gallery" data-type="image" class="fancybox-img" href="img/demos/openvidu-library-react1.png">
            <img class="img-responsive" src="img/demos/openvidu-library-react1.png">
        </a>
	</div>
	<div class="col-md-6">
		<a data-fancybox="gallery" data-type="image" class="fancybox-img" href="img/demos/openvidu-library-react2.png">
            <img class="img-responsive" src="img/demos/openvidu-library-react2.png">
        </a>
	</div>
</div>

## Understanding the code

This is a basic React project generated with `npx create-react-app`, and therefore you will see lots of configuration files and other stuff that doesn't really matter to us. We will focus on the following files under `src/` folder

-   `App.js`: defines _App Component_, main component of the app. It contains the JSX code and the functionalities for for handling the the events received from _openvidu-react_.
-   `App.css`: CSS for App Component.

---

#### We must include _openvidu-react_ and _axios_ in our app:

1) First of all, you need to install **_openvidu-react_** :

```bash
npm install openvidu-react --save
```

After that, include **OpenViduSession** in `App.js` file:

```javascript
import OpenViduSession from 'openvidu-react';
```

2) Secondly, you need to install **_axios_** to perform HTTP requests.

```bash
npm install axios --save
```
And include it in `App.js`:

```javascript
import axios from 'axios';
```

<hr>

#### Configuring OpenVidu React

##### App.js

The template for this component is divided into two parts: a form to set the information of the participant and session to connect to, and the OpenViduSession component itself. If there is no session defined yet, the form will be shown. The moment there is a session object defined, the OpenViduSession component will replace the form.

This is the form:

```html
<div id="join">
    <div id="join-dialog">
        <h1> Join a video session </h1>
        <form onSubmit={this.joinSession}>
            <p>
                <label>Participant: </label>
                <input
                    type="text"
                    id="userName"
                    value={myUserName}
                    onChange={this.handleChangeUserName}
                    required
                />
            </p>
            <p>
                <label> Session: </label>
                <input
                    type="text"
                    id="sessionId"
                    value={mySessionId}
                    onChange={this.handleChangeSessionId}
                    required
                />
            </p>
            <p>
                <input name="commit" type="submit" value="JOIN" />
            </p>
        </form>
    </div>
</div>
```

Method `joinSession()` triggered from the form is in charge of initializing the session and getting a token for it.

This is the OpenViduSession component:

```javascript
<OpenViduSession
    id="opv-session"
    sessionName={mySessionId}
    user={myUserName}
    token={token}
    joinSession={this.handlerJoinSessionEvent}
    leaveSession={this.handlerLeaveSessionEvent}
    error={this.handlerErrorEvent}
/>
```

You can configure the OpenViduSession component with these parameters:

-   `sessionName`: the session name that will be displayed inside the component.
-   `user`: the nickname that the user will have in the session.
-   `token`: the retrieved OpenVidu token.

Moreover, OpenViduSession emits events `leaveSession`, `joinSession` and `error`. We handle them in these functions:

```javascript
handlerJoinSessionEvent(event) {
    // Do something
}

handlerLeaveSessionEvent(event) {
    // Do something
}

handlerErrorEvent(event) {
    // Do something
}
```

---

#### Get an OpenVidu token

We are ready to join the session. But we still need a token to get access to it, so we ask for it to the [server application](application-server/). The server application will in turn request a token to the OpenVidu deployment. If you have any doubts about this process, review the [Basic Concepts](developing-your-video-app/#basic-concepts).

In `App.js` file method `joinSession` will trigger the request for a token whenever the user clicks on the "JOIN" button. After a successful token retrieval we store it in the application's state.

```javascript
async joinSession(event) {
    event.preventDefault();
    if (this.state.mySessionId && this.state.myUserName) {
        const token = await this.getToken();
        this.setState({
            token: token,
            session: true,
        });
    }
}
```

This is the piece of code in charge of finally retrieving a token from the application server. The tutorial uses `axios` library to perform the necessary [HTTP requests](application-server/#rest-endpoints).

```javascript
async getToken() {
    const sessionId = await this.createSession(this.state.mySessionId);
    return await this.createToken(sessionId);
}

async createSession(sessionId) {
    const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions', { customSessionId: sessionId }, {
        headers: { 'Content-Type': 'application/json', },
    });
    return response.data; // The sessionId
}

async createToken(sessionId) {
    const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections', {}, {
        headers: { 'Content-Type': 'application/json', },
    });
    return response.data; // The token
}
```

The moment the application's state has the `token` property defined and the `session` property set to true, the OpenViduSession component will be rendered and the user will connect to the Session.

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js"></script>
<script type='text/javascript' src='js/fancybox-setup.js'></script>
