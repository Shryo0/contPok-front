import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchHighestCounterPokemon, fetchShinyPokemons, fetchMegaPokemons, resetHighestCounterPokemon, resetShinyPokemons, resetMegaPokemons } from '../store/pokemonSlice';
import './PokemonQueries.css';

const PokemonQueries: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const highestCounterPokemon = useSelector((state: RootState) => state.pokemon.highestCounterPokemon);
  const shinyPokemons = useSelector((state: RootState) => state.pokemon.shinyPokemons);
  const megaPokemons = useSelector((state: RootState) => state.pokemon.megaPokemons);
  const loading = useSelector((state: RootState) => state.pokemon.loading);

  const [showHighestCounter, setShowHighestCounter] = useState(false);
  const [showShiny, setShowShiny] = useState(false);
  const [showMega, setShowMega] = useState(false);

  const handleToggleHighestCounter = () => {
    setShowHighestCounter(!showHighestCounter);
    if (!showHighestCounter) {
      dispatch(resetHighestCounterPokemon());
      dispatch(fetchHighestCounterPokemon());
    }
  };

  const handleToggleShiny = () => {
    setShowShiny(!showShiny);
    if (!showShiny) {
      dispatch(resetShinyPokemons());
      dispatch(fetchShinyPokemons());
    }
  };

  const handleToggleMega = () => {
    setShowMega(!showMega);
    if (!showMega) {
      dispatch(resetMegaPokemons());
      dispatch(fetchMegaPokemons());
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="results">
      <div className="query-section">
        <div className="query-header" onClick={handleToggleHighestCounter}>
          <h2>Pokémon com Maior Contador</h2>
          <span>{showHighestCounter ? 'v' : '^'}</span>
        </div>
        {showHighestCounter && highestCounterPokemon && (
          <div className="query-result">
            <p>Nome: {highestCounterPokemon.name}</p>
            <p>Contador: {highestCounterPokemon.counter}</p>
          </div>
        )}
      </div>

      <div className="query-section">
        <div className="query-header" onClick={handleToggleShiny}>
          <h2>Shiny Pokémons</h2>
          <span>{showShiny ? 'v' : '^'}</span>
        </div>
        {showShiny && (
          <div className="query-result">
            {shinyPokemons.map((pokemon) => (
              <div key={pokemon._id}>
                <p>Nome: {pokemon.name}</p>
                <p>Contador: {pokemon.counter}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="query-section">
        <div className="query-header" onClick={handleToggleMega}>
          <h2>Mega Pokémons</h2>
          <span>{showMega ? 'v' : '^'}</span>
        </div>
        {showMega && (
          <div className="query-result">
            {megaPokemons.map((pokemon) => (
              <div key={pokemon._id}>
                <p>Nome: {pokemon.name}</p>
                <p>Contador: {pokemon.counter}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonQueries;
