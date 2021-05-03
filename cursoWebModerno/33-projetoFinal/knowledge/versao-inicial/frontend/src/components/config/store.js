import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    // criando um estado para um componente compartilhado
    state: {
        isMenuVisible: true,
        user: {
            name: 'Usuario mock',
            email: 'mock@coder.com.br'
        }
    },
    mutations: {
        //função para mudar o menu para visivel/ invisivel
        toggleMenu(state, isVisible) {
            if(isVisible === undefined) {
                state.isMenuVisible = !state.isMenuVisible
            } else {
                state.isMenuVisible = isVisible
            }
        }
    }
})