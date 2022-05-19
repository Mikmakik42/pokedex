<template>
  <div class="homepage">
    <h1 class="homepage__title">
      {{ $t('index.title') }}
    </h1>
    <img
      src="~/assets/images/pokemon.png"
      :alt="$t('index.title')"
      class="homepage__logo"
    />
    <div class="homepage__button-grid">
      <BaseButton
        v-for="type in pokemonTypes"
        :key="type.name"
        :pokemon-type="type.name"
      >
        {{ type.name }}
      </BaseButton>
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import BaseButton from '~/components/BaseButton.vue';

export default{
  name: 'Homepage',
  components: {
    BaseButton,
  },
  computed: {
    ...mapGetters({
      pokemonTypes: 'types',
    }),
  },
};
</script>

<style lang="scss">
.homepage {
  @extend %base-container;

  &__title {
    @extend %sr-only;
  }

  &__logo {
    width: 100%;
    max-width: 600px;
    margin-bottom: 4rem;
  }

  &__button-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 3rem 1rem;
    column-gap: 1rem;
    row-gap: 1rem;
  }
}
</style>

<i18n lang="yaml">
fr:
  index:
    title: 'Pokédex'
</i18n>
