<template>
    <div>
        <sole-variant v-if="solePropertyGood"
                      :description="description"
                      :productDescription="productDescription"
                      :variants="variants">
        </sole-variant>
        <pricesize-table v-if="!solePropertyGood"
                         :description="description"
                         :productDescription="productDescription"
                         :options="[pricesize]"
                         :woodType="woodType"
                         :variants="variants">
        </pricesize-table>
        <color v-if="!solePropertyGood"
               v-for="(option, index) in color" :key="index"
               :option="option">
        </color>
        <dropdown-with-color v-if="!solePropertyGood"
                             v-for="(option, index) in notPricesizeAndColor" :key="index"
                             :option="option">
        </dropdown-with-color>
    </div>
</template>

<script>
    import PricesizeTable from './pricesizes/pricesize-table.vue';
    import Color from './color.vue';
    import DropdownWithColor from './dropdown.vue';
    import SoleVariant from './sole-variant.vue';
    import {mapGetters, mapActions, mapMutations} from 'vuex';

    export default {
        props: {
            productDescription: {},
            description: {
                type: String
            },
            options: {
                type: Array,
                required: true
            },
            variants: {
                type: Array,
                required: true
            }
        },
        components: {
            PricesizeTable,
            DropdownWithColor,
            Color,
            SoleVariant
        },
        computed: {
            pricesize() {
                return this.options.filter(elem => {
                    return elem.name.match('size');
                });
            },
            woodType() {
                return this.options.filter(elem => {
                    return elem.name.match('wood_type');
                });
            },
            color() {
                return this.options.filter(elem => {
                    return elem.name.match('color');
                });
            },
            notPricesizeAndColor() {
                let localOptions2 = this.options.slice();
                return localOptions2.filter(elem => {
                    const name = elem.name.toString();
                    if (!name.match('size') && !name.match('wood_type') && !name.match('color')) {
                        return elem;
                    }
                });
            },
            solePropertyGood() {
                return this.variants.length == 1 ? true : false;
            }
        }
    }
</script>