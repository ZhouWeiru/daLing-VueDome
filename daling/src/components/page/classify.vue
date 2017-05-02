<template>
    <div class='classify'>
        <search></search>
        <classify-box
        :classifyData='classifyData'></classify-box>
        <footer-bar></footer-bar>
    </div>
</template>


<script>
import search from '@/components/base/search';
import footerBar from '@/components/base/footer';
import classifyBox from '@/components/page/classify/classifybox';
    export default{
        data (){
            return {
                classifyData : []
            }
        },
        components: {
            footerBar,
            search,
            classifyBox
        },
        created(){
            this.getClassifyData()
        },
        methods : {
            getClassifyData (){
                this.$http.jsonp('http://touch.daling.com/api/menu/getMenu?_=1492064892341').then(function(data){
                    this.classifyData = data.data.data;
                })
            }
        }
    }
</script>



<style lang="less" scoped>
    .classify{
        width:100%;
        height:100%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
    }
</style>