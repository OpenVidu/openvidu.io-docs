<h2 id="section-title">Upgrading OpenVidu</h2>
<hr>

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
    <ul style="margin-bottom: 0">
        <li style="color: #1c1c1c">These instructions are only compatible for <strong>OpenVidu >= 2.6.0</strong></li>
        <li style="color: #1c1c1c">Upgrading or downgrading OpenVidu by following these steps may cause your application to fail if there are any <strong>API breaking changes</strong> between the old and new versions of OpenVidu. Carefully read the <a href="/docs/releases/" target="_blank">release notes</a> of the related versions before upgrading OpenVidu, be sure to try your application with the new OpenVidu version in your development environment before upgrading and always do so at your own risk</li>
    </ul>
</div>
</div>

# For AWS deployments

We provide an automated script to easily update the OpenVidu version of your AWS deployment.

#### 1) Connect through *ssh* to your AWS instance

```console
ssh -i /path/to/your/private/key/file.pem ubuntu@12.34.56.78
```

#### 2) Download the script from GitHub

```console
wget https://raw.githubusercontent.com/OpenVidu/adm-scripts/master/scripts/openvidu_update_stack.sh
sudo chmod 777 openvidu_update_stack.sh
```

#### 3) Run the script, indicating the OpenVidu version you want to upgrade to

Better do this as the *root* user. **WARNING**: running the script will stop OpenVidu Server. After upgrading all the services, it will be automatically restarted.

```console
sudo -s
export OV_NEW_VERSION=2.8.0
./openvidu_update_stack.sh
```

#### 4) Update _openvidu-browser_ library version in your clients

Comply version compatibility according to **[Releases](/releases){:target="_blank"}** page.

<br>

---

# For Ubuntu deployments

You must perform the following general steps, that may vary depending on how you have configured your services:

#### 1) Stop OpenVidu Server and Kurento Media Server services

First one is a Java process that may be killed with a simple `kill -9 PID_NUMBER` command, and second one is usually stopped with `sudo service kurento-media-server stop`

#### 2) Upgrade kurento-media-server package and replace openvidu-server JAR file for the new version

It is mandatory to comply version compatibility between OpenVidu and Kurento Media Server. Check it out in **[Releases](/releases){:target="_blank"}** page.
You should be able to reinstall a new version of KMS while maintaining all the configuration files with these commands:

**For Ubuntu Xenial 16.04**  *(do not run below command if you run this one)*

```bash
export DISTRO=xenial
```

**For Ubuntu Bionic 18.04**  *(do not run above command if you run this one)*

```bash
export DISTRO=bionic
```

Now you can reinstall Kurento Media Server indicating the proper version number in the first command

```bash
# Change version number in url http://ubuntu.openvidu.io/6.9.0 to the proper one depending on OpenVidu version
sudo echo "deb [arch=amd64] http://ubuntu.openvidu.io/6.9.0 $DISTRO kms6" | sudo tee /etc/apt/sources.list.d/kurento.list
sudo apt-get update
sudo apt-get remove --auto-remove --yes kurento-media-server
sudo apt-get install --yes -o Dpkg::Options::="--force-confold" kurento-media-server
```

You can download any openvidu-server JAR file with this command:

```bash
# Change {VERSION} for the desired one. e.g. /v2.8.0/openvidu-server-2.8.0.jar
wget https://github.com/OpenVidu/openvidu/releases/download/v{VERSION}/openvidu-server-{VERSION}.jar
```

#### 3) Restart OpenVidu Server and Kurento Media Server services

Run Kurento Media Server with `sudo service kurento-media-server start` and launch openvidu-server JAR file as stated in [Deploying OpenVidu in Ubuntu](/deployment/deploying-ubuntu/#8-init-openvidu-server-jar-executable){:target="_blank"} section.

#### 4) Update _openvidu-browser_ library version in your clients

Comply version compatibility according to **[Releases](/releases){:target="_blank"}** page.

<br><br>