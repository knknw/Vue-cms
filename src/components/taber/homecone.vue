<template>
    <div class="home-container">
        
        <!-- 轮播图区域 -->
    <mt-swipe :speed="300" :auto="3000"  >
      <mt-swipe-item  v-for = "(item, index) in lunboList" :key="index">
        <a :href="item.url">
            <img :src="item.img" alt="">
        </a>
      </mt-swipe-item>
    </mt-swipe>

        <!-- 九宫格 -->
       <ul class="mui-table-view mui-grid-view mui-grid-9">
		      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
              <router-link to="/home/newList">
		              <img src="../../images/menu1.png" alt="">
		              <div class="mui-media-body">新闻资讯</div>
              </router-link>
            </li>
		      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <a href="#">
		              <img src="../../images/menu2.png" alt="">
		              <div class="mui-media-body">图片分享</div>
            </a>
          </li>
		      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		              <img src="../../images/menu3.png" alt="">
		              <div class="mui-media-body">商品购买</div></a></li>
		      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		              <img src="../../images/menu4.png" alt="">
		              <div class="mui-media-body">留言反馈</div></a></li>
		      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		              <img src="../../images/menu5.png" alt="">
		              <div class="mui-media-body">视频专区</div></a></li>
		      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		         <img src="../../images/menu6.png" alt="">
		            <div class="mui-media-body">联系我们</div></a></li>
		  </ul> 


  
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
    data(){
      return {
        lunboList: [] //设置一个空数组用于接收数据
      }
    },
    created(){
      this.getlunbo()
     
    },
    methods:{
      getlunbo(){
        this.$http.get('http://www.lovegf.cn:8899/api/getlunbo').then(result =>{
          //console.log(result.body)
          if(result.body.status==0){
            this.lunboList = result.body.message; 
               //console.log(this.lunboList)
          }else{
              Toast('加载图片失败...')
          }
        })      
      }
    }
}
</script>

<style lang="less">
.home-container {
  //轮播图样式
  .mint-swipe {
    height: 200px;
    .mint-swipe-item {
      //background-color: pink;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  //九宫格样式
  .mui-grid-view.mui-grid-9{
    background-color: #fff;
    border: none;
    .mui-table-view-cell{
      border: none;
      img{
        width: 60px;
        height: 60px;
      }
    }
  }
}
</style>