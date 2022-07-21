<h2 id="section-title">High Availability</h2>

---

- **[OpenVidu Enterprise HA architecture](#openvidu-enterprise-ha-architecture)**
- **[Scalability in OpenVidu Enterprise HA](#scalability-in-openvidu-enterprise-ha)**
- **[Fault tolerance in OpenVidu Enterprise HA](#fault-tolerance-in-openvidu-enterprise-ha)**
- **[How to deploy your OpenVidu Enterprise HA cluster](#how-to-deploy-your-openvidu-enterprise-ha-cluster)**

---

## OpenVidu Enterprise HA architecture

OpenVidu Enterprise offers a High Availability (HA) deployment option in AWS, with replication of all nodes and load balancing for clients. It is made up of 2 different AWS Auto-Scaling groups, managing the 2 different types of nodes of [OpenVidu's Master-Worker architecture](openvidu-pro/scalability/#openvidu-pro-architecture).

The main difference between an OpenVidu Enterprise Single Master deployment and an OpenVidu Enterprise HA deployment is the replication of Master Nodes. In the image below, on the left an OpenVidu Enterprise Single Master deployment and on the right an OpenVidu Enterprise HA deployment:

<div class="row">
    <div class="pro-gallery" style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-pro1" data-type="image" class="fancybox-img" href="img/docs/openvidu-enterprise/enterprise-architecture.png"><img class="img-responsive" style="margin: auto; max-height: 480px; image-rendering: -webkit-optimize-contrast;" src="img/docs/openvidu-enterprise/enterprise-architecture.png"/></a>
    </div>
</div>

The replication of Master Nodes achieves two objectives:

- In case of a Master Node failure the workload can be automatically distributed to other nodes, making the system fault-tolerant and preventing downtime upon a Master Node crash.
- An OpenVidu Enterprise HA cluster is able to handle more clients at the same time, as Master Nodes are no longer a bottleneck.

A more accurate architectural description is available in the image below. As can be seen, an **AWS Load Balancer** is used to evenly distribute the client load, and an **AWS ElastiCache** database is used to manage shared information between different Master Nodes. All Master Nodes may communicate with all Media Nodes. Two clients connected to the very same OpenVidu session will be connected to the same Media Node, but might be connected to different Master Nodes.

<div class="row">
    <div class="pro-gallery" style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-pro1" data-type="image" class="fancybox-img" href="img/docs/openvidu-enterprise/enterprise-architecture-2.png"><img class="img-responsive" style="margin: auto; max-height: 600px; image-rendering: -webkit-optimize-contrast;" src="img/docs/openvidu-enterprise/enterprise-architecture-2.png"/></a>
    </div>
</div>

---

## Scalability in OpenVidu Enterprise HA

Scalability in OpenVidu Enterprise HA behaves similarly to [OpenVidu Pro scalability](openvidu-pro/scalability): there is Media Node replication, automatic load distribution across Media Nodes, autoscaling of Media Nodes, etc. The main difference is **Master Node replication**, which eliminates the only remaining bottleneck in OpenVidu's architecture.

- The scalability of the **media plane** is covered thanks to the replication of **Media Nodes**.
- The scalability of the **signaling plane** is covered thanks to the replication of **Master Nodes**.

It should be noted that **Master Node scalability is fixed**. This means that there is no dynamic elasticity regarding Master Nodes, at least for now:

- You can launch an OpenVidu Enterprise HA cluster with a certain number of Master Nodes.
- You can add new Master Node manually during the cluster's lifetime.
- You can NOT remove Master Nodes with the guarantee of not affecting active OpenVidu sessions, if any. If the guidelines for [achieving fault tolerance](#fault-tolerance-in-openvidu-enterprise-ha) are followed, then at least the active OpenVidu sessions affected by a Master Node removal should be automatically rebuilt in other Master Node. But take in to account that this process is not completely silent, and that sessions will be effectively destroyed and the application is responsible for re-building them.

It is also worth mentioning that, unlike in OpenVidu Pro, in OpenVidu Enterprise HA **Media Node autoscaling is completely managed by AWS**. The AutoScaling Group of Media Nodes is responsible of the scale-in and scale-out tasks. The AutoScaling Group configuration is the one determining the maximum, minimum and desired number of Media Nodes, as well as the CPU load thresholds to add and remove Media Nodes. Therefore, **the following [autoscaling configuration properties](openvidu-pro/scalability/#enable-autoscaling) are ignored in OpenVidu Enterprise HA**:

```
OPENVIDU_PRO_CLUSTER_AUTOSCALING
OPENVIDU_PRO_CLUSTER_AUTOSCALING_MAX_NODES
OPENVIDU_PRO_CLUSTER_AUTOSCALING_MIN_NODES
OPENVIDU_PRO_CLUSTER_AUTOSCALING_MAX_LOAD
OPENVIDU_PRO_CLUSTER_AUTOSCALING_MIN_LOAD
```

Instead, you must manage the autoscaling configuration through AWS:

- When launching the OpenVidu Enterprise HA cluster with CloudFormation, you can decide the number of Media Nodes and the CPU thresholds managed by the AutoScaling Group: [EC2 and Autoscaling configuration](deployment/enterprise/aws/#53-ec2-and-autoscaling-configuration).
- You can update the AutoScaling Group configuration at any time on the fly: [Autoscaling Configuration](deployment/enterprise/aws/#autoscaling-configuration).

<br>

---

## Fault tolerance in OpenVidu Enterprise HA

Fault tolerance in OpenVidu Enterprise HA behaves similarly to [OpenVidu Pro Fault tolerance](openvidu-pro/fault-tolerance/#how-openvidu-pro-provides-fault-tolerance/): upon a Media Node crash, sessions are closed and clients are informed through the proper events so the application may rebuild any affected session. The novelty of OpenVidu Enterprise HA in regards to fault tolerance is the replication of Master Nodes, which allows for **no downtime in the event of a Master Node crash**. The functioning of this process is summarized in the following points:

1. Clients keep a persistent, full-duplex connection with a Master Node through WebSocket. Besides, all Master Nodes are aware of each other and interact between each other through REST protocol with simple HTTP requests.
2. Whenever a client detects a disconnection with a Master Node, it tries to automatically reconnect. The OpenVidu Enterprise HA proxy (an AWS Load Balancer) will redirect the reconnection petition to a Master Node. It could be any of them, even to the crashed one.
3. If the proxy chooses a healthy Master Node to handle the client request, this node will find out that the one to which the request was originally directed to is down. It will immediately warn the client and flag the crashed node as unhealthy, so AWS automatically terminates it.
4. If the proxy chooses the crashed Master Node, then it will simply return a 50X error so the client may re-attempt the reconnection operation. Next time the proxy will choose a different Master Node to attend to the petition and point 3) will be performed.

In the end, all users connected to OpenVidu sessions being hosted at a crashed Master Node will receive the proper events to allow the application to re-build the session. The process is just the same as the one explained here ([Making your OpenVidu app fault tolerant](openvidu-pro/fault-tolerance/#making-your-openvidu-app-fault-tolerant)), but with a small requirement in your application's backend: your server must **retry any REST API operation to OpenVidu whenever it receives a `502`, `503` or `504` HTTP status error** during the process of rebuilding a session (creating a Session or Connection entity).

This is essential, as there is a small time interval in which a Master Node may be down but the cluster still doesn't know about it, so petitions may end up being redirected to the crashed Master Node. In this case the proxy will return a 50X error, and the application's backend must retry the petition until it lands on a healthy Master Node. Below there are some code snippets for inspiration:

<div class="lang-tabs-container" markdown="1">

<div class="lang-tabs-header">
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="background-color: #e8e8e8; color: black; width: 50%">Java</button>
  <button class="lang-tabs-btn" onclick="changeLangTab(event)" style="width: 50%">Node</button>
</div>

<div id="java" class="lang-tabs-content" markdown="1">

```java
// OpenVidu SDK entrypoint
private OpenVidu OV = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);

// This method returns a token to the client side
public String getToken(String sessionId) {
    Session session = getSession(sessionId);
    Connection connection = getConnection(session);
    return connection.getToken();
}

// This method creates a Session with a custom session identifier
// It will retry the operation if a 50X error is received
public Session getSession(String sessionId) {
    Session session = null;
    boolean success = false;
    while (!success) {
        SessionProperties properties = new SessionProperties.Builder().customSessionId(sessionId).build();
        try {
            session = OV.createSession(properties);
            success = true;
        } catch (OpenViduHttpException e) {
            if (e.getStatus() == 502 || e.getStatus() == 503 || e.getStatus() == 504) {
                System.out.println("Retry. The node handling the operation is crashed: " + e.getMessage());
                Thread.sleep(100);
            } else {
                System.err.println("Unexpected error: " + e.getMessage());
                throw e;
            }
        } catch (OpenViduJavaClientException e) {
            System.err.println("Unexpected internal error: " + e.getMessage());
            throw e;
        }
    }
    return session;
}

// This method creates a Connection for a particular Session
// It will retry the operation if a 50X error is received
public Connection getConnection(Session session) {
    Connection connection = null;
    boolean success = false;
    while (!success) {
        try {
            connection = session.createConnection();
            success = true;
        } catch (OpenViduHttpException e) {
            if (e.getStatus() == 502 || e.getStatus() == 503 || e.getStatus() == 504) {
                Thread.sleep(100);
                System.out.println("Retry. The node handling the operation is crashed: " + e.getMessage());
            } else {
                System.err.println("Unexpected error: " + e.getMessage());
                throw e;
            }
        } catch (OpenViduJavaClientException e) {
            System.err.println("Unexpected internal error: " + e.getMessage());
            throw e;
        }
    }
    return connection;
}
```

</div>

<div id="node" class="lang-tabs-content" style="display:none" markdown="1">

```javascript
// OpenVidu SDK entrypoint
var OV = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);

// This method returns a token to the client side
async function getToken(sessionId) {
    var session = await getSession(sessionId);
    var connection = await getConnection(session);
    return connection.token;
}

// This method creates a Session with a custom session identifier
// It will retry the operation if a 50X error is received
async function getSession(sessionId) {
    var session;
    var success = false;
    while (!success) {
        try {
            session = await OV.createSession({ customSessionId: sessionId });
            success = true;
        } catch (error) {
            if (error.message === 502 || error.message === 503 || error.message === 504) {
                await new Promise(resolve => setTimeout(resolve, 100)); // Wait 100 ms
                console.warn("Retry. The node handling the operation is crashed", e);
            } else {
                console.error("Unexpected error", e);
                throw e;
            }
        }
    }
    return session;
}

// This method creates a Connection for a particular Session
// It will retry the operation if a 50X error is received
async function getConnection(session) {
    var connection;
    var success = false;
    while (!success) {
        try {
            var connection = await session.createConnection({ customSessionId: sessionId });
            success = true;
        } catch (error) {
            if (error.message === 502 || error.message === 503 || error.message === 504) {
                await new Promise(resolve => setTimeout(resolve, 100)); // Wait 100 ms
                console.warn("Retry. The node handling the operation is crashed", e);
            } else {
                console.error("Unexpected error", e);
                throw e;
            }
        }
    }
    return connection;
}
```

</div>
</div>

> If you want to see an example of an application that automatically reconnects users after a node crash, take a look to the simple [openvidu-fault-tolerance](https://github.com/OpenVidu/openvidu-tutorials/tree/master/openvidu-fault-tolerance){:target="_blank"} tutorial.

<br>

---

## How to deploy your OpenVidu Enterprise HA cluster

OpenVidu Enterprise HA is only available in **AWS**. Go to [Deploying OpenVidu Enterprise in AWS](deployment/enterprise/aws/) to learn how.

<br>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js"></script>
<script type='text/javascript' src='js/fancybox-setup.js'></script>

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
