import styles from "./FilterForm.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

export const FilterForm = () => {
  return (
    <form className={styles.filterForm}>
      <div className={styles.filterTitle}>
        <FontAwesomeIcon id={styles.filterIcon} icon={faFilter} />
        <h2>Filter</h2>
      </div>
      <label htmlFor="type">By Type</label>
      <select name="type" id="type">
        <option value="">Select Type</option>
        <option value="fire">Fire</option>
        <option value="water">Water</option>
        <option value="grass">Grass</option>
      </select>
      <label htmlFor="rare">By Rarity</label>
      <select name="rare" id="rare">
        <option value="">Select Rarity</option>
        <option value="Common">Common</option>
        <option value="Uncommon">Uncommon</option>
        <option value="Rare Holo GX">Rare Holo GX</option>
        <option value="Rare Ultra">Rare Ultra</option>
        <option value="Shiny Rare">Shiny Rare</option>
      </select>
      <button type="button">Search</button>
    </form>
  );
};
