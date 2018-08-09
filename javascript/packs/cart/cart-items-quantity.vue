<template>
    <span class="numb">{{ public }}</span>
</template>
<script>
    import { mapGetters, mapActions, mapMutations } from 'vuex';
    export default {
        created() {
            let value = localStorage.getItem('cartItemsQuantity');
            if (value == 'NaN' || value == undefined || value == 'null'){
                this.$store.commit('updateCartItemsQuantity', '0');
            } else {
                this.$store.commit('updateCartItemsQuantity', value);
            }
        },
        computed: {
            ...mapGetters(['cartItemsQuantityComp']),
            public() {
                if (this.cartItemsQuantityComp == 0 || this.cartItemsQuantityComp === NaN) {
                    return '';
                } else {
                    return this.cartItemsQuantityComp;
                }
            }
        }
    }
</script>