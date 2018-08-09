const state = {
    activeParams: []
};

const mutations = {
    toggleDropdownItem(state, elem) {
        let main = state.activeParams.filter(item => {
            if (item === elem) {
                return elem;
            }
        });
        if (!!main.length) {
            let length = state.activeParams.length;
            for (let i = 0; i < length; i++) {
                if (state.activeParams[i] == elem) {
                    state.activeParams.splice(i, 1);
                }
            }
        } else {
            state.activeParams = [];
            state.activeParams.push(elem);
        }
    },
    clearDropdownParams(state){
        state.activeParams = [];
    }
};
const actions = {};
const getters = {
    dropdownParams: state => {
        return state.activeParams;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};