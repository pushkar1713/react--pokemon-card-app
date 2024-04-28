import styles from "./Header.module.css";
import { useState } from "react";

type HeaderProps = {
  onSearchSubmit: (searchValue: string) => void;
};

export const Header = ({ onSearchSubmit }: HeaderProps) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleClick = () => {
    onSearchSubmit(searchValue);
  };

  return (
    <header className={styles.headerContainer}>
      <div className={styles.header}>
        <img
          className={styles.headerImage}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Pok%C3%A9mon_Trading_Card_Game_logo.svg/2880px-Pok%C3%A9mon_Trading_Card_Game_logo.svg.png"
          alt="pokemon logo"
        />
        <div className={styles.headerForm}>
          <input
            className={styles.headerInput}
            type="text"
            placeholder="Type a Pokemon name..."
            onChange={handleSearch}
            value={searchValue}
          />
          <button className={styles.headerFormBtn} onClick={handleClick}>
            Search
          </button>
        </div>
      </div>
    </header>
  );
};
