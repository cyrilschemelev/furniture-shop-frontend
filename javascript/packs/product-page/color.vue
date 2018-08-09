<template>
    <div class="color-table" v-if="option.option_values.length > 1">
        <span>{{ option.presentation }}</span>
        <div class="variants-table">
            <div v-for="value in option.option_values"
                 v-on:click="select(value.id)"
                 :class="isSelected(value.id) ? 'variant active' : 'variant'">
                <div class="color" :style="{ backgroundColor: value.additional }"></div>
                <span>{{ value.presentation }}</span>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapGetters, mapActions, mapMutations} from 'vuex';

    export default {
        props: ['option'],
        data() {
            return {
                'selectState': false,
                'init': '',
                oldOptionId: '',
                activeOptionId: this.option.option_values[0].id
            }
        },
        mounted() {
            this.$store.commit('addProps', [this.activeOptionId]);
            this.$store.commit('addNotSizeProps', [this.activeOptionId]);
        },
        methods: {
            isSelected(optionId) {
                if (this.activeOptionId == optionId) {
                    return true;
                }
            },
            select(optionId) {
                this.oldOptionId = this.activeOptionId;
                this.activeOptionId = optionId;
                this.$store.commit('updateProps', [this.oldOptionId, this.activeOptionId]);
                this.$store.commit('updateNotSizeProps', [this.oldOptionId, this.activeOptionId]);
            }
        },
        computed: {
            selected() {
                if (!!this.selectedByUser) {
                    return this.selectedByUser;
                } else {
                    return this.option.option_values[0];
                }
            },
            availableOptions() {
                return this.option.option_values.filter(value => {
                    const valueId = value.id;
                    if (this.selected.id != valueId) {
                        return value;
                    }
                })
            }
        }
    }
</script>