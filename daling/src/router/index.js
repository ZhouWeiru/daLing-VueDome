import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/page/home'
import Classify from '@/components/page/classify'
import SpecialOffer from '@/components/page/specialOffer'
import ShopCar from '@/components/page/shopCar'
import Details from '@/components/page/home/details'
import ClassifyList from '@/components/page/classify/list'
import ShopDetail from '@/components/base/shopDetail'
import My from '@/components/page/my/my'
Vue.use(Router)

export default new Router({
  routes: [
    {
			path: "/",
			redirect: '/home'
		},
    {
			path: "/home",
			name: "Home",
			component: Home
		},
    {
      path : "/home/details/:id",
      name: "Details",
			component: Details
    },
    {
			path: "/classify",
			name: "Classify",
			component: Classify
		},
		{
			path: "/classify/list",
			name: "ClassifyList",
			component: ClassifyList
		},
    {
			path: "/specialOffer",
			name: "SpecialOffer",
			component: SpecialOffer
		},
		 {
			path: "/shopCar",
			name: "ShopCar",
			component: ShopCar
		},
		 {
			path: "/shopDetail",
			name: "ShopDetail",
			component: ShopDetail
		},
		{
			path: "/my",
			name: "My",
			component: My
		}
  ]
})
