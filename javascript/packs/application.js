/* eslint no-console:0 */
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

/* js for menu */
require('./modules/menu.js');
require('./modules/menu-all-products.js');
require('default-passive-events'); // Makes {passive: true} by default when EventListenerOptions are supported
// require('./react-edit.jsx'); // react for use of admin


import 'babel-polyfill';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import Vue from 'vue';
import Vuex from 'vuex';
// import VueGmaps from 'vue-gmaps';
import ProductsMenu from './modules/products-menu.vue';
import WishListItemsQuantity from './wishlist/items-quantity.vue';
import WishListAddButton from './wishlist/add-button.vue';
import WishList from './wishlist/list.vue';
import ProductPage from './product-page/index.vue';
import PopularSlider from './modules/popular-slider.vue';
import SpecialOfferSlider from './modules/special-offer-slider.vue';
import HomeSlider from './home/home-slider.vue';
import MainProducts from './home/main-products.vue';
import CartItemsQuantity from './cart/cart-items-quantity.vue';
import Cart from './cart/cart.vue';
import Checkout from './checkout/checkout.vue';
import Currency from './modules/currency.vue';
import CurrencyMenu from './modules/currency-menu.vue';
import DeliveryInfo from './delivery/delivery-info.vue';
import BuyWithOneClick from './cart/buy-with-one-click.vue';
import Taxons from './all-products/taxons.vue';
import HomeTaxons from './home/home-taxons.vue';
import PaymentState from './checkout/payment-state';
import store from './store/index.js';

// Sentry.io
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';
Raven.config('https://e6a8c5dca7f44b309217396fbac835da@sentry.io/1210221', {
    whitelistUrls: [/swuden./]
}).addPlugin(RavenVue, Vue).install();

document.addEventListener('DOMContentLoaded', () => {
    Vue.use(Vuex, VueAwesomeSwiper);
    // Vue.use(VueGmaps, {
    //     key: 'AIzaSyAXPiiK1ivw3qvjaH0tdJ7O0AXgjolS3HA',
    //     libraries: ['places'],
    //     version: '3',
    //     Autocomplete: {
    //         types: 'cities'
    //     },
    //     place: 'Жодино',
    // });
    new Vue({
        el: '#vue-root',
        store,
        components: {
            ProductsMenu,
            WishListItemsQuantity,
            WishListAddButton,
            WishList,
            ProductPage,
            PopularSlider,
            SpecialOfferSlider,
            HomeSlider,
            MainProducts,
            HomeTaxons,
            CartItemsQuantity,
            Cart,
            Checkout,
            Currency,
            CurrencyMenu,
            DeliveryInfo,
            BuyWithOneClick,
            Taxons,
            PaymentState
        }
    }).$mount();
});
