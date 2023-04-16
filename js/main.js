class Hover3D 
{
    constructor(id)
    {
        this.id = id;
        this.xOffset = 10;
        this.yOffset = 10;
        this.attack = 0.1;
        this.release = 0.5;
        this.perspective = 500;
        this.create();
    }

    create()
    {
        document.querySelectorAll(this.id).forEach(element => 
        {
            const rectTransform = element.getBoundingClientRect();
            const perspective = "perspective(" + this.perspective + "px) ";
            element.style.setProperty("transform-style", "preserve-3d");
            
            element.addEventListener("mouseenter", e =>
            {
                element.style.setProperty("transition", "transform " + this.attack + "s");
            })

            element.addEventListener("mousemove", e => 
            {
                let dy = e.clientY - rectTransform.top;
                let dx = e.clientX - rectTransform.left;
                let xRot = this.map(dx, 0, rectTransform.width, -this.xOffset, this.xOffset);
                let yRot = this.map(dy, 0, rectTransform.height, this.yOffset, -this.yOffset);
                let propXRot = "rotateX(" + yRot + "deg) ";
                let propYRot = "rotateY(" + xRot + "deg)";

                element.style.setProperty("transform", perspective + propXRot + propYRot);
            })

            element.addEventListener("mouseleave", e => 
            {
                element.style.setProperty("transition", "transform " + this.release + "s");
                element.style.setProperty("transform", perspective + "rotateX(0deg) rotateY(0deg)");
            })
        })
    }
    // Processing map() function
    map(value, istart, istop, ostart, ostop) 
    {
        return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
    }
}


(function ($) {
    "use strict";
    
    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 30
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });
    

    // Typed Initiate
    if ($('.header h2').length == 1) {
        var typed_strings = $('.header .typed-text').text();
        var typed = new Typed('.header h2', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }
    
    
    // Skills
    $('.skills').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});
    
    
    // Porfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('filter-active');
        $(this).addClass('filter-active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
    
    
    // Review slider
    $('.review-slider').slick({
        autoplay: true,
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
})(jQuery);

const obj = new Hover3D(".threeD_effect");