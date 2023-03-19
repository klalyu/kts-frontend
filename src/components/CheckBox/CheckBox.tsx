import React, { useState } from "react";

import classNames from "classnames";

import "./style.scss";

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  /** Вызывается при клике на чекбокс */
  onChange: (value: boolean) => void;
};

export const CheckBox: React.FC<CheckBoxProps> = ({
  onChange,
  checked,
  ...props
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  return (
    <div
      tabIndex={0}
      className={classNames(
        "checkbox",
        { checkbox_disabled: props.disabled },
        props.className
      )}
      onClick={() => {
        if (!props.disabled) {
          onChange(!checked);
          setIsChecked(!isChecked);
        }
      }}
    >
      <input
        {...props}
        type={"checkbox"}
        onChange={() => {}}
        checked={isChecked}
      />
      {isChecked && (
        <img src="/images/check.svg" alt="arrow" className="checkbox__check" />
      )}
    </div>
  );
};
