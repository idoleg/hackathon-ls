<template>
  <el-header>
    <el-menu default-active mode="horizontal">
      <el-menu-item index="1">
        <nuxt-link to='/'>Главная</nuxt-link>
      </el-menu-item>
      <el-menu-item index="2-2">
        <nuxt-link to='/map'>Карта ТБО</nuxt-link>
      </el-menu-item>
    </el-menu>
  </el-header>
</template>

<script>
export default {
  name: "AppHeader"
};
</script>

<style>
</style>
