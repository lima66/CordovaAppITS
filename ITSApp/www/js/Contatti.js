function initialize() {

    var myLatlng = new google.maps.LatLng(46.505341, 13.577367);

    var mapOptions = {
        center: myLatlng,
        zoom: 8
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"),
        mapOptions);

    var marker = new google.maps.Marker({
        position: myLatlng,
        title: "Spazzacamino Franz"
    });

    marker.setMap(map);
}

google.maps.event.addDomListener(window, 'load', initialize);

$(function () {
    $('#inviaEmail').on('click', function (e) {
        e.preventDefault();
        var email = new Object();
        email.Sender = $('#sender').val();
        email.From = $('#from').val();
        email.Subject = $('#subject').val();
        email.Message = $('#message').val();

        //var xhr = new XMLHttpRequest();
        //xhr.open('POST', 'http://192.168.102.2/mailservice');
        //xhr.setRequestHeader('Content-Type', 'Application/json');
        //xhr.send(email);
        //xhr.onreadystatechange = function () {
        //    if (xhr.readyState == 4 && xhr.status == 200) {
        //        console.log(xhr.responseText);
        //    }
        //}

        $.ajax({
            type: "POST",
            url: "http://192.168.102.2/mailservice",
            data: JSON.stringify(email),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            processData: true,
            success: function (obj, status, jqXHR) {
                console.log("inviata");
            },
            error: function (xhr) {
                console.log("errror " + xhr.responseText);
            }
        });
    });
});