<template>
    <div class='classify-list'>
        <search></search>
        <div class='nav-list'>
            <nav
            v-scroll>
                <a 
                v-for='(item,index) in navList'
                :class='index == 0 ? "on" : ""'
                @click='toggleShopList(index)'>{{item.name}}
                <span v-if='item.flg' class='top'></span><span v-if='item.flg' class='bottom'></span></a>
            </nav>
        </div>
        <shop-list1
        :shopList='shopList'></shop-list1>
    </div>
</template>


<script>
    import search from '@/components/base/search';
    import shopList1 from '@/components/base/shopList1';
    export default{
        created(){
            this.getData(this.shopInd);
        },
        methods: {
            getData(ind){
                this.$http.get("http://localhost:3000/posts").then(function(data){
                    this.shopList = data.body[ind].data.list;
                })
            },
            toggleShopList(ind){
                var navList = document.querySelector(".nav-list").querySelectorAll("a"),
                    top = document.querySelector(".top"),
                    bottom = document.querySelector(".bottom"),
                    nowIndex = 0;
                for(var i=0;i<navList.length;i++){
                    navList[i].className = "";
                }
                navList[ind].className = "on";
                if(ind == navList.length-1){

                }else if(ind == 3){
                    this.index++;
                    if(this.index == 1){
                        top.className = "top on"
                        bottom.className = "bottom"
                        nowIndex = ind;
                    }else{
                        top.className = "top"
                        bottom.className = "bottom on"
                        nowIndex = ind+1;
                        this.index = 0;
                    }
                    this.getData(nowIndex);
                }else{
                    nowIndex = ind;
                    this.getData(nowIndex);
                }
            }
        },
        components : {
            search,
            shopList1
        },
        data(){
            return {
                navList : [
                    {
                        name : "综合",
                        flg : false
                    },
                    {
                        name : "销量",
                        flg : false
                    },
                    {
                        name : "新品",
                        flg : false
                    },
                    {
                        name : "价格",
                        flg : true
                    },
                    {
                        name : "分类",
                        flg : true
                    }
                ],
                shopInd : 0,
                shopList : [],
                index :0
            }
        }
    }
</script>


<style lang="less" scoped>
    .classify-list{
        .nav-list{
            height:0.4rem;
            nav{
                width:100%;
                height:.44rem;
                background: #fff;
                display: -webkit-box;
                a{
                    width:0;
                    display: block;
                    -webkit-box-flex:1;
                    text-align: center;
                    line-height: 0.4rem;
                    position: relative;
                    &.on{
                        color:#ff4a30;
                    }
                    &:nth-child(4){
                        &.on{
                            span{
                                 &.on{
                                    &:after{
                                        border-top: 0.05rem solid #ff4a30;
                                    }
                                }
                            }
                        }
                        span{
                            &.top{
                                position: absolute;
                                right:18%;
                                top:42%;
                                &:after{
                                    content:"";
                                    width: 0;
                                    height: 0;
                                    display: block;
                                    border-right: 0.05rem solid transparent;
                                    border-top: 0.05rem solid #aaa;
                                    -webkit-transform: rotate(45deg);
                                }
                            }
                            &.bottom{
                                position: absolute;
                                right:18%;
                                top:53%;
                                &:after{
                                    content:"";
                                    width: 0;
                                    height: 0;
                                    display: block;
                                    border-right: 0.05rem solid transparent;
                                    border-top: 0.05rem solid #aaa;
                                    -webkit-transform: rotate(-135deg);
                                }
                            }
                           
                        }
                    }
                     &:nth-child(5){
                        .bottom{
                            position: absolute;
                            right:18%;
                            top:40%;
                            &:after{
                                content:"";
                                width: 0;
                                height: 0;
                                display: block;
                                border-right: 0.05rem solid transparent;
                                border-top: 0.05rem solid #aaa;
                                -webkit-transform: rotate(-135deg);
                            }
                        }
                    }
                }
            }
        }
    }
</style>