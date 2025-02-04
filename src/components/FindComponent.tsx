import React, { useState } from "react";
import styles from "./FindComponent.module.css";

interface FindComponentProps {
  onSearch: (query: string) => void;
}

const FindComponent: React.FC<FindComponentProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && query.trim()) {
      onSearch(query.trim()); 
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Search for images"
        className={styles.searchInput}
        value={query}
        onChange={handleChange}
        onKeyPress={handleKeyPress} 
      />
    </div>
  );
};

export default FindComponent;
