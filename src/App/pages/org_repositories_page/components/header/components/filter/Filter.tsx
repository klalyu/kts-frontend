import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import { MultiDropdown } from "@components/MultiDropdown";
import { filterTypeRepoItems } from "@config/filters";
import rootStore from "@store/root_store";

const FilterTypeRepo = () => {
  const { org } = useParams();
  const typeRepo = rootStore.query.getParam("type");
  const navigate = useNavigate();

  return (
    <MultiDropdown
      options={filterTypeRepoItems}
      value={filterTypeRepoItems.filter((item) => item.key === typeRepo)}
      onChange={(values) => {
        if (values.length > 1) {
          navigate(
            `/repositories/${org}?${rootStore.query.prepareSearch({
              page: "1",
              type: values.filter((typeValue) => typeValue.key !== typeRepo)[0]
                .key,
            })}`
          );
        } else {
          navigate(
            `/repositories/${org}?${rootStore.query.prepareSearch({
              page: "1",
              type: values.length ? values[0].key : "all",
            })}`
          );
        }
      }}
      pluralizeOptions={(values) =>
        values.length === 0
          ? "Type"
          : values.map((value) => value.value).join(",")
      }
    />
  );
};

export default FilterTypeRepo;
