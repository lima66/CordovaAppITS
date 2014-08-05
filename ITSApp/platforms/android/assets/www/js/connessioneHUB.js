function connectionHub() {
    $.connection.hub.url = "http://192.168.102.2/signalr/";
    var ns = $.connection.notificationHub;
    ns.client.broadcastNotification = function (notifica) {
        if (window.sessionStorage.getItem("last5") != null) {
            var temp = window.sessionStorage.getItem("last5").split(",");
            for (var x = 0; x < temp.length; x++) {
                if (x < temp.length - 1) {
                    temp[x] = temp[x + 1];
                } else {
                    temp[x] = notifica;
                }
            }
            window.sessionStorage.setItem("last5", temp);
        }
        checkColor();
        navigator.notification.vibrate(2000);
        navigator.notification.beep(1);
        globalizerClick();
        window.localStorage.setItem('notificaID', notifica);
        getLinkNotifica(notifica);
    }
    $.connection.hub.start()
      .done(function () {
          console.log("connessione");
      })
      .fail(function () {
          alert("Connessione non riuscita");
          console.log("connessione getRedisNews fail");
      });
}