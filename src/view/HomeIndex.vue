<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="220"><AsideIndex /></el-aside>
      <el-container>
        <el-header><HeaderIndex /></el-header>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import AsideIndex from "@/view/layout/AsideIndex.vue";
import HeaderIndex from "@/view/layout/HeaderIndex.vue";
</script>

<style>
.el-header {
  --el-header-padding: 0;
  box-sizing: border-box;
  flex-shrink: 0;
  height: 56px;
  /* height: var(--el-header-height); */
  padding: var(--el-header-padding);
  background-color: #fff;
}
.el-aside {
   width: var(--el-aside-width,0px);
}
.el-main {
  height: 100%;
  width: 100%;
    --el-main-padding: 14px;
}
</style>
