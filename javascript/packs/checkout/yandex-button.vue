<template>
    <div class="form-block">
        <a :href="yandexURI" target="_blank">Оплатить через Яндекс.Кассу</a>
    </div>
</template>
<script>
    export default {
        props: ['order'],
        data() {
            return {
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
            yandexURI() {
               return '/yandex-kassa-create-order?order=' + this.order.number;
            }
        }
    }
</script>