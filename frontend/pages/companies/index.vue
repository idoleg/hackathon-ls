<template>
  <section class="app-cont">
    <div class="app-cont__row">
      <Menu></Menu>
    </div>
    <el-table
      :data="companies"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      @row-dblclick="onRowDblClick"
    >
      <el-table-column prop="tc_ogrn" label="ОГРН" width="180"></el-table-column>
      <el-table-column prop="tc_name" label="Компания" width="180"></el-table-column>
      <el-table-column prop="tc_adress" label="Адрес"></el-table-column>
    </el-table>
  </section>
</template>

<script>
import Menu from "@/components/Menu";
import { mapMutations, mapGetters } from "vuex";
export default {
  computed: mapGetters({
    companies: "companies/companies"
  }),
  components: { Menu },
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
    onRowDblClick(e) {
      this.$router.push({
        path: `/companies/${e.tc_ogrn}`
      });
    },
    async loadCompanies() {
      let data = await this.$axios.$get("/api/companies");
      this.$store.commit("companies/setCompanies", data);
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
