<template>
    <div class="main-wrapper product-container" v-if="taxons">
        <div class="main-product-elem" itemscope itemtype="https://schema.org/Product"
             v-for="taxon, index in taxons"
             :key="index">
            <div class="product-card">
                <a :href="getURL(taxon.permalink)">
                    <div class="image-block" :style="{
                        backgroundImage: 'url('+taxon.preview+')',
                        backgroundPosition: '50% 50%',
                        height: sliderHeight+'px' }"></div>
                </a>
                <a :href="getURL(taxon.permalink)" class="product-name">{{ taxon.name }}</a>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions, mapMutations } from 'vuex';

    export default {
        props: ['taxonsJson'],
        data() {
            return {
                slideWidth: 0
            }
        },
        mounted(){
            this.slideWidth = parseInt($('.product-container .product-card').innerWidth());
        },
        methods: {
          getURL(path){
              return this.locale + '/' + path;
          }
        },
        computed: {
            ...mapGetters(['locale']),
            sliderHeight() {
                let ratio = 1;
                return parseInt(this.slideWidth * ratio);
            },
            taxons() {
                return JSON.parse(this.taxonsJson).taxonomies[0].root.taxons;
            }
        }
    }
</script>