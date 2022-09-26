# OpenVidu Components

## What is it

OpenVidu Components is a new frontend framework built for making videoconferencing applications for OpenVidu in the simplest possible way. It is an **npm library** (currently available for **Angular**) that provides the developer **powerful and complete videoconferencing components**. These components can be adapted, extended and replaced very easily to suit your application's needs.

> _OpenVidu Components_ is only one of the three strategies available to integrate OpenVidu in your application's client. You can take a look to sections [Ready-to-use component](ready-to-use-component/) or [Full control of the UI](full-control-ui/) to explore the other alternatives.

<div class="pro-gallery" style="margin: 40px 40px 60px 40px">
    <a data-fancybox="gallery" data-type="iframe" class="fancybox-img" href="/video/components/ov-call.mp4">
        <video class="img-responsive img-wellcome" src="/video/components/ov-call.mp4" muted playsinline autoplay loop async></video>
    </a>
    <a data-fancybox="gallery" data-type="iframe" class="fancybox-img" href="/video/components/custom-panels.mp4">
        <video class="img-responsive img-wellcome" src="/video/components/custom-panels.mp4" muted playsinline autoplay loop async></video>
    </a>
    <a data-fancybox="gallery" data-type="iframe" class="fancybox-img" href="/video/components/additional-panels.mp4">
        <video class="img-responsive img-wellcome" src="/video/components/additional-panels.mp4" muted playsinline autoplay loop async></video>
    </a>
    <a data-fancybox="gallery" data-type="iframe" class="fancybox-img" href="/video/components/participant-panel-item-element.mp4">
        <video class="img-responsive img-wellcome" src="/video/components/participant-panel-item-element.mp4" muted playsinline autoplay loop async></video>
    </a>
    <a data-fancybox="gallery" data-type="iframe" class="fancybox-img" href="/video/components/participant-panel-item.mp4">
        <video class="img-responsive img-wellcome" src="/video/components/participant-panel-item.mp4" muted playsinline autoplay loop async></video>
    </a>
    <a data-fancybox="gallery" data-type="iframe" class="fancybox-img" href="video/components/toggle-hand.mp4">
        <video class="img-responsive img-wellcome" src="video/components/toggle-hand.mp4" muted async loop autoplay playsinline></video>
    </a>
</div>

The main goal always pursued by the OpenVidu team is to reduce to a minimum the developer's effort when creating videoconferencing applications. OpenVidu Components can greatly assist in this goal for the following reasons:

- It avoids having to start from scratch and avoids low-level details. You can have the first version of your application up and running in minutes, and work on your customizations from there.
- It offers as much customization as possible. Adapt, extend and replace any component however you want.
- It keeps your code up to date. Using OpenVidu Components means that your application will be much easier to update after each new OpenVidu release.

Nothing better than a real example to see the potential of OpenVidu Components. Our production-ready flagship application **[OpenVidu Call](https://openvidu.io/openvidu-call)** is developed using OpenVidu Components.

## Where to start

OpenVidu components is currently available for **Angular** framework. You can check the openvidu-angular documentation **[here](api/openvidu-angular/)**.

There are also multiple tutorials available that show the benefits of OpenVidu Components and guide you step by step through each customization process. These tutorials cover everything OpenVidu Components offers, from customizing colors and branding logos to injecting new features:

- [**openvidu-custom-ui**](components/openvidu-custom-ui/): learn how to customize the UI.
- [**openvidu-custom-toolbar**](components/openvidu-custom-toolbar/): learn how to replace the default toolbar with your own.
- [**openvidu-toolbar-buttons**](components/openvidu-toolbar-buttons/): learn how to add custom buttons to the toolbar.
- [**openvidu-toolbar-panel-buttons**](components/openvidu-panel-buttons/): learn how to add custom panel buttons to the toolbar.
- [**openvidu-custom-layout**](components/openvidu-custom-layout): learn how to replace the default layout with your own.
- [**openvidu-custom-stream**](components/openvidu-custom-stream): learn how to replace the default stream with your own.
- [**openvidu-custom-panels**](components/openvidu-custom-panels): learn how to replace the default panels with your own.
- [**openvidu-additional-panel**](components/openvidu-additional-panels): learn how to add a new extra panel besides the default ones.
- [**openvidu-custom-chat-panel**](components/openvidu-custom-chat-panel): learn how to replace the default chat panel with your own.
- [**openvidu-custom-activities-panel**](components/openvidu-custom-activities-panel): learn how to replace the default activities panel with your own.
- [**openvidu-custom-participants-panel**](components/openvidu-custom-participants-panel): learn how to replace the default participants panel with your own.
- [**openvidu-custom-participant-panel-item**](components/openvidu-custom-participant-panel-item): learn how to replace the default participant panel item with your own.
- [**openvidu-custom-participant-panel-item-element**](components/openvidu-custom-participant-panel-item-element): learn how to replace the default participant panel item element with your own.
- [**openvidu-toggle-hand**](components/openvidu-toggle-hand): learn how to add extra features to the videoconference.
- [**openvidu-call**](components/openvidu-call): OpenVidu's production-ready flagship application.

## What about other frontend frameworks

Supporting the most popular frontend frameworks is in our roadmap, but for the moment OpenVidu Components is only available for **Angular applications**.

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js"></script>
<script type='text/javascript' src='js/fancybox-setup.js'></script>

<link rel="stylesheet" type="text/css" href="css/downloads/slick-1.6.0.css"/>
<link rel="stylesheet" type="text/css" href="css/slick-theme.css"/>
<script type="text/javascript" src="https://cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js"></script>

<script>
    $('.pro-gallery').slick({
      autoplay: false,
      arrows: true,
      prevArrow: '<div class="slick-btn slick-btn-prev"><i class="icon ion-chevron-left"></i></div>',
      nextArrow: '<div class="slick-btn slick-btn-next"><i class="icon ion-chevron-right"></i></div>',
      autoplaySpeed: 5000,
      dots: true,
      infinite: true,
      pauseOnHover: true,
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
