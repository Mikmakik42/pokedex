import { GetterTree, ActionTree, MutationTree } from 'vuex'
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
  resetPokemons(state) {
    state.pokemons = [];
  },
  addPokemons(state, pokemons: string[]) {
    state.pokemons = [...state.pokemons, ...pokemons];
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit({ commit }): Promise<void> {
    const types = await this.$api.pokemon.getTypes();
    commit('setTypes', types.map(item => item.name));
  },
}
