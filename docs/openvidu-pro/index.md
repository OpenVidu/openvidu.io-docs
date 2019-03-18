<h2 id="section-title">OpenVidu Pro</h2>
<hr>

<!--<pre class="pre-video-responsive">
<div class="video-responsive">
    <iframe width="100%" src="https://www.youtube.com/embed/xcJtL7QggTI?rel=0&amp;controls=2&amp;showinfo=0;autohide=2" frameborder="0" allowfullscreen></iframe>
</div>
</pre>-->

- **[Why](#why)**
- **[What](#what)**
- **[How](#how)**
- **[Pricing](#pricing)**

---

<p style="text-align: center; margin-top: 50px">
    <a href="#how" class="btn btn-xs btn-primary" style="font-size: 15px; display: table; margin: auto" title="OpenVidu Pro"><span style="display: table-cell; vertical-align:middle">Run OpenVidu Pro</span></a>
</p>


<div style="
    display: table;
    border: 2px solid #0088aa9e;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 25px;
    padding: 5px 0 5px 0;
    background-color: rgba(0, 136, 170, 0.04);"><div style="display: table-cell">
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
	Current version of OpenVidu Pro matches <strong>version 2.8.0</strong> of OpenVidu Community Edition. We are not currently charging anything for using OpenVidu Pro, as we intend these first versions to be a beta. The only price you will have to pay is the cost of the Amazon instance, as you would do when <a href="/docs/deployment/deploying-aws/" target="_blank">deploying OpenVidu Community Edition in AWS</a>
</div>
</div>


## Why

OpenVidu is an **open source project**, and for sure will remain this way in the future. But OpenVidu team needs some source of income to continue working on this amazing project. The approach we'll be taking here is pretty straightforward: OpenVidu features themselves will always be open source, and only some tools or improvements related to **production environments** may end up being part of OpenVidu Pro stack. To sum up:
<br><br>

> You will always be able to access OpenVidu awesome features and build whatever you want with them. Our intention is to make OpenVidu platform long-term sustainable by offering **advanced production stage monitoring and management tools** for those companies interested in such capabilities

<br>

---

## What

OpenVidu Pro consists of different modules working over OpenVidu Community Edition. The ultimate goal of OpenVidu Pro is to offer **automated scalability and fault-tolerance**, but this will be available in future releases.

We first have designed **[OpenVidu Inspector](/openvidu-pro/openvidu-inspector/){:target="_blank"}**: a powerful, easy-to-use and visually attractive dashboard that will help you monitor, manage and review all your videoconferences.

#### For the near future...

OpenVidu Pro roadmap includes features like:

- **Audio and video quality metrics in all your video sessions**: WebRTC is an exciting technology, but also very tricky. So many factors may affect the final quality perceived by your clients that sometimes finding out what might actually be happening when something is wrong is just an annoying task. Gathering some metrics such us bitrate, packet loss or jitter is usually the most efficient way to face this kind of problems. OpenVidu Pro will do this for you, so you can get a picture of the actual network state in your clients side.<br><br>
- **Automated scalability and fault tolerance**: this is the ultimate goal of OpenVidu Pro. Integrated in popular cloud providers, OpenVidu Pro will include automated scalability and fault tolerance, so your real-time communication systems can keep up with your business growth.
<br><br>

<div style="
    display: table;
    border: 2px solid #0088aa9e;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 25px;
    padding: 5px 0 5px 0;
    background-color: rgba(0, 136, 170, 0.04);"><div style="display: table-cell">
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
	OpenVidu Pro users will also have priority when contacting OpenVidu team with doubts about the platform.<br>Remember we also offer <a href="/contact" target="_blank">custom professional support</a>
</div>
</div>

<br>

---

## How

OpenVidu Pro is available through **AWS Marketplace** (you will need an [Amazon Web Services account](https://portal.aws.amazon.com/billing/signup?redirect_url=https%3A%2F%2Faws.amazon.com%2Fregistration-confirmation#/start){:target="_blank"})

### 1) Steps towards configuration

<p style="text-align: center; margin-top: 30px">
    <a href="https://aws.amazon.com/marketplace/pp/B07N6JNC63?qid=1551707515999&sr=0-1&ref_=srh_res_product_title" class="btn btn-xs btn-primary" style="font-size: 15px; display: table; margin: auto" title="OpenVidu Pro" target="_blank"><span style="display: table-cell; vertical-align:middle">Go to </span><i style="margin-left: 10px; margin-right: 10px; font-size: 45px; vertical-align: middle; font-weight: 100" class="fab fa-aws"></i><span style="display: table-cell; vertical-align:middle"> marketplace</span></a>
</p>

<div class="row wow fadeInUp">
    <div class="pro-gallery-steps" style="margin: 25px 35px 25px 35px">
        <a data-fancybox="gallery-pro5" href="/img/docs/openvidu-pro/marketplace/market1.png"><img class="img-responsive img-pro" src="/img/docs/openvidu-pro/marketplace/market1.png"/></a>
        <a data-fancybox="gallery-pro5" href="/img/docs/openvidu-pro/marketplace/market2.png"><img class="img-responsive img-pro" src="/img/docs/openvidu-pro/marketplace/market2.png"/></a>
        <a data-fancybox="gallery-pro5" href="/img/docs/openvidu-pro/marketplace/market3.png"><img class="img-responsive img-pro" src="/img/docs/openvidu-pro/marketplace/market3.png"/></a>
        <a data-fancybox="gallery-pro5" href="/img/docs/openvidu-pro/marketplace/market4.png"><img class="img-responsive img-pro" src="/img/docs/openvidu-pro/marketplace/market4.png"/></a>
        <a data-fancybox="gallery-pro5" href="/img/docs/openvidu-pro/marketplace/market5.png"><img class="img-responsive img-pro" src="/img/docs/openvidu-pro/marketplace/market5.png"/></a>
    </div>
</div>

<br>

### 2) Configure your OpenVidu Server Pro

Fill the form with the appropriate values as stated below

#### Stack name
The name of your deployment

#### SSL Certificate Configuration
This is the kind of certificate you will be using in your deployment. Three different options are offered:

- **selfsigned**: use a selfsigned certificate. This options is meant for testing and developing environments. Leave the rest of the fields with their default value

<div class="row wow fadeInUp">
    <div style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro6" href="/img/docs/openvidu-pro/marketplace/marketSelfsigned.png"><img class="img-responsive img-pro img-pro-small" src="/img/docs/openvidu-pro/marketplace/marketSelfsigned.png"/></a>
    </div>
</div>

- **letsencrypt**: use an automatic certificate by Let's Encrypt. This way you don't have to worry about providing your own certificate. You simply have to enter an email account where Let's Encrypt will send its messages, your fully qualified domain name and one AWS Elastic IP for the same region you selected before ([allocate one if you don't have it](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html#using-instance-addressing-eips-allocating){:target="_blank"}). Of course, **you will need to register this Elastic IP in your DNS hosting service and associate it with your fully qualified domain name**. Only after this association between the Elastic IP and your domain name is effective your deployment with Let's Encrypt will work fine.

<div class="row wow fadeInUp">
    <div style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro7" href="/img/docs/openvidu-pro/marketplace/marketLetsencrypt.png"><img class="img-responsive img-pro img-pro-small" src="/img/docs/openvidu-pro/marketplace/marketLetsencrypt.png"/></a>
    </div>
</div>

- **owncert**: use your own certificate. You must provide one AWS Elastic IP for the same region you selected before ([allocate one if you don't have it](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html#using-instance-addressing-eips-allocating){:target="_blank"}), and your public certificate and private key, both accessible through uris (an Amazon S3 bucket is the best way to do it). Leave the default values for *Email* and *Fully qualified domain name* fields.

<div class="row wow fadeInUp">
    <div style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro8" href="/img/docs/openvidu-pro/marketplace/marketOwncert.png"><img class="img-responsive img-pro img-pro-small" src="/img/docs/openvidu-pro/marketplace/marketOwncert.png"/></a>
    </div>
</div>

#### OpenVidu Configuration

These fields respectively configure the following [system properties](/reference-docs/openvidu-server-params/){:target="_blank"} of OpenVidu Server: `openvidu.secret`, `openvidu.recording.public-access`, `openvidu.recording.notification`, `openvidu.streams.video.max-recv-bandwidth`, `openvidu.streams.video.min-recv-bandwidth`, `openvidu.streams.video.max-send-bandwidth`, `openvidu.streams.video.min-send-bandwidth`

<div class="row wow fadeInUp">
    <div style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro9" href="/img/docs/openvidu-pro/marketplace/marketOpenviduconf.png"><img class="img-responsive img-pro img-pro-small" src="/img/docs/openvidu-pro/marketplace/marketOpenviduconf.png"/></a>
    </div>
</div>

#### Openvidu Security Group

These fields allow you to limit the IPs that will be able to connect to OpenVidu Server Pro.

> **WARNING**: be careful when limiting these IP ranges
>
> - **Port 4443 access Range**: OpenVidu Server Pro REST API and client access point. This should be set to `0.0.0.0/0` if you want any client to be able to use your deployment
> - **Port 3478 access Range**: TURN server port. This should be set to `0.0.0.0/0` if you want any client to be able to use your deployment, as you never know which user might need a TURN connection to be able to send and receive media
> - **UDP Port access Range** and **TCP Port access Range**: limits the clients that will be able to establish TCP and UDP connections to your OpenVidu Server Pro. So again, if you want to provide service to any client these should be set to `0.0.0.0/0`
> - **MinOpenPort** and **MaxOpenPort**: determine what ports will be available to establish the media connections, so the generous default value is a good choice
> - **Port 80 access Range**: if you are using Let's Encrypt SSL configuration, set it to `0.0.0.0/0`, as Let's Encrypt will need to access your server through port 80
> - **SSH Port access Range** can be limited as you want, as it provides SSH access to the server with the proper private key through port 22

<div class="row wow fadeInUp">
    <div style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro10" href="/img/docs/openvidu-pro/marketplace/marketSecurity.png"><img class="img-responsive img-pro img-pro-small" src="/img/docs/openvidu-pro/marketplace/marketSecurity.png"/></a>
    </div>
</div>

#### Other parameters

Choose the size of your instance (see [OpenVidu performance FAQ](/troubleshooting/#9-which-is-the-current-status-of-openvidu-on-scalability-and-fault-tolerance){:target="_blank"}) and a Key Pair ([create one if you don't have any](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html#having-ec2-create-your-key-pair){:target="_blank"}).

<div class="row wow fadeInUp">
    <div style="margin: 5px 15px 35px 15px">
        <a data-fancybox="gallery-pro11" href="/img/docs/openvidu-pro/marketplace/marketOthers.png"><img class="img-responsive img-pro img-pro-small" src="/img/docs/openvidu-pro/marketplace/marketOthers.png"/></a>
    </div>
</div>

You are ready to go. Click on **Next** 🡆 **Next** 🡆 **Create stack** to finally deploy your OpenVidu Server Pro.

Wait until Stack status is set to `CREATE_COMPLETE`. Then you will have a production-ready setup with all the advanced features provided by OpenVidu Pro.

>Regarding the compatibility of **openvidu-browser** and **server SDKs** (REST API, openvidu-java-client, openvidu-node-client), use the same version numbers as stated for openvidu-server in [Releases page](/releases/){:target="_blank"}. For example, for OpenVidu Pro 2.8.0, use the artifact versions indicated in [2.8.0 release table](/releases#260){:target="_blank"}

<br>

---

## Pricing

OpenVidu Pro will be priced through AWS Marketplace. Any piece of software offered in AWS Marketplace has two different charges: the cost of the AWS resources running the software and the cost of the software itself. Software manufacturers specify this second charge, and it is the only revenue they receive from the total cost of the stack. Having made this clear:

- The moment you cancel your OpenVidu Pro subscription in AWS Marketplace, no more charges will be applied. You only pay for the time you are running the service.
- OpenVidu Pro is considered a beta version right now, and for this reason no extra fees will be charged for the software part.
<!--- When releasing a final version, OpenVidu team may decide to offer OpenVidu Pro free of charge when deploying it on certain AWS instance types, so companies are able to try it on small machines before acquiring a bigger instance for real production setups.-->

<div style="
    display: table;
    border: 2px solid #0088aa9e;
    border-radius: 5px;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 25px;
    padding: 5px 0 5px 0;
    background-color: rgba(0, 136, 170, 0.04);"><div style="display: table-cell">
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
	Current version of OpenVidu Pro matches <strong>version 2.8.0</strong> of OpenVidu Community Edition. We are not currently charging anything for using OpenVidu Pro, as we intend these first versions to be a beta. The only price you will have to pay is the cost of the Amazon instance, as you would do when <a href="/docs/deployment/deploying-aws/" target="_blank">deploying OpenVidu Community Edition in AWS</a>
</div>
</div>

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