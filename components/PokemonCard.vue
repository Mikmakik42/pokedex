<template>
  <div class="pokemon-card">
    <p>{{ pokemonName }}</p>
    <loader v-show="$fetchState.pending"/>
    <template v-show="!$fetchState.pending">
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
    this.pokemon = await this.$api.pokemon.getPokemon(this.pokemonName);
  },
  data: () => ({
    pokemon: undefined as Object|undefined,
  })
});
</script>

<style scoped lang="scss">

</style>
