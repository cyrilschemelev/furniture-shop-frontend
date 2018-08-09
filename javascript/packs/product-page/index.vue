<template>
    <div>
        <div class="top-info-block">
            <product-slider :commonSlides="commonImages"></product-slider>
            <div class="right-block" data-hook="product_right_part">
                <div class="container-block">
                    <div v-html="breadcrumbs"></div>
                    <div class="title-product">
                        <h1 itemprop="name">{{ product.name }}</h1>
                    </div>
                    <div id="cart-form" data-hook="cart_form">
                        <div id="inside-product-cart-form" itemprop="offers" itemscope
                             itemtype="https://schema.org/Offer">
                            <product-property
                                    v-if="options"
                                    :description="description"
                                    :productDescription="productDescription"
                                    :options="options"
                                    :variants="product.variants">
                            </product-property>
                            <div class="add-to-cart">
                                <button class="add-to-cart-btn" type="submit"
                                        v-on:click="sendToCart(selectedVariant[0])">
                                    <span>{{ addToCart }}</span>
                                </button>
                            </div>
                            <wishlist-add-button
                                    :add-to-favorites="addToFavorites"
                                    :product-id="productId">
                            </wishlist-add-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Общие изображения могут появиться в дальнейшем и могут быть включены -->
        <div class="bottom-info-block empty"></div>
        <!--<div :class="commonImages.length ? 'bottom-info-block' : 'bottom-info-block empty'">-->
        <!--<div class="left-container" ref="leftImage">-->
        <!--<div class="left-image"-->
        <!--v-for="image in commonImages" v-if="commonImages"-->
        <!--:style="{ backgroundPosition: '50% 50%', backgroundImage: 'url('+image.md_url+')', height: leftImageHeight+'px' }">-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="right-container">-->
        <!--<div class="inner-container">-->
        <!--<div class="fixed-right-image"-->
        <!--:style="fixedStyle"></div>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--<popular-slider v-if="product.id" :product-id="product.id" :slider-title="sliderTitle"></popular-slider>-->
    </div>
</template>
<script>
    // показываем по опциям изображения варианта
    //// определяем размер изображения
    // fixed position
    // scroll

    import ProductProperty from './property.vue';
    import ProductSlider from './slider.vue';
    import WishlistAddButton from './../wishlist/add-button.vue';
    import PopularSlider from './../modules/popular-slider.vue';
    import SpecialOfferSlider from './../modules/special-offer-slider.vue'
    import {mapGetters, mapActions, mapMutations} from 'vuex';

    export default {
        components: {
            ProductProperty,
            ProductSlider,
            WishlistAddButton,
            PopularSlider,
            SpecialOfferSlider
        },
        props: ['breadcrumbs', 'description', 'productId', 'sliderTitle', 'addToFavorites', 'addToCart'],
        data() {
            return {
                product: '',
                leftImageHeight: 0,
                rightImageHeight: 0,
                fixedImage: {
                    breakpoint: {
                        top: 0,
                        bottom: 0
                    },
                    width: 0,
                    offsetLeft: []
                }
            }
        },
        created() {
            let url = this.locale + '/api/v1/products/' + this.productId,
                _this = this;
            $.getJSON(url, function (response) {
                _this.product = response;
                _this.$store.commit('pushVariants', response.variants);
            });
        },
        updated() {
            let _that = this;
            window.document.body.onscroll = function () {
                _that.$store.commit('updateScrolledFromTop', window.scrollY)
                //_.debounce(, 50); TODO with lodash debounce
            };
            // this.$nextTick(() => {
            //     _that.leftImageHeight = parseInt(_that.$refs.leftImage.clientWidth * 0.71);
            //     _that.rightImageHeight = parseInt(_that.fixedImage.width * 0.775);
            //     _that.fixedImage.breakpoint.top = parseInt(
            //         $('header').outerHeight() +
            //         parseInt($('.bottom-info-block').css('margin-top')) +
            //         $('.top-info-block').outerHeight() +
            //         $('.inner-container .fixed-right-image').outerHeight()
            //     );
            //     _that.fixedImage.width = parseInt($('.inner-container').last().width());
            //     _that.fixedImage.offsetLeft.w1070 = parseInt($('.right-container .inner-container').offset().left);
            //     _that.fixedImage.offsetLeft.w820 = parseInt($('.right-container .inner-container').offset().left) - parseInt($('.right-container .inner-container').css('padding-left'));
            //     _that.fixedImage.breakpoint.bottom = parseInt(
            //         $('header').outerHeight() +
            //         parseInt($('.bottom-info-block').css('margin-top')) +
            //         $('.top-info-block').outerHeight() +
            //         $('.bottom-info-block').outerHeight()
            //     );
            // });
        },
        methods: {
            sendToCart(variant) {
                let _that = this;
                $.post('/orders/populate', {
                    'variant_id': variant.id,
                    'quantity': 1
                }).then(function () {
                    alert(variant.name + ' – добавлено в корзину!');
                    _that.$store.commit('changeCartItemsQuantity', 1);
                });
            }
        },
        computed: {
            ...mapGetters(['locale', 'selectedVariant', 'scrolledFromTop']),
            options() {
                // берем варианты опций
                let allOptions = this.product.option_types;
                return allOptions;
            },
            commonImages() {
                if (!!this.product) {
                    return this.product.master.images.slice();
                } else {
                    return false;
                }
            },
            productDescription() {
                if (this.product.description) {
                    return this.product.description;
                } else {
                    return false;
                }
            },
            fixedStyle() {
                let a = [{backgroundPosition: '50% 50%'},
                    {backgroundImage: 'url(' + this.fixedPhoto + ')'},
                    {height: this.rightImageHeight + 'px'}];
                if (this.fixedImagePosition) {
                    return a.concat(this.fixedImagePosition);
                } else {
                    return a;
                }
            },
            fixedPhoto() {
                if (this.selectedVariant[0]) {
                    return this.selectedVariant[0].images[0].md_url;
                }
            },
            fixedImagePosition() {
                let scrolled = this.scrolledFromTop + window.innerHeight;
                if (scrolled > this.fixedImage.breakpoint.top && scrolled < this.fixedImage.breakpoint.bottom) {
                    let offset = [];
                    if (window.outerWidth > 1070) {
                        let offset = this.fixedImage.offsetLeft.w1070;
                    } else {
                        let offset = this.fixedImage.offsetLeft.w820;
                    }
                    return [
                        {position: 'fixed'},
                        {bottom: '0px'},
                        {width: this.fixedImage.width + 'px'},
                        {left: offset + 'px'}
                    ];
                } else if (scrolled > this.fixedImage.breakpoint.bottom) {

                    return [
                        {position: 'absolute'},
                        {bottom: '0'},
                        {width: this.fixedImage.width + 'px'}
                    ];
                } else {
                    return false
                }
            }
        }
    }
</script>