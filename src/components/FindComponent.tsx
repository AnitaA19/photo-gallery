import React from "react";
import styles from "./FindComponent.module.css";

interface FindComponentProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const FindComponent: React.FC<FindComponentProps> = ({ onSearch, searchQuery, setSearchQuery }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Search for images"
        className={styles.searchInput}
        value={searchQuery}
        onChange={handleChange}
        onKeyPress={handleKeyPress} 
      />
    </div>
  );
};

export default FindComponent;
