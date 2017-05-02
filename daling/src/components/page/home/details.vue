<template>
    <div class='details-content'>
        <div v-if='HomeDetails'>
            <div class='pic-box'>
                <img :src='HomeDetails.blogo' />
            </div>
            <div class='getDiscount'>
                <h3>手机号领取 即可使用</h3>
                <form>
                    <label>
                        <input type='number' placeholder="请输入手机号"/>
                    </label>
                    <label>
                        <input type='text' placeholder="请输入短信验证码" />
                        <p>获取短信验证码</p>
                    </label>
                    <label>
                        <input type='button' value='马上领取' class='btn'/>
                    </label>
                </form>
            </div>
        </div>
    </div>
</template>


<script>
    export default{
        data(){
            return {
                HomeDetails : {}
            }
        },
        created () {
            this.getHomeDetails();
        },
        methods: {
            getHomeDetails(){
                if(this.$route.params.id < 1000){
                    this.$http.jsonp("http://touch.daling.com/api/activity/info?id="+this.$route.params.id+"&ac=&_=1492156283013").then(function(data){
                        var res = data.body.data;
                        this.HomeDetails = res;
                    })
                }else{
                    this.HomeDetails = null;
                }
            }
        }
    }
</script>


<style lang="less" scoped>
    .details-content{
        padding:0.1rem;
        .pic-box{
            width:100%;
            margin-bottom: 0.2rem;
            img{
                display: block;
                width: 100%;
            }
        }
        .getDiscount{
            width:100%;
            background: #ed5a45;
            padding:0.2rem 0;
            border-radius: 5px;
            h3{
                text-align: center;
                line-height: 2;
                color:#fff;
                margin-bottom: 0.1rem;
            }
            form{
                padding:0.1rem;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                label{
                    position: relative;
                    -webkit-box-flex:1;
                    display: block;
                    height:0.4rem;
                    margin-bottom: 0.1rem;
                    color:#fff;
                    display: block;
                    p{
                        position: absolute;
                        right:0;
                        top:0;
                        bottom:0;
                        line-height: 0.44rem;
                    }
                    input{
                        height:100%;
                        width:100%;
                        display: block;
                        border:none;
                        outline: none;
                        background: transparent;
                        color:#fff;
                        &::-webkit-input-placeholder{
                            color:#FFF;
                        }
                        &.btn{
                            background: #fff;
                            color:#ed5a45;
                            border:none;
                        }
                    }
                    &:after{
                        content: '';
                        bottom: 0;
                        height: 1px;
                        width: 100%;
                        background: #ccc;
                        position: absolute;
                        left: 0;
                    }
                }
            }
        }
    }
</style>