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
        children:[
          {
            path: "/admin/user/workbench/index",
            name:'workbench',
            component: () => import("@/view/admin/user/workbench/WorkIndex.vue"),
            meta: { title: "工作台" },
          }
        ]
      },
     
]
const router=createRouter({
    history:createWebHashHistory(),
    routes
})
export default router