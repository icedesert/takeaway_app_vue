<template>
  <section class="search">
    <topper title="搜索"/>
    <form class="search_form" @submit.prevent="search">
      <input type="search" placeholder="请输入商家名称" class="search_input" v-model="keyword">
      <input type="submit" class="search_submit">
    </form>
    <section class="list" v-if="searchResult">
      <ul class="list_container">
        <!--:to="'/shop?id='+item.id"-->
        <router-link :to="{path:'/shop', query:{id:shop.id}}" tag="li" class="list_li" v-for="(shop,index) in searchShops" :key="index">
          <section class="item_left">
            <img :src="imgBaseUrl+shop.image_path" class="restaurant_img">
          </section>
          <section class="item_right">
            <div class="item_right_text">
              <p>
                <span>{{shop.name}}</span>
              </p>
              <p>月售 {{shop.month_sales || shop.recent_order_num}} 单</p>
              <p>{{shop.delivery_fee || shop.float_minimum_order_amount}} 元起送 / 距离{{shop.distance}}</p>
            </div>
          </section>
        </router-link>
      </ul>
    </section>
    <div class="search_none" v-if="!searchResult">无搜索结果</div>
  </section>

</template>

<script>
import topper from '../../components/topper/topper'
import { mapState } from 'vuex'

export default {
  name: 'home',
  data () {
    return {
      keyword: '',
      imgBaseUrl: 'http://cangdu.org:8001/img/',
      searchResult: true
    }
  },
  components: {
    topper
  },
  computed: {
    ...mapState(['searchShops'])
  },
  watch: {
    searchShops (newValue) {
      if (newValue.length > 0) {
        this.searchResult = true
      } else {
        this.searchResult = false
      }
    }
  },
  methods: {
    search () {
      const keyword = this.keyword.trim()
      if (keyword.length > 0) {
        this.$store.dispatch('getSearchShops', keyword)
      }
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../common/mixins/mixins.less";

  .search {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .search_form {
      .clearFix();
      margin-top: 45px;
      background-color: #fff;
      padding: 12px 8px;
      input {
        height: 35px;
        padding: 0 4px;
        border-radius: 2px;
        font-weight: bold;
        outline: none;
        &.search_input {
          float: left;
          width: 79%;
          border: 4px solid #f2f2f2;
          font-size: 14px;
          color: #333;
          background-color: #f2f2f2;
        }
        &.search_submit {
          float: right;
          width: 18%;
          border: 4px solid @green;
          font-size: 16px;
          color: #fff;
          background-color: @green;
        }
      }
    }
    .list {
      .list_container {
        background-color: #fff;
        .list_li {
          display: flex;
          justify-content: center;
          padding: 10px;
          border-bottom: 1px solid @bc;
          .item_left {
            margin-right: 10px;
            .restaurant_img {
              width: 50px;
              height: 50px;
              display: block;
            }
          }
          .item_right {
            font-size: 12px;
            flex: 1;
            .item_right_text {
              p {
                line-height: 12px;
                margin-bottom: 6px;
                &:last-child {
                  margin-bottom: 0;
                }
              }
            }
          }
        }
      }
    }
    .search_none {
      margin: 0.125rem auto 0 auto;
      color: #333;
      background-color: #fff;
      text-align: center;
    }
  }
</style>
