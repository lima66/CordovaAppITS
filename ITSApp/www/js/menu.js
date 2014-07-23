$(function () {   
    $.ajax({
        url: 'navigator.html',
        type: 'GET',
        timeout:5000,
        success: function (data) {
            var menu = $("#menubar");
            menu.append(data);         
        },
        complete: function () {
            $("#searchIcon").on('click', function () {           
                $("#myModal").modal('show');
            });
            $(".home").on('click', function () {
                $(this).removeClass('linkOn');
                $(this).addClass('linkOn');
               document.location.replace("index.html");
            });
            $("#contatti").on('click', function () {                
                $(this).removeClass('linkOn');
                $(this).addClass('linkOn');
                document.location.replace("Contatti.html");               
            });
            $("#floorplan").on('click', function () {
                document.location.replace("mappa.html");
            });
            $(".channelYoutube").on('click', function () {
                $(this).removeClass('linkOn');
                $(this).addClass('linkOn');               
                appAvailability.check('com.google.android.youtube', function (availability) {
                    // availability is either true or false
                    if (availability) {                   
                        window.open('http://www.youtube.com/user/ConsorzioPordenone', '_system', 'location=yes');
                    }
                    else {
                        window.open('https://play.google.com/store/apps/details?id=com.google.android.youtube', '_system', 'location=yes');
                    };
                });
            });
            $("#SocialFacebook").on('click', function () {     
                            appAvailability.check('com.facebook.katana', function (availability) {
                            // availability is either true or false
                                if (availability) {
                                  window.open('fb://profile/785207184852960', '_system', 'location=yes');                                    
                                }
                                else {
                                    window.open('https://play.google.com/store/apps/details?id=com.facebook.katana', '_system', 'location=yes');                                  
                                };
                            });                     
                 
                
                //if (device.platform == "iPhone") {
                //    var facebookCheck = function () {

                //        appAvailability.check('fb://', function (availability) {
                //            // availability is either true or false
                //            if (availability) { window.open('fb://facebook.com/pages/Fondazione-Istituto-Tecnico-Superiore-Kennedy/785207184852960', '_system', 'location=no'); }
                //            else { window.open('https://itunes.apple.com/it/app/facebook/id284882215?mt=8', '_system', 'location=no'); };
                //        });
                //    };
                //}
            });
            $('.cerca').on("click", function () {
                var keyword = $("#searchInput").val();               
                if (document.title != 'search') {
                    window.location = "Search.html?keyword=" + keyword;
                } else {
                    $("#myModal").modal('hide');
                    popolaPaginaDettaglio(keyword);
                }
            });
            $(".bodyContainer").on("click", function () {
                if ($('#globalizeItems').css('display') == 'block') {
                    $("#globalizeItems").trigger('click');
                    $(document).trigger('click');                    
                }
            });
            $("#globalizer").on("click", function () {              
                $("#globalizeItems").trigger('click');
                if ($('#globalizeItems').css('display') == 'block') {                   
                    $(document).trigger('click');
                }
                if ($(".glyphicon-globe").css("color") == "rgb(255, 0, 0)") {
                    $(".glyphicon-globe").css("color", "black");
                }
            });            
        },
        error: function (data, t, m) {
            if (t === "timeout") {
                alert("timeout menu");
            } else {
                alert("errore importazione navbar");
            }
        }
    });
});