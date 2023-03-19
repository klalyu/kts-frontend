import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Loader } from "@components/Loader/Loader";

const OrgRepositoriesPage = React.lazy(
  () => import("@pages/org_repositories_page")
);
const RepositoryPage = React.lazy(() => import("@pages/repository_page"));

function App() {
  return (
    <main>
      <BrowserRouter>
        <React.Suspense fallback={<Loader />}>
          <Routes>
            <Route
              path="/repositories/:org/:repoName"
              element={<RepositoryPage />}
            />
            <Route
              path="/repositories/:org"
              element={<OrgRepositoriesPage />}
            />
            <Route
              path="*"
              element={<Navigate to="/repositories/ktsstudio" replace />}
            />
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    </main>
  );
}

export default App;
