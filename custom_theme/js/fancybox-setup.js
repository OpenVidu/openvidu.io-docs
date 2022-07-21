$("a.fancybox-img").fancybox({
  infobar: true,
  arrows: false,
  loop: true,
  protect: true,
  transitionEffect: "slide",
  buttons: ["close"],
  clickOutside: "close",
  clickSlide: "close",
  iframe: {
    css: {
      margin: 0,
      background: "none",
    },
    preload: false,
  },
  afterShow: () => {
    var iframe = $(".fancybox-iframe");
    if (!!iframe.get(0)) {
      var videoJquery = iframe.contents().find("video");
      var video = videoJquery.get(0);
      if (!!video) {
        video.controls = false;
        video.loop = true;
        video.muted = true;
        videoJquery.attr("playsinline", "");
        video.play();
      }
    }
  },
});
