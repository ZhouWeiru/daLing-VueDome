<template>
    <div>
        <header>我的购物车
            <span v-if='shopList' class='edit' @click='edit($event)'>编辑</span>
        </header>
        <div class='shopCar' v-if='!shopList'>
            <div class='shopCar-content'>
                <p>购物车里没有东西哦,快去挑选吧~</p>
                <router-link to='/home' class='tuijian'>逛逛首页</router-link>
            </div>
            <footer-bar></footer-bar>
        </div>
        <div v-else-if='shopList' class='shop-box'>
            <dl v-for='(item,index) in shopList' class='shop-list'>
                <dt :style='{backgroundImage:"url("+item.shopImg+")"}'>
                </dt>
                <dd>
                    <div 
                    class='duihao on' 
                    @click='toggleCls(item,index)'
                    ref='edit'
                    v-if='item.type == 1'></div>
                    <div 
                    class='duihao' 
                    @click='toggleCls(item,index)'
                    ref='edit'
                    v-if='item.type == 2'></div>
                    <h4 class='tit'>{{item.shopName}}</h4>
                    <div class='shop-num'>
                        <p class='price'>¥{{item.shopPrice}}</p>
                        <p class='addAndrem'>  
                            <span @click='jian(index)'>-</span>
                            <span ref='nums'>{{item.num}}</span>
                            <span @click='add(index)'>+</span>
                        </p>
                    </div>
                </dd>
            </dl>
            <footer class='shop-footer'>
                <div class='checkAll'>
                    <p class='duihao'>√</p>
                    <p class='all'>全选</p>
                    <div class='all-price' v-if='allPrice'>
                        <p class='singlePrice'>合计<span>¥{{allPrice.toFixed(2)}}</span></p>
                        <p class="allPrice">总额<span>¥{{allPrice.toFixed(2)}}</span></p>
                    </div>
                </div>
                <div class='settlement'>
                    <p>去结算({{shopNums}})</p>
                </div>
            </footer>
        </div>
    </div>
</template>
<script>
import footerBar from '@/components/base/footer';
export default {
    data(){
        return {
            shopList : null,
            shopNums : null,
            allPrice : null
        }
    },
    components : {
        footerBar
    },
    created(){
        this.getShopList();
        this.ifType();
    },
    methods: {
        getShopList(){
            var arr = [],
                that = this;
            if(this.$store.state.cartList.length != 0){
                this.shopList = this.$store.state.cartList;
            }else{
                this.shopList = null;
            }
        },
        ifType(){
            var that = this;
            this.itemList(function(data){
                if(data.num){
                    data.num = data.num;
                }else{
                    data.num = 1;
                }
                if(data.type == 1){
                    that.allPrice += data.shopPrice*data.num;
                    that.shopNums += data.num;
                }else{
                    that.allPrice += 0;
                    that.shopNums += 0;
                }
            })
        },
        itemList(fn){
            for(var i=0;i<this.shopList.length;i++){
                fn(this.shopList[i]);
            }
        },
        add(ind){
                var newNum = 0,
                    that = this;
                this.$store.commit("addNum",ind);
                this.itemList(function(data){
                   if(data.type == 2){
                        newNum =  that.$store.state.nums - data.num;
                   }else{
                        newNum += data.num;
                   }
                })
                if(this.shopList[ind].type == 1){
                     this.shopNums = newNum;
                }
        },
        jian(ind){
            var that = this;
            this.$store.commit("jianNum",ind);
            if(this.shopNums > 1){
                this.itemList(function(data){
                    if(data.type == 1){
                        that.shopNums = that.$store.state.nums;
                        that.allPrice -= data.shopPrice;
                    }else{
                        that.allPrice = 0;
                    }
                })
            }
        },
        toggleCls(item,ind){
            if(item.type == 2){
                this.allPrice += item.shopPrice*item.num;
                this.shopNums += item.num;
            }else{
                this.allPrice -= item.shopPrice*item.num;
                this.shopNums -= item.num;
            }
            this.$store.commit("setType",ind);
        }
    }
}
</script>


<style lang="less" scoped>
header{
    height:0.44rem;
    background: #fff;
    text-align: center;
    line-height: 0.44rem;
    position: relative;
    .edit{  
        position: absolute;
        right:3%;
        color:#b05bc0;
    }
}
.shopCar{
    width:100%;
    height:100%;
    padding-bottom: 0.45rem;
    .shopCar-content{
        width:100%;
        height:100%;
        text-align: center;
        font-size: 0.14rem;
        color:#585659;
        padding-top: 0.6rem;
        .tuijian{
            display:inline-block;
            color:#585659;
            margin-top: 0.2rem;
            border:1px solid #585659;
            padding:0.05rem;
        }
    }
}
.shop-box{
    .shop-list{
        display: -webkit-box;
        background: #fff;
        margin-top: 0.1rem;
        padding:0.1rem 0.1rem 0.1rem 0.3rem;
        position: relative;
        dt{
            width:.8rem;
            height:.8rem;
            background-size: cover;
            background-position: center center;
            margin-right: 0.1rem;
        }dd{
            -webkit-box-flex: 1;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-box-pack:justify;
            .tit{
                font-size: 0.12rem;
            }
            .shop-num{
                display: -webkit-box;
                -webkit-box-pack:justify;
                .price{
                    color:#b05bc0;
                    font-size: 0.12rem;
                }
                .addAndrem{
                    display: -webkit-box;
                    span{
                        width:0.27rem;
                        height:0.22rem;
                        display: block;
                        text-align: center;
                        line-height: 0.22rem;
                        border:1px solid #777;
                        &:nth-child(1){
                            margin-right: -1px;
                        }
                        &:nth-child(2){
                            width:0.4rem;
                        }
                        &:nth-child(3){
                            margin-left: -1px;
                        }
                    }
                }
            }
        }
        .duihao{
            border:1px solid #777;
            text-align: center;
            line-height: 0.16rem;
            font-size: 0.12rem;
            border-radius: 100%;
            height:0.16rem;
            width:0.16rem;
            position: absolute;
            left:2%;
            top:45%;
            &.on{
                background: #b05bc0;
                color:#fff;
                &:after{
                    content:"√";
                }
            }   
        }
    }
    .shop-footer{
        position: fixed;
        bottom:0;
        height:0.45rem;
        background: #fff;
        width:100%;
        display: -webkit-box;
        -webkit-box-pack: justify;
        padding-left:0.1rem;
        .checkAll{
            display: -webkit-box;
            -webkit-box-align: center;
            .duihao{
                border:1px solid #777;
                text-align: center;
                line-height: 0.16rem;
                font-size: 0.12rem;
                border-radius: 100%;
                height:0.16rem;
                width:0.16rem;
                margin-right: 0.1rem;
                &.on{
                    background: #b05bc0;
                    color:#fff;
                }   
            }
            .all{
                font-size: .12rem;
                margin-right: 0.1rem;
            }
            .all-price{
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-box-pack: justify;
                .singlePrice{
                    span{
                        color:#f0593f;
                    }
                }
                .allPrice{
                    font-size: 0.12rem;
                }
            }
        }
        .settlement{
            background: #b05bc0;
            color:#fff;
            width:1rem;
            line-height: 0.45rem;
            text-align: center;
            font-size: 0.12rem;
        }
    }
}

</style>