<template>
    <div>
        <div>
            <div class="basket-page-top-block">
                <div class="inner-container">
                    <a class="back" :href="goBackLink">
                        <img src="/images/nav-arrow.svg">
                        <span>{{ continueShoppingPhrase }}</span>
                    </a>
                    <div class="title">
                        <h1>{{ wishListPhrase }}</h1>
                    </div>
                </div>
            </div>
        </div>
        <div class="center-wishlist-block">
            <div class="product-card col-lg-4 col-md-4 col-sm-4 col-xs-6 col-xxs-12"  v-for="(item, index) in wishList">
                <div class="image-block">
                    <a class="image-block" :href="item.url" v-bind:style="{backgroundImage: 'url('+item.photo_x2+')'}"></a>
                    <div class="add-to-cart">{{item.name}}
                        <a class="btn add-to-cart-btn" v-on:click="addToCart(item.variant_id)">
                            <span>{{ addToCartPhrase }}</span>
                        </a>
                        <a class="btn remove-elem" v-on:click="removeItem(item.variant_id)">
                            <span>{{ deletePhrase }}</span>
                            <img :src="closeIcon">
                        </a>
                    </div>
                </div>
                <a :href="item.url">
                    <span class="product-name">{{ item.name }}</span>
                </a>
                <span class="product-price">{{ displayedPrice(item.price) }}</span>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapGetters, mapActions, mapMutations } from 'vuex';
    import { displayedPrice } from './../mixins/displayedPrice.js'

    export default {
        props: [
            'closeIcon',
            'addToCartPhrase',
            'wishList',
            'deletePhrase',
            'continueShoppingPhrase',
            'wishListPhrase',
            'goBackLink'
        ],
        mixins: [displayedPrice],
        data() {
            return {
            }
        },
        methods: {
            addToCart(id) {
                let _that = this;
                $.post('/orders/populate', {
                    'variant_id': id,
                    'quantity': 1
                }).then(function (data) {
                    _that.$store.dispatch('removeWishListItem', id);
                    _that.wishList = _that.wishList.filter(item => {
                        return item.variant_id != id;
                    });
                    alert('Продукт добавлен в Корзину!');
                });
            },
            removeItem(id) {
                this.$store.dispatch('removeWishListItem', id);
            }
        },
        computed: {
            ...mapGetters(['wishListIdsComp', 'currencies', 'currentCurrency', 'currentCurrencyRate']),
        }
    }
</script>