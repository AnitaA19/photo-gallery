import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import FindComponent from "./FindComponent";

interface HeaderProps {
  onSearch: (query: string) => void;
  onReset: () => void;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<HeaderProps> = ({ onSearch, onReset, searchQuery, setSearchQuery }) => {
  const handleGalleryClick = () => {
    onReset(); 
  };

  return (
    <header className={styles.container}>
      <Link to="/" className={styles.primaryText} onClick={handleGalleryClick}>
        Gallery
      </Link>
      <Link to="/history" className={styles.link}>History</Link>
      <FindComponent onSearch={onSearch} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    </header>
  );
};

export default Header;
