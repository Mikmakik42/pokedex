<template>
  <div :class="classList">
    <base-button
      v-for="type in pokemonTypes"
      :key="type"
      :pokemon-type="type"
      :to="
          localePath({
            name: RoutesName.POKEMONS,
            query: {
              type: type,
            }
          })
        "
    >
      {{ $t(`pokemon_types.${type}`) }}
    </base-button>
  </div>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import Vue from 'vue';
import BaseButton from '~/components/BaseButton.vue';
import RoutesName from '~/utils/RoutesName';
import pokemonResponse from "~/models/PokemonResponse";

const BLOCK_SELECTOR = 'pokemon-types'
export default Vue.extend({
  name: 'PokemonTypes',
  components: {
    BaseButton,
  },
  props: {
    homepage: Boolean,
  },
  data: () => ({
    RoutesName,
  }),
  computed: {
    ...mapGetters({
      pokemonTypes: 'types',
    }),
    classList() {
      return [
        BLOCK_SELECTOR,
        {
          [`${BLOCK_SELECTOR}--homepage`]: this.homepage,
        }
      ]
    }
  },
});
</script>

<style scoped lang="scss">
.pokemon-types {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1rem;
  row-gap: 1rem;
}
</style>
