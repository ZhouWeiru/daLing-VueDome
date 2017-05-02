<template>
    <div class='tit-box'>
        <div class='pics-box'>
            <router-link  
            v-for='item in titBanner.activity_list' 
            :to="{name:'Details',params :{id:item.id}}">
                <div>
                    <img :src='item.image_url' />
                </div>
            </router-link>
        </div>
        <nav class='nav-box'>
            <a href="javascript:;"  v-for='nav in titBanner.index_select_range'>
                <img :src='nav.image_url' />
            </a>
        </nav>
    </div>
</template>
<script>
    export default {
        props : {
            titBanner : {
                type : Object
            }
        }
    }
</script>

<style lang="less" scoped>
    .tit-box{
        width:100%;
        .pics-box{
            width:100%;
            background: #fff;
            overflow:hidden;
            :nth-child(1){
                float:left;
                width:100%;
                margin-bottom: .05rem;
                img{
                    display: block;
                    width:100%;
                }
            }
            :nth-child(2){
                float:left;
            }
            :nth-child(3){
                float:right;
            }
            :nth-child(2),:nth-child(3){
                width:49%;
                img{
                    display: block;
                    width:100%;
                }
            }
        }
        .nav-box{
            display: -webkit-box;
            margin-bottom: 0.1rem;
            a{
                display: block;
                -webkit-box-flex: 1;
                img{
                    display: block;
                    width:100%;
                }
            }
        }
       
    }
</style>