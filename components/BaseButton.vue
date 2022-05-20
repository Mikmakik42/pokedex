<template>
  <component :is="tag" v-bind="boundProps" v-on="$listeners">
    <span>
      <slot></slot>
    </span>
  </component>
</template>

<script lang="ts">
import Vue from 'vue';

/** @typedef {'button', 'submit', 'a'} ButtonTypes */
export enum ButtonTypes {
  'BUTTON' = 'button',
  'SUBMIT' = 'submit',
  'LINK' = 'a',
  'NUXT_LINK' = 'nuxt-link',
}

const BLOCK_SELECTOR = 'base-button';
export default Vue.extend({
  name: 'BaseButton',
  props: {
    to: { type: String, default: null },
    href: { type: String, default: null },
    pokemonType: { type: String, default: null },
    disabled: Boolean,
  },
  computed: {
    /**
     * If type is link or there's href return null, else return the type, or button by default
     * @return {string | null}
     */
    typeAttr(): string|null {
      return null;
    },
    tag(): string {
      if (this.href) {
        return ButtonTypes.LINK;
      }
      if (this.to) {
        return ButtonTypes.NUXT_LINK;
      }
      return ButtonTypes.BUTTON;
    },
    classList() {
      return [
        BLOCK_SELECTOR,
        {
          [`${BLOCK_SELECTOR}--${this.pokemonType}`]: this.pokemonType,
          [`${BLOCK_SELECTOR}--disabled`]: this.disabled,
        },
      ];
    },
    boundProps(): object {
      return {
        type: this.typeAttr,
        class: this.classList,
        href: this.href ?? this.to,
        to: this.to,
        disabled: this.disabled,
      };
    },
  },
});
</script>

<style lang="scss" scoped>
.base-button {
  @extend %base-button;

  &--normal {
    @extend %pokemon-button--normal;
  }

  &--fighting {
    @extend %pokemon-button--fighting;
  }

  &--flying {
    @extend %pokemon-button--flying;
  }

  &--poison {
    @extend %pokemon-button--poison;
  }

  &--ground {
    @extend %pokemon-button--ground;
  }

  &--rock {
    @extend %pokemon-button--rock;
  }

  &--bug {
    @extend %pokemon-button--bug;
  }

  &--ghost {
    @extend %pokemon-button--ghost;
  }

  &--steel {
    @extend %pokemon-button--steel;
  }

  &--fire {
    @extend %pokemon-button--fire;
  }

  &--water {
    @extend %pokemon-button--water;
  }

  &--grass {
    @extend %pokemon-button--grass;
  }

  &--electric {
    @extend %pokemon-button--electric;
  }

  &--psychic {
    @extend %pokemon-button--psychic;
  }

  &--ice {
    @extend %pokemon-button--ice;
  }

  &--dragon {
    @extend %pokemon-button--dragon;
  }

  &--dark {
    @extend %pokemon-button--dark;
  }

  &--fairy {
    @extend %pokemon-button--fairy;
  }

  &--unknown {
    @extend %pokemon-button--unknown;
  }

  &--shadow {
    @extend %pokemon-button--shadow;
  }
}
</style>
