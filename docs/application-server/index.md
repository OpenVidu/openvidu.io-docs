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
                <a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-basic-java">
                    <div class="overlay">
                        <ul class="expand"></ul>
                    </div>
                </a>
            </div>
        </div>
        <div class="member-info wow">
            <h4>Java</h4>
            <p>Built with <a href="https://spring.io/projects/spring-boot" target="_blank">Spring Boot</a><br>Uses <a href="reference-docs/openvidu-java-client/">openvidu-java-client SDK</a></p>
        </div>
    </div>

    <div class="col-md-4 col-sm-4 team-member">
        <div class="effect effects wow">
            <div class="img">
                <img src="img/assets/server-langs/nodejs.svg" class="img-responsive img-tutorials" alt="" />
                <a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-basic-node">
                    <div class="overlay">
                        <ul class="expand"></ul>
                    </div>
                </a>
            </div>
        </div>
        <div class="member-info wow">
            <h4>NodeJS</h4>
            <p>Built with <a href="https://expressjs.com" target="_blank">Express</a><br>Uses <a href="reference-docs/openvidu-node-client/">openvidu-node-client SDK</a></p>
        </div>
    </div>

    <div class="col-md-4 col-sm-4 team-member">
        <div class="effect effects wow">
            <div class="img">
                <img src="img/assets/server-langs/python.svg" class="img-responsive img-tutorials" alt="" />
                <a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-basic-python">
                    <div class="overlay">
                        <ul class="expand"></ul>
                    </div>
                </a>
            </div>
        </div>
        <div class="member-info wow">
            <h4>Python</h4>
            <p>Built with <a href="https://flask.palletsprojects.com" target="_blank">Flask</a><br>Consumes <a href="reference-docs/REST-API/">OpenVidu REST API</a></p>
        </div>
    </div>

</div>

<div class="row" style="margin-bottom: 50px">

    <div class="col-md-4 col-sm-4 team-member">
        <div class="effect effects wow">
            <div class="img">
                <img src="img/assets/server-langs/dotnet.svg" class="img-responsive img-tutorials" alt="" />
                <a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-basic-dotnet">
                    <div class="overlay">
                        <ul class="expand"></ul>
                    </div>
                </a>
            </div>
        </div>
        <div class="member-info wow">
            <h4>.NET</h4>
            <p>Built with <a href="https://docs.microsoft.com/aspnet/core/tutorials/min-web-api?view=aspnetcore-6.0&tabs=visual-studio" target="_blank">ASP.NET Core Minimal APIs</a><br>Consumes <a href="reference-docs/REST-API/">OpenVidu REST API</a></p>
        </div>
    </div>

    <div class="col-md-4 col-sm-4 team-member">
        <div class="effect effects wow">
            <div class="img">
                <img src="img/assets/server-langs/php.svg" class="img-responsive img-tutorials" alt="" />
                <a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-basic-php">
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
                <a href="https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-basic-ruby">
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

The two endpoints offered by all sample applications are documented below. Note that by default all sample applications listen on `https://localhost:5000` when serving them using the official instructions:

| 1. Initialize a Session ||
| - ||
| **HTTP METHOD**  | POST |
| **URL**          | https://localhost:5000/sessions |
| **REQUEST BODY** | Same request body as the REST API operation [POST /openvidu/api/sessions](reference-docs/REST-API/#post-session) |
| **200 OK RETURN VALUE** | A string with the Session identifier.<br>For example: `"ses_JM9v0nfD1l"` |

| 2. Create a Connection ||
| - ||
| **HTTP METHOD**  | POST |
| **URL**          | https://localhost:5000/sessions/`SESSION_ID`/connections |
| **REQUEST BODY** | Same request body as the REST API operation [POST /openvidu/api/sessions/&lt;SESSION_ID&gt;/connection](reference-docs/REST-API/#post-connection) |
| **200 OK RETURN VALUE** | A string with the Connection's token.<br>For example: `"wss://localhost:4443?sessionId=ses_JM9v0nfD1l&token=tok_MIYGGzuDQb8Xf1Qd"` |

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