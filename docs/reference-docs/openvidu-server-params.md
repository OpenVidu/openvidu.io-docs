<h2 id="section-title">OpenVidu Server configuration parameters</h2>
<hr>

#### List of configuration parameters when launching openvidu-server:

| Parameter            | Description   										     | Default value |
| -------------------- | ------------------------------------------------------- | ------------- |
| `openvidu.secret`    | Secret used to connect to OpenVidu Server. This value is required when using the [REST API](/reference-docs/REST-API/) or any server client ([openvidu-java-client](/reference-docs/openvidu-java-client), [openvidu-node-client](/reference-docs/openvidu-node-client)), as well as when connecting to openvidu-server dashboard | ***MY_SECRET*** |
| `openvidu.publicurl` | URL to connect clients to OpenVidu Server. This must be the full IP of your OpenVidu Server, including _protocol_, _host_ and _port_ (for example: `https://my.openvidu.server.ip:8443`). If no _port_ argument is provided, `server.port` param will be appended to it | ***local***<br>(with default value _local_ this parameter will be set to `localhost:PORT`, being _PORT_ the param `server.port`) |
| `openvidu.cdr`       | Whether to enable Call Detail Record or not | ***false*** |
| `server.port`        | Port where OpenVidu Server will listen to client's connections | ***8443*** |
| `kms.uris`           | KMS URL's to which OpenVidu Server will try to connect. They are tested in order until a valid one is found | ***[\"ws://localhost:8888/kurento\"]***<br>(default value for a KMS running in the same machine as OpenVidu Server) |

Example:

```console
java -Dopenvidu.secret=YOUR_SECRET -Dopenvidu.publicurl=https://my.openvidu.server.ip:3333 -Dopenvidu.cdr=true -Dserver.port=3333 -Dkms.uris=[\"ws://my.kms.ip:8888/kurento\"] -jar openvidu-server.jar
```

#### List of additional configuration parameters when launching [openvidu-server-kms](https://hub.docker.com/r/openvidu/openvidu-server-kms/) Docker container:

| Parameter            | Description   	                      | Sample value |
| -------------------- | ------------------------------------ | ------------- |
| `KMS_STUN_IP`   | IP of STUN server used by KMS             | `stun.l.google.com` (free STUN server from Google) |
| `KMS_STUN_PORT` | PORT of STUN server used by KMS           | `19302` (free STUN server from Google) | 
| `KMS_TURN_URL`  | Configuration for TURN server used by KMS | `user:pass@turn_public_ip:turn_port` (_user_ and _pass_ of the TURN server, _turn_public_ip_ its publicly accessible url and _turn_port_ the port the TURN server listens to |

Example:

```console
docker run -d -p 3333:3333 -e openvidu.secret=YOUR_SECRET -e openvidu.publicurl=https://my.openvidu.server.ip:3333 -e openvidu.cdr=true -e server.port=3333 -e KMS_STUN_IP=stun.l.google.com -e KMS_STUN_PORT=19302 -e KMS_TURN_URL=myuser:mypass@54.54.54.54:3478 openvidu/openvidu-server-kms
```

#### Call Detail Record

OpenVidu Server offers a CDR logging system, so you can easily keep record of every session, every user connecting to them and every connection established by each one of the users. To start OpenVidu Server with CDR enabled, launch it with option `openvidu.cdr=true`.
