export default {
  add(state, { text }) {
    state.list.push({
      text,
      done: false
    });
  },

  setContainers(state, containers) {
    console.log(containers);
    let data = containers.map(container => {
      const coords = container.tc_coord.split(" ").map(coord => {
        return parseFloat(coord);
      });
      return {
        type: "Feature",
        id: "cont" + container.tc_num,
        geometry: {
          type: "Point",
          coordinates: [coords[1], coords[0]],
          iconColor: "#93278F"
        },
        options: {
          preset: "islands#darkGreenDotIcon"
        },
        properties: {
          type: "container"
        }
        //...container
      };
    });
    state.containers = data;
  },

  setPoligons(state, poligons) {
    let data = poligons.map(poligon => {
      const coords = poligon.tc_coord.split(" ").map(coord => {
        return parseFloat(coord);
      });
      return {
        type: "Feature",
        id: "pol" + poligon.tc_id,
        geometry: {
          type: "Point",
          coordinates: [coords[1], coords[0]],
          iconColor: "#93278F"
        },
        options: {
          preset: "islands#brownDotIcon"
        },
        properties: {
          type: "poligon"
        }
        //...poligon
      };
    });
    state.poligons = data;
  },

  setProcessing(state, processing) {
    let data = processing.map(process => {
      const coords = process.tc_coord.split(" ").map(coord => {
        return parseFloat(coord);
      });
      return {
        type: "Feature",
        id: "proc" + process.tc_inn,
        geometry: {
          type: "Point",
          coordinates: [coords[1], coords[0]],
          iconColor: "#93278F"
        },
        options: {
          preset: "islands#violetDotIcon"
        },
        properties: {
          type: "processing"
        }
        //...process
      };
    });
    state.processing = data;
  },

  setFilter(state, filter){
    state.filter = filter;
  }
};
