import { useEffect, useState } from "react";
import { FilterForm } from "./FilterForm";
import { CardGrid } from "./CardGrid";

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

  useEffect(() => {
    let query = `https://api.pokemontcg.io/v2/cards?q=name:${searchValue}*`;
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
  }, [searchValue, filters]);

  return (
    <div className="main">
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
