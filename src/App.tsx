import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import HistoryPage from "./pages/HistoryPage";
import { SearchHistoryProvider } from "./context/SearchHistoryContext";

function App() {
  return (
    <SearchHistoryProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </Router>
    </SearchHistoryProvider>
  );
}

export default App;