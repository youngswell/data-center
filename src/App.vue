<template>
  <div id="app">
    <transition name="fade" mode="in-out">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {

  },
  computed: {
    lognStatus() {
      return !!this.$store.getters.token
    }
  },
  watch: {
    lognStatus() {
      // console.log(lognd)
      // this.$router.replace({ query: this.$route.query })
      window.location.replace(this.$route.fullPath)
    }
  },
  mounted() {
    window.addEventListener('resize', this.resizeHandler)
    this.resizeHandler()
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeHandler)
  },
  methods: {
    resizeHandler() {
      const clientHeight = document.querySelector('body').clientHeight;
      const clientWidth = document.querySelector('body').clientWidth;
      const system = this.$store.getters.system;
      this.$store.commit('system', { ...system, clientHeight, clientWidth })
      // console.log(system, this.$store.getters.system)
    }
  }
}
</script>

<style lang="scss">
@import "@/common/style/theme.scss";
@font-face {
  font-family: 'jly-data';  /* project id 1959723 */
  src: url('//at.alicdn.com/t/font_1959723_48bv6dq0p55.eot');
  src: url('//at.alicdn.com/t/font_1959723_48bv6dq0p55.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_1959723_48bv6dq0p55.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_1959723_48bv6dq0p55.woff') format('woff'),
  url('//at.alicdn.com/t/font_1959723_48bv6dq0p55.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_1959723_48bv6dq0p55.svg#jly-data') format('svg');
}
.jly-data-icon{
  font-family: jly-data;
  font-size: 16px;
  color: $text-color-content;
}

html,body,#app{
  height: 100%;
  background-color: #EFF3F7;
  overflow: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $text-color-title;
}
.main {
  .page-container{
    margin: 0 auto;
    width: 1200px;
  }
}
</style>
