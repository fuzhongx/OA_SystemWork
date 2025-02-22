<template>
  <div class="contair">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="待审批" name="1">
         <ShowView></ShowView>
      </el-tab-pane>
      <el-tab-pane label="全部" name=" ">
        <ShowView></ShowView>
      </el-tab-pane>
      <el-tab-pane label="已处理" name="2">
        <ShowView></ShowView>
      </el-tab-pane>
      <el-tab-pane label="抄送我的" name="3">
        <ShowView></ShowView>
      </el-tab-pane>
      <el-tab-pane label="已撤销" name="4">
        <ShowView></ShowView>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import ShowView from '@/view/admin/user/examine/compoment/ShowView.vue';
import {ref} from 'vue'
import bus from "@/util/Bus";
const activeName = ref(" ");
const handleClick = (tab) => {
  // DaiShenPis(tab.props.name);
  bus.emit('activeName',tab.props.name)
};
</script>

<style lang="scss" scoped>
.option-active {
  padding-left: 20px;
  font-size: 14px;
  line-height: 34px;
}

.m-color {
  color: #fff;
  background-color: #1890ff;
  border-color: #1890ff;
}

.m-color:focus,
.m-color:hover {
  background: #46a6ff;
  border-color: #46a6ff;
  color: #fff;
}

.m-l-10:focus,
.m-l-10:hover {
  background: #f16643;
  border-color: #f16643;
  color: #fff;
}

.m-l-10 {
  margin-left: 10px;
  color: #fff;
  background-color: #ed4014;
  border-color: #ed4014;
}

.cont-jujue {
  padding: 7px 15px;
  height: 28px;
  font-size: 12px;
  border-radius: 3px;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid #dcdfe6;
}

.cont-sroll {
  height: 700px;
  overflow: auto;
}

.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}

.color1 {
  border-color: #e9e9eb;
  color: #909399;
}

.color4 {
  border-color: #e9e9eb;
  color: #909399;
}

.color2 {
  border-color: #ffebcc;
  color: #f90;
}

.color3 {
  border-color: #fbd9d0;
  color: #ed4014;
}

.cont-content {
  float: left;
  // .content-title{
  //  color: #333333;
  // }
}

.content-m-20 {
  padding-left: 20px;
}

.color {
  color: orange;
  font-size: 25px;
  margin-right: 14px;
}

.cont-kaipiao {
  font-weight: 700;
  font-size: 13px;
  line-height: 20px;
}

.cont-chexiao {
  font-size: 5px;
  display: inline-block;
  height: 20px;
  margin: 0 5px;
  padding: 0 5px;
  line-height: 19px;
  border: 1px solid #e8f4ff;
  background: #fff;
}

.cont-text {
  margin: 15px 0;
  display: flex;
  font-size: 13px;
  color: hsla(0, 0%, 46.7%, 0.85);
  padding: 16px 15px;
  background-color: rgba(24, 144, 255, 0.04);

  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }

  p {
    margin: 0 0 10px 0;
  }
}

.cont-text-m-l {
  padding-left: 10px;
}

.cont-padd-14 {
  padding: 14px;

  .cont-title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .cont-tltle-img {
      display: flex;
    }
  }
}

.cont-btn:hover {
  color: #1890ff;
  border-color: #badeff;
  background-color: #e8f4ff;
}

.cont-btn {
  padding: 7px 15px;
  font-size: 12px;
  border-radius: 3px;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-color: #dcdfe6;
  color: #606266;
}

.contair {
  width: 100%;
  height: 100%;
  padding: 20px;
  background: #fff;
}

.demo-tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
