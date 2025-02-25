<template>
       <div>
          <div>
            <el-form :inline="true"  class="demo-form-inline">
              <el-form-item>
                <el-input placeholder="请输入人员" clearable />
              </el-form-item>
              <el-form-item>
                <el-select placeholder="审批类型" clearable v-model="value">
                  <template #header>
                    <el-checkbox v-model="checkAll" :indeterminate="indeterminate" @change="handleCheckAll">
                      全部
                    </el-checkbox>
                  </template>
                  <el-option :label="item.name" :value="item.id" v-for="item in data.NAV_LIST" :key="item.id"
                    class="option-active" />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-date-picker v-model="value2" type="daterange" :shortcuts="shortcuts" range-separator="至"
                  start-placeholder="开始时间" end-placeholder="结束时间" />
              </el-form-item>
            </el-form>
          </div>
          <div class="cont-sroll">
            <div class="cont-padd-14" v-for="item in data.DATA_LIST" :key="item.id">
              <div class="cont-title">
                <div class="cont-tltle-img">
                  <i class="iconfont icon-cexiao color"></i>
                  <div>
                    <span class="cont-kaipiao">{{ item.approve.name }}</span>
                    <span class="color1 cont-chexiao" v-if="item.status == 1">已通过</span>
                    <span class="color2 cont-chexiao" v-if="item.status == 0">审核中</span>
                    <span class="color3 cont-chexiao" v-if="item.status == 2">已拒绝</span>
                    <span class="color4 cont-chexiao" v-if="item.status == -1">已撤销</span>
                  </div>
                </div>
                <div style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  ">
                  <span class="cont-btn" @click="btnLook(item.id,item.status)">查看详情</span>
                  <span v-if="item.status == 0&&data.name==1">
                    <el-button class="cont-jujue m-l-10">拒绝</el-button>
                    <el-button class="cont-jujue m-color">同意</el-button>
                  </span>
                </div>
              </div>
              <div class="cont-text">
                <div>
                  <img src="https://shmily-album.oss-cn-shenzhen.aliyuncs.com/admin_face/face9.png" alt="" />
                </div>
                <div>
                  <p>
                    <span class="content-m-20">{{ item.card.name }}</span>
                    <span> 创建于{{ item.created_at }}</span>
                  </p>
                  <p v-for="cont in item.content" :key="cont.id" class="cont-content">
                    <span><span class="content-title content-m-20" v-if="cont.value">{{ cont.label }}:</span>
                      <span>{{ cont.value }}</span></span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
    <el-drawer v-model="drawer"  :with-header="false" class="dra-box" style="--el-drawer-padding-primary: var(--el-dialog-padding-primary,0px);">
    <div class="dra-hearder">
        <div class="dra-img"><img src="https://shmily-album.oss-cn-shenzhen.aliyuncs.com/admin_face/face9.png" alt=""></div>
        <div>
            <div>{{data.card.name}}的<span>{{ data.approve.name }}</span></div>
            <p>
                <span class="color1 cont-chexiao" v-if="data.dra_List.status == 1">已通过</span>
                <span class="color2 cont-chexiao" v-if="data.dra_List.status == 0">审核中</span>
                <span class="color3 cont-chexiao" v-if="data.dra_List.status == 2">已拒绝</span>
                <span class="color4 cont-chexiao" v-if="data.dra_List.status == -1">已撤销</span>
            </p>
        </div>
    </div>
    <div class="dra-cont">
        <div class="dra-cont-h">
            <span></span>
            <span>提交审批</span>
        </div>
        <div class="dra-cont-text" v-for="conts in data.dra_List.content" :key="conts.id">
        <div><span>{{conts.label}}</span>：<span>{{conts.value}}</span></div>
        </div>
        <div v-for="shenhe in data.dra_List.users" :key="shenhe.id">
          <div class="dra-cont-h">
            <span></span>
            <span>审核人</span>
        </div>
        <div class="dra-img dra-shenhe" v-for="item in data.users[0].users" :key="item.id">
          <div class="dra-img"><img :src=item.card.avatar alt=""></div>
          <div>{{ item.card.name }}</div>
        </div>

        <div>
          <h4>留言</h4>
          <div v-for="reply in data.reply" :key="reply.id">
             <div class="dra-img"><img :src=reply.card.avatar alt=""></div>
            <div>{{ reply.content }}</div>
           <div>
            
           </div><span>{{ reply.content }}</span>
          </div>
        </div>
        </div>
       
    </div>
  </el-drawer>
</template>

<script setup>
import "@/assets/icon/iconfont.css";
import { onMounted, reactive, ref,watch } from "vue";
import { DaiShenPi, DaiShenPi_list } from "@/api/user/Approval/index";
import { ElMessageBox } from "element-plus";
import bus from "@/util/Bus";
import axios from "axios";

onMounted(() => {
  DaiShenPis();
  NavList();
});

const token=localStorage.getItem('token')
const drawer=ref(true)
const checkAll = ref(false)
const indeterminate = ref(false)
const value = ref([])
const data = reactive({
  DATA_LIST: [],
  NAV_LIST: [],
  name:'',
  dra_List:[],
  card:{},
  approve:{},
  content:[],
  users:[],
  reply:[]
});
const value2 = ref("");
const shortcuts = [
  {
    text: "最近1天",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
      return [start, end];
    },
  },
  {
    text: "最近7天",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      return [start, end];
    },
  },
  {
    text: "最近一个月",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      return [start, end];
    },
  },
  {
    text: "最近三个月",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      return [start, end];
    },
  },
];
    bus.on('activeName',val=>{
        data.name=val
        DaiShenPis(val)
    })
const btnLook=(id,type)=>{
    drawer.value=true
    axios({
        url:'https://demo.tuoluojiang.com/api/ent/approve/apply/'+id+'/edit',
        method:'get',
        headers:{
             "authorization" :"Bearer " + token
        },
        params:{
            types:type
        }
    }).then(res=>{
      data.dra_List=res.data.data
      data.card=res.data.data.card
      data.approve=res.data.data.approve
      data.content=res.data.data.content
      data.users=res.data.data.users
      data.reply=res.data.data.reply
      console.log( data.users,666);
      console.log( data.content,6126);
    })
}
const NavList = () => {
  DaiShenPi_list().then((res) => {
    data.NAV_LIST = res.data.data;
  });
};
watch(value, (val) => {
  if (val.length === 0) {
    checkAll.value = false
    indeterminate.value = false
  } else if (val.length === data.NAV_LIST.value.length) {
    checkAll.value = true
    indeterminate.value = false
  } else {
    indeterminate.value = true
  }
})
const handleCheckAll = (e) => {
  indeterminate.value = false
  if (e) {
    e.value = data.NAV_LIST.value.map((_) => _.value)
  } else {
    e.value = []
  }
}

const DaiShenPis = (e) => {
  DaiShenPi({
    page: 1,
    limit: 15,
    types: 1,
    time: "",
    status: "",
    approve_id: "",
    name: "",
    verify_status: e,
  })
    .then((res) => {
      data.DATA_LIST = res.data.data.list;
    })
    .catch((error) => {
      ElMessageBox.error(error.response.data.msg);
    });
};
</script>

<style lang="scss" scoped>
.dra-shenhe{
  padding-left: 20px;
  display: flex;
  // justify-content: center;
  align-items: center;
}
.dra-img{

}
.dra-img img {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-right: 10px;
}
.dra-cont-text{
    padding: 10px 20px;
}
.dra-cont-text span{
    font-size: 13px;
    display: inline-block;
    text-align: right;
    color: #606266;
    white-space: nowrap;
}
.dra-cont-h{
    display: flex;
    align-content: center;
}
.dra-cont-h span:nth-child(1){
    display:inline-block;
    width: 3px;
    height: 16px;
    background: #1890ff;
    display: inline-block;
    margin: 20px 10px 20px 20px;
}
.dra-cont-h span:nth-child(2){
    font-size: 14px;
    font-weight: 600;
    color: rgba(0,0,0,.85);
    margin: 20px 0;

}
.dra-hearder{
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;
    margin-bottom: 0;
    font-size: 14px;
    padding-left: 20px;
    height: 80px;
    font-weight: 500;
    color: #333;
}
.dra-img img{
    width: 48px;
    height: 48px;
}
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