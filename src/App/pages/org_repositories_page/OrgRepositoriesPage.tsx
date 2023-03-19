import React from "react";

import { useQueryParamsStore } from "@store/root_store/hooks/useQueryParamsStore";
import CardList from "./components/card_list/CardList";
import Header from "./components/header";

const OrgRepositoriesPage: React.FC = () => {
  useQueryParamsStore();

  return (
    <>
      <Header />
      <CardList />
    </>
  );
};

export default OrgRepositoriesPage;
