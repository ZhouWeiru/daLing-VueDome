<template>
    <div>
        <div class='login' v-if='!flg'>
            <form>
                <label><input type='text' placeholder="请输入手机号" v-model="text"></label>
                <label><input type='text' placeholder="请输入短信验证码" v-model="num"><button @click='getVerification($event)'>获取短信验证码</button></label>
                <label><input type='button' value="登录" class='btn' @click='login'></label>
            </form>
        </div>
        <div v-else-if='flg' class='user'>
            <div class='user-content'>
                <h3>
                        <span>我的订单</span>
                        <span>查看全部订单></span>
                    </h3>
                <nav class='user-nav'>
                    <a href="javascript:;">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAVRJREFUeNrsmbtKxEAUhs8saVIo2ESWkELfQKy3sbNIFfAFVvIONgvBwlfYFNZh6xQ2Wm0v1im0iEElYKFFynjOkgGL3aTaZAL/gW8uzBQfw9wyUXVd09hiQiMMSPcVKgzDS87vmanhrh/MPI7jh8lIhKlxFFey/gkrw6Vr7YqFCGlIQxrSm1g3e+MQrMc40q0HndXSNsOchjSkIQ1pSO9L+ohZMu8tx+4PE/UlbXW0HzJPzFlHvwNmwTx23Rv6kL4RYcdxKAgCknxbJElCWZZJ8diE6XElie/7O4XlLTDPc119Hlr6hDm1bZtc193ZqSgKqqpKim/M69DS55J4nkdKbb8plmVJaZrq6sqEhfgliczVKOrcGF6YO1O+XG6Z35Y+30zMXDTbnhFb3qIBJyKkIb3nhSgv7NPm4mN6fOqRvtYVw6Ng5ptHEfxHhDSkh48/AQYAOgdpIUWPZRcAAAAASUVORK5CYII" />
                        <span>代付款</span>
                    </a>
                    <a href="javascript:;">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAVRJREFUeNrsmbtKxEAUhs8saVIo2ESWkELfQKy3sbNIFfAFVvIONgvBwlfYFNZh6xQ2Wm0v1im0iEElYKFFynjOkgGL3aTaZAL/gW8uzBQfw9wyUXVd09hiQiMMSPcVKgzDS87vmanhrh/MPI7jh8lIhKlxFFey/gkrw6Vr7YqFCGlIQxrSm1g3e+MQrMc40q0HndXSNsOchjSkIQ1pSO9L+ohZMu8tx+4PE/UlbXW0HzJPzFlHvwNmwTx23Rv6kL4RYcdxKAgCknxbJElCWZZJ8diE6XElie/7O4XlLTDPc119Hlr6hDm1bZtc193ZqSgKqqpKim/M69DS55J4nkdKbb8plmVJaZrq6sqEhfgliczVKOrcGF6YO1O+XG6Z35Y+30zMXDTbnhFb3qIBJyKkIb3nhSgv7NPm4mN6fOqRvtYVw6Ng5ptHEfxHhDSkh48/AQYAOgdpIUWPZRcAAAAASUVORK5CYII" />
                        <span>代付款</span>
                    </a>
                    <a href="javascript:;">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAVRJREFUeNrsmbtKxEAUhs8saVIo2ESWkELfQKy3sbNIFfAFVvIONgvBwlfYFNZh6xQ2Wm0v1im0iEElYKFFynjOkgGL3aTaZAL/gW8uzBQfw9wyUXVd09hiQiMMSPcVKgzDS87vmanhrh/MPI7jh8lIhKlxFFey/gkrw6Vr7YqFCGlIQxrSm1g3e+MQrMc40q0HndXSNsOchjSkIQ1pSO9L+ohZMu8tx+4PE/UlbXW0HzJPzFlHvwNmwTx23Rv6kL4RYcdxKAgCknxbJElCWZZJ8diE6XElie/7O4XlLTDPc119Hlr6hDm1bZtc193ZqSgKqqpKim/M69DS55J4nkdKbb8plmVJaZrq6sqEhfgliczVKOrcGF6YO1O+XG6Z35Y+30zMXDTbnhFb3qIBJyKkIb3nhSgv7NPm4mN6fOqRvtYVw6Ng5ptHEfxHhDSkh48/AQYAOgdpIUWPZRcAAAAASUVORK5CYII" />
                        <span>代付款</span>
                    </a>
                    <a href="javascript:;">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAVRJREFUeNrsmbtKxEAUhs8saVIo2ESWkELfQKy3sbNIFfAFVvIONgvBwlfYFNZh6xQ2Wm0v1im0iEElYKFFynjOkgGL3aTaZAL/gW8uzBQfw9wyUXVd09hiQiMMSPcVKgzDS87vmanhrh/MPI7jh8lIhKlxFFey/gkrw6Vr7YqFCGlIQxrSm1g3e+MQrMc40q0HndXSNsOchjSkIQ1pSO9L+ohZMu8tx+4PE/UlbXW0HzJPzFlHvwNmwTx23Rv6kL4RYcdxKAgCknxbJElCWZZJ8diE6XElie/7O4XlLTDPc119Hlr6hDm1bZtc193ZqSgKqqpKim/M69DS55J4nkdKbb8plmVJaZrq6sqEhfgliczVKOrcGF6YO1O+XG6Z35Y+30zMXDTbnhFb3qIBJyKkIb3nhSgv7NPm4mN6fOqRvtYVw6Ng5ptHEfxHhDSkh48/AQYAOgdpIUWPZRcAAAAASUVORK5CYII" />
                        <span>代付款</span>
                    </a>
                    <a href="javascript:;">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAVRJREFUeNrsmbtKxEAUhs8saVIo2ESWkELfQKy3sbNIFfAFVvIONgvBwlfYFNZh6xQ2Wm0v1im0iEElYKFFynjOkgGL3aTaZAL/gW8uzBQfw9wyUXVd09hiQiMMSPcVKgzDS87vmanhrh/MPI7jh8lIhKlxFFey/gkrw6Vr7YqFCGlIQxrSm1g3e+MQrMc40q0HndXSNsOchjSkIQ1pSO9L+ohZMu8tx+4PE/UlbXW0HzJPzFlHvwNmwTx23Rv6kL4RYcdxKAgCknxbJElCWZZJ8diE6XElie/7O4XlLTDPc119Hlr6hDm1bZtc193ZqSgKqqpKim/M69DS55J4nkdKbb8plmVJaZrq6sqEhfgliczVKOrcGF6YO1O+XG6Z35Y+30zMXDTbnhFb3qIBJyKkIb3nhSgv7NPm4mN6fOqRvtYVw6Ng5ptHEfxHhDSkh48/AQYAOgdpIUWPZRcAAAAASUVORK5CYII" />
                        <span>代付款</span>
                    </a>
                </nav>
                <ul>
                <li>收藏宝贝</li>
                <li>收藏宝贝</li>
                <li>收藏宝贝</li>
                <li>收藏宝贝</li>
                <li>收藏宝贝</li>
                <li>收藏宝贝</li>
                <li>收藏宝贝</li>
                </ul>
                <p class='outLogin' @click="outLogin">退出登录</p>
            </div>
            <footer-bar></footer-bar>
        </div>
    </div>
</template>


<script>
    import footerBar from '@/components/base/footer';
    export default{
        data(){
            return {
                nums : "",
                text : "",
                num : "",
                flg : false
            }  
        },
        created(){
            if(window.localStorage['phone']){
                this.flg = true;
            }else{
                this.flg = false;
            }
        },
        methods: {
            getVerification(e){
                var verification = document.querySelector(".verification"),
                    arr = [],
                    num = 60,
                    timer = null,
                    that = this;
                for(var i=0;i<5;i++){
                    arr.push(Math.floor(Math.random()*10));
                }
                this.nums = arr.join("");
                timer = setInterval(function(){
                    num -- ;
                    e.target.innerHTML = num+"秒后从新获取验证码";
                    e.target.disabled = true;
                     if(num == 0){
                        clearInterval(timer);
                        e.target.disabled = false;
                        e.target.innerHTML = "获取短信验证码";
                    }
                },1000);
                this.$msgbox({
                    title: '验证码为:',
                    message: that.nums,
                    showCancelButton: false,
                    showConfirmButton : false,
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                        instance.confirmButtonLoading = true;
                        instance.confirmButtonText = '执行中...';
                        setTimeout(() => {
                            done();
                            setTimeout(() => {
                            instance.confirmButtonLoading = false;
                            }, 300);
                        }, 3000);
                        } else {
                        done();
                        }
                    }
                    })
            },
            login (){
                var inputBox = document.querySelectorAll("input"),
                    reg = /^(((1[0-9][0-9]{1})|(15[0-9]{1}))+\d{8})$/;
                    if(this.text.value == "" && this.num.value == ""){
                        alert("不能问空");
                        return false;
                    }
                    if(!reg.test(this.text)){
                        alert("请输入正确手机号")
                        return false;
                    }
                    if(this.nums != this.num){
                        alert("请输入正确的验证码");
                    }
                    window.localStorage['phone'] = this.text;
                    this.flg = true;
            },
            outLogin(){
                var boon = confirm("是否要退出");
                if(boon){
                    window.localStorage.clear();
                }
            }
        },
        components : {
            footerBar
        }
        
    }
</script>


<style lang="less">
    .login{
        form{
            padding:0.1rem;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            margin-bottom: 0.1rem;
            label{
                width:100%;
                display: block;
                position: relative;
                input{
                    padding: 0 0.1rem;
                    width:100%;
                    display: block;
                    margin-bottom: 0.1rem;
                    outline:none;
                    border:none;
                    height:0.45rem;
                    &.btn{
                        background: #c5c5c5;
                        color:#fff;
                        font-size: 0.16rem;
                    }
                }
                button{
                    padding:0 0.1rem;
                    position: absolute;
                    right:0;
                    top:0;
                    line-height: 0.44rem;
                    background: #b349bd;
                    color:#fff;
                    border:none;
                    outline: none;
                }
            }
        }
    }
    .el-message-box{
        width:100%;
        .el-message-box__message{
            p{
                text-align: center;
                font-size: 0.18rem;
            }
        }
    }
    .user {
        padding-bottom:.44rem;
        background: #fff;
        .user-info {
            height: 0.75rem;
            padding: .1rem;
            margin-bottom: 0.1rem;
            dl {
                width: 100%;
                display: -webkit-box;
                -webkit-box-align: center;
                dt {
                    width: .5rem;
                    height: .5rem;
                    margin-right: 0.1rem;
                    img {
                        display: block;
                        width: 100%;
                    }
                }
                dd {
                    font-size: 0.16rem;
                }
            }
        }
        .user-content {
            width: 100%;
            h3 {
                position: relative;
                height: .44rem;
                line-height: .44rem;
                display: -webkit-box;
                -webkit-box-pack: justify;
                padding: 0 .1rem;
                background: #fff;
                span {
                    display: block;
                    &:nth-child(2) {
                        color: #999;
                    }
                }
                &:after {
                    content: "";
                    width: 100%;
                    height: 1px;
                    background: #999;
                    position: absolute;
                    left: 0;
                    bottom: 0;
                }
            }
            .user-nav {
                display: -webkit-box;
                padding: .1rem 0;
                background: #fff;
                margin-bottom: .1rem;
                a {
                    display: block;
                    width: 0;
                    -webkit-box-flex: 1;
                    display: -webkit-box;
                    -webkit-box-align: center;
                    -webkit-box-orient: vertical;
                    img {
                        display: block;
                        width: .25rem;
                        height: .25rem;
                        margin-bottom: 0.05rem;
                    }
                    span {
                        display: block;
                        font-size: 0.12rem;
                        color: #242424;
                    }
                }
            }
            ul{
                width:100%;
                background: #fff;
                margin-bottom: .1rem;
                li{
                    height:.44rem;
                    position: relative;
                    line-height: .44rem;
                    padding:0 0.2rem;
                    &:after {
                        content: "";
                        width: 100%;
                        height: 1px;
                        background: #999;
                        position: absolute;
                        left: 0;
                        bottom: 0;
                    }
                }
            }
            .outLogin{
                width:95%;
                margin:0 auto;
                height:.44rem;
                text-align: center;
                line-height: .44rem;
                background: #fff;
            }
        }
    }
</style>




