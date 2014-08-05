var msg = false;
var i = 0;//indice per appendmessage
$(function () {
    //alert("body "+$("body").height());
    //alert($(document).height());
    //alert("container " + $(".bodyContainer").height());
    if ($("body").height() < $(document).height()) {
        $(".modal-footer").css("margin-top", (($("body").height() - $(".bodyContainer").height()) + 5));
    }
    i = 0;
    if (document.title == "last5") {
        var last5 = window.sessionStorage.getItem("last5").split(",");
        $("#last5").empty();
        for (var x in last5) {
            getLinkNotifica(last5[x], last5.length);
        }
    }
});
$(document).ready(function () {
    document.addEventListener("deviceready", onDeviceReady.bind(this), false);
});
    // Cordova is loaded and it is now safe to make calls Cordova methods
function onDeviceReady() {  
    document.addEventListener("offline",offline, false);
    document.addEventListener('pause',onPause, false);
    document.addEventListener("backbutton",onBackButton, false);
    document.addEventListener("resume", onResume, false);
    document.addEventListener("online", online, false);
    document.addEventListener("menubutton", onMenu, false);
    if(window.sessionStorage.getItem("last5")== null){
    	getNewsRedisAndConnectToSignalR();
    }else{
    	extractRedisNotification();
    }    
}
function onMenu() {
    $(".navbar-toggle").trigger('click');
}
function online() {
	if(window.sessionStorage.getItem("last5")== null){
    	getNewsRedisAndConnectToSignalR();
    }else{
    	extractRedisNotification();
    }
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
function appendMessage(id, tipo, titolo, data, foto, index) {
    data = data.substr(0, data.lastIndexOf("/") + 5);
    if(i < index){
    var notification;
    if (tipo == 'Event') {
        notification = '<a href="EventsDetails.html?eventID=' + id + '"><div class="col-md-12"><div class="row"><div class="col-xs-4"><img id="fotoDesc" src="" style="width:100%;height:auto;"style="width:100%;height:auto;"></div><div class="col-xs-8">' + titolo + '</div></div><div class="col-xs-12"><p>Data pubblicazione: ' + data + '</p></div></div></a><hr />';
    }
    if (tipo == 'News') {
        notification = '<a href="NewsDetails.html?newsID=' +
           +id + '"><div class="col-md-12"><div class="row"><div class="col-xs-4"><img id="fotoDesc" src="" style="width:100%;height:auto;"></div><div class="col-xs-8">' + titolo + '</div></div><div class="col-xs-12"><p>Data pubblicazione: ' + data + '</p style="text-align:center;"></div></div></a><hr />';
    }
    $("#last5").prepend(notification);
    if (foto == "" || foto == NaN) {
        $("#fotoDesc").remove();
    } else {
        $("#fotoDesc").attr("src", foto);
    }
    i++;
    }
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
function AjaxCall(link, id, type, index) {
    $.ajax({
        url: link,
        async: false,
        type: 'get',
        datatype: 'json',
        success: function (notifica) {
            if (msg) {
                backgroundMessage(id, type, notifica.Titolo);
            }
            if (document.title == 'last5') {
                appendMessage(id, type, notifica.Titolo, notifica.DataPubblicazione, notifica.UrlFoto, index);
            }
        },
        error: function (data) {
            console.log("errore ricezione titolo");
        }
    });
}
function getLinkNotifica(notifica, index) {
    var type;
    var id;
    var link;
    type = notifica.substr(0, notifica.indexOf('_'));
    id = notifica.substr(notifica.lastIndexOf('_') + 1, notifica.length);
    link = 'http://192.168.102.2/api/' + type + "/" + id;
    AjaxCall(link, id, type, index);
}

function checkColor() {
    if ($(".glyphicon-globe").css("color") != "red") {
        $(".glyphicon-globe").css("color", "red");
    }
}
function globalizerClick() {
    $("#globalizer").off();
    $("#globalizer").on("click", function () {   
    if ($(".glyphicon-globe").css("color") == "rgb(255, 0, 0)") {
            $(".glyphicon-globe").css("color", "black");
    }
    window.location.href = "last5.html";
    });
}
//Si attiva quando premi il tasto back del telefono
function onBackButton(e) {
    e.preventDefault();
    if ($("#myModal").css('display') == 'block') {
        $("#myModal").modal('hide');        
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


function extractRedisNotification(){
	var last5 = window.sessionStorage.getItem("last5").split(",");
    for (var x in last5) {
        getLinkNotifica(last5[x]);           
    }
}
function getNewsRedisAndConnectToSignalR() {
    $.connection.hub.url ="http://192.168.102.2/signalr/";
    var ns = $.connection.notificationHub;
    ns.client.broadcastNotification = function (notifica) {
        if(document.title == 'index'){
    	    lastNews();
    	    nextEvents();
        }
    	if(window.sessionStorage.getItem("last5")!= null){
    		var temp = window.sessionStorage.getItem("last5").split(",");
    		for(var x = 0; x < temp.length;x++){
    			if(x < temp.length - 1){
    				temp[x] = temp[x+1];
    			}else{
    				temp[x] = notifica;
    			}
    		}
    		window.sessionStorage.setItem("last5",temp);
    	}
        checkColor();
        navigator.notification.vibrate(2000);
        navigator.notification.beep(1);     
        globalizerClick();
        getLinkNotifica(notifica,1);        
    }   
    /*Funzione che riceve le nuove notifiche dal server prese da redis */
    ns.client.incomingNotifications = function (redisNewNotification) {
        var length = redisNewNotification.length - 1;
    	window.sessionStorage.setItem("last5",redisNewNotification);
        if (window.localStorage.getItem('notificaID') != redisNewNotification[length] || msg){
            checkColor();
            navigator.notification.vibrate(2000);
            navigator.notification.beep(1);  
            if (document.title == 'index') {
                lastNews();
                nextEvents();
            }
        } 
        globalizerClick();
        for (var x in redisNewNotification) {           		 
        		 window.localStorage.setItem('notificaID', redisNewNotification[x]);    	      	        
        }        
    }
    $.connection.hub.start()
      .done(function () {
          if (window.localStorage.getItem('notificaID') != null) {              
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
