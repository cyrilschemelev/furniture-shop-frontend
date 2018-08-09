<template>
    <div class="all-products">
        <div class="filter" @mouseup="mouseUp" @touchend="mouseUp">
            <div :class="filterState ? 'button active' : 'button'" @click="toggleFilterMenu" >
                <img class="default" src="/images/icons/filter-default.svg">
                <img class="hover" src="/images/icons/filter-hover.svg">
                <span>{{ filterName }}</span>
            </div>
            <div :class="filterMenuOpened ? 'menu active' : 'menu'">
                <img class="close-button" src="/images/icons/close-icon-black.svg" v-on:click="toggleFilterMenu">
                <products-filter :filters="filterSettings" v-if="filterSettings"></products-filter>
            </div>
            <div :class="filterMenuOpened ? 'menu-black-overlay visible': 'menu-black-overlay'"
                 v-on:click="toggleFilterMenu"></div>
        </div>
        <div id="taxonomies" class="top-all-products-block main-wrapper">
            <div class='title'>
                <h1>{{ activeTaxonDescription }}</h1>
            </div>
            <div class="navigation">
                <div :class="isActive(taxon)? 'nav-elem active' : 'nav-elem'"
                     v-for="taxon in taxons"
                     v-on:click="activate(taxon)">
                    <div class="nav-container">
                        <img :src="taxon.icon" alt="">
                        <span>{{ taxon.name }}</span>
                    </div>
                </div>
            </div>
            <div class="bottom-navigation-menu" v-if="currentTaxon[0]">
                <div :class="isActiveSubTaxon(subtaxon)? 'bottom-nav-elem active' : 'bottom-nav-elem'"
                     v-for="subtaxon in currentTaxon[0].taxons"
                     v-on:click="activate(subtaxon)">
                    {{ subtaxon.name }}
                </div>
            </div>
        </div>
        <products v-if="items" :items="items"></products>
        <div class="main-wrapper">
            <a class="load-more-btn col-lg-4 col-md-4" id="load_more_link" v-on:click="getNextItems(currentPage + 1)"
               v-if="!lastPage">
                <span id="counter">{{ loadMorePhrase}}</span>
            </a>
        </div>
        <filter-window-fixed v-if="filterState"></filter-window-fixed>
    </div>
</template>
<script>
    import {mapGetters, mapActions, mapMutations} from 'vuex';
    import {EventBus} from './../store/event-bus.js';
    import ProductsFilter from './filter.vue';
    import FilterWindowFixed from './filter-window-fixed.vue';
    import Products from './products.vue';

    export default {
        props: [
            'title',
            'load-more-phrase',
            'initialized-taxon-id',
            'initialized-parent-taxon-id',
            'taxon-description',
            'filterSettingsJson'
        ],
        components: {ProductsFilter, FilterWindowFixed, Products},
        data() {
            return {
                filterNameLocales: {
                    ru: 'Фильтр',
                    en: 'Filter'
                }
            }
        },
        created() {
            this.$store.dispatch('getTaxonomies', {
                'taxon_id': this.initializedTaxonId,
                'parent_taxon_id': this.initializedParentTaxonId,
                'taxon_description': this.taxonDescription
            });
            this.getInitItems();
            this.$store.commit('setFilterSettings', this.filterSettingsVuex);

            // this.$store.commit('setCurrentPage', response.current_page);
            // this.$store.commit('setPages', response.pages);
            // this.$store.commit('setFoundItems', response.total_count);
            // if (response.products.length > 0) {
            //     this.$store.commit('setItems', response.products);
            // }
        },
        methods: {
            getInitItems() {
                this.$store.dispatch('getItems');
            },
            isActive(taxon) {
                return taxon.id == this.activeTaxonId || taxon.id == this.activeParentTaxonId ? true : false;
            },
            isActiveSubTaxon(subtaxon) {
                return subtaxon.id == this.activeTaxonId ? true : false;
            },
            activate(taxon) {
                EventBus.$emit('reset-filter');
                this.$store.commit('setActiveTaxonId', taxon.id);
                this.$store.commit('setActiveParentTaxonId', taxon.parent_id);
                this.$store.commit('setActiveTaxonDescription', taxon.description);
                if (this.items.length) {
                    this.getInitItems();
                }
            },
            getNextItems(pageNumber) {
                this.$store.dispatch('getNextItems', pageNumber);
            },
            toggleFilterMenu() {
                this.$store.commit('toggleMenuState');
            },
            resetFilter() {
                EventBus.$emit('reset-filter');
            },
            mouseUp(){
                EventBus.$emit('filter-mouse-up');
            }
        },
        computed: {
            ...mapGetters([
                'locale',
                'selectedNotSizesIds',
                // filter components
                'filterMenuOpened',
                'filterState',
                'filterSettings',
                // taxons
                'currentPage',
                'lastPage',
                'currentTaxon',
                'activeTaxonId',
                'activeParentTaxonId',
                'activeTaxonDescription',
                'taxons',
                'items'
            ]),
            filterMenuClass() {
                if (!!this.filterState && !!this.filterMenuOpened) {
                    return 'menu active'
                } else if (!!this.filterState && !this.filterMenuOpened) {
                    return 'menu'
                } else {
                    return 'menu hidden'
                }
            },
            filterName() {
                return this.filterNameLocales[window.Spree.url_params.locale];
            },
            filterSettingsVuex() {
                return JSON.parse(this.filterSettingsJson);
            }
        }
    }
</script>