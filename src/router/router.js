import { createRouter, createWebHashHistory } from "vue-router";
const routes=[
    {
        path: "/",
        component: () => import("@/view/login/LoginLogin.vue"),
        meta: { title: "登录页" },
      },
      {
        path: "/Index",
        name:'Index',
        component: () => import("@/view/HomeIndex.vue"),
        meta: { title: "主页" },
        redirect:'/admin/user/workbench/index',
        children:[
          {
            path: "/admin/user/workbench/index",
            name:'workbench',
            component: () => import("@/view/admin/user/workbench/WorkIndex.vue"),
            meta: { title: "工作台" },
          },
          {
            path: "/admin/user/calendar/index",
            name:'MyDate',
            component: () => import("@/view/admin/user/calendar/MyDate.vue"),
            meta: { title: "我的日程" },
          },
          {
            path: "/admin/user/examine",
            name:'ExamineIndex',
            component: () => import("@/view/admin/user/examine/ExamineIndex.vue"),
            meta: { title: "申请审批" },
            children:[
              {
                path: "/admin/user/examine/approval",
                name:'ApprovalIndex',
                component: () => import("@/view/admin/user/examine/Approval/ApprovalIndex.vue"),
                meta: { title: "经我审批" },
              },
              {
                path: "/admin/user/examine/mine",
                name:'MiNe',
                component: () => import("@/view/admin/user/examine/Approval/MiNe.vue"),
                meta: { title: "我的申请" },
              },
            ]
          },
          {
            path: "/admin/user/duty",
            name:'JobIndex',
            component: () => import("@/view/admin/user/Job/JobIndex.vue"),
            meta: { title: "职位说明" },
            children:[
              {
                path: "/admin/user/duty/analyse",
                name:'JobAnalysis',
                component: () => import("@/view/admin/user/Job/JobDes/JobAnalysis.vue"),
                meta: { title: "工作分析" },
              },
              {
                path: "/admin/user/duty/explain",
                name:'GangweiZhize',
                component: () => import("@/view/admin/user/Job/JobDes/GangweiZhize.vue"),
                meta: { title: "岗位职责" },
              },
              {
                path: "/admin/user/training/promotion",
                name:'JingsSuom',
                component: () => import("@/view/admin/user/Job/JobDes/JingsSuom.vue"),
                meta: { title: "晋升说明" },
              },
            ]
          },
          {
            path: "/admin/user/assessment",
            name:'MentIndex',
            component: () => import("@/view/admin/user/Assessment/MentIndex.vue"),
            meta: { title: "绩效考核" },
            children:[
              {
                path:"/admin/user/assessment/department",
                name:'DeptIndex',
                component: () => import("@/view/admin/user/Assessment/Ment/DeptIndex.vue"),
                meta: { title: "部门考核" },
              },
              {
                path: "/admin/user/assessment/my",
                name:'MyMent',
                component: () => import("@/view/admin/user/Assessment/Ment/MyMent.vue"),
                meta: { title: "我的考核" },
              },
              {
                path: "/admin/user/assessment/appraisal",
                name:'PerView',
                component: () => import("@/view/admin/user/Assessment/Ment/PerView.vue"),
                meta: { title: "绩效审核" },
              },
            ]
          },
          {
            path: "/admin/user/training",
            name:'TrainIndex',
            component: () => import("@/view/admin/user/Training/TrainIndex.vue"),
            meta: { title: "员工培训" },
            children:[
              {
                path:"/admin/user/training/profile",
                name:'GongSJies',
                component: () => import("@/view/admin/user/Training/Profile/GongSJies.vue"),
                meta: { title: "公司介绍" },
              },
              {
                path: "/admin/user/training/structure",
                name:'ZhuzhiView',
                component: () => import("@/view/admin/user/Training/Profile/ZhuzhiView.vue"),
                meta: { title: "组织结构图" },
              },
              {
                path: "/admin/user/training/plan",
                name:'ZhanlvePlan',
                component: () => import("@/view/admin/user/Training/Profile/ZhanlvePlan.vue"),
                meta: { title: "战略规划" },
              },
            ]
          },
          {
            path:"/admin/user/ent/index",
            name:'EetIndex',
            component: () => import("@/view/admin/user/Ent/EetIndex.vue"),
            meta: { title: "企业通讯录" },
          },
        
        ]
      },
     
]
const router=createRouter({
    history:createWebHashHistory(),
    routes
})
export default router