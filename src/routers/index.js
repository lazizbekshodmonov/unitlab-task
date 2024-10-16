import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '@/pages/_404.vue'

import AppView from '@/pages/AppView.vue'
import AppMoviesView from '@/pages/movies/AppMoviesView.vue'
import MovieListView from '@/pages/movies/MovieListView.vue'
import MovieDetailsView from '@/pages/movies/MovieDetailsView.vue'
import FavoritesListView from '@/pages/favorites/FavoritesListView.vue'
import AppFavoritesView from '@/pages/favorites/AppFavoritesView.vue'
import MovieFormView from '@/pages/movies/MovieFormView.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'AppView',
      component: AppView,
      redirect: '/',
      children: [
        {
          path: 'movies',
          name: 'AppMoviesView',
          component: AppMoviesView,
          redirect: { name: 'MovieListView' },
          children: [
            {
              path: '',
              name: 'MovieListView',
              component: MovieListView
            },
            {
              path: 'details/:id',
              name: 'MovieDetailsView',
              component: MovieDetailsView
            },
            {
              path: 'create',
              name: 'MovieCreateFormView',
              component: MovieFormView
            },
            {
              path: 'edit/:id',
              name: 'MovieEditFormView',
              component: MovieFormView
            }
          ]
        },
        {
          path: 'favorites',
          name: 'AppFavoritesView',
          component: AppFavoritesView,
          redirect: { name: 'FavoritesListView' },
          children: [
            {
              path: '',
              name: 'FavoritesListView',
              component: FavoritesListView
            }
          ]
        }
      ]
    },

    {
      path: '/:pathMatch(.*)*',
      component: NotFound,
      name: 'PageNotFond'
    }
  ]
})

const routerFactory = (i18n) => {
  router.beforeEach((to, from, next) => {
    document.title = i18n.t(`menu.${to.name}`)
    // const accessToken = localStorage.getItem('access_token')
    // if (accessToken) {
    //     if (to.path.includes('dashboard')) {
    //         return next()
    //     } else {
    //         return next({name: 'DashboardView'})
    //     }
    // } else {
    //     if (!to.path.includes('dashboard')) {
    //         return next()
    //     } else {
    //         return next({name: 'AuthView'})
    //     }
    // }
    next()
  })
  return router
}

export default routerFactory
