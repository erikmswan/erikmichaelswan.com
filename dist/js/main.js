
// MAIN.JS ----------------------------------*/

// Scroll-nav class switch
var nav = $('.main-nav');

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

// SCROLLMAGIC ----------------------------------*/
var scrollControl = new ScrollMagic.Controller();

// Scene maker function
function makeScene(triggerEl, extraOptions) {
	var options = { triggerElement: triggerEl };
	if (extraOptions !== null && typeof extraOptions === 'object') {
		for (var key in options) {
			options[key] = extraOptions[key];
		}
	}
	return new ScrollMagic.Scene(options);
}

// Scroll Animations
makeScene('#intro')
	.setClassToggle('#intro .content', 'fade-up')
	.addTo(scrollControl);
makeScene('.berkeley')
	.setClassToggle('.berkeley', 'fade-left')
	.addTo(scrollControl);
makeScene('.berkeley')
	.setClassToggle('.cambridge', 'fade-left')
	.addTo(scrollControl);

// // Animation on scroll
// $(window).scroll(function() {
// 	var scroll = $(window).scrollTop();
//
//  	scroll >= 250 ? $(".intro-wrap").addClass("fade-up") : $(".intro-wrap").removeClass("fade-up");
// 	// Berkeley reveal
// 	scroll >= 1500 ? $(".berkeley").addClass("fade-left") : $(".berkeley").removeClass("fade-left");
// 	// Cambridge Reveal
// 	scroll >= 1700 ? $(".cambridge").addClass("fade-right") : $(".cambridge").removeClass("fade-right");
// });
