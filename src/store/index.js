import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state:{
        userIcon:"",
        username:"",
        role:""
    },
    mutations:{
        changeIcon(state,newIcon){
            state.userIcon = newIcon
        },
        changeName(state,newName){
            state.username = newName
        },
        changeRole(state,newRole){
            state.role = newRole
        }
    }
})
export default store