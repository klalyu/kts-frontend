import React, { useState } from "react";

import classNames from "classnames";

import s from "./MultiDropdown.module.scss";
import arrowImg from "@assets/images/dropdown_arrow.svg";

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

    setopen(!open);
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
        <img
          src={arrowImg}
          alt="arrow"
          className={s["multi-dropdown__arrow"]}
        />
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
