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
    if (queryString["eventID"] != null) {
        popolaPaginaDettaglio(queryString["eventID"]);
    }

});

var titolo = $("#Titolo");
var testo = $("#Testo");
var foto = $("#Foto");
var img = $("#imgFoto");
function popolaPaginaDettaglio(eventID) {
    $.ajax({
        url: 'http://192.168.102.2/api/event/' + eventID,
        type: 'GET',
        dataType: "json",
        success: function (eventDetail) {
            titolo.append(eventDetail.Titolo.toUpperCase());
            testo.append(eventDetail.Testo);
            if (eventDetail.UrlFoto != "") {
                img.attr("src",eventDetail.UrlFoto);
            } else {
                foto.remove();
            }         
        }, error: function (eventDetail) {
            alert("errore nella ricerca");
        }
    });
}