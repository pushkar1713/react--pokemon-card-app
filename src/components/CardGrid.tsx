import React, { useState } from "react";
import styles from "./CardGrid.module.css";
import { Tilt } from "react-tilt";
import { PokemonCard } from "./SearchPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import CardModal from "./CardModal";

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

type CardGridProps = {
  cards: PokemonCard[];
};

export const CardGrid: React.FC<CardGridProps> = ({ cards }) => {
  const [selectedCard, setSelectedCard] = useState<PokemonCard | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = (card: PokemonCard) => {
    setSelectedCard(card);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedCard(null);
    setModalIsOpen(false);
  };

  return (
    <div className={styles.CardGrid}>
      {cards &&
        cards.map((card) => (
          <div className={styles.cardContainer} key={card.id}>
            <Tilt options={defaultOptions}>
              <div onClick={() => openModal(card)}>
                <img src={card.images.large} className={styles.cardImage} />
              </div>
            </Tilt>
            <div className={styles.cardDescription}>
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
              <FontAwesomeIcon
                className={styles.cardAddIcon}
                icon={faCirclePlus}
              />
            </div>
          </div>
        ))}
      <CardModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        card={selectedCard}
      />
    </div>
  );
};
