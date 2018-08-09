<template>
    <div>
        <div class="title" >
            <span>{{option.presentation}}</span>
            <span>{{wrap(range[0])}} – {{wrap(range[1])}}</span>
        </div>
        <vue-slider v-if="rangeOptions" v-model.lazy="range" v-bind="rangeOptions"></vue-slider>
    </div>
</template>
<script>
    import vueSlider from 'vue-slider-component';
    import {mapGetters, mapActions, mapMutations} from 'vuex';
    import {displayedPrice} from './../mixins/displayedPrice.js';
    import {EventBus} from './../store/event-bus.js';

    export default {
        props: ['option'],
        components: {vueSlider},
        mixins: [displayedPrice],
        data() {
            return {
                range: [],
                metricLocales: {
                    ru: 'мм',
                    en: 'mm'
                }
            }
        },
        created(){
            this.initComponent();
        },
        mounted() {
            let _that = this;
            EventBus.$on('reset-filter', () => {
                _that.initComponent();
            });
        },
        updated() {
            this.$store.commit('updateUserFilterParams', this.params);

        },
        methods: {
            initComponent() {
                this.range = [this.option.values.from, this.option.values.to];
            },
            wrap(number) {
                if (this.option.name.includes('length')) {
                    return number + this.metric;
                } else {
                    return this.displayedPrice(number);
                }
            },
        },
        computed: {
            ...mapGetters([
                'currencies',
                'currentCurrency',
                'currentCurrencyRate']),
            rangeOptions() {
                return {
                    min: this.option.values.from,
                    max: this.option.values.to,
                    interval: 10,
                    speed: 0.5,
                    width: '100%',
                    height: 1,
                    clickable: true,
                    tooltip: false,
                    sliderStyle: {
                        'backgroundColor': '#ffffff',
                        'border': '1px solid #000000',
                        'box-shadow': 'none'
                    },
                    bgStyle: {
                        'backgroundColor': '#D4D4D4'
                    },
                    processStyle: {
                        'backgroundColor': '#000000'
                    }
                }
            },
            params() {
                let obj = {},
                    payload = {},
                    range = {};
                range['from'] = this.range[0];
                range['to'] = this.range[1];
                obj[this.option.name] = range;
                payload['name'] = this.option.name;
                payload['payload'] = obj;
                return payload;
            },
            metric() {
                return ' '+this.metricLocales[window.Spree.url_params.locale];
            }
        }
    }
</script>