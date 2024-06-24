import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { createPokemon, incrementCounter, getAllPokemons, getPokemonWithHighestCounter, getShinyPokemons, getMegaPokemons } from '../api/pokemonApi';
import { Pokemon } from '../types/pokemonTypes';


interface PokemonState {
    pokemons: Pokemon[];
    shinyPokemons: Pokemon[];
    megaPokemons: Pokemon[];
    highestCounterPokemon: Pokemon | null;
    loading: boolean;
    error: string | null;
}

const initialState: PokemonState = {
    pokemons: [],
    shinyPokemons: [],
    megaPokemons: [],
    highestCounterPokemon: null,
    loading: false,
    error: null,
};

export const fetchPokemons = createAsyncThunk('pokemon/fetchPokemons', async () => {
    const response = await getAllPokemons();
    return response.data as Pokemon[];
});

export const addPokemon = createAsyncThunk('pokemon/addPokemon', async (pokemon: { name: string; type: string }) => {
    const response = await createPokemon(pokemon);
    return response.data as Pokemon;
});

export const incrementPokemonCounter = createAsyncThunk(
    'pokemon/incrementPokemonCounter',
    async (id: string, { dispatch }) => {
        const response = await incrementCounter(id);
        dispatch(fetchHighestCounterPokemon());
        dispatch(fetchShinyPokemons());
        dispatch(fetchMegaPokemons());
        return { id, counter: response.data.counter };
    }
);

export const fetchHighestCounterPokemon = createAsyncThunk('pokemon/fetchHighestCounterPokemon', async () => {
    const response = await getPokemonWithHighestCounter();
    return response.data as Pokemon;
});

export const fetchShinyPokemons = createAsyncThunk('pokemon/fetchShinyPokemons', async () => {
    const response = await getShinyPokemons();
    return response.data as Pokemon[];
});

export const fetchMegaPokemons = createAsyncThunk('pokemon/fetchMegaPokemons', async () => {
    const response = await getMegaPokemons();
    return response.data as Pokemon[];
});

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        resetHighestCounterPokemon: (state) => {
            state.highestCounterPokemon = null;
        },
        resetShinyPokemons: (state) => {
            state.shinyPokemons = [];
        },
        resetMegaPokemons: (state) => {
            state.megaPokemons = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPokemons.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPokemons.fulfilled, (state, action: PayloadAction<Pokemon[]>) => {
                state.loading = false;
                state.pokemons = action.payload;
            })
            .addCase(fetchPokemons.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch pokemons';
            })
            .addCase(addPokemon.fulfilled, (state, action: PayloadAction<Pokemon>) => {
                state.pokemons.push(action.payload);
            })
            .addCase(incrementPokemonCounter.fulfilled, (state, action: PayloadAction<{ id: string; counter: number }>) => {
                const { id, counter } = action.payload;
                const pokemon = state.pokemons.find(p => p._id === id);
                if (pokemon) {
                    pokemon.counter = counter;
                }
            })
            .addCase(fetchHighestCounterPokemon.fulfilled, (state, action: PayloadAction<Pokemon>) => {
                state.highestCounterPokemon = action.payload;
            })
            .addCase(fetchShinyPokemons.fulfilled, (state, action: PayloadAction<Pokemon[]>) => {
                state.shinyPokemons = action.payload;
            })
            .addCase(fetchMegaPokemons.fulfilled, (state, action: PayloadAction<Pokemon[]>) => {
                state.megaPokemons = action.payload;
            });
    },
});

export const { resetHighestCounterPokemon, resetShinyPokemons, resetMegaPokemons } = pokemonSlice.actions;
export default pokemonSlice.reducer;
