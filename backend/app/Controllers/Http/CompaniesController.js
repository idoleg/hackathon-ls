'use strict'
const querystring = require('querystring');
const axios = use('axios');
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

    async calculateGeo ({ request, params }) {
        const token = use('Config').get('app.ymapToken')
        const oper = await Database.table('tb_oper').where('tc_ogrn', '=', params.id);
        const region = oper[0].tc_region; 
        let data = await Database.table('tb_oper_obejct').select('*').where('tc_ogrn', '=', params.id).limit(20);
        return data;
        return await this.getCoord(region+', Большая Санкт-Петербургская ул, 76', token  );
    }

    async getCoord(place, token) {
        //https://tech.yandex.ru/maps/geocoder/doc/desc/concepts/input_params-docpage/
        let text = querystring.escape(place);   
        //return token;
        const url = 'https://geocode-maps.yandex.ru/1.x/?format=json&results=1&apikey='+token+'&geocode='+text
        //return url;
        const res = await axios.get(url)
        return res.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos;
    }
}

module.exports = CompaniesController
