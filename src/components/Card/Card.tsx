import React from "react";

import styles from "./Card.module.scss";

export type CardProps = {
  /** URL изображения */
  image: string;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Подзаголовок карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  content?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
};

export const Card: React.FC<CardProps> = ({
  image,
  title,
  subtitle,
  content,
  onClick,
}) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <img
        className={styles.card__avatarImage}
        src={image}
        alt="avatar"
        loading="lazy"
      />
      <div className={styles.card__info}>
        <div className={styles.card__infoTitle}>{title}</div>
        <div className={styles.card__infoSubtitle}>{subtitle}</div>
        <div className={styles.card__infoContent}>{content}</div>
      </div>
    </div>
  );
};
