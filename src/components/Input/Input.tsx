import React from "react";

import classNames from "classnames";

import "./style.scss";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
};

export const Input: React.FC<InputProps> = ({ onChange, ...props }) => {
  return (
    <input
      {...props}
      className={classNames(
        "input",
        { input_disabled: props.disabled },
        props.className
      )}
      type="text"
      onChange={(e) => !props.disabled && onChange(e.target.value)}
    />
  );
};
