<template>
    <div class="basket-wrapper">
        <list-empty
                v-if="wishListComp.length == 0"
                :wish-list-phrase="wishListPhrase"
                :your-wish-list-is-empty-phrase="yourWishListIsEmptyPhrase"
                :continue-shopping-phrase="continueShoppingPhrase"
                go-back-link="/">
        </list-empty>
        <list-filled
                v-if="wishListComp.length"
                :wish-list="wishListComp"
                :wish-list-phrase="wishListPhrase"
                :close-icon="closeIcon"
                :delete-phrase="deletePhrase"
                :continue-shopping-phrase="continueShoppingPhrase"
                :add-to-cart-phrase="addToCartPhrase"
                go-back-link="/">
        </list-filled>
    </div>
</template>
<script>
    import ListEmpty from './list-empty.vue';
    import ListFilled from './list-filled.vue';
    import { mapGetters, mapActions, mapMutations } from 'vuex';
    export default {
        props: [
            'wish-list-phrase',
            'your-wish-list-is-empty-phrase',
            'wish-list-phrase',
            'continue-shopping-phrase',
            'close-icon',
            'delete-phrase',
            'add-to-cart-phrase'
        ],
        components: { ListEmpty, ListFilled },
        created() {
            let url = this.locale +
                '/api/v1/wishlist_items?wishlist_items=' + this.wishListIdsComp.toString(),
                _this = this;
            $.getJSON(url, function (response) {
                _this.$store.commit('updateWishList', response.wishlist_items);
            });
        },
        computed: {
            ...mapGetters(['locale', 'wishListComp', 'wishListIdsComp'])
        }
    }
</script>