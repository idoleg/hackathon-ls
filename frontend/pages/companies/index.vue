<template>
  <el-table :data="companies" style="width: 100%" :row-class-name="tableRowClassName">
    <el-table-column prop="date" label="Date" width="180"></el-table-column>
    <el-table-column prop="name" label="Name" width="180"></el-table-column>
    <el-table-column prop="address" label="Address"></el-table-column>
  </el-table>
</template>

<script>
import axios from 'axios';
export default {
  computed: {
    companies() {
      return this.$store.state.companies.list;
    }
  },
  async fetch ({ store, params }) {
    let { data } = await axios.get('/api/companies')
    store.commit('setCompanies', data)
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    }
  },
  data() {
    return {
    };
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
