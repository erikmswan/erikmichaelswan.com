$(function(){var e=$(".main-nav");$(".scroll-title-container").hide(),$(window).scroll(function(){$(this).scrollTop()>1?(e.addClass("scroll-nav"),$(".big-title").hide(),$(".scroll-title-container").show()):(e.removeClass("scroll-nav"),$(".big-title").show(),$(".scroll-title-container").hide())}),$(window).scroll(function(){var e=$(window).scrollTop();e>=250?$(".intro-wrap").addClass("fade-up"):$(".intro-wrap").removeClass("fade-up"),e>=1500?$(".berkeley").addClass("fade-left"):$(".berkeley").removeClass("fade-left"),e>=1700?$(".cambridge").addClass("fade-right"):$(".cambridge").removeClass("fade-right")})});