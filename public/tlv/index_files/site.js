/// <reference path="jquery-1.8.2.intellisense.js" />
$(document).ready(function () {
    /* Menu */
    $(".iMenu").hover(
      function () {
          var cssClass = $(this).attr("cssClass");
          $(this).addClass("top");
          $("#menu-text-hover").addClass(cssClass).show();
      }, function () {
          $("#menu-text-hover").removeAttr("class").hide();
          $(this).removeClass("top");
      }
    );

    /* Gallery */    
    $("#arrow-right").click(function () {
        galleryNext("right");
    });
    $("#arrow-left").click(function () {
        galleryPrev("left");
    });    
});

/* Gallery */
function galleryNext(dir) {
    var $display = $("#gallery img:visible");
    var $next = $display.hide().next();
    if ($next.length > 0) { $next.show('slide', { direction: dir }, 500); }
    else { $("#gallery img:first").show('slide', { direction: dir }, 500); }
}
function galleryPrev(dir) {
    var $display = $("#gallery img:visible");
    var $prev = $display.hide().prev();
    if ($prev.length > 0) { $prev.show('slide', { direction: dir }, 500); }
    else { $("#gallery img:last").show('slide', { direction: dir }, 500); }
}