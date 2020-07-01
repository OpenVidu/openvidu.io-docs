<h2 id="section-title">OpenVidu Server Pro CDR</h2>
<hr>

OpenVidu Pro provides all of [OpenVidu CE CDR events](reference-docs/openvidu-server-cdr){:target="_blank"}, but also includes some extra events of its own. Also remember that all OpenVidu Pro CDR events are also dispatched by OpenVidu Webhook, just as stated in [OpenVidu CE documentation](reference-docs/openvidu-server-webhook/#available-events-in-webhook-service){:target="_blank"}.

### Events in OpenVidu Pro CDR

- [**mediaNodeStatusChanged**](#medianodestatuschanged)
- [**autoscaling**](#autoscaling)

<br>

---

#### mediaNodeStatusChanged

Recorded when the status of a Media Node of an OpenVidu Pro cluster has changed. Below you have the finite-state machine defining the lifecycle of a Media Node and all of the possible transitions between its statuses. Visit [Scalability](openvidu-pro/scalability/#openvidu-pro-cluster-events){:target="_blank"} section for a full description of them.

<div class="row">
    <div class="pro-gallery" style="margin-bottom: 25px">
        <a data-fancybox="gallery-pro3" href="img/docs/openvidu-pro/instance-status.png"><img class="img-responsive" style="margin: auto; max-height: 600px" src="img/docs/openvidu-pro/instance-status.png"/></a>
    </div>
</div>


| Property          | Description                                | Value                                          |
| ----------------- | ------------------------------------------ | ---------------------------------------------- |
| `id`              | Unique identifier of the Media Node        | A string with the Media Node unique identifier |
| `environmentId`   | Unique identifier of the Media Node, dependent on the deployment environment. For example, an AWS EC2 machine id if the cluster is deployed in AWS | A string with the Media Node environment unique identifier |
| `ip`              | IP of the Media Node        | A string with the Media Node IP |
| `uri`             | URI of the Media Node. This is the actual direction where OpenVidu Server Pro Media Node connects to this Media Node | A string with the Media Node URI |
| `clusterId`       | OpenVidu Pro cluster identifier. This allows you to identify the specific cluster to which the Media Node triggering this event belongs, especially if you have more than one OpenVidu Pro cluster running (see ) | A string with the cluster identifier |
| `oldStatus`       | Old status of the Media Node. See [Media Node statuses](openvidu-pro/scalability/#media-node-statuses){:target="_blank"} | A string with the Media Node old status. `null` if _newStatus_ is `launching` |
| `newStatus`       | New status of the Media Node. See [Media Node statuses](openvidu-pro/scalability/#media-node-statuses){:target="_blank"} | A string with the Media Node new status |
| `timestamp`       | Time when the event was triggered          | UTC milliseconds                              |

Example:
```json
{
  "mediaNodeStatusChanged": {
    "timestamp": 1583750581667,
    "id": "kms_V3B5OxT7",
    "environmentId": "c76535087c5767b83a211036197115d071daf897bfd951bc18f834fc535d9fa9",
    "ip": "172.17.0.3",
    "uri": "ws://172.17.0.3:8888/kurento",
    "newStatus": "running",
    "oldStatus": "launching",
    "clusterId": "MY_CLUSTER"
  }
}
```

<br>

---

#### autoscaling

Recorded when [autoscaling](openvidu-pro/scalability/#autoscaling){:target="_blank"} is enabled and the autoscaling algorithm has generated any kind of change in the status of the Media Nodes. This includes Media Nodes that must be launched and Media Nodes that must be terminated, taking into account the different statuses the Media Nodes may have in order to make the most optimal decision. That is: which specific Media Nodes must transit from which previous status to which new status in order to reach the new desired number of Media Nodes in the least possible amount of time.

For example, when a new Media Node is needed, the algorithm will always prioritize transitioning Media Nodes in `waiting-idle-to-terminate` status to `running` status, instead of launching a brand new Media Node. And if some Media Node must be removed because the load is low enough, the algorithm will always cancel any `launching` Media Node (setting its status to `canceled`) instead of removing a running one. Check out [Media Node statuses](openvidu-pro/scalability/#media-node-statuses){:target="_blank"} and [austocaling](openvidu-pro/scalability/#autoscaling){:target="_blank"} sections to learn more.

An autoscaling event will always be followed by one or more [mediaNodeStatusChanged](#medianodestatuschanged) events applying the required changes to the cluster.

| Property     | Description                                | Value                                          |
| ------------ | ------------------------------------------ | ---------------------------------------------- |
| `clusterId`  | Unique identifier of this OpenVidu Pro cluster (configuration property `OPENVIDU_PRO_CLUSTER_ID`) | A string with the OpenVidu Pro cluster unique identifier |
| `reason`     | A detailed description of why the autoscaling algorithm triggered this adjustment on the cluster size | A string with the reason of the autoscaling event |
| `mediaNodes` | An object with the Media Nodes affected by the autoscaling event | See **[mediaNodes](#medianodes)** |
| `system`     | An object with a complete description of the system regarding the state of autoscaling | See **[system](#system)** |
| `timestamp`  | Time when the event was triggered          | UTC milliseconds                              |

<br>

##### mediaNodes

| Property          | Description                                | Value                                          |
| ----------------- | ------------------------------------------ | ---------------------------------------------- |
| `launch`          | Media Nodes that are going to be added to the cluster | An object with 4 properties: <ul><li style="color: inherit"><code>total</code> : a number counting the total amount of Media Nodes that are going to be added to the cluster (sum of the following properties).</li><li style="color: inherit"><code>newNodes</code> : a number counting the amount of completely new Media Nodes that will be launched. For [On Premises](openvidu-pro/deployment/on-premises/){:target="_blank"} OpenVidu Pro clusters, this is the number of Media Nodes that must be manually launched and/or added to the cluster.</li><li style="color: inherit"><code>waitingIdleToTerminateNodes</code> : an array of Media Nodes (see <a href="#medianode"><strong>mediaNode</strong></a>) that are transitioning from <code>waiting-idle-to-terminate</code> status to <code>running</code> status.</li><li style="color: inherit"><code>canceledNodes</code> : an array of Media Nodes (see <a href="#medianode"><strong>mediaNode</strong></a>) that are transitioning from <code>canceled</code> status to <code>launching</code> status.</li></ul> |
| `terminate`       | Media Nodes that are going to be removed from the cluster | An object with 3 properties: <ul><li style="color: inherit"><code>total</code> : a number counting the total amount of Media Nodes that are going to be removed from the cluster (sum of the following properties).</li><li style="color: inherit"><code>runningNodes</code> : an array of Media Nodes (see <a href="#medianode"><strong>mediaNode</strong></a>) that are transitioning from <code>running</code> status to A) <code>waiting-idle-to-terminate</code> status, if there are ongoing sessions inside the Media Node, or B) <code>terminating</code> status, if the Media Node is empty and can be immediately removed.</li><li style="color: inherit"><code>launchingNodes</code> : an array of Media Nodes (see <a href="#medianode"><strong>mediaNode</strong></a>) that are transitioning from <code>launching</code> status to <code>canceled</code> status.</li></ul> |

##### mediaNode

| Property          | Description                                | Value                                          |
| ----------------- | ------------------------------------------ | ---------------------------------------------- |
| `id`              | Unique identifier of the Media Node        | A string with the Media Node unique identifier |
| `environmentId`   | Unique identifier of the Media Node, dependent on the deployment environment. For example, an AWS EC2 machine id if the cluster is deployed in AWS | A string with the Media Node environment unique identifier |
| `ip`              | IP of the Media Node                       | A string with the Media Node IP |
| `load`            | The CPU load of the Media Node | A decimal number between 0.00 and 100.00 |
| `status`          | Status of the Media Node. See [Media Node statuses](openvidu-pro/scalability/#media-node-statuses){:target="_blank"} | A string with the Media Node new status |

##### system

| Property | Description                                | Value                                          |
| -------- | ------------------------------------------ | ---------------------------------------------- |
| `config` | Autoscaling configuration                  | An object with 4 properties with the current autoscaling-related [configuration properties](openvidu-pro/reference-docs/openvidu-pro-config/){:target="_blank"}: <ul><li style="color: inherit"><code>maxNodes</code> : value of configuration property <code>OPENVIDU_PRO_CLUSTER_AUTOSCALING_MAX_NODES</code> </li><li style="color: inherit"><code>minNodes</code> : value of configuration property <code>OPENVIDU_PRO_CLUSTER_AUTOSCALING_MIN_NODES</code> </li><li style="color: inherit"><code>maxAvgLoad</code> : value of configuration property <code>OPENVIDU_PRO_CLUSTER_AUTOSCALING_MAX_LOAD</code> </li><li style="color: inherit"><code>minAvgLoad</code> : value of configuration property <code>OPENVIDU_PRO_CLUSTER_AUTOSCALING_MIN_LOAD</code> </li></ul> |
| `status` | Current cluster status, including a complete description of its Media Nodes and the current load of the cluster | See **[status](#status)** |

##### status

| Property          | Description                                | Value                                          |
| ----------------- | ------------------------------------------ | ---------------------------------------------- |
| `numNodes`        | Total number of active Media Nodes in the cluster. Active nodes are those in `running` or `launching` status | A number |
| `totalLoad`       | Total CPU load of the cluster. It is calculated with the sum of all Media Nodes that may have load greater than 0: those in `running` or `waiting-idle-to-terminate` status | A decimal number |
| `avgLoad`         | The average load per Media Node. It is calculated by dividing `totalLoad` by `numNodes`. This parameter is the one compared to the limits set with [configuration properties](openvidu-pro/reference-docs/openvidu-pro-config/){:target="_blank"} `OPENVIDU_PRO_CLUSTER_AUTOSCALING_MAX_LOAD` and `OPENVIDU_PRO_CLUSTER_AUTOSCALING_MIN_LOAD` to determine if the the cluster size must be modified | A decimal number between 0.00 and 100.00 |
| `runningNodes`    | Media Nodes in `running` status | Array of **[mediaNode](#medianode)** |
| `launchingNodes`  | Media Nodes in `launching` status | Array of **[mediaNode](#medianode)** |
| `waitingIdleToTerminateNodes` | Media Nodes in `waiting-idle-to-terminate` status | Array of **[mediaNode](#medianode)** |
| `canceledNodes`   | Media Nodes in `canceled` status | Array of **[mediaNode](#medianode)** |

Example:
```json
{
  "autoscaling": {
    "clusterId": "MY_CLUSTER",
    "reason": "The cluster average load (7.95%) is below its limits [30.00%, 70.00%] and the lower limit of Media Nodes (1) has not been reached. Current number of active nodes is 3 (2 launching and 1 running). 2 launching Media Nodes will be canceled.",
    "mediaNodes": {
      "launch": {
        "total": 0,
        "newNodes": 0,
        "waitingIdleToTerminateNodes": [],
        "canceledNodes": []
      },
      "terminate": {
        "total": 2,
        "runningNodes": [],
        "launchingNodes": [
          {
            "id": "kms_MdNUPBwS",
            "environmentId": null,
            "ip": null,
            "load": 0,
            "status": "launching"
          },
          {
            "id": "kms_Imvwxeny",
            "environmentId": null,
            "ip": null,
            "load": 0,
            "status": "launching"
          }
        ]
      }
    },
    "system": {
      "config": {
        "maxNodes": 3,
        "minNodes": 1,
        "maxAvgLoad": 70,
        "minAvgLoad": 30
      },
      "status": {
        "numNodes": 3,
        "totalLoad": 23.84,
        "avgLoad": 7.946666666666666,
        "runningNodes": [
          {
            "id": "kms_M5VJ2N69",
            "environmentId": "19e279f27f150764d26963f63d428b5e4841ff58aeffad352e4cc35fde4b2209",
            "ip": "172.17.0.2",
            "load": 23.84,
            "status": "running"
          }
        ],
        "launchingNodes": [
          {
            "id": "kms_Imvwxeny",
            "environmentId": null,
            "ip": null,
            "load": 0,
            "status": "launching"
          },
          {
            "id": "kms_MdNUPBwS",
            "environmentId": null,
            "ip": null,
            "load": 0,
            "status": "launching"
          }
        ],
        "waitingIdleToTerminateNodes": [],
        "canceledNodes": []
      }
    },
    "timestamp": 1592994854492
  }
}
```

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