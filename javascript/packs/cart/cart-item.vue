<template>
    <div class="col-md-8 col-lg-8 col-sm-12 col-xs-12 left-block">
        <div class="basket-product" v-for="(item, index) in items">
            <div class="left-block">
                <a class="cart-image-mobile"
                   :href="'/products/'+item.variant.product_id"
                   :style="{
                       backgroundImage: 'url('+photo(item)+')',
                       height: sliderHeight(index)+'px'
                       }">
                </a>
            </div>

            <div class="center-block">
                <div class="first-line">
                    <span class="name">{{ item.variant.name }}</span>
                    <span class="price">{{ displayedPrice(item.price) }}</span>
                </div>
                <div class="desc">
                    <div class="table-color" v-for="property in item.variant.option_values">
                        {{ property.option_type_presentation }}: <span>{{ property.presentation }}</span>
                    </div>
                </div>
                <div class="vol-product" :style="buttonsPosition">
                    <div class="left-btn" v-on:click="changeQuantity(item, -1)">
                        <img src="/images/minus-btn.svg">
                    </div>
                    <input name="quantity" min="0" class="value" size="2" readonly="true"
                           data-item-id="line_item.id"
                           data-item-price="line_item.price" v-bind:value="item.quantity">
                    <div class="right-btn" v-on:click="changeQuantity(item, 1)">
                        <img src="/images/plus-btn.svg">
                    </div>
                </div>
            </div>
            <div class="right-block">
                <span class="price">{{ displayedPrice(item.price) }}</span>
                <a class="delete" v-on:click="deleteItem(item, index)">
                    <img src="/images/trash-icon.svg">
                </a>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapGetters, mapActions, mapMutations} from 'vuex';
    import {displayedPrice} from './../mixins/displayedPrice.js'

    export default {
        props: [
            'items',
            'spreeCurrentOrderId',
            'spreeCurrentOrderToken'],
        mixins: [displayedPrice],
        data() {
            return {
                leftBlockHeight: $('.left-block').innerHeight(),
                rightBlockHeight: $('.center-block').innerHeight(),
                clientWidth: document.documentElement.clientWidth,
                leftBlockWidth: 0
            }
        },
        mounted() {
            window.addEventListener('resize', this.handleResize);
            this.clientWidth = document.documentElement.clientWidth;
            this.leftBlockWidth = $('.basket-product .left-block').innerWidth();
        },
        methods: {
            handleResize() {
                this.clientWidth = document.documentElement.clientWidth;
                this.leftBlockWidth = $('.basket-product .left-block').innerWidth();
            },
            photo(item) {
                if (!!item.variant.images.length) {
                    return item.variant.images[0].xxs_url;
                } else {
                    return '/spree/products/35/small/img-1.png';
                }
            },
            changeQuantity(item, delta) {
                let newValue = item.quantity + delta;
                if (newValue > 0 && newValue < 1000) {
                    item.quantity = newValue;
                    $.ajax({
                        url:
                        '/api/v1/orders/' + this.spreeCurrentOrderId +
                        '/line_items/' + item.id +
                        '?line_item[variant_id]=' + item.variant_id +
                        '&line_item[quantity]=' + item.quantity +
                        '&order_token=' + this.spreeCurrentOrderToken,
                        type: 'PUT'
                    });
                    this.$store.commit('changeCartItemsQuantity', delta);
                }
            },
            deleteItem(item, index) {
                let _that = this;
                $.ajax({
                    url: '/api/v1/orders/' + this.spreeCurrentOrderId +
                    '/line_items/' + item.id +
                    '?order_token=' + this.spreeCurrentOrderToken,
                    type: 'DELETE',
                    success: () => {
                        _that.items.splice(index, 1);
                        this.$store.commit('changeCartItemsQuantity', -(item.quanitity));
                    }
                });
            },
            sliderHeight(index) {
                if (this.clientWidth < 570) {
                    let ratio = 153 / 280,
                        width = parseInt(this.leftBlockWidth),
                        height = width * ratio;
                    return parseInt(height);
                } else {
                    return this.leftBlockWidth;
                }
            }
        },
        computed: {
            ...mapGetters(['currencies', 'currentCurrency', 'currentCurrencyRate']),
            buttonsPosition() {
                if (window.outerWidth <= 569) {
                    return [{position: 'relative'}]
                }
                else if (window.outerWidth > 569) {
                    if (this.leftBlockHeight >= this.rightBlockHeight) {
                        return [{position: 'absolute'}]
                    }
                }
            }
        }
    }
</script>