<template>
    <div class="photoinfo-container">
        <h3>{{tpmsg.title}}</h3>
        <div class="subtitle">
            <span>发表时间:{{tpmsg.add_time | dataForm}}</span>
            <span>点击：{{ tpmsg.click }}次</span>
        </div>
        <hr>
       <!-- 缩略图区域 -->
    <div class="thumbs">
      <img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100" @click="$preview.open(index, list)" :key="item.src">
    </div>
    <!-- 图片内容区域 -->
    <div class="content" v-html="tpmsg.content"></div>
    <!-- 放置一个现成的 评论子组件 -->
         <!-- 绑定ID根据id获取评论呢列表 -->
    <cmt-box :id="id"></cmt-box>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
import comment from "../../common/comment"
export default {
        data(){
            return {
                id:this.$route.params.id ,//获取url地址后面传递的参数,用于获取对应得图片详情时候使用
                tpmsg :{},
                list:[]
            }
        },
        methods:{
            getphotosinfo(){
                this.$http.get('http://www.lovegf.cn:8899/api/getimageInfo/'+this.id).then(result => {
                    if(result.body.status == 0){
                        this.tpmsg = result.body.message[0]
                    } else{
                        Toast('图片详情获取失败!')
                    }
                })
            },
            getThumbs(){
                this.$http.get("http://www.lovegf.cn:8899/api/getthumimages/" + this.id).then(result => {
                    console.log(result.body)
                    if (result.body.status === 0) {
                    // 循环每个图片数据，补全图片的宽和高
                    result.body.message.forEach(item => {
                    item.w = 600;
                    item.h = 400;
                });
                // 把完整的数据保存到 list 中
                this.list = result.body.message;
                }
            })
            }
        },
        created(){
            this.getphotosinfo()
             this.getThumbs()
        },
        components:{
             // 注册 评论子组件
            "cmt-box": comment
        }
}
</script>
<style lang="less" scoped>
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }

  .content {
    font-size: 13px;
    line-height: 30px;
  }

  .thumbs{
    img{
      margin: 10px;
      box-shadow: 0 0 8px #999;
    }
  }
}
</style>

