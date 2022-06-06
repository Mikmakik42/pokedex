<template>
  <div class="pokemon-card">
    <loader v-show="$fetchState.pending"/>
    <template v-if="!$fetchState.pending && pokemon && pokemonSpecies">
      <p>{{ pokemonLocaleName }}</p>
      <img :src="pokemon.sprites.front_default" alt="">
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Loader from "~/components/Loader.scss.vue";

export default Vue.extend({
  name: 'PokemonCard',
  components: {Loader},
  props: {
    pokemonName: { type: String, required: true },
  },
  async fetch() {
    this.pokemonSpecies = await this.$api.pokemon.getPokemonSpecies(this.pokemonName);
    this.pokemon = await this.$api.pokemon.getPokemon(this.pokemonName);
  },
  data: () => ({
    pokemonSpecies: undefined as object|undefined,
    pokemon: undefined as object|undefined,
  }),
  computed: {
    pokemonLocaleName(): string {
      if (this.pokemonSpecies) {
        return this.pokemonSpecies.names.find(
          (name: object) => name.language.name === this.$i18n.locale
        ).name;
      }
      return '';
    },
  },
});
</script>

<style scoped lang="scss">
.pokemon-card {

}
</style>
