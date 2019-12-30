<template>
  <section class="msite">
    <!--首页头部-->
    <topper :title="userInfo._id? addressMock.name : '登录后显示地址'">
      <router-link class="header_search" slot="left" to="/search">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link class="header_login" slot="right" :to="userInfo._id? '/profile' : '/login'">
        <span class="header_login_text" v-if="userInfo._id">
          <i class="iconfont icon-person"></i>
        </span>
        <span class="header_login_text" v-else>
          登录|注册
        </span>
      </router-link>
    </topper>
    <div class="miste-content-wrapper">
      <div class="miste-content">
        <!--首页导航-->
        <nav class="msite_nav">
          <div class="swiper-container" v-if="categorysArr.length">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(categorys,index) in categorysArr" :key="index">
                <a href="javascript:;" class="link_to_food" v-for="(cate,index) in categorys" :key="index">
                  <div class="food_container">
                    <img :src="baseImagesUrl+cate.image_url">
                  </div>
                  <span>{{cate.title}}</span>
                </a>
              </div>

            </div>
            <!-- 分页器 -->
            <div class="swiper-pagination"></div>
          </div>
          <img v-else src="./images/msite_back.svg" alt="back">
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
import { mapState, mapActions } from 'vuex'
import topper from '../../components/topper/topper'
import shoplist from '../../components/shoplist/shoplist'
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
import 'swiper/js/swiper.min'

export default {
  name: 'home',
  data () {
    return {
      baseImagesUrl: 'https://fuss10.elemecdn.com'
    }
  },
  mounted () {
    this.getAddress()
    this.getCategorys()
    this.getShops()
  },
  computed: {
    ...mapState(['address', 'addressMock', 'categorys', 'userInfo']),
    categorysArr () {
      let arr = []
      let minArr = []
      const { categorys } = this
      categorys.forEach(c => {
        minArr.push(c)
        if (minArr.length === 8) {
          arr.push(minArr)
          minArr = []
        }
      })
      minArr = null
      return arr
    }
  },
  watch: {
    categorysArr (newvalue) {
      this.$nextTick(() => {
        /** 下方这个注释用于避开 eslint */
        /* eslint-disable */
        new Swiper('.swiper-container', {
          loop: true,
          pagination: {
            el: '.swiper-pagination'
          },
          paginationType: 'fraction',
          paginationElement: 'span'
        })
      })
    }
  },
  methods: {
    ...mapActions(['getAddress', 'getCategorys', 'getShops'])
  },
  components: { topper, shoplist }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../common/mixins/mixins";

  .msite {
    width: 100%;
    .miste-content-wrapper {
      margin-top: 50px;
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
              background-color: @green;
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
