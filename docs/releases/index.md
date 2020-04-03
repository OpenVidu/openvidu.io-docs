<div id="releases-content"></div>
<script>
    $.ajax({
        url: "https://docs.openvidu.io/en/stable/common/releases-content/index.html",
        context: document.body,
        success: response => {
            $('#releases-content').html(response);
        }
    });
</script>