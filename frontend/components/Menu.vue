<template>
  <div class="app-header">
    <h2  class="app-header__title">Логистика и ТБО</h2>
    <div class="app-header__menu">
      <el-tooltip content="Menu" placement="bottom" effect="light">
        <el-button circle size="medium">
          <i class="el-icon-more-outline"></i>
        </el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.app-header {
  display: flex;
  width: 100%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 5px;
  align-items: stretch;
}
.app-header__menu{
    align-self:end;

}

.app-header__title{
    width:100%;
    font-size: 20px;
    line-height: 36px;
}
</style>
