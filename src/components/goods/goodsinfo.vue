<template>
<div class="goodsinfo-conet">
        <!-- 购物车小球 -->
        <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div class="ball" ref="ball" v-show="ballflg"></div>
        </transition>
        
        <!-- 轮播图区域 -->
    <div class="ginfo-lbt">
            <mt-swipe :auto="4000" class="ginfo-tpl">
                <mt-swipe-item class="we" v-for="item in lunboList" :key='item.src'>
                    <a href="">
                        <img :src="item.src" alt="">
                    </a>
                </mt-swipe-item>
                <!-- <mt-swipe-item class="we">
                    <a href="">
                        <img src="http://www.lovegf.cn:8899/2.jpg" alt="">
                    </a>
                </mt-swipe-item> -->
            </mt-swipe>
    </div>
        <!-- 商品名称区域 -->
    <div >
        <div class="gdinfo-mcq">
            <h3>商品名称:</h3>
            <hr>
            <div class="ginfo-ben">
            <p>
                <span>市场价:<del>￥{{list.market_price}}</del></span>
                <span class="xisj">销售价:<b>￥{{list.sell_price}}</b></span>
            </p>
            <div class="gmsl">购买数量:
                <!-- mui的数量加减框 -->
                 <!-- <div class="mui-numbox" data-numbox-min='1'>
                <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
                <input id="test" class="mui-input-numbox" type="number" value="1"  ref="numbox" />
                <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
                </div>  -->
               
               <input type="button" value="- " @click = "coente>1 && coente--">
               <input type="text" v-model="coente" >
               <input type="button" value="+"  @click = "coente<list.stock_quantity && coente++">
            </div>
            <mt-button type="primary" class="btnum"  >立即购买</mt-button>
            <mt-button type="danger" class="btnum" @click="addshopcar">加入购物车</mt-button>
            </div>
        </div>
        <!-- 商品详情区域 -->
        <div class="gdinfo-mcq hrt">
            <h3>商品详情</h3>
            <h3>{{$store.state.coente}}</h3>   <!--测试全局数据使用 -->
            <hr>
            <div class="ginfo-ben">
            <p> 商品货号：{{list.goods_no}}</p>
            <p> 库存情况：{{list.stock_quantity}}件</p>
            <p> 上架时间：{{list.add_time | dataForm}}</p>
            <div class="btu-unf">
                <mt-button type="primary" size="large" plain class="btu-twj" @click="goodtwjs(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain  @click="getcomnt(id)">商品评论</mt-button>
            </div>
            </div>
        </div>
    </div>

</div>
</template>
<script>
 //import mui from "../../lib/mui/js/mui.js"
//  mui(".mui-numbox").numbox();
export default {
//     mounted() {
//     // 初始化数字选择框组件
//         mui(".mui-numbox").numbox();
//   },
        data(){
            return{
               id:this.$route.params.id,
               lunboList:[],
                list:{},
                coente:1,
                ballflg : false
            }
        },
        
        methods:{
             getlunbo(){
                this.$http.get('http://www.lovegf.cn:8899/api/getthumimages/'+this.id).then(result =>{
                if(result.body.status==0){
                    //console.log(result.body)
                this.lunboList = result.body.message; 
                }
              })
            },
           getgoodsinfo(){
               this.$http.get('http://www.lovegf.cn:8899/api/goods/getinfo/'+this.id).then(result => {
                   //console.log(result.body)
                   if(result.body.status==0){
                    this.list = result.body.message[0]; 
                }
               })
           },
                //进入图文页面
           goodtwjs(id){
               this.$router.push({name:'/home/goodsDesc',params:{id}});
           },
           //获取评论
           getcomnt(id){
               //使用编程式导航
                this.$router.push('/home/getcomnt/'+id)
           },
           //添加到购物车
          addshopcar(){
               //console.log(1223)
               this.ballflg = !this.ballflg
               //将商品信息添加到购物车
               //{id:"商品id", coente:'要购买的数量',price:'商品单价,selected: false 是否添加到结算}
               let goodinfo ={
                   id:this.id,
                   coente:this.coente,
                   price:this.list.sell_price,
                   stock_quantity:this.list.stock_quantity,
                   selected:true,
                   
               }
               //将购物车的商品信息都通过mutations传递给vuex储存全局数据
               this.$store.commit("addtocar",goodinfo)
            //   let coente = this.coente
            //    this.$store.commit('addtocar',coente)
                 
           },
           //小球动画的钩子函数
           beforeEnter(el){
                // 5. 如何 获取 徽标和小球的 位置？？？   
                //domObject.getBoundingClientRect()
                //小球初始页面的偏移距离
                el.style.transform = "translate(0,0)"
           },
           enter(el,done){
               el.offsetHeight;
               //小球动画的思路:1,先动态获取小球的坐标 2,再动态获取购物车坐标,3然后小球的坐标减去购物车的坐标
                //获取小球在页面的位置
                //$refs.ball vue中操作DOM的方法相当于js中元素选择器 document.getelmentbyid()
                const ballPosition = this.$refs.ball.getBoundingClientRect()
                //获取购物车位置
                const ballspcarposition = document.getElementById('sdfr').getBoundingClientRect()
                //获取两者之间的差
                const Xdist = ballspcarposition.left - ballPosition.left
                const Ydist = ballspcarposition.top - ballPosition.top
                el.style.transform = `translate(${Xdist}px,${Ydist}px)`
                el.style.transition  = "all 0.5s cubic-bezier(.4,-0.3,1,.68)"
                done();
           },
           afterEnter(el){
               this.ballflg = !this.ballflg
           },

        },
        created(){
            this.getgoodsinfo()
            this.getlunbo()
        },
       
}
</script>
<style lang="less" scoped>
    .goodsinfo-conet{
        background-color: #eee;
        overflow: hidden;
        .ball{
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: red;
            position: absolute;
            top: 390px;
            left: 146px;
            z-index: 999;

        }
        .ginfo-lbt{
            height: 230px;
            width: auto;
            padding: 15px 40px;
            border: 1px #ddd solid;
            box-shadow: 0 0 5px #eee ;
            margin: 10px 10px;
            background-color: #fff;
            border-radius: 3px;
          .ginfo-tpl{
              img{
                  width: 100%;
                  height: 200px;
              }
          }
        }
        .gdinfo-mcq{
            height: 190px;
            margin: 0 10px 10px 10px;   
             border: 1px #ddd solid;
             background-color: #fff;
             border-radius: 3px;
            h3{
                padding: 0 10px;
                font-size: 18px;
                height: 30px;
                line-height: 30px;
                font-weight: 400;
            }
            .ginfo-ben{
                margin: 0 10px;
                .xisj{
                    margin-left: 10px;
                    b{
                    color: red;
                    
                    }  
                }
                .gmsl{
                    color: #8f8f94;
                    margin-bottom: 5px;
                    input[type="text"] {
                        width: 65px;
                        height: 33px;
                        text-align: center;
                    }
                    input[type="button"] {
                     width: 40px;
                     height: 100%;
                    }
                }
                .btnum{
                    height: 30px;
                    font-size: 14px;
                   
                }
            }
        }
        .hrt{
            height: 340px;
            .btu-unf{
                margin-top: 20px;
                .btu-twj{
                    margin-bottom: 10px;
                }
            }
        }
    }
</style>
