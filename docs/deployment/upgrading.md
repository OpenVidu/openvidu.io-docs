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
        <li style="color: #1c1c1c">Upgrading or downgrading OpenVidu by following these steps may cause your application to fail if there are any <strong>API breaking changes</strong> between the old and new versions of OpenVidu. Carefully read the <a href="https://docs.openvidu.io/en/stable/releases/" target="_blank">release notes</a> of the related versions before upgrading OpenVidu, be sure to try your application with the new OpenVidu version in your development environment before upgrading and always do so at your own risk</li>
    </ul>
</div>
</div>

# For AWS deployments

The upgrading process is 100% automatic. Just navigate to **[AWS CloudFormation dashboard](https://console.aws.amazon.com/cloudformation#stacks){:target="_blank"}** and follow below steps:

<div class="row">
    <div class="upgrade-cf-steps" style="margin: 25px 35px 25px 35px">
        <a data-fancybox="gallery-upgrade-cf" data-caption="Click on 'Update' button" href="img/docs/upgrading/CF_update1.png"><img class="img-responsive img-pro" src="img/docs/upgrading/CF_update1.png"/></a>
        <a data-fancybox="gallery-upgrade-cf" data-caption="Select 'Use current template' and click on 'Next'" href="img/docs/upgrading/CF_update2.png"><img class="img-responsive img-pro" src="img/docs/upgrading/CF_update2.png"/></a>
        <a data-fancybox="gallery-upgrade-cf" data-caption="Change field 'OpenVidu Version'" href="img/docs/upgrading/CF_update3.png"><img class="img-responsive img-pro" src="img/docs/upgrading/CF_update3.png"/></a>
    </div>
    <div class="slick-captions">
      <div class="caption"><p><strong>1)</strong> Select your CloudFormation stack and click on <strong>Update</strong> button</p></div>
      <div class="caption"><p><strong>2)</strong> Select <strong>Use current template</strong> and click on <strong>Next</strong></p></div>
      <div class="caption"><p><strong>3)</strong> Change field <strong>OpenVidu version</strong> inside "Other configuration" section and at the bottom of the page click on <strong>Next 🡆 Next 🡆 Update stack</stack></p></div>
    </div>
</div>

<br>

After performing the steps above, you will be redirect to Events page, where you will see a new `UPDATE_IN_PROGRESS` status. Wait until `UPDATE_COMPLETE` and your new version of OpenVidu will be ready.

> Remember to update **openvidu-browser** library in your clients. Comply version compatibility according to **[Releases](https://docs.openvidu.io/en/stable/releases){:target="_blank"}** page

<br>

---

# For Ubuntu deployments

You must perform the following general steps, that may vary depending on how you have configured your services:

#### 1) Stop OpenVidu Server and Kurento Media Server services

First one is a Java process that may be killed with a simple `kill -9 PID_NUMBER` command, and second one is usually stopped with `sudo service kurento-media-server stop`

#### 2) Upgrade kurento-media-server package and replace openvidu-server JAR file for the new version

It is mandatory to comply version compatibility between OpenVidu and Kurento Media Server. Check it out in **[Releases](https://docs.openvidu.io/en/stable/releases){:target="_blank"}** page.
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

Run Kurento Media Server with `sudo service kurento-media-server start` and launch openvidu-server JAR file as stated in [Deploying OpenVidu in Ubuntu](deployment/deploying-ubuntu/#8-init-openvidu-server-jar-executable){:target="_blank"} section.

> Remember to update **openvidu-browser** library in your clients. Comply version compatibility according to **[Releases](https://docs.openvidu.io/en/stable/releases){:target="_blank"}** page

<br><br>

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