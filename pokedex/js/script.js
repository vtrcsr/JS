// CÓDIGO COPIADO DO YOUTUBE

const pokemonNome = document.querySelector(".pokemon_nome");
const pokemonNumero = document.querySelector(".pokemon_numero");
const pokemonImagem = document.querySelector(".pokemon-gif");

const form = document.querySelector(".form");
const input = document.querySelector(".search");
const botaoPrev = document.querySelector(".botao-prev");
const botaoNext = document.querySelector(".botao-next");

let procurarPokemon = 1;

const buscarPokemon = async (pokemon) => {
  const respostaAPI = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );

  if (respostaAPI.status === 200) {
    const data = await respostaAPI.json();
    return data;
  }
};

const renderizarPokemon = async (pokemon) => {
  pokemonNome.innerHTML = "Carregando...";
  pokemonNumero.innerHTML = "";

  const data = await buscarPokemon(pokemon);

  if (data) {
    pokemonImagem.style.display = "block";
    pokemonNome.innerHTML = data.name;
    pokemonNumero.innerHTML = data.id;
    pokemonImagem.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
    input.value = "";
    procurarPokemon = data.id;
  } else {
    pokemonImagem.style.display = "none";
    pokemonNome.innerHTML = "Não encontrado";
    pokemonNumero.innerHTML = "";
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderizarPokemon(input.value.toLowerCase());
});

botaoPrev.addEventListener("click", () => {
  if (procurarPokemon > 1) {
    procurarPokemon -= 1;
    renderizarPokemon(procurarPokemon);
  }
});

botaoNext.addEventListener("click", () => {
  procurarPokemon += 1;
  renderizarPokemon(procurarPokemon);
});

renderizarPokemon(procurarPokemon);
