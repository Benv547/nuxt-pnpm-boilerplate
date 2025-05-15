/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const ExamplesController = () => import('#controllers/examples_controller')
// import { middleware } from '#start/kernel'

// /examples
router.get('examples/:id', [ExamplesController, 'me']) //.middleware(middleware.discordVerifyToken())
