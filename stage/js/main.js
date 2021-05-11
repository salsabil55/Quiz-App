$(function () {
  "use strict";

  $(".toggle-sidebar").on("click", function () {
    $(".content-area, .sidebar").toggleClass("no-sidebar");
  });

  $(".toggle-submenu").on("click", function () {
    $(this).find(".fa-angle-right").toggleClass("down");
    $(this).next(".child-links").slideToggle();
    console.log("okaaaaaa");
  });

  //toggle setting
  $(".toggle-setting").on("click", function () {
    $(this).find("i").toggleClass("fa-cog fa-spin fa-chevron-right");
    $(this).parent().toggleClass("hidden-setting");
  });

  //   switch color
  var themeClasses = [];
  $(".color-options li").each(function () {
    themeClasses.push($(this).data("theme"));
  });

  $(".color-options li").on("click", function () {
    $(this).addClass("active").siblings().removeClass("active");
    $("body")
      .removeClass(themeClasses.join(" "))
      .addClass($(this).data("theme"));
  });

  // switch font
  var fontClasses = [];
  $(".fonts-option select option").each(function () {
    fontClasses.push($(this).val());
  });
  $(".fonts-option select").on("change", function () {
    $("body")
      .removeClass(fontClasses.join(" "))
      .addClass($(this).find("option:selected").val());
  });

  // add i inside li

  // add default local storage theme
  $(
    ".page .sidebar, .page .content-area , .page .header, .page .content-area .page-head ,.quiz-block ,.option , .timer"
  ).addClass(localStorage.getItem("page-theme") || "light-dark");

  var themeModes = [];
  $("ul.toggle-mode li").each(function () {
    themeModes.push($(this).data("theme"));
    $(this).removeClass(themeModes.join(" ")).addClass($(this).data("theme"));
  });
  $("ul.toggle-mode li.main-dark").append("<i class='fas fa-moon'></i>");
  $("ul.toggle-mode li.light-dark").append("<i class='fas fa-sun'></i>");

  $("ul.toggle-mode li").on("click", function () {
    $(this).addClass("active").siblings().removeClass("active");
    $("body").removeClass(themeModes.join(" ")).addClass($(this).data("theme"));
    $(
      ".page .sidebar, .page .content-area , .page .header, .page .content-area .page-head , .quiz-block, .quiz-block .quiz-box, .timer"
    )
      .removeClass(themeModes.join(" "))
      .addClass($(this).data("theme"));

    // add theme to local storage
    localStorage.setItem("page-theme", $(this).data("theme"));
  });

  //toggle full screen
  $(".toggle-full-screen").on("click", function () {
    $(this).toggleClass("full-screen");
    if ($(this).hasClass("full-screen")) {
      openFullscreen();
    } else {
      closeFullscreen();
    }
  });

  var elem = document.documentElement;
  function openFullscreen() {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
  }

  function closeFullscreen() {
    if (elem.exitFullscreen) {
      elem.exitFullscreen();
    } else if (elem.webkitExitFullscreen) {
      /* Safari */
      elem.webkitExitFullscreen();
    } else if (elem.msExitFullscreen) {
      /* IE11 */
      elem.msExitFullscreen();
    }
  }
});
