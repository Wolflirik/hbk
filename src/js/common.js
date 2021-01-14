$(window).on('load', function(){
  $('.preloader span').addClass('loaded');
  setTimeout(function(){$('.preloader').fadeOut()}, 1900);
});
$(document).on('ready', function(){
  $('.slider').owlCarousel({
    items:1,
    itemsDesktop:1200,
    itemsDesktopSmall:1080,
    itemsTablet:840,
    dots:true,
    itemsMobile:480,
    center:false,
    autoPlay : 3500,
    autoplayTimeout:3000,
    autoplayHoverPause:false
  });
  mixitup('.clients__container', {
    selectors: {
      target: '.clients__container-item'
    },
    animation: {
      duration: 300
    }
  }).sort();
  var element = $(".calculate__button");
  element.on("mouseover", function(e){
    var x = e.clientX,
    y = e.clientY,
    Woffset = $(window).scrollTop(),
    offst = $(this).offset(),
    point = $(this).find(".point"),
    fY = y-(offst.top-Woffset);
    point.css({"left":x-offst.left,"top":y-(offst.top-Woffset)});
    $(this).find(".point").addClass("active");
  });
  element.on("mouseout", function(e){
    var x = e.clientX,
    y = e.clientY,
    Woffset = $(window).scrollTop(),
    offst = $(this).offset(),
    point = $(this).find(".point"),
    fY = y-(offst.top-Woffset);
    point.css({"left":x-offst.left,"top":fY});
    $(this).find(".point").removeClass("active");
  });
  $('.menu-button').on('click', function(){
    $('body').toggleClass('menu__open');
    $(this).toggleClass('menu-button--active');
  });
  $(window).on('scroll', function(){
    if($(window).scrollTop() <= 10)
    $('.header').removeClass('scroll');
    else
    $('.header').addClass('scroll');
  });
  $('select').customSelect({
    block: 'select',
    includeValue: true
  });

  var showSize = 1;

  var calc = function() {
    var self = $(this),
        type = +$('[name=type]').val(),
        hours = +$('[name=hours]').val(),
        сonsultation = +$('[name=сonsultation]:checked').val(),
        print_size = +$('[name=print_size]').val(),
        ps = $('.calculate__print-size'),
        totalbox = $('.calculate__total-price'),
        total = hours*type+сonsultation;

    if(self.attr('name') == 'hours')
      $(this).parent().find('[data-selected]').attr('data-selected', `(selected ${hours})`);

    if(self.attr('name') == 'type') {
      if(['Print', 'Illustration'].indexOf(self.find('option:selected').text()) != -1) showSize = 1;
      else showSize = 0;
    }

    if(showSize) {
      total+=print_size;
      ps.show();
    } else {
      ps.hide();
    }

    totalbox.html(total)
  };

  $('.calculate-form').find('input, select').on('input change', calc);
  calc();

  $('a.scroll-to').on('click', function(e) {
    e.preventDefault();
    if($('.menu-button--active').length) {
      $('body').removeClass('menu__open');
      $('.menu-button--active').removeClass('menu-button--active');
    }
    var to = $(this).attr('href'),
        top = 0;
    if($(to).length){
      top = $(to).offset().top - 100;
    }
    $("html, body").stop().animate({scrollTop:top}, 800);
  });

});
