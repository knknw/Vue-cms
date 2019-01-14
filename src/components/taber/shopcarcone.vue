<template>
    <div class="shopcar-sft">
        <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
				<div class="mui-card-content" >
					<div class="mui-card-content-inner" >
                            <!--选择按钮开启关闭按钮-->
						 <mt-switch 
                         v-model="$store.getters.getselectrcar[item.id]"
                          @change="selectedChanged(item.id, $store.getters.getselectrcar[item.id])"
                         ></mt-switch>
                         <img :src="item.thumb_path">
                         <div class="info-right">
                             <h3>{{item.title}}</h3>
                             <span class="xianje">￥{{item.sell_price}}</span>
                             <span class="jiank">
                                  <input type="button" value="- "  @click="scarjian(item.id , i)">
                                  <input type="text"   :value="$store.getters.getdangesp[item.id]" ref="cartet" @changcar="sopcarchangs(item,i)">
                                  <input type="button" value="+" @click="scarjia(item.id , i)">
                             </span>
                             <span class="delscar">删除</span>
                         </div>
					</div>
				</div>
		</div>

    <!-- 结算区域 -->
    <div class="mui-card">
		<div class="mui-card-content">
			<div class="mui-card-content-inner" >
                <div class="jseqy">
                    <div class="left">
                        <h4>总计(不含运费)</h4>
                        <div>
                            已勾选商品 <span class="jxls">{{this.$store.getters.gouxall.count}}</span>,总价<span class="jxls">￥{{this.$store.getters.gouxall.amount}}</span>
                        </div>
                    </div>
                    <div class="right">
                        <mt-button type="danger">去结算</mt-button>
                    </div>
		        </div>
		    </div>
        </div>
	</div>
</div>
</template>
<script>
export default {
    data(){
        return{
            goodslist:[]
         }
    },
    methods:{
        getshopcar(){
            //要获取购物车 商品信息,需要根据加入购物车的每一项商品的id来获取 ,所以要先获取id,而购物车商品id ,
            //单价等都储存在全局数据state中的car中,所以可与直接到car中获取
                let idarr = []
                this.$store.state.car.forEach(item=> {
                       idarr.push(item.id) 
                });
                if(idarr<=0){
                    return;
                }
                this.$http.get("http://www.lovegf.cn:8899/api/goods/getshopcarlist/" +idarr.toString()).then(
                    result =>{
                        //console.log(result.body)
                        if (result.body.status === 0) {
                        this.goodslist = result.body.message;
                }
                    }
                )
        },
        //购物车中减少商品数量
        scarjian(id,i){
            //console.log(12346)
            //因为循环会遍历出很多项,所以根据所以i选出相应加减的input
            let cartet = this.$refs.cartet[i]
            if(cartet.value <= 1 ){
                return;
            }
            cartet.value --
            this.sopcarchangs(id,i)
        },
        //购物车中增加商品数量
        scarjia(id,i){
            //console.log(123)
             let cartet = this.$refs.cartet[i]
             const stock_quantity = this.$store.state.car[i].stock_quantity
              if(cartet.value >= stock_quantity ){
                return;
            }
            cartet.value ++
            this.sopcarchangs(id,i)
        },
        //在购物车中加减让购物车的小标的数量页跟随变动
        sopcarchangs(id,i){
            //当加减框中的数据变化的时候,就把新的数据传递给全局数据satate中的car
             let cartet = this.$refs.cartet[i] //获取是哪个商品数量框变化了
             this.$store.commit("shopchangqj",{id:id,conet:cartet.value})

        },
        //购物车结算按钮开启关闭时讲数据传递给全局数据state 
       selectedChanged(id, selected) {
            // 每当点击开关，把最新的 快关状态，同步到 store 中
        console.log(id, selected);
        this.$store.commit("updateGoodsSelected", { id, selected });
        }
    },
    
    created(){
         this.getshopcar()
    }
}
</script>
<style lang="less" scoped>
    .shopcar-sft{
       
      
         background-color: #eee;
         padding: 10px;
         .mui-card{
             margin: 0;
             margin-bottom: 15px;
            .mui-card-content-inner{
                 display: flex;
                img{
                    height: 60px;
                    width: 60px;
                }
                .info-right{
                    .delscar{
                        color: #007aff;
                    }
                    .xianje{
                        color:red;
                    }
                    h3{
                        font-size: 13px;
                    }
                    input[type="text"] {
                        width: 65px;
                        height: 33px;
                        text-align: center;
                    }
                    input[type="button"] {
                     width: 40px;
                     
                    }
                }
                .jseqy{
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    .left{
                    font-size: 14px;
                    color: #8f8f94;
                   
                    h4{
                        font-size: 14px;
                        margin-top: 0;
                        margin-bottom: 10px;
                    }
                    .jxls{
                        padding: 0 3px;
                        color: red;
                        font-size: 18px;
                        
                    }
                }
                }
                
                 
            }
         }
    }
      
</style>
