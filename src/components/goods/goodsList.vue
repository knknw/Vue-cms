<template>
    <div class="goods-list">
      <div class="goods-spy" v-for="item in goodlist" :key="item.id"  @click="getinfo(item.id)">
                                                        <!-- item.id 传递每个商品id用于跳转商品详情用 -->
         <img :src="item.img_url" >
         <h3>{{item.title}}</h3>
         <div class="info">
            <p class="xjg">
                ￥{{item.sell_price}}  <del>￥{{item.market_price}}</del>
            </p>
            <p class="kcls">
                <span>热卖中</span>
                <span>剩余{{item.stock_quantity}}件</span>
            </p>
         </div>
         
       </div>
       <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>
<script>
export default {
    data(){
        return {
            
            number:1,
            goodlist:[]
        }
    },
    methods:{
        getgoodslist(){
            this.$http.get('http://www.lovegf.cn:8899/api/getgoods?pageindex='+this.number).then(result => {
                //console.log(result.body)
                if(result.body.status ==0){
                     this.goodlist = this.goodlist.concat(result.body.message);
                }
            })
        },
        getMore(){
            this.number++
            this.getgoodslist()

        },
        getinfo(id){
            this.$router.push('/home/goodsinfo/'+id)
        }
    },
    created(){
            this.getgoodslist()
    }

}
</script>
<style lang="less" scoped>
    .goods-list{
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
        margin-top: 10px;
        // background-color: #eee;
        flex-flow: row wrap;
        .goods-spy{
            border: 1px #ccc solid;
            box-shadow:0 0  8px #ccc ;
            width: 49%;
            min-height: 293px;
            padding: 2px;
            margin-bottom: 10px;
            display: flex;
            flex-direction: column;
    justify-content: space-between;
            img{
                height: 190px;
                width: 100%;
            }
            h3{
               font-size: 14px;
            }
            .info{
                background-color: #eee;
                padding: 5px;
                
                .xjg{
                    font-size: 14px;
                    color: red;
                    font-weight: 700;
                    del{
                        display: inline-block;
                        color: #8f8f94;
                        font-size: 12px;
                        margin-left: 10px;
                        font-weight: 400;
                         text-decoration: line-through;
                    }
                    
                }
                .kcls{
                    display: flex;
                    
                    justify-content:space-between;
                    font-size: 13px;
                }
            }
        }
    }
</style>
