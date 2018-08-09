<template>
    <div id="all-products" class="all-product-container main-wrapper">
        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-6 col-xxs-12 triple-grid" data-hook="products_list_item"
             itemscope itemtype="https://schema.org/Product" v-for="item in items">
            <div class="product-card">
                <a target="_blank" itemprop="url" :href="url(item)">
                    <div class="image-block" v-if="!slideWidth"></div>
                    <div class="image-block" v-if="slideWidth" :style="{
                        backgroundImage: 'url('+getImage(item.first_variant_image, slideWidth, slideHeight)+')',
                        backgroundPosition: '50% 50%',
                        height: slideHeight+'px' }"></div>
                    <span class="product-name" itemprop="name" title="product.name">{{ item.name }}</span>
                    <div class="product-price">
                        <span itemprop="offers" itemscope itemtype="https://schema.org/Offer">
                            <span class="product-old-price" itemprop="price"
                                  content="" v-if="item.old_price">{{ displayedPrice(item.old_price) }}</span>
                            <span class="product-price" itemprop="price"
                                content="" v-if="item.price">{{ displayedPrice(item.price) }}</span>
                        </span>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>
<script>
    import {getImage} from './../mixins/getImage.js';
    import {displayedPrice} from './../mixins/displayedPrice.js';
    import {mapGetters} from 'vuex';

    export default {
        props: ['items'],
        mixins: [displayedPrice, getImage],
        data() {
            return {
                slideWidth: 0,
                clientWidth: document.documentElement.clientWidth,
            }
        },
        mounted() {
            window.addEventListener('resize', this.handleResize);
        },
        updated() {
            this.slideWidth = parseInt($('.all-product-container .image-block').width());
        },
        methods: {
            handleResize() {
                this.clientWidth = document.documentElement.clientWidth;
                this.slideWidth = $('.all-product-container .image-block').innerWidth();
            },
            url(item) {
                return this.locale + item.url;
            },
        },
        computed: {
            ...mapGetters([
                'locale',
                'currencies',
                'currentCurrency',
                'currentCurrencyRate'
            ]),
            slideHeight() {
                let width = this.slideWidth,
                    ratio = 0.9121;
                return parseInt(width * ratio);
            }
        }
    }
</script>