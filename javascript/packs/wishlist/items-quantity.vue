<template>
    <span class="numb">{{ public }}</span>
</template>
<script>
    import {mapGetters, mapActions, mapMutations} from 'vuex';

    export default {
        created() {
            let empty = [],
                ls = localStorage.getItem('wishListIds');
            if (!!ls && ls.length > 2) {
                let arr = JSON.parse(ls);
                if (arr.length < 1) {
                    this.$store.commit('updateWishListIds', empty);
                } else {
                    this.$store.commit('updateWishListIds', arr);
                }
            } else {
                this.$store.commit('updateWishListIds', empty);
            }
        },
        computed: {
            ...mapGetters(['wishListIdsComp']),
            public() {
                if (!Array.isArray(this.wishListIdsComp) || !this.wishListIdsComp.length) {
                    return '';
                } else {
                    return this.wishListIdsComp.length;
                }
            }
        }
    }
</script>