<h2 id="section-title">Upgrading OpenVidu Pro</h2>
<hr>

<!--- **[Migrating from 2.14.0 to a higher version](#**-->
- **[Migrating from 2.15.1 to 2.16.0](#migrating-from-2151-to-2160)**
- **[Migrating from 2.14.0 to 2.15.1](#migrating-from-2140-to-2151)**
- **[Migrating from 2.13.0 to 2.14.0](#migrating-from-2130-to-2140)**
- **[Migrating from ≤2.12.0 to 2.13.0](#migrating-from-2120-to-2130)**

<!--
---

## Migrating from 2.14.0 to a higher version

### Upgrading OpenVidu Server Pro Node

```bash
sudo -s
cd /opt/openvidu # Recommended and default installation path
```
```bash
./openvidu upgrade VERSION # Replace VERSION with the version you want: "./openvidu upgrade 2.15.0"
```

### Upgrading Media Node

```bash
sudo -s
cd /opt/kms # Recommended and default installation path
```
```bash
./media_node upgrade VERSION # Replace VERSION with the version you want: "./openvidu upgrade 2.15.0"
```

<br>
-->

---

<div style="
    display: table;
    border: 2px solid #0088aa9e;
    border-radius: 5px;
    width: 100%;
    margin-top: 40px;
    margin-bottom: 10px;
    padding: 10px 0 5px 0;
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
        <li style="color: inherit">Never upgrade across <strong>multiple major versions</strong>: to upgrade from 2.12.0 to 2.14.0, you must first go through 2.13.0.</li>
        <li style="color: inherit">Read carefully the <a href="releases/" target="_blank"><strong>Release Notes</strong></a> of any new version you plan to upgrade. Sometimes there are <strong>breaking changes</strong> that will require you to update your application.</li>
      </ul>
</div>
</div>

## Migrating from 2.15.1 to 2.16.0

### Upgrading OpenVidu Server Pro Node

Connect to the OpenVidu Server Pro Node instance through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/openvidu`

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

If you want to rollback, all the files from the previous installation have been copied to folder '.old-2.14.0'

>  **WARNING**: Take into account that the variables `KIBANA_USER` and `KIBANA_PASSWORD` are now `ELASTICSEARCH_USERNAME` and `ELASTICSEARCH_PASSWORD`. Both services (Elasticsearch and Kibana) are now secured with Basic Authentication using the official implementation of the ELK stack.

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

4. This will run a service at port 3000 wich OpenVidu will use to deploy necessary containers.
Add the private ip of this media node in "KMS_URIS=[]" in OpenVidu Pro machine
in file located at "/opt/openvidu/.env" with this format:
    ...
    KMS_URIS=["ws://<MEDIA_NODE_PRIVATE_IP>:8888/kurento"]
    ...
You can also add Media Nodes from inspector

5. Start or restart OpenVidu Pro and all containers will be provisioned
automatically to all the media nodes configured in "KMS_URIS"
```

>  **WARNING**: This media node will not have any configuration in `/opt/kms/.env`. All configuration parameters of Kurento Media Server are defined in OpenVidu Server Pro Node using the configuration fine in `/opt/openvidu/.env`. You can check more info about how to configure Media Nodes [here](/openvidu-pro/deployment/on-premises/#32-configuration)

<br>

##### Some notes on upgrading Media Nodes

- The upgrade process will stop all OpenVidu containers in this media node. That means that **any ongoing sessions hosted by this Media Node will be terminated**. Take this into account when upgrading your OpenVidu Pro cluster. If you have more than one Media Node, you can upgrade them one by one while others remain available to maintain your service.
- Old Docker images will take up valuable disk space of your machine. If you don't plan to reuse them again, delete them to reclaim your GBs. [docker system prune](https://docs.docker.com/engine/reference/commandline/system_prune/){:target="_blank"} command is very useful for doing so.
- You must perform the upgrading steps in all of your Media Nodes. Be sure to upgrade the OpenVidu Server Pro Node and all of the Media Nodes to the same version number.

## Migrating from 2.14.0 to 2.15.1

### Upgrading OpenVidu Server Pro Node

Open ports **5044 TCP** and **9200 TCP** so **Media Nodes** can use them. These ports are necessary for OpenVidu Server Pro and ElasticSearch
to receive metrics from Media Nodes and receive logs.

> **WARNING**: It is very important to not open publicly ports **5044 TCP** and **9200 TCP**. Only open these ports to be used by Media Nodes.

Connect to the OpenVidu Server Pro Node instance through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/openvidu`

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

<br>

##### Some notes on upgrading Media Nodes

- The upgrade process will restart all OpenVidu services. That means that **any ongoing sessions hosted by this Media Node will be terminated**. Take this into account when upgrading your OpenVidu Pro cluster. If you have more than one Media Node, you can upgrade them one by one while others remain available to maintain your service.
- Old Docker images will take up valuable disk space of your machine. If you don't plan to reuse them again, delete them to reclaim your GBs. [docker system prune](https://docs.docker.com/engine/reference/commandline/system_prune/){:target="_blank"} command is very useful for doing so.
- You must perform the upgrading steps in all of your Media Nodes. Be sure to upgrade the OpenVidu Server Pro Node and all of the Media Nodes to the same version number.

<br>

---

## Migrating from 2.13.0 to 2.14.0

### Upgrading OpenVidu Server Pro Node

Connect to the OpenVidu Server Pro Node instance through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/openvidu`

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

<br>

##### Some notes on upgrading OpenVidu Server Pro Node

- The upgrade process will restart all OpenVidu services. That means that **all ongoing sessions will be destroyed**.
- Persistent data is preserved when upgrading. This means that all of your recordings and monitoring data (session history, ElasticSearch, Kibana) will be available in the new version.
- Old Docker images will take up valuable disk space of your machine. If you don't plan to reuse them again, delete them to reclaim your GBs. [docker system prune](https://docs.docker.com/engine/reference/commandline/system_prune/){:target="_blank"} command is very useful for doing so.
- Remember to update **openvidu-browser** library in your clients. Comply version compatibility according to [Releases](releases/){:target="_blank"} page.

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

<br>

##### Some notes on upgrading Media Nodes

- The upgrade process will restart all OpenVidu services. That means that **any ongoing sessions hosted by this Media Node will be terminated**. Take this into account when upgrading your OpenVidu Pro cluster. If you have more than one Media Node, you can upgrade them one by one while others remain available to maintain your service.
- Old Docker images will take up valuable disk space of your machine. If you don't plan to reuse them again, delete them to reclaim your GBs. [docker system prune](https://docs.docker.com/engine/reference/commandline/system_prune/){:target="_blank"} command is very useful for doing so.
- You must perform the upgrading steps in all of your Media Nodes. Be sure to upgrade the OpenVidu Server Pro Node and all of the Media Nodes to the same version number.

<br>

---

## Migrating from ≤2.12.0 to 2.13.0

Unfortunately upgrading OpenVidu Pro to <strong>2.13.0</strong> from any past version will require you to completely wipe out your past version, as the installation procedure has completely changed to a Docker deployment. Good news is that from this point in time, upgrading or downgrading versions will be extremely quick and easy!

The only thing to take into account is the data you may want to keep when upgrading to 2.13.0: recordings and Elasticsearch data.

### Backup recordings

Only if you have used the [recording](advanced-features/recording/){:target="_blank"} feature you may want to keep your old recorded files available in your new deployment. This is as straightforward as copying the entire recording folder before wiping out your old server (≤2.12.0 config property `openvidu.recording.path`, by default `/opt/openvidu/recordings`). After successfully installing 2.13.0, simply paste this same folder at the recording path of your new installation. All of your recordings will be immediately available in the new version.

### Backup Elasticsearch data

If you want to keep your [Elasticsearch data](openvidu-pro/monitoring-elastic-stack/){:target="_blank"}, then you have to copy the Elasticsearch database from your old deployment to your new 2.13.0 deployment. Of course you have to do so **before wiping out your old OpenVidu Server Pro instance**. The following steps indicate how to automate all of this process with some simple commands:

#### 1) Copy existing Elasticsearch data from your old ≤2.12.0 Openvidu Server Pro Node to your new 2.13.0 OpenVidu Server Pro Node

First compress the Elasticsearch database in your old OpenVidu Server Pro Node and then download the file. You can do it like this (a standard ubuntu installation of Elasticsearch is presumed at `/var/lib/elasticsearch`. This path is the default one for ≤2.12.0 OpenVidu deployments on AWS and is also the default path where Elasticsearch stores its data in Linux systems).

```bash
ssh -i SSH_KEY ubuntu@OLD_OPENVIDU_PRO_IP "sudo tar zcvfP /tmp/elasticsearch.tar.gz -C /var/lib/elasticsearch nodes"
scp -i SSH_KEY ubuntu@OLD_OPENVIDU_PRO_IP:/tmp/elasticsearch.tar.gz elasticsearch.tar.gz
```

We have zipped the old Elasticsearch data and downloaded to our computer. Now we will upload it to the new Openvidu Pro Instance:

```bash
scp -i SSH_KEY elasticsearch.tar.gz ubuntu@NEW_OPENVIDU_PRO_IP:/tmp/elasticsearch.tar.gz
```

#### 2) Unzip Elasticsearch data in your new 2.13.0 OpenVidu Server Pro Node and restart services

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

> **NOTE**: Remember to update **openvidu-browser** library in your clients. Comply version compatibility according to **[Releases](releases/){:target="_blank"}**

<br><br>

<script src="js/copy-btn.js"></script>

<!--
<div style="
    display: table;
    border: 2px solid #0088aa9e;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 25px;
    padding: 5px 0 5px 0;
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
      <strong>These instructions are only suitable for OpenVidu Pro >= 2.13.0</strong>. Upgrading or downgrading OpenVidu Pro by following these steps may cause your application to fail if there are any <strong>API breaking changes</strong> between the old and new versions of OpenVidu Pro. Carefully read the <a href="releases/" target="_blank">release notes</a> of the related versions before upgrading OpenVidu Pro, be sure to try your application with the new OpenVidu version in your development environment before upgrading and always do so at your own risk
</div>
</div>

<div style="
    display: table;
    border: 2px solid #0088aa9e;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 25px;
    padding: 5px 0 5px 0;
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
      Unfortunately upgrading OpenVidu Pro to <strong>2.13.0</strong> from any past version will require you to completely wipe out your past version, as the installation procedure has completely changed to a Docker deployment. If you are going to install 2.13.0 in the same machine, make sure to [backup the data]() you want to keep and uninstall all of OpenVidu services before installing 2.13.0. Good news is that from this point in time, upgrading or downgrading versions will be extremely quick and easy!
</div>
</div>

# For AWS deployments

### OpenVidu Server Pro Node

We need to connect to the Openvidu Server EC2 instance. Just navigate to **[AWS EC2 dashboard](https://console.aws.amazon.com/ec2#Instances){:target="_blank"}** and follow below steps:

<div class="row">
    <div class="upgrade-cf-steps" style="margin: 25px 35px 25px 35px">
        <a data-fancybox="gallery-upgrade-cf" data-caption="Click on 'Update' button" href="img/docs/upgrading/EC2_OV_PRO_1.png"><img class="img-responsive img-pro" style="max-width: 800px" src="img/docs/upgrading/EC2_OV_PRO_1.png"/></a>
        <a data-fancybox="gallery-upgrade-cf" data-caption="Select 'Use current template' and click on 'Next'" href="img/docs/upgrading/EC2_OV_PRO_2.png"><img class="img-responsive img-pro" style="max-width: 700px" src="img/docs/upgrading/EC2_OV_PRO_2.png"/></a>
        <a data-fancybox="gallery-upgrade-cf" data-caption="Change field 'OpenVidu Version'" href="img/docs/upgrading/EC2_OV_PRO_3.png"><img class="img-responsive img-pro" style="max-width: 600px" src="img/docs/upgrading/EC2_OV_PRO_3.png"/></a>
    </div>
    <div class="slick-captions">
      <div class="caption"><p><strong>1)</strong> Select your EC2 instance and click on <strong>Connect</strong> button</p></div>
      <div class="caption"><p><strong>2)</strong> Select <strong>EC2 Instance Connect</strong>, use default <strong>root</strong> user name and click on <strong>Connect</strong></p></div>
      <div class="caption"><p><strong>3)</strong> Now you will be connected to a terminal of your EC2 instance as root user</p></div>
    </div>
</div>

<br>

After connected into web EC2 console of your OpenVidu Server instance as root user, all that remains to be done is following all the steps for upgrading [OpenVidu Server Pro Node](#openvidu-server-pro-node_1) in on premises deployments.

<br>

### Media Nodes

We need to connect to the Media Node EC2 instance. Just navigate to **[AWS EC2 dashboard](https://console.aws.amazon.com/ec2#Instances){:target="_blank"}** and follow below steps:

<div class="row">
    <div class="upgrade-cf-steps" style="margin: 25px 35px 25px 35px">
        <a data-fancybox="gallery-upgrade-cf" data-caption="Click on 'Update' button" href="img/docs/upgrading/EC2_MEDIA_NODE_1.png"><img class="img-responsive img-pro" style="max-width: 800px" src="img/docs/upgrading/EC2_MEDIA_NODE_1.png"/></a>
        <a data-fancybox="gallery-upgrade-cf" data-caption="Select 'Use current template' and click on 'Next'" href="img/docs/upgrading/EC2_MEDIA_NODE_2.png"><img class="img-responsive img-pro" style="max-width: 700px" src="img/docs/upgrading/EC2_MEDIA_NODE_2.png"/></a>
        <a data-fancybox="gallery-upgrade-cf" data-caption="Change field 'OpenVidu Version'" href="img/docs/upgrading/EC2_MEDIA_NODE_3.png"><img class="img-responsive img-pro" style="max-width: 600px" src="img/docs/upgrading/EC2_MEDIA_NODE_3.png"/></a>
    </div>
    <div class="slick-captions">
      <div class="caption"><p><strong>1)</strong> Select your EC2 instance and click on <strong>Connect</strong> button</p></div>
      <div class="caption"><p><strong>2)</strong> Select <strong>EC2 Instance Connect</strong>, use default <strong>root</strong> user name and click on <strong>Connect</strong></p></div>
      <div class="caption"><p><strong>3)</strong> Now you will be connected to a terminal of your EC2 instance as root user</p></div>
    </div>
</div>

<br>

After connected into web EC2 console of your Media Node instance as root user, all that remains to be done is following all the steps for upgrading [Media Nodes](#media-nodes_1) in on premises deployments.

<br>

---

# For on premises deployments

<div style="
    display: table;
    border: 2px solid #0088aa9e;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 25px;
    padding: 5px 0 5px 0;
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
These instructions suppose the installation of OpenVidu is done in the <strong>default and recommended folder <code>/opt/openvidu</code></strong>. Keep in mind this if your installation is located in a different path!
</div>
</div>

### OpenVidu Server Pro Node

Connect through SSH to Openvidu Server Pro instance. The recommended installation folder of OpenVidu Pro is `/opt/openvidu`. Every other instruction in the documentation regarding on premises upgrades assumes this specific installation path.

#### 1) Stop all docker-compose services

Navigate to the OpenVidu installation folder and stop the current execution.

```bash
cd /opt/openvidu # Modify this and the following commands if your installation isn't done in the default path
./openvidu stop
```

#### 2) Upgrade docker-compose

Now we will make a backup of the current installation just in case. To do this we execute the following commands:

```bash
cd /opt
mv openvidu openvidu.backup
```

Now install the new version using the following command:

```bash
# Change {VERSION} for the desired one. e.g. install_openvidu_2.13.0.sh

curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_{VERSION}.sh | bash
```

Finally remember to change your configuration properties in file `/opt/openvidu/.env`. The new installation brings the default values that **must** be updated.

#### 3) Restart docker-compose

Run all services in the recently upgraded OpenVidu installation folder.

```bash
cd /opt/openvidu
./openvidu start
```

> **NOTE 1**: Old Docker images will take up valuable disk space of your machines. If you don't plan to reuse them again, delete them to reclaim your GBs. **[docker system prune](https://docs.docker.com/engine/reference/commandline/system_prune/){:target="_blank"}** command is very useful for doing so.

> **NOTE 2**: Remember to update **openvidu-browser** library in your clients. Comply version compatibility according to **[Releases](releases/){:target="_blank"}**

<br>

---

### Media Nodes

Follow these steps to upgrade a specific Media Node.

Connect through SSH to the Media Node instance. The recommended installation folder of the Media Node service is `/opt/openvidu`. Every other instruction in the documentation regarding on premises upgrades assumes this installation path.

#### 1) Stop all docker-compose services

Navigate to the Media Node installation folder and stop the current execution.

```bash
cd /opt/kms # Modify this and the following commands if your installation isn't done in the default path
./media_node stop
```

#### 2) Upgrade docker-compose

Now we will make a backup of the current installation just in case. To do this we execute the following commands:

```bash
cd /opt
mv kms kms.backup
```

Now install the new version using the following command:

```bash
# Change {VERSION} for the desired one. e.g. install_media_node_2.13.0.sh

curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_media_node_{VERSION}.sh | bash
```

#### 3) Restart docker-compose

Run all services in the recently upgraded Media Node installation folder.

```bash
cd /opt/kms
./media_node start
```

> **NOTE 1**: Old Docker images will take up valuable disk space of your machines. If you don't plan to reuse them again, delete them to reclaim your GBs. **[docker system prune](https://docs.docker.com/engine/reference/commandline/system_prune/){:target="_blank"}** command is very useful for doing so.

> **NOTE 2**: Remember to update **openvidu-browser** library in your clients. Comply version compatibility according to **[Releases](releases/){:target="_blank"}**

<br><br>-->

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