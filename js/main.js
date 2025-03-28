(function ($) {
 "use strict";

 /*-----------------------------
	window When Loading
---------------------------------*/
$(window).on('load',function (){
    var wind = $(window);
/* ----------------------------------------------------------------
                [ Preloader ]
-----------------------------------------------------------------*/ 
$(".loading").fadeOut(500);
});

/*-----------------------------
	Menu Stick
---------------------------------*/
    $(window).on('scroll',function() {
        if ($(this).scrollTop() > 1){  
            $('.sticker').addClass("stick");
        }   
        else{
            $('.sticker').removeClass("stick");
        }
    });
    
/*----------------------------
    Toogle Search
------------------------------ */
    // Handle click on toggle search button
    $('.header-search').on('click', function() {
        $('.search').toggleClass('open');
        return false;
    });
    
/*----------------------------
    jQuery MeanMenu
------------------------------ */
	jQuery('nav#dropdown').meanmenu();	

/*----------
     Hero Slider Active
------------------------------*/
$('.hero-slider').owlCarousel({
    smartSpeed: 1000,
    nav: true,
    loop: true,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    autoplay: false,
    navText: ['<i class="zmdi zmdi-chevron-left"></i>', '<i class="zmdi zmdi-chevron-right"></i>'],
    responsive: {
        0: {
            items: 1,
            autoplay: true,
            nav: false
        },
        600: {
            items: 1
        },
        1000: {
            items: 1
        }
    }
})
/*------- 
    Testimonial Slider Active 
----------------------------------*/
 $('.testimonial-slider').owlCarousel({
    smartSpeed: 1000,
    nav: false,
    navText: ['<span class="fs1" data-icon="&#x34;"></span>', '<span class="fs1" data-icon="&#x35;"></span>'],
    responsive: {
        0: {
            items: 1
        },
        480: {
            items: 1
        },
        768: {
            items: 1
        },
        992: {
            items: 1
        },
        1200: {
            items: 1
        }
    }
})
/*------- 
    Testimonial Slider Active 
----------------------------------*/
 $('.testimonial-slider-2').owlCarousel({
    smartSpeed: 1000,
    nav: false,
    navText: ['<span class="fs1" data-icon="&#x34;"></span>', '<span class="fs1" data-icon="&#x35;"></span>'],
    responsive: {
        0: {
            items: 1
        },
        480: {
            items: 1
        },
        768: {
            items: 1
        },
        992: {
            items: 2
        },
        1200: {
            items: 2
        }
    }
})
/*----------------------------
    Wow js active
------------------------------ */
    new WOW().init();
 
/*--------------------------
    ScrollUp
---------------------------- */	
	$.scrollUp({
        scrollText: '<i class="fa fa-angle-up"></i>',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade'
    }); 	   
    
/*--------------------------
    Counter Up
---------------------------- */	
    $('.counter').counterUp({
        delay: 70,
        time: 5000
    }); 
    
/*--------------------------------
	Testimonial Slick Carousel
-----------------------------------*/
    $('.testimonial-text-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        draggable: false,
        fade: true,
        asNavFor: '.slider-nav'
    });
/*------------------------------------
	Testimonial Slick Carousel as Nav
--------------------------------------*/
    $('.testimonial-image-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.testimonial-text-slider',
        dots: false,
        arrows: true,
        centerMode: true,
        focusOnSelect: true,
        centerPadding: '10px',
        responsive: [
            {
              breakpoint: 450,
              settings: {
                dots: false,
                slidesToShow: 3,  
                centerPadding: '0px',
                }
            },
            {
              breakpoint: 420,
              settings: {
                autoplay: true,
                dots: false,
                slidesToShow: 1,
                centerMode: false,
                }
            }
        ]
    });

/*------------------------------------
	MailChimp
--------------------------------------*/
    $('#mc-form').ajaxChimp({
        language: 'en',
        callback: mailChimpResponse,
        // ADD YOUR MAILCHIMP URL BELOW HERE!
        url: 'http://themeshaven.us8.list-manage.com/subscribe/post?u=759ce8a8f4f1037e021ba2922&amp;id=a2452237f8'
    });
    
    function mailChimpResponse(resp) {
        
        if (resp.result === 'success') {
            $('.mailchimp-success').html('' + resp.msg).fadeIn(900);
            $('.mailchimp-error').fadeOut(400);
            
        } else if(resp.result === 'error') {
            $('.mailchimp-error').html('' + resp.msg).fadeIn(900);
        }  
    }
/*------------------------------ 
10. Cart Plus Minus Button
---------------------------------*/
 $(".cart-plus-minus").append('<div class="dec qtybutton"><i class="zmdi zmdi-chevron-down"></i></div><div class="inc qtybutton"><i class="zmdi zmdi-chevron-up"></i></div>');
  $(".qtybutton").on("click", function() {
    var $button = $(this);
    var oldValue = $button.parent().find("input").val();
    if ($button.hasClass('inc')) {
      var newVal = parseFloat(oldValue) + 1;
    } else {
       // Don't allow decrementing below zero
      if (oldValue > 0) {
        var newVal = parseFloat(oldValue) - 1;
        } else {
        newVal = 0;
      }
      }
    $button.parent().find("input").val(newVal);
  });
/*----------------------------------- 
    Single Product Side Menu Active 
--------------------------------------*/  
$('.single-slide-menu').slick({
		prevArrow: '<i class="fa fa-angle-left"></i>',
		nextArrow: '<i class="fa fa-angle-right slick-next-btn"></i>',
        slidesToShow: 3,
        responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3
              }
            },
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            }
          ]
	});
    
$('.single-slide-menu a').on('click',function(e){
      e.preventDefault();
     
      var $href = $(this).attr('href');
     
      $('.single-slide-menu a').removeClass('active');
      $(this).addClass('active');
     
      $('.product-details-large .tab-pane').removeClass('active show');
      $('.product-details-large '+ $href ).addClass('active show');
     
  })
/*------------------------------ 
    Toggle Function Active
---------------------------------*/   
    /*--- showlogin toggle function ----*/
    $('#showlogin').on('click', function() {
        $('#checkout-login').slideToggle(900);
    });

    /*--- showlogin toggle function ----*/
    $('#showcoupon').on('click', function() {
        $('#checkout_coupon').slideToggle(900);
    });
    /*--- showlogin toggle function ----*/
    $('#cbox').on('click', function() {
        $('#cbox-info').slideToggle(900);
    });

    /*--- showlogin toggle function ----*/
    $('#ship-box').on('click', function() {
        $('#ship-box-info').slideToggle(1000);
    }); 
/*---------------------------
    Nice Select
------------------------------- */	
    $('.nice-select').niceSelect(); 
/*---------------------------
    Fancybox Active
------------------------------- */	   
$('[data-fancybox="images"]').fancybox({
    hash: false,
});
/*----------------------------------
	 Instafeed active 
------------------------------------*/
if($('#Instafeed').length) {
    var feed = new Instafeed({
        get: 'user',
        userId: 6665768655,
        accessToken: '6665768655.1677ed0.313e6c96807c45d8900b4f680650dee5',
        target: 'Instafeed',
        resolution: 'thumbnail',
        limit: 6,
        template: '<li><a href="{{link}}" target="_new"><img src="{{image}}" /></a></li>',
    });
    feed.run(); 
}
/*=============  Gallery Mesonry Activation  ==============*/
$('.gallery-area').imagesLoaded(function () {

    // filter items on button click
    $('.gallery__menu').on('click', 'button', function () {
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({
          filter: filterValue
        });
    });

    // change is-checked class on buttons
    $('.gallery__menu button').on('click', function () {
        $('.gallery__menu button').removeClass('is-checked');
        $(this).addClass('is-checked');
        var selector = $(this).attr('data-filter');
        $containerpage.isotope({
          filter: selector
        });
        return false;
    });

    // init Isotope
    var $grid = $('.masonry__wrap').isotope({
        itemSelector: '.gallery__item',
        percentPosition: true,
        transitionDuration: '0.7s',
        layoutMode: 'masonry',
        masonry: {
          // use outer width of grid-sizer for columnWidth
          columnWidth: '.col-md-4',
        }
    });
});

    
})(jQuery); 