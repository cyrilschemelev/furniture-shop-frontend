<template>
    <div>
        <span class="color-title">{{ option.presentation }}</span>
        <div :class="['drop-menu', activeState ? 'active' : '']">
            <div class="select" v-on:click="toggleState">
                <div class="selected">
                    <div class="color" v-if="current.additional" :style="{ backgroundColor: current.additional }"></div>
                    <span>{{ capitalize(current.presentation) }}</span>
                </div>
                <img src="/images/select-arrow.svg">
            </div>
            <ul :class="['dropdown', activeState ? 'active' : '']" v-click-outside="unselect">
                <li v-for="value in option.values" v-on:click="selectValue(value)">
                    <div class="color" :style="{ backgroundColor: value.additional }"></div>
                    <span>{{ capitalize(value.presentation) }}</span>
                    <img :class="['close', isSelected(value.name) ? 'active' : '']"
                         src="/images/icons/close-icon-black.svg">
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import {mapGetters, mapMutations} from 'vuex';
    import ClickOutside from 'vue-click-outside';
    import {EventBus} from './../store/event-bus.js';

    export default {
        props: ['option'],
        data() {
            return {
                allColorsPhrase: {
                    ru: {
                        name: '',
                        presentation: 'Все цвета',
                        empty: true
                    },
                    en: {
                        name: '',
                        presentation: 'All Colors',
                        empty: true
                    }
                },
                activeState: false
            }
        },
        directives: {
            ClickOutside
        },
        mounted() {
            this.popupItem = this.$el;
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
                this.$store.commit('clearDropdownParams');
            },
            unselect() {
                this.activeState = false;
            },
            toggleState() {
                this.activeState = !this.activeState;
            },
            selectValue(item) {
                this.$store.commit('toggleDropdownItem', item.name);
                this.toggleState();
            },
            isSelected(name) {
                let main = this.dropdownParams.filter(item => {
                    if (item === name) {
                        return item;
                    }
                });
                if (!!main.length) {
                    return true;
                } else {
                    return false;
                }
            },
            capitalize(string) {
                return string.substr(0, 1).toUpperCase() + string.substr(1).toLowerCase()
            },
        },
        computed: {
            ...mapGetters(['dropdownParams']),
            current() {
                let totalQuantity = 2,
                    activeParamsQuantity = this.dropdownParams.length;
                if (activeParamsQuantity === 0 || activeParamsQuantity === totalQuantity) {
                    return this.allColorsPhrase[window.Spree.url_params.locale];
                } else {
                    let _that = this;
                    let array = this.option.values.filter(item => {
                        if (item.name === _that.dropdownParams[0]) {
                            return item;
                        }
                    });
                    return array[0];
                }
            },
            params() {
                let payload = {},
                    obj = {},
                    property = [];
                let length = this.dropdownParams.length;
                for (let i = 0; i < length; i++) {
                    let color = {};
                    color['name'] = this.dropdownParams[i];
                    property.push(color);
                }
                obj[this.option.name] = property;
                payload['name'] = this.option.name;
                payload['payload'] = obj;
                return payload;
            }
        }
    }
</script>