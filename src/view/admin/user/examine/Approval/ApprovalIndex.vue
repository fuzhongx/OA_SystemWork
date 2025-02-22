<template>
  <div class="contair">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="待审批" name="1">
        <div>
          <div>
            <el-form
              :inline="true"
              :model="formInline"
              class="demo-form-inline"
            >
              <el-form-item>
                <el-input placeholder="请输入人员" clearable />
              </el-form-item>
              <el-form-item>
                <el-select placeholder="审批类型" clearable>
                  <el-option label="Zone one" value="shanghai" />
                  <el-option label="Zone two" value="beijing" />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-date-picker
                  v-model="value2"
                  type="daterange"
                  :shortcuts="shortcuts"
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </el-form-item>
            </el-form>
          </div>
          <div
            class="cont-padd-14"
            v-for="item in data.DATA_LIST"
            :key="item.id"
          >
            <div class="cont-title">
              <div class="cont-tltle-img">
                <i class="iconfont icon-cexiao color"></i>
                <div>
                  <span class="cont-kaipiao">{{ item.approve.name }}</span>
                  <span class="color1 cont-chexiao" v-if="item.status == 1"
                    >已通过</span
                  >
                  <span class="color2 cont-chexiao" v-if="item.status == 0"
                    >审核中</span
                  >
                  <span class="color3 cont-chexiao" v-if="item.status == 2"
                    >已拒绝</span
                  >
                  <span class="color4 cont-chexiao" v-if="item.status == -1"
                    >已撤销</span
                  >
                </div>
              </div>
              <div class="cont-btn">查看详情</div>
            </div>
            <div class="cont-text">
              <div>
                <img
                  src="https://shmily-album.oss-cn-shenzhen.aliyuncs.com/admin_face/face9.png"
                  alt=""
                />
              </div>
              <div>
                <p>
                  <span class="content-m-20">{{ item.card.name }}</span>
                  <span> 创建于{{ item.created_at }}</span>
                </p>
                <p
                  v-for="cont in item.content"
                  :key="cont.id"
                  class="cont-content"
                >
                  <span
                    ><span class="content-title content-m-20" v-if="cont.value"
                      >{{ cont.label }}:</span
                    >
                    <span>{{ cont.value }}</span></span
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="全部" name=""></el-tab-pane>
      <el-tab-pane label="已处理" name="2"></el-tab-pane>
      <el-tab-pane label="抄送我的" name="3"></el-tab-pane>
      <el-tab-pane label="已撤销" name="4"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import "@/assets/icon/iconfont.css";
import { onMounted, reactive, ref } from "vue";
import { DaiShenPi } from "@/api/user/Approval/index";
import { ElMessageBox } from "element-plus";

onMounted(() => {
  DaiShenPis();
});
const activeName = ref("1");
const data = reactive({
  DATA_LIST: [],
});
const value2 = ref('')
const shortcuts = [
{
    text: '最近1天',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 1)
      return [start, end]
    },
  },
  {
    text: '最近7天',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: '最近一个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: '最近三个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  },
]
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
    verify_status: e,
  })
    .then((res) => {
      data.DATA_LIST = res.data.data.list;
      console.log(data.DATA_LIST);
    })
    .catch((error) => {
      ElMessageBox.error(error.response.data.msg);
    });
};

</script>

<style lang="scss" scoped>
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

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
