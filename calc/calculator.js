
// Feature needed: allow negative number inputs

			// Select the relevant buttons
        	var button = document.querySelectorAll(".row div");
        	var numberStorage = []; // An empty array to store numbers to be evaluated
        	var decimalAdded = false; // Preparation for the decimal check
	
	
			// Main for loop containing click event
        	for (i=0; i < button.length; i++) {
        		button[i].onclick = function(event) {
        			
        			// prevent default behavior
					event.preventDefault();

					// Get button value
					var display = document.querySelector(".display");
					
					
					// Main Conditional
					// If the display is empty, replace the zero
					if (display.innerHTML == "0" && (!isNaN(this.innerHTML) || this.innerHTML == ".")) {
						display.innerHTML = this.innerHTML;
						
					// If the display has something in it, simply append the number or decimal
					} else if (display.innerHTML !== "0" && (!isNaN(this.innerHTML) || this.innerHTML == ".")) {	
						
						// Making sure more than one decimal isn't added					
						if (decimalAdded == false && this.innerHTML == ".") {
							display.innerHTML += this.innerHTML;
							decimalAdded = true;
						} else if (decimalAdded == true && this.innerHTML == ".") {
							return;
						} else {
							display.innerHTML += this.innerHTML;	
						}
						
					// Clear it if the C button is pressed
					} else if (this.innerHTML == "C") {
						display.innerHTML = "0";
						decimalAdded = false;
						
					// Evaluate 
					} else if (this.innerHTML == "=") {	
						display.innerHTML = eval(numberStorage[numberStorage.length - 1] + display.innerHTML);
						decimalAdded = false;
						
						// Clearing the array after 10 entries
						if (numberStorage.length > 10) {
							numberStorage = [];
						}
						
					// Store the number if an operator is pressed
					} else {
						numberStorage.push(display.innerHTML + this.innerHTML);
						display.innerHTML = 0;
						decimalAdded = false;

					}; // end main conditional
				        			
        		}; // end button event
        		
        	}; // end for loop