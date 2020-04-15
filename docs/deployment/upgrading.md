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
        <li style="color: #1c1c1c">These instructions are only compatible for <strong>OpenVidu >= 2.13.0</strong></li>
        <li style="color: #1c1c1c">Upgrading or downgrading OpenVidu by following these steps may cause your application to fail if there are any <strong>API breaking changes</strong> between the old and new versions of OpenVidu. Carefully read the <a href="https://docs.openvidu.io/en/stable/releases/" target="_blank">release notes</a> of the related versions before upgrading OpenVidu, be sure to try your application with the new OpenVidu version in your development environment before upgrading and always do so at your own risk</li>
    </ul>
</div>
</div>

# For AWS deployments

We need connect to Openvidu instance. Just navigate to **[AWS EC2 dashboard](https://console.aws.amazon.com/ec2#Instances){:target="_blank"}** and follow below steps:

<div class="row">
    <div class="upgrade-cf-steps" style="margin: 25px 35px 25px 35px">
        <a data-fancybox="gallery-upgrade-cf" data-caption="Click on 'Update' button" href="img/docs/upgrading/EC2_update1.png"><img class="img-responsive img-pro" src="img/docs/upgrading/EC2_update1.png"/></a>
        <a data-fancybox="gallery-upgrade-cf" data-caption="Select 'Use current template' and click on 'Next'" href="img/docs/upgrading/EC2_update2.png"><img class="img-responsive img-pro" src="img/docs/upgrading/EC2_update2.png"/></a>
        <a data-fancybox="gallery-upgrade-cf" data-caption="Change field 'OpenVidu Version'" href="img/docs/upgrading/EC2_update3.png"><img class="img-responsive img-pro" src="img/docs/upgrading/EC2_update3.png"/></a>
    </div>
    <div class="slick-captions">
      <div class="caption"><p><strong>1)</strong> Select your EC2 instance and click <strong>Connect</strong> button</p></div>
      <div class="caption"><p><strong>2)</strong> Select <strong>EC2 Instance Connect</strong>, input <strong>ubuntu</strong> into user name and click on <strong>Connect</strong></p></div>
      <div class="caption"><p><strong>3)</strong> Input <strong>sudo su</strong> into web console and press <strong>Enter</strong></p></div>
    </div>
</div>

<br>

After connected into web EC2 console and loging with **root** we'll go to [Stop all services deployed with docker-compose](#1-stop-all-services-deployed-with-docker-compose) and we'll follow all the steps.

<br>

---

# For Ubuntu deployments

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
It tutorial suppose the installation of openvidu its in the  recommend folder <code>/opt/openvidu</code>. You keep in mind this if your installation is in other folder.
</div>
</div>

You must perform the following general steps, that may vary depending on how you have configured your services:

#### 1) Stop all services deployed with docker-compose

Firstly go to folder where installed openvidu with `cd /opt/openvidu` command, and secondly stop all services with `./openvidu stop`

#### 2) Upgrade docker-compose 

First we will make a backup of the current installation in case we need something. To do this we execute the following commands:

```
cd /opt
mv openvidu openvidu.backup
```

Now we will install the new version using the following command:

```
# Change {VERSION} for the desired one. e.g. install_openvidu_2.13.0.sh

curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_{VERSION}.sh | bash
```

Finally remember change the necessary information in the file `/opt/openvidu/.env`

#### 3) Restart docker-compose

Run all services with `./openvidu start` in `/opt/openvidu` folder.

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