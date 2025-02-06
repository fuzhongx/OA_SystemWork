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
                ><el-icon class="icon"> <Setting /> </el-icon
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
        <div class="top-h-344 active-bgc">
          <div class="daiban-top">2025-02-05 代办</div>
          <div class="daiban-content">
            <div
              class="daiban-content-box"
              v-for="item in data.DAIBAN"
              :key="item.id"
            >
              <div><el-radio :label="item.id" v-model="radio"> </el-radio></div>
              <div>
                <p>{{ item.title }}</p>
                <p>{{ item.start_time }}</p>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div shadow="hover" class="top-h-344 active-bgc">Hover</div>
      </el-col>
    </el-row>

    <el-row :gutter="12" style="margin-top: 14px">
      <el-col :span="16">
        <div class="active-bgc sys-w-h">
          <div class="sys-title">系统通知</div>
          <div class="sys-text-box">
            <div
              class="sys-content"
              v-for="item in data.MESSAGE"
              :key="item.id"
            >
              <div class="sys-text-hidden">
                <span
                  ><span class="sys-text-p-r">[{{ item.title }}]</span
                  ><span>{{ item.message }}</span></span
                >
              </div>
              <div>{{ item.created_at }}</div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="active-bgc qiye-contair">Hover</div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import {
  getDaiBan,
  getDaiBan_Type,
  getDaiBan_Message,
} from "@/api/work/work.js";
// eslint-disable-next-line no-unused-vars
const radio = ref(389);
const data = reactive({
  ids: [],
  DAIBAN: [],
  MESSAGE: [],
});
onMounted(() => {
  getDaibanList();
  getMessage();
});
const getMessage = () => {
  getDaiBan_Message({
    page: 1,
    limit: 11,
    cate_id: "",
    is_read: "",
  }).then((res) => {
    data.MESSAGE = res.data.data.list;
    console.log(res.data.data.list);
  });
};
const getDaibanList = () => {
  getDaiBan_Type().then((res) => {
    const ids = [];
    res.data.data.forEach((e) => {
      ids.push(e.id);
    });
    getDaiBan({
      cid: ids,
      end_time: "2025-02-05 23:59:59",
      period: 1,
      start_time: "2025-02-05 00:00:00",
    })
      .then((res) => {
        data.DAIBAN = res.data.data;
        console.log(res);
      })
      .catch((error) => {
        console.error(error.response.data.msg);
      });
  });
};
</script>

<style lang="scss" scoped>
.qiye-contair{
  height: 456px;
}
.sys-w-h {
  padding: 20px;
  .sys-title{
    font-size: 16px;
    font-weight: 700;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
  div:nth-child(1) span {
    font-size: 16px;
  }
  .sys-text-box {
    height: 400px;
    overflow: auto;
    scrollbar-width: none;
  }

  .sys-text-box::-webkit-scrollbar {
    display: none;
    /* 对于Chrome, Safari 和 Opera */
  }
  .sys-content {
    display: flex;
    justify-content: space-between;
    overflow: auto;
    .sys-text-hidden {
      width: 85%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    div {
      font-size: 13px;
      margin: 20px 0px;
      color: #909399;

      span {
        font-size: 13px;
      }

      .sys-text-p-r {
        margin-right: 20px;
      }
    }
  }
}

.daiban-top {
  font-size: 16px;
  font-weight: 700;
  color: #303133;
}

.daiban-content {
  width: 100%;
  height: 100%;
  padding: 14px 0px;
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .daiban-content-box {
    width: 32%;
    height: 80px;
    -webkit-box-align: center;
    -ms-flex-align: center;
    padding: 12px 12px;
    // height: 80px;
    background: #f2f5fc;
    border-radius: 6px;

    div:nth-child(1) {
      float: right;
    }

    div:nth-child(2) {
      margin-top: 10px;
    }

    p:nth-child(1) {
      color: #303133;
      font-size: 14px;
      line-height: 1.5;
    }

    p:nth-child(2) {
      font-size: 12px;
      color: #909399;
      line-height: 1.5;
    }
  }
}

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

.contair {
  width: 100%;
  height: 853px;
  overflow: auto;
  scrollbar-width: none;
}

.contair::-webkit-scrollbar {
  display: none;
  /* 对于Chrome, Safari 和 Opera */
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
  // padding: 20px;
}

.top-h-344 {
  height: 344px;
  padding: 20px;
}
</style>
