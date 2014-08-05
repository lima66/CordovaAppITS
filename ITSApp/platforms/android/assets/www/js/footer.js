$(function () {
    $.ajax({
        url: 'footer.html',
        type: 'GET',
        async: false,
        timeout: 5000,
        success: function (footer) {
            var body = $("body");
            body.append(footer);
        },
        complete:function(){
            $(".channelYoutube").on('click', function () {
                appAvailability.check('com.google.android.youtube', function (availability) {
                    // availability is either true or false
                    if (availability) {
                        window.open('http://www.youtube.com/user/ConsorzioPordenone', '_system', 'location=yes');
                    }
                    else {
                        window.open('https://play.google.com/store/apps/details?id=com.google.android.youtube', '_system', 'location=yes');
                    };
                });
            });
            $(".home").on('click', function () {
                document.location.href="index.html";
            });
            $("#contatti").on('click', function () {
                document.location.href="Contatti.html";
            });
        },
        error: function (data, t, m) {
            if (t === "timeout") {
                console.log("timeout footer");
            } else {
                console.log("errore importazione footer");
            }
        }
    });
});