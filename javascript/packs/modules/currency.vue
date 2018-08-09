<template>
    <div></div>
</template>
<script>
    import {mapGetters, mapActions, mapMutations} from 'vuex';
    export default {
        props: ['currencyJson'],
        created(){
            this.$store.commit('updateCurrencies', this.currency);
            let currentCurrency = localStorage.getItem('currentCurrency');
            if (currentCurrency === undefined || currentCurrency === null) {
                if (window.location.hostname == 'swuden.ru') {
                    this.$store.commit('updateCurrentCurrency', 'rub');
                } else {
                    this.$store.commit('updateCurrentCurrency', 'byn');
                }
            }
        },
        computed: {
            currency(){
                return JSON.parse(this.currencyJson);
            }
        }
    }
</script>