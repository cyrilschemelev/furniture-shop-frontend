<template>
    <div class="empty-block">
        <div class="title">
            <h1>{{ wishListPhrase }}</h1>
        </div>
        <div class="center-block">
            <span>{{ yourWishListIsEmptyPhrase }}</span>
            <a class="back" :href="goBackLink">
                <img src="/images/nav-arrow.svg">
                <span>{{ continueShoppingPhrase }}</span>
            </a>
        </div>
    </div>
</template>
<script>
    export default {
        props: [
            'wish-list-phrase',
            'your-wish-list-is-empty-phrase',
            'continue-shopping-phrase',
            'go-back-link']
    }
</script>