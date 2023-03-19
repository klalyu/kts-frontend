import React from "react";

import classNames from "classnames";

import s from "./Button.module.scss";
import { Loader } from "../Loader/Loader";

export type ButtonProps = React.PropsWithChildren<{
  /**
   * Если true, то внутри кнопки вместе с children отображается компонент Loader
   * Также кнопка должна переходить в состояние disabled
   */
  loading?: boolean;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  className,
  onClick,
  ...props
}) => {
  return (
    <button
      {...props}
      className={classNames(
        s.button,
        { [s.button_disabled]: props.disabled || loading },
        className
      )}
      onClick={(e) => !loading && onClick && onClick(e)}
      disabled={props.disabled || loading}
    >
      {loading && <Loader />}
      {children}
    </button>
  );
};
