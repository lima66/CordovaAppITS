var eventsContainer = $('#eventContainer');

$(function () {
    $.ajax({
        url: 'http://192.168.102.2/api/events',
        type: 'GET',
        datatype: "json",
        success: function (event) {            
            for (var x in event) {       
               var testo = event[x].Testo;    
                var eventCell = '<div class="newsCell" data-eventID="' + event[x].Id + '">'
                                    + '<div class="row dataNews">'
                                        + '<div class="col-md-12 divDateCell"><span class="dateNewsCell">' + event[x].DataPubblicazione + '</span></div>'
                                    + '</div>'
                                    + '<div class="row titoloNews">'
                                        + '<div class="col-md-12"><h4 class="newsTitle">' + event[x].Titolo + '</h4></div>'
                                    + '</div>'
                                    + '<div class="row">'
                                        + '<div class="col-md-2 col-xs-4 divNewsImg">'
                                        + '<img src="' + event[x].UrlFoto + '" />'
                                    + '</div>'
                                    + '<div class="col-md-10 col-xs-8 divDescriptionNews">'
                                        + '<p class="newsDescription">' + testo.substr(0, 50) + '...</p>'
                                        + '<p class="eventDate">Data Evento : ' + event[x].DataEvento + '</p>'
                                    + '</div>'
                              + '</div>';
                eventsContainer.prepend(eventCell);
            }
            $('.newsCell').on('click', function () {
                var obj = $(this);
                var id = obj.attr('data-eventID');
                window.location = "EventsDetails.html?eventID=" + id;
            });

        }, error: function (data) {
            $('#BottoneConferma').css('display', 'none');
            $('#userItemsList').html("Errore nel recupero ");
        }
    });
});