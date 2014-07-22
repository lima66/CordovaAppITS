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