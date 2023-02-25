import React from "react";

import classNames from "classnames";

import s from "./Loader.module.scss";

export enum LoaderSize {
  s = "s",
  m = "m",
  l = "l",
}

export type LoaderProps = {
  loading?: boolean;
  size?: LoaderSize;
  className?: string;
};

export const Loader: React.FC<LoaderProps> = ({
  loading = true,
  size = LoaderSize.s,
  className,
}: LoaderProps) => {
  if (loading) {
    return (
      <div
        className={classNames(s.loader, s[`loader_size-${size}`], className)}
      ></div>
    );
  }
  return <></>;
};
