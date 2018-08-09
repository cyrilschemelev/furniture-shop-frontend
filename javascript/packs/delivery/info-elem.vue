<template>
    <div class="main-menu-elem">
        <div class="title">
            <div v-html="arr[0]">
            </div>
            <img src="/images/nav-arrow.svg" alt="Nav arrow" class="">
        </div>
        <div class="shiping-drop-menu ordering-menu">
            <div class="top-text" v-html="arr[1]"></div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['elem'],
        data() {
            return {
                text: '',
                arr: []
            }
        },
        created() {
            this.text = this.elem.slice();
            this.text = this.text.replace(/<\/h2>/gi, "<\/h2>%$%");
            this.arr = this.text.split('%$%');
        }
    }

</script>