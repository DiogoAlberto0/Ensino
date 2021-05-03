import 'font-awesome/css/font-awesome.css'
import './components/config/bootstrap'
import './components/config/msgs'
import Vue from 'vue'

import App from './App.vue'
import store from './components/config/store'
import router from './components/config/router'

Vue.config.productionTip = false

// TEMPORARIO
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkRpb2dvIEFsYmVydG8iLCJlbWFpbCI6ImRhZmdvMDNAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTYxNzM5Mzc4NSwiZXhwIjoxNjE3NjUyOTg1fQ.CFHBhGZRL0uoEFaKIyGb1pKBqQYeHcqUPv_IQTeyuYk'
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')