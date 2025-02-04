import React, { useState } from "react";
import Header from "../components/Header";
import PopularPhotos from "../components/PopularPhotos";
import { useSearchHistory } from "../context/SearchHistoryContext";

const MainPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isPopular, setIsPopular] = useState(true); 
  const { addSearch } = useSearchHistory();

  const handleSearch = (query: string) => {
    if (query.trim()) {
      setSearchQuery(query);
      setIsPopular(false); 
      addSearch(query);
    }
  };

  const handleResetToPopular = () => {
    setSearchQuery("");
    setIsPopular(true); 
  };

  return (
    <div>
      <Header onSearch={handleSearch} onReset={handleResetToPopular} />
      <PopularPhotos searchQuery={isPopular ? "" : searchQuery} />
    </div>
  );
};

export default MainPage;
