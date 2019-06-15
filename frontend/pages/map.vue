<template>
    <el-container>
        <Map></Map>
    </el-container>
</template>

<script>
import Map from '../components/Map';
export default {
    components: {
        Map
    },
    head() {
        return {
            title: 'Карта ТБО',
            meta: [
                {
                    hid: 'desc',
                    name: 'desc',
                    content: 'Здесь вы сможете найти всё'
                }
            ]
        }
    }
}
</script>

<style>

</style>
