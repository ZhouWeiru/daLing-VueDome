<template>
    <div class='shopContent'>
            <dl>
                <dt>
                    <img :src="pics.cover_image" class='shopImg' />
                    <div 
                    v-if='pics.icons' 
                    v-for='item in pics.icons' 
                    :style='{width:item.big.w/2+"px",height:item.big.h/2+"px"}'
                    class='pos'>
                        <img :src='item.big.img' />
                    </div>
                    <div v-if='pics.stock <=10' class='stock'>仅剩{{pics.stock}}件</div>
                </dt>
                <dd>
                    <div class='shopTitle'>
                        <h4>{{pics.goods_show_name}}</h4>
                        <span 
                        v-if='pics.icon_display' 
                        v-for='item in pics.icon_display'
                        :style='{background:item.back_ground_color}'>{{item.txt}}</span>
                    </div>
                    <p class='shopMsg'>{{pics.goods_show_desc}}</p>
                    <div class='shopPrice'>
                        <p class='price'>{{pics.price.toFixed(2)}}</p>
                        <div class='addShop'>
                            <p>{{pics.add_cart_num}}人</p>
                            <p>加入购物车</p>
                        </div>
                    </div>
                </dd>
            </dl>
        </div>
</template>

<script>
    export default{
        props: {
            pics : {
                type : Object
            }
        }
    }
</script>

<style lang="less" scoped>
    .shopContent{
        padding:0.1rem;
        dl{
            dt{
                width:100%;
                margin-bottom: 0.1rem;
                position: relative;
                .shopImg{
                    display: block;
                    width:100%;
                }
                .pos{
                    position: absolute;
                    &:nth-child(2){
                        right:0.1rem;
                        top:0.05rem;
                    }
                    &:nth-child(3){
                        right:0.45rem;
                        top:0.05rem;
                    }
                    &:nth-child(4){
                        right:0.8rem;
                        top:0.05rem;
                    }
                    img{
                        width:100%;
                    }
                }
                .stock{
                    position: absolute;
                    right:0;
                    bottom:0;
                    color:#fff;
                    padding:0.04rem 0.1rem;
                    background: rgba(0, 0, 0, 0.5);
                    font-size: 0.12rem;
                }
            }
            dd{
                .shopTitle{
                    display: -webkit-box;
                    font-size: 0.12rem;
                    margin-bottom: 0.1rem;
                    h4{
                        color: #252525;
                        margin-right: 0.05rem;
                    }
                    span{
                        color:#fff;
                        padding:0.03rem;
                    }
                }
                .shopMsg{
                    color: #9f9f9f;
                    font-size:0.12rem;
                    white-space:nowrap;
                    overflow:hidden;
                    text-overflow:ellipsis; 
                    margin-bottom: 0.1rem;
                }
                .shopPrice{
                    display: -webkit-box;
                    -webkit-box-pack:justify;
                    .price{
                        color: #f0593f;
                        font-size: 0.16rem;
                        &:before{
                            content:"¥";
                            font-size: 0.12rem;
                            margin-right:0.05rem;
                        }
                    }
                    .addShop{
                        color: #666;
                        border:1px solid #666;
                        padding:0.02rem .05rem;
                        p{
                            font-size: 0.12rem;
                            text-align: center;
                        }
                    }
                }
            }
        }
    }
</style>