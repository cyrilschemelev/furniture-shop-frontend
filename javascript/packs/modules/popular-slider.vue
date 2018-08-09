<template>
    <div class="main-wrapper" v-if="sliderItems.length">
        <div class="popular-product product_page">
            <div class="title">
                <div class="left-arrow popular">
                    <img src="/images/arrow-left.svg">
                </div>
                <span>{{ sliderTitle }}</span>
                <div class="right-arrow popular">
                    <img src="/images/arrow-left.svg">
                </div>
            </div>
            <swiper class="popular-product-slider" v-if="sliderItems" :options="popularSwiperOptions"
                    ref="popularSwiper">
                <swiper-slide class="product-card"
                              v-for="(slide, index) in sliderItems" :key="index"
                              ref="popularSwiperSlide">
                    <a :href="url(slide)">
                        <div class="image-block" v-if="!slideWidth || !sliderHeight"></div>
                        <div class="image-block" v-if="slideWidth && sliderHeight"
                        :style="{
                        backgroundImage: 'url('+getImage(slide.first_variant_image, slideWidth, sliderHeight)+')',
                        backgroundPosition: '50% 50%',
                        height: sliderHeight+'px' }"></div>
                        <div class="title-card">
                            <span class="product-name">{{ slide.name }}</span>
                            <span class="product-price" itemprop="price">{{ displayedPrice(slide.price) }}</span>
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
        props: ['productId', 'sliderTitle'],
        mixins: [getImage, displayedPrice],
        components: {
            swiper,
            swiperSlide
        },
        data() {
            return {
                local: window,
                sliderItems: [],
                popularSwiperOptions: {
                    nextButton: '.popular-product .right-arrow',
                    prevButton: '.popular-product .left-arrow',
                    paginationClickable: false,
                    autoplay: false,
                    speed: 400,
                    effect: 'slide',
                    loop: true,
                    breakpoints: {
                        569: {
                            slidesPerView: 1,
                            spaceBetween: 30
                        },
                        819: {
                            slidesPerView: 2,
                            spaceBetween: 30
                        },
                        4000: {
                            slidesPerView: 3,
                            spaceBetween: 30
                        }
                    }
                },
                slideWidth: 0,
                clientWidth: document.documentElement.clientWidth
            }
        },
        created() {
            let _this = this,
                url = this.locale + '/api/v1/popular-products?id=' + this.productId;
            $.getJSON(url, function (response) {
                _this.sliderItems = response.popular_products;
            });
        },
        mounted() {
            window.addEventListener('resize', this.handleResize);
        },
        updated() {
            let _that = this;
            this.$nextTick(() => {
                _that.slideWidth = parseInt($('.popular-product .image-block').width());
            });
        },
        methods: {
            url(slide) {
                return this.locale + slide.url;
            },
            handleResize() {
                this.clientWidth = document.documentElement.clientWidth;
                this.slideWidth = $('.popular-product .image-block').innerWidth();
            }
        },
        computed: {
            ...mapGetters(['locale', 'currencies', 'currentCurrency', 'currentCurrencyRate']),
            sliderHeight() {
                let width = this.clientWidth,
                    ratio = 0.9121;
                return parseInt(this.slideWidth * ratio);
            }
        }
    }
</script>