<template>
  <el-container v-if="isMounted">
      <yandex-map :coords="currentPos" @map-was-initialized="initMap" class="hybrid" zoom="10" :controls="['geolocationControl']">
        <ymap-marker v-for="marker in markers" :key="marker.id" markerId="123" marker-type="placemark" hint-content="element.hint" :coords="marker.coords"></ymap-marker>
      </yandex-map>
  </el-container>
</template>

<script>
export default {
  components: {
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
        coords: [54, 39]
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
  height: 600px;
  width: 100%;
}
</style>
