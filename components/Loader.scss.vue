<template>
  <img
    class="loader"
    src="~/assets/images/pokeball.svg"
    :alt="$t('loader')"
  >
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Loader',
});
</script>

<style scoped lang="scss">
.loader {
  animation: 1s infinite rotate-forever;
  width: 75px;
  height: 75px;
  border-radius: 50%;
}

@keyframes rotate-forever {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

<i18n lang="yaml">
fr:
  loader: 'Chargement Pokéball'
en:
  loader: 'Pokeball loading'
</i18n>
