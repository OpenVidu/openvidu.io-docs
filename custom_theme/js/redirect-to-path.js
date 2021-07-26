var PATH_TO_REDIRECT = document.currentScript.getAttribute('data-pathToRedirect');

window.onload = function() {
    const pathSplitted = window.location.pathname.split("/").filter(function (el) {
        return el.length != 0
    });
    const urlVersion = pathSplitted[1];
    const redirectPathname = '/en/' + urlVersion + PATH_TO_REDIRECT;
    const hash = !!window.location.hash ? window.location.hash : '';
    window.location = window.location.protocol + '//' + window.location.host + redirectPathname + hash;
}