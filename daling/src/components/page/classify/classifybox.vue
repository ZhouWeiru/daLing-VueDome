<template>
    <div class='classify-box'>
        <aside class='aside-nav'>
            <a 
            href="javascript:;" 
            v-for='(item,index) in classifyData'
            :class='index == 0 ? "on" : ""'
            @click='toggleClassify(index)'>{{item.alt}}</a>
        </aside>
        <section class='classify-content' v-if='classifyData[toggleInd]'>
            <div 
            v-for='classify in classifyData[toggleInd].block_list' 
            class='classifyList'>
                <h4 v-if='classifyData[toggleInd].block_list.length != 1' class='tit'>{{classify.title}}</h4>
                <router-link to='classify/list' v-for='classifyList in classify.list'>
                    <div><img v-if='classifyList.category_img_url' :src='classifyList.category_img_url' /></div>
                    <h4>{{classifyList.category_title}}</h4>
                </router-link>
            </div>
        </section>
    </div>
</template>

<script>
export default{
    data (){
        return {
            toggleInd : 0
        }
    },
    props : {
        classifyData : {
            type : Array
        }
    },
    methods: {
        toggleClassify (ind){
            var asideNavList = document.querySelector(".aside-nav").querySelectorAll("a");
                for(var i=0;i<asideNavList.length;i++){
                    asideNavList[i].className = "";
                }
                asideNavList[ind].className = "on";
                this.toggleInd = ind;
        }
    }
}
</script>

<style lang="less" scoped>
    .classify-box{
        overflow: hidden;
        -webkit-box-flex:1;
        display: -webkit-box;
        .aside-nav{
            display: block;
            width:25%;
            a{
                display: block;
                width:100%;
                position: relative;
                height:0.4rem;
                text-align: center;
                color:#333;
                line-height: 0.4rem;
                font-size: 0.12rem;
                &:after{
                    content:"";
                    position: absolute;
                    width:100%;
                    bottom: 0;
                    left:0;
                    height:1px;
                    background: #d1d0d2;
                }
                &.on{
                    background: #af5bbf;
                    color: #fff;
                }
            }
        }
        .classify-content{
            overflow-y: auto;
            -webkit-box-flex:1;
            background: #fff;
            .classifyList{
                width:100%;
                overflow: hidden;
                .tit{
                    height: 0.4rem;
                    position: relative;
                    line-height: 0.4rem;
                    padding-left:0.1rem;
                    font-weight: bolder;
                    margin-bottom: 0.1rem;
                    &:after{
                        content: "";
                        font-size: 0;
                        position: absolute;
                        background: #d1d0d2;
                        width: 100%;
                        height: 1px;
                        left: 0;
                        bottom: 0;
                        -webkit-transform: scale(1, 0.5);
                        transform-origin: 0 top;
                    }
                     &:before{
                        content: "";
                        font-size: 0;
                        position: absolute;
                        background: #d1d0d2;
                        width: 100%;
                        height: 1px;
                        left: 0;
                        top: 0;
                        -webkit-transform: scale(1, 0.5);
                        transform-origin: 0 top;
                    }
                }
                a{
                    width:33%;
                    float:left;
                    margin-bottom: 0.1rem;
                    div{
                        width:0.5rem;
                        height:0.54rem;
                        margin:0 auto;
                        margin-bottom: 0.1rem;
                        img{
                            display: block;
                            width:100%;
                        }
                    }
                    h4{
                        text-align: center;
                        font-size: 0.12rem;
                        color:#333;
                    }
                }
            }
        }
    }
</style>