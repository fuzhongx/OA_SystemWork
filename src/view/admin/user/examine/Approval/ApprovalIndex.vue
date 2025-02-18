<template>
  <div class="contair">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="待审批" name="1">
       <div>
        <div></div>
        <div class="cont-padd-14">
            <div class="cont-title">
                <div class="cont-tltle-img">
                   <i class="iconfont icon-cexiao color" ></i>
                   <div><span class="cont-kaipiao">开票</span><span class="cont-chexiao">已撤销</span></div>
                </div>
                <div class="cont-btn">查看详情</div>
            </div>
            <div class="cont-text">
              <div><img src="https://demo.tuoluojiang.com/uploads//attach/2025/01/64cf0202110191336032822.jpg" alt=""></div>
              <div>
                <p> 马化0.212 创建于2025-02-17 15:11:30</p>
                <p>客户名称 : 北京国际机场   期望开票日期 : 2025-02-18   开票要求 : 电子   发票类型 : 企业普通发票   开票金额（元） : 100   发票抬头 : 111111111   </p>
              </div>
            </div>
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
import "@/assets/icon/iconfont.css"
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
.color{
  color: orange;
}
.cont-kaipiao{
  font-weight: 700;
    font-size: 13px;
    line-height: 20px;
}
.cont-chexiao{
  font-size: 5px;
  display: inline-block;
  height: 20px;
  margin: 0 5px;
  padding: 0 5px;
  line-height: 19px;
  border: 1px solid #e8f4ff;
  border-color: #fbd9d0;
  color: #ed4014;
  background: #fff;
}
.cont-text{
  margin: 15px 0;
  display: flex;
  padding: 16px 15px;
  background-color: rgba(24,144,255,.04);
  img{
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  p{
    margin: 0 0 10px 0;
    padding-left: 10px;
  }
}
.cont-padd-14{
    padding: 14px;
    .cont-title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .cont-tltle-img{
            display: flex;
        }
    }
}
.cont-btn:hover{
  color: #1890ff;
    border-color: #badeff;
    background-color: #e8f4ff;
}
.cont-btn{
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
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
