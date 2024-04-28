import styles from "./FilterForm.module.css";

export const FilterForm = () => {
  return (
    <form className={styles.filterForm}>
      <h2>Filter</h2>
      <label htmlFor="">By Name</label>
      <input type="text" />
      <label htmlFor="">By Type</label>
      <select name="cars" id="cars">
        <option value="fire">Fire</option>
        <option value="water">Water</option>
        <option value="grass">Grass</option>
      </select>
      <label htmlFor="">By Rarety</label>
      <input type="text" />
      <label htmlFor="">By Price</label>
      <input type="text" />
      <button>Search</button>
    </form>
  );
};
