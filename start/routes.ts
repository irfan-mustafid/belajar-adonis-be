/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const PostsController = () => import('#controllers/posts_controller')
const UsersController = () => import('#controllers/users_controller')
const DashboardController = () => import('#controllers/dashboard_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.get('/users', [UsersController, 'index'])
router.get('/users/:id', [UsersController, 'show'])
router.get('/posts/:id', [PostsController, 'show'])

router.group(() => {
  router.get('/summary', [DashboardController, 'summary'])
  router.get('/proses', [DashboardController, 'proses'])
  router.get('/ditolak', [DashboardController, 'ditolak'])
  router.get('/diterima', [DashboardController, 'diterima'])
}).prefix('/dashboard')
