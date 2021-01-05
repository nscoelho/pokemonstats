import './App.css';
import { useState } from 'react';
import Axios from 'axios';

function App() {
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemonName, setPokemonName] = useState("");
  const [pokemon, setPokemon] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    spattack: "",
    spdefense: "",
    speed: "",
    type: "",
  });

  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => {
      console.log(response);
      setPokemon({

        name: pokemonName,
        species: response.data.species.name,
        img: response.data.sprites.front_default,
        hp: response.data.stats[0].base_stat,
        attack: response.data.stats[1].base_stat,
        defense: response.data.stats[2].base_stat,
        spattack: response.data.stats[3].base_stat,
        spdefense: response.data.stats[4].base_stat,
        speed: response.data.stats[5].base_stat,
        type: response.data.types[0].type.name,
      });
      setPokemonChosen(true);
    });
  };


  return (
    <div className="App">
      <div className="TitleSection">
        <h1>Pokemon Stats</h1>
        <input type="text" onChange= {(event) => {
          setPokemonName(event.target.value);
          }}
        />
        <button onClick={searchPokemon}>Search Pokemon</button>
      </div>
      <div className="DisplaySection">
        {!pokemonChosen ?
        (<h1> Please choose a Pokemon</h1>)
        :
        (
        <>
        <h1>{pokemon.name}</h1>
        <img src={pokemon.img} alt="Pokemon"/>
        <h3>Species: {pokemon.species}</h3>
        <h3>Type: {pokemon.type}</h3>
        <h3> BASE STATS: </h3>
        <h4>HP: {pokemon.hp}</h4>
        <h4>Attack: {pokemon.attack}</h4>
        <h4>Defense: {pokemon.defense}</h4>
        <h4>Special Attack: {pokemon.spattack}</h4>
        <h4>Special Defense: {pokemon.spdefense}</h4>
        <h4>Speed: {pokemon.speed}</h4>
        </>
        )}

      </div>
    </div>
  );
}

export default App;
