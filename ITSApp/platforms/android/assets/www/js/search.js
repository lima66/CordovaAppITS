var queryString = new Array();

$(function () {
    if (queryString.length == 0) {
        if (window.location.search.split('?').length > 1) {
            var params = window.location.search.split('?')[1];
            var key = params.split('=')[0];
            var value = params.split('=')[1];
            queryString[key] = value;
        }
    }
    if (queryString["keyword"] != null) {
        popolaPaginaDettaglio(queryString["keyword"]);
    }

});

var events = $(".events");
var news = $(".news");
function popolaPaginaDettaglio(keyword) {
    alert(keyword);
    $.ajax({
        url: 'http://192.168.102.2/search/' + keyword,
        type: 'GET',
        dataType: "json",
        success: function (dato) {
            $(".articolo").remove();
           $('hr').remove();
           for (var x in dato) {            
               if (typeof dato[x].DataEvento != 'undefined') {
                    events.append('<div class="articolo"><a href="EventsDetails.html?eventID=' + dato[x].Id + '"><div id="titolo">TITOLO: ' + dato[x].Titolo + '</div><div id="data">DATA EVENTO: ' + dato[x].DataEvento + '</div><div id="data">DATA PUBBLICAZIONE: ' + dato[x].DataPubblicazione + '</div></a></div><hr>');
                    }
                    else {
                    news.append('<div class="articolo"><a href="NewsDetails.html?newsID=' + dato[x].Id + '"><div id="titolo">TITOLO: ' + dato[x].Titolo + '</div><div id="data">DATA PUBBLICAZIONE: ' + dato[x].DataPubblicazione + '</div></a></div><hr>');
                    }               
            }
        }, error: function (dato) {
            alert("errore ricerca");
        }
    });
}