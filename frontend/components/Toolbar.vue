<template>
  <section class="app-cont">
    <div class="app-cont__row">
      <Menu></Menu>
    </div>
    <div class="app-cont__input">
      <p class="app-cont__descr">Выберите регион</p>
      <el-select v-model="region" placeholder @change="onRegionChange" size="mini">
        <el-option
          v-for="region in regions"
          :key="region.region"
          :value="region.region"
        >{{region.region}}</el-option>
      </el-select>
    </div>
    <div class="app-cont__input">
      <p class="app-cont__descr">Выберите компанию</p>
      <el-select v-model="company" placeholder @change="onCompanyChange" size="mini">
        <el-option
          v-for="company in companies"
          :key="company.tc_ogrn"
          :value="company.tc_ogrn"
        >{{company.tc_name}}</el-option>
      </el-select>
    </div>
  </section>
</template>

<script>
import Menu from "./Menu";
import { mapGetters } from 'vuex';
export default {
  components: { Menu },
    computed: mapGetters({
      containers: "containers/containers"
    }),
    data() {
      return {
        regions: [],
        region: '',
        companies: [],
        company: {}
      }
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
    methods: {
      async loadRegions() {
        try {
          let {data} = await this.$axios.get('/api/regions');
          return data;
        } catch (err) {
          console.log(err);
        }
      },
      async onRegionChange(e) {
        try {
          let {data} = await this.$axios.get('/api/companies', {
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
      async onCompanyChange(e) {
        try {
          let {data} = await this.$axios.get(`/api/companies/${e}/containers`);
          this.$store.commit('containers/setContainers', data);
        } catch (err) {
          console.log(err);
        }
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
