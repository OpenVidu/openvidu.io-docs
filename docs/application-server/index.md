<h2 id="section-title">Application server</h2>
<hr>

Your application server must communicate with your OpenVidu deployment to create **Sessions** and **Connections** before your clients can connect to a video call. This is the way that OpenVidu guarantees the security of your Sessions. Visit section [Developing your video app](developing-your-video-app/) to learn about these basic concepts.

There are [Java](reference-docs/openvidu-java-client/) and [Node](reference-docs/openvidu-node-client/) SDKs available to integrate OpenVidu into your application server, but of course you can consume OpenVidu [REST API](reference-docs/REST-API/) directly from any backend framework.

You will need your **OpenVidu deployment URL** and your **OpenVidu secret** to reach your OpenVidu deployment from your application server. In all of the examples below, these are represented by variables **`OPENVIDU_URL`** and **`OPENVIDU_SECRET`**.

<div class="row">
    <div class="pro-gallery" style="margin: 20px 0">
        <a data-fancybox="gallery" data-type="image" href="img/docs/home/openvidu-workflow-server.png" class="fancybox-img"><img class="img-responsive" style="margin: auto; max-height: 550px" src="img/docs/home/openvidu-workflow-server.png"/></a>
    </div>
</div>

## 1. Initialize a Session

You must first initialize a Session in OpenVidu. Participants connected to the same Session are able to send and receive Streams between them (see [Basic Concepts](developing-your-video-app/#basic-concepts)).

<div class="lang-tabs-container" markdown="1">

<div class="lang-tabs-header">
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; color: black">Java</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Node</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">cURL</button>
</div>

<div id="java" class="lang-tabs-content" markdown="1">

```java
OpenVidu openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
SessionProperties properties = new SessionProperties.Builder().build();
Session session = openVidu.createSession(properties);
```

See [JavaDoc](api/openvidu-java-client/io/openvidu/java/client/OpenVidu.html#createSession()){:target="_blank"}

</div>

<div id="node" class="lang-tabs-content" style="display:none" markdown="1">

```javascript
var openVidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
var properties = {};
var session = await openVidu.createSession(properties);
```

See [TypeDoc](api/openvidu-node-client/classes/openvidu.html#createsession){:target="_blank"}

</div>

<div id="curl" class="lang-tabs-content" style="display:none" markdown="1">

```sh
curl -X POST <OPENVIDU_URL>/openvidu/api/sessions \
     -u OPENVIDUAPP:<OPENVIDU_SECRET> \
     -H "Content-Type: application/json" \
     -d "{}"
```

See method [POST /openvidu/api/sessions](reference-docs/REST-API#post-session)

</div>

</div>

## 2. Create a Connection

You must create Connections for a specific Session to allow participants to connect to it. Each participant will take one Connection, using its Token to connect (see [Basic Concepts](developing-your-video-app/#basic-concepts)).

<div class="lang-tabs-container" markdown="1">

<div class="lang-tabs-header">
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; color: black">Java</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">Node</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)">cURL</button>
</div>

<div id="java" class="lang-tabs-content" markdown="1">

```java
ConnectionProperties connectionProperties = new ConnectionProperties.Builder()
    .role(OpenViduRole.PUBLISHER)
    .data("Alice")
    .build();
Connection connection = session.createConnection(connectionProperties);
String token = connection.getToken(); // Send this string to the client side
```

See [JavaDoc](api/openvidu-java-client/io/openvidu/java/client/Session.html#createConnection()){:target="_blank"}

</div>

<div id="node" class="lang-tabs-content" style="display:none" markdown="1">

```javascript
var connectionProperties = {
    role: "PUBLISHER",
    data: "Alice"
};
var connection = await session.createConnection(connectionProperties);
var token = connection.token; // Send this string to the client side
```

See [TypeDoc](api/openvidu-node-client/classes/session.html#createconnection){:target="_blank"}

</div>

<div id="curl" class="lang-tabs-content" style="display:none" markdown="1">

```sh
curl -X POST <OPENVIDU_URL>/openvidu/api/sessions/<SESSION_ID>/connection \
     -u OPENVIDUAPP:<OPENVIDU_SECRET> \
     -H "Content-Type: application/json" \
     -d '{"role": "PUBLISHER", "data": "Alice"}'
```

See method [POST /openvidu/api/sessions/&lt;SESSION_ID&gt;/connection](reference-docs/REST-API/#post-connection)

</div>

</div>

<br><br><hr>

## Server application samples

<div class="row" style="margin-top: 50px">

<div class="col-md-4 col-sm-4 team-member">
    <div class="effect effects wow">
        <div class="img">
            <img src="img/assets/server-langs/java.svg" class="img-responsive img-tutorials" alt="" />
            <a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-basic-java" target="_blank">
                <div class="overlay">
                    <ul class="expand"></ul>
                </div>
            </a>
        </div>
    </div>
    <div class="member-info wow">
        <h4>Java</h4>
        <ul style="margin: 0; padding-left: 17px;">
            <li>Link to <a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-basic-java" target="_blank">GitHub repository</a></li>
            <li>Built with <a href="https://spring.io/projects/spring-boot" target="_blank">Spring Boot</a></li>
            <li>Uses <a href="reference-docs/openvidu-java-client/">openvidu-java-client SDK</a></li>
        </ul>
    </div>
</div>

<div class="col-md-4 col-sm-4 team-member">
    <div class="effect effects wow">
        <div class="img">
            <img src="img/assets/server-langs/nodejs.svg" class="img-responsive img-tutorials" alt="" />
            <a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-basic-node" target="_blank">
                <div class="overlay">
                    <ul class="expand"></ul>
                </div>
            </a>
        </div>
    </div>
    <div class="member-info wow">
        <h4>NodeJS</h4>
        <ul style="margin: 0; padding-left: 17px;">
            <li>Link to <a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-basic-node" target="_blank">GitHub repository</a></li>
            <li>Built with <a href="https://expressjs.com" target="_blank">Express</a></li>
            <li>Uses <a href="reference-docs/openvidu-node-client/">openvidu-node-client SDK</a></li>
        </ul>
    </div>
</div>

<div class="col-md-4 col-sm-4 team-member">
    <div class="effect effects wow">
        <div class="img">
            <img src="img/assets/server-langs/python.svg" class="img-responsive img-tutorials" alt="" />
            <a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-basic-python" target="_blank">
                <div class="overlay">
                    <ul class="expand"></ul>
                </div>
            </a>
        </div>
    </div>
    <div class="member-info wow">
        <h4>Python</h4>
        <ul style="margin: 0; padding-left: 17px;">
            <li>Link to <a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-basic-python" target="_blank">GitHub repository</a></li>
            <li>Built with <a href="https://flask.palletsprojects.com" target="_blank">Flask</a></li>
            <li>Consumes <a href="reference-docs/REST-API/">OpenVidu REST API</a></li>
        </ul>
    </div>
</div>

</div>

<div class="row" style="margin-bottom: 50px">

<div class="col-md-4 col-sm-4 team-member">
    <div class="effect effects wow">
        <div class="img">
            <img src="img/assets/server-langs/dotnet.svg" class="img-responsive img-tutorials" alt="" />
            <a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-basic-dotnet" target="_blank">
                <div class="overlay">
                    <ul class="expand"></ul>
                </div>
            </a>
        </div>
    </div>
    <div class="member-info wow">
        <h4>.NET</h4>
        <ul style="margin: 0; padding-left: 17px;">
            <li>Link to <a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-basic-dotnet" target="_blank">GitHub repository</a></li>
            <li>Built with <a href="https://docs.microsoft.com/aspnet/core/tutorials/min-web-api?view=aspnetcore-6.0&tabs=visual-studio" target="_blank">ASP.NET Core Minimal APIs</a></li>
            <li>Consumes <a href="reference-docs/REST-API/">OpenVidu REST API</a></li>
        </ul>
    </div>
</div>

<div class="col-md-4 col-sm-4 team-member">
    <div class="effect effects wow">
        <div class="img">
            <img src="img/assets/server-langs/php.svg" class="img-responsive img-tutorials" alt="" />
            <a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-basic-php" target="_blank">
                <div class="overlay">
                    <ul class="expand"></ul>
                </div>
            </a>
        </div>
    </div>
    <div class="member-info wow">
        <h4>PHP</h4>
        <p>Coming soon...</p>
        <!-- <p>Built with <a href="https://laravel.com" target="_blank">Laravel</a><br>Consumes <a href="reference-docs/REST-API/">OpenVidu REST API</a></p> -->
    </div>
</div>

<div class="col-md-4 col-sm-4 team-member">
    <div class="effect effects wow">
        <div class="img">
            <img src="img/assets/server-langs/ruby.svg" class="img-responsive img-tutorials" alt="" style="padding: 15px"/>
            <a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-basic-ruby" target="_blank">
                <div class="overlay">
                    <ul class="expand"></ul>
                </div>
            </a>
        </div>
    </div>
    <div class="member-info wow">
        <h4>Ruby</h4>
        <p>Coming soon...</p>
        <!-- <p>Built with <a href="https://rubyonrails.org" target="_blank">Ruby on Rails</a><br>Consumes <a href="reference-docs/REST-API/">OpenVidu REST API</a></p> -->
    </div>
</div>

</div>

These are all basic server applications that provide a good starting point for your backend integration of OpenVidu.

- All of them provide the same **2 endpoints** to perform the 2 basic operations: initializing Sessions and creating Connections.
- All of them are **interchangeable**: an application that consumes these 2 endpoints will work with any of the sample server applications.
- All of them are configured to allow **CORS** from any origin. In production environments your application server may be configured to allow only calls from specific client origins.
- None of them offer any kind of **user control**. In production environments generally your application server should know who is trying to initialize Sessions and create Connections. User control is a topic outside the scope of OpenVidu, and will depend on the chosen technology.

### REST endpoints

The two endpoints offered by all server application samples are documented below. Note that by default all applications listen on `https://localhost:5000` when serving them using the official instructions:

| 1. Initialize a Session ||
| - ||
| **HTTP METHOD**  | POST |
| **URL**          | https://localhost:5000/api/sessions |
| **REQUEST BODY** | Same request body as the REST API operation [POST /openvidu/api/sessions](reference-docs/REST-API/#post-session) |
| **200 OK RETURN VALUE** | A string with the Session identifier.<br>For example: `"ses_JM9v0nfD1l"` |

| 2. Create a Connection ||
| - ||
| **HTTP METHOD**  | POST |
| **URL**          | https://localhost:5000/api/sessions/`SESSION_ID`/connections |
| **REQUEST BODY** | Same request body as the REST API operation [POST /openvidu/api/sessions/&lt;SESSION_ID&gt;/connection](reference-docs/REST-API/#post-connection) |
| **200 OK RETURN VALUE** | A string with the Connection's token.<br>For example: `"wss://localhost:4443?sessionId=ses_JM9v0nfD1l&token=tok_MIYGGzuDQb8Xf1Qd"` |

<br>

---

## User Authentication

Authentication is a common topic in web applications. Let's briefly explain here the different alternatives to include it in your OpenVidu server application.

If your app has already implemented user authentication, you can simply check the user's credentials in your server application and use them to control who is able to initialize Session and Connection objects.

However, if your server application does not have any user authentication yet and you are thinking about adding it, there are different strategies you can follow. The most common are:

1. [Basic authentication](#basic-authentication)
2. [Cookie-based authentication](#cookie-based-authentication)
3. [Token-based authentication](#token-based-authentication)
4. [OAuth 2.0](#oauth-20)
5. [OpenID Connect](#openid-connect)
6. [SAML](#saml)

#### Basic authentication

This is a simple authentication method that uses a username and a password. The client application will send the credentials encoded with Base64 in the Authorization header with `Basic` prefix as stated below:

```bash
Authorization: 'Basic' + encodedUsingBase64('username':'password')
```

This credentials will be validated by the server, which stores the usernames and passwords in a database.

#### Cookie-based authentication

This is one of the most common ways to implement user authentication in web applications. The server application will create a session ID and store it (statefully) in a cookie and return it to the client-side via a cookie header. This cookie will be sent in every subsequent request to the server, which will be able to identify the user by reading the cookie. On logout the cookie will be deleted from both client cookie store and server.

> Note that this is a stateful authentication method, so the server will need to store the session ID in a database or in-memory cache. This is not a problem for small applications, but it can be a problem for large applications with many users.

#### Token-based authentication

This is a **more modern way** to implement user authentication in web applications. It is gaining popularity because of the **SPA** (Single Page Application) trend and **stateless REST APIs** applications.

There are many different ways to implement token-based authentication. The most popular is the [**JWT** (JSON Web Token)](https://jwt.io/introduction){:target="_blank"} authentication. Receiving the credentials from the client, the server will validate them and return a signed JWT token which contains user information.

Contrary to the Cookie-based method, this token will never be stored in the server side. The client stores the token in the browser's local storage and sends it in every request to the server. The server will simply validate the token, granting access to the user.

> Note that this authentication method is **stateless**. This means that the server will not store any information about the user. This is a good thing because it will scale better and will be more secure. However, it also means that the server will not be able to revoke the token. If the token is stolen, the only way to revoke it is to change the secret key used to sign the token.

#### OAuth 2.0

[OAuth 2.0](https://oauth.net/2/){:target="_blank"} is an authorization framework that enables applications to obtain limited access to user accounts on an HTTP service, such as Facebook, Google, GitHub, Apple, etc. It works by delegating user authentication to the service that hosts the user account, and authorizing third-party applications to access the user account. OAuth 2.0 provides authorization flows for web, mobile and desktop applications.

> Note that OAuth 2.0 is an authorization protocol that delegates user authentication to the service that hosts the user account. Your server application will be communicating with these third-party services to provide authentication.

#### OpenID Connect

[OpenID Connect](https://openid.net/connect/){:target="_blank"} is an authentication layer on top of OAuth 2.0. It is a simple identity layer on top of the OAuth 2.0 protocol, which allows Clients to verify the identity of the End-User based on the authentication performed by an Authorization Server, as well as to obtain basic profile information about the End-User in an interoperable and REST-like manner.

> Note that OpenID Connect, just as OAuth 2.0, is an authorization protocol that delegates user authentication to the service that hosts the user account. Your server application will be communicating with these third-party services to provide authentication.

#### SAML

SAML (Security Assertion Markup Language) uses the same Identity provider used by OpenID Connect and OAuth 2.0, but it is XML-based. SAML is an open standard for exchanging authentication and authorization data between security domains and it is maintained by the Organization for the Advancement of Structured Information Standards (OASIS).

Some SAML providers that can be found in the industry are:

- [Okta](https://www.okta.com/)
- [OneLogin](https://www.onelogin.com/)
- [Auth0](https://auth0.com/)
- [Azure Active Directory](https://azure.microsoft.com/en-us/services/active-directory/)
- [Google Cloud Identity](https://cloud.google.com/identity-platform/)
- [AWS Cognito](https://aws.amazon.com/cognito/)

<br>
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

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js"></script>
<script type='text/javascript' src='js/fancybox-setup.js'></script>
