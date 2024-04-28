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
const pokemonApiKey = import.meta.env.POKEMON_API_KEY;

type MainProps = {
  searchValue: string;
};

export const Main = ({ searchValue }: MainProps) => {
  const [cards, setCards] = useState<PokemonCard[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const request = new Request(
      `https://api.pokemontcg.io/v2/cards${searchValue ? `?q=name:${searchValue}*` : ""}`,
      {
        method: "GET",
        headers: {
          "X-Api-Key": pokemonApiKey,
        },
      },
    );
    fetch(request)
      .then((response) => response.json())
      .then(({ data }) => {
        setIsLoaded(true);
        setCards(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(new Error(error));
      });
  }, [cards, searchValue]);

  if (!isLoaded) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  } else {
    return (
      <>
        <div>{searchValue && <h3>Result for: {searchValue}</h3>}</div>
        <div className="main">
          <FilterForm />
          <CardGrid cards={cards} />
        </div>
      </>
    );
  }
};
