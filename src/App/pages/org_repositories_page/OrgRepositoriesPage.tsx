import React from "react";

import CardList from "./components/card_list/CardList";
import Header from "./components/header";
import { useQueryParamsStore } from "@store/root_store/hooks/useQueryParamsStore";

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
