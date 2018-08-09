import taxonsModule from './items-taxons.js';
import filterModule from './items-filter.js';

const modules = {
    taxons: taxonsModule,
    filter: filterModule
};
const state = {
    items: [],
    currentPage: 0,
    pages: 0,
    foundItems: 0,
    bufferedItems: []
};
const mutations = {
    setCurrentPage(state, payload) {
        state.currentPage = payload;
    },
    setPages(state, payload) {
        state.pages = payload;
    },
    setItems(state, payload) {
        state.items = payload;
    },
    mergeItems(state, payload) {
        state.items = state.items.concat(payload);
    },
    bufferItems(state, payload) {
        state.bufferedItems = payload;
    },
    setFoundItems(state, payload) {
        state.foundItems = payload;
    },
    /**
     * Clear buffer and bounded params
     */
    clearBuffer(state) {
        state.bufferedItems = [];
    },
};

const actions = {
    /**
     * Get items with filter params
     * @param context
     */
    getItems(context, method) {
        let url = context.rootGetters.locale +
            '/api/custom/taxons/products?id=' + context.rootState.items.taxons.activeTaxonId,
            request = context.rootGetters.userFilterParams;
        if (method === 'get' || !request) {
            fetch(url, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json; charset=utf-8'
                }
            }).then(data => data.json()).then(response => {
                proceed(response)
            });
        } else {
            fetch(url, {
                body: JSON.stringify(request),
                method: 'POST',
                headers: {
                    'content-type': 'application/json; charset=utf-8'
                }
            }).then(data => data.json()).then(response => {
                proceed(response)
            });
        }
        function proceed(response) {
            context.commit('setCurrentPage', response.current_page);
            context.commit('setPages', response.pages);
            context.commit('setFoundItems', response.total_count);
            if (response.products.length > 0) {
                context.commit('setItems', response.products);
            }
        }

    },
    /**
     * Request items and load it to buffer, displaying in filter window, not in items
     * @param context
     */
    bufferItems(context) {
        let url = context.rootGetters.locale +
            '/api/custom/taxons/products?id=' + context.rootState.items.taxons.activeTaxonId + '',
            request = context.rootGetters.userFilterParams;
        fetch(url, {
            body: JSON.stringify(request),
            method: 'POST',
            headers: {
                'content-type': 'application/json; charset=utf-8'
            }
        }).then(data => data.json()).then(response => {
            context.commit('bufferItems', response);
            context.commit('setFilterParams', ['userFilterParams', 'pageFilterParams']);
        });
    },
    /**
     * Load items from buffer to page window, refresh params of filter
     * @param context
     */
    unbufferItems(context) {
        let bufferedItems = context.rootGetters.bufferedItems;
        context.commit('setItems', bufferedItems.products);
        context.commit('setCurrentPage', bufferedItems.current_page);
        context.commit('setPages', bufferedItems.pages);
        context.commit('setFoundItems', bufferedItems.total_count);
        context.commit('setFilterParams', ['userFilterParams', 'pageFilterParams']);
        context.commit('bufferItems', []);
    },
    /**
     * Get next paginated items
     * @author Cyril Schemelev <schemelev@noer.agency>
     * @param context
     * @param {number} pageNumber – needed page number
     */
    getNextItems(context, pageNumber) {
        let url =
            context.rootGetters.locale +
            '/api/custom/taxons/products?id=' + context.rootState.items.taxons.activeTaxonId +
            '&page=' + pageNumber;
        let request = context.rootGetters.userFilterParams;
        fetch(url, {
            body: JSON.stringify(request),
            method: 'POST',
            headers: {
                'content-type': 'application/json; charset=utf-8'
            }
        }).then(data => data.json()).then(response => {
            context.commit('mergeItems', response.products);
            context.commit('setCurrentPage', response.current_page);
            context.commit('setPages', response.pages);
        });
    }
};
const getters = {
    items: state => state.items,
    currentPage: state => state.currentPage,
    lastPage: state => {
        if (state.currentPage < state.pages) {
            return false;
        } else {
            return true;
        }
    },
    bufferedItems: state => state.bufferedItems,
    foundItems: state => state.foundItems,
    isActiveShowItems: (state, getter, rootState, rootGetters) => {
        if (!!state.bufferedItems.total_count && rootGetters.filterState) {
            return true;
        } else {
            return false;
        }

    }
};

export default {
    modules,
    state,
    getters,
    actions,
    mutations
};