<template>
    <div class="left-block" :style="sliderPosition">
        <swiper :options="swiperOption" v-if="sliderImages && slide.width && slide.height">
            <swiper-slide v-if="sliderImages" v-for="(image, index) in sliderImages" :key="index"
                          class="slider-item"
                          :style="{ backgroundImage: 'url('+getImage(image, slide.width, slide.height)+')' }">
            </swiper-slide>
        </swiper>
        <div class="product-slider-nav">
            <div class="left-arrow">
                <img src="/images/product-slider/left-arrow-product-page.svg">
            </div>
            <div class="right-arrow">
                <img src="/images/product-slider/right-arrow-product-page.svg">
            </div>
            <div class="fullscreen-btn" style="display: none">
                <img src="/images/product-slider/fullscreen.svg">
            </div>
        </div>
    </div>
</template>
<script>
    import {swiper, swiperSlide} from 'vue-awesome-swiper';
    import {getImage} from './../mixins/getImage.js';
    import {mapGetters, mapActions, mapMutations} from 'vuex';

    export default {
        props: ['commonSlides'],
        mixins: [getImage],
        data() {
            return {
                swiperOption: {
                    nextButton: '.product-slider-nav>.right-arrow',
                    prevButton: '.product-slider-nav>.left-arrow',
                    slidesPerView: 1,
                    paginationClickable: false,
                    spaceBetween: 0,
                    speed: 400,
                    effect: 'fade',
                    loop: false
                },
                slide: {
                    width: 0,
                    heigth: 0
                },
                leftHeight: 0,
            }
        },
        components: {
            swiper,
            swiperSlide
        },
        updated() {
            let _that = this;
            this.$nextTick(() => {
                _that.slide.width = parseInt($('.left-block').width());
                _that.slide.height = parseInt($('.left-block').height());
                _that.leftHeight = parseInt($('.left-block').height());
                _that.leftHeight = parseInt($('.left-block').height());
                _that.rightHeight = parseInt($('.top-info-block .right-block').height()) + parseInt($('header').height())
            });
        },
        computed: {
            ...mapGetters(['selectedVariant', 'scrolledFromTop']),
            sliderPosition() {
                if (this.leftHeight > this.rightHeight - this.scrolledFromTop && window.innerWidth > 1069) {
                    return [{position: 'absolute'}, {bottom: '0'}]
                } else if (this.leftHeight < this.rightHeight - this.scrolledFromTop && window.innerWidth > 1069) {
                    return [{position: 'fixed'}, {top: '0'}];
                } else {
                    return false;
                }
            },
            sliderImages() {
                if (!!this.selectedVariant && this.selectedVariant[0]) {
                    let selected = this.selectedVariant[0].images;
                    return selected;
                }
            }
        }
    }
</script>