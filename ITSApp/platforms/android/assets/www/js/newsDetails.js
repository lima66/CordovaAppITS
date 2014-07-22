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
    if (queryString["newsID"] != null) {
        popolaPaginaDettaglio(queryString["newsID"]);
    }

});
var titolo =$("#Titolo");
var testo =$("#Testo");
var foto = $("#Foto");
var img = $("#imgFoto");
function popolaPaginaDettaglio(newsID) {
    $.ajax({
        url: 'http://192.168.102.2/api/news/' + newsID,
        type: 'GET',
        dataType: "json",
        success: function (newsDetail) {           
            titolo.append(newsDetail.Titolo);
            testo.append(newsDetail.Testo);
            if (newsDetail.UrlFoto != "") {
                img.attr("src",newsDetail.UrlFoto);
            } else {
                foto.remove();
            }
        }, error: function (newsDetail) {
            alert("errore nella ricerca");
        }
    });
}