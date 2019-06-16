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
          balloonContentHeader: "Контейнер №" + container.tc_num,
          balloonContentBody: `<p><strong>Адрес:</strong> ${container.tc_adress}</p><p><strong>Управляющая орг.:</strong> ${container.tc_namorg}</p><p><strong>Количество контейнеров:</strong> ${container.tc_kont}</p><p><strong>Периодичность вывоза:</strong> ${container.tc_vvz}</p>`,
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
          balloonContentHeader: "Полигон №" + poligon.tc_id,
          balloonContentBody: `<p><strong>Адресс:</strong> ${poligon.tc_adress}</p><p><strong>Организация:</strong> ${poligon.tc_nameko}</p><p><strong>Номер лицензии:</strong> ${poligon.tc_numlic}</p><p><strong>Виды захораниваемых отходов:</strong> ${poligon.tc_vid}</p><p><strong>Наименование объекта:</strong> ${poligon.tc_obj}</p>`,
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
          balloonContentHeader: "Перерабатывающий завод №" + process.tc_inn,
          balloonContentBody: `<p><strong>Адресс:</strong> ${process.tc_adress}</p><p><strong>Организация:</strong> ${process.tc_nameko}</p><p><strong>Возможности:</strong> ${process.tc_teh}</p><p><strong>Назначение:</strong> ${process.tc_nazn}</p><p><strong>Получаемые отходы:</strong> ${process.tc_othodi}</p><p><strong>Класс отходов:</strong> ${process.tc_class}</p>`,
          type: "processing"
        }
        //...process
      };
    });
    state.processing = data;
  },

  setFilter(state, filter) {
    state.filter = filter;
  }
};
