var newsContainer = $('#newsContainer');

$(function () {
    $.ajax({
        url: 'http://192.168.102.2/api/news',
        type: 'GET',   
        success: function (data) {
        	var news = new Object();
            for (var news_obj in data) {                
                news.id = data[news_obj].Id;
                news.data = data[news_obj].Data;
                news.titolo = data[news_obj].Titolo;
                news.testo = data[news_obj].Testo;
                news.foto = data[news_obj].Foto;
                var newsCell = '<div class="newsCell" data-newsID="' + news.id + '">'
                                    + '<div class="row dataNews">'
                                        + '<div class="col-md-12 divDateCell"><span class="dateNewsCell">' + news.data + '</span></div>'
                                    + '</div>'
                                    + '<div class="row titoloNews">'
                                        + '<div class="col-md-12"><h4 class="newsTitle">' + news.titolo + '</h4></div>'
                                    + '</div>'
                                    + '<div class="row">'
                                        + '<div class="col-md-2 divNewsImg">'
                                        + '<img src="images/Renovating-Roof.jpg" />'
                                    + '</div>'
                                    + '<div class="col-md-10 divDescriptionNews">'
                                        + '<p class="newsDescription">' + news.testo + '</p>'
                                    + '</div>'
                              + '</div>';

                newsContainer.append(newsCell);
            }

            $('.newsCell').on('click', function () {
                var obj = $(this);
                var id = obj.attr('data-newsID');

                window.location = "NewsDetails.html?newsID=" + id;
            })

        }, error: function (data) {
            $('#BottoneConferma').css('display', 'none');
            $('#userItemsList').html("Errore nel recupero delle info utente");
        }
    });
});