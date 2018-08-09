<template>
    <div class="basket-wrapper">
        <empty-cart v-if="items.length == 0"
                    :shopping-cart-phrase="shoppingCartPhrase"
                    :your-cart-is-empty-phrase="yourCartIsEmptyPhrase"
                    :continue-shopping-phrase="continueShoppingPhrase"
                    go-back-link="/">
        </empty-cart>
        <filled-cart v-if="items.length"
                     :items="items"
                     :shopping-cart-phrase="shoppingCartPhrase"
                     :free-shipping-minsk-phrase="freeShippingMinskPhrase"
                     :buy-in-click-phrase="buyInClickPhrase"
                     :checkout-phrase="checkoutPhrase"
                     :total-phrase="totalPhrase"
                     :continue-shopping-phrase="continueShoppingPhrase"
                     :spree-current-order-id="spreeCurrentOrderId"
                     :spree-current-order-token="spreeCurrentOrderToken"
                     go-back-link="/">
        </filled-cart>
    </div>
</template>

<script>
    import EmptyCart from './empty.vue';
    import FilledCart from './filled-cart.vue';
    import {mapGetters, mapActions, mapMutations} from 'vuex';

    export default {
        props: [
            'shoppingCartPhrase',
            'yourCartIsEmptyPhrase',
            'continueShoppingPhrase',
            'freeShippingMinskPhrase',
            'buyInClickPhrase',
            'checkoutPhrase',
            'totalPhrase',
            'spreeCurrentOrderId',
            'spreeCurrentOrderToken',
            'order-json'
        ],
        components: {EmptyCart, FilledCart},
        data() {
            return {
                order: JSON.parse(this.orderJson),
                items: JSON.parse(this.orderJson).line_items,
                local: window
            }
        },
        updated() {
            // TODO кладет undefined в LS
        },
        computed: {
            ...mapGetters(['locale'])
        }
    }
</script>