<template>
    <div>
        <span class="title">{{ sizes[0].presentation }}</span>
        <table>
            <tr class="" :class="isSelected(currentSize.id) ? 'active' : ''"
                v-for="currentSize in sizes[0].option_values" v-on:click="select(currentSize.id)">
                <td>
                    <div class="icons-small">
                        <img src="/images/product-size-small.svg">
                    </div>
                </td>
                <td><span>{{ currentSize.presentation }}</span></td>
                <td class="product-table-price">
                    <span>{{ displayedPrice(price(currentSize)) }}</span>
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
    import {mapGetters, mapActions, mapMutations} from 'vuex';
    import {displayedPrice} from './../../mixins/displayedPrice.js'

    export default {
        props: ['sizes', 'variants'],
        mixins: [displayedPrice],
        data() {
            return {
                oldSizeId: '',
                activeSizeId: this.sizes[0].option_values[0].id
            }
        },
        mounted() {
            this.$store.commit('addProps', [this.activeSizeId]);
        },
        methods: {
            isSelected(SizeId) {
                if (this.activeSizeId == SizeId) {
                    return true
                }
            },
            select(sizeId) {
                // Update Size
                this.oldSizeId = this.activeSizeId;
                this.activeSizeId = sizeId;
                this.$store.commit('updateProps', [this.oldSizeId, sizeId]);
            },
            price(currentSize) {
                let selectedNotSizesIds = this.selectedNotSizesIds;

                function findVariant(elem) {
                    let length = elem.option_values.length,
                        result = 0;
                    for (let i = 0; i < length; i++) {
                        let option = elem.option_values[i],
                            selectedIds = [currentSize.id];
                        let fullSelectedIds = selectedIds.concat(selectedNotSizesIds);
                        for (let y = 0; y < fullSelectedIds.length; y++) {
                            if (option.id == fullSelectedIds[y]) {
                                result++;
                                if (result == fullSelectedIds.length) {
                                    return elem;
                                }
                            }
                        }
                    }
                }

                let variant = this.variants.find(findVariant);
                if (!!variant) {
                    return parseInt(variant.price);
                } else {
                    return 0;
                }
            }
        },
        computed: {
            ...mapGetters(['currencies', 'currentCurrency', 'currentCurrencyRate', 'selectedNotSizesIds'])
        }
    }
</script>