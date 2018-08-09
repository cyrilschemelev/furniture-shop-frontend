<template>
    <div class="empty-block">
        <div class="title">
            <h1>{{ shoppingCartPhrase }}</h1>
        </div>
        <div class="center-block">
            <span>{{ yourCartIsEmptyPhrase }}</span>
            <a class="back" :href="goBackLink">
                <img src="/images/nav-arrow.svg">
                <span>{{ continueShoppingPhrase }}</span>
            </a>
        </div>
    </div>
</template>
<script>
    import {mapGetters, mapActions, mapMutations} from 'vuex';

    export default {
        props: [
            'shopping-cart-phrase',
            'your-cart-is-empty-phrase',
            'continue-shopping-phrase',
            'go-back-link'],
        created() {
            this.$store.commit('updateCartItemsQuantity', '0');
        }
    }
</script>