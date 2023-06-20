<h2 id="section-title">High Availability</h2>

---

- **[OpenVidu Enterprise HA architecture](#openvidu-enterprise-ha-architecture)**
    - **[AWS deployment](#aws-deployment)**
    - **[On premises deployment](#on-premises-deployment)**
- **[Scalability in OpenVidu Enterprise HA](#scalability-in-openvidu-enterprise-ha)**
    - **[Scalability in AWS](#scalability-in-aws)**
    - **[Scalability in On premises](#scalability-in-on-premises)**
- **[Fault tolerance in OpenVidu Enterprise HA](#fault-tolerance-in-openvidu-enterprise-ha)**
- **[How to deploy your OpenVidu Enterprise HA cluster](#how-to-deploy-your-openvidu-enterprise-ha-cluster)**

---

## OpenVidu Enterprise HA architecture

OpenVidu Enterprise provides a High Availability (HA) deployment model on AWS, which includes replication of all nodes and client load balancing. On-premises deployment is also supported, but instead of separating master nodes and media nodes, the system uses a single unique node for a replicated cluster. Let's dive into both deployment models.

### AWS deployment

It is made up of 2 different AWS Auto-Scaling groups, managing the 2 different types of nodes of [OpenVidu's Master-Worker architecture](openvidu-pro/scalability/#openvidu-pro-architecture).

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


### On premises deployment

While in AWS deployment the Master Node and the Media Node are separated, in on-premises deployment both are merged into a single node. This node is replicated to achieve fault tolerance and scalability.

Having one merged node simplifies the deployment, maintenance, and scalability process. Since there is only one type of node to manage, the system becomes less complex, and it's easier to scale. You just need to replicate this single type of node.

In the image below, on the left an OpenVidu Enterprise Single Master deployment and on the right an OpenVidu Enterprise HA deployment:

<div class="row">
    <div class="pro-gallery" style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-pro1" data-type="image" class="fancybox-img" href="img/docs/openvidu-enterprise/enterprise-architecture-onpremises.png"><img class="img-responsive" style="margin: auto; max-height: 480px; image-rendering: -webkit-optimize-contrast;" src="img/docs/openvidu-enterprise/enterprise-architecture-onpremises.png"/></a>
    </div>
</div>

As you can see comparing from the previous image, a standard OpenVidu Pro/Enterprise deployment has master nodes and media nodes separated. In OpenVidu Enterprise HA On premises, both are merged into a single node. Each node will handle both signaling and media traffic.

In case any of the nodes fails, the system will automatically distribute the workload to other nodes, making the system fault-tolerant and preventing downtime upon a node crash.

A more in detail architectural view is available in the image below. As can be seen, a Load Balancer (which can be any load balancer, like NGINX, HAProxy, etc.) is used to evenly distribute the client load, and a **Redis** database is used to manage shared information between different nodes (This is no different from OpenVidu Enterprise HA in AWS). All nodes may communicate with all other nodes. Two clients connected to the very same OpenVidu session will be connected to the same node, and the media will go through the same node.

<div class="row">
    <div class="pro-gallery" style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-pro1" data-type="image" class="fancybox-img" href="img/docs/openvidu-enterprise/enterprise-architecture-onpremises2.png"><img class="img-responsive" style="margin: auto; max-height: 600px; image-rendering: -webkit-optimize-contrast;" src="img/docs/openvidu-enterprise/enterprise-architecture-onpremises2.png"/></a>
    </div>
</div>

---

## Scalability in OpenVidu Enterprise HA

Scalability in OpenVidu Enterprise HA depends on the type of HA deployment you have chosen, as explained in the previous section.
Also, the autoscaling mechanism depends entirely in the infrastructure you have chosen, so **the following [autoscaling configuration properties](openvidu-pro/scalability/#enable-autoscaling) are ignored in OpenVidu Enterprise HA**:

```
OPENVIDU_PRO_CLUSTER_AUTOSCALING
OPENVIDU_PRO_CLUSTER_AUTOSCALING_MAX_NODES
OPENVIDU_PRO_CLUSTER_AUTOSCALING_MIN_NODES
OPENVIDU_PRO_CLUSTER_AUTOSCALING_MAX_LOAD
OPENVIDU_PRO_CLUSTER_AUTOSCALING_MIN_LOAD
```

Scalability in OpenVidu Enterprise HA behaves similarly to [OpenVidu Pro scalability](openvidu-pro/scalability): there is Media Node replication, automatic load distribution across Media Nodes, autoscaling of Media Nodes, etc. The main difference is **Master Node replication**, which eliminates the only remaining bottleneck in OpenVidu's architecture.

- The scalability of the **media plane** is covered thanks to the replication of **Media Nodes**.
- The scalability of the **signaling plane** is covered thanks to the replication of **Master Nodes**.

The Master Node replication change depending on the type of deployment you have chosen. In the next sections we will explain the scalability of each type of deployment: AWS and On premises.

### Scalability in AWS

In AWS you can deploy multiple master nodes, but it should be noted that **Master Node scalability is fixed**. This means that there is no dynamic elasticity regarding Master Nodes, at least for now:

- You can launch an OpenVidu Enterprise HA cluster with a certain number of Master Nodes.
- You can add new Master Node manually during the cluster's lifetime.
- You can NOT remove Master Nodes with the guarantee of not affecting active OpenVidu sessions, if any. If the guidelines for [achieving fault tolerance](#fault-tolerance-in-openvidu-enterprise-ha) are followed, then at least the active OpenVidu sessions affected by a Master Node removal should be automatically rebuilt in other Master Node. But take in to account that this process is not completely silent, and that sessions will be effectively destroyed and the application is responsible for re-building them.

It is important to mention that auto scaling is manage by The AutoScaling Group of Media Nodes. The AutoScaling Group configuration is the one determining the maximum, minimum and desired number of Media Nodes, as well as the CPU load thresholds to add and remove Media Nodes.

If you want to change how autoscaling behaves, you must manage the autoscaling configuration through AWS:

- When launching the OpenVidu Enterprise HA cluster with CloudFormation, you can decide the number of Media Nodes and the CPU thresholds managed by the AutoScaling Group: [EC2 and Autoscaling configuration](deployment/enterprise/aws/#53-ec2-and-autoscaling-configuration).
- You can update the AutoScaling Group configuration at any time on the fly: [Autoscaling Configuration](deployment/enterprise/aws/#autoscaling-configuration).

### Scalability in On premises

Scalability in OpenVidu Enterprise HA On premises behaves similarly to the scalability of [AWS](#scalability-in-aws): but, there are however some unique characteristics to the OpenVidu Enterprise HA On Premises environment. Here, the Master Node and Media Node are not separate; instead, they exist on a **Single Node**, and **a session lives on a single node**.

This means that the lifespan of the Media Node aligns with that of the Master Node, ensuring smooth, uninterrupted operation. This allows for the following:

- Nodes are not fixed, and can be added or removed at any time (This ensures **media plane** and **signaling plane** scalability).
- If a node goes down, the sessions on that node are automatically rebuilt on other node (see [Fault Tolerance](#fault-tolerance-in-openvidu-enterprise-ha)).

- Nodes are registered automatically at startup, and deregistered gracefully with a REST API call. This allows for easy integration with your own autoscaling mechanism, or the one provided by your cloud provider. See [Node Management](deployment/enterprise/on-premises/#node-management) for more information.


For further information about On Premises deployment, see [On Premises deployment](deployment/enterprise/on-premises/#high-availability-deployment).

<br>

---

## Fault tolerance in OpenVidu Enterprise HA

Fault tolerance in OpenVidu Enterprise HA behaves similarly to [OpenVidu Pro Fault tolerance](openvidu-pro/fault-tolerance/#how-openvidu-pro-provides-fault-tolerance/): upon a Media Node crash, sessions are closed and clients are informed through the proper events so the application may rebuild any affected session. The novelty of OpenVidu Enterprise HA in regards to fault tolerance is the replication of Master Nodes, which allows for **no downtime in the event of a Master Node crash**. The functioning of this process is summarized in the following points:

1. Clients keep a persistent, full-duplex connection with a Master Node through WebSocket. Besides, all Master Nodes are aware of each other and interact between each other through REST protocol with simple HTTP requests.
2. Whenever a client detects a disconnection with a Master Node, it tries to automatically reconnect. The OpenVidu Enterprise HA proxy (an AWS Load Balancer) will redirect the reconnection petition to a Master Node. It could be any of them, even to the crashed one.
3. If the proxy chooses a healthy Master Node to handle the client request, this node will find out that the one to which the request was originally directed to is down. It will immediately warn the client and flag the crashed node as unhealthy, so AWS automatically terminates it.
4. If the proxy chooses the crashed Master Node, then it will simply return a 50X error so the client may re-attempt the reconnection operation. Next time the proxy will choose a different Master Node to attend to the petition and point 3) will be performed.

In the end, all users connected to OpenVidu sessions being hosted at a crashed Master Node will receive the proper events to allow the application to re-build the session. The process is just the same as the one explained here ([Making your OpenVidu app fault tolerant](openvidu-pro/fault-tolerance/#making-your-openvidu-app-fault-tolerant)), but with a small requirement in your application's backend: your server must **retry any REST API operation to OpenVidu whenever it receives an HTTP status between 500 and 504** during the process of rebuilding a session (creating a Session or Connection entity). In a session specifically it could return a **404** error, as the session may have been destroyed by the Master Node crash. This status code should also be retried.

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
            if ((e.getStatus() >= 500 && e.getStatus() <= 504) || e.getStatus() == 404) {
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
            if (e.getStatus() >= 500 && e.getStatus() <= 504) {
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

OpenVidu Enterprise HA is available for **AWS** and **On Premises** deployments_
- [Deploying OpenVidu Enterprise HA - AWS](deployment/enterprise/aws/#high-availability-deployment).
- [Deploying OpenVidu Enterprise HA - On Premises](deployment/enterprise/on-premises/#high-availability-deployment).

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
