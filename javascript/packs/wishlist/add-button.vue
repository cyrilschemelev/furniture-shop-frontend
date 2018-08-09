<template>
    <div class="add-to-whitelist" v-on:click="addProduct(selectedVariant[0].id)">
        <img src="/images/icons/favorites-little.svg">
        <span>{{ addToFavorites }}</span>
    </div>
</template>

<script>
    import { mapGetters, mapActions, mapMutations } from 'vuex';
    export default {
        props: {
            addToFavorites: {
                type: String,
                required: true
            }
        },
        methods: {
            // TODO check between 133 and 33
            addProduct(id) {
                this.$store.dispatch('addWishListItem', id);
                alert('Продукт добавлен в Избранное!');
            }
        },
        computed: {
            ...mapGetters(['selectedVariant'])
        }
    }
</script>