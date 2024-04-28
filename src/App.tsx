import { useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Main } from "./components/Main";

function App() {
  const [search, setSearch] = useState("");

  const onSearchSubmit = (value: string) => {
    setSearch(value);
  };

  return (
    <>
      <Header onSearchSubmit={onSearchSubmit} />
      <Main searchValue={search} />
    </>
  );
}

export default App;
