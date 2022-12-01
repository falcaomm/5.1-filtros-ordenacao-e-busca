import styled, { createGlobalStyle } from "styled-components";
import pokemons from "./pokemon/pokemon.json";
import PokemonCard from "./components/PokemonCard/PokemonCard";
import { getColors } from "./utils/ReturnCardColor";
import Header from "./components/Header/Header.js";
import { useState } from "react";
const GlobalStyle = createGlobalStyle`
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: "Inter", sans-serif;
  
  }
`;
const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(440px, 1fr));
  justify-items: center;
`;
function App() {

  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [order, setOrder] = useState("")


  // id ==="" ? pokemons.map : pokemons.filter esses .filter e .map seriam variaveis que armazenariam os maps e esse ternário seria chamado dentro de chaves no return no lugar de tooodo o codigo que tem o filter e map

  return (
    <>
      <GlobalStyle />
      <Header
        id={id}
        setId={setId}
        name={name}
        setName={setName}
        type={type}
        setType={setType}
        order={order}
        setOrder={setOrder}
      />
      <CardsContainer>
        {pokemons

          .filter((pokemon) => {
            return pokemon.id.includes(id)
            {/* if (pokemon.id === id) {
              return pokemon
            } */}
          })

          .filter((pokemon) => {
            const pokemonName = pokemon.name.english.toLowerCase()
            return pokemonName.includes(name.toLowerCase())
          })
        
          .filter((pokemon) => {
            if (pokemon.type.length === 1) {
              return pokemon.type[0].includes(type)
            } else {
              return pokemon.type[0].includes(type) || pokemon.type[1].includes(type)
            }
          })

          .sort((currentPoke, nextPoke) => {
            if (order === "cre") {
              return currentPoke.name.english.localeCompare(nextPoke.name.english)
            } else if (order === "dec") {
              return nextPoke.name.english.localeCompare(currentPoke.name.english)
            }
          })

          .map((pokemon) => {
            return (
              <PokemonCard
                cardColor={getColors(pokemon.type[0])}
                key={pokemon.id}
                pokemon={pokemon}
              />)
          })
        }
      </CardsContainer>
    </>
  );
}

export default App;
