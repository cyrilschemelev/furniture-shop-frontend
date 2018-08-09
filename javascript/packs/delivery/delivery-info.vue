<template>
    <div class="shiping-main-menu" v-if="list">
        <info-elem v-for="(elem, index) in list" :key="index" :elem="elem"></info-elem>
    </div>
</template>
<script>
    import InfoElem from './info-elem.vue';

    export default {
        props: ['text'],
        components: {InfoElem},
        data() {
            return {
                info: '',
                list: []
            }
        },
        created() {
            this.info = this.text.slice();
            this.info = this.info.replace(/<h2>/gi, "%$%<h2>");
            this.list = this.info.split('%$%');
            this.list.splice(0, 1)
        },
        mounted() {
            $('.shiping-main-menu .main-menu-elem').on('click', function () {
                $(this).find('.shiping-drop-menu').slideToggle();
                $(this).find('.title').find('img').toggleClass('active');
            });
        }
    }
</script>