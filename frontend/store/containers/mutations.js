export default {
  add(state, { text }) {
    state.list.push({
      text,
      done: false
    });
  },

  setContainers(state, containers) {
    let data = containers.map(container => {
      const coords = container.tc_coord.split(" ").map(coord => {
        return parseFloat(coord);
      });
      return {
        type: "Feature",
        id: container.tc_num,
        geometry: {
          type: "Point",
          coordinates: [coords[1], coords[0]]
        }
        //...container
      };
    });
    state.list = {
      type: "FeatureCollection",
      features: data
    };
  }
};
