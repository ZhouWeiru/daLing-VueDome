// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import Vuex from 'vuex'
Vue.use(VueResource);
Vue.use(ElementUI);
Vue.use(Vuex);
Vue.config.productionTip = false
Vue.directive('scroll', {
  bind: function (el, binding, vnode) {
    window.onscroll = function(){
      var navBarTop = el.parentNode.offsetTop,
          scrollTop = document.body.scrollTop;
          if(navBarTop < scrollTop){
            el.style.position = "fixed";
            el.style.top = "0";
          }else{
            el.style.position = "static";
          }
    }
  }
})


const store = new Vuex.Store({
  state: {
    loadingShow: false,
    cartList : [],
    nums : ""
  },
  mutations: {
    showLoading (state,n) {
      state.loadingShow = n;
    },
    setCartList ( state, data ){
      state.cartList = data;
    },
    addCartList ( state,data ){
      //var res  = data;
      var isHase = false;
      state.cartList.forEach(function(item) {
        if( item.shopId == data.shopId ){
          isHase = true;
          if( item.num  ){
            item.num += 1;
          }else{
            item.num = 2;
          }
        }
      });
      if( !isHase ){
        state.cartList.push(data)
      }
      window.localStorage["cartList"] =  JSON.stringify( state.cartList );
    },
    addNums (state){
      state.nums = null;
       var data = JSON.parse(  window.localStorage["cartList"] );
       for(var i=0;i<data.length;i++){
         if(data[i].num){
            state.nums+=data[i].num;
         }else{
           state.nums+=1;
         }
       }
    },
    addNum (state,index){
      state.nums+=1;
      state.cartList[index].num+=1;
      window.localStorage["cartList"] =  JSON.stringify( state.cartList );
    },
    jianNum(state,index){
      state.nums-=1;
      if(state.cartList[index].num < 2){
        return false;
      }else{
        state.cartList[index].num-=1;
      }
      window.localStorage["cartList"] =  JSON.stringify( state.cartList );
    },
    setNums (state,num){
      state.nums = num ;
    },
    setType (state,index){
      if(state.cartList[index].type == 1){
        state.cartList[index].type = 2;
      }else{
        state.cartList[index].type = 1;
      }
      console.log(state.cartList)
      window.localStorage["cartList"] =  JSON.stringify( state.cartList );
    }
  },
  actions : {
    getCartList (context) {
      var data = JSON.parse(  window.localStorage["cartList"] );
      if( data ){
        context.commit('setCartList',data)
      }
    },
    getNums (context){
       var data = JSON.parse(  window.localStorage["cartList"] ),
          str = null;
        for(var i=0;i<data.length;i++){
         if(data[i].num){
            str=str+Number(data[i].num);
         }else{
           str+=1;
         }
       }
       context.commit('setNums',str);
    }
  }
});

//拦截器
Vue.http.interceptors.push(
  function (request, next){
    store.commit('showLoading',true)
    next(function(response){
      store.commit('showLoading',false)
      return response;
    })
  }
);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  store,
  components: { App },
  created(){
    this.$store.dispatch("getCartList");
    this.$store.dispatch('getNums');
  }
})
