var PATH_TO_FILE = document.currentScript.getAttribute('data-pathToFile');
var ELEMENT_ID = document.currentScript.getAttribute('data-elementId');
var RUN_ANCHOR_SCRIPT = document.currentScript.getAttribute('data-runAnchorScript').toLowerCase() === "true";
var ELEMENT_ID_TO_REMOVE = document.currentScript.getAttribute('data-elementIdToRemove');

function runAjax(pathToFile, elementId, runAnchorScript, elementIdToRemove) {
    $.ajax({
        url: "/common/" + pathToFile,
        context: document.body,
        dataType: "html",
        success: response => {
            $('#' + elementId).html(response);
            if (runAnchorScript) {
                // Transform anchors links to not reload page on click
                $.getScript('/js/anchor-links.js');
                // If the URL contains an anchor, now is the moment to navigate to it
                if (window.location.hash) {
                    setTimeout(() => $(document.body).scrollTop($(window.location.hash).offset().top), 1);
                }
            }
            if (elementIdToRemove != null) {
                // Remove element
                $('#' + elementIdToRemove).remove();
            }
        }
    });
}

runAjax(PATH_TO_FILE, ELEMENT_ID, RUN_ANCHOR_SCRIPT, ELEMENT_ID_TO_REMOVE);
