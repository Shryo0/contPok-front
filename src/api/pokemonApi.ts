import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api/pokemon';

export const createPokemon = (pokemon: { name: string; type: string }) => {
    return axios.post(`${API_URL}/create`, pokemon);
};

export const incrementCounter = (id: string) => {
    return axios.patch(`${API_URL}/incrementCounter/${id}`);
};

export const updatePokemon = (id: string, name: string) => {
    return axios.patch(`${API_URL}/update`, { id, name });
};

export const deletePokemon = (id: string) => {
    return axios.delete(`${API_URL}/delete/${id}`);
};

export const getAllPokemons = () => {
    return axios.get(`${API_URL}/getAll`);
};

export const getPokemonsByType = (type: string) => {
    return axios.get(`${API_URL}/getByType/${type}`);
};

export const getPokemonWithHighestCounter = () => {
    return axios.get(`${API_URL}/getPokemonWithHighestCounter`);
};

export const getShinyPokemons = () => {
    return axios.get(`${API_URL}/getShiny`);
};

export const getMegaPokemons = () => {
    return axios.get(`${API_URL}/getMega`);
};
