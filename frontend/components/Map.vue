<template>
  <el-container v-if="isMounted">
    <!-- <el-row> -->
      <el-col :span="16">
        <yandex-map :coords="currentPos" @map-was-initialized="initMap" class="hybrid" zoom="10" :controls="['geolocationControl']">
          <ymap-marker v-for="container in containers.list" :key="container.tc_num" markerId="123" marker-type="placemark" hint-content="element.hint" :coords="container.coords"></ymap-marker>
        </yandex-map>
      </el-col>
      <el-col :span="8">
        <Toolbar />
      </el-col>
    <!-- </el-row >     -->
  </el-container>
</template>

<script>
import Toolbar from '../components/Toolbar';
import { mapGetters } from 'vuex';
export default {
  components: {
    Toolbar
  },
  computed: mapGetters({
    containers: "containers/containers"
  }),
  data() {
    return {
      isMounted: false,
      currentPos: [54, 39],
      markers: []
    };
  },
  mounted() {
    this.isMounted = true;
  },
  async created() {
    //this.markers = await this.getMarkers();
  },
  methods: {
    async getMarkers() {
      let data = await this.$axios.$get(`/api/companies/${tc_ogrn}/containers`);
      data = data.map((container) => {
        return {
          ...container,
          coords: container.tc_coords.split(' ')
        };
      })
      return data;
    },
    initMap() {
      this.initUserPos();
    },
    initUserPos() {
      ymaps.geolocation.get().then((res) => {
        this.currentPos = res.geoObjects.position;
      },
      (err) => {
        console.log(err);
      });
    }
  }

};
</script>

<style>
 .ymap-container {
  height: 100vh;
  width: 100%;
}
</style>
