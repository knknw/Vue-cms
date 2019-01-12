<template>
    <div class="gods-dest">
        <h4>{{declinst.title}}</h4>
        <hr>
        <div  class="content" v-html="declinst.content" ></div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            id:this.$route.params.id,
            declinst:[]
        }
    },
    methods:{
        getgdsDesc(){
            this.$http.get('http://www.lovegf.cn:8899/api/goods/getdesc/' +this.id).then(result =>{
                //console.log(result.body)
                this.declinst = result.body.message[0]
            })
        }
    },
    created(){
        this.getgdsDesc()
    }
}
</script>
<style lang="less" >
    .gods-dest{
        padding: 0 10px;
        width: 100%;
        h4{
            font-size: 16px;
            color: #226aff;
            text-align: center;
            margin: 15px 0;
        }
        .content{
            img{
               width: 100%;
            }      
        }
    }
</style>
