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
        const region = request.get().region;
        if(region){
            let data = await Database.table('tb_oper').where('tc_region', '=', region).select('*');
            //console.log(data);
            return data;
        }else{
            let data = await Database.table('tb_oper').select('*');
            //console.log(data);
            return data;
        }
    }

    async containers({ request, params }) {
        
        let data = await Database.table('tb_oper_obejct').select('*').where('tc_ogrn', '=', params.id).limit(874);
        return data;
    }

    async poligons({ request, params }) {
        let data = await Database.table('tb_poligon').select('*').where('tc_ogrn', '=', params.id).limit(100);
        return data;
    }

    async processing({ request, params }) {
        
        let data = await Database.table('tb_obj_pererab').select('*').where('tc_ogrn', '=', params.id).limit(100);
        return data;
    }

    async nezakon({ request, params }) {
        
        let data = await Database.table('tb_nezakon').select('*').where('tc_ogrn', '=', params.id).limit(100);
        return data;
    }

    async calculateGeoForContainers ({ request, params }) {
        const token = use('Config').get('app.ymapToken')
        const oper = await Database.table('tb_oper').where('tc_ogrn', '=', params.id);
        const region = oper[0].tc_region; 
        //3707

        const queryCount= await Database.from('tb_oper_obejct').where('tc_ogrn', '=', params.id).count() //.whereNull('tc_coord')
        const count = queryCount[0]['count(*)']
        //return count;
        for(let i = 1; i <=count; i++){
            let data = await Database.table('tb_oper_obejct').select('*').where('tc_ogrn', '=', params.id).forPage(i,1);
            data = data[0];
            const cord = await this.getCoord(region+',' + data.tc_adress, token  );
            const res = await Database.table('tb_oper_obejct').whereRaw('tc_ogrn = ? AND tc_num = ?', [params.id, data.tc_num]).update('tc_coord', cord)
            console.log(i);
        }
    }

    async calculateGeoForProcessing ({ request, params }) {
        const token = use('Config').get('app.ymapToken')
        const oper = await Database.table('tb_oper').where('tc_ogrn', '=', params.id);
        const region = oper[0].tc_region; 
        //3707

        const queryCount= await Database.from('tb_obj_pererab').where('tc_ogrn', '=', params.id).count() //.whereNull('tc_coord')
        const count = queryCount[0]['count(*)']
        //return count;
        for(let i = 1; i <=count; i++){
            let data = await Database.table('tb_obj_pererab').select('*').where('tc_ogrn', '=', params.id).forPage(i,1);
            data = data[0];
            const cord = await this.getCoord(data.tc_adress, token  );
            const res = await Database.table('tb_obj_pererab').whereRaw('tc_ogrn = ? AND tc_inn = ?', [params.id, data.tc_inn]).update('tc_coord', cord)
            console.log(i);
        }
    }

    async calculateGeoForPoligons({ request, params }) {
        const token = use('Config').get('app.ymapToken')
        const oper = await Database.table('tb_oper').where('tc_ogrn', '=', params.id);
        const region = oper[0].tc_region; 
        //3707

        const queryCount= await Database.from('tb_poligon').where('tc_ogrn', '=', params.id).count() //.whereNull('tc_coord')
        const count = queryCount[0]['count(*)']
        //return count;
        for(let i = 1; i <=count; i++){
            let data = await Database.table('tb_poligon').select('*').where('tc_ogrn', '=', params.id).forPage(i,1);
            data = data[0];
            const cord = await this.getCoord(region+',' + data.tc_adress, token  );
            const res = await Database.table('tb_poligon').whereRaw('tc_ogrn = ? AND tc_id = ?', [params.id, data.tc_id]).update('tc_coord', cord)
            console.log(i);
        }
    }

    async calculateGeoForNezakon({ request, params }) {
        const token = use('Config').get('app.ymapToken')
        const oper = await Database.table('tb_oper').where('tc_ogrn', '=', params.id);
        const region = oper[0].tc_region; 
        //3707

        const queryCount= await Database.from('tb_nezakon').where('tc_ogrn', '=', params.id).count() //.whereNull('tc_coord')
        const count = queryCount[0]['count(*)']
        //return count;
        for(let i = 1; i <=count; i++){
            let data = await Database.table('tb_nezakon').select('*').where('tc_ogrn', '=', params.id).forPage(i,1);
            data = data[0];
            const cord = await this.getCoord(data.tc_area, token  );
            const res = await Database.table('tb_nezakon').whereRaw('tc_ogrn = ? AND tc_num = ?', [params.id, data.tc_num]).update('tc_coord', cord)
            console.log(i);
        }
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
