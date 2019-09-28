export default {
    containers(state) {
      return {
        type: "FeatureCollection",
        features: state.containers
      };
    },
    poligons(state) {
      return {
        type: "FeatureCollection",
        features: state.poligons
      };
    },
    processing(state) {
      return {
        type: "FeatureCollection",
        features: state.processing
      };
    },
    nezakon(state) {
      return {
        type: "FeatureCollection",
        features: state.nezakon
      };
    },
    filter(state){
      return state.filter;
    },
    ad(state) {
      return {
        type: "FeatureCollection",
        features: state.ad
      };
    }
  }
  