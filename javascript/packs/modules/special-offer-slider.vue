<template>
    <div class="main-wrapper" v-if="sliderItems.length">
        <div class="special-offer product_page">
            <div class="title">
                <div class="left-arrow popular">
                    <img src="/images/arrow-left.svg">
                </div>
                <span>{{ sliderTitle }}</span>
                <div class="right-arrow popular">
                    <img src="/images/arrow-left.svg">
                </div>
            </div>
            <swiper class="special-offer-slider" v-if="sliderItems" :options="popularSwiperOptions" ref="specialSlider">
                <swiper-slide class="product-card"
                              v-for="(slide, index) in sliderItems" :key="index">
                    <a :href="url(slide)">
                        <div class="image-block" v-if="!slideWidth || !sliderHeight"></div>
                        <div :data-background="getImage(slide.first_variant_image, slideWidth, sliderHeight)"
                             class="image-block swiper-lazy"
                             :style="{
                        backgroundPosition: '50% 50%',
                        height: sliderHeight+'px' }">
                            <!--<div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>-->
                            <div class="swiper-lazy-preloader"></div>
                        </div>
                        <div class="title-card">
                            <span class="product-name">{{ slide.name }}</span>
                            <span class="product-old-price"
                                  v-if="slide.old_price">{{ displayedPrice(slide.old_price) }}</span>
                            <span class="product-price" v-if="slide.price" itemprop="price">{{ displayedPrice(slide.price) }}</span>
                        </div>
                    </a>
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>
<script>
    import {swiper, swiperSlide} from 'vue-awesome-swiper';
    import {mapGetters, mapMutations} from 'vuex';
    import {getImage} from './../mixins/getImage.js';
    import {displayedPrice} from './../mixins/displayedPrice.js'

    export default {
        props: ['productId', 'sliderTitle', 'sliderItemsJson'],
        mixins: [getImage, displayedPrice],
        components: {
            swiper,
            swiperSlide
        },
        data() {
            return {
                local: window,
                popularSwiperOptions: {
                    nextButton: '.special-offer .right-arrow',
                    prevButton: '.special-offer .left-arrow',
                    paginationClickable: false,
                    autoplay: false,
                    speed: 400,
                    effect: 'slide',
                    loop: false,
                    lazyLoading: true,
                    watchSlidesVisibility: true,
                    lazyLoadingOnTransitionStart: false,
                    breakpoints: {
                        569: {
                            slidesPerView: 1,
                            spaceBetween: 30,
                        },
                        819: {
                            slidesPerView: 2,
                            spaceBetween: 30,

                        },
                        4000: {
                            slidesPerView: 3,
                            spaceBetween: 30,

                        }
                    }
                },
                slideWidth: 0,
                clientWidth: document.documentElement.clientWidth
            }
        },
        mounted() {
            window.addEventListener('resize', this.handleResize);
            this.slideWidth = $('.special-offer-slider .image-block').innerWidth();
            setTimeout(() => {
                this._data.popularSwiperOptions.lazyLoadingOnTransitionStart = true;
            }, 7000);
        },
        methods: {
            url(slide) {
                return this.locale + slide.url;
            },
            handleResize() {
                this.clientWidth = document.documentElement.clientWidth;
                this.slideWidth = $('.special-offer-slider .image-block').innerWidth();
            }
        },
        computed: {
            ...mapGetters(['locale', 'currencies', 'currentCurrency', 'currentCurrencyRate']),
            sliderHeight() {
                let width = this.clientWidth,
                    ratio = 0.9121;
                return parseInt(this.slideWidth * ratio);
            },
            sliderItems() {
                return JSON.parse(this.sliderItemsJson).special_offers;
            }
        }
    }
</script>