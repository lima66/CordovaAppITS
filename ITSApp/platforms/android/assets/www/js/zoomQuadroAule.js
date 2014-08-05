var myScroll;
$(function () {
    myScroll = new IScroll('#sectionA',
    {
        zoom: true,
        zoomMin: 0.1,
        zoomMax: 4,
        zoomStart: 0.3,
        scrollbars: false,
        scrollX: true
    });
    myScroll = new IScroll('#sectionB',
   {
       zoom: true,
       zoomMin: 0.1,
       zoomMax: 4,
       zoomStart: 0.3,
       scrollbars: false,
       scrollX: true
   });
    myScroll = new IScroll('#sectionC',
   {
       zoom: true,
       zoomMin: 0.1,
       zoomMax: 4,
       zoomStart:0.3,
       scrollbars: false,
       scrollX: true
   });
});