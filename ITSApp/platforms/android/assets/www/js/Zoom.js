var myScroll;
$(function () {
    myScroll = new IScroll('#wrapper',
    {
        zoom: true,
        zoomMin: 1,
        zoomMax: 4,
        scrollbars: false,
        scrollX: true
    });
});
document.addEventListener('DOMContentLoaded', loaded, false);
