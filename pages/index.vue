<template>
  <div class="homepage">
    <h1 class="homepage__title">
      {{ $t('index.title') }}
    </h1>
    <nuxt-link :to="localePath(RoutesName.POKEMONS)">
      <img
        src="~/assets/images/pokemon.png"
        :alt="$t('index.title')"
        class="homepage__logo"
      />
    </nuxt-link>
    <pokemon-types />
  </div>
</template>

<script lang="ts">
import BaseButton from '~/components/BaseButton.vue';
import RoutesName from '~/utils/RoutesName';
import PokemonTypes from "~/components/PokemonTypes.vue";

export default {
  name: 'Homepage',
  components: {
    PokemonTypes,
    BaseButton,
  },
  data: () => ({
    RoutesName,
  }),
};
</script>

<style lang="scss">
.homepage {
  @extend %base-container;

  &__title {
    @extend %sr-only;
  }

  &__logo {
    width: 100%;
    max-width: 600px;
    margin-bottom: 4rem;
  }
}
</style>

<i18n lang="yaml">
fr:
  index:
    title: 'Pokédex'
</i18n>
