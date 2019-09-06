<h2 id="section-title">Deploying OpenVidu Pro</h2>

<br>

- **[Deploying OpenVidu Pro with Marketplace](#deploying-openvidu-with-aws-marketplace)**
- **[Deploying OpenVidu Pro on premise](#deploying-openvidu-pro-on-premise)**

<br>

---

## Deploying OpenVidu With AWS Marketplace

OpenVidu Pro is available through **AWS Marketplace** (you will need an [Amazon Web Services account](https://portal.aws.amazon.com/billing/signup?redirect_url=https%3A%2F%2Faws.amazon.com%2Fregistration-confirmation#/start){:target="_blank"})

### 1) Steps towards configuration

<p style="text-align: center; margin-top: 30px">
    <a href="https://aws.amazon.com/marketplace/pp/prodview-mngn2m3lxhtce?qid=1567758504396&sr=0-2&ref_=srh_res_product_title" class="btn btn-xs btn-primary" style="font-size: 15px; display: table; margin: auto" title="OpenVidu Pro" target="_blank"><span style="display: table-cell; vertical-align:middle">Go to </span><i style="margin-left: 10px; margin-right: 10px; font-size: 45px; vertical-align: middle; font-weight: 100" class="fab fa-aws"></i><span style="display: table-cell; vertical-align:middle"> marketplace</span></a>
</p>

<div class="row wow fadeInUp">
    <div class="pro-gallery-steps" style="margin: 25px 35px 25px 35px">
        <a data-fancybox="gallery-pro5" href="/img/docs/openvidu-pro/marketplace/market1.png"><img class="img-responsive img-pro" src="/img/docs/openvidu-pro/marketplace/market1.png"/></a>
        <a data-fancybox="gallery-pro5" href="/img/docs/openvidu-pro/marketplace/market6.png"><img class="img-responsive img-pro" src="/img/docs/openvidu-pro/marketplace/market6.png"/></a>
        <a data-fancybox="gallery-pro5" href="/img/docs/openvidu-pro/marketplace/market2.png"><img class="img-responsive img-pro" src="/img/docs/openvidu-pro/marketplace/market2.png"/></a>
        <a data-fancybox="gallery-pro5" href="/img/docs/openvidu-pro/marketplace/market3.png"><img class="img-responsive img-pro" src="/img/docs/openvidu-pro/marketplace/market3.png"/></a>
        <a data-fancybox="gallery-pro5" href="/img/docs/openvidu-pro/marketplace/market4.png"><img class="img-responsive img-pro" src="/img/docs/openvidu-pro/marketplace/market4.png"/></a>
        <a data-fancybox="gallery-pro5" href="/img/docs/openvidu-pro/marketplace/market5.png"><img class="img-responsive img-pro" src="/img/docs/openvidu-pro/marketplace/market5.png"/></a>
    </div>
</div>

<br>

---

### 2) Configure your OpenVidu Server Pro

Fill each section of the form with the appropriate values as stated below.

#### Stack name
The name of your deployment

#### SSL Certificate Configuration
This is the kind of certificate you will be using in your deployment. Three different options are offered:

- **selfsigned**: use a selfsigned certificate. This options is meant for testing and developing environments. Leave the rest of the fields with their default value

<div class="row">
    <div style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro6" href="/img/docs/openvidu-pro/marketplace/marketSelfsigned.png"><img class="img-responsive img-pro img-pro-small" src="/img/docs/openvidu-pro/marketplace/marketSelfsigned.png"/></a>
    </div>
</div>

- **letsencrypt**: use an automatic certificate by Let's Encrypt. This way you don't have to worry about providing your own certificate. You simply have to enter an email account where Let's Encrypt will send its messages, your fully qualified domain name and one AWS Elastic IP for the same region you selected before ([allocate one if you don't have it](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html#using-instance-addressing-eips-allocating){:target="_blank"}). Of course, **you will need to register this Elastic IP in your DNS hosting service and associate it with your fully qualified domain name**. Only after this association between the Elastic IP and your domain name is effective your deployment with Let's Encrypt will work fine.

<div class="row">
    <div style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro7" href="/img/docs/openvidu-pro/marketplace/marketLetsencrypt.png"><img class="img-responsive img-pro img-pro-small" src="/img/docs/openvidu-pro/marketplace/marketLetsencrypt.png"/></a>
    </div>
</div>

- **owncert**: use your own certificate. You must provide one AWS Elastic IP for the same region you selected before ([allocate one if you don't have it](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html#using-instance-addressing-eips-allocating){:target="_blank"}), and your public certificate and private key, both accessible through uris (an Amazon S3 bucket is the best way to do it). Leave the default values for *Email* and *Fully qualified domain name* fields.

<div class="row">
    <div style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro8" href="/img/docs/openvidu-pro/marketplace/marketOwncert.png"><img class="img-responsive img-pro img-pro-small" src="/img/docs/openvidu-pro/marketplace/marketOwncert.png"/></a>
    </div>
</div>

#### OpenVidu Configuration

These fields respectively configure different [system properties](https://openvidu.io/docs/reference-docs/openvidu-server-params/){:target="_blank"} of OpenVidu Server.

Besides, you'll find two fields for OpenVidu Pro credentials (_OpenViduProUsername_ and _OpenViduProPassword_). We provide those credentials for you and with them you'll be able to access the OpenVidu Pro artifact (contact us through <a href="/commercial" target="_blank"><strong>Commercial page</strong></a> to get them).

<div class="row">
    <div style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro9" href="/img/docs/openvidu-pro/marketplace/marketOpenviduconf.png"><img class="img-responsive img-pro img-pro-small" src="/img/docs/openvidu-pro/marketplace/marketOpenviduconf.png"/></a>
    </div>
</div>

> If you want to enable [OpenVidu Webhook module](/reference-docs/openvidu-server-webhook/){:target="_blank"} by setting **OpenViduWebhook** field to true, your endpoint defined in field **OpenViduWebhookEndpoint** will probably be secured in some way. The syntax for the webhook header (field **OpenViduWebhookHeaders**) should be used to provide the security credentials. For example:
>
> `Authorization: Basic T1BFTlZJRFVBUFA6TVlfU0VDUkVU`
>
> for a basic auth token.

#### Openvidu Security Group

These fields allow you to limit the IPs that will be able to connect to OpenVidu Server Pro.

> **WARNING**: be careful when limiting these IP ranges
>
> - **Port 4443 access Range**: OpenVidu Server Pro REST API and client access point. This should be set to `0.0.0.0/0` if you want any client to be able to use your deployment
> - **Port 3478 access Range**: TURN server port. This should be set to `0.0.0.0/0` if you want any client to be able to use your deployment, as you never know which user might need a TURN connection to be able to send and receive media
> - **SSH Port access Range** can be limited as you want, as it provides SSH access to the server with the proper private key through port 22
> - **HTTPS and HTTP (ports 443 and 80) access Range**: HTTPS access range will determine the directions able to connect to Kibana dashboard. If you are using Let's Encrypt SSL configuration, set HTTP access range to `0.0.0.0/0`, as Let's Encrypt will need to access your server through port 80.
> - **UDP Port access Range** and **TCP Port access Range**: limits the clients that will be able to establish TCP and UDP connections to your OpenVidu Server Pro. So again, if you want to provide service to any client these should be set to `0.0.0.0/0`
> - **MinOpenPort** and **MaxOpenPort**: determine what ports will be available to establish the media connections, so the generous default value is a good choice. If you change the values leaving out any of the previously stated ports, the deployment may fail

<div class="row">
    <div style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro10" href="/img/docs/openvidu-pro/marketplace/marketSecurity.png"><img class="img-responsive img-pro img-pro-small" src="/img/docs/openvidu-pro/marketplace/marketSecurity.png"/></a>
    </div>
</div>

#### Kibana Dashboard

Set the user and password for accessing Kibana dashboard.

<div class="row">
    <div style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro11" href="/img/docs/openvidu-pro/marketplace/marketKibana.png"><img class="img-responsive img-pro img-pro-small" src="/img/docs/openvidu-pro/marketplace/marketKibana.png"/></a>
    </div>
</div>

#### Networking info

Because Kurento Media Server cluster runs in an Autoscaling Group this CloudFormation template will create a VPC and a Subnet with all they need to provide internet access to the instances and public IPs. Then all the instances will be connected to this VPC.

<div class="row">
    <div style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro11" href="/img/docs/openvidu-pro/marketplace/marketNetworkingOptions.png"><img class="img-responsive img-pro img-pro-small" src="/img/docs/openvidu-pro/marketplace/marketNetworkingOptions.png"/></a>
    </div>
</div>

#### Clustering Options

How many Kurento Media Servers do you want to deploy? Default to 1. Keep in mind AWS has limits to the amount of instances you can launch in EC2. Also, you will pay for every instance individually.

<div class="row">
    <div style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro11" href="/img/docs/openvidu-pro/marketplace/marketClusteringOptions.png"><img class="img-responsive img-pro img-pro-small" src="/img/docs/openvidu-pro/marketplace/marketClusteringOptions.png"/></a>
    </div>
</div>

#### Other parameters

Choose the size of your instance (see [OpenVidu performance FAQ](/troubleshooting/#9-which-is-the-current-status-of-openvidu-regarding-performance-scalability-and-fault-tolerance){:target="_blank"}) and a Key Pair ([create one if you don't have any](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html#having-ec2-create-your-key-pair){:target="_blank"}).

You can choose different sizes for OpenVidu Server machine and KMS machines.

<div class="row">
    <div style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro12" href="/img/docs/openvidu-pro/marketplace/marketOthers.png"><img class="img-responsive img-pro img-pro-small" src="/img/docs/openvidu-pro/marketplace/marketOthers.png"/></a>
    </div>
</div>

You are ready to go. Click on **Next** 🡆 **Next** and complete the following point to deploy OpenVidu Pro cluster.

#### Roles

Before you can deploy the stack, you have to agree that this template will create Roles which will perform request to AWS API in you behalf from the instances. The Role's policy is only _ec2:DescribeInstances_, is the minimum required permission and it's needed to discover other cluster members. Every instance is tagged and the query to the API will simply filter by this tag.

<div class="row">
    <div style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro11" href="/img/docs/openvidu-pro/marketplace/marketCapabilities.png"><img class="img-responsive img-pro" src="/img/docs/openvidu-pro/marketplace/marketCapabilities.png"/></a>
    </div>
</div>

After clicking the checkbox, you can now finally press **Create stack** button and deploy OpenVidu Pro cluster.

<br>

---

### 3) Connecting to your OpenVidu Server Pro

Now you just have to wait until Stack status is set to `CREATE_COMPLETE`. Then you will have a production-ready setup with all the advanced features provided by OpenVidu Pro.

> If status reaches `CREATE_FAILED`, check out [this FAQ](/troubleshooting/#13-deploying-openvidu-in-aws-is-failing){:target="_blank"}

<br>

To connect to **OpenVidu Inspector** and the **Kibana dashboard**, simply access `Outputs` tab. There you will have both URLs to access both services.

<div class="row">
    <div style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro12" href="/img/docs/openvidu-pro/marketplace/marketOutputs.png"><img class="img-responsive img-pro" src="/img/docs/openvidu-pro/marketplace/marketOutputs.png"/></a>
    </div>
</div>

To consume [OpenVidu REST API](/reference-docs/REST-API/){:target="_blank"}, use URL `https://OPENVIDUPRO_PUBLIC_IP:4443`. For example, in the image above that would be `https://ec2-34-244-193-135.eu-west-1.compute.amazonaws.com:4443`

<br>

> Regarding the compatibility of **openvidu-browser** and **server SDKs** (REST API, openvidu-java-client, openvidu-node-client), use the same version numbers as stated for openvidu-server in [Releases page](/releases/){:target="_blank"}. For example, for OpenVidu Pro 2.10.0, use the artifact versions indicated in [2.10.0 release table](/releases#2100){:target="_blank"}

<br>

---

## Deploying OpenVidu Pro on premise

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
    Before deploying OpenVidu Pro you need to contact us through <a href="/commercial" target="_blank"><strong>Commercial page</strong></a> to get the credentials you will need during the deployment process
</div>
</div>

<p style="font-size: 18px; color: #7a7a7a; margin-top: 30px; padding: 4px;">
OpenVidu Pro is available through <strong>Ansible</strong> for deploying on premise.
</p>

### 1) Prerequisites

#### In your local machine

You need Ansible installed on your laptop or wherever you are running this playbook. You can install Ansible with:

```bash
sudo apt-add-repository -y ppa:ansible/ansible
sudo apt-get update
sudo apt-get install -y ansible
```

Besides you need to install this role for Docker:

```bash
sudo ansible-galaxy install -p /etc/ansible/roles geerlingguy.docker
```

#### In your cluster machines

You must have **at least 2 different instances** with a clean installation of **Ubuntu 16.04**

- One instance for the **OpenVidu Server Pro Node**
- One instance for a **Media Node**

You can actually have as many instances as you want for Media Nodes. The number of Media Nodes determines the size of your cluster: the more Media Nodes, the more video sessions your cluster will be able to handle. Check out [Scalability](/openvidu-pro/scalability/){:target="_blank"} section for further details.

Besides, be sure to meet the following criteria in your cluster instances:

- Have at least a minimum of **2 CPUs and 8GB of RAM**, and a generous network bandwidth
- Have **Python 3** installed (check version with `python3 --version`)

<br>

---

### 2) Network requirements

These ports need to be opened and publicly accessible for each type of instance in your cluster:

#### OpenVidu Server Pro instance

- **4443 TCP** (OpenVidu Server listens on port 4443 by default)
- **3478 TCP** (coturn listens on port 3478 by default)

#### Media instance(s)

- **40000 - 65535 UDP** (WebRTC connections with clients may be established using a random port inside this range)
- **40000 - 65535 TCP** (WebRTC connections with clients may be established using a random port inside this range, if UDP can't be used because client network is blocking it)
- **8888 TCP (must only be accessible for OpenVidu Server Pro instance)** (Kurento Media Server listens on port 8888 by default)


<br>

> **NOTE**: in production environments you will have to configure a **fully qualified domain name** in your **OpenVidu Server Pro instance**. You can register a FQDN for the OpenVidu Server Pro instance using a DNS server, pairing the OpenVidu Server Pro instance public IP with your domain name. This is the only way to later set up a valid certificate in OpenVidu Server Pro instance, so clients don't get a warning when connecting to a video session

<br>

---

### 3) Ansible's inventory

Ansible uses an inventory file to know which instances connect to and how to configure them. Let's clone OpenVidu's Ansible repository to modify this file and prepare the cluster deployment:

```bash
git clone https://github.com/OpenVidu/openvidu-pro-clustering
git checkout v2.11.0
cd openvidu-pro-clustering # This will be our working directory from now on
```

File `./inventory.yaml` defines our cluster instances. By default it is ready to use a single Media Server instance, but you can add as many _kurento-server_ hosts as you want, as you can see in the commented lines.

The IPs in the inventory file should be the addresses which can be reached from the Ansible host. In example, if your Ansible host is on the 192.168.x.x network should be ok to use that address range in your inventory file.

```yaml
---
all:
  hosts:
    openvidu-server:
      ansible_host: OPENVIDU_SERVER_IP
    media-server-1:
      ansible_host: MEDIA_SERVER_1_IP
    # media-server-2:
    #   ansible_host: MEDIA_SERVER_2_IP
    # ...
    # media-server-N:
    #   ansible_host: MEDIA_SERVER_N_IP
  vars:
      ansible_become: true
      ansible_user: USER
      ansible_ssh_private_key_file: /PATH/TO/SSH_public_key
  children:
    media-servers:
      hosts:
        media-server-1:
      #   media-server-2:
      #   ...
      #   media-server-N:
    openvidu:
      hosts:
        openvidu-server:
```

You need to change:

- **Variable `ansible_user`**: the user you use to connect to the instances, i.e. Ubuntu Server Cloud uses `ubuntu`. If you've deployed those instances in OpenStack using Ubuntu Official Image, `ubuntu` will be the user.
- **Variable `ansible_ssh_private_key_file`**: path to the RSA private key you use to connect to your instances.
- **Value `OPENVIDU_SERVER_IP`**: public IP to connect to the OpenVidu Server Pro instance.
- **Value `MEDIA_SERVER_X_IP`**: public IP to connect to the Kurento Media Server instance(s).

<br>

---

### 4) Ansible's variables

In `./group_vars/all` file you will find all the parameters used to configure the infrastructure. Two of them will be the credentials needed to deploy OpenVidu Pro (contact us through <a href="/commercial" target="_blank"><strong>Commercial page</strong></a> to get them)

<br>

> **WARNING**: go through all variables carefully as some of them do not have default values, as they are dependant on your infrastructure. Be also very careful to not delete any of them, as the deployment will fail if any variable is missing. For further information about many of them check out [OpenVidu Server params section](/reference-docs/openvidu-server-params/){:target="_blank"}

<br>

---

### 5) Deployment

First time you connect to an instance through SSH, it will ask you to confirm the instance's fingerprint, so try to **login into all the instances** to accept the fingerprint so Ansible can automatically do the job.

```bash
ssh -i /PATH/TO/SSH_public_key USER@INSTANCE_IP
```

Check that Ansible can access the instances. The following command (run it in the repository root folder) will perform a _ping_ to all the instances declared in `./inventory.yaml` file. You should see a successful log message for each one of them if everything is correct.

```bash
ansible -i inventory.yaml -m ping all
```

Finally, launch the Ansible's playbook to deploy your cluster:

```bash
ansible-playbook -i inventory.yaml play.yaml
```

The playbook command will end with the following log:

```console
*********************************************************
 TASK [check-app-ready : check every 60 seconds for 10 attempts if openvidu is up and ready]
*********************************************************
FAILED - RETRYING: check every 60 seconds for 10 attempts if openvidu is up and ready (10 retries left).
FAILED - RETRYING: check every 60 seconds for 10 attempts if openvidu is up and ready ( 9 retries left).
ok: [openvidu-server]

*********************************************************
 PLAY RECAP
*********************************************************
kurento-server-1       : ok=21  changed=18  unreachable=0   failed=0   skipped=0   rescued=0   ignored=0
kurento-server-2       : ok=21  changed=18  unreachable=0   failed=0   skipped=0   rescued=0   ignored=0
openvidu-server        : ok=53  changed=43  unreachable=0   failed=0   skipped=14  rescued=0   ignored=0
```

Once the playbook command has successfully finished, you will have OpenVidu Pro services accessible through the following URLs:

- **OpenVidu Pro Inspector** ([more info](/openvidu-pro/openvidu-inspector/){:target="_blank"}) : `https://YOUR_DNS_NAME/inspector`
- **OpenVidu Pro Kibana dashboard** ([more info](/openvidu-pro/detailed-session-monitoring/){:target="_blank"}) :  `https://YOUR_DNS_NAME/kibana`
- **OpenVidu Pro REST endpoint** ([more info](/openvidu-pro/REST-API-pro/){:target="_blank"}) : `https://YOUR_DNS_NAME:4443` (or the port you defined in property `openvidu_server_port` in file `./group_vars/all`)

<br>

> Regarding the compatibility of **openvidu-browser** and **server SDKs** (REST API, openvidu-java-client, openvidu-node-client), use the same version numbers as stated for openvidu-server in [Releases page](/releases/){:target="_blank"}. For example, for OpenVidu Pro 2.10.0, use the artifact versions indicated in [2.10.0 release table](/releases#2100){:target="_blank"}

<br>

---

### Troubleshooting

If you get stuck deploying this playbook remember we're here to help you. So please, when you open a new issue provide the **full Ansible output log** and, if you were able to deploy OpenVidu Server Pro role, please provide also the content of the following files of OpenVidu Server pro instance:

- Instance boot log: `/var/log/cloud-init-output.log`
- OpenVidu Server Pro JAR artifact log: `sudo journalctl -u openvidu` (this command will output the log)

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

<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/brands.css" integrity="sha384-Px1uYmw7+bCkOsNAiAV5nxGKJ0Ixn5nChyW8lCK1Li1ic9nbO5pC/iXaq27X5ENt" crossorigin="anonymous">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/fontawesome.css" integrity="sha384-BzCy2fixOYd0HObpx3GMefNqdbA7Qjcc91RgYeDjrHTIEXqiF00jKvgQG0+zY/7I" crossorigin="anonymous">

<link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.css"/>
<link rel="stylesheet" type="text/css" href="/css/slick-theme.css"/>
<script type="text/javascript" src="//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js"></script>

<script>
    $('.pro-gallery').slick({
      autoplay: true,
      arrows: false,
      autoplaySpeed: 3000,
      dots: true,
      infinite: true,
      pauseOnHover: false,
      pauseOnFocus: false,
      responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 1
        }
      },
    ]
    });
    $('.pro-gallery-steps').slick({
      autoplay: false,
      arrows: true,
      prevArrow: '<div class="slick-btn slick-btn-prev"><i class="icon ion-chevron-left"></i></div>',
      nextArrow: '<div class="slick-btn slick-btn-next"><i class="icon ion-chevron-right"></i></div>',
      dots: true,
      infinite: false,
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

<script src="/js/copy-btn.js"></script>