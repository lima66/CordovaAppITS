var eventsContainer = $('#eventContainer');

$(function () {
    $.ajax({
        url: 'http://192.168.102.2/api/events',
        type: 'GET',
        success: function (data) {
        	var event = new Object();
            for (var event_obj in data) {                
                event.id = data[event_obj].Id;
                event.data = data[event_obj].Data;
                event.titolo = data[event_obj].Titolo;
                event.testo = data[event_obj].Testo;
                event.foto = data[event_obj].Foto;
                var eventCell = '<div class="newsCell" data-eventID="' + event.id + '">'
                                    + '<div class="row dataNews">'
                                        + '<div class="col-md-12 divDateCell"><span class="dateNewsCell">' + event.data + '</span></div>'
                                    + '</div>'
                                    + '<div class="row titoloNews">'
                                        + '<div class="col-md-12"><h4 class="newsTitle">' + event.titolo + '</h4></div>'
                                    + '</div>'
                                    + '<div class="row">'
                                        + '<div class="col-md-2 divNewsImg">'
                                        + '<img src="images/Renovating-Roof.jpg" />'
                                    + '</div>'
                                    + '<div class="col-md-10 divDescriptionNews">'
                                        + '<p class="newsDescription">' + event.testo + '</p>'
                                    + '</div>'
                              + '</div>';
                eventsContainer.append(eventCell);
            }
            $('.newsCell').on('click', function () {
                var obj = $(this);
                var id = obj.attr('data-eventID');
                window.location = "EventsDetails.html?eventID=" + id;
            })

        }, error: function (data) {
            $('#userItemsList').html("Errore nel recupero delle informazioni");
        }
    });
});