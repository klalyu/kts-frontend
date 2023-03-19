import React from "react";

import classNames from "classnames";

import s from "./WithLoader.module.scss";
import { Loader } from "../Loader/Loader";

export type WithLoaderProps = React.PropsWithChildren<{
  loading: boolean;
  className?: string;
}>;

export const WithLoader: React.FC<WithLoaderProps> = ({
  children,
  loading = false,
  className,
}) => {
  return (
    <div className={classNames(s.loaderSection, className)}>
      {loading && (
        <div className={s.loaderSection__loader}>
          <Loader />
        </div>
      )}
      {children}
    </div>
  );
};
