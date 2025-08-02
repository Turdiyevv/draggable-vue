const routes = [
  {
    path: '/',
    redirect: '/auth' // 🔁 Asosiy redirect
  },
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/tasks',
        component: () => import('pages/Cabinet/tasks/IndexPage.vue')
      },
      {
        path: '/info',
        component: () => import('pages/Cabinet/myInfo/myInfo.vue')
      }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
