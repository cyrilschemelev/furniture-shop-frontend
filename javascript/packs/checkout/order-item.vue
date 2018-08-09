<template>
    <div>
        <div class="product" v-for="item in this.items">
            <h5>{{ item.variant.name }}</h5>
            <div class="desc">
                <span class="prod-size" v-for="property in item.variant.option_values">
                    {{ property.option_type_presentation }}: {{ property.presentation }}
                </span>
            </div>
            <div class="price-block">
                <span class="prod-price">{{ currentItemsPrice(item) }} руб.</span>
                <span class="prod-val">{{ displayQuantity(item) }}</span>
            </div>
        </div>
    </div>
</template>
<script>
    import {displayedPrice} from './../mixins/displayedPrice.js'
    export default {
        props: [
            'items'
        ],
        mixins: [displayedPrice],
        data() {
            return {}
        },
        methods: {
            currentItemsPrice(item) {
                let sum = Number(item.price) * Number(item.quantity);
                return this.spacing(sum.toFixed(2).replace('.', ','));
            },
            displayQuantity(item) {
                let quantity = parseInt(item.quantity),
                    locale = window.Spree.url_params.locale;
                if (quantity > 1) {
                    if (locale === 'ru') {
                        return quantity + ' шт.';
                    } else {
                        return quantity + ' items';
                    }
                } else {
                    if (locale === 'ru') {
                        return quantity + ' шт.';
                    } else {
                        return quantity + ' item';
                    }
                }
            }
        }
    }
</script>