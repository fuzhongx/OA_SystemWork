<template>
  <div class="contair">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="待审批" name="1">
       <div>
        <div></div>
        <div class="cont-padd-14">
            <div class="cont-title">
                <div class="cont-tltle-img">
                   <div><img src="" alt=""></div>
                   <div><span>开票</span><span>已撤销</span></div>
                </div>
                <div>查看详情</div>
            </div>
            <div></div>
        </div>
       </div>
 
      </el-tab-pane>
      <el-tab-pane label="全部" name="">{{data.DATA_LIST}}</el-tab-pane>
      <el-tab-pane label="已处理" name="2">{{data.DATA_LIST}}</el-tab-pane>
      <el-tab-pane label="抄送我的" name="3">{{data.DATA_LIST}}</el-tab-pane>
      <el-tab-pane label="已撤销" name="4">{{data.DATA_LIST}}</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { DaiShenPi } from "@/api/user/Approval/index";
import { ElMessageBox } from "element-plus";

onMounted(() => {
  DaiShenPis();
});
const activeName = ref('1');
const data=reactive({
    DATA_LIST:[]
})
const handleClick = (tab) => {
    DaiShenPis(tab.props.name);
};
const DaiShenPis = (e) => {  
  DaiShenPi({
    page: 1,
    limit: 15,
    types: 1,
    time: "",
    status: "",
    approve_id: "",
    name: "",
    verify_status:e,
  }).then((res) => {
    data.DATA_LIST=res.data.data.list
    console.log(data.DATA_LIST);
  }).catch(error=>{
    ElMessageBox.error(error.response.data.msg)
  });
};
</script>

<style lang="scss" scoped>
.cont-padd-14{
    padding: 14px;
    background: red;
    .cont-title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .cont-tltle-img{
            display: flex;
        }
    }
}
.contair {
  width: 100%;
  height: 100%;
  padding: 20px;
  background: #fff;
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
