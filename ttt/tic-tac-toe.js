

// Tic Tac Toe Object
var ttt = {
	
	// VARIABLES ************************************************/
	vp: document.documentElement, // viewport
	cont: document.getElementById('ttt-container'), // game container
	h1: document.getElementById('title'), // h1
	left: document.getElementById('left-column'), // left-column container 
	leftRelative: document.getElementById('left-column-relative-block'), // left column relative block
	reset: document.getElementById('reset'), // reset button
	vt: document.querySelectorAll('.vt'), // vertical lines
	hz: document.querySelectorAll('.hz'), // horizontal lines
	btn: document.querySelectorAll('.button'),
	x: document.querySelectorAll('.x'),
	o: document.querySelectorAll('.o'),
	player: 'human',
	
	
	// RESPONSIVE POSITIONING ************************************************/
	
	// The set height function for container
	positionInit: function() {
		
		// Setting element heights
		// Setting h1 and vp height variables 
		this.h1Height = this.h1.clientHeight; 
		this.vpHeight = this.vp.clientHeight; 
		
		// Setting the css style
		this.cont.style.height = ((this.vpHeight - this.h1Height)) + 'px'; // Setting content height
		
		// Setting the space between lines
		// Get the container width and height
		this.contWidth = this.cont.clientWidth;
		this.contHeight = this.cont.clientHeight;
		
		// Loop through all lines and set the margins
		for (i = 0; i < this.vt.length; i++) {
			this.vt[i].style.marginLeft = ((this.contWidth - 13) / 3) + 'px';
			this.hz[i].style.marginTop = ((this.contHeight - 13) / 3) + 'px';
		}
	},
	
	// Setting any element's height
	setAnyHeight: function (element, percent) {
		this.vpHeight = this.vp.clientHeight; // setting vp height for use in responsive calculations 
		element.style.height = (this.vpHeight * percent) + 'px';
	},
	
	// Setting any element's font-size
	setAnyFontSize: function (element) {
		this.h1Height = this.h1.clientHeight; // setting h1 height for use in responsive calculations
		element.style.fontSize = (this.h1Height / 2) + 'px';
	},
	
	
	// FUNCTIONALITY ************************************************/
	
	// Click events
	eventInit: function() {
		for (i = 0; i < ttt.btn.length; i++) {

			// Event listener on buttons
			this.btn[i].addEventListener('click', function(e) {
				e.preventDefault;
				
				// Hide button
				this.className = 'button hide-button';
				
				// Show corresponding symbol
				ttt.o[this.id].className = 'o bring-to-front';
			});
		}
		
		// Reset button event binding
		this.reset.addEventListener('click', function(e) {
			e.preventDefault;
			
			// For loop resetting classes
			for (i = 0; i < ttt.btn.length; i++) {
				ttt.btn[i].className = 'button';
				ttt.x[i].className = 'x hide';
				ttt.o[i].className = 'o hide';
			}
		});
	},
	

	// SINGLE PLAYER MOVES
	humanMove: function () {
		
	},
	
	aiMove: function () {
		for (i = 0; i < ttt.x.length; i++) {
			if (this.id == ttt.x[i]) {
				ttt.x[i].className = 'x bring-to-front';
			}
		}
	},
};

// Positioning functions
ttt.positionInit(); // ttt positioning
ttt.setAnyHeight(ttt.left, .4); // setting left column height
ttt.setAnyHeight(ttt.leftRelative, .4); // setting left column height
ttt.setAnyFontSize(ttt.h1);

// Run positioning functions again if window is resized
window.addEventListener('resize', function() {
	ttt.positionInit(); // ttt positioning
	ttt.setAnyHeight(ttt.left, .5);
	ttt.setAnyHeight(ttt.leftRelative, .5); // setting left column height
	ttt.setAnyFontSize(ttt.h1);
});

// Even functions
ttt.eventInit();

