import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./DashboardPage";
import SearchPage from "./SearchPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;