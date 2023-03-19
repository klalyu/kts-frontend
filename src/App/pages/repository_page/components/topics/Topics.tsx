import React from "react";

import Topic from "@components/Topic";

import s from "./Topics.module.scss";

type TopicsProps = {
  topics: string[];
};

const Topics: React.FC<TopicsProps> = ({ topics }) => {
  return (
    <div className={s.topics}>
      {topics.map((topic) => (
        <Topic key={topic} text={topic} />
      ))}
    </div>
  );
};

export default Topics;
