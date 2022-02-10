import React, { useEffect, useState, useMemo } from "react";
import "./App.css";

import { rawPokemon$, pokemonWithPower$, IPokemon, selected$ } from "./store";

const Search = () => {
  const [search, setSearch] = useState("");
  const [pokemon, setPokemon] = useState<IPokemon[]>([]);

  useEffect(() => {
    const sub = pokemonWithPower$.subscribe(setPokemon);
    return () => sub.unsubscribe();
  }, []);

  const filteredPokemon = useMemo(() => {
    return pokemon.filter((value) =>
      value.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [pokemon, search]);

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filteredPokemon.map((value) => (
        <div key={value.name}>
          <input
            type="checkbox"
            checked={selected$.value.includes(value.id)}
            onChange={() => {
              if (selected$.value.includes(value.id)) {
                selected$.next(selected$.value.filter((id) => id === value.id));
              } else {
                selected$.next([...selected$.value, value.id]);
              }
            }}
          />
          <strong>{value.name}</strong> - {value.power}
        </div>
      ))}
    </div>
  );
};

function App() {
  // useEffect(() => {
  //   pokemonWithPower$.subscribe(console.log);
  // }, []);

  return (
    <div style={{ display: "flex", gridTemplateColumns: "1fr 1fr" }}>
      <Search />
    </div>
  );
}

export default App;
