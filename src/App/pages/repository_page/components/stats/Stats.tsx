import React from "react";

import { pluralizeWord } from "@utils/formatter";

import s from "./Stats.module.scss";
import starImg from "@assets/images/star.svg";
import forkImg from "@assets/images/fork.svg";
import eyeImg from "@assets/images/eye.svg";

type StatItemProps = {
  type: "star" | "fork" | "eye";
  metric: string;
  count: number;
};
type StatsProps = {
  stars: number;
  forks: number;
  watch: number;
};

const StatItem: React.FC<StatItemProps> = ({ type, metric, count }) => {
  return (
    <div className={s.stats__item}>
      <img
        src={type === "eye" ? eyeImg : type === "fork" ? forkImg : starImg}
        alt={metric}
      />{" "}
      {count} {metric}
    </div>
  );
};

const Stats: React.FC<StatsProps> = ({ stars, forks, watch }) => {
  return (
    <div>
      <StatItem
        type={"star"}
        count={stars}
        metric={pluralizeWord("star", stars)}
      />
      <StatItem type={"eye"} count={watch} metric={"watching"} />
      <StatItem
        type={"fork"}
        count={forks}
        metric={pluralizeWord("fork", forks)}
      />
    </div>
  );
};

export default Stats;
