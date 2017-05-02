<template>
    <div class='home'>
        <search></search>
        <tit-banner
        :titBanner='homeData'></tit-banner>
        <home-main
        :mainData='mainData'></home-main>
        <footer-bar></footer-bar>
    </div>
</template>


<script>
import titBanner from '@/components/page/home/titBanner';
import homeMain from '@/components/page/home/main';
import footerBar from '@/components/base/footer';
import search from '@/components/base/search';
export default {
    data (){
        return {
            homeData : {},
            mainData : []
        }
    },
    created () {
        this.getHomeData();
    },
    methods : {
        getHomeData (){
           this.$http.jsonp('http://touch.daling.com/api/index/index?_=1491993723919').then(function(data){
                var res = data.body.data;
               this.homeData = res;
               this.mainData = res.complex;
            })
        }
    },
    components : {
        titBanner,
        homeMain,
        footerBar,
        search
    }
}
</script>


<style lang="less" scoped>
    .home{
        margin-bottom: 0.45rem;
    }
</style>