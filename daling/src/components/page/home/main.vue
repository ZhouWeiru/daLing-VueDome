<template>
     <div class='home-content'>
        <div class='content' v-for='content in mainData'>
            <div class='conTit'>
                <p></p>
                <h2>{{content.txt}}</h2>
                <p></p>
            </div>
            <div class='pics' v-for='pics in content.list' v-if='content.type == "module"'>
                <div v-for='pics1 in pics.list' class='pics-content'>
                    <div :style='{backgroundImage:"url("+pics1.cover+")"}' class='picBox'></div>
                    <time class='time'>{{ pics1.end_time | filterFn }}</time>
                </div>
            </div>
            <div class='pics' v-for='pics in content.list' v-if='content.type == "xinpin"'>
                <div v-if='pics.display_type == "category_window"' class='shopMsg'>
                    <div v-for='picList in pics.list' class='msg'>
                        <div class='infoBox'>
                            <h4>{{picList.title}}</h4>
                            <p :style="{color:picList.txt_color}">{{picList.count_txt}}<span>></span></p>
                        </div>
                        <div class='imgBox'>
                            <img :src="picList.cover" />
                        </div>
                    </div>
                </div>
                <shop-list 
                v-else-if='pics.display_type == "flat"' 
                :pics='pics'></shop-list>
            </div>
        </div>
    </div>
</template>


<script>
import shopList from '@/components/base/shopList';
    export default{
        props : {
            mainData : {
                type : Array
            }
        },
        components : {
            shopList
        },
        filters: {
            filterFn (val){
                var nowDate = new Date()*1,
                    str = "",
                    endTime = val-(nowDate/1000),
                    day = parseInt(endTime/60/60/24),
                    hours = parseInt((endTime-day*60*60*24)/60/60),
                    minute = parseInt((endTime-day*60*60*24-hours*60*60)/60);
                    if(day < 1){
                         str+="还剩"+hours+"小时"+minute+"分";
                    }else{
                        str+="还剩"+day+"天"+hours+"小时";
                    }
                    return str;
            }
        }
    }
</script>


<style lang="less" scoped>
     .home-content{
        overflow: hidden;
        .content{
            background:#fff;
            width:100%;
            margin-bottom:0.1rem;
            overflow: hidden;
            .conTit{
                display: -webkit-box;
                -webkit-box-pack: center;
                height:0.4rem;
                -webkit-box-align: center;
                h2{
                    margin:0 0.1rem;
                }
                p{
                    width:0.12rem;
                    display: inline-block;
                    border-bottom: 1px solid #a8a8ad;
                    margin-bottom: 0.05rem;
                }
            }
            .pics{
                .pics-content{
                    width:100%;
                    float:left;
                    .picBox{
                        background-size: 100% 100%;
                        padding-top:50%;
                    }
                    .time{
                        display: block;
                        height:0.4rem;
                        text-align: center;
                        line-height: 0.4rem;
                        position: relative;
                        color: #858385;
                        font-size: 0.12rem;
                        &::before{
                                content: "";
                                display: inline-block;
                                position: absolute;
                                height: 1px;
                                width: 0.6rem;
                                top: 50%;
                                left:16%;
                                background: -webkit-linear-gradient(left , #f9f9f9,#d2d2d2);
                        }
                        &::after{
                            content: "";
                            display: inline-block;
                            position: absolute;
                            height: 1px;
                            width: 0.6rem;
                            top: 50%;
                            right: 16%;
                            background: -webkit-linear-gradient(right , #f9f9f9,#d2d2d2);
                        }
                    }
                }
                .shopMsg{
                    overflow: hidden;
                    .msg{
                        float:left;
                        width:50%;
                        border:1px solid #d0d0d0;
                        padding:0.2rem 0;
                        margin-top:-1px;
                        margin-right:-1px;
                        .infoBox{
                            margin-left:0.15rem;
                            float:left;
                            h4{
                                font-size: 0.14rem;
                            }
                            p{
                                padding:0.02rem 0.05rem;
                                font-size: 0.12rem;
                                border:1px solid;
                                border-radius: 10px;
                                span{
                                    margin-left:0.15rem;
                                }
                            }
                        }
                        .imgBox{
                            width:0.6rem;
                            height:0.6rem;
                            float:right;
                            margin-right:0.15rem;
                            img{
                                display: block;
                                width:100%;
                            }
                        }
                    }
                }
                
            }
        }
    }
</style>