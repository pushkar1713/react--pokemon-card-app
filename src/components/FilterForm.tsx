import { useState, useEffect } from "react";
import styles from "./FilterForm.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

type FilterFormProps = {
  onFilterChange: (filters: { type: string; rarity: string }) => void;
};

export const FilterForm = ({ onFilterChange }: FilterFormProps) => {
  const [type, setType] = useState("");
  const [rarity, setRarity] = useState("");

  useEffect(() => {
    onFilterChange({ type, rarity });
  }, [type, rarity, onFilterChange]);

  return (
    <form className={styles.filterForm}>
      <div className={styles.filterTitle}>
        <FontAwesomeIcon id={styles.filterIcon} icon={faFilter} />
        <h2>Filter</h2>
      </div>
      <label htmlFor="type">By Type</label>
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
      <label htmlFor="rare">By Rarity</label>
      <select
        name="rare"
        id="rare"
        value={rarity}
        onChange={(e) => setRarity(e.target.value)}
      >
        <option value="">Select Rarity</option>
        <option value="Common">Common</option>
        <option value="Uncommon">Uncommon</option>
        <option value="Rare Holo GX">Rare Holo GX</option>
        <option value="Rare Ultra">Rare Ultra</option>
        <option value="Shiny Rare">Shiny Rare</option>
      </select>
    </form>
  );
};
