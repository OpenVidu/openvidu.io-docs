<h2 id="section-title">Upgrading OpenVidu Pro</h2>
<hr>

- **[Migrating from 2.22.0 to 2.23.0](#migrating-from-2220-to-2230)**
- **[Migrating from 2.21.0 to 2.22.0](#migrating-from-2210-to-2220)**
- **[Migrating from 2.20.0 to 2.21.0](#migrating-from-2200-to-2210)**

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

## Migrating from 2.22.0 to 2.23.0

Depending of the type of deployment you have (_AWS_ or _On Premises_), you will need to follow one of the following instructions:

- **[Migrating from 2.22.0 to 2.23.0 (AWS Cloudformation - Single master deployment)](#migrating-from-2220-to-2230-aws-cloudformation-single-master-deployment)**
- **[Migrating from 2.22.0 to 2.23.0 (On premises - Single master deployment)](#migrating-from-2220-to-2230-on-premises-single-master-deployment)**
- **[Migrating from 2.22.0 to 2.23.0 (AWS Cloudformation - High Availability deployment)](#migrating-from-2220-to-2230-aws-cloudformation-high-availability-deployment)**

### Migrating from 2.22.0 to 2.23.0 (AWS Cloudformation - Single master deployment)
<br>

Upgrading process for this kind of deployment is exactly the same as [Migrating from 2.22.0 to 2.23.0 OpenVidu Pro (AWS with Cloudformation)](https://docs.openvidu.io/en/2.23.0/deployment/pro/upgrading/#migrating-from-2220-to-2230-aws-cloudformation).

> Remember to use `OPENVIDU_EDITION=enterprise` to run the deployment as OpenVidu enterprise.

### Migrating from 2.22.0 to 2.23.0 (On premises - Single master deployment)
<br>

Upgrading process for this kind of deployment is exactly the same as [Migrating from 2.22.0 to 2.23.0 OpenVidu Pro (On premises)](https://docs.openvidu.io/en/2.23.0/deployment/pro/upgrading/#migrating-from-2220-to-2230-on-premises).

> Remember to use `OPENVIDU_EDITION=enterprise` to run the deployment as OpenVidu enterprise.

### Migrating from 2.22.0 to 2.23.0 (AWS Cloudformation - High Availability deployment)
<br>

For OpenVidu Enterprise with High Availability, the upgrading process can not be done manually because it would require a lot of different changes on different machines. Instead, OpenVidu Enterprise with High Availability uses a S3 bucket to preserve its configuration and recordings. You can access to it from your CloudFormation panel, at the **Resources** section.

To upgrade you will need to deploy the newer Cloudformation template of the version you want to deploy.
If you want to keep in your new deployment your configuration and recordings, follow from step **1)** to **5)**, Otherwise just start from step **3)**:

<br>

**1)** Clone your current S3 bucket with all of your data to a new S3 bucket. You do not need any tool installed on your machine. You can open your [AWS cloudshell](https://docs.aws.amazon.com/cloudshell/latest/userguide/welcome.html){:target="_blank"} and execute:

```
aws s3api create-bucket \
    --bucket <new-bucket-v2.23.0> \
    --region <your-region>
aws s3 sync s3://<bucket-v2.22.0> s3://<new-bucket-v2.23.0>
```

**2)** Remove from the new bucket the file named `.env`, located in the root directory of the bucket. This is because we want OpenVidu Enterprise to generate a new one for us.

**3)** Deploy the Cloudformation template of 2.23.0 from [this instructions](https://docs.openvidu.io/en/2.23.0/deployment/enterprise/aws/#high-availability-deployment). If you've followed steps 1 and 2, put at the **`OpenVidu S3 bucket`** parameter your new bucket, otherwise just keep the parameter blank.

**4)** Wait for the deployment to be in [healthy state](https://docs.openvidu.io/en/2.23.0/deployment/enterprise/aws/#check-cluster-after-deploy)

**5)** Check your new S3 bucket (or check the `new-bucket-v2.23.0` you have created if you followed steps 1 and 2), and move your old configuration to the `.env` configuration of the new bucket. You can follow [this section](https://docs.openvidu.io/en/2.23.0/deployment/enterprise/aws/#2-change-configuration-by-modifying-s3-configuration-file-not-recommended) to see how to change and restart OpenVidu master nodes.

<br>

---

## Migrating from 2.21.0 to 2.22.0

Depending of the type of deployment you have (_AWS_ or _On Premises_), you will need to follow one of the following instructions:

- **[Migrating from 2.21.0 to 2.22.0 (AWS Cloudformation - Single master deployment)](#migrating-from-2210-to-2220-aws-cloudformation-single-master-deployment)**
- **[Migrating from 2.21.0 to 2.22.0 (On premises - Single master deployment)](#migrating-from-2210-to-2220-on-premises-single-master-deployment)**
- **[Migrating from 2.21.0 to 2.22.0 (AWS Cloudformation - High Availability deployment)](#migrating-from-2210-to-2220-aws-cloudformation-high-availability-deployment)**

### Migrating from 2.21.0 to 2.22.0 (AWS Cloudformation - Single master deployment)
<br>

Upgrading process for this kind of deployment is exactly the same as [Migrating from 2.21.0 to 2.22.0 OpenVidu Pro (AWS with Cloudformation)](https://docs.openvidu.io/en/2.22.0/deployment/pro/upgrading/#migrating-from-2210-to-2220-aws-cloudformation).

> Remember to use `OPENVIDU_EDITION=enterprise` to run the deployment as OpenVidu enterprise.

### Migrating from 2.21.0 to 2.22.0 (On premises - Single master deployment)
<br>

Upgrading process for this kind of deployment is exactly the same as [Migrating from 2.21.0 to 2.22.0 OpenVidu Pro (On premises)](https://docs.openvidu.io/en/2.22.0/deployment/pro/upgrading/#migrating-from-2210-to-2220-on-premises).

> Remember to use `OPENVIDU_EDITION=enterprise` to run the deployment as OpenVidu enterprise.

### Migrating from 2.21.0 to 2.22.0 (AWS Cloudformation - High Availability deployment)
<br>

For OpenVidu Enterprise with High Availability, the upgrading process can not be done manually because it would require a lot of different changes on different machines. Instead, OpenVidu Enterprise with High Availability uses a S3 bucket to preserve its configuration and recordings. You can access to it from your CloudFormation panel, at the **Resources** section.

To upgrade you will need to deploy the newer Cloudformation template of the version you want to deploy.
If you want to keep in your new deployment your configuration and recordings, follow from step **1)** to **5)**, Otherwise just start from step **3)**:

<br>

**1)** Clone your current S3 bucket with all of your data to a new S3 bucket. You do not even need any tool installed on your machine. You can open your [AWS cloudshell](https://docs.aws.amazon.com/cloudshell/latest/userguide/welcome.html){:target="_blank"} and execute:

```
aws s3api create-bucket \
    --bucket <new-bucket-v2.22.0> \
    --region <your-region>
aws s3 sync s3://<bucket-v2.21.0> s3://<new-bucket-v2.22.0>
```

**2)** Remove from the new bucket the file named `.env`, located in the root directory of the bucket. This is because we want OpenVidu Enterprise to generate a new one for us.

**3)** Deploy the Cloudformation template of 2.22.0 from [this instructions](https://docs.openvidu.io/en/2.22.0/deployment/enterprise/aws/#high-availability-deployment). If you've followed steps 1 and 2, put at the **`OpenVidu S3 bucket`** parameter your new bucket, Otherwise just keep the parameter blank.

**4)** Wait for the deployment to be in [healthy state](https://docs.openvidu.io/en/2.22.0/deployment/enterprise/aws/#check-cluster-after-deploy)

**5)** Check your new S3 bucket (or check the `new-bucket-v2.22.0` you have created if you followed steps 1 and 2), and move your old configuration to the `.env` configuration of the new bucket. You can follow  [this section](https://docs.openvidu.io/en/2.22.0/deployment/enterprise/aws/#2-change-configuration-by-modifying-s3-configuration-file-not-recommended) to see how to change and restart OpenVidu master nodes.

<br>

---

## Migrating from 2.20.0 to 2.21.0

Depending of the type of deployment you have (_AWS_ or _On Premises_), you will need to follow one of the following instructions:

- **[Migrating from 2.20.0 to 2.21.0 (AWS Cloudformation - Single master deployment)](#migrating-from-2200-to-2210-aws-cloudformation-single-master-deployment)**
- **[Migrating from 2.20.0 to 2.21.0 (On premises - Single master deployment)](#migrating-from-2200-to-2210-on-premises-single-master-deployment)**
- **[Migrating from 2.20.0 to 2.21.0 (AWS Cloudformation - High Availability deployment)](#migrating-from-2200-to-2210-aws-cloudformation-high-availability-deployment)**

### Migrating from 2.20.0 to 2.21.0 (AWS Cloudformation - Single master deployment)
<br>

Upgrading process for this kind of deployment is exactly the same as [Migrating from 2.20.0 to 2.21.0 OpenVidu Pro (AWS with Cloudformation)](https://docs.openvidu.io/en/2.21.0/deployment/pro/upgrading/#migrating-from-2200-to-2210).

> Remember to use `OPENVIDU_EDITION=enterprise` to run the deployment as OpenVidu enterprise.

### Migrating from 2.20.0 to 2.21.0 (On premises - Single master deployment)
<br>

Upgrading process for this kind of deployment is exactly the same as [Migrating from 2.20.0 to 2.21.0 OpenVidu Pro (On premises)](https://docs.openvidu.io/en/2.21.0/deployment/pro/upgrading/#migrating-from-2200-to-2210).

> Remember to use `OPENVIDU_EDITION=enterprise` to run the deployment as OpenVidu enterprise.

### Migrating from 2.20.0 to 2.21.0 (AWS Cloudformation - High Availability deployment)
<br>

For OpenVidu Enterprise with High Availability, the upgrading process can not be done manually because it would require a lot of different changes on different machines. Instead, OpenVidu Enterprise with High Availability uses a S3 bucket to preserve its configuration and recordings. You can access to it from your CloudFormation panel, at the **Resources** section.

To upgrade you will need to deploy the newer Cloudformation template of the version you want to deploy.
If you want to keep in your new deployment your configuration and recordings, follow from step **1)** to **5)**, Otherwise just start from step **3)**:

<br>

**1)** Clone your current S3 bucket with all of your data to a new S3 bucket. You do not even need any tool installed on your machine. You can open your [AWS cloudshell](https://docs.aws.amazon.com/cloudshell/latest/userguide/welcome.html){:target="_blank"} and execute:

```
aws s3api create-bucket \
    --bucket <new-bucket-v2.21.0> \
    --region <your-region>
aws s3 sync s3://<bucket-v2.20.0> s3://<new-bucket-v2.21.0>
```

**2)** Remove from the new bucket the file named `.env`, located in the root directory of the bucket. This is because we want OpenVidu Enterprise to generate a new one for us.

**3)** Deploy the Cloudformation template of 2.21.0 from [this instructions](https://docs.openvidu.io/en/2.21.0/deployment/enterprise/aws/#high-availability-deployment). If you've followed steps 1 and 2, put at the **`OpenVidu S3 bucket`** parameter your new bucket, Otherwise just keep the parameter blank.

**4)** Wait for the deployment to be in [healthy state](https://docs.openvidu.io/en/2.21.0/deployment/enterprise/aws/#check-cluster-after-deploy)

**5)** Check your new S3 bucket (or check the `new-bucket-v2.21.0` you have created if you followed steps 1 and 2), and move your old configuration to the `.env` configuration of the new bucket. You can follow  [this section](https://docs.openvidu.io/en/2.21.0/deployment/enterprise/aws/#2-change-configuration-by-modifying-s3-configuration-file-not-recommended) to see how to change and restart OpenVidu master nodes.

<br>

---

## General notes when upgrading

- Remember to update **openvidu-browser** library in your clients. Comply version compatibility according to [Releases](releases/) page.
- In case you have **mobile applications**: the previous minor version of openvidu-browser is always compatible with the next minor version of openvidu-server. This way you can upgrade your openvidu-server while giving your clients time to update their applications. Applications using the previous and the new version of openvidu-browser can coexist in the new openvidu-server version. For example, if you upgrade openvidu-server to 2.16.0, it will work fine with applications using both openvidu-browser 2.15.0 and 2.16.0. Of course, you must notify your users to update their applications until all of them are using openvidu-browser 2.16.0.

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
