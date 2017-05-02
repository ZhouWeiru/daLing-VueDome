<template>
    <div class='shop-list'>
        <router-link
        v-for='(item,index) in shopList'
        :to="{name:'ShopDetail',params :{id:index}}">
        <dl 
        :class='index%2 == 0 ? "left" : "right"'>
            <dt>
                <a href="javascript:;"  :style='{backgroundImage:"url("+item.cover_image+")"}'></a>
            </dt>
            <dd>
                <h4>{{item.country}} | {{item.title_desc}}</h4>
                <p class='introduce'>[{{item.brand_name}}]{{item.description}}</p>
                <div>
                    <p class='price'>￥{{item.price}}
                        <span 
                        v-if='item.icon_display' 
                        v-for='items in item.icon_display'
                        :style='{background:items.back_ground_color}'>{{items.txt}}</span>
                    </p>
                    <p class='shopCar icon-shopping-cart'></p>
                </div>
                <p class='addShop'>{{item.add_cart_num | filterFn}}万人已加入购物车</p>
            </dd>
        </dl>
        </router-link>
    </div>
</template>

<script>
    export default{
        props: {
            shopList : {
                type : Array
            }
        },
        filters: {
            filterFn (val){
                return (val/10000).toFixed(1);
            }
        }
    }
</script>

<style lang="less" scoped>
    .shop-list{
        overflow: hidden;
        width:100%;
        dl{
            width:49%;
            background: #fff;
            margin-bottom: 0.1rem;
            dt{
                width:100%;
                margin-bottom: 0.1rem;
                a{
                    display: block;
                    width:100%;
                    padding-top:100%;
                    background-size: cover;
                    background-position: center;
                }
            }
            dd{
                padding:0 0.1rem;
                h4{
                    font-size: 0.12rem;
                    color:#252525;
                    margin-bottom: 0.05rem;
                }
                .introduce{
                    color:#9f9f9f;
                    font-size: 0.12rem;
                    margin-bottom: 0.05rem;
                    height:0.3rem;
                }
                div{
                    display: -webkit-box;
                    height:0.34rem;
                    -webkit-box-pack:justify;
                    .price{
                        color:#ff4a30;
                        font-size: 0.16rem;
                        span{
                            display: block;
                            color:#fff;
                            font-size: 0.12rem;
                            border-radius: 5px;
                            text-align: center;
                            margin-top: 0.02rem;
                        }
                    }
                    .shopCar{
                        height:100%;
                        width:0.34rem;
                        border:1px solid #ccc;
                        border-radius: 5px;
                        font-size: 0.16rem;
                        padding:0.05rem;
                    }
                }
                .addShop{
                    font-size: 0.12rem;
                    color:#9f9f9f;
                    margin-top: 0.1rem;
                }
            }
            &.left{
                float: left;
            }
             &.right{
                float: right;
            }
        }
    }
</style>