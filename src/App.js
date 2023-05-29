import React, { useState, useEffect } from 'react';
import { fetchPokemon } from './utils';
import './style.css';

export default function App() {
  // This state tracks changes in the search bar
  const [searchText, setSearchText] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pokemon, setPokemon] = useState({});

  async function getPokemon(name) {
    if (!name) return setError('Search Bar is Empty');

    setIsLoading(true);
    const res = await fetchPokemon(name);
    setError(res.error);
    setPokemon(res.data);
    setIsLoading(false);
  }

  return (
    <div className="container">
      <h1>Search Pokemon</h1>
      <input
        className="search-bar"
        placeholder="Search Pokemon e.g. dragonite"
        // onChange is an event which fires whenever you type something in the input (search bar)
        onChange={function (event) {
          // that event also has the text that is currently in search bar which is accessed through event.target.value
          // We use that property to update the searchText State
          setSearchText(event.target.value);
        }}
      />
      <button className="btn" onClick={() => getPokemon(searchText)}>
        Search
      </button>
      {/* Display Loader when isLoading is true */}
      {isLoading ? <div className="loader">Loading...</div> : null}
      {/* Display Error when there is an error */}
      {!isLoading && error ? <p className="error">{error}</p> : null}
      {/* Display Image if pokemon.sprite is not undefined and isLoading is false */}
      {!isLoading && pokemon?.sprite ? (
        <img className="image" src={pokemon?.sprite} />
      ) : null}
    </div>
  );
}
