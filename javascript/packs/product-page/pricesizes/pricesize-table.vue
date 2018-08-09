<template>
    <div class="full-variant">
        <div class="description" v-if="productDescription">
            <span>{{ description }}</span>
            <p>{{ productDescription }}</p>
        </div>
        <div class="product-size">
            <ps-ordinary v-if="ordinary" :sizes="ordinary[0]" :variants="variants"></ps-ordinary>
            <ps-modern  v-if="modern" :sizes="modern[0]" :woodType="woodType[0]" :variants="variants"></ps-modern>
        </div>
    </div>
</template>
<script>
    import PsOrdinary from './ps-ordinary.vue';
    import PsModern from './ps-modern.vue';

    export default {
        props: [
            'description',
            'productDescription',
            'options',
            'woodType',
            'variants'],
        components: {
            PsOrdinary,
            PsModern
        },
        computed: {
            ordinary(){
                if (this.woodType.length == 0) {
                    return this.options;
                }
            },
            modern(){
                if (this.woodType.length !== 0) {
                    return this.options;
                }
            }
        }
    }
</script>