import React from "react";

import { Button } from "@components/Button/Button";
import rootStore from "@store/root_store/instance";
import { useNavigate, useParams } from "react-router-dom";

import s from "./Pagination.module.scss";

type PaginationProps = {
  pageCount: number;
};
const Pagination: React.FC<PaginationProps> = ({ pageCount }) => {
  const { org } = useParams();
  const navigate = useNavigate();

  const currentPage = rootStore.query.getParam("page") || 1;

  const pages = new Array(pageCount).fill(1);

  if (pageCount < 2) {
    return <></>;
  }

  return (
    <div className={s.pagination}>
      {pages.map((p, i) => (
        <Button
          className={s.pagination__button}
          key={i}
          disabled={i + 1 === +currentPage}
          onClick={() =>
            navigate(
              `/repositories/${org}?${rootStore.query.prepareSearch({
                page: String(i + 1),
              })}`
            )
          }
        >
          {i + 1}
        </Button>
      ))}
    </div>
  );
};

export default Pagination;
