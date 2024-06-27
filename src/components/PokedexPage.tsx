import React, { useState, useEffect } from "react";
import styles from "../components/PokedexPage.module.css";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

type Pokemon = {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
};

type PokedexProps = {
  searchValue?: string;
};

const Pokedex: React.FC<PokedexProps> = ({ searchValue = "" }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState(searchValue);
  const [inputValue, setInputValue] = useState(searchValue);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (search) {
      setLoading(true);
      setError(null);
      const query = `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`;

      const getPokemons = setTimeout(() => {
        fetch(query)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Pokemon not found");
            }
            return response.json();
          })
          .then((data) => {
            setPokemon(data);
            setPokemonList([]);
          })
          .catch((err) => {
            setError(err.message);
            setPokemon(null);
          })
          .finally(() => {
            setLoading(false);
          });
      }, 2000);

      return () => clearTimeout(getPokemons);
    } else {
      fetchInitialPokemonList();
    }
  }, [search]);

  const fetchInitialPokemonList = () => {
    setLoading(true);
    setError(null);
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) => response.json())
      .then((data) => {
        const fetches = data.results.map((pokemon: { name: string }) =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`).then(
            (response) => response.json(),
          ),
        );
        return Promise.all(fetches);
      })
      .then((pokemons) => {
        setPokemonList(pokemons);
        setPokemon(null);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearch(inputValue);
  };

  const clearSearch = () => {
    setInputValue("");
    setSearch("");
  };

  return (
    <div className={styles.pokedexContainer}>
      <form onSubmit={handleSearchSubmit}>
        <InputGroup>
          <Input
            size="lg"
            type="text"
            value={inputValue}
            onChange={handleSearchChange}
            placeholder="Search Pokémon"
          />
          {inputValue && (
            <InputRightElement onClick={clearSearch} cursor="pointer">
              <CloseIcon />
            </InputRightElement>
          )}
        </InputGroup>
      </form>
      {loading ? (
        <div className="modal">
          <div className="modal-content">
            <div className="spinner"></div>
          </div>
        </div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : pokemon ? (
        <div className={styles.pokemonList}>
          <div key={pokemon.id} className={styles.pokemonListItem}>
            <img
              className={styles.pokemonImage}
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
            />
            <div className={styles.pokedexListText}>
              <div>
                <h2>{pokemon.name}</h2>
                <p>{pokemon.types[0].type.name}</p>
              </div>
              <h3>#{("00" + pokemon.id).slice(-3)}</h3>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.pokemonList}>
          {pokemonList.map((pokemon) => (
            <div key={pokemon.id} className={styles.pokemonListItem}>
              <img
                className={styles.pokemonImage}
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
              />
              <div className={styles.pokedexListText}>
                <div>
                  <h2>{pokemon.name.toUpperCase()}</h2>
                  <p>{pokemon.types[0].type.name}</p>
                </div>
                <h3>#{("00" + pokemon.id).slice(-3)}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Pokedex;
