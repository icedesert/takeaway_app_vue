export default {
  totalCount (state) {
    const result = state.cartFoods.reduce((initial, food) => initial + food.count, 0)
    return result
  },
  totalPrice (state) {
    const result = state.cartFoods.reduce((initial, food) => initial + food.count * food.price, 0)
    return result
  },
  positiveCount (state) {
    const result = state.shopRatings.reduce((initial, rating) => initial + (rating.rateType ? 0 : 1), 0)
    return result
  }
}
