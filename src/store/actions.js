import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USERINFO,
  CLEAR_USERINFO,
  RECEIVE_ADDRESS_MOCK,
  RECEIVE_SHOPINFO,
  RECEIVE_SHOPRATINGS,
  RECEIVE_SHOPGOODS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART,
  RECEIVE_SEARCH_SHOPS
} from './mutation-types'
import {
  reqAddress,
  reqFoodCategorys,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqAddressMock,
  reqShopInfo,
  reqShopGoods,
  reqShopRatings,
  reqSearchShop
} from '../api'

export default {
  async getAddress ({ commit, state }) {
    // 拼接参数
    const geohash = state.latitude + ',' + state.longitude
    // 发送ajax请求获取Address，并使用await拿到resolve里的value，这时候可以查看api接口文档value的返回示例
    const result = await reqAddress(geohash)
    const resultMock = await reqAddressMock()
    // 根据接口文档的result示例，判断code，并将data用于提交mutation
    if (result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, address)
    }
    if (resultMock.code === 0) {
      const addressMock = resultMock.data
      commit(RECEIVE_ADDRESS_MOCK, addressMock)
    }
  },
  async getCategorys ({ commit }) {
    const result = await reqFoodCategorys()
    if (result.code === 0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, categorys)
    }
  },
  async getShops ({ commit, state }) {
    const longitude = state.longitude
    const latitude = state.latitude
    const result = await reqShops(longitude, latitude)
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, shops)
    }
  },
  saveUserInfo ({ commit }, userInfo) {
    commit(RECEIVE_USERINFO, userInfo)
  },
  async getUserInfo_session ({ commit }) {
    const result = await reqUserInfo()
    if (result.code === 0) {
      commit(RECEIVE_USERINFO, result.data)
    }
  },
  async userLogout ({ commit }) {
    const result = await reqLogout()
    if (result.code === 0) {
      commit(CLEAR_USERINFO)
    }
  },
  async getShopInfo ({ commit }) {
    const result = await reqShopInfo()
    if (result.code === 0) {
      commit(RECEIVE_SHOPINFO, result.data)
    }
  },
  async getShopGoods ({ commit }, callback) {
    const result = await reqShopGoods()
    if (result.code === 0) {
      commit(RECEIVE_SHOPGOODS, result.data)
      callback && callback()
    }
  },
  async getShopRatings ({ commit }, callback) {
    const result = await reqShopRatings()
    if (result.code === 0) {
      commit(RECEIVE_SHOPRATINGS, result.data)
      callback && callback()
    }
  },
  updateFoodCount ({ commit }, { isAdd, food }) {
    if (isAdd) {
      commit(INCREMENT_FOOD_COUNT, food)
    } else {
      commit(DECREMENT_FOOD_COUNT, food)
    }
  },
  clearCart ({ commit }) {
    commit(CLEAR_CART)
  },
  async getSearchShops ({ commit, state }, keyword) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqSearchShop(geohash, keyword)
    if (result.code === 0) {
      commit(RECEIVE_SEARCH_SHOPS, result.data)
    }
  }
}
