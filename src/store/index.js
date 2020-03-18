import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state:{
        userIcon:"",
        username:""
    },
    mutations:{
        changeIcon(state,newIcon){
            state.userIcon = newIcon
        },
        changeName(state,newName){
            state.username = newName
        }
    }
})
export default store