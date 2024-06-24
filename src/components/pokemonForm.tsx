import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { addPokemon } from '../store/pokemonSlice';

const PokemonForm: React.FC = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('shiny');
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(addPokemon({ name, type }));
    setName('');
    window.location.reload(); // Recarregar a página após adicionar o Pokémon
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Tipo:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="shiny">Shiny</option>
          <option value="mega">Mega</option>
        </select>
      </div>
      <button type="submit">Adicionar Pokémon</button>
    </form>
  );
};

export default PokemonForm;
