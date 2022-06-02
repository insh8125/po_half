const mql = window.matchMedia("screen and (max-width: 1080px)");

if (mql.matches) {
  jsMax1080(); // 브라우저 너비가 1080px 보다 작을 때 실행
} else {
  jsMin1080(); // 브라우저 너비가 1080px 보다 클 때 실행
}

$(function () {
  $(".main").on("click", function () {
    $(this).slideUp(500);
  });
});

function jsMin1080() {
  $(function () {
    console.log("1080px 이상");

    const $wrap = $(".wrapper"),
      $logo = $(".hdrWrap h1"),
      $nav = $(".hdrWrap nav"),
      $header = $(".hdrWrap header"),
      $poTitle = $(".hdrWrap .poTitle div"),
      $poTarget = $(".hdrWrap .poTarget div"),
      $poTerm = $(".hdrWrap .poTerm div"),
      $poNav = $(".hdrWrap .indicator"),
      $page = $(".seWrap"),
      $poBtn = $(".seWrap header button"),
      $btNext = $(".seWrap footer .nav .btNext"),
      $btList = $(".seWrap footer .nav .btList");

    let scrEvent = false,
      navFlag = true,
      poFlag = true,
      i = 0;

    $page.css({ marginTop: "-100vh" });
    $page.find(".content:last").prependTo($page);

    $poTitle.css({ marginTop: -80 });
    $poTitle.find("h2:last").prependTo($poTitle);

    $poTarget.css({ marginTop: -20 });
    $poTarget.find("h3:last").prependTo($poTarget);

    $poTerm.css({ marginTop: -20 });
    $poTerm.find("p:last").prependTo($poTerm);

    $(window).on("resize", function () {
      pgeHeight = $page.outerHeight();
    });

    $(".pg2").on("mousewheel", wheelPage);

    $logo.on("click", toHead);
    $nav.on("click", toHead);
    $btNext.on("click", nextPage);
    $btList.on("click", toPortfolio);
    $poBtn.on("click", toPortfolio);

    function toHead() {
      if (navFlag) {
        $wrap.stop().animate({ marginLeft: 0 });
        $header.animate({ opacity: 0 });
        $poNav.animate({ opacity: 0 });
        $nav.find("ul").animate({ marginLeft: -120 });
        navFlag = false;
      } else {
        $wrap.stop().animate({ marginLeft: "-50vw" });
        $header.animate({ opacity: 1 });
        $poNav.animate({ opacity: 1 });
        $nav.find("ul").animate({ marginLeft: 0 });
        navFlag = true;
      }
    }

    function toPortfolio() {
      if (poFlag) {
        $(".seWrap").animate({ left: "-25%" });
        $poBtn.addClass("fa-rotate-180");
        poFlag = false;
      } else {
        $(".seWrap").animate({ left: 0 });
        $poBtn.removeClass("fa-rotate-180");
        poFlag = true;
      }
    }

    function wheelPage(e) {
      let wrapMargin = $(".wrapper").css("marginLeft");
      wrapMargin = parseInt(wrapMargin);
      if (wrapMargin < 0) {
        delta = e.originalEvent.wheelDelta;
        if (delta < 0 && scrEvent == false) {
          nextPage();
        } else if (delta > 0 && scrEvent == false) {
          prevPage();
        }
      }
    }

    function nextPage() {
      scrEvent = true;
      i = (i + 1) % 3;

      $poNav
        .find("li")
        .eq(i)
        .animate({ width: 30 })
        .siblings()
        .animate({ width: 20 });

      $poTitle.stop().animate({ marginTop: -160 }, function () {
        $poTitle.find("h2:first").appendTo($poTitle);
        $poTitle.css({ marginTop: -80 });
      });

      $poTarget
        .delay(80)
        .stop()
        .animate({ marginTop: -40 }, function () {
          $poTarget.find("h3:first").appendTo($poTarget);
          $poTarget.css({ marginTop: -20 });
        });

      $poTerm
        .delay(80)
        .stop()
        .animate({ marginTop: -40 }, function () {
          $poTerm.find("p:first").appendTo($poTerm);
          $poTerm.css({ marginTop: -20 });
        });

      $page.stop().animate({ marginTop: "-200vh" }, function () {
        $page.find(".content:first").appendTo($page);
        $page.css({ marginTop: "-100vh" });
        scrEvent = false;
      });
    }

    function prevPage() {
      scrEvent = true;
      i = (i + 2) % 3;

      $poNav
        .find("li")
        .eq(i)
        .animate({ width: 30 })
        .siblings()
        .animate({ width: 20 });

      $poTitle.stop().animate({ marginTop: 0 }, function () {
        $poTitle.find("h2:last").prependTo($poTitle);
        $poTitle.css({ marginTop: -80 });
      });

      $poTarget
        .delay(80)
        .stop()
        .animate({ marginTop: 0 }, function () {
          $poTarget.find("h3:last").prependTo($poTarget);
          $poTarget.css({ marginTop: -20 });
        });

      $poTerm
        .delay(80)
        .stop()
        .animate({ marginTop: 0 }, function () {
          $poTerm.find("p:last").prependTo($poTerm);
          $poTerm.css({ marginTop: -20 });
        });

      $page.stop().animate({ marginTop: "0" }, function () {
        $page.find(".content:last").prependTo($page);
        $page.css({ marginTop: "-100vh" });
        scrEvent = false;
      });
    }
  });
}

function jsMax1080() {
  $(function () {
    console.log("1080px 이하");

    const $wrap = $(".wrapper"),
      $logo = $(".abtWrap h1"),
      $nav = $(".hdrWrap nav"),
      $poName = $(".hdrWrap h2"),
      $poTitle = $(".hdrWrap .poTitle div"),
      $poTarget = $(".hdrWrap .poTarget div"),
      $poTerm = $(".hdrWrap .poTerm div"),
      $poNav = $(".hdrWrap .indicator"),
      $page = $(".seWrap"),
      $poBtn = $(".seWrap header button"),
      $btNext = $(".seWrap footer .nav .btNext"),
      $btList = $(".seWrap footer .nav .btList");

    let scrEvent = false,
      navFlag = true,
      poFlag = true,
      i = 0,
      startX = 0,
      startY = 0,
      endX = 0,
      endY = 0;

    $logo.click(function () {
      $wrap.animate({ marginLeft: "-100%" });
    });

    $btNext.on("click", nextPage);

    $(".pg2").on({
      touchstart: function (e) {
        startX = e.originalEvent.changedTouches[0].screenX;
        startY = e.originalEvent.changedTouches[0].screenY;
      },
      touchend: function (e) {
        endX = e.originalEvent.changedTouches[0].screenX;
        endY = e.originalEvent.changedTouches[0].screenY;
        if (startY - endY > 50) {
          nextPage();
        } else if (endY - startY > 50) {
          prevPage();
        }
      },
    });

    $nav.on("click", function () {
      $wrap.stop().animate({ marginLeft: 0 });
    });

    $poName.on("click", function () {
      $wrap.animate({ marginLeft: "-200%" });
    });

    $btList.on("click", function () {
      $wrap.stop().animate({ marginLeft: "-100%" });
    });

    $page.css({ marginTop: "-100vh" });
    $page.find(".content:last").prependTo($page);

    $poTitle.css({ marginTop: -80 });
    $poTitle.find("h2:last").prependTo($poTitle);

    $poTarget.css({ marginTop: -20 });
    $poTarget.find("h3:last").prependTo($poTarget);

    $poTerm.css({ marginTop: -20 });
    $poTerm.find("p:last").prependTo($poTerm);

    function nextPage() {
      i = (i + 1) % 3;

      $poNav
        .find("li")
        .eq(i)
        .animate({ width: 30 })
        .siblings()
        .animate({ width: 20 });

      $poTitle.stop().animate({ marginTop: -160 }, function () {
        $poTitle.find("h2:first").appendTo($poTitle);
        $poTitle.css({ marginTop: -80 });
      });

      $poTarget.stop().animate({ marginTop: -40 }, function () {
        $poTarget.find("h3:first").appendTo($poTarget);
        $poTarget.css({ marginTop: -20 });
      });
      $poTerm.stop().animate({ marginTop: -40 }, function () {
        $poTerm.find("p:first").appendTo($poTerm);
        $poTerm.css({ marginTop: -20 });
      });
      $page.stop().animate({ marginTop: "-200vh" }, function () {
        $page.find(".content:first").appendTo($page);
        $page.css({ marginTop: "-100vh" });
      });
    }

    function prevPage() {
      i = (i + 2) % 3;

      $poNav
        .find("li")
        .eq(i)
        .animate({ width: 30 })
        .siblings()
        .animate({ width: 20 });

      $poTitle.stop().animate({ marginTop: 0 }, function () {
        $poTitle.find("h2:last").prependTo($poTitle);
        $poTitle.css({ marginTop: -80 });
      });
      $potype
        .delay(50)
        .stop()
        .animate({ marginTop: 0 }, function () {
          $potype.find("h3:last").prependTo($potype);
          $potype.css({ marginTop: -20 });
        });
      $poterm
        .delay(100)
        .stop()
        .animate({ marginTop: 0 }, function () {
          $poterm.find("p:last").prependTo($poterm);
          $poterm.css({ marginTop: -20 });
        });
      $page.stop().animate({ marginTop: "0" }, function () {
        $page.find(".content:last").prependTo($page);
        $page.css({ marginTop: "-100vh" });
      });
    }
  });
}
