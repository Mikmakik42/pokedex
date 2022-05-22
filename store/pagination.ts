import { GetterTree, ActionTree, MutationTree } from 'vuex'
import PokemonType from "~/types/pokemon-types";

const LIMIT = 20;
export const state = () => ({
  page: 0 as number,
  typedPokemons: [] as string[],
  pokemonCount: 0 as number,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  nextPageQuery(state): string {
    return `?limit=${LIMIT}&offset=${LIMIT * state.page}`;
  },
  currentOffset(state): number {
    return state.page * LIMIT
  }
}

export const mutations: MutationTree<RootState> = {
  initializePage(state, types: PokemonType[]): void {
    state.page = 0;
  },
  incrementPage(state) {
    state.page++
  },
  setTypedPokemons(state, pokemons: string[]) {
    state.typedPokemons = pokemons
  },
  setPokemonCount(state, count: number) {
    state.pokemonCount = count;
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async initializePokemonPagination({ commit }, pokemons: string[] = []) {
    commit('setTypedPokemons', pokemons);
    commit('initializePage');
    if (pokemons.length > 0) {
      const pokemonsToCommit = pokemons.slice(0, LIMIT);
      //TODO: commit pokemon on index store
    } else {
      //TODO: make request to get all pokemons with correct limit
      //TODO: store request pokemon in count in store
    }
  },
  async getNextPage({ state, commit, getters }) {
    if (state.typedPokemons && getters.currentOffset + LIMIT < state.typedPokemons.length) {
      const pokemonToCommit = state.typedPokemons.slice(
        getters.currentOffset, getters.currentOffset + LIMIT
      );
      //TODO: commit pokemon on index store
      commit('incrementPage');
    } else if (state.pokemonCount && getters.currentOffset + LIMIT < state.pokemonCount) {
      //TODO: make request to get all next pokemons with nextPage query
      commit('incrementPage');
    }
  }
}
