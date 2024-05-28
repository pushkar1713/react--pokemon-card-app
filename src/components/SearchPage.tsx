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
};

const pokemonApiKey = import.meta.env.VITE_POKEMON_API_KEY;

type MainProps = {
  searchValue: string;
};

export const Main = ({ searchValue }: MainProps) => {
  const [cards, setCards] = useState<PokemonCard[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filters, setFilters] = useState({ type: "", rarity: "" });
  const [search, setSearch] = useState(searchValue);
  const [inputValue, setInputValue] = useState(searchValue); // State to manage input field value

  useEffect(() => {
    let query = `https://api.pokemontcg.io/v2/cards?q=name:${search}*`;
    if (filters.type && filters.rarity) {
      query += ` types:${filters.type} rarity:${filters.rarity}`;
    } else if (filters.type) {
      query += ` types:${filters.type}`;
    } else if (filters.rarity) {
      query += ` rarity:${filters.rarity}`;
    }

    const request = new Request(query, {
      method: "GET",
      headers: {
        "X-Api-Key": pokemonApiKey,
      },
    });

    setIsLoaded(false); // Set loading state to true before fetch

    fetch(request)
      .then((response) => response.json())
      .then(({ data }) => {
        setCards(data || []); // Ensure cards is an array
      })
      .catch((error) => {
        console.error(new Error(error));
        setCards([]); // Set cards to an empty array on error
      })
      .finally(() => {
        setIsLoaded(true); // Set loading state to false after fetch
      });
  }, [search, filters]); // Only run the effect when `search` or `filters` change

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value); // Update inputValue state with the typed value
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearch(inputValue); // Update the search state with the input value on form submit
  };

  const clearSearch = () => {
    setInputValue(""); // Clear the input value
    setSearch(""); // Clear the search
  };

  return (
    <div className={styles.searchPageContainer}>
      <form onSubmit={handleSearchSubmit}>
        <InputGroup>
          <Input
            type="text"
            value={inputValue} // Bind input value to inputValue state
            onChange={handleSearchChange} // Handle input change
            placeholder="Search Pokémon"
          />
          {inputValue && ( // Render close icon only when there is a value in the input field
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
