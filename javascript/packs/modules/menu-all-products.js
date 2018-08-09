// $(document).ready(function() {
//     // taxons
//     if ($('.nav-elem.active').length == 1) {
//         let activeTaxon = $('.nav-elem.active');
//         href = activeTaxon.attr('href');
//         newLink = href.substring(0, href.lastIndexOf('/'));
//         activeTaxon.attr("href", newLink);
//     }
//
//     // navigation background block
//     // let activePos = .position();
//
//     $('.navigation').mouseleave(function (e) {
//         e.preventDefault();
//         $('.menu-background-slide').css('width',0);
//     });
//     $('.navigation .nav-elem').hover(function () {
//         if ($('.hamb-menu').is(':hidden')) {
//             let activeElem = $(this);
//             let activePos = activeElem.position();
//             $(this).addClass('hovered');
//             changePos(activePos,activeElem);
//         }
//     }, function () {
//         $(this).removeClass('hovered');
//     });
// });
//
// function changePos(activePos,activeElem) {
//     $('.menu-background-slide').stop().css({
//         left: activePos.left,
//         width: activeElem.width()
//     });
//     if (activeElem.hasClass('active')){
//         $('.menu-background-slide').stop().css({
//             left: activePos.left,
//             width: activeElem.width() + 6
//         });
//     }
// }