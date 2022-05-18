import { Plugin } from '@nuxt/types'
import APIPokemon from "~/utils/API/APIPokemon";

declare module 'vue/types/vue' {
  interface Vue {
    $api: {
      pokemon: APIPokemon,
    },
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $api: {
      pokemon: APIPokemon,
    },
  }
  interface Context {
    $api: {
      pokemon: APIPokemon,
    },
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $api: {
      pokemon: APIPokemon,
    },
  }
}
const apiPlugin: Plugin = (
  { app, store, $axios, $config },
  inject
) => {
  inject('api', {
    pokemon: new APIPokemon($axios, $config),
  })
}

export default apiPlugin;
