import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchPokemons, incrementPokemonCounter } from '../store/pokemonSlice';
import { deletePokemon, updatePokemon } from '../api/pokemonApi';
import './PokemonList.css';

const PokemonList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const pokemons = useSelector((state: RootState) => state.pokemon.pokemons);
  const loading = useSelector((state: RootState) => state.pokemon.loading);

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  const handleIncrement = (id: string) => {
    dispatch(incrementPokemonCounter(id));
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await deletePokemon(id);
      if (response.status === 200) {
        dispatch(fetchPokemons());
      } else {
        console.error('Failed to delete Pokemon');
      }
    } catch (error) {
      console.error('Failed to delete Pokemon', error);
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      const newName = prompt('Enter new name:');
      if (!newName) return;

      const response = await updatePokemon(id, newName);
      if (response.status === 200) {
        dispatch(fetchPokemons());
      } else {
        console.error('Failed to update Pokémon');
      }
    } catch (error) {
      console.error('Failed to update Pokémon', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="pokemon-list">
      {pokemons.map((pokemon) => (
        <div className="pokemon-card" key={pokemon._id}>
          <h3>{pokemon.name}</h3>
          <p>Tipo: {pokemon.type}</p>
          <p>Contador: {pokemon.counter}</p>
          <div className="button-group">
            <button onClick={() => handleIncrement(pokemon._id)}>Incrementar</button>
            <button onClick={() => handleDelete(pokemon._id)}>Deletar</button>
            <button onClick={() => handleUpdate(pokemon._id)}>Atualizar Nome</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PokemonList;
