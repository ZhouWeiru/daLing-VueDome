<template>
    <footer class='dling-footer'>
        <router-link :to='item.url' v-for="item in footerList" active-class='on'>
            <i :class="item.class"></i>
            <span>{{item.name}}</span>
            <b v-if='item.flg && nums'>{{nums}}</b>
        </router-link>
    </footer>
</template>

<script>
export default {
    data(){
        return {
            footerList : [
                {
                    name : "首页",
                    class : "icon-home",
                    url : "/home",
                     flg : false
                },
                {
                    name : "分类",
                    class : "icon-align-justify",
                    url : "/classify",
                     flg : false
                },
                {
                    name : "约惠",
                    class : "icon-bullhorn",
                    url : "/specialOffer",
                    flg : false
                },
                {
                    name : "购物车",
                    class : "icon-shopping-cart",
                    url : "/shopCar",
                    flg : true
                },
                {
                    name : "我的",
                    class : "icon-user",
                    url : "/my",
                     flg : false
                }
            ],
            nums : ""
        }
    },
    created(){
        this.nums = this.$store.state.nums;
    }
}
</script>


<style lang="less" scoped>
    .dling-footer{
        height:0.44rem;
        background: #fff;
        position: fixed;
        bottom: 0;
        right:0;
        left:0;
        display: -webkit-box;
        a{
            -webkit-box-flex:1;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-box-pack:center;
            -webkit-box-align:center;
            color: #585658;
            position: relative;
            i{
                font-size: 0.16rem;
                display: block;
                margin-bottom: 0.05rem;
            }
            span{
                display: block;
            }
            &.on{
                color: #af5bbf;
            }
            b{
                position: absolute;
                right:20%;
                top:0;
                color:#fff;
                background:#f0593f;
                font-size: 0.12rem;
                border-radius: 25%;
                padding:0 0.05rem;
                text-align: center;
            }
        }
    }
</style>