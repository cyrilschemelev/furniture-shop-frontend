<template>
    <div style="display: flex;">
        <div class="item" v-for="item in filters">
            <range-slider v-if="item.type === 'range'" :option="item"></range-slider>
            <dropdown v-if="item.type === 'dropdown'" :option="item"></dropdown>
        </div>
        <div class="item active">
            <div :class="isActiveShowItems ? 'show-button' : 'show-button passive'"
                 @click="loadItems">{{ showItems }}
            </div>
            <div class="reset-button" @click="resetFilter">{{ resetAllSettings }}</div>
        </div>
    </div>
</template>
<script>
    import Dropdown from './filter-dropdown.vue';
    import RangeSlider from './filter-range-slider.vue';
    import {mapGetters, mapMutations, mapActions} from 'vuex';
    import {EventBus} from './../store/event-bus.js';

    export default {
        components: {Dropdown, RangeSlider},
        props: ['filters'],
        data() {
            return {
                showFilterBottom: false,
                resetAllSettingsLocales: {
                    ru: 'Очистить настройки',
                    en: 'Reset all settings'
                },
                showItemsLocales: {
                    ru: 'Показать товары',
                    en: 'Show items'
                },
                showLocales: {
                    ru: 'Показать',
                    en: 'Show'
                }
            }
        },
        created() {
            EventBus.$on('filter-mouse-up', () => {
                if (!_.isEmpty(this.userFilterParams.filter_params) &&
                    !!_.isEmpty(this.pageFilterParams.filter_params)) {
                    this.$store.commit('setFilterParams', ['userFilterParams', 'pageFilterParams']);
                } else if (!_.isEqual(this.userFilterParams, this.pageFilterParams)) {
                    this.$store.dispatch('bufferItems');
                }
            });
            // if (!_.isEmpty(this.userFilterParams.filter_params) &&
            //     !!_.isEmpty(this.pageFilterParams.filter_params)) {
            //     this.$store.commit('setFilterParams', ['userFilterParams', 'pageFilterParams']);
            // } else if (!_.isEqual(this.userFilterParams, this.pageFilterParams)) {
            //     this.$store.dispatch('bufferItems');
            // };
        },
        methods: {
            getFilterSettings() {
                this.$store.dispatch('getFilterSettings');
            },
            loadItems() {
                if (this.isActiveShowItems) {
                    this.$store.dispatch('unbufferItems');
                    this.$store.commit('toggleMenuState');
                }
            },
            toggleFilterMenu() {
                this.$store.commit('toggleMenuState');
            },
            resetFilter() {
                EventBus.$emit('reset-filter');
                this.$store.dispatch('getItems', 'get');
                this.$store.commit('setFilterParams', ['pageFilterParams', 'userFilterParams']);
                this.$store.commit('clearBuffer');
            },
            itemsLocale(introductionWord) {
                if (this.isActiveShowItems) {
                    return introductionWord +
                        ' ' + wordDecline(this.bufferedItems.total_count);
                    function wordDecline(number) {
                        let result, count;
                        if (window.Spree.url_params.locale === 'ru') {
                            count = number % 100;
                            if (count >= 5 && count <= 20) {
                                result = 'товаров';
                            } else {
                                count = count % 10;
                                if (count == 1) {
                                    result = 'товар';
                                } else if (count >= 2 && count <= 4) {
                                    result = 'товара';
                                } else {
                                    result = 'товаров';
                                }
                            }
                            return number + ' ' + result;
                        } else {
                            if (number > 1) {
                                return number + ' ' + 'items';
                            } else {
                                return number + ' ' + 'item';
                            }
                        }
                    };
                } else {
                    if (this.bufferedItems.total_count === 0) {
                        return this.noSuchItemsLocales[window.Spree.url_params.locale];
                    } else {
                        return this.showItemsLocales[window.Spree.url_params.locale];
                    }
                }
            }
        },
        computed: {
            ...mapGetters([
                'userFilterParams',
                'pageFilterParams',
                'filterState',
                'bufferedItems',
                'noSuchItemsLocales',
                'isActiveShowItems'
            ]),
            resetAllSettings() {
                return this.resetAllSettingsLocales[window.Spree.url_params.locale];
            },
            showItems() {
                return this.itemsLocale(this.showLocales[window.Spree.url_params.locale]);
            }
        }
    }
</script>