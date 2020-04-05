var PATH_TO_FILE = document.currentScript.getAttribute('data-pathToFile');
var ELEMENT_ID = document.currentScript.getAttribute('data-elementId');
var RUN_ANCHOR_SCRIPT = document.currentScript.getAttribute('data-runAnchorScript').toLowerCase() === "true";

function runAjax(pathToFile, elementId, runAnchorScript) {
    $.ajax({
        url: "https://docs.openvidu.io/en/stable/common/" + pathToFile,
        // url: "http://127.0.0.1:8000/common/" + pathToFile,
        context: document.body,
        dataType: "html",
        success: response => {
            $('#' + elementId).html(response);
            if (runAnchorScript) {
                // Transform anchors links to not reload page on click
                $.getScript('js/anchor-links.js');
                // If the URL contains an anchor, now is the moment to navigate to it
                if (window.location.hash) {
                    setTimeout(() => $(document.body).scrollTop($(window.location.hash).offset().top), 1);
                }
            }
        }
    });
}

runAjax(PATH_TO_FILE, ELEMENT_ID, RUN_ANCHOR_SCRIPT);