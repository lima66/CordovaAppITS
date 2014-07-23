var msg;
var wakelocked = false;
$(document).ready(function () {
    document.addEventListener("deviceready", onDeviceReady.bind(this), false);
});
    // Cordova is loaded and it is now safe to make calls Cordova methods
function onDeviceReady() {  
    document.addEventListener("offline",offline.bind(this), false);
    document.addEventListener('pause',onPause.bind(this), false);
    document.addEventListener("backbutton",onBackButton.bind(this), false);
    document.addEventListener("resume", onResume.bind(this), false);
    document.addEventListener("online", online.bind(this), false);    
}
function online() {
    getNewsRedisAndConnectToSignalR();
}
function onResume() {
    msg = false;
    window.plugin.backgroundMode.disable();
    getNewsRedisAndConnectToSignalR();
}
//Tiene in funzione l'app quando è in background
function onPause() {
    msg = true;
    window.plugin.backgroundMode.enable();        
}
function backgroundMessage(id, tipo, titolo) {
    window.plugin.notification.local.add({
        title: "<< UNIPORDENONE >>",
        message: titolo,
        smallIcon: 'ic_dialog_email',
        icon: 'file://images/logo.png',
        sound: 'TYPE_ALARM',
        led: '0000FF' ,
        autoCancel: true
    });
    window.plugin.notification.local.onclick = function () {        
        if (tipo == 'Event') {
            window.location = "EventsDetails.html?eventID=" + id;
        }
        if (tipo == 'News') {
            window.location = "NewsDetails.html?newsID=" + id;
        }       
    };
}
function appendMessage(id, tipo, titolo) {   
    var notification;
    if (tipo == 'Event') {
        notification = '<a href="EventsDetails.html?eventID=' + id + '"><li>' + titolo + '</li></a>';
    }
    if (tipo == 'News') {
        notification = '<a href="NewsDetails.html?newsID=' + id + '"><li>' + titolo + '</li></a>';
    }
    var ul = document.getElementById("globalizeItems");
    var totalLi = ul.children.length;
    if(totalLi <= 4){    
        $("#globalizeItems").prepend(notification); 
    } else {
        var list = document.getElementById("globalizeItems");
        list.removeChild(list.childNodes[4]);
        $("#globalizeItems").prepend(notification);
    }
}
function checkColor() {
    if ($(".glyphicon-globe").css("color") != "red") {
        $(".glyphicon-globe").css("color", "red");
    }
}
function globalizerClick() {
    $("#globalizer").off();
    $("#globalizer").on("click", function () {
            $("#globalizeItems").toggle();
        if ($(".glyphicon-globe").css("color") == "rgb(255, 0, 0)") {
            $(".glyphicon-globe").css("color", "black");
        }
    });
}
//Si attiva quando premi il tasto back del telefono
function onBackButton(e) {
    if ($("#myModal").css('display') == 'block') {
        $("#myModal").modal('hide');        
        return;
    }
    if ($('#globalizeItems').css('display') == 'block') {       
        $("#globalizeItems").trigger('click');
        $(document).trigger('click');
        return;
    }
    if (document.title == 'index') {
        navigator.notification.confirm(
        'Do you really want to exit?',
         exitFromApp,
        'Exit',
        'Cancel,OK'
         );
    }
    else {
        navigator.app.backHistory();
    }
    
}
function AjaxCall(link,id,type) {
    $.ajax({
        url: link,
        async:false,
        type: 'get',
        datatype: 'json',
        success: function (notifica) {
            if (msg) {
                backgroundMessage(id, type,notifica.Titolo);
            }
            appendMessage(id, type,notifica.Titolo);
        },
        error: function (data) {
            console.log("errore ricezione titolo");
        }
    });
}
function getLinkNotifica(notifica) {
    var type;
    var id;
    var link;
    type = notifica.substr(0, notifica.indexOf('_'));
    id = notifica.substr(notifica.lastIndexOf('_') + 1, notifica.length);
    link = 'http://192.168.102.2/api/' + type + "/" + id;    
    AjaxCall(link, id, type);
}
function getNewsRedisAndConnectToSignalR() {
    $.connection.hub.url ="http://192.168.102.2/signalr/";
    var ns = $.connection.notificationHub;
    ns.client.broadcastNotification = function (notifica) {
        checkColor();
        navigator.notification.vibrate(2000);
        navigator.notification.beep(1);         
        globalizerClick();
        localStorage.setItem('notificaID', notifica);
        getLinkNotifica(notifica);        
    }   
    /*Funzione che riceve le nuove notifiche dal server prese da redis */
    ns.client.incomingNotifications = function (redisNewNotification) {
        if (localStorage.getItem('notificaID') != redisNewNotification[4]){
            checkColor();
            navigator.notification.vibrate(2000);
            navigator.notification.beep(1); 
        }
        globalizerClick();
        for (var x in redisNewNotification) {
            getLinkNotifica(redisNewNotification[x]);
            localStorage.setItem('notificaID', redisNewNotification[x]);
        }      
    }
    $.connection.hub.start()
      .done(function () {
          if (localStorage.getItem('notificaID') != null) {
               ns.server.getRedisNews(localStorage.getItem('notificaID'));
          } else {
              ns.server.getRedisNews(""); //ricevere ultime 5 news 
          }
      })
      .fail(function () {
          alert("Connessione non riuscita");
          console.log("connessione getRedisNews fail");
      });
}
function offline() {
    navigator.notification.vibrate(1100);
    navigator.notification.confirm(
    'App offline non funziona.Exit?',
     exitFromApp,
    'Exit',
    'Cancel,OK'
    );
}
function exitFromApp(buttonIndex) {
    if (buttonIndex == 2) {        
        navigator.app.exitApp();
    }
}
