const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => { // aqui ele recebe os detalhes do pokemon em url e transforma em json
  return fetch(pokemon.url) // req de detalhes
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon) // converte os detalhes em pokemon
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url) // realizando req da lista de pokemon
    .then((response) => response.json()) //  recebe um http response transforma em json
    .then((jsonBody) => jsonBody.results) // pega a lista de pokemons
    .then((pokemons) => (pokemons.map(pokeApi.getPokemonDetail))) // transforma a lista em req de detalhes
    .then((detailRequests) => Promise.all(detailRequests)) // Aguarda todos terminarem
    .then((pokemonsDetails) => pokemonsDetails)// recebendo os detalhes do pokemon
}

// Exemplo de uso
pokeApi.getPokemons();