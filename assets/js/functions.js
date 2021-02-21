
// intel Tel Input
let ip; 
let ip_value;
 $("#phone-country,#phone-coun").intlTelInput({
     
      // allowDropdown: false,
      // autoHideDialCode: false,
      // autoPlaceholder: "off",
      // dropdownContainer: "body",
      // excludeCountries: ["us"],
      // formatOnDisplay: false,
    geoIpLookup: function(callback) {
            $.get('https://ipinfo.io', function() {}, "jsonp").always(function(resp) {
              var countryCode = (resp && resp.country) ? resp.country : "";
              callback(countryCode);
              ip=resp.ip;
            
              
            });
          },
       initialCountry: "auto",
       nationalMode: true,
       separateDialCode: true,
      // onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
      // placeholderNumberType: "MOBILE",
      // preferredCountries: ['cn', 'jp'],
     // utilsScript: "<?php echo $basesurl;?>js/utils.js"
    });

setTimeout(function(){
    $('input[name="pc"]').val($('.selected-dial-code').text());
    $('input[name="cip"]').val(ip);
    $('input[name="ctry"]').val( $('.country-list .country.active .country-name').text());
}, 3000);


$('body').delegate('.country','click',function(){
$('input[name="pc"]').val($(this).find('.dial-code').text());
$('input[name="cip"]').val(ip);
$('input[name="ctry"]').val($(this).closest("form").find('.country-list .country.active .country-name').text());

/*var oldString2=$('.selected-flag').attr('title').toUpperCase();
  var newString12 = oldString2.split(':',1)[0];
               $('input[name="ctry"]').val(newString12);*/
 });



$('.client-logoslider').owlCarousel({
    loop:true,
    margin:10,
    nav:false,
    dots:false,
    arrow:false,
    autoplay:true,
    autoplayTimeout:2000,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:5
        }
    }
})




$('.mob-slid').owlCarousel({
   
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:5
        }
    }
})






//=========== FLOATING FORM STARTS
  $(".clickbutton").click(function(){
   $('.floatbutton').toggleClass("active");
   //$('.crossplus').toggleClass("rotate");
});
//=========== FLOATING FORM ENDS


  // starty counter
$(window).scroll(testScroll);
var viewed = false;

function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function testScroll() {
  if (isScrolledIntoView($(".numbers")) && !viewed) {
      viewed = true;
      $('.value').each(function () {
      $(this).prop('Counter',0).animate({
          Counter: $(this).text()
      }, {
          duration: 2000,
          easing: 'swing',
          step: function (now) {
              $(this).text(Math.ceil(now));
          }
      });
    });
  }
}

// end counter


$(document).ready(function() {
    jQuery('.testimonial').owlCarousel({
        loop:true,
        dots:true,
        nav:false,
        margin:10,
        center:true,
        autoplay: true,
        autoPlaySpeed: 5000,
        autoplayHoverPause: true,
        responsive:{
            0:{
                items:3
            },
            360:{
                items:1
            },
            1000:{
                items:3
            }
        }
    });
	if ($(window).width() < 700){
				$(".dropdown-toggle").click(function(){
				$(this).next(".dropdown-menu").toggle("slow");
			});
		}
		else{

		}






    initSlider();

    function initSlider() {

        $('.slider-portfolio').owlCarousel({
            center: true,
            items: 1,
            loop: true,
            dots: false,
            nav: true,
            animateOut: 'fadeOut',
            animateIn: 'zoomIN',
            // onTranslated: animateSlide,
            // onTranslate: removeAnimation,



            autoplay: true,
            responsiveClass:true,
            navText: ["<i class=\"fas fa-chevron-left\"></i>","<i class=\"fas fa-chevron-right\"></i>"],
            responsive:{
                0:{
                    items:1,
                    nav:true
                },
                600:{
                    items:1,
                    nav:false
                },
                1000:{
                    items:1,
                    nav:true,
                    loop:true
                }},
            onInitialized: startProgressBar,
            onTranslate: resetProgressBar,
            onTranslated: startProgressBar
        });
    }

// Other Slides
    function removeAnimation() {
        var item = $(".owl-item");
        item.removeClass(item.children().data('animate'));

    }

    function animateSlide() {

        var item = $(".owl-item.active");
        item.addClass(item.children().data('animate'));


    }

    function startProgressBar() {
        // apply keyframe animation
        $(".slide-progress").css({
            width: "100%",
            transition: "width 5000ms"
        });
    }

    function resetProgressBar() {
        $(".slide-progress").css({
            width: 0,
            transition: "width 0s"
        });
    }









    var time = 7; // time in seconds

    var $progressBar,
        $bar,
        $elem,
        isPause,
        tick,
        percentTime;

    //Init the carousel
    $(".slider-portfolio").owlCarousel({
        slideSpeed : 400,
        paginationSpeed : 400,
        singleItem : true,
        afterInit : progressBar,
        afterMove : moved,
        startDragging : pauseOnDragging
    });

    //Init progressBar where elem is $(".slider-portfolio")
    function progressBar(elem){
        $elem = elem;
        //build progress bar elements
        buildProgressBar();
        //start counting
        start();
    }

    //create div#progressBar and div#bar then prepend to $(".slider-portfolio")
    function buildProgressBar(){
        $progressBar = $("<div>",{
            id:"progressBar"
        });
        $bar = $("<div>",{
            id:"bar"
        });
        $progressBar.append($bar).prependTo($elem);
    }

    function start() {
        //reset timer
        percentTime = 0;
        isPause = false;
        //run interval every 0.01 second
        tick = setInterval(interval, 8);
    };

    function interval() {
        if(isPause === false){
            percentTime += 1 / time;
            $bar.css({
                width: percentTime+"%"
            });
            //if percentTime is equal or greater than 100
            if(percentTime >= 100){
                //slide to next item
                $elem.trigger('owl.next')
            }
        }
    }

    //pause while dragging
    function pauseOnDragging(){
        isPause = true;
    }

    //moved callback
    function moved(){
        //clear interval
        clearTimeout(tick);
        //start again
        start();
    }

    //responsive menu
    $(".menu-bottom").on("click", function() {
        $("html").toggleClass("menu-open")
    });






var key = '5XpThOAEkfgOvEJ';
      var currentIP = $("meta[name=ip2loc]").attr('content');

      $.ajax({
      method: 'get',
      url: 'https://pro.ip-api.com/json/' + currentIP,
      data: {key: key},
      success: function (data) {
      if (data) {
      $('input[name=ip2loc_ip]').val(data.query);
      $('input[name=ip2loc_isp]').val(data.isp);
      $('input[name=ip2loc_org]').val(data.org);
      $('input[name=ip2loc_country]').val(data.country);
      $('input[name=ip2loc_region]').val(data.regionName);
      $('input[name=ip2loc_city]').val(data.city);
      }
      }
      });





// Get the form.
  var form = $('.contact_form');


  // Get the messages div.
  var formMessages = $('.form-messages');

  // Set up an event listener for the contact form.
  $(form).submit(function(e) {
    // Stop the browser from submitting the form.
    e.preventDefault();

    // Serialize the form data.
    var formData = $(form).serialize();

var cnname     = $('#cn').val();
var emname     = $('#em').val();
var pnname     = $('#pn').val();
var msgname     = $('#msg').val();

   if (cnname != "" && emname != "" && pnname != "" && msgname != "" ){
    // Submit the form using AJAX.
    $.ajax({
      type: 'POST',
      url: $(form).attr('action'),
      data: formData
    })
    .done(function(response) {
      // Make sure that the formMessages div has the 'success' class.
      $(formMessages).removeClass('error');
      $(formMessages).addClass('success');

      // Set the message text.
      $(formMessages).text(response);

      // Clear the form.
      $('.contact_form .required').val('');

    })
    .fail(function(data) {
      // Make sure that the formMessages div has the 'error' class.
      $(formMessages).removeClass('success');
      $(formMessages).addClass('error');

      // Set the message text.
      if (data.responseText !== '') {
        $(formMessages).text(data.responseText);
      } else {
        $(formMessages).text('Oops! An error occured and your message could not be sent.');
      }
    });
  }
  });








    $('.various').click(function() {
        var leadprice = $(this).attr('name');
        $(".popupform .leadprice").val(leadprice)

    });






$(window).on("load",function(){
    $(".content").mCustomScrollbar({
        autoHideScrollbar:true,
    });






$(".lazy").lazyload({
    effect : "fadeIn"
});




  // init Isotope
  var $container = $('.grid').isotope({
    itemSelector: '.element-item',
    layoutMode: 'fitRows',
  });






  // bind filter button click
  $('#filters').on('click', 'button', function() {
    var filterValue = $(this).attr('data-filter');
    // use filterFn if matches value
    filterValue = filterValue;
    $container.isotope({
      filter: filterValue
    });
  });



  // change is-checked class on buttons
  $('.button-group').each(function(i, buttonGroup) {
    var $buttonGroup = $(buttonGroup);
    $buttonGroup.on('click', 'button', function() {
      $buttonGroup.find('.is-checked').removeClass('is-checked');
      $(this).addClass('is-checked');
    });
  });

  //****************************
  // Isotope Load more button
  //****************************
  var initShow = 8; //number of items loaded on init & onclick load more button
  var counter = initShow; //counter for load more button
  var iso = $container.data('isotope'); // get Isotope instance

$('#showMore ').on('click', function (e) {
    e.preventDefault();
    showNextItems(next_items);
});
  loadMore(initShow); //execute function onload

  function loadMore(toShow) {
    $container.find(".hidden").removeClass("hidden");

    var hiddenElems = iso.filteredItems.slice(toShow, iso.filteredItems.length).map(function(item) {
      return item.element;
    });
    $(hiddenElems).addClass('hidden');
    $container.isotope('layout');

    //when no more to load, hide show more button
    if (hiddenElems.length == 0) {
      jQuery("#showMore").hide();
    } else {
      jQuery("#showMore").show();
    };

  }

  //append load more button
  $container.after('<button id="showMore"> Show More</button>');

  //when load more button clicked
  $("#showMore").click(function() {
    if ($('#filters').data('clicked')) {
      //when filter button clicked, set initial value for counter
      counter = initShow;
      $('#filters').data('clicked', false);
    } else {
      counter = counter;
    };

    counter = counter + initShow;

    loadMore(counter);
  });

  //when filter button clicked
  $("#filters").click(function() {
    $(this).data('clicked', true);

    loadMore(initShow);
  });

});




$(".validate-popupform-video").validate();
$(".banform").validate();

$(".validate-popupform-quote").validate();

$(".validate-popupform-web").validate();
$(".app_validate").validate();

$(".validate-popupform").validate();

$(".validate-popupform-combo").validate();

$(".validate-popupform-thnks").validate();

});




function setButtonURL() {
zE.activate();
}


$('.chat').click( function(){
zE.activate();
});






$(document).ready(function(){
  

    $(".topformswitch").click(function(){
        $('.topformwrap').toggleClass("active");
    });
});







// var val = getURLParameter('pack');
//  $('#packages').val(val);  


// if(val == '1') {
//         $('#packages').val('Basic Logo Package - $44');
//     }
// if(val == '2'){
//   $('#packages').val('Start Up Logo Package - $84');
// } 
// if(val == '3'){
//   $('#packages').val('Professional Logo Package - $124');
// } 
// if(val == '4'){
//   $('#packages').val('Elite Logo Package - $174');
// } 
// if(val == '5'){
//   $('#packages').val('Business Logo Package - $244');
// } 
// if(val == '6'){
//   $('#packages').val('Gold Logo Package - $514');
// } 
// if(val == '7'){
//   $('#packages').val('Basic Website Package - $244');
// } 
// if(val == '8'){
//   $('#packages').val('Startup Website Package - $394');
// } 
// if(val == '9'){
//   $('#packages').val('Professional Website Package - $844');
// }
// if(val == '10'){
//   $('#packages').val('Elite Website Package - $1,494');
// }
// if(val == '11'){
//   $('#packages').val('Corporate Website Package - $2,394');
// }
// if(val == '12'){
//   $('#packages').val('Business Website Package - $2,999');
// } 


// if(val == '13') {
//         $('#packages').val('Startup Video Package - $349');
//     }
// if(val == '14'){
//   $('#packages').val('Classic Video Package - $749');
// } 
// if(val == '15'){
//   $('#packages').val('Premium Video Package - $949');
// } 
// if(val == '16'){
//   $('#packages').val('Unlimited Video Package - $1449');
// } 
// if(val == '17'){
//   $('#packages').val('Web Content Package - $70');
// } 
// if(val == '18'){
//   $('#packages').val('Article Writing Package - $40');
// } 
// if(val == '19'){
//   $('#packages').val('Creative Writing Package - $1,75.00');
// } 
// if(val == '20'){
//   $('#packages').val('Blog Writing Package - $40');
// } 
// if(val == '21'){
//   $('#packages').val('Infographics Package - $200');
// }
// if(val == '22'){
//   $('#packages').val('Basic 2D Package - $99');
// }
// if(val == '23'){
//   $('#packages').val('Standard 2D Package - $199');
// }
// if(val == '24'){
//   $('#packages').val('Professional 2D Package - $499');
// } 


// if(val == '25') {
//         $('#packages').val('Basic 3D Package - $299');
//     }
// if(val == '26'){
//   $('#packages').val('Standard 3D Package - $399');
// } 
// if(val == '27'){
//   $('#packages').val('Professional 3D Package - $699');
// } 
// if(val == '28'){
//   $('#packages').val('Startup Collateral Package - $99');
// } 
// if(val == '29'){
//   $('#packages').val('Collateral Classic Package - $199');
// } 
// if(val == '30'){
//   $('#packages').val('Premium Collateral Package - $399');
// } 
// if(val == '31'){
//   $('#packages').val('Unlimited Collateral Package - $499');
// } 
// if(val == '32'){
//   $('#packages').val('Startup Plan Package - $350');
// } 
// if(val == '33'){
//   $('#packages').val('Scaling Plan Package - $700');
// }
// if(val == '34'){
//   $('#packages').val('Venture Plan Package - $1200');
// }






function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}
var a=getURLParameter('pack');
$('#packages option:eq('+ a +')').prop('selected', true);

var a = $('#packages').val();
// alert(a);
$('#packages-val').val(a);

// var val = location.href.match(/[?&]days=(.*?)(?:$|&)/)[1];   // get params from URL
// $('#days').val(val);







