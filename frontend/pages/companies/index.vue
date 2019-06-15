<template>
  <el-table :data="companies" style="width: 100%" :row-class-name="tableRowClassName">
    <el-table-column prop="date" label="Date" width="180"></el-table-column>
    <el-table-column prop="name" label="Name" width="180"></el-table-column>
    <el-table-column prop="address" label="Address"></el-table-column>
  </el-table>
</template>

<script>
//import axios from 'axios';
import { mapMutations, mapGetters } from "vuex";
export default {
  computed: mapGetters({
    companies: "companies/companies"
  }),
  methods: {
    addCompany(e) {
      const text = e.target.value;
      if (text.trim()) {
        this.$store.commit("companies/add", { text });
      }
      e.target.value = "";
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    async loadCompanies() {
      let data = await this.$axios.$get("/api/companies");
      console.log(data);
      this.$store.commit("setCompanies", data);
    },
    ...mapMutations({
      toggle: "companies/toggle",
      setCompanies: "companies/setCompanies"
    })
  },
  created() {
    this.loadCompanies();
  },
  async asyncData({ $axios, store }) {
    /*
    let data = await $axios.$get('/api/companies');
    console.log(data);
    store.commit('setCompanies', data);
    */
  }
};
</script>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
