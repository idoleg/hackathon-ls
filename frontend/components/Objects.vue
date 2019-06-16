<template>
  <div>
    <el-row>
      <el-col :span="21" :offset="1">
        <el-form :inline="true" :model="newObject">
          <el-form-item label="ОГРН ответственной компании">
            <el-input v-model="newObject.tc_ogrn"></el-input>
          </el-form-item>
          <el-form-item label="Наименование объекта">
            <el-input v-model="newObject.tc_name"></el-input>
          </el-form-item>
          <el-form-item label="Тип объекта">
            <el-select v-model="newObject.tc_type" placeholder="">
              <el-option v-for="type in types" :key="type.id">{{type.name}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Адрес">
            <el-input v-model="newObject.tc_adress"></el-input>
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
          :data="objects.filter(data => !search || data.tc_name.toLowerCase().includes(search.toLowerCase()) || String(data.tc_ogrn).includes(search.toLowerCase()) || data.tc_adress.toLowerCase().includes(search.toLowerCase()) )"
          style="width: 100%"
          :row-class-name="tableRowClassName"
          @row-dblclick="onRowDblClick"
        >
          <el-table-column prop="tc_ogrn" label="ОГРН ответственной компании" width="180"></el-table-column>
          <el-table-column prop="tc_name" label="Компания" width="180"></el-table-column>
          <el-table-column prop="tc_name" label="Наименование объекта" width="180"></el-table-column>
          <el-table-column prop="tc_name" label="Тип объекта" width="180"></el-table-column>
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
export default {
  name: "Objects",
  computed: mapGetters({
    objects: "objects/objects"
  }),
  data() {
    return {
      search: "",
      newObject: {
        tc_name: "",
        tc_ogrn: "",
        tc_adress: ""
      },
      types:[{
        id: 1,
        name: 'Бак'
      }, {
        id: 2,
        name: 'Полигон'
      }, {
        id: 3,
        name: 'Завод по переработке ТБО'
      }]
    };
  },
  methods: {
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
        path: `/objects/${e.tc_ogrn}`
      });
    },
    async loadObjects() {
      let data = await this.$axios.$get("/api/objects");
      this.$store.commit("objects/setObjects", data);
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    async handleDelete(row) {
      event.preventDefault();
      row = row.row;
      this.$confirm(`Удалить объект ${row.tc_name}?`, "Внимание", {
        confirmButtonText: "Да",
        cancelButtonText: "Отмена",
        type: "warning"
      })
        .then(async () => {
          await this.$axios.delete(`/api/objects/${row.tc_ogrn}`);
          this.$store.commit("objects/delete");
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
        await this.$axios.post("/api/objects", {
          ...this.newObject
        });
        this.$store.commit("objects/add", this.newObject);
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
      toggle: "objects/toggle",
      setObjects: "objects/setObjects"
    })
  },
  created() {
    this.loadObjects();
  },
  async asyncData({ $axios, store }) {
    /*
    let data = await $axios.$get('/api/objects');
    console.log(data);
    store.commit('setObjects', data);
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
