<template>
    <div class="form-block">
        <form id="webpay-form" action="https://securesandbox.webpay.by/" method="post" target="_blank">
            <input type="hidden" name="*scart">
            <input type="hidden" name="wsb_version" value="2">
            <input type="hidden" name="wsb_language_id" :value="language">
            <input type="hidden" name="wsb_storeid" :value="webpay.wsb_storeid">
            <input type="hidden" name="wsb_store" value="Swuden">
            <input type="hidden" name="wsb_order_num" :value="webpay.wsb_order_num">
            <input type="hidden" name="wsb_test" :value="webpay.wsb_test">
            <input type="hidden" name="wsb_currency_id" :value="webpay.wsb_currency_id">
            <input type="hidden" name="wsb_seed" :value="webpay.wsb_seed">
            <input type="hidden" name="wsb_customer_name" :value="order.bill_address.full_name">
            <input type="hidden" name="wsb_customer_address"
                   :value="order.bill_address.city+', '+order.bill_address.address1">
            <input type="hidden" name="wsb_service_date" :value="order.shipments.name">
            <input type="hidden" name="wsb_return_url" :value="domain + '/webpay-return?state=success'">
            <input type="hidden" name="wsb_cancel_return_url" :value="domain + '/webpay-cancel?state=error'">
            <input type="hidden" name="wsb_notify_url" :value="domain + '/webpay-notify'">
            <input type="hidden" name="wsb_email" :value="order.email">
            <div v-for="good, index in goods">
                <input type="hidden" :name="'wsb_invoice_item_name['+index+']'" :value="good.variant.name">
                <input type="hidden" :name="'wsb_invoice_item_quantity['+index+']'" :value="good.quantity">
                <input type="hidden" :name="'wsb_invoice_item_price['+index+']'" :value="good.variant.price">
            </div>
            <input type="hidden" name="wsb_total" :value="order.total">
            <input type="hidden" name="wsb_signature" :value="webpay.wsb_signature">
            <input type="hidden" name="wsb_tax" value="0">
            <input type="hidden" name="wsb_shipping_name" value="Стоимость доставки">
            <input type="hidden" name="wsb_shipping_price" :value="order.shipments.cost">
            <input type="hidden" name="wsb_discount_name" value="Скидка на товар">
            <input type="hidden" name="wsb_discount_price" value="0">
            <input type="submit" value="Оплатить заказ через Webpay" hidden>
        </form>
        <button v-on:click="request">{{ payWithWebpay }}</button>
    </div>
</template>
<script>
    export default {
        props: ['order', 'payWithWebpay'],
        data() {
            return {
                goods: this.order.line_items,
                webpay: {}
            }
        },
        methods: {
            request() {
                let url = '/api/custom/webpay-signature' +
                    '?order_id=' + this.order.number +
                    '&guest_token=' + this.order.token,
                    _that = this;
                let serverRequest = $.getJSON(url, response => {
                    _that.webpay = response;
                });
                serverRequest.done(() => {
                    _that.$nextTick(() => {
                        $('#webpay-form').submit();
                    });
                })
            }
        },
        computed: {
            language() {
                if (window.Spree.url_params.locale == 'en') {
                    return 'english';
                } else {
                    return 'russian';
                }
            },
            domain(){
                let hostname = window.location.hostname;
                if (hostname.includes('localhost')) {
                    return 'https://swuden.by'
                } else {
                    return hostname;
                }
            }
        }
    }
</script>