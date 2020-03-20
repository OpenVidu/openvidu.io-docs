$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
    for (var i = 1; i < 14; i++) {

        $('#btn-copy-' + i).bind('click', {id : i}, function (event) {
            window.getSelection().empty();
            var id = event.data.id;
            if (document.selection) {
                var range = document.body.createTextRange();
                range.moveToElementText(document.getElementById('code-' + id));
                range.select().createTextRange();
            } else if (window.getSelection) {
                var range = document.createRange();
                target = document.getElementById('code-' + id);
                range.selectNode(target);
                window.getSelection().addRange(range);
            }
            try {
                var success = document.execCommand('copy');
                if (success) {
                    $('#btn-copy-' + id).trigger('copied', ['Copied!']);
                } else {
                    $('#btn-copy-' + id).trigger('copied', ['Copy with Ctrl-c']);
                }
            } catch (err) {
                $('#btn-copy-' + id).trigger('copied', ['Copy with Ctrl-c']);
            }
        });

        $('#btn-copy-' + i).bind('copied', function (event, message) {
            $(this).attr('title', message)
                .tooltip('fixTitle')
                .tooltip('show')
                .attr('title', "Copy to Clipboard")
                .tooltip('fixTitle');
        });
    }
});