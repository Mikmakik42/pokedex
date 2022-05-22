import { GetterTree, ActionTree, MutationTree } from 'vuex'
import BasicResponse from '~/models/BasicResponse';
import PokemonType from "~/types/pokemon-types";

export const state = () => ({
  types: [] as PokemonType[],
  pokemons: [] as string[],
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  types(state): PokemonType[] {
    return state.types;
  },
  pokemons(state): string[] {
    return state.pokemons;
  }
}

export const mutations: MutationTree<RootState> = {
  setTypes(state, types: PokemonType[]): void {
    state.types = types
  },
  setPokemons(state, pokemons: string[]) {
    state.pokemons = pokemons
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit({ commit }): Promise<void> {
    const types = await this.$api.pokemon.getTypes();
    commit('setTypes', types.map(item => item.name));
  },
  async fetchPokemonsByType({ commit }, type: PokemonType): Promise<void> {
    const pokemons = await this.$api.pokemon.getPokemonsByType(type);
    console.log(pokemons);
    commit('setPokemons', pokemons.map(item => item.pokemon));
  },
  async fetchAllPokemons({ commit }): Promise<void> {
    const pokemons = await this.$api.pokemon.getAllPokemons();
    commit('setPokemons', pokemons.map(item => item.name));
  }
}
