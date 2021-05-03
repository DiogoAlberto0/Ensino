import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../home/Home.vue'
import adminPages from '../admin/adminPages.vue'

Vue.use(VueRouter)

const routes = [
    {
        name:'home',
        path:'/',
        component: Home
    },
    {
        name: 'adminPages',
        path: '/admin',
        component: adminPages
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router