<template>
    <div class="sole-variant">
        <span class="price old-price" v-if="this.variants[0].old_price">{{ displayedPrice(this.variants[0].old_price)}}</span>
        <span class="price">{{ displayedPrice(this.variants[0].price) }}</span>
        <div class="properties">
            <div class="description property" v-if="productDescription">
                <span>{{ description }}</span>
                <p>{{ productDescription }}</p>
            </div>
            <div class="description property" v-if="variants[0].option_values[0].option_type_presentation || variants[0].option_values[0].presentation">
                <span>{{ variants[0].option_values[0].option_type_presentation }}</span>
                <p>{{ variants[0].option_values[0].presentation }}</p>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapGetters, mapActions, mapMutations} from 'vuex';
    import { displayedPrice } from './../mixins/displayedPrice.js'

    export default {
        props: [
            'variants',
            'description',
            'productDescription'],
        mixins: [displayedPrice],
        data() {
            return {
                activeSizeId: this.variants[0].option_values[0].id
            }
        },
        mounted() {
            this.$store.commit('addProps', [this.activeSizeId])
        },
        computed: {
            ...mapGetters(['currencies', 'currentCurrency', 'currentCurrencyRate'])
        }
    }
</script>