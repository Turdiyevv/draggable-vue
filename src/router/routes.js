const routes = [
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        redirect: '/auth'
      },
      {
        path: 'tasks',
        component: () => import('pages/Cabinet/tasks/IndexPage.vue')
      },
      {
        path: 'info',
        component: () => import('pages/Cabinet/myInfo/myInfo.vue')
      }
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes // ❗️BU MUHIM!
