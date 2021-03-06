import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: () => import('@/views/login.vue')
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () => import('@/views/error-page/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () => import('@//views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () => import('@/views/error-page/500.vue')
};

export const preview = {
    path: '/preview',
    name: 'preview',
    component: () => import('@/views/form/article-publish/preview.vue')
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('@/views/main-components/lockscreen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        { path: 'home', title: {i18n: 'home'}, name: 'home_index', component: () => import('@/views/home/home.vue') },
        { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: () => import('@/views/own-space/own-space.vue') },
        { path: 'order/:order_id', title: '订单详情', name: 'order-info', component: () => import('@/views/advanced-router/component/order-info.vue') }, // 用于展示动态路由
        { path: 'shopping', title: '购物详情', name: 'shopping', component: () => import('@/views/advanced-router/component/shopping-info.vue') }, // 用于展示带参路由
        { path: 'message', title: '消息中心', name: 'message_index', component: () => import('@/views/message/message.vue') },
        { path: 'maintenancedocmng',title:'维护单明细',name: 'docdetail',component: ()=>import('@/views/maintenancedocmng/maintenancedoc/maintenancedoc.vue')},
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/maintenancedoc',
        icon: 'document-text',
        name: 'documentmng',
        title: '维护',
        component:Main,
        children:[
            {path:'index',title:'维护单',name:'documentmng_index',component: ()=> import('@/views/maintenancedocmng/maintenancedocmng.vue')},
            {path:"inspectionPlanMng",title:"巡检方案",name:"inspectionPlanMng_index",component:()=>import("@/views/maintenancedocmng/inspectionPlanMng/inspectionPlanMng.vue")},
            {path:"inspectionparameters",title:"巡检项目",name:"inspectionparameters_index",component:()=>import("@/views/maintenancedocmng/inspectparameters/inspectionparameters.vue")}]
    },
    {
        path:'/reportMNG',
        icon: "document",
        name: 'reportMNG',
        title: "报障单",
        component:Main,
        children:[
            {path:'index',title:'报障单',name:'reportMNG_index',component:()=> import('@/views/reportMNG/reportMNG.vue')},
            {path:'/reportcategoryMng',title:'故障分类',name:"reportcategoryMng",component:()=>import('@/views/reportMNG/reportcategoryMng/reportcategoryMng.vue')}]
    },
    {
        path:'/orgmng',
        icon: "network",
        name: 'departmentInfMng',
        title: "机构信息",
        component:Main,
        children:[
            {path:'/departmentInfMng',title:'气象局信息',name:'departmentInfMng_index',component:()=> import('@/views/orgmng/departmentInfMng/departmentInfMng.vue')},
            {path:'/stationMng',title:'台站信息',name:'stationInfMng_index',component:()=> import('@/views/orgmng/stationMng/stationMng.vue')},
            {path:"/maintenanceOrgMng",title:'维护公司信息',name:'maintenanceOrgMng_index',component:()=>import('@/views/orgmng/maintenanceOrgMng/maintenanceOrgMng.vue')}
            ]
    },
    {
        path:"/staffmng",
        icon: 'person',
        name: "staffMng",
        title: "维护人员",
        component:Main,
        children:[
            {path:'staffInfMng',title:"人员信息",name:'staffInfMng',component:()=> import('@/views/staffmng/staffInfMng/staffInfMng.vue')},
            {path:'staffSalaryMng',title:"人员工资",name:'staffSalaryMng',component:()=> import('@/views/staffmng/staffSalaryMng/staffSalaryMng')},
            {path:'bonusMng',title:"奖惩",name:"bonusMng",component:()=>import('@/views/staffmng/bonusMng/bonusMng.vue')},
            {path:'bonusRuleMng',title:"工资奖励规则",name:"bonusRuleMng",component:()=>import('@/views/staffmng/bonusRuleMng/bonusRuleMng.vue')},
            {path:"paymentMng",title:"付款管理",name:"paymentMng",component:()=>import('@/views/staffmng/paymentMng/paymentMng.vue')},
            {path:"maintenanceTeamMng",title:"维护团队",name:"maintenanceTeamMng",component:()=>import('@/views/staffmng/maintenanceTeamMng/maintenanceTeamMng.vue')}
        ]
    },
    {
        path:"/wxMessageMng",
        icon: "android-textsms",
        name: "wxMessageMng",
        title: "微信信息",
        component:Main,
        children:[{path:'index',title:'微信信息',name:"wxMessageMng_index",component:()=> import('@/views/wxMessageMng/wxMessageMng.vue')}]
    },
    {
        path:"/systemMng",
        icon:"gear-b",
        name:"systemMng",
        title:"系统信息",
        component:Main,
        children:[
            {path:'/systemParameterMng',title:"系统参数",name:"systemParameterMng",component:()=> import('@/views/systemMng/systemParameterMng/systemParameterMng.vue')},
            {path:'/systemOperatorMng',title:"系统操作员",name:"systemOperatorMng",component:()=> import('@/views/systemMng/systemOperatorMng/systemOperatorMng.vue')},
            {path:'/systemLogQuery',title:"系统操作日志查询",name:"systemLogQuery",component:()=> import('@/views/systemMng/systemLogQuery/systemLogQuery.vue')},
            {path:'/systemBroadcastMng',title:"系统公告",name:"systemBroadcastMng",component:()=>import('@/views/systemMng/systemBroadcastMng/systemBroadcastMng.vue')},
            {path:'/serviceProgressBroadcastSetting',title:"服务进度通知设置",name:"serviceProgressBroadcastSetting",component:()=>import('@/views/systemMng/serviceProgressBroadcastSetting/serviceProgressBroadcastSetting.vue')},
            {path:'/maintenanceParametersMng',title:"维修参数",name:"maintenanceParametersMng",component:()=>import('@/views/systemMng/maintenanceParametersMng/maintenanceParametersMng.vue')}]
    }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    preview,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];
