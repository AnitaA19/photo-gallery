import React, { createContext, useContext, useState, useEffect } from 'react';

interface SearchHistoryContextType {
  searchHistory: string[];
  addSearch: (query: string) => void;
}

const SearchHistoryContext = createContext<SearchHistoryContextType | undefined>(undefined);

export const SearchHistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem('searchHistory');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  const addSearch = (query: string) => {
    const trimmedQuery = query.trim();
    if (trimmedQuery && !searchHistory.includes(trimmedQuery)) {
      setSearchHistory((prev) => [trimmedQuery, ...prev]);
    }
  };  

  return (
    <SearchHistoryContext.Provider value={{ searchHistory, addSearch }}>
      {children}
    </SearchHistoryContext.Provider>
  );
};

export const useSearchHistory = () => {
  const context = useContext(SearchHistoryContext);
  if (context === undefined) {
    throw new Error('useSearchHistory must be used within a SearchHistoryProvider');
  }
  return context;
};