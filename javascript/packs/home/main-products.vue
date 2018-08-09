<!--
<template>
    <div class="main-wrapper product-container" v-if="products">
        &lt;!&ndash;<div class="col-lg-4 col-md-6 col-sm-4 col-xs-4 col-xxs-12 main-product-elem" data-hook="products_list_item"&ndash;&gt;
        <div class="main-product-elem" data-hook="products_list_item"
             itemscope itemtype="https://schema.org/Product" v-for="product in products" :key="product.position">
            <div class="product-card">
                <a :href="product.product_link">
                    <div class="image-block" :style="{
                        // backgroundImage: 'url('+getImage(product.images, slideWidth, sliderHeight)+')',
                        backgroundPosition: '50% 50%',
                        height: sliderHeight+'px' }"></div>
                </a>
                <a :href="product.product_link" class="product-name">{{ product.name }}</a>
                &lt;!&ndash;<span class="product-price" itemprop="price">{{ displayedPrice(product.price) }}</span>&ndash;&gt;
            </div>
        </div>
    </div>
</template>
<script>
    import {mapGetters, mapActions, mapMutations} from 'vuex';
    import {getImage} from './../mixins/getImage.js';
    import {displayedPrice} from './../mixins/displayedPrice.js'

    export default {
        mixins: [displayedPrice, getImage],
        data() {
            return {
                products: [],
                slideWidth: 0,
                clientWidth: document.documentElement.clientWidth
            }
        },
        created() {
            let url = this.locale + '/api/v1/main-products',
                _this = this;
            $.getJSON(url, function (response) {
                _this.products = response.main_products;
            });
        },
        mounted() {
            window.addEventListener('resize', this.handleResize);
        },
        updated(){
            let _that = this;
            this.$nextTick(() => {
                _that.slideWidth = parseInt($('.product-container .product-card .image-block').width());
            });
        },
        methods: {
            handleResize() {
                this.clientWidth = document.documentElement.clientWidth;
                this.slideWidth = $('.product-container .product-card .image-block').width();
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

</script>-->
