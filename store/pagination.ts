import { GetterTree, ActionTree, MutationTree } from 'vuex'
import PokemonType from "~/types/pokemon-types";

const LIMIT = 20;
const getDefaultState = () => ({
  page: 0 as number,
  typedPokemons: [] as string[],
  pokemonCount: 0 as number,
})

export const state = getDefaultState;

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
  resetState(state) {
    state = { ...getDefaultState() };
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchPokemons(
    { commit, dispatch, state, getters },
    { type, firstPage }: { type: PokemonType, firstPage: Boolean }
  ) {
    if (type) {
      if (firstPage) {
        commit('initializePage');
        const pokemons = await this.$api.pokemon.getPokemonsByType(type);
        commit('setTypedPokemons', pokemons.map(item => item.pokemon.name));
      }
      if (state.typedPokemons && getters.currentOffset + LIMIT < state.typedPokemons.length) {
        const pokemonsToCommit = state.typedPokemons.slice(
          getters.currentOffset, getters.currentOffset + LIMIT
        );
        commit('addPokemons', pokemonsToCommit, { root: true });
        commit('incrementPage');
      }
    } else {
      if (firstPage) {
        commit('initializePage');
        const data = await this.$api.pokemon.getAllPokemons(getters.nextPageQuery);
        commit('setPokemonCount', data.count);
        commit('addPokemons', data.results.map(item => item.name), { root: true });
        commit('incrementPage');
      } else if (state.pokemonCount && getters.currentOffset + LIMIT < state.pokemonCount) {
        const { results } = await this.$api.pokemon.getAllPokemons(getters.nextPageQuery);
        commit('addPokemons', results.map(item => item.name), { root: true });
        commit('incrementPage');
      }
    }
  },
  resetPokemons({ commit }) {
    commit('resetState');
    commit('resetPokemons', null, { root: true });
  },
}
