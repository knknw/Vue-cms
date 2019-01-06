 <!--评论列表公共模板-->
<template>
    <div class="cimmon-cnonse">
        <H3 class="plf">发表评论</H3>
        <hr>
        <textarea  placeholder="请输入内容,最多120字..." maxlength="120" v-model="msg"></textarea>
        <mt-button type="primary" size='large' @click="postComment">发表评论</mt-button>
        <div class="cmt-list" v-for="(itme,i) in  comments" :key='i'>
            <div class="cmt-item" >
                第{{i+1}}楼:&nbsp;&nbsp; 用户:{{itme.user_name}}&nbsp;&nbsp; 发表时间:{{itme.add_time | dataForm}}
                <!-- <p>
                    {{itme.content}}
                </p> -->
            </div>
            <div class="cmt-body" >
                {{itme.content}}
            </div>
            
        </div>

         <mt-button type="danger" size="large" plain  @click=" getplinfo ">加载更多</mt-button>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
    data(){
        
        return{
            pageIndex: 1, // 默认展示第一页数据
            comments:[], //所有的评论数据
            msg:""//获取输入的评论数据
        }
    },
    methods:{
        getcomment(){
            this.$http
                .get("http://www.lovegf.cn:8899/api/getcomments/" + this.id + "?pageindex=" + this.pageIndex)
                .then(result =>{
                //console.log(result.body)
                  if (result.body.status === 0) {
            // this.comments = result.body.message;
            // 每当获取新评论数据的时候，不要把老数据清空覆盖，而是应该以老数据，拼接上新数据
            this.comments = this.comments.concat(result.body.message);
          } else {
            Toast("获取评论失败！");
          }
         })
        },
        getplinfo(){
            this.pageIndex++
            this.getcomment()
        },
         postComment(){
             if(this.msg.trim().length===0){
                 return Toast("请输入内容！");
             }else{
                 this.$http.post('http://www.lovegf.cn:8899/api/postcomment/'+this.$route.params.id,{
                     content: this.msg.trim()
                 }).then(result => {
                      if(result.body.status===0){
                         var cmt = {
                             user_name: "匿名用户",
                             add_time: Date.now(),
                             content: this.msg.trim()
                            };
                            this.comments.unshift(cmt);
                            this.msg = ""; //评论完成吧数组清空
                          
                      }
                 })
             }
         }
    },
    created(){
        this.getcomment()
    },
   props: ["id"]
}
</script>
<style lang="less" scoped>
    .cimmon-cnonse{
        .plf{
            font-size: 15px;
            margin-top: 15px;

        }
        textarea{
            height: 85px;
            font-size: 14px;
            color: #ccc;
            margin :0;
        }
        .cmt-list {
            margin: 5px 0;
            font-size: 13px;
            .cmt-item {
                background-color: #e7e5e5;
                line-height: 30px;
            }
            .cmt-body {
                line-height: 35px;
                text-indent: 2em;
                
      
            }   
        }
    }
</style>
