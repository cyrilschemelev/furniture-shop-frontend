import Vue from 'vue';
import Vuex from 'vuex';
import AllProductsModule from './modules/items.js';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    strict: debug,
    modules: {
        items: AllProductsModule
    },
    state: {
        wishListIds: [],
        wishList: [],
        cartItemsQuantity: 0,
        activeVariantProps: [],
        variants: [],
        scrolledFromTop: 0,
        currencies: [],
        vuexCurrency: localStorage.getItem('currentCurrency'),
        selectedNotSizesIds: [],
        orderItems: [],
        oneClickState: false
    },
    mutations: {
        clearProps(state) {
            state.activeProps = [];
        },
        addProps(state, array) {
            let length = array.length;
            for (let i = 0; i < length; i++) {
                state.activeVariantProps.push(array[i]);
            }
        },
        updateProps(state, array) {
            let oldValue = array[0],
                newValue = array[1],
                index = state.activeVariantProps.indexOf(oldValue);
            state.activeVariantProps.splice(index, 1);
            state.activeVariantProps.push(newValue);
        },
        addNotSizeProps(state, array) {
            let length = array.length;
            for (let i = 0; i < length; i++) {
                state.selectedNotSizesIds.push(array[i]);
            }
        },
        updateNotSizeProps(state, array) {
            let oldValue = array[0],
                newValue = array[1],
                index = state.selectedNotSizesIds.indexOf(oldValue);
            state.selectedNotSizesIds.splice(index, 1);
            state.selectedNotSizesIds.push(newValue);
        },
        pushVariants(state, array) {
            for (let i = 0; i < array.length; i++) {
                state.variants.push(array[i]);
            }
        },
        addWishListIdsMutation(state, itemId) {
            let index = state.wishListIds.indexOf(itemId);
            if (index < 0) {
                state.wishListIds.push(itemId);
            }
        },
        removeWishListIdsMutation(state, itemId) {
            let index = state.wishListIds.indexOf(itemId);
            if (index > -1) {
                state.wishListIds.splice(index, 1);
            }
        },
        removeWishListItemMutation(state, itemId) {
            state.wishList = state.wishList.filter(item => {
                return item.variant_id != itemId;
            });
        },
        updateWishListIds(state, arr) {
            state.wishListIds = arr;
        },
        updateWishList(state, arr) {
            state.wishList = arr;
        },
        updateCartItemsQuantity(state, payload) {
            state.cartItemsQuantity = payload;
            localStorage.setItem('cartItemsQuantity', payload);
        },
        changeCartItemsQuantity(state, payload) {
            state.cartItemsQuantity = parseInt(state.cartItemsQuantity) + parseInt(payload);
            localStorage.setItem('cartItemsQuantity', state.cartItemsQuantity);
        },
        updateScrolledFromTop(state, payload) {
            state.scrolledFromTop = payload;
        },
        updateCurrencies(state, arr) {
            state.currencies = arr;
        },
        updateCurrentCurrency(state, payload) {
            state.vuexCurrency = payload;
            localStorage.setItem('currentCurrency', payload);
        },
        updateOrderItems(state, payload) {
            state.orderItems = payload;
        },
        toggleOneClickState(state) {
            state.oneClickState = !state.oneClickState;
        }
    },
    actions: {
        addWishListItem({commit}, itemId) {
            commit('addWishListIdsMutation', itemId);
            localStorage.setItem('wishListIds', JSON.stringify(this.state.wishListIds));
        },
        removeWishListItem({commit}, itemId) {
            commit('removeWishListIdsMutation', itemId);
            commit('removeWishListItemMutation', itemId);
            localStorage.setItem('wishListIds', JSON.stringify(this.state.wishListIds));
        }
    },
    getters: {
        currencies: state => {
            return state.currencies;
        },
        currentCurrency: state => {
            return state.vuexCurrency;
        },
        currentCurrencyRate: state => {
            return state.currencies[state.vuexCurrency];
        },
        rubRate: state => {
            return state.currencies['rub'];
        },
        selectedVariant: state => {
            if (!!state.variants) {
                return state.variants.filter(variant => {
                    let length = variant.option_values.length,
                        variantProps = [];
                    for (let i = 0; i < length; i++) {
                        variantProps.push(variant.option_values[i].id);
                    }
                    let localArray = state.activeVariantProps.slice();
                    return _.isEqual(localArray.sort(), variantProps.sort());
                });
            }
        },
        selectedNotSizesIds: state => {
            return state.selectedNotSizesIds;
        },
        wishListIdsComp: state => {
            return state.wishListIds;
        },
        wishListComp: state => {
            return state.wishList;
        },
        cartItemsQuantityComp: state => {
            return state.cartItemsQuantity;
        },
        scrolledFromTop: state => {
            return state.scrolledFromTop;
        },
        orderItems: state => {
            return state.orderItems;
        },
        oneClickState: state => {
            return state.oneClickState;
        },
        locale: state => {
            if (window.Spree.url_params.locale == 'en') {
                return '/' + window.Spree.url_params.locale;
            } else {
                return '';
            }
        }
    }
});