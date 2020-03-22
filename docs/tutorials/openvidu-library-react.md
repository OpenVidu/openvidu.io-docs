# openvidu-library-react

<a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-library-react" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

OpenVidu Library React is one of the simplest and quickest tutorials to add videoconference capabilities to your existing web application. This tutorial uses _openvidu-react_ library.

## Running this tutorial

1) Clone the repo:

```bash
git clone https://github.com/OpenVidu/openvidu-tutorials.git
```

2) Run the tutorial:

```bash
cd openvidu-tutorials/openvidu-library-react
npm install
npm start
```

3) _openvidu-server_ and _Kurento Media Server_ must be up and running in your development machine. The easiest way is running this Docker container which wraps both of them (you will need [Docker CE](https://store.docker.com/search?type=edition&offering=community){:target="_blank"}):

```bash
docker run -p 4443:4443 --rm -e openvidu.secret=MY_SECRET openvidu/openvidu-server-kms:2.12.0
```

4) Go to _[`localhost:3000`](http://localhost:3000){:target="_blank"}_ to test the app once the server is running. The first time you use the docker container, an alert message will suggest you accept the self-signed certificate of _openvidu-server_ when you first try to join a video-call.

> If you are using **Windows**, read this **[FAQ](troubleshooting/#3-i-am-using-windows-to-run-the-tutorials-develop-my-app-anything-i-should-know){:target="_blank"}** to properly run the tutorial

> To learn **some tips** to develop with OpenVidu, check this **[FAQ](troubleshooting/#2-any-tips-to-make-easier-the-development-of-my-app-with-openvidu){:target="_blank"}**


<div class="row no-margin row-gallery">
	<div class="col-md-6">
		<a data-fancybox="gallery" href="img/demos/openvidu-library-react1.png">
		<img class="img-responsive" src="img/demos/openvidu-library-react1.png">
	</a>
	</div>
	<div class="col-md-6">
		<a data-fancybox="gallery" href="img/demos/openvidu-library-react2.png">
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

After that, you must include **OpvSession** in `App.js` file:

```javascript
import OpvSession from 'openvidu-react';
```

2) Secondly, you need to install **_axios_** that allows you to do HTTP requests:

```bash
npm install axios --save
```
And include it in `Àpp.js`:

```javascript
import axios from 'axios';
```

<hr>

#### Configuring OpenVidu React

##### App.js

As you can see here, you can use `<OpvSession></OpvSession>` component to embed openvidu session in your application in a very easy way. Our component will start hidden:

```html
<div>
    {this.state.session === undefined ? (
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
    ) : (
        <div id="session">
            <OpvSession/>
        </div>
    )}
</div>
```

Method `joinSession()` gets the token which we provide to our component to connect to the session.

You can configure the OpvSession with these parameters:

-   `sessionName`: the session name that will be displayed inside the component
-   `user`: the nickname that the user will have in the session
-   `token`: the retrieved token from OpenVidu Server


```javascript
<OpvSession
    id="opv-session"
    sessionName={mySessionId}
    user={myUserName}
    token={token}
    joinSession={this.handlerJoinSessionEvent}
    leaveSession={this.handlerLeaveSessionEvent}
    error={this.handlerErrorEvent}
/>
```

Moreover, OpvSession emits events `leaveSession`, `joinSession` and `error`, we can handle them with the next code in `app.component.ts` file:

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

#### Get a _token_ from OpenVidu Server

<div style="
    display: table;
    border: 2px solid #0088aa9e;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 25px;
    padding: 5px 0 5px 0;
    background-color: rgba(0, 136, 170, 0.04);"><div style="display: table-cell; vertical-align: middle;">
    <i class="icon ion-android-alert" style="
    font-size: 50px;
    color: #0088aa;
    display: inline-block;
    padding-left: 25%;
"></i></div>
<div style="
    vertical-align: middle;
    display: table-cell;
    padding-left: 20px;
    padding-right: 20px;
    ">
	<strong>WARNING</strong>: This makes this tutorial an insecure application. We need to ask OpenVidu Server for a user token in order to connect to our session. <strong>This process should entirely take place in our server-side</strong>, not in our client-side. But due to the lack of an application backend in this tutorial, the JavaScript code itself will perform the POST operations to OpenVidu Server
</div>
</div>

```javascript
this.getToken().then((token) => {
    // Update the state with the token
});
```

In a production environment we would perform this operations in our application backend, by making use of the _[REST API](reference-docs/REST-API/){:target="_blank"}_, _[OpenVidu Java Client](reference-docs/openvidu-java-client/){:target="_blank"}_ or _[OpenVidu Node Client](reference-docs/openvidu-node-client/){:target="_blank"}_. Here we have implemented the POST requests to OpenVidu Server in a method `getToken()` that returns a Promise with the token. Without going into too much detail, this method performs two _ajax_ requests to OpenVidu Server, passing OpenVidu Server secret to authenticate them:

-   First ajax request performs a POST to `/api/sessions` (we send a `customSessionId` field to name the session with our `sessionName` value retrieved from HTML input)
-   Second ajax request performs a POST to `/api/tokens` (we send a `session` field to assign the token to this same session)

You can inspect this method in detail in the [GitHub repo](https://github.com/OpenVidu/openvidu-tutorials/blob/master/openvidu-webcomponent/web/app.js#L44){:target="_blank"}.

<hr>

## Extra features of OpenVidu React

#### Alternatives to connect to OpenVidu React

In the example above, **OpvSession** receives the `sessionName`, the `user` and the `token` parameters. If you want to let the OpvSession get the token for you, you can just dispense with the token and provide two more attributes to it. This is only meant for developing purposes, as you need to hardcode the secret of your OpenVidu Server in the JavaScript code:

```javascript
<OpvSession
  id="opv-session"
  sessionName={mySessionId}
  user={myUserName}
  openviduServerUrl={'https://localhost:4443'}
  openviduSecret={'MY_SECRET'}
  joinSession={this.handlerJoinSessionEvent}
  leaveSession={this.handlerLeaveSessionEvent}
  error={this.handlerErrorEvent}
/>
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