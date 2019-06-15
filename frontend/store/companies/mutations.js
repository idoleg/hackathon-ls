export default {
    add(state, { text }) {
      state.list.push({
        text,
        done: false
      })
    },

    setCompanies(state, companies) {
        state.list = companies;
    }
  }
  