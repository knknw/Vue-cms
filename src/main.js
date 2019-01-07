//这是入口文件,
  //导入vue框架
import Vue from 'vue'

// 2.1 导入 vue-resource
import VueResource from 'vue-resource'
// 2.2 安装 vue-resource
Vue.use(VueResource)



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

//导入自己的 router.js 路由模块
import router from './router/router.js'


//导入moment包
import moment from 'moment'
//定义全局过滤器
  Vue.filter('dataForm',(content,patern = 'YYYY-MM-DD HH:mm:ss') => {
    return moment(content).format(patern)
  })
//注册全局组件,定义公共模板
  //导入公共模板
  import common from './common/comment.vue'
  Vue.component("common",common)

  //引人缩略图组件
  import VuePreview from 'vue-preview'
  Vue.use(VuePreview)


var vm = new Vue({
    el:'#app',
    render:c => c(app),//将路由对应得模板渲染到页面中
    router : router//挂载路由到vm实例上
})

