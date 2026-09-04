import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./DashboardPage";
import SearchPage from "./SearchPage";
import NetworkPage from "./NetworkPage";
import EntityProfilePage from "./EntityProfilePage";
import ConnectionDetailsPage from "./ConnectionDetailsPage";
import AlertsPage from "./AlertsPage";
import ReportsPage from "./ReportsPage";
import LoginPage from "./LoginPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/network" element={<NetworkPage />} />
        <Route path="/entity/:entityId" element={<EntityProfilePage />} />
        <Route path="/connection/:connectionId" element={<ConnectionDetailsPage />} />
        <Route path="/alerts" element={<AlertsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;