<template>
    <div class="header-slider" v-if="slides">
        <swiper :options="swiperOption">
            <swiper-slide v-for="slide in slides" :key="slide.position">
                <!--<div class="slide bg" :style="{-->
                <!--backgroundImage: 'url('+getImage(slide.background, slideWidth, slideHeight)+')',-->
                <!--backgroundPosition: '50% 50%',-->
                <!--height: slideHeight+'px' }"></div>-->

                <div class="slide bg"
                     :style="{
                        backgroundPosition: '50% 40%',
                        height: slideHeight+'px',
                        backgroundImage: 'url('+getImage(slide.background, slideWidth, slideHeight)+')'}">
                </div>
                <div class="bg-shadow"></div>
                <div class="text-container">
                    <h3 v-html="headline(slide)"></h3>
                    <span v-if="description(slide)">{{ description(slide) }}</span>
                </div>
            </swiper-slide>
            <div class="swiper-pagination" id="swiper-pagination-home" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>

    import {swiper, swiperSlide} from 'vue-awesome-swiper';
    import {getImage} from './../mixins/getImage.js';
    import {mapGetters, mapActions, mapMutations} from 'vuex';

    export default {
        props: ['slidesJson'],
        mixins: [getImage],
        data() {
            return {
                swiperOption: {
                    loop: false,
                    // lazyLoading: true,
                    // lazyLoadingOnTransitionStart: false,
                    autoplay: false,
                    slidesPerView: 1,
                    speed: 400,
                    initialSlide: 0,
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    paginationClickableClass: 'dot',
                    bulletClass: 'dot',
                    bulletActiveClass: 'active',
                    paginationBulletRender(swiper, index, className) {
                        return `<div class="${className}"><span></span></div>`
                    },
                },
                slideWidth: 0,
                clientWidth: 0,
                slideHeight: 0,
            }
        },
        components: {
            swiper,
            swiperSlide
        },
        created() {
            window.addEventListener('resize', this.handleResize);
        },
        mounted() {
            this.clientWidth = document.documentElement.clientWidth;
            this.slideWidth = $('.header-slider').width();
            this.slideHeight = $('.header-slider').height();
            setTimeout(() => {
                this._data.swiperOption.lazyLoadingOnTransitionStart = true;
            }, 7000);
        },
        methods: {
            headline(slide) {
                let name = 'text_' + window.Spree.url_params.locale;
                return slide[name];
            },
            description(slide) {
                let name = 'bottom_text_' + window.Spree.url_params.locale;
                return slide[name];
            },
            handleResize() {
                this.clientWidth = document.documentElement.clientWidth;
                this.slideWidth = $('.header-slider').width();
            }
        },
        computed: {
            ...mapGetters(['locale']),
            slides() {
                return JSON.parse(this.slidesJson).slides;
            }
        }
    }
</script>