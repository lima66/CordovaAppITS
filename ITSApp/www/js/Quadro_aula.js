var date = new Date();
var menu = false;     
calendario(getDay(), getMonth(), getYear(), 4);
var tab = new Array($("#sectionA"), $("#sectionB"), $("#sectionC"));
var index = 0;
function calendario(giorno, mese, anno, area) {
    $.ajax({
        url: 'http://www.unipordenone.it/mrbs/day.php?day=' + giorno + '&month=' + mese + '&year=' + anno + '&area=' + area,
        type: 'get',
        dataType: 'html',
        timeout: 15000,
        success: function (data) {                   
            tab[index].empty();
            if (!menu) {               
                var startSelect = data.indexOf('<select name="day">');
                var fineSelect = data.indexOf('<span class="weekday">');
                var dateSelect = data.substr(startSelect, (fineSelect - startSelect));
                dateSelect = dateSelect.replace(/<select name="day">/g, '<div class="col-xs-4 box"><select name="day" id="day" style="height:25px;font-size: 20px;">');
                dateSelect = dateSelect.replace(/<select name="month">/g, '<div class="col-xs-4 box"><select name="month" id="month" style="margin:left:2%;height:25px;font-size: 20px;">');
                dateSelect = dateSelect.replace(/<select name="year">/g, '<div class="col-xs-4 box"><select name="year" id="year" style="margin:left:2%;height:25px;font-size: 20px;">');
                dateSelect = dateSelect.replace(/<\/select>/gi, '<\/select><\/div>');
                $(".selectData").append(dateSelect);
                $(".selectData").append('<div class="col-xs-12 box"><button class="btn btn-primary picture" id="pulsante">INVIA</button></div>');
                menu = true;
            }
            var start = data.indexOf('<table id="timetable">');
            var fine = data.indexOf('</table>');                   
            data = data.substr(start, (fine - start) + 8);                    
            tab[index++].append(data);                    
        },
        complete: function () {
            $("#timetable a").bind('click', function (e) {
                e.preventDefault();
            });
            if (area < 6) {
                area += 1;
                calendario(giorno, mese, anno, area);
            } else {
                index = 0;
                area = 4;
            }            
        },
        error: function (data, t, m) {
            if (t === "timeout") {
                alert("timeout menu");
            } else {
                alert("errore importazione calendario");
            }
        }
    });
    $("#pulsante").off();
    $("#pulsante").on("click", function () {
        var day = $('#day').val();
        var month = $('#month').val();
        var year = $('#year').val();              
        calendario(day, month, year, 4);
    });
}

function getYear() {
    return date.getFullYear();
}
function getMonth() {
    return date.getMonth() + 1;
}
function getDay() {
    return date.getDate();
}
