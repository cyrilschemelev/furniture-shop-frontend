<template>
    <div v-click-outside="hideMenu">
        <div class="filter-bottom" v-on:click="menuState =! menuState" v-show="true">
            <div :class="filterState ? 'button active' : 'button'">
                <img class="default" src="/images/icons/filter-default.svg">
                <img class="hover" src="/images/icons/filter-hover.svg">
                <span>{{ foundItemsMsg }}</span>
            </div>
        </div>
        <transition name="fade">
            <div class="filter-bottom-toggle" v-show="menuState">
                <div class="filter-toggle-wrapper" v-on:click="resetFilter"><span>{{ resetFilterMsg }}</span></div>
                <div class="filter-toggle-wrapper" v-on:click="toggleFilterMenu"><span>{{ toggleFilterMsg }}</span></div>
            </div>
        </transition>
    </div>
</template>
<script>
    import {EventBus} from './../store/event-bus.js';
    import ClickOutside from 'vue-click-outside';
    import {mapGetters, mapActions, mapMutations} from 'vuex';
    export default {
        data() {
            return {
                menuState: false,
                foundLocales: {
                    ru: 'Найдено',
                    en: 'Found'
                },
                resetFilterLocales: {
                    ru: 'Сбросить фильтр',
                    en: 'Reset filter'
                },
                showFilterLocale: {
                    ru: 'Показать фильтр',
                    en: 'Show filter'
                },
                hideFilterLocale: {
                    ru: 'Убрать фильтр',
                    en: 'Hide filter'
                }
            }
        },
        directives: {
            ClickOutside
        },
        methods: {
            toggleFilterMenu() {
                this.$store.commit('toggleMenuState');
                this.hideMenu();
                window.scrollTo(0,0);
            },
            hideMenu(){
                this.menuState = false;
            },
            resetFilter() {
                EventBus.$emit('reset-filter');
                this.hideMenu();
                this.$store.dispatch('getItems', 'get');
                this.$store.commit('setFilterParams', ['userFilterParams', 'pageFilterParams']);
                this.$store.commit('clearBuffer');
            },
            itemsLocale(introductionWord) {
                if (this.isActiveShowItems) {
                    return introductionWord +
                        ' ' + wordDecline(this.bufferedItems.total_count);
                } else {
                    if (this.bufferedItems.total_count === 0) {
                        return this.noSuchItemsLocales[window.Spree.url_params.locale];
                    } else {
                        return introductionWord +
                            ' ' + wordDecline(this.foundItems);
                    }
                }
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
            }
        },
        computed: {
            ...mapGetters([
                'filterState',
                'filterMenuOpened',
                'bufferedItems',
                'foundItems',
                'isActiveShowItems',
                'noSuchItemsLocales'
            ]),
            foundItemsMsg() {
                return this.itemsLocale(this.foundLocales[window.Spree.url_params.locale]);
            },
            toggleFilterMsg() {
                if (this.filterMenuOpened) {
                    return this.hideFilterLocale[window.Spree.url_params.locale];
                } else {
                    return this.showFilterLocale[window.Spree.url_params.locale];
                }
            },
            resetFilterMsg() {
                return this.resetFilterLocales[window.Spree.url_params.locale];
            }
        }
    }
</script>