<template>
  <div class="app">
    <nuxt />
  </div>
</template>

<script lang="ts">
export default {
  name: 'LayoutDefault',
  layout: 'default',
};
</script>

<style lang="scss" scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background-color: $color-background;
}
</style>

