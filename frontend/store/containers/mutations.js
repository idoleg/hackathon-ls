export default {
    add(state, { text }) {
        state.list.push({
            text,
            done: false
        })
    },

    setContainers(state, containers) {
        let data = containers.map((container) => {
            return {
              ...container,
              coords: container.tc_coord.split(' ').map((coord) => {
                  return parseFloat(coord);
              })
            };
          })
        state.list = data;
    }
}
