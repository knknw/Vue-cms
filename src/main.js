//这是入口文件,
  //导入vue框架
import Vue from 'vue'
//引入App.vue 组件页面 
import app from './App.vue'
//mint-UI中的组件
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
//导入mui中的样式
import './lib/mui/css/mui.css'
// 导入扩展字体的css
import './lib/mui/css/icons-extra.css'
var vm = new Vue({
    el:'#app',
    render:c => c(app),
 

})

