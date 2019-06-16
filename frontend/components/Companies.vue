<template>
  <div>
    <el-row>
      <el-col :span="21" :offset="1">
        <el-form :inline="true" :model="newCompany">
          <el-form-item label="ОГРН">
            <el-input v-model="newCompany.tc_ogrn"></el-input>
          </el-form-item>
          <el-form-item label="Имя компании">
            <el-input v-model="newCompany.tc_name"></el-input>
          </el-form-item>
          <el-form-item label="Адрес">
            <el-input v-model="newCompany.tc_adress"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleCreateNew">Создать</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="21" :offset="1">
        <el-table
          :data="companies.filter(data => !search || data.tc_name.toLowerCase().includes(search.toLowerCase()) || String(data.tc_ogrn).includes(search.toLowerCase()) || data.tc_adress.toLowerCase().includes(search.toLowerCase()) )"
          style="width: 100%"
          :row-class-name="tableRowClassName"
          @row-dblclick="onRowDblClick"
        >
          <el-table-column prop="tc_ogrn" label="ОГРН" width="180"></el-table-column>
          <el-table-column prop="tc_name" label="Компания" width="180"></el-table-column>
          <el-table-column prop="tc_adress" label="Адрес"></el-table-column>
          <el-table-column align="right" min-width="150px">
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                @keyup="handleSearchKeyPress(key, scope)"
                placeholder="Поиск"
              />
            </template>
            <template slot-scope="scope">
              <el-button size="mini" v-if="false" @click="setEditMode(row)">Редактировать</el-button>
              <el-button
                size="mini"
                v-if="false"
                type="success"
                icon="el-icon-check"
                @click="saveRow(row)"
              ></el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope)">Удалить</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import EditableCell from "../components/EditableCell";
export default {
  name: "Companies",
  computed: mapGetters({
    companies: "companies/companies"
  }),
  data() {
    return {
      search: "",
      newCompany: {
        tc_name: "",
        tc_ogrn: "",
        tc_adress: ""
      }
    };
  },
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
    handleEdit(index, row) {
      console.log(index, row);
    },
    async handleDelete(row) {
      event.preventDefault();
      row = row.row;
      this.$confirm(`Удалить компанию ${row.tc_name}?`, "Внимание", {
        confirmButtonText: "Да",
        cancelButtonText: "Отмена",
        type: "warning"
      })
        .then(async () => {
          //await this.$axios.delete(`/api/companies/${row.tc_ogrn}`);
          this.$store.commit("companies/delete");
          this.$message({
            type: "success",
            message: "Удалено успешно"
          });
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: `${err.message}`
          });
        });
    },
    async handleCreateNew() {
      try {
        //await this.$axios.post("/api/companies", {
        //  ...this.newCompany
        //});
        this.$store.commit("companies/add", this.newCompany);
      } catch (err) {
        this.$message({
          type: "info",
          message: `${err.message}`
        });
      }
    },
    handleSearchKeyPress(key, scope) {
      console.log(key, scope);
    },
    setEditMode(row) {
      row.editMode = true;
    },
    saveRow(row) {
      row.editMode = false;
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
