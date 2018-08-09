<template>
    <div>
        <div class="basket-page-top-block">
            <div class="inner-container">
                <a class="back" :href="goBackLink">
                    <img src="/images/nav-arrow.svg">
                    <span>{{ continueShoppingPhrase }}</span>
                </a>
                <div class="title">
                    <h1>{{ shoppingCartPhrase }}</h1>
                </div>
            </div>
        </div>

        <div>
            <div>
                <div class="basket-page-center-block">
                    <cart-item
                            :items="items"
                            :spree-current-order-id="spreeCurrentOrderId"
                            :spree-current-order-token="spreeCurrentOrderToken">
                    </cart-item>

                    <div class="col-md-4 col-lg-4 col-sm-12 col-xs-12 right-block">
                        <div class="total-sum-block">
                            <div class="total-sum-container">
                                <p>{{ totalPhrase }} <span id="total-price">{{ displayedPrice(totalPrice) }}</span></p>
                                <span class="delivery">{{ freeShippingMinskPhrase }}</span>
                            </div>
                        </div>
                        <div class="buy-block">
                            <button class="add-order" id="checkout-link" type="submit"
                                    v-on:click="goToCheckout">
                                <span>{{ checkoutPhrase }}</span>
                            </button>
                            <div class="buy-1-click" v-on:click="activateOneClick">
                                <div class="buy-1-click-btn">
                                    <div class="content">
                                        <span>{{ buyInClickPhrase }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import $ from 'jquery';
    import {mapGetters, mapActions, mapMutations} from 'vuex';
    import CartItem from './cart-item.vue';
    import {displayedPrice} from './../mixins/displayedPrice.js'

    export default {
        components: {CartItem},
        mixins: [displayedPrice],
        props: [
            'shopping-cart-phrase',
            'continue-shopping-phrase',
            'free-shipping-minsk-phrase',
            'buy-in-click-phrase',
            'checkout-phrase',
            'total-phrase',
            'go-back-link',
            'items',
            'spreeCurrentOrderId',
            'spreeCurrentOrderToken'],
        created() {
            this.$store.commit('updateCartItemsQuantity', this.items.length);
        },
        updated() {
            if (this.totalCartQuantity !== this.cartItemsQuantityComp) {
                this.$store.commit('updateCartItemsQuantity', this.totalCartQuantity);
            }
        },
        methods: {
            activateOneClick() {
                this.$store.commit('toggleOneClickState');
            },
            goToCheckout() {
                    let newLocation = window.location.origin + this.locale + '/checkout-new';
                    location.href=newLocation;
            }
        },
        computed: {
            ...mapGetters(['locale', 'cartItemsQuantityComp', 'currencies', 'currentCurrency', 'currentCurrencyRate']),
            totalPrice() {
                let totalPrice = 0;
                $.each(this.items, function () {
                    totalPrice = totalPrice + Number(this.price) * Number(this.quantity);
                });
                return totalPrice.toFixed(2).replace('.', ',');
            },
            totalCartQuantity() {
                let totalQuantity = 0;
                this.items.forEach(item => {
                    totalQuantity = totalQuantity + Number(item.quantity);
                });
                return totalQuantity;
            }
        }
    }

</script>