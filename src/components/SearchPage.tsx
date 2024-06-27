import { useEffect, useState } from "react";
import { FilterForm } from "./FilterForm";
import { CardGrid } from "./CardGrid";
import styles from "../components/SearchPage.module.css";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

export type PokemonCard = {
  id: string;
  images: {
    small: string;
    large: string;
  };
  name: string;
  types: string[];
  rarity: string;
  supertype: string;
};

const pokemonApiKey = import.meta.env.VITE_POKEMON_API_KEY;

type SearchProps = {
  searchValue: string;
};

export const Search = ({ searchValue }: SearchProps) => {
  const [cards, setCards] = useState<PokemonCard[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filters, setFilters] = useState({
    type: "",
    rarity: "",
    supertype: "",
  });
  const [search, setSearch] = useState(searchValue);
  const [inputValue, setInputValue] = useState(searchValue);

  useEffect(() => {
    let query = `https://api.pokemontcg.io/v2/cards?q=name:${search}*`;
    if (filters.type && filters.rarity && filters.supertype) {
      query += ` types:${filters.type} rarity:${filters.rarity} supertype:${filters.supertype}`;
    } else if (filters.type) {
      query += ` types:${filters.type}`;
    } else if (filters.rarity) {
      query += ` rarity:${filters.rarity}`;
    } else if (filters.supertype) {
      query += ` rarity:${filters.supertype}`;
    }

    const request = new Request(query, {
      method: "GET",
      headers: {
        "X-Api-Key": pokemonApiKey,
      },
    });

    setIsLoaded(false);

    fetch(request)
      .then((response) => response.json())
      .then(({ data }) => {
        setCards(data || []);
      })
      .catch((error) => {
        console.error(new Error(error));
        setCards([]);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  }, [search, filters]);

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
    <div className={styles.searchPageContainer}>
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
      <FilterForm onFilterChange={setFilters} />
      {isLoaded ? (
        cards.length === 0 ? (
          <div className="no-result" style={{ color: "black" }}>
            <h2>No results</h2>
          </div>
        ) : (
          <CardGrid cards={cards} />
        )
      ) : (
        <div className="modal">
          <div className="modal-content">
            <div className="spinner"></div>
          </div>
        </div>
      )}
    </div>
  );
};
