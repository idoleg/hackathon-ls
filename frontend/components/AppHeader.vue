<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
  >
    <el-menu-item index="1">
      <i class="el-icon-location"></i>
      <span slot="title"><nuxt-link to="/map">Карта ТБО</nuxt-link></span>
    </el-menu-item>
    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <span slot="title"><nuxt-link to="/dicts">Реестры</nuxt-link></span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "GarbageCollector",
  data () {
    return {
      isCollapse: true
    }
  },
  methods: {
    handleOpen() {
      this.isCollapse = false;
    },
    handleClose() {
      this.isCollapse = true;
    }
  }
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
