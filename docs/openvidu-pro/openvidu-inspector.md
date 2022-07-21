<h2 id="section-title">OpenVidu Inspector</h2>
<hr>

<p style="font-size: 18px; color: #7a7a7a; margin-top: 30px; padding: 4px;">
A powerful, easy-to-use and visually attractive dashboard that will help you monitor, manage and review all your videoconferences. Some features already available in the current version of OpenVidu Pro are:
</p>

#### Full in-depth visualization of your ongoing video sessions
Review each client connected to a video session and the media streams each one is sending and receiving. Our intuitive graph visualization will give you a complete summary of your sessions.

<div class="row">
    <div class="pro-gallery" style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-pro1" data-type="image" class="fancybox-img" href="img/docs/openvidu-pro/pro2.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/pro2.png"/></a>
        <a data-fancybox="gallery-pro1" data-type="image" class="fancybox-img" href="img/docs/openvidu-pro/pro3.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/pro3.png"/></a>
        <a data-fancybox="gallery-pro1" data-type="image" class="fancybox-img" href="img/docs/openvidu-pro/pro4.gif"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/pro4.gif"/></a>
        <a data-fancybox="gallery-pro1" data-type="image" class="fancybox-img" href="img/docs/openvidu-pro/pro8.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/pro8.png"/></a>
    </div>
</div>

<br>

#### Moderation capabilities of ongoing video sessions
Through OpenVidu Inspector you are able to administrate your video sessions just by pressing buttons: cut the video or audio of any publisher, force the disconnection of any participant, start and stop the recording of any video session and close them whenever you want.

<div class="row">
    <div class="pro-gallery" style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-pro2" data-type="image" class="fancybox-img" href="img/docs/openvidu-pro/pro5.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/pro5.png"/></a>
        <a data-fancybox="gallery-pro2" data-type="image" class="fancybox-img" href="img/docs/openvidu-pro/pro6.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/pro6.png"/></a>
        <a data-fancybox="gallery-pro2" data-type="image" class="fancybox-img" href="img/docs/openvidu-pro/pro7.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/pro7.png"/></a>
    </div>
</div>

<br>

#### Recording management
OpenVidu Inspector allows you to review all your recordings in a simple way. Preview them, download them or delete those you don't need anymore. Just with a couple of clicks.

<div class="row">
    <div style="margin: 25px 15px 15px 15px">
        <a data-fancybox="gallery-pro3" data-type="image" class="fancybox-img" href="img/docs/openvidu-pro/pro9.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/pro9.png"/></a>
    </div>
</div>

<br>

#### Session history

OpenVidu inspector provides a very intuitive way to see all our sessions info in OpenVidu Pro. From **session status dashboard** showing the percentage of successful and problematic sessions, through session history, session anomalies detected in _troubleshooting_ section, **detailed** users **visualization**, **browser logs**, events **timeline** and tons of relevant information about our sessions.


<div class="row">
    <div class="pro-gallery" style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-pro4" data-type="image" class="fancybox-img" href="img/docs/openvidu-pro/pro14.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/pro14.png"/></a>
        <a data-fancybox="gallery-pro4" data-type="image" class="fancybox-img" href="img/docs/openvidu-pro/pro15.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/pro15.png"/></a>
        <a data-fancybox="gallery-pro4" data-type="image" class="fancybox-img" href="img/docs/openvidu-pro/pro16.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/pro16.png"/></a>
        <a data-fancybox="gallery-pro4" data-type="image" class="fancybox-img" href="img/docs/openvidu-pro/pro16_1.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/pro16_1.png"/></a>
    </div>
</div>

<br>

#### Cluster management
OpenVidu Pro provides clustering features for scalable video sessions. You can manage your cluster from OpenVidu Inspector, launching and dropping Media Nodes with the click of a button to adapt your cluster according to CPU load.

<div class="row">
    <div class="pro-gallery" style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-pro7" data-type="image" class="fancybox-img" href="img/docs/openvidu-pro/pro17.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/pro17.png"/></a>
        <a data-fancybox="gallery-pro7" data-type="image" class="fancybox-img" href="img/docs/openvidu-pro/pro18.png"><img class="img-responsive img-pro" src="img/docs/openvidu-pro/pro18.png"/></a>
    </div>
</div>

<br>

#### Client geographic location
OpenVidu Pro is able to locate your clients by city and country to make easier the identification of the users connecting to your sessions. You can consult this property to OpenVidu Server whenever you want with REST API or any server SDK. You also have available this info in OpenVidu Inspector:<br><br>

<div class="row">
    <div style="margin: 25px 15px 15px 15px">
        <a data-fancybox="gallery-pro5" data-type="image" class="fancybox-img" href="img/docs/openvidu-pro/pro12.png"><img class="img-responsive img-pro" style="border: 2px solid #eeeeee" src="img/docs/openvidu-pro/pro12.png"/></a>
    </div>
</div>

> This product includes GeoLite2 data created by MaxMind, available from <a href="http://www.maxmind.com" target="_blank">http://www.maxmind.com</a>

#### Programmatic reset
OpenVidu Pro supports programmatic reset. You may call a [REST API method](reference-docs/REST-API/#post-restart) to restart your OpenVidu Server process. This way you can:

- A) Change OpenVidu Server [configuration properties](reference-docs/openvidu-config/)
- B) Easily clean up any garbage process or file that may have been stranded

You may also restart OpenVidu Server Pro directly in OpenVidu Inspector:<br><br>

<div class="row">
    <div style="margin: 25px 15px 15px 15px">
        <a data-fancybox="gallery-pro6" data-type="image" class="fancybox-img" href="img/docs/openvidu-pro/pro13.png"><img class="img-responsive img-pro" style="border: 2px solid #eeeeee; max-height: 650px" src="img/docs/openvidu-pro/pro13.png"/></a>
    </div>
</div>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js"></script>
<script type='text/javascript' src='js/fancybox-setup.js'></script>

<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/brands.css" integrity="sha384-Px1uYmw7+bCkOsNAiAV5nxGKJ0Ixn5nChyW8lCK1Li1ic9nbO5pC/iXaq27X5ENt" crossorigin="anonymous">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/fontawesome.css" integrity="sha384-BzCy2fixOYd0HObpx3GMefNqdbA7Qjcc91RgYeDjrHTIEXqiF00jKvgQG0+zY/7I" crossorigin="anonymous">

<link rel="stylesheet" type="text/css" href="css/downloads/slick-1.6.0.css"/>
<link rel="stylesheet" type="text/css" href="css/slick-theme.css"/>
<script type="text/javascript" src="js/downloads/slick-1.6.0.min.js"></script>

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
</script>
