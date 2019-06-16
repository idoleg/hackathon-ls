'use strict'
const Database = use('Database');
class CompaniesController {
    async index({ request }) {
        let data = await Database.table('tb_obj_pererab').select('*');
        return data;
    }

    async add({ request }) {
        await Database.table('tb_obj_pererab').insert();
        return;
    }
}

module.exports = CompaniesController
