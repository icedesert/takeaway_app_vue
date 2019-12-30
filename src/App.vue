<template>
  <div id="app">
    <router-view/>
    <tabbar v-show="$route.meta.tabbarShow"/>
  </div>
</template>

<script>
import tabbar from './components/tabbar/tabbar'
import { mapActions } from 'vuex'

export default {
  mounted () {
    this.getUserInfo_session()
  },
  computed: {
  },
  methods: {
    ...mapActions(['getUserInfo_session'])
  },
  components: {
    tabbar
  }
}
</script>

<style lang="less" scoped></style>
