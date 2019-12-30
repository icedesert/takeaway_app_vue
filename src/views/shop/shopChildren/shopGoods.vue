<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul ref="menuUl">
        <li class="menu-item" v-for="(good, index) in shopGoods" :key="index"
            :class="{current: index == currentIndex}" @click="clickMenuItem(index)">
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon">
              {{good.name}}
            </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper">
      <ul ref="foodsUl">
        <li class="food-list-hook" v-for="(good, index) in shopGoods" :key="index">
          <h1 class="title">{{good.name}}</h1>
          <ul>
            <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods"
                :key="index">
              <div class="icon" @click="showFood(food)">
                <img width="57" height="57" v-lazy="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <!-- cart + - -->
                <div class="cartcontrol-wrapper">
                  <cart-control :food="food"/>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- 下方购物车 -->
    <shop-cart/>
    <transition name="fade">
      <show-food-image :food="food" ref="showFood"/>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BScroll from 'better-scroll'
import cartControl from '../../../components/cartControl/cartControl'
import showFoodImage from '../../../components/showFoodImage/showFoodImage'
import shopCart from '../../../components/shopCart/shopCart'

export default {
  name: 'shopRating',
  data () {
    return {
      scrollY: 0,
      tops: [],
      menuTops: [],
      food: {},
      foodNamesTemp: []
    }
  },
  mounted () {
    this.$store.dispatch('getShopGoods', () => {
      this.$nextTick(() => {
        this._initScroll()
        this._initMenuTops()
        this._initTops()
        const localCartFoods = JSON.parse(localStorage.getItem('cartFoods'))
        if (localCartFoods.length > 0) {
          if (this.cartFoods.length > 0) {
            this.$store.dispatch('clearCart')
          }
          const { shopGoods } = this
          localCartFoods.forEach(localFood => {
            shopGoods.forEach(good => {
              good.foods.forEach(food => {
                let foodName = food.name
                let localFoodName = localFood.name
                if (foodName === localFoodName && this.foodNamesTemp.indexOf(foodName) === -1) {
                  this.foodNamesTemp.push(foodName)
                  for (let i = 0; i < localFood.count; i++) {
                    this.$store.dispatch('updateFoodCount', { isAdd: true, food: food })
                  }
                }
              })
            })
          })
          this.foodNamesTemp = []
        }
      })
    })
  },
  computed: {
    ...mapState(['shopGoods', 'cartFoods']),
    currentIndex () {
      const { scrollY, tops } = this
      const scrollYFix = scrollY + 150
      const index = tops.findIndex((top, index) => {
        return scrollYFix >= top && scrollYFix < tops[index + 1]
      })
      return index
    }
  },
  methods: {
    _initScroll () {
      /* eslint-disable */
      new BScroll('.menu-wrapper', {
        click: true
      })
      this.foodsScroll = new BScroll('.foods-wrapper', {
        probeType: 2,
        click: true
      })
      /** 在 probeType:2 时，只在触摸滑动时派发 scroll 事件 */
      this.foodsScroll.on('scroll', ({ x, y }) => {
        this.scrollY = Math.abs(y)
      })
      /** 而在滑动结束时，会有 scrollEnd 事件产生，所以可以通过对 scrollEnd 事件的监听来改变 scrollY 为最新的 scroll 高度 */
      this.foodsScroll.on('scrollEnd', ({ x, y }) => {
        this.scrollY = Math.abs(y)
      })
    },
    _initTops () {
      let top = 0
      this.tops.push(top)
      const lis = this.$refs.foodsUl.getElementsByClassName('food-list-hook')
      lis.forEach(li => {
        top += li.clientHeight
        this.tops.push(top)
      })
    },
    _initMenuTops () {
      let top = 0
      this.menuTops.push(top)
      const lis = this.$refs.menuUl.getElementsByClassName('menu-item')
      lis.forEach(li => {
        top += li.clientHeight
        this.menuTops.push(top)
      })
    },
    clickMenuItem (index) {
      const y = this.tops[index]
      this.scrollY = y
      this.foodsScroll.scrollTo(0, -y, 300)
    },
    showFood (food) {
      this.food = food
      this.$refs.showFood.toggleShow()
    }
  },
  components: {
    cartControl,
    showFoodImage,
    shopCart
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../common/mixins/mixins.less";

  .goods {
    display: flex;
    position: absolute;
    top: 195px;
    bottom: 46px;
    width: 100%;
    background: #fff;
    overflow: hidden;
    .menu-wrapper {
      flex: 0 0 80px;
      width: 80px;
      background: #eff1f3;
      .menu-item {
        display: table;
        height: 54px;
        width: 56px;
        padding: 0 12px;
        line-height: 14px;
        &.current {
          position: relative;
          z-index: 10;
          margin-top: -1px;
          background: #fff;
          color: @green;
          font-weight: 700;
          .text {
            //.border-none();
            border: 0px;
          }
        }
        .icon {
          display: inline-block;
          vertical-align: top;
          width: 12px;
          height: 12px;
          margin-right: 2px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
        }
        .text {
          display: table-cell;
          width: 56px;
          vertical-align: middle;
          .bottom-border-1px(rgba(7, 17, 27, 0.1));
          font-size: 12px;
        }
      }
    }
    .foods-wrapper {
      flex: 1;
      .title {
        padding-left: 14px;
        height: 26px;
        line-height: 26px;
        border-left: 2px solid #d9dde1;
        font-size: 12px;
        color: rgb(147, 153, 159);
        background: #f3f5f7;
      }
      .food-item {
        display: flex;
        margin: 18px;
        padding-bottom: 18px;
        .bottom-border-1px(rgba(7, 17, 27, 0.1));
        &:last-child {
          border: 0px;
          margin-bottom: 0;
        }
        .icon {
          flex: 0 0 57px;
          margin-right: 10px;
        }
        .content {
          flex: 1;
          .name {
            margin: 2px 0 8px 0;
            height: 14px;
            line-height: 14px;
            font-size: 14px;
            color: rgb(7, 17, 27);
          }
          .desc, .extra {
            line-height: 10px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
          .desc {
            line-height: 12px;
            margin-bottom: 8px;
          }
          .extra {
            .count {
              margin-right: 12px;
            }
          }
          .price {
            font-weight: 700;
            line-height: 24px;
            .now {
              margin-right: 8px;
              font-size: 14px;
              color: rgb(240, 20, 20);
            }
            .old {
              text-decoration: line-through;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }
          }
          .cartcontrol-wrapper {
            position: absolute;
            right: 0;
            bottom: 12px;
          }
        }
      }
    }
    show-food-image {
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
