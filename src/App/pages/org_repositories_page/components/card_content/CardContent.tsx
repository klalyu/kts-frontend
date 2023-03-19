import React from "react";

import { stringToDate } from "@utils/formatter";

import styles from "./CardContent.module.scss";

type CardContentProps = {
  stars: number | null;
  date: string;
};

const CardContent: React.FC<CardContentProps> = ({ stars, date }) => {
  return (
    <div className={styles.cardContent}>
      <div className={styles.cardContent__stars}>
        <img src="/images/goldstar.svg" alt="star-rating" />
        {stars}
      </div>
      Updated {stringToDate(date)}
    </div>
  );
};

export default CardContent;
