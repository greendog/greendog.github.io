/******************************************     
			Overlay on Page Loading 
******************************************/
$(window).load(function(){
	$("#overlay").delay(1000).slideUp("slow");
	$('.progress-bars').addClass('invisible');
	$('.process-list').addClass('invisible');
});


$(document).ready(function(){
	$('.section-bg').removeClass('active');

	$(window).scroll(function() {    
	    var scroll = $(window).scrollTop();

	    if (scroll >= 100) {
	       	$(".navbar-default").addClass("navbar-fixed-top navbar-fixed");
	    }else{
	    	$(".navbar-default").removeClass("navbar-fixed-top navbar-fixed")
	    }

	    $('section').each(function () {
	        if ($(window).scrollTop() > $(this).offset().top - ($(this).height())) {
	            $(this).find('.section-bg').removeClass('active').addClass('active');
	        }
	    });

	});


	/******************************************************** 
				FullPage Scroll initializing function 
	********************************************************/
	if($("#page-content").length > 0){
		$('#page-content').fullpage({
		
			sectionSelector: '.one-page',
			slideSelector: false,
			menu: '#top-menu',
			anchors: ['home', 'skills', 'experience', 'info', 'contacts'],
			keyboardScrolling: true,
			scrollBar: true,

			onLeave: function(index, nextIndex, direction){
	            var leavingSection = $(this);
	            //after leaving section 1
	            if(index == 1 && direction =='down'){
	               $('.navbar-default').addClass('navbar-fixed-top');
	               
	            }
	            else if(index == 2 && direction == 'up'){
	                $('.navbar-default').removeClass('navbar-fixed-top');
	                $('.navbar-default a').click(function(){
	               		$('.navbar-default').removeClass('navbar-fixed-top');
	               	});
	            }
	            if(index == 3) { loadBars(); }
	        }
		});
		if ($(window).height() <= 799) {  
			 $.fn.fullpage.destroy('all');
		} 
		if ($(window).width() <= 800) {  
			 $.fn.fullpage.destroy('all');
		}         
	}


	//opacity for header on scrol for another pages
	var header = $('.blog-header .container');
	var range = 200;
	if (header.length > 0){
		$(window).on('scroll', function () {
	  
	    	var scrollTop = $(this).scrollTop();
	    	var offset = header.offset().top;
	    	var height = header.outerHeight();
	    	offset = offset + height / 2;
	    	var calc = 1 - (scrollTop - offset + range) / range;
	  
	 	   header.css({ 'opacity': calc });
	  
	    	if ( calc > '1' ) {
	      	header.css({ 'opacity': 1 });
	    	} else if ( calc < '0' ) {
	      		header.css({ 'opacity': 0 });
	    	}
	  
		});
	}

	/*********************************************************
				Initializing animation on scroll 
	**********************************************************/
	new WOW().init();

	/********************************************
	LightBox for dribbleshots portofolio 
	********************************************/

	if ($('.hover-shot').length > 0){
		$('.hover-shot').magnificPopup({
		  delegate: 'a', 
		  type: 'image',
		  gallery:{
		    enabled:true
		  }
		});
	}

		/** menu close buton **/
		$('.navbar-toggle').click(function(){
			$(this).toggleClass('isClosed');
		});


		$('.navbar-nav a').click(function(){
			$(this).toggleClass('active');
		    $('html, body').animate({
		        scrollTop: $( $(this).attr('href') ).offset().top - 80
		    }, 500);
		    return false;
		});

		

		$(function() {
		    var $meters1 = $(".meter > span");
		    var $section1 = $('#section1');
		    var $queue = $({});
		    function loadDaBars() {
		    if($section1.attr('finished') == 1) return true;
		        $meters1.each(function() {
		            var $el = $(this);
		            var origWidth = $el.width();
		            $el.width(0);
		            $queue.queue(function(next) {
		                $el.animate({width: origWidth}, 400, next);
		            });
		        });
		        $section1.attr('finished', 1);
		    }
		    $(document).bind('scroll', function(ev) {
		        var scrollOffset = $(window).scrollTop();
		        var containerOffset = $section1.offset().top - 300;
		        if (scrollOffset > containerOffset) {
		        	$('.progress-bars').removeClass('invisible');
		            loadDaBars();
		        }
		    });
		    
		});

});


/********************************************************
			 Function for animated header text 
********************************************************/
$(function(){
      $(".animated-intro").typed({
        strings: ["I'm <b>38</b>. I live in <b>Samara, Russia</b>. <br> I develop and manage web-applications for <b>14 years</b>. ",
        		  "I'm a <b>Star Wars</b> and <b>Robots</b> fan <br> and an incorrigible <b>optimist</b>.",
        		  "I'm a <b>mechanisms and machines</b><br> fascinated lover"],
        typeSpeed: 0,
        backSpeed: 0,
        loop: true,
        startDelay: 1500,
        backDelay: 2000,
      });
  });

/**************************************************************************
			Function to load Process vertical progress bars 
***************************************************************************/

	function loadBars() {

		if($('#section3').attr('finished') == 1) return true;
			$(".progress-wrapp").each(function(index){
				$(".progress-wrapp").eq(index).find(".progress > span").each(function(index2){
					$(".progress-wrapp").eq(index).find(".progress > span").eq(index2).data("origWidth", $(".progress-wrapp").eq(index).find(".progress > span").eq(index2).width()).width(0);
						setTimeout(function(){
							$(".progress-wrapp").eq(index).find(".progress > span").eq(index2)
								.animate({
									width: $(".progress-wrapp").eq(index).find(".progress > span").eq(index2).data("origWidth")
								},	1000);
						},index*600);
				});			
			});
		$('#section3').attr('finished', 1);
	}

	$(function() {
	 	var $meters3 = $(".progress > span");
	    var $section3 = $('#section3');
	    var $queue = $({});
	    if($('#section3').length > 0){
			$(window).bind('scroll', function(ev) {
				var scrollOffset = $(window).scrollTop();
				var containerOffset = $('#section3').offset().top - $('#section3').height() + 250;
				if (scrollOffset > containerOffset) {
					$('.process-list').removeClass('invisible');
					loadBars();
				}
			});
		}
	});

	/********************************************** 
			Horizontal timeline initialization 
	***********************************************/
	$(".timeline").timelinr({
		startAt: 1,
		issuesTransparency: 0,
		autoPlay: 'false',
		autoPlayDirection: 'forward',
		autoPlayPause: 5000,
		arrowKeys: 'true',
	});
	$('.timelinebar + #dates > li').on('click',function(){
		resize_timelinebar();
	});

/**********************************************************
	Additional function for loading horizontal timeline 
**********************************************************/
function resize_timelinebar()
{
	return true;
	var SEL=$('.timelinebar + #dates > li > a.selected');
	var TLN=$('.timelinebar');
	var SELL=SEL.offset();
	var TLNL=TLN.offset();
	TLN.css('width',SELL.left - TLNL.left + parseInt(SEL.width()/2));
	$('.timelinebar + #dates > li > a').bind("DOMSubtreeModified",function(){console.log(':)');});
}

function resize_timelinebar2(width,speed) {
	var SEL=$('.timelinebar + #dates > li > a.selected');

	var TLN=$('.timelinebar + #dates');
	var SELL=SEL.offset();
	var TLNL=TLN.offset();
	width+= SELL.left -TLNL.left;

	$('.timelinebar').animate({'width': width}, {
		queue: false,
		duration: speed
	});
}
/*** /.function for loading horizontal timeline ***/

/************************************************ 
		Form validation 
************************************************/
	$('#name').click(function(){
		$('label[for=name]').toggleClass('active-label');
	});
	$('#email').click(function(){
		$('label[for=email]').toggleClass('active-label');
	});
	$('#phone').click(function(){
		$('label[for=phone]').toggleClass('active-label');
	});
	$('#contact-message').click(function(){
		$('label[for=contact-message]').toggleClass('active-label');
	});
    $('#contactForm').validate();

