<template>
    <div class='so-info'>
        <div class='shop-title' v-for='item in specoalOfferData.flash_list'>
            <div><img :src='item.icon' /></div>
            <h4>{{item.txt}}</h4>
        </div>
        <div class='shop-content' v-for='item in specoalOfferData.flash_list'>
            <div v-for='shopList in item.list'>
                <shop-list
                :pics='shopList'></shop-list>
            </div>
        </div>
    </div>
</template>


<script>
    import shopList from '@/components/base/shopList';
    export default{
        props: {
            specoalOfferData : {
                type : Object
            }
        },
        components : {
            shopList
        }
    }
</script>

<style lang="less" scoped>
    .so-info{
        width:100%;
        height: 100%;
        .shop-title{
            height:1rem;
            background: #f5c400;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-box-align: center;
            -webkit-box-pack: justify;
            padding:0.25rem;
            z-index: 10;
            div{
                width:0.18rem;
                height:0.18rem;
                img{
                    width:100%;
                    display: block;
                }
            }
            h4{
                color:#fff;
                font-size: 0.12rem;
            }
        }
    }
</style>