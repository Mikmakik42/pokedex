<template>
  <div class="pokemon-list">
    <h1>
      {{ title }}
    </h1>
    <nuxt-link :to="localePath(RoutesName.HOME)">
      <img
        src="~/assets/images/pokemon.png"
        :alt="$t('index.title')"
        class="pokemon-list__logo"
      />
    </nuxt-link>
    <div :class="asideClassList">
      <div :class="['icon-burger', { 'icon-burger--cross': openMenu }]">
        <span class="icon-burger__bar icon-burger__bar--top"></span>
        <span class="icon-burger__bar icon-burger__bar--middle"></span>
        <span class="icon-burger__bar icon-burger__bar--bottom"></span>
      </div>
      <pokemon-types />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { LocaleMessage } from 'vue-i18n';
import BaseButton from '~/components/BaseButton.vue';
import RoutesName from '~/utils/RoutesName';
import PokemonTypes from "~/components/PokemonTypes.vue";

export default Vue.extend({
  name: 'PokemonsList',
  components: {
    PokemonTypes,
    BaseButton,
  },
  async fetch() {
  },
  data: () => ({
    RoutesName,
    type: undefined as string|undefined,
    openMenu: false,
  }),
  computed: {
    ...mapGetters({
      pokemonTypes: 'types',
    }),
    title(): LocaleMessage {
      return !this.type
        ? this.$t('list.no_type_title')
        : this.$t('title', {
            type: this.$t(`pokemon_types.${this.type}`)
          });
    },
    asideClassList(): Array<String|Object> {
      return [
        'pokemon-list__aside',
        {
          'pokemon-list__aside--closed': !this.openMenu
        },
      ];
    },
  },
  nuxtI18n: {
    paths: {
      en: "/pokemons",
      fr: "/pokemon"
    }
  }
});
</script>

<style lang="scss">
.pokemon-list {
  &__aside {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: $color-background;
    transform: translateX(0);
    transition: transform $default-transition-duration;

    &--closed {
      transform: translateX(-100%);
    }
  }
}
</style>

<i18n lang="yaml">
fr:
  list:
    title: 'Pokémons de type {type}'
    no_type_title: 'Tous les pokémons'
en:
  list:
    title: '{type} type pokemons'
    no_type_title: 'All pokemons'
</i18n>
