import React from "react";

import { Redirect, Route, Router, Switch, useLocation } from "wouter";

import "@styles/style.scss";
import OrgRepositoriesPage from "./pages/org_repositories_page";
import RepositoryPage from "./pages/repository_page/RepositoryPage";

function App() {
  const [pathname] = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <main>
      <Router>
        <Switch>
          <Route path="/org/:org" component={OrgRepositoriesPage} />
          <Route path="/repository/:org/:repoName" component={RepositoryPage} />
          <Route path="/">
            <Redirect to={"/org/ktsstudio"} />
          </Route>
          <Route>
            <Redirect to={"/org/ktsstudio"} />
          </Route>
        </Switch>
      </Router>
    </main>
  );
}

export default App;
