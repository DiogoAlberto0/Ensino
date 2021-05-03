<template>
    <div class="home">
        <PageTitle icon="fa fa-home" main="Diogo Alberto" sub="O mais lindo de todos" />
        <div class="stats">    
            <Stat title="Categorias" :value="stat.category[0].count" icon="fa fa-folder" color="#d54d50" />
            <Stat title="Artigos" :value="stat.articles[0].count" icon="fa fa-file" color="#3bc480" />
            <Stat title="Usuários" :value="stat.users[0].count" icon="fa fa-user" color="#3282cd" />

        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import Stat from './Stat'
import { baseApiUrl } from '../../global'

import axios from 'axios'
export default {
    name: 'Home',
    components: {
        PageTitle,
        Stat
    },
    data: function() {
        return {
            stat: {
                category: {},
                articles: {},
                users: {}
            }
        }
    },
    methods: {
        getStat() {
            axios.get(`${baseApiUrl}/categories/count`)
                .then(res => this.stat.category = (res.data))
            axios.get(`${baseApiUrl}/articles/count`)
                .then(res => this.stat.articles = (res.data))
            axios.get(`${baseApiUrl}/users/count`)
                .then(res => this.stat.users = (res.data))
        }
    },
    mounted() {
        this.getStat()
    }
}
</script>

<style>
    .stats {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
</style>