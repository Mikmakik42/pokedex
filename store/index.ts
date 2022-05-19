import { GetterTree, ActionTree, MutationTree } from 'vuex'
import BasicResponse from '~/models/BasicResponse';

export const state = () => ({
  types: [] as BasicResponse[],
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  types(state) {
    return state.types;
  },
}

export const mutations: MutationTree<RootState> = {
  setTypes(state, types: BasicResponse[]) {
    state.types = types
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit({ commit }) {
    const types = await this.$api.pokemon.getTypes();
    commit('setTypes', types);
  },
}
