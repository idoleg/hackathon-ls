<template>
  <el-container>
    <Menu></Menu>
    <el-select v-model="region" placeholder="" @change="onRegionChange">
      <el-option v-for="region in regions" :key="region.region" :value="region.region">
        {{region.region}}
      </el-option>
    </el-select>
    <el-select v-model="company" placeholder="" @change="onCompanyChange">
      <el-option v-for="company in companies" :key="company.tc_ogrn" :value="company.tc_ogrn">
        {{company.tc_name}}
      </el-option>
    </el-select>
  </el-container>
</template>

<script>
import Menu from "./Menu";
import { mapGetters } from 'vuex';
export default {
    components: {Menu},
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
    async created() {
      this.regions = await this.loadRegions();
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
};
</script>

<style>
</style>
