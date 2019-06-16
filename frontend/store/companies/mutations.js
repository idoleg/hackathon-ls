export default {
    add(state, company) {
        state.list.push(company)
    },

    setCompanies(state, companies) {
        state.list = companies;
    },

    delete(state, id) {
        state.list = state.list.filter((company) => company.tc_ogrn !== id);
    }
}
