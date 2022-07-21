var PATH_TO_FILE = document.currentScript.getAttribute('data-pathToFile');
var ELEMENT_ID = document.currentScript.getAttribute('data-elementId');
var ELEMENT_ID_TO_REMOVE = document.currentScript.getAttribute('data-elementIdToRemove');
var RUN_ANCHOR_SCRIPT = loadBooleanVariable('data-runAnchorScript');
var USE_CURRENT_VERSION = loadBooleanVariable('data-useCurrentVersion');

function runAjax(pathToFile, elementId, runAnchorScript, elementIdToRemove, useCurrentVersion) {

    // PROD
    var url = "https://docs.openvidu.io/en/stable/common/" + pathToFile;
    if (useCurrentVersion) {
        // "https://docs.openvidu.io" + "/en/VERSION" + "/common/" + pathToFile
        url = window.location.origin + window.location.pathname.split('/').slice(0, 3).join('/') + '/common/' + pathToFile;
    }

    // DEV
    // var url = "http://localhost:8000/common/" + pathToFile;

    $.ajax({
        url,
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
            if (elementIdToRemove != null) {
                // Remove element
                $('#' + elementIdToRemove).remove();
            }
        }
    });
}

function loadBooleanVariable(variableName) {
    var BOOLEAN_VAR = document.currentScript.getAttribute(variableName);
    if (typeof BOOLEAN_VAR === 'undefined' || BOOLEAN_VAR === null) {
        BOOLEAN_VAR = false;
    } else {
        BOOLEAN_VAR = BOOLEAN_VAR.toLowerCase() === "true";
    }
    return BOOLEAN_VAR;
}

runAjax(PATH_TO_FILE, ELEMENT_ID, RUN_ANCHOR_SCRIPT, ELEMENT_ID_TO_REMOVE, USE_CURRENT_VERSION);
