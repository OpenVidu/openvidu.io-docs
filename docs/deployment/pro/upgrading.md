<h2 id="section-title">Upgrading OpenVidu Pro</h2>
<hr>

- **[Migrating from 2.31.0 to 2.32.1](#migrating-from-2310-to-2321)**
- **[Migrating from 2.30.0 to 2.31.0](#migrating-from-2300-to-2310)**
- **[Migrating from 2.29.0 to 2.30.0](#migrating-from-2290-to-2300)**
- **[Migrating from 2.28.0 to 2.29.0](#migrating-from-2280-to-2290)**
- **[Migrating from 2.27.0 to 2.28.0](#migrating-from-2270-to-2280)**
- **[Migrating from 2.26.2 to 2.27.0](#migrating-from-2262-to-2270)**
- **[Migrating from 2.25.0 to 2.26.2](#migrating-from-2250-to-2262)**
- **[Migrating from 2.24.0 to 2.25.0](#migrating-from-2240-to-2250)**
- **[Migrating from 2.23.0 to 2.24.0](#migrating-from-2230-to-2240)**
- **[Migrating from 2.22.0 to 2.23.0](#migrating-from-2220-to-2230)**
- **[Migrating from 2.21.0 to 2.22.0](#migrating-from-2210-to-2220)**
- **[Migrating from 2.20.0 to 2.21.0](#migrating-from-2200-to-2210)**
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

## Migrating from 2.31.0 to 2.32.1

Depending of the type of deployment you have (_AWS_ or _On Premises_), you will need to follow one of the following instructions:

- **[Migrating from 2.31.0 to 2.32.1 (AWS Cloudformation)](#migrating-from-2310-to-2321-aws-cloudformation)**
- **[Migrating from 2.31.0 to 2.32.1 (On premises)](#migrating-from-2310-to-2321-on-premises)**

### Migrating from 2.31.0 to 2.32.1 (AWS Cloudformation)

#### Option 1 (recommended): Deploy a new Cloudformation for 2.32.1

If you have deployed using Cloudformation **we strongly recommend updating by deploying a new [OpenVidu Cloudformation template of 2.32.1](https://docs.openvidu.io/en/2.32.1/deployment/pro/aws/){target="_blank"}**.

By deploying a new Cloudformation for each version you update, you can benefit of updated AMIs in your deployment, and you can ensure that the upgrading process is not degraded by infrastructure changes that may be applied to the Cloudformation definition.

To do it, you just need to:

- Deploy the OpenVidu Cloudformation template of the version you want.
- If you have recordings stored in the master node, move recordings at`/opt/openvidu/recordings` to the new deployment.
- If you have your app deployed next to OpenVidu, move your app to your new deployment.
- Modify the file at `/opt/openvidu/.env` to have your previous configuration values. (Ignore parameters which start with `AWS_`)

However, if you don't want to deploy a new Cloudformation, you can follow the instruction from [Option 2: Update current deployment to 2.32.1](#option-2-update-current-deployment-to-2321), but you should know that the upgrading process may have some not contemplated issues if something in the Cloudformation template has changed between versions.

#### Option 2: Update current deployment to 2.32.1

**1)** SSH into your OpenVidu Server Master Node.

**2)** Change to the root user:
```bash
sudo -s
```

**3)** Go to the OpenVidu installation directory:
```bash
cd /opt/openvidu
```

**4)** Stop OpenVidu Server:
```bash
./openvidu stop
```

**5)** Terminate all Media nodes instances from your __EC2 Instances panel__.

**6)** As OpenVidu uses an AMI to deploy and provision media nodes, we need to get and copy the media node AMI of the version we want to deploy. To get the Id of our official AMI you just need to execute:

```bash
ORIGINAL_AMI_ID=$(curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/get_ov_media_node_ami_id.sh | bash -s 2.32.1)
```

The obtained `ORIGINAL_AMI_ID` must not be used in your deployment, you need to copy this AMI to your account and region where you have OpenVidu deployed. To copy this AMI to your account, execute these commands:

```bash
# Region where OpenVidu is deployed
REGION=<YOUR_REGION>

# Copy AMI and get AMI Id
NEW_IMAGE_ID=$(aws ec2 copy-image \
    --region "${REGION}" --name "OpenVidu PRO/ENTERPRISE - Media Node 2.32.1" \
    --source-region eu-west-1 --source-image-id "${ORIGINAL_AMI_ID}" --output text)

# Wait for the AMI to be available
aws ec2 wait image-available --region "${REGION}" --image-ids "${NEW_IMAGE_ID}"

# Print AMI Id
echo "${NEW_IMAGE_ID}"
```

Where `<YOUR_REGION>` is the region your OpenVidu is deployed.

The command `echo "${NEW_IMAGE_ID}"` will print your new AMI ID to be used in OpenVidu. Now you just need to execute the upgrade script with the new AMI ID as an argument:

```console
curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_pro_2.32.1.sh | bash -s upgrade "${NEW_IMAGE_ID}"
```


The installation steps will output their progress as they run. If everything goes well you should see:

```console
================================================
Openvidu successfully upgraded to version 2.32.1
================================================
```

<div class="warningBoxContent">
  <div style="display: table-cell; vertical-align: middle;">
      <i class="icon ion-android-alert warningIcon"></i>
  </div>
  <div class="warningBoxText">
        To be able to execute the previous commands in your aws account, you need  <a href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html" target="_blank">aws-cli</a> installed and configured with root credentials to be able to copy the AMI to your account and region. Additionaly, you can use <a href="https://docs.aws.amazon.com/cloudshell/latest/userguide/welcome.html" target="_blank">AWS Cloudshell</a> service to execute <a href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html" target="_blank">aws-cli</a> commands without the need of installing anything in your local machine.
  </div>
</div>


**7)** After executing the previous command you will end up with two environment files:

  - `.env-2.32.1`: Empty configuration file of the 2.32.1 version.
  - `.env`: Previous configuration which remains intact.


Transfer any configuration you want to keep in the upgraded version from `.env` to `.env-2.32.1`. Don't move any parameter which starts with `AWS_`, keep those parameters intact.

**8)** When you have the file `.env-2.32.1` with all your desired parameters, remove the original `.env` (or do a backup of it) and rename the `env-2.32.1` to `.env`.


**9)** Start Openvidu.

```
./openvidu start
```

<br>

### Migrating from 2.31.0 to 2.32.1 (On Premises)

#### 1) Upgrading Media Node

> Take into account that, if you have deployed using Cloudformation, you don't need to update media nodes. Just terminate all media nodes from the AWS EC2 Panel and Upgrade only the master node.
> After upgrading your master node, new media nodes will be created automatically or using [Inspector and Rest API](openvidu-pro/scalability/#change-the-number-of-media-nodes-on-the-fly){target="_blank"}.

At first, you need to update all of your media nodes. Connect to each of your Media Nodes through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/kms`

```bash
sudo -s
cd /opt/kms # Recommended and default installation path
```

Then you can run the upgrade script with this command:

<p style="text-align: start">
<code id="code-1"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_media_node_2.32.1.sh | bash -s upgrade</strong></code>
<button id="btn-copy-1" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
                              title="Copy to Clipboard">Copy</button>
</p>

The installation steps will output their progress as they run. If everything goes well, at the end you will see a message with the final instructions to successfully complete the upgrade process:

```console
================================================
Openvidu successfully upgraded to version 2.32.1
================================================

1. A new file 'docker-compose.yml' has been created with the new OpenVidu 2.32.1 services

2. This new version 2.32.1 does not need any .env file. Everything is configured from OpenVidu Pro

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

> **Check out the [notes when upgrading Media Nodes](#notes-when-upgrading-media-nodes)**

<br>

#### 2) Upgrading Master Node

After all of your media nodes are updated, you just need to connect to the Master Node instance through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/openvidu`

```bash
sudo -s
cd /opt/openvidu # Recommended and default installation path
```

Then you can run the upgrade script with this command:

<p style="text-align: start">
<code id="code-2"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_pro_2.32.1.sh | bash -s upgrade</strong></code>
<button id="btn-copy-2" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
                              title="Copy to Clipboard">Copy</button>
</p>

The installation steps will output their progress as they run. If everything goes well, at the end you will see a message with the final instructions to successfully complete the upgrade process:

```console
================================================
Openvidu successfully upgraded to version 2.32.1
================================================
1. A new file 'docker-compose.yml' has been created with the new OpenVidu 2.32.1 services

2. The previous file '.env' remains intact, but a new file '.env-2.32.1' has been created.
Transfer any configuration you wish to keep in the upgraded version from '.env' to '.env-2.32.1'.
When you are OK with it, rename and leave as the only '.env' file of the folder the new '.env-2.32.1'.

3. If you were using Openvidu Call application, it has been automatically updated in file 'docker-compose.override.yml'.
However, if you were using your own application, a file called 'docker-compose.override.yml-2.32.1'
has been created with the latest version of Openvidu Call. If you don't plan to use it you can delete it.

4. Start new version of Openvidu
$ ./openvidu start

If you want to rollback, all the files from the previous installation have been copied to folder '.old-2.31.0'
```

Make sure that you have all of your needed properties at your .env file and start OpenVidu with:

```
./openvidu start
```

<br>


## Migrating from 2.30.0 to 2.31.0

Depending of the type of deployment you have (_AWS_ or _On Premises_), you will need to follow one of the following instructions:

- **[Migrating from 2.30.0 to 2.31.0 (AWS Cloudformation)](#migrating-from-2300-to-2310-aws-cloudformation)**
- **[Migrating from 2.30.0 to 2.31.0 (On premises)](#migrating-from-2300-to-2310-on-premises)**

### Migrating from 2.30.0 to 2.31.0 (AWS Cloudformation)

#### Option 1 (recommended): Deploy a new Cloudformation for 2.31.0

If you have deployed using Cloudformation **we strongly recommend updating by deploying a new [OpenVidu Cloudformation template of 2.31.0](https://docs.openvidu.io/en/2.31.0/deployment/pro/aws/){target="_blank"}**.

By deploying a new Cloudformation for each version you update, you can benefit of updated AMIs in your deployment, and you can ensure that the upgrading process is not degraded by infrastructure changes that may be applied to the Cloudformation definition.

To do it, you just need to:

- Deploy the OpenVidu Cloudformation template of the version you want.
- If you have recordings stored in the master node, move recordings at`/opt/openvidu/recordings` to the new deployment.
- If you have your app deployed next to OpenVidu, move your app to your new deployment.
- Modify the file at `/opt/openvidu/.env` to have your previous configuration values. (Ignore parameters which start with `AWS_`)

However, if you don't want to deploy a new Cloudformation, you can follow the instruction from [Option 2: Update current deployment to 2.31.0](#option-2-update-current-deployment-to-2310), but you should know that the upgrading process may have some not contemplated issues if something in the Cloudformation template has changed between versions.

#### Option 2: Update current deployment to 2.31.0

**1)** SSH into your OpenVidu Server Master Node.

**2)** Change to the root user:
```bash
sudo -s
```

**3)** Go to the OpenVidu installation directory:
```bash
cd /opt/openvidu
```

**4)** Stop OpenVidu Server:
```bash
./openvidu stop
```

**5)** Terminate all Media nodes instances from your __EC2 Instances panel__.

**6)** As OpenVidu uses an AMI to deploy and provision media nodes, we need to get and copy the media node AMI of the version we want to deploy. To get the Id of our official AMI you just need to execute:

```bash
ORIGINAL_AMI_ID=$(curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/get_ov_media_node_ami_id.sh | bash -s 2.31.0)
```

The obtained `ORIGINAL_AMI_ID` must not be used in your deployment, you need to copy this AMI to your account and region where you have OpenVidu deployed. To copy this AMI to your account, execute these commands:

```bash
# Region where OpenVidu is deployed
REGION=<YOUR_REGION>

# Copy AMI and get AMI Id
NEW_IMAGE_ID=$(aws ec2 copy-image \
    --region "${REGION}" --name "OpenVidu PRO/ENTERPRISE - Media Node 2.31.0" \
    --source-region eu-west-1 --source-image-id "${ORIGINAL_AMI_ID}" --output text)

# Wait for the AMI to be available
aws ec2 wait image-available --region "${REGION}" --image-ids "${NEW_IMAGE_ID}"

# Print AMI Id
echo "${NEW_IMAGE_ID}"
```

Where `<YOUR_REGION>` is the region your OpenVidu is deployed.

The command `echo "${NEW_IMAGE_ID}"` will print your new AMI ID to be used in OpenVidu. Now you just need to execute the upgrade script with the new AMI ID as an argument:

```console
curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_pro_2.31.0.sh | bash -s upgrade "${NEW_IMAGE_ID}"
```


The installation steps will output their progress as they run. If everything goes well you should see:

```console
================================================
Openvidu successfully upgraded to version 2.31.0
================================================
```

<div class="warningBoxContent">
  <div style="display: table-cell; vertical-align: middle;">
      <i class="icon ion-android-alert warningIcon"></i>
  </div>
  <div class="warningBoxText">
        To be able to execute the previous commands in your aws account, you need  <a href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html" target="_blank">aws-cli</a> installed and configured with root credentials to be able to copy the AMI to your account and region. Additionaly, you can use <a href="https://docs.aws.amazon.com/cloudshell/latest/userguide/welcome.html" target="_blank">AWS Cloudshell</a> service to execute <a href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html" target="_blank">aws-cli</a> commands without the need of installing anything in your local machine.
  </div>
</div>


**7)** After executing the previous command you will end up with two environment files:

  - `.env-2.31.0`: Empty configuration file of the 2.31.0 version.
  - `.env`: Previous configuration which remains intact.


Transfer any configuration you want to keep in the upgraded version from `.env` to `.env-2.31.0`. Don't move any parameter which starts with `AWS_`, keep those parameters intact.

**8)** When you have the file `.env-2.31.0` with all your desired parameters, remove the original `.env` (or do a backup of it) and rename the `env-2.31.0` to `.env`.


**9)** Start Openvidu.

```
./openvidu start
```

<br>

### Migrating from 2.30.0 to 2.31.0 (On Premises)

#### 1) Upgrading Media Node

> Take into account that, if you have deployed using Cloudformation, you don't need to update media nodes. Just terminate all media nodes from the AWS EC2 Panel and Upgrade only the master node.
> After upgrading your master node, new media nodes will be created automatically or using [Inspector and Rest API](openvidu-pro/scalability/#change-the-number-of-media-nodes-on-the-fly){target="_blank"}.

At first, you need to update all of your media nodes. Connect to each of your Media Nodes through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/kms`

```bash
sudo -s
cd /opt/kms # Recommended and default installation path
```

Then you can run the upgrade script with this command:

<p style="text-align: start">
<code id="code-1"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_media_node_2.31.0.sh | bash -s upgrade</strong></code>
<button id="btn-copy-1" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
                              title="Copy to Clipboard">Copy</button>
</p>

The installation steps will output their progress as they run. If everything goes well, at the end you will see a message with the final instructions to successfully complete the upgrade process:

```console
================================================
Openvidu successfully upgraded to version 2.31.0
================================================

1. A new file 'docker-compose.yml' has been created with the new OpenVidu 2.31.0 services

2. This new version 2.31.0 does not need any .env file. Everything is configured from OpenVidu Pro

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

> **Check out the [notes when upgrading Media Nodes](#notes-when-upgrading-media-nodes)**

<br>

#### 2) Upgrading Master Node

After all of your media nodes are updated, you just need to connect to the Master Node instance through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/openvidu`

```bash
sudo -s
cd /opt/openvidu # Recommended and default installation path
```

Then you can run the upgrade script with this command:

<p style="text-align: start">
<code id="code-2"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_pro_2.31.0.sh | bash -s upgrade</strong></code>
<button id="btn-copy-2" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
                              title="Copy to Clipboard">Copy</button>
</p>

The installation steps will output their progress as they run. If everything goes well, at the end you will see a message with the final instructions to successfully complete the upgrade process:

```console
================================================
Openvidu successfully upgraded to version 2.31.0
================================================
1. A new file 'docker-compose.yml' has been created with the new OpenVidu 2.31.0 services

2. The previous file '.env' remains intact, but a new file '.env-2.31.0' has been created.
Transfer any configuration you wish to keep in the upgraded version from '.env' to '.env-2.31.0'.
When you are OK with it, rename and leave as the only '.env' file of the folder the new '.env-2.31.0'.

3. If you were using Openvidu Call application, it has been automatically updated in file 'docker-compose.override.yml'.
However, if you were using your own application, a file called 'docker-compose.override.yml-2.31.0'
has been created with the latest version of Openvidu Call. If you don't plan to use it you can delete it.

4. Start new version of Openvidu
$ ./openvidu start

If you want to rollback, all the files from the previous installation have been copied to folder '.old-2.30.0'
```

Make sure that you have all of your needed properties at your .env file and start OpenVidu with:

```
./openvidu start
```

<br>

## Migrating from 2.29.0 to 2.30.0

Depending of the type of deployment you have (_AWS_ or _On Premises_), you will need to follow one of the following instructions:

- **[Migrating from 2.29.0 to 2.30.0 (AWS Cloudformation)](#migrating-from-2290-to-2300-aws-cloudformation)**
- **[Migrating from 2.29.0 to 2.30.0 (On premises)](#migrating-from-2290-to-2300-on-premises)**

### Migrating from 2.29.0 to 2.30.0 (AWS Cloudformation)

#### Option 1 (recommended): Deploy a new Cloudformation for 2.30.0

If you have deployed using Cloudformation **we strongly recommend updating by deploying a new [OpenVidu Cloudformation template of 2.30.0](https://docs.openvidu.io/en/2.30.0/deployment/pro/aws/){target="_blank"}**.

By deploying a new Cloudformation for each version you update, you can benefit of updated AMIs in your deployment, and you can ensure that the upgrading process is not degraded by infrastructure changes that may be applied to the Cloudformation definition.

To do it, you just need to:

- Deploy the OpenVidu Cloudformation template of the version you want.
- If you have recordings stored in the master node, move recordings at`/opt/openvidu/recordings` to the new deployment.
- If you have your app deployed next to OpenVidu, move your app to your new deployment.
- Modify the file at `/opt/openvidu/.env` to have your previous configuration values. (Ignore parameters which start with `AWS_`)

However, if you don't want to deploy a new Cloudformation, you can follow the instruction from [Option 2: Update current deployment to 2.30.0](#option-2-update-current-deployment-to-2300), but you should know that the upgrading process may have some not contemplated issues if something in the Cloudformation template has changed between versions.

#### Option 2: Update current deployment to 2.30.0

**1)** SSH into your OpenVidu Server Master Node.

**2)** Change to the root user:
```bash
sudo -s
```

**3)** Go to the OpenVidu installation directory:
```bash
cd /opt/openvidu
```

**4)** Stop OpenVidu Server:
```bash
./openvidu stop
```

**5)** Terminate all Media nodes instances from your __EC2 Instances panel__.

**6)** As OpenVidu uses an AMI to deploy and provision media nodes, we need to get and copy the media node AMI of the version we want to deploy. To get the Id of our official AMI you just need to execute:

```bash
ORIGINAL_AMI_ID=$(curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/get_ov_media_node_ami_id.sh | bash -s 2.30.0)
```

The obtained `ORIGINAL_AMI_ID` must not be used in your deployment, you need to copy this AMI to your account and region where you have OpenVidu deployed. To copy this AMI to your account, execute these commands:

```bash
# Region where OpenVidu is deployed
REGION=<YOUR_REGION>

# Copy AMI and get AMI Id
NEW_IMAGE_ID=$(aws ec2 copy-image \
    --region "${REGION}" --name "OpenVidu PRO/ENTERPRISE - Media Node 2.30.0" \
    --source-region eu-west-1 --source-image-id "${ORIGINAL_AMI_ID}" --output text)

# Wait for the AMI to be available
aws ec2 wait image-available --region "${REGION}" --image-ids "${NEW_IMAGE_ID}"

# Print AMI Id
echo "${NEW_IMAGE_ID}"
```

Where `<YOUR_REGION>` is the region your OpenVidu is deployed.

The command `echo "${NEW_IMAGE_ID}"` will print your new AMI ID to be used in OpenVidu. Now you just need to execute the upgrade script with the new AMI ID as an argument:

```console
curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_pro_2.30.0.sh | bash -s upgrade "${NEW_IMAGE_ID}"
```


The installation steps will output their progress as they run. If everything goes well you should see:

```console
================================================
Openvidu successfully upgraded to version 2.30.0
================================================
```

<div class="warningBoxContent">
  <div style="display: table-cell; vertical-align: middle;">
      <i class="icon ion-android-alert warningIcon"></i>
  </div>
  <div class="warningBoxText">
        To be able to execute the previous commands in your aws account, you need  <a href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html" target="_blank">aws-cli</a> installed and configured with root credentials to be able to copy the AMI to your account and region. Additionaly, you can use <a href="https://docs.aws.amazon.com/cloudshell/latest/userguide/welcome.html" target="_blank">AWS Cloudshell</a> service to execute <a href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html" target="_blank">aws-cli</a> commands without the need of installing anything in your local machine.
  </div>
</div>


**7)** After executing the previous command you will end up with two environment files:

  - `.env-2.30.0`: Empty configuration file of the 2.30.0 version.
  - `.env`: Previous configuration which remains intact.


Transfer any configuration you want to keep in the upgraded version from `.env` to `.env-2.30.0`. Don't move any parameter which starts with `AWS_`, keep those parameters intact.

**8)** When you have the file `.env-2.30.0` with all your desired parameters, remove the original `.env` (or do a backup of it) and rename the `env-2.30.0` to `.env`.


**9)** Start Openvidu.

```
./openvidu start
```

<br>

### Migrating from 2.29.0 to 2.30.0 (On Premises)

#### 1) Upgrading Media Node

> Take into account that, if you have deployed using Cloudformation, you don't need to update media nodes. Just terminate all media nodes from the AWS EC2 Panel and Upgrade only the master node.
> After upgrading your master node, new media nodes will be created automatically or using [Inspector and Rest API](openvidu-pro/scalability/#change-the-number-of-media-nodes-on-the-fly){target="_blank"}.

At first, you need to update all of your media nodes. Connect to each of your Media Nodes through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/kms`

```bash
sudo -s
cd /opt/kms # Recommended and default installation path
```

Then you can run the upgrade script with this command:

<p style="text-align: start">
<code id="code-3"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_media_node_2.30.0.sh | bash -s upgrade</strong></code>
<button id="btn-copy-3" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
                              title="Copy to Clipboard">Copy</button>
</p>

The installation steps will output their progress as they run. If everything goes well, at the end you will see a message with the final instructions to successfully complete the upgrade process:

```console
================================================
Openvidu successfully upgraded to version 2.30.0
================================================

1. A new file 'docker-compose.yml' has been created with the new OpenVidu 2.30.0 services

2. This new version 2.30.0 does not need any .env file. Everything is configured from OpenVidu Pro

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

> **Check out the [notes when upgrading Media Nodes](#notes-when-upgrading-media-nodes)**

<br>

#### 2) Upgrading Master Node

After all of your media nodes are updated, you just need to connect to the Master Node instance through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/openvidu`

```bash
sudo -s
cd /opt/openvidu # Recommended and default installation path
```

Then you can run the upgrade script with this command:

<p style="text-align: start">
<code id="code-4"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_pro_2.30.0.sh | bash -s upgrade</strong></code>
<button id="btn-copy-4" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
                              title="Copy to Clipboard">Copy</button>
</p>

The installation steps will output their progress as they run. If everything goes well, at the end you will see a message with the final instructions to successfully complete the upgrade process:

```console
================================================
Openvidu successfully upgraded to version 2.30.0
================================================
1. A new file 'docker-compose.yml' has been created with the new OpenVidu 2.30.0 services

2. The previous file '.env' remains intact, but a new file '.env-2.30.0' has been created.
Transfer any configuration you wish to keep in the upgraded version from '.env' to '.env-2.30.0'.
When you are OK with it, rename and leave as the only '.env' file of the folder the new '.env-2.30.0'.

3. If you were using Openvidu Call application, it has been automatically updated in file 'docker-compose.override.yml'.
However, if you were using your own application, a file called 'docker-compose.override.yml-2.30.0'
has been created with the latest version of Openvidu Call. If you don't plan to use it you can delete it.

4. Start new version of Openvidu
$ ./openvidu start

If you want to rollback, all the files from the previous installation have been copied to folder '.old-2.29.0'
```

Make sure that you have all of your needed properties at your .env file and start OpenVidu with:

```
./openvidu start
```

<br>

## Migrating from 2.28.0 to 2.29.0

Depending of the type of deployment you have (_AWS_ or _On Premises_), you will need to follow one of the following instructions:

- **[Migrating from 2.28.0 to 2.29.0 (AWS Cloudformation)](#migrating-from-2280-to-2290-aws-cloudformation)**
- **[Migrating from 2.28.0 to 2.29.0 (On premises)](#migrating-from-2280-to-2290-on-premises)**

### Migrating from 2.28.0 to 2.29.0 (AWS Cloudformation)

#### Option 1 (recommended): Deploy a new Cloudformation for 2.29.0

If you have deployed using Cloudformation **we strongly recommend updating by deploying a new [OpenVidu Cloudformation template of 2.29.0](https://docs.openvidu.io/en/2.29.0/deployment/pro/aws/){target="_blank"}**.

By deploying a new Cloudformation for each version you update, you can benefit of updated AMIs in your deployment, and you can ensure that the upgrading process is not degraded by infrastructure changes that may be applied to the Cloudformation definition.

To do it, you just need to:

- Deploy the OpenVidu Cloudformation template of the version you want.
- If you have recordings stored in the master node, move recordings at`/opt/openvidu/recordings` to the new deployment.
- If you have your app deployed next to OpenVidu, move your app to your new deployment.
- Modify the file at `/opt/openvidu/.env` to have your previous configuration values. (Ignore parameters which start with `AWS_`)

However, if you don't want to deploy a new Cloudformation, you can follow the instruction from [Option 2: Update current deployment to 2.29.0](#option-2-update-current-deployment-to-2290), but you should know that the upgrading process may have some not contemplated issues if something in the Cloudformation template has changed between versions.

#### Option 2: Update current deployment to 2.29.0

**1)** SSH into your OpenVidu Server Master Node.

**2)** Change to the root user:
```bash
sudo -s
```

**3)** Go to the OpenVidu installation directory:
```bash
cd /opt/openvidu
```

**4)** Stop OpenVidu Server:
```bash
./openvidu stop
```

**5)** Terminate all Media nodes instances from your __EC2 Instances panel__.

**6)** As OpenVidu uses an AMI to deploy and provision media nodes, we need to get and copy the media node AMI of the version we want to deploy. To get the Id of our official AMI you just need to execute:

```bash
ORIGINAL_AMI_ID=$(curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/get_ov_media_node_ami_id.sh | bash -s 2.29.0)
```

The obtained `ORIGINAL_AMI_ID` must not be used in your deployment, you need to copy this AMI to your account and region where you have OpenVidu deployed. To copy this AMI to your account, execute these commands:

```bash
# Region where OpenVidu is deployed
REGION=<YOUR_REGION>

# Copy AMI and get AMI Id
NEW_IMAGE_ID=$(aws ec2 copy-image \
    --region "${REGION}" --name "OpenVidu PRO/ENTERPRISE - Media Node 2.29.0" \
    --source-region eu-west-1 --source-image-id "${ORIGINAL_AMI_ID}" --output text)

# Wait for the AMI to be available
aws ec2 wait image-available --region "${REGION}" --image-ids "${NEW_IMAGE_ID}"

# Print AMI Id
echo "${NEW_IMAGE_ID}"
```

Where `<YOUR_REGION>` is the region your OpenVidu is deployed.

The command `echo "${NEW_IMAGE_ID}"` will print your new AMI ID to be used in OpenVidu. Now you just need to execute the upgrade script with the new AMI ID as an argument:

```console
curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_pro_2.29.0.sh | bash -s upgrade "${NEW_IMAGE_ID}"
```


The installation steps will output their progress as they run. If everything goes well you should see:

```console
================================================
Openvidu successfully upgraded to version 2.29.0
================================================
```

<div class="warningBoxContent">
  <div style="display: table-cell; vertical-align: middle;">
      <i class="icon ion-android-alert warningIcon"></i>
  </div>
  <div class="warningBoxText">
        To be able to execute the previous commands in your aws account, you need  <a href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html" target="_blank">aws-cli</a> installed and configured with root credentials to be able to copy the AMI to your account and region. Additionaly, you can use <a href="https://docs.aws.amazon.com/cloudshell/latest/userguide/welcome.html" target="_blank">AWS Cloudshell</a> service to execute <a href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html" target="_blank">aws-cli</a> commands without the need of installing anything in your local machine.
  </div>
</div>


**7)** After executing the previous command you will end up with two environment files:

  - `.env-2.29.0`: Empty configuration file of the 2.29.0 version.
  - `.env`: Previous configuration which remains intact.


Transfer any configuration you want to keep in the upgraded version from `.env` to `.env-2.29.0`. Don't move any parameter which starts with `AWS_`, keep those parameters intact.

**8)** When you have the file `.env-2.29.0` with all your desired parameters, remove the original `.env` (or do a backup of it) and rename the `env-2.29.0` to `.env`.


**9)** Start Openvidu.

```
./openvidu start
```

<br>

### Migrating from 2.28.0 to 2.29.0 (On Premises)

#### 1) Upgrading Media Node

> Take into account that, if you have deployed using Cloudformation, you don't need to update media nodes. Just terminate all media nodes from the AWS EC2 Panel and Upgrade only the master node.
> After upgrading your master node, new media nodes will be created automatically or using [Inspector and Rest API](openvidu-pro/scalability/#change-the-number-of-media-nodes-on-the-fly){target="_blank"}.

At first, you need to update all of your media nodes. Connect to each of your Media Nodes through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/kms`

```bash
sudo -s
cd /opt/kms # Recommended and default installation path
```

Then you can run the upgrade script with this command:

<p style="text-align: start">
<code id="code-5"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_media_node_2.29.0.sh | bash -s upgrade</strong></code>
<button id="btn-copy-5" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
                              title="Copy to Clipboard">Copy</button>
</p>

The installation steps will output their progress as they run. If everything goes well, at the end you will see a message with the final instructions to successfully complete the upgrade process:

```console
================================================
Openvidu successfully upgraded to version 2.29.0
================================================

1. A new file 'docker-compose.yml' has been created with the new OpenVidu 2.29.0 services

2. This new version 2.29.0 does not need any .env file. Everything is configured from OpenVidu Pro

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

> **Check out the [notes when upgrading Media Nodes](#notes-when-upgrading-media-nodes)**

<br>

#### 2) Upgrading Master Node

After all of your media nodes are updated, you just need to connect to the Master Node instance through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/openvidu`

```bash
sudo -s
cd /opt/openvidu # Recommended and default installation path
```

Then you can run the upgrade script with this command:

<p style="text-align: start">
<code id="code-6"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_pro_2.29.0.sh | bash -s upgrade</strong></code>
<button id="btn-copy-6" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
                              title="Copy to Clipboard">Copy</button>
</p>

The installation steps will output their progress as they run. If everything goes well, at the end you will see a message with the final instructions to successfully complete the upgrade process:

```console
================================================
Openvidu successfully upgraded to version 2.29.0
================================================
1. A new file 'docker-compose.yml' has been created with the new OpenVidu 2.29.0 services

2. The previous file '.env' remains intact, but a new file '.env-2.29.0' has been created.
Transfer any configuration you wish to keep in the upgraded version from '.env' to '.env-2.29.0'.
When you are OK with it, rename and leave as the only '.env' file of the folder the new '.env-2.29.0'.

3. If you were using Openvidu Call application, it has been automatically updated in file 'docker-compose.override.yml'.
However, if you were using your own application, a file called 'docker-compose.override.yml-2.29.0'
has been created with the latest version of Openvidu Call. If you don't plan to use it you can delete it.

4. Start new version of Openvidu
$ ./openvidu start

If you want to rollback, all the files from the previous installation have been copied to folder '.old-2.28.0'
```

Make sure that you have all of your needed properties at your .env file and start OpenVidu with:

```
./openvidu start
```

<br>

## Migrating from 2.27.0 to 2.28.0

Depending of the type of deployment you have (_AWS_ or _On Premises_), you will need to follow one of the following instructions:

- **[Migrating from 2.27.0 to 2.28.0 (AWS Cloudformation)](#migrating-from-2270-to-2280-aws-cloudformation)**
- **[Migrating from 2.27.0 to 2.28.0 (On premises)](#migrating-from-2270-to-2280-on-premises)**

### Migrating from 2.27.0 to 2.28.0 (AWS Cloudformation)

#### Option 1 (recommended): Deploy a new Cloudformation for 2.28.0

If you have deployed using Cloudformation **we strongly recommend updating by deploying a new [OpenVidu Cloudformation template of 2.28.0](https://docs.openvidu.io/en/2.28.0/deployment/pro/aws/){target="_blank"}**.

By deploying a new Cloudformation for each version you update, you can benefit of updated AMIs in your deployment, and you can ensure that the upgrading process is not degraded by infrastructure changes that may be applied to the Cloudformation definition.

To do it, you just need to:

- Deploy the OpenVidu Cloudformation template of the version you want.
- If you have recordings stored in the master node, move recordings at`/opt/openvidu/recordings` to the new deployment.
- If you have your app deployed next to OpenVidu, move your app to your new deployment.
- Modify the file at `/opt/openvidu/.env` to have your previous configuration values. (Ignore parameters which start with `AWS_`)

However, if you don't want to deploy a new Cloudformation, you can follow the instruction from [Option 2: Update current deployment to 2.28.0](#option-2-update-current-deployment-to-2280), but you should know that the upgrading process may have some not contemplated issues if something in the Cloudformation template has changed between versions.

#### Option 2: Update current deployment to 2.28.0

**1)** SSH into your OpenVidu Server Master Node.

**2)** Change to the root user:
```bash
sudo -s
```

**3)** Go to the OpenVidu installation directory:
```bash
cd /opt/openvidu
```

**4)** Stop OpenVidu Server:
```bash
./openvidu stop
```

**5)** Terminate all Media nodes instances from your __EC2 Instances panel__.

**6)** As OpenVidu uses an AMI to deploy and provision media nodes, we need to get and copy the media node AMI of the version we want to deploy. To get the Id of our official AMI you just need to execute:

```bash
ORIGINAL_AMI_ID=$(curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/get_ov_media_node_ami_id.sh | bash -s 2.28.0)
```

The obtained `ORIGINAL_AMI_ID` must not be used in your deployment, you need to copy this AMI to your account and region where you have OpenVidu deployed. To copy this AMI to your account, execute these commands:

```bash
# Region where OpenVidu is deployed
REGION=<YOUR_REGION>

# Copy AMI and get AMI Id
NEW_IMAGE_ID=$(aws ec2 copy-image \
    --region "${REGION}" --name "OpenVidu PRO/ENTERPRISE - Media Node 2.28.0" \
    --source-region eu-west-1 --source-image-id "${ORIGINAL_AMI_ID}" --output text)

# Wait for the AMI to be available
aws ec2 wait image-available --region "${REGION}" --image-ids "${NEW_IMAGE_ID}"

# Print AMI Id
echo "${NEW_IMAGE_ID}"
```

Where `<YOUR_REGION>` is the region your OpenVidu is deployed.

The command `echo "${NEW_IMAGE_ID}"` will print your new AMI ID to be used in OpenVidu. Now you just need to execute the upgrade script with the new AMI ID as an argument:

```console
curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_pro_2.28.0.sh | bash -s upgrade "${NEW_IMAGE_ID}"
```


The installation steps will output their progress as they run. If everything goes well you should see:

```console
================================================
Openvidu successfully upgraded to version 2.28.0
================================================
```

<div class="warningBoxContent">
  <div style="display: table-cell; vertical-align: middle;">
      <i class="icon ion-android-alert warningIcon"></i>
  </div>
  <div class="warningBoxText">
        To be able to execute the previous commands in your aws account, you need  <a href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html" target="_blank">aws-cli</a> installed and configured with root credentials to be able to copy the AMI to your account and region. Additionaly, you can use <a href="https://docs.aws.amazon.com/cloudshell/latest/userguide/welcome.html" target="_blank">AWS Cloudshell</a> service to execute <a href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html" target="_blank">aws-cli</a> commands without the need of installing anything in your local machine.
  </div>
</div>


**7)** After executing the previous command you will end up with two environment files:

  - `.env-2.28.0`: Empty configuration file of the 2.28.0 version.
  - `.env`: Previous configuration which remains intact.


Transfer any configuration you want to keep in the upgraded version from `.env` to `.env-2.28.0`. Don't move any parameter which starts with `AWS_`, keep those parameters intact.

**8)** When you have the file `.env-2.28.0` with all your desired parameters, remove the original `.env` (or do a backup of it) and rename the `env-2.28.0` to `.env`.


**9)** Start Openvidu.

```
./openvidu start
```

<br>

### Migrating from 2.27.0 to 2.28.0 (On Premises)

#### 1) Upgrading Media Node

> Take into account that, if you have deployed using Cloudformation, you don't need to update media nodes. Just terminate all media nodes from the AWS EC2 Panel and Upgrade only the master node.
> After upgrading your master node, new media nodes will be created automatically or using [Inspector and Rest API](openvidu-pro/scalability/#change-the-number-of-media-nodes-on-the-fly){target="_blank"}.

At first, you need to update all of your media nodes. Connect to each of your Media Nodes through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/kms`

```bash
sudo -s
cd /opt/kms # Recommended and default installation path
```

Then you can run the upgrade script with this command:

<p style="text-align: start">
<code id="code-7"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_media_node_2.28.0.sh | bash -s upgrade</strong></code>
<button id="btn-copy-7" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
                              title="Copy to Clipboard">Copy</button>
</p>

The installation steps will output their progress as they run. If everything goes well, at the end you will see a message with the final instructions to successfully complete the upgrade process:

```console
================================================
Openvidu successfully upgraded to version 2.28.0
================================================

1. A new file 'docker-compose.yml' has been created with the new OpenVidu 2.28.0 services

2. This new version 2.28.0 does not need any .env file. Everything is configured from OpenVidu Pro

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

> **Check out the [notes when upgrading Media Nodes](#notes-when-upgrading-media-nodes)**

<br>

#### 2) Upgrading Master Node

After all of your media nodes are updated, you just need to connect to the Master Node instance through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/openvidu`

```bash
sudo -s
cd /opt/openvidu # Recommended and default installation path
```

Then you can run the upgrade script with this command:

<p style="text-align: start">
<code id="code-8"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_pro_2.28.0.sh | bash -s upgrade</strong></code>
<button id="btn-copy-8" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
                              title="Copy to Clipboard">Copy</button>
</p>

The installation steps will output their progress as they run. If everything goes well, at the end you will see a message with the final instructions to successfully complete the upgrade process:

```console
================================================
Openvidu successfully upgraded to version 2.28.0
================================================
1. A new file 'docker-compose.yml' has been created with the new OpenVidu 2.28.0 services

2. The previous file '.env' remains intact, but a new file '.env-2.28.0' has been created.
Transfer any configuration you wish to keep in the upgraded version from '.env' to '.env-2.28.0'.
When you are OK with it, rename and leave as the only '.env' file of the folder the new '.env-2.28.0'.

3. If you were using Openvidu Call application, it has been automatically updated in file 'docker-compose.override.yml'.
However, if you were using your own application, a file called 'docker-compose.override.yml-2.28.0'
has been created with the latest version of Openvidu Call. If you don't plan to use it you can delete it.

4. Start new version of Openvidu
$ ./openvidu start

If you want to rollback, all the files from the previous installation have been copied to folder '.old-2.27.0'
```

Make sure that you have all of your needed properties at your .env file and start OpenVidu with:

```
./openvidu start
```

<br>

## Migrating from 2.26.2 to 2.27.0

Depending of the type of deployment you have (_AWS_ or _On Premises_), you will need to follow one of the following instructions:

- **[Migrating from 2.26.2 to 2.27.0 (AWS Cloudformation)](#migrating-from-2262-to-2270-aws-cloudformation)**
- **[Migrating from 2.26.2 to 2.27.0 (On premises)](#migrating-from-2262-to-2270-on-premises)**

### Migrating from 2.26.2 to 2.27.0 (AWS Cloudformation)

#### Option 1 (recommended): Deploy a new Cloudformation for 2.27.0

If you have deployed using Cloudformation **we strongly recommend updating by deploying a new [OpenVidu Cloudformation template of 2.27.0](https://docs.openvidu.io/en/2.27.0/deployment/pro/aws/){target="_blank"}**.

By deploying a new Cloudformation for each version you update, you can benefit of updated AMIs in your deployment, and you can ensure that the upgrading process is not degraded by infrastructure changes that may be applied to the Cloudformation definition.

To do it, you just need to:

- Deploy the OpenVidu Cloudformation template of the version you want.
- If you have recordings stored in the master node, move recordings at`/opt/openvidu/recordings` to the new deployment.
- If you have your app deployed next to OpenVidu, move your app to your new deployment.
- Modify the file at `/opt/openvidu/.env` to have your previous configuration values. (Ignore parameters which start with `AWS_`)

However, if you don't want to deploy a new Cloudformation, you can follow the instruction from [Option 2: Update current deployment to 2.27.0](#option-2-update-current-deployment-to-2270), but you should know that the upgrading process may have some not contemplated issues if something in the Cloudformation template has changed between versions.

#### Option 2: Update current deployment to 2.27.0

**1)** SSH into your OpenVidu Server Master Node.

**2)** Change to the root user:
```bash
sudo -s
```

**3)** Go to the OpenVidu installation directory:
```bash
cd /opt/openvidu
```

**4)** Stop OpenVidu Server:
```bash
./openvidu stop
```

**5)** Terminate all Media nodes instances from your __EC2 Instances panel__.

**6)** As OpenVidu uses an AMI to deploy and provision media nodes, we need to get and copy the media node AMI of the version we want to deploy. To get the Id of our official AMI you just need to execute:

```bash
ORIGINAL_AMI_ID=$(curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/get_ov_media_node_ami_id.sh | bash -s 2.27.0)
```

The obtained `ORIGINAL_AMI_ID` must not be used in your deployment, you need to copy this AMI to your account and region where you have OpenVidu deployed. To copy this AMI to your account, execute these commands:

```bash
# Region where OpenVidu is deployed
REGION=<YOUR_REGION>

# Copy AMI and get AMI Id
NEW_IMAGE_ID=$(aws ec2 copy-image \
    --region "${REGION}" --name "OpenVidu PRO/ENTERPRISE - Media Node 2.27.0" \
    --source-region eu-west-1 --source-image-id "${ORIGINAL_AMI_ID}" --output text)

# Wait for the AMI to be available
aws ec2 wait image-available --region "${REGION}" --image-ids "${NEW_IMAGE_ID}"

# Print AMI Id
echo "${NEW_IMAGE_ID}"
```

Where `<YOUR_REGION>` is the region your OpenVidu is deployed.

The command `echo "${NEW_IMAGE_ID}"` will print your new AMI ID to be used in OpenVidu. Now you just need to execute the upgrade script with the new AMI ID as an argument:

```console
curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_pro_2.27.0.sh | bash -s upgrade "${NEW_IMAGE_ID}"
```


The installation steps will output their progress as they run. If everything goes well you should see:

```console
================================================
Openvidu successfully upgraded to version 2.27.0
================================================
```

<div class="warningBoxContent">
  <div style="display: table-cell; vertical-align: middle;">
      <i class="icon ion-android-alert warningIcon"></i>
  </div>
  <div class="warningBoxText">
        To be able to execute the previous commands in your aws account, you need  <a href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html" target="_blank">aws-cli</a> installed and configured with root credentials to be able to copy the AMI to your account and region. Additionaly, you can use <a href="https://docs.aws.amazon.com/cloudshell/latest/userguide/welcome.html" target="_blank">AWS Cloudshell</a> service to execute <a href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html" target="_blank">aws-cli</a> commands without the need of installing anything in your local machine.
  </div>
</div>


**7)** After executing the previous command you will end up with two environment files:

  - `.env-2.27.0`: Empty configuration file of the 2.27.0 version.
  - `.env`: Previous configuration which remains intact.


Transfer any configuration you want to keep in the upgraded version from `.env` to `.env-2.27.0`. Don't move any parameter which starts with `AWS_`, keep those parameters intact.

**8)** When you have the file `.env-2.27.0` with all your desired parameters, remove the original `.env` (or do a backup of it) and rename the `env-2.27.0` to `.env`.


**9)** Start Openvidu.

```
./openvidu start
```

<br>

### Migrating from 2.26.2 to 2.27.0 (On Premises)

#### 1) Upgrading Media Node

> Take into account that, if you have deployed using Cloudformation, you don't need to update media nodes. Just terminate all media nodes from the AWS EC2 Panel and Upgrade only the master node.
> After upgrading your master node, new media nodes will be created automatically or using [Inspector and Rest API](openvidu-pro/scalability/#change-the-number-of-media-nodes-on-the-fly){target="_blank"}.

At first, you need to update all of your media nodes. Connect to each of your Media Nodes through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/kms`

```bash
sudo -s
cd /opt/kms # Recommended and default installation path
```

Then you can run the upgrade script with this command:

<p style="text-align: start">
<code id="code-9"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_media_node_2.27.0.sh | bash -s upgrade</strong></code>
<button id="btn-copy-9" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
                              title="Copy to Clipboard">Copy</button>
</p>

The installation steps will output their progress as they run. If everything goes well, at the end you will see a message with the final instructions to successfully complete the upgrade process:

```console
================================================
Openvidu successfully upgraded to version 2.27.0
================================================

1. A new file 'docker-compose.yml' has been created with the new OpenVidu 2.27.0 services

2. This new version 2.27.0 does not need any .env file. Everything is configured from OpenVidu Pro

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

> **Check out the [notes when upgrading Media Nodes](#notes-when-upgrading-media-nodes)**

<br>

#### 2) Upgrading Master Node

After all of your media nodes are updated, you just need to connect to the Master Node instance through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/openvidu`

```bash
sudo -s
cd /opt/openvidu # Recommended and default installation path
```

Then you can run the upgrade script with this command:

<p style="text-align: start">
<code id="code-10"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_pro_2.27.0.sh | bash -s upgrade</strong></code>
<button id="btn-copy-10" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
                              title="Copy to Clipboard">Copy</button>
</p>

The installation steps will output their progress as they run. If everything goes well, at the end you will see a message with the final instructions to successfully complete the upgrade process:

```console
================================================
Openvidu successfully upgraded to version 2.27.0
================================================
1. A new file 'docker-compose.yml' has been created with the new OpenVidu 2.27.0 services

2. The previous file '.env' remains intact, but a new file '.env-2.27.0' has been created.
Transfer any configuration you wish to keep in the upgraded version from '.env' to '.env-2.27.0'.
When you are OK with it, rename and leave as the only '.env' file of the folder the new '.env-2.27.0'.

3. If you were using Openvidu Call application, it has been automatically updated in file 'docker-compose.override.yml'.
However, if you were using your own application, a file called 'docker-compose.override.yml-2.27.0'
has been created with the latest version of Openvidu Call. If you don't plan to use it you can delete it.

4. Start new version of Openvidu
$ ./openvidu start

If you want to rollback, all the files from the previous installation have been copied to folder '.old-2.26.2'
```

Make sure that you have all of your needed properties at your .env file and start OpenVidu with:

```
./openvidu start
```

<br>

## Migrating from 2.25.0 to 2.26.2

Depending of the type of deployment you have (_AWS_ or _On Premises_), you will need to follow one of the following instructions:

- **[Migrating from 2.25.0 to 2.26.2 (AWS Cloudformation)](#migrating-from-2250-to-2262-aws-cloudformation)**
- **[Migrating from 2.25.0 to 2.26.2 (On premises)](#migrating-from-2250-to-2262-on-premises)**

### Migrating from 2.25.0 to 2.26.2 (AWS Cloudformation)

#### Option 1 (recommended): Deploy a new Cloudformation for 2.26.2

If you have deployed using Cloudformation **we strongly recommend updating by deploying a new [OpenVidu Cloudformation template of 2.26.2](https://docs.openvidu.io/en/2.26.2/deployment/pro/aws/){target="_blank"}**.

By deploying a new Cloudformation for each version you update, you can benefit of updated AMIs in your deployment, and you can ensure that the upgrading process is not degraded by infrastructure changes that may be applied to the Cloudformation definition.

To do it, you just need to:

- Deploy the OpenVidu Cloudformation template of the version you want.
- If you have recordings stored in the master node, move recordings at`/opt/openvidu/recordings` to the new deployment.
- If you have your app deployed next to OpenVidu, move your app to your new deployment.
- Modify the file at `/opt/openvidu/.env` to have your previous configuration values. (Ignore parameters which start with `AWS_`)

However, if you don't want to deploy a new Cloudformation, you can follow the instruction from [Option 2: Update current deployment to 2.26.2](#option-2-update-current-deployment-to-2262), but you should know that the upgrading process may have some not contemplated issues if something in the Cloudformation template has changed between versions.

#### Option 2: Update current deployment to 2.26.2

**1)** SSH into your OpenVidu Server Master Node.

**2)** Change to the root user:
```bash
sudo -s
```

**3)** Go to the OpenVidu installation directory:
```bash
cd /opt/openvidu
```

**4)** Stop OpenVidu Server:
```bash
./openvidu stop
```

**5)** Terminate all Media nodes instances from your __EC2 Instances panel__.

**6)** As OpenVidu uses an AMI to deploy and provision media nodes, we need to get and copy the media node AMI of the version we want to deploy. To get the Id of our official AMI you just need to execute:

```bash
ORIGINAL_AMI_ID=$(curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/get_ov_media_node_ami_id.sh | bash -s 2.26.2)
```

The obtained `ORIGINAL_AMI_ID` must not be used in your deployment, you need to copy this AMI to your account and region where you have OpenVidu deployed. To copy this AMI to your account, execute these commands:

```bash
# Region where OpenVidu is deployed
REGION=<YOUR_REGION>

# Copy AMI and get AMI Id
NEW_IMAGE_ID=$(aws ec2 copy-image \
    --region "${REGION}" --name "OpenVidu PRO/ENTERPRISE - Media Node 2.26.2" \
    --source-region eu-west-1 --source-image-id "${ORIGINAL_AMI_ID}" --output text)

# Wait for the AMI to be available
aws ec2 wait image-available --region "${REGION}" --image-ids "${NEW_IMAGE_ID}"

# Print AMI Id
echo "${NEW_IMAGE_ID}"
```

Where `<YOUR_REGION>` is the region your OpenVidu is deployed.

The command `echo "${NEW_IMAGE_ID}"` will print your new AMI ID to be used in OpenVidu. Now you just need to execute the upgrade script with the new AMI ID as an argument:

```console
curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_pro_2.26.2.sh | bash -s upgrade "${NEW_IMAGE_ID}"
```


The installation steps will output their progress as they run. If everything goes well you should see:

```console
================================================
Openvidu successfully upgraded to version 2.26.2
================================================
```

<div class="warningBoxContent">
  <div style="display: table-cell; vertical-align: middle;">
      <i class="icon ion-android-alert warningIcon"></i>
  </div>
  <div class="warningBoxText">
        To be able to execute the previous commands in your aws account, you need  <a href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html" target="_blank">aws-cli</a> installed and configured with root credentials to be able to copy the AMI to your account and region. Additionaly, you can use <a href="https://docs.aws.amazon.com/cloudshell/latest/userguide/welcome.html" target="_blank">AWS Cloudshell</a> service to execute <a href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html" target="_blank">aws-cli</a> commands without the need of installing anything in your local machine.
  </div>
</div>


**7)** After executing the previous command you will end up with two environment files:

  - `.env-2.26.2`: Empty configuration file of the 2.26.2 version.
  - `.env`: Previous configuration which remains intact.


Transfer any configuration you want to keep in the upgraded version from `.env` to `.env-2.26.2`. Don't move any parameter which starts with `AWS_`, keep those parameters intact.

**8)** When you have the file `.env-2.26.2` with all your desired parameters, remove the original `.env` (or do a backup of it) and rename the `env-2.26.2` to `.env`.


**9)** Start Openvidu.

```
./openvidu start
```

<br>

### Migrating from 2.25.0 to 2.26.2 (On Premises)

#### 1) Upgrading Media Node

> Take into account that, if you have deployed using Cloudformation, you don't need to update media nodes. Just terminate all media nodes from the AWS EC2 Panel and Upgrade only the master node.
> After upgrading your master node, new media nodes will be created automatically or using [Inspector and Rest API](openvidu-pro/scalability/#change-the-number-of-media-nodes-on-the-fly){target="_blank"}.

At first, you need to update all of your media nodes. Connect to each of your Media Nodes through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/kms`

```bash
sudo -s
cd /opt/kms # Recommended and default installation path
```

Then you can run the upgrade script with this command:

<p style="text-align: start">
<code id="code-11"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_media_node_2.26.2.sh | bash -s upgrade</strong></code>
<button id="btn-copy-11" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
                              title="Copy to Clipboard">Copy</button>
</p>

The installation steps will output their progress as they run. If everything goes well, at the end you will see a message with the final instructions to successfully complete the upgrade process:

```console
================================================
Openvidu successfully upgraded to version 2.26.2
================================================

1. A new file 'docker-compose.yml' has been created with the new OpenVidu 2.26.2 services

2. This new version 2.26.2 does not need any .env file. Everything is configured from OpenVidu Pro

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

> **Check out the [notes when upgrading Media Nodes](#notes-when-upgrading-media-nodes)**

<br>

#### 2) Upgrading Master Node

After all of your media nodes are updated, you just need to connect to the Master Node instance through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/openvidu`

```bash
sudo -s
cd /opt/openvidu # Recommended and default installation path
```

Then you can run the upgrade script with this command:

<p style="text-align: start">
<code id="code-12"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_pro_2.26.2.sh | bash -s upgrade</strong></code>
<button id="btn-copy-12" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
                              title="Copy to Clipboard">Copy</button>
</p>

The installation steps will output their progress as they run. If everything goes well, at the end you will see a message with the final instructions to successfully complete the upgrade process:

```console
================================================
Openvidu successfully upgraded to version 2.26.2
================================================
1. A new file 'docker-compose.yml' has been created with the new OpenVidu 2.26.2 services

2. The previous file '.env' remains intact, but a new file '.env-2.26.2' has been created.
Transfer any configuration you wish to keep in the upgraded version from '.env' to '.env-2.26.2'.
When you are OK with it, rename and leave as the only '.env' file of the folder the new '.env-2.26.2'.

3. If you were using Openvidu Call application, it has been automatically updated in file 'docker-compose.override.yml'.
However, if you were using your own application, a file called 'docker-compose.override.yml-2.26.2'
has been created with the latest version of Openvidu Call. If you don't plan to use it you can delete it.

4. Start new version of Openvidu
$ ./openvidu start

If you want to rollback, all the files from the previous installation have been copied to folder '.old-2.25.0'
```

Make sure that you have all of your needed properties at your .env file and start OpenVidu with:

```
./openvidu start
```

<br>

## Migrating from 2.24.0 to 2.25.0

Depending of the type of deployment you have (_AWS_ or _On Premises_), you will need to follow one of the following instructions:

- **[Migrating from 2.24.0 to 2.25.0 (AWS Cloudformation)](#migrating-from-2240-to-2250-aws-cloudformation)**
- **[Migrating from 2.24.0 to 2.25.0 (On premises)](#migrating-from-2240-to-2250-on-premises)**

### Migrating from 2.24.0 to 2.25.0 (AWS Cloudformation)

#### Option 1 (recommended): Deploy a new Cloudformation for 2.25.0

If you have deployed using Cloudformation **we strongly recommend updating by deploying a new [OpenVidu Cloudformation template of 2.25.0](https://docs.openvidu.io/en/2.25.0/deployment/pro/aws/){target="_blank"}**.

By deploying a new Cloudformation for each version you update, you can benefit of updated AMIs in your deployment, and you can ensure that the upgrading process is not degraded by infrastructure changes that may be applied to the Cloudformation definition.

To do it, you just need to:

- Deploy the OpenVidu Cloudformation template of the version you want.
- If you have recordings stored in the master node, move recordings at`/opt/openvidu/recordings` to the new deployment.
- If you have your app deployed next to OpenVidu, move your app to your new deployment.
- Modify the file at `/opt/openvidu/.env` to have your previous configuration values. (Ignore parameters which start with `AWS_`)

However, if you don't want to deploy a new Cloudformation, you can follow the instruction from [Option 2: Update current deployment to 2.25.0](#option-2-update-current-deployment-to-2240), but you should know that the upgrading process may have some not contemplated issues if something in the Cloudformation template has changed between versions.

#### Option 2: Update current deployment to 2.25.0

**1)** SSH into your OpenVidu Server Master Node.

**2)** Change to the root user:
```bash
sudo -s
```

**3)** Go to the OpenVidu installation directory:
```bash
cd /opt/openvidu
```

**4)** Stop OpenVidu Server:
```bash
./openvidu stop
```

**5)** Terminate all Media nodes instances from your __EC2 Instances panel__.

**6)** As OpenVidu uses an AMI to deploy and provision media nodes, we need to get and copy the media node AMI of the version we want to deploy. To get the Id of our official AMI you just need to execute:

```bash
ORIGINAL_AMI_ID=$(curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/get_ov_media_node_ami_id.sh | bash -s 2.25.0)
```

The obtained `ORIGINAL_AMI_ID` must not be used in your deployment, you need to copy this AMI to your account and region where you have OpenVidu deployed. To copy this AMI to your account, execute these commands:

```bash
# Region where OpenVidu is deployed
REGION=<YOUR_REGION>

# Copy AMI and get AMI Id
NEW_IMAGE_ID=$(aws ec2 copy-image \
    --region "${REGION}" --name "OpenVidu PRO/ENTERPRISE - Media Node 2.25.0" \
    --source-region eu-west-1 --source-image-id "${ORIGINAL_AMI_ID}" --output text)

# Wait for the AMI to be available
aws ec2 wait image-available --region "${REGION}" --image-ids "${NEW_IMAGE_ID}"

# Print AMI Id
echo "${NEW_IMAGE_ID}"
```

Where `<YOUR_REGION>` is the region your OpenVidu is deployed.

The command `echo "${NEW_IMAGE_ID}"` will print your new AMI ID to be used in OpenVidu. Now you just need to execute the upgrade script with the new AMI ID as an argument:

```console
curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_pro_2.25.0.sh | bash -s upgrade "${NEW_IMAGE_ID}"
```


The installation steps will output their progress as they run. If everything goes well you should see:

```console
================================================
Openvidu successfully upgraded to version 2.25.0
================================================
```

<div class="warningBoxContent">
  <div style="display: table-cell; vertical-align: middle;">
      <i class="icon ion-android-alert warningIcon"></i>
  </div>
  <div class="warningBoxText">
        To be able to execute the previous commands in your aws account, you need  <a href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html" target="_blank">aws-cli</a> installed and configured with root credentials to be able to copy the AMI to your account and region. Additionaly, you can use <a href="https://docs.aws.amazon.com/cloudshell/latest/userguide/welcome.html" target="_blank">AWS Cloudshell</a> service to execute <a href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html" target="_blank">aws-cli</a> commands without the need of installing anything in your local machine.
  </div>
</div>


**7)** After executing the previous command you will end up with two environment files:

  - `.env-2.25.0`: Empty configuration file of the 2.25.0 version.
  - `.env`: Previous configuration which remains intact.


Transfer any configuration you want to keep in the upgraded version from `.env` to `.env-2.25.0`. Don't move any parameter which starts with `AWS_`, keep those parameters intact.

**8)** When you have the file `.env-2.25.0` with all your desired parameters, remove the original `.env` (or do a backup of it) and rename the `env-2.25.0` to `.env`.


**9)** Start Openvidu.

```
./openvidu start
```

<br>

### Migrating from 2.24.0 to 2.25.0 (On Premises)

#### 1) Upgrading Media Node

> Take into account that, if you have deployed using Cloudformation, you don't need to update media nodes. Just terminate all media nodes from the AWS EC2 Panel and Upgrade only the master node.
> After upgrading your master node, new media nodes will be created automatically or using [Inspector and Rest API](openvidu-pro/scalability/#change-the-number-of-media-nodes-on-the-fly){target="_blank"}.

At first, you need to update all of your media nodes. Connect to each of your Media Nodes through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/kms`

```bash
sudo -s
cd /opt/kms # Recommended and default installation path
```

Then you can run the upgrade script with this command:

<p style="text-align: start">
<code id="code-13"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_media_node_2.25.0.sh | bash -s upgrade</strong></code>
<button id="btn-copy-13" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
                              title="Copy to Clipboard">Copy</button>
</p>

The installation steps will output their progress as they run. If everything goes well, at the end you will see a message with the final instructions to successfully complete the upgrade process:

```console
================================================
Openvidu successfully upgraded to version 2.25.0
================================================

1. A new file 'docker-compose.yml' has been created with the new OpenVidu 2.25.0 services

2. This new version 2.25.0 does not need any .env file. Everything is configured from OpenVidu Pro

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

> **Check out the [notes when upgrading Media Nodes](#notes-when-upgrading-media-nodes)**

<br>

#### 2) Upgrading Master Node

After all of your media nodes are updated, you just need to connect to the Master Node instance through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/openvidu`

```bash
sudo -s
cd /opt/openvidu # Recommended and default installation path
```

Then you can run the upgrade script with this command:

<p style="text-align: start">
<code id="code-14"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_pro_2.25.0.sh | bash -s upgrade</strong></code>
<button id="btn-copy-14" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
                              title="Copy to Clipboard">Copy</button>
</p>

The installation steps will output their progress as they run. If everything goes well, at the end you will see a message with the final instructions to successfully complete the upgrade process:

```console
================================================
Openvidu successfully upgraded to version 2.25.0
================================================
1. A new file 'docker-compose.yml' has been created with the new OpenVidu 2.25.0 services

2. The previous file '.env' remains intact, but a new file '.env-2.25.0' has been created.
Transfer any configuration you wish to keep in the upgraded version from '.env' to '.env-2.25.0'.
When you are OK with it, rename and leave as the only '.env' file of the folder the new '.env-2.25.0'.

3. If you were using Openvidu Call application, it has been automatically updated in file 'docker-compose.override.yml'.
However, if you were using your own application, a file called 'docker-compose.override.yml-2.25.0'
has been created with the latest version of Openvidu Call. If you don't plan to use it you can delete it.

4. Start new version of Openvidu
$ ./openvidu start

If you want to rollback, all the files from the previous installation have been copied to folder '.old-2.24.0'
```

Make sure that you have all of your needed properties at your .env file and start OpenVidu with:

```
./openvidu start
```

<br>

## Migrating from 2.23.0 to 2.24.0

Depending of the type of deployment you have (_AWS_ or _On Premises_), you will need to follow one of the following instructions:

- **[Migrating from 2.23.0 to 2.24.0 (AWS Cloudformation)](#migrating-from-2230-to-2240-aws-cloudformation)**
- **[Migrating from 2.23.0 to 2.24.0 (On premises)](#migrating-from-2230-to-2240-on-premises)**

### Migrating from 2.23.0 to 2.24.0 (AWS Cloudformation)

#### Option 1 (recommended): Deploy a new Cloudformation for 2.24.0

If you have deployed using Cloudformation **we strongly recommend updating by deploying a new [OpenVidu Cloudformation template of 2.24.0](https://docs.openvidu.io/en/2.24.0/deployment/pro/aws/){target="_blank"}**.

By deploying a new Cloudformation for each version you update, you can benefit of updated AMIs in your deployment, and you can ensure that the upgrading process is not degraded by infrastructure changes that may be applied to the Cloudformation definition.

To do it, you just need to:

- Deploy the OpenVidu Cloudformation template of the version you want.
- If you have recordings stored in the master node, move recordings at`/opt/openvidu/recordings` to the new deployment.
- If you have your app deployed next to OpenVidu, move your app to your new deployment.
- Modify the file at `/opt/openvidu/.env` to have your previous configuration values. (Ignore parameters which start with `AWS_`)

However, if you don't want to deploy a new Cloudformation, you can follow the instruction from [Option 2: Update current deployment to 2.24.0](#option-2-update-current-deployment-to-2230), but you should know that the upgrading process may have some not contemplated issues if something in the Cloudformation template has changed between versions.

#### Option 2: Update current deployment to 2.24.0

**1)** SSH into your OpenVidu Server Master Node.

**2)** Change to the root user:
```bash
sudo -s
```

**3)** Go to the OpenVidu installation directory:
```bash
cd /opt/openvidu
```

**4)** Stop OpenVidu Server:
```bash
./openvidu stop
```

**5)** Terminate all Media nodes instances from your __EC2 Instances panel__.

**6)** As OpenVidu uses an AMI to deploy and provision media nodes, we need to get and copy the media node AMI of the version we want to deploy. To get the Id of our official AMI you just need to execute:

```bash
ORIGINAL_AMI_ID=$(curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/get_ov_media_node_ami_id.sh | bash -s 2.24.0)
```

The obtained `ORIGINAL_AMI_ID` must not be used in your deployment, you need to copy this AMI to your account and region where you have OpenVidu deployed. To copy this AMI to your account, execute these commands:

```bash
# Region where OpenVidu is deployed
REGION=<YOUR_REGION>

# Copy AMI and get AMI Id
NEW_IMAGE_ID=$(aws ec2 copy-image \
    --region "${REGION}" --name "OpenVidu PRO/ENTERPRISE - Media Node 2.24.0" \
    --source-region eu-west-1 --source-image-id "${ORIGINAL_AMI_ID}" --output text)

# Wait for the AMI to be available
aws ec2 wait image-available --region "${REGION}" --image-ids "${NEW_IMAGE_ID}"

# Print AMI Id
echo "${NEW_IMAGE_ID}"
```

Where `<YOUR_REGION>` is the region your OpenVidu is deployed.

The command `echo "${NEW_IMAGE_ID}"` will print your new AMI ID to be used in OpenVidu. Now you just need to execute the upgrade script with the new AMI ID as an argument:

```console
curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_pro_2.24.0.sh | bash -s upgrade "${NEW_IMAGE_ID}"
```


The installation steps will output their progress as they run. If everything goes well you should see:

```console
================================================
Openvidu successfully upgraded to version 2.24.0
================================================
```

<div class="warningBoxContent">
  <div style="display: table-cell; vertical-align: middle;">
      <i class="icon ion-android-alert warningIcon"></i>
  </div>
  <div class="warningBoxText">
        To be able to execute the previous commands in your aws account, you need  <a href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html" target="_blank">aws-cli</a> installed and configured with root credentials to be able to copy the AMI to your account and region. Additionaly, you can use <a href="https://docs.aws.amazon.com/cloudshell/latest/userguide/welcome.html" target="_blank">AWS Cloudshell</a> service to execute <a href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html" target="_blank">aws-cli</a> commands without the need of installing anything in your local machine.
  </div>
</div>


**7)** After executing the previous command you will end up with two environment files:

  - `.env-2.24.0`: Empty configuration file of the 2.24.0 version.
  - `.env`: Previous configuration which remains intact.


Transfer any configuration you want to keep in the upgraded version from `.env` to `.env-2.24.0`. Don't move any parameter which starts with `AWS_`, keep those parameters intact.

**8)** When you have the file `.env-2.24.0` with all your desired parameters, remove the original `.env` (or do a backup of it) and rename the `env-2.24.0` to `.env`.


**9)** Start Openvidu.

```
./openvidu start
```

<br>

### Migrating from 2.23.0 to 2.24.0 (On Premises)

#### 1) Upgrading Media Node

> Take into account that, if you have deployed using Cloudformation, you don't need to update media nodes. Just terminate all media nodes from the AWS EC2 Panel and Upgrade only the master node.
> After upgrading your master node, new media nodes will be created automatically or using [Inspector and Rest API](openvidu-pro/scalability/#change-the-number-of-media-nodes-on-the-fly){target="_blank"}.

At first, you need to update all of your media nodes. Connect to each of your Media Nodes through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/kms`

```bash
sudo -s
cd /opt/kms # Recommended and default installation path
```

Then you can run the upgrade script with this command:

<p style="text-align: start">
<code id="code-15"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_media_node_2.24.0.sh | bash -s upgrade</strong></code>
<button id="btn-copy-15" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
                              title="Copy to Clipboard">Copy</button>
</p>

The installation steps will output their progress as they run. If everything goes well, at the end you will see a message with the final instructions to successfully complete the upgrade process:

```console
================================================
Openvidu successfully upgraded to version 2.24.0
================================================

1. A new file 'docker-compose.yml' has been created with the new OpenVidu 2.24.0 services

2. This new version 2.24.0 does not need any .env file. Everything is configured from OpenVidu Pro

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

<div class="warningBoxContent">
  <div style="display: table-cell; vertical-align: middle;">
      <i class="icon ion-android-alert warningIcon"></i>
  </div>
  <div class="warningBoxText">
        If you want to use the <strong><a href="advanced-features/speech-to-text/" target="_blank">Speech to text</a></strong> service available in this version, you need to open the port 4000 in your Media Node to be reachable only by OpenVidu Server.
  </div>
</div>

> **Check out the [notes when upgrading Media Nodes](#notes-when-upgrading-media-nodes)**

<br>

#### 2) Upgrading Master Node

After all of your media nodes are updated, you just need to connect to the Master Node instance through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/openvidu`

```bash
sudo -s
cd /opt/openvidu # Recommended and default installation path
```

Then you can run the upgrade script with this command:

<p style="text-align: start">
<code id="code-16"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_pro_2.24.0.sh | bash -s upgrade</strong></code>
<button id="btn-copy-16" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
                              title="Copy to Clipboard">Copy</button>
</p>

The installation steps will output their progress as they run. If everything goes well, at the end you will see a message with the final instructions to successfully complete the upgrade process:

```console
================================================
Openvidu successfully upgraded to version 2.24.0
================================================
1. A new file 'docker-compose.yml' has been created with the new OpenVidu 2.24.0 services

2. The previous file '.env' remains intact, but a new file '.env-2.24.0' has been created.
Transfer any configuration you wish to keep in the upgraded version from '.env' to '.env-2.24.0'.
When you are OK with it, rename and leave as the only '.env' file of the folder the new '.env-2.24.0'.

3. If you were using Openvidu Call application, it has been automatically updated in file 'docker-compose.override.yml'.
However, if you were using your own application, a file called 'docker-compose.override.yml-2.24.0'
has been created with the latest version of Openvidu Call. If you don't plan to use it you can delete it.

4. Start new version of Openvidu
$ ./openvidu start

If you want to rollback, all the files from the previous installation have been copied to folder '.old-2.23.0'
```

Make sure that you have all of your needed properties at your .env file and start OpenVidu with:

```
./openvidu start
```

<br>

## Migrating from 2.22.0 to 2.23.0

Depending of the type of deployment you have (_AWS_ or _On Premises_), you will need to follow one of the following instructions:

- **[Migrating from 2.22.0 to 2.23.0 (AWS Cloudformation)](#migrating-from-2220-to-2230-aws-cloudformation)**
- **[Migrating from 2.22.0 to 2.23.0 (On premises)](#migrating-from-2220-to-2230-on-premises)**

### Migrating from 2.22.0 to 2.23.0 (AWS Cloudformation)

#### Option 1 (recommended): Deploy a new Cloudformation for 2.23.0

If you have deployed using Cloudformation **we strongly recommend updating by deploying a new [OpenVidu Cloudformation template of 2.23.0](https://docs.openvidu.io/en/2.23.0/deployment/pro/aws/){target="_blank"}**.

By deploying a new Cloudformation for each version you update, you can benefit of updated AMIs in your deployment, and you can ensure that the upgrading process is not degraded by infrastructure changes that may be applied to the Cloudformation definition.

To do it, you just need to:

- Deploy the OpenVidu Cloudformation template of the version you want.
- If you have recordings stored in the master node, move recordings at`/opt/openvidu/recordings` to the new deployment.
- If you have your app deployed next to OpenVidu, move your app to your new deployment.
- Modify the file at `/opt/openvidu/.env` to have your previous configuration values. (Ignore parameters which start with `AWS_`)

However, if you don't want to deploy a new Cloudformation, you can follow the instruction from [Option 2: Update current deployment to 2.23.0](#option-2-update-current-deployment-to-2220), but you should know that the upgrading process may have some not contemplated issues if something in the Cloudformation template has changed between versions.

#### Option 2: Update current deployment to 2.23.0

**1)** SSH into your OpenVidu Server Master Node.

**2)** Change to the root user:
```bash
sudo -s
```

**3)** Go to the OpenVidu installation directory:
```bash
cd /opt/openvidu
```

**4)** Stop OpenVidu Server:
```bash
./openvidu stop
```

**5)** Terminate all Media nodes instances from your __EC2 Instances panel__.

**6)** As OpenVidu uses an AMI to deploy and provision media nodes, we need to get and copy the media node AMI of the version we want to deploy. To get the Id of our official AMI you just need to execute:

```bash
ORIGINAL_AMI_ID=$(curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/get_ov_media_node_ami_id.sh | bash -s 2.23.0)
```

The obtained `ORIGINAL_AMI_ID` must not be used in your deployment, you need to copy this AMI to your account and region where you have OpenVidu deployed. To copy this AMI to your account, execute these commands:

```bash
# Region where OpenVidu is deployed
REGION=<YOUR_REGION>

# Copy AMI and get AMI Id
NEW_IMAGE_ID=$(aws ec2 copy-image \
    --region "${REGION}" --name "OpenVidu PRO/ENTERPRISE - Media Node 2.23.0" \
    --source-region eu-west-1 --source-image-id "${ORIGINAL_AMI_ID}" --output text)

# Wait for the AMI to be available
aws ec2 wait image-available --region "${REGION}" --image-ids "${NEW_IMAGE_ID}"

# Print AMI Id
echo "${NEW_IMAGE_ID}"
```

Where `<YOUR_REGION>` is the region your OpenVidu is deployed.

The command `echo "${NEW_IMAGE_ID}"` will print your new AMI ID to be used in OpenVidu. Now you just need to execute the upgrade script with the new AMI ID as an argument:

```console
curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_pro_2.23.0.sh | bash -s upgrade "${NEW_IMAGE_ID}"
```


The installation steps will output their progress as they run. If everything goes well you should see:

```console
================================================
Openvidu successfully upgraded to version 2.23.0
================================================
```

<div class="warningBoxContent">
  <div style="display: table-cell; vertical-align: middle;">
      <i class="icon ion-android-alert warningIcon"></i>
  </div>
  <div class="warningBoxText">
        To be able to execute the previous commands in your aws account, you need  <a href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html" target="_blank">aws-cli</a> installed and configured with root credentials to be able to copy the AMI to your account and region. Additionaly, you can use <a href="https://docs.aws.amazon.com/cloudshell/latest/userguide/welcome.html" target="_blank">AWS Cloudshell</a> service to execute <a href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html" target="_blank">aws-cli</a> commands without the need of installing anything in your local machine.
  </div>
</div>


**7)** After executing the previous command you will end up with two environment files:

  - `.env-2.23.0`: Empty configuration file of the 2.23.0 version.
  - `.env`: Previous configuration which remains intact.


Transfer any configuration you want to keep in the upgraded version from `.env` to `.env-2.23.0`. Don't move any parameter which starts with `AWS_`, keep those parameters intact.

**8)** When you have the file `.env-2.23.0` with all your desired parameters, remove the original `.env` (or do a backup of it) and rename the `env-2.23.0` to `.env`.


**9)** Start Openvidu.

```
./openvidu start
```
<br>

### Migrating from 2.22.0 to 2.23.0 (On Premises)

#### 1) Upgrading Media Node

> Take into account that, if you have deployed using Cloudformation, you don't need to update media nodes. Just terminate all media nodes from the AWS EC2 Panel and Upgrade only the master node.
> After upgrading your master node, new media nodes will be created automatically or using [Inspector and Rest API](openvidu-pro/scalability/#change-the-number-of-media-nodes-on-the-fly){target="_blank"}.

At first, you need to update all of your media nodes. Connect to each of your Media Nodes through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/kms`

```bash
sudo -s
cd /opt/kms # Recommended and default installation path
```

Then you can run the upgrade script with this command:

<p style="text-align: start">
<code id="code-17"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_media_node_2.23.0.sh | bash -s upgrade</strong></code>
<button id="btn-copy-17" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
                              title="Copy to Clipboard">Copy</button>
</p>

The installation steps will output their progress as they run. If everything goes well, at the end you will see a message with the final instructions to successfully complete the upgrade process:

```console
================================================
Openvidu successfully upgraded to version 2.23.0
================================================

1. A new file 'docker-compose.yml' has been created with the new OpenVidu 2.23.0 services

2. This new version 2.23.0 does not need any .env file. Everything is configured from OpenVidu Pro

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

#### 2) Upgrading Master Node

After all of your media nodes are updated, you just need to connect to the Master Node instance through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/openvidu`

```bash
sudo -s
cd /opt/openvidu # Recommended and default installation path
```

Then you can run the upgrade script with this command:

<p style="text-align: start">
<code id="code-18"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_pro_2.23.0.sh | bash -s upgrade</strong></code>
<button id="btn-copy-18" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
                              title="Copy to Clipboard">Copy</button>
</p>

The installation steps will output their progress as they run. If everything goes well, at the end you will see a message with the final instructions to successfully complete the upgrade process:

```console
================================================
Openvidu successfully upgraded to version 2.23.0
================================================
1. A new file 'docker-compose.yml' has been created with the new OpenVidu 2.23.0 services

2. The previous file '.env' remains intact, but a new file '.env-2.23.0' has been created.
Transfer any configuration you wish to keep in the upgraded version from '.env' to '.env-2.23.0'.
When you are OK with it, rename and leave as the only '.env' file of the folder the new '.env-2.23.0'.

3. If you were using Openvidu Call application, it has been automatically updated in file 'docker-compose.override.yml'.
However, if you were using your own application, a file called 'docker-compose.override.yml-2.23.0'
has been created with the latest version of Openvidu Call. If you don't plan to use it you can delete it.

4. Start new version of Openvidu
$ ./openvidu start

If you want to rollback, all the files from the previous installation have been copied to folder '.old-2.22.0'
```

Make sure that you have all of your needed properties at your .env file and start OpenVidu with:

```
./openvidu start
```

<br>

## Migrating from 2.21.0 to 2.22.0

Depending of the type of deployment you have (_AWS_ or _On Premises_), you will need to follow one of the following instructions:

- **[Migrating from 2.21.0 to 2.22.0 (AWS Cloudformation)](#migrating-from-2210-to-2220-aws-cloudformation)**
- **[Migrating from 2.21.0 to 2.22.0 (On premises)](#migrating-from-2210-to-2220-on-premises)**

### Migrating from 2.21.0 to 2.22.0 (AWS Cloudformation)

#### Option 1 (recommended): Deploy a new Cloudformation for 2.22.0

If you have deployed using Cloudformation **we strongly recommend updating by deploying a new [OpenVidu Cloudformation template of 2.22.0](https://docs.openvidu.io/en/2.22.0/deployment/pro/aws/){target="_blank"}**.

By deploying a new Cloudformation for each version you update, you can benefit of updated AMIs in your deployment and, you can ensure that the upgrading process is not degraded by infrastructure changes that may be applied to the Cloudformation definition.

To do it, you just need to:

- Deploy the OpenVidu Cloudformation template of the version you want.
- If you have recordings stored in the master node, move recordings at`/opt/openvidu/recordings` to the new deployment.
- If you have your app deployed next to OpenVidu, move your app to your new deployment.
- Modify the file at `/opt/openvidu/.env` to have your previous configuration values. (Ignore parameters which start with `AWS_`)

However, if you don't want to deploy a new Cloudformation, you can follow the instruction from [Option 2: Update current deployment to 2.22.0](#option-2-update-current-deployment-to-2220), but you should know that the upgrading process may have some not contemplated issues if something in the Cloudformation template has changed between versions.

#### Option 2: Update current deployment to 2.22.0

**1)** SSH into your OpenVidu Server Master Node.

**2)** Change to the root user:
```bash
sudo -s
```

**3)** Go to the OpenVidu installation directory:
```bash
cd /opt/openvidu
```

**4)** Stop OpenVidu Server:
```bash
./openvidu stop
```

**5)** Terminate all Media nodes instances from your __EC2 Instances panel__.

**6)** As OpenVidu uses an AMI to deploy and provision media nodes, we need to get and copy the media node AMI of the version we want to deploy. To get the AMI ID of our official AMI you just need to execute:

```bash
ORIGINAL_AMI_ID=$(curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/get_ov_media_node_ami_id.sh | bash -s 2.22.0)
```

`ORIGINAL_AMI_ID` must not be used in your deployment, you need to copy this AMI to your account and region where you have OpenVidu deployed. To copy this AMI to your account, execute these commands:

```bash
# Region where OpenVidu is deployed
REGION=<YOUR_REGION>

# Copy AMI and get AMI Id
NEW_IMAGE_ID=$(aws ec2 copy-image \
    --region "${REGION}" --name "OpenVidu PRO/ENTERPRISE - Media Node 2.22.0" \
    --source-region eu-west-1 --source-image-id "${ORIGINAL_AMI_ID}" --output text)

# Wait for the AMI to be available
aws ec2 wait image-available --region "${REGION}" --image-ids "${NEW_IMAGE_ID}"

# Print AMI Id
echo "${NEW_IMAGE_ID}"
```

Where `<YOUR_REGION>` is the region your OpenVidu is deployed.

The command `echo "${NEW_IMAGE_ID}"` will print your new AMI ID to be used in OpenVidu. Now you just need to execute the upgrade script with the new AMI ID as an argument:

```console
curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_pro_2.22.0.sh | bash -s upgrade "${NEW_IMAGE_ID}"
```

The installation steps will output their progress as they run. If everything goes well you should see:

```console
================================================
Openvidu successfully upgraded to version 2.22.0
================================================
```

<div class="warningBoxContent">
  <div style="display: table-cell; vertical-align: middle;">
      <i class="icon ion-android-alert warningIcon"></i>
  </div>
  <div class="warningBoxText">
        To be able to execute the previous commands in your aws account, you need  <a href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html" target="_blank">aws-cli</a> installed and configured with root credentials to be able to copy the AMI to your account and region. Additionaly, you can use <a href="https://docs.aws.amazon.com/cloudshell/latest/userguide/welcome.html" target="_blank">AWS Cloudshell</a> service to execute <a href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html" target="_blank">aws-cli</a> commands without the need of installing anything in your local machine.
  </div>
</div>

**7)** After executing the previous command you will end up with two environment files:

  - `.env-2.22.0`: Empty configuration file of the 2.22.0 version.
  - `.env`: Previous configuration which remains intact.


Transfer any configuration you want to keep in the upgraded version from `.env` to `.env-2.22.0`. Don't move any parameter which starts with `AWS_`, keep those parameters intact.

**8)** When you have the file `.env-2.22.0` with all your desired parameters, remove the original `.env` (or do a backup of it) and rename the `env-2.22.0` to `.env`.


**9)** Start Openvidu.

```
./openvidu start
```
<br>

##### Additional steps (Optional)

From version 2.22.0 it is now possible to deploy our default TURN/STUN service (Coturn) in Media nodes. To do that, you just need to open inbound port 443 TCP/UDP in addition to the ports previously opened in your media node and configure `OPENVIDU_PRO_COTURN_IN_MEDIA_NODES=true`. Your media nodes needs to have a reachable Public IP for this to work. [More info](https://docs.openvidu.io/en/2.22.0/deployment/pro/on-premises/#coturn-configuration)

### Migrating from 2.21.0 to 2.22.0 (On Premises)

#### 1) Upgrading Media Node

> Take into account that, if you have deployed using Cloudformation, you don't need to update media nodes. Just terminate all media nodes from the AWS EC2 Panel and Upgrade only the master node.
> After upgrading your master node, new media nodes will be created automatically or using [Inspector and Rest API](openvidu-pro/scalability/#change-the-number-of-media-nodes-on-the-fly){target="_blank"}.

At first, you need to update all of your media nodes. Connect to each of your Media Nodes through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/kms`

```bash
sudo -s
cd /opt/kms # Recommended and default installation path
```

Then you can run the upgrade script with this command:

<p style="text-align: start">
<code id="code-19"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_media_node_2.22.0.sh | bash -s upgrade</strong></code>
<button id="btn-copy-19" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
                              title="Copy to Clipboard">Copy</button>
</p>

The installation steps will output their progress as they run. If everything goes well, at the end you will see a message with the final instructions to successfully complete the upgrade process:

```console
================================================
Openvidu successfully upgraded to version 2.22.0
================================================

1. A new file 'docker-compose.yml' has been created with the new OpenVidu 2.22.0 services

2. This new version 2.22.0 does not need any .env file. Everything is configured from OpenVidu Pro

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


#### 2) Upgrading Master Node

After all of your media nodes are updated, you just need to connect to the Master Node instance through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/openvidu`

```bash
sudo -s
cd /opt/openvidu # Recommended and default installation path
```

Then you can run the upgrade script with this command:

<p style="text-align: start">
<code id="code-20"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_pro_2.22.0.sh | bash -s upgrade</strong></code>
<button id="btn-copy-20" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
                              title="Copy to Clipboard">Copy</button>
</p>

The installation steps will output their progress as they run. If everything goes well, at the end you will see a message with the final instructions to successfully complete the upgrade process:

```console
================================================
Openvidu successfully upgraded to version 2.22.0
================================================
1. A new file 'docker-compose.yml' has been created with the new OpenVidu 2.22.0 services

2. The previous file '.env' remains intact, but a new file '.env-2.22.0' has been created.
Transfer any configuration you wish to keep in the upgraded version from '.env' to '.env-2.22.0'.
When you are OK with it, rename and leave as the only '.env' file of the folder the new '.env-2.22.0'.

3. If you were using Openvidu Call application, it has been automatically updated in file 'docker-compose.override.yml'.
However, if you were using your own application, a file called 'docker-compose.override.yml-2.22.0'
has been created with the latest version of Openvidu Call. If you don't plan to use it you can delete it.

4. Start new version of Openvidu
$ ./openvidu start

If you want to rollback, all the files from the previous installation have been copied to folder '.old-2.21.0'
```

Make sure that you have all of your needed properties at your .env file and start OpenVidu with:

```
./openvidu start
```

<br>

##### Additional steps (Optional)

From version 2.22.0 it is now possible to deploy Coturn in Media nodes. To do that, you just need to open inbound port 443 TCP/UDP in addition to the ports previously opened in your media node and configure `OPENVIDU_PRO_COTURN_IN_MEDIA_NODES=true`. Your media nodes needs to have a reachable Public IP for this to work.

<div></div>

> **Check out the [notes when upgrading Master Node](#notes-when-upgrading-master-node)**

## Migrating from 2.20.0 to 2.21.0

Depending of the type of deployment you have (_AWS_ or _On Premises_), you will need to follow one of the following instructions:

- **[Migrating from 2.20.0 to 2.21.0 (AWS Cloudformation)](#migrating-from-2200-to-2210-aws-cloudformation)**
- **[Migrating from 2.20.0 to 2.21.0 (On premises)](#migrating-from-2200-to-2210-on-premises)**

### Migrating from 2.20.0 to 2.21.0 (AWS Cloudformation)

If you have deployed using Cloudformation **we strongly recommend updating by deploying a new [OpenVidu Cloudformation template of 2.21.0](https://docs.openvidu.io/en/2.21.0/deployment/pro/aws/){target="_blank"}**.

By deploying a new Cloudformation for each version you update, you can benefit of updated AMIs in your deployment and, you can ensure that the upgrading process is not degraded by infrastructure changes that may be applied to the Cloudformation definition.

To do it, you just need to:

- Deploy the OpenVidu Cloudformation template of the version you want.
- If you have recordings stored in the master node, move recordings at`/opt/openvidu/recordings` to the new deployment.
- If you have your app deployed next to OpenVidu, move your app to your new deployment.
- Modify the file at `/opt/openvidu/.env` to have your previous configuration values. (Ignore parameters which start with `AWS_`)

However, if you don't want to deploy a new Cloudformation, you can follow the instruction from [Migrating from 2.20.0 to 2.21.0 (On Premises)](#migrating-from-2200-to-2210-on-premises), but you should know that the upgrading process may have some not contemplated issues if something in the Cloudformation template has changed between versions.

### Migrating from 2.20.0 to 2.21.0 (On Premises)

#### 1) Upgrading Media Node

> Take into account that, if you have deployed using Cloudformation, you don't need to update media nodes. Just terminate all media nodes from the AWS EC2 Panel and Upgrade only the master node.
> After upgrading your master node, new media nodes will be created automatically or using [Inspector and Rest API](openvidu-pro/scalability/#change-the-number-of-media-nodes-on-the-fly){target="_blank"}.

At first, you need to update all of your media nodes. Connect to each of your Media Nodes through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/kms`

```bash
sudo -s
cd /opt/kms # Recommended and default installation path
```

Then you can run the upgrade script with this command:

<p style="text-align: start">
<code id="code-21"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_media_node_2.21.0.sh | bash -s upgrade</strong></code>
<button id="btn-copy-21" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
                              title="Copy to Clipboard">Copy</button>
</p>

The installation steps will output their progress as they run. If everything goes well, at the end you will see a message with the final instructions to successfully complete the upgrade process:

```console
================================================
Openvidu successfully upgraded to version 2.21.0
================================================

1. A new file 'docker-compose.yml' has been created with the new OpenVidu 2.21.0 services

2. This new version 2.21.0 does not need any .env file. Everything is configured from OpenVidu Pro

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


#### 2) Upgrading Master Node

After all of your media nodes are updated, you just need to connect to the Master Node instance through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/openvidu`

```bash
sudo -s
cd /opt/openvidu # Recommended and default installation path
```

Then you can run the upgrade script with this command:

<p style="text-align: start">
<code id="code-22"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_pro_2.21.0.sh | bash -s upgrade</strong></code>
<button id="btn-copy-22" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
                              title="Copy to Clipboard">Copy</button>
</p>

The installation steps will output their progress as they run. If everything goes well, at the end you will see a message with the final instructions to successfully complete the upgrade process:

```console
================================================
Openvidu successfully upgraded to version 2.21.0
================================================
1. A new file 'docker-compose.yml' has been created with the new OpenVidu 2.21.0 services

2. The previous file '.env' remains intact, but a new file '.env-2.21.0' has been created.
Transfer any configuration you wish to keep in the upgraded version from '.env' to '.env-2.21.0'.
When you are OK with it, rename and leave as the only '.env' file of the folder the new '.env-2.21.0'.

3. If you were using Openvidu Call application, it has been automatically updated in file 'docker-compose.override.yml'.
However, if you were using your own application, a file called 'docker-compose.override.yml-2.21.0'
has been created with the latest version of Openvidu Call. If you don't plan to use it you can delete it.

4. Start new version of Openvidu
$ ./openvidu start

If you want to rollback, all the files from the previous installation have been copied to folder '.old-2.20.0'
```

Make sure that you have all of your needed properties at your .env file and start OpenVidu with:

```
./openvidu start
```

<div></div>

> **Check out the [notes when upgrading Master Node](#notes-when-upgrading-master-node)**

---

## Migrating from 2.19.0 to 2.20.0

Depending of the type of deployment you have (_AWS_ or _On Premises_), you will need to follow one of the following instructions:

- **[Migrating from 2.19.0 to 2.20.0 (AWS Cloudformation)](#migrating-from-2190-to-2200-aws-cloudformation)**
- **[Migrating from 2.19.0 to 2.20.0 (On premises)](#migrating-from-2190-to-2200-on-premises)**

### Migrating from 2.19.0 to 2.20.0 (AWS Cloudformation)

If you have deployed using Cloudformation **we strongly recommend updating by deploying a new [OpenVidu Cloudformation template of 2.20.0](https://docs.openvidu.io/en/2.20.0/deployment/pro/aws/){target="_blank"}**.

By deploying a new Cloudformation for each version you update, you can benefit of updated AMIs in your deployment and, you can ensure that the upgrading process is not degraded by infrastructure changes that may be applied to the Cloudformation definition.

To do it, you just need to:

- Deploy the OpenVidu Cloudformation template of the version you want.
- If you have recordings stored in the master node, move recordings at`/opt/openvidu/recordings` to the new deployment.
- If you have your app deployed next to OpenVidu, move your app to your new deployment.
- Modify the file at `/opt/openvidu/.env` to have your previous configuration values. (Ignore parameters which start with `AWS_`)

However, if you don't want to deploy a new Cloudformation, you can follow the instruction from [Migrating from 2.19.0 to 2.20.0 (On Premises)](#migrating-from-2190-to-2200-on-premises), but you should know that the upgrading process may have some not contemplated issues if something in the Cloudformation template has changed between versions.

### Migrating from 2.19.0 to 2.20.0 (On premises)

#### 1) Upgrading Media Node

> Take into account that, if you have deployed using Cloudformation, you don't need to update media nodes. Just terminate all media nodes from the AWS EC2 Panel and Upgrade only the master node.
> After upgrading your master node, new media nodes will be created automatically or using [Inspector and Rest API](openvidu-pro/scalability/#change-the-number-of-media-nodes-on-the-fly){target="_blank"}.

At first, you need to update all of your media nodes. Connect to each of your Media Nodes through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/kms`

```bash
sudo -s
cd /opt/kms # Recommended and default installation path
```

Then you can run the upgrade script with this command:

<p style="text-align: start">
<code id="code-23"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_media_node_2.20.0.sh | bash -s upgrade</strong></code>
<button id="btn-copy-23" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
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

#### 2) Upgrading Master Node

After all of your media nodes are updated, you just need to connect to the Master Node instance through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/openvidu`

```bash
sudo -s
cd /opt/openvidu # Recommended and default installation path
```

Then you can run the upgrade script with this command:

<p style="text-align: start">
<code id="code-24"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_pro_2.20.0.sh | bash -s upgrade</strong></code>
<button id="btn-copy-24" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
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

---
## Migrating from 2.18.0 to 2.19.0

Depending of the type of deployment you have (_AWS_ or _On Premises_), you will need to follow one of the following instructions:

- **[Migrating from 2.18.0 to 2.19.0 (AWS Cloudformation)](#migrating-from-2180-to-2190-aws-cloudformation)**
- **[Migrating from 2.18.0 to 2.19.0 (On premises)](#migrating-from-2180-to-2190-on-premises)**

### Migrating from 2.18.0 to 2.19.0 (AWS Cloudformation)

If you have deployed using Cloudformation **we strongly recommend to update by deploying a new [OpenVidu Cloudformation template of 2.19.0](https://docs.openvidu.io/en/2.19.0/deployment/pro-enterprise/aws/){target="_blank"}**.

By deploying a new Cloudformation for each version you update, you can benefit of updated AMIs in your deployment and, you can ensure that the upgrading process is not degraded by infrastructure changes that may be applied to the Cloudformation definition.

To do it, you just need to:

- Deploy the OpenVidu Cloudformation template of the version you want.
- If you have recordings stored in the master node, move recordings at`/opt/openvidu/recordings` to the new deployment.
- If you have your app deployed next to OpenVidu, move your app to your new deployment.
- Modify the file at `/opt/openvidu/.env` to have your previous configuration values. (Ignore parameters which start with `AWS_`)

However, if you don't want to deploy a new Cloudformation, you can follow the instruction from [Migrating from 2.18.0 to 2.19.0 (On Premises)](#migrating-from-2180-to-2190-on-premises), but you should know that the upgrading process may have some not contemplated issues if something in the Cloudformation template has changed between versions.

### Migrating from 2.18.0 to 2.19.0 (On Premises)

#### 1) Upgrading Media Node

> Take into account that, if you have deployed using Cloudformation, you don't need to update media nodes. Just terminate all media nodes from the AWS EC2 Panel and Upgrade only the master node.
> After upgrading your master node, new media nodes will be created automatically or using [Inspector and Rest API](openvidu-pro/scalability/#change-the-number-of-media-nodes-on-the-fly){target="_blank"}.

At first, you need to update all of your media nodes. Connect to each of your Media Nodes through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/kms`

```bash
sudo -s
cd /opt/kms # Recommended and default installation path
```

Then you can run the upgrade script with this command:

<p style="text-align: start">
<code id="code-25"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_media_node_2.19.0.sh | bash -s upgrade</strong></code>
<button id="btn-copy-25" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
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

#### 2) Upgrading Master Node

After all of your media nodes are updated, you just need to connect to the Master Node instance through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/openvidu`

```bash
sudo -s
cd /opt/openvidu # Recommended and default installation path
```

Then you can run the upgrade script with this command:

<p style="text-align: start">
<code id="code-26"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_pro_2.19.0.sh | bash -s upgrade</strong></code>
<button id="btn-copy-26" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
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

---

## Migrating from 2.17.0 to 2.18.0

Depending of the type of deployment you have (_AWS_ or _On Premises_), you will need to follow one of the following instructions:

- **[Migrating from 2.17.0 to 2.18.0 (AWS Cloudformation)](#migrating-from-2170-to-2180-aws-cloudformation)**
- **[Migrating from 2.17.0 to 2.18.0 (On premises)](#migrating-from-2170-to-2180-on-premises)**

### Migrating from 2.17.0 to 2.18.0 (AWS Cloudformation)

If you have deployed using Cloudformation **we strongly recommend updating by deploying a new [OpenVidu Cloudformation template of 2.18.0](https://docs.openvidu.io/en/2.18.0/openvidu-pro/deployment/aws/){target="_blank"}**.

By deploying a new Cloudformation for each version you update, you can benefit of updated AMIs in your deployment and, you can ensure that the upgrading process is not degraded by infrastructure changes that may be applied to the Cloudformation definition.

To do it, you just need to:

- Deploy the OpenVidu Cloudformation template of the version you want.
- If you have recordings stored in the master node, move recordings at`/opt/openvidu/recordings` to the new deployment.
- If you have your app deployed next to OpenVidu, move your app to your new deployment.
- Modify the file at `/opt/openvidu/.env` to have your previous configuration values. (Ignore parameters which start with `AWS_`)

However, if you don't want to deploy a new Cloudformation, you can follow the instruction from [Migrating from 2.17.0 to 2.18.0 (On Premises)](#migrating-from-2170-to-2180-on-premises), but you should know that the upgrading process may have some not contemplated issues if something in the Cloudformation template has changed between versions.

### Migrating from 2.17.0 to 2.18.0 (On Premises)

#### 1) Upgrading Media Node

> Take into account that, if you have deployed using Cloudformation, you don't need to update media nodes. Just terminate all media nodes from the AWS EC2 Panel and Upgrade only the master node.
> After upgrading your master node, new media nodes will be created automatically or using [Inspector and Rest API](openvidu-pro/scalability/#change-the-number-of-media-nodes-on-the-fly){target="_blank"}.

At first, you need to update all of your media nodes. Connect to each of your Media Nodes through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/kms`

```bash
sudo -s
cd /opt/kms # Recommended and default installation path
```

Then you can run the upgrade script with this command:

<p style="text-align: start">
<code id="code-27"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_media_node_2.18.0.sh | bash -s upgrade</strong></code>
<button id="btn-copy-27" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
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

#### 2) Upgrading Master Node

After all of your media nodes are updated, you just need to connect to the Master Node instance through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/openvidu`

```bash
sudo -s
cd /opt/openvidu # Recommended and default installation path
```

Then you can run the upgrade script with this command:

<p style="text-align: start">
<code id="code-28"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_pro_2.18.0.sh | bash -s upgrade</strong></code>
<button id="btn-copy-28" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
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

---

## Migrating from 2.16.0 to 2.17.0

Depending of the type of deployment you have (_AWS_ or _On Premises_), you will need to follow one of the following instructions:

- **[Migrating from 2.16.0 to 2.17.0 (AWS Cloudformation)](#migrating-from-2160-to-2170-aws-cloudformation)**
- **[Migrating from 2.16.0 to 2.17.0 (On premises)](#migrating-from-2160-to-2170-on-premises)**


### Migrating from 2.16.0 to 2.17.0 (AWS Cloudformation)

If you have deployed using Cloudformation **we strongly recommend updating by deploying a new [OpenVidu Cloudformation template of 2.17.0](https://docs.openvidu.io/en/2.17.0/openvidu-pro/deployment/aws/){target="_blank"}**.

By deploying a new Cloudformation for each version you update, you can benefit of updated AMIs in your deployment and, you can ensure that the upgrading process is not degraded by infrastructure changes that may be applied to the Cloudformation definition.

To do it, you just need to:

- Deploy the OpenVidu Cloudformation template of the version you want.
- If you have recordings stored in the master node, move recordings at`/opt/openvidu/recordings` to the new deployment.
- If you have your app deployed next to OpenVidu, move your app to your new deployment.
- Modify the file at `/opt/openvidu/.env` to have your previous configuration values. (Ignore parameters which start with `AWS_`)

However, if you don't want to deploy a new Cloudformation, you can follow the instruction from [Migrating from 2.16.0 to 2.17.0 (On Premises)](#migrating-from-2160-to-2170-on-premises), but you should know that the upgrading process may have some not contemplated issues if something in the Cloudformation template has changed between versions.

### Migrating from 2.16.0 to 2.17.0 (On Premises)

#### 1) Upgrading Media Node

> Take into account that, if you have deployed using Cloudformation, you don't need to update media nodes. Just terminate all media nodes from the AWS EC2 Panel and Upgrade only the master node.
> After upgrading your master node, new media nodes will be created automatically or using [Inspector and Rest API](openvidu-pro/scalability/#change-the-number-of-media-nodes-on-the-fly){target="_blank"}.

At first, you need to update all of your media nodes. Connect to each of your Media Nodes through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/kms`

```bash
sudo -s
cd /opt/kms # Recommended and default installation path
```

Then you can run the upgrade script with this command:

<p style="text-align: start">
<code id="code-29"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_media_node_2.17.0.sh | bash -s upgrade</strong></code>
<button id="btn-copy-29" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
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

#### 2) Upgrading Master Node

After all of your media nodes are updated, you just need to connect to the Master Node instance through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/openvidu`

```bash
sudo -s
cd /opt/openvidu # Recommended and default installation path
```

Then you can run the upgrade script with this command:

<p style="text-align: start">
<code id="code-30"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_pro_2.17.0.sh | bash -s upgrade</strong></code>
<button id="btn-copy-30" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
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

---

## Migrating from 2.15.1 to 2.16.0

Depending of the type of deployment you have (_AWS_ or _On Premises_), you will need to follow one of the following instructions:

- **[Migrating from 2.15.1 to 2.16.0 (AWS Cloudformation)](#migrating-from-2151-to-2160-aws-cloudformation)**
- **[Migrating from 2.15.1 to 2.16.0 (On premises)](#migrating-from-2151-to-2160-on-premises)**

### Migrating from 2.15.1 to 2.16.0 (AWS Cloudformation)

If you have deployed using Cloudformation **we strongly recommend updating by deploying a new [OpenVidu Cloudformation template of 2.16.0](https://docs.openvidu.io/en/2.16.0/openvidu-pro/deployment/aws/){target="_blank"}**.

By deploying a new Cloudformation for each version you update, you can benefit of updated AMIs in your deployment and, you can ensure that the upgrading process is not degraded by infrastructure changes that may be applied to the Cloudformation definition.

To do it, you just need to:

- Deploy the OpenVidu Cloudformation template of the version you want.
- If you have recordings stored in the master node, move recordings at`/opt/openvidu/recordings` to the new deployment.
- If you have your app deployed next to OpenVidu, move your app to your new deployment.
- Modify the file at `/opt/openvidu/.env` to have your previous configuration values. (Ignore parameters which start with `AWS_`)

However, if you don't want to deploy a new Cloudformation, you can follow the instruction from [Migrating from 2.15.1 to 2.16.0 (On Premises)](#migrating-from-2151-to-2160-on-premises), but you should know that the upgrading process may have some not contemplated issues if something in the Cloudformation template has changed between versions.

### Migrating from 2.15.1 to 2.16.0 (On Premises)

#### 1) Upgrading Media Node

> Take into account that, if you have deployed using Cloudformation, you don't need to update media nodes. Just terminate all media nodes from the AWS EC2 Panel and Upgrade only the master node.
> After upgrading your master node, new media nodes will be created automatically or using [Inspector and Rest API](openvidu-pro/scalability/#change-the-number-of-media-nodes-on-the-fly){target="_blank"}.

At first, you need to update all of your media nodes. Connect to each of your Media Nodes through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/kms`

```bash
sudo -s
cd /opt/kms # Recommended and default installation path
```

Then you can run the upgrade script with this command:

<p style="text-align: start">
<code id="code-31"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_media_node_2.16.0.sh | bash -s upgrade</strong></code>
<button id="btn-copy-31" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
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

#### 2) Upgrading Master Node

After all of your media nodes are updated, you just need to connect to the Master Node instance through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/openvidu`

```bash
sudo -s
cd /opt/openvidu # Recommended and default installation path
```

Then you can run the upgrade script with this command:

<p style="text-align: start">
<code id="code-32"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_pro_2.16.0.sh | bash -s upgrade</strong></code>
<button id="btn-copy-32" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
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

---

## Migrating from 2.14.0 to 2.15.1

Depending of the type of deployment you have (_AWS_ or _On Premises_), you will need to follow one of the following instructions:

- **[Migrating from 2.14.0 to 2.15.1 (AWS Cloudformation)](#migrating-from-2140-to-2151-aws-cloudformation)**
- **[Migrating from 2.14.0 to 2.15.1 (On premises)](#migrating-from-2140-to-2151-on-premises)**

### Migrating from 2.14.0 to 2.15.1 (AWS Cloudformation)

If you have deployed using Cloudformation **we strongly recommend updating by deploying a new [OpenVidu Cloudformation template of 2.15.1](https://docs.openvidu.io/en/2.15.0/openvidu-pro/deployment/aws/){target="_blank"}**.

By deploying a new Cloudformation for each version you update, you can benefit of updated AMIs in your deployment and, you can ensure that the upgrading process is not degraded by infrastructure changes that may be applied to the Cloudformation definition.

To do it, you just need to:

- Deploy the OpenVidu Cloudformation template of the version you want.
- If you have recordings stored in the master node, move recordings at`/opt/openvidu/recordings` to the new deployment.
- If you have your app deployed next to OpenVidu, move your app to your new deployment.
- Modify the file at `/opt/openvidu/.env` to have your previous configuration values. (Ignore parameters which start with `AWS_`)

However, if you don't want to deploy a new Cloudformation, you can follow the instruction from [Migrating from 2.14.0 to 2.15.1 (On Premises)](#migrating-from-2140-to-2151-on-premises), but you should know that the upgrading process may have some not contemplated issues if something in the Cloudformation template has changed between versions.

### Migrating from 2.14.0 to 2.15.1 (On Premises)

#### 1) Upgrading Media Node

> Take into account that, if you have deployed using Cloudformation, you don't need to update media nodes. Just terminate all media nodes from the AWS EC2 Panel and Upgrade only the master node.
> After upgrading your master node, new media nodes will be created automatically or using [Inspector and Rest API](openvidu-pro/scalability/#change-the-number-of-media-nodes-on-the-fly){target="_blank"}.

Open port **3000 TCP** so **OpenVidu Server Pro** can use it. This port is necessary to provision **Media Node** by **OpenVidu Server Pro**.

> **WARNING**: It is very important to not open publicly ports **3000 TCP**. Only open this port to be used by OpenVidu Server Pro.

Secondly, connect to each of your Media Nodes through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/kms`

```bash
sudo -s
cd /opt/kms # Recommended and default installation path
```

Then you can run the upgrade script with this command:

<p style="text-align: start">
<code id="code-33"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_media_node_2.15.1.sh | bash -s upgrade</strong></code>
<button id="btn-copy-33" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
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

#### 2) Upgrading Master Node

After all of your media nodes are updated, open ports **5044 TCP** and **9200 TCP** in a way that **Media Nodes** can use them. These ports are necessary for OpenVidu Server Pro and ElasticSearch to receive metrics from Media Nodes and receive logs.

> **WARNING**: It is very important to not open publicly ports **5044 TCP** and **9200 TCP**. Only open these ports to be used by Media Nodes.

Secondly you just need to connect to the Master Node instance through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/openvidu`

```bash
sudo -s
cd /opt/openvidu # Recommended and default installation path
```

Then you can run the upgrade script with this command:

<p style="text-align: start">
<code id="code-34"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_pro_2.15.1.sh | bash -s upgrade</strong></code>
<button id="btn-copy-34" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
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

---

## Migrating from 2.13.0 to 2.14.0

Depending of the type of deployment you have (_AWS_ or _On Premises_), you will need to follow one of the following instructions:

- **[Migrating from 2.13.0 to 2.14.0 (AWS Cloudformation)](#migrating-from-2130-to-2140-aws-cloudformation)**
- **[Migrating from 2.13.0 to 2.14.0 (On premises)](#migrating-from-2130-to-2140-on-premises)**

### Migrating from 2.13.0 to 2.14.0 (AWS Cloudformation)

If you have deployed using Cloudformation **we strongly recommend updating by deploying a new [OpenVidu Cloudformation template of 2.14.0](https://docs.openvidu.io/en/2.14.0/openvidu-pro/deployment/aws/){target="_blank"}**.

By deploying a new Cloudformation for each version you update, you can benefit of updated AMIs in your deployment and, you can ensure that the upgrading process is not degraded by infrastructure changes that may be applied to the Cloudformation definition.

To do it, you just need to:

- Deploy the OpenVidu Cloudformation template of the version you want.
- If you have recordings stored in the master node, move recordings at`/opt/openvidu/recordings` to the new deployment.
- If you have your app deployed next to OpenVidu, move your app to your new deployment.
- Modify the file at `/opt/openvidu/.env` to have your previous configuration values. (Ignore parameters which start with `AWS_`)

However, if you don't want to deploy a new Cloudformation, you can follow the instruction from [Migrating from 2.13.0 to 2.14.0 (On Premises)](#migrating-from-2130-to-2140-on-premises), but you should know that the upgrading process may have some not contemplated issues if something in the Cloudformation template has changed between versions.

### Migrating from 2.13.0 to 2.14.0 (On Premises)

#### 1) Upgrading Media Node

> Take into account that, if you have deployed using Cloudformation, you don't need to update media nodes. Just terminate all media nodes from the AWS EC2 Panel and Upgrade only the master node.
> After upgrading your master node, new media nodes will be created automatically or using [Inspector and Rest API](openvidu-pro/scalability/#change-the-number-of-media-nodes-on-the-fly){target="_blank"}.

At first, you need to update all of your media nodes. Connect to each of your Media Nodes through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/kms`

```bash
sudo -s
cd /opt/kms # Recommended and default installation path
```

Then you can run the upgrade script with this command:

<p style="text-align: start">
<code id="code-35"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_media_node_2.14.0.sh | bash -s upgrade</strong></code>
<button id="btn-copy-35" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
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

#### 2) Upgrading Master Node

After all of your media nodes are updated, you just need to connect to the Master Node instance through SSH. Log with `root` permissions and go to OpenVidu installation path, by default `/opt/openvidu`

```bash
sudo -s
cd /opt/openvidu # Recommended and default installation path
```

Then you can run the upgrade script with this command:

<p style="text-align: start">
<code id="code-36"><strong>curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_pro_2.14.0.sh | bash -s upgrade</strong></code>
<button id="btn-copy-36" class="btn-xs btn-primary btn-copy-code hidden-xs" data-toggle="tooltip" data-placement="button"
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

---

## Migrating from ≤2.12.0 to 2.13.0

Unfortunately upgrading OpenVidu Pro to <strong>2.13.0</strong> from any past version will require you to completely wipe out your past version, as the installation procedure has completely changed to a Docker deployment. Good news is that from this point in time, upgrading or downgrading versions will be extremely quick and easy!

The only thing to take into account is the data you may want to keep when upgrading to 2.13.0: recordings and Elasticsearch data.

### Backup recordings

Only if you have used the [recording](advanced-features/recording/) feature you may want to keep your old recorded files available in your new deployment. This is as straightforward as copying the entire recording folder before wiping out your old server (≤2.12.0 config property `openvidu.recording.path`, by default `/opt/openvidu/recordings`). After successfully installing 2.13.0, simply paste this same folder at the recording path of your new installation. All of your recordings will be immediately available in the new version.

### Backup Elasticsearch data

If you want to keep your [Elasticsearch data](openvidu-pro/monitoring-elastic-stack/), then you have to copy the Elasticsearch database from your old deployment to your new 2.13.0 deployment. Of course, you have to do so **before wiping out your old OpenVidu Server Pro instance**. The following steps indicate how to automate all of this process with some simple commands:

#### 1) Copy existing Elasticsearch data from your old ≤2.12.0 Master Node to your new 2.13.0 Master Node

First compress the Elasticsearch database in your old Master Node and then download the file. You can do it like this (a standard Ubuntu installation of Elasticsearch is presumed at `/var/lib/elasticsearch`. This path is the default one for ≤2.12.0 OpenVidu deployments on AWS and is also the default path where Elasticsearch stores its data in Linux systems).

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

Restart all services. You will have your Elasticsearch data available in your brand new OpenVidu Pro 2.13.0!

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
- You must perform the upgrading steps in all of your Media Nodes. Be sure to upgrade the Master Node and all the Media Nodes to the same version number.

<br><br>

<script src="js/copy-btn.js"></script>

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
