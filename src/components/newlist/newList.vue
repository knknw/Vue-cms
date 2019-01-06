 <!--新闻列表页 -->

<template>
    <div class="newlist-conse">
       <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in newlist" :key='item.id'>
					<router-link :to="'/home/newInfo/'+ item.id "  >
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
                        <h3>{{item.title}}</h3>
						<div class="mui-media-body">
							<span class='mui-ellipsis'>发表时间:{{item.add_time | dataForm}}</span>
							<span class='mui-ellipsis'>阅读:{{item.click}}次</span>
						</div>
					</router-link>
				</li>
			</ul>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
    data(){
        return {
            newlist:[]
        }
    },
    methods:{
        getnewlist(){
            this.$http.get('http://www.lovegf.cn:8899/api/getnewslist').then(result => {
                //console.log(result.body)
                if(result.body.status == 0){
                    this.newlist = result.body.message
                }else{
                     Toast('数据获取失败!')
                }
            })
        }
    },
    created(){
        this.getnewlist()
    }
}
</script>
<style lang="less" scoped>
.newlist-conse{
    .mui-table-view{
        h3{
            font-size: 15px;
        }
        .mui-media-body{
            font-size: 13px;
            color: #0094ff;
            display: flex;
            justify-content: space-between;
        }
    }
        
}
</style>

