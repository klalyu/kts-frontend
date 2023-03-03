import "@styles/style.scss";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import OrgRepositoriesPage from "./pages/org_repositories_page";
import RepositoryPage from "./pages/repository_page/RepositoryPage";

function App() {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route
            path="/repositories/:org/:repoName"
            element={<RepositoryPage />}
          />
          <Route path="/repositories/:org" element={<OrgRepositoriesPage />} />
          <Route
            path="*"
            element={<Navigate to="/repositories/ktsstudio" replace />}
          />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
