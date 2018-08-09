<template>
    <div class="section products" v-if="taxons">
        <div class="nav-container">
            <a v-for="taxon in taxons" :href="url(taxon)">{{taxon.name}}</a>
        </div>
        <div class="image-block">
            <div class="current-hover-image-container" v-for="(taxon, index) in taxons">
                <div class="current-hover-image"
                     :style="{backgroundImage: getBackgroundImage(taxon.preview, index)}"></div>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex';

    export default {
        data() {
            return {
                onlyFirstImage: true
            }
        },
        props: ['taxonsJson'],
        computed: {
            ...mapGetters(['locale']),
            taxons() {
                return JSON.parse(this.taxonsJson).taxonomies[0].root.taxons;
            }
        },
        methods: {
            getBackgroundImage(link, index) {
                if (index === 0 && this.onlyFirstImage) {
                    return 'url(' + link + ')';
                } else if (!this.onlyFirstImage) {
                    return 'url(' + link + ')';
                } else {
                    return '';
                }
            },
            url(taxon) {
                return this.locale + '/' + taxon.permalink;
            },
        },
        mounted: function () {
            let headerContainer = document.getElementById('products');
            headerContainer.onmouseover = () => {
                this.onlyFirstImage = false;
            };
        },
    }
</script>