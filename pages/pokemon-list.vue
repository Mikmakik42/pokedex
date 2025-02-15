<template>
  <div class="pokemon-list">
    <h1 class="pokemon-list__title">
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
      <div :class="burgerClassList">
        <span class="icon-burger__bar icon-burger__bar--top"></span>
        <span class="icon-burger__bar icon-burger__bar--middle"></span>
        <span class="icon-burger__bar icon-burger__bar--bottom"></span>
      </div>
      <pokemon-types />
    </div>
    <template>
      <pokemon-card
        v-for="pokemon in pokemons"
        :key="pokemon"
        :pokemon-name="pokemon"
      />
      <div class="pokemon-list__loader" v-observe-visibility="$fetch">
        <loader v-show="canFetch" />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { LocaleMessage } from 'vue-i18n';
import { ObserveVisibility } from 'vue-observe-visibility';
import BaseButton from '~/components/BaseButton.vue';
import RoutesName from '~/utils/RoutesName';
import PokemonTypes from "~/components/PokemonTypes.vue";
import Loader from "~/components/Loader.scss.vue";
import PokemonType from "~/types/pokemon-types";
import PokemonCard from "~/components/PokemonCard.vue";

const BLOCK_SELECTOR = 'pokemon-list';
export default Vue.extend({
  name: 'PokemonsList',
  components: {
    PokemonCard,
    Loader,
    PokemonTypes,
    BaseButton,
  },
  directives: {
    ObserveVisibility,
  },
  async fetch(): Promise<void> {
   this.type = this.$route.query.type as PokemonType|undefined;
   if (this.canFetch)
   await this.fetchPokemons({ type: this.type, firstPage: this.firstPage});
   this.firstPage = false;
  },
  data: () => ({
    RoutesName,
    type: undefined as PokemonType|undefined,
    openMenu: false as Boolean,
    firstPage: true as Boolean
  }),
  computed: {
    ...mapGetters({
      pokemons: 'pokemons',
      canFetch: 'pagination/canFetch',
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
        `${BLOCK_SELECTOR}__aside`,
        {
          [`${BLOCK_SELECTOR}__aside--closed`]: !this.openMenu
        },
      ];
    },
    burgerClassList(): Array<String|Object> {
      return [
        `${BLOCK_SELECTOR}__burger-icon`,
        'icon-burger',
        {
          'icon-burger--cross': this.openMenu
        },
      ];
    },
  },
  watch: {
    '$route.query': {
      handler(to, from) {
        if (from !== undefined) {
          //TODO: Add scroll to top
        }
        this.firstPage = true;
        this.resetPokemons();
        this.$fetch();
      },
      deep: true,
      immediate: true,
    }
  },
  methods: {
    ...mapActions({
      fetchPokemons: 'pagination/fetchPokemons',
      resetPokemons: 'pagination/resetPokemons',
    }),
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
  @extend %base-container;

  &__title {
    @extend %sr-only;
  }

  &__aside {
    position: fixed;
    top: 0;
    left: 0;
    height: max-content;
    min-height: 100%;
    width: 100%;
    background-color: $color-background;
    transform: translateX(0);
    transition: transform $default-transition-duration;
    padding: 2rem;

    &--closed {
      transform: translateX(-80%);
    }
  }

  &__logo {
    width: 100%;
    max-width: 300px;
  }

  &__burger-icon {
    margin-left: auto;
  }

  &__loader {
    padding: 2rem 0;
    margin: auto;
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
