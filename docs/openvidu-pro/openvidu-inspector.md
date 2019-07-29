<h2 id="section-title">OpenVidu Inspector</h2>
<hr>

<p style="font-size: 18px; color: #7a7a7a; margin-top: 30px; padding: 4px;">
A powerful, easy-to-use and visually attractive dashboard that will help you monitor, manage and review all your videoconferences. Some features already available in the current version of OpenVidu Pro are:
</p>

#### Full in-depth visualization of your ongoing video sessions
Review each client connected to a video session and the media streams each one is sending and receiving. Our intuitive graph visualization will give you a complete summary of your sessions.

<div class="row">
    <div class="pro-gallery" style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-pro1" href="/img/docs/openvidu-pro/pro2.png"><img class="img-responsive img-pro" src="/img/docs/openvidu-pro/pro2.png"/></a>
        <a data-fancybox="gallery-pro1" href="/img/docs/openvidu-pro/pro3.png"><img class="img-responsive img-pro" src="/img/docs/openvidu-pro/pro3.png"/></a>
        <a data-fancybox="gallery-pro1" href="/img/docs/openvidu-pro/pro4.gif"><img class="img-responsive img-pro" src="/img/docs/openvidu-pro/pro4.gif"/></a>
        <a data-fancybox="gallery-pro1" href="/img/docs/openvidu-pro/pro8.png"><img class="img-responsive img-pro" src="/img/docs/openvidu-pro/pro8.png"/></a>
    </div>
</div>

<br>

#### Moderation capabilities of ongoing video sessions
Through OpenVidu Inspector you are able to administrate your video sessions just by pressing buttons: cut the video or audio of any publisher, force the disconnection of any participant, start and stop the recording of any video session and close them whenever you want.

<div class="row">
    <div class="pro-gallery" style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-pro2" href="/img/docs/openvidu-pro/pro5.png"><img class="img-responsive img-pro" src="/img/docs/openvidu-pro/pro5.png"/></a>
        <a data-fancybox="gallery-pro2" href="/img/docs/openvidu-pro/pro6.png"><img class="img-responsive img-pro" src="/img/docs/openvidu-pro/pro6.png"/></a>
        <a data-fancybox="gallery-pro2" href="/img/docs/openvidu-pro/pro7.png"><img class="img-responsive img-pro" src="/img/docs/openvidu-pro/pro7.png"/></a>
    </div>
</div>

<br>

#### Recording management
OpenVidu Inspector allows you to review all your recordings in a simple way. Preview them, download them or delete those you don't need anymore. Just with a couple of clicks.

<div class="row">
    <div style="margin: 25px 15px 15px 15px">
        <a data-fancybox="gallery-pro3" href="/img/docs/openvidu-pro/pro9.png"><img class="img-responsive img-pro" src="/img/docs/openvidu-pro/pro9.png"/></a>
    </div>
</div>

<br>

#### Session history
Every OpenVidu session event-flow is stored with great detail in OpenVidu Pro. This way you can review any past session in OpenVidu Inspector: its duration, the total streaming time, the users connected to it, who published and subscribed, the recordings started for the session... Lots of data to analyse your sessions once they are closed.

<div class="row">
    <div class="pro-gallery" style="margin: 25px 15px 25px 15px">
        <a data-fancybox="gallery-pro4" href="/img/docs/openvidu-pro/pro14.png"><img class="img-responsive img-pro" src="/img/docs/openvidu-pro/pro14.png"/></a>
        <a data-fancybox="gallery-pro4" href="/img/docs/openvidu-pro/pro15.png"><img class="img-responsive img-pro" src="/img/docs/openvidu-pro/pro15.png"/></a>
        <a data-fancybox="gallery-pro4" href="/img/docs/openvidu-pro/pro16.png"><img class="img-responsive img-pro" src="/img/docs/openvidu-pro/pro16.png"/></a>
    </div>
</div>

<br>

#### Client geographic location
OpenVidu Pro is able to locate your clients by city and country to make easier the identification of the users connecting to your sessions. You can consult this property to OpenVidu Server whenever you want with REST API or any server SDK. You also have available this info in OpenVidu Inspector:<br><br>

<div class="row">
    <div style="margin: 25px 15px 15px 15px">
        <a data-fancybox="gallery-pro5" href="/img/docs/openvidu-pro/pro12.png"><img class="img-responsive img-pro" style="border: 2px solid #eeeeee" src="/img/docs/openvidu-pro/pro12.png"/></a>
    </div>
</div>

<br>

> This product includes GeoLite2 data created by MaxMind, available from <a href="http://www.maxmind.com" target="_blank">http://www.maxmind.com</a>

#### Programmatic reset
OpenVidu Pro supports programmatic reset. You may call a [REST API method](/openvidu-pro/REST-API-pro#post-prorestart){:target="_blank"} to restart your OpenVidu Server process. This way you can:

- A) Change OpenVidu Server [configuration properties](/reference-docs/openvidu-server-params/){:target="_blank"}
- B) Easily clean up any garbage process or file that may have been stranded

You may also restart OpenVidu Server Pro directly in OpenVidu Inspector:<br><br>

<div class="row">
    <div style="margin: 25px 15px 15px 15px">
        <a data-fancybox="gallery-pro6" href="/img/docs/openvidu-pro/pro13.png"><img class="img-responsive img-pro" style="border: 2px solid #eeeeee; max-height: 650px" src="/img/docs/openvidu-pro/pro13.png"/></a>
    </div>
</div>

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
</script>