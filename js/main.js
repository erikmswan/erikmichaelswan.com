

$(function() {    
		
		// Scroll-nav class switch
		var nav = $('.main-nav');
		$('.scroll-title-container').hide();

		$(window).scroll(function () {
			if ($(this).scrollTop() > 1) {
				nav.addClass("scroll-nav");
				$('.big-title').hide();
				$('.scroll-title-container').show();
			} else {
				nav.removeClass("scroll-nav");
				$('.big-title').show();
				$('.scroll-title-container').hide();
			}
		});
        
		// Animation on scroll
		$(window).scroll(function() {    
			var scroll = $(window).scrollTop();
			
			if (scroll >= 250) {
				$(".intro-wrap").addClass("fade-up");
			} else {
				$(".intro-wrap").removeClass("fade-up");
			}
			
			 // Berkeley reveal
			if (scroll >= 1500) {
				$(".berkeley").addClass("fade-left");
			} else {
				$(".berkeley").removeClass("fade-left");
			} 
			 
			// Cambridge Reveal
			if (scroll >= 1700) {
				$(".cambridge").addClass("fade-right");
			} else {
				$(".cambridge").removeClass("fade-right");
			}
		});
		
		// Testing quote
		var quotes = $('.quote-top, .quote-bottom, .quote-attribution');
		quotes.click(function() {
			quotes.toggleClass('quoteFadeIn');
		});
	});
        