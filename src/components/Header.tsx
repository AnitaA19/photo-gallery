import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import FindComponent from "./FindComponent";

interface HeaderProps {
  onSearch: (query: string) => void;
  onReset: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, onReset }) => {
  return (
    <header className={styles.container}>
      <Link to="/" className={styles.primaryText} onClick={onReset}>
        Gallery
      </Link>
      <Link to="/history" className={styles.link}>History</Link>
      <FindComponent onSearch={onSearch} />
    </header>
  );
};

export default Header;
