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
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {

  }
}
</script>

<style lang="scss">
@import "@/common/style/theme.scss";
@font-face {
  font-family: 'jly-data';  /* project id 1959723 */
  src: url('//at.alicdn.com/t/font_1959723_lb7kkzj9hi.eot');
  src: url('//at.alicdn.com/t/font_1959723_lb7kkzj9hi.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_1959723_lb7kkzj9hi.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_1959723_lb7kkzj9hi.woff') format('woff'),
  url('//at.alicdn.com/t/font_1959723_lb7kkzj9hi.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_1959723_lb7kkzj9hi.svg#jly-data') format('svg');
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
