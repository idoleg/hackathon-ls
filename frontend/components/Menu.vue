<template>
  <div class="app-header">
    <h2 class="app-header__title">Логистика и ТБО</h2>
    <div class="app-header__menu">
      <el-tooltip :content="isOpen? 'Close menu':'Menu'" placement="bottom" effect="light">
        <el-button circle size="medium" @click="toggle">
          <i :class="isOpen? 'el-icon-close' : 'el-icon-more-outline'"></i>
        </el-button>
      </el-tooltip>
    </div>

    <div class="app-menu" v-if="isOpen">
      <h3 class="app-menu__title">Логистика и ТБО</h3>

      <ul  @click.capture="toggle">
        <nuxt-link v-for="item in menu" :key="item.text" :to="item.link">{{item.text}}</nuxt-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      menu: [
          {
              text: "Main page",
              link: "/"
          },
          {
              text: "Map",
              link: "/map"
          }
      ]
    };
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>

<style>
.app-header {
  display: flex;
  width: 100%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 5px;
  align-items: stretch;
}
.app-header__menu {
  align-self: end;
  position: relative;
  z-index: 9;
}

.app-header__title {
  width: 100%;
  font-size: 20px;
  line-height: 36px;
}

.app-menu {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  /* background: linear-gradient(90deg, #d4fc79 0%, #96e6a1 100%); */
}

.app-menu ul {
  max-width: 500px;
  margin: 0 auto;
}

.app-menu ul a {
  display: block;
  color: #ffffff;
  font-size: 17px;
  padding: 15px;
  border-radius: 4px;
  margin: 5px;
  text-decoration: none;
}
.app-menu ul a:hover {
  background-color: rgba(64, 160, 255, 0.53);
}

.app-menu__title {
  color: #ffffff;
  font-size: 20px;
  line-height: 50px;
  display: block;
  text-align: center;
  
}
</style>
