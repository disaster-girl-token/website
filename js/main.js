/* =================================
------------------------------------
	Cryptocurrency - Landing Page Template
	Version: 1.0
 ------------------------------------ 
 ====================================*/


'use strict';

    let ps0 = document.getElementById("process-step0");
	let ps1 = document.getElementById("process-step1");
	let ps2 = document.getElementById("process-step2");
	let pss = [ps0, ps1, ps2];
	let maxval = 0;
adjustSections();

$(window).on('load', function() {
	/*------------------
		Preloder
	--------------------*/
	$(".loader").fadeOut(); 
	$("#preloder").delay(400).fadeOut("slow");

});

(function($) {

	/*------------------
		Navigation
	--------------------*/
	$('.responsive-bar').on('click', function(event) {
		$('.main-menu').slideToggle(400);
		event.preventDefault();
	});


	/*------------------
		Background set
	--------------------*/
	$('.set-bg').each(function() {
		var bg = $(this).data('setbg');
		$(this).css('background-image', 'url(' + bg + ')');
	});

	
	/*------------------
		Review
	--------------------*/
	var review_meta = $(".review-meta-slider");
    var review_text = $(".review-text-slider");


    review_text.on('changed.owl.carousel', function(event) {
		review_meta.trigger('next.owl.carousel');
	});

	review_meta.owlCarousel({
		loop: true,
		nav: false,
		dots: true,
		items: 3,
		center: true,
		margin: 20,
		autoplay: true,
		mouseDrag: false,
	});


	review_text.owlCarousel({
		loop: true,
		nav: true,
		dots: false,
		items: 1,
		margin: 20,
		autoplay: true,
		navText: ['<i class="ti-angle-left"><i>', '<i class="ti-angle-right"><i>'],
		animateOut: 'fadeOutDown',
    	animateIn: 'fadeInDown',
	});



	 /*------------------
		Contact Form
	--------------------*/
    $(".check-form").focus(function () {
        $(this).next("span").addClass("active");
    });
    $(".check-form").blur(function () {
        if ($(this).val() === "") {
            $(this).next("span").removeClass("active");
        }
    });


})(jQuery);

window.onresize = function(event) {
	adjustSections();
}

function adjustSections(){
    ps0 = document.getElementById("process-step0");
 	ps1 = document.getElementById("process-step1");
 	ps2 = document.getElementById("process-step2");
 	pss = [ps0, ps1, ps2];
 	maxval = 0;
	for (var i in pss){
		if (pss[i].scrollHeight > maxval){
			maxval = pss[i].scrollHeight;
		}
	}
	ps0.style.height = maxval+'px';
	ps1.style.height = maxval+'px';
	ps2.style.height = maxval+'px';	
}