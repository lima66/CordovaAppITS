var myScroll;
$(function () {
myScroll = new IScroll('#pianoTerra',
   {
       zoom: true,
       zoomMin: 1,
       zoomMax: 4,
       scrollbars: false,
       scrollX: true
   });
myScroll = new IScroll('#primoPiano',
{
    zoom: true,
    zoomMin: 1,
    zoomMax: 4,
    scrollbars: false,
    scrollX: true
});
});