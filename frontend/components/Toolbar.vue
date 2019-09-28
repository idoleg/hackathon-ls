<template>
  <div class="app-cont">
    <div class="app-cont__input">
      <p class="app-cont__descr">Выберите регион</p>
      <el-select
        v-model="company"
        placeholder
        @change="onCompanyChange"
        size="mini"
        style="width: 100%;"
      >
        <el-option
          v-for="company in companies"
          :key="company.tc_ogrn"
          :value="company.tc_ogrn"
          :label="company.tc_region+' : '+company.tc_name"
        ></el-option>
      </el-select>
    </div>
    <div class="app-cont__input">
      <p class="app-cont__descr">Отображение:</p>
      <el-checkbox-group v-model="filter" @change="onFilterChange">
        <el-checkbox label="container" checked>Контейнеры</el-checkbox>
        <el-checkbox label="poligon" checked>Полигоны</el-checkbox>
        <el-checkbox label="processing" checked>Переработка отходов</el-checkbox>
        <el-checkbox label="nezakon" checked>Незаконные свалки</el-checkbox>
        <el-checkbox label="ad" checked>Объявления</el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="app-cont__input">
      <el-button
        type="danger"
        round
        icon="el-icon-edit"
        size="mini"
        @click="dialogNezakonVisible = true"
      >Сообщить о незаконной свалке</el-button>
    </div>
    <div class="app-cont__input">
      <el-button
        type="primary"
        round
        icon="el-icon-picture-outline-round"
        size="mini"
        @click="dialogStatVisible = true"
      >Получить аналитику по региону</el-button>
    </div>
    <div class="app-cont__input app-cont__stat">
      <p class="app-cont__descr">Статистика по выбранному региону:</p>
      <p>{{stat.containers}} контейнеров</p>
      <p>{{stat.poligons}} полигонов</p>
      <p>{{stat.processing}} заводов, переабатывающих отходы</p>
      <p>{{stat.nezakon}} незаконных свалок</p>
      <p>{{stat.ad}} объявлений</p>
    </div>

    <el-dialog
      title="Сообщить о незаконной свалке"
      :visible.sync="dialogNezakonVisible"
      width="50%"
    >
      <strong>
        Вы можете сообщить нам о незаконной свалке для того, чтобы наша система
        <br />автоматически подготовила и отправила уведомление в контролирующий
        <br />орган вашего региона.
      </strong>
      <el-form ref="form" :model="nezakonForm" label-width="120px" label-position="top">
        <el-form-item label="Адрес незаконной свалки">
          <el-input v-model="nezakonForm.tc_area"></el-input>
          <el-button type="primary" icon="el-icon-map-location" round size="mini">Указать на карте</el-button>
        </el-form-item>
        <el-form-item label="Подробное описание местоположения">
          <el-input type="textarea" v-model="nezakonForm.tc_place"></el-input>
          <el-button type="success" icon="el-icon-document-add" round size="mini">Добавить фото</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogNezakonVisible = false">Отменить</el-button>
        <el-button type="primary" @click="dialogNezakonVisible = false">Отправить заявку</el-button>
      </span>
    </el-dialog>

    <el-dialog title="Аналитика региона" :visible.sync="dialogStatVisible" width="50%">
      <img src="/stat-clasters.jpg" style="width:100%;" />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogStatVisible = false">Закрыть</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Menu from "./Menu";
import { mapGetters } from "vuex";
export default {
  components: { Menu },
  data() {
    return {
      //regions: [],
      //region: "",
      stat: {
        containers: 0,
        poligons: 0,
        processing: 0,
        nezakon: 0,
        ad: 0
      },
      nezakonForm: {},
      dialogNezakonVisible: false,
      dialogStatVisible: false,
      filter: [],
      companies: [],
      company: {},
      filterVisible: true
    };
  },
  async onRegionChange(e) {
    try {
      let { data } = await this.$axios.get("/api/companies", {
        params: {
          region: e
        }
      });
      this.companies = data;
      return data;
    } catch (err) {
      console.log(err);
    }
  },
  async created() {
    this.companies = await this.loadCompanies();
  },
  methods: {
    async loadCompanies() {
      try {
        let { data } = await this.$axios.get("/api/companies");
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    // async onRegionChange(e) {
    //   try {
    //     let { data } = await this.$axios.get("/api/companies", {
    //       params: {
    //         region: e
    //       }
    //     });
    //     this.companies = data;
    //     return data;
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
    async onCompanyChange(e) {
      try {
        console.log(e);
        let containers = await this.$axios.get(
          `/api/companies/${e}/containers`
        );
        this.$store.commit("containers/setContainers", containers.data);
        this.stat.containers = containers.data.length;

        let poligons = await this.$axios.get(`/api/companies/${e}/poligons`);
        this.$store.commit("containers/setPoligons", poligons.data);
        this.stat.poligons = poligons.data.length;

        let processing = await this.$axios.get(
          `/api/companies/${e}/processing`
        );
        this.$store.commit("containers/setProcessing", processing.data);
        this.stat.processing = processing.data.length;

        let nezakon = await this.$axios.get(`/api/companies/${e}/nezakon`);
        this.$store.commit("containers/setNezakon", nezakon.data);
        this.stat.nezakon = nezakon.data.length;

        let ad = await this.$axios.get(`/api/companies/ad`);
        this.$store.commit("containers/setAd", ad.data);
        this.stat.ad = ad.data.length;

        this.$store.commit("containers/setFilter", this.filter);
        this.$root.$emit("changeMap");
      } catch (err) {
        console.log(err);
      }
    },
    onFilterChange() {
      console.log(this.filter);
      this.$store.commit("containers/setFilter", this.filter);
      this.$root.$emit("changeMapFilter");
    }
  }
};
</script>

<style scoped>
.app-cont {
  display: flex;
  flex-direction: column;
}
.app-cont__input {
  margin: 10px;
}
.app-cont__descr {
  font-size: 12px;
  font-weight: 600;
}

.app-cont__stat {
  margin-top: 40px;
  font-size: 14px;
}

</style>
