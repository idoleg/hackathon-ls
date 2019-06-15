'use strict'

const Database = use('Database');
class CompaniesController {
    async index({ request }) {
        // const validation = awainpm i mysqlt validate(request.all(), 'Index')
        // if (validation.fails()) {
        //     return validation.messages()
        // }
        let data = await Database.table('tb_oper').select('*');
        //console.log(data);
        return data;
    }

    async containers({ request, params }) {
        // const validation = awainpm i mysqlt validate(request.all(), 'Index')
        // if (validation.fails()) {
        //     return validation.messages()
        // }
        let data = await Database.table('tb_oper_obejct').select('*').where('tc_ogrn', '=', params.id).limit(20);
        //console.log(data);
        return data;
    }
}

module.exports = CompaniesController
