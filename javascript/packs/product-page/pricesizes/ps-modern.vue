<template>
    <div>
        <span class="title">{{ woodType.presentation }}</span>
        <div v-for="woodTypeElem in woodType.option_values" style="margin-bottom: 20px;">
            <span class="little-title">{{ woodTypeElem.presentation }}</span>
            <table>
                <tr :class="isSelected(currentSize.id, woodTypeElem.id) ? 'active' : ''"
                    v-for="(currentSize, index) in sizes[0].option_values" :key="index"
                    v-on:click="select(currentSize.id, woodTypeElem.id)">
                    <td>
                        <div class="icons-small">
                            <img src="/images/product-size-small.svg">
                        </div>
                    </td>
                    <td><span>{{ currentSize.presentation }}</span></td>
                    <td class="product-table-price">
                        <span class="old-price" v-if="price(currentSize, woodTypeElem.id)[1]">
                            {{ displayedPrice(price(currentSize, woodTypeElem.id)[1]) }}</span>
                        <span  v-if="price(currentSize, woodTypeElem.id)[0]">
                            {{ displayedPrice(price(currentSize, woodTypeElem.id)[0]) }}</span>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
    import {mapGetters, mapMutations} from 'vuex';
    import {displayedPrice} from './../../mixins/displayedPrice.js'

    export default {
        props: ['sizes', 'variants', 'woodType'],
        mixins: [displayedPrice],
        data() {
            return {
                oldWoodTypeId: '',
                oldSizeId: '',
                activeWoodTypeId: this.woodType.option_values[0].id,
                activeSizeId: this.sizes[0].option_values[0].id,
            }
        },
        mounted() {
            this.$store.commit('addProps', [this.activeWoodTypeId, this.activeSizeId]);
        },
        methods: {
            isSelected(SizeId, woodTypeId) {
                if (this.activeSizeId == SizeId && this.activeWoodTypeId == woodTypeId) {
                    return true
                }
            },
            select(sizeId, woodTypeId) {
                // Update Size
                this.oldSizeId = this.activeSizeId;
                this.activeSizeId = sizeId;
                this.$store.commit('updateProps', [this.oldSizeId, sizeId]);
                // Update Wood Type
                this.oldWoodTypeId = this.activeWoodTypeId;
                this.activeWoodTypeId = woodTypeId;
                this.$store.commit('updateProps', [this.oldWoodTypeId, woodTypeId]);
            },
            price(currentSize, woodTypeId) {
                let selectedNotSizesIds = this.selectedNotSizesIds;

                function findVariant(elem) {
                    let length = elem.option_values.length,
                        result = 0;
                    for (let i = 0; i < length; i++) {
                        let option = elem.option_values[i],
                            selectedIds = [currentSize.id, woodTypeId];
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
                    return [parseInt(variant.price), parseInt(variant.old_price)];
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