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
    $.ajax({
        url: 'http://192.168.102.2/search/' + keyword,
        type: 'GET',
        dataType: "json",
        success: function (dato) {
            $(".articolo").remove();
           $('hr').remove();
            for (var x in dato) {
                for (var y in dato[x]) {
                    if (x == 0) {                       
                        events.append('<a href="EventsDetails.html?eventID='+ dato[x][y].Id + '"><div class="articolo"><div id="titolo">' + dato[x][y].Titolo + '</div></div><div id="testo">' + dato[x][y].Testo + '</div><div id="data">' + dato[x][y].Data + '</div></div></a><hr>');
                    }
                    if (x == 1) {
                        news.append('<a href="NewsDetails.html?newsID='+ dato[x][y].Id + '"><div class="articolo"><div id="titolo">' + dato[x][y].Titolo + '</div></div><div id="testo">' + dato[x][y].Testo + '</div><div id="data">' + dato[x][y].Data + '</div></div></a><hr>');
                    }
                }
            }
        }, error: function (dato) {
            alert("errore ricerca");
        }
    });
}