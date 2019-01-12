import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

//创建vuex
export  default  new Vuex.Store({
    state:{
        coente:0,
    },
    mutations:{
       addtocar(state,coente){
            state.coente += coente
        }
    },
    getters:{

    }
})