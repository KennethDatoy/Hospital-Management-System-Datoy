// import Vue from 'vue'
import Vuex from 'vuex'
// import authModule from './modules/auth'
import userModule from './modules/user'
import patientModule from './modules/Patient'
// Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        patient: patientModule,
        user: userModule,
    },
})