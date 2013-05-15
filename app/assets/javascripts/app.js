$(document).ready(function() {

// console.log($(window).width()) // possible way to manage media query

	(function($) {
		$.fn.orbit = function(options) {
		//Defaults to extend options
		var defaults = {
		animation: 'horizontal-push', 	// fade, horizontal-slide, vertical-slide, horizontal-push
		animationSpeed: 600, 			// how fast animtions are
		timer: true, 					// true or false to have the timer
		advanceSpeed: 4000, 			// if timer is enabled, time between transitions 
		pauseOnHover: false, 			// if you hover pauses the slider
		startClockOnMouseOut: false, 	// if clock should start on MouseOut
		startClockOnMouseOutAfter: 1000,// how long after MouseOut should the timer start again
		directionalNav: true, 			// manual advancing directional navs
		captions: true, 				// do you want captions?
		captionAnimation: 'fade', 		// fade, slideOpen, none
		captionAnimationSpeed: 600, 	// if so how quickly should they animate in
		bullets: false,					// true or false to activate the bullet navigation
		bulletThumbs: false,			// thumbnails for the bullets
		bulletThumbLocation: '',		// location from this file where thumbs will be
		afterSlideChange: function(){} 	// empty function 
	};
        
    //Extend those options
    var options = $.extend(defaults, options); 

    return this.each(function() {

	// ==============
	// ! SETUP   
	// ==============

	//Global Variables
    var activeSlide = 0,
    numberSlides = 0,
    orbitWidth,
    orbitHeight,
    locked;
            
    //Initialize
    var orbit = $(this).addClass('orbit'),         
    orbitWrapper = orbit.wrap('<div class="orbit-wrapper" />').parent();
    orbit.add(orbitWidth).width('1px').height('1px');

    //Collect all slides and set slider size of largest image
    var slides = orbit.children('img, a, div');
    slides.each(function() {
    	var _slide = $(this),
    	_slideWidth = _slide.width(),
    	_slideHeight = _slide.height();
    	if(_slideWidth > orbit.width()) {
    		orbit.add(orbitWrapper).width(_slideWidth);
    		orbitWidth = orbit.width();
    	}
    	if(_slideHeight > orbit.height()) {
    		orbit.add(orbitWrapper).height(_slideHeight);
    		orbitHeight = orbit.height();
    	}
    	numberSlides++;
    });

    //Animation locking functions
    function unlock() {
    	locked = false;
    }
    function lock() {
    	locked = true;
    }

    //If there is only a single slide remove nav, timer and bullets
    if(slides.length == 1) {
    	options.directionalNav = false;
    	options.timer = false;
    	options.bullets = false;
    }

    //Set initial front photo z-index and fades it in
    slides.eq(activeSlide)
    .css({"z-index" : 3})
    .fadeIn(function() {

	    //brings in all other slides IF css declares a display: none
	    slides.css({"display":"block"})
	});

	// ==============
	// ! TIMER   
	// ==============

	//Timer Execution
	function startClock() {
		if(!options.timer  || options.timer == 'false') { 
			return false;
			//if timer is hidden, don't need to do crazy calculations
		} else if(timer.is(':hidden')) {
			clock = setInterval(function(e){
				shift("next");  
			}, options.advanceSpeed);
			//if timer is visible and working, let's do some math
		} else {
			timerRunning = true;
			pause.removeClass('active')
			clock = setInterval(function(e){
				var degreeCSS = "rotate("+degrees+"deg)"
				degrees += 2
				rotator.css({ 
					"-webkit-transform": degreeCSS,
					"-moz-transform": degreeCSS,
					"-o-transform": degreeCSS
				});
				if(degrees > 180) {
					rotator.addClass('move');
					mask.addClass('move');
				}
				if(degrees > 360) {
					rotator.removeClass('move');
					mask.removeClass('move');
					degrees = 0;
					shift("next");
				}
			}, options.advanceSpeed/180);
		}
	}
	function stopClock() {
		if(!options.timer || options.timer == 'false') { return false; } else {
			timerRunning = false;
			clearInterval(clock);
			pause.addClass('active');
		}
	}

	//Timer Setup
	if(options.timer) {
		var timerHTML = '<div class="timer"><span class="mask"><span class="rotator"></span></span><span class="pause"></span></div>'
		orbitWrapper.append(timerHTML);
		var timer = orbitWrapper.children('div.timer'),
		timerRunning;
		if(timer.length != 0) {
			var rotator = $('div.timer span.rotator'),
			mask = $('div.timer span.mask'),
			pause = $('div.timer span.pause'),
			degrees = 0,
			clock; 
			startClock();
			timer.click(function() {
				if(!timerRunning) {
					startClock();
				} else { 
					stopClock();
				}
			});
			if(options.startClockOnMouseOut){
				var outTimer;
				orbitWrapper.mouseleave(function() {
					outTimer = setTimeout(function() {
						if(!timerRunning){
							startClock();
						}
					}, options.startClockOnMouseOutAfter)
				})
				orbitWrapper.mouseenter(function() {
					clearTimeout(outTimer);
				})
			}
		}
	}

	//Pause Timer on hover
	if(options.pauseOnHover) {
		orbitWrapper.mouseenter(function() {
			stopClock(); 
		});
	}
            
	// ==============
	// ! CAPTIONS   
	// ==============
                     
	//Caption Setup
	if(options.captions) {
		var captionHTML = '<div class="orbit-caption"></div>';
		orbitWrapper.append(captionHTML);
		var caption = orbitWrapper.children('.orbit-caption');
		setCaption();
	}

	//Caption Execution
	function setCaption() {
		if(!options.captions || options.captions =="false") {
			return false; 
		} else {
			var _captionLocation = slides.eq(activeSlide).data('caption'); //get ID from rel tag on image
			_captionHTML = $(_captionLocation).html(); //get HTML from the matching HTML entity

			//Set HTML for the caption if it exists
			if(_captionHTML) {
				caption
				.attr('id',_captionLocation) // Add ID caption
				.html(_captionHTML); // Change HTML in Caption 
				//Animations for Caption entrances
				if(options.captionAnimation == 'none') {
					caption.show();
				}
				if(options.captionAnimation == 'fade') {
					caption.fadeIn(options.captionAnimationSpeed);
				}
				if(options.captionAnimation == 'slideOpen') {
					caption.slideDown(options.captionAnimationSpeed);
				}
			} else {
				//Animations for Caption exits
				if(options.captionAnimation == 'none') {
					caption.hide();
				}
				if(options.captionAnimation == 'fade') {
					caption.fadeOut(options.captionAnimationSpeed);
				}
				if(options.captionAnimation == 'slideOpen') {
					caption.slideUp(options.captionAnimationSpeed);
				}
			}
		}
	}
            
	// ==================
	// ! DIRECTIONAL NAV   
	// ==================

	//DirectionalNav { rightButton --> shift("next"), leftButton --> shift("prev");

	if(options.directionalNav) {
		if(options.directionalNav == "false") { return false; }
		var directionalNavHTML = '<div class="slider-nav"><span class="right">Right</span><span class="left">Left</span></div>';
		orbitWrapper.append(directionalNavHTML);
		var leftBtn = orbitWrapper.children('div.slider-nav').children('span.left'),
		rightBtn = orbitWrapper.children('div.slider-nav').children('span.right');
		leftBtn.click(function() { 
			stopClock();
			shift("prev");
		});
		rightBtn.click(function() {
			stopClock();
			shift("next")
		});
	}
	            
	// ==================
	// ! BULLET NAV   
	// ==================

	//Bullet Nav Execution
	function setActiveBullet() { 
		if(!options.bullets) { return false; } else {
			bullets.children('li').removeClass('active').eq(activeSlide).addClass('active');
		}
	}
        	
	// ====================
	// ! SHIFT ANIMATIONS   
	// ====================

	//Animating the shift!
	function shift(direction) {
	//remember previous activeSlide
	var prevActiveSlide = activeSlide,
	slideDirection = direction;
	//exit function if bullet clicked is same as the current image
	if(prevActiveSlide == slideDirection) { return false; }
	//reset Z & Unlock
	function resetAndUnlock() {
		slides
		.eq(prevActiveSlide)
		.css({"z-index" : 1});
		unlock();
		options.afterSlideChange.call(this);
	}
	if(slides.length == "1") { return false; }
	if(!locked) {
		lock();
		//deduce the proper activeImage
		if(direction == "next") {
			activeSlide++
			if(activeSlide == numberSlides) {
				activeSlide = 0;
			}
		} else if(direction == "prev") {
			activeSlide--
			if(activeSlide < 0) {
				activeSlide = numberSlides-1;
			}
		} else {
			activeSlide = direction;
			if (prevActiveSlide < activeSlide) { 
				slideDirection = "next";
			} else if (prevActiveSlide > activeSlide) { 
				slideDirection = "prev"
			}
		}

		//set to correct bullet
		setActiveBullet();

		//set previous slide z-index to one below what new activeSlide will be
		slides
		.eq(prevActiveSlide)
		.css({"z-index" : 2});

		//fade
		if(options.animation == "fade") {
			slides
			.eq(activeSlide)
			.css({"opacity" : 0, "z-index" : 3})
			.animate({"opacity" : 1}, options.animationSpeed, resetAndUnlock);
		}
		//horizontal-slide
		if(options.animation == "horizontal-slide") {
			if(slideDirection == "next") {
				slides
				.eq(activeSlide)
				.css({"left": orbitWidth, "z-index" : 3})
				.animate({"left" : 0}, options.animationSpeed, resetAndUnlock);
			}
			if(slideDirection == "prev") {
				slides
				.eq(activeSlide)
				.css({"left": -orbitWidth, "z-index" : 3})
				.animate({"left" : 0}, options.animationSpeed, resetAndUnlock);
			}
		}

		//vertical-slide
		if(options.animation == "vertical-slide") { 
			if(slideDirection == "prev") {
				slides
				.eq(activeSlide)
				.css({"top": orbitHeight, "z-index" : 3})
				.animate({"top" : 0}, options.animationSpeed, resetAndUnlock);
			}
			if(slideDirection == "next") {
				slides
				.eq(activeSlide)
				.css({"top": -orbitHeight, "z-index" : 3})
				.animate({"top" : 0}, options.animationSpeed, resetAndUnlock);
			}
		}

		//push-over
		if(options.animation == "horizontal-push") {
			if(slideDirection == "next") {
				slides
				.eq(activeSlide)
				.css({"left": orbitWidth, "z-index" : 3})
				.animate({"left" : 0}, options.animationSpeed, resetAndUnlock);
				slides
				.eq(prevActiveSlide)
				.animate({"left" : -orbitWidth}, options.animationSpeed);
			}
			if(slideDirection == "prev") {
				slides
				.eq(activeSlide)
				.css({"left": -orbitWidth, "z-index" : 3})
				.animate({"left" : 0}, options.animationSpeed, resetAndUnlock);
				slides
				.eq(prevActiveSlide)
				.animate({"left" : orbitWidth}, options.animationSpeed);
			}
		}
		setCaption();
		} //lock
		}//orbit function
		});//each call
		}//orbit plugin call
	})(jQuery);


// Managing responsive for video

	// Find all YouTube videos
	var $allVideos = $("iframe[src^='http://www.youtube.com']"),

	    // The element that is fluid width
	    $fluidEl = $(".main-content");

		// Figure out and save aspect ratio for each video
		$allVideos.each(function() {
			$(this).data('aspectRatio', this.height / this.width)

			// and remove the hard coded width/height
	    	.removeAttr('height')
	    	.removeAttr('width');
		});

		// When the window is resized
		$(window).resize(function() {
			var newWidth = $fluidEl.width();
			// Resize all videos according to their own aspect ratio
			$allVideos.each(function() {
				var $el = $(this);
				$el.width(newWidth).height(newWidth * $el.data('aspectRatio'));
	  	});

	// Kick off one resize to fix all videos on page load
	}).resize();

// Choose Color section

	$('.field-mobile').click(function(){
		($(this).highlight);
	});

// Carousel card animations

	$('.card1').click(function(){
		if ($(this).hasClass('card1')){
			$(this).removeClass('card1');
			$(this).addClass('card1-flip');
		} else {
			$(this).removeClass('card1-flip');
			$(this).addClass('card1');
		}

	});

	$('.card2').click(function(){
		if ($(this).hasClass('card2')){
			$(this).removeClass('card2');
			$(this).addClass('card2-flip');
		} else {
			$(this).removeClass('card2-flip');
			$(this).addClass('card2');
		}

	});

		$('.card3').click(function(){
		if ($(this).hasClass('card3')){
			$(this).removeClass('card3');
			$(this).addClass('card3-flip');
		} else {
			$(this).removeClass('card3-flip');
			$(this).addClass('card3');
		}

	});


});
