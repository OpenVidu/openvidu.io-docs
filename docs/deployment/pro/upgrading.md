<h2 id="section-title">Upgrading OpenVidu Pro</h2>
<hr>

- **[Migrating from 2.19.0 to 2.20.0](#migrating-from-2190-to-2200)**
- **[Migrating from 2.18.0 to 2.19.0](#migrating-from-2180-to-2190)**
- **[Migrating from 2.17.0 to 2.18.0](#migrating-from-2170-to-2180)**
- **[Migrating from 2.16.0 to 2.17.0](#migrating-from-2160-to-2170)**
- **[Migrating from 2.15.1 to 2.16.0](#migrating-from-2151-to-2160)**
- **[Migrating from 2.14.0 to 2.15.1](#migrating-from-2140-to-2151)**
- **[Migrating from 2.13.0 to 2.14.0](#migrating-from-2130-to-2140)**
- **[Migrating from ≤2.12.0 to 2.13.0](#migrating-from-2120-to-2130)**
- **[Notes when upgrading Master Node](#notes-when-upgrading-master-node)**
- **[Notes when upgrading Media Nodes](#notes-when-upgrading-media-nodes)**

---

<div style="
    display: table;
    border: 2px solid #0088aa9e;
    border-radius: 5px;
    width: 100%;
    margin-top: 40px;
    margin-bottom: 10px;
    padding: 10px 0 0 0;
    background-color: rgba(0, 136, 170, 0.04);"><div style="display: table-cell; vertical-align: middle">
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
      Be careful when upgrading your version of OpenVidu Pro:
      <ul>
        <li style="color: inherit">Never upgrade across <strong>multiple major versions</strong>: to upgrade from 2.16.0 to 2.18.0, you must first go through 2.17.0.</li>
        <li style="color: inherit">Read carefully the <a href="releases/"><strong>Release Notes</strong></a> of any new version you plan to upgrade. Sometimes there are <strong>breaking changes</strong> that will require you to update your application.</li>
      </ul>
</div>
</div>

## Migrating from 2.19.0 to 2.20.0

### Upgrading Master Node

Connect to the Master Node instance through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/openvidu`

```bash
sudo -s
cd /opt/openvidu # Recommended and default installation path
```

Then you can run the upgrade script with this command:

<p style="text-align: start">
<code id="code-3"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_pro_2.20.0.sh | bash -s upgrade</strong></code>
<button id="btn-copy-3" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
                              title="Copy to Clipboard">Copy</button>
</p>

The installation steps will output their progress as they run. If everything goes well, at the end you will see a message with the final instructions to successfully complete the upgrade process:

```console
================================================
Openvidu successfully upgraded to version 2.20.0
================================================
1. A new file 'docker-compose.yml' has been created with the new OpenVidu 2.20.0 services

2. The previous file '.env' remains intact, but a new file '.env-2.20.0' has been created.
Transfer any configuration you wish to keep in the upgraded version from '.env' to '.env-2.20.0'.
When you are OK with it, rename and leave as the only '.env' file of the folder the new '.env-2.20.0'.

3. If you were using Openvidu Call application, it has been automatically updated in file 'docker-compose.override.yml'.
However, if you were using your own application, a file called 'docker-compose.override.yml-2.20.0'
has been created with the latest version of Openvidu Call. If you don't plan to use it you can delete it.

4. Start new version of Openvidu
$ ./openvidu start

If you want to rollback, all the files from the previous installation have been copied to folder '.old-2.19.0'
```

<div></div>

> **Check out the [notes when upgrading Master Node](#notes-when-upgrading-master-node)**

### Upgrading Media Node

Connect to the Media Node instance through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/kms`

```bash
sudo -s
cd /opt/kms # Recommended and default installation path
```

Then you can run the upgrade script with this command:

<p style="text-align: start">
<code id="code-4"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_media_node_2.20.0.sh | bash -s upgrade</strong></code>
<button id="btn-copy-4" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
                              title="Copy to Clipboard">Copy</button>
</p>

The installation steps will output their progress as they run. If everything goes well, at the end you will see a message with the final instructions to successfully complete the upgrade process:

```console
================================================
Openvidu successfully upgraded to version 2.20.0
================================================

1. A new file 'docker-compose.yml' has been created with the new OpenVidu 2.20.0 services

2. This new version 2.20.0 does not need any .env file. Everything is configured from OpenVidu Pro

3. Start new version of Media Node
$ ./media_node start

4. This will run a service at port 3000 which OpenVidu will use to deploy necessary containers.
Add the private ip of this media node in "KMS_URIS=[]" in OpenVidu Pro machine
in file located at "/opt/openvidu/.env" with this format:
    ...
    KMS_URIS=["ws://<MEDIA_NODE_PRIVATE_IP>:8888/kurento"]
    ...
You can also add Media Nodes from inspector

5. Start or restart OpenVidu Pro and all containers will be provisioned
automatically to all the media nodes configured in "KMS_URIS"
```

<div></div>

> **Check out the [notes when upgrading Media Nodes](#notes-when-upgrading-media-nodes)**

<br>

---
## Migrating from 2.18.0 to 2.19.0

### Upgrading Master Node

Connect to the Master Node instance through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/openvidu`

```bash
sudo -s
cd /opt/openvidu # Recommended and default installation path
```

Then you can run the upgrade script with this command:

<p style="text-align: start">
<code id="code-3"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_pro_2.19.0.sh | bash -s upgrade</strong></code>
<button id="btn-copy-3" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
                              title="Copy to Clipboard">Copy</button>
</p>

The installation steps will output their progress as they run. If everything goes well, at the end you will see a message with the final instructions to successfully complete the upgrade process:

```console
================================================
Openvidu successfully upgraded to version 2.19.0
================================================
1. A new file 'docker-compose.yml' has been created with the new OpenVidu 2.19.0 services

2. The previous file '.env' remains intact, but a new file '.env-2.19.0' has been created.
Transfer any configuration you wish to keep in the upgraded version from '.env' to '.env-2.19.0'.
When you are OK with it, rename and leave as the only '.env' file of the folder the new '.env-2.19.0'.

3. If you were using Openvidu Call application, it has been automatically updated in file 'docker-compose.override.yml'.
However, if you were using your own application, a file called 'docker-compose.override.yml-2.19.0'
has been created with the latest version of Openvidu Call. If you don't plan to use it you can delete it.

4. Start new version of Openvidu
$ ./openvidu start

If you want to rollback, all the files from the previous installation have been copied to folder '.old-2.18.0'
```

<div></div>

> **Check out the [notes when upgrading Master Node](#notes-when-upgrading-master-node)**

### Upgrading Media Node

Connect to the Media Node instance through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/kms`

```bash
sudo -s
cd /opt/kms # Recommended and default installation path
```

Then you can run the upgrade script with this command:

<p style="text-align: start">
<code id="code-4"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_media_node_2.19.0.sh | bash -s upgrade</strong></code>
<button id="btn-copy-4" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
                              title="Copy to Clipboard">Copy</button>
</p>

The installation steps will output their progress as they run. If everything goes well, at the end you will see a message with the final instructions to successfully complete the upgrade process:

```console
================================================
Openvidu successfully upgraded to version 2.19.0
================================================

1. A new file 'docker-compose.yml' has been created with the new OpenVidu 2.19.0 services

2. This new version 2.19.0 does not need any .env file. Everything is configured from OpenVidu Pro

3. Start new version of Media Node
$ ./media_node start

4. This will run a service at port 3000 which OpenVidu will use to deploy necessary containers.
Add the private ip of this media node in "KMS_URIS=[]" in OpenVidu Pro machine
in file located at "/opt/openvidu/.env" with this format:
    ...
    KMS_URIS=["ws://<MEDIA_NODE_PRIVATE_IP>:8888/kurento"]
    ...
You can also add Media Nodes from inspector

5. Start or restart OpenVidu Pro and all containers will be provisioned
automatically to all the media nodes configured in "KMS_URIS"
```

<div></div>

> **Check out the [notes when upgrading Media Nodes](#notes-when-upgrading-media-nodes)**

<br>

---

## Migrating from 2.17.0 to 2.18.0

### Upgrading Master Node

Connect to the Master Node instance through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/openvidu`

```bash
sudo -s
cd /opt/openvidu # Recommended and default installation path
```

Then you can run the upgrade script with this command:

<p style="text-align: start">
<code id="code-3"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_pro_2.18.0.sh | bash -s upgrade</strong></code>
<button id="btn-copy-3" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
                              title="Copy to Clipboard">Copy</button>
</p>

The installation steps will output their progress as they run. If everything goes well, at the end you will see a message with the final instructions to successfully complete the upgrade process:

```console
================================================
Openvidu successfully upgraded to version 2.18.0
================================================
1. A new file 'docker-compose.yml' has been created with the new OpenVidu 2.18.0 services

2. The previous file '.env' remains intact, but a new file '.env-2.18.0' has been created.
Transfer any configuration you wish to keep in the upgraded version from '.env' to '.env-2.18.0'.
When you are OK with it, rename and leave as the only '.env' file of the folder the new '.env-2.18.0'.

3. If you were using Openvidu Call application, it has been automatically updated in file 'docker-compose.override.yml'.
However, if you were using your own application, a file called 'docker-compose.override.yml-2.18.0'
has been created with the latest version of Openvidu Call. If you don't plan to use it you can delete it.

4. Start new version of Openvidu
$ ./openvidu start

If you want to rollback, all the files from the previous installation have been copied to folder '.old-2.17.0'
```

<div></div>

> **Check out the [notes when upgrading Master Node](#notes-when-upgrading-master-node)**

### Upgrading Media Node

Connect to the Media Node instance through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/kms`

```bash
sudo -s
cd /opt/kms # Recommended and default installation path
```

Then you can run the upgrade script with this command:

<p style="text-align: start">
<code id="code-4"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_media_node_2.18.0.sh | bash -s upgrade</strong></code>
<button id="btn-copy-4" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
                              title="Copy to Clipboard">Copy</button>
</p>

The installation steps will output their progress as they run. If everything goes well, at the end you will see a message with the final instructions to successfully complete the upgrade process:

```console
================================================
Openvidu successfully upgraded to version 2.18.0
================================================

1. A new file 'docker-compose.yml' has been created with the new OpenVidu 2.18.0 services

2. This new version 2.18.0 does not need any .env file. Everything is configured from OpenVidu Pro

3. Start new version of Media Node
$ ./media_node start

4. This will run a service at port 3000 which OpenVidu will use to deploy necessary containers.
Add the private ip of this media node in "KMS_URIS=[]" in OpenVidu Pro machine
in file located at "/opt/openvidu/.env" with this format:
    ...
    KMS_URIS=["ws://<MEDIA_NODE_PRIVATE_IP>:8888/kurento"]
    ...
You can also add Media Nodes from inspector

5. Start or restart OpenVidu Pro and all containers will be provisioned
automatically to all the media nodes configured in "KMS_URIS"
```

<div></div>

> **Check out the [notes when upgrading Media Nodes](#notes-when-upgrading-media-nodes)**

<br>

---

## Migrating from 2.16.0 to 2.17.0

### Upgrading Master Node

Connect to the Master Node instance through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/openvidu`

```bash
sudo -s
cd /opt/openvidu # Recommended and default installation path
```

Then you can run the upgrade script with this command:

<p style="text-align: start">
<code id="code-3"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_pro_2.17.0.sh | bash -s upgrade</strong></code>
<button id="btn-copy-3" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
                              title="Copy to Clipboard">Copy</button>
</p>

The installation steps will output their progress as they run. If everything goes well, at the end you will see a message with the final instructions to successfully complete the upgrade process:

```console
================================================
Openvidu successfully upgraded to version 2.17.0
================================================
1. A new file 'docker-compose.yml' has been created with the new OpenVidu 2.17.0 services

2. The previous file '.env' remains intact, but a new file '.env-2.17.0' has been created.
Transfer any configuration you wish to keep in the upgraded version from '.env' to '.env-2.17.0'.
When you are OK with it, rename and leave as the only '.env' file of the folder the new '.env-2.17.0'.

3. If you were using Openvidu Call application, it has been automatically updated in file 'docker-compose.override.yml'.
However, if you were using your own application, a file called 'docker-compose.override.yml-2.17.0'
has been created with the latest version of Openvidu Call. If you don't plan to use it you can delete it.

4. Start new version of Openvidu
$ ./openvidu start

If you want to rollback, all the files from the previous installation have been copied to folder '.old-2.16.0'
```

<div></div>

> **Check out the [notes when upgrading Master Node](#notes-when-upgrading-master-node)**

### Upgrading Media Node

Connect to the Media Node instance through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/kms`

```bash
sudo -s
cd /opt/kms # Recommended and default installation path
```

Then you can run the upgrade script with this command:

<p style="text-align: start">
<code id="code-4"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_media_node_2.17.0.sh | bash -s upgrade</strong></code>
<button id="btn-copy-4" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
                              title="Copy to Clipboard">Copy</button>
</p>

The installation steps will output their progress as they run. If everything goes well, at the end you will see a message with the final instructions to successfully complete the upgrade process:

```console
================================================
Openvidu successfully upgraded to version 2.17.0
================================================

1. A new file 'docker-compose.yml' has been created with the new OpenVidu 2.17.0 services

2. This new version 2.17.0 does not need any .env file. Everything is configured from OpenVidu Pro

3. Start new version of Media Node
$ ./media_node start

4. This will run a service at port 3000 which OpenVidu will use to deploy necessary containers.
Add the private ip of this media node in "KMS_URIS=[]" in OpenVidu Pro machine
in file located at "/opt/openvidu/.env" with this format:
    ...
    KMS_URIS=["ws://<MEDIA_NODE_PRIVATE_IP>:8888/kurento"]
    ...
You can also add Media Nodes from inspector

5. Start or restart OpenVidu Pro and all containers will be provisioned
automatically to all the media nodes configured in "KMS_URIS"
```

>  **WARNING**: This media node will not have any configuration in `/opt/kms/.env`. All configuration parameters of Kurento Media Server are defined in Master Node using the configuration file in `/opt/openvidu/.env`. You can check more info about how to configure Media Nodes [here](deployment/pro/on-premises/#32-configuration)

<div></div>

> **Check out the [notes when upgrading Media Nodes](#notes-when-upgrading-media-nodes)**

<br>

---

## Migrating from 2.15.1 to 2.16.0

### Upgrading Master Node

Connect to the Master Node instance through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/openvidu`

```bash
sudo -s
cd /opt/openvidu # Recommended and default installation path
```

Then you can run the upgrade script with this command:

<p style="text-align: start">
<code id="code-3"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_pro_2.16.0.sh | bash -s upgrade</strong></code>
<button id="btn-copy-3" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
                              title="Copy to Clipboard">Copy</button>
</p>

The installation steps will output their progress as they run. If everything goes well, at the end you will see a message with the final instructions to successfully complete the upgrade process:

```console
================================================
Openvidu successfully upgraded to version 2.16.0
================================================
1. A new file 'docker-compose.yml' has been created with the new OpenVidu 2.16.0 services

2. The previous file '.env' remains intact, but a new file '.env-2.16.0' has been created.
Transfer any configuration you wish to keep in the upgraded version from '.env' to '.env-2.16.0'.
When you are OK with it, rename and leave as the only '.env' file of the folder the new '.env-2.16.0'.

3. If you were using Openvidu Call application, it has been automatically updated in file 'docker-compose.override.yml'.
However, if you were using your own application, a file called 'docker-compose.override.yml-2.16.0'
has been created with the latest version of Openvidu Call. If you don't plan to use it you can delete it.

4. Start new version of Openvidu
$ ./openvidu start

If you want to rollback, all the files from the previous installation have been copied to folder '.old-2.15.1'
```

>  **WARNING**: Take into account that the variables `KIBANA_USER` and `KIBANA_PASSWORD` are now `ELASTICSEARCH_USERNAME` and `ELASTICSEARCH_PASSWORD`. Both services (Elasticsearch and Kibana) are now secured with Basic Authentication using the official implementation of the ELK stack.

<div></div>

> **Check out the [notes when upgrading Master Node](#notes-when-upgrading-master-node)**

### Upgrading Media Node

Connect to the Media Node instance through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/kms`

```bash
sudo -s
cd /opt/kms # Recommended and default installation path
```

Then you can run the upgrade script with this command:

<p style="text-align: start">
<code id="code-4"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_media_node_2.16.0.sh | bash -s upgrade</strong></code>
<button id="btn-copy-4" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
                              title="Copy to Clipboard">Copy</button>
</p>

The installation steps will output their progress as they run. If everything goes well, at the end you will see a message with the final instructions to successfully complete the upgrade process:

```console
================================================
Openvidu successfully upgraded to version 2.16.0
================================================

1. A new file 'docker-compose.yml' has been created with the new OpenVidu 2.16.0 services

2. This new version 2.16.0 does not need any .env file. Everything is configured from OpenVidu Pro

3. Start new version of Media Node
$ ./media_node start

4. This will run a service at port 3000 which OpenVidu will use to deploy necessary containers.
Add the private ip of this media node in "KMS_URIS=[]" in OpenVidu Pro machine
in file located at "/opt/openvidu/.env" with this format:
    ...
    KMS_URIS=["ws://<MEDIA_NODE_PRIVATE_IP>:8888/kurento"]
    ...
You can also add Media Nodes from inspector

5. Start or restart OpenVidu Pro and all containers will be provisioned
automatically to all the media nodes configured in "KMS_URIS"
```

>  **WARNING**: This media node will not have any configuration in `/opt/kms/.env`. All configuration parameters of Kurento Media Server are defined in Master Node using the configuration file in `/opt/openvidu/.env`. You can check more info about how to configure Media Nodes [here](deployment/pro/on-premises/#32-configuration)

<div></div>

> **Check out the [notes when upgrading Media Nodes](#notes-when-upgrading-media-nodes)**

<br>

---

## Migrating from 2.14.0 to 2.15.1

### Upgrading Master Node

Open ports **5044 TCP** and **9200 TCP** so **Media Nodes** can use them. These ports are necessary for OpenVidu Server Pro and ElasticSearch
to receive metrics from Media Nodes and receive logs.

> **WARNING**: It is very important to not open publicly ports **5044 TCP** and **9200 TCP**. Only open these ports to be used by Media Nodes.

Connect to the Master Node instance through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/openvidu`

```bash
sudo -s
cd /opt/openvidu # Recommended and default installation path
```

Then you can run the upgrade script with this command:

<p style="text-align: start">
<code id="code-3"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_pro_2.15.1.sh | bash -s upgrade</strong></code>
<button id="btn-copy-3" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
                              title="Copy to Clipboard">Copy</button>
</p>

The installation steps will output their progress as they run. If everything goes well, at the end you will see a message with the final instructions to successfully complete the upgrade process:

```console
================================================
Openvidu successfully upgraded to version 2.15.0
================================================

1. A new file 'docker-compose.yml' has been created with the new OpenVidu 2.15.0 services.

2. The previous file '.env' remains intact, but a new file '.env-2.15.0' has been created.
Transfer any configuration you wish to keep in the upgraded version from '.env' to '.env-2.15.0'.
When you are OK with it, rename and leave as the only '.env' file of the folder the new '.env-2.15.0'.

3. If you were using Openvidu Call application, it has been automatically updated in file
'docker-compose.override.yml'. However, if you were using your own application, a file called
'docker-compose.override.yml-2.15.0' has been created with the latest version of Openvidu Call.
If you don't plan to use it you can delete it.

4. Start new version of Openvidu
$ ./openvidu start

If you want to rollback, all the files from the previous installation have been copied to folder '.old-2.14.0'

For further information, check readme.md
```

> **Check out the [notes when upgrading Master Node](#notes-when-upgrading-master-node)**

### Upgrading Media Node

Open port **3000 TCP** so **OpenVidu Server Pro** can use it. This port is necessary to provision **Media Node** by **OpenVidu Server Pro**.

> **WARNING**: It is very important to not open publicly ports **3000 TCP**. Only open this port to be used by OpenVidu Server Pro.

Connect to the Media Node instance through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/kms`

```bash
sudo -s
cd /opt/kms # Recommended and default installation path
```

Then you can run the upgrade script with this command:

<p style="text-align: start">
<code id="code-4"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_media_node_2.15.1.sh | bash -s upgrade</strong></code>
<button id="btn-copy-4" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
                              title="Copy to Clipboard">Copy</button>
</p>

The installation steps will output their progress as they run. If everything goes well, at the end you will see a message with the final instructions to successfully complete the upgrade process:

```console
================================================
Openvidu successfully upgraded to version 2.15.0
================================================

1. A new file 'docker-compose.yml' has been created with the new OpenVidu 2.15.0 services.

2. The previous file '.env' remains intact, but a new file '.env-2.15.0' has been created.
Transfer any configuration you wish to keep in the upgraded version from '.env' to '.env-2.15.0'.
When you are OK with it, rename and leave as the only '.env' file of the folder the new '.env-2.15.0'.

3. Start new version of Media Node
$ ./media_node start

If you want to roll-back all the files from the previous installation are in the folder '.old-2.14.0'

For more information, check readme.md
```

> **Check out the [notes when upgrading Media Nodes](#notes-when-upgrading-media-nodes)**

<br>

---

## Migrating from 2.13.0 to 2.14.0

### Upgrading Master Node

Connect to the Master Node instance through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/openvidu`

```bash
sudo -s
cd /opt/openvidu # Recommended and default installation path
```

Then you can run the upgrade script with this command:

<p style="text-align: start">
<code id="code-3"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_pro_2.14.0.sh | bash -s upgrade</strong></code>
<button id="btn-copy-3" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
                              title="Copy to Clipboard">Copy</button>
</p>

The installation steps will output their progress as they run. If everything goes well, at the end you will see a message with the final instructions to successfully complete the upgrade process:

```console
================================================
Openvidu successfully upgraded to version 2.14.0
================================================

1. A new file 'docker-compose.yml' has been created with the new OpenVidu 2.14.0 services.

2. The previous file '.env' remains intact, but a new file '.env-2.14.0' has been created.
Transfer any configuration you wish to keep in the upgraded version from '.env' to '.env-2.14.0'.
When you are OK with it, rename and leave as the only '.env' file of the folder the new '.env-2.14.0'.

3. If you were using Openvidu Call application, it has been automatically updated in file
'docker-compose.override.yml'. However, if you were using your own application, a file called
'docker-compose.override.yml-2.14.0' has been created with the latest version of Openvidu Call.
If you don't plan to use it you can delete it.

4. Start new version of Openvidu
$ ./openvidu start

If you want to rollback, all the files from the previous installation have been copied to folder '.old-2.13.0'

For further information, check readme.md
```

> **Check out the [notes when upgrading Master Node](#notes-when-upgrading-master-node)**

### Upgrading Media Node

Connect to the Media Node instance through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/kms`

```bash
sudo -s
cd /opt/kms # Recommended and default installation path
```

Then you can run the upgrade script with this command:

<p style="text-align: start">
<code id="code-4"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_media_node_2.14.0.sh | bash -s upgrade</strong></code>
<button id="btn-copy-4" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
                              title="Copy to Clipboard">Copy</button>
</p>

The installation steps will output their progress as they run. If everything goes well, at the end you will see a message with the final instructions to successfully complete the upgrade process:

```console
================================================
Openvidu successfully upgraded to version 2.14.0
================================================

1. A new file 'docker-compose.yml' has been created with the new OpenVidu 2.14.0 services.

2. The previous file '.env' remains intact, but a new file '.env-2.14.0' has been created.
Transfer any configuration you wish to keep in the upgraded version from '.env' to '.env-2.14.0'.
When you are OK with it, rename and leave as the only '.env' file of the folder the new '.env-2.14.0'.

3. Start new version of Media Node
$ ./media_node start

If you want to roll-back all the files from the previous installation are in the folder '.old-2.13.0'

For more information, check readme.md
```

> **Check out the [notes when upgrading Media Nodes](#notes-when-upgrading-media-nodes)**

<br>

---

## Migrating from ≤2.12.0 to 2.13.0

Unfortunately upgrading OpenVidu Pro to <strong>2.13.0</strong> from any past version will require you to completely wipe out your past version, as the installation procedure has completely changed to a Docker deployment. Good news is that from this point in time, upgrading or downgrading versions will be extremely quick and easy!

The only thing to take into account is the data you may want to keep when upgrading to 2.13.0: recordings and Elasticsearch data.

### Backup recordings

Only if you have used the [recording](advanced-features/recording/) feature you may want to keep your old recorded files available in your new deployment. This is as straightforward as copying the entire recording folder before wiping out your old server (≤2.12.0 config property `openvidu.recording.path`, by default `/opt/openvidu/recordings`). After successfully installing 2.13.0, simply paste this same folder at the recording path of your new installation. All of your recordings will be immediately available in the new version.

### Backup Elasticsearch data

If you want to keep your [Elasticsearch data](openvidu-pro/monitoring-elastic-stack/), then you have to copy the Elasticsearch database from your old deployment to your new 2.13.0 deployment. Of course you have to do so **before wiping out your old OpenVidu Server Pro instance**. The following steps indicate how to automate all of this process with some simple commands:

#### 1) Copy existing Elasticsearch data from your old ≤2.12.0 Master Node to your new 2.13.0 Master Node

First compress the Elasticsearch database in your old Master Node and then download the file. You can do it like this (a standard ubuntu installation of Elasticsearch is presumed at `/var/lib/elasticsearch`. This path is the default one for ≤2.12.0 OpenVidu deployments on AWS and is also the default path where Elasticsearch stores its data in Linux systems).

```bash
ssh -i SSH_KEY ubuntu@OLD_OPENVIDU_PRO_IP "sudo tar zcvfP /tmp/elasticsearch.tar.gz -C /var/lib/elasticsearch nodes"
scp -i SSH_KEY ubuntu@OLD_OPENVIDU_PRO_IP:/tmp/elasticsearch.tar.gz elasticsearch.tar.gz
```

We have zipped the old Elasticsearch data and downloaded to our computer. Now we will upload it to the new Openvidu Pro Instance:

```bash
scp -i SSH_KEY elasticsearch.tar.gz ubuntu@NEW_OPENVIDU_PRO_IP:/tmp/elasticsearch.tar.gz
```

#### 2) Unzip Elasticsearch data in your new 2.13.0 Master Node and restart services

Connect to your 2.13.0 Openvidu Server Pro instance through SSH:

```bash
ssh -i SSH_KEY ubuntu@NEW_OPENVIDU_PRO_IP
```

Change to `root` user:

```bash
sudo su
```

Stop OpenVidu Pro services (this assumes OpenVidu Pro is installed at the default recommended path `/opt/openvidu/`):

```bash
cd /opt/openvidu
./openvidu stop
```

Unzip the data from the old database into the appropriate path:

```
rm -rf elasticsearch/*
tar -zxvf /tmp/elasticsearch.tar.gz -C elasticsearch
chown -R 1000:1000 elasticsearch
rm /tmp/elasticsearch.tar.gz
```

Restart all services and you will have your Elasticsearch data available in your brand new OpenVidu Pro 2.13.0!

```
./openvidu start
```

> **NOTE**: Remember to update **openvidu-browser** library in your clients. Comply version compatibility according to **[Releases](releases/)**

<br>

---

## Notes when upgrading Master Node

- The upgrade process will restart all OpenVidu services. That means that **all ongoing sessions will be destroyed**.
- Persistent data is preserved when upgrading. This means that all of your recordings and all of your Elasticsearch data will be available in the new version.
- Old Docker images will take up valuable disk space of your machine. If you don't plan to reuse them again, delete them to reclaim your GBs. [docker system prune](https://docs.docker.com/engine/reference/commandline/system_prune/){:target="_blank"} command is very useful for doing so.
- Remember to update **openvidu-browser** library in your clients. Comply version compatibility according to [Releases](releases/) page.
- In case you have **mobile applications**: the previous minor version of openvidu-browser is always compatible with the next minor version of openvidu-server. This way you can upgrade your openvidu-server while giving your clients time to update their applications. Applications using the previous and the new version of openvidu-browser can coexist in the new openvidu-server version. For example, if you upgrade openvidu-server to 2.16.0, it will work fine with applications using both openvidu-browser 2.15.0 and 2.16.0. Of course, you must notify your users to update their applications until all of them are using openvidu-browser 2.16.0.

<br>

---

## Notes when upgrading Media Nodes

- The upgrade process will restart all OpenVidu services. That means that **any ongoing sessions hosted by this Media Node will be terminated**. Take this into account when upgrading your OpenVidu Pro cluster. If you have more than one Media Node, you can upgrade them one by one while others remain available to maintain your service.
- Old Docker images will take up valuable disk space of your machine. If you don't plan to reuse them again, delete them to reclaim your GBs. [docker system prune](https://docs.docker.com/engine/reference/commandline/system_prune/){:target="_blank"} command is very useful for doing so.
- You must perform the upgrading steps in all of your Media Nodes. Be sure to upgrade the Master Node and all of the Media Nodes to the same version number.

<br><br>

<script src="js/copy-btn.js"></script>

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

<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/brands.css" integrity="sha384-Px1uYmw7+bCkOsNAiAV5nxGKJ0Ixn5nChyW8lCK1Li1ic9nbO5pC/iXaq27X5ENt" crossorigin="anonymous">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/fontawesome.css" integrity="sha384-BzCy2fixOYd0HObpx3GMefNqdbA7Qjcc91RgYeDjrHTIEXqiF00jKvgQG0+zY/7I" crossorigin="anonymous">

<link rel="stylesheet" type="text/css" href="css/downloads/slick-1.6.0.css"/>
<link rel="stylesheet" type="text/css" href="css/slick-theme.css"/>
<script type="text/javascript" src="js/downloads/slick-1.6.0.min.js"></script>

<script>
    $('.slick-captions').slick({
      asNavFor: '.upgrade-cf-steps',
      arrows: false,
      infinite: false,
      speed: 200,
      fade: true,
      dots: false
    });
    $('.upgrade-cf-steps').slick({
      asNavFor: '.slick-captions',
      autoplay: false,
      arrows: true,
      prevArrow: '<div class="slick-btn slick-btn-prev"><i class="icon ion-chevron-left"></i></div>',
      nextArrow: '<div class="slick-btn slick-btn-next"><i class="icon ion-chevron-right"></i></div>',
      infinite: false,
      dots: true,
      responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          slidesToShow: 1
        }
      },
    ]
    });
</script>
