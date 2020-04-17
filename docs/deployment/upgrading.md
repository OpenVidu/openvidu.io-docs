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
      <strong>These instructions are only suitable for OpenVidu >= 2.13.0</strong>. Upgrading or downgrading OpenVidu by following these steps may cause your application to fail if there are any <strong>API breaking changes</strong> between the old and new versions of OpenVidu. Carefully read the <a href="releases/" target="_blank">release notes</a> of the related versions before upgrading OpenVidu, be sure to try your application with the new OpenVidu version in your development environment before upgrading and always do so at your own risk
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
      Unfortunately upgrading OpenVidu to <strong>2.13.0</strong> from any past version will require you to completely wipe out your past version, as the installation procedure has completely changed to a Docker deployment. If you are going to install 2.13.0 in the same machine, make sure to backup any data you want to keep and uninstall all of OpenVidu services before installing 2.13.0. Good news is that from this point in time, upgrading or downgrading versions will be extremely quick and easy!
</div>
</div>

# For AWS deployments

We need to connect to the Openvidu EC2 instance. Just navigate to **[AWS EC2 dashboard](https://console.aws.amazon.com/ec2#Instances){:target="_blank"}** and follow below steps:

<div class="row">
    <div class="upgrade-cf-steps" style="margin: 25px 35px 25px 35px">
        <a data-fancybox="gallery-upgrade-cf" data-caption="Click on 'Update' button" href="img/docs/upgrading/EC2_update1.png"><img class="img-responsive img-pro" style="max-width: 800px" src="img/docs/upgrading/EC2_update1.png"/></a>
        <a data-fancybox="gallery-upgrade-cf" data-caption="Select 'Use current template' and click on 'Next'" href="img/docs/upgrading/EC2_update2.png"><img class="img-responsive img-pro" style="max-width: 700px" src="img/docs/upgrading/EC2_update2.png"/></a>
        <a data-fancybox="gallery-upgrade-cf" data-caption="Change field 'OpenVidu Version'" href="img/docs/upgrading/EC2_update3.png"><img class="img-responsive img-pro" style="max-width: 600px" src="img/docs/upgrading/EC2_update3.png"/></a>
    </div>
    <div class="slick-captions">
      <div class="caption"><p><strong>1)</strong> Select your EC2 instance and click on <strong>Connect</strong> button</p></div>
      <div class="caption"><p><strong>2)</strong> Select <strong>EC2 Instance Connect</strong>, use default <strong>root</strong> user name and click on <strong>Connect</strong></p></div>
      <div class="caption"><p><strong>3)</strong> Now you will be connected to a terminal of your EC2 instance as root user</p></div>
    </div>
</div>

<br>

After connected into web EC2 console of your OpenVidu instance as root user, all that remains to be done is following all the steps of [For on premises deployments](#for-on-premises-deployments).

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