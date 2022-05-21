import BasicResponse from '~/models/BasicResponse';
import PokemonType from '~/types/pokemon-types';

interface PokemonTypeResponse extends BasicResponse {
  name: PokemonType
}

export default PokemonTypeResponse;
