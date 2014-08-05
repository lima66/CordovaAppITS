$(function () {
    var last5 = window.sessionStorage.getItem("last5").split(",");
    for (var x in last5) {
        getLinkNotifica(last5[x]);           
    }
});