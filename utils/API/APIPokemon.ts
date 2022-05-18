import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { NuxtRuntimeConfig } from '@nuxt/types/config/runtime';
import BasicResponse from '~/models/BasicResponse';

class APIPokemon {
  private $axios: NuxtAxiosInstance;
  private $config: NuxtRuntimeConfig;

  constructor($axios: NuxtAxiosInstance, $config: NuxtRuntimeConfig) {
    this.$axios = $axios;
    this.$config = $config;
  }

  async getTypes(): Promise<BasicResponse[]> {
    const { data } = await this.$axios.get('https://pokeapi.co/api/v2/type/');
    return data.results;
  }
}

export default APIPokemon;
