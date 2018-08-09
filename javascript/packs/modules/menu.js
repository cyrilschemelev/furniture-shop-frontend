$(document).ready(function () {

    // let tempScrollTop = 0,
    //     currentScrollTop = 0;
    // $(window).scroll(function () {
    //     currentScrollTop = $(window).scrollTop();
    //     if (currentScrollTop >= 80) {
    //         if ((tempScrollTop + 20) < currentScrollTop && $('.header-main__burger').hasClass('active') === false) {
    //             // скролл вниз
    //             $('header').css('position', 'absolute');
    //             $('.menu-overview').css('position', 'absolute');
    //             tempScrollTop = currentScrollTop;
    //         }
    //         else if (tempScrollTop > (currentScrollTop + 50)) {
    //             // скролл вверх
    //             $('header').css('position', 'fixed');
    //             $('.menu-overview').css('position', 'fixed');
    //             tempScrollTop = currentScrollTop;
    //         }
    //     }
    //     else if (currentScrollTop <= 80 && $('.header-main__burger').hasClass('active') === false) {
    //         $('header').css('position', 'absolute');
    //         $('.menu-overview').css('position', 'absolute');
    //     }
    // });
    let windowWidth = $(window).width();

    // изменять изображения при наведении на секцию в выпадающем меню
    $('.section.products>.nav-container>a').hover(function () {
        let indexProduct = $(this).index();
        $('.section.products .current-hover-image-container').css({'display': 'none'});
        $('.section.products .current-hover-image-container').eq(indexProduct).css({'display': 'block'});
    });

    $('.center-container > .text-block > a.dropdown-menu-block').hover(function () {
        $('.black-overlay').addClass('visible');
        closeSections();
        openNewSection($(this));
    });

    // menu hover effect
    function openNewSection(section) {
        let height = $('.header-container').height(),
            menuSection = $('.section.' + section.attr('id')),
            leftDistance = section.offset().left;
        menuSection.addClass('visible');
        menuSection.css('top', height);
        menuSection.css('left', leftDistance);

        // dropmenu 1070
        if ((window.matchMedia('(max-width: 1319px)').matches) && (menuSection.hasClass('partnership'))) {
            menuSection.css('left', leftDistance - 114.359);
        } else {
            menuSection.css('left', leftDistance);
        }

        // последовательное появление
        //menuSection.find('.nav-container').children().each(function (i) {
        //    $(this).delay(300).delay((i++) * 50).fadeTo(200, 1);
        //});
        //menuSection.find('.image-block').delay(160).fadeTo(400, 1);
    }

    function closeSections() {
        $('.menu-sections').children().removeClass('visible');
        // скрытие элементов выпадающего section
        //$('.nav-container').children().each(function () {
        //    $(this).fadeOut(100);
        //});
    }


    // overlay
    $('.black-overlay').hover(function () {
        $('.black-overlay').removeClass('visible');
        closeSections();
        $('.section').css({'transition': 'height 0.9s cubic-bezier(0.19, 1, 0.22, 1) !important'});
        $('body').removeClass('mobile-menu-visible');
        $('.hamb-inner-menu').removeClass('active');
        $('.hamb-inner-menu .inner-right-menu').removeClass('active');
        $('.hamb-inner-menu .products-a').removeClass('active');
        $('.hamb-inner-menu .partner-a').removeClass('active');
    });

    // Мобильное меню – hamb menu
    // Кнопка "Назад"
    $('.back-hamb-menu').on('click', function () {
        $('.hamb-inner-menu .inner-right-menu').removeClass('active');
        $('.hamb-inner-menu .partner-a').removeClass('active');
        $('.hamb-inner-menu .products-a').removeClass('active');
        $('.hamb-inner-menu .inner-left-menu').css({'display': 'block'});
    });

    $('.hamb-menu').on('click', function () {
        $('body,html').animate({scrollTop: 0}, 0);
        if (!$('.hamb-inner-menu').hasClass('active')) {
            $('.hamb-inner-menu').addClass('active');
            $('.black-overlay').addClass('display visible');
            $('body').css('overflow', 'hidden');
            $('header').addClass('active');
        } else {
            $('header').removeClass('active');
            $('body').css('overflow', '');
            $('body').addClass('mobile-menu-visible'); // main.scss
            $('.hamb-inner-menu').removeClass('active');
            $('.black-overlay').removeClass('display visible');
            $('.hamb-inner-menu .inner-right-menu').removeClass('active');
            $('.hamb-inner-menu .products-a').removeClass('active');
            $('.hamb-inner-menu .partner-a').removeClass('active');
            $('body').removeClass('mobile-menu-visible');
        }
    });

    $('.hamb-inner-menu .products-a').on('click', function () {
        // 320px exception
        if (window.matchMedia('(max-width: 569px)').matches) {
            $('.hamb-inner-menu .inner-left-menu').css({'display': 'none'});
        }
        $('.hamb-inner-menu .partner-a').removeClass('active');
        $(this).addClass('active');
        $('.hamb-inner-menu .inner-right-menu .partner-right-menu').removeClass('active');
        $('.hamb-inner-menu .inner-right-menu').addClass('active');
        $('.hamb-inner-menu .inner-right-menu').removeClass('hidden');
        $('.hamb-inner-menu .inner-right-menu .products-right-menu').addClass('active');
    });

    $('.hamb-inner-menu .partner-a').on('click', function () {
        // 320px exception
        if (window.matchMedia('(max-width: 569px)').matches) {
            $('.hamb-inner-menu .inner-left-menu').css({'display': 'none'});
        }
        $('.hamb-inner-menu .products-a').removeClass('active');
        $(this).addClass('active');
        $('.hamb-inner-menu .inner-right-menu .products-right-menu').removeClass('active');
        $('.hamb-inner-menu .inner-right-menu').addClass('active');
        $('.hamb-inner-menu .inner-right-menu').removeClass('hidden');
        $('.hamb-inner-menu .inner-right-menu .partner-right-menu').addClass('active');
    });

    $(window).resize(function () {
        if (windowWidth >= '1070') {
            $('.hamb-inner-menu').removeClass('active');
            $('.black-overlay').removeClass('visible');
            $('.hamb-inner-menu .inner-right-menu').removeClass('active');
            $('.hamb-inner-menu .products-a,.hamb-inner-menu .partner-a ').removeClass('active');
            $('body').removeClass('mobile-menu-visible');
        }
        if (windowWidth == '569') {
            $('.hamb-inner-menu .products-a,.hamb-inner-menu .partner-a ').removeClass('active');
            $('.inner-right-menu').removeClass('active').addClass('hidden');
        }
    });

    // Выбор валюты, языка
    $('.currency-menu, .lang-menu').on('click', function () {
        // $('.lang-menu').find('.drop-menu').removeClass('active');
        let langPopup = $(this),
            dropPopup = langPopup.find('.drop-menu');

        $(this).toggleClass('active');
        $(this).find('.drop-menu').toggleClass('active');

        $(document).mouseup(function (e) {
            if (!langPopup.is(e.target) // если клик был не по нашему блоку
                && langPopup.has(e.target).length === 0) { // и не по его дочерним элементам
                dropPopup.removeClass('active'); // скрываем его
                langPopup.removeClass('active');
            }
        });
    });
});