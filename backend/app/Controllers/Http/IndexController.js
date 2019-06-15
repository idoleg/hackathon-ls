'use strict'

/** @type {typeof import('@adonisjs/validator')} */
const { validate } = use('Validator')
const Database = use('Database');
class IndexController {
    async index({ request }) {
        // const validation = await validate(request.all(), 'Index')
        // if (validation.fails()) {
        //     return validation.messages()
        // }

        return { "greeting": "Hello, world!" }
    }

    async regions({ request }) {
        let data = await Database.table('tb_oper').select('tc_region AS region');
        data = data.map((item, index) => {
            return { 
                ...item,
                index
            };
        })
        return data;
    }
}

module.exports = IndexController
