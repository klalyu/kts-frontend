import React, { useState } from "react";

import classNames from "classnames";

import s from "./MultiDropdown.module.scss";

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Преобразовать выбранные значения в строку. Отображается в дропдауне в качестве выбранного значения */
  pluralizeOptions: (value: Option[]) => string;
};

export const MultiDropdown: React.FC<MultiDropdownProps> = ({
  options,
  value,
  onChange,
  disabled,
  pluralizeOptions,
}) => {
  const [open, setopen] = useState(false);
  const [, setkeyComponent] = useState(value.length);

  const handleSelect = (item: Option) => {
    const selectedValues = value.slice();
    const index = value.findIndex(
      (selectedItem) => selectedItem.key === item.key
    );

    if (index === -1) {
      selectedValues.push(item);
    } else {
      selectedValues.splice(index, 1);
    }

    onChange(selectedValues);
    setkeyComponent(selectedValues.length);
  };

  return (
    <div className={s["multi-dropdown"]}>
      <div
        tabIndex={0}
        className={classNames(s["multi-dropdown__select"], {
          [s["multi-dropdown__select_disabled"]]: disabled,
        })}
        onClick={() => {
          !disabled && setopen(!open);
        }}
      >
        {pluralizeOptions(value)}
        <svg
          className={s["multi-dropdown__arrow"]}
          width="11"
          height="7"
          viewBox="0 0 11 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.7731 0.947033L6.24888 6.61136C5.8197 7.12955 5.15805 7.12955 4.74676 6.61136L0.222496 0.947033C-0.206683 0.410976 0.00790646 0 0.669557 0H10.3261C11.0056 0 11.2023 0.410976 10.7731 0.947033Z"
            fill="#6C757D"
          />
        </svg>
      </div>
      {open && !disabled && (
        <ul className={classNames(s["multi-dropdown__options"])}>
          {options.map((item) => (
            <li
              className={classNames(s["multi-dropdown__option"], {
                [s["multi-dropdown__option_selected"]]: value.filter(
                  (selectedItem) => selectedItem.key === item.key
                ).length,
              })}
              key={item.key}
              onClick={() => handleSelect(item)}
            >
              {item.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
