const state = {
    taxons: [],
    activeTaxonId: 0,
    activeParentTaxonId: 0,
    activeTaxonDescription: ''
};
const mutations = {
    setTaxons(state, payload){
        state.taxons = payload;
    },
    setActiveTaxonId(state, payload){
        state.activeTaxonId = payload;
    },
    setActiveParentTaxonId(state, payload){
        state.activeParentTaxonId = payload;
    },
    setActiveTaxonDescription(state, payload){
        state.activeTaxonDescription = payload;
    },
};

const actions = {
    getTaxonomies(context, payload) {
        context.commit('setActiveTaxonId', parseInt(payload.taxon_id));
        context.commit('setActiveParentTaxonId', parseInt(payload.parent_taxon_id));
        context.commit('setActiveTaxonDescription', payload.taxon_description);
        let url = context.rootGetters.locale + '/api/custom/taxonomies?set=nested';
        fetch(url).then(data =>  data.json()).then(response => {
            context.commit('setTaxons', response.taxonomies[0].root.taxons);
        });
    },
};
const getters = {
    taxons: state => state.taxons,
    currentTaxon: state => {
        if (state.activeParentTaxonId == 1) {
            return state.taxons.filter(taxon => {
                return taxon.id == state.activeTaxonId;
            });
        } else {
            return state.taxons.filter(taxon => {
                return taxon.id == state.activeParentTaxonId;
            });
        }
    },
    activeTaxonId: state => state.activeTaxonId,
    activeParentTaxonId: state => state.activeParentTaxonId,
    activeTaxonDescription: state => state.activeTaxonDescription
};

export default {
    state,
    getters,
    actions,
    mutations
};