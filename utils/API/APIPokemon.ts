import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { NuxtRuntimeConfig } from '@nuxt/types/config/runtime';
import PokemonTypeResponse from '~/models/PokemonTypeResponse';
import PokemonResponse from '~/models/PokemonResponse';
import PokemonType from "~/types/pokemon-types";
import BasicResponse from "~/models/BasicResponse";

class APIPokemon {
  private $axios: NuxtAxiosInstance;
  private $config: NuxtRuntimeConfig;

  constructor($axios: NuxtAxiosInstance, $config: NuxtRuntimeConfig) {
    this.$axios = $axios;
    this.$config = $config;
  }

  async getTypes(): Promise<PokemonTypeResponse[]> {
    const { data } = await this.$axios.get('https://pokeapi.co/api/v2/type/');
    return data.results;
  }

  async getPokemonsByType(type: PokemonType): Promise<PokemonResponse[]> {
    const { data } = await this.$axios.get(`https://pokeapi.co/api/v2/type/${type}`);
    return data.pokemon;
  }

  async getAllPokemonSpecies(): Promise<BasicResponse[]> {
    const { data } = await this.$axios.get('https://pokeapi.co/api/v2/pokemon-species');
    return data.results;
  }

  async getPokemonSpecies(pokemonName: string): Promise<Object> {
    const { data } = await this.$axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);
    return data;
  }

  async getAllPokemons(query: string|null = null): Promise<Object> {
    const { data } = await this.$axios.get(`https://pokeapi.co/api/v2/pokemon${query}`);
    return data;
  }

  async getPokemon(pokemonName: string): Promise<Object> {
    const { data } = await this.$axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    return data;
  }
}

export default APIPokemon;
