<template>
    <div :class="this.active ? 'currency-menu active' : 'currency-menu'" v-on:click="toggleState">
        <img src="/images/icons/header-dropmenu-icon.svg"/>
        <span v-if="currentCurrency">{{ currentCurrency.toUpperCase() }}</span>
        <div :class="this.active ? 'drop-menu active' : 'drop-menu'">
            <a v-on:click="updateCurrency('byn')" v-if="!swudenru">BYN</a>
            <a v-on:click="updateCurrency('eur')">EUR</a>
            <a v-on:click="updateCurrency('usd')">USD</a>
            <a v-on:click="updateCurrency('rub')">RUB</a>
        </div>
    </div>
</template>
<script>
    import {mapGetters, mapActions, mapMutations} from 'vuex';

    export default {
        data() {
            return {
                active: false
            }
        },
        methods: {
            toggleState() {
                this.active = !this.active;
            },
            updateCurrency(currency) {
                this.$store.commit('updateCurrentCurrency', currency);
                this.active = !this.active;
            }
        },
        computed: {
            ...mapGetters([
                'currencies',
                'currentCurrency',
                'currentCurrencyRate'
            ]),
            swudenru(){
                if (window.location.hostname == 'swuden.ru') {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }
</script>