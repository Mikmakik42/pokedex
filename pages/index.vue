<template>
  <div class="homepage">
    <h1 class="homepage__title">
      {{ $t('index.title') }}
    </h1>
    <img
      src="~/assets/images/pokemon.png"
      :alt="$t('index.title')"
      class="homepage__logo"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Homepage',
  layout: 'default',
})
</script>

<style lang="scss">
.homepage {
  &__title {
    @extend %sr-only;
  }

  &__logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -100%);
  }
}
</style>

<i18n>
{
  "fr": {
    "index": {
      "title": "Pokédex"
    }
  }
}
</i18n>
