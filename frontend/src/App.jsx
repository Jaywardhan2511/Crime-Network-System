import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import DashboardPage from "./DashboardPage";
import SearchPage from "./SearchPage";
import NetworkPage from "./NetworkPage";
import EntityProfilePage from "./EntityProfilePage";
import ConnectionDetailsPage from "./ConnectionDetailsPage";
import AlertsPage from "./AlertsPage";
import ReportsPage from "./ReportsPage";
import LoginPage from "./LoginPage";
import UploadPage from "./UploadPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home page → Login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* Other pages */}
        <Route path="/search" element={<SearchPage />} />
        <Route path="/network" element={<NetworkPage />} />
        <Route path="/entity/:entityId" element={<EntityProfilePage />} />
        <Route
          path="/connection/:connectionId"
          element={<ConnectionDetailsPage />}
        />
        <Route path="/alerts" element={<AlertsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/upload" element={<UploadPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;