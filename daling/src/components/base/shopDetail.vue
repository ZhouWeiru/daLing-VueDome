<template>
    <div class='shop-detail'>
        <div v-for='item in idData' class='shop-box'>
            <div class='shop-introduce'>
                <div class='img-box'>
                    <img :src='item.cover_image' />
                </div>
                <div class='shop-tit'>
                    <h4>{{item.goods_title}}</h4>
                    <p>
                        <span class='icon-heart-empty heart'></span>
                        <span>{{item.view_wishes}}</span>
                    </p>
                </div>
                <div class='shop-price'>
                    <p class='shopPrice'>￥<span>{{item.price.toFixed(2)}}</span></p>
                    <p class='discount'>{{item.price_tag}}</p>
                    <p class='oldPrice'>{{item.country}}{{item.price_info.slice(0,4)}}<span>￥{{item.market_price.toFixed(2)}}</span></p>
                </div>
                <div class='back-box'>
                    <p class='back'>返</p>
                    <p class='wenzi'>{{item.coin.txt}}</p>
                </div>
                <div class='guarantee'>
                    <div v-for='guarantee in item.brands.list' v-if='guarantee.value'>
                        <img :src='guarantee.image_url' />
                        <span>{{guarantee.value}}</span>
                    </div>
                </div>
            </div>
            <div class="shop-leaveMeg" v-for="userItem in item.bang.bang_data">
                <h6>Ta在晒（{{item.bang.bang_num}}）</h6>
                <div class="shop-userMeg">
                    <div>
                        <img :src="userItem.user_img_url"/>
                        <p>{{userItem.user_name}}</p>
                    </div>
                    <time>{{userItem.publish_date | filterTime}}</time>
                </div>
                <div class='shop-leave'>
                    <div class='shopImgBox'>
                        <img :src='userItem.subject_content[0].img_list[0].subject_img_thumb_http' />
                    </div>
                    <p>{{userItem.subject_content[0].content}}</p>
                </div>
            </div>
            <div class='shop-leaveList' v-for='(leaveList,index) in item.comments.list' v-if='index == 0'>
                <div class='user-msg'>
                    <div class='userMsg'>
                        <div><img :src='leaveList.avator' /></div>
                        <p class='user-name'>{{leaveList.nick_name}}</p>
                    </div>
                    <time>{{leaveList.comments_time | filterTime1}}</time>
                </div>
                <p class='leav-msg'>{{leaveList.content}}</p>
            </div>
            <div class='nav'>
                <nav class='navList' v-scroll>
                    <a 
                    href="javascript:;" 
                    v-for='(navList,index) in navList' 
                    :class='index == 0 ? "on" : ""'
                    @click='toggleList(index)'>
                        {{navList.name}}
                    </a>
                </nav>
                <div></div>
            </div>
            <div class='shopShow' v-for='shopShow in item.special' v-if='navInd == 0'>
                <h6>{{shopShow.name}}</h6>
                <p class='shop-wz'>{{shopShow.txt}}</p>
                <div class='pics'>
                    <div 
                    v-for='pics in shopShow.list'
                    :style='{backgroundImage:"url("+pics.big_image+")"}'></div>
                </div>
            </div>
            <div class='shopShow' v-if='navInd == 1' v-for='wenziList in item.tab_list' >
                <div class='wenzi' v-for='wenzi in wenziList.list'>
                    <h6>{{wenzi.title}}</h6>
                    <p class='shop-wz'>{{wenzi.text}}</p>
                    <div class='contact' v-if='wenzi.property'>
                        <span class='information'>{{wenzi.property.name}}</span>
                        <span class='xx'>{{wenzi.property.value}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class='addShopCar'>
            <router-link to='/shopCar'>
            <p class='icon-shopping-cart cart'>
                <span>{{nums}}</span>
            </p>
            </router-link>
            <div class='add'>
                <p class='addCart' @click='addCart(idData)'>加入购物车</p>
                <p class='purchase'>立即购买</p>
            </div>
        </div>
    </div>
</template>


<script>
    export default{
        data(){
            return {
                idData : [],
                navList : [
                    {
                        name : "图文详情"
                    },
                     {
                        name : "服务承诺"
                    }
                ],
                navInd : 0,
                nums : ""
            }
        },
        created () {
            console.log(this.$store.state.nums)
            this.nums = this.$store.state.nums;
            this.getIdData();
        },
        methods: {
            getIdData(){
                this.$http.get("http://localhost:3000/comments").then(function(data){
                    var ind = (this.$route.params.id)%3;
                    this.idData.push(data.body[ind].data);
                })
            },
            toggleList(ind){
                var navList = document.querySelector(".navList").querySelectorAll("a");
                for(var i=0;i<navList.length;i++){
                    navList[i].className = '';
                }
                navList[ind].className = "on";
                this.navInd = ind;
            },
            addCart(data){
                var shopName = data[0].goods_show_desc,
                    shopPrice = data[0].price,
                    shopImg = data[0].cover_image,
                    shopId = data[0].brand_id,
                    shopDetails = {
                        shopName : shopName,
                        shopPrice : shopPrice,
                        shopImg : shopImg,
                        shopId : shopId,
                        type : 1
                    };
                this.$store.commit("addCartList",shopDetails);
                this.$store.commit("addNums");
                this.nums = this.$store.state.nums;
            }
        },
        filters: {
            filterTime(value){
                var newDate = new Date(value).toLocaleString().split("/");
                return newDate[0]+"-"+newDate[0]+"-"+newDate[2].slice(0,2);
            },
            filterTime1(value){
               return value.slice(0,10);
            }
        }
    }
</script>


<style lang="less" scoped>
    .shop-detail{   
        width:100%;
        background: #f0f0f0;
        overflow: hidden;
        margin-bottom: 0.44rem;
        .shop-introduce{
            width:100%;
            background: #fff;
            margin-bottom: 0.1rem;
            .img-box{
                width:100%;
                margin-bottom: 0.1rem;
                img{
                    display: block;
                    width:100%;
                }
            }
            .shop-tit{
                padding: 0 0.1rem;
                display: -webkit-box;
                -webkit-box-pack:justify;
                h4{
                    line-height:1.5;
                    width:80%;
                    font-size: 0.15rem;
                }
                p{
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-box-align:center;
                    color:#848484;
                    span{
                        display: block;
                        &.heart{
                            margin-bottom: .05rem;
                            font-size: .2rem;
                        }
                    }
                }
            }
            .shop-price{
                display: -webkit-box;
                -webkit-box-align: center;
                padding:0.15rem 0.1rem;
                position: relative;
                .shopPrice{
                    color: #ee4e37;
                    font-size: 0.12rem;
                    span{
                        font-size: 0.18rem;
                    }
                }
                .discount{
                    margin-left: 0.1rem;
                    margin-right: 0.15rem;
                    color:red;
                    border: 1px solid #f00;
                    font-size: 0.12rem;
                    padding:0.01rem;
                }
                .oldPrice{
                    font-size: 0.12rem;
                    color:#777;
                    span{
                        font-size: 0.16rem;
                        text-decoration: line-through;
                    }
                }
                &:after{
                    content:"";
                    position: absolute;
                    width:100%;
                    bottom: 0;
                    height:1px;
                    background: #777;
                    left:0;
                }
            }
            .back-box{
                -webkit-box-align: center;
                display: -webkit-box;
                position: relative;
                padding:0.1rem;
                .back{
                    background: #eea252;
                    color:#fff;
                    width:.2rem;
                    height:.2rem;
                    font-size: 0.12rem;
                    line-height: 0.2rem;
                    text-align: center;
                }
                .wenzi{
                    font-size: 0.12rem;
                    color:#777;
                    margin-left:0.05rem;
                }
                &:after{
                    content:"";
                    position: absolute;
                    width:100%;
                    bottom: 0;
                    height:1px;
                    background: #777;
                    left:0;
                }
            }
            .guarantee{
                display: -webkit-box;
                padding:0.1rem;
                div{
                    display: -webkit-box;
                    margin-right: 0.1rem;
                     img{
                        display: block;
                        width:0.14rem;
                        height:0.14rem;
                        margin-right: 0.05rem;
                    }
                    span{
                        display: block;
                        color: #777;
                        font-size: 0.12rem;
                    }
                }
            }
        }
        .shop-leaveMeg{
            background:#fff;
            padding:0.1rem;
            position: relative;
            &:after{
                content: "";
                position: absolute;
                bottom:0;
                left:0.1rem;
                right:0;
                height:1px;
                background: #777;
            }
            h6{
                height:0.3rem;
                line-height:0.3rem;
                font-size:0.12rem;
            }
            .shop-userMeg{
                display:-webkit-box;
                -webkit-box-align:center;
                -webkit-box-pack:justify;
                div{
                    -webkit-box-align:center;
                    display:-webkit-box;
                     img{
                        width:0.3rem;
                        height:0.3rem;
                        display:block;
                    }
                    p{
                        font-size:0.12rem;
                        color:#333;
                        margin-left:0.05rem;
                    }
                }
                time{
                    font-size: 0.12rem;
                    color:#7a787a;
                }
            }
            .shop-leave{
                display: -webkit-box;
                margin-top:0.1rem;
                .shopImgBox{
                    width:0.62rem;
                    height:.62rem;
                    img{
                        display: block;
                        width:100%;
                        height:100%;
                    }
                }
                p{
                    -webkit-box-flex: 1;
                    font-size: 0.12rem;
                    line-height: 0.16rem;
                    color: #585858;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 4;
                    margin-left:0.1rem;
                    -webkit-box-orient: vertical;
                }
            }
        }
        .shop-leaveList{
            background: #fff;
            padding: 0.1rem;
            .user-msg{
                display: -webkit-box;
                -webkit-box-pack:justify;
                -webkit-box-align:center;
                .userMsg{
                    -webkit-box-align:center;
                    display: -webkit-box;
                    div{
                        margin-right: 0.1rem;
                        width:0.3rem;
                        height:.3rem;
                        img{
                            display: block;
                            width:100%;
                        }
                    }
                    .user-name{
                        color:#333;
                        font-size: 0.12rem;
                    }
                }
                time{
                    color:#7a787a;
                    font-size: 0.12rem;
                }
            }
            .leav-msg{
                margin-top: 0.1rem;
                color:#585858;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                line-height: 0.16rem;
                font-size: 0.12rem;
            }
        }
        .nav{
            height:0.44rem;
            margin-top:0.1rem;
            .navList{
                width:100%;
                background: #fff;
                position: relative;
                display: -webkit-box;
                height: 0.4rem;
                border-bottom: 1px solid #777;
                a{
                    line-height: 0.4rem;
                    display: block;
                    -webkit-box-flex:1;
                    text-align: center;
                    color:#777;
                    position: relative;
                    &.on{
                        color:#a651b7;
                        &:after{
                            content: '';
                            height: 0.02rem;
                            display: block;
                            position: absolute;
                            width: 0.2rem;
                            left: 50%;
                            margin-left: -0.1rem;
                            bottom: 0.05rem;
                            background: #a651b7;
                        }
                    }
                }
            }
        }
        
        .shopShow{
            background: #fff;
            padding:0.1rem;
            h6{
                font-size: 0.14rem;
                line-height: 0.18rem;
                margin-bottom: 0.05rem;
            }
            .shop-wz{
                color:#4e4e4e;
                font-size: 0.12rem;
                margin-bottom: 0.1rem;
            }
            .pics{
                width:100%;
                :nth-child(1){
                    float:left;
                    width:100%;
                    padding-top:50%;
                    background-size: cover;
                    background-position: center center;
                    margin-bottom: 0.1rem;
                }
                :nth-child(2){
                    float:left;
                    width:49%;
                    padding-top:50%;
                    background-size: cover;
                    background-position: center center;
                    margin-bottom: 0.1rem;
                }
                :nth-child(3){
                    float:right;
                    width:49%;
                    padding-top:50%;
                    background-size: cover;
                    background-position: center center;
                    margin-bottom: 0.1rem;
                }
            }
            .contact{
                display: -webkit-box;
                -webkit-box-align: center;
                .information{
                    display: block;
                    text-align-last:justify;
                    width:0.78rem;
                    font-size: 0.12rem;
                    color:#888;
                    margin-right: 0.1rem;
                }
                .xx{
                    font-size: .12rem;
                }
            }
        }
        .addShopCar{
            position: fixed;
            bottom:0;
            left:0;
            right:0;
            height:0.44rem;
            background: #fff;
            display: -webkit-box;
            -webkit-box-pack: justify;
            .cart{
                font-size: 0.18rem;
                line-height: 0.44rem;
                margin-left:0.15rem;
                position: relative;
                color:#000;
                span{
                    position: absolute;
                    top:-62%;
                    right:-50%;
                    background: #f0593f;
                    color:#fff;
                    padding:0 0.03rem;
                    font-size: 0.12rem;
                    line-height: normal;
                    border-radius: 25%;
                    padding:0 0.05rem;
                }
            }
            .add{
                display: -webkit-box;
                p{
                    width:1rem;
                    line-height: 0.44rem;
                    color:#fff;
                    text-align: center;
                    font-size: 0.16rem;
                    &.addCart{
                        background: #af5bbf;
                    }
                    &.purchase{
                        background:#6e3594; 
                    }
                }
            }
        }
    }
</style>