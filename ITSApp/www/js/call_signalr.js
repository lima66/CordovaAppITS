
var urls = ["http://192.168.102.2/signalR/hubs", "js/prova.js"];

$.getScript(urls[0], function (data, text, code) {
    console.log("menu caricato")
})