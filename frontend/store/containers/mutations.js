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
              coords: container.tc_coords.split(' ')
            };
          })
        state.list = data;
    }
}
