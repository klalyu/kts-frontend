import React from "react";

import CardList from "./components/card_list/CardList";
import Header from "./components/header";

const OrgRepositoriesPage: React.FC = () => {
  return (
    <>
      <Header />
      <CardList />
    </>
  );
};

export default OrgRepositoriesPage;
