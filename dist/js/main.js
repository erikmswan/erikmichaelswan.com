function makeScene(e,l){var o={triggerElement:e};if(null!==l&&"object"==typeof l)for(var n in o)o[n]=l[n];return new ScrollMagic.Scene(o)}var nav=$(".main-nav");$(window).scroll(function(){$(this).scrollTop()>1?(nav.addClass("scroll-nav"),$(".big-title").hide(),$(".scroll-title-container").show()):(nav.removeClass("scroll-nav"),$(".big-title").show(),$(".scroll-title-container").hide())});var scrollControl=new ScrollMagic.Controller;makeScene("#intro").setClassToggle("#intro .content","fade-up").addTo(scrollControl),makeScene(".berkeley").setClassToggle(".berkeley","fade-left").addTo(scrollControl),makeScene(".cambridge").setClassToggle(".cambridge","fade-left").addTo(scrollControl);