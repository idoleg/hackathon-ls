<template>
  <el-tabs type="card">
    <el-tab-pane label="Реестр компаний - региональных операторов">
      <Companies />
    </el-tab-pane>
    <el-tab-pane label="Реестр объектов обработки, размещения, обезвреживания и утилизации отходов">
      <Objects />
    </el-tab-pane>
    <el-tab-pane label="Банк данных об отходах">

    </el-tab-pane>
    <el-tab-pane label="Банк данных о технологиях утилизации и обезвреживания отходов"></el-tab-pane>
  </el-tabs>
</template>

<script>
import Companies from '../components/Companies';
import Objects from '../components/Objects';
export default {
  components: {
    Companies,
    Objects
  }
};
</script>

<style>

</style>

