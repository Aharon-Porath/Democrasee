var rtime = new Date(1, 1, 2000, 12, 00, 00);
var timeout = false;

var FullScreenResize = {
       
    delta: 0,// 200,
    containerWidth: 1214,
    containerHeight: 800,
    maxBgHeight: 800,
    topDelta: 0,
    adminMenuHeight: 0,

    resizeend: function () {
        if (new Date() - rtime < this.delta) {
            setTimeout(this.resizeend, this.delta);
        } else {
            timeout = false;
            FullScreenResize.setBackgroundHeight();
            FullScreenResize.setBackgroundWidth();
        }
    },

    setBackgroundHeight: function() {
        var windowHeight = $(window).height();
        var bg_height = this.maxBgHeight;
        var bg_top = (bg_height - windowHeight) / 2;
        //console.log("windowHeight: " + windowHeight + " bg_top: " + bg_top + " adminMenuHeight: " + this.adminMenuHeight);        
        bg_top = windowHeight < this.containerHeight ? this.topDelta : bg_top;
        bg_top -= this.adminMenuHeight;
        bg_top = bg_top < 0 ? 0 : bg_top;
        $('.bgpos').css("background-position", "center -" + bg_top + "px");
        $("#container").css("top", "-" + bg_top + "px");
    },

    setBackgroundWidth: function() {
        var windowWidth = $(window).width();
        var bg_width = this.containerWidth;
        var bg_left = (bg_width - windowWidth) / 2;
        if (bg_left > 0) {
            $("#container").css("left", "-" + bg_left + "px");
        }
        else {
            $("#container").css("left", "0");
        }
    },

    log: function (msg) { try { console.log(msg); } catch (e) { } },
    end: function () { }
};

$(document).ready(function () {

    $(".bodyContent").addClass("bgpos");
    FullScreenResize.setBackgroundHeight();
    FullScreenResize.setBackgroundWidth();   

    $(window).resize(function () {
        rtime = new Date();
        if (timeout === false) {
            timeout = true;
            setTimeout(FullScreenResize.resizeend, FullScreenResize.delta);
        }               
    });

});