<template>
    <div class="photos-aev">
            <!-- 顶部滑动条区域 -->
        <div id="maincate" class="maincate" >
            
                <a to=""  v-for="item in ptomsg" :key="item.id" 
                :class=" ['photol',item.id == 0 ? 'active' : '']" 
                @click = 'getpotostenf(item.id)'>
                    {{item.title}}
                </a>
        </div>
        <!-- 图文列表 -->
        <!-- 图片列表区域 -->
        <ul class="photo-list">
            <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/' + item.id" tag="li">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1 class="info-title">{{ item.title }}</h1>
                    <div class="info-body">{{ item.zhaiyao }}</div>
                </div>
            </router-link>
    </ul>

    </div>
</template>
<script>
// var a = document.querySelector('#maincate a')
// a.onclick = function(){
//     a.removeAttribute('active')
//     this.setAttribute('active')
// }
 export default {
    data(){
        return {
            ptomsg:[],
            list:[]
        }
    },
    methods:{
        getphotoslist(){
            this.$http.get('http://www.lovegf.cn:8899/api/getimgcategory').then(result =>{
                //console.log(result.body)
                result.body.message.unshift({title:'全部',id:0})
                this.ptomsg = result.body.message
            })
        },
         getpotostenf(tid){//图片列表页
        this.$http.get('http://www.lovegf.cn:8899/api/getimages/'+tid).then(result => {
              //console.log(result.body)
              this.list = result.body.message
        })
        },
    },
   
    created(){
        this.getphotoslist() //顶部滑动栏
         this.getpotostenf(0)
    }
}
</script>
<style lang="less" scoped>
.photos-aev{
    .maincate {
            width: 100%;
            height: 40px;
            line-height: 40px;
            white-space: nowrap;
            box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
            overflow-x: scroll;
            overflow-y: hidden;
            // -webkit-backface-visibility: hidden;
            // -webkit-perspective: 1000;
            // -webkit-overflow-scrolling: touch;
            text-align: justify;
            padding: 0px 5px;
            box-sizing: border-box;
                .photol{
                    font-size: 15px;
                 color: inherit;
                 text-decoration: none;
                padding: 0 20px;
                }
            a:active, a:hover{
                    
                    color: #007aff;
                }
        }
        .maincate::-webkit-scrollbar {
            display: none;
        }
        .maincate .active{
            color: #007aff;
        }
    .photo-list{
        list-style: none;
        padding: 0 8px;
        li{
           background-color: #ccc;
           text-align: center;
            margin-bottom: 10px;
            box-shadow: 0 0 9px #999;
            position: relative;

        img{
            width: 100%;
             vertical-align: middle; //取消图片之间间隙
        }
        img[lazy="loading"] { //实现图片的懒加载
         width: 40px;
        height: 300px;
         margin: auto;
        }

        .info {
            color: white;
            text-align: left;
            position: absolute;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.4);
            max-height: 84px; //设置段落的最大高度
         .info-title {
        font-size: 14px;
      }
      .info-body {
        font-size: 13px;
      }
    }
    }
  }
}
</style>

