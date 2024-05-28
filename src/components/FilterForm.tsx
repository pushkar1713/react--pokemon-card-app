import { useState, useEffect } from "react";
import styles from "./FilterForm.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

type FilterFormProps = {
  onFilterChange: (filters: {
    type: string;
    rarity: string;
    supertype: string;
  }) => void;
};

export const FilterForm = ({ onFilterChange }: FilterFormProps) => {
  const [type, setType] = useState<string>("");
  const [rarity, setRarity] = useState<string>("");
  const [supertype, setSupertype] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    onFilterChange({ type, rarity, supertype });
  }, [type, rarity, supertype, onFilterChange]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={styles.filterFormContainer}>
      <button className={styles.hamburger} onClick={toggleMenu}>
        <FontAwesomeIcon icon={faFilter} className={styles.filterIcon} />
      </button>
      <form className={`${styles.filterForm} ${menuOpen ? styles.show : ""}`}>
        <div className={styles.filterTitle}>
          <FontAwesomeIcon id={styles.filterIcon} icon={faFilter} />
          <h2>Filter</h2>
        </div>

        <select
          name="type"
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Select Type</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="grass">Grass</option>
          <option value="colorless">Colorless</option>
          <option value="darkness">Darkness</option>
          <option value="dragon">Dragon</option>
          <option value="fairy">Fairy</option>
          <option value="fighting">Fighting</option>
          <option value="lightning">Lightning</option>
          <option value="metal">Metal</option>
          <option value="psychic">Psychic</option>
        </select>

        <select
          name="rarity"
          id="rarity"
          value={rarity}
          onChange={(e) => setRarity(e.target.value)}
        >
          <option value="">Select Rarity</option>
          <option value="Common">Common</option>
          <option value="Uncommon">Uncommon</option>
          <option value="Rare Holo">Rare Holo</option>
          <option value="Rare Ultra">Rare Ultra</option>
          <option value="Shiny Rare">Shiny Rare</option>
        </select>

        <select
          name="supertype"
          id="supertype"
          value={supertype}
          onChange={(e) => setSupertype(e.target.value)}
        >
          <option value="">Select Supertype</option>
          <option value="Energy">Energy</option>
          <option value="Pokémon">Pokémon</option>
          <option value="Trainer">Trainer</option>
        </select>
      </form>
    </div>
  );
};
