<template>
    <div>
        <div class='search' >
            <input type='text' placeholder="搜索商品" @focus='onFocus' class='text'>
            <p class='del' @click='del'>取消</p>
        </div>
        <div class='wrap'>
            <h4>热门搜索</h4>
            <div>
                <a href="javascript:;" v-for='item in wrapData'>{{item.alt}}</a>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        data (){
            return {
                wrapData : []
            }
        },
        created(){
            this.getWrapData();
        },
        methods: {
            onFocus(){
                var wrap = document.querySelector(".wrap"),
                    text = document.querySelector(".text"),
                    del = document.querySelector(".del");
                    text.style.width="90%";
                    text.style.textAlign = "left";
                    del.style.display='block';
                    wrap.style.display='block';
            },
            del(){
                 var wrap = document.querySelector(".wrap"),
                    text = document.querySelector(".text"),
                    del = document.querySelector(".del");
                    text.style.width="100%";
                    text.style.textAlign = "center";
                    del.style.display='none';
                    wrap.style.display='none';
            },
            getWrapData (){
                this.$http.jsonp('http://touch.daling.com/api/menu/hot?_=1492072567762').then(function(data){
                    this.wrapData = data.body.data;
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .search{
        width:95%;
        height:0.35rem;
        margin: 0 auto;
        padding:0.05rem 0;
        position: relative;
        input{
            width:100%;
            height:100%;
            border:none;
            outline: none;
            border-radius: 0.25rem;
            text-align: center;
        }
        p{
            position: absolute;
            right:0;
            top:0;
            bottom:0;
            line-height: .35rem;
            font-size: 0.12rem;
            color: #585658;
            display: none;
        }
    }
    .wrap{
        position: absolute;
        top:0.35rem;
        bottom:0;
        left:0;
        right:0;
        background: #fff;
        display: none;
        padding:0.1rem;
        z-index: 10;
        h4{
            font-size: 0.12rem;
            color: #858385;
            line-height: 2;
        }
        div{
            a{
                background:#f7f7f7;
                float:left;
                color: #39383b;
                font-size: 0.12rem;
                padding:0.05rem;
                margin:0.05rem 0.1rem;
            }
        }
    }
</style>