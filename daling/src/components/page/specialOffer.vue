<template>
    <div class='so-content'>
        <header class='so-header'>
            <a href="javascript:;" 
            v-for='(item,index) in titList' 
            :class='index == 0 ? "on" : ""'
            @click='toggleData(index)'>{{item.name}}</a>
        </header>
        <soinfo
        :specoalOfferData='specoalOfferData'></soinfo>
        <footer-bar></footer-bar>
    </div>
</template>


<script>
    import footerBar from '@/components/base/footer';
    import soinfo from '@/components/page/specialOffer/soinfo';
    export default {
        data(){
            return {
                specoalOfferData : {},
                titList : [
                    {
                        name : "今日约惠"
                    },
                    {
                        name : "约惠预告"
                    }
                ]
            }
        },
        components : {
            footerBar,
            soinfo
        },
        created(){
            this.getSpecoalOfferData();
        },
        methods: {
            getSpecoalOfferData(){
                this.$http.jsonp('http://touch.daling.com/api/promotion/todayFlashGoods?page=1&_=1492148501471').then(function(data){
                    var res = data.body.data;
                    this.specoalOfferData =res;
                })
            },
            getSpecoalOfferData1(){
                this.$http.jsonp('http://touch.daling.com/api/promotion/todayFlashGoodsForenotice?_=1492148501473').then(function(data){
                    var res = data.body.data;
                    this.specoalOfferData =res;
                })
            },
            toggleData(ind){
                var titA = document.querySelector(".so-header").querySelectorAll("a");
                for(var i=0;i<titA.length;i++){
                    titA[i].className = "";
                }
                titA[ind].className="on";
                if(ind == 0){
                    this.getSpecoalOfferData();
                }else{
                    this.getSpecoalOfferData1();
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .so-content{
        width:100%;
        height:100%;
        padding-top:0.44rem;
        padding-bottom: 0.44rem;
        .so-header{
            height: 0.44rem;
            background: #fff;
            position: fixed;
            top:0;
            right:0;
            left:0;
            display: -webkit-box;
            z-index: 10;
            a{
                display: block;
                -webkit-box-flex:1;
                text-align: center;
                line-height: 0.44rem;
                font-size: 0.12rem;
                color:#333;
                &.on{
                    color: #a651b7;
                    position: relative;
                    &:after{
                        content: "";
                        position: absolute;
                        background: #a651b7;
                        height:1px;
                        width:10%;
                        bottom:22%;
                        left:45%;
                    }
                }
            }
        }
    }
</style>