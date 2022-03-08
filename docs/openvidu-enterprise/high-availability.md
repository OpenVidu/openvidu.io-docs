<h2 id="section-title">High Availability</h2>

---

- **[OpenVidu Enterprise High Availability architecture](#openvidu-enterprise-high-availability-architecture)**
- **[How to deploy your OpenVidu Enterprise High Availability cluster](#how-to-deploy-your-openvidu-enterprise-high-availability-cluster)**

---

## OpenVidu Enterprise High Availability architecture

OpenVidu Enterprise offers a high availability deployment option in AWS, with replication of all nodes and load balancing for clients. It is made up of 2 different AWS Auto-Scaling groups, managing the 2 different types of nodes of [OpenVidu's Master-Worker architecture](openvidu-pro/scalability/#openvidu-pro-architecture).

The main difference between a regular OpenVidu Pro deployment and OpenVidu Enterprise High Availability deployment is the replication of Master Nodes. In the image below, on the left a regular OpenVidu Pro deployment and on the right a high availability OpenVidu Enterprise deployment:

<div class="row">
    <div class="pro-gallery" style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-pro1" href="img/docs/openvidu-enterprise/enterprise-architecture.png"><img class="img-responsive" style="margin: auto; max-height: 480px" src="img/docs/openvidu-enterprise/enterprise-architecture.png"/></a>
    </div>
</div>

The replication of Master Nodes achieves two objectives:

- In case of a Master Node failure the workload can be automatically distributed to other nodes, making the system fail-safe and preventing downtime upon a Master Node crash.
- An OpenVidu Enterprise high availability cluster is able to handle more clients at the same time, as Master Nodes are no longer a bottle neck.

A more accurate architectural description is available in the image below. As can be seen, an **AWS Load Balancer** is used to evenly distribute the client load, and an **AWS ElastiCache** database is used to manage shared information between different Master Nodes. All Master Nodes may communicate with all Media Nodes. Two clients connected to the very same OpenVidu session will be connected to the same Media Node, but might be connected to different Master Nodes.

<div class="row">
    <div class="pro-gallery" style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-pro1" href="img/docs/openvidu-enterprise/enterprise-architecture-2.png"><img class="img-responsive" style="margin: auto; max-height: 600px" src="img/docs/openvidu-enterprise/enterprise-architecture-2.png"/></a>
    </div>
</div>

## How to deploy your OpenVidu Enterprise High Availability cluster

OpenVidu Enterprise High Availability is only available in **AWS**. Go to [Deploying OpenVidu Enterprise in AWS](deployment/enterprise/aws/) to learn how.

<br>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js"></script>
<script>
  $().fancybox({
    selector : '[data-fancybox]',
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
