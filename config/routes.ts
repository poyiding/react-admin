export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '/pool',
    name: '放款池',
    icon: 'crown',
    routes: [
      {
        path: '/pool/product',
        name: '产品管理',
        component: './Pool/ProductManage',
      },
      {
        path: '/pool/product/:prodId',
        name: '产品详情',
        component: './Pool/ProductManage/Detail',
        hideInMenu: true,
      },
      {
        path: 'assetManage',
        name: '资产管理',
        routes: [
          {
            path: '/pool/assetManage',
            component: './Pool/AssetManage',
          },
          {
            path: '/pool/assetManage/:planId',
            component: './Pool/AssetManage/TabPages',
            hideInMenu: true,
            routes: [
              {
                path: '/pool/assetManage/:planId/capitalFlow',
                name: '资金流水',
                component: './Pool/AssetManage/TabPages/CapitalFlow',
              },
              {
                path: '/pool/assetManage/:planId/astList',
                name: '资产列表',
                component: './Pool/AssetManage/TabPages/AstList',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: '系统管理',
    path: '/system',
    icon: 'setting',
    access: 'system',
    routes: [
      {
        path: '/system/dept',
        name: '部门管理',
        component: './System/DeptManage',
      },
      {
        path: '/system/user',
        name: '用户管理',
        component: './System/UserManage',
      },
      {
        path: '/system/role',
        name: '角色管理',
        component: './System/RoleManage',
      },
      {
        path: '/system/dict',
        name: '字典管理',
        component: './System/DictManage',
      },
    ],
  },

  // {
  //   name: 'list.table-list',
  //   icon: 'table',
  //   path: '/list',
  //   component: './TableList',
  // },

  {
    component: './404',
  },
];
