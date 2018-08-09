<template>
    <div class="empty-block order">
        <div class="title">
            <h1>{{ title }}</h1>
        </div>
        <div class="center-block">
            <span v-html="message"></span>
            <webpay-button v-if="webpay" :order="order" :payWithWebpay="payWithWebpay"></webpay-button>
            <yandex-button v-if="yandex" :order="order"></yandex-button>
            <a class="back" :href="goBackLink" v-if="!webpay & !yandex">
                <img src="/images/nav-arrow.svg">
                <span>{{ goHomePhrase }}</span>
            </a>
        </div>
    </div>
</template>
<script>
    import WebpayButton from './webpay-button.vue';
    import YandexButton from './yandex-button.vue';
    import {mapGetters, mapActions, mapMutations} from 'vuex';

    export default {
        components: {WebpayButton, YandexButton},
        props: {
            title: String,
            message: String,
            goHomePhrase: String,
            goBackLink: String,
            order: Object,
            isYandexKassa: String,
            payWithWebpay: String
        },
        data() {
            return {}
        },
        created() {
            this.$store.commit('updateCartItemsQuantity', '0');
        },
        computed: {
            payOnline() {
                if (!!this.order && !!this.order.payments) {
                    let paymentName = this.order.payments[0].payment_method.name
                    if (paymentName.includes('нлайн') || paymentName.includes('nline')) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            webpay() {
                if ((String(false) == this.isYandexKassa) && this.payOnline) {
                    return true;
                } else {
                    return false;
                }
            },
            yandex() {
                return (String(true) == this.isYandexKassa) && this.payOnline;
            }
        }
    }
</script>