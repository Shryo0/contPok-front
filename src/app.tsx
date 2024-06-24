import React from 'react';
import PokemonForm from './components/pokemonForm';
import PokemonList from './components/pokemonList';
import PokemonQueries from './components/PokemonQueries';

const App: React.FC = () => {
    return (
        <div>
            <h1>Contador de Pokémon</h1>
            <PokemonForm />
            <PokemonList />
            <PokemonQueries />
        </div>
    );
};

export default App;
