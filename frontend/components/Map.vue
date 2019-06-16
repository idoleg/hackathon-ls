<template>
  <el-container v-if="isMounted">
    <!-- <el-row> -->
    <el-col :span="16">
      <yandex-map
        :coords="currentPos"
        @map-was-initialized="initMap"
        class="hybrid"
        zoom="10"
        :controls="['geolocationControl']"
      >
        <ymap-marker
          v-for="container in containers.list"
          :key="container.tc_num"
          markerId="123"
          marker-type="placemark"
          hint-content="element.hint"
          :coords="container.coords"
        ></ymap-marker>
      </yandex-map>
    </el-col>
    <el-col :span="8">
      <Toolbar/>
    </el-col>
    <!-- </el-row >     -->
  </el-container>
</template>

<script>
import Toolbar from "../components/Toolbar";
import { mapGetters } from "vuex";
export default {
  components: {
    Toolbar
  },
  computed: mapGetters({
    containers: "containers/containers",
    processing: "containers/processing",
    poligons: "containers/poligons",
    filter: "containers/filter"
  }),
  data() {
    return {
      isMounted: false,
      currentPos: [54, 39],
      markers: [],
      ymap: {}
    };
  },
  mounted() {
    this.isMounted = true;
  },
  async created() {
    //this.markers = await this.getMarkers();
    this.$root.$on("changeMap", this.changeMap);
    this.$root.$on("changeMapFilter", this.changeMapFilter);
  },
  methods: {
    async getMarkers() {
      let data = await this.$axios.$get(`/api/companies/${tc_ogrn}/containers`);
      data = data.map(container => {
        return {
          ...container,
          coords: container.tc_coords.split(" ")
        };
      });
      return data;
    },
    initMap(ymap) {
      this.ymap = ymap;
      this.initUserPos();
      this.objectManager = new ymaps.ObjectManager({
        // Чтобы метки начали кластеризоваться, выставляем опцию.
        clusterize: true,
        // ObjectManager принимает те же опции, что и кластеризатор.
        gridSize: 32,
        clusterDisableClickZoom: true
      });
      this.changeMap();
    },
    initUserPos() {
      ymaps.geolocation.get().then(
        res => {
          this.currentPos = res.geoObjects.position;
        },
        err => {
          console.log(err);
        }
      );
    },
    changeMap() {
      if (!this.ymap || !ymaps) {
        console.warn("@changeMap: ymap or ymaps not init");
        return;
      }

      this.objectManager.removeAll();

      //this.objectManager.objects.options.set("preset", "islands#redDotIcon");
      this.objectManager.clusters.options.set(
        "preset",
        "islands#greenClusterIcons"
      );
      this.ymap.geoObjects.add(this.objectManager);
      console.log(this.containers);
      // Размещение геообъекта на карте.
      this.objectManager.add(this.containers);
      this.objectManager.add(this.poligons);
      this.objectManager.add(this.processing);

      this.changeMapFilter();
    },
    changeMapFilter() {
      this.objectManager.setFilter((object)=> {
        return this.filter.includes(object.properties.type);
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
