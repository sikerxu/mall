import Vue from 'vue';
import VueRouter from 'vue-router';

// 插件在npm中安装 npm install vue-router --save

// 安装插件
Vue.use(VueRouter);

const Home = () => import('../views/home/Home');
const Category = () => import('../views/category/Category');
const Cart = () => import('../views/cart/Cart');
const Profile = () => import('../views/profile/Profile');



// 创建router
const routes =[
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
]


const router = new VueRouter({
  routes,
  mode:'history',
});

// 导出
export default router;
