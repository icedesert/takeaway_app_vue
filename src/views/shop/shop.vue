<template>
  <div>
    <shop-header/>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/shop/goods" replace>点餐</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/rating" replace>评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/info" replace>商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import shopHeader from '../../components/shopHeader/shopHeader'

export default {
  name: 'shop',
  mounted () {
    this.$store.dispatch('getShopInfo')
  },
  components: {
    shopHeader
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../common/mixins/mixins.less";

  .tab {
    height: 40px;
    line-height: 40px;
    background: #fff;
    .bottom-border-1px(rgba(7, 17, 27, 0.1));
    .tab-item {
      float: left;
      width: 33.33333%;
      text-align: center;
      font-size: 14px;
      color: rgb(77, 85, 93);
      a {
        display: block;
        position: relative;
        &.router-link-active {
          color: @green;
          &::after {
            content: '';
            position: absolute;
            left: 50%;
            bottom: 1px;
            width: 35px;
            height: 2px;
            transform: translateX(-50%);
            background: @green;
          }
        }
      }
    }
  }
</style>
