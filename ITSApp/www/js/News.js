var newsContainer = $('#newsContainer');

$(function () {
    $.ajax({
        url: 'http://192.168.102.2/api/news',
        type: 'GET',
        datatype: "json",
        success: function (news) {        
            for (var x in news){         
                var testo = news[x].Testo;
                var newsCell = '<div class="newsCell" data-newsID="' + news[x].Id + '">'
                                    + '<div class="row dataNews">'
                                        + '<div class="col-md-12 divDateCell"><span class="dateNewsCell">' + news[x].DataPubblicazione + '</span></div>'
                                    + '</div>'
                                    + '<div class="row titoloNews">'
                                        + '<div class="col-md-12"><h4 class="newsTitle">' + news[x].Titolo + '</h4></div>'
                                    + '</div>'
                                    + '<div class="row">'
                                        + '<div class="col-md-2 col-xs-4 divNewsImg">'
                                        + '<img src="' + news[x].UrlFoto + '" />'
                                    + '</div>'
                                    + '<div class="col-md-10 col-xs-8 divDescriptionNews">'
                                        + '<p class="newsDescription">' + testo.substr(0, 50) + '...</p>'
                                    + '</div>'
                              + '</div>';
                newsContainer.prepend(newsCell);
            }
                $('.newsCell').on('click', function () {
                    var obj = $(this);
                    var id = obj.attr('data-newsID');
                    window.location = "NewsDetails.html?newsID=" + id;
                });
        }, error: function (data) {
            $('#BottoneConferma').css('display', 'none');
            $('#userItemsList').html("Errore nel recupero delle info utente");
        }
    });
});