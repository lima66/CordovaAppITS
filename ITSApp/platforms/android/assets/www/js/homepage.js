var numeroNewsDaMostrareInHomePage = 4; // +1 :)
var numeroEventiDaMostrareInHomePage = 4; // +1 :)
var arrow = $(".carousel-control").hide();
var carousel = $("#carousel-example-generic");

$(document).ready(function () {
    carousel.hover(handlerIn, handlerOut);
    $('.carousel').carousel({
        interval: 5000
    });
    lastNews();
    nextEvents()
});

function handlerIn() {
    arrow.show();
}

function handlerOut() {
    arrow.hide();
}
function lastNews() {
    $.ajax({
        url: 'http://192.168.102.2/api/news/last',
        type: 'GET',
        dataType: "json",
        timeout: 5500,
        success: function (data) {           
            var news = new Object();
            for (var i = 0; i <= numeroEventiDaMostrareInHomePage; i++) {
                news.id = data[i].Id;
                news.data = data[i].Data;
                news.titolo = data[i].Titolo;
                news.testo = data[i].Testo;
                news.foto = data[i].Foto;
                var lastNewsCell = '<li><a href="NewsDetails.html?newsID=' + news.id + '">' + news.titolo + '</a></li>';
                $('#lastNews').append(lastNewsCell);                
            }
        },       
        error: function (data, t, m) {
            if (t === "timeout") {
                console.log("got timeout news");
                $('#lastNews').append('<p>timeout news</p>');
            } else {
                console.log("errore nel recupero news");
                $('#lastNews').append('<p>errore nel recupero news</p>');
            }
        }
    });
}

function nextEvents() {
    $.ajax({
        url: 'http://192.168.102.2/api/events/last',
        type: 'GET',
        dataType: "json",
        timeout: 5500,
        success: function (data) {         
            var event = new Object();
            for (var i = 0; i <= numeroEventiDaMostrareInHomePage; i++) {
                event.id = data[i].Id;
                event.data = data[i].Data;
                event.titolo = data[i].Titolo;
                event.testo = data[i].Testo;
                event.foto = data[i].Foto;
                var EventCell = '<li><a href="EventsDetails.html?eventID=' + event.id + '">' + event.titolo + '</a></li>';
                $('#nextEvents').append(EventCell);
            }
        }, error: function (data, t, m) {
            if (t === "timeout") {
                console.log("timeout event");
                $('#nextEvents').append('<p>timeout event</p>');
            } else {
                console.log("errore nel recupero eventi");
                $('#nextEvents').append('<p>errore nel recupero eventi</p>');
            }
        }
    });
}