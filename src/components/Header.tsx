import styles from "./Header.module.css";

export const Header = () => {
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
            placeholder="What are you looking for?"
          />
          <button className={styles.headerFormBtn}>Search</button>
        </div>
      </div>
    </header>
  );
};
