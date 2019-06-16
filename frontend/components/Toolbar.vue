<template>
  <section class="app-cont">
    <div class="app-cont__row">
      <Menu></Menu>
    </div>
    <!-- <div class="app-cont__input">
      <p class="app-cont__descr">Выберите регион</p>
      <el-select v-model="region" placeholder @change="onRegionChange" size="mini">
        <el-option
          v-for="region in regions"
          :key="region.region"
          :value="region.region"
        >{{region.region}}</el-option>
      </el-select>
    </div> -->
    <div class="app-cont__input">
      <p class="app-cont__descr">Выберите регион</p>
      <el-select v-model="company" placeholder @change="onCompanyChange" size="mini" style="width: 100%;">
        <el-option
          v-for="company in companies"
          :key="company.tc_ogrn"
          :value="company.tc_ogrn"
          :label="company.tc_region+' : '+company.tc_name"
        ></el-option>
      </el-select>
    </div>
    <el-button size="medium" @click="$root.$emit('changeMap')">
      Update
    </el-button>
  </section>
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
      companies: [],
      company: {}
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
        let containers = await this.$axios.get(`/api/companies/${e}/containers`);
        this.$store.commit("containers/setContainers", containers.data);

        let poligons = await this.$axios.get(`/api/companies/${e}/poligons`);
        this.$store.commit("containers/setPoligons", poligons.data);

        let processing = await this.$axios.get(`/api/companies/${e}/processing`);
        this.$store.commit("containers/setProcessing", processing.data);

        this.$root.$emit('changeMap')
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style>
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
</style>
