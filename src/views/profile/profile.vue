<template>
  <section class="profile">
    <topper title="我的"/>
    <transition name="fade">
      <div class="loginTips" v-if="showTips">{{tipsText}}</div>
    </transition>
    <section class="profile-number" @click="isLogin">
      <router-link class="profile-link" :to="userInfo._id ? '/profile' : '/login'">
        <div class="profile_image">
          <i class="iconfont icon-person"></i>
        </div>
        <div class="user-info">
          <p class="user-info-top">{{userInfo.name || userInfo.phone || '登录/注册'}}</p>
          <p>
                <span class="user-icon">
                  <i class="iconfont icon-shouji icon-mobile"></i>
                </span>
            <span class="icon-mobile-number">{{userInfo.phone? '手机已绑定':'手机未绑定'}}</span>
          </p>
        </div>
        <span class="arrow">
          <i class="iconfont icon-jiantou1"></i>
        </span>
      </router-link>
    </section>
    <section class="profile_info_data border-1px">
      <ul class="info_data_list">
        <a href="javascript:" class="info_data_link">
          <span class="info_data_top"><span>0.00</span>元</span>
          <span class="info_data_bottom">我的余额</span>
        </a>
        <a href="javascript:" class="info_data_link">
          <span class="info_data_top"><span>0</span>个</span>
          <span class="info_data_bottom">我的优惠</span>
        </a>
        <a href="javascript:" class="info_data_link">
          <span class="info_data_top"><span>0</span>分</span>
          <span class="info_data_bottom">我的积分</span>
        </a>
      </ul>
    </section>
    <section class="profile_my_order border-1px">
      <!-- 我的订单 -->
      <a href='javascript:' class="my_order">
            <span>
              <i class="iconfont icon-order-s"></i>
            </span>
        <div class="my_order_div">
          <span>我的订单</span>
          <span class="my_order_icon">
                <i class="iconfont icon-jiantou1"></i>
              </span>
        </div>
      </a>
      <!-- 积分商城 -->
      <a href='javascript:' class="my_order">
            <span>
              <i class="iconfont icon-jifen"></i>
            </span>
        <div class="my_order_div">
          <span>积分商城</span>
          <span class="my_order_icon">
                <i class="iconfont icon-jiantou1"></i>
              </span>
        </div>
      </a>
      <!-- vip 会员卡 -->
      <a href="javascript:" class="my_order">
            <span>
              <i class="iconfont icon-vip"></i>
            </span>
        <div class="my_order_div">
          <span> vip 会员卡</span>
          <span class="my_order_icon">
                <i class="iconfont icon-jiantou1"></i>
              </span>
        </div>
      </a>
    </section>
    <section class="profile_my_order border-1px">
      <!-- 服务中心 -->
      <a href="javascript:" class="my_order">
            <span>
              <i class="iconfont icon-fuwu"></i>
            </span>
        <div class="my_order_div">
          <span>服务中心</span>
          <span class="my_order_icon">
                <i class="iconfont icon-jiantou1"></i>
              </span>
        </div>
      </a>
    </section>

    <section class="profile_my_order border-1px">
      <mt-button v-if="userInfo._id" @click="logout" type="danger" style="width: 100%">退出登陆</mt-button>
    </section>
  </section>

</template>

<script>
import topper from '../../components/topper/topper'
import { mapState } from 'vuex'
import { MessageBox } from 'mint-ui'

export default {
  name: 'home',
  data () {
    return {
      showTips: false,
      tipsText: ''
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    logout () {
      MessageBox.confirm('确定登出吗？').then(
        confirm => {
          this.$store.dispatch('userLogout')
          this.tipsText = '登出成功'
          this.showTips = true
          setTimeout(() => {
            this.showTips = false
          }, 600)
          console.log('select:', confirm)
        },
        cancel => {
          console.log('select:', cancel)
        }
      )
    },
    isLogin () {
      if (this.userInfo._id) {
        this.tipsText = '已登录'
        this.showTips = true
        setTimeout(() => {
          this.showTips = false
        }, 600)
      }
    }
  },
  components: {
    topper
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../common/mixins/mixins.less";

  .profile {
    width: 100%;
    overflow: hidden;
    .header {
      background-color: @green;
      position: fixed;
      z-index: 100;
      left: 0;
      top: 0;
      width: 100%;
      height: 45px;
      .header_search {
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        width: 10%;
        height: 50%;
        .icon-sousuo {
          font-size: 25px;
          color: #fff;
        }
      }
      .header_title {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50%;
        color: #fff;
        text-align: center;
        .header_title_text {
          font-size: 20px;
          color: #fff;
          display: block;
        }
      }
      .header_login {
        font-size: 14px;
        color: #fff;
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        .header_login_text {
          color: #fff;
        }
      }
    }
    .profile-number {
      margin-top: 45.5px;
      .profile-link {
        .clearFix();
        position: relative;
        display: block;
        background: @green;
        padding: 20px 10px;
        .profile_image {
          float: left;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          overflow: hidden;
          vertical-align: top;
          .icon-person {
            background: #e4e4e4;
            font-size: 62px;
          }
        }
        .user-info {
          float: left;
          margin-top: 8px;
          margin-left: 15px;
          p {
            font-weight: 700;
            font-size: 18px;
            color: #fff;
            &.user-info-top {
              padding-bottom: 8px;
            }
            .user-icon {
              display: inline-block;
              margin-left: -15px;
              margin-right: 5px;
              width: 20px;
              height: 20px;
              .icon-mobile {
                font-size: 30px;
                vertical-align: text-top;
              }
            }
            .icon-mobile-number {
              margin-left: 5px;
              font-size: 14px;
              color: #fff;
            }
          }
        }
        .arrow {
          width: 12px;
          height: 12px;
          position: absolute;
          right: 15px;
          top: 40%;
          .icon-jiantou1 {
            color: #fff;
            font-size: 5px;
          }
        }
      }
    }
    .profile_info_data {
      .bottom-border-1px(#e4e4e4);
      width: 100%;
      background: #fff;
      overflow: hidden;
      .info_data_list {
        .clearFix();
        .info_data_link {
          float: left;
          width: 33%;
          text-align: center;
          border-right: 1px solid #f1f1f1;
          .info_data_top {
            display: block;
            width: 100%;
            font-size: 14px;
            color: #333;
            padding: 15px 5px 10px;
            span {
              display: inline-block;
              font-size: 30px;
              color: #f90;
              font-weight: 700;
              line-height: 30px;
            }
          }
          .info_data_bottom {
            display: inline-block;
            font-size: 14px;
            color: #666;
            font-weight: 400;
            padding-bottom: 10px;
          }
        }
        .info_data_link:nth-of-type(2) {
          .info_data_top {
            span {
              color: #ff5f3e;
            }
          }
        }
        .info_data_link:nth-of-type(3) {
          border: 0;
          .info_data_top {
            span {
              color: #6ac20b;
            }
          }
        }
      }
    }
    .profile_my_order {
      .top-border-1px(#e4e4e4);
      margin-top: 10px;
      background: #fff;
      .my_order {
        display: flex;
        align-items: center;
        padding-left: 15px;
        > span {
          display: flex;
          align-items: center;
          width: 20px;
          height: 20px;
          > .iconfont {
            margin-left: -10px;
            font-size: 30px;
          }
          .icon-order-s {
            color: @green;
          }
          .icon-jifen {
            color: #ff5f3e;
          }
          .icon-vip {
            color: #f90;
          }
          .icon-fuwu {
            color: @green;
          }
        }
        .my_order_div {
          width: 100%;
          border-bottom: 1px solid #f1f1f1;
          padding: 18px 10px 18px 0;
          font-size: 16px;
          color: #333;
          display: flex;
          justify-content: space-between;
          span {
            display: block;
          }
          .my_order_icon {
            width: 10px;
            height: 10px;
            .icon-jiantou1 {
              color: #bbb;
              font-size: 10px;
            }
          }
        }
      }
    }
    .loginTips {
      position: absolute;
      width: 95px;
      height: 45px;
      top: 300px;
      left: 50%;
      -webkit-transform: translateX(-50%);
      -moz-transform: translateX(-50%);
      -ms-transform: translateX(-50%);
      -o-transform: translateX(-50%);
      transform: translateX(-50%);
      color: #ffff;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      background-color: #000000;
      opacity: 55%;
      text-align: center;
      line-height: 45px;
      z-index: 50;
      &.fade-enter-active, &.fade-leave-active {
        -webkit-transition: all .3s;
        -moz-transition: all .3s;
        -ms-transition: all .3s;
        -o-transition: all .3s;
        transition: all .3s;
      }
      &.fade-enter, &.fade-leave-to {
        opacity: 0;
      }
    }
  }
</style>
