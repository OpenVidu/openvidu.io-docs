function onElementAvailable(selector, callback) {
  const observer = new MutationObserver((mutations) => {
    if (document.querySelector(selector)) {
      observer.disconnect();
      callback(document.querySelector(selector));
    }
  });
  observer.observe(document.body != null ? document.body : document.documentElement, { childList: true, subtree: true });
}

onElementAvailable("a#sign-in-button", (elm) => {
  elm.href = "https://openvidu.io/account/";
});
