import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USERINFO,
  CLEAR_USERINFO,
  RECEIVE_ADDRESS_MOCK,
  RECEIVE_SHOPINFO,
  RECEIVE_SHOPGOODS,
  RECEIVE_SHOPRATINGS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART,
  RECEIVE_SEARCH_SHOPS
} from './mutation-types'
import Vue from 'vue'

export default {
  [RECEIVE_SEARCH_SHOPS] (state, searchShops) {
    state.searchShops = searchShops
  },
  [CLEAR_CART] (state) {
    state.cartFoods.forEach(food => {
      food.count = 0
    })
    state.cartFoods = []
  },
  [RECEIVE_ADDRESS] (state, address) {
    state.address = address
  },
  [RECEIVE_CATEGORYS] (state, categorys) {
    state.categorys = categorys
  },
  [RECEIVE_SHOPS] (state, shops) {
    state.shops = shops
  },
  [RECEIVE_USERINFO] (state, userInfo) {
    state.userInfo = userInfo
  },
  [CLEAR_USERINFO] (state) {
    state.userInfo = ''
  },
  [RECEIVE_ADDRESS_MOCK] (state, addressMock) {
    state.addressMock = addressMock
  },
  // 获取商家详情页的头部信息
  [RECEIVE_SHOPINFO] (state, shopInfo) {
    state.shopInfo = shopInfo
  },
  // 获取商家详情页的商品信息
  [RECEIVE_SHOPGOODS] (state, shopGoods) {
    state.shopGoods = shopGoods
  },
  // 获取商家详情页的评分信息
  [RECEIVE_SHOPRATINGS] (state, shopRatings) {
    state.shopRatings = shopRatings
  },
  [INCREMENT_FOOD_COUNT] (state, food) {
    if (food.count === undefined) {
      /**
       * 当首次增加 food.count 的时候，需要在 food 对象里增加 count 属性，并将 food 对象放入 cartFoods 数组，
       * 有了 food，getters 里的 totalCount 和 totalPrice 这两个计算属性就可以通过 food 来计算
       */
      Vue.set(food, 'count', 1)
      state.cartFoods.push(food)
    } else if (food.count === 0) {
      state.cartFoods.push(food)
      food.count++
    } else {
      food.count++
    }
  },
  [DECREMENT_FOOD_COUNT] (state, food) {
    if (food.count) {
      food.count--
      if (food.count === 0) {
        state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
      }
    }
  }
}
