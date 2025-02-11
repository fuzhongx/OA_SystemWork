<template>
  <div style="display: flex; height: 100vh">
    <div style="width: 64px">
      <el-menu active-text-color="#ffd04b" background-color="#545c64" class="menu-l" default-active="1"
        text-color="#fff">
        <el-menu-item style="padding: 0;"> <svg-icon icon-name='logo' class="logo-s-b" style="padding-left: 14px;"></svg-icon></el-menu-item>
        <el-menu-item :index="item.menu_path" v-for="item in data.menuList" :key="item.id" class="p-l-10"
          @click="handleOpens(item)"> 
          <span style="padding-bottom: 5px;"><svg-icon  :icon-name=item.icon class="svg-margin-r-5 font-s" style="padding-left: 5px;"></svg-icon></span> 
          <span>{{ item.menu_name }}</span></el-menu-item>
      </el-menu>
    </div>

    <div>
      <el-menu active-text-color="#efeffe" background-color="#fff" class="el-menu-vertical-demo menu-r"
        default-active="1" :collapse="isCollapse" text-color="#000" @open="handleOpen" @close="handleClose" router>
                <div class="menu-title-hidden" v-if="isCollapse"> {{ data.TITLE }}</div>
                <div class="menu-title" v-else> {{ data.TITLE }}</div>
        <template v-for="items in data.childrenList" :key="items.menu_path">
          <template v-if="!items.hidden">
             <!-- 第一层 -->
            <el-menu-item :key="items.menu_path" v-if="hasOnlychildren(items)" :index="items.menu_path" class="items-text-s">
              <svg-icon :icon-name=items.icon class="svg-margin-r-5"></svg-icon>
              <template #title>
                <span>{{ items.menu_name }}</span>
              </template>
            </el-menu-item>
               <!-- 第一展开层 -->
            <el-sub-menu v-else-if="items.icon!==''&&items.icon.trim()" :index="items.menu_path" class="items-text-s">
              <template #title>
               <svg-icon :icon-name=items.icon class="svg-margin-r-5"></svg-icon>
                <span >{{ items.menu_name }}</span>
              </template>

              <!-- 第二层 -->
              <template v-for="childs in items.children" :key="childs.menu_path">
                <el-menu-item :index="childs.menu_path"  :key="childs.menu_path" v-if="hasOnlychildrenChildren(childs)" class="items-text-s">
                  
                    <template #title>
                <span> {{ childs.menu_name }}</span>
              </template>
                </el-menu-item>

              <el-sub-menu v-else :index="childs.menu_path" class="items-text-s">
              <template #title>
                <span>{{ childs.menu_name }}</span>
              </template>
              <template v-if="childs.children">
                <el-menu-item :index="three.menu_path" v-for="three in childs.children" :key="three.menu_path" >
                  <template v-if="!three.children">
                    <span> {{ three.menu_name }}</span>
                  </template>
                </el-menu-item>
              </template>
            </el-sub-menu>
              </template>
            </el-sub-menu>
          </template>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { menusApi } from "@/api/menus/index.js";
import bus from "@/util/Bus";

const isCollapse = ref();
const data = reactive({
  menuList: [],
  childrenList: [],
  TITLE: "",
});
bus.on("isCollapse", (data) => {
  isCollapse.value = data;
});
onMounted(() => {
  menusApi().then((res) => {
    data.menuList = res.data.data.menu;
    data.menuList.forEach(item=>{
      data.childrenList=item.children
      data.TITLE = item.menu_name;
    })
  });
});
const handleOpens = (item) => {
  data.TITLE = item.menu_name;
  data.childrenList = item.children;
};
const hasOnlychildrenChildren=(childs)=>{
   //不存在子集的情况
   if (!childs.children) {
    return true;
  }
}
const hasOnlychildren = (data) => {
  //不存在子集的情况
  if (!data.children) {
    if(data.icon!=''&&data.icon.trim()){
      return true;
    }
  }
};
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 164px;
  min-height: 100vh;
}
.logo-s-b{
  // background: #4c9de9;
  font-size: 40px;
}
.svg-margin-r-5{
  margin-right:5px;
}
.items-text-s{
  font-size: 14px;
}

.el-menu-item {
  padding: 0 20px;
}

.menu-title {
    line-height: 56px;
 
    font-size: 18px;
    font-weight: 800;
    padding-left: 20px;
    font-variant: diagonal-fractions;
    transition: all 0.1s;
}
.menu-title-hidden{
    width: 64px;
    height: 56px;
    display: flex;
    justify-content: center;
    line-height: 56px;
    font-size: 18px;
    font-weight: 800;
    font-variant: diagonal-fractions;
    transition: all 0.1s;
}

.p-l-10 {
  margin: 0 auto;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.p-l-10:hover{
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background-color: #075fb1 !important;
}
.p-l-10.is-active{
  width: 50px;
  height: 50px;
  border-radius: 10px;
  color: #075fb1 !important;
  background: #fff !important;
}
.menu-l {
  width: 64px;
  z-index: 70;
  overflow: hidden;
  position: fixed;
  bottom: 0;
  top: 0;
  background: #1e84e3;
  -webkit-box-shadow: 0 1px 4px 0 rgba(0, 21, 41, 0.12);
  box-shadow: 0 1px 4px 0 rgba(0, 21, 41, 0.12);
  color: #fff;
  min-height: 670px;
}
.menu-r::-webkit-scrollbar {
  display: none; /* 对于Chrome, Safari 和 Opera */
}
.menu-r {
  overflow: auto;
  // /* 保持可滚动 */
  scrollbar-width: none;
  background: #fff;
  color: #000;
  height:100vh;
  -webkit-box-shadow: 2px 0 4px 0 rgba(114, 111, 111, 0.06);
  box-shadow: 2px 0 4px 0 rgba(0,0,0,.06);
}
</style>
