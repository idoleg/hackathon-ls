'use strict'

/** @type {typeof import('@adonisjs/validator')} */
const { validate } = use('Validator')

class IndexController {
    async index({ request }) {
        // const validation = await validate(request.all(), 'Index')
        // if (validation.fails()) {
        //     return validation.messages()
        // }

        return { "greeting": "Hello, world!" }
    }
}

module.exports = IndexController
