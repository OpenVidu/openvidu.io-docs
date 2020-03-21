<h2 id="section-title">OpenVidu Server Pro CDR</h2>
<hr>

OpenVidu Pro provides all of [OpenVidu CE CDR events](reference-docs/openvidu-server-cdr){:target="_blank"}, but also includes some extra events of its own. Also remember that all OpenVidu Pro CDR events are also dispatched by OpenVidu Webhook, just as stated in [OpenVidu CE documentation](reference-docs/openvidu-server-webhook/#available-events-in-webhook-service){:target="_blank"}.

### Events in OpenVidu Pro CDR

- [**mediaNodeStatusChanged**](#medianodestatuschanged)

<br>

---

#### mediaNodeStatusChanged

Recorded when the status of a Media Node of an OpenVidu Pro cluster has changed. This event is only triggered when OpenVidu Pro is running in cluster mode. See [Scalability](openvidu-pro/scalability/){:target="_blank"} section to learn more.


| Property          | Description                                | Value                                          |
| ----------------- | ------------------------------------------ | ---------------------------------------------- |
| `id`              | Unique identifier of the Media Node        | A string with the Media Node unique identifier |
| `environmentId`   | Unique identifier of the Media Node, dependent on the deployment environment. For example, an AWS EC2 machine id if the cluster is deployed in AWS | A string with the Media Node environment unique identifier |
| `ip`              | IP of the Media Node        | A string with the Media Node IP |
| `uri`             | URI of the Media Node. This is the actual direction where OpenVidu Server Pro Media Node connects to this Media Node | A string with the Media Node URI |
| `clusterId`       | OpenVidu Pro cluster identifier. This allows you to identify the specific cluster to which the Media Node triggering this event belongs, specially if you have more than one OpenVidu Pro cluster running (see ) | A string with the cluster identifier |
| `oldStatus`       | Old status of the Media Node. See [Media Node statuses](openvidu-pro/scalability/#media-node-statuses){:target="_blank"} | A string with the Media Node old status. `null` if _newStatus_ is `launching` |
| `newStatus`       | New status of the Media Node. See [Media Node statuses](openvidu-pro/scalability/#media-node-statuses){:target="_blank"} | A string with the Media Node new status |
| `timestamp`       | Time when the event was triggered          | UTC milliseconds                              |

Example:
```json
{"mediaNodeStatusChanged":{"timestamp":1583750581667,"id":"kms_V3B5OxT7","environmentId":"c76535087c5767b83a211036197115d071daf897bfd951bc18f834fc535d9fa9","ip":"172.17.0.3","uri":"ws://172.17.0.3:8888/kurento","newStatus":"running","oldStatus":"launching","clusterId":"CLUSTER1"}}
```

<br>