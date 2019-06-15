<template>
  <el-container v-if="isMounted">
    <!-- <el-row> -->
      <el-col :span="16">
        <yandex-map :coords="currentPos" @map-was-initialized="initMap" class="hybrid" zoom="10" :controls="['geolocationControl']">
          <ymap-marker v-for="marker in markers" :key="marker.id" markerId="123" marker-type="placemark" hint-content="element.hint" :coords="marker.coords"></ymap-marker>
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
export default {
  components: {
    Toolbar
  },
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
  created() {
    this.markers = this.getMarkers();
  },
  methods: {
    getMarkers() {
      return [{
        id: 1,
        coords: ['58.54696', '31.265172']
      }, {
        id: 2,
        coords: [26, 52]
      }];
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
