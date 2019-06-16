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
    filter(state){
      return state.filter;
    }
  }
  