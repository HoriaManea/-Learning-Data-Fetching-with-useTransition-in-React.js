import React, { useState, useTransition } from "react";
import "./App.css";

export default function WithTransition() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSearch = () => {
    startTransition(async () => {
      const data = await fetch(
        `https://dummyjson.com/products/search?q=${query}`
      ).then((res) => res.json());
      setItems(data.products);
    });
  };

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Caută..."
      />
      <button onClick={handleSearch}>Search</button>

      {isPending && <p>Loading</p>}

      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}
