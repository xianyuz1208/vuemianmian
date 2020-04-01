//全局过滤器
import Vue from "vue"
import moment from 'moment'
//时间处理器
Vue.filter("formTime",value=>{
    return moment(value).format('YYYY-MM-DD')
})