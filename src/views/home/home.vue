<template>
  <section class="msite">
    <!--首页头部-->
    <!--<topper :title="address.name">-->
    <topper title="address数据">
      <router-link class="header_search" slot="left" to="/search">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <!--<router-link class="header_login" slot="right" :to="userInfo._id ? '/userinfo': '/login'">-->
      <router-link class="header_login" slot="right" to="/profile">
        <!--<span class="header_login_text" v-if="!userInfo._id">-->
        <span class="header_login_text">
          登录|注册
        </span>
        <!--<span class="header_login_text" v-else>-->
        <span class="header_login_text">
           <i class="iconfont icon-person"></i>
        </span>
      </router-link>
    </topper>
    <div class="miste-content-wrapper">
      <div class="miste-content">
        <!--首页导航-->
        <nav class="msite_nav">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <a href="javascript:;" class="link_to_food">
                  <div class="food_container">
                    <img src="">
                  </div>
                  <span></span>
                </a>
              </div>
              <div class="swiper-slide">
                <a href="javascript:;" class="link_to_food">
                  <div class="food_container">
                    <img src="">
                  </div>
                  <span></span>
                </a>
              </div>

            </div>
            <!-- 分页器 -->
            <div class="swiper-pagination"></div>
          </div>
          <img src="./images/msite_back.svg" alt="back">
        </nav>
        <!--首页附近商家-->
        <div class="msite_shop_list">
          <div class="shop_header">
            <i class="iconfont icon-xuanxiang"></i>
            <span class="shop_header_title">附近商家</span>
          </div>
          <shoplist/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import topper from '../../components/topper/topper'
import shoplist from '../../components/shoplist/shoplist'
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
import 'swiper/js/swiper.min'

export default {
  name: 'home',
  mounted () {
    /** 下方这个注释用于避开 eslint */
    /* eslint-disable no-new */
    new Swiper('.swiper-container', {
      loop: true,
      pagination: {
        el: '.swiper-pagination'
      },
      paginationType: 'fraction',
      paginationElement: 'span'
    })
  },
  components: { topper, shoplist }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../common/mixins/mixins";

  .msite {
    width: 100%;
    .miste-content-wrapper {
      position: fixed;
      top: 45px;
      bottom: 46px;
      width: 100%;
      .msite_nav {
        .bottom-border-1px(#e4e4e4);
        margin-top: 15px;
        height: 200px;
        background: #fff;
        .swiper-container {
          width: 100%;
          height: 100%;
          .swiper-wrapper {
            width: 100%;
            height: 100%;
            .swiper-slide {
              display: flex;
              justify-content: center;
              align-items: flex-start;
              flex-wrap: wrap;
              .link_to_food {
                width: 25%;
                .food_container {
                  display: block;
                  width: 100%;
                  text-align: center;
                  padding-bottom: 10px;
                  font-size: 0;
                  img {
                    display: inline-block;
                    width: 50px;
                    height: 50px;
                  }
                }
                span {
                  display: block;
                  width: 100%;
                  text-align: center;
                  font-size: 13px;
                  color: #666;
                }
              }
            }
          }
          .swiper-pagination {
            .swiper-pagination-bullet-active {
              background-color: #02a774;
            }
          }

        }
      }
      .msite_shop_list {
        .top-border-1px(#e4e4e4);
        margin-top: 10px;
        background: #fff;
        .shop_header {
          padding: 10px 10px 0;
          .shop_icon {
            margin-left: 5px;
            color: #999;
          }
          .shop_header_title {
            color: #999;
            font-size: 14px;
            line-height: 20px;
          }
        }
      }
    }
  }
</style>
