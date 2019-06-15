'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.resource('/blogs', 'BlogController').apiOnly().formats(['json'])
Route.get('/', 'IndexController.index').validator('Index')
Route.get('/companies', 'CompaniesController.index')
Route.get('/companies/:id/containers', 'CompaniesController.containers')

