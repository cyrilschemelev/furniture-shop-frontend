import {mapGetters} from 'vuex';

export const displayedPrice = {
    data() {
        return {
            symbols: {
                ru: {
                    byn: 'руб.',
                    eur: '€',
                    usd: '$',
                    rub: '₽'
                },
                en: {
                    byn: 'Br',
                    eur: '€',
                    usd: '$',
                    rub: '₽'
                }
            }
        };
    },
    methods: {
        spacing(value) {
            if (!value) {
                return '0';
            } else {
                value = parseInt(value).toString();
            }
            return value.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        },
        displayedPrice(priceValue) {
            let currentCurrencyRate = Number(this.currentCurrencyRate);
            priceValue = parseInt(priceValue);
            let locale = window.Spree.url_params.locale;
            let dispPrice = this.spacing(this.getPrice(priceValue));
            if (locale == 'ru') {
                dispPrice = dispPrice + ' ' + this.symbols.ru[this.currentCurrency];
            } else {
                dispPrice = this.symbols.en[this.currentCurrency] + ' ' + dispPrice;
            }
            return dispPrice;
        },
        getPrice(priceValue) {
            let currentCurrencyRate = Number(this.currentCurrencyRate);
            if (window.location.hostname == 'swuden.ru') {
                priceValue = priceValue * this.rubRate / currentCurrencyRate;
            } else {
                priceValue = priceValue / currentCurrencyRate;
            }
            return parseInt(priceValue);
        },
    },
    computed: {
        ...mapGetters([
            'rubRate'])
    }
};