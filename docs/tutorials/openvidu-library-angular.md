# openvidu-library-angular

<a href="#" target="_blank"><i class="icon ion-social-github"> Check it on GitHub</i></a>

OpenVidu Library Angular is one of the simplest and quickest tutorials to add videoconference capabilities to your existing web application. This tutorial uses _openvidu-angular_ library.

## Running this tutorial

1) Clone the repo:

```bash
git clone https://github.com/OpenVidu/openvidu-tutorials.git
```

2) You will need angular-cli (and of course NPM) to serve the Angular frontend. You can install it with the following command:

```bash
npm install -g @angular/cli@6.2.4
```

3) Run the tutorial:

```bash
cd openvidu-tutorials/openvidu-library-angular
npm install
ng serve
```

4) _openvidu-server_ and _Kurento Media Server_ must be up and running in your development machine. The easiest way is running this Docker container which wraps both of them (you will need [Docker CE](https://store.docker.com/search?type=edition&offering=community)):

```bash
docker run -p 4443:4443 --rm -e openvidu.secret=MY_SECRET openvidu/openvidu-server-kms:2.7.0
```

5) Go to [`localhost:4200`](http://localhost:4200) to test the app once the server is running. The first time you use the docker container, an alert message will suggest you accept the self-signed certificate of _openvidu-server_ when you first try to join a video-call.

<br>

> If you are using **Windows**, read this **[FAQ](/troubleshooting/#3-i-am-using-windows-to-run-the-tutorials-develop-my-app-anything-i-should-know)** to properly run the tutorial

> To learn **some tips** to develop with OpenVidu, check this **[FAQ](/troubleshooting#2-any-tips-to-make-easier-the-development-of-my-app-with-openvidu)**


<div class="row no-margin row-gallery">
	<div class="col-md-6">
		<a data-fancybox="gallery" href="/img/demos/openvidu-library-angular1.png">
		<img class="img-responsive" src="/img/demos/openvidu-library-angular1.png">
	</a>
	</div>
	<div class="col-md-6">
		<a data-fancybox="gallery" href="/img/demos/openvidu-library-angular2.png">
		<img class="img-responsive" src="/img/demos/openvidu-library-angular2.png">
	</a>
	</div>
</div>

## Understanding the code

This is a basic Angular project generated with angular-cli tool, and therefore you will see lots of configuration files and other stuff that doesn't really matter to us. We will focus on the following files under `src/app/` folder

-   `app.component.ts`: defines _AppComponent_, main component of the app. It contains the functionalities for for handling the the events received from _openvidu-angular_.
-   `app.component.html`: HTML for AppComponent.
-   `app.component.css`: CSS for AppComponent.

---

#### We must include these elements:


1) First of all, obviously you have to install openvidu-angular:
```
npm install openvidu-angular --save
```

2) [Angular Material](https://material.angular.io/guide/getting-started) is included in openvidu-angular neverthelesst you need to include a theme style in your application. If you're using the Angular CLI, you can add this to your `styles.css`:

```
@import "~@angular/material/prebuilt-themes/indigo-pink.css";
```

3) Finally, you need to include *Jquery* script, the *global variable* and *Material icons font* in the `index.html` file:

```html
<head>
<!--... other imports ...-->
  <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
  <script>
      var global = global || window;
  </script>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</head>
```


#### app.module.ts

Inside of the `app.module.ts` you must import _OpenviduSessionModule_ from _openvidu-angular_:

```javascript
import { OpenviduSessionModule } from 'openvidu-angular';
```

Moreover, you need to include _OpenviduSessionModule_ inside of _imports_ section of **NgModule**:

```
imports: [
    BrowserModule,
    FormsModule,
    OpenviduSessionModule
  ]
```

<hr>

#### Configuring OpenVidu Angular

##### app.component.html

As you can see here, you can use `<opv-session></opv-session>` component to embed openvidu session in your application in a very easy way. Our component will start hidden:

```html
<div *ngIf="!session" id="join">
  <div id="join-dialog">
    <h1>Join a video session</h1>
    <form (submit)="joinSession()">
      <p>
        <label>Participant </label>
        <input type="text" id="userName" name="userName" [(ngModel)]="myUserName" required>
      </p>
      <p>
        <label>Session </label>
        <input type="text" id="sessionId" name="sessionId" [(ngModel)]="mySessionId" required>
      </p>
      <p class="text-center">
        <input type="submit" name="commit" value="Join!">
      </p>
    </form>
  </div>
</div>

<div *ngIf="session" id="session">
    <opv-session></opv-session>
</div>
```

##### app.component.ts

Method `joinSession()` gets the token which we provide to our component to connect to the session.

You can configure the opv-session with these parameters:

-   `sessionName`: the session name that will be displayed inside the component
-   `user`: the nickname that the user will have in the session
-   `token`: the retrieved token from OpenVidu Server


```html
<opv-session
  [sessionName]="mySessionId"
  [user]="myUserName"
  [token]="token"
  (leaveSession)="handlerLeaveSessionEvent($event)"
  (joinSession)="handlerJoinSessionEvent($event)"
  (error)="handlerErrorEvent($event)">
</opv-session>
```

Moreover, opv-session emits events `leaveSession`, `joinSession` and `error`, we can handle them with the next code in `app.component.ts` file:

```javascript
handlerJoinSessionEvent(event): void {
    // Do something
  }

  handlerLeaveSessionEvent(event): void {
    // Do something
  }

  handlerErrorEvent(event): void {
    // Do something
  }
```

---

#### Get a _token_ from OpenVidu Server

<div style="
    display: table;
    border: 1px solid #0088aa;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 25px;"><div style="display: table-cell; vertical-align: middle;">
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
    // Save the 'token' in token variable
});
```

In a production environment we would perform this operations in our application backend, by making use of the [API REST](/reference-docs/REST-API/), [OpenVidu Java Client](/reference-docs/openvidu-java-client/) or [OpenVidu Node Client](/reference-docs/openvidu-node-client/). Here we have implemented the POST requests to OpenVidu Server in a method `getToken()` that returns a Promise with the token. Without going into too much detail, this method performs two _ajax_ requests to OpenVidu Server, passing OpenVidu Server secret to authenticate them:

-   First ajax request performs a POST to `/api/sessions` (we send a `customSessionId` field to name the session with our `sessionName` value retrieved from HTML input)
-   Second ajax request performs a POST to `/api/tokens` (we send a `session` field to assign the token to this same session)

You can inspect this method in detail in the [GitHub repo](https://github.com/OpenVidu/openvidu-tutorials/blob/master/openvidu-webcomponent/web/app.js#L43).

<hr>

## Extra features of OpenVidu Angular

#### Alternatives to connect to OpenVidu Angular

In the example above, **opv-session** receives the `sessionName`, the `user` and the `token` parameters. If you want to let the opv-session get the token for you, you can just dispense with the token and provide two more attributes to it. This is only meant for developing purposes, as you need to hardcode the secret of your OpenVidu Server in the typescript code:

```html
<opv-session [sessionName]="mySessionId" [user]="myUserName" [openviduServerUrl]="'https://localhost:4443'" [openviduSecret]="'MY_SECRET'"></opv-session>
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