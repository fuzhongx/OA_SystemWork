<template>
  <div class="contair">
    <el-row :gutter="12">
      <el-col :span="16">
        <div shadow="hover" class="top-h-126 top-display active-bgc">
          <div class="top-div">
            <div><img src="@/assets/imgs/dai-ban-ye-wu.png" alt="" /></div>
            <div>
              <p>5</p>
              <p>代办业务</p>
            </div>
          </div>
          <div class="top-div">
            <div><img src="@/assets/imgs/dai-wo-shen-pi.png" alt="" /></div>
            <div>
              <p>5</p>
              <p>我的申请</p>
            </div>
          </div>
          <div class="top-div">
            <div><img src="@/assets/imgs/dai-wo-shen-pi.png" alt="" /></div>
            <div>
              <p>5</p>
              <p>待我审批</p>
            </div>
          </div>
          <div class="top-div">
            <div><img src="@/assets/imgs/qi-ye-dong-tai.png" alt="" /></div>
            <div>
              <p>5</p>
              <p>企业动态</p>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div shadow="hover" class="top-h-126 top-img-r active-bgc">
          <img
            src="@/assets/imgs/ma-hua.png"
            alt=""
            style="object-fit: cover"
          />
          <div>
            <p>马化0.212, 下午好！</p>
            <p>"高效团队铸就一流企业！！！"</p>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="12" style="margin-top: 14px">
      <el-col :span="24">
        <div class="top-h-150 active-bgc">
          <div class="dept-d-between">
            <div class="dept-title">
              <h3>业绩统计</h3>
              <span>部门业绩</span>
            </div>
            <div class="dept-setting">
              <span
                ><el-icon class="icon"><Setting /></el-icon
              ></span>
              <span>管理</span>
            </div>
          </div>

          <div class="dept-yeji">
            <div class="dept-yeji-f-s">
              <p>0</p>
              <p>本月业绩</p>
            </div>
            <div class="dept-yeji-f-s">
              <p>0</p>
              <p>今日业绩</p>
            </div>
            <div class="dept-yeji-f-s">
              <p>0</p>
              <p>昨日业绩</p>
            </div>
            <div class="dept-yeji-f-s">
              <p>0</p>
              <p>今日新增客户</p>
            </div>
            <div class="dept-yeji-f-s">
              <p>0</p>
              <p>今日跟进记录</p>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="12" style="margin-top: 14px">
      <el-col :span="16">
        <div shadow="hover" class="top-h-344 active-bgc">Hover</div>
      </el-col>
      <el-col :span="8">
        <div shadow="hover" class="top-h-344 active-bgc">Hover</div>
      </el-col>
    </el-row>

    <el-row :gutter="12" style="margin-top: 14px">
      <el-col :span="16">
        <div shadow="hover" class="active-bgc">Hover</div>
      </el-col>
      <el-col :span="8">
        <div shadow="hover" class="active-bgc">Hover</div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { getDaiBan,getDaiBan_Type } from "@/api/work/work.js";
const data=reactive({
  ids:[]
})
onMounted(() => {
  getDaibanList();
});

const getDaibanList = () => {
  getDaiBan_Type().then(res=>{
    const ids=[]
    res.data.data.forEach(e => {
      ids.push(e.id)
    });
    getDaiBan({
    cid:ids,
    end_time: "2025-02-05 23:59:59",
    period: 1,
    start_time: "2025-02-05 00:00:00",
  })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.error(error.response.data.msg);
    });
  })
  
};
</script>

<style lang="scss" scoped>
.dept-yeji {
  width: 100%;
  display: flex;
  justify-content: center;
  .dept-yeji-f-s {
    width: 20%;
    padding: 20px 0 0 20px;
    p:nth-child(1) {
      font-size: 20px;
      font-family: PingFang SC-Semibold, PingFang SC;
      font-weight: 700;
      color: #000;
    }
    p:nth-child(2) {
      margin-top: 10px;
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #909399;
    }
  }
}

.dept-d-between {
  display: flex;
  justify-content: space-between;
  padding: 20px;

  .dept-title {
    width: 130px;
    display: flex;
    justify-content: space-between;
    h3 {
      font-size: 16px;
      font-weight: 700;
    }
    span {
      padding-top: 3px;
      font-size: 12px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #1890ff;
    }
  }
  .dept-setting {
    display: flex;
    span {
      font-size: 14px;
      padding-left: 5px;
      cursor: pointer;
      -webkit-box-pack: end;
      -ms-flex-pack: end;
      color: #909399;
    }
  }
}
.contair::-webkit-scrollbar {
  display: none; /* 对于Chrome, Safari 和 Opera */
}
.contair {
  width: 100%;
  height: 100%;
  overflow: auto;
  scrollbar-width: none;
}
.active-bgc {
  background-color: #fff;
}
.top-img-r {
  position: relative;
  padding: 0px;
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
  }
  div {
    height: 30px;
    position: absolute;
    left: 200px;
    top: 50%;
    margin-top: -15px;
    p:nth-child(2) {
      font-size: 13px;
      margin-top: 10px;
      color: #909399;
      line-height: 1.5;
    }
  }
}
.top-display {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.el-card__body {
  width: 100%;
  padding: var(--el-card-padding);
  display: flex;
}
.top-h-126 {
  height: 126px;
  width: 100%;
}
.top-div {
  width: 25%;
  height: 50%;
  border-right: 1px solid #f0f2f5;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 50px;
    height: 50px;
  }
  p:nth-child(1) {
    color: #f90;
    font-size: 24px;
    font-weight: 600;
    padding-bottom: 5px;
  }
  p:nth-child(2) {
    padding-top: 5px;
    color: #606266;
    font-size: 13px;
  }
}
.top-h-150 {
  height: 150px;
}
.top-h-344 {
  height: 344px;
}
</style>
