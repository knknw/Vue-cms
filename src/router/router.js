
import Vue from 'vue'
import VueRouter from 'vue-router'
// 1.2 安装路由
Vue.use(VueRouter)
 //导入各个页面
 import homecone from '../components/taber/homecone.vue'
 import membercone from '../components/taber/membercone.vue'
 import searchcone from '../components/taber/searchcone.vue'
 import shopcarcone from '../components/taber/shopcarcone.vue'
 import newListcone from  '../components/newlist/newList.vue'
 import newInfocone from  '../components/newInfo/newInfo.vue'
 //创建路由对象

 var router =new VueRouter({
     routes:[
        {path:'/',redirect: '/home'},
        {path:'/home',component: homecone},
        {path:'/member',component: membercone},
        {path:'/shopcar',component: shopcarcone},
        {path:'/search',component: searchcone},
        {path:'/home/newList',component:newListcone},
        {path:'/home/newInfo/:id',component:newInfocone}
     ],
     //用于替换路由的高亮显示
     linkActiveClass:'mui-active'

 })


 // 把路由对象暴露出去
 export default router