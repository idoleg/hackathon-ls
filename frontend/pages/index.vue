<template>
  <div>
    <div class="app-site-headaer">
      <Menu>
      </Menu>
    </div>
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
  </div>
</template>

<script>
import Companies from '../components/Companies';
import Objects from '../components/Objects';
import Menu from '../components/Menu';
export default {
  components: {
    Companies,
    Objects,
    Menu
  }
};
</script>

<style>
.app-site-headaer{
  margin-bottom: 30px;
}
</style>

