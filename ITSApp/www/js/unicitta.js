$(function () {
    $(".link").on('click', function () {
        var link = $(this).data("link");       
        window.open('' + link, '_system', 'location=yes');
    });
});