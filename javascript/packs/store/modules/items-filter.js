import dropdownModule from './items-filter-dropdown.js';

const modules = {
    dropdown: dropdownModule
};
const state = {
    filters: [],
    filterSettings: [],
    /**
     * Filter params used for displaying products on the page
     */
    pageFilterParams: {
        filter_params: {}
    },
    /**
     * Filter params in filter, not for displaying products  on the page
     */
    userFilterParams: {
        filter_params: {}
    },
    filterMenuOpened: false,
    noSuchItemsLocales: {
        ru: 'Нет таких товаров',
        en: 'No such items'
    }
};
const mutations = {
    toggleMenuState(state) {
        state.filterMenuOpened = !state.filterMenuOpened;
    },
    setFilterSettings(state, payload) {
        state.filterSettings = payload;
    },
    updateUserFilterParams(state, payload) {
        state.userFilterParams.filter_params[payload.name] = payload.payload[payload.name];
    },
    /**
     * From To
     * @param state
     * @param payload
     */
    setFilterParams(state, payload) {
        state[payload[1]] = JSON.parse(JSON.stringify(state[payload[0]]));
    }
};
const getters = {
    filterMenuOpened: state => state.filterMenuOpened,
    /**
     * Filter params that were used in current displayment
     * @param state
     * @returns {Array|*}
     */
    filterSettings: state => state.filterSettings,
    noSuchItemsLocales: state => state.noSuchItemsLocales,
    filterState: (state, getter, rootState, rootGetters) => {
        let result = rootGetters.currentTaxon.filter(taxon => {
            if (taxon.id === rootState.items.taxons.activeTaxonId ||
                taxon.id === rootState.items.taxons.activeParentTaxonId) {
                let name = taxon.name;
                if (name.includes('Стол') ||
                    name.includes('Table') ||
                    name.includes('Консол') ||
                    name.includes('Console')) {
                    return taxon;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        });
        if (!!result.length) {
            return true;
        } else {
            return false;
        }
    },
    /**
     * Params that were requested and displayed
     * @param state
     * @param rootGetters
     * @returns {*}
     */
    userFilterParams: (state, rootGetters) => {
        return !!rootGetters.filterState ? state.userFilterParams : null;
    },
    /**
     * Params while changing
     * @param state
     * @param rootGetters
     * @returns {null}
     */
    pageFilterParams: (state, rootGetters) => {
        return !!rootGetters.filterState ? state.pageFilterParams : null;
    }
};

export default {
    modules,
    state,
    getters,
    mutations
};