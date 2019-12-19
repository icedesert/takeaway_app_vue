<template>
  <div id="app">
    <router-view/>
    <tabbar v-show="$route.meta.tabbarShow" />
  </div>
</template>

<script>
import tabbar from './components/tabbar/tabbar'

export default {
  components: {
    tabbar
  }
}
</script>

<style lang="less" scoped>
  #app {
  }

</style>
