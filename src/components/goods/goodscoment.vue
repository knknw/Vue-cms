<template>
    <div>
             <conentbox :id="id"></conentbox> 
    </div>
</template>
<script>
    import conentbox from "../../common/comment.vue";
export default {
    data(){
        return {
            id:this.$route.params.id
        }
    },
    methods:{
        
    },
    components:{
        conentbox 
    }
}
</script>