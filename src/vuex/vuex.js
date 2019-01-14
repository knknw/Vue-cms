import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

//创建vuex
export  default  new Vuex.Store({
    //state是相当于储存的全局数据
    state:{
        //判断car中有没有数据有就熊localStorage中取出来 ,没有设置成成空数组
       car:JSON.parse(localStorage.getItem('car') || '[]')
    },
    //是用于数据修改,一般需要通过this.$store.comint()调用这个全局函数,来修改state中数据,只能修改不能暴露数据
    mutations:{
        //将商品信息添加到购物车 中
       addtocar(state,goodsinfo){
            // state.coente += coente
          let isfond =false; //判断stade数据中是否已经储存添加的商品,储存了再数量上加一,没有就把商品信息储存进来
          state.car.some(item =>{
              if(item.id == goodsinfo.id){
                  item.coente += goodsinfo.coente
                  return isfond =true;
              }
          })
          if(!isfond){
              state.car.push(goodsinfo)
          }
          //let conent = state.car
          //console.log(conent)
        //为了实现永久储存就把car的信息都存到localStorage中 
        localStorage.setItem('car', JSON.stringify(state.car))
        },
        //购物车数量变数添加修改 car中的数据
        shopchangqj(state,cahninfo){
            state.car.forEach(item => {
                    if(item.id==cahninfo.id){
                        item.coente = parseInt(cahninfo.conet)
                        return true
                    }
            });
            localStorage.setItem("car",JSON.stringify(state.car))
        },
        //当商品结算按钮变化的时候
        updateGoodsSelected(state,carselstd){
            state.car.forEach(item => {
                if(item.id==carselstd.id){
                    item.selected = carselstd.selected
                    return true
                }
        });
            localStorage.setItem("car",JSON.stringify(state.car))
        }
    },
    //getters是做数据的最后修饰,然后暴露数据,谁需要数据可以通过this.$store.getters.方法名获取数据,注意该对象的方法中必须暴露出数据
    getters:{
        gettoallcoente(state){
            //此方法是获取加入购物车的所有的商品的数量
            let tocoenall =0
            state.car.some(item =>{
                tocoenall += item.coente
            })
            return tocoenall
        },
        // 购物车模块的问题: 由于本地store中存储了商品的 [数量] 信息
        // 但是我们需要通过服务器获取商品的标题 图片等信息
        // 服务器返回的数据是肯定没有 数量 信息的
        // 如何根据服务器返回的数据, 取出本地每一条数据对应的数量信息?
        // 机智的解决方案: 
         // 在getters中定义一个数据(函数), 在内部做一件事情:
         // 将本地存储的car中的每一条商品信息迭代循环, 取出每一个商品的id和coente
        // 将每一条商品的id作为键, coente作为值, 创建一个新的对象, 最终结构为:
        // { 88: 2, 90: 1 }
        // 原结构为:
        // [ { id: 88, coente: 2 }, { id: 90, coente: 1 } ]
        // 创建出新的对象后, 就可以根据ID直接取到对应的coente了!
        // 对象访问属性的两种方式: 
        // obj.name
        // obj['name']
             //使用一种巧妙的方法创建出新函数,如果要获取单个 商品总共加入了购物次几件,就让该商品的id对应加入的件数coente
            // 这样就能根据商品的 id获得该商品加入购物 车的数量了

        //获取加入购物车单个商品的数量
        getdangesp(state){
            let obj = {}
            state.car.forEach(item => {
                obj[item.id] = item.coente
            })
            return obj
        },
        //判断购物车商品结算时是开启还会 关闭
        getselectrcar(state){
            //同理根据商品id获取是开启还是关闭
            let obj = {}
            state.car.forEach(item => {
                obj[item.id] = item.selected
            })
            return obj
            
        },
        //计算已经勾选的商品的总数和总价
        gouxall(state){
            let olt ={
                count: 0, // 已勾选的商品数量
                amount: 0 // 已勾选的商品总价
            }
            state.car.forEach(item =>{
                if(item.selected){
                    olt.count  += item.coente
                    olt.amount += item.coente*item.price
                }
            })
           return olt
        },
    }
})