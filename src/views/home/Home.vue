<template>
 <div id="home">
   <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
   <scroll class="content" ref="scroll"
           v-bind:probe-type="3"
           v-bind:pull-up-load="true"
           @scroll="contentScroll"
   @pullingUp="loadMore">
     <home-swiper :banners="banners"/>
     <recommend-view :recommends="recommends"/>
     <feature-view/>
     <tab-control class="tab_control" :titles="['流行','新款','精选']" @tabClick="tabClick"/>
     <good-list :goods="showGoods"/>
   </scroll>
   <back-top @click.native="backClick" v-show="isShowBackTop"/>
 </div>
</template>

<script>

  import HomeSwiper from './childComps/HomeSwiper';
  import RecommendView from './childComps/RecommendView';
  import FeatureView from './childComps/FeatureView';

  import NavBar from 'components/common/navbar/NavBar';
  import TabControl from 'components/content/tabControl/TabControl';
  import GoodList from 'components/content/goods/GoodsList';
  import Scroll from 'components/common/scroll/Scroll';
  import BackTop from 'components/content/backTop/BackTop';


  import {getHomeMultidata,getHomeGoods} from "network/home";


  export default{
      name: "Home.vue",
      components:{
        HomeSwiper,
        RecommendView,
        FeatureView,

        NavBar,
        TabControl,
        GoodList,
        Scroll,
        BackTop,
      },
      data(){
        return{
          banners:[],
          recommends:[],
          goods:{
            'pop':{page:0,list:[]},
            'new':{page:0,list:[]},
            'sell':{page:0,list:[]},
          },
          currentType:'pop',
          isShowBackTop:false,
        }

      },
      computed:{
        showGoods(){
          return this.goods[this.currentType].list
        }
      },
      created() {
        // 请求多个数据
        this.getHomeMultidata();

        // 请求商品数据
        this.getHomeGoods('pop');
        this.getHomeGoods('new');
        this.getHomeGoods('sell');

      },
      methods:{


        /**
         * 网络请求相关方法
         */
        // 请求数据
        getHomeMultidata(){
          getHomeMultidata().then(res=>{
            this.banners = res.data.banner.list;
            this.recommends = res.data.recommend.list;
          })
        },

        // 请求商品数据
        getHomeGoods(type){
          const page = this.goods[type].page + 1;

          getHomeGoods(type,page).then(res=>{

            this.goods[type].list.push(...res.data.list);
            this.goods[type].page += 1;

            // // 图片加载完，刷新scroll内容高度，这样就不会出现内容滚动BUG了
            this.$refs.scroll.scroll.refresh();

            this.$refs.scroll.finishPullUp();


          });
        },

        /**
         * 事件监听相关方法
         */

        tabClick(index){
          console.log(this.currentType);
          switch (index) {
            case 0:
              this.currentType = 'pop';
              break;
            case 1:
              this.currentType = 'new';
              break;
            case 2:
              this.currentType ='sell';
              break;
          }
        },
        backClick(){
          this.$refs.scroll.scrollTo(0,0);
        },
        contentScroll(position){
          this.isShowBackTop = (-position.y)>1000;
        },
        loadMore(){
          console.log('上拉加载更多');
          this.getHomeGoods(this.currentType);
          // // 图片加载完，刷新scroll内容高度，这样就不会出现内容滚动BUG了
          // this.$refs.scroll.scroll.refresh();
        },


      }

  }
</script>

<!--这里有scoped 这里写的样式不会对其它地方同名的起作用-->
<style scoped>

  #home{
    height: 100vh;
    /*padding-top: 44px;*/
    position: relative;
  }
 .home-nav{
   background: var(--color-tint);
   color:#fff;

   position:fixed;
   left:0;
   right:0;
   top:0;
   z-index: 9;
 }

  .tab_control{
    position: sticky;
    top:44px;
    z-index:8;
  }

  .content{
    /*height: calc(100% - 93px);*/
    /*overflow: hidden;*/
    /*margin-top: 44px;*/

    position: absolute;
    top: 44px;
    bottom: 58px;
    left: 0;
    right: 0;
    z-index: 0;

  }
</style>
