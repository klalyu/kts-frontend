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
        <svg
          className="checkbox__check"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="8.91978"
            y1="18.4979"
            x2="1.84871"
            y2="11.4268"
            stroke="#FF5555"
            strokeWidth="3"
          />
          <line
            x1="7.86265"
            y1="17.4337"
            x2="18.4337"
            y2="6.86268"
            stroke="#FF5555"
            strokeWidth="3"
          />
        </svg>
      )}
    </div>
  );
};
