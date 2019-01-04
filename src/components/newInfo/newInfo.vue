<template>
    <div class="newInfo-comnse" >
        <h4 class="tatles">{{newsinfo.title}}</h4>
        <div class="time-rudi">
          <span>发表时间:{{newsinfo.add_time |dataForm}}</span>
          <span>阅读:{{newsinfo.click}}</span>
        </div>
        <hr />

        <!-- 内容区域 -->
        <div  class="content" v-html="newsinfo.content"></div>
        <!-- 发表模块 -->
            <!-- 绑定的id是父组件向子组件传值,用于根据id获取那个文章,获取评论列表 -->
        <common-box :id ="this.id"></common-box>

    </div>
</template>

<script>
// 1. 导入 公共评论模板 注册子组件
 import commen from '../../common/comment.vue'
export default {
    data(){
        return{
             id: this.$route.params.id, //将 URL 地址中传递过来的 Id值，挂载到 data上，方便以后调用
            newsinfo:[] //定义一个空数组接收新闻详情数据
        }
    },
    methods:{
        getnewinfo(){
            this.$http.get('http://www.lovegf.cn:8899/api/getnew/'+this.id).then(result => {
                //console.log(result.body)
                if(result.body.status === 0) {
                    this.newsinfo = result.body.message[0];
                }else {
                    Toast("获取新闻失败！");
                }
            })
        }
        
    },
    created(){
        this.getnewinfo()
    },
    components:{
        // 用来注册子组件的节点
        "common-box":commen
    }
}
</script>
<style lang="less" scoped>
    .newInfo-comnse{
        padding: 5px;
        .tatles{
            font-size: 16px;
            text-align: center;
            margin: 15px 0;
            color: red
        }
        .time-rudi{
            font-size: 13px;
            color: #226aff;
            display: flex;
            justify-content: space-between;
        }
        .content {
    img {
      width: 100%;
    }
  }
        
    }
</style>
