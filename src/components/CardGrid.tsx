import { useEffect, useState } from "react";
import styles from "./CardGrid.module.css";
import { Tilt } from "react-tilt";

const defaultOptions = {
  reverse: false, // reverse the tilt direction
  max: 35, // max tilt rotation (degrees)
  perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
  scale: 1.1, // 2 = 200%, 1.5 = 150%, etc..
  speed: 1000, // Speed of the enter/exit transition
  transition: true, // Set a transition on enter/exit.
  axis: null, // What axis should be disabled. Can be X or Y.
  reset: true, // If the tilt effect has to be reset on exit.
  easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
};

type PokemonCard = {
  id: string;
  images: {
    small: string;
    large: string;
  };
  name: string;
  types: string[];
  rarity: string;
};

export const CardGrid = () => {
  const [cards, setCards] = useState<PokemonCard[]>([]);

  useEffect(() => {
    if (!cards.length) {
      const request = new Request("https://api.pokemontcg.io/v2/cards", {
        method: "GET",
        headers: {
          "X-Api-Key": "6c3121ce-b135-4296-8c03-e0b437d024f5",
        },
      });
      fetch(request)
        .then((response) => response.json())
        .then(({ data, totalCount }) => {
          console.log("totalCount", totalCount);
          setCards(data);
          console.log(data);
        })
        .catch((error) => {
          console.log(new Error(error));
        });
    }
  }, [cards]);

  return (
    <div className={styles.CardGrid}>
      {cards &&
        cards.slice(0, 18).map((card) => (
          <div className={styles.cardContainer} key={card.id}>
            <Tilt options={defaultOptions}>
              <div>
                <img src={card.images.large} className={styles.cardImage} />
              </div>
            </Tilt>
            <div className={styles.cardText}>
              <p>
                <strong>{card.name}</strong>
              </p>
              <p>
                <small>{card.types[0]}</small>
              </p>
              <p>
                <small>{card.rarity}</small>
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};
