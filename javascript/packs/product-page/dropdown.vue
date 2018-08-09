<template>
    <div class="table-color">
        <span>{{ option.presentation }}</span>
        <div :class="['drop-menu', selectState ? 'active' : '']">
            <div class="select" v-on:click="toggleState">
                <div class="selected">
                    <div class="color" :style="{ backgroundColor: selected.additional }"></div>
                    <span>{{ selected.presentation }}</span>
                </div>
                <img src="/images/select-arrow.svg">
            </div>
            <ul :class="['dropdown', selectState ? 'active' : '']">
                <li v-for="value in availableOptions" v-on:click="selectValue(value)">
                    <div class="color" :style="{ backgroundColor: value.additional }"></div>
                    <span>{{ value.presentation }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import { mapGetters, mapActions, mapMutations } from 'vuex';
    export default {
        props: ['option'],
        data(){
            return {
                'selectedByUser': '',
                'selectState': false,
                'init': '',
                oldOptionId: '',
                activeOptionId: this.option.option_values[0].id
            }
        },
        mounted() {
            this.$store.commit('addProps', [this.activeOptionId]);
        },
        methods: {
            toggleState() {
                this.selectState = !this.selectState;
            },
            selectValue(value){
                this.selectedByUser = value;
                this.toggleState();
                this.oldOptionId = this.activeOptionId;
                this.activeOptionId = value.id;
                this.$store.commit('updateProps', [this.oldOptionId, this.activeOptionId]);
            }
        },
        computed: {
            selected() {
                if (!!this.selectedByUser) {
                    return this.selectedByUser;
                } else {
                    return this.option.option_values[0];
                }
            }
        }
    }
</script>